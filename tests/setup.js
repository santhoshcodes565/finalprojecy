/**
 * tests/setup.js — Frontend Vitest Global Setup
 * Runs before every unit test file.
 */
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// ─── Mock react-hot-toast (avoids DOM portal errors in jsdom) ─────────────────
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error:   vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
  Toaster: () => null,
}));

// ─── Mock react-router-dom (useNavigate only) ────────────────────────────────
// DO NOT mock useSearchParams here — MemoryRouter handles it via initialEntries.
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// ─── Mock axios API instance ───────────────────────────────────────────────────
vi.mock('@/api/axios', () => ({
  default: {
    get:    vi.fn(() => Promise.resolve({ data: { tours: [] } })),
    post:   vi.fn(() => Promise.resolve({ data: {} })),
    put:    vi.fn(() => Promise.resolve({ data: {} })),
    patch:  vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

// ─── Mock data (avoids real data imports that reference files) ────────────────
vi.mock('@/data/mockData', () => ({
  cars: [
    { id: 'car-001', name: 'Toyota Innova Crysta', category: 'SUV', pricePerKm: 18 },
    { id: 'car-002', name: 'Maruti Ertiga', category: 'MUV', pricePerKm: 14 },
  ],
  drivers: [
    { id: 'drv-001', name: 'Rajesh Kumar', rating: 4.8 },
    { id: 'drv-002', name: 'Murugan S', rating: 4.6 },
  ],
  packages: [
    { id: 'pkg-001', title: 'Ooty Weekend Getaway', price: 8500 },
    { id: 'pkg-002', title: 'Kodaikanal Escape', price: 12000 },
  ],
}));
