/**
 * E2E Test Fixtures — Sri Lakshmi Travels (Frontend/Playwright)
 * Single source of truth for all E2E booking flow test data.
 */

export const TEST_USER = {
  name:     'Ravi Kumar',
  email:    'ravi.kumar@slttest.com',
  phone:    '9876543210',
  password: 'Test@1234',
};

export const TEST_CAR_BOOKING = {
  fullName:       'Ravi Kumar',
  phone:          '9876543210',
  email:          'ravi.kumar@slttest.com',
  pickupAddress:  'Chennai Airport, Terminal 2',
  dropAddress:    'Coimbatore KSRTC Bus Stand',
  startDate:      getFutureDate(7),   // 7 days from today
  endDate:        getFutureDate(10),  // 10 days from today
  passengers:     '3',
  specialRequests: 'Please arrange child seat and extra luggage space.',
};

export const TEST_DRIVER_BOOKING = {
  fullName:       'Priya Sharma',
  phone:          '9123456780',
  email:          'priya.sharma@slttest.com',
  pickupAddress:  'Madurai Railway Station',
  startDate:      getFutureDate(5),
  endDate:        getFutureDate(8),
  passengers:     '2',
};

export const TEST_PACKAGE_BOOKING = {
  fullName:       'Sundar Rajan',
  phone:          '9988776655',
  email:          'sundar.rajan@slttest.com',
  pickupAddress:  'Coimbatore City',
  startDate:      getFutureDate(14),
  passengers:     '2',
};

// Invalid inputs for validation testing
export const INVALID_PHONE_NUMBERS = [
  '12345',
  '0000000000',
  'abcdefghij',
];

export const PAST_DATE = '2020-01-01';

// Helper — returns a future date string in YYYY-MM-DD format
function getFutureDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}
