import { fileURLToPath } from 'node:url';

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // e2e/ holds Playwright specs (run via `npm run e2e:web`); keep Vitest out
    // of it so `vitest run` does not try to load `@playwright/test`.
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
});
