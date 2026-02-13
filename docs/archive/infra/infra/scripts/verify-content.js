#!/usr/bin/env node
/**
 * verify-content.js
 * 
 * Validates that manifest.json entries match actual files in /public/content.
 * Catches the "added doc but forgot manifest" and "removed doc but manifest stale" failures.
 * 
 * Exit codes:
 *   0 = all good
 *   1 = missing files or orphans detected
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const CONTENT_DIR = join(ROOT, 'public', 'content');
const MANIFEST_PATH = join(CONTENT_DIR, 'manifest.json');

// Files to ignore when checking for orphans
const IGNORE_FILES = ['manifest.json', '.DS_Store'];
const IGNORE_DIRS = ['_template'];

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    if (IGNORE_FILES.includes(file)) continue;
    if (IGNORE_DIRS.includes(file)) continue;
    
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      // Store path relative to content dir, with leading slash
      const relativePath = '/' + relative(CONTENT_DIR, filePath);
      fileList.push(relativePath);
    }
  }
  
  return fileList;
}

function verify() {
  console.log('🔍 Verifying content integrity...\n');
  
  let hasErrors = false;
  
  // Check manifest exists
  if (!existsSync(MANIFEST_PATH)) {
    console.error('❌ manifest.json not found at:', MANIFEST_PATH);
    process.exit(1);
  }
  
  // Load manifest
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
  const resources = manifest.resources || [];
  
  console.log(`📋 Manifest declares ${resources.length} resources\n`);
  
  // Collect manifest paths
  const manifestPaths = new Set();
  const missingFiles = [];
  
  for (const resource of resources) {
    const { uri, path, title } = resource;
    manifestPaths.add(path);
    
    const fullPath = join(CONTENT_DIR, path);
    
    if (!existsSync(fullPath)) {
      missingFiles.push({ uri, path, title });
    }
  }
  
  // Report missing files
  if (missingFiles.length > 0) {
    hasErrors = true;
    console.error('❌ MISSING FILES (in manifest but not on disk):\n');
    for (const { uri, path, title } of missingFiles) {
      console.error(`   • ${title}`);
      console.error(`     path: ${path}`);
      console.error(`     uri:  ${uri}\n`);
    }
  } else {
    console.log('✅ All manifest resources exist on disk\n');
  }
  
  // Check for orphan files (on disk but not in manifest)
  const actualFiles = getAllFiles(CONTENT_DIR);
  const orphanFiles = actualFiles.filter(f => !manifestPaths.has(f));
  
  if (orphanFiles.length > 0) {
    // Orphans are warnings, not errors (for now)
    console.warn('⚠️  ORPHAN FILES (on disk but not in manifest):\n');
    for (const path of orphanFiles) {
      console.warn(`   • ${path}`);
    }
    console.warn('\n   These files exist but won\'t appear in the UI.');
    console.warn('   To include a file, add YAML frontmatter (uri/title/audience/...).');
    console.warn('   To exclude it intentionally, leave it without frontmatter.\n');
  } else {
    console.log('✅ No orphan files detected\n');
  }
  
  // Summary
  if (hasErrors) {
    console.error('❌ Verification FAILED\n');
    process.exit(1);
  } else {
    console.log('✅ Content verification PASSED\n');
    process.exit(0);
  }
}

verify();
