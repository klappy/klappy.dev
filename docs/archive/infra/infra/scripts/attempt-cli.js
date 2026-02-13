#!/usr/bin/env node
/**
 * attempt-cli.js
 *
 * Unified CLI for the ODD attempt lifecycle.
 *
 * Commands:
 *   npm run attempt:start -- --prd v0.2
 *   npm run attempt:spawn -- --prd v0.2 --n 4
 *   npm run attempt:reset
 *   npm run attempt:promote -- --prd v0.2 --attempt 001
 *
 * What attempt:start does (everything automated):
 *   1. Validates git clean state
 *   2. Ensures on main, pulls latest
 *   3. Reserves attempt number (commits to main)
 *   4. Creates attempt branch
 *   5. Resets /src to minimal shell
 *   6. Commits reset baseline
 *   7. Prints branch name, attempt ID, PRD snapshot SHA
 *
 * What attempt:spawn does:
 *   Same as start, but for N parallel attempts.
 *   Each branch gets /src reset and committed.
 *   Optionally creates worktrees.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { randomBytes } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

// ============================================================
// Utilities
// ============================================================

/**
 * Parse PRD version from /docs/PRD.md (single source of truth).
 *
 * Looks for:
 *   | **PRD Version** | v0.3 |
 * OR:
 *   PRD Version: v0.3
 *
 * Returns version without 'v' prefix (e.g., "0.3").
 */
function parsePrdVersion() {
  const prdPath = join(ROOT, "docs", "PRD.md");

  if (!existsSync(prdPath)) {
    return null;
  }

  const content = readFileSync(prdPath, "utf8");

  // Match table format: | **PRD Version** | v0.3 |
  const tableMatch = content.match(/\|\s*\*\*PRD Version\*\*\s*\|\s*v?([0-9.]+)\s*\|/i);
  if (tableMatch) {
    return tableMatch[1];
  }

  // Match key-value format: PRD Version: v0.3
  const kvMatch = content.match(/PRD Version:\s*v?([0-9.]+)/i);
  if (kvMatch) {
    return kvMatch[1];
  }

  return null;
}

function run(cmd, options = {}) {
  const { silent, dryRun, cwd } = options;
  if (dryRun) {
    console.log(`  [DRY RUN] ${cmd}`);
    return "";
  }
  if (!silent) {
    console.log(`  $ ${cmd}`);
  }
  return execSync(cmd, { cwd: cwd || ROOT, encoding: "utf8" }).trim();
}

function fail(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function generateRunId() {
  // Short 8-char hex ID (collision-resistant for practical purposes)
  return randomBytes(4).toString("hex");
}

// Valid lanes
// Active: odd-teaser, agent-skill, fluent-mobile
// Deprecated (kept for backward compatibility): website, ai-navigation
const VALID_LANES = ["odd-teaser", "agent-skill", "fluent-mobile", "website", "ai-navigation"];

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    command: null,
    prd: null,
    attempt: null,
    lane: null, // Product lane (website, ai-navigation, agent-skill)
    n: 1,
    tool: "cursor", // Tool provenance (cursor, vscode, cli, etc.)
    agent: "default", // Agent ID within tool (cursor-a, cursor-b, etc.)
    model: null, // Model provenance (opus-4.5, gpt-4o, etc.)
    worktree: false,
    worktreeDir: null,
    dryRun: false,
    force: false,
    noCommit: false,
    noNuke: false,
  };

  // First arg is command
  if (args[0] && !args[0].startsWith("--")) {
    result.command = args[0];
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];

    if (arg === "--prd" && next) {
      result.prd = next.replace(/^v/, "");
      i++;
    } else if (arg === "--lane" && next) {
      result.lane = next;
      i++;
    } else if (arg === "--attempt" && next) {
      result.attempt = next.padStart(3, "0");
      i++;
    } else if (arg === "--n" && next) {
      result.n = parseInt(next, 10);
      i++;
    } else if (arg === "--tool" && next) {
      result.tool = next;
      i++;
    } else if (arg === "--agent" && next) {
      result.agent = next;
      i++;
    } else if (arg === "--model" && next) {
      result.model = next;
      i++;
    } else if (arg === "--worktree") {
      result.worktree = true;
    } else if (arg === "--worktree-dir" && next) {
      result.worktreeDir = next;
      result.worktree = true;
      i++;
    } else if (arg === "--dry-run") {
      result.dryRun = true;
    } else if (arg === "--force") {
      result.force = true;
    } else if (arg === "--no-commit") {
      result.noCommit = true;
    } else if (arg === "--no-nuke") {
      result.noNuke = true;
    }
  }

  return result;
}

/**
 * Generate a model slug for branch naming.
 * Converts model strings like "opus-4.5" or "gpt-4o-mini" to short slugs.
 */
function generateModelSlug(model) {
  if (!model || model === "unknown") return "unknown";

  // Normalize to lowercase, replace spaces/dots with hyphens
  return model
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\./g, "")
    .replace(/[^a-z0-9-]/g, "")
    .substring(0, 20); // Limit length for branch names
}

/**
 * Generate a provenance-aware branch name.
 * Format: run/<lane>/prd-v<prd>/<tool>/<agent>/<model_slug>/<run_id>
 *
 * Example: run/website/prd-v1.0/cursor/a/claude-opus-4/e2c41bb5
 *
 * INVARIANT: Lane is REQUIRED in branch name to prevent cross-lane confusion.
 */
function generateBranchName(lane, prd, tool, agent, model, runId) {
  const modelSlug = generateModelSlug(model);
  return `run/${lane}/prd-v${prd}/${tool}/${agent}/${modelSlug}/${runId}`;
}

/**
 * Validate that a branch name matches the canonical format.
 * Returns { valid: boolean, errors: string[] }
 */
function validateBranchName(branch, expectedLane) {
  const errors = [];

  // Check prefix
  if (!branch.startsWith("run/") && !branch.startsWith("attempt/")) {
    errors.push(`Branch must start with run/ or attempt/. Got: ${branch}`);
    return { valid: false, errors };
  }

  // For run/* branches, enforce full format
  if (branch.startsWith("run/")) {
    const parts = branch.split("/");
    // run/<lane>/prd-v<prd>/<tool>/<agent>/<model>/<run_id>
    if (parts.length < 7) {
      errors.push(
        `Branch format incomplete. Expected: run/<lane>/prd-v<prd>/<tool>/<agent>/<model>/<run_id>`,
      );
      errors.push(`Got: ${branch}`);
    }

    // Check lane is present and matches expected
    const branchLane = parts[1];
    if (!branchLane || !VALID_LANES.includes(branchLane)) {
      errors.push(`Branch must include valid lane. Got: ${branchLane || "(empty)"}`);
      errors.push(`Valid lanes: ${VALID_LANES.join(", ")}`);
    }

    if (expectedLane && branchLane !== expectedLane) {
      errors.push(`Branch lane (${branchLane}) does not match --lane (${expectedLane})`);
    }
  }

  return { valid: errors.length === 0, errors };
}

// ============================================================
// Minimal shell files
// ============================================================

const SHELL_FILES = {
  "main.jsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,

  "index.css": `/* 
 * Minimal reset - no UI opinions
 * Build your attempt's design from scratch
 */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  height: 100%;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}
`,

  "components/App.jsx": `import { useState, useEffect } from 'react';

/**
 * Minimal App Shell
 * 
 * This shell proves the build works and content loads.
 * Replace everything here with your attempt's implementation.
 * 
 * PRD: /docs/PRD.md
 * Manifest: /public/content/manifest.json
 */
export default function App() {
  const [manifest, setManifest] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/content/manifest.json')
      .then(r => r.json())
      .then(setManifest)
      .catch(e => setError(e.message));
  }, []);

  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <h1>Manifest Load Failed</h1>
        <pre>{error}</pre>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Loading manifest...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚀 Fresh Attempt Shell</h1>
      <p>Manifest loaded successfully. {manifest.resources?.length || 0} resources available.</p>
      <hr style={{ margin: '1rem 0' }} />
      <p><strong>Next:</strong> Read the PRD and build your implementation.</p>
      <ul>
        <li>PRD: <code>/docs/PRD.md</code></li>
        <li>Manifest: <code>/public/content/manifest.json</code></li>
        <li>This file: <code>products/&lt;lane&gt;/src/components/App.jsx</code></li>
      </ul>
    </div>
  );
}
`,
};

// SAFETY: Ephemeral paths are lane-scoped. Root should remain clean.
// NOTE: cmdNuke() handles lane-scoped deletion directly via laneEphemeralPaths.
// This list is kept for reference/documentation only.
const EPHEMERAL_PATHS = [
  // Lane-scoped paths (template: products/<lane>/...)
  // 'products/<lane>/src',
  // 'products/<lane>/dist',
  // 'products/<lane>/vite.config.js',
  // 'products/<lane>/vite.config.ts',
  // 'products/<lane>/tsconfig.json',
  // 'products/<lane>/tailwind.config.js',
  // 'products/<lane>/postcss.config.js',
  // NOTE: Root-level src, app, index.html, vite.config.js are NO LONGER valid.
  // All ephemeral paths must be under products/<lane>/.
];

// These are NEVER touched during nuke (the contract)
const PROTECTED_PATHS = ["canon", "docs", "attempts", "infra", "public", ".cloudflare", ".github"];

// ============================================================
// Core functions
// ============================================================

function ensureCleanMain(opts) {
  const { dryRun, force } = opts;

  console.log("1️⃣  Validating git state...");

  // Check for uncommitted changes
  const status = run("git status --porcelain", { silent: true, dryRun: false });
  if (status && !force) {
    fail(
      "Working directory not clean. Commit or stash changes first.\n" +
        "   (use --force to override)\n\n" +
        status,
    );
  }
  if (status && force) {
    console.log("  ⚠️  Working directory not clean (--force used)");
  } else {
    console.log("  ✅ Working directory clean");
  }

  // Check we're on main
  const branch = run("git branch --show-current", { silent: true, dryRun: false });
  if (branch !== "main") {
    fail(`Must be on main branch. Currently on: ${branch}`);
  }
  console.log("  ✅ On main branch");

  // Pull latest
  console.log("  📥 Pulling latest main...");
  run("git pull origin main", { dryRun });
  console.log("  ✅ Main is up to date\n");
}

function reserveAttemptNumber(prd, agent, opts) {
  const { dryRun } = opts;

  console.log("2️⃣  Reserving attempt number...");

  const prdFolder = join(ROOT, "attempts", `prd-v${prd}`);
  const registryPath = join(prdFolder, "ATTEMPT_REGISTRY.json");

  // Create folder if needed
  if (!existsSync(prdFolder) && !dryRun) {
    mkdirSync(prdFolder, { recursive: true });
  }

  // Read or create registry
  let registry;
  if (existsSync(registryPath)) {
    registry = JSON.parse(readFileSync(registryPath, "utf8"));
  } else {
    registry = {
      prd_version: prd,
      next_attempt: 1,
      reserved: [],
      sealed: [],
    };
  }

  const attemptNum = registry.next_attempt;
  const attemptPadded = String(attemptNum).padStart(3, "0");

  // Reserve it
  if (!dryRun) {
    registry.next_attempt = attemptNum + 1;
    registry.reserved.push({
      attempt: attemptNum,
      reserved_at: new Date().toISOString(),
      agent: agent,
    });
    writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
  }

  // Commit to main
  run(`git add ${registryPath}`, { dryRun });
  run(`git commit -m "chore: reserve attempt-${attemptPadded} for PRD v${prd}"`, { dryRun });
  run("git push origin main", { dryRun });

  console.log(`  ✅ Reserved: attempt-${attemptPadded}\n`);

  return { attemptNum, attemptPadded };
}

function createAttemptBranch(prd, attemptPadded, opts) {
  const { dryRun } = opts;

  console.log("3️⃣  Creating attempt branch...");

  const branchName = `attempt/prd-v${prd}/a${attemptPadded}`;
  const prdSha = run("git rev-parse HEAD", { silent: true, dryRun: false });

  run(`git checkout -b ${branchName}`, { dryRun });

  console.log(`  ✅ Created: ${branchName}`);
  console.log(`  📌 PRD snapshot: ${prdSha.substring(0, 8)}\n`);

  return { branchName, prdSha };
}

/**
 * Reset lane src to minimal shell.
 * Lane-scoped: operates on products/<lane>/src, not repo root.
 * Can operate in current directory or a specific cwd (for worktrees).
 *
 * NOTE: This function is legacy. Prefer cmdNuke() for lane-scoped resets.
 * Default lane is 'website' for backwards compatibility.
 */
function resetSrc(opts, targetDir = ROOT, lane = "website") {
  const { dryRun, noCommit } = opts;

  const laneRoot = join(targetDir, "products", lane);
  const srcPath = join(laneRoot, "src");
  const appPath = join(laneRoot, "app");

  console.log(`4️⃣  Resetting products/${lane}/src to minimal shell...`);

  // Delete lane src
  if (existsSync(srcPath) && !dryRun) {
    rmSync(srcPath, { recursive: true });
  }

  // Delete lane app if present
  if (existsSync(appPath) && !dryRun) {
    rmSync(appPath, { recursive: true });
  }

  // Create minimal shell in lane
  if (!dryRun) {
    mkdirSync(join(srcPath, "components"), { recursive: true });
    for (const [filename, content] of Object.entries(SHELL_FILES)) {
      writeFileSync(join(srcPath, filename), content);
    }
  }

  // Commit reset (unless --no-commit)
  if (!noCommit) {
    run(`git add products/${lane}/src/`, { dryRun, cwd: targetDir });
    run(`git commit -m "chore: reset products/${lane}/src to minimal shell for fresh attempt"`, {
      dryRun,
      cwd: targetDir,
    });
  }

  console.log(`  ✅ products/${lane}/src reset and committed\n`);
}

function printStartSummary(prd, attemptPadded, branchName, prdSha) {
  console.log("═".repeat(60));
  console.log("\n🚀 ATTEMPT READY\n");
  console.log(`  PRD Version:     v${prd}`);
  console.log(`  Attempt:         ${attemptPadded}`);
  console.log(`  Branch:          ${branchName}`);
  console.log(`  PRD Snapshot:    ${prdSha.substring(0, 8)}`);
  console.log(
    `  Preview URL:     https://${branchName.replace(/\//g, "-")}.klappy-dev.pages.dev (after push)`,
  );
  console.log("\n" + "═".repeat(60));

  console.log(`
📋 Next step:

   Paste the kickoff prompt into your agent:
   /docs/PROMPT_ATTEMPT_KICKOFF.txt

   Then push to trigger preview deploy:
   git push origin ${branchName}
`);
}

// ============================================================
// Commands
// ============================================================

function cmdStart(opts) {
  const { prd, agent, dryRun } = opts;

  if (!prd) {
    console.log(`
Usage: npm run attempt:start -- --prd <version>

Example:
  npm run attempt:start -- --prd v0.2

Options:
  --prd <version>   PRD version (required)
  --agent <name>    Agent identifier (default: "default")
  --force           Override clean working directory check
  --dry-run         Show what would happen without making changes
`);
    process.exit(1);
  }

  console.log(`\n🚀 Starting attempt for PRD v${prd}\n`);
  if (dryRun) console.log("  [DRY RUN MODE]\n");

  ensureCleanMain(opts);
  const { attemptPadded } = reserveAttemptNumber(prd, agent, opts);
  const { branchName, prdSha } = createAttemptBranch(prd, attemptPadded, opts);
  resetSrc(opts);
  printStartSummary(prd, attemptPadded, branchName, prdSha);
}

/**
 * NUKE: Guarantee blank slate for a lane's implementation surface.
 *
 * Lane-scoped: Only deletes products/<lane>/src and lane-local configs.
 *
 * Branch safety rules:
 *   - ❌ Refuses on prod (NEVER)
 *   - ❌ Refuses on main unless --force
 *   - ✅ Allowed on attempt/* or run/* branches
 *
 * Protected paths (canon, docs, infra, other lanes) are NEVER touched.
 */
function cmdNuke(opts) {
  const { dryRun, force, lane } = opts;

  // ========================================
  // LANE VALIDATION (Required)
  // ========================================
  if (!lane) {
    console.log(`
Usage: npm run attempt:nuke -- --lane <lane>

Example:
  npm run attempt:nuke -- --lane website

Valid lanes: ${VALID_LANES.join(", ")}

Options:
  --lane <lane>   Product lane (required)
  --force         Override main branch check
  --dry-run       Show what would happen
  --no-commit     Don't commit the nuke
`);
    process.exit(1);
  }

  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(", ")}`);
  }

  // ========================================
  // REGISTRATION CHECK (Enforced)
  // ========================================
  // Nuke requires .attempt.json to exist (proves registration happened)
  const attemptJsonPath = join(ROOT, ".attempt.json");
  if (!existsSync(attemptJsonPath) && !force) {
    console.log(`\n  ⚠️  No .attempt.json found.\n`);
    console.log("  You must register before nuking:");
    console.log(
      `    npm run attempt:register -- --lane ${lane} --tool cursor --agent a --model "your-model"\n`,
    );
    console.log("  This ensures provenance is captured before work begins.");
    console.log("  Use --force to override (not recommended).\n");
    fail("Run attempt:register first, then attempt:nuke.");
  }

  // If .attempt.json exists, validate lane matches
  if (existsSync(attemptJsonPath)) {
    const registeredMeta = JSON.parse(readFileSync(attemptJsonPath, "utf8"));
    if (registeredMeta.lane && registeredMeta.lane !== lane) {
      fail(
        `Lane mismatch!\n` +
          `   .attempt.json says: ${registeredMeta.lane}\n` +
          `   --lane argument:    ${lane}\n\n` +
          `   Use the lane you registered with, or re-register.`,
      );
    }
  }

  console.log(`\n💥 NUKE — Blank Slate Reset for lane: ${lane}\n`);
  if (dryRun) console.log("  [DRY RUN MODE]\n");

  // ========================================
  // BRANCH SAFETY CHECK (Critical)
  // ========================================
  const currentBranch = run("git branch --show-current", { silent: true, dryRun: false });

  // NEVER allow nuke on prod
  if (currentBranch === "prod") {
    fail(
      "🛑 REFUSED: Cannot nuke on prod branch.\n" +
        "   prod is the live production deployment.\n" +
        "   Switch to an attempt/* or run/* branch first.",
    );
  }

  // Warn and require --force on main
  if (currentBranch === "main" && !force) {
    console.log("  ⚠️  WARNING: You are on main branch!");
    console.log("  ⚠️  main is the experiment aggregation branch.");
    console.log("");
    console.log(`  Nuking will remove products/${lane}/src/.`);
    console.log("  Production (prod branch) is NOT affected.");
    console.log("  Other lanes are NOT affected.");
    console.log("");
    console.log("  To proceed, use:");
    console.log(`    npm run attempt:nuke -- --lane ${lane} --force`);
    console.log("");
    fail("Use --force to nuke on main, or run from an attempt/run branch.");
  }

  // Check for valid branch types
  const isAttemptBranch = currentBranch.startsWith("attempt/") || currentBranch.startsWith("run/");
  if (!isAttemptBranch && currentBranch !== "main") {
    console.log(`  ⚠️  Unknown branch type: ${currentBranch}`);
    console.log("  Expected: attempt/*, run/*, or main");
    if (!force) {
      fail("Use --force to nuke on this branch.");
    }
  }

  console.log(`  Branch: ${currentBranch}`);
  console.log(`  Lane:   ${lane}`);
  if (isAttemptBranch) {
    console.log("  ✅ Attempt/run branch — nuke allowed\n");
  } else if (currentBranch === "main" && force) {
    console.log("  ⚠️  main branch with --force — proceeding with caution\n");
  }

  // ========================================
  // LANE-SCOPED PATHS
  // ========================================
  const laneRoot = join(ROOT, "products", lane);
  const laneSrc = join(laneRoot, "src");

  // Lane-local config files that may exist
  const laneEphemeralPaths = [
    join("products", lane, "src"),
    join("products", lane, "vite.config.js"),
    join("products", lane, "vite.config.ts"),
    join("products", lane, "tsconfig.json"),
    join("products", lane, "tailwind.config.js"),
    join("products", lane, "postcss.config.js"),
  ];

  // ========================================
  // SHOW WHAT WILL BE DELETED
  // ========================================
  console.log("1️⃣  Scanning lane ephemeral paths...\n");
  console.log(`  Lane root: products/${lane}/`);
  console.log("");
  console.log("  Will delete:");

  const toDelete = [];
  for (const p of laneEphemeralPaths) {
    const fullPath = join(ROOT, p);
    if (existsSync(fullPath)) {
      toDelete.push(p);
      console.log(`    ✗ /${p}`);
    }
  }

  if (toDelete.length === 0) {
    console.log("    (nothing to delete - already clean)");
  }

  console.log("");
  console.log("  Protected (NEVER deleted):");
  console.log("    ✓ /canon/**");
  console.log("    ✓ /docs/**");
  console.log("    ✓ /attempts/**");
  console.log("    ✓ /infra/**");
  console.log("    ✓ /public/**");
  for (const otherLane of VALID_LANES.filter((l) => l !== lane)) {
    console.log(`    ✓ /products/${otherLane}/**`);
  }
  console.log("");

  // ========================================
  // EXECUTE DELETION
  // ========================================
  if (toDelete.length > 0) {
    console.log("2️⃣  Deleting lane ephemeral paths...\n");

    for (const p of toDelete) {
      const fullPath = join(ROOT, p);
      if (!dryRun) {
        rmSync(fullPath, { recursive: true, force: true });
      }
      console.log(`  ✅ Deleted /${p}`);
    }
    console.log("");
  }

  // ========================================
  // COMMIT IF NOT --no-commit
  // ========================================
  if (!opts.noCommit && toDelete.length > 0) {
    console.log("3️⃣  Committing nuke...");
    run("git add -A", { dryRun });
    run(`git commit -m "chore: nuke products/${lane}/src for fresh attempt" --allow-empty`, {
      dryRun,
    });
    console.log("  ✅ Committed\n");
  }

  // ========================================
  // SUMMARY
  // ========================================
  console.log("═".repeat(60));
  console.log("\n💥 NUKE COMPLETE\n");
  console.log(`  Branch: ${currentBranch}`);
  console.log(`  Lane:   ${lane}`);
  console.log(`  Deleted: ${toDelete.length} path(s)`);
  console.log("  Other lanes: intact");
  console.log("  Protected paths: intact");
  console.log("");
  console.log("  The deploy contract is preserved.");
  console.log(`  Build must produce products/${lane}/dist/index.html`);
  console.log("\n" + "═".repeat(60));

  console.log(`
📋 Next steps:

   1. Choose your stack (React, Vue, Svelte, vanilla, etc.)
   2. Install dependencies: npm install <packages>
   3. Create your implementation in products/${lane}/src/
   4. Build: npm run build -- --lane ${lane}
   5. Submit: npm run attempt:submit
`);
}

/**
 * Nuclear reset: Nuke lane src + clean up attempt branches for a PRD.
 *
 * This is the "hard reset" for starting a fresh PRD cycle.
 * Combines nuke with branch cleanup.
 *
 * Lane-scoped: Only affects products/<lane>/src, not repo root.
 * Default lane is 'website' for backwards compatibility.
 */
function cmdReset(opts) {
  const { dryRun, noCommit, prd, force } = opts;
  const lane = opts.lane || "website"; // Default to website lane

  console.log("\n💥 NUCLEAR RESET\n");
  console.log(`  Lane: ${lane}`);
  if (dryRun) console.log("  [DRY RUN MODE]\n");

  // Lane-scoped paths
  const laneRoot = join(ROOT, "products", lane);
  const laneSrcPath = join(laneRoot, "src");
  const laneAppPath = join(laneRoot, "app");
  const laneViteConfig = join(laneRoot, "vite.config.js");

  // Check if we're on main - warn about production
  const currentBranch = run("git branch --show-current", { silent: true, dryRun: false });
  const isMain = currentBranch === "main";

  if (isMain && !force) {
    console.log("  ⚠️  WARNING: You are on main branch!");
    console.log(`  ⚠️  Nuking products/${lane}/src on main will break production.`);
    console.log("");
    console.log("  If you ONLY want to clean up attempt branches (recommended):");
    console.log(`    npm run attempt:reset -- --lane ${lane} --prd v0.2 --no-nuke`);
    console.log("");
    console.log("  If you really want to nuke production too:");
    console.log(`    npm run attempt:reset -- --lane ${lane} --prd v0.2 --force`);
    console.log("");

    // Only do branch cleanup if --prd was provided
    if (prd) {
      console.log(`  Proceeding with branch cleanup only (not nuking products/${lane}/src)...\n`);
      opts.noNuke = true;
    } else {
      fail(`Use --force to nuke products/${lane}/src on main, or run from an attempt branch.`);
    }
  }

  // ========================================
  // Part 1: Nuke lane src (unless --no-nuke or on main without --force)
  // ========================================
  if (!opts.noNuke) {
    console.log(`1️⃣  Nuking products/${lane}/src...\n`);
    console.log("  Will delete:");
    console.log(`    - products/${lane}/src (entire directory)`);
    console.log(`    - products/${lane}/app (if exists)`);
    console.log(`    - products/${lane}/vite.config.js (framework-specific)`);
    console.log("");
  } else {
    console.log(`1️⃣  Skipping products/${lane}/src nuke (production protected)\n`);
  }

  if (!opts.noNuke) {
    // Delete lane src
    if (existsSync(laneSrcPath)) {
      if (!dryRun) rmSync(laneSrcPath, { recursive: true });
      console.log(`  ✅ Deleted products/${lane}/src`);
    } else {
      console.log(`  ⚠️  products/${lane}/src does not exist`);
    }

    // Delete lane app if present
    if (existsSync(laneAppPath)) {
      if (!dryRun) rmSync(laneAppPath, { recursive: true });
      console.log(`  ✅ Deleted products/${lane}/app`);
    }

    // Delete lane vite.config.js (framework-specific)
    if (existsSync(laneViteConfig)) {
      if (!dryRun) rmSync(laneViteConfig);
      console.log(`  ✅ Deleted products/${lane}/vite.config.js`);
    }
  }

  // ========================================
  // Part 2: Clean up attempt branches (if --prd provided)
  // ========================================
  if (prd) {
    console.log(`\n2️⃣  Cleaning up attempt branches for PRD v${prd}...\n`);

    // Find local attempt branches
    const localBranchOutput = run("git branch", { silent: true, dryRun: false });
    const localBranches = localBranchOutput
      .split("\n")
      .map((b) => b.trim().replace("* ", ""))
      .filter((b) => b.startsWith(`attempt/prd-v${prd}/`));

    // Find remote attempt branches
    const remoteBranchOutput = run("git branch -r", { silent: true, dryRun: false });
    const remoteBranches = remoteBranchOutput
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.startsWith(`origin/attempt/prd-v${prd}/`))
      .map((b) => b.replace("origin/", ""));

    console.log(`  Found ${localBranches.length} local branches`);
    console.log(`  Found ${remoteBranches.length} remote branches\n`);

    // Delete local branches
    for (const branch of localBranches) {
      console.log(`  🗑️  Deleting local: ${branch}`);
      if (!dryRun) {
        try {
          run(`git branch -D "${branch}"`, { silent: true });
        } catch (e) {
          console.log(`     ⚠️  Could not delete (might be current branch)`);
        }
      }
    }

    // Delete remote branches
    for (const branch of remoteBranches) {
      console.log(`  🗑️  Deleting remote: origin/${branch}`);
      if (!dryRun) {
        try {
          run(`git push origin --delete "${branch}"`, { silent: true });
        } catch (e) {
          console.log(`     ⚠️  Could not delete remote`);
        }
      }
    }

    // Clean up _runs folder (lane-contained path)
    const runsPath = join(ROOT, "products", lane, "attempts", `prd-v${prd}`, "_runs");
    if (existsSync(runsPath)) {
      console.log(`\n  🗑️  Deleting _runs folder...`);
      if (!dryRun) rmSync(runsPath, { recursive: true });
      console.log("  ✅ Deleted _runs/");
    }

    // Reset registry (lane-contained path)
    const registryPath = join(
      ROOT,
      "products",
      lane,
      "attempts",
      `prd-v${prd}`,
      "ATTEMPT_REGISTRY.json",
    );
    if (existsSync(registryPath)) {
      console.log(`\n  🔄 Resetting attempt registry...`);
      if (!dryRun) {
        const registry = {
          prd_version: prd,
          next_attempt: 1,
          reserved: [],
          sealed: [],
          finalized: [],
          notes: `Reset on ${new Date().toISOString()}. Previous attempts cleared.`,
        };
        writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
      }
      console.log("  ✅ Registry reset to attempt 1");
    }
  }

  // ========================================
  // Part 3: Commit changes
  // ========================================
  if (!noCommit) {
    console.log("\n3️⃣  Committing nuke...");
    run("git add -A", { dryRun });
    const msg = prd
      ? `chore: nuclear reset for PRD v${prd} lane ${lane} - nuked src and cleared attempt branches`
      : `chore: nuke products/${lane}/src for fresh attempt (stack-agnostic)`;
    run(`git commit -m "${msg}" --allow-empty`, { dryRun });
    console.log("  ✅ Committed\n");
  } else {
    console.log("\n  Skipping commit (--no-commit)\n");
  }

  console.log("═".repeat(60));
  console.log("\n💥 NUCLEAR RESET COMPLETE\n");
  console.log(`  Lane: ${lane}`);
  console.log(`  products/${lane}/src is gone. Choose any stack for your attempt.`);
  if (prd) {
    console.log(`  All attempt branches for PRD v${prd} have been deleted.`);
    console.log("  Registry reset - next attempt will be attempt-001.");
  }
  console.log(`  Deploy contract preserved: products/${lane}/dist/index.html after build.`);
  console.log("\n" + "═".repeat(60));

  if (prd) {
    // Auto-cleanup after nuclear reset
    console.log("\n7️⃣  Auto-cleanup: pruning stale worktrees...");
    try {
      run("git worktree prune", { dryRun, silent: true });

      // Remove detached worktrees automatically
      const worktreeOutput = run("git worktree list --porcelain", { silent: true, dryRun: false });
      let cleanedCount = 0;
      let currentPath = null;
      let isDetached = false;

      for (const line of worktreeOutput.split("\n")) {
        if (line.startsWith("worktree ")) {
          // Process previous worktree if it was detached
          if (currentPath && isDetached && currentPath.includes(".cursor/worktrees/")) {
            if (!dryRun) {
              try {
                run(`git worktree remove --force "${currentPath}"`, { silent: true });
                cleanedCount++;
              } catch (e) {
                /* ignore */
              }
            }
          }
          currentPath = line.replace("worktree ", "");
          isDetached = false;
        } else if (line === "detached") {
          isDetached = true;
        }
      }
      // Process last one
      if (currentPath && isDetached && currentPath.includes(".cursor/worktrees/")) {
        if (!dryRun) {
          try {
            run(`git worktree remove --force "${currentPath}"`, { silent: true });
            cleanedCount++;
          } catch (e) {
            /* ignore */
          }
        }
      }

      if (cleanedCount > 0) {
        console.log(`  ✅ Removed ${cleanedCount} orphaned worktrees`);
      } else {
        console.log("  ✅ No orphaned worktrees");
      }

      // Prune stale remote refs
      run("git fetch --prune", { dryRun, silent: true });
      console.log("  ✅ Remote refs pruned\n");
    } catch (e) {
      console.log("  ⚠️  Cleanup encountered errors (non-fatal)\n");
    }

    console.log(`
📋 Ready for fresh attempts:

   1. Commit this state (if not auto-committed)
   2. Push to main: git push origin main
   3. Create worktrees for agents
   4. Paste /docs/PROMPT_ATTEMPT_KICKOFF.txt into each agent

Agents will now start from a clean main with all the latest scripts.
`);
  }
}

/**
 * Register a new run (Phase A of two-phase model).
 * Creates unique run_id, writes .attempt.json, creates _runs/<run_id>/ folder.
 *
 * This is called by each agent inside its worktree at the start of work.
 * No attempt numbers are assigned yet - that happens during finalize.
 *
 * PRD version is automatically read from /docs/PRD.md (single source of truth).
 * If --prd is provided, it must match PRD.md or the command fails.
 *
 * PROVENANCE CAPTURED:
 *   - run_id (unique identifier)
 *   - agent (human-friendly label like cursor-a, cursor-b)
 *   - model (AI model identifier like opus-4.5, gpt-4o)
 *   - git_head (SHA at registration time)
 *   - worktree_path (filesystem location)
 *   - branch (git branch name)
 */
function cmdRegister(opts) {
  const { tool, agent, model, lane, dryRun } = opts;

  // ========================================
  // LANE VALIDATION (Required)
  // ========================================
  if (!lane) {
    console.log(`
Usage: npm run attempt:register -- --lane <lane> --tool <tool> --agent <id> --model <model>

Example:
  npm run attempt:register -- --lane website --tool cursor --agent a --model "claude-opus-4"

Valid lanes: ${VALID_LANES.join(", ")}

Options:
  --lane <lane>   Product lane (required)
  --tool <tool>   Development tool (default: cursor)
  --agent <id>    Agent identifier (default: default)
  --model <model> AI model identifier (recommended)
`);
    process.exit(1);
  }

  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(", ")}`);
  }

  // Parse PRD version from lane-specific PRD
  // Primary location (lane-contained): /products/<lane>/PRD.md
  // Legacy location: /docs/PRD/<lane>/PRD.md
  const lanePrdPaths = [
    join(ROOT, "products", lane, "PRD.md"), // Lane-contained (primary)
    join(ROOT, "docs", "PRD", lane, "PRD.md"), // Legacy location
  ];
  let activePrd = null;
  let foundPrdPath = null;

  for (const lanePrdPath of lanePrdPaths) {
    if (existsSync(lanePrdPath)) {
      foundPrdPath = lanePrdPath;
      const content = readFileSync(lanePrdPath, "utf8");
      // Match table format: | **PRD Version** | v0.3 |
      const tableMatch = content.match(/\|\s*\*\*PRD Version\*\*\s*\|\s*v?([0-9.]+)\s*\|/i);
      if (tableMatch) {
        activePrd = tableMatch[1];
        break;
      }
      // Match bold key-value format with colon inside OR outside bold markers:
      // - **PRD Version:** v0.3  (colon inside)
      // - **PRD Version**: v0.3  (colon outside)
      const boldKvMatch = content.match(/\*\*PRD Version:?\*\*:?\s*v?([0-9.]+)/i);
      if (boldKvMatch) {
        activePrd = boldKvMatch[1];
        break;
      }
      // Match plain key-value format: PRD Version: v0.3
      const kvMatch = content.match(/PRD Version:\s*v?([0-9.]+)/i);
      if (kvMatch) {
        activePrd = kvMatch[1];
        break;
      }
    }
  }

  // Fallback to old single PRD.md location
  if (!activePrd) {
    activePrd = parsePrdVersion();
  }

  if (!activePrd) {
    fail(
      `Could not parse PRD version from /products/${lane}/PRD.md or /docs/PRD/${lane}/PRD.md.\n` +
        "   Expected format: | **PRD Version** | v0.3 | (in table)\n" +
        "   Or: PRD Version: v0.3",
    );
  }

  // If --prd was provided, validate it matches the active PRD
  if (opts.prd && opts.prd !== activePrd) {
    fail(
      `PRD mismatch detected!\n\n` +
        `   --prd argument:     v${opts.prd}\n` +
        `   /docs/PRD.md says:  v${activePrd}\n\n` +
        `   The PRD version in /docs/PRD.md is the source of truth.\n` +
        `   Update your prompt or use:\n\n` +
        `     npm run attempt:register\n\n` +
        `   (no --prd argument needed)`,
    );
  }

  const prd = activePrd;

  console.log(`\n🎫 Registering run for PRD v${prd} (lane: ${lane})\n`);
  const prdDisplayPath = foundPrdPath
    ? foundPrdPath.replace(ROOT + "/", "")
    : `products/${lane}/PRD.md`;
  console.log(`  (Version auto-detected from ${prdDisplayPath})\n`);
  if (dryRun) console.log("  [DRY RUN MODE]\n");

  // ========================================
  // PROVENANCE WARNINGS
  // ========================================
  const modelId = model || "unknown";
  if (!model) {
    console.log("  ⚠️  WARNING: --model not provided");
    console.log("     Provenance will be degraded. Re-run with --model if possible.");
    console.log("");
    console.log(
      '     Example: npm run attempt:register -- --tool cursor --agent a --model "opus-4.5"',
    );
    console.log("");
  }

  // Generate unique run ID
  const runId = generateRunId();
  const timestamp = new Date().toISOString();

  // Capture git state for provenance
  let currentBranch = "unknown";
  let gitHead = "unknown";
  let isDetached = false;

  try {
    currentBranch = run("git branch --show-current", { silent: true, dryRun: false }) || "";
    gitHead = run("git rev-parse HEAD", { silent: true, dryRun: false });
    isDetached = !currentBranch;
  } catch (e) {
    console.log("  ⚠️  Could not read git state");
  }

  // Capture worktree path
  const worktreePath = ROOT;

  // Generate provenance-aware branch name (MUST include lane)
  const targetBranch = generateBranchName(lane, prd, tool, agent, modelId, runId);

  // ========================================
  // BRANCH VALIDATION (Critical - enforced by repo rules)
  // ========================================
  // Refuse to register if on main or prod
  if (currentBranch === "main") {
    fail(
      "Cannot register on main branch.\n" +
        "   Create an attempt branch first:\n" +
        `   git checkout -b ${targetBranch}`,
    );
  }
  if (currentBranch === "prod") {
    fail(
      "Cannot register on prod branch.\n" +
        "   prod is the live production deployment. Use an attempt branch.",
    );
  }

  // Refuse if branch doesn't start with run/ or attempt/
  const isValidBranchType =
    currentBranch && (currentBranch.startsWith("run/") || currentBranch.startsWith("attempt/"));

  if (currentBranch && !isValidBranchType) {
    console.log(`\n  ⚠️  INVALID BRANCH TYPE: ${currentBranch}\n`);
    console.log("  Branches must start with run/ or attempt/");
    console.log("  This enforces provenance tracking and prevents branch chaos.\n");
    console.log(`  Create the correct branch:\n     git checkout -b ${targetBranch}\n`);
    fail("Branch must start with run/ or attempt/");
  }

  // If on a run/* branch, validate it includes lane in the correct position
  if (currentBranch && currentBranch.startsWith("run/")) {
    const validation = validateBranchName(currentBranch, lane);
    if (!validation.valid) {
      console.log("\n  ⚠️  BRANCH NAMING ERROR:\n");
      validation.errors.forEach((e) => console.log(`     ${e}`));
      console.log("\n  Your branch name is missing required components.");
      console.log(`  Expected format: run/<lane>/prd-v<prd>/<tool>/<agent>/<model>/<run_id>`);
      console.log(`\n  Suggested branch name:\n     ${targetBranch}\n`);
      fail("Branch name does not match required format. Rename your branch or create a new one.");
    }
  }

  // Lane-scoped paths
  const laneRoot = `products/${lane}`;
  const distDir = `products/${lane}/dist`;

  // Attempt artifact paths (lane-contained: /products/<lane>/attempts/...)
  const prdFolder = join(ROOT, "products", lane, "attempts", `prd-v${prd}`);
  const runsFolder = join(prdFolder, "_runs");
  const runFolder = join(runsFolder, runId);
  const runsDir = `products/${lane}/attempts/prd-v${prd}/_runs/${runId}`;

  console.log("1️⃣  Creating run folder...");
  if (!dryRun) {
    mkdirSync(join(runFolder, "evidence"), { recursive: true });
  }
  console.log(`  ✅ Created: ${runsDir}/\n`);

  // Write .attempt.json in worktree root (local provenance)
  console.log("2️⃣  Writing .attempt.json...");
  const attemptMeta = {
    // IDENTITY
    lane: lane,
    prd_version: `v${prd}`,
    run_id: runId,

    // LANE PATHS
    lane_root: laneRoot,
    dist_dir: distDir,

    // PROVENANCE (who/what made this)
    tool: tool, // cursor, vscode, cli, etc.
    agent: agent, // agent ID within tool (a, b, cursor-a, etc.)
    model: modelId, // AI model (opus-4.5, gpt-4o, unknown)

    // GIT STATE (captured at registration)
    worktree_path: worktreePath,
    branch: currentBranch || targetBranch,
    target_branch: targetBranch, // suggested branch name (convenience, not required)
    git_head: gitHead,
    is_detached: isDetached,

    // TIMESTAMPS
    registered_at: timestamp,

    // ARTIFACT LOCATION
    runs_dir: runsDir,
  };
  if (!dryRun) {
    writeFileSync(join(ROOT, ".attempt.json"), JSON.stringify(attemptMeta, null, 2) + "\n");
  }
  console.log("  ✅ Written .attempt.json\n");

  // Write skeleton META.json in run folder (merges to main)
  // NOTE: Branch names are optional convenience. Provenance lives in META.
  console.log("3️⃣  Creating skeleton files...");
  const meta = {
    // IDENTITY
    lane: lane,
    prd_version: `v${prd}`,
    epoch_id: "E0004-epistemic-separation-era", // Current epoch
    run_id: runId,
    attempt: null, // Will be assigned during finalize

    // LANE PATHS
    lane_root: laneRoot,
    dist_dir: distDir,

    // PROVENANCE (who/what made this — this is the canonical record)
    tool: tool, // cursor, vscode, cli, etc.
    agent: agent, // agent ID within tool
    model: modelId, // AI model identifier

    // GIT STATE (captured at registration)
    worktree_path: worktreePath,
    branch: currentBranch || targetBranch,
    target_branch: targetBranch, // suggested branch (convenience only)
    git_head: gitHead,

    // TIMESTAMPS
    registered_at: timestamp,
    completed_at: null,
    finalized_at: null,

    // STATUS
    status: "OPEN", // OPEN → CLOSED/ABANDONED

    // EVIDENCE (to be filled)
    evidence_index: [],
    preview_url: null,
  };
  if (!dryRun) {
    writeFileSync(join(runFolder, "META.json"), JSON.stringify(meta, null, 2) + "\n");
    writeFileSync(
      join(runFolder, "ATTEMPT.md"),
      `# Attempt (Run ${runId})\n\n## Summary\n\n_TODO: Describe what was built_\n\n## Approach\n\n_TODO: Describe the approach taken_\n`,
    );
    writeFileSync(
      join(runFolder, "EVIDENCE.md"),
      `# Evidence (Run ${runId})\n\n## Screenshots\n\n_TODO: Add evidence files to evidence/ folder and reference them here_\n`,
    );
  }
  console.log("  ✅ Created META.json, ATTEMPT.md, EVIDENCE.md\n");

  // Print summary
  console.log("═".repeat(60));
  console.log("\n🎫 RUN REGISTERED\n");
  console.log(`  Lane:          ${lane}`);
  console.log(`  PRD Version:   v${prd}`);
  console.log(`  Epoch:         E0004-epistemic-separation-era`);
  console.log(`  Run ID:        ${runId}`);
  console.log("");
  console.log("  LANE PATHS:");
  console.log(`    Source:      ${laneRoot}/src/`);
  console.log(`    Build:       ${distDir}/`);
  console.log("");
  console.log("  PROVENANCE (canonical record in META.json):");
  console.log(`    Tool:        ${tool}`);
  console.log(`    Agent:       ${agent}`);
  console.log(`    Model:       ${modelId}${modelId === "unknown" ? " ⚠️" : ""}`);
  console.log(`    Git HEAD:    ${gitHead.substring(0, 8)}`);
  console.log(`    Worktree:    ${worktreePath}`);
  console.log("");
  console.log("  BRANCH:");
  console.log(`    Current:     ${currentBranch || "(detached)"}`);
  console.log(`    Target:      ${targetBranch}`);
  console.log("");
  console.log(`  Artifacts:     ${runsDir}/`);
  console.log("\n" + "═".repeat(60));

  // Suggest branch rename if not on target branch
  const branchHint =
    currentBranch !== targetBranch
      ? `\n   Optional: rename branch to match provenance:\n   git checkout -b ${targetBranch}\n`
      : "";

  console.log(`
📋 Next steps:

   1. Build your implementation in this worktree
   2. Write artifacts to: ${runsDir}/
   3. When done, commit and push
   4. After all agents finish, run on main:
      npm run attempt:finalize -- --prd v${prd}
${branchHint}`);
}

/**
 * Finalize all runs for a PRD version (Phase B of two-phase model).
 * Reads all _runs/<run_id>/, assigns sequential attempt numbers,
 * moves folders to attempt-00N, updates META.json.
 *
 * This is run once on main after all agents have completed.
 */
function cmdFinalize(opts) {
  const { prd, lane, dryRun } = opts;

  if (!prd || !lane) {
    console.log(`
Usage: npm run attempt:finalize -- --lane <lane> --prd <version>

Example:
  npm run attempt:finalize -- --lane website --prd v1.0

Valid lanes: ${VALID_LANES.join(", ")}

Options:
  --lane <lane>     Product lane (required)
  --prd <version>   PRD version (required)
  --dry-run         Show what would happen
`);
    process.exit(1);
  }

  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(", ")}`);
  }

  console.log(`\n🏁 Finalizing runs for PRD v${prd} (lane: ${lane})\n`);
  if (dryRun) console.log("  [DRY RUN MODE]\n");

  // Lane-contained path: /products/<lane>/attempts/prd-vX.Y/
  const prdFolder = join(ROOT, "products", lane, "attempts", `prd-v${prd}`);
  const runsFolder = join(prdFolder, "_runs");
  const registryPath = join(prdFolder, "ATTEMPT_REGISTRY.json");

  // Check _runs exists
  if (!existsSync(runsFolder)) {
    fail(`No _runs folder found at ${runsFolder}`);
  }

  // Read all run folders
  console.log("1️⃣  Reading runs...");
  const runIds = readdirSync(runsFolder).filter((f) => {
    const metaPath = join(runsFolder, f, "META.json");
    return existsSync(metaPath);
  });

  if (runIds.length === 0) {
    fail("No runs found to finalize");
  }
  console.log(`  ✅ Found ${runIds.length} runs\n`);

  // Read META.json for each run and sort by timestamp
  const runs = runIds
    .map((runId) => {
      const metaPath = join(runsFolder, runId, "META.json");
      const meta = JSON.parse(readFileSync(metaPath, "utf8"));
      return { runId, meta, path: join(runsFolder, runId) };
    })
    .sort((a, b) => {
      // Sort by registration timestamp
      return new Date(a.meta.registered_at) - new Date(b.meta.registered_at);
    });

  // Read or create registry
  console.log("2️⃣  Reading attempt registry...");
  let registry;
  if (existsSync(registryPath)) {
    registry = JSON.parse(readFileSync(registryPath, "utf8"));
    // Ensure finalized array exists (might be old format)
    if (!registry.finalized) {
      registry.finalized = [];
    }
  } else {
    registry = {
      prd_version: prd,
      next_attempt: 1,
      finalized: [],
    };
  }
  console.log(`  ✅ Next attempt number: ${registry.next_attempt}\n`);

  // Assign attempt numbers and move folders
  console.log("3️⃣  Assigning attempt numbers and moving folders...\n");
  const finalized = [];

  for (const run of runs) {
    const attemptNum = registry.next_attempt;
    const attemptPadded = String(attemptNum).padStart(3, "0");
    const newFolderName = `attempt-${attemptPadded}`;
    const newPath = join(prdFolder, newFolderName);

    console.log(`  ${run.runId} → ${newFolderName}`);
    console.log(`    Agent: ${run.meta.agent}, Branch: ${run.meta.branch}`);

    if (!dryRun) {
      // Update META.json with attempt number
      run.meta.attempt = attemptPadded;
      run.meta.finalized_at = new Date().toISOString();
      run.meta.status = "sealed";
      writeFileSync(join(run.path, "META.json"), JSON.stringify(run.meta, null, 2) + "\n");

      // Move folder
      if (existsSync(newPath)) {
        fail(`Target folder already exists: ${newPath}`);
      }
      // Use fs.rename would be better but for safety we copy then remove
      execSync(`mv "${run.path}" "${newPath}"`, { cwd: ROOT });

      // Update registry
      registry.next_attempt = attemptNum + 1;
      registry.finalized.push({
        attempt: attemptNum,
        run_id: run.runId,
        agent: run.meta.agent,
        branch: run.meta.branch,
        finalized_at: run.meta.finalized_at,
      });
    }

    finalized.push({
      runId: run.runId,
      attemptPadded,
      agent: run.meta.agent,
      branch: run.meta.branch,
    });

    console.log("");
  }

  // Write updated registry
  if (!dryRun) {
    writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");

    // Remove empty _runs folder
    const remaining = readdirSync(runsFolder);
    if (remaining.length === 0) {
      rmSync(runsFolder, { recursive: true });
    }
  }

  // Print summary
  console.log("═".repeat(80));
  console.log("\n🏁 FINALIZATION COMPLETE\n");
  console.log("  Run ID   │ Attempt │ Agent              │ Branch");
  console.log("  ─────────┼─────────┼────────────────────┼─────────────────────────────");
  for (const f of finalized) {
    console.log(`  ${f.runId} │ ${f.attemptPadded}     │ ${f.agent.padEnd(18)} │ ${f.branch}`);
  }
  console.log("\n" + "═".repeat(80));

  console.log(`
📋 Next steps:

   1. Review each attempt's artifacts in products/${lane}/attempts/prd-v${prd}/
   2. Pick champion based on evidence
   3. Promote winner:
      npm run attempt:promote -- --lane ${lane} --prd v${prd} --attempt <number>
`);
}

/**
 * PROMOTE: Ship a winner to production.
 *
 * Steps:
 *   1. Validate attempt exists
 *   2. Merge attempt branch → main
 *   3. Fast-forward prod to main
 *   4. Tag with prd-vX.Y-attempt-00N and production-vX.Y
 *
 * Result:
 *   - prod deploys (Cloudflare production)
 *   - main reflects shipped code
 *   - history preserved
 */
function cmdPromote(opts) {
  const { prd, attempt, lane, dryRun, force } = opts;

  if (!prd || !attempt || !lane) {
    console.log(`
Usage: npm run attempt:promote -- --lane <lane> --prd <version> --attempt <number>

Example:
  npm run attempt:promote -- --lane website --prd v1.0 --attempt 001

Valid lanes: ${VALID_LANES.join(", ")}

Options:
  --lane <lane>       Product lane (required)
  --prd <version>     PRD version (required)
  --attempt <number>  Attempt number (required)
  --dry-run           Show what would happen
  --force             Skip confirmation prompts
`);
    process.exit(1);
  }

  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(", ")}`);
  }

  console.log(`\n🏆 PROMOTING CHAMPION\n`);
  console.log(`  Lane:    ${lane}`);
  console.log(`  PRD:     v${prd}`);
  console.log(`  Attempt: ${attempt}\n`);
  if (dryRun) console.log("  [DRY RUN MODE]\n");

  // ========================================
  // 1. Validate attempt exists
  // ========================================
  console.log("1️⃣  Validating attempt...");
  // Lane-contained path: /products/<lane>/attempts/prd-vX.Y/attempt-NNN/
  const attemptFolder = join(
    ROOT,
    "products",
    lane,
    "attempts",
    `prd-v${prd}`,
    `attempt-${attempt}`,
  );
  const metaPath = join(attemptFolder, "META.json");

  if (!existsSync(metaPath)) {
    fail(`Attempt not found: ${attemptFolder}`);
  }

  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  const attemptBranch = meta.branch;

  if (!attemptBranch) {
    fail("META.json missing branch information");
  }

  console.log(`  ✅ Found: ${attemptFolder}`);
  console.log(`     Branch: ${attemptBranch}`);
  console.log(`     Agent: ${meta.agent || "unknown"}\n`);

  // ========================================
  // 2. Ensure clean state on main
  // ========================================
  console.log("2️⃣  Preparing main branch...");

  const currentBranch = run("git branch --show-current", { silent: true, dryRun: false });
  if (currentBranch !== "main") {
    run("git checkout main", { dryRun });
  }
  run("git pull origin main", { dryRun });
  console.log("  ✅ Main is up to date\n");

  // ========================================
  // 3. Merge attempt branch to main
  // ========================================
  console.log("3️⃣  Merging attempt branch to main...");

  // Fetch the branch
  run(`git fetch origin ${attemptBranch}`, { dryRun });

  // Merge (no fast-forward to preserve history)
  const mergeMsg = `Promote prd-v${prd} attempt-${attempt} to main`;
  run(`git merge origin/${attemptBranch} --no-ff -m "${mergeMsg}"`, { dryRun });

  console.log("  ✅ Merged to main\n");

  // ========================================
  // 4. Tag the merge
  // ========================================
  console.log("4️⃣  Creating tags...");

  const attemptTag = `prd-v${prd}-attempt-${attempt}`;
  const prodTag = `production-v${prd}`;

  run(`git tag -a ${attemptTag} -m "PRD v${prd} Attempt ${attempt} promoted"`, { dryRun });

  // Delete old production tag if exists, then create new one
  try {
    run(`git tag -d ${prodTag}`, { silent: true, dryRun });
    run(`git push origin :refs/tags/${prodTag}`, { silent: true, dryRun });
  } catch (e) {
    // Tag didn't exist, that's fine
  }
  run(`git tag -a ${prodTag} -m "Production release for PRD v${prd}"`, { dryRun });

  console.log(`  ✅ Tagged: ${attemptTag}`);
  console.log(`  ✅ Tagged: ${prodTag}\n`);

  // ========================================
  // 5. Push main with tags
  // ========================================
  console.log("5️⃣  Pushing main...");
  run("git push origin main --tags", { dryRun });
  console.log("  ✅ Main pushed with tags\n");

  // ========================================
  // 6. Fast-forward prod to main
  // ========================================
  console.log("6️⃣  Fast-forwarding prod to main...");

  run("git checkout prod", { dryRun });
  run("git pull origin prod", { dryRun });
  run("git merge main --ff-only", { dryRun });
  run("git push origin prod", { dryRun });

  console.log("  ✅ prod now matches main\n");

  // Switch back to main
  run("git checkout main", { dryRun });

  // ========================================
  // 7. Update META.json with promotion status
  // ========================================
  if (!dryRun) {
    meta.promoted_at = new Date().toISOString();
    meta.status = "champion";
    meta.production_tag = prodTag;
    writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");
    run("git add " + metaPath, { silent: true });
    run('git commit -m "Mark attempt-' + attempt + ' as champion"', { silent: true });
    run("git push origin main", { silent: true });
  }

  // ========================================
  // SUMMARY
  // ========================================
  console.log("═".repeat(60));
  console.log("\n🏆 PROMOTION COMPLETE\n");
  console.log(`  Champion:        attempt-${attempt}`);
  console.log(`  Merged to:       main`);
  console.log(`  Production:      prod (fast-forwarded)`);
  console.log(`  Tags:            ${attemptTag}, ${prodTag}`);
  console.log("");
  console.log("  Cloudflare will now deploy prod → production URL");
  console.log("\n" + "═".repeat(60));

  console.log(`
📋 What happened:

   1. Attempt branch merged → main (with history)
   2. main pushed with tags
   3. prod fast-forwarded to match main
   4. Cloudflare deploys prod → klappy.dev

Production is now live with the champion's code!
`);
}

/**
 * Submit current work (commit + push for Cloudflare preview).
 *
 * This is for agents to publish their work-in-progress or final state.
 * Ensures the branch is pushed so Cloudflare can generate a preview URL.
 */
function cmdSubmit(opts) {
  const { dryRun } = opts;
  const message = opts.message || "Attempt progress";

  console.log("\n📤 SUBMITTING ATTEMPT\n");
  if (dryRun) console.log("  [DRY RUN MODE]\n");

  // Check .attempt.json exists
  const attemptJsonPath = join(ROOT, ".attempt.json");
  if (!existsSync(attemptJsonPath)) {
    fail("No .attempt.json found. Run attempt:register first.");
  }

  const attemptMeta = JSON.parse(readFileSync(attemptJsonPath, "utf8"));
  const { prd, run_id, runs_dir, branch } = attemptMeta;

  console.log(`  PRD:       ${prd}`);
  console.log(`  Run ID:    ${run_id}`);
  console.log(`  Branch:    ${branch}`);
  console.log(`  Artifacts: ${runs_dir}/\n`);

  // Check we're on the right branch
  const currentBranch = run("git branch --show-current", { silent: true, dryRun: false });
  if (currentBranch !== branch) {
    console.log(`  ⚠️  Expected branch: ${branch}`);
    console.log(`     Current branch:  ${currentBranch}`);
    console.log("     Proceeding anyway...\n");
  }

  // Stage changes
  console.log("1️⃣  Staging changes...");

  // Always stage these if they exist
  const pathsToStage = [
    runs_dir,
    "src",
    "app",
    "public",
    "package.json",
    "package-lock.json",
    "vite.config.js",
    "vite.config.ts",
    ".attempt.json",
  ];

  for (const p of pathsToStage) {
    const fullPath = join(ROOT, p);
    if (existsSync(fullPath)) {
      run(`git add "${p}"`, { dryRun, silent: true });
    }
  }
  console.log("  ✅ Staged\n");

  // Check evidence completeness (warn but don't block)
  console.log("📋 Evidence check...");
  const evidenceDir = join(ROOT, runs_dir, "evidence");
  const attemptMdPath = join(ROOT, runs_dir, "ATTEMPT.md");
  const evidenceMdPath = join(ROOT, runs_dir, "EVIDENCE.md");

  let evidenceWarnings = [];

  // Check ATTEMPT.md has content beyond skeleton
  if (existsSync(attemptMdPath)) {
    const content = readFileSync(attemptMdPath, "utf8");
    if (content.includes("_TODO:") || content.includes("[Describe") || content.length < 500) {
      evidenceWarnings.push(
        "ATTEMPT.md appears incomplete (still has placeholders or is too short)",
      );
    }
  } else {
    evidenceWarnings.push("ATTEMPT.md does not exist");
  }

  // Check EVIDENCE.md has content beyond skeleton
  if (existsSync(evidenceMdPath)) {
    const content = readFileSync(evidenceMdPath, "utf8");
    if (content.includes("_TODO:") || content.includes("_No screenshots") || content.length < 300) {
      evidenceWarnings.push(
        "EVIDENCE.md appears incomplete (still has placeholders or is too short)",
      );
    }
  } else {
    evidenceWarnings.push("EVIDENCE.md does not exist");
  }

  // Check evidence folder has screenshots
  if (existsSync(evidenceDir)) {
    const files = readdirSync(evidenceDir);
    const screenshots = files.filter(
      (f) => f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg"),
    );
    if (screenshots.length < 3) {
      evidenceWarnings.push(
        `evidence/ folder has only ${screenshots.length} screenshots (need at least 3)`,
      );
    }
  } else {
    evidenceWarnings.push("evidence/ folder does not exist");
  }

  if (evidenceWarnings.length > 0) {
    console.log("\n  ⚠️  EVIDENCE INCOMPLETE:\n");
    evidenceWarnings.forEach((w) => console.log(`     - ${w}`));
    console.log("\n  You should fix these before your final submit.\n");
    console.log("  Required: ATTEMPT.md, EVIDENCE.md, 3+ screenshots in evidence/\n");
  } else {
    console.log("  ✅ Evidence looks complete\n");
  }

  // Check if there's anything to commit
  const status = run("git status --porcelain", { silent: true, dryRun: false });
  if (!status) {
    console.log("  ℹ️  Nothing new to commit. Pushing existing commits...\n");
  } else {
    // Commit
    console.log("2️⃣  Committing...");
    const commitMsg = `${message} [run: ${run_id}]`;
    run(`git commit -m "${commitMsg}"`, { dryRun });
    console.log("  ✅ Committed\n");
  }

  // Push
  console.log("3️⃣  Pushing to origin...");
  run(`git push -u origin HEAD`, { dryRun });
  console.log("  ✅ Pushed\n");

  // Generate preview URL
  const previewUrl = `https://${branch.replace(/\//g, "-")}.klappy-dev.pages.dev`;

  // Update META.json with preview URL
  const metaPath = join(ROOT, runs_dir, "META.json");
  if (existsSync(metaPath) && !dryRun) {
    const meta = JSON.parse(readFileSync(metaPath, "utf8"));
    meta.preview_url = previewUrl;
    meta.last_submitted = new Date().toISOString();
    writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");
  }

  console.log("═".repeat(60));
  console.log("\n📤 SUBMITTED\n");
  console.log(`  Preview URL: ${previewUrl}`);
  console.log("  (May take 1-2 min for Cloudflare to build)\n");
  console.log("  Check build status:");
  console.log("    - GitHub: https://github.com/klappy/klappy.dev/actions");
  console.log("    - Cloudflare: Pages dashboard → Deployments");
  console.log("\n" + "═".repeat(60));
}

/**
 * Import artifacts from attempt branches back to main.
 *
 * This is run on main to pull in artifacts from completed attempt branches
 * without merging their code.
 */
/**
 * CLEANUP: Prune stale worktrees and branches.
 *
 * This should be run periodically or after a PRD cycle completes.
 * Removes:
 *   - Orphaned git worktrees
 *   - Local branches with deleted remotes
 *   - Stale remote tracking refs
 */
function cmdCleanup(opts) {
  const { dryRun, force } = opts;

  console.log("\n🧹 CLEANUP — Pruning Stale Worktrees & Branches\n");
  if (dryRun) console.log("  [DRY RUN MODE]\n");

  // ========================================
  // 1. Prune git worktree registry
  // ========================================
  console.log("1️⃣  Pruning worktree registry...");
  run("git worktree prune", { dryRun });
  console.log("  ✅ Registry pruned\n");

  // ========================================
  // 2. Find and remove orphaned worktrees
  // ========================================
  console.log("2️⃣  Scanning for orphaned worktrees...");

  const worktreeOutput = run("git worktree list --porcelain", { silent: true, dryRun: false });
  const worktrees = [];
  let current = {};

  for (const line of worktreeOutput.split("\n")) {
    if (line.startsWith("worktree ")) {
      if (current.path) worktrees.push(current);
      current = { path: line.replace("worktree ", "") };
    } else if (line.startsWith("HEAD ")) {
      current.head = line.replace("HEAD ", "");
    } else if (line.startsWith("branch ")) {
      current.branch = line.replace("branch refs/heads/", "");
    } else if (line === "detached") {
      current.detached = true;
    }
  }
  if (current.path) worktrees.push(current);

  // Filter to only Cursor worktrees (in .cursor/worktrees/)
  const cursorWorktrees = worktrees.filter((w) => w.path.includes(".cursor/worktrees/"));
  const mainWorktree = worktrees.find((w) => !w.path.includes(".cursor/worktrees/"));

  console.log(`  Found ${cursorWorktrees.length} Cursor worktrees\n`);

  if (cursorWorktrees.length === 0) {
    console.log("  ✅ No worktrees to clean\n");
  } else {
    // Categorize worktrees
    const detached = cursorWorktrees.filter((w) => w.detached);
    const withBranch = cursorWorktrees.filter((w) => w.branch);

    console.log(`  Detached HEAD (orphans): ${detached.length}`);
    console.log(`  With branches: ${withBranch.length}\n`);

    // Remove detached worktrees (always safe - they're orphans)
    if (detached.length > 0) {
      console.log("  Removing detached worktrees:");
      for (const wt of detached) {
        const shortPath = wt.path.split("/").slice(-1)[0];
        console.log(`    🗑️  ${shortPath} (detached at ${wt.head.substring(0, 7)})`);
        if (!dryRun) {
          try {
            run(`git worktree remove --force "${wt.path}"`, { silent: true });
          } catch (e) {
            console.log(`       ⚠️  Could not remove (may need manual cleanup)`);
          }
        }
      }
      console.log("");
    }

    // For worktrees with branches, check if remote exists
    if (withBranch.length > 0 && force) {
      console.log("  Removing branch worktrees (--force):");
      for (const wt of withBranch) {
        const shortPath = wt.path.split("/").slice(-1)[0];
        console.log(`    🗑️  ${shortPath} [${wt.branch}]`);
        if (!dryRun) {
          try {
            run(`git worktree remove --force "${wt.path}"`, { silent: true });
          } catch (e) {
            console.log(`       ⚠️  Could not remove`);
          }
        }
      }
      console.log("");
    } else if (withBranch.length > 0) {
      console.log("  ⚠️  Skipping branch worktrees (use --force to remove)");
      for (const wt of withBranch) {
        const shortPath = wt.path.split("/").slice(-1)[0];
        console.log(`     - ${shortPath} [${wt.branch}]`);
      }
      console.log("");
    }
  }

  // ========================================
  // 3. Prune stale remote tracking refs
  // ========================================
  console.log("3️⃣  Pruning stale remote tracking refs...");
  run("git fetch --prune", { dryRun });
  console.log("  ✅ Remote refs pruned\n");

  // ========================================
  // 4. Find and delete local branches with gone remotes
  // ========================================
  console.log("4️⃣  Finding local branches with deleted remotes...");

  const branchOutput = run("git branch -vv", { silent: true, dryRun: false });
  const goneBranches = [];

  for (const line of branchOutput.split("\n")) {
    if (line.includes(": gone]")) {
      // Extract branch name (skip leading * or spaces)
      const match = line.match(/^[\s*]+(\S+)/);
      if (match && match[1] !== "main" && match[1] !== "prod") {
        goneBranches.push(match[1]);
      }
    }
  }

  if (goneBranches.length === 0) {
    console.log("  ✅ No stale local branches\n");
  } else {
    console.log(`  Found ${goneBranches.length} stale branches:\n`);
    for (const branch of goneBranches) {
      console.log(`    🗑️  ${branch}`);
      if (!dryRun) {
        try {
          run(`git branch -D "${branch}"`, { silent: true });
        } catch (e) {
          console.log(`       ⚠️  Could not delete`);
        }
      }
    }
    console.log("");
  }

  // ========================================
  // 5. Find local attempt branches without remotes
  // ========================================
  console.log("5️⃣  Finding orphan attempt branches...");

  const localBranches = run("git branch", { silent: true, dryRun: false })
    .split("\n")
    .map((b) => b.trim().replace("* ", ""))
    .filter((b) => b.startsWith("attempt/"));

  const remoteBranches = run("git branch -r", { silent: true, dryRun: false })
    .split("\n")
    .map((b) => b.trim().replace("origin/", ""))
    .filter((b) => b.startsWith("attempt/"));

  const orphanBranches = localBranches.filter(
    (b) => !remoteBranches.includes(b) && !goneBranches.includes(b),
  );

  if (orphanBranches.length === 0) {
    console.log("  ✅ No orphan attempt branches\n");
  } else if (force) {
    console.log(`  Found ${orphanBranches.length} orphan branches:\n`);
    for (const branch of orphanBranches) {
      console.log(`    🗑️  ${branch}`);
      if (!dryRun) {
        try {
          run(`git branch -D "${branch}"`, { silent: true });
        } catch (e) {
          console.log(`       ⚠️  Could not delete`);
        }
      }
    }
    console.log("");
  } else {
    console.log(`  ⚠️  Found ${orphanBranches.length} orphan branches (use --force to delete):`);
    for (const branch of orphanBranches) {
      console.log(`     - ${branch}`);
    }
    console.log("");
  }

  // ========================================
  // SUMMARY
  // ========================================
  console.log("═".repeat(60));
  console.log("\n🧹 CLEANUP COMPLETE\n");
  console.log("  Run with --force to remove branch worktrees and orphan branches.");
  console.log("  Run with --dry-run to preview changes.");
  console.log("\n" + "═".repeat(60));
}

function cmdImport(opts) {
  const { prd, lane, dryRun } = opts;

  if (!prd || !lane) {
    console.log(`
Usage: npm run attempt:import -- --lane <lane> --prd <version>

Example:
  npm run attempt:import -- --lane website --prd v1.0

This imports all _runs/ artifacts from attempt branches back to main.

Valid lanes: ${VALID_LANES.join(", ")}

Options:
  --lane <lane>     Product lane (required)
  --prd <version>   PRD version (required)
  --dry-run         Show what would happen
`);
    process.exit(1);
  }

  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(", ")}`);
  }

  console.log(`\n📥 IMPORTING ARTIFACTS for PRD v${prd} (lane: ${lane})\n`);
  if (dryRun) console.log("  [DRY RUN MODE]\n");

  // Check we're on main
  const currentBranch = run("git branch --show-current", { silent: true, dryRun: false });
  if (currentBranch !== "main") {
    fail(`Must be on main branch. Currently on: ${currentBranch}`);
  }
  console.log("  ✅ On main branch\n");

  // Pull latest main
  console.log("1️⃣  Pulling latest main...");
  run("git pull origin main", { dryRun });
  console.log("  ✅ Main up to date\n");

  // Find all attempt branches for this PRD and lane
  console.log("2️⃣  Finding attempt branches...");
  const branchOutput = run("git branch -r", { silent: true, dryRun: false });
  // Match run/<lane>/prd-v<prd>/... branches
  const branchPattern = new RegExp(`origin/run/${lane}/prd-v${prd}/`);
  const branches = branchOutput
    .split("\n")
    .map((b) => b.trim())
    .filter((b) => branchPattern.test(b))
    .map((b) => b.replace("origin/", ""));

  if (branches.length === 0) {
    fail(`No attempt branches found for PRD v${prd}`);
  }
  console.log(`  ✅ Found ${branches.length} branches:\n`);
  branches.forEach((b) => console.log(`     - ${b}`));
  console.log("");

  // Fetch all remote branches
  console.log("3️⃣  Fetching remote branches...");
  run("git fetch --all", { dryRun });
  console.log("  ✅ Fetched\n");

  // Import artifacts from each branch
  console.log("4️⃣  Importing artifacts from each branch...\n");
  // Lane-contained path
  const runsPath = `products/${lane}/attempts/prd-v${prd}/_runs`;
  let imported = 0;

  for (const branch of branches) {
    console.log(`  📦 ${branch}`);

    // Check if _runs/ exists on that branch
    try {
      run(`git checkout origin/${branch} -- ${runsPath}`, { dryRun, silent: true });
      console.log(`     ✅ Imported artifacts`);
      imported++;
    } catch (e) {
      console.log(`     ⚠️  No _runs/ folder found`);
    }
  }

  if (imported === 0) {
    console.log("\n  ⚠️  No artifacts found to import");
    return;
  }

  console.log("");

  // Stage and commit
  console.log("5️⃣  Committing imported artifacts...");
  run(`git add ${runsPath}`, { dryRun });
  run(`git commit -m "Import attempt artifacts for PRD v${prd}"`, { dryRun });
  console.log("  ✅ Committed\n");

  // Push
  console.log("6️⃣  Pushing to main...");
  run("git push origin main", { dryRun });
  console.log("  ✅ Pushed\n");

  console.log("═".repeat(60));
  console.log("\n📥 IMPORT COMPLETE\n");
  console.log(`  Imported artifacts from ${imported} branches`);
  console.log(`  Artifacts location: ${runsPath}/`);
  console.log("\n" + "═".repeat(60));

  console.log(`
📋 Next steps:

   1. Finalize runs to assign attempt numbers:
      npm run attempt:finalize -- --lane ${lane} --prd v${prd}

   2. Review and promote champion:
      npm run attempt:promote -- --lane ${lane} --prd v${prd} --attempt <number>
`);
}

// ============================================================
// Main
// ============================================================

function main() {
  const opts = parseArgs();

  // Parse --message for submit command
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--message" && args[i + 1]) {
      opts.message = args[i + 1];
    }
  }

  switch (opts.command) {
    case "nuke":
      cmdNuke(opts);
      break;
    case "register":
      cmdRegister(opts);
      break;
    case "finalize":
      cmdFinalize(opts);
      break;
    case "reset":
      cmdReset(opts);
      break;
    case "promote":
      cmdPromote(opts);
      break;
    case "submit":
      cmdSubmit(opts);
      break;
    case "import":
      cmdImport(opts);
      break;
    case "cleanup":
      cmdCleanup(opts);
      break;
    default:
      console.log(`
ODD Attempt CLI — Lane-Scoped Implementation

BRANCH ROLES:
  prod        → Live production (NEVER nuked)
  main        → Experiment aggregation + history
  attempt/*   → Ephemeral agent workspaces
  run/*       → Ephemeral agent workspaces (provenance-named)

VALID LANES:
  website, ai-navigation, agent-skill

COMMANDS:

  npm run attempt:nuke -- --lane <lane>
      Blank slate reset for a lane. Deletes products/<lane>/src/.
      ❌ Refuses on prod
      ⚠️  Requires --force on main
      ✅ Allowed on attempt/* and run/* branches
      Other lanes are NOT affected.

  npm run attempt:register -- --lane <lane> --tool <tool> --agent <id> --model <model>
      Register a new run with lane + provenance (PRD version auto-detected from lane PRD)
      --lane:  product lane (website, ai-navigation, agent-skill) [required]
      --tool:  development tool (cursor, vscode, cli, etc.) [default: cursor]
      --agent: agent ID within tool (a, b, cursor-a, etc.) [default: default]
      --model: AI model identifier (opus-4.5, gpt-4o, etc.) [required for good provenance]

  npm run attempt:submit
      Commit and push work (triggers Cloudflare preview)

  npm run attempt:import -- --prd v0.2
      Import artifacts from attempt branches back to main

  npm run attempt:finalize -- --prd v0.2
      Finalize runs → attempt-001, 002, etc.

  npm run attempt:promote -- --prd v0.2 --attempt 001
      Ship champion: merge → main, fast-forward → prod

  npm run attempt:reset -- --prd v0.2
      NUCLEAR RESET: Nuke + delete all attempt branches for PRD

  npm run attempt:cleanup
      Prune stale worktrees and branches (run after PRD cycles)
      --force removes branch worktrees and orphan branches

ARTIFACT LOCATION (Lane-Contained):
  /products/<lane>/attempts/prd-vX.Y/attempt-NNN/

  Root /attempts/** is LEGACY (read-only). See /attempts/README.md

WORKFLOW:
  1. register → agent claims unique run_id with lane
  2. nuke     → agent starts with blank slate (lane-scoped)
  3. build    → agent implements in products/<lane>/src/
  4. submit   → agent pushes (CF preview)
  5. import   → pull all artifacts to main
  6. finalize → assign attempt numbers
  7. promote  → ship lane champion to prod

DEPLOY MAPPING:
  Each lane is a separate Cloudflare Pages project
  Root directory: .
  Build output: products/<lane>/dist
`);
      process.exit(1);
  }
}

main();
