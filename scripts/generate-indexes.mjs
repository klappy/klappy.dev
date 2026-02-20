#!/usr/bin/env node

/**
 * generate-indexes.mjs
 *
 * Derives README index tables from frontmatter at commit time.
 * Replaces content between <!-- INDEX:START --> and <!-- INDEX:END --> markers
 * in README.md files that have `index_sort` in their frontmatter.
 *
 * Sort modes:
 *   date_desc  — reverse chronological by frontmatter `date` (writings)
 *   alpha      — alphabetical by frontmatter `title` (canon folders)
 *   id         — numeric by ID extracted from filename (decisions)
 *
 * Description priority: description > hook > subtitle > first blockquote
 * Link target: frontmatter `uri` if present, else relative file path
 *
 * See: docs/planning/automated-readme-indexes.md
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname, relative, basename } from 'path';

const ROOT = process.cwd();
const START_MARKER = '<!-- INDEX:START -->';
const END_MARKER = '<!-- INDEX:END -->';

// ---------------------------------------------------------------------------
// Frontmatter parser — handles the subset of YAML used in this repo
// ---------------------------------------------------------------------------

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, body: content };

  const yamlBlock = match[1];
  const body = content.slice(match[0].length).trim();
  const data = parseSimpleYaml(yamlBlock);

  return { data, body };
}

function parseSimpleYaml(yaml) {
  const result = {};
  const lines = yaml.split('\n');
  let currentKey = null;

  for (const line of lines) {
    // Skip YAML comments and blank lines
    if (line.trim().startsWith('#') || line.trim() === '') continue;

    // Array continuation (  - value)
    const arrayMatch = line.match(/^\s+-\s+(.+)/);
    if (arrayMatch && currentKey) {
      if (!Array.isArray(result[currentKey])) {
        result[currentKey] = [];
      }
      result[currentKey].push(stripQuotes(arrayMatch[1].trim()));
      continue;
    }

    // Key: value
    const kvMatch = line.match(/^([\w][\w_-]*)\s*:\s*(.*)/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      let value = kvMatch[2].trim();

      // Empty value — may be followed by array items
      if (value === '') continue;

      // Inline array [a, b, c]
      if (value.startsWith('[') && value.endsWith(']')) {
        result[currentKey] = value
          .slice(1, -1)
          .split(',')
          .map(v => stripQuotes(v.trim()))
          .filter(Boolean);
        continue;
      }

      // Scalar
      value = stripQuotes(value);
      if (value === 'true') value = true;
      else if (value === 'false') value = false;

      result[currentKey] = value;
    }
  }

  return result;
}

function stripQuotes(s) {
  if ((s.startsWith('"') && s.endsWith('"')) ||
      (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// ---------------------------------------------------------------------------
// Description extraction
// ---------------------------------------------------------------------------

function getDescription(frontmatter, body) {
  if (frontmatter.description) return oneLine(frontmatter.description);
  if (frontmatter.hook) return oneLine(frontmatter.hook);
  if (frontmatter.subtitle) return oneLine(frontmatter.subtitle);

  // First blockquote line from body
  const bqMatch = body.match(/^>\s*(.+)/m);
  if (bqMatch) return oneLine(bqMatch[1]);

  return '';
}

function oneLine(s) {
  return s.replace(/\r?\n/g, ' ').trim();
}

function truncate(s, max) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + '\u2026';
}

// ---------------------------------------------------------------------------
// Directory scanning
// ---------------------------------------------------------------------------

function scanDirectory(dirPath) {
  const entries = readdirSync(dirPath).filter(f =>
    f.endsWith('.md') &&
    f !== 'README.md' &&
    f !== 'TEMPLATE.md'
  );

  const files = [];
  for (const filename of entries) {
    const filePath = join(dirPath, filename);
    const content = readFileSync(filePath, 'utf-8');
    const { data, body } = parseFrontmatter(content);

    // Skip files without a title — not valid for indexing
    if (!data.title) continue;

    files.push({
      filename,
      frontmatter: data,
      description: getDescription(data, body),
    });
  }

  return files;
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

function sortFiles(files, sortOrder) {
  const sorted = [...files];
  switch (sortOrder) {
    case 'date_desc':
      return sorted.sort((a, b) => {
        const da = a.frontmatter.date || '0000-00-00';
        const db = b.frontmatter.date || '0000-00-00';
        return db.localeCompare(da);
      });

    case 'id':
      return sorted.sort((a, b) => {
        const idA = parseInt(a.filename.match(/(\d+)/)?.[1] || '0', 10);
        const idB = parseInt(b.filename.match(/(\d+)/)?.[1] || '0', 10);
        return idA - idB;
      });

    case 'alpha':
    default:
      return sorted.sort((a, b) =>
        (a.frontmatter.title || '').localeCompare(b.frontmatter.title || '')
      );
  }
}

// ---------------------------------------------------------------------------
// Table generation
// ---------------------------------------------------------------------------

function generateTable(files, sortOrder) {
  const sorted = sortFiles(files, sortOrder);

  if (sorted.length === 0) {
    return '_No indexed files found._\n';
  }

  const rows = sorted.map(file => {
    const title = file.frontmatter.title;
    const uri = file.frontmatter.uri;
    const link = uri
      ? `[${escapeCell(title)}](${uri})`
      : `[${escapeCell(title)}](./${file.filename})`;
    const desc = escapeCell(truncate(file.description, 150));
    return `| ${link} | ${desc} |`;
  });

  return [
    '| Title | Description |',
    '|-------|-------------|',
    ...rows,
    '',
  ].join('\n');
}

function escapeCell(s) {
  return s.replace(/\|/g, '\\|');
}

// ---------------------------------------------------------------------------
// README update
// ---------------------------------------------------------------------------

function updateReadme(readmePath) {
  const content = readFileSync(readmePath, 'utf-8');
  const { data: fm } = parseFrontmatter(content);

  // Only process READMEs that opt in via index_sort
  if (!fm.index_sort) return false;

  const dirPath = dirname(readmePath);
  const files = scanDirectory(dirPath);
  const table = generateTable(files, fm.index_sort);
  const generated = `${START_MARKER}\n${table}${END_MARKER}`;

  if (content.includes(START_MARKER) && content.includes(END_MARKER)) {
    const regex = new RegExp(
      escapeRegExp(START_MARKER) + '[\\s\\S]*?' + escapeRegExp(END_MARKER)
    );
    const updated = content.replace(regex, generated);
    if (updated !== content) {
      writeFileSync(readmePath, updated, 'utf-8');
      return true;
    }
    return false;
  }

  // Markers not found — cannot update safely
  console.warn(`  WARN: ${relative(ROOT, readmePath)} has index_sort but no INDEX markers — skipping`);
  return false;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Discovery — walk repo for README.md files
// ---------------------------------------------------------------------------

function findReadmes(dir) {
  const results = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '_compiled') continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findReadmes(fullPath));
    } else if (entry.name === 'README.md') {
      results.push(fullPath);
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const readmes = findReadmes(ROOT);
  let updated = 0;

  for (const readme of readmes) {
    const relPath = relative(ROOT, readme);
    if (updateReadme(readme)) {
      updated++;
      console.log(`  updated: ${relPath}`);
    }
  }

  if (updated > 0) {
    console.log(`\ngenerate-indexes: ${updated} README(s) updated.`);
  }

  return updated;
}

const changed = main();
process.exit(0);
