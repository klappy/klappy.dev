#!/usr/bin/env node
/**
 * audit-drift.js
 *
 * Read-only repo drift audit.
 *
 * What it verifies:
 * - content validity (manifest/resources)
 * - contracts validity (if available)
 * - compiled packs validity for every lane/pack plan found
 *
 * This script MUST NOT compile/regenerate anything.
 */

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const PLANS_ROOT = join(ROOT, "infra", "compile", "plans");

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...opts,
  });
  if (res.status !== 0) {
    fail(`\n🛑 audit:drift failed: ${cmd} ${args.join(" ")}\n`);
  }
}

function listDirs(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function listJsonFiles(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".json"))
    .map((d) => d.name);
}

function discoverLanePacks() {
  // Source of truth for "what compiled packs exist" is: infra/compile/plans/<lane>/*.json
  const lanes = listDirs(PLANS_ROOT);
  const matrix = [];
  for (const lane of lanes) {
    const planDir = join(PLANS_ROOT, lane);
    const plans = listJsonFiles(planDir);
    for (const planFile of plans) {
      const pack = planFile.replace(/\.json$/, "");
      matrix.push({ lane, pack, planPath: join("infra", "compile", "plans", lane, planFile) });
    }
  }
  return matrix;
}

function main() {
  console.log("🔎 audit:drift — starting\n");

  // 1) Verify content
  if (existsSync(join(ROOT, "infra", "scripts", "verify-content.js"))) {
    console.log("1) verify:content");
    run("node", ["infra/scripts/verify-content.js"]);
    console.log("");
  } else {
    console.log("1) verify:content (skipped — missing infra/scripts/verify-content.js)\n");
  }

  // 2) Verify contracts (if present)
  // We treat this as optional because some repos stage it in gradually.
  if (existsSync(join(ROOT, "infra", "scripts", "verify-contracts.js"))) {
    console.log("2) verify:contracts");
    run("node", ["infra/scripts/verify-contracts.js"]);
    console.log("");
  } else {
    console.log("2) verify:contracts (skipped — missing infra/scripts/verify-contracts.js)\n");
  }

  // 3) Verify compiled packs for every plan discovered
  const packs = discoverLanePacks();
  console.log(`3) verify:compiled — discovered ${packs.length} pack plan(s)\n`);

  if (!existsSync(join(ROOT, "infra", "scripts", "verify-compiled.js"))) {
    fail("Missing infra/scripts/verify-compiled.js — cannot verify compiled packs.");
  }

  for (const p of packs) {
    console.log(`- verify compiled: lane=${p.lane} pack=${p.pack} (plan=${p.planPath})`);
    run("node", ["infra/scripts/verify-compiled.js", "--lane", p.lane, "--pack", p.pack]);
  }

  console.log("\n✅ audit:drift passed — repo is consistent\n");
}

main();
