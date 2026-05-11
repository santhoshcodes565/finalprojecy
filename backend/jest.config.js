/**
 * jest.config.js — Sri Lakshmi Travels Backend
 * Configures Jest for Node.js + mongodb-memory-server testing.
 */
module.exports = {
  testEnvironment: 'node',

  // Find all .test.js files inside the tests/ directory
  testMatch: ['**/tests/**/*.test.js'],

  // Global setup (env vars + console suppression)
  setupFilesAfterEnv: ['./tests/setup.js'],

  // Give mongodb-memory-server enough time to start
  testTimeout: 20000,

  // Force Jest to exit after all tests — prevents hanging from async notification calls
  forceExit: true,

  // Coverage thresholds (per TESTING_SKILL.md §16)
  coverageThreshold: {
    global: {
      lines:     70,
      functions: 70,
      branches:  65,
    },
  },

  // Collect coverage from meaningful source files only
  collectCoverageFrom: [
    'routes/**/*.js',
    'models/**/*.js',
    'middleware/**/*.js',
    '!**/node_modules/**',
  ],

  // Don't show individual test names unless --verbose is passed
  verbose: false,
};
