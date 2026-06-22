import { expect, test } from '@playwright/test';

// A whole line shaped like `some.nested.i18nKey` means a translation leaked.
const RAW_I18N_KEY = /^[a-z][a-zA-Z0-9]+(\.[a-z][a-zA-Z0-9]+){1,}$/;

type Route = { path: string; expect: string | RegExp };

const ROUTES: Route[] = [
  { path: '/', expect: /pregnancy/i },
  { path: '/today', expect: 'Today' },
  { path: '/childbirth', expect: 'Contractions' },
  { path: '/settings', expect: 'Settings' },
];

for (const route of ROUTES) {
  test(`renders ${route.path} with translated content and no errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text());
    });
    page.on('pageerror', (e) => pageErrors.push(e.message));

    await page.goto(route.path, { waitUntil: 'networkidle' });

    await expect(page.locator('body')).toContainText(route.expect, { timeout: 15_000 });

    const text = await page.locator('body').innerText();
    const leakedKeys = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => RAW_I18N_KEY.test(line));
    expect(leakedKeys, `raw i18n keys rendered on ${route.path}`).toEqual([]);

    expect(pageErrors, `uncaught errors on ${route.path}`).toEqual([]);
    expect(consoleErrors, `console errors on ${route.path}`).toEqual([]);
  });
}

test('contraction timer starts, ticks and navigates between tabs', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));

  await page.goto('/contractions', { waitUntil: 'networkidle' });

  const start = page.getByText('Start', { exact: true }).first();
  await expect(start).toBeVisible({ timeout: 15_000 });

  // Exercises the Reanimated AnimatedPressable + zustand timer store.
  await start.click();
  await expect(page.getByText('Stop', { exact: true }).first()).toBeVisible({ timeout: 5_000 });
  await expect(page.locator('body')).toContainText(/00:0[1-9]/, { timeout: 5_000 });

  await page.getByText('Timer', { exact: true }).first().click();
  await page.waitForTimeout(800);

  expect(pageErrors, 'uncaught errors during timer interaction').toEqual([]);
});
