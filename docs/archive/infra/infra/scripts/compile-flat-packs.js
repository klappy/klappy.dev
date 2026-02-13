#!/usr/bin/env node
/**
 * compile-flat-packs.js
 *
 * Generates flat S/M/L packs across ALL content docs (not just decision/governing).
 * Shows what's upgraded vs what isn't via manifest.
 *
 * Output:
 *   public/_compiled/packs/all.s.md      — S-slice (execution context)
 *   public/_compiled/packs/all.m.md      — M-slice (S + Summary + Examples)
 *   public/_compiled/packs/all.l.md      — L-slice (full docs minus frontmatter)
 *   public/_compiled/packs/all.manifest.json — coverage manifest
 *
 * Per canon/documentation/slice-contract-sml.md
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const PACK_DIR = join(ROOT, 'public', '_compiled', 'packs');

// Source directories (all content roots)
const SOURCES = ['canon', 'odd', 'about', 'docs', 'projects'];

// Exclude patterns
const EXCLUDE = ['_template', '_compiled', 'node_modules', '.git', 'public'];

// S-slice required sections
const S_SECTIONS = [
  'Operating Constraints',
  'Defaults',
  'Failure Modes',
  'Verification'
];

// M-slice additional sections
const M_SECTIONS = [
  'Summary',
  'Examples'
];

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
// SLICE EXTRACTION
// ============================================================================

function extractDoc(filePath) {
  const relPath = relative(ROOT, filePath);
  const content = readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  const title = frontmatter?.title || extractTitle(body) || relPath;
  const subtitle = extractSubtitle(body);
  const sections = extractSections(body);

  // Check which S-sections exist
  const sSectionsPresent = {};
  for (const s of S_SECTIONS) {
    sSectionsPresent[s] = !!(sections[s] && sections[s].length > 0);
  }

  // Check which M-sections exist
  const mSectionsPresent = {};
  for (const s of M_SECTIONS) {
    mSectionsPresent[s] = !!(sections[s] && sections[s].length > 0);
  }

  const sCount = Object.values(sSectionsPresent).filter(Boolean).length;
  let sliceCompleteness;
  if (sCount === 4) {
    sliceCompleteness = 'complete';
  } else if (sCount > 0) {
    sliceCompleteness = 'partial';
  } else {
    sliceCompleteness = 'none';
  }

  return {
    path: relPath,
    uri: frontmatter?.uri,
    title,
    subtitle,
    frontmatter: frontmatter || {},
    body,
    sections,
    sSectionsPresent,
    mSectionsPresent,
    sliceCompleteness,
    chars: body.length,
    estimatedTokens: Math.ceil(body.length / 4)
  };
}

// ============================================================================
// SLICE BUILDERS
// ============================================================================

function buildSSlice(doc) {
  const lines = [];
  
  lines.push(`## ${doc.title}`);
  lines.push('');
  if (doc.subtitle) {
    lines.push(`> ${doc.subtitle}`);
    lines.push('');
  }
  lines.push(`*Source: \`${doc.path}\`*`);
  
  // Description or Summary (whichever exists first) - optional intro
  if (doc.sections['Description']) {
    lines.push('');
    lines.push(doc.sections['Description']);
  } else if (doc.sections['Summary'] && !S_SECTIONS.some(s => doc.sections[s])) {
    // Only include Summary in S if no S-sections exist (fallback)
    lines.push('');
    lines.push(doc.sections['Summary']);
  }

  // S-sections
  let hasSections = false;
  for (const sectionName of S_SECTIONS) {
    if (doc.sections[sectionName]) {
      lines.push('');
      lines.push(`### ${sectionName}`);
      lines.push('');
      lines.push(doc.sections[sectionName]);
      hasSections = true;
    }
  }

  // If no S-sections and no description, mark as incomplete
  if (!hasSections && !doc.sections['Description']) {
    lines.push('');
    lines.push('*[No executable sections available]*');
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  return lines.join('\n');
}

function buildMSlice(doc) {
  const lines = [];
  
  lines.push(`## ${doc.title}`);
  lines.push('');
  if (doc.subtitle) {
    lines.push(`> ${doc.subtitle}`);
    lines.push('');
  }
  lines.push(`*Source: \`${doc.path}\`*`);
  
  // Description
  if (doc.sections['Description']) {
    lines.push('');
    lines.push(doc.sections['Description']);
  }

  // S-sections
  for (const sectionName of S_SECTIONS) {
    if (doc.sections[sectionName]) {
      lines.push('');
      lines.push(`### ${sectionName}`);
      lines.push('');
      lines.push(doc.sections[sectionName]);
    }
  }

  // M-sections (Summary, Examples)
  for (const sectionName of M_SECTIONS) {
    if (doc.sections[sectionName]) {
      lines.push('');
      lines.push(`### ${sectionName}`);
      lines.push('');
      lines.push(doc.sections[sectionName]);
    }
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  return lines.join('\n');
}

function buildLSlice(doc) {
  const lines = [];
  
  lines.push(`## ${doc.title}`);
  lines.push('');
  lines.push(`*Source: \`${doc.path}\`*`);
  lines.push('');
  
  // Full body (minus the title line we already added)
  const bodyWithoutTitle = doc.body.replace(/^#\s+.+\n+/, '');
  lines.push(bodyWithoutTitle);
  
  lines.push('');
  lines.push('---');
  lines.push('');

  return lines.join('\n');
}

// ============================================================================
// PACK GENERATION
// ============================================================================

function generatePack(docs, sliceType) {
  const sliceNames = {
    's': 'S-Slice (Execution Context)',
    'm': 'M-Slice (Execution + Correctness)',
    'l': 'L-Slice (Full Documents)'
  };

  const lines = [];

  lines.push(`# All Documents: ${sliceNames[sliceType]}`);
  lines.push('');
  lines.push(`> Generated: ${new Date().toISOString()}`);
  lines.push(`> Documents: ${docs.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const doc of docs) {
    if (sliceType === 's') {
      lines.push(buildSSlice(doc));
    } else if (sliceType === 'm') {
      lines.push(buildMSlice(doc));
    } else {
      lines.push(buildLSlice(doc));
    }
  }

  return lines.join('\n');
}

function generateManifest(docs) {
  const summary = {
    complete: docs.filter(d => d.sliceCompleteness === 'complete').length,
    partial: docs.filter(d => d.sliceCompleteness === 'partial').length,
    none: docs.filter(d => d.sliceCompleteness === 'none').length
  };

  return {
    generated_at: new Date().toISOString(),
    total_documents: docs.length,
    slice_coverage: summary,
    total_chars: docs.reduce((sum, d) => sum + d.chars, 0),
    estimated_tokens: docs.reduce((sum, d) => sum + d.estimatedTokens, 0),
    documents: docs.map(d => ({
      path: d.path,
      uri: d.uri,
      title: d.title,
      relevance: d.frontmatter.relevance || null,
      execution_posture: d.frontmatter.execution_posture || null,
      tier: d.frontmatter.tier || null,
      sections_present: {
        ...d.sSectionsPresent,
        ...d.mSectionsPresent
      },
      slice_completeness: d.sliceCompleteness,
      chars: d.chars,
      estimated_tokens: d.estimatedTokens
    }))
  };
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.log('📦 Compiling flat S/M/L packs across all content...\n');

  // Collect all files
  const allFiles = [];
  for (const source of SOURCES) {
    const sourceDir = join(ROOT, source);
    allFiles.push(...getAllMarkdownFiles(sourceDir));
  }

  console.log(`Found ${allFiles.length} markdown files\n`);

  // Extract all docs
  const docs = [];
  for (const filePath of allFiles) {
    try {
      const doc = extractDoc(filePath);
      docs.push(doc);
    } catch (err) {
      console.log(`⚠️  Skipped ${relative(ROOT, filePath)}: ${err.message}`);
    }
  }

  // Sort by path for deterministic output
  docs.sort((a, b) => a.path.localeCompare(b.path));

  // Generate packs
  const sPack = generatePack(docs, 's');
  const mPack = generatePack(docs, 'm');
  const lPack = generatePack(docs, 'l');
  const manifest = generateManifest(docs);

  // Write outputs
  mkdirSync(PACK_DIR, { recursive: true });
  writeFileSync(join(PACK_DIR, 'all.s.md'), sPack);
  writeFileSync(join(PACK_DIR, 'all.m.md'), mPack);
  writeFileSync(join(PACK_DIR, 'all.l.md'), lPack);
  writeFileSync(join(PACK_DIR, 'all.manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

  // Report
  console.log('📊 Flat packs compiled:\n');
  console.log(`   all.s.md        ${String(sPack.split('\n').length).padStart(5)} lines`);
  console.log(`   all.m.md        ${String(mPack.split('\n').length).padStart(5)} lines`);
  console.log(`   all.l.md        ${String(lPack.split('\n').length).padStart(5)} lines`);
  console.log(`   all.manifest.json`);
  
  console.log('\n📈 Slice coverage:\n');
  console.log(`   Complete (4/4 S-sections):  ${manifest.slice_coverage.complete}`);
  console.log(`   Partial (1-3 S-sections):   ${manifest.slice_coverage.partial}`);
  console.log(`   None (0 S-sections):        ${manifest.slice_coverage.none}`);
  
  console.log(`\n   Total docs:      ${docs.length}`);
  console.log(`   Total chars:     ${manifest.total_chars.toLocaleString()}`);
  console.log(`   Est. tokens:     ~${manifest.estimated_tokens.toLocaleString()}`);
  
  console.log('\n✅ Done.');
}

main();
