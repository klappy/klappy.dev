#!/usr/bin/env node
/**
 * validation.js
 *
 * Claims-to-evidence compiler for completion assertions.
 * Converts "done" claims into testable outcomes and validates evidence.
 *
 * Per docs/agents/validation/protocols/validation-protocol.md
 */

import { searchDocs, formatLibrarianResponse } from "./librarian.js";

// ============================================================================
// VERDICT TYPES
// ============================================================================

export const VERDICTS = {
  PASS: "PASS", // Evidence supports all claims
  NEEDS_ARTIFACTS: "NEEDS_ARTIFACTS", // Claims stated but evidence missing
  FAIL: "FAIL", // Evidence contradicts or disproves claims
  CLARIFY: "CLARIFY", // Claims are vague; rewrite needed
};

// ============================================================================
// EVIDENCE TYPES
// ============================================================================

export const EVIDENCE_TYPES = {
  SCREENSHOT: "screenshot",
  LOG: "log",
  LINK: "link",
  COMMAND: "command",
  FILE: "file",
};

// ============================================================================
// CLAIM PARSING
// ============================================================================

/**
 * Parses a completion message into structured claims.
 * Returns array of { id, statement, falsifiable, vague }
 */
export function parseClaims(message, context = {}) {
  const claims = [];
  let claimId = 1;

  // Extract explicit completion assertions
  const completionPatterns = [
    /(?:i|we)\s+(?:finished|completed|shipped|implemented|fixed|added|built)\s+(.+?)(?:\.|$)/gi,
    /(.+?)\s+(?:is|are)\s+(?:done|finished|ready|working|complete)(?:\.|$)/gi,
    /(?:pushed|merged|deployed)\s+(.+?)(?:\.|$)/gi,
  ];

  for (const pattern of completionPatterns) {
    let match;
    while ((match = pattern.exec(message)) !== null) {
      const statement = match[1].trim();
      if (statement.length > 3) {
        claims.push({
          id: `C${claimId++}`,
          statement: statement,
          original: match[0].trim(),
          falsifiable: !isVagueClaim(statement),
          vague: isVagueClaim(statement),
        });
      }
    }
  }

  // If no structured claims found, treat whole message as single claim
  if (claims.length === 0 && message.length > 10) {
    claims.push({
      id: "C1",
      statement: message,
      original: message,
      falsifiable: !isVagueClaim(message),
      vague: isVagueClaim(message),
    });
  }

  return claims;
}

/**
 * Checks if a claim statement is too vague to be falsifiable.
 */
function isVagueClaim(statement) {
  const vaguePatterns = [
    /^it$/i,
    /^this$/i,
    /^that$/i,
    /^everything$/i,
    /^all$/i,
    /^stuff$/i,
    /^things$/i,
    /works$/i, // "it works" without specifying what
  ];

  const lower = statement.toLowerCase();
  return vaguePatterns.some((p) => p.test(lower)) && statement.split(/\s+/).length < 4;
}

// ============================================================================
// EVIDENCE REQUIREMENTS
// ============================================================================

/**
 * Maps claims to required evidence types.
 * Uses heuristics based on claim content.
 */
export function mapClaimsToEvidence(claims) {
  const requirements = [];

  for (const claim of claims) {
    const evidenceNeeded = [];
    const lower = claim.statement.toLowerCase();

    // UI/visual claims need screenshots
    if (/ui|button|form|page|screen|display|render|show|visual|layout|style/i.test(lower)) {
      evidenceNeeded.push({
        type: EVIDENCE_TYPES.SCREENSHOT,
        description: "Screenshot of rendered UI state",
      });
    }

    // Test claims need command output
    if (/test|spec|coverage|pass|fail|assert/i.test(lower)) {
      evidenceNeeded.push({
        type: EVIDENCE_TYPES.COMMAND,
        description: "Test command output (e.g., npm test)",
      });
    }

    // Build/compile claims need logs
    if (/build|compile|bundle|deploy|ship/i.test(lower)) {
      evidenceNeeded.push({
        type: EVIDENCE_TYPES.LOG,
        description: "Build/deployment log output",
      });
    }

    // PR/commit claims need links
    if (/pr|pull request|commit|merge|push/i.test(lower)) {
      evidenceNeeded.push({
        type: EVIDENCE_TYPES.LINK,
        description: "Link to PR or commit",
      });
    }

    // File creation claims need file paths
    if (/create|add|file|document|write/i.test(lower)) {
      evidenceNeeded.push({
        type: EVIDENCE_TYPES.FILE,
        description: "Path to created file(s)",
      });
    }

    // Default: require at least one evidence type
    if (evidenceNeeded.length === 0) {
      evidenceNeeded.push({
        type: EVIDENCE_TYPES.LOG,
        description: "Command output or verification log",
      });
    }

    requirements.push({
      claim_id: claim.id,
      evidence: evidenceNeeded,
    });
  }

  return requirements;
}

// ============================================================================
// ARTIFACT PARSING
// ============================================================================

/**
 * Extracts provided artifacts from message and context.
 * Looks for file paths, URLs, code blocks, etc.
 */
export function extractProvidedArtifacts(message, context = {}) {
  const artifacts = [];

  // File paths (handles paths after colons, in backticks, or standalone)
  const pathPatterns = [
    /(?:^|\s|:|`)([a-zA-Z0-9_\-./]+\.(png|jpg|gif|md|js|ts|json|txt|log|html|css))(?:\s|$|[,)`])/gi,
    /`([a-zA-Z0-9_\-./]+)`/g, // Backtick-wrapped paths
  ];

  let match;
  for (const pathPattern of pathPatterns) {
    while ((match = pathPattern.exec(message)) !== null) {
      const path = match[1];
      // Determine if it's a screenshot based on extension
      const isImage = /\.(png|jpg|gif|webp)$/i.test(path);
      artifacts.push({
        type: isImage ? EVIDENCE_TYPES.SCREENSHOT : EVIDENCE_TYPES.FILE,
        value: path,
        provenance: "extracted from message",
      });
    }
  }

  // URLs
  const urlPattern = /https?:\/\/[^\s<>"{}|\\^`[\]]+/g;
  while ((match = urlPattern.exec(message)) !== null) {
    artifacts.push({
      type: EVIDENCE_TYPES.LINK,
      value: match[0],
      provenance: "extracted from message",
    });
  }

  // Command outputs (code blocks)
  const codeBlockPattern = /```(?:\w+)?\n([\s\S]*?)```/g;
  while ((match = codeBlockPattern.exec(message)) !== null) {
    artifacts.push({
      type: EVIDENCE_TYPES.LOG,
      value: match[1].slice(0, 500), // Truncate for summary
      provenance: "code block in message",
    });
  }

  // Context-provided artifacts
  if (context.artifacts) {
    for (const artifact of context.artifacts) {
      artifacts.push({
        type: artifact.type || EVIDENCE_TYPES.FILE,
        value: artifact.path || artifact.value,
        provenance: "provided in context",
      });
    }
  }

  return artifacts;
}

// ============================================================================
// EVIDENCE MATCHING
// ============================================================================

/**
 * Matches provided artifacts to required evidence.
 * Returns { matched, gaps }
 */
export function matchEvidence(requirements, artifacts) {
  const matched = [];
  const gaps = [];

  for (const req of requirements) {
    const claimMatches = [];
    const claimGaps = [];

    for (const evidenceReq of req.evidence) {
      // Find matching artifact
      const match = artifacts.find((a) => a.type === evidenceReq.type);

      if (match) {
        claimMatches.push({
          claim_id: req.claim_id,
          type: evidenceReq.type,
          artifact: match.value,
          provenance: match.provenance,
        });
      } else {
        claimGaps.push({
          claim_id: req.claim_id,
          type: evidenceReq.type,
          missing: evidenceReq.description,
        });
      }
    }

    matched.push(...claimMatches);
    gaps.push(...claimGaps);
  }

  return { matched, gaps };
}

// ============================================================================
// VERDICT DETERMINATION
// ============================================================================

/**
 * Determines the validation verdict based on claims, evidence, and gaps.
 */
export function determineVerdict(claims, matched, gaps) {
  // If any claims are vague, need clarification first
  const vagueClaims = claims.filter((c) => c.vague);
  if (vagueClaims.length > 0 && vagueClaims.length === claims.length) {
    return VERDICTS.CLARIFY;
  }

  // If all claims have matching evidence and no gaps
  if (gaps.length === 0 && matched.length > 0) {
    return VERDICTS.PASS;
  }

  // If we have some matches but also gaps
  if (matched.length > 0 && gaps.length > 0) {
    return VERDICTS.NEEDS_ARTIFACTS;
  }

  // If no evidence at all
  if (matched.length === 0) {
    return VERDICTS.NEEDS_ARTIFACTS;
  }

  return VERDICTS.NEEDS_ARTIFACTS;
}

// ============================================================================
// DOD RETRIEVAL (via Librarian)
// ============================================================================

/**
 * Retrieves the Definition of Done from the Librarian.
 * Returns the formatted response for context.
 */
export async function retrieveDoD() {
  const query = "What is the definition of done?";
  const searchResult = searchDocs(query, { maxResults: 1 });
  return formatLibrarianResponse(searchResult, query);
}

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

/**
 * Validates a completion claim.
 *
 * @param {string} message - The user's completion message
 * @param {object} context - Additional context (artifacts, session state)
 * @returns {object} - Validation result with verdict, claims, evidence, gaps, next_steps
 */
export function validateCompletion(message, context = {}) {
  // 1. Parse claims from message
  const claims = parseClaims(message, context);

  // 2. Map claims to required evidence
  const requirements = mapClaimsToEvidence(claims);

  // 3. Extract provided artifacts
  const artifacts = extractProvidedArtifacts(message, context);

  // 4. Match evidence to requirements
  const { matched, gaps } = matchEvidence(requirements, artifacts);

  // 5. Determine verdict
  const verdict = determineVerdict(claims, matched, gaps);

  // 6. Generate next steps based on gaps
  const nextSteps = generateNextSteps(gaps, verdict);

  return {
    verdict,
    claims,
    evidence_required: requirements,
    evidence_provided: matched,
    gaps,
    next_steps: nextSteps,
  };
}

/**
 * Generates actionable next steps based on gaps.
 */
function generateNextSteps(gaps, verdict) {
  if (verdict === VERDICTS.PASS) {
    return ["Validation complete. All claims supported by evidence."];
  }

  if (verdict === VERDICTS.CLARIFY) {
    return [
      "Please restate your completion claim as a specific, testable outcome.",
      'Example: "The login form submits successfully on mobile Safari"',
    ];
  }

  const steps = [];
  const gapsByType = {};

  for (const gap of gaps) {
    gapsByType[gap.type] = gapsByType[gap.type] || [];
    gapsByType[gap.type].push(gap);
  }

  if (gapsByType[EVIDENCE_TYPES.SCREENSHOT]) {
    steps.push("Capture screenshot(s) of the rendered UI state");
  }
  if (gapsByType[EVIDENCE_TYPES.COMMAND]) {
    steps.push("Run test command and provide output (e.g., `npm test`)");
  }
  if (gapsByType[EVIDENCE_TYPES.LOG]) {
    steps.push("Provide build/deployment log output");
  }
  if (gapsByType[EVIDENCE_TYPES.LINK]) {
    steps.push("Include link to PR, commit, or deployment");
  }
  if (gapsByType[EVIDENCE_TYPES.FILE]) {
    steps.push("Provide path(s) to created/modified files");
  }

  return steps.length > 0 ? steps : ["Provide evidence artifacts to support your claims"];
}

// ============================================================================
// RESPONSE FORMATTING
// ============================================================================

/**
 * Formats a validation result into markdown.
 */
export function formatValidationResponse(result) {
  const lines = [];

  // Verdict
  lines.push("### Validation Result");
  lines.push("");
  lines.push(`**Verdict**: ${result.verdict}`);
  lines.push("");

  // Claims
  lines.push("### Claims");
  for (const claim of result.claims) {
    const status = claim.vague ? "(vague)" : "";
    lines.push(`- [${claim.id}] ${claim.statement} ${status}`);
  }
  lines.push("");

  // Evidence Required
  lines.push("### Evidence Required");
  for (const req of result.evidence_required) {
    for (const ev of req.evidence) {
      lines.push(`- [${req.claim_id}] ${ev.type}: ${ev.description}`);
    }
  }
  lines.push("");

  // Evidence Provided
  lines.push("### Evidence Provided");
  if (result.evidence_provided.length > 0) {
    for (const ev of result.evidence_provided) {
      lines.push(`- [${ev.claim_id}] ✅ ${ev.type}: ${ev.artifact}`);
    }
  } else {
    lines.push("- (none provided)");
  }
  lines.push("");

  // Gaps
  if (result.gaps.length > 0) {
    lines.push("### Gaps");
    for (const gap of result.gaps) {
      lines.push(`- [${gap.claim_id}] ❌ ${gap.type}: ${gap.missing}`);
    }
    lines.push("");
  }

  // Next Steps
  lines.push("### Next Steps");
  for (const step of result.next_steps) {
    lines.push(`- ${step}`);
  }

  return lines.join("\n");
}

// ============================================================================
// CLI (for testing)
// ============================================================================

if (process.argv[1] && process.argv[1].endsWith("validation.js")) {
  const testMessages = [
    "I finished the login form. It works now.",
    "Shipped the new dashboard. Here's the PR: https://github.com/foo/bar/pull/123",
    "Done with the API endpoint. Tests pass.",
    "it works",
    "Implemented the search feature with autocomplete. Screenshot: screenshots/search.png",
  ];

  console.log("\n🔍 Validation Service Test\n");
  console.log("=".repeat(60) + "\n");

  for (const msg of testMessages) {
    console.log(`Message: "${msg}"\n`);
    const result = validateCompletion(msg);
    console.log(formatValidationResponse(result));
    console.log("\n" + "-".repeat(60) + "\n");
  }
}
