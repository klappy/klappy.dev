#!/usr/bin/env node

/**
 * Book Export Script
 * 
 * Combines markdown documentation files into a single book-format export
 * for easy sharing/uploading. Focuses on guidance docs while excluding
 * implementation details (attempts, version folders, source code).
 */

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '../..');

// Directories to exclude
const EXCLUDE_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.vite',
]);

// Paths to exclude (these are copies/duplicates or ephemeral files)
const EXCLUDE_PATHS = new Set([
  'public/content', // These are copies of source files, exclude to avoid duplicates
  '.cursor/plans', // Ephemeral plan files, exclude
  'public/_compiled', // Derived compilation outputs (wipeable)
  'public/agent-skill', // Versioned skill outputs (derived)
]);

// Patterns to exclude lane implementations (keep guidance, exclude execution work)
// - attempts/ folders contain implementation work, not guidance
// - src/ folders contain code, not documentation
// - Version folders (v1.1, v1.2.3, etc.) in products are specific implementations
const EXCLUDE_LANE_PATTERNS = {
  // Any path containing /attempts/ anywhere
  attempts: /\/attempts\//,
  // Any path containing /src/ anywhere  
  src: /\/src\//,
  // Version folders in products: products/*/v followed by digits
  versionFolders: /^products\/[^/]+\/v\d+/,
};

// File extensions to include (markdown only for clean documentation export)
const INCLUDE_EXTENSIONS = new Set([
  '.md',
]);

// Files to exclude
const EXCLUDE_FILES = new Set([
  'package-lock.json',
  'node_modules',
  'klappy-dev-book-export.md', // Don't include the export file in itself
]);

/**
 * Check if a path should be excluded
 */
function shouldExclude(filePath) {
  // Normalize path (remove leading/trailing slashes for comparison)
  // Also handle Windows-style paths by converting backslashes
  const normalizedPath = filePath.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
  
  // Check for excluded directory names
  const parts = normalizedPath.split('/').filter(p => p.length > 0);
  for (const part of parts) {
    if (EXCLUDE_DIRS.has(part)) return true;
  }
  
  // Check for excluded paths (like public/content which are copies)
  // Check by matching path segments
  for (const excludePath of EXCLUDE_PATHS) {
    const normalizedExclude = excludePath.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
    const excludeParts = normalizedExclude.split('/').filter(p => p.length > 0);
    
    // Check if the path starts with the exclude path segments
    if (parts.length >= excludeParts.length) {
      let matches = true;
      for (let i = 0; i < excludeParts.length; i++) {
        if (parts[i] !== excludeParts[i]) {
          matches = false;
          break;
        }
      }
      if (matches) return true;
    }
  }
  
  // Check for lane implementation patterns (exclude attempts/, src/, version folders)
  const pathWithSlashes = '/' + normalizedPath + '/';
  for (const pattern of Object.values(EXCLUDE_LANE_PATTERNS)) {
    if (pattern.test(pathWithSlashes) || pattern.test(normalizedPath)) {
      return true;
    }
  }
  
  const fileName = parts[parts.length - 1];
  if (EXCLUDE_FILES.has(fileName)) return true;
  return false;
}

/**
 * Get file extension
 */
function getExtension(filePath) {
  return extname(filePath).toLowerCase();
}

/**
 * Check if file should be included
 */
function shouldInclude(filePath) {
  if (shouldExclude(filePath)) return false;
  const ext = getExtension(filePath);
  // Only include files with extensions in the allowed list (no extensionless files)
  return INCLUDE_EXTENSIONS.has(ext);
}

/**
 * Recursively collect files from a directory
 */
async function collectFiles(dirPath, relativePath = '') {
  const files = [];
  
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    
    // Sort: directories first, then files, both alphabetically
    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);
      const relPath = join(relativePath, entry.name);
      
      // Skip excluded paths (including directories that should be excluded)
      if (shouldExclude(relPath)) {
        continue;
      }
      
      if (entry.isDirectory()) {
        const subFiles = await collectFiles(fullPath, relPath);
        files.push(...subFiles);
      } else if (shouldInclude(relPath)) {
        files.push(relPath);
      }
    }
  } catch (err) {
    // Skip directories we can't read
    if (err.code !== 'ENOENT' && err.code !== 'EACCES') {
      console.error(`Warning: Could not read ${dirPath}: ${err.message}`);
    }
  }
  
  return files;
}

/**
 * Format a section header
 */
function formatSectionHeader(title, level = 1) {
  const prefix = '#'.repeat(level);
  const separator = '='.repeat(80);
  return `\n\n${separator}\n${prefix} ${title}\n${separator}\n\n`;
}

/**
 * Format a file header
 */
function formatFileHeader(filePath) {
  const separator = '-'.repeat(80);
  return `\n\n${separator}\n📄 File: ${filePath}\n${separator}\n\n`;
}

/**
 * Read and format file content
 */
async function readFileContent(filePath) {
  try {
    const fullPath = join(ROOT, filePath);
    const content = await readFile(fullPath, 'utf-8');
    
    // For JSON files, format them nicely
    if (filePath.endsWith('.json')) {
      try {
        const parsed = JSON.parse(content);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return content;
      }
    }
    
    return content;
  } catch (err) {
    return `[Error reading file: ${err.message}]`;
  }
}

/**
 * Get section title from path
 */
function getSectionTitle(path) {
  if (!path) return 'Root';
  const parts = path.split('/');
  const firstPart = parts[0];
  
  const titles = {
    'about': 'About',
    'docs': 'Documentation',
    'canon': 'Canon',
    'odd': 'ODD (Outcomes-Driven Development)',
    'projects': 'Projects',
    'attempts': 'Attempts',
    'interfaces': 'Interfaces & Contracts',
    'visual': 'Visual Design System',
    'infra': 'Infrastructure',
    'src': 'Source Code',
    'public': 'Public Content',
  };
  
  return titles[firstPart] || firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
}

/**
 * Group files by their top-level directory
 */
function groupFilesBySection(files) {
  const groups = new Map();
  
  for (const file of files) {
    const parts = file.split('/');
    const section = parts.length > 1 ? parts[0] : '';
    
    if (!groups.has(section)) {
      groups.set(section, []);
    }
    groups.get(section).push(file);
  }
  
  // Sort files within each section
  for (const [section, sectionFiles] of groups) {
    sectionFiles.sort();
  }
  
  return groups;
}

/**
 * Main export function
 */
async function exportBook() {
  console.log('📚 Collecting files for book export...\n');
  
  // Collect all files
  const allFiles = await collectFiles(ROOT);
  
  // Filter out any public/content files that slipped through (safety check)
  const filteredFiles = allFiles.filter(file => {
    const normalizedPath = file.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
    const parts = normalizedPath.split('/').filter(p => p.length > 0);
    const excludeParts = ['public', 'content'];
    if (parts.length >= excludeParts.length) {
      let matches = true;
      for (let i = 0; i < excludeParts.length; i++) {
        if (parts[i] !== excludeParts[i]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        return false;
      }
    }
    return true;
  });
  
  console.log(`Found ${allFiles.length} files, ${filteredFiles.length} after deduplication\n`);
  
  // Group by section
  const fileGroups = groupFilesBySection(filteredFiles);
  
  // Build the book content
  let bookContent = '';
  
  // Title page
  bookContent += formatSectionHeader('klappy.dev - Complete Book Export', 1);
  bookContent += `\nGenerated: ${new Date().toISOString()}\n`;
  bookContent += `Total Files: ${filteredFiles.length}\n`;
  bookContent += `\nThis is a documentation export of all markdown files from the klappy.dev\n`;
  bookContent += `repository. It includes lane guidance docs but excludes implementation\n`;
  bookContent += `details (attempts, version folders, source code).\n`;
  
  // Table of contents
  bookContent += formatSectionHeader('Table of Contents', 2);
  const sections = Array.from(fileGroups.keys()).sort();
  for (const section of sections) {
    const title = getSectionTitle(section);
    const fileCount = fileGroups.get(section).length;
    bookContent += `- **${title}** (${fileCount} files)\n`;
  }
  
  // Process sections in logical order
  // Note: 'public' section will only include unique files like index.html, not the content/ copies
  const sectionOrder = ['', 'about', 'docs', 'canon', 'odd', 'projects', 'attempts', 'interfaces', 'visual', 'infra', 'src', 'public'];
  const processedSections = new Set();
  
  // Process sections in order
  for (const section of sectionOrder) {
    if (!fileGroups.has(section) || processedSections.has(section)) continue;
    
    processedSections.add(section);
    const files = fileGroups.get(section);
    const title = getSectionTitle(section);
    
    bookContent += formatSectionHeader(title, 2);
    
    for (const file of files) {
      bookContent += formatFileHeader(file);
      const content = await readFileContent(file);
      bookContent += content;
      bookContent += '\n';
    }
  }
  
  // Include any remaining sections not in the ordered list
  for (const [section, files] of fileGroups) {
    if (processedSections.has(section)) continue;
    
    processedSections.add(section);
    const title = getSectionTitle(section);
    bookContent += formatSectionHeader(title, 2);
    
    for (const file of files) {
      bookContent += formatFileHeader(file);
      const content = await readFileContent(file);
      bookContent += content;
      bookContent += '\n';
    }
  }
  
  // Write output file
  const outputPath = join(ROOT, 'klappy-dev-book-export.md');
  await import('fs/promises').then(fs => fs.writeFile(outputPath, bookContent, 'utf-8'));
  
  console.log(`✅ Book export complete!\n`);
  console.log(`📄 Output: ${outputPath}`);
  console.log(`📊 Size: ${(bookContent.length / 1024 / 1024).toFixed(2)} MB\n`);
}

// Run it
exportBook().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
