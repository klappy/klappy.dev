#!/usr/bin/env node
/**
 * librarian.js
 *
 * Citation-first retrieval service for klappy.dev.
 * Uses docs.json index for fast lookup, extracts headed slices at runtime.
 *
 * Per docs/agents/librarian/contract.md
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { extractBestQuote } from "../renderers/librarian-renderer.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../../..");
const INDEX_PATH = join(ROOT, "public/_compiled/index/docs.json");

// ============================================================================
// SCORING WEIGHTS (per spec)
// ============================================================================

const WEIGHTS = {
  exact_uri: 50,
  exact_title: 30,
  acronym_match: 25,
  token_title: 12,
  token_heading: 8,
  token_tag: 6,
  token_subtitle: 4,
  token_path: 3,
};

const AUTHORITY_BIAS = {
  governing: 1.15,
  operational: 1.0,
  "non-governing": 0.85,
};

const POSTURE_BIAS = {
  governing: 1.1,
  routing: 0.95,
};

// Cutoffs
const TOP_K = 8;
const MIN_SCORE = 10;
const DEFAULT_RESULTS = 3;

// Policy intent detection - two-stage: strong vs weak
// Strong: explicit governing reference → hard filter to governing
// Weak: implied policy question → soft preference (multiplier only)

const STRONG_POLICY_PATTERNS = [
  /what\s+does\s+(odd|canon)\s+say/i,
  /odd\s+says/i,
  /canon\s+says/i,
  /show\s+me\s+the\s+(rule|constraint|decision|definition)/i,
  /where\s+is\s+the\s+(rule|constraint|decision|definition)/i,
  /what\s+is\s+the\s+(rule|constraint|decision|definition)\s+(for|about)/i,
];

const WEAK_POLICY_KEYWORDS = [
  "must",
  "required",
  "forbidden",
  "verification",
  "evidence",
  "policy",
  "governing",
];

// Excerpt limits
const MAX_EXCERPT_LINES = 70;
const MAX_EXCERPT_CHARS = 2500;
const MIN_EXCERPT_LINES = 10;

// Priority sections for rule-type queries
const PRIORITY_SECTIONS = {
  constraints: "Operating Constraints",
  defaults: "Defaults",
  failures: "Failure Modes",
  verification: "Verification",
};

// Keyword mappings to priority sections
const KEYWORD_SECTION_MAP = {
  must: "constraints",
  rule: "constraints",
  constraint: "constraints",
  "do not": "constraints",
  forbidden: "constraints",
  required: "constraints",
  should: "constraints",
  default: "defaults",
  assume: "defaults",
  usually: "defaults",
  mistake: "failures",
  failure: "failures",
  "common issues": "failures",
  prove: "verification",
  evidence: "verification",
  verify: "verification",
  dod: "verification",
};

// ============================================================================
// QUERY NORMALIZATION
// ============================================================================

/**
 * Normalizes a query string for matching.
 * - lowercase
 * - strip punctuation except / and -
 * - split into tokens
 * - drop tokens < 2 chars
 * - preserve quoted phrases
 */
function normalizeQuery(query) {
  const lower = query.toLowerCase();

  // Extract quoted phrases
  const quotedPhrases = [];
  const withoutQuotes = lower.replace(/"([^"]+)"/g, (match, phrase) => {
    quotedPhrases.push(phrase.trim());
    return "";
  });

  // Clean and tokenize
  const cleaned = withoutQuotes.replace(/[^\w\s/\-]/g, " ");
  const tokens = cleaned
    .split(/\s+/)
    .filter((t) => t.length >= 2)
    .filter((t) => !["the", "and", "for", "is", "in", "to", "of", "a", "an"].includes(t));

  return { tokens, quotedPhrases };
}

// ============================================================================
// SCORING
// ============================================================================

/**
 * Calculates match score for a document against query tokens.
 */
function scoreDocument(doc, tokens, quotedPhrases) {
  let score = 0;
  const matches = [];

  const titleLower = (doc.title || "").toLowerCase();
  const uriLower = (doc.uri || "").toLowerCase();
  const subtitleLower = (doc.subtitle || "").toLowerCase();
  const pathLower = (doc.path || "").toLowerCase();
  const rawTags = Array.isArray(doc.tags) ? doc.tags : [];
  const tagsLower = rawTags.map((t) => t.toLowerCase());
  const rawAcronyms = Array.isArray(doc.acronyms) ? doc.acronyms : [];
  const acronymsLower = rawAcronyms.map((a) => a.toLowerCase());
  const headingsLower = (doc.headings || []).map((h) => ({
    ...h,
    textLower: h.text.toLowerCase(),
  }));

  // Check exact matches first
  for (const phrase of quotedPhrases) {
    if (uriLower.includes(phrase)) {
      score += WEIGHTS.exact_uri;
      matches.push({ type: "exact_uri", phrase });
    }
    if (titleLower.includes(phrase)) {
      score += WEIGHTS.exact_title;
      matches.push({ type: "exact_title", phrase });
    }
  }

  // Token matches
  for (const token of tokens) {
    // URI exact
    if (uriLower === token || uriLower.endsWith("/" + token)) {
      score += WEIGHTS.exact_uri;
      matches.push({ type: "uri_exact", token });
    }

    // Title
    if (titleLower.includes(token)) {
      score += WEIGHTS.token_title;
      matches.push({ type: "title", token });
    }

    // Headings (H2/H3)
    for (const h of headingsLower) {
      if (h.level >= 2 && h.textLower.includes(token)) {
        score += WEIGHTS.token_heading;
        matches.push({ type: "heading", token, heading: h.text });
        break; // Only count once per token
      }
    }

    // Tags
    if (tagsLower.some((tag) => tag.includes(token))) {
      score += WEIGHTS.token_tag;
      matches.push({ type: "tag", token });
    }

    // Acronyms (high-value match for short tokens like "CST", "ODD", "ESE")
    if (acronymsLower.some((acr) => acr === token)) {
      score += WEIGHTS.acronym_match;
      matches.push({ type: "acronym", token });
    }

    // Subtitle
    if (subtitleLower.includes(token)) {
      score += WEIGHTS.token_subtitle;
      matches.push({ type: "subtitle", token });
    }

    // Path
    if (pathLower.includes(token)) {
      score += WEIGHTS.token_path;
      matches.push({ type: "path", token });
    }
  }

  // Apply authority bias
  const authorityBias = AUTHORITY_BIAS[doc.authority_band] || 1.0;
  score *= authorityBias;

  // Apply posture bias (if present)
  if (doc.execution_posture && POSTURE_BIAS[doc.execution_posture]) {
    score *= POSTURE_BIAS[doc.execution_posture];
  }

  return { score: Math.round(score * 100) / 100, matches };
}

/**
 * Determines policy intent strength: "strong", "weak", or "none".
 *
 * Strong: explicit governing reference (hard filter to governing)
 * Weak: implied policy keywords (soft preference via multiplier)
 * None: not a policy question
 */
function getPolicyIntentStrength(query) {
  // Check strong patterns first (explicit governing reference)
  for (const pattern of STRONG_POLICY_PATTERNS) {
    if (pattern.test(query)) {
      return "strong";
    }
  }

  // Check weak keywords (implied policy)
  const lower = query.toLowerCase();
  for (const kw of WEAK_POLICY_KEYWORDS) {
    if (lower.includes(kw)) {
      return "weak";
    }
  }

  return "none";
}

/**
 * Applies governing-first filter based on policy intent strength.
 *
 * Strong intent: hard filter to governing docs only (if available)
 * Weak intent: soft preference via score multiplier (don't filter)
 * None: no change
 */
function applyGoverningFirstFilter(candidates, query) {
  const intentStrength = getPolicyIntentStrength(query);

  if (intentStrength === "none") {
    return { candidates, intentStrength, filtered: false };
  }

  if (intentStrength === "weak") {
    // Soft preference: boost governing scores by 1.2x instead of hard filtering
    // This is already handled by AUTHORITY_BIAS, so just return as-is
    return { candidates, intentStrength, filtered: false };
  }

  // Strong intent: hard filter to governing docs
  const governingCandidates = candidates.filter((c) => c.doc.authority_band === "governing");

  if (governingCandidates.length > 0) {
    const maxGoverningScore = Math.max(...governingCandidates.map((c) => c.score));
    const topScore = Math.max(...candidates.map((c) => c.score));

    // Only hard filter if governing docs have decent scores (at least 40% of top)
    if (maxGoverningScore >= topScore * 0.4) {
      return { candidates: governingCandidates, intentStrength, filtered: true };
    }
  }

  // No good governing docs, fall back to all candidates
  return { candidates, intentStrength, filtered: false };
}

/**
 * Ranks candidates by score with tie-breaking.
 */
function rankCandidates(candidates) {
  return candidates.sort((a, b) => {
    // Primary: score (descending)
    if (b.score !== a.score) return b.score - a.score;

    // Tie-breaker 1: authority band
    const authorityOrder = { governing: 0, operational: 1, "non-governing": 2 };
    const aAuth = authorityOrder[a.doc.authority_band] ?? 1;
    const bAuth = authorityOrder[b.doc.authority_band] ?? 1;
    if (aAuth !== bAuth) return aAuth - bAuth;

    // Tie-breaker 2: stability
    const stabilityOrder = { stable: 0, semi_stable: 1, evolving: 2, deprecated: 3 };
    const aStab = stabilityOrder[a.doc.stability] ?? 2;
    const bStab = stabilityOrder[b.doc.stability] ?? 2;
    return aStab - bStab;
  });
}

// ============================================================================
// HEADING SELECTION
// ============================================================================

/**
 * Selects the best heading to extract based on query.
 */
function selectTargetHeading(doc, tokens, quotedPhrases) {
  if (!doc.headings || doc.headings.length === 0) {
    return null;
  }

  // Check for quoted phrase match first
  for (const phrase of quotedPhrases) {
    const match = doc.headings.find((h) => h.level >= 2 && h.text.toLowerCase().includes(phrase));
    if (match) return match;
  }

  // Check for keyword-based priority section override
  const queryLower = tokens.join(" ");
  for (const [keyword, sectionKey] of Object.entries(KEYWORD_SECTION_MAP)) {
    if (queryLower.includes(keyword)) {
      const prioritySection = PRIORITY_SECTIONS[sectionKey];
      const match = doc.headings.find(
        (h) => h.text.toLowerCase() === prioritySection.toLowerCase(),
      );
      if (match) return match;
    }
  }

  // Score headings by token overlap
  let bestHeading = null;
  let bestScore = 0;

  for (const heading of doc.headings) {
    if (heading.level < 2) continue; // Skip H1

    let headingScore = 0;
    const headingLower = heading.text.toLowerCase();

    for (const token of tokens) {
      if (headingLower.includes(token)) {
        headingScore += 1;
      }
    }

    if (headingScore > bestScore) {
      bestScore = headingScore;
      bestHeading = heading;
    }
  }

  // If no token match, return first H2 as fallback
  if (!bestHeading) {
    bestHeading = doc.headings.find((h) => h.level === 2) || doc.headings[0];
  }

  return bestHeading;
}

// ============================================================================
// FRONTMATTER DETECTION
// ============================================================================

/**
 * Finds the line number where frontmatter ends (0-based).
 * Returns 0 if no frontmatter present.
 */
function findFrontmatterEnd(lines) {
  if (lines.length === 0) return 0;
  if (lines[0].trim() !== "---") return 0;

  // Find closing ---
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      return i + 1; // Return line after closing ---
    }
  }

  return 0; // No closing ---, assume no frontmatter
}

// ============================================================================
// EXCERPT EXTRACTION
// ============================================================================

/**
 * Extracts a section of a file by heading line number.
 * Finds the end by looking for the next heading at same or higher level.
 * ALWAYS skips frontmatter.
 */
function extractExcerpt(filePath, targetHeading, allHeadings) {
  const fullPath = join(ROOT, filePath);
  if (!existsSync(fullPath)) {
    return { excerpt: null, error: "File not found" };
  }

  const content = readFileSync(fullPath, "utf8");
  const lines = content.split("\n");

  // Find where frontmatter ends
  const bodyStartLine = findFrontmatterEnd(lines);

  // Ensure we never start before the body
  const startLine = Math.max(targetHeading.line - 1, bodyStartLine); // 0-based

  // Find end line (next heading at same or higher level)
  let endLine = lines.length;
  for (const h of allHeadings) {
    if (h.line > targetHeading.line && h.level <= targetHeading.level) {
      endLine = h.line - 2; // Stop before the next heading
      break;
    }
  }

  // Extract lines
  let excerptLines = lines.slice(startLine, endLine + 1);

  // Apply limits
  let clipped = false;
  let charCount = excerptLines.join("\n").length;

  if (excerptLines.length > MAX_EXCERPT_LINES) {
    excerptLines = excerptLines.slice(0, MAX_EXCERPT_LINES);
    clipped = true;
  }

  if (charCount > MAX_EXCERPT_CHARS) {
    // Trim to char limit
    let totalChars = 0;
    let cutoffIdx = excerptLines.length;
    for (let i = 0; i < excerptLines.length; i++) {
      totalChars += excerptLines[i].length + 1; // +1 for newline
      if (totalChars > MAX_EXCERPT_CHARS) {
        cutoffIdx = i;
        break;
      }
    }
    excerptLines = excerptLines.slice(0, cutoffIdx);
    clipped = true;
  }

  const excerpt = excerptLines.join("\n").trim();
  const suffix = clipped ? "\n\n[…clipped…]" : "";

  return {
    excerpt: excerpt + suffix,
    startLine: startLine + 1,
    endLine: startLine + excerptLines.length,
    clipped,
  };
}

// ============================================================================
// MAIN SEARCH FUNCTION
// ============================================================================

/**
 * Searches the docs index and returns matching documents with excerpts.
 *
 * @param {string} query - The search query
 * @param {object} options - { maxResults, includeExcerpts, debug }
 * @returns {object} - { results, debug }
 */
export function searchDocs(query, options = {}) {
  const { maxResults = DEFAULT_RESULTS, includeExcerpts = true, debug = false } = options;

  // Load index
  if (!existsSync(INDEX_PATH)) {
    return {
      status: "INSUFFICIENT_EVIDENCE",
      error: "Docs index not found. Run: npm run docs:index",
      results: [],
    };
  }

  const index = JSON.parse(readFileSync(INDEX_PATH, "utf8"));

  // Normalize query
  const { tokens, quotedPhrases } = normalizeQuery(query);

  if (tokens.length === 0 && quotedPhrases.length === 0) {
    return {
      status: "INSUFFICIENT_EVIDENCE",
      error: "Query is empty after normalization",
      results: [],
    };
  }

  // Score all documents
  const scored = [];
  for (const doc of index.documents) {
    const { score, matches } = scoreDocument(doc, tokens, quotedPhrases);
    if (score >= MIN_SCORE) {
      scored.push({ doc, score, matches });
    }
  }

  // Apply governing-first filter for policy questions
  const filterResult = applyGoverningFirstFilter(scored, query);
  const filtered = filterResult.candidates;

  // Rank and filter
  const ranked = rankCandidates(filtered);
  const topK = ranked.slice(0, TOP_K);
  const results = topK.slice(0, maxResults);

  // Extract excerpts for top results
  const enrichedResults = results.map((r) => {
    const targetHeading = selectTargetHeading(r.doc, tokens, quotedPhrases);
    let excerpt = null;
    let excerptMeta = null;

    if (includeExcerpts && targetHeading) {
      const extracted = extractExcerpt(r.doc.path, targetHeading, r.doc.headings);
      excerpt = extracted.excerpt;
      excerptMeta = {
        heading: targetHeading.text,
        startLine: extracted.startLine,
        endLine: extracted.endLine,
        clipped: extracted.clipped,
      };
    }

    return {
      path: r.doc.path,
      title: r.doc.title,
      authority_band: r.doc.authority_band,
      score: r.score,
      targetHeading: targetHeading?.text || null,
      excerpt,
      excerptMeta,
      ...(debug ? { matches: r.matches } : {}),
    };
  });

  const debugInfo = debug
    ? {
        query_tokens: tokens,
        quoted_phrases: quotedPhrases,
        candidates_above_threshold: scored.length,
        candidates_after_filter: filtered.length,
        top_k_considered: topK.length,
        policy_intent_strength: filterResult.intentStrength,
        governing_first_applied: filterResult.filtered,
      }
    : null;

  return {
    status: enrichedResults.length > 0 ? "FOUND" : "NO_MATCHES",
    results: enrichedResults,
    ...(debug ? { debug: debugInfo } : {}),
  };
}

/**
 * Formats search results into Librarian response format.
 * Uses query tokens to select the most relevant quotes.
 */
export function formatLibrarianResponse(searchResult, query) {
  if (searchResult.status === "NO_MATCHES" || searchResult.results.length === 0) {
    return {
      status: "INSUFFICIENT_EVIDENCE",
      answer: `No documents found matching query: "${query}"`,
      evidence: [],
      sources: [],
      next: {
        missing: "No matching documents in the index",
        where: "Try searching canon/, odd/, or docs/ directories",
        what: `Search for: ${query}`,
      },
    };
  }

  // Get query tokens for relevance scoring
  const { tokens: queryTokens } = normalizeQuery(query);

  const results = searchResult.results;
  const answer = `Found ${results.length} relevant document(s) for: "${query}"`;

  // Extract evidence using query-aware quote selection
  const evidence = results
    .filter((r) => r.excerpt)
    .map((r) => {
      // Use extractBestQuote from renderer (handles frontmatter, relevance, cleaning)
      const quote = extractBestQuote(r.excerpt, queryTokens);
      return {
        quote: quote || r.excerpt.slice(0, 200), // Fallback to excerpt start
        path: r.path,
        heading: r.targetHeading,
      };
    })
    .filter((e) => e.quote && e.quote.length > 0); // Remove empty quotes

  const sources = results.map((r) => ({
    path: r.path,
    title: r.title,
    authority_band: r.authority_band,
    heading: r.targetHeading,
  }));

  // Only return SUPPORTED if we have valid evidence
  const status = evidence.length >= 2 ? "SUPPORTED" : "INSUFFICIENT_EVIDENCE";

  // Generate "Read Next" navigation pointers
  const readNext = generateReadNextPointers(results, searchResult);

  const response = {
    status,
    answer,
    evidence,
    sources,
    readNext,
    excerpts: results.map((r) => ({
      path: r.path,
      heading: r.targetHeading,
      content: r.excerpt,
      lines: r.excerptMeta,
    })),
  };

  // Add next step if insufficient evidence
  if (status === "INSUFFICIENT_EVIDENCE") {
    response.next = {
      missing: "Not enough valid quotes extracted from matching documents",
      where: "Try more specific query terms or check the source documents directly",
      what: `Refine search: ${query}`,
    };
  }

  return response;
}

/**
 * Generates "Read Next" navigation pointers for follow-up reading.
 * Suggests related docs or deeper sections based on the results.
 */
function generateReadNextPointers(results, searchResult) {
  const pointers = [];

  if (!results || results.length === 0) return pointers;

  // First: suggest a related heading in the primary doc (if not already shown)
  const primaryResult = results[0];
  if (primaryResult.excerpt) {
    // Suggest a deeper section within the same doc
    const otherHeadings = searchResult.results?.find(
      (r) => r.path === primaryResult.path,
    )?.excerptMeta;
    // For now, just reference the doc itself for deeper reading
  }

  // Second: suggest a related doc if multiple results exist
  if (results.length > 1) {
    const secondResult = results[1];
    if (secondResult.path !== primaryResult.path) {
      pointers.push({
        path: secondResult.path,
        heading: secondResult.targetHeading,
        reason: "Related context",
      });
    }
  }

  // Third: suggest governing doc if current result is operational
  if (primaryResult.authority_band === "operational") {
    // Look for a governing doc in the results that wasn't primary
    const governingDoc = results.find(
      (r) => r.authority_band === "governing" && r.path !== primaryResult.path,
    );
    if (governingDoc) {
      pointers.push({
        path: governingDoc.path,
        heading: governingDoc.targetHeading,
        reason: "Governing policy",
      });
    }
  }

  // Fourth: if asking about a contract, suggest the parent README
  const parentReadme = primaryResult.path.replace(/\/[^/]+\.md$/, "/README.md");
  if (primaryResult.path.includes("contract") && parentReadme !== primaryResult.path) {
    pointers.push({
      path: parentReadme,
      heading: null,
      reason: "Overview",
    });
  }

  // Limit to 2 unique paths
  const seen = new Set();
  return pointers
    .filter((p) => {
      if (seen.has(p.path)) return false;
      seen.add(p.path);
      return true;
    })
    .slice(0, 2);
}

// extractFirstMeaningfulSentence removed - now using extractBestQuote from renderer

// ============================================================================
// CLI (for testing)
// ============================================================================

if (process.argv[1] && process.argv[1].endsWith("librarian.js")) {
  const query = process.argv.slice(2).join(" ") || "visual proof operating constraints";

  console.log(`\n📚 Librarian Search: "${query}"\n`);
  console.log("=".repeat(60) + "\n");

  const result = searchDocs(query, { debug: true });

  if (result.error) {
    console.log(`❌ Error: ${result.error}`);
  } else {
    console.log(`Status: ${result.status}`);
    console.log(`Results: ${result.results.length}`);
    if (result.debug) {
      console.log(`Tokens: ${result.debug.query_tokens.join(", ")}`);
      console.log(`Candidates above threshold: ${result.debug.candidates_above_threshold}`);
    }
    console.log("\n" + "-".repeat(60) + "\n");

    for (const r of result.results) {
      console.log(`📄 ${r.path}`);
      console.log(`   Title: ${r.title}`);
      console.log(`   Authority: ${r.authority_band}`);
      console.log(`   Score: ${r.score}`);
      console.log(`   Target Heading: ${r.targetHeading || "(none)"}`);
      if (r.excerpt) {
        console.log(`   Excerpt (${r.excerptMeta?.startLine}-${r.excerptMeta?.endLine}):`);
        const preview = r.excerpt.slice(0, 300).replace(/\n/g, "\n      ");
        console.log(`      ${preview}${r.excerpt.length > 300 ? "..." : ""}`);
      }
      console.log();
    }
  }
}
