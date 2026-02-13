#!/usr/bin/env node
/**
 * run-recipe-pack.js
 *
 * One-command runner for compiled recipe packs.
 * Compiles if needed, loads the pack, appends assets, prints to stdout.
 *
 * Usage:
 *   node run-recipe-pack.js --id prd-discovery.s
 *   node run-recipe-pack.js --id prd-discovery.s --asset notes/transcript.md
 *   node run-recipe-pack.js --id prd-discovery.s --asset file1.md --asset file2.md
 *   node run-recipe-pack.js --id prd-discovery.s --no-compile
 *
 * Options:
 *   --id <name>       Recipe ID (e.g., prd-discovery.s)
 *   --recipe <path>   Path to recipe JSON (alternative to --id)
 *   --asset <path>    Asset file to append (can be repeated)
 *   --no-compile      Skip compilation, use existing pack
 *   --quiet           Suppress header info, print only the prompt
 */

import { readFileSync, existsSync, readdirSync } from "fs";
import { join, dirname, relative, basename } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const PACKS_DIR = join(ROOT, "public", "_compiled", "packs");
const AGENTS_DIR = join(ROOT, "docs", "agents");

// ============================================================================
// ARGUMENT PARSING
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    id: null,
    recipePath: null,
    assets: [],
    compile: true,
    quiet: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--id" && args[i + 1]) {
      result.id = args[++i];
    } else if (arg === "--recipe" && args[i + 1]) {
      result.recipePath = args[++i];
    } else if (arg === "--asset" && args[i + 1]) {
      result.assets.push(args[++i]);
    } else if (arg === "--no-compile") {
      result.compile = false;
    } else if (arg === "--quiet" || arg === "-q") {
      result.quiet = true;
    } else if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }
  }

  return result;
}

function printUsage() {
  console.log(`
Usage:
  node run-recipe-pack.js --id <recipe-id> [options]

Options:
  --id <name>       Recipe ID (e.g., prd-discovery.s)
  --recipe <path>   Path to recipe JSON (alternative to --id)
  --asset <path>    Asset file to append (can be repeated)
  --no-compile      Skip compilation, use existing pack
  --quiet, -q       Suppress header info, print only the prompt

Examples:
  npm run discovery -- --id prd-discovery.s
  npm run discovery -- --id prd-discovery.s --asset notes/transcript.md
  npm run discovery -- --id prd-discovery.s --asset file1.md --asset file2.md --quiet
`);
}

// ============================================================================
// RECIPE RESOLUTION
// ============================================================================

function findRecipeById(id) {
  // Search for recipe files matching the ID
  function scan(dir) {
    if (!existsSync(dir)) return null;
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = scan(full);
        if (found) return found;
      } else if (entry.name === `${id}.recipe.json`) {
        return full;
      }
    }
    return null;
  }

  return scan(AGENTS_DIR);
}

function getPackPath(id) {
  return join(PACKS_DIR, `${id}.md`);
}

// ============================================================================
// COMPILATION
// ============================================================================

function compileRecipe(recipePath, quiet) {
  if (!quiet) {
    console.error(`[RUN] Compiling recipe...`);
  }

  try {
    execSync(`node infra/scripts/compile-recipe.js "${recipePath}"`, {
      cwd: ROOT,
      stdio: quiet ? "ignore" : "inherit",
    });
  } catch (err) {
    console.error(`[ERROR] Compilation failed`);
    process.exit(1);
  }
}

// ============================================================================
// ASSET LOADING
// ============================================================================

function loadAsset(assetPath) {
  const fullPath = assetPath.startsWith("/") ? assetPath : join(ROOT, assetPath);

  if (!existsSync(fullPath)) {
    console.error(`[ERROR] Asset not found: ${assetPath}`);
    process.exit(1);
  }

  const content = readFileSync(fullPath, "utf8");
  const name = basename(assetPath);

  return { name, path: assetPath, content };
}

// ============================================================================
// PROMPT ASSEMBLY
// ============================================================================

function assemblePrompt(packContent, assets) {
  const sections = [packContent];

  if (assets.length > 0) {
    sections.push("");
    sections.push("---");
    sections.push("");
    sections.push("# Provided Assets");
    sections.push("");

    for (const asset of assets) {
      sections.push(`## Asset: ${asset.name}`);
      sections.push("");
      sections.push(`*Source: \`${asset.path}\`*`);
      sections.push("");
      sections.push(asset.content);
      sections.push("");
      sections.push("---");
      sections.push("");
    }
  }

  return sections.join("\n");
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  const opts = parseArgs();

  // Validate input
  if (!opts.id && !opts.recipePath) {
    console.error("[ERROR] Must provide --id or --recipe");
    printUsage();
    process.exit(1);
  }

  // Resolve recipe path
  let recipePath = opts.recipePath;
  let recipeId = opts.id;

  if (opts.id && !opts.recipePath) {
    recipePath = findRecipeById(opts.id);
    if (!recipePath) {
      console.error(`[ERROR] Recipe not found: ${opts.id}`);
      console.error(`        Searched in: docs/agents/`);
      process.exit(1);
    }
  }

  if (recipePath && !recipeId) {
    // Extract ID from recipe file
    const recipe = JSON.parse(readFileSync(recipePath, "utf8"));
    recipeId = recipe.name;
  }

  // Compile if needed
  const packPath = getPackPath(recipeId);

  if (opts.compile) {
    compileRecipe(recipePath, opts.quiet);
  }

  // Check pack exists
  if (!existsSync(packPath)) {
    console.error(`[ERROR] Compiled pack not found: ${packPath}`);
    console.error(`        Run with --compile or compile manually first`);
    process.exit(1);
  }

  // Load pack
  const packContent = readFileSync(packPath, "utf8");

  // Load assets
  const assets = opts.assets.map(loadAsset);

  // Print header (unless quiet)
  if (!opts.quiet) {
    console.error("");
    console.error(`[RUN] Recipe: ${recipeId}`);
    console.error(`[RUN] Pack: ${relative(ROOT, packPath)}`);
    if (assets.length > 0) {
      console.error(`[RUN] Assets:`);
      for (const asset of assets) {
        console.error(`        - ${asset.path}`);
      }
    }
    console.error("");
    console.error("--- BEGIN PROMPT ---");
    console.error("");
  }

  // Assemble and print
  const prompt = assemblePrompt(packContent, assets);
  console.log(prompt);

  if (!opts.quiet) {
    console.error("");
    console.error("--- END PROMPT ---");
  }
}

main();
