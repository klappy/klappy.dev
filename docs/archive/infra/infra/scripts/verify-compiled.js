#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const ROOT = process.cwd();

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function parseArgs(argv) {
  const args = { lane: null, pack: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--lane") args.lane = argv[i + 1];
    if (argv[i] === "--pack") args.pack = argv[i + 1];
  }
  if (!args.lane) fail("Missing --lane <lane>");
  if (!args.pack) fail("Missing --pack <pack>");
  return args;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function main() {
  const { lane, pack } = parseArgs(process.argv.slice(2));
  
  // Pack-specific meta path
  const metaPath = join(ROOT, "public", "_compiled", lane, "_meta", `${pack}-COMPILE_META.json`);
  if (!existsSync(metaPath)) fail(`Missing meta: ${metaPath}`);

  const meta = readJson(metaPath);
  if (meta.lane !== lane) fail(`Meta lane mismatch: ${meta.lane}`);
  if (meta.pack !== pack) fail(`Meta pack mismatch: ${meta.pack}`);

  const required = ["built_at", "git_commit", "sources", "source_hashes", "output", "plan"];
  for (const k of required) {
    if (meta[k] === undefined) fail(`Missing required meta field: ${k}`);
  }

  // Verify hashes match current source files
  for (const src of meta.sources) {
    const abs = join(ROOT, src);
    if (!existsSync(abs)) fail(`Missing source file referenced by meta: ${src}`);
    const content = readFileSync(abs, "utf8");
    const h = sha256(content);
    const expected = meta.source_hashes[src];
    if (!expected) fail(`Missing hash entry for source: ${src}`);
    if (h !== expected) fail(`Hash mismatch for ${src}\nexpected: ${expected}\nactual:   ${h}`);
  }

  // Verify output exists
  const outAbs = join(ROOT, meta.output);
  if (!existsSync(outAbs)) fail(`Missing compiled output: ${meta.output}`);

  // Optionally verify index.json exists
  const indexPath = join(ROOT, "public", "_compiled", lane, "index.json");
  if (!existsSync(indexPath)) {
    console.log(`⚠️  Warning: Lane index missing: ${indexPath}`);
  }

  console.log(`✅ Compiled pack verified: ${lane}/${pack} (provenance + hashes)`);
}

main();
