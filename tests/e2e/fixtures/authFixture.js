/**
 * Playwright Auth Fixture
 * File: tests/e2e/fixtures/authFixture.js
 *
 * Root cause of auth failure:
 *   The Axios response interceptor in src/api/axios.js clears localStorage
 *   and redirects to /signin on ANY 401 response from the backend.
 *   A fake JWT token causes backend APIs to return 401, triggering the clear.
 *
 * Solution:
 *   1. Intercept ALL backend API calls with page.route() → return mock 200s
 *   2. Set localStorage AFTER seeding mocks (so interceptor never fires)
 *   3. This works reliably without needing a real backend
 */

import { test as base } from '@playwright/test';

export const FAKE_USER = {
  _id:        'e2e-test-user-001',
  name:       'E2E Test User',
  email:      'e2e@slttest.com',
  phone:      '9876543210',
  role:       'user',
  isVerified: true,
};

const API_BASE = 'http://localhost:5000/api';

/**
 * Register Playwright route interceptors for all backend API endpoints.
 * This prevents 401s from clearing localStorage and triggering the logout flow.
 */
async function mockApiRoutes(page) {
  // Intercept ALL API calls and return a generic 200 (no-op for non-critical ones)
  await page.route(`${API_BASE}/**`, async (route, request) => {
    const url = request.url();
    const method = request.method();

    // Auth endpoints — return user data
    if (url.includes('/auth/login') || url.includes('/auth/register')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'e2e-fake-token', user: FAKE_USER }),
      });
    }

    // Notifications — return empty (prevents 401 sidebar errors)
    if (url.includes('/notifications')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ notifications: [], unreadCount: 0 }),
      });
    }

    // Tours list
    if (url.includes('/tours') && method === 'GET') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ tours: [] }),
      });
    }

    // Cars list
    if (url.includes('/cars') && method === 'GET') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ cars: [] }),
      });
    }

    // Drivers list
    if (url.includes('/drivers') && method === 'GET') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ drivers: [] }),
      });
    }

    // Bookings POST — return a fake booking
    if (url.includes('/bookings') && method === 'POST') {
      return route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          booking: {
            _id: 'booking-e2e-001',
            type: 'car',
            status: 'pending',
            totalAmount: 5000,
          },
        }),
      });
    }

    // Default: return empty 200 for anything else
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    });
  });
}

export const test = base.extend({
  page: async ({ page }, use) => {
    // Step 1: Set up API route mocks BEFORE any navigation
    // This ensures the Axios 401 interceptor never fires, even with a fake token
    await mockApiRoutes(page);

    // Step 2: Navigate to base URL (triggers Vite app to load)
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

    // Step 3: Seed localStorage with fake auth tokens
    // Now that API calls are mocked (no 401s), these tokens will persist
    await page.evaluate((user) => {
      window.localStorage.setItem('slt_token', 'e2e-fake-token-bypass');
      window.localStorage.setItem('slt_user', JSON.stringify(user));
    }, FAKE_USER);

    // Step 4: Provide the authenticated page to each test
    await use(page);
  },
});

export { expect } from '@playwright/test';
