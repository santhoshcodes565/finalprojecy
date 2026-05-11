/**
 * Backend test setup — runs before every Jest test suite.
 * - Silences expected console.error noise in test output
 * - Sets JWT_SECRET for signing test tokens without .env dependency
 */

process.env.JWT_SECRET = 'slt-test-secret-key-do-not-use-in-production';
process.env.NODE_ENV   = 'test';
process.env.READ_ONLY_MODE = 'false';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore?.();
});
