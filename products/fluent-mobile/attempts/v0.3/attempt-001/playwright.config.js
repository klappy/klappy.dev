// Fluent Mobile — Lane-Level Playwright Config
//
// This is the shared Playwright configuration for the fluent-mobile lane.
// Attempts should copy this to their folder and modify as needed.
//
// Pattern:
// 1. Attempt copies this file to their attempt folder
// 2. Attempt adds/modifies tests as needed
// 3. If config improvements are made, merge back to lane level
// 4. Next attempt starts from improved config

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.js',
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Reporter
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'evidence/test-results.json' }]
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for tests
    baseURL: 'http://localhost:8788',
    
    // Capture screenshot on failure
    screenshot: 'on',
    
    // Record trace on failure
    trace: 'on-first-retry',
    
    // Save screenshots to evidence folder
    video: 'retain-on-failure',
  },

  // Mobile-first testing
  projects: [
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        // Save test artifacts to test-results folder
        outputDir: 'test-results',
      },
    },
  ],

  // Local dev server
  webServer: {
    command: 'npx wrangler pages dev src --port 8788',
    url: 'http://localhost:8788',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
