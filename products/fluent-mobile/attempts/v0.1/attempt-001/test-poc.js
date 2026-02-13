/**
 * Fluent Mobile PoC - Validation Test
 * 
 * This test verifies the build actually works:
 * - Page loads without errors
 * - UI renders correctly
 * - Buttons are interactive
 * - Audio controls respond
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, 'evidence', 'screenshots');
const BASE_URL = 'http://localhost:8080';

async function runTests() {
  console.log('🧪 Starting Fluent Mobile PoC Validation\n');
  
  const results = {
    passed: [],
    failed: [],
    screenshots: [],
    consoleErrors: [],
    timestamp: new Date().toISOString()
  };

  // Ensure screenshots directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 14 Pro size
    userAgent: 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();

  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    results.consoleErrors.push(err.message);
  });

  try {
    // TEST 1: Page loads
    console.log('1️⃣  Testing page load...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    results.passed.push('Page loads successfully');
    console.log('   ✅ Page loaded\n');

    // TEST 2: Take initial screenshot
    console.log('2️⃣  Taking initial screenshot...');
    const screenshot1 = path.join(SCREENSHOTS_DIR, '01-initial-load.png');
    await page.screenshot({ path: screenshot1, fullPage: true });
    results.screenshots.push('01-initial-load.png');
    console.log('   ✅ Screenshot saved\n');

    // TEST 3: Check title
    console.log('3️⃣  Checking page title...');
    const title = await page.title();
    if (title === 'Fluent') {
      results.passed.push(`Title is correct: "${title}"`);
      console.log('   ✅ Title: "Fluent"\n');
    } else {
      results.failed.push(`Title incorrect: expected "Fluent", got "${title}"`);
      console.log(`   ❌ Title wrong: "${title}"\n`);
    }

    // TEST 4: Check main UI elements exist
    console.log('4️⃣  Checking UI elements...');
    const elements = {
      'Listen button': '#play-source',
      'Record button': '#record-btn',
      'Play Draft button': '#play-draft',
      'State indicator': '#state-indicator',
      'Status text': '#status'
    };

    for (const [name, selector] of Object.entries(elements)) {
      const el = await page.$(selector);
      if (el) {
        results.passed.push(`${name} exists`);
        console.log(`   ✅ ${name} found`);
      } else {
        results.failed.push(`${name} missing (${selector})`);
        console.log(`   ❌ ${name} NOT FOUND`);
      }
    }
    console.log('');

    // TEST 5: Check initial state
    console.log('5️⃣  Checking initial state...');
    const stateText = await page.$eval('#state-text', el => el.textContent);
    if (stateText === 'Ready to listen') {
      results.passed.push('Initial state correct: "Ready to listen"');
      console.log('   ✅ State: "Ready to listen"\n');
    } else {
      results.failed.push(`Initial state wrong: "${stateText}"`);
      console.log(`   ❌ State wrong: "${stateText}"\n`);
    }

    // TEST 6: Click Listen button
    console.log('6️⃣  Testing Listen button...');
    await page.click('#play-source');
    await page.waitForTimeout(500);
    
    const stateAfterListen = await page.$eval('#state-text', el => el.textContent);
    const screenshot2 = path.join(SCREENSHOTS_DIR, '02-listening.png');
    await page.screenshot({ path: screenshot2, fullPage: true });
    results.screenshots.push('02-listening.png');
    
    if (stateAfterListen.includes('Listening')) {
      results.passed.push('Listen button changes state to listening');
      console.log('   ✅ State changed to listening');
    } else {
      results.failed.push(`Listen didn't change state: "${stateAfterListen}"`);
      console.log(`   ❌ State didn't change: "${stateAfterListen}"`);
    }
    console.log('   📸 Screenshot saved\n');

    // Wait for audio to finish
    await page.waitForTimeout(3500);

    // TEST 7: Check state returns to idle
    console.log('7️⃣  Checking state returns to idle...');
    const stateAfterAudio = await page.$eval('#state-text', el => el.textContent);
    if (stateAfterAudio === 'Ready to listen') {
      results.passed.push('State returns to idle after audio');
      console.log('   ✅ State returned to idle\n');
    } else {
      results.failed.push(`State didn't return to idle: "${stateAfterAudio}"`);
      console.log(`   ❌ State stuck at: "${stateAfterAudio}"\n`);
    }

    // TEST 8: Check Play Draft is disabled
    console.log('8️⃣  Checking Play Draft button state...');
    const playDraftDisabled = await page.$eval('#play-draft', el => el.disabled);
    if (playDraftDisabled) {
      results.passed.push('Play Draft correctly disabled before recording');
      console.log('   ✅ Play Draft disabled (correct)\n');
    } else {
      results.failed.push('Play Draft should be disabled before recording');
      console.log('   ❌ Play Draft should be disabled\n');
    }

    // TEST 9: Check for console errors
    console.log('9️⃣  Checking for JavaScript errors...');
    if (results.consoleErrors.length === 0) {
      results.passed.push('No JavaScript console errors');
      console.log('   ✅ No console errors\n');
    } else {
      results.failed.push(`Console errors: ${results.consoleErrors.join(', ')}`);
      console.log(`   ❌ Console errors found: ${results.consoleErrors.length}\n`);
      results.consoleErrors.forEach(err => console.log(`      - ${err}`));
    }

    // Final screenshot
    const screenshot3 = path.join(SCREENSHOTS_DIR, '03-final-state.png');
    await page.screenshot({ path: screenshot3, fullPage: true });
    results.screenshots.push('03-final-state.png');

  } catch (error) {
    results.failed.push(`Test error: ${error.message}`);
    console.log(`\n❌ Test error: ${error.message}\n`);
    
    // Screenshot on error
    const errorScreenshot = path.join(SCREENSHOTS_DIR, 'error.png');
    await page.screenshot({ path: errorScreenshot, fullPage: true });
    results.screenshots.push('error.png');
  }

  await browser.close();

  // Print summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`✅ Passed: ${results.passed.length}`);
  results.passed.forEach(p => console.log(`   • ${p}`));
  console.log('');
  
  if (results.failed.length > 0) {
    console.log(`❌ Failed: ${results.failed.length}`);
    results.failed.forEach(f => console.log(`   • ${f}`));
  } else {
    console.log('❌ Failed: 0');
  }
  console.log('');
  
  console.log(`📸 Screenshots: ${results.screenshots.length}`);
  results.screenshots.forEach(s => console.log(`   • evidence/screenshots/${s}`));
  console.log('');

  // Write results to file
  const resultsPath = path.join(__dirname, 'evidence', 'test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`📄 Results saved to: evidence/test-results.json\n`);

  // Exit with appropriate code
  const exitCode = results.failed.length > 0 ? 1 : 0;
  console.log(exitCode === 0 ? '🎉 ALL TESTS PASSED' : '⚠️  SOME TESTS FAILED');
  process.exit(exitCode);
}

runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
