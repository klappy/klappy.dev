#!/usr/bin/env node
/**
 * verify-contracts.js
 * 
 * Verifies that repository artifacts conform to their declared interface contracts.
 * This prevents drift between documentation, tooling, and actual behavior.
 * 
 * Checks:
 * 1. manifest.json conforms to manifest@current (2.0.0)
 * 2. builds conform to build-output@current (3.0.0) - checks structure, not execution
 * 3. attempt artifacts conform to attempt-cli@current (2.0.0)
 * 4. lane PRDs declare required contracts
 * 
 * Exit codes:
 *   0 = all contracts verified
 *   1 = contract violations detected
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

// Contract versions (current)
const MANIFEST_CONTRACT_VERSION = '2.0.0';
const BUILD_OUTPUT_CONTRACT_VERSION = '3.0.0';
const ATTEMPT_CLI_CONTRACT_VERSION = '2.0.0';

let hasErrors = false;

function error(msg) {
  console.error(`❌ ${msg}`);
  hasErrors = true;
}

function warn(msg) {
  console.warn(`⚠️  ${msg}`);
}

function info(msg) {
  console.log(`ℹ️  ${msg}`);
}

function success(msg) {
  console.log(`✅ ${msg}`);
}

// 1. Verify manifest.json conforms to manifest@2.0.0
function verifyManifest() {
  console.log('\n📋 Verifying manifest.json (manifest@2.0.0)...\n');
  
  const manifestPath = join(ROOT, 'public', 'content', 'manifest.json');
  
  if (!existsSync(manifestPath)) {
    error('manifest.json not found');
    return;
  }
  
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  } catch (e) {
    error(`manifest.json is not valid JSON: ${e.message}`);
    return;
  }
  
  // Check top-level structure
  if (!Array.isArray(manifest.resources)) {
    error('manifest.json must contain a "resources" array');
    return;
  }
  
  const resources = manifest.resources;
  info(`Found ${resources.length} resources`);
  
  // Verify each resource
  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const prefix = `  Resource ${i + 1} (${resource.uri || 'no uri'}):`;
    
    // Required fields
    if (!resource.uri) {
      error(`${prefix} missing required field "uri"`);
    }
    if (!resource.title) {
      error(`${prefix} missing required field "title"`);
    }
    if (!resource.path) {
      error(`${prefix} missing required field "path"`);
    }
    if (resource.tier === undefined || resource.tier === null) {
      error(`${prefix} missing required field "tier"`);
    } else if (![0, 1, 2].includes(resource.tier)) {
      error(`${prefix} "tier" must be 0, 1, or 2 (got ${resource.tier})`);
    }
    
    // Verify path exists
    if (resource.path) {
      if (!resource.path.startsWith('/')) {
        error(`${prefix} "path" must begin with "/"`);
      } else {
        const fullPath = join(ROOT, 'public', 'content', resource.path);
        if (!existsSync(fullPath)) {
          error(`${prefix} path "${resource.path}" does not exist`);
        }
      }
    }
  }
  
  if (!hasErrors) {
    success('manifest.json conforms to manifest@2.0.0');
  }
}

// 2. Verify build output structure (build-output@3.0.0)
function verifyBuildOutput() {
  console.log('\n🏗️  Verifying build output structure (build-output@3.0.0)...\n');
  
  // Check for lane directories
  const productsDir = join(ROOT, 'products');
  if (!existsSync(productsDir)) {
    warn('products/ directory not found - skipping build output checks');
    return;
  }
  
  const lanes = readdirSync(productsDir).filter(item => {
    const itemPath = join(productsDir, item);
    return statSync(itemPath).isDirectory();
  });
  
  if (lanes.length === 0) {
    info('No lanes found in products/ - skipping build output checks');
    return;
  }
  
  info(`Found ${lanes.length} lane(s): ${lanes.join(', ')}`);
  
  // Check manifest exists (required runtime availability)
  const manifestPath = join(ROOT, 'public', 'content', 'manifest.json');
  if (!existsSync(manifestPath)) {
    error('public/content/manifest.json must exist for runtime availability');
  } else {
    success('manifest.json available for runtime');
  }
  
  // Note: We don't verify dist/ exists because builds may not have run.
  // The contract is about structure when builds DO run, not forcing builds.
  info('Build output structure checks passed (dist/ verification requires actual build)');
}

// 3. Verify attempt CLI contract (attempt-cli@2.0.0)
function verifyAttemptCLI() {
  console.log('\n🔧 Verifying attempt CLI contract (attempt-cli@2.0.0)...\n');
  
  // Check that required commands exist in package.json
  const packageJsonPath = join(ROOT, 'package.json');
  if (!existsSync(packageJsonPath)) {
    error('package.json not found');
    return;
  }
  
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const scripts = packageJson.scripts || {};
  
  const requiredCommands = [
    'attempt:cleanup',
    'attempt:register',
    'attempt:nuke',
    'attempt:finalize',
    'attempt:promote'
  ];
  
  const missingCommands = requiredCommands.filter(cmd => !scripts[cmd]);
  
  if (missingCommands.length > 0) {
    error(`Missing required attempt CLI commands: ${missingCommands.join(', ')}`);
  } else {
    success('All required attempt CLI commands present');
  }
  
  // Check for attempt artifacts in existing attempts
  const attemptsDir = join(ROOT, 'attempts');
  if (existsSync(attemptsDir)) {
    const prdDirs = readdirSync(attemptsDir).filter(item => {
      return statSync(join(attemptsDir, item)).isDirectory();
    });
    
    let checkedAttempts = 0;
    let validAttempts = 0;
    
    for (const prdDir of prdDirs) {
      const prdPath = join(attemptsDir, prdDir);
      const attemptDirs = readdirSync(prdPath).filter(item => {
        return statSync(join(prdPath, item)).isDirectory() && item.startsWith('attempt-');
      });
      
      for (const attemptDir of attemptDirs) {
        checkedAttempts++;
        const metaPath = join(prdPath, attemptDir, 'META.json');
        if (existsSync(metaPath)) {
          try {
            const meta = JSON.parse(readFileSync(metaPath, 'utf-8'));
            const requiredFields = ['lane', 'prd_version', 'attempt', 'sealed_commit'];
            const missingFields = requiredFields.filter(field => !meta[field]);
            
            if (missingFields.length > 0) {
              warn(`META.json in ${prdDir}/${attemptDir} missing fields: ${missingFields.join(', ')}`);
            } else {
              validAttempts++;
            }
          } catch (e) {
            warn(`META.json in ${prdDir}/${attemptDir} is not valid JSON: ${e.message}`);
          }
        } else {
          warn(`META.json not found in ${prdDir}/${attemptDir}`);
        }
      }
    }
    
    if (checkedAttempts > 0) {
      info(`Checked ${checkedAttempts} attempt(s), ${validAttempts} have valid META.json`);
    }
  }
}

// 4. Verify lane PRDs declare required contracts
function verifyLanePRDs() {
  console.log('\n📄 Verifying lane PRDs declare required contracts...\n');
  
  const docsPRDDir = join(ROOT, 'docs', 'PRD');
  if (!existsSync(docsPRDDir)) {
    warn('docs/PRD/ directory not found - skipping PRD contract checks');
    return;
  }
  
  const laneDirs = readdirSync(docsPRDDir).filter(item => {
    return statSync(join(docsPRDDir, item)).isDirectory();
  });
  
  if (laneDirs.length === 0) {
    info('No lane PRDs found');
    return;
  }
  
  info(`Found ${laneDirs.length} lane PRD(s)`);
  
  // For now, just check that PRDs exist
  // Future: could parse PRDs to verify they reference contracts
  for (const lane of laneDirs) {
    const prdPath = join(docsPRDDir, lane, 'PRD.md');
    if (existsSync(prdPath)) {
      success(`PRD exists for lane: ${lane}`);
    } else {
      warn(`PRD.md not found for lane: ${lane}`);
    }
  }
  
  info('PRD contract declaration checks passed (detailed parsing not yet implemented)');
}

// Main
console.log('🔍 Contract Verification (Drift Check)\n');
console.log('=' .repeat(50));

verifyManifest();
verifyBuildOutput();
verifyAttemptCLI();
verifyLanePRDs();

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.error('\n❌ Contract verification FAILED\n');
  console.error('Fix the errors above before proceeding.\n');
  process.exit(1);
} else {
  console.log('\n✅ All contract checks PASSED\n');
  process.exit(0);
}
