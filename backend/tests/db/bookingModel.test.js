/**
 * PackageBooking Model — DB Tests
 * File: backend/tests/db/bookingModel.test.js
 * Framework: Jest + mongodb-memory-server
 * Pattern: AAA (Arrange · Act · Assert)
 *
 * Tests all three booking models: CarBooking, DriverBooking, PackageBooking.
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const CarBooking     = require('../../models/CarBooking');
const DriverBooking  = require('../../models/DriverBooking');
const PackageBooking = require('../../models/PackageBooking');

const {
  validCarBooking,
  validDriverBooking,
  validPackageBooking,
  INVALID_PHONE_NUMBERS,
} = require('../fixtures/bookingFixtures');

// ─── State ───────────────────────────────────────────────────────────────────
let mongoServer;
const FAKE_USER_ID = new mongoose.Types.ObjectId();
const FUTURE_DATE  = new Date(Date.now() + 86400000 * 7); // 7 days from now

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await CarBooking.deleteMany({});
  await DriverBooking.deleteMany({});
  await PackageBooking.deleteMany({});
});

// ─── CarBooking Model ─────────────────────────────────────────────────────────
describe('CarBooking Model', () => {
  it('should save a valid car booking and assign a MongoDB _id', async () => {
    // Arrange
    const data = { ...validCarBooking, userId: FAKE_USER_ID };

    // Act
    const booking = await CarBooking.create(data);

    // Assert
    expect(booking._id).toBeDefined();
    expect(booking.fullName).toBe(validCarBooking.fullName);
    expect(booking.status).toBe('pending');
    expect(booking.advancePaid).toBe(0);
  });

  it('should auto-set createdAt and updatedAt timestamps', async () => {
    // Arrange + Act
    const booking = await CarBooking.create({ ...validCarBooking, userId: FAKE_USER_ID });

    // Assert
    expect(booking.createdAt).toBeInstanceOf(Date);
    expect(booking.updatedAt).toBeInstanceOf(Date);
  });

  it('should reject when required field userId is missing', async () => {
    // Arrange — no userId
    const { userId, ...data } = { ...validCarBooking };

    // Act + Assert
    await expect(CarBooking.create(data)).rejects.toThrow(/userId.*required|Path `userId`/i);
  });

  it('should reject when required field carId is missing', async () => {
    // Arrange
    const data = { ...validCarBooking, userId: FAKE_USER_ID, carId: undefined };

    // Act + Assert
    await expect(CarBooking.create(data)).rejects.toThrow(/carId.*required|Path `carId`/i);
  });

  it('should reject when required field fullName is missing', async () => {
    // Arrange
    const data = { ...validCarBooking, userId: FAKE_USER_ID, fullName: undefined };

    // Act + Assert
    await expect(CarBooking.create(data)).rejects.toThrow(/fullName.*required|Path `fullName`/i);
  });

  it('should reject when adults is 0 (min: 1)', async () => {
    // Arrange
    const data = { ...validCarBooking, userId: FAKE_USER_ID, adults: 0 };

    // Act + Assert
    await expect(CarBooking.create(data)).rejects.toThrow(/adults/i);
  });

  it('should reject when adults is negative', async () => {
    // Arrange
    const data = { ...validCarBooking, userId: FAKE_USER_ID, adults: -1 };

    // Act + Assert
    await expect(CarBooking.create(data)).rejects.toThrow(/adults/i);
  });

  it('should reject when tripType has an invalid enum value', async () => {
    // Arrange
    const data = { ...validCarBooking, userId: FAKE_USER_ID, tripType: 'teleport' };

    // Act + Assert
    await expect(CarBooking.create(data)).rejects.toThrow(/tripType|`teleport` is not a valid enum/i);
  });

  it('should default children and luggage to 0 when not provided', async () => {
    // Arrange
    const data = { ...validCarBooking, userId: FAKE_USER_ID };
    delete data.children;

    // Act
    const booking = await CarBooking.create(data);

    // Assert
    expect(booking.children).toBe(0);
    expect(booking.luggage).toBe(0);
  });

  it('should default status to "pending"', async () => {
    // Arrange + Act
    const booking = await CarBooking.create({ ...validCarBooking, userId: FAKE_USER_ID });

    // Assert
    expect(booking.status).toBe('pending');
  });

  it('should reject when status has an invalid enum value', async () => {
    // Arrange
    const data = { ...validCarBooking, userId: FAKE_USER_ID, status: 'flying' };

    // Act + Assert
    await expect(CarBooking.create(data)).rejects.toThrow(/status|`flying` is not a valid enum/i);
  });

  it('should accept all valid status enum values', async () => {
    // Arrange
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

    for (const status of validStatuses) {
      // Act
      const booking = await CarBooking.create({ ...validCarBooking, userId: FAKE_USER_ID, status });

      // Assert
      expect(booking.status).toBe(status);
      await CarBooking.deleteMany({});
    }
  });
});

// ─── DriverBooking Model ──────────────────────────────────────────────────────
describe('DriverBooking Model', () => {
  it('should save a valid driver booking', async () => {
    // Arrange
    const data = { ...validDriverBooking, userId: FAKE_USER_ID };

    // Act
    const booking = await DriverBooking.create(data);

    // Assert
    expect(booking._id).toBeDefined();
    expect(booking.fullName).toBe(validDriverBooking.fullName);
    expect(booking.status).toBe('pending');
  });

  it('should reject when required field driverType is missing', async () => {
    // Arrange
    const data = { ...validDriverBooking, userId: FAKE_USER_ID, driverType: undefined };

    // Act + Assert
    await expect(DriverBooking.create(data)).rejects.toThrow(/driverType.*required|Path `driverType`/i);
  });

  it('should reject when required fullName is missing', async () => {
    // Arrange
    const data = { ...validDriverBooking, userId: FAKE_USER_ID, fullName: undefined };

    // Act + Assert
    await expect(DriverBooking.create(data)).rejects.toThrow(/fullName.*required|Path `fullName`/i);
  });
});

// ─── PackageBooking Model ─────────────────────────────────────────────────────
describe('PackageBooking Model', () => {
  it('should save a valid package booking', async () => {
    // Arrange
    const data = { ...validPackageBooking, userId: FAKE_USER_ID };

    // Act
    const booking = await PackageBooking.create(data);

    // Assert
    expect(booking._id).toBeDefined();
    expect(booking.hotelCategory).toBe('standard');
    expect(booking.mealPlan).toBe('breakfast');
    expect(booking.roomType).toBe('double');
  });

  it('should default children, infants, seniorCitizens to 0', async () => {
    // Arrange
    const data = { ...validPackageBooking, userId: FAKE_USER_ID };
    delete data.children;
    delete data.infants;
    delete data.seniorCitizens;

    // Act
    const booking = await PackageBooking.create(data);

    // Assert
    expect(booking.children).toBe(0);
    expect(booking.infants).toBe(0);
    expect(booking.seniorCitizens).toBe(0);
  });

  it('should reject adults = 0', async () => {
    // Arrange
    const data = { ...validPackageBooking, userId: FAKE_USER_ID, adults: 0 };

    // Act + Assert
    await expect(PackageBooking.create(data)).rejects.toThrow(/adults/i);
  });

  it('should reject invalid hotelCategory enum value', async () => {
    // Arrange
    const data = { ...validPackageBooking, userId: FAKE_USER_ID, hotelCategory: 'hut' };

    // Act + Assert
    await expect(PackageBooking.create(data)).rejects.toThrow(/hotelCategory|`hut` is not a valid enum/i);
  });

  it('should reject invalid roomType enum value', async () => {
    // Arrange
    const data = { ...validPackageBooking, userId: FAKE_USER_ID, roomType: 'penthouse' };

    // Act + Assert
    await expect(PackageBooking.create(data)).rejects.toThrow(/roomType|`penthouse` is not a valid enum/i);
  });

  it('should reject invalid mealPlan enum value', async () => {
    // Arrange
    const data = { ...validPackageBooking, userId: FAKE_USER_ID, mealPlan: 'vegan-only' };

    // Act + Assert
    await expect(PackageBooking.create(data)).rejects.toThrow(/mealPlan|`vegan-only` is not a valid enum/i);
  });

  it('should reject when required packageId is missing', async () => {
    // Arrange
    const data = { ...validPackageBooking, userId: FAKE_USER_ID, packageId: undefined };

    // Act + Assert
    await expect(PackageBooking.create(data)).rejects.toThrow(/packageId.*required|Path `packageId`/i);
  });

  it('should reject when required pickupCity is missing', async () => {
    // Arrange
    const data = { ...validPackageBooking, userId: FAKE_USER_ID, pickupCity: undefined };

    // Act + Assert
    await expect(PackageBooking.create(data)).rejects.toThrow(/pickupCity.*required|Path `pickupCity`/i);
  });

  it('should accept flexibleDates defaulting to false', async () => {
    // Arrange + Act
    const booking = await PackageBooking.create({ ...validPackageBooking, userId: FAKE_USER_ID });

    // Assert
    expect(booking.flexibleDates).toBe(false);
  });

  it('should accept optional customNotes field', async () => {
    // Arrange
    const data = { ...validPackageBooking, userId: FAKE_USER_ID, customNotes: 'Surprise anniversary setup' };

    // Act
    const booking = await PackageBooking.create(data);

    // Assert
    expect(booking.customNotes).toBe('Surprise anniversary setup');
  });
});
