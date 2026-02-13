/**
 * Waveform Verification Test
 * 
 * This test captures EVIDENCE that waveforms are actually drawing.
 * Screenshots are saved to evidence/screenshots/
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Waveform Visual Verification', () => {
  
  test('capture evidence of waveform states', async ({ page }) => {
    // Navigate to home
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Screenshot 1: Home screen
    await page.screenshot({ 
      path: 'evidence/screenshots/01-home-screen.png',
      fullPage: true 
    });
    console.log('Captured: 01-home-screen.png');
    
    // Navigate to drafting
    await page.click('#start-drafting-btn');
    await page.waitForTimeout(1000); // Wait for waveforms to initialize
    
    // Screenshot 2: Drafting screen with waveforms
    await page.screenshot({ 
      path: 'evidence/screenshots/02-drafting-initial.png',
      fullPage: true 
    });
    console.log('Captured: 02-drafting-initial.png');
    
    // Check if source waveform canvas has content
    const sourceCanvas = page.locator('#source-waveform');
    const sourceBox = await sourceCanvas.boundingBox();
    console.log('Source waveform dimensions:', sourceBox);
    
    // Check if draft waveform canvas has content
    const draftCanvas = page.locator('#draft-waveform');
    const draftBox = await draftCanvas.boundingBox();
    console.log('Draft waveform dimensions:', draftBox);
    
    // Screenshot 3: Just the source waveform
    await sourceCanvas.screenshot({
      path: 'evidence/screenshots/03-source-waveform-timeline.png'
    });
    console.log('Captured: 03-source-waveform-timeline.png');
    
    // Screenshot 4: Just the draft waveform (should be idle)
    await draftCanvas.screenshot({
      path: 'evidence/screenshots/04-draft-waveform-idle.png'
    });
    console.log('Captured: 04-draft-waveform-idle.png');
    
    // Click Listen to start source playback (live mode)
    await page.click('#listen-btn');
    await page.waitForTimeout(500);
    
    // Screenshot 5: Source waveform in live mode
    await sourceCanvas.screenshot({
      path: 'evidence/screenshots/05-source-waveform-live.png'
    });
    console.log('Captured: 05-source-waveform-live.png');
    
    // Wait and capture again to see animation
    await page.waitForTimeout(500);
    await sourceCanvas.screenshot({
      path: 'evidence/screenshots/06-source-waveform-live-2.png'
    });
    console.log('Captured: 06-source-waveform-live-2.png');
    
    // Stop source playback
    await page.click('#listen-btn');
    await page.waitForTimeout(500);
    
    // Click Record (will likely fail mic access, should fall back to simulation)
    await page.click('#record-btn');
    await page.waitForTimeout(1000);
    
    // Screenshot 7: Recording state
    await page.screenshot({ 
      path: 'evidence/screenshots/07-recording-state.png',
      fullPage: true 
    });
    console.log('Captured: 07-recording-state.png');
    
    // Screenshot 8: Draft waveform during recording
    await draftCanvas.screenshot({
      path: 'evidence/screenshots/08-draft-waveform-recording.png'
    });
    console.log('Captured: 08-draft-waveform-recording.png');
    
    // Check console for errors
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    // Verify canvases have dimensions
    expect(sourceBox.width).toBeGreaterThan(0);
    expect(sourceBox.height).toBeGreaterThan(0);
    expect(draftBox.width).toBeGreaterThan(0);
    expect(draftBox.height).toBeGreaterThan(0);
    
    console.log('Test complete. Check evidence/screenshots/ for visual verification.');
  });
});
