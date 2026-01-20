import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOTS_DIR = 'attempts/website/prd-v1.1/_runs/15d6857c/screenshots';

async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Wait for dev server
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 });
  } catch (e) {
    console.error('Failed to connect to dev server. Make sure it is running on port 5173.');
    await browser.close();
    process.exit(1);
  }

  mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Screenshot 1: Home desktop
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await delay(1000);
  await page.screenshot({ path: join(SCREENSHOTS_DIR, '01-home-desktop.png'), fullPage: true });

  // Navigate to a content page - click first tier 0 resource
  const contentButtons = await page.$$('button');
  let clicked = false;
  for (const btn of contentButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.length > 5 && !text.includes('☰') && !text.includes('▶') && !text.includes('▼') && text !== 'Home') {
      await btn.click();
      await delay(2000);
      await page.setViewport({ width: 1920, height: 1080 });
      await page.screenshot({ path: join(SCREENSHOTS_DIR, '02-content-page-desktop.png'), fullPage: true });
      clicked = true;
      break;
    }
  }
  
  if (!clicked) {
    // Fallback: navigate via URL
    await page.goto('http://localhost:5173/?r=klappy://public/odd', { waitUntil: 'networkidle0' });
    await delay(2000);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.screenshot({ path: join(SCREENSHOTS_DIR, '02-content-page-desktop.png'), fullPage: true });
  }

  // Screenshot 3: Home mobile
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await delay(1000);
  await page.screenshot({ path: join(SCREENSHOTS_DIR, '03-home-mobile.png'), fullPage: true });

  await browser.close();
  console.log(`✅ Screenshots saved to ${SCREENSHOTS_DIR}`);
}

takeScreenshots().catch(console.error);
