#!/usr/bin/env node
/**
 * run-tests.js
 *
 * Test runner for Librarian evaluation harness.
 * Validates retrieval quality, not just formatting.
 *
 * Checks:
 * - Source correctness (expected path + heading + authority band)
 * - Quote relevance (token overlap between query and quote)
 * - Governing-first preference for policy questions
 *
 * Usage:
 *   npm run orchestrator:test
 *   npm run orchestrator:test -- --verbose
 *   npm run orchestrator:test -- --filter "visual proof"
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { searchDocs, formatLibrarianResponse } from "../services/librarian.js";
import {
  validateLibrarianResponse,
  analyzeLibrarianResponse,
} from "../validators/librarian-response.js";
import { renderLibrarianResponse } from "../renderers/librarian-renderer.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SPEC_PATH = join(__dirname, "librarian.spec.json");

// ============================================================================
// POLICY KEYWORDS (for governing-first check)
// ============================================================================

const POLICY_KEYWORDS = [
  "odd says",
  "canon",
  "rule",
  "must",
  "constraint",
  "policy",
  "definition",
  "done",
  "verification",
  "evidence",
  "required",
  "forbidden",
];

// ============================================================================
// TEST HELPERS
// ============================================================================

/**
 * Normalizes query into tokens for overlap checking.
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
 * Calculates token overlap between query and quote.
 */
function calculateOverlap(queryTokens, quote) {
  if (!quote) return 0;
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
 * Checks if query contains policy keywords.
 */
function isPolicyQuestion(query) {
  const lower = query.toLowerCase();
  return POLICY_KEYWORDS.some((kw) => lower.includes(kw));
}

// ============================================================================
// TEST RUNNER
// ============================================================================

/**
 * Runs a single test case.
 */
function runTest(test, verbose = false) {
  const results = {
    name: test.name,
    query: test.query,
    passed: true,
    failures: [],
    warnings: [],
    details: {},
  };

  // Run the librarian search
  const searchResult = searchDocs(test.query, { debug: true });
  const librarianResponse = formatLibrarianResponse(searchResult, test.query);
  const renderedOutput = renderLibrarianResponse(librarianResponse);
  const validation = analyzeLibrarianResponse(renderedOutput);

  results.details = {
    status: librarianResponse.status,
    sources: searchResult.results?.map((r) => r.path) || [],
    headings: searchResult.results?.map((r) => r.targetHeading) || [],
    authority_bands: searchResult.results?.map((r) => r.authority_band) || [],
    evidence_count: librarianResponse.evidence?.length || 0,
    validation_passed: validation.pass,
    validation_errors: validation.errors,
  };

  // === CHECK 1: Status ===
  if (test.expect_status) {
    if (librarianResponse.status !== test.expect_status) {
      results.failures.push(
        `Status mismatch: expected ${test.expect_status}, got ${librarianResponse.status}`,
      );
      results.passed = false;
    }
  }

  // === CHECK 2: Sources include ===
  if (test.expect_sources_include && test.expect_sources_include.length > 0) {
    const foundSources = results.details.sources;
    for (const expected of test.expect_sources_include) {
      if (!foundSources.some((s) => s.includes(expected) || expected.includes(s))) {
        results.failures.push(`Expected source not found: ${expected}`);
        results.passed = false;
      }
    }
  }

  // === CHECK 3: Heading contains ===
  if (test.expect_heading_contains) {
    const foundHeadings = results.details.headings.filter(Boolean);
    const hasMatch = foundHeadings.some((h) =>
      h.toLowerCase().includes(test.expect_heading_contains.toLowerCase()),
    );
    if (!hasMatch) {
      results.failures.push(
        `Expected heading containing "${test.expect_heading_contains}" not found. Got: ${foundHeadings.join(", ") || "(none)"}`,
      );
      results.passed = false;
    }
  }

  // === CHECK 4: Authority band ===
  if (test.expect_authority_band) {
    const foundBands = results.details.authority_bands;
    if (!foundBands.includes(test.expect_authority_band)) {
      results.failures.push(
        `Expected authority band "${test.expect_authority_band}" not found. Got: ${foundBands.join(", ") || "(none)"}`,
      );
      results.passed = false;
    }
  }

  // === CHECK 4b: Authority band any ===
  if (test.expect_authority_band_any && test.expect_authority_band_any.length > 0) {
    const foundBands = results.details.authority_bands;
    const hasMatch = foundBands.some((b) => test.expect_authority_band_any.includes(b));
    if (!hasMatch) {
      results.failures.push(
        `Expected authority band in [${test.expect_authority_band_any.join(", ")}]. Got: ${foundBands.join(", ") || "(none)"}`,
      );
      results.passed = false;
    }
  }

  // === CHECK 5: Quote relevance (token overlap) ===
  if (test.min_quote_overlap !== undefined && test.min_quote_overlap > 0) {
    const queryTokens = tokenize(test.query);
    const quotes = librarianResponse.evidence?.map((e) => e.quote) || [];

    let bulletsWithOverlap = 0;
    for (const quote of quotes) {
      const overlap = calculateOverlap(queryTokens, quote);
      if (overlap >= test.min_quote_overlap) {
        bulletsWithOverlap++;
      }
    }

    // Require at least half of bullets to have overlap
    const requiredOverlapBullets = Math.max(1, Math.floor(quotes.length / 2));
    if (bulletsWithOverlap < requiredOverlapBullets && quotes.length > 0) {
      results.failures.push(
        `Insufficient quote relevance: ${bulletsWithOverlap}/${quotes.length} bullets have query token overlap (need ${requiredOverlapBullets})`,
      );
      results.passed = false;
    }

    results.details.quote_overlap = {
      bullets_with_overlap: bulletsWithOverlap,
      total_bullets: quotes.length,
      required: requiredOverlapBullets,
      ratio: quotes.length > 0 ? bulletsWithOverlap / quotes.length : 0,
      query_tokens: queryTokens,
    };
  }

  // === CHECK 5b: Max quote overlap ratio (for detecting low-quality matches) ===
  if (test.max_quote_overlap_ratio !== undefined) {
    const queryTokens = tokenize(test.query);
    const quotes = librarianResponse.evidence?.map((e) => e.quote) || [];

    let bulletsWithOverlap = 0;
    for (const quote of quotes) {
      const overlap = calculateOverlap(queryTokens, quote);
      if (overlap >= 1) {
        bulletsWithOverlap++;
      }
    }

    const ratio = quotes.length > 0 ? bulletsWithOverlap / quotes.length : 0;
    if (ratio > test.max_quote_overlap_ratio) {
      results.failures.push(
        `Quote overlap ratio too high for expected low-quality match: ${ratio.toFixed(2)} > ${test.max_quote_overlap_ratio} (expected low overlap)`,
      );
      results.passed = false;
    }
  }

  // === CHECK 6: Governing-first for policy questions ===
  if (test.require_governing_if_policy && isPolicyQuestion(test.query)) {
    const firstBand = results.details.authority_bands[0];
    if (firstBand && firstBand !== "governing") {
      // Warning, not failure (unless no governing docs in top results)
      const hasGoverning = results.details.authority_bands.includes("governing");
      if (hasGoverning) {
        results.warnings.push(
          `Policy question but first result is ${firstBand}, not governing (governing exists in results though)`,
        );
      } else {
        results.warnings.push(
          `Policy question but no governing docs in results. Got: ${results.details.authority_bands.join(", ")}`,
        );
      }
    }
  }

  // === CHECK 7: Has next step (for INSUFFICIENT_EVIDENCE) ===
  if (test.expect_has_next_step && librarianResponse.status === "INSUFFICIENT_EVIDENCE") {
    if (!librarianResponse.next) {
      results.failures.push("Expected next retrieval step for INSUFFICIENT_EVIDENCE");
      results.passed = false;
    }
  }

  // === CHECK 8: Validation passes (for SUPPORTED) ===
  if (librarianResponse.status === "SUPPORTED" && !validation.pass) {
    results.failures.push(`Validator failed: ${validation.errors.join("; ")}`);
    results.passed = false;
  }

  return results;
}

/**
 * Runs all tests from spec file.
 */
function runAllTests(options = {}) {
  const { verbose = false, filter = null } = options;

  if (!existsSync(SPEC_PATH)) {
    console.error(`❌ Spec file not found: ${SPEC_PATH}`);
    process.exit(1);
  }

  const specs = JSON.parse(readFileSync(SPEC_PATH, "utf8"));
  let tests = specs;

  // Apply filter if provided
  if (filter) {
    tests = specs.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase()));
    console.log(`\n🔍 Running ${tests.length} tests matching "${filter}"\n`);
  } else {
    console.log(`\n🧪 Running ${tests.length} tests\n`);
  }

  console.log("=".repeat(70) + "\n");

  let passed = 0;
  let failed = 0;
  const failedTests = [];

  for (const test of tests) {
    const result = runTest(test, verbose);

    if (result.passed) {
      console.log(`✅ ${result.name}`);
      passed++;
    } else {
      console.log(`❌ ${result.name}`);
      failed++;
      failedTests.push(result);
    }

    if (result.warnings.length > 0) {
      for (const warning of result.warnings) {
        console.log(`   ⚠️  ${warning}`);
      }
    }

    if (!result.passed || verbose) {
      for (const failure of result.failures) {
        console.log(`   ❌ ${failure}`);
      }
      if (verbose) {
        console.log(`   📊 Status: ${result.details.status}`);
        console.log(`   📁 Sources: ${result.details.sources.join(", ") || "(none)"}`);
        console.log(`   📍 Headings: ${result.details.headings.join(", ") || "(none)"}`);
        console.log(`   🏷️  Authority: ${result.details.authority_bands.join(", ") || "(none)"}`);
        console.log(`   📝 Evidence: ${result.details.evidence_count} bullets`);
        if (result.details.quote_overlap) {
          console.log(
            `   🔗 Quote overlap: ${result.details.quote_overlap.bullets_with_overlap}/${result.details.quote_overlap.total_bullets}`,
          );
        }
      }
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

  if (failedTests.length > 0) {
    console.log("Failed tests:");
    for (const ft of failedTests) {
      console.log(`  - ${ft.name}`);
      for (const f of ft.failures) {
        console.log(`      ${f}`);
      }
    }
    console.log();
  }

  return { passed, failed, failedTests };
}

// ============================================================================
// CLI
// ============================================================================

const args = process.argv.slice(2);
const verbose = args.includes("--verbose") || args.includes("-v");
const filterIdx = args.findIndex((a) => a === "--filter" || a === "-f");
const filter = filterIdx >= 0 ? args[filterIdx + 1] : null;

const { failed } = runAllTests({ verbose, filter });
process.exit(failed > 0 ? 1 : 0);
