/**
 * createTestApp.js — Sri Lakshmi Travels
 * Creates an isolated Express app for Supertest integration testing.
 * - No real MongoDB connection (caller must set up mongodb-memory-server)
 * - No SMS / Email / Razorpay side effects
 * - No rate-limiting (would break test suites)
 * - readOnlyGuard is bypassed (READ_ONLY_MODE=false in test env)
 */

const express = require('express');
const cookieParser = require('cookie-parser');

// Route imports — same as production server.js
const authRouter     = require('../../routes/auth');
const bookingsRouter = require('../../routes/bookings');
const toursRouter    = require('../../routes/tours');
const carsRouter     = require('../../routes/cars');
const usersRouter    = require('../../routes/users');

// ─── Mock notification service ────────────────────────────────────────────────
// Prevents real SMS / Email / HTTP calls during integration tests.
// The notify() fire-and-forget in bookings.js must be silenced.
jest.mock('../../services/notificationService', () => ({
  notify: jest.fn(() => Promise.resolve()),
}));

function createTestApp() {
  const app = express();

  // ─── Core middleware ───────────────────────────────────────────────────────
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // ─── Ensure READ_ONLY_MODE is off during tests ─────────────────────────────
  // (tests need to write data; real Atlas is never touched via memory server)
  process.env.READ_ONLY_MODE = 'false';

  // ─── Mount routes ──────────────────────────────────────────────────────────
  app.use('/api/auth',     authRouter);
  app.use('/api/bookings', bookingsRouter);
  app.use('/api/tours',    toursRouter);
  app.use('/api/cars',     carsRouter);
  app.use('/api/users',    usersRouter);

  // ─── Health check ──────────────────────────────────────────────────────────
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  // ─── Global error handler ──────────────────────────────────────────────────
  app.use((err, _req, res, _next) => {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Internal Server Error',
    });
  });

  return app;
}

module.exports = { createTestApp };
