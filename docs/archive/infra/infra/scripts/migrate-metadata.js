#!/usr/bin/env node
/**
 * migrate-metadata.js (Phase A)
 *
 * Adds `relevance` and `execution_posture` fields to all content source markdown files.
 * Uses location-based inference with explicit confidence tracking.
 *
 * Run modes:
 *   --dry-run    Show what would change without modifying files
 *   --report     Generate report only (no changes)
 *   --apply      Actually modify files
 *
 * Per canon/documentation/tier-vs-relevance.md:
 *   - relevance: decision | supporting | background | routing
 *   - execution_posture: governing | operational | exploratory | routing
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

// Source directories to process
const SOURCES = ['canon', 'odd', 'about', 'projects'];

// Files/folders to exclude
const EXCLUDE = ['_template', '_compiled', 'node_modules', '.git'];

// ============================================================================
// INFERENCE RULES
// ============================================================================

/**
 * Infer relevance and execution_posture from file path and frontmatter.
 * Returns { relevance, execution_posture, confidence, reason }
 *
 * Confidence levels:
 *   high   - Location is unambiguous (e.g., canon/documentation/)
 *   medium - Location suggests value but could be wrong
 *   low    - Default fallback, needs human review
 */
function inferMetadata(filePath, frontmatter) {
  const relPath = relative(ROOT, filePath);
  const filename = relPath.split('/').pop().toLowerCase();
  const basenameNoExt = filename.replace('.md', '');
  const pathLower = relPath.toLowerCase();

  // ============================================================================
  // RULE 1: Hardcoded governance docs (locked)
  // ============================================================================
  
  const HARDCODED_GOVERNING = [
    'canon/documentation/tier-vs-relevance.md',
    'canon/documentation/execution-posture.md',
    'canon/documentation/slice-contract-sml.md',
    'canon/documentation/agent-executable-outline.md',
  ];
  
  if (HARDCODED_GOVERNING.some(p => relPath === p)) {
    return {
      relevance: 'decision',
      execution_posture: 'governing',
      confidence: 'high',
      reason: 'hardcoded governance document'
    };
  }

  // ============================================================================
  // RULE 2: Promote by folder signal (strong)
  // ============================================================================
  
  if (pathLower.includes('/constraints/') ||
      pathLower.includes('/contracts/') ||
      pathLower.includes('/decisions/') ||
      pathLower.includes('/verification/') ||
      pathLower.includes('/evidence/') ||
      pathLower.includes('/constraint/')) {
    // But not READMEs in these folders
    if (filename !== 'readme.md' && filename !== 'index.md' && !filename.includes('template')) {
      return {
        relevance: 'decision',
        execution_posture: 'governing',
        confidence: 'high',
        reason: 'folder indicates governance content'
      };
    }
  }

  // ============================================================================
  // RULE 3: Promote by filename keywords (strong signal)
  // ============================================================================
  
  const GOVERNING_KEYWORDS = [
    'constraint', 'constraints',
    'contract', 'contracts',
    'definition-of-done', 'done',
    'verification', 'evidence', 'proof', 'visual-proof',
    'standard', 'standards',
    'non-negotiable', 'invariant',
    'rules', 'decision-rules',
    'tiers', 'obligation', 'epistemic'
  ];
  
  if (GOVERNING_KEYWORDS.some(kw => basenameNoExt.includes(kw))) {
    return {
      relevance: 'decision',
      execution_posture: 'governing',
      confidence: 'high',
      reason: 'filename contains governance keyword'
    };
  }

  // ============================================================================
  // RULE 4: Explicit governance paths
  // ============================================================================
  
  if (pathLower.startsWith('canon/documentation/')) {
    return {
      relevance: 'decision',
      execution_posture: 'governing',
      confidence: 'high',
      reason: 'canon/documentation/ is governance infrastructure'
    };
  }

  // Medium confidence: canon/ (not documentation)
  if (pathLower.startsWith('canon/')) {
    // READMEs and indexes are routing
    if (filename === 'readme.md' || filename === 'index.md') {
      return {
        relevance: 'routing',
        execution_posture: 'routing',
        confidence: 'medium',
        reason: 'README/index in canon/ is navigation'
      };
    }
    
    // CHANGELOG is background
    if (filename === 'changelog.md') {
      return {
        relevance: 'background',
        execution_posture: 'exploratory',
        confidence: 'medium',
        reason: 'CHANGELOG is historical context'
      };
    }

    // TEMPLATE files are routing
    if (filename === 'template.md' || filename.includes('template')) {
      return {
        relevance: 'routing',
        execution_posture: 'routing',
        confidence: 'medium',
        reason: 'template files are reference patterns'
      };
    }

    // Resonance is background
    if (pathLower.includes('/resonance/')) {
      return {
        relevance: 'background',
        execution_posture: 'exploratory',
        confidence: 'medium',
        reason: 'resonance/ is intellectual context'
      };
    }

    // Decisions are decision+governing
    if (pathLower.includes('/decisions/')) {
      return {
        relevance: 'decision',
        execution_posture: 'governing',
        confidence: 'high',
        reason: 'decisions/ contains governance decisions'
      };
    }

    // Default canon: supporting + operational
    return {
      relevance: 'supporting',
      execution_posture: 'operational',
      confidence: 'medium',
      reason: 'canon/ default - review for upgrade to decision'
    };
  }

  // Medium confidence: odd/
  if (pathLower.startsWith('odd/')) {
    // READMEs and indexes
    if (filename === 'readme.md' || filename === 'index.md') {
      return {
        relevance: 'routing',
        execution_posture: 'routing',
        confidence: 'medium',
        reason: 'README/index in odd/ is navigation'
      };
    }

    // Templates
    if (filename === 'template.md' || filename.includes('template')) {
      return {
        relevance: 'routing',
        execution_posture: 'routing',
        confidence: 'medium',
        reason: 'template files are reference patterns'
      };
    }

    // Contract is governing
    if (filename === 'contract.md') {
      return {
        relevance: 'decision',
        execution_posture: 'governing',
        confidence: 'high',
        reason: 'contract.md defines system boundaries'
      };
    }

    // Manifesto is background (philosophical)
    if (filename === 'manifesto.md') {
      return {
        relevance: 'background',
        execution_posture: 'exploratory',
        confidence: 'medium',
        reason: 'manifesto is philosophical context'
      };
    }

    // Decisions in ODD
    if (pathLower.includes('/decisions/')) {
      return {
        relevance: 'decision',
        execution_posture: 'governing',
        confidence: 'high',
        reason: 'decisions/ contains governance decisions'
      };
    }

    // Appendices - mostly supporting/operational
    if (pathLower.includes('/appendices/')) {
      return {
        relevance: 'supporting',
        execution_posture: 'operational',
        confidence: 'medium',
        reason: 'appendices provide supporting patterns'
      };
    }

    // Constraint folder - governing
    if (pathLower.includes('/constraint/')) {
      return {
        relevance: 'decision',
        execution_posture: 'governing',
        confidence: 'high',
        reason: 'constraint/ contains hard rules'
      };
    }

    // Default ODD: supporting + operational
    return {
      relevance: 'supporting',
      execution_posture: 'operational',
      confidence: 'medium',
      reason: 'odd/ default - review for upgrade'
    };
  }

  // Low confidence: about/
  if (pathLower.startsWith('about/')) {
    return {
      relevance: 'background',
      execution_posture: 'exploratory',
      confidence: 'medium',
      reason: 'about/ is author context, not execution'
    };
  }

  // Low confidence: projects/
  if (pathLower.startsWith('projects/')) {
    return {
      relevance: 'routing',
      execution_posture: 'routing',
      confidence: 'medium',
      reason: 'projects/ is project index'
    };
  }

  // Low confidence: apocrypha/ (if it exists in sources)
  if (pathLower.startsWith('apocrypha/')) {
    return {
      relevance: 'background',
      execution_posture: 'exploratory',
      confidence: 'high',
      reason: 'apocrypha/ is narrative/reconstructive'
    };
  }

  // Fallback
  return {
    relevance: 'supporting',
    execution_posture: 'operational',
    confidence: 'low',
    reason: 'fallback default - needs human review'
  };
}

// ============================================================================
// FRONTMATTER PARSING AND MODIFICATION
// ============================================================================

function parseFrontmatter(content) {
  const normalized = content.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { frontmatter: null, body: content, raw: null };
  }

  const endIdx = normalized.indexOf('\n---\n', 4);
  if (endIdx === -1) {
    return { frontmatter: null, body: content, raw: null };
  }

  const raw = normalized.slice(4, endIdx);
  const body = normalized.slice(endIdx + 5);
  const data = {};

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    
    const key = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1).trim();
    if (!key) continue;
    
    data[key] = value;
  }

  return { frontmatter: data, body, raw };
}

function addFieldsToFrontmatter(content, fieldsToAdd) {
  const { frontmatter, body, raw } = parseFrontmatter(content);
  
  if (!frontmatter) {
    // No frontmatter - would need to add it entirely
    // For now, skip files without frontmatter
    return null;
  }

  // Build new frontmatter with fields added after tags (or at end)
  const lines = raw.split('\n');
  const newLines = [];
  let tagsFound = false;
  let fieldsAdded = false;

  for (const line of lines) {
    newLines.push(line);
    
    // Add new fields after tags line
    if (line.trim().startsWith('tags:') && !fieldsAdded) {
      tagsFound = true;
      for (const [key, value] of Object.entries(fieldsToAdd)) {
        newLines.push(`${key}: ${value}`);
      }
      fieldsAdded = true;
    }
  }

  // If no tags found, add at end
  if (!fieldsAdded) {
    for (const [key, value] of Object.entries(fieldsToAdd)) {
      newLines.push(`${key}: ${value}`);
    }
  }

  return `---\n${newLines.join('\n')}\n---\n${body}`;
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
// MAIN
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const reportOnly = args.includes('--report');
  const apply = args.includes('--apply');

  if (!dryRun && !reportOnly && !apply) {
    console.log('Usage: node migrate-metadata.js [--dry-run | --report | --apply]');
    console.log('');
    console.log('  --dry-run   Show what would change without modifying files');
    console.log('  --report    Generate confidence report only');
    console.log('  --apply     Actually modify files');
    process.exit(1);
  }

  console.log('🔍 Scanning content source files...\n');

  const allFiles = [];
  for (const source of SOURCES) {
    const sourceDir = join(ROOT, source);
    allFiles.push(...getAllMarkdownFiles(sourceDir));
  }

  console.log(`Found ${allFiles.length} markdown files\n`);

  const results = {
    needsMigration: [],
    alreadyHasFields: [],
    noFrontmatter: [],
    byConfidence: { high: [], medium: [], low: [] }
  };

  for (const filePath of allFiles) {
    const relPath = relative(ROOT, filePath);
    const content = readFileSync(filePath, 'utf8');
    const { frontmatter } = parseFrontmatter(content);

    if (!frontmatter) {
      results.noFrontmatter.push(relPath);
      continue;
    }

    const hasRelevance = frontmatter.relevance !== undefined;
    const hasPosture = frontmatter.execution_posture !== undefined;

    if (hasRelevance && hasPosture) {
      results.alreadyHasFields.push({
        path: relPath,
        relevance: frontmatter.relevance,
        execution_posture: frontmatter.execution_posture
      });
      continue;
    }

    const inferred = inferMetadata(filePath, frontmatter);
    const entry = {
      path: relPath,
      ...inferred,
      existing: {
        relevance: frontmatter.relevance,
        execution_posture: frontmatter.execution_posture
      }
    };

    results.needsMigration.push(entry);
    results.byConfidence[inferred.confidence].push(entry);
  }

  // Print report
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('                    MIGRATION REPORT');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`📊 Summary:`);
  console.log(`   Total files:           ${allFiles.length}`);
  console.log(`   Already migrated:      ${results.alreadyHasFields.length}`);
  console.log(`   Needs migration:       ${results.needsMigration.length}`);
  console.log(`   No frontmatter:        ${results.noFrontmatter.length}`);
  console.log('');

  console.log(`📈 Confidence breakdown:`);
  console.log(`   High confidence:       ${results.byConfidence.high.length}`);
  console.log(`   Medium confidence:     ${results.byConfidence.medium.length}`);
  console.log(`   Low confidence:        ${results.byConfidence.low.length}`);
  console.log('');

  if (results.noFrontmatter.length > 0) {
    console.log('⚠️  Files without frontmatter (skipped):');
    for (const path of results.noFrontmatter) {
      console.log(`   - ${path}`);
    }
    console.log('');
  }

  if (results.alreadyHasFields.length > 0) {
    console.log('✅ Already migrated:');
    for (const entry of results.alreadyHasFields) {
      console.log(`   - ${entry.path}`);
      console.log(`     relevance: ${entry.relevance}, execution_posture: ${entry.execution_posture}`);
    }
    console.log('');
  }

  // Group by confidence for review
  if (results.byConfidence.low.length > 0) {
    console.log('🔴 LOW CONFIDENCE (needs human review):');
    for (const entry of results.byConfidence.low) {
      console.log(`   - ${entry.path}`);
      console.log(`     → relevance: ${entry.relevance}, execution_posture: ${entry.execution_posture}`);
      console.log(`     reason: ${entry.reason}`);
    }
    console.log('');
  }

  if (results.byConfidence.medium.length > 0) {
    console.log('🟡 MEDIUM CONFIDENCE (review recommended):');
    for (const entry of results.byConfidence.medium) {
      console.log(`   - ${entry.path}`);
      console.log(`     → relevance: ${entry.relevance}, execution_posture: ${entry.execution_posture}`);
      console.log(`     reason: ${entry.reason}`);
    }
    console.log('');
  }

  if (results.byConfidence.high.length > 0) {
    console.log('🟢 HIGH CONFIDENCE (auto-apply safe):');
    for (const entry of results.byConfidence.high) {
      console.log(`   - ${entry.path}`);
      console.log(`     → relevance: ${entry.relevance}, execution_posture: ${entry.execution_posture}`);
      console.log(`     reason: ${entry.reason}`);
    }
    console.log('');
  }

  // Apply changes if requested
  if (apply && results.needsMigration.length > 0) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('                    APPLYING CHANGES');
    console.log('═══════════════════════════════════════════════════════════════\n');

    let applied = 0;
    let skipped = 0;

    for (const entry of results.needsMigration) {
      const filePath = join(ROOT, entry.path);
      const content = readFileSync(filePath, 'utf8');

      const fieldsToAdd = {};
      if (!entry.existing.relevance) {
        fieldsToAdd.relevance = entry.relevance;
      }
      if (!entry.existing.execution_posture) {
        fieldsToAdd.execution_posture = entry.execution_posture;
      }

      const newContent = addFieldsToFrontmatter(content, fieldsToAdd);
      
      if (newContent) {
        writeFileSync(filePath, newContent);
        console.log(`✅ ${entry.path}`);
        applied++;
      } else {
        console.log(`⚠️  Skipped (no frontmatter): ${entry.path}`);
        skipped++;
      }
    }

    console.log('');
    console.log(`Applied: ${applied}, Skipped: ${skipped}`);
  }

  if (dryRun) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('DRY RUN - no files were modified');
    console.log('Run with --apply to make changes');
    console.log('═══════════════════════════════════════════════════════════════');
  }
}

main();
