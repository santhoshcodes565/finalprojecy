/**
 * Booking Test Fixtures — Sri Lakshmi Travels
 * Single source of truth for all booking-related test data.
 * Never use inline fake data in test files — always import from here.
 */

// ─── Valid Test User ──────────────────────────────────────────────────────────
const validUser = {
  name: 'Ravi Kumar',
  email: 'ravi.kumar@slttest.com',
  phone: '9876543210',
  password: 'Test@1234',
};

const adminUser = {
  name: 'Admin SLT',
  email: 'admin@slttest.com',
  phone: '9000000001',
  password: 'Admin@1234',
  role: 'admin',
};

// ─── Valid Car Booking Payload ────────────────────────────────────────────────
const validCarBooking = {
  carId: 'car-001-innova',
  fullName: 'Ravi Kumar',
  email: 'ravi.kumar@slttest.com',
  phone: '9876543210',
  tripType: 'round-trip',
  pickupLocation: 'Chennai Airport',
  dropLocation: 'Coimbatore Bus Stand',
  pickupDate: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
  pickupTime: '09:00 AM',
  returnDate: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
  carCategory: 'SUV',
  adults: 3,
  children: 1,
  specialRequests: 'Please arrange child seat.',
};

// ─── Valid Driver Booking Payload ─────────────────────────────────────────────
const validDriverBooking = {
  requestedDriverId: 'driver-001-rajesh',
  fullName: 'Priya Sharma',
  email: 'priya.sharma@slttest.com',
  phone: '9123456780',
  driverType: 'outstation',
  startDate: new Date(Date.now() + 86400000 * 5).toISOString(),
  endDate: new Date(Date.now() + 86400000 * 8).toISOString(),
  workingHours: '12',
  startCity: 'Chennai',
  specialInstructions: 'Require Tamil-speaking driver.',
};

// ─── Valid Package Booking Payload ────────────────────────────────────────────
const validPackageBooking = {
  packageId: 'pkg-001-ooty',
  fullName: 'Sundar Pichai',
  email: 'sundar@slttest.com',
  phone: '9988776655',
  travelDate: new Date(Date.now() + 86400000 * 14).toISOString(),
  adults: 2,
  children: 0,
  infants: 0,
  seniorCitizens: 0,
  hotelCategory: 'standard',
  roomType: 'double',
  mealPlan: 'breakfast',
  transportMode: 'car',
  pickupCity: 'Coimbatore',
  customNotes: 'Anniversary trip. Please arrange flowers.',
};

// ─── Invalid Payloads (edge cases) ───────────────────────────────────────────

// Invalid Indian phone numbers
const INVALID_PHONE_NUMBERS = [
  '12345',          // too short
  '00000000000',    // all zeros
  '1234567890',     // starts with 1
  '5876543210',     // starts with 5 (not a valid Indian mobile prefix)
  'abcdefghij',     // alpha
  '+9198765',       // incomplete with country code
];

// Past dates
const PAST_DATE = '2020-01-01T00:00:00.000Z';
const TOMORROW = new Date(Date.now() + 86400000).toISOString();
const THIRTY_DAYS_FROM_NOW = new Date(Date.now() + 86400000 * 30).toISOString();

// Car booking with past pickup date
const carBookingWithPastDate = {
  ...validCarBooking,
  pickupDate: PAST_DATE,
};

// Car booking with 0 adults
const carBookingWithZeroAdults = {
  ...validCarBooking,
  adults: 0,
};

// Car booking missing required fields
const incompleteCarBooking = {
  fullName: 'Ravi Kumar',
  // missing: email, phone, carId, tripType, pickupLocation, dropLocation, pickupDate, pickupTime, carCategory, adults
};

// Package booking with missing required fields
const incompletePackageBooking = {
  fullName: 'Test User',
  // missing: packageId, email, phone, travelDate, adults, hotelCategory, roomType, mealPlan, transportMode, pickupCity
};

module.exports = {
  validUser,
  adminUser,
  validCarBooking,
  validDriverBooking,
  validPackageBooking,
  carBookingWithPastDate,
  carBookingWithZeroAdults,
  incompleteCarBooking,
  incompletePackageBooking,
  INVALID_PHONE_NUMBERS,
  PAST_DATE,
  TOMORROW,
  THIRTY_DAYS_FROM_NOW,
};
