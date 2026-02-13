#!/usr/bin/env node
/**
 * handle-message.js
 *
 * Orchestrator message handler.
 * Routes messages, calls services, validates responses, handles retries.
 *
 * Per docs/agents/README.md
 */

import { route, ACTIONS } from "../router.js";
import { searchDocs, formatLibrarianResponse } from "../services/librarian.js";
import { renderLibrarianResponse } from "../renderers/librarian-renderer.js";
import {
  validateLibrarianResponse,
  analyzeLibrarianResponse,
} from "../validators/librarian-response.js";
import { validateCompletion, formatValidationResponse } from "../services/validation.js";

// ============================================================================
// CONFIGURATION
// ============================================================================

const MAX_RETRIES = 1;

/**
 * Creates an INSUFFICIENT_EVIDENCE response for validation failures.
 */
function createInsufficientResponse(query, validationResult) {
  // Use the renderer for consistent formatting
  return renderLibrarianResponse({
    status: "INSUFFICIENT_EVIDENCE",
    answer: `Unable to provide a fully cited answer for: "${query}". Validation failed: ${validationResult.errors[0] || "unknown error"}`,
    evidence: [],
    sources: [],
    next: {
      missing: "Load-bearing quotes with path#Heading citations",
      where: "canon/, odd/, or docs/",
      what: query,
    },
  });
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

/**
 * Handles an incoming message through the orchestrator.
 *
 * @param {string} message - The user message
 * @param {object} options - { debug: boolean }
 * @returns {object} - { action, response, validation, debug }
 */
export async function handleMessage(message, options = {}) {
  const { debug = false } = options;

  // Step 1: Route the message
  const routeResult = route(message);

  if (routeResult.action === ACTIONS.REFUSE) {
    return {
      action: routeResult.action,
      response: "Unable to process: " + (routeResult.payload?.reason || "unknown error"),
      validation: null,
      debug: debug ? { route: routeResult } : null,
    };
  }

  if (routeResult.action === ACTIONS.CONTINUE_WORKFLOW) {
    return {
      action: routeResult.action,
      response: null, // Let the normal workflow handle it
      validation: null,
      debug: debug ? { route: routeResult } : null,
    };
  }

  // Step 2: Handle CALL_VALIDATION
  if (routeResult.action === ACTIONS.CALL_VALIDATION) {
    const completionMessage = routeResult.payload.message;

    // Run validation on the completion claim
    const validationResult = validateCompletion(completionMessage);
    const responseText = formatValidationResponse(validationResult);

    return {
      action: routeResult.action,
      response: responseText,
      validation: {
        verdict: validationResult.verdict,
        claims_count: validationResult.claims.length,
        gaps_count: validationResult.gaps.length,
        evidence_provided_count: validationResult.evidence_provided.length,
      },
      debug: debug
        ? {
            route: routeResult,
            validation: validationResult,
          }
        : null,
    };
  }

  // Step 3: Handle CALL_LIBRARIAN
  if (routeResult.action === ACTIONS.CALL_LIBRARIAN) {
    const query = routeResult.payload.query;

    // Search docs
    const searchResult = searchDocs(query, { debug });

    // Format as Librarian response (structured object)
    const librarianResult = formatLibrarianResponse(searchResult, query);
    // Render to canonical markdown format using the single renderer
    let responseText = renderLibrarianResponse(librarianResult);

    // Validate the response
    let validation = analyzeLibrarianResponse(responseText);

    // If validation fails and we haven't retried, try with stricter prompt
    if (!validation.pass && MAX_RETRIES > 0) {
      // For v0, we just return insufficient evidence on validation failure
      // In a real implementation, this would re-prompt the LLM
      responseText = createInsufficientResponse(query, validation);
      validation = analyzeLibrarianResponse(responseText);
    }

    return {
      action: routeResult.action,
      response: responseText,
      validation: {
        pass: validation.pass,
        status: validation.status,
        errors: validation.errors,
        warnings: validation.warnings,
        coverage: validation.coverage,
      },
      debug: debug
        ? {
            route: routeResult,
            search: {
              status: searchResult.status,
              results_count: searchResult.results?.length || 0,
              debug: searchResult.debug,
            },
            librarian: librarianResult,
          }
        : null,
    };
  }

  // Unknown action
  return {
    action: "UNKNOWN",
    response: null,
    validation: null,
    debug: debug ? { route: routeResult } : null,
  };
}

// ============================================================================
// CLI (for testing)
// ============================================================================

if (process.argv[1] && process.argv[1].endsWith("handle-message.js")) {
  const message = process.argv.slice(2).join(" ") || "Where is the rule about visual proof?";

  console.log("\n🎯 Orchestrator: handle-message\n");
  console.log("=".repeat(60));
  console.log(`\nMessage: "${message}"\n`);
  console.log("=".repeat(60) + "\n");

  handleMessage(message, { debug: true }).then((result) => {
    console.log(`Action: ${result.action}`);

    // Handle Librarian validation
    if (result.action === ACTIONS.CALL_LIBRARIAN) {
      console.log(`Validation Pass: ${result.validation?.pass ?? "N/A"}`);

      if (result.validation?.errors?.length > 0) {
        console.log(`\nValidation Errors:`);
        for (const err of result.validation.errors) {
          console.log(`  ❌ ${err}`);
        }
      }

      if (result.validation?.warnings?.length > 0) {
        console.log(`\nValidation Warnings:`);
        for (const warn of result.validation.warnings) {
          console.log(`  ⚠️  ${warn}`);
        }
      }

      if (result.validation?.coverage) {
        console.log(`\nCoverage:`);
        console.log(`  Answer words: ${result.validation.coverage.answer_word_count}`);
        console.log(
          `  Evidence: ${result.validation.coverage.evidence_bullets_found}/${result.validation.coverage.evidence_bullets_required} required`,
        );
      }
    }

    // Handle Validation Agent result
    if (result.action === ACTIONS.CALL_VALIDATION) {
      console.log(`Verdict: ${result.validation?.verdict ?? "N/A"}`);
      console.log(`Claims: ${result.validation?.claims_count ?? 0}`);
      console.log(`Evidence Provided: ${result.validation?.evidence_provided_count ?? 0}`);
      console.log(`Gaps: ${result.validation?.gaps_count ?? 0}`);
    }

    console.log("\n" + "-".repeat(60) + "\n");
    console.log("Response:\n");
    console.log(result.response);

    if (result.debug) {
      console.log("\n" + "-".repeat(60) + "\n");
      console.log("Debug Info:\n");
      if (result.debug.route?.debug?.lookupIntent) {
        console.log(`  Route confidence: ${result.debug.route.debug.lookupIntent.confidence}`);
      }
      if (result.debug.route?.debug?.completionIntent) {
        console.log(
          `  Completion confidence: ${result.debug.route.debug.completionIntent.confidence}`,
        );
      }
      if (result.debug.search) {
        console.log(`  Search status: ${result.debug.search.status}`);
        console.log(`  Results found: ${result.debug.search.results_count}`);
      }
    }
  });
}
