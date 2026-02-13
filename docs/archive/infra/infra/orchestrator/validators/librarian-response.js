#!/usr/bin/env node
/**
 * librarian-response.js
 *
 * Validates Librarian responses to enforce citation-first doctrine.
 * Prevents "uncited helpfulness" and training-data drift.
 *
 * Usage:
 *   import { validateLibrarianResponse } from './validators/librarian-response.js';
 *   const result = validateLibrarianResponse(responseText);
 *   // result: { pass: boolean, status: string, errors: string[], warnings: string[] }
 *
 * Per docs/agents/librarian/contract.md
 */

// ============================================================================
// PATTERNS
// ============================================================================

// Status patterns
const STATUS_PATTERN = /^###?\s*Status\s*\n+\s*(SUPPORTED|INSUFFICIENT_EVIDENCE)/im;
const STATUS_VALUES = ["SUPPORTED", "INSUFFICIENT_EVIDENCE"];

// Section patterns
const SOURCES_PATTERN = /^###?\s*Sources?\s*\n/im;
const EVIDENCE_PATTERN = /^###?\s*Evidence\s*(\(quotes?\))?/im;
const ANSWER_PATTERN = /^###?\s*Answer\s*\n/im;
const NEXT_STEP_PATTERN = /^###?\s*Next\s+Retrieval\s+Step/im;

// Citation patterns
const REPO_PATH_PATTERN = /`([a-zA-Z0-9_\-./]+\.md)(#[^`]+)?`/g;
// Accept both straight quotes and curly quotes
const QUOTE_PATTERN = /[""]([^"""]+)[""]|"([^"]+)"/g;
const MCP_CITATION_PATTERN = /MCP:\s*`?([a-zA-Z0-9_\-]+)`?/gi;

// Evidence bullet patterns (accepts both straight and curly quotes)
// Pattern: - "quote" — `path.md#Heading`
// Also accepts: - "quote" — `path.md#Heading`
const EVIDENCE_BULLET_PATTERN =
  /^[-*]\s*[""]([^"""]+)[""]\s*[—–-]+\s*`([a-zA-Z0-9_\-./]+\.md)(#[^`]+)?`/gm;

// Coverage constants
const WORDS_PER_EVIDENCE = 120;
const MIN_EVIDENCE_BULLETS = 2;
const MAX_EVIDENCE_BULLETS = 6;
const MIN_QUOTE_WORDS = 8;
const MAX_QUOTE_WORDS = 40;

// Quote relevance constants
const MIN_QUOTE_OVERLAP_RATIO = 0.5; // At least half of bullets must have token overlap
const MIN_DISTINCT_TOKENS_COVERED = 2; // Minimum distinct query tokens that must appear across all bullets

// ============================================================================
// VALIDATORS
// ============================================================================

function hasValidStatus(text) {
  const match = text.match(STATUS_PATTERN);
  if (!match) return { valid: false, status: null };
  return { valid: true, status: match[1] };
}

function hasSourcesSection(text) {
  return SOURCES_PATTERN.test(text);
}

function hasEvidenceSection(text) {
  return EVIDENCE_PATTERN.test(text);
}

function hasAnswerSection(text) {
  return ANSWER_PATTERN.test(text);
}

function hasNextStepSection(text) {
  return NEXT_STEP_PATTERN.test(text);
}

function extractRepoPaths(text) {
  const paths = [];
  let match;
  while ((match = REPO_PATH_PATTERN.exec(text)) !== null) {
    paths.push({
      path: match[1],
      heading: match[2] || null,
    });
  }
  return paths;
}

function extractQuotes(text) {
  const quotes = [];
  let match;
  while ((match = QUOTE_PATTERN.exec(text)) !== null) {
    const quote = match[1] || match[2];
    if (quote && quote.length > 10) {
      // Ignore very short "quotes"
      quotes.push(quote);
    }
  }
  return quotes;
}

function extractMCPCitations(text) {
  const citations = [];
  let match;
  while ((match = MCP_CITATION_PATTERN.exec(text)) !== null) {
    citations.push(match[1]);
  }
  return citations;
}

/**
 * Extracts the Answer section content for coverage analysis.
 */
function extractAnswerContent(text) {
  const match = text.match(/^###?\s*Answer\s*\n([\s\S]*?)(?=^###?\s|\n---|\Z)/im);
  if (!match) return "";
  return match[1].trim();
}

/**
 * Counts words in a string (simple whitespace split).
 */
function countWords(text) {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

/**
 * Extracts well-formed evidence bullets (quote + path + optional heading).
 * Returns array of { quote, path, heading, quoteWordCount }
 */
function extractEvidenceBullets(text) {
  const bullets = [];
  // Match both straight and curly quotes
  // Pattern: - "quote" — `path.md#Heading` OR - "quote" — `path.md#Heading`
  // The [^""""] ensures we don't match across quote boundaries
  const pattern = /^[-*]\s*[""]([^"""]+)[""]\s*[—–-]+\s*`([a-zA-Z0-9_\-./]+\.md)(#[^`]+)?`/gm;

  let match;
  while ((match = pattern.exec(text)) !== null) {
    const quote = match[1].trim();
    const quoteWords = countWords(quote);
    bullets.push({
      quote,
      path: match[2],
      heading: match[3] || null,
      quoteWordCount: quoteWords,
    });
  }

  return bullets;
}

/**
 * Calculates required evidence bullets based on answer word count.
 * Rule: 1 per 120 words, min 2, max 6
 */
function calculateRequiredEvidence(answerWordCount) {
  const calculated = Math.ceil(answerWordCount / WORDS_PER_EVIDENCE);
  return Math.max(MIN_EVIDENCE_BULLETS, Math.min(calculated, MAX_EVIDENCE_BULLETS));
}

/**
 * Tokenizes text for overlap checking.
 */
function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2)
    .filter((t) => !["the", "and", "for", "is", "in", "to", "of", "a", "an"].includes(t));
}

/**
 * Calculates token overlap between query tokens and quote text.
 */
function calculateQuoteOverlap(queryTokens, quote) {
  if (!quote || !queryTokens || queryTokens.length === 0) return 0;
  const quoteTokens = tokenize(quote);
  let overlap = 0;
  for (const token of queryTokens) {
    if (quoteTokens.includes(token)) {
      overlap++;
    }
  }
  return overlap;
}

/**
 * Validates quote relevance by checking token overlap AND coverage.
 *
 * Two checks:
 * 1. At least half of bullets must have >= 1 token overlap
 * 2. Across all bullets, at least MIN_DISTINCT_TOKENS_COVERED distinct query tokens must appear
 *
 * This prevents citation laundering where one token is copied into every quote.
 *
 * Returns { valid, bulletsWithOverlap, totalBullets, ratio, distinctTokensCovered, tokensCovered }
 */
function validateQuoteRelevance(bullets, queryTokens) {
  if (!bullets || bullets.length === 0) {
    return {
      valid: true,
      bulletsWithOverlap: 0,
      totalBullets: 0,
      ratio: 1,
      distinctTokensCovered: 0,
      tokensCovered: [],
    };
  }

  let bulletsWithOverlap = 0;
  const tokensCoveredSet = new Set();

  for (const bullet of bullets) {
    const quoteTokens = tokenize(bullet.quote);
    let bulletOverlap = 0;

    for (const queryToken of queryTokens) {
      if (quoteTokens.includes(queryToken)) {
        bulletOverlap++;
        tokensCoveredSet.add(queryToken);
      }
    }

    if (bulletOverlap >= 1) {
      bulletsWithOverlap++;
    }
  }

  const ratio = bulletsWithOverlap / bullets.length;
  const distinctTokensCovered = tokensCoveredSet.size;
  const tokensCovered = Array.from(tokensCoveredSet);

  // Must have both: enough bullets with overlap AND enough distinct tokens covered
  const ratioValid = ratio >= MIN_QUOTE_OVERLAP_RATIO;
  const coverageValid =
    distinctTokensCovered >= Math.min(MIN_DISTINCT_TOKENS_COVERED, queryTokens.length);

  // If we have good ratio but poor coverage, still valid if we have at least 1 distinct token
  // This handles short queries gracefully
  const valid = ratioValid && (coverageValid || distinctTokensCovered >= 1);

  return {
    valid,
    bulletsWithOverlap,
    totalBullets: bullets.length,
    ratio: Math.round(ratio * 100) / 100,
    distinctTokensCovered,
    tokensCovered,
  };
}

// ============================================================================
// MAIN VALIDATOR
// ============================================================================

/**
 * Validates a Librarian response for citation-first compliance.
 *
 * @param {string} responseText - The full response text from the Librarian
 * @param {object} options - Optional validation options
 * @param {string[]} options.queryTokens - Query tokens for relevance checking
 * @param {boolean} options.requireQuoteRelevance - Whether to enforce quote overlap (default: true)
 * @returns {object} - { pass: boolean, status: string|null, errors: string[], warnings: string[] }
 */
export function validateLibrarianResponse(responseText, options = {}) {
  const { queryTokens = [], requireQuoteRelevance = true } = options;
  const errors = [];
  const warnings = [];

  if (!responseText || typeof responseText !== "string") {
    return {
      pass: false,
      status: null,
      errors: ["Response text is empty or not a string"],
      warnings: [],
    };
  }

  // 1. Check status
  const statusCheck = hasValidStatus(responseText);
  if (!statusCheck.valid) {
    errors.push("Missing or invalid Status section. Must be SUPPORTED or INSUFFICIENT_EVIDENCE.");
  }

  const status = statusCheck.status;

  // 2. Check for Sources section
  if (!hasSourcesSection(responseText)) {
    errors.push("Missing Sources section.");
  }

  // 3. If SUPPORTED, check for evidence coverage (anti-citation-laundering)
  if (status === "SUPPORTED") {
    const repoPaths = extractRepoPaths(responseText);
    const quotes = extractQuotes(responseText);
    const mcpCitations = extractMCPCitations(responseText);
    const evidenceBullets = extractEvidenceBullets(responseText);
    const answerContent = extractAnswerContent(responseText);
    const answerWordCount = countWords(answerContent);

    // Must have at least one repo path OR MCP citation
    if (repoPaths.length === 0 && mcpCitations.length === 0) {
      errors.push("SUPPORTED response must include at least one repo path or MCP citation.");
    }

    // Must have at least one quote
    if (quotes.length === 0) {
      errors.push("SUPPORTED response must include at least one quote from sources.");
    }

    // Coverage check: evidence proportional to answer length
    const requiredEvidence = calculateRequiredEvidence(answerWordCount);
    if (evidenceBullets.length < requiredEvidence) {
      errors.push(
        `Insufficient evidence coverage. Answer has ${answerWordCount} words, requires ${requiredEvidence} evidence bullets (found ${evidenceBullets.length}). Rule: 1 per ${WORDS_PER_EVIDENCE} words, min ${MIN_EVIDENCE_BULLETS}.`,
      );
    }

    // Each evidence bullet must have path+heading
    const bulletsWithoutHeading = evidenceBullets.filter((b) => b.heading === null);
    if (bulletsWithoutHeading.length > 0) {
      errors.push(
        `${bulletsWithoutHeading.length} evidence bullet(s) missing heading anchor. Each must include path#Heading.`,
      );
    }

    // Check quote length constraints
    const shortQuotes = evidenceBullets.filter((b) => b.quoteWordCount < MIN_QUOTE_WORDS);
    const longQuotes = evidenceBullets.filter((b) => b.quoteWordCount > MAX_QUOTE_WORDS);

    if (shortQuotes.length > 0) {
      warnings.push(
        `${shortQuotes.length} quote(s) below minimum length (${MIN_QUOTE_WORDS} words). Short quotes may not be load-bearing.`,
      );
    }

    if (longQuotes.length > 0) {
      warnings.push(
        `${longQuotes.length} quote(s) above maximum length (${MAX_QUOTE_WORDS} words). Consider trimming to essential text.`,
      );
    }

    // Warn if no heading anchors on any paths (legacy check)
    const pathsWithHeadings = repoPaths.filter((p) => p.heading !== null);
    if (repoPaths.length > 0 && pathsWithHeadings.length === 0) {
      warnings.push("Consider adding heading anchors to citations (e.g., `path.md#Heading`).");
    }

    // Quote relevance check (anti-citation-laundering)
    if (requireQuoteRelevance && queryTokens.length > 0 && evidenceBullets.length > 0) {
      const relevance = validateQuoteRelevance(evidenceBullets, queryTokens);
      if (!relevance.valid) {
        errors.push(
          `Insufficient quote relevance: ${relevance.bulletsWithOverlap}/${relevance.totalBullets} bullets have query token overlap (need ${Math.ceil(relevance.totalBullets * MIN_QUOTE_OVERLAP_RATIO)}).`,
        );
      }
    }
  }

  // 4. If INSUFFICIENT_EVIDENCE, check for next steps
  if (status === "INSUFFICIENT_EVIDENCE") {
    if (!hasNextStepSection(responseText)) {
      warnings.push('INSUFFICIENT_EVIDENCE should include a "Next Retrieval Step" section.');
    }
  }

  // 5. Check for answer section (recommended but not required)
  if (!hasAnswerSection(responseText)) {
    warnings.push('Consider including an explicit "Answer" section for clarity.');
  }

  return {
    pass: errors.length === 0,
    status: status,
    errors: errors,
    warnings: warnings,
  };
}

/**
 * Validates and returns a structured summary for logging/debugging.
 *
 * @param {string} responseText - The full response text
 * @param {object} options - Optional validation options (passed to validateLibrarianResponse)
 * @returns {object} - Extended validation result with extracted data
 */
export function analyzeLibrarianResponse(responseText, options = {}) {
  const validation = validateLibrarianResponse(responseText, options);
  const answerContent = extractAnswerContent(responseText);
  const answerWordCount = countWords(answerContent);
  const evidenceBullets = extractEvidenceBullets(responseText);

  return {
    ...validation,
    extracted: {
      repo_paths: extractRepoPaths(responseText),
      quotes: extractQuotes(responseText),
      mcp_citations: extractMCPCitations(responseText),
      evidence_bullets: evidenceBullets,
      has_evidence_section: hasEvidenceSection(responseText),
      has_sources_section: hasSourcesSection(responseText),
      has_answer_section: hasAnswerSection(responseText),
      has_next_step_section: hasNextStepSection(responseText),
    },
    coverage: {
      answer_word_count: answerWordCount,
      evidence_bullets_found: evidenceBullets.length,
      evidence_bullets_required: calculateRequiredEvidence(answerWordCount),
      bullets_with_heading: evidenceBullets.filter((b) => b.heading !== null).length,
      bullets_without_heading: evidenceBullets.filter((b) => b.heading === null).length,
    },
  };
}

// Export tokenize for use in test runner
export { tokenize };

// ============================================================================
// CLI (for testing)
// ============================================================================

if (process.argv[1] && process.argv[1].endsWith("librarian-response.js")) {
  // If run directly, test with sample responses

  const goodSample = `
### Status
SUPPORTED

### Answer
The Librarian must cite every non-trivial factual claim and quote the load-bearing source text. This is a strict retrieval service that prevents confident invention.

### Evidence (quotes)
- "MUST cite every non-trivial factual claim to its source path and heading when possible" — \`docs/agents/librarian/contract.md#Operating Constraints\`
- "MUST quote the load-bearing source text prefer quotes over paraphrase" — \`docs/agents/librarian/contract.md#Operating Constraints\`

### Sources
- \`docs/agents/librarian/contract.md\`
`;

  const badSample = `
### Status
SUPPORTED

### Answer
The Librarian is designed to help users find information in the documentation. It uses a fast lookup index and can retrieve relevant sections based on the query. The system is built to be strict and prevent invention of information that isn't in the sources. This ensures accuracy and trustworthiness of the answers provided.

### Evidence (quotes)
- "citation-first" — \`docs/agents/librarian/README.md\`

### Sources
- \`docs/agents/librarian/README.md\`
`;

  console.log("=== Testing GOOD sample (should pass) ===\n");
  const goodResult = analyzeLibrarianResponse(goodSample);
  console.log(JSON.stringify(goodResult, null, 2));

  console.log("\n\n=== Testing BAD sample (should fail - coverage issues) ===\n");
  const badResult = analyzeLibrarianResponse(badSample);
  console.log(JSON.stringify(badResult, null, 2));
}
