/**
 * Playwright tests for Fluent Mobile PoC v0.2
 * 
 * Tests verify:
 * - Two-screen navigation works
 * - Waveform canvases exist and are visible
 * - Buttons are accessible and functional
 * - State transitions are correct
 */

const { test, expect } = require('@playwright/test');

test.describe('Fluent Mobile PoC v0.2', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for app initialization
    await page.waitForSelector('#screen-home.active');
  });

  test.describe('Home Screen', () => {
    
    test('renders home screen by default', async ({ page }) => {
      await expect(page.locator('#screen-home')).toHaveClass(/active/);
      await expect(page.locator('#screen-drafting')).not.toHaveClass(/active/);
      
      // Take screenshot for evidence
      await page.screenshot({ 
        path: 'evidence/screenshots/01-home-screen.png',
        fullPage: true 
      });
    });

    test('displays assignment card with correct content', async ({ page }) => {
      await expect(page.locator('.assignment-title')).toHaveText('Genesis 1:1-5');
      await expect(page.locator('.assignment-language')).toHaveText('Swahili Draft');
      await expect(page.locator('.progress-text')).toHaveText('1 of 5 verses');
    });

    test('has Start Drafting button that is clickable', async ({ page }) => {
      const btn = page.locator('#btn-start-drafting');
      await expect(btn).toBeVisible();
      await expect(btn).toBeEnabled();
      await expect(btn).toContainText('Start Drafting');
    });

    test('shows online status indicator', async ({ page }) => {
      const status = page.locator('#home-status');
      await expect(status).toBeVisible();
      await expect(status.locator('.status-dot')).toHaveClass(/online/);
    });

  });

  test.describe('Navigation', () => {

    test('navigates to drafting screen when Start Drafting clicked', async ({ page }) => {
      await page.click('#btn-start-drafting');
      
      await expect(page.locator('#screen-home')).not.toHaveClass(/active/);
      await expect(page.locator('#screen-drafting')).toHaveClass(/active/);
      
      // Take screenshot for evidence
      await page.screenshot({ 
        path: 'evidence/screenshots/02-drafting-screen.png',
        fullPage: true 
      });
    });

    test('navigates back to home when Back button clicked', async ({ page }) => {
      // Go to drafting first
      await page.click('#btn-start-drafting');
      await expect(page.locator('#screen-drafting')).toHaveClass(/active/);
      
      // Click back
      await page.click('#btn-back');
      
      await expect(page.locator('#screen-home')).toHaveClass(/active/);
      await expect(page.locator('#screen-drafting')).not.toHaveClass(/active/);
    });

  });

  test.describe('Drafting Screen', () => {

    test.beforeEach(async ({ page }) => {
      await page.click('#btn-start-drafting');
      await page.waitForSelector('#screen-drafting.active');
    });

    test('displays all three audio sections', async ({ page }) => {
      await expect(page.locator('.source-section')).toBeVisible();
      await expect(page.locator('.record-section')).toBeVisible();
      await expect(page.locator('.playback-section')).toBeVisible();
    });

    test('displays all three waveform canvases', async ({ page }) => {
      await expect(page.locator('#waveform-source')).toBeVisible();
      await expect(page.locator('#waveform-record')).toBeVisible();
      await expect(page.locator('#waveform-playback')).toBeVisible();
      
      // Take screenshot showing waveforms in idle state
      await page.screenshot({ 
        path: 'evidence/screenshots/03-waveforms-idle.png',
        fullPage: true 
      });
    });

    test('has Listen button that is enabled', async ({ page }) => {
      const btn = page.locator('#btn-listen');
      await expect(btn).toBeVisible();
      await expect(btn).toBeEnabled();
      await expect(btn).toContainText('Listen');
    });

    test('has Record button that is enabled', async ({ page }) => {
      const btn = page.locator('#btn-record');
      await expect(btn).toBeVisible();
      await expect(btn).toBeEnabled();
      await expect(btn).toContainText('Record');
    });

    test('has Play Draft button that is disabled initially', async ({ page }) => {
      const btn = page.locator('#btn-play-draft');
      await expect(btn).toBeVisible();
      await expect(btn).toBeDisabled();
      await expect(btn).toContainText('Play Draft');
    });

    test('shows initial state indicator', async ({ page }) => {
      const state = page.locator('#drafting-state .state-text');
      await expect(state).toHaveText('Ready to listen');
    });

    test('shows verse reference in header', async ({ page }) => {
      await expect(page.locator('#screen-drafting h1')).toHaveText('Genesis 1:1');
    });

  });

  test.describe('Service Worker', () => {

    test('registers service worker', async ({ page }) => {
      // Check console for SW registration message
      const messages = [];
      page.on('console', msg => messages.push(msg.text()));
      
      await page.goto('/');
      await page.waitForTimeout(2000);
      
      const swRegistered = messages.some(m => m.includes('Service Worker registered'));
      expect(swRegistered).toBeTruthy();
    });

  });

  test.describe('Accessibility', () => {

    test('all buttons have accessible names', async ({ page }) => {
      await page.click('#btn-start-drafting');
      
      const buttons = await page.locator('button').all();
      for (const button of buttons) {
        const name = await button.getAttribute('aria-label') || await button.textContent();
        expect(name.trim().length).toBeGreaterThan(0);
      }
    });

    test('waveform canvases are present and visible', async ({ page }) => {
      await page.click('#btn-start-drafting');
      
      // Canvases should be visible (dimensions set dynamically by JS)
      const sourceCanvas = page.locator('#waveform-source');
      const recordCanvas = page.locator('#waveform-record');
      const playbackCanvas = page.locator('#waveform-playback');
      
      await expect(sourceCanvas).toBeVisible();
      await expect(recordCanvas).toBeVisible();
      await expect(playbackCanvas).toBeVisible();
      
      // Verify canvas elements exist in DOM
      await expect(sourceCanvas).toHaveCount(1);
      await expect(recordCanvas).toHaveCount(1);
      await expect(playbackCanvas).toHaveCount(1);
    });

  });

  test.describe('No JavaScript Errors', () => {

    test('page loads without JS errors', async ({ page }) => {
      const errors = [];
      page.on('pageerror', err => errors.push(err.message));
      
      await page.goto('/');
      await page.click('#btn-start-drafting');
      await page.click('#btn-back');
      
      expect(errors).toHaveLength(0);
    });

  });

});
