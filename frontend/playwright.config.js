/**
 * playwright.config.js — Sri Lakshmi Travels Frontend
 */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { outputFolder: 'playwright-report' }]],

  // NOTE: No storageState here — auth injection is handled per-test via
  // addInitScript in booking.spec.js beforeEach, which runs before page.goto().

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium',      use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
