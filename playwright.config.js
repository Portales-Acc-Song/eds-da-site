/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env node */
import { defineConfig } from '@playwright/test';

// Target: dev server by default (`aem up`); override with E2E_BASE_URL to hit the preview.
export default defineConfig({
  testDir: 'e2e',
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    headless: true,
  },
});
