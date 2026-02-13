#!/usr/bin/env node
/**
 * compile-s-pack.js
 *
 * Compiles S-slice context packs from decision/governing documents.
 * Extracts only the executable sections: Operating Constraints, Defaults, Failure Modes, Verification.
 *
 * Usage:
 *   node compile-s-pack.js                    # generates all profiles
 *   node compile-s-pack.js --profile core     # only s-core.md
 *   node compile-s-pack.js --profile meta     # only s-meta.md
 *   node compile-s-pack.js --profile infra    # only s-infra.md
 *   node compile-s-pack.js --profile all      # full s-pack.md (all 14 docs)
 *
 * Output:
 *   public/_compiled/packs/s-core.md   (behavioral governors, ~150-200 lines)
 *   public/_compiled/packs/s-meta.md   (framework awareness)
 *   public/_compiled/packs/s-infra.md  (self-referential system rules)
 *   public/_compiled/packs/s-pack.md   (all decision/governing docs)
 *
 * Per canon/documentation/slice-contract-sml.md
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const PACK_DIR = join(ROOT, 'public', '_compiled', 'packs');

// Source directories
const SOURCES = ['canon', 'odd'];

// Exclude patterns
const EXCLUDE = ['_template', '_compiled', 'node_modules', '.git'];

// S-slice sections to extract
const S_SECTIONS = [
  'Operating Constraints',
  'Defaults',
  'Failure Modes',
  'Verification'
];

// ============================================================================
// PACK PROFILES — stratified for testable experimentation
// ============================================================================

const PROFILES = {
  // CORE: Behavioral governors that directly constrain execution
  // These answer: "What must I do / not do RIGHT NOW?"
  core: {
    name: 'S-Core',
    description: 'Behavioral governors for immediate execution constraints',
    docs: [
      'odd/constraint/use-only-what-hurts.md',
      'canon/visual-proof.md',
      'canon/definition-of-done.md',
      'canon/verification-and-evidence.md'
    ]
  },

  // META: Framework awareness that explains WHY rules exist
  // These help interpret rules but shouldn't dominate execution
  meta: {
    name: 'S-Meta',
    description: 'Framework awareness and decision heuristics',
    docs: [
      'canon/constraints.md',
      'canon/decision-rules.md',
      'odd/contract.md',
      'odd/decisions/D0001-three-tier-conceptual-hierarchy.md'
    ]
  },

  // INFRA: Self-referential system rules for tooling and authors
  // These should almost never be in agent execution context
  infra: {
    name: 'S-Infra',
    description: 'Self-referential rules for tooling and documentation authors',
    docs: [
      'canon/documentation/agent-executable-outline.md',
      'canon/documentation/execution-posture.md',
      'canon/documentation/slice-contract-sml.md',
      'canon/documentation/tier-vs-relevance.md',
      'canon/epistemic-obligation-and-document-tiers.md',
      'canon/decisions/models-do-not-mutate-canon.md'
    ]
  }
};

// ============================================================================
// PARSING
// ============================================================================

function parseFrontmatter(content) {
  const normalized = content.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { frontmatter: null, body: content };
  }

  const endIdx = normalized.indexOf('\n---\n', 4);
  if (endIdx === -1) {
    return { frontmatter: null, body: content };
  }

  const raw = normalized.slice(4, endIdx);
  const body = normalized.slice(endIdx + 5);
  const data = {};

  for (const line of raw.split('\n')) {
    if (!line.includes(':')) continue;
    const colonIdx = line.indexOf(':');
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    if (key) data[key] = value;
  }

  return { frontmatter: data, body };
}

function extractTitle(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function extractSubtitle(body) {
  // First blockquote after title
  const match = body.match(/^>\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

function extractSections(body) {
  const sections = {};
  const lines = body.split('\n');
  
  let currentHeading = null;
  let currentContent = [];

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      if (currentHeading) {
        sections[currentHeading] = currentContent.join('\n').trim();
      }
      currentHeading = match[1].trim();
      currentContent = [];
    } else if (currentHeading) {
      currentContent.push(line);
    }
  }

  if (currentHeading) {
    sections[currentHeading] = currentContent.join('\n').trim();
  }

  return sections;
}

// ============================================================================
// FILE SCANNING
// ============================================================================

function getAllMarkdownFiles(dir) {
  if (!existsSync(dir)) return [];
  
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (EXCLUDE.some(ex => entry.name === ex || entry.name.startsWith(ex))) continue;
    
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }

  return files;
}

// ============================================================================
// S-SLICE EXTRACTION
// ============================================================================

function extractSSlice(filePath) {
  const relPath = relative(ROOT, filePath);
  const content = readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  if (!frontmatter) return null;
  if (frontmatter.relevance !== 'decision') return null;
  if (frontmatter.execution_posture !== 'governing') return null;

  const title = frontmatter.title || extractTitle(body);
  const subtitle = extractSubtitle(body);
  const sections = extractSections(body);

  // Check if any S-sections exist
  const foundSections = S_SECTIONS.filter(s => sections[s] && sections[s].length > 0);
  if (foundSections.length === 0) return null;

  return {
    path: relPath,
    uri: frontmatter.uri,
    title,
    subtitle,
    sections: Object.fromEntries(
      S_SECTIONS
        .filter(s => sections[s] && sections[s].length > 0)
        .map(s => [s, sections[s]])
    ),
    foundSections
  };
}

// ============================================================================
// PACK GENERATION
// ============================================================================

function generateMarkdownPack(slices, profile = null) {
  const lines = [];
  
  const packName = profile ? PROFILES[profile].name : 'S-Pack';
  const packDesc = profile ? PROFILES[profile].description : 'All decision/governing documents';

  lines.push(`# ${packName}: ${packDesc}`);
  lines.push('');
  lines.push(`> Executable context for agent behavior. Extract of Operating Constraints, Defaults, Failure Modes, and Verification.`);
  lines.push('');
  lines.push(`> Generated: ${new Date().toISOString()}`);
  if (profile) {
    lines.push(`> Profile: ${profile} (${slices.length} docs)`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const slice of slices) {
    lines.push(`## ${slice.title}`);
    lines.push('');
    if (slice.subtitle) {
      lines.push(`> ${slice.subtitle}`);
      lines.push('');
    }
    lines.push(`*Source: \`${slice.path}\`*`);
    lines.push('');

    for (const sectionName of S_SECTIONS) {
      if (slice.sections[sectionName]) {
        lines.push(`### ${sectionName}`);
        lines.push('');
        lines.push(slice.sections[sectionName]);
        lines.push('');
      }
    }

    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

function generateJsonPack(slices, profile = null) {
  const packName = profile ? PROFILES[profile].name : 'S-Pack';
  const packDesc = profile ? PROFILES[profile].description : 'All decision/governing documents';
  
  return {
    type: profile ? `s-${profile}` : 's-pack',
    profile: profile || 'all',
    name: packName,
    generated_at: new Date().toISOString(),
    description: packDesc,
    sections_extracted: S_SECTIONS,
    document_count: slices.length,
    documents: slices.map(s => ({
      path: s.path,
      uri: s.uri,
      title: s.title,
      subtitle: s.subtitle,
      sections_found: s.foundSections
    })),
    slices
  };
}

// ============================================================================
// MAIN
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);
  const profileIdx = args.indexOf('--profile');
  
  if (profileIdx !== -1 && args[profileIdx + 1]) {
    const profile = args[profileIdx + 1];
    if (!['core', 'meta', 'infra', 'all'].includes(profile)) {
      console.error(`❌ Unknown profile: ${profile}`);
      console.error('   Valid profiles: core, meta, infra, all');
      process.exit(1);
    }
    return { profile };
  }
  
  return { profile: null }; // null means generate all
}

function filterSlicesByProfile(slices, profile) {
  if (!profile || profile === 'all') return slices;
  
  const allowedDocs = PROFILES[profile].docs;
  return slices.filter(s => allowedDocs.includes(s.path));
}

function generateProfilePack(allSlices, profile) {
  const filtered = filterSlicesByProfile(allSlices, profile);
  
  if (filtered.length === 0) {
    console.log(`⚠️  No docs found for profile: ${profile}`);
    return null;
  }

  const filename = profile === 'all' ? 's-pack' : `s-${profile}`;
  const mdPack = generateMarkdownPack(filtered, profile === 'all' ? null : profile);
  const jsonPack = generateJsonPack(filtered, profile === 'all' ? null : profile);

  writeFileSync(join(PACK_DIR, `${filename}.md`), mdPack);
  writeFileSync(join(PACK_DIR, `${filename}.json`), JSON.stringify(jsonPack, null, 2) + '\n');

  return { filename, count: filtered.length, lines: mdPack.split('\n').length };
}

function main() {
  const { profile } = parseArgs();
  
  console.log('📦 Compiling S-pack from decision/governing documents...\n');

  // Collect all files
  const allFiles = [];
  for (const source of SOURCES) {
    const sourceDir = join(ROOT, source);
    allFiles.push(...getAllMarkdownFiles(sourceDir));
  }

  console.log(`Found ${allFiles.length} markdown files in canon/ and odd/\n`);

  // Extract S-slices from ALL decision/governing docs
  const slices = [];
  for (const filePath of allFiles) {
    const slice = extractSSlice(filePath);
    if (slice) {
      slices.push(slice);
    }
  }

  if (slices.length === 0) {
    console.log('\n⚠️  No decision/governing documents with S-sections found.');
    console.log('Run the audit to see which docs need upgrading:');
    console.log('  node infra/scripts/audit-decision-docs.js --report');
    process.exit(0);
  }

  // Sort by path for deterministic output
  slices.sort((a, b) => a.path.localeCompare(b.path));

  // Ensure output directory exists
  mkdirSync(PACK_DIR, { recursive: true });

  // Generate packs based on profile flag
  const results = [];

  if (profile) {
    // Single profile requested
    const result = generateProfilePack(slices, profile);
    if (result) results.push(result);
  } else {
    // Generate all profiles
    for (const p of ['core', 'meta', 'infra', 'all']) {
      const result = generateProfilePack(slices, p);
      if (result) results.push(result);
    }
  }

  // Report
  console.log('\n📊 S-packs compiled:\n');
  console.log('   Profile      | Docs | Lines | File');
  console.log('   -------------|------|-------|---------------------------');
  for (const r of results) {
    const profileName = r.filename.replace('s-', '').padEnd(11);
    console.log(`   ${profileName} | ${String(r.count).padStart(4)} | ${String(r.lines).padStart(5)} | public/_compiled/packs/${r.filename}.md`);
  }

  console.log('\n✅ Done.\n');
  
  if (!profile) {
    console.log('🧪 For testing, start with s-core.md:');
    console.log('   - Pass A: No pack (control)');
    console.log('   - Pass B: s-core.md only');
    console.log('   - Pass C: s-core.md + s-meta.md');
  }
}

main();
