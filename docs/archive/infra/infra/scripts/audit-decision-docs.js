#!/usr/bin/env node
/**
 * audit-decision-docs.js (Phase B)
 *
 * Audits decision/governing documents for required executable structure.
 * Only enforces on files with: relevance: decision AND execution_posture: governing
 *
 * Run modes:
 *   --check     Run audit and exit with code 1 if strict failures exist
 *   --report    Generate reports only (always exit 0)
 *
 * Outputs:
 *   public/_compiled/reports/decision-audit.json
 *   public/_compiled/reports/decision-audit.md
 *
 * Per canon/documentation/slice-contract-sml.md and agent-executable-outline.md
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const REPORT_DIR = join(ROOT, 'public', '_compiled', 'reports');

// Source directories to audit
const SOURCES = ['canon', 'odd', 'about', 'projects'];

// Files/folders to exclude
const EXCLUDE = ['_template', '_compiled', 'node_modules', '.git'];

// ============================================================================
// REQUIRED HEADINGS FOR DECISION/GOVERNING DOCS
// ============================================================================

const REQUIRED_HEADINGS = [
  'Operating Constraints',
  'Defaults',
  'Failure Modes',
  'Verification'
];

// Evidence keywords for Verification section
const EVIDENCE_KEYWORDS = [
  'evidence', 'before', 'after', 'screenshot', 'recording',
  'artifact', 'prove', 'proof', 'observable', 'verify', 'confirmed'
];

// Thresholds
const MIN_BULLETS_CONSTRAINTS = 2;
const MIN_BULLETS_DEFAULTS = 2;
const MAX_SECTION_CHARS = 2000;

// ============================================================================
// FRONTMATTER AND CONTENT PARSING
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

  // Track multiline values
  let currentKey = null;
  let inMultiline = false;
  let multilineValue = [];

  for (const line of raw.split('\n')) {
    // Check for new key
    if (!line.startsWith(' ') && !line.startsWith('\t') && line.includes(':')) {
      // Save previous multiline if any
      if (currentKey && inMultiline) {
        data[currentKey] = multilineValue;
      }
      
      const colonIdx = line.indexOf(':');
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      
      if (!key) continue;
      
      currentKey = key;
      
      // Check if this starts a multiline array
      if (value === '' || value === '[]') {
        inMultiline = true;
        multilineValue = [];
      } else {
        inMultiline = false;
        // Parse value
        if (value.startsWith('[') && value.endsWith(']')) {
          try {
            data[key] = JSON.parse(value);
          } catch {
            data[key] = value;
          }
        } else if (value === 'true') {
          data[key] = true;
        } else if (value === 'false') {
          data[key] = false;
        } else if (/^\d+$/.test(value)) {
          data[key] = parseInt(value, 10);
        } else {
          // Strip quotes
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            data[key] = value.slice(1, -1);
          } else {
            data[key] = value;
          }
        }
      }
    } else if (inMultiline && line.trim().startsWith('-')) {
      // Multiline array item
      const item = line.trim().slice(1).trim();
      // Strip quotes from item
      if ((item.startsWith('"') && item.endsWith('"')) || 
          (item.startsWith("'") && item.endsWith("'"))) {
        multilineValue.push(item.slice(1, -1));
      } else {
        multilineValue.push(item);
      }
    }
  }

  // Save final multiline if any
  if (currentKey && inMultiline) {
    data[currentKey] = multilineValue;
  }

  return { frontmatter: data, body };
}

function extractSections(body) {
  const sections = {};
  const lines = body.split('\n');
  
  let currentHeading = null;
  let currentContent = [];

  for (const line of lines) {
    // Check for ## heading
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      // Save previous section
      if (currentHeading) {
        sections[currentHeading] = currentContent.join('\n').trim();
      }
      currentHeading = match[1].trim();
      currentContent = [];
    } else if (currentHeading) {
      currentContent.push(line);
    }
  }

  // Save final section
  if (currentHeading) {
    sections[currentHeading] = currentContent.join('\n').trim();
  }

  return sections;
}

function countBullets(content) {
  const lines = content.split('\n');
  return lines.filter(line => line.trim().startsWith('-') || line.trim().match(/^\d+\./)).length;
}

function hasEvidenceKeywords(content) {
  const lower = content.toLowerCase();
  return EVIDENCE_KEYWORDS.some(kw => lower.includes(kw));
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
// AUDIT LOGIC
// ============================================================================

function auditFile(filePath) {
  const relPath = relative(ROOT, filePath);
  const content = readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  const result = {
    path: relPath,
    relevance: null,
    execution_posture: null,
    is_target: false,
    slice_exceptions: null,
    strict_failures: [],
    warnings: [],
    sections_found: [],
    sections_missing: []
  };

  if (!frontmatter) {
    result.warnings.push('No frontmatter found');
    return result;
  }

  result.relevance = frontmatter.relevance;
  result.execution_posture = frontmatter.execution_posture;
  result.slice_exceptions = frontmatter.slice_exceptions || null;

  // Only audit decision/governing docs
  if (frontmatter.relevance !== 'decision' || frontmatter.execution_posture !== 'governing') {
    return result;
  }

  result.is_target = true;

  // Extract sections
  const sections = extractSections(body);
  const allowedMissing = result.slice_exceptions?.missing_sections_allowed || [];

  // Check required headings
  for (const heading of REQUIRED_HEADINGS) {
    const sectionContent = sections[heading];
    const isAllowedMissing = allowedMissing.includes(heading);

    if (!sectionContent && sectionContent !== '') {
      result.sections_missing.push(heading);
      
      if (isAllowedMissing) {
        result.warnings.push(`Missing '${heading}' (allowed by slice_exceptions)`);
      } else {
        result.strict_failures.push(`Missing required heading: '## ${heading}'`);
      }
      continue;
    }

    result.sections_found.push(heading);

    // Check section quality
    const charCount = sectionContent.length;
    const bulletCount = countBullets(sectionContent);

    // Empty section
    if (charCount === 0 || (charCount < 10 && bulletCount === 0)) {
      result.warnings.push(`'${heading}' section appears empty`);
      continue;
    }

    // Section-specific checks
    if (heading === 'Operating Constraints' && bulletCount < MIN_BULLETS_CONSTRAINTS) {
      result.warnings.push(`'Operating Constraints' has ${bulletCount} bullets (recommend >= ${MIN_BULLETS_CONSTRAINTS})`);
    }

    if (heading === 'Defaults' && bulletCount < MIN_BULLETS_DEFAULTS) {
      result.warnings.push(`'Defaults' has ${bulletCount} bullets (recommend >= ${MIN_BULLETS_DEFAULTS})`);
    }

    if (heading === 'Verification' && !hasEvidenceKeywords(sectionContent)) {
      result.warnings.push(`'Verification' section lacks evidence keywords`);
    }

    // Section too long (S-pack bloat risk)
    if (charCount > MAX_SECTION_CHARS) {
      result.warnings.push(`'${heading}' section is ${charCount} chars (recommend < ${MAX_SECTION_CHARS} for S-pack extraction)`);
    }
  }

  return result;
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

function generateJsonReport(results) {
  const targetDocs = results.filter(r => r.is_target);
  const passing = targetDocs.filter(r => r.strict_failures.length === 0);
  const failing = targetDocs.filter(r => r.strict_failures.length > 0);
  const withWarnings = targetDocs.filter(r => r.warnings.length > 0);

  return {
    generated_at: new Date().toISOString(),
    summary: {
      total_files: results.length,
      decision_governing_files: targetDocs.length,
      passing: passing.length,
      failing: failing.length,
      with_warnings: withWarnings.length
    },
    required_headings: REQUIRED_HEADINGS,
    failing_docs: failing.map(r => ({
      path: r.path,
      failures: r.strict_failures,
      warnings: r.warnings
    })),
    passing_docs: passing.map(r => ({
      path: r.path,
      sections_found: r.sections_found,
      sections_missing: r.sections_missing,
      warnings: r.warnings
    })),
    non_target_docs: results.filter(r => !r.is_target).length
  };
}

function generateMarkdownReport(results, jsonReport) {
  const lines = [];

  lines.push('# Decision Document Audit Report');
  lines.push('');
  lines.push(`> Generated: ${jsonReport.generated_at}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Total content files | ${jsonReport.summary.total_files} |`);
  lines.push(`| Decision/governing files | ${jsonReport.summary.decision_governing_files} |`);
  lines.push(`| ✅ Passing | ${jsonReport.summary.passing} |`);
  lines.push(`| ❌ Failing | ${jsonReport.summary.failing} |`);
  lines.push(`| ⚠️ With warnings | ${jsonReport.summary.with_warnings} |`);
  lines.push('');

  lines.push('## Required Headings');
  lines.push('');
  lines.push('All `relevance: decision` + `execution_posture: governing` documents must have:');
  lines.push('');
  for (const h of REQUIRED_HEADINGS) {
    lines.push(`- \`## ${h}\``);
  }
  lines.push('');

  if (jsonReport.failing_docs.length > 0) {
    lines.push('## ❌ Failing Documents');
    lines.push('');
    lines.push('These documents are missing required headings:');
    lines.push('');

    for (const doc of jsonReport.failing_docs) {
      lines.push(`### \`${doc.path}\``);
      lines.push('');
      lines.push('**Failures:**');
      for (const f of doc.failures) {
        lines.push(`- ${f}`);
      }
      if (doc.warnings.length > 0) {
        lines.push('');
        lines.push('**Warnings:**');
        for (const w of doc.warnings) {
          lines.push(`- ${w}`);
        }
      }
      lines.push('');
    }
  }

  if (jsonReport.passing_docs.length > 0) {
    lines.push('## ✅ Passing Documents');
    lines.push('');

    for (const doc of jsonReport.passing_docs) {
      const warningIndicator = doc.warnings.length > 0 ? ' ⚠️' : '';
      lines.push(`### \`${doc.path}\`${warningIndicator}`);
      lines.push('');
      lines.push(`Sections found: ${doc.sections_found.join(', ') || 'none'}`);
      if (doc.sections_missing.length > 0) {
        lines.push(`Sections missing (allowed): ${doc.sections_missing.join(', ')}`);
      }
      if (doc.warnings.length > 0) {
        lines.push('');
        lines.push('**Warnings:**');
        for (const w of doc.warnings) {
          lines.push(`- ${w}`);
        }
      }
      lines.push('');
    }
  }

  lines.push('---');
  lines.push('');
  lines.push('## How to Fix');
  lines.push('');
  lines.push('For each failing document, add the missing headings:');
  lines.push('');
  lines.push('```markdown');
  lines.push('## Operating Constraints');
  lines.push('');
  lines.push('- MUST ...');
  lines.push('- MUST NOT ...');
  lines.push('');
  lines.push('## Defaults');
  lines.push('');
  lines.push('- When uncertain, ...');
  lines.push('- Prefer ...');
  lines.push('');
  lines.push('## Failure Modes');
  lines.push('');
  lines.push('- **Name**: Description of the trap');
  lines.push('');
  lines.push('## Verification');
  lines.push('');
  lines.push('- Evidence of X');
  lines.push('- Before/after comparison');
  lines.push('```');
  lines.push('');
  lines.push('If a section genuinely does not apply, add to frontmatter:');
  lines.push('');
  lines.push('```yaml');
  lines.push('slice_exceptions:');
  lines.push('  missing_sections_allowed: ["Failure Modes"]');
  lines.push('  rationale: "This document has no known failure modes yet"');
  lines.push('```');

  return lines.join('\n');
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  const checkMode = args.includes('--check');
  const reportMode = args.includes('--report');

  if (!checkMode && !reportMode) {
    console.log('Usage: node audit-decision-docs.js [--check | --report]');
    console.log('');
    console.log('  --check    Run audit and exit with code 1 if strict failures exist');
    console.log('  --report   Generate reports only (always exit 0)');
    process.exit(1);
  }

  console.log('🔍 Auditing decision/governing documents...\n');

  // Collect all files
  const allFiles = [];
  for (const source of SOURCES) {
    const sourceDir = join(ROOT, source);
    allFiles.push(...getAllMarkdownFiles(sourceDir));
  }

  console.log(`Found ${allFiles.length} content files\n`);

  // Audit each file
  const results = allFiles.map(f => auditFile(f));

  // Generate reports
  const jsonReport = generateJsonReport(results);
  const mdReport = generateMarkdownReport(results, jsonReport);

  // Write reports
  mkdirSync(REPORT_DIR, { recursive: true });
  writeFileSync(join(REPORT_DIR, 'decision-audit.json'), JSON.stringify(jsonReport, null, 2) + '\n');
  writeFileSync(join(REPORT_DIR, 'decision-audit.md'), mdReport + '\n');

  console.log(`📊 Reports written:`);
  console.log(`   public/_compiled/reports/decision-audit.json`);
  console.log(`   public/_compiled/reports/decision-audit.md`);
  console.log('');

  // Print summary
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('                    AUDIT SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log(`Total content files:        ${jsonReport.summary.total_files}`);
  console.log(`Decision/governing files:   ${jsonReport.summary.decision_governing_files}`);
  console.log(`✅ Passing:                 ${jsonReport.summary.passing}`);
  console.log(`❌ Failing:                 ${jsonReport.summary.failing}`);
  console.log(`⚠️  With warnings:           ${jsonReport.summary.with_warnings}`);
  console.log('');

  if (jsonReport.failing_docs.length > 0) {
    console.log('❌ FAILING DOCUMENTS:');
    for (const doc of jsonReport.failing_docs) {
      console.log(`   ${doc.path}`);
      for (const f of doc.failures) {
        console.log(`      - ${f}`);
      }
    }
    console.log('');
  }

  if (checkMode && jsonReport.summary.failing > 0) {
    console.log('❌ Audit FAILED - fix missing headings before committing');
    process.exit(1);
  }

  console.log('✅ Audit complete');
}

main();
