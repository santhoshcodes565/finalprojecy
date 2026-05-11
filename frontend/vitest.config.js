/**
 * vitest.config.js — Sri Lakshmi Travels Frontend
 * Configures Vitest for React 18 + Vite + jsdom unit testing.
 */
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
        lines:     70,
        functions: 70,
        branches:  65,
      },
    },
    include: ['tests/unit/**/*.test.{js,jsx}'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
});
