#!/usr/bin/env node
/**
 * promote-attempt.js
 * 
 * Promotes a winning attempt to production.
 * 
 * Usage:
 *   npm run attempt:promote -- --prd v0.2 --attempt 003
 * 
 * What it does:
 *   1. Verifies attempt folder exists + META.json has preview URL
 *   2. Creates tag prd-vX.Y-attempt-NNN at the attempt branch HEAD
 *   3. Merges attempt branch into main
 *   4. Tags production-vX.Y on main
 *   5. Prints the production URL and commit SHA for META.json
 * 
 * Prerequisites:
 *   - Attempt branch: attempt/prd-vX.Y/aNNN
 *   - Attempt folder: attempts/prd-vX.Y/attempt-NNN/
 *   - META.json must exist with deploy.preview_url
 *   - Working directory must be clean
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

// Parse arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result = { prd: null, attempt: null, dryRun: false };
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--prd' && args[i + 1]) {
      result.prd = args[i + 1].replace(/^v/, ''); // normalize: v0.2 → 0.2
      i++;
    } else if (args[i] === '--attempt' && args[i + 1]) {
      result.attempt = args[i + 1].padStart(3, '0'); // normalize: 3 → 003
      i++;
    } else if (args[i] === '--dry-run') {
      result.dryRun = true;
    }
  }
  
  return result;
}

function run(cmd, options = {}) {
  const { dryRun, silent } = options;
  if (dryRun) {
    console.log(`  [DRY RUN] ${cmd}`);
    return '';
  }
  if (!silent) {
    console.log(`  $ ${cmd}`);
  }
  return execSync(cmd, { cwd: ROOT, encoding: 'utf8' }).trim();
}

function fail(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function promote() {
  const { prd, attempt, dryRun } = parseArgs();
  
  if (!prd || !attempt) {
    console.log(`
Usage: npm run attempt:promote -- --prd <version> --attempt <number> [--dry-run]

Examples:
  npm run attempt:promote -- --prd v0.2 --attempt 003
  npm run attempt:promote -- --prd 0.2 --attempt 3 --dry-run
`);
    process.exit(1);
  }
  
  console.log(`\n🏆 Promoting PRD v${prd} / Attempt ${attempt} to Champion\n`);
  if (dryRun) {
    console.log('  [DRY RUN MODE - no changes will be made]\n');
  }
  
  // Paths
  const attemptFolder = join(ROOT, 'attempts', `prd-v${prd}`, `attempt-${attempt}`);
  const metaPath = join(attemptFolder, 'META.json');
  const attemptMdPath = join(attemptFolder, 'ATTEMPT.md');
  const attemptBranch = `attempt/prd-v${prd}/a${attempt}`;
  const attemptTag = `prd-v${prd}-attempt-${attempt}`;
  const productionTag = `production-v${prd}`;
  
  // Step 1: Verify attempt folder exists
  console.log('1️⃣  Verifying attempt folder...');
  if (!existsSync(attemptFolder)) {
    fail(`Attempt folder not found: ${attemptFolder}`);
  }
  if (!existsSync(metaPath)) {
    fail(`META.json not found: ${metaPath}`);
  }
  console.log(`  ✅ Found: attempts/prd-v${prd}/attempt-${attempt}/\n`);
  
  // Step 2: Verify META.json has preview URL
  console.log('2️⃣  Verifying META.json has preview URL...');
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  const previewUrl = meta.deploy?.preview_url || meta.preview_url;
  if (!previewUrl) {
    fail('META.json missing deploy.preview_url - attempt must have a verified preview deploy');
  }
  console.log(`  ✅ Preview URL: ${previewUrl}\n`);
  
  // Step 3: Verify working directory is clean
  console.log('3️⃣  Verifying working directory is clean...');
  const status = run('git status --porcelain', { silent: true, dryRun: false });
  if (status) {
    fail('Working directory is not clean. Commit or stash changes first.\n' + status);
  }
  console.log('  ✅ Working directory clean\n');
  
  // Step 4: Verify attempt branch exists
  console.log('4️⃣  Verifying attempt branch exists...');
  try {
    run(`git rev-parse --verify ${attemptBranch}`, { silent: true, dryRun: false });
    console.log(`  ✅ Branch exists: ${attemptBranch}\n`);
  } catch {
    fail(`Attempt branch not found: ${attemptBranch}`);
  }
  
  // Step 5: Get attempt branch HEAD SHA
  console.log('5️⃣  Getting attempt branch HEAD...');
  const attemptSha = run(`git rev-parse ${attemptBranch}`, { silent: true, dryRun: false });
  console.log(`  ✅ Attempt SHA: ${attemptSha}\n`);
  
  // Step 6: Create attempt tag
  console.log('6️⃣  Creating attempt tag...');
  run(`git tag -a ${attemptTag} ${attemptBranch} -m "Champion: PRD v${prd} Attempt ${attempt}"`, { dryRun });
  console.log(`  ✅ Tagged: ${attemptTag}\n`);
  
  // Step 7: Checkout main and merge
  console.log('7️⃣  Merging to main...');
  run('git checkout main', { dryRun });
  run('git pull origin main', { dryRun });
  run(`git merge ${attemptBranch} --no-ff -m "Promote ${attemptTag} to production"`, { dryRun });
  console.log('  ✅ Merged to main\n');
  
  // Step 8: Get merge commit SHA
  console.log('8️⃣  Getting production commit SHA...');
  const productionSha = dryRun ? '<merge-commit-sha>' : run('git rev-parse HEAD', { silent: true });
  console.log(`  ✅ Production SHA: ${productionSha}\n`);
  
  // Step 9: Create production tag
  console.log('9️⃣  Creating production tag...');
  run(`git tag -a ${productionTag} -m "Production: PRD v${prd}"`, { dryRun });
  console.log(`  ✅ Tagged: ${productionTag}\n`);
  
  // Step 10: Update META.json with promotion info
  console.log('🔟 Updating META.json with promotion info...');
  if (!dryRun) {
    meta.status = 'CHAMPION';
    meta.promoted_commit = productionSha;
    meta.production_tag = productionTag;
    meta.attempt_tag = attemptTag;
    writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
    run('git add ' + metaPath);
    run(`git commit -m "chore: seal attempt-${attempt} as CHAMPION for PRD v${prd}"`);
  }
  console.log('  ✅ META.json updated\n');
  
  // Summary
  console.log('═'.repeat(60));
  console.log('\n🎉 PROMOTION COMPLETE\n');
  console.log(`  Attempt Tag:     ${attemptTag}`);
  console.log(`  Production Tag:  ${productionTag}`);
  console.log(`  Attempt SHA:     ${attemptSha}`);
  console.log(`  Production SHA:  ${productionSha}`);
  console.log(`  Preview URL:     ${previewUrl}`);
  console.log(`  Production URL:  https://klappy.dev`);
  console.log('\n' + '═'.repeat(60));
  
  console.log(`
📋 Add this to ATTEMPT.md:

Status: CHAMPION (Promoted to Production)
Promoted commit: ${productionSha}
Attempt tag: ${attemptTag}
Production tag: ${productionTag}
Production URL: https://klappy.dev
Preview URL: ${previewUrl}
Why this one won (tie-breaker): <one sentence>
`);

  if (!dryRun) {
    console.log('\n🚀 Run "git push origin main --tags" to deploy!\n');
  }
}

promote();
