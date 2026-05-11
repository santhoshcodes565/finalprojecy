/**
 * POST /api/bookings — Integration Tests
 * File: backend/tests/integration/bookings.test.js
 * Framework: Jest + Supertest + mongodb-memory-server
 * Pattern: AAA (Arrange · Act · Assert)
 */

const request  = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt      = require('jsonwebtoken');

const { createTestApp } = require('../helpers/createTestApp');
const User          = require('../../models/User');
const CarBooking    = require('../../models/CarBooking');
const DriverBooking = require('../../models/DriverBooking');
const PackageBooking = require('../../models/PackageBooking');

const {
  validUser,
  adminUser,
  validCarBooking,
  validDriverBooking,
  validPackageBooking,
} = require('../fixtures/bookingFixtures');

// ─── State ───────────────────────────────────────────────────────────────────
let app, mongoServer, authToken, adminToken, userId;

function signToken(id) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = createTestApp();

  const user = await User.create({ ...validUser, isVerified: true });
  userId = user._id.toString();
  authToken = signToken(userId);

  const admin = await User.create({ ...adminUser, isVerified: true });
  adminToken = signToken(admin._id.toString());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await CarBooking.deleteMany({});
  await DriverBooking.deleteMany({});
  await PackageBooking.deleteMany({});
});

// ─── Car Booking ──────────────────────────────────────────────────────────────
describe('POST /api/bookings/car', () => {
  it('should create a car booking and return 201', async () => {
    const res = await request(app)
      .post('/api/bookings/car')
      .set('Authorization', `Bearer ${authToken}`)
      .send(validCarBooking);

    expect(res.status).toBe(201);
    expect(res.body.booking.fullName).toBe(validCarBooking.fullName);
    expect(res.body.booking.status).toBe('pending');
    expect(res.body.booking.userId).toBe(userId);
  });

  it('should persist booking to DB', async () => {
    await request(app)
      .post('/api/bookings/car')
      .set('Authorization', `Bearer ${authToken}`)
      .send(validCarBooking);

    expect(await CarBooking.countDocuments()).toBe(1);
  });

  it('should return 401 when no token is provided', async () => {
    const res = await request(app).post('/api/bookings/car').send(validCarBooking);
    expect(res.status).toBe(401);
  });

  it('should return 401 with an invalid JWT', async () => {
    const res = await request(app)
      .post('/api/bookings/car')
      .set('Authorization', 'Bearer bad.token.here')
      .send(validCarBooking);
    expect(res.status).toBe(401);
  });

  it('should return 400 when required field carId is missing', async () => {
    const { carId, ...payload } = validCarBooking;
    const res = await request(app)
      .post('/api/bookings/car')
      .set('Authorization', `Bearer ${authToken}`)
      .send(payload);
    expect(res.status).toBe(400);
  });

  it('should return 400 when adults = 0 (minimum is 1)', async () => {
    const res = await request(app)
      .post('/api/bookings/car')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...validCarBooking, adults: 0 });
    expect(res.status).toBe(400);
  });

  it('should return 400 when tripType has an invalid enum value', async () => {
    const res = await request(app)
      .post('/api/bookings/car')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...validCarBooking, tripType: 'teleport' });
    expect(res.status).toBe(400);
  });

  it('should ignore body userId and use token userId instead', async () => {
    const res = await request(app)
      .post('/api/bookings/car')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...validCarBooking, userId: 'attacker-id' });
    expect(res.status).toBe(201);
    expect(res.body.booking.userId).toBe(userId);
  });
});

// ─── Driver Booking ───────────────────────────────────────────────────────────
describe('POST /api/bookings/driver', () => {
  it('should create a driver booking and return 201', async () => {
    const res = await request(app)
      .post('/api/bookings/driver')
      .set('Authorization', `Bearer ${authToken}`)
      .send(validDriverBooking);
    expect(res.status).toBe(201);
    expect(res.body.booking.status).toBe('pending');
  });

  it('should return 401 without a token', async () => {
    const res = await request(app).post('/api/bookings/driver').send(validDriverBooking);
    expect(res.status).toBe(401);
  });

  it('should return 400 when required driverType is missing', async () => {
    const { driverType, ...payload } = validDriverBooking;
    const res = await request(app)
      .post('/api/bookings/driver')
      .set('Authorization', `Bearer ${authToken}`)
      .send(payload);
    expect(res.status).toBe(400);
  });
});

// ─── Package Booking ──────────────────────────────────────────────────────────
describe('POST /api/bookings/package', () => {
  it('should create a package booking and return 201', async () => {
    const res = await request(app)
      .post('/api/bookings/package')
      .set('Authorization', `Bearer ${authToken}`)
      .send(validPackageBooking);
    expect(res.status).toBe(201);
    expect(res.body.booking.hotelCategory).toBe('standard');
    expect(res.body.booking.mealPlan).toBe('breakfast');
  });

  it('should return 400 when adults = 0', async () => {
    const res = await request(app)
      .post('/api/bookings/package')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...validPackageBooking, adults: 0 });
    expect(res.status).toBe(400);
  });

  it('should return 400 when hotelCategory is invalid enum', async () => {
    const res = await request(app)
      .post('/api/bookings/package')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...validPackageBooking, hotelCategory: 'tent' });
    expect(res.status).toBe(400);
  });

  it('should return 400 when mealPlan is invalid enum', async () => {
    const res = await request(app)
      .post('/api/bookings/package')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...validPackageBooking, mealPlan: 'pizza-only' });
    expect(res.status).toBe(400);
  });

  it('should return 400 when required packageId is missing', async () => {
    const { packageId, ...payload } = validPackageBooking;
    const res = await request(app)
      .post('/api/bookings/package')
      .set('Authorization', `Bearer ${authToken}`)
      .send(payload);
    expect(res.status).toBe(400);
  });
});

// ─── GET /api/bookings/mine ───────────────────────────────────────────────────
describe('GET /api/bookings/mine', () => {
  it('should return all bookings for the logged-in user', async () => {
    await CarBooking.create({ ...validCarBooking, userId });
    await PackageBooking.create({ ...validPackageBooking, userId });

    const res = await request(app)
      .get('/api/bookings/mine')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.bookings).toHaveLength(2);
  });

  it('should return empty array when user has no bookings', async () => {
    const res = await request(app)
      .get('/api/bookings/mine')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.bookings).toHaveLength(0);
  });

  it('should return 401 without token', async () => {
    const res = await request(app).get('/api/bookings/mine');
    expect(res.status).toBe(401);
  });
});

// ─── PATCH cancel ─────────────────────────────────────────────────────────────
describe('PATCH /api/bookings/car/:id/cancel', () => {
  it('should cancel a pending booking owned by the user', async () => {
    const booking = await CarBooking.create({ ...validCarBooking, userId });
    const res = await request(app)
      .patch(`/api/bookings/car/${booking._id}/cancel`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.booking.status).toBe('cancelled');
  });

  it('should return 404 when booking does not belong to this user', async () => {
    const otherUserId = new mongoose.Types.ObjectId();
    const booking = await CarBooking.create({ ...validCarBooking, userId: otherUserId });
    const res = await request(app)
      .patch(`/api/bookings/car/${booking._id}/cancel`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(404);
  });

  it('should return 400 when booking is already completed', async () => {
    const booking = await CarBooking.create({ ...validCarBooking, userId, status: 'completed' });
    const res = await request(app)
      .patch(`/api/bookings/car/${booking._id}/cancel`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/cannot be cancelled/i);
  });

  it('should return 400 for invalid booking type', async () => {
    const res = await request(app)
      .patch(`/api/bookings/spaceship/${new mongoose.Types.ObjectId()}/cancel`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(400);
  });
});

// ─── ADMIN endpoints ─────────────────────────────────────────────────────────
describe('GET /api/bookings/all (Admin)', () => {
  it('should return all bookings for admin', async () => {
    await CarBooking.create({ ...validCarBooking, userId });
    await PackageBooking.create({ ...validPackageBooking, userId });

    const res = await request(app)
      .get('/api/bookings/all')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.bookings.length).toBeGreaterThanOrEqual(2);
  });

  it('should return 403 when regular user hits admin endpoint', async () => {
    const res = await request(app)
      .get('/api/bookings/all')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(403);
  });

  it('should filter bookings by status=pending', async () => {
    await CarBooking.create({ ...validCarBooking, userId, status: 'pending' });
    await CarBooking.create({ ...validCarBooking, userId, status: 'confirmed' });

    const res = await request(app)
      .get('/api/bookings/all?status=pending')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.bookings.every(b => b.status === 'pending')).toBe(true);
  });
});

describe('PATCH /api/bookings/car/:id/status (Admin)', () => {
  it('should update booking status to confirmed', async () => {
    const booking = await CarBooking.create({ ...validCarBooking, userId });
    const res = await request(app)
      .patch(`/api/bookings/car/${booking._id}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'confirmed' });
    expect(res.status).toBe(200);
    expect(res.body.booking.status).toBe('confirmed');
  });

  it('should return 404 when booking does not exist', async () => {
    const res = await request(app)
      .patch(`/api/bookings/car/${new mongoose.Types.ObjectId()}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'confirmed' });
    expect(res.status).toBe(404);
  });
});
