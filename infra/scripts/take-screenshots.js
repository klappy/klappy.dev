import puppeteer from 'puppeteer';
import { join } from 'path';
import { readFileSync, existsSync, mkdirSync } from 'fs';

async function takeScreenshots() {
  const attemptJsonPath = join(process.cwd(), '.attempt.json');
  if (!existsSync(attemptJsonPath)) {
    console.error('No .attempt.json found');
    process.exit(1);
  }

  const attemptMeta = JSON.parse(readFileSync(attemptJsonPath, 'utf8'));
  const { lane, prd_version, run_id } = attemptMeta;
  const prd = prd_version.replace(/^v/, '');
  const screenshotsDir = join(process.cwd(), 'products', lane, 'attempts', `prd-v${prd}`, '_runs', run_id, 'screenshots');

  if (!existsSync(screenshotsDir)) {
    mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Taking Desktop screenshot...');
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: join(screenshotsDir, 'desktop-home.png') });

  console.log('Taking Mobile screenshot...');
  await page.setViewport({ width: 375, height: 667, isMobile: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: join(screenshotsDir, 'mobile-home.png') });

  console.log('Taking Nav screenshot...');
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  // Click on a nav item if possible, but for now just another desktop shot
  await page.screenshot({ path: join(screenshotsDir, 'desktop-nav.png') });

  await browser.close();
  console.log('Done!');
}

takeScreenshots().catch(console.error);
