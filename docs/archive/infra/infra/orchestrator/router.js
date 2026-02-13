#!/usr/bin/env node
/**
 * router.js
 *
 * Minimal orchestrator router v0.
 * Detects lookup questions and routes to Librarian.
 *
 * Per docs/agents/README.md — "Routing: When to Call the Librarian"
 */

// ============================================================================
// ACTIONS
// ============================================================================

export const ACTIONS = {
  CALL_LIBRARIAN: "CALL_LIBRARIAN",
  CALL_VALIDATION: "CALL_VALIDATION",
  CONTINUE_WORKFLOW: "CONTINUE_WORKFLOW",
  ASK_FOR_ASSET: "ASK_FOR_ASSET",
  REFUSE: "REFUSE",
};

// ============================================================================
// LOOKUP DETECTION PATTERNS
// ============================================================================

// Intent keywords that indicate a lookup question
const LOOKUP_PATTERNS = [
  // Location queries
  /where\s+(is|are|can\s+i\s+find|do\s+i\s+find)/i,
  /where.*defined/i,
  /which\s+(doc|file|document)/i,

  // Rule/policy queries
  /what\s+(does|is)\s+(the\s+)?(rule|policy|constraint|requirement)/i,
  /what\s+does\s+(odd|canon)\s+say/i,
  /what\s+is\s+the\s+(odd|canon)/i,
  /show\s+me\s+the\s+(rule|constraint|policy|doc)/i,

  // Why queries (seeking governing docs)
  /why\s+(do|does|is|are|should|must)\s+we/i,
  /why\s+(is\s+)?(this|that)\s+(required|necessary|forbidden)/i,

  // How queries (seeking operational docs)
  /how\s+(do|does|should|must)\s+(i|we|one)/i,
  /how\s+is\s+(this|that)\s+(done|handled|implemented)/i,

  // Definition queries (article is optional so "What is CST?" works)
  /what\s+(is|are)\s+(?:(?:a|an|the)\s+)?\w+\??/i,
  /define\s+\w+/i,
  /definition\s+of/i,

  // Documentation navigation
  /which\s+doc.*should\s+i\s+read/i,
  /where.*documentation/i,
  /find.*in\s+the\s+(docs|documentation)/i,
];

// Explicit librarian triggers (exact phrases)
const EXPLICIT_TRIGGERS = [
  "what does odd say",
  "what does canon say",
  "show me the rule",
  "where is that defined",
  "which doc",
  "find the constraint",
  "find the rule",
  "cite the source",
];

// Negative patterns (things that should NOT go to librarian)
const NEGATIVE_PATTERNS = [
  /create\s+(a|an|the)/i,
  /write\s+(a|an|the)/i,
  /implement/i,
  /build/i,
  /generate/i,
  /make\s+(a|an|the)/i,
  /add\s+(a|an|the)/i,
  /fix\s+(this|the|a|an)/i,
  /update\s+(this|the|a|an)/i,
  /delete/i,
  /remove/i,
];

// ============================================================================
// COMPLETION DETECTION PATTERNS
// ============================================================================

// Completion keywords that trigger validation
const COMPLETION_PATTERNS = [
  /(?:i|we)\s+(?:finished|completed|shipped|implemented|fixed|built|added)\b/i,
  /^(?:finished|completed|shipped|implemented|fixed|built|added)\s+(?:the|a|an)?\s*\w+/i, // Without subject
  /(?:it's|its|that's|this\s+is)\s+(?:done|finished|ready|complete)\b/i,
  /\b(?:done|finished)\s+(?:with|the|implementing|building|fixing)/i,
  /\bshipped\s+(?:the|a|an)?\s*\w+/i,
  /(?:pushed|merged|deployed)\s+(?:the|a|an)?\s*\w+/i,
  /(?:it|this|that)\s+works?\s*(?:now|correctly|properly)?[.!]?\s*$/i,
  /\bit\s+works\b/i,
];

// Question patterns that should NOT trigger validation
const COMPLETION_QUESTION_PATTERNS = [
  /is\s+(?:it|this|that)\s+(?:done|finished|ready)/i,
  /(?:done|finished|ready)\s*\?/i,
  /should\s+(?:i|we)/i,
  /can\s+(?:i|we)/i,
];

// Planning patterns that should NOT trigger validation
const PLANNING_PATTERNS = [
  /(?:let's|let\s+us|we\s+should|we\s+could|i\s+think|maybe)\s/i,
  /(?:plan|planning|consider|thinking\s+about)/i,
  /(?:what\s+if|how\s+about|should\s+we)/i,
];

// ============================================================================
// COMPLETION DETECTION
// ============================================================================

/**
 * Detects if a message is a completion claim.
 *
 * @param {string} message - The user message
 * @returns {object} - { isCompletion: boolean, confidence: number, reason: string }
 */
function detectCompletionIntent(message) {
  const lower = message.toLowerCase().trim();

  // Check for question patterns first (not completion claims)
  for (const pattern of COMPLETION_QUESTION_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isCompletion: false,
        confidence: 0.9,
        reason: "Message is a question about completion, not a claim",
      };
    }
  }

  // Check for planning patterns (not completion claims)
  for (const pattern of PLANNING_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isCompletion: false,
        confidence: 0.85,
        reason: "Message appears to be planning, not completion assertion",
      };
    }
  }

  // Check for completion patterns
  for (const pattern of COMPLETION_PATTERNS) {
    if (pattern.test(message)) {
      // Additional check: must reference an outcome, not just say "done"
      const hasOutcome =
        message.length > 15 ||
        /(?:the|a|an)\s+\w+/i.test(message) ||
        /https?:\/\//i.test(message) ||
        /\.(png|jpg|gif|md|js|ts|json)/.test(message);

      if (hasOutcome) {
        return {
          isCompletion: true,
          confidence: 0.9,
          reason: `Completion pattern detected: ${pattern.toString()}`,
        };
      } else {
        return {
          isCompletion: true,
          confidence: 0.65,
          reason: "Short completion assertion - may need clarification",
        };
      }
    }
  }

  // Check for explicit "done" at end of message
  if (/\b(done|finished|shipped)\s*[.!]?\s*$/i.test(message)) {
    return {
      isCompletion: true,
      confidence: 0.7,
      reason: "Message ends with completion keyword",
    };
  }

  return {
    isCompletion: false,
    confidence: 0.5,
    reason: "No completion patterns detected",
  };
}

// ============================================================================
// INTENT DETECTION
// ============================================================================

/**
 * Detects if a message is a lookup question.
 *
 * @param {string} message - The user message
 * @returns {object} - { isLookup: boolean, confidence: number, reason: string }
 */
function detectLookupIntent(message) {
  const lower = message.toLowerCase().trim();

  // Check for explicit triggers first
  for (const trigger of EXPLICIT_TRIGGERS) {
    if (lower.includes(trigger)) {
      return {
        isLookup: true,
        confidence: 0.95,
        reason: `Explicit trigger: "${trigger}"`,
      };
    }
  }

  // Check for negative patterns (creation/action requests)
  for (const pattern of NEGATIVE_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isLookup: false,
        confidence: 0.9,
        reason: "Message appears to be an action request, not a lookup",
      };
    }
  }

  // Check for lookup patterns
  for (const pattern of LOOKUP_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isLookup: true,
        confidence: 0.85,
        reason: `Matched lookup pattern: ${pattern.toString()}`,
      };
    }
  }

  // Check for question marks + specific keywords
  if (message.includes("?")) {
    const keywords = ["rule", "constraint", "policy", "defined", "doc", "odd", "canon"];
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        return {
          isLookup: true,
          confidence: 0.7,
          reason: `Question containing keyword: "${kw}"`,
        };
      }
    }
  }

  // Default: not a lookup
  return {
    isLookup: false,
    confidence: 0.6,
    reason: "No lookup patterns detected",
  };
}

// ============================================================================
// MAIN ROUTER
// ============================================================================

/**
 * Routes a message to the appropriate action.
 *
 * Priority order:
 * 1. Completion claims → CALL_VALIDATION
 * 2. Lookup questions → CALL_LIBRARIAN
 * 3. Everything else → CONTINUE_WORKFLOW
 *
 * @param {string} message - The user message
 * @param {object} sessionState - Current session state (optional)
 * @returns {object} - { action, payload, debug }
 */
export function route(message, sessionState = {}) {
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return {
      action: ACTIONS.REFUSE,
      payload: { reason: "Empty message" },
      debug: null,
    };
  }

  // Check for completion claims first
  const completionResult = detectCompletionIntent(message);
  if (completionResult.isCompletion && completionResult.confidence >= 0.6) {
    return {
      action: ACTIONS.CALL_VALIDATION,
      payload: {
        message,
        confidence: completionResult.confidence,
      },
      debug: {
        completionIntent: completionResult,
      },
    };
  }

  // Check for lookup questions
  const lookupResult = detectLookupIntent(message);
  if (lookupResult.isLookup) {
    return {
      action: ACTIONS.CALL_LIBRARIAN,
      payload: {
        query: message,
        confidence: lookupResult.confidence,
      },
      debug: {
        lookupIntent: lookupResult,
      },
    };
  }

  // Default: continue with normal workflow
  return {
    action: ACTIONS.CONTINUE_WORKFLOW,
    payload: {
      message,
    },
    debug: {
      lookupIntent: lookupResult,
      completionIntent: completionResult,
    },
  };
}

// ============================================================================
// CLI (for testing)
// ============================================================================

if (process.argv[1] && process.argv[1].endsWith("router.js")) {
  const testMessages = [
    // Lookup questions
    "Where is the rule about visual proof?",
    "What does ODD say about metrics?",
    "Show me the constraint for citations",
    "What is the definition of done?",
    // Completion claims
    "I finished the login form.",
    "Shipped the new dashboard. Here's the PR: https://github.com/foo/bar/pull/123",
    "Done with the API endpoint.",
    "it works",
    "We implemented the search feature.",
    // Questions (not completion)
    "Is it done?",
    "Should we ship this?",
    // Planning (not completion)
    "Let's plan the next feature.",
    "I think we should refactor first.",
    // Action requests (neither)
    "Create a new document for me",
    "Build me a website",
  ];

  console.log("\n🚦 Router Test\n");
  console.log("=".repeat(60) + "\n");

  for (const msg of testMessages) {
    const result = route(msg);
    let icon = "➡️";
    if (result.action === ACTIONS.CALL_LIBRARIAN) icon = "📚";
    if (result.action === ACTIONS.CALL_VALIDATION) icon = "✅";

    console.log(`${icon} "${msg}"`);
    console.log(`   Action: ${result.action}`);

    if (result.debug?.completionIntent) {
      console.log(
        `   Completion: ${result.debug.completionIntent.isCompletion} (${result.debug.completionIntent.confidence})`,
      );
    }
    if (result.debug?.lookupIntent) {
      console.log(
        `   Lookup: ${result.debug.lookupIntent.isLookup} (${result.debug.lookupIntent.confidence})`,
      );
    }
    console.log();
  }
}
