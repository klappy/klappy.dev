#!/usr/bin/env node
/**
 * sync-content.js
 *
 * Syncs source markdown documents to /public/content/ for the static SPA.
 * Run this before build or as part of CI.
 *
 * Source of truth:
 * - Markdown files under /canon, /odd, /about, /projects (excluding _template)
 * - Per-file YAML frontmatter (metadata lives with the content)
 * - /canon/meta/pack.json (pack-level metadata)
 *
 * Generated output:
 * - /public/content/manifest.json (compiled; do not hand-edit)
 * - /public/content/** (synced copies of markdown content)
 */

import { cpSync, rmSync, mkdirSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const TARGET = join(ROOT, 'public', 'content');
const PACK_PATH = join(ROOT, 'canon', 'meta', 'pack.json');
const MANIFEST_DEST = join(TARGET, 'manifest.json');

// Source directories to sync
const SOURCES = [
  { src: 'canon', dest: 'canon' },
  { src: 'odd', dest: 'odd' },
  { src: 'about', dest: 'about' },
  { src: 'projects', dest: 'projects' },
];

// Files/folders to exclude
const EXCLUDE = ['_template'];

function parseFrontmatterValue(value) {
  const trimmed = value.trim();
  if (trimmed === '') return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  // Allow JSON-style values for convenience (arrays/objects/quoted strings)
  if (trimmed.startsWith('[') || trimmed.startsWith('{') || trimmed.startsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      // fall through
    }
  }

  // Strip simple quotes
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function extractFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) return null;

  const endIdx = normalized.indexOf('\n---\n', 4);
  if (endIdx === -1) return null;

  const raw = normalized.slice(4, endIdx);
  const data = {};

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1);
    if (!key) continue;
    data[key] = parseFrontmatterValue(value);
  }

  return data;
}

function getAllMarkdownFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (EXCLUDE.includes(entry.name)) continue;
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }

  return files;
}

function buildManifest() {
  if (!existsSync(PACK_PATH)) {
    throw new Error(`Missing pack metadata at ${PACK_PATH}`);
  }

  const pack = JSON.parse(readFileSync(PACK_PATH, 'utf-8'));

  const resources = [];
  const sourceRoots = SOURCES.map(s => join(ROOT, s.src)).filter(p => existsSync(p));

  for (const rootDir of sourceRoots) {
    for (const filePath of getAllMarkdownFiles(rootDir)) {
      const markdown = readFileSync(filePath, 'utf-8');
      const fm = extractFrontmatter(markdown);
      if (!fm) continue;

      const uri = fm.uri;
      const title = fm.title;
      const audience = fm.audience;
      if (!uri || !title || !audience) continue;

      const path = '/' + relative(ROOT, filePath).replace(/\\/g, '/');

      resources.push({
        uri,
        path,
        title,
        type: fm.type || 'text/markdown',
        audience,
        exposure: fm.exposure || 'nav',
        tier: typeof fm.tier === 'number' ? fm.tier : 2,
        voice: fm.voice || 'neutral',
        stability: fm.stability || 'evolving',
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        order: typeof fm.order === 'number' ? fm.order : undefined,

        // Optional learning-layer media (must remain non-canonical)
        assets: (fm.assets && typeof fm.assets === 'object') ? fm.assets : undefined
      });
    }
  }

  // Stable ordering: explicit order first, then title.
  resources.sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY;
    const bo = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });

  return { pack, resources };
}

function sync() {
  console.log('🔄 Syncing content to /public/content/...\n');

  // Clean target
  for (const { dest } of SOURCES) {
    const targetPath = join(TARGET, dest);
    if (existsSync(targetPath)) {
      rmSync(targetPath, { recursive: true });
      console.log(`  🗑️  Removed ${dest}/`);
    }
  }

  // Copy each source
  for (const { src, dest } of SOURCES) {
    const srcPath = join(ROOT, src);
    const destPath = join(TARGET, dest);

    if (!existsSync(srcPath)) {
      console.log(`  ⚠️  Source not found: ${src}/ (skipping)`);
      continue;
    }

    mkdirSync(destPath, { recursive: true });
    
    cpSync(srcPath, destPath, {
      recursive: true,
      filter: (source) => {
        // Exclude specified folders
        for (const ex of EXCLUDE) {
          if (source.includes(`/${ex}`) || source.endsWith(ex)) {
            return false;
          }
        }
        return true;
      },
    });

    console.log(`  ✅ ${src}/ → public/content/${dest}/`);
  }

  // Generate manifest.json from per-file frontmatter
  const manifest = buildManifest();
  mkdirSync(dirname(MANIFEST_DEST), { recursive: true });
  const json = JSON.stringify(manifest, null, 2) + '\n';
  writeFileSync(MANIFEST_DEST, json);
  console.log(`  ✅ Generated public/content/manifest.json from frontmatter`);

  console.log('\n✅ Content sync complete.\n');
  console.log('Source of truth: per-file frontmatter in /canon, /odd, /about, /projects\n');
}

sync();
