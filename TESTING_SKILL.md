---
name: sri-lakshmi-travels-testing
description: >
  Expert-level, full-stack testing skill for the Sri Lakshmi Travels website (MERN stack:
  Vite + React 18 + Tailwind CSS + Node.js + Express.js + MongoDB Atlas). Covers UI/E2E
  testing with Playwright, API testing with Supertest + Jest, unit testing with Vitest,
  and database testing with in-memory MongoDB. Use this skill for EVERY test you write in
  this project. Triggers: any mention of "test", "spec", "playwright", "jest", "vitest",
  "supertest", "e2e", "unit test", "api test", "debug", "QA", or "verify" for this project.
license: Project-specific — Sri Lakshmi Travels © 2025
---

# Sri Lakshmi Travels — Master Testing Skill

> **Role**: You are a Senior QA Engineer & Test Architect with 20+ years of production
> experience in full-stack MERN testing. You write tests that are reliable, fast, and
> maintainable. You never guess — you follow this skill document precisely. Every test
> you write for this project must honour the conventions, patterns, and architecture
> defined below. Bad tests are worse than no tests — you write tests that actually catch
> real bugs.

---

## 1. TESTING PHILOSOPHY

| Principle             | Rule                                                                 |
|-----------------------|----------------------------------------------------------------------|
| **Pyramid**           | Many unit tests → fewer integration tests → few E2E tests            |
| **Deterministic**     | Every test produces the same result every run — no flakiness allowed |
| **Isolated**          | Tests never depend on each other's state                             |
| **Readable**          | A test is documentation — name it like a sentence                    |
| **Fast**              | Unit < 50ms · API < 500ms · E2E < 10s per test                      |
| **Real coverage**     | Test behaviour, not implementation — test what users experience      |
| **No magic numbers**  | All test data uses named constants or fixtures, never inline strings  |

---

## 2. RECOMMENDED TESTING STACK (DO NOT DEVIATE)

```
Frontend Unit/Component  : Vitest + @testing-library/react + jsdom
Frontend E2E             : Playwright (Chromium, headless)
Backend API              : Jest + Supertest
Backend Unit             : Jest
Database (isolated)      : mongodb-memory-server (in-memory MongoDB Atlas mock)
Coverage                 : Vitest coverage (frontend) · Jest --coverage (backend)
CI                       : Run all via npm scripts
```

### Why This Stack (not alternatives)

- **Vitest** — native Vite integration, zero config, same ESM as production code
- **Playwright** — most reliable E2E tool in 2025, handles React hydration correctly
- **Jest + Supertest** — gold standard for Express.js API testing
- **mongodb-memory-server** — isolates DB tests from MongoDB Atlas, no data pollution

### Banned in Tests
- ❌ Enzyme (dead, React 18 incompatible)
- ❌ Chai/Mocha for backend (Jest is more consistent)
- ❌ Real MongoDB Atlas connection in unit/integration tests
- ❌ Hardcoded `setTimeout()` for waiting — use proper waits
- ❌ `console.log()` debugging left in committed test files

---

## 3. FOLDER STRUCTURE

```
project-root/
├── frontend/                         ← Vite + React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── tests/
│   │   ├── unit/                     ← Component & hook tests (Vitest)
│   │   │   ├── components/
│   │   │   │   ├── Button.test.jsx
│   │   │   │   ├── TourCard.test.jsx
│   │   │   │   └── BookingForm.test.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useDebounce.test.js
│   │   │   └── utils/
│   │   │       ├── formatDate.test.js
│   │   │       └── formatCurrency.test.js
│   │   └── e2e/                      ← Playwright E2E tests
│   │       ├── fixtures/
│   │       │   └── testData.js
│   │       ├── pages/                ← Page Object Models
│   │       │   ├── HomePage.js
│   │       │   ├── ToursPage.js
│   │       │   ├── BookingPage.js
│   │       │   └── ContactPage.js
│   │       ├── home.spec.js
│   │       ├── tours.spec.js
│   │       ├── booking.spec.js
│   │       └── contact.spec.js
│   ├── vitest.config.js
│   └── playwright.config.js
│
├── backend/                          ← Node.js + Express + MongoDB
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middleware/
│   ├── tests/
│   │   ├── unit/                     ← Pure function unit tests (Jest)
│   │   │   ├── validators.test.js
│   │   │   └── formatters.test.js
│   │   ├── integration/              ← API route tests (Supertest)
│   │   │   ├── tours.test.js
│   │   │   ├── bookings.test.js
│   │   │   ├── contact.test.js
│   │   │   └── auth.test.js
│   │   └── db/                       ← Model/DB tests (mongodb-memory-server)
│   │       ├── tourModel.test.js
│   │       └── bookingModel.test.js
│   └── jest.config.js
```

---

## 4. INSTALLATION & CONFIGURATION

### 4.1 Frontend (run inside `/frontend`)

```bash
# Vitest + Testing Library
npm install -D vitest @vitest/coverage-v8 jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Playwright E2E
npm install -D @playwright/test
npx playwright install chromium
```

### vitest.config.js (frontend)

```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules', 'tests', 'src/main.jsx'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 65,
      },
    },
    include: ['tests/unit/**/*.test.{js,jsx}'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
});
```

### tests/setup.js (frontend)

```js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock react-hot-toast globally — don't render toast DOM in unit tests
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn(), loading: vi.fn(), dismiss: vi.fn() },
  Toaster: () => null,
}));

// Mock react-router-dom useNavigate globally
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});
```

### playwright.config.js (frontend)

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

---

### 4.2 Backend (run inside `/backend`)

```bash
npm install -D jest supertest mongodb-memory-server @types/jest
```

### jest.config.js (backend)

```js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterFramework: ['./tests/setup.js'],
  coverageThreshold: {
    global: { lines: 70, functions: 70, branches: 65 },
  },
  testTimeout: 15000, // mongodb-memory-server can be slow to start
};
```

### tests/setup.js (backend)

```js
// Silence console.error during tests (keep output clean)
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
  console.error.mockRestore?.();
});
```

---

## 5. TEST DATA & FIXTURES

All test data lives in one place. Never inline fake data in test files.

### frontend/tests/e2e/fixtures/testData.js

```js
export const TEST_TOURS = {
  pilgrimage: {
    title: 'Char Dham Yatra',
    destination: 'Uttarakhand',
    duration: '12 Days / 11 Nights',
    price: 45000,
    category: 'Pilgrimage',
  },
  hill: {
    title: 'Ooty & Kodaikanal',
    destination: 'Tamil Nadu Hills',
    duration: '4 Days / 3 Nights',
    price: 8500,
    category: 'Hill Station',
  },
};

export const TEST_BOOKING = {
  fullName: 'Ravi Kumar',
  email: 'ravi.kumar@example.com',
  phone: '9876543210',
  adults: 2,
  children: 1,
  travelDate: '2025-12-15',
  message: 'Please confirm availability for 3 passengers.',
};

export const TEST_CONTACT = {
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '9123456780',
  subject: 'Bus Charter Inquiry',
  message: 'I need a bus for 40 people from Chennai to Tirupati.',
};

export const TEST_USER = {
  name: 'Admin User',
  email: 'admin@srilakshmitravels.com',
  password: 'Admin@1234',
};

export const INVALID_BOOKING = {
  fullName: 'AB',                    // too short
  email: 'not-an-email',
  phone: '12345',                    // invalid Indian mobile
  adults: 0,                         // minimum is 1
  travelDate: '2020-01-01',          // date in the past
};
```

### backend/tests/fixtures/tourFixture.js

```js
module.exports = {
  validTour: {
    title: 'Char Dham Yatra',
    slug: 'char-dham-yatra',
    destination: 'Uttarakhand',
    category: 'Pilgrimage',
    duration: { days: 12, nights: 11 },
    price: { adult: 45000, child: 30000 },
    maxPassengers: 40,
    description: 'Sacred pilgrimage to all four dhams.',
    highlights: ['Badrinath', 'Kedarnath', 'Gangotri', 'Yamunotri'],
    isActive: true,
  },
  invalidTour: {
    title: '',           // required
    price: { adult: -1 }, // negative price
    maxPassengers: 0,    // zero passengers makes no sense
  },
};
```

---

## 6. PAGE OBJECT MODELS (Playwright)

Every E2E test uses Page Object Models — never write raw `page.click()` selectors inline.

### frontend/tests/e2e/pages/HomePage.js

```js
export class HomePage {
  constructor(page) {
    this.page = page;
    // Selectors — tied to semantic HTML, not CSS classes
    this.heroHeadline    = page.getByRole('heading', { level: 1 });
    this.searchForm      = page.getByRole('search');
    this.destinationInput = page.getByLabel('Destination');
    this.searchButton    = page.getByRole('button', { name: /search tours/i });
    this.trustBar        = page.getByTestId('trust-bar');
    this.navBookNow      = page.getByRole('link', { name: /book now/i });
    this.tourCards       = page.getByTestId('tour-card');
    this.navHamburger    = page.getByRole('button', { name: /menu/i });
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async searchTours(destination) {
    await this.destinationInput.fill(destination);
    await this.searchButton.click();
    await this.page.waitForURL(/\/tours/);
  }

  async openMobileMenu() {
    await this.navHamburger.click();
    await this.page.waitForSelector('[data-testid="mobile-drawer"]', { state: 'visible' });
  }
}
```

### frontend/tests/e2e/pages/BookingPage.js

```js
export class BookingPage {
  constructor(page) {
    this.page = page;
    this.fullNameInput  = page.getByLabel('Full Name');
    this.emailInput     = page.getByLabel('Email Address');
    this.phoneInput     = page.getByLabel('Phone Number');
    this.adultsInput    = page.getByLabel('Number of Adults');
    this.childrenInput  = page.getByLabel('Children');
    this.travelDateInput = page.getByLabel('Travel Date');
    this.messageInput   = page.getByLabel('Special Requirements');
    this.submitButton   = page.getByRole('button', { name: /confirm booking/i });
    this.successToast   = page.getByText(/booking confirmed/i);
    this.errorToast     = page.getByText(/failed to submit/i);
  }

  async fillForm(data) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.adultsInput.fill(String(data.adults));
    if (data.children) await this.childrenInput.fill(String(data.children));
    await this.travelDateInput.fill(data.travelDate);
    if (data.message) await this.messageInput.fill(data.message);
  }

  async submitAndWaitForSuccess() {
    await this.submitButton.click();
    await this.successToast.waitFor({ timeout: 8000 });
  }
}
```

---

## 7. FRONTEND UNIT TESTS (Vitest + Testing Library)

### Pattern: AAA — Arrange · Act · Assert

Every test follows this structure exactly:

```js
describe('ComponentName', () => {
  it('should [expected behaviour] when [condition]', () => {
    // Arrange — set up component and data
    // Act     — perform user interaction or call function
    // Assert  — verify expected outcome
  });
});
```

### 7.1 Button Component Test

```jsx
// tests/unit/components/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/common/Button';

describe('Button', () => {
  it('should render children text', () => {
    render(<Button>Book Tour</Button>);
    expect(screen.getByRole('button', { name: 'Book Tour' })).toBeInTheDocument();
  });

  it('should show spinner and be disabled when loading=true', () => {
    render(<Button loading={true}>Book Tour</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(document.querySelector('svg.animate-spin')).toBeInTheDocument();
  });

  it('should call onClick handler exactly once when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should NOT call onClick when button is disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply fullWidth class when fullWidth=true', () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });
});
```

### 7.2 TourCard Component Test

```jsx
// tests/unit/components/TourCard.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TourCard from '@/components/tours/TourCard';
import { TEST_TOURS } from '../fixtures/testData';

const renderCard = (props = {}) =>
  render(
    <MemoryRouter>
      <TourCard tour={{ ...TEST_TOURS.pilgrimage, _id: 'tour-001', ...props }} />
    </MemoryRouter>
  );

describe('TourCard', () => {
  it('should display tour title', () => {
    renderCard();
    expect(screen.getByText('Char Dham Yatra')).toBeInTheDocument();
  });

  it('should display formatted price with ₹ symbol', () => {
    renderCard();
    expect(screen.getByText(/₹.*45,000/)).toBeInTheDocument();
  });

  it('should display duration correctly', () => {
    renderCard();
    expect(screen.getByText(/12 Days/)).toBeInTheDocument();
  });

  it('should have a link to the correct tour detail URL', () => {
    renderCard();
    const link = screen.getByRole('link', { name: /view tour|book now/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('tour-001'));
  });

  it('should display destination badge', () => {
    renderCard();
    expect(screen.getByText('Pilgrimage')).toBeInTheDocument();
  });

  it('should have an accessible image with alt text', () => {
    renderCard();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', expect.stringContaining('Char Dham Yatra'));
  });
});
```

### 7.3 Booking Form Validation Test

```jsx
// tests/unit/components/BookingForm.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from '@/components/booking/BookingForm';
import { TEST_BOOKING, INVALID_BOOKING } from '../fixtures/testData';

const renderForm = () =>
  render(<MemoryRouter><BookingForm tourId="tour-001" /></MemoryRouter>);

describe('BookingForm validation', () => {
  it('should show required errors when form is submitted empty', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole('button', { name: /confirm booking/i }));
    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('should reject invalid Indian phone number', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/phone/i), '12345');
    await user.click(screen.getByRole('button', { name: /confirm booking/i }));
    await waitFor(() =>
      expect(screen.getByText(/valid indian mobile/i)).toBeInTheDocument()
    );
  });

  it('should reject a past travel date', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/travel date/i), '2020-01-01');
    await user.click(screen.getByRole('button', { name: /confirm booking/i }));
    await waitFor(() =>
      expect(screen.getByText(/date must be in the future/i)).toBeInTheDocument()
    );
  });
});
```

### 7.4 Utility Function Tests

```js
// tests/unit/utils/formatCurrency.test.js
import { formatCurrency } from '@/utils/formatCurrency';

describe('formatCurrency', () => {
  it('should format 45000 as ₹45,000', () => {
    expect(formatCurrency(45000)).toBe('₹45,000');
  });

  it('should format 1000000 as ₹10,00,000 (Indian numbering)', () => {
    expect(formatCurrency(1000000)).toBe('₹10,00,000');
  });

  it('should return ₹0 for zero', () => {
    expect(formatCurrency(0)).toBe('₹0');
  });

  it('should handle decimal amounts', () => {
    expect(formatCurrency(8500.5)).toBe('₹8,500.50');
  });
});
```

```js
// tests/unit/utils/formatDate.test.js
import { formatDate, formatDateShort } from '@/utils/formatDate';

describe('formatDate', () => {
  it('should format ISO date to readable Indian format', () => {
    expect(formatDate('2025-12-15')).toBe('15 December 2025');
  });

  it('should format date to short format', () => {
    expect(formatDateShort('2025-12-15')).toBe('15 Dec 2025');
  });
});
```

---

## 8. E2E TESTS (Playwright)

### 8.1 Home Page E2E

```js
// tests/e2e/home.spec.js
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Home Page', () => {
  let home;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('should display hero headline containing "Since 1995"', async () => {
    await expect(home.heroHeadline).toContainText('1995');
  });

  test('should display trust bar with 4 statistics', async () => {
    await expect(home.trustBar).toBeVisible();
    await expect(home.page.getByText(/30\+ years/i)).toBeVisible();
    await expect(home.page.getByText(/50,000\+/i)).toBeVisible();
  });

  test('should show at least 3 featured tour cards', async () => {
    const count = await home.tourCards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should navigate to tours page when search is submitted', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.searchTours('Ooty');
    await expect(page).toHaveURL(/\/tours/);
  });

  test('should show mobile drawer when hamburger is clicked on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const home = new HomePage(page);
    await home.goto();
    await home.openMobileMenu();
    await expect(page.getByTestId('mobile-drawer')).toBeVisible();
  });

  test('navbar should become opaque after scrolling 80px', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(400); // allow transition
    const nav = page.getByRole('navigation');
    const bgColor = await nav.evaluate(el => window.getComputedStyle(el).backgroundColor);
    // Must not be fully transparent (rgba(0,0,0,0))
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
  });
});
```

### 8.2 Tours Listing E2E

```js
// tests/e2e/tours.spec.js
import { test, expect } from '@playwright/test';

test.describe('Tours Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tours');
    await page.waitForLoadState('networkidle');
  });

  test('should render a list of tour cards', async ({ page }) => {
    const cards = page.getByTestId('tour-card');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('should filter tours by category', async ({ page }) => {
    await page.getByRole('button', { name: /pilgrimage/i }).click();
    await page.waitForLoadState('networkidle');
    const cards = page.getByTestId('tour-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    // Every visible card should show Pilgrimage badge
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).getByText(/pilgrimage/i)).toBeVisible();
    }
  });

  test('should navigate to tour detail on card click', async ({ page }) => {
    await page.getByTestId('tour-card').first().getByRole('link').first().click();
    await expect(page).toHaveURL(/\/tours\/.+/);
  });

  test('should show empty state when no tours match filter', async ({ page }) => {
    // Apply a filter combination unlikely to have results
    await page.getByLabel(/destination/i).selectOption({ label: 'Kashmir' });
    await page.getByLabel(/max price/i).fill('1000');
    await page.getByRole('button', { name: /apply/i }).click();
    await expect(page.getByTestId('empty-state')).toBeVisible({ timeout: 6000 });
  });
});
```

### 8.3 Booking Flow E2E

```js
// tests/e2e/booking.spec.js
import { test, expect } from '@playwright/test';
import { BookingPage } from './pages/BookingPage';
import { TEST_BOOKING } from './fixtures/testData';

test.describe('Booking Flow', () => {
  test('should complete a full booking with valid data', async ({ page }) => {
    // Navigate to a tour detail and click Book Now
    await page.goto('/tours');
    await page.waitForLoadState('networkidle');
    await page.getByTestId('tour-card').first().getByRole('link', { name: /book now/i }).click();

    const booking = new BookingPage(page);
    await booking.fillForm(TEST_BOOKING);
    await booking.submitAndWaitForSuccess();

    await expect(booking.successToast).toBeVisible();
  });

  test('should show validation errors on empty submit', async ({ page }) => {
    await page.goto('/booking/char-dham-yatra');
    await page.waitForLoadState('networkidle');
    const booking = new BookingPage(page);
    await booking.submitButton.click();

    await expect(page.getByText(/full name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
  });

  test('should reject invalid phone number', async ({ page }) => {
    await page.goto('/booking/char-dham-yatra');
    await page.waitForLoadState('networkidle');
    const booking = new BookingPage(page);
    await booking.phoneInput.fill('00000');
    await booking.submitButton.click();
    await expect(page.getByText(/valid indian mobile/i)).toBeVisible();
  });

  test('booking form should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/booking/char-dham-yatra');
    await page.waitForLoadState('networkidle');

    const booking = new BookingPage(page);
    await expect(booking.fullNameInput).toBeVisible();
    await expect(booking.submitButton).toBeVisible();

    // Verify no horizontal overflow
    const scrollWidth = await page.evaluate(() =>
      document.documentElement.scrollWidth > window.innerWidth
    );
    expect(scrollWidth).toBe(false);
  });
});
```

### 8.4 Contact Form E2E

```js
// tests/e2e/contact.spec.js
import { test, expect } from '@playwright/test';
import { TEST_CONTACT } from './fixtures/testData';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
  });

  test('should submit contact form and show success toast', async ({ page }) => {
    await page.getByLabel(/name/i).fill(TEST_CONTACT.name);
    await page.getByLabel(/email/i).fill(TEST_CONTACT.email);
    await page.getByLabel(/phone/i).fill(TEST_CONTACT.phone);
    await page.getByLabel(/subject/i).fill(TEST_CONTACT.subject);
    await page.getByLabel(/message/i).fill(TEST_CONTACT.message);
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 8000 });
  });

  test('should display office address and phone number', async ({ page }) => {
    await expect(page.getByTestId('contact-address')).toBeVisible();
    await expect(page.getByTestId('contact-phone')).toBeVisible();
  });

  test('WhatsApp button should open correct WhatsApp link', async ({ page }) => {
    const whatsappLink = page.getByRole('link', { name: /whatsapp/i });
    await expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('wa.me'));
  });
});
```

---

## 9. BACKEND API TESTS (Jest + Supertest)

### 9.1 Test App Setup

```js
// backend/tests/helpers/createTestApp.js
const express = require('express');
const toursRouter = require('../../src/routes/tours');
const bookingsRouter = require('../../src/routes/bookings');
const contactRouter = require('../../src/routes/contact');
const authRouter = require('../../src/routes/auth');
const errorHandler = require('../../src/middleware/errorHandler');

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/tours', toursRouter);
  app.use('/api/bookings', bookingsRouter);
  app.use('/api/contact', contactRouter);
  app.use('/api/auth', authRouter);
  app.use(errorHandler);
  return app;
}

module.exports = { createTestApp };
```

### 9.2 Tours API Tests

```js
// backend/tests/integration/tours.test.js
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { createTestApp } = require('../helpers/createTestApp');
const Tour = require('../../src/models/Tour');
const { validTour } = require('../fixtures/tourFixture');

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = createTestApp();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Tour.deleteMany({});
});

describe('GET /api/tours', () => {
  it('should return 200 with empty array when no tours exist', async () => {
    const res = await request(app).get('/api/tours');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('should return all active tours', async () => {
    await Tour.create(validTour);
    const res = await request(app).get('/api/tours');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe('Char Dham Yatra');
  });

  it('should filter tours by category', async () => {
    await Tour.create(validTour);
    await Tour.create({ ...validTour, title: 'Ooty Tour', slug: 'ooty-tour', category: 'Hill Station' });
    const res = await request(app).get('/api/tours?category=Pilgrimage');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].category).toBe('Pilgrimage');
  });

  it('should paginate results correctly', async () => {
    // Create 15 tours
    const tours = Array.from({ length: 15 }, (_, i) => ({
      ...validTour, title: `Tour ${i}`, slug: `tour-${i}`,
    }));
    await Tour.insertMany(tours);

    const res = await request(app).get('/api/tours?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(10);
    expect(res.body.pagination.total).toBe(15);
  });
});

describe('GET /api/tours/:slug', () => {
  it('should return a single tour by slug', async () => {
    await Tour.create(validTour);
    const res = await request(app).get('/api/tours/char-dham-yatra');
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Char Dham Yatra');
  });

  it('should return 404 for non-existent slug', async () => {
    const res = await request(app).get('/api/tours/this-does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
```

### 9.3 Bookings API Tests

```js
// backend/tests/integration/bookings.test.js
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { createTestApp } = require('../helpers/createTestApp');
const Tour = require('../../src/models/Tour');
const { validTour } = require('../fixtures/tourFixture');

let app, mongoServer, tourId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = createTestApp();
  const tour = await Tour.create(validTour);
  tourId = tour._id.toString();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const validBooking = {
  fullName: 'Ravi Kumar',
  email: 'ravi.kumar@example.com',
  phone: '9876543210',
  adults: 2,
  children: 1,
  travelDate: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days from now
  message: 'Please confirm.',
};

describe('POST /api/bookings', () => {
  it('should create a booking and return 201', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ ...validBooking, tourId });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe('ravi.kumar@example.com');
    expect(res.body.data.status).toBe('pending');
  });

  it('should reject booking with invalid email — return 422', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ ...validBooking, tourId, email: 'not-an-email' });
    expect(res.status).toBe(422);
    expect(res.body.errors).toEqual(expect.arrayContaining([
      expect.objectContaining({ field: 'email' }),
    ]));
  });

  it('should reject booking with invalid Indian phone number', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ ...validBooking, tourId, phone: '12345' });
    expect(res.status).toBe(422);
  });

  it('should reject booking with adults = 0', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ ...validBooking, tourId, adults: 0 });
    expect(res.status).toBe(422);
  });

  it('should reject booking with past travel date', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ ...validBooking, tourId, travelDate: '2020-01-01' });
    expect(res.status).toBe(422);
  });

  it('should return 404 when tourId does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const res = await request(app)
      .post('/api/bookings')
      .send({ ...validBooking, tourId: fakeId });
    expect(res.status).toBe(404);
  });
});
```

### 9.4 Contact API Tests

```js
// backend/tests/integration/contact.test.js
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { createTestApp } = require('../helpers/createTestApp');

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = createTestApp();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /api/contact', () => {
  it('should accept valid contact submission and return 201', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9123456780',
        subject: 'Bus Charter',
        message: 'I need a bus for 40 people.',
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/received|submitted|success/i);
  });

  it('should reject submission without a message', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Test', email: 'test@test.com', subject: 'Hi' });
    expect(res.status).toBe(422);
  });
});
```

### 9.5 Auth API Tests

```js
// backend/tests/integration/auth.test.js
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { createTestApp } = require('../helpers/createTestApp');

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = createTestApp();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /api/auth/register', () => {
  it('should register a new user and return 201 with JWT', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Admin', email: 'admin@slt.com', password: 'Admin@1234' });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should reject duplicate email with 409', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'User', email: 'dupe@slt.com', password: 'Pass@1234' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'User2', email: 'dupe@slt.com', password: 'Pass@1234' });
    expect(res.status).toBe(409);
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Login Test', email: 'login@slt.com', password: 'Admin@1234' });
  });

  it('should return JWT token with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@slt.com', password: 'Admin@1234' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should return 401 with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@slt.com', password: 'WrongPass' });
    expect(res.status).toBe(401);
  });

  it('should return 404 with unregistered email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ghost@slt.com', password: 'Admin@1234' });
    expect(res.status).toBe(404);
  });
});
```

---

## 10. DATABASE MODEL TESTS (Jest + mongodb-memory-server)

```js
// backend/tests/db/tourModel.test.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Tour = require('../../src/models/Tour');
const { validTour, invalidTour } = require('../fixtures/tourFixture');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Tour.deleteMany({});
});

describe('Tour Model', () => {
  it('should save a valid tour to the database', async () => {
    const tour = await Tour.create(validTour);
    expect(tour._id).toBeDefined();
    expect(tour.title).toBe('Char Dham Yatra');
    expect(tour.isActive).toBe(true);
  });

  it('should reject a tour without a required title', async () => {
    await expect(Tour.create(invalidTour)).rejects.toThrow();
  });

  it('should reject a tour with negative adult price', async () => {
    await expect(
      Tour.create({ ...validTour, price: { adult: -100, child: 0 } })
    ).rejects.toThrow();
  });

  it('should enforce unique slug', async () => {
    await Tour.create(validTour);
    await expect(Tour.create({ ...validTour, title: 'Duplicate Slug Tour' })).rejects.toThrow();
  });

  it('should auto-set createdAt timestamp', async () => {
    const tour = await Tour.create(validTour);
    expect(tour.createdAt).toBeDefined();
    expect(tour.createdAt).toBeInstanceOf(Date);
  });
});
```

---

## 11. ACCESSIBILITY TESTS (Playwright + axe-core)

```bash
npm install -D @axe-core/playwright
```

```js
// tests/e2e/accessibility.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES_TO_CHECK = ['/', '/tours', '/about', '/contact'];

for (const path of PAGES_TO_CHECK) {
  test(`${path} should have no critical accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('#cookie-banner') // skip third-party widgets
      .analyze();

    // Log violations for debugging — don't hide them
    if (results.violations.length > 0) {
      console.table(results.violations.map(v => ({
        id: v.id, impact: v.impact, description: v.description,
        nodes: v.nodes.length,
      })));
    }

    const criticalViolations = results.violations.filter(v =>
      ['critical', 'serious'].includes(v.impact)
    );
    expect(criticalViolations).toHaveLength(0);
  });
}
```

---

## 12. RESPONSIVE LAYOUT TESTS (Playwright)

```js
// tests/e2e/responsive.spec.js
import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'Mobile S', width: 375, height: 667 },
  { name: 'Mobile L', width: 425, height: 812 },
  { name: 'Tablet',   width: 768, height: 1024 },
  { name: 'Laptop',   width: 1024, height: 768 },
  { name: 'Desktop',  width: 1440, height: 900 },
];

const CRITICAL_PAGES = ['/', '/tours', '/contact'];

for (const viewport of VIEWPORTS) {
  for (const path of CRITICAL_PAGES) {
    test(`${path} — no horizontal scroll at ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const hasHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth
      );
      expect(hasHorizontalScroll).toBe(false);
    });
  }
}

test('Navbar shows hamburger on mobile and hides on desktop', async ({ page }) => {
  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();

  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.getByRole('button', { name: /menu/i })).not.toBeVisible();
});
```

---

## 13. NPM SCRIPTS (add to package.json)

### frontend/package.json

```json
{
  "scripts": {
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:unit:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:report": "playwright show-report",
    "test:a11y": "playwright test tests/e2e/accessibility.spec.js",
    "test:responsive": "playwright test tests/e2e/responsive.spec.js",
    "test": "npm run test:unit && npm run test:e2e"
  }
}
```

### backend/package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest tests/integration",
    "test:db": "jest tests/db",
    "test:unit": "jest tests/unit"
  }
}
```

---

## 14. DATA-TESTID REQUIREMENTS

Every interactive or key semantic element in the codebase **must** have a `data-testid` attribute. The UI skill does not define these — you must add them wherever tests need to target elements reliably.

| Element                    | data-testid value          |
|----------------------------|----------------------------|
| Individual tour card       | `tour-card`                |
| Trust bar section          | `trust-bar`                |
| Mobile drawer/overlay      | `mobile-drawer`            |
| Empty state message        | `empty-state`              |
| Loading skeleton           | `skeleton-loader`          |
| Contact address block      | `contact-address`          |
| Contact phone block        | `contact-phone`            |
| Booking confirmation modal | `booking-confirmation`     |
| Filter sidebar             | `filter-sidebar`           |
| Search results count       | `results-count`            |
| Error boundary fallback    | `error-boundary`           |
| Page hero section          | `hero-section`             |

---

## 15. WHAT NOT TO TEST

Avoid wasting time on tests that don't catch real bugs:

- ❌ Tailwind class names (CSS classes, not behaviour)
- ❌ Third-party library internals (Swiper, Lucide icons)
- ❌ `console.log()` side effects
- ❌ React implementation details (`useState` internal values)
- ❌ Exact pixel dimensions or colours (use visual testing tools if needed)
- ❌ Tests that mock 100% of the unit under test (you're testing the mock, not the code)

---

## 16. COVERAGE TARGETS

| Layer             | Lines | Functions | Branches |
|-------------------|-------|-----------|----------|
| Frontend utils    | 90%   | 90%       | 85%      |
| Frontend hooks    | 80%   | 80%       | 75%      |
| Frontend components | 70% | 70%       | 65%      |
| Backend routes    | 85%   | 85%       | 80%      |
| Backend models    | 80%   | 80%       | 75%      |
| Backend middleware| 75%   | 75%       | 70%      |

---

## 17. DEBUGGING FAILED TESTS

### Playwright Failures
```bash
# Show detailed trace
npx playwright show-trace test-results/trace.zip

# Run in headed mode to watch
npm run test:e2e:headed

# Run a single spec
npx playwright test tests/e2e/booking.spec.js

# Debug mode (step through with DevTools)
PWDEBUG=1 npx playwright test tests/e2e/booking.spec.js
```

### Jest/Vitest Failures
```bash
# Run one test file
npx vitest run tests/unit/components/Button.test.jsx

# Verbose output
npx jest --verbose tests/integration/tours.test.js

# Update snapshots (if using)
npx vitest run --update-snapshots
```

---

## 18. GOLDEN RULES FOR SLT TESTING

1. **Never test against real MongoDB Atlas** — always use `mongodb-memory-server`
2. **Always use Page Object Models** — never write raw Playwright selectors in test files
3. **All test data from fixtures** — never inline fake names, emails, or prices
4. **AAA pattern in every test** — Arrange · Act · Assert, always
5. **Tests must be independent** — `beforeEach` resets state, tests never rely on each other
6. **Indian phone numbers in fixtures** — use `9XXXXXXXXX` format to match Yup validation
7. **Test real user journeys** — booking = fill form + submit + see toast, not just API call
8. **Add `data-testid` as you build** — retrofit is painful; bake them in from day one
9. **Check mobile in E2E** — set viewport to 375px in at least one test per critical flow
10. **Coverage is a floor, not a ceiling** — meet thresholds, but write tests for real risk areas

---

*TESTING_SKILL.md crafted for Sri Lakshmi Travels — MERN Stack*
*Stack: Vitest · Playwright · Jest · Supertest · mongodb-memory-server*
*Version 1.0 | Santhosh — Senior QA Engineer*
