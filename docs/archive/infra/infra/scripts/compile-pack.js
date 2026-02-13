#!/usr/bin/env node
/**
 * Tier-Aware Pack Compiler (v1.4.1)
 *
 * Implements FR-1 through FR-6:
 * - FR-1: Tier metadata parsing from frontmatter
 * - FR-2: Tier 0 exclusion (hard rule, no exceptions)
 * - FR-3: Pack selection modes (curated + discovered)
 * - FR-4: Tier-based projection (1→high, 2→medium, 3→low)
 * - FR-5: Auditability (--plan flag)
 * - FR-6: Deterministic ordering
 *
 * Phase separation (CRITICAL):
 * Selection → Exclusion → Projection → Concatenation
 * These are separate phases, never collapsed.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";

const ROOT = process.cwd();

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Discovery roots - folders to scan for discovered packs
 * LOCKED per FR-3
 */
const DISCOVERY_ROOTS = ["canon/", "odd/", "docs/", "projects/"];

/**
 * Discovery excludes - folders to skip during discovery
 * LOCKED per FR-3
 */
const DISCOVERY_EXCLUDES = [
  "about/",
  "public/",
  "infra/",
  "products/",
  "_compiled/",
  "build/",
  "dist/",
  "node_modules/",
];

/**
 * Tier to projection mapping
 * LOCKED per FR-4 - no adaptive logic
 */
const TIER_PROJECTION = {
  1: "high",
  2: "medium",
  3: "low",
};

// ============================================================================
// UTILITIES
// ============================================================================

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

function warn(msg) {
  console.error(`⚠️  ${msg}`);
}

function info(msg) {
  console.log(`ℹ️  ${msg}`);
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function getGitCommit() {
  try {
    return execSync("git rev-parse HEAD", { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "UNKNOWN";
  }
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function resolvePath(rel) {
  return join(ROOT, rel);
}

// ============================================================================
// FR-1: TIER METADATA PARSING
// ============================================================================

/**
 * Parse YAML frontmatter from markdown content
 * Returns { frontmatter: object|null, body: string }
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: null, body: content };
  }

  const yamlStr = match[1];
  const body = match[2];

  // Simple YAML parser for frontmatter (key: value pairs)
  const frontmatter = {};
  for (const line of yamlStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Parse numbers
      if (/^\d+$/.test(value)) {
        value = parseInt(value, 10);
      }

      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

/**
 * Read tier from file frontmatter
 * Returns { tier: number, warnings: string[] }
 *
 * LOCKED BEHAVIOR (non-negotiable):
 * - Missing tier MUST default to Tier 3
 * - Missing tier MUST NOT cause exclusion
 * - Missing tier MUST emit a warning
 */
function readTier(filePath) {
  const warnings = [];

  if (!existsSync(filePath)) {
    return { tier: 3, warnings: [`File not found: ${filePath}`] };
  }

  const content = readFileSync(filePath, "utf8");
  const { frontmatter } = parseFrontmatter(content);

  if (!frontmatter) {
    warnings.push(`No frontmatter found, defaulting to Tier 3`);
    return { tier: 3, warnings };
  }

  if (frontmatter.tier === undefined || frontmatter.tier === null) {
    warnings.push(`Missing tier metadata, defaulting to Tier 3`);
    return { tier: 3, warnings };
  }

  const tier = parseInt(frontmatter.tier, 10);
  if (isNaN(tier) || tier < 0 || tier > 3) {
    warnings.push(`Invalid tier value '${frontmatter.tier}', defaulting to Tier 3`);
    return { tier: 3, warnings };
  }

  return { tier, warnings };
}

// ============================================================================
// FR-3: PACK SELECTION MODES
// ============================================================================

/**
 * Select files using curated mode (explicit list)
 */
function selectFilesCurated(sources) {
  return sources.map((rel) => ({
    path: rel,
    selected_by: "curated",
  }));
}

/**
 * Select files using discovery mode (folder scan)
 */
function selectFilesDiscovered(config) {
  const roots = config.discovery_roots || DISCOVERY_ROOTS;
  const excludes = config.discovery_excludes || DISCOVERY_EXCLUDES;
  const files = [];

  function scanDir(dir) {
    const absDir = resolvePath(dir);
    if (!existsSync(absDir)) return;

    const entries = readdirSync(absDir);
    for (const entry of entries) {
      const relPath = join(dir, entry);
      const absPath = join(absDir, entry);

      // Check excludes
      const shouldExclude = excludes.some((excl) => relPath.startsWith(excl) || relPath.includes(`/${excl}`));
      if (shouldExclude) continue;

      const stat = statSync(absPath);
      if (stat.isDirectory()) {
        scanDir(relPath);
      } else if (entry.endsWith(".md")) {
        files.push({
          path: relPath,
          selected_by: "discovered",
        });
      }
    }
  }

  for (const root of roots) {
    scanDir(root);
  }

  return files;
}

// ============================================================================
// FR-2: TIER 0 EXCLUSION + FR-4: TIER-BASED PROJECTION
// ============================================================================

/**
 * Apply tier rules to selected files
 * Returns array of decisions with tier, projection, included, reason
 *
 * HARD RULES:
 * - Tier 0 is NEVER included, even if explicitly listed
 * - Tier 1 → high projection (full content)
 * - Tier 2 → medium projection (frontmatter + description + outline)
 * - Tier 3 → low projection (title + one-line summary)
 */
function applyTierRules(files) {
  const decisions = [];

  for (const file of files) {
    const absPath = resolvePath(file.path);
    const { tier, warnings } = readTier(absPath);

    const decision = {
      path: file.path,
      tier,
      selected_by: file.selected_by,
      projection: null,
      included: false,
      reason: null,
      warnings,
    };

    // FR-2: Tier 0 exclusion (HARD RULE)
    if (tier === 0) {
      decision.projection = "excluded";
      decision.included = false;
      decision.reason = "tier0";
      decisions.push(decision);
      continue;
    }

    // FR-4: Tier-based projection
    decision.projection = TIER_PROJECTION[tier] || "low";
    decision.included = true;
    decision.reason = "tier_match";
    decisions.push(decision);
  }

  // FR-6: Deterministic ordering (sort by path)
  decisions.sort((a, b) => a.path.localeCompare(b.path));

  return decisions;
}

// ============================================================================
// FR-4: PROJECTION EXECUTION
// ============================================================================

/**
 * Extract title from markdown content
 */
function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Extract description (first blockquote after title)
 */
function extractDescription(body) {
  const match = body.match(/^>\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Extract outline (## headers)
 */
function extractOutline(body) {
  const headers = [];
  const regex = /^##\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(body)) !== null) {
    headers.push(match[1].trim());
  }
  return headers;
}

/**
 * Project file content based on projection level
 *
 * PROJECTION RULES:
 * - high: Full content
 * - medium: Frontmatter + description + outline (section headers MAY be included, body MUST NOT)
 * - low: Title + one-line summary
 *
 * DEGRADATION RULES (HARD REQUIREMENTS):
 * - If structure missing, fall back to next available structure
 * - Emit warning for degradation
 * - NEVER synthesize or invent content
 */
function projectFile(filePath, projection, decision) {
  const absPath = resolvePath(filePath);
  const content = readFileSync(absPath, "utf8");
  const { frontmatter, body } = parseFrontmatter(content);

  if (projection === "high") {
    // Full content - no projection needed
    return content;
  }

  if (projection === "medium") {
    // Frontmatter + description + outline
    // Section headers MAY be included, body content MUST NOT
    const parts = [];

    // Reconstruct frontmatter
    if (frontmatter) {
      parts.push("---");
      for (const [key, value] of Object.entries(frontmatter)) {
        if (typeof value === "string" && value.includes(":")) {
          parts.push(`${key}: "${value}"`);
        } else {
          parts.push(`${key}: ${value}`);
        }
      }
      parts.push("---\n");
    }

    // Title
    const title = frontmatter?.title || extractTitle(body);
    if (title) {
      parts.push(`# ${title}\n`);
    } else {
      decision.warnings.push("No title found for medium projection");
    }

    // Description
    const description = frontmatter?.description || extractDescription(body);
    if (description) {
      parts.push(`> ${description}\n`);
    }

    // Outline (headers only, no body content)
    const outline = extractOutline(body);
    if (outline.length > 0) {
      parts.push("\n## Outline\n");
      for (const header of outline) {
        parts.push(`- ${header}`);
      }
      parts.push("");
    } else {
      decision.warnings.push("No outline found for medium projection");
    }

    return parts.join("\n");
  }

  if (projection === "low") {
    // Title + one-line summary only
    const parts = [];

    const title = frontmatter?.title || extractTitle(body);
    if (title) {
      parts.push(`# ${title}`);
    } else {
      // Fallback: use filename
      const filename = filePath.split("/").pop().replace(".md", "");
      parts.push(`# ${filename}`);
      decision.warnings.push("No title found, using filename");
    }

    // One-line summary (description or first line)
    const description = frontmatter?.description || extractDescription(body);
    if (description) {
      parts.push(`\n> ${description}`);
    }

    return parts.join("\n") + "\n";
  }

  // Should not reach here
  return content;
}

// ============================================================================
// FR-5: AUDITABILITY (--plan)
// ============================================================================

/**
 * Format plan output as human-readable table
 */
function formatPlanTable(decisions) {
  const lines = [];
  lines.push("| Path | Tier | Selected By | Projection | Included | Reason | Warnings |");
  lines.push("|------|------|-------------|------------|----------|--------|----------|");

  for (const d of decisions) {
    const warnings = d.warnings.length > 0 ? d.warnings.join("; ") : "-";
    lines.push(`| ${d.path} | ${d.tier} | ${d.selected_by} | ${d.projection} | ${d.included} | ${d.reason} | ${warnings} |`);
  }

  return lines.join("\n");
}

/**
 * Format plan output as JSON
 */
function formatPlanJson(decisions) {
  return JSON.stringify(decisions, null, 2);
}

// ============================================================================
// COMPILATION
// ============================================================================

/**
 * Compile pack from decisions
 */
function compilePack(decisions, plan) {
  const git_commit = getGitCommit();
  const built_at = new Date().toISOString();

  const includedDecisions = decisions.filter((d) => d.included);
  const sources = includedDecisions.map((d) => d.path);
  const source_hashes = {};
  const parts = [];

  for (const decision of includedDecisions) {
    const absPath = resolvePath(decision.path);
    const content = readFileSync(absPath, "utf8");
    source_hashes[decision.path] = sha256(content);

    // Apply projection
    const projected = projectFile(decision.path, decision.projection, decision);

    parts.push(`\n\n---\n\n## Source: \`${decision.path}\`\n\n`);
    parts.push(projected);
  }

  // Build header with provenance
  const header = [
    "---",
    `lane: ${plan.lane}`,
    `pack: ${plan.pack}`,
    `built_at: ${built_at}`,
    `git_commit: ${git_commit}`,
    "sources:",
    ...sources.map((s) => `  - ${s}`),
    "source_hashes:",
    ...Object.entries(source_hashes).map(([k, v]) => `  ${k}: ${v}`),
    "---",
    "",
  ].join("\n");

  return header + parts.join("");
}

// ============================================================================
// MAIN
// ============================================================================

function parseArgs(argv) {
  const args = {
    lane: null,
    pack: null,
    plan: false,
    planFormat: "table",
  };

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--lane") args.lane = argv[i + 1];
    if (argv[i] === "--pack") args.pack = argv[i + 1];
    if (argv[i] === "--plan") {
      args.plan = true;
      // Check for format
      if (argv[i + 1] === "json") {
        args.planFormat = "json";
      }
    }
  }

  if (!args.lane) fail("Missing --lane <lane>");
  if (!args.pack) fail("Missing --pack <pack>");

  return args;
}

function planPath(lane, pack) {
  return join(ROOT, "infra", "compile", "plans", lane, `${pack}.json`);
}

function writeLaneIndex(lane) {
  const plansDir = join(ROOT, "infra", "compile", "plans", lane);
  const laneOutDir = join(ROOT, "public", "_compiled", lane);

  const planFiles = existsSync(plansDir) ? readdirSync(plansDir).filter((f) => f.endsWith(".json")) : [];

  const packs = planFiles.map((file) => {
    const pPath = join(plansDir, file);
    const plan = readJson(pPath);

    const outFile = plan.output.includes("/") ? plan.output.split("/").pop() : plan.output;
    const outPath = `public/_compiled/${lane}/${outFile}`;
    const metaPath = `public/_compiled/${lane}/_meta/${plan.pack}-COMPILE_META.json`;

    return {
      pack: plan.pack,
      plan: `infra/compile/plans/${lane}/${file}`,
      output: outPath,
      meta: metaPath,
      exists: existsSync(join(ROOT, outPath)),
    };
  });

  const index = {
    lane,
    generated_at: new Date().toISOString(),
    packs,
  };

  ensureDir(laneOutDir);
  writeFileSync(join(laneOutDir, "index.json"), JSON.stringify(index, null, 2) + "\n");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { lane, pack } = args;

  // Load compile plan
  const pPath = planPath(lane, pack);
  if (!existsSync(pPath)) fail(`Compile plan not found: ${pPath}`);

  const plan = readJson(pPath);
  if (plan.lane !== lane) fail(`Plan lane mismatch: expected ${lane}, got ${plan.lane}`);
  if (plan.pack !== pack) fail(`Plan pack mismatch: expected ${pack}, got ${plan.pack}`);

  // PHASE 1: SELECTION
  let files;
  const mode = plan.mode || "curated";

  if (mode === "discovered") {
    info(`Selection mode: discovered`);
    files = selectFilesDiscovered(plan);
  } else if (mode === "curated" || mode === "concat") {
    // Support legacy "concat" mode as curated
    info(`Selection mode: curated`);
    if (!plan.sources || !Array.isArray(plan.sources)) {
      fail("Curated mode requires 'sources' array in plan");
    }
    files = selectFilesCurated(plan.sources);
  } else {
    fail(`Unknown mode: ${mode}`);
  }

  info(`Selected ${files.length} files`);

  // PHASE 2: TIER RULES (EXCLUSION + PROJECTION ASSIGNMENT)
  const decisions = applyTierRules(files);

  const included = decisions.filter((d) => d.included);
  const excluded = decisions.filter((d) => !d.included);
  const tier0Count = excluded.filter((d) => d.reason === "tier0").length;

  info(`Tier 0 excluded: ${tier0Count} files`);
  info(`Included: ${included.length} files`);

  // FR-5: --plan output
  if (args.plan) {
    console.log("\n=== COMPILATION PLAN ===\n");
    if (args.planFormat === "json") {
      console.log(formatPlanJson(decisions));
    } else {
      console.log(formatPlanTable(decisions));
    }
    console.log("\n========================\n");
  }

  // Log warnings
  for (const d of decisions) {
    for (const w of d.warnings) {
      warn(`${d.path}: ${w}`);
    }
  }

  // PHASE 3: PROJECTION + CONCATENATION
  const output = compilePack(decisions, plan);

  // Determine output path
  const outRel = plan.output.includes("/") ? plan.output : `public/_compiled/${lane}/${plan.output}`;
  const outAbs = resolvePath(outRel);

  ensureDir(dirname(outAbs));
  writeFileSync(outAbs, output, "utf8");

  // Write metadata
  const metaDir = join(dirname(outAbs), "_meta");
  ensureDir(metaDir);
  writeFileSync(
    join(metaDir, `${pack}-COMPILE_META.json`),
    JSON.stringify(
      {
        lane,
        pack,
        built_at: new Date().toISOString(),
        git_commit: getGitCommit(),
        mode,
        total_selected: files.length,
        tier0_excluded: tier0Count,
        total_included: included.length,
        sources: included.map((d) => d.path),
        decisions: decisions,
        plan: `infra/compile/plans/${lane}/${pack}.json`,
        output: outRel,
      },
      null,
      2
    ),
    "utf8"
  );

  // Generate lane index
  writeLaneIndex(lane);

  console.log(`✅ Compiled pack written: ${outRel}`);
  console.log(`   Mode: ${mode}`);
  console.log(`   Files: ${included.length} included, ${excluded.length} excluded`);
  console.log(`   Tier 0 excluded: ${tier0Count}`);
}

main();
