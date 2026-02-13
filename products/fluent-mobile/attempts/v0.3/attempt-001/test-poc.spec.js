/**
 * Fluent Mobile v0.3 — Playwright Tests
 * 
 * Testing:
 * - H3 (Workflow Usability): Single-section UI
 * - H4 (Task Clarity): Play/pause, waveform modes
 */

const { test, expect } = require('@playwright/test');

test.describe('Fluent Mobile PoC v0.3', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for app initialization
    await page.waitForSelector('#app');
  });

  // === Basic Rendering ===

  test('page loads without JS errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    
    await page.reload();
    await page.waitForTimeout(1000);
    
    expect(errors).toHaveLength(0);
  });

  test('renders home screen by default', async ({ page }) => {
    const homeScreen = page.locator('#home-screen');
    await expect(homeScreen).toHaveClass(/active/);
    
    const draftingScreen = page.locator('#drafting-screen');
    await expect(draftingScreen).not.toHaveClass(/active/);
  });

  // === Navigation ===

  test('navigates to drafting screen when Start Drafting clicked', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const draftingScreen = page.locator('#drafting-screen');
    await expect(draftingScreen).toHaveClass(/active/);
    
    const homeScreen = page.locator('#home-screen');
    await expect(homeScreen).not.toHaveClass(/active/);
  });

  test('navigates back to home when Back button clicked', async ({ page }) => {
    await page.click('#start-drafting-btn');
    await page.click('#back-btn');
    
    const homeScreen = page.locator('#home-screen');
    await expect(homeScreen).toHaveClass(/active/);
  });

  // === Home Screen Content ===

  test('shows online status indicator', async ({ page }) => {
    const status = page.locator('#online-status');
    await expect(status).toBeVisible();
    await expect(status).toHaveText(/Online|Offline/);
  });

  test('shows assignment card with correct content', async ({ page }) => {
    const projectName = page.locator('.project-name');
    await expect(projectName).toHaveText('Genesis Translation');
    
    const verseRef = page.locator('.assignment-card .verse-ref');
    await expect(verseRef).toHaveText('Genesis 1:1');
  });

  // === Drafting Screen - Single Section UI (v0.3 key change) ===

  test('drafting screen has single draft section (not dual)', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    // Should have ONE draft section with both record and play
    const draftSection = page.locator('.draft-section');
    await expect(draftSection).toHaveCount(1);
    
    // Should NOT have separate "review" section (v0.2 had this)
    const reviewSection = page.locator('.review-section');
    await expect(reviewSection).toHaveCount(0);
  });

  test('single draft section contains record AND play buttons', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const draftSection = page.locator('.draft-section');
    
    // Record button in draft section
    const recordBtn = draftSection.locator('#record-btn');
    await expect(recordBtn).toBeVisible();
    
    // Play button in same draft section
    const playBtn = draftSection.locator('#play-btn');
    await expect(playBtn).toBeVisible();
  });

  // === Waveform Visualization ===

  test('drafting screen shows TWO waveform canvases (source + draft)', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const sourceWaveform = page.locator('#source-waveform');
    await expect(sourceWaveform).toBeVisible();
    
    const draftWaveform = page.locator('#draft-waveform');
    await expect(draftWaveform).toBeVisible();
  });

  test('waveforms are canvas elements', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const sourceCanvas = page.locator('#source-waveform');
    await expect(sourceCanvas).toHaveAttribute('class', /waveform/);
    
    const tagName = await sourceCanvas.evaluate(el => el.tagName);
    expect(tagName.toLowerCase()).toBe('canvas');
  });

  // === Audio Controls ===

  test('has Listen button that is enabled', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const listenBtn = page.locator('#listen-btn');
    await expect(listenBtn).toBeVisible();
    await expect(listenBtn).toBeEnabled();
  });

  test('has Record button that is enabled', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const recordBtn = page.locator('#record-btn');
    await expect(recordBtn).toBeVisible();
    await expect(recordBtn).toBeEnabled();
  });

  test('has Play button that is disabled initially', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const playBtn = page.locator('#play-btn');
    await expect(playBtn).toBeVisible();
    await expect(playBtn).toBeDisabled();
  });

  test('has Pause button (hidden initially)', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const pauseBtn = page.locator('#pause-btn');
    // Pause button exists but is hidden until playback starts
    await expect(pauseBtn).toBeAttached();
    await expect(pauseBtn).toHaveCSS('display', 'none');
  });

  // === State Indicator ===

  test('shows initial state indicator', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const stateIndicator = page.locator('#state-indicator');
    await expect(stateIndicator).toBeVisible();
    await expect(stateIndicator).toHaveText('Ready');
  });

  test('shows draft status message', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const draftStatus = page.locator('#draft-status');
    await expect(draftStatus).toBeVisible();
    await expect(draftStatus).toHaveText('No recording yet');
  });

  // === Header ===

  test('drafting screen shows verse reference in header', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const headerVerseRef = page.locator('#drafting-screen .header .verse-ref');
    await expect(headerVerseRef).toHaveText('Genesis 1:1');
  });

  // === Accessibility ===

  test('all buttons have accessible names', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const buttons = ['#back-btn', '#listen-btn', '#record-btn', '#play-btn', '#pause-btn'];
    
    for (const selector of buttons) {
      const btn = page.locator(selector);
      const ariaLabel = await btn.getAttribute('aria-label');
      const textContent = await btn.textContent();
      
      // Should have either aria-label or text content
      expect(ariaLabel || textContent.trim()).toBeTruthy();
    }
  });

  // === Service Worker ===

  test('app registers service worker', async ({ page }) => {
    // Check if service worker is registered
    const swRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const registrations = await navigator.serviceWorker.getRegistrations();
      return registrations.length > 0;
    });
    
    // Service worker should register (may take a moment)
    await page.waitForTimeout(2000);
    
    const swRegisteredAfterWait = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const registrations = await navigator.serviceWorker.getRegistrations();
      return registrations.length > 0;
    });
    
    expect(swRegisteredAfterWait).toBe(true);
  });

  // === v0.3 Specific: Single Section Verification ===

  test('v0.3: only ONE audio section for draft (consolidated)', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    // Count sections with draft-related content
    // v0.2 had TWO: "Your Draft" for recording, "Review" for playback
    // v0.3 should have ONE: "Your Draft" for both
    
    const draftSections = page.locator('.audio-section:has(#draft-waveform)');
    await expect(draftSections).toHaveCount(1);
    
    // That single section should have the consolidated controls
    const section = draftSections.first();
    await expect(section.locator('#record-btn')).toBeVisible();
    await expect(section.locator('#play-btn')).toBeVisible();
  });

  test('v0.3: source and draft are visually separate sections', async ({ page }) => {
    await page.click('#start-drafting-btn');
    
    const sourceSection = page.locator('.source-section');
    const draftSection = page.locator('.draft-section');
    
    await expect(sourceSection).toHaveCount(1);
    await expect(draftSection).toHaveCount(1);
    
    // They should be siblings, not nested
    const sourceSectionClass = await sourceSection.getAttribute('class');
    const draftSectionClass = await draftSection.getAttribute('class');
    
    expect(sourceSectionClass).toContain('audio-section');
    expect(draftSectionClass).toContain('audio-section');
  });
});
