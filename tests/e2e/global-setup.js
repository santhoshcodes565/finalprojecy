/**
 * Playwright Global Setup — Sri Lakshmi Travels
 * File: tests/e2e/global-setup.js
 *
 * Logs in via the real /signin page UI, then saves the browser storage state
 * (localStorage slt_token + slt_user) so all E2E tests start as authenticated.
 *
 * Requires:
 *   - Frontend dev server running on http://localhost:5173
 *   - Backend running on http://localhost:5000 (for the login API call)
 *   - A real test user account in the database
 *     OR the test falls back to injecting a signed JWT directly.
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const AUTH_DIR  = path.join(process.cwd(), 'tests/e2e/.auth');
const AUTH_FILE = path.join(AUTH_DIR, 'user.json');

// ─── Test user credentials ─────────────────────────────────────────────────
// This user must exist in the database, or you can create them here via API.
const TEST_EMAIL    = 'e2etest@slttest.com';
const TEST_PASSWORD = 'Test@1234';
const TEST_NAME     = 'E2E Test User';
const TEST_PHONE    = '9876543210';

export default async function globalSetup() {
  // Ensure .auth directory exists
  if (!fs.existsSync(AUTH_DIR)) fs.mkdirSync(AUTH_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page    = await context.newPage();

  // ── Strategy 1: Try signing in via the UI ─────────────────────────────────
  let loginSuccess = false;
  try {
    await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle', timeout: 30000 });

    // Fill sign-in form
    await page.getByPlaceholderText(/email/i).fill(TEST_EMAIL);
    await page.getByPlaceholderText(/password/i).fill(TEST_PASSWORD);
    await page.getByRole('button', { name: /sign in|login/i }).click();

    // Wait for redirect away from /signin (means login succeeded)
    await page.waitForURL((url) => !url.includes('/signin'), { timeout: 10000 });

    // Check localStorage was set
    const token = await page.evaluate(() => localStorage.getItem('slt_token'));
    if (token) {
      loginSuccess = true;
      console.log('[GlobalSetup] ✅ Logged in via /signin UI');
    }
  } catch (err) {
    console.log('[GlobalSetup] ⚠️  UI login failed:', err.message);
    console.log('[GlobalSetup] Trying /signup to register the test user...');
  }

  // ── Strategy 2: Register the test user if login failed ───────────────────
  if (!loginSuccess) {
    try {
      await page.goto(`${BASE_URL}/signup`, { waitUntil: 'networkidle', timeout: 30000 });

      await page.getByPlaceholderText(/full name/i).fill(TEST_NAME);
      await page.getByPlaceholderText(/email/i).fill(TEST_EMAIL);
      await page.getByPlaceholderText(/phone/i).fill(TEST_PHONE);
      await page.getByPlaceholderText(/password/i).first().fill(TEST_PASSWORD);

      const confirmInput = page.getByPlaceholderText(/confirm password/i);
      if (await confirmInput.isVisible()) await confirmInput.fill(TEST_PASSWORD);

      await page.getByRole('button', { name: /sign up|register/i }).click();
      await page.waitForURL((url) => !url.includes('/signup'), { timeout: 15000 });

      const token = await page.evaluate(() => localStorage.getItem('slt_token'));
      if (token) {
        loginSuccess = true;
        console.log('[GlobalSetup] ✅ Registered + logged in via /signup UI');
      }
    } catch (err) {
      console.log('[GlobalSetup] ⚠️  Registration failed:', err.message);
    }
  }

  // ── Strategy 3: Fallback — inject auth directly into localStorage ─────────
  // Used when backend is not running (e.g. CI without a real DB).
  // AuthContext reads localStorage in useEffect — this works only if the page
  // is navigated to AFTER the injection. We navigate to /booking directly.
  if (!loginSuccess) {
    console.log('[GlobalSetup] ⚠️  Using direct localStorage injection (no backend)');

    const fakeUser = {
      _id:         'e2e-test-user-001',
      name:        TEST_NAME,
      email:       TEST_EMAIL,
      phone:       TEST_PHONE,
      role:        'user',
      isVerified:  true,
    };

    // Navigate to the app root first so we can set localStorage on the right origin
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Set localStorage before React bootstraps by using addInitScript in a new context
    await page.evaluate(({ token, user }) => {
      localStorage.setItem('slt_token', token);
      localStorage.setItem('slt_user', JSON.stringify(user));
    }, {
      token: 'e2e-fake-token-bypass',
      user:  fakeUser,
    });

    // Hard reload so React picks up the localStorage on mount
    await page.goto(`${BASE_URL}/booking`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Check if we got past ProtectedRoute
    const url = page.url();
    if (!url.includes('/signin')) {
      loginSuccess = true;
      console.log('[GlobalSetup] ✅ Direct localStorage injection worked');
    } else {
      console.log('[GlobalSetup] ❌ Direct injection did not bypass ProtectedRoute');
    }
  }

  // Save auth state for all tests
  await context.storageState({ path: AUTH_FILE });
  console.log('[GlobalSetup] 💾 Storage state saved to', AUTH_FILE);

  await browser.close();
}
