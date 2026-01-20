#!/usr/bin/env node
/**
 * capture-evidence.js
 * 
 * Captures screenshots for attempt evidence using Puppeteer.
 * 
 * Usage:
 *   node infra/scripts/capture-evidence.js <output-dir> [url]
 */

import puppeteer from 'puppeteer';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const args = process.argv.slice(2);
const outputDir = args[0] || 'evidence';
const baseUrl = args[1] || 'http://localhost:3333';

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

async function captureScreenshots() {
  console.log('📸 Capturing evidence screenshots...\n');
  console.log(`  Output: ${outputDir}`);
  console.log(`  URL: ${baseUrl}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Desktop screenshots
    console.log('Desktop screenshots (1280x800)...');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1280, height: 800 });

    // 1. Home page
    console.log('  - Home page...');
    await desktopPage.goto(baseUrl, { waitUntil: 'networkidle0' });
    await desktopPage.screenshot({
      path: join(outputDir, '01-desktop-home.png'),
      fullPage: false
    });

    // 2. ODD Public page (tier 0)
    console.log('  - ODD Public page...');
    await desktopPage.goto(`${baseUrl}?r=${encodeURIComponent('klappy://public/odd')}`, { 
      waitUntil: 'networkidle0' 
    });
    await desktopPage.screenshot({
      path: join(outputDir, '02-desktop-odd-public.png'),
      fullPage: false
    });

    // 3. Nav expanded (click Core Canon)
    console.log('  - Navigation expanded...');
    await desktopPage.goto(baseUrl, { waitUntil: 'networkidle0' });
    // Click "Core Canon" to expand
    const coreCanonBtn = await desktopPage.$('button.nav-section-toggle');
    if (coreCanonBtn) {
      await coreCanonBtn.click();
      await new Promise(r => setTimeout(r, 300)); // Wait for animation
    }
    await desktopPage.screenshot({
      path: join(outputDir, '03-desktop-nav-expanded.png'),
      fullPage: false
    });

    // Mobile screenshots
    console.log('\nMobile screenshots (375x812, iPhone-like)...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 375, height: 812, isMobile: true });

    // 4. Mobile home
    console.log('  - Mobile home page...');
    await mobilePage.goto(baseUrl, { waitUntil: 'networkidle0' });
    await mobilePage.screenshot({
      path: join(outputDir, '04-mobile-home.png'),
      fullPage: false
    });

    // 5. Mobile with nav open
    console.log('  - Mobile nav open...');
    const navToggle = await mobilePage.$('.nav-toggle');
    if (navToggle) {
      await navToggle.click();
      await new Promise(r => setTimeout(r, 300));
    }
    await mobilePage.screenshot({
      path: join(outputDir, '05-mobile-nav-open.png'),
      fullPage: false
    });

    // 6. Mobile content page
    console.log('  - Mobile content page...');
    await mobilePage.goto(`${baseUrl}?r=${encodeURIComponent('klappy://public/odd')}`, {
      waitUntil: 'networkidle0'
    });
    await mobilePage.screenshot({
      path: join(outputDir, '06-mobile-content.png'),
      fullPage: false
    });

    console.log('\n✅ Screenshots captured successfully!\n');
    console.log('Files:');
    console.log('  - 01-desktop-home.png');
    console.log('  - 02-desktop-odd-public.png');
    console.log('  - 03-desktop-nav-expanded.png');
    console.log('  - 04-mobile-home.png');
    console.log('  - 05-mobile-nav-open.png');
    console.log('  - 06-mobile-content.png');

  } finally {
    await browser.close();
  }
}

captureScreenshots().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
