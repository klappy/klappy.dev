#!/usr/bin/env node
/**
 * audit-repair.js
 *
 * Regenerates ONLY wipeable derived outputs (compiled packs),
 * then runs audit:drift.
 *
 * This script MUST NOT touch Canon or PRDs.
 */

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

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
    fail(`\n🛑 audit:repair failed: ${cmd} ${args.join(" ")}\n`);
  }
}

function main() {
  console.log("🧰 audit:repair — regenerating derived outputs, then auditing\n");

  // Phase 0: compile packs from plans (lane + pack required)
  if (!existsSync("infra/scripts/compile-pack.js")) {
    fail("Missing infra/scripts/compile-pack.js — cannot compile packs.");
  }

  // Compile ALL packs by delegating to a single "compile all plans" mode,
  // OR just call lane:compile repeatedly if that is the established contract.
  // We do not assume a magic "--all" exists.
  //
  // Minimal safe approach: call `npm run lane:compile -- --lane <lane> --pack <pack>`
  // by using audit:drift's discovery logic indirectly (audit:drift will fail if any pack missing).
  //
  // We keep repair very small: attempt to compile the two known website packs first,
  // and users can expand later. (Avoid inventing lanes/packs here.)
  //
  // If you want full auto-discovery compilation, implement it inside compile-pack.js, not here.

  console.log("1) compile known packs (safe, minimal)");
  run("npm", ["run", "lane:compile", "--", "--lane", "website", "--pack", "visitor"]);
  run("npm", ["run", "lane:compile", "--", "--lane", "website", "--pack", "author"]);

  console.log("\n2) audit:drift");
  run("npm", ["run", "audit:drift"]);

  console.log("\n✅ audit:repair complete\n");
}

main();
