import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT || 8099);
const BASE_URL = `http://localhost:${PORT}`;

// webServer serves a pre-built `dist/` — run `npm run e2e:web` (build + test).
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: `node e2e/serve.mjs dist`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
