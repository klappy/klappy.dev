#!/usr/bin/env node
/**
 * generate-evidence-index.js
 * 
 * Generates index.html and index.json for an evidence folder.
 * Part of E0003.1 — Evidence must be discoverable, not just public.
 * 
 * Usage:
 *   node generate-evidence-index.js <evidence-folder-path> [attempt-json-path]
 * 
 * Output:
 *   <evidence-folder>/index.html  — human-browsable index
 *   <evidence-folder>/index.json  — machine inventory
 */

import { existsSync, readdirSync, statSync, writeFileSync, readFileSync } from 'fs';
import { join, basename, relative } from 'path';

const args = process.argv.slice(2);
const evidenceDir = args[0];
const attemptJsonPath = args[1];

if (!evidenceDir) {
  console.error('Usage: generate-evidence-index.js <evidence-folder-path> [attempt-json-path]');
  process.exit(1);
}

if (!existsSync(evidenceDir)) {
  console.error(`Evidence folder not found: ${evidenceDir}`);
  process.exit(1);
}

// ============================================================
// Enumerate files
// ============================================================

function enumerateFolder(folderPath, basePath = folderPath) {
  if (!existsSync(folderPath)) return [];
  
  const files = [];
  const entries = readdirSync(folderPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(folderPath, entry.name);
    const relativePath = relative(basePath, fullPath);
    
    if (entry.isDirectory()) {
      files.push(...enumerateFolder(fullPath, basePath));
    } else {
      const stats = statSync(fullPath);
      files.push({
        name: entry.name,
        path: relativePath,
        size: stats.size,
        modified: stats.mtime.toISOString()
      });
    }
  }
  
  return files;
}

// Enumerate evidence assets
const screenshots = enumerateFolder(join(evidenceDir, 'screenshots'), evidenceDir);
const recordings = enumerateFolder(join(evidenceDir, 'recordings'), evidenceDir);
const outputs = enumerateFolder(join(evidenceDir, 'outputs'), evidenceDir);

// Find markdown files at root
const rootFiles = readdirSync(evidenceDir, { withFileTypes: true })
  .filter(e => e.isFile())
  .map(e => {
    const fullPath = join(evidenceDir, e.name);
    const stats = statSync(fullPath);
    return {
      name: e.name,
      path: e.name,
      size: stats.size,
      modified: stats.mtime.toISOString()
    };
  });

const evidenceMd = rootFiles.find(f => f.name === 'EVIDENCE.md');
const attemptMd = rootFiles.find(f => f.name === 'ATTEMPT.md');
const metaJson = rootFiles.find(f => f.name === 'META.json');

// ============================================================
// Load provenance
// ============================================================

let provenance = {
  lane: 'unknown',
  prd_version: 'unknown',
  epoch_id: 'unknown',
  run_id: 'unknown',
  tool: 'unknown',
  agent: 'unknown',
  model: 'unknown',
  git_head: 'unknown',
  registered_at: null
};

// Try META.json in evidence folder first
const metaPath = join(evidenceDir, 'META.json');
if (existsSync(metaPath)) {
  try {
    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    provenance = { ...provenance, ...meta };
  } catch (e) {
    console.warn('Warning: Could not parse META.json');
  }
}

// Override with .attempt.json if provided
if (attemptJsonPath && existsSync(attemptJsonPath)) {
  try {
    const attempt = JSON.parse(readFileSync(attemptJsonPath, 'utf8'));
    provenance = { ...provenance, ...attempt };
  } catch (e) {
    console.warn('Warning: Could not parse .attempt.json');
  }
}

// ============================================================
// Generate index.json
// ============================================================

const indexJson = {
  version: '1.0',
  generated_at: new Date().toISOString(),
  provenance: {
    lane: provenance.lane,
    prd_version: provenance.prd_version,
    epoch_id: provenance.epoch_id,
    run_id: provenance.run_id,
    tool: provenance.tool,
    agent: provenance.agent,
    model: provenance.model,
    git_head: provenance.git_head,
    registered_at: provenance.registered_at
  },
  assets: {
    documents: rootFiles.filter(f => f.name.endsWith('.md') || f.name.endsWith('.json')),
    screenshots: screenshots,
    recordings: recordings,
    outputs: outputs
  },
  counts: {
    screenshots: screenshots.length,
    recordings: recordings.length,
    outputs: outputs.length
  },
  app_entry: '/'
};

writeFileSync(join(evidenceDir, 'index.json'), JSON.stringify(indexJson, null, 2));
console.log('  ✅ Generated index.json');

// ============================================================
// Generate index.html
// ============================================================

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function fileLink(file) {
  return `<li><a href="${file.path}">${file.name}</a> <span class="size">(${formatBytes(file.size)})</span></li>`;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Evidence — ${provenance.lane} / ${provenance.prd_version}</title>
  <style>
    :root {
      --bg: #fafafa;
      --fg: #1a1a1a;
      --muted: #666;
      --border: #e0e0e0;
      --accent: #0066cc;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #1a1a1a;
        --fg: #f0f0f0;
        --muted: #999;
        --border: #333;
        --accent: #4da6ff;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      background: var(--bg);
      color: var(--fg);
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    h2 { font-size: 1.1rem; margin: 1.5rem 0 0.5rem; color: var(--fg); }
    .meta { color: var(--muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
    .meta code { background: var(--border); padding: 0.1rem 0.3rem; border-radius: 3px; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9rem; }
    th, td { text-align: left; padding: 0.5rem; border-bottom: 1px solid var(--border); }
    th { color: var(--muted); font-weight: normal; }
    ul { list-style: none; }
    li { padding: 0.3rem 0; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .size { color: var(--muted); font-size: 0.85rem; }
    .section { margin-bottom: 2rem; }
    .empty { color: var(--muted); font-style: italic; }
    .app-link { 
      display: inline-block; 
      margin-top: 1rem; 
      padding: 0.5rem 1rem; 
      background: var(--accent); 
      color: white; 
      border-radius: 4px; 
    }
    .app-link:hover { opacity: 0.9; text-decoration: none; }
  </style>
</head>
<body>
  <h1>📋 Evidence</h1>
  <p class="meta">
    Lane: <code>${provenance.lane}</code> · 
    PRD: <code>${provenance.prd_version}</code> · 
    Epoch: <code>${provenance.epoch_id}</code>
  </p>

  <table>
    <tr><th>Run ID</th><td><code>${provenance.run_id}</code></td></tr>
    <tr><th>Tool</th><td>${provenance.tool}</td></tr>
    <tr><th>Agent</th><td>${provenance.agent}</td></tr>
    <tr><th>Model</th><td>${provenance.model}</td></tr>
    <tr><th>Git HEAD</th><td><code>${typeof provenance.git_head === 'string' ? provenance.git_head.substring(0, 8) : 'unknown'}</code></td></tr>
    <tr><th>Registered</th><td>${provenance.registered_at || 'unknown'}</td></tr>
  </table>

  <a href="/" class="app-link">→ View App</a>

  <div class="section">
    <h2>📄 Documents</h2>
    ${evidenceMd ? `<ul>${fileLink(evidenceMd)}</ul>` : ''}
    ${attemptMd ? `<ul>${fileLink(attemptMd)}</ul>` : ''}
    ${metaJson ? `<ul>${fileLink(metaJson)}</ul>` : ''}
  </div>

  <div class="section">
    <h2>📸 Screenshots (${screenshots.length})</h2>
    ${screenshots.length > 0 
      ? `<ul>${screenshots.map(fileLink).join('\n      ')}</ul>` 
      : '<p class="empty">No screenshots</p>'}
  </div>

  <div class="section">
    <h2>🎬 Recordings (${recordings.length})</h2>
    ${recordings.length > 0 
      ? `<ul>${recordings.map(fileLink).join('\n      ')}</ul>` 
      : '<p class="empty">No recordings</p>'}
  </div>

  <div class="section">
    <h2>📁 Outputs (${outputs.length})</h2>
    ${outputs.length > 0 
      ? `<ul>${outputs.map(fileLink).join('\n      ')}</ul>` 
      : '<p class="empty">No additional outputs</p>'}
  </div>

  <p class="meta" style="margin-top: 2rem;">
    <a href="index.json">index.json</a> · 
    Generated: ${new Date().toISOString()}
  </p>
</body>
</html>`;

writeFileSync(join(evidenceDir, 'index.html'), html);
console.log('  ✅ Generated index.html');

// ============================================================
// Report
// ============================================================

console.log(`\n  Evidence Index Generated:`);
console.log(`    Screenshots: ${screenshots.length}`);
console.log(`    Recordings:  ${recordings.length}`);
console.log(`    Outputs:     ${outputs.length}`);
