// Playwright configuration for Fluent Mobile PoC v0.2
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: '*.spec.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'evidence/test-results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:8788',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'off',
  },
  projects: [
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npx wrangler pages dev src --port 8788',
    port: 8788,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
