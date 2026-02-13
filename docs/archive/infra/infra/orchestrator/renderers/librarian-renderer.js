#!/usr/bin/env node
/**
 * librarian-renderer.js
 *
 * Single canonical renderer for Librarian responses.
 * Takes structured JSON → outputs validated markdown format.
 *
 * This eliminates formatting bugs that cause validator false negatives.
 *
 * Per docs/agents/librarian/contract.md
 */

// ============================================================================
// QUOTE CLEANING
// ============================================================================

/**
 * Cleans and normalizes quote text for evidence bullets.
 *
 * Rules:
 * - Remove YAML-like lines (frontmatter contamination)
 * - Strip leading/trailing quote delimiters
 * - Replace internal double-quotes with single quotes
 * - Collapse whitespace
 * - Enforce 8-40 word bounds
 *
 * @param {string} raw - Raw quote text
 * @returns {string} - Cleaned quote, or empty string if invalid
 */
export function cleanQuote(raw) {
  if (!raw || typeof raw !== "string") return "";

  let text = raw;

  // Remove YAML-ish lines if they slipped through
  // (lines that look like "key: value" or "- item" at start)
  text = text
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      // Skip YAML key-value patterns
      if (/^[a-zA-Z0-9_-]+\s*:\s+/.test(trimmed)) return false;
      // Skip markdown horizontal rules
      if (/^---+$/.test(trimmed)) return false;
      // Skip empty lines
      if (trimmed === "") return false;
      return true;
    })
    .join(" ");

  // Normalize whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Strip leading/trailing quote punctuation (handles ", ", ', ')
  text = text
    .replace(/^["""'''`]+/, "")
    .replace(/["""'''`]+$/, "")
    .trim();

  // Replace internal double-quotes with single quotes to avoid delimiter clashes
  text = text.replace(/[""]/g, "'");

  // Remove markdown formatting that might confuse things
  text = text.replace(/\*\*/g, ""); // bold
  text = text.replace(/\*/g, ""); // italic
  text = text.replace(/`/g, "'"); // backticks

  // Enforce word bounds (8–40)
  const words = text.split(" ").filter(Boolean);
  if (words.length < 8) return ""; // too short to be load-bearing
  if (words.length > 40) {
    text = words.slice(0, 40).join(" ") + "…";
  }

  return text;
}

/**
 * Extracts the best quote from an excerpt based on query relevance.
 *
 * Hierarchy:
 * 1. Sentences containing query tokens
 * 2. First valid sentence in the excerpt
 *
 * @param {string} excerpt - The full excerpt text
 * @param {string[]} queryTokens - Normalized query tokens
 * @returns {string} - Best quote, or empty string if none found
 */
export function extractBestQuote(excerpt, queryTokens = []) {
  if (!excerpt) return "";

  // Split into sentences (basic heuristic)
  const sentences = excerpt.match(/[^.!?\n]+[.!?]+/g) || [];

  // Also try splitting on newlines for bullet-point style content
  const lines = excerpt.split("\n").filter((l) => l.trim().length > 20);

  const candidates = [...sentences, ...lines];

  // Score each candidate by query token overlap
  const scored = candidates.map((sentence) => {
    const lower = sentence.toLowerCase();
    let score = 0;

    for (const token of queryTokens) {
      if (lower.includes(token)) {
        score += 1;
      }
    }

    const cleaned = cleanQuote(sentence);
    // Bonus for valid length
    if (cleaned.length > 0) score += 0.5;

    return { sentence, cleaned, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Return first valid cleaned quote
  for (const { cleaned } of scored) {
    if (cleaned.length > 0) {
      return cleaned;
    }
  }

  // Fallback: try cleaning the whole excerpt
  return cleanQuote(excerpt.slice(0, 500));
}

// ============================================================================
// CITATION FORMATTING
// ============================================================================

/**
 * Formats a citation path with optional heading.
 *
 * @param {string} path - File path
 * @param {string} heading - Optional heading (without #)
 * @returns {string} - Formatted citation
 */
export function formatCitation(path, heading) {
  if (!path) return "";

  // Clean the heading (remove extra whitespace, normalize)
  let cleanHeading = "";
  if (heading) {
    cleanHeading = heading
      .replace(/^#+\s*/, "") // Remove leading # if present
      .replace(/\s+/g, " ")
      .trim();
  }

  return cleanHeading ? `${path}#${cleanHeading}` : path;
}

// ============================================================================
// RESPONSE RENDERING
// ============================================================================

/**
 * Renders a structured Librarian response to canonical markdown format.
 *
 * @param {object} response - Structured response object
 * @param {string} response.status - "SUPPORTED" | "INSUFFICIENT_EVIDENCE"
 * @param {string} response.answer - Answer text
 * @param {Array} response.evidence - Array of {quote, path, heading}
 * @param {Array} response.sources - Array of source paths or objects
 * @param {object} response.next - Next retrieval step (if insufficient)
 * @param {Array} response.readNext - Array of {path, heading} for navigation
 * @returns {string} - Rendered markdown
 */
export function renderLibrarianResponse(response) {
  const lines = [];

  // Status
  lines.push("### Status");
  lines.push(response.status || "INSUFFICIENT_EVIDENCE");
  lines.push("");

  // Answer
  lines.push("### Answer");
  lines.push(response.answer || "No answer available.");
  lines.push("");

  // Evidence (only for SUPPORTED)
  if (response.status === "SUPPORTED" && response.evidence?.length > 0) {
    lines.push("### Evidence (quotes)");

    for (const e of response.evidence) {
      const quote = typeof e === "string" ? e : e.quote;
      const path = typeof e === "string" ? "" : e.path;
      const heading = typeof e === "string" ? "" : e.heading;

      // Clean the quote
      const cleanedQuote = cleanQuote(quote);
      if (!cleanedQuote) continue; // Skip invalid quotes

      // Format citation
      const citation = formatCitation(path, heading);

      // Render bullet with curly quotes (canonical format)
      if (citation) {
        lines.push(`- "${cleanedQuote}" — \`${citation}\``);
      } else {
        lines.push(`- "${cleanedQuote}"`);
      }
    }

    lines.push("");
  }

  // Sources
  lines.push("### Sources");
  if (response.sources?.length > 0) {
    for (const s of response.sources) {
      if (typeof s === "string") {
        lines.push(`- \`${s}\``);
      } else {
        const citation = formatCitation(s.path, s.heading);
        lines.push(`- \`${citation}\``);
      }
    }
  } else {
    lines.push("- (none meeting citation requirements)");
  }
  lines.push("");

  // Next Retrieval Step (only for INSUFFICIENT_EVIDENCE)
  if (response.status === "INSUFFICIENT_EVIDENCE" && response.next) {
    lines.push("### Next Retrieval Step");
    if (typeof response.next === "string") {
      lines.push(response.next);
    } else {
      if (response.next.missing) {
        lines.push(`- **Missing**: ${response.next.missing}`);
      }
      if (response.next.where) {
        lines.push(`- **Where to look**: ${response.next.where}`);
      }
      if (response.next.what) {
        lines.push(`- **What to search**: ${response.next.what}`);
      }
    }
    lines.push("");
  }

  // Read Next (navigation pointers for SUPPORTED responses)
  if (response.status === "SUPPORTED" && response.readNext && response.readNext.length > 0) {
    lines.push("### Read Next");
    for (const item of response.readNext.slice(0, 2)) {
      // Max 2 items
      if (typeof item === "string") {
        lines.push(`- \`${item}\``);
      } else {
        const citation = formatCitation(item.path, item.heading);
        if (item.reason) {
          lines.push(`- \`${citation}\` — ${item.reason}`);
        } else {
          lines.push(`- \`${citation}\``);
        }
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ============================================================================
// CLI (for testing)
// ============================================================================

if (process.argv[1]?.endsWith("librarian-renderer.js")) {
  // Test with sample data
  const testResponse = {
    status: "SUPPORTED",
    answer: 'Found 2 relevant documents for: "What is the definition of done?"',
    evidence: [
      {
        quote:
          "I do not consider work complete unless it is verified with evidence. Reasoning alone is insufficient.",
        path: "canon/definition-of-done.md",
        heading: "📋 Definition of Done (DoD)",
      },
      {
        quote: 'tags: ["odd", "index"]', // This should be filtered out (too short after cleaning)
        path: "odd/index.md",
        heading: "Contents",
      },
      {
        quote:
          '"Let me explain why this is correct" is not proof. Explanations can be fluent and wrong.',
        path: "odd/terminology.md",
        heading: "What This Document Does NOT Define",
      },
    ],
    sources: [
      { path: "canon/definition-of-done.md", heading: "Definition of Done" },
      { path: "odd/terminology.md", heading: "Terminology" },
    ],
  };

  console.log("=== Testing cleanQuote ===\n");

  const testQuotes = [
    "I do not consider work complete unless it is verified with evidence.",
    'tags: ["odd", "index"]',
    '"Let me explain why this is correct" is not proof.',
    "stability: stable\ntags: [odd]\n\nActual content here that should be kept.",
    "Short.", // Too short
  ];

  for (const q of testQuotes) {
    const cleaned = cleanQuote(q);
    console.log(`Input:  "${q.slice(0, 50)}${q.length > 50 ? "..." : ""}"`);
    console.log(`Output: "${cleaned || "(empty - invalid)"}"`);
    console.log();
  }

  console.log("=== Testing renderLibrarianResponse ===\n");
  console.log(renderLibrarianResponse(testResponse));
}
