#!/usr/bin/env node
/**
 * compile-recipe.js
 *
 * Compiles agent recipes by resolving and concatenating:
 *   1. Overlays (from docs/agents/.../overlays/)
 *   2. Protocols (from docs/agents/.../protocols/)
 *   3. Context packs (from public/_compiled/packs/)
 *
 * Usage:
 *   node compile-recipe.js [recipe-path]
 *   node compile-recipe.js docs/agents/discovery/recipes/prd-discovery.s.recipe.json
 *   node compile-recipe.js --all   (compile all recipes found in docs/agents/)
 *
 * Output:
 *   public/_compiled/packs/[recipe-name].md
 *   public/_compiled/packs/[recipe-name].json (metadata)
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join, dirname, basename, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const AGENTS_DIR = join(ROOT, "docs", "agents");
const PACKS_DIR = join(ROOT, "public", "_compiled", "packs");

// ============================================================================
// RESOLUTION
// ============================================================================

/**
 * Find an overlay file by name across all agent domains
 */
function resolveOverlay(name) {
  // Try exact match first
  const exactPath = join(ROOT, name);
  if (existsSync(exactPath)) return exactPath;

  // Search in docs/agents/*/overlays/
  const domains = readdirSync(AGENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const domain of domains) {
    const candidates = [
      join(AGENTS_DIR, domain, "overlays", `${name}.md`),
      join(AGENTS_DIR, domain, "overlays", name),
    ];
    for (const path of candidates) {
      if (existsSync(path)) return path;
    }
  }

  return null;
}

/**
 * Find a protocol file by name across all agent domains
 */
function resolveProtocol(name) {
  // Try exact match first
  const exactPath = join(ROOT, name);
  if (existsSync(exactPath)) return exactPath;

  // Search in docs/agents/*/protocols/
  const domains = readdirSync(AGENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const domain of domains) {
    const candidates = [
      join(AGENTS_DIR, domain, "protocols", `${name}.md`),
      join(AGENTS_DIR, domain, "protocols", `${name}-protocol.md`),
      join(AGENTS_DIR, domain, "protocols", name),
    ];
    for (const path of candidates) {
      if (existsSync(path)) return path;
    }
  }

  return null;
}

/**
 * Find a context pack by name
 */
function resolveContextPack(name) {
  const candidates = [join(PACKS_DIR, `${name}.md`), join(PACKS_DIR, name)];
  for (const path of candidates) {
    if (existsSync(path)) return path;
  }
  return null;
}

/**
 * Find all recipe files in docs/agents/
 */
function findAllRecipes() {
  const recipes = [];

  function scan(dir) {
    if (!existsSync(dir)) return;
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(full);
      } else if (entry.name.endsWith(".recipe.json")) {
        recipes.push(full);
      }
    }
  }

  scan(AGENTS_DIR);
  return recipes;
}

// ============================================================================
// CONTENT EXTRACTION
// ============================================================================

/**
 * Strip frontmatter from markdown content
 */
function stripFrontmatter(content) {
  const normalized = content.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) return content;

  const endIdx = normalized.indexOf("\n---\n", 4);
  if (endIdx === -1) return content;

  return normalized.slice(endIdx + 5).trim();
}

/**
 * Read file and optionally strip frontmatter
 */
function readContent(path, stripFm = true) {
  const content = readFileSync(path, "utf8");
  return stripFm ? stripFrontmatter(content) : content;
}

// ============================================================================
// COMPILATION
// ============================================================================

function compileRecipe(recipePath) {
  const recipe = JSON.parse(readFileSync(recipePath, "utf8"));
  const relPath = relative(ROOT, recipePath);

  console.log(`\n📦 Compiling recipe: ${recipe.name}`);
  console.log(`   Source: ${relPath}`);

  const sections = [];
  const resolved = {
    overlays: [],
    protocols: [],
    context_packs: [],
    missing: [],
  };

  // Header
  sections.push(`# ${recipe.name}`);
  sections.push("");
  sections.push(`> ${recipe.description}`);
  sections.push("");
  sections.push(`> Version: ${recipe.version} | Stability: ${recipe.stability}`);
  sections.push(`> Generated: ${new Date().toISOString()}`);
  sections.push("");
  sections.push("---");
  sections.push("");

  // Resolve and include overlays
  if (recipe.overlays && recipe.overlays.length > 0) {
    sections.push("# Role Overlay");
    sections.push("");

    for (const overlay of recipe.overlays) {
      const path = resolveOverlay(overlay);
      if (path) {
        console.log(`   ✅ Overlay: ${overlay}`);
        resolved.overlays.push({ name: overlay, path: relative(ROOT, path) });
        sections.push(readContent(path));
        sections.push("");
        sections.push("---");
        sections.push("");
      } else {
        console.log(`   ⚠️  Overlay not found: ${overlay}`);
        resolved.missing.push({ type: "overlay", name: overlay });
      }
    }
  }

  // Resolve and include protocols (from recipe or search by overlay name)
  // First check if there's a protocol matching the overlay domain
  const protocolsToInclude = [];

  // Look for protocols in the same domain as overlays
  for (const overlay of recipe.overlays || []) {
    // Try to find matching protocol
    const protocolName = overlay.replace("-overlay", "-protocol").replace("-role", "-interview");
    const protocolPath = resolveProtocol(protocolName);
    if (protocolPath) {
      protocolsToInclude.push({ name: protocolName, path: protocolPath });
    }
  }

  // Also check explicit protocol_modules (future expansion)
  // For now, protocol_modules are conceptual - we skip them with a note

  if (protocolsToInclude.length > 0) {
    sections.push("# Protocol");
    sections.push("");

    for (const proto of protocolsToInclude) {
      console.log(`   ✅ Protocol: ${proto.name}`);
      resolved.protocols.push({ name: proto.name, path: relative(ROOT, proto.path) });
      sections.push(readContent(proto.path));
      sections.push("");
      sections.push("---");
      sections.push("");
    }
  }

  // Note about protocol_modules (not yet implemented)
  if (recipe.protocol_modules && recipe.protocol_modules.length > 0) {
    console.log(
      `   ℹ️  Protocol modules not yet implemented: ${recipe.protocol_modules.join(", ")}`,
    );
  }

  // Resolve and include context packs
  if (recipe.context_packs && recipe.context_packs.length > 0) {
    sections.push("# Context Pack");
    sections.push("");

    for (const pack of recipe.context_packs) {
      const path = resolveContextPack(pack);
      if (path) {
        console.log(`   ✅ Context pack: ${pack}`);
        resolved.context_packs.push({ name: pack, path: relative(ROOT, path) });
        // Include content but strip the pack's own header
        let content = readContent(path, false);
        // Remove the first H1 header if present (avoid duplicate headers)
        content = content.replace(/^#\s+.+\n+/, "");
        sections.push(content);
        sections.push("");
      } else {
        console.log(`   ⚠️  Context pack not found: ${pack}`);
        resolved.missing.push({ type: "context_pack", name: pack });
      }
    }
  }

  // Assemble output
  const output = sections.join("\n").trim() + "\n";
  const outputName = recipe.name;
  const outputPath = join(PACKS_DIR, `${outputName}.md`);
  const metaPath = join(PACKS_DIR, `${outputName}.meta.json`);

  // Ensure output directory exists
  mkdirSync(PACKS_DIR, { recursive: true });

  // Write markdown pack
  writeFileSync(outputPath, output);

  // Write metadata
  const meta = {
    recipe: recipe.name,
    version: recipe.version,
    stability: recipe.stability,
    description: recipe.description,
    generated_at: new Date().toISOString(),
    source_recipe: relPath,
    resolved,
    stats: {
      lines: output.split("\n").length,
      chars: output.length,
      estimated_tokens: Math.ceil(output.length / 4),
    },
  };
  writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");

  console.log(`   📄 Output: public/_compiled/packs/${outputName}.md`);
  console.log(`   📊 ${meta.stats.lines} lines, ~${meta.stats.estimated_tokens} tokens`);

  return { outputPath, meta };
}

// ============================================================================
// INDEX GENERATION
// ============================================================================

function generateIndex(results) {
  const index = {
    generated_at: new Date().toISOString(),
    packs: results.map((r) => ({
      id: r.meta.recipe,
      file: relative(ROOT, r.outputPath),
      version: r.meta.version,
      stability: r.meta.stability,
      description: r.meta.description,
      source_recipe: r.meta.source_recipe,
      sources: {
        overlays: r.meta.resolved.overlays.map((o) => o.path),
        protocols: r.meta.resolved.protocols.map((p) => p.path),
        context_packs: r.meta.resolved.context_packs.map((c) => c.path),
      },
      stats: r.meta.stats,
      compiled_at: r.meta.generated_at,
    })),
  };

  const indexPath = join(PACKS_DIR, "recipe-index.json");
  writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n");

  console.log(`\n📋 Index: public/_compiled/packs/recipe-index.json`);

  return index;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage:");
    console.log("  node compile-recipe.js <recipe-path>");
    console.log("  node compile-recipe.js --all");
    console.log("");
    console.log("Examples:");
    console.log(
      "  node compile-recipe.js docs/agents/discovery/recipes/prd-discovery.s.recipe.json",
    );
    console.log("  node compile-recipe.js --all");
    process.exit(1);
  }

  console.log("🍳 Recipe Compiler");

  if (args[0] === "--all") {
    const recipes = findAllRecipes();
    if (recipes.length === 0) {
      console.log("\n⚠️  No recipes found in docs/agents/");
      process.exit(0);
    }
    console.log(`\nFound ${recipes.length} recipe(s)`);

    const results = [];
    for (const recipePath of recipes) {
      try {
        const result = compileRecipe(recipePath);
        results.push(result);
      } catch (err) {
        console.error(`\n❌ Failed to compile ${recipePath}: ${err.message}`);
      }
    }

    // Generate index
    if (results.length > 0) {
      generateIndex(results);
    }

    console.log(`\n✅ Compiled ${results.length} recipe(s)`);
  } else {
    const recipePath = args[0].startsWith("/") ? args[0] : join(ROOT, args[0]);

    if (!existsSync(recipePath)) {
      console.error(`\n❌ Recipe not found: ${recipePath}`);
      process.exit(1);
    }

    const result = compileRecipe(recipePath);

    // Update index with just this recipe
    generateIndex([result]);

    console.log("\n✅ Done");
  }
}

main();
