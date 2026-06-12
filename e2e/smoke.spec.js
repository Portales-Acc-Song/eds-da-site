import { test, expect } from '@playwright/test';

const PATH = process.env.E2E_PATH || '/uemi/es/organos-gobierno';

test('loads the page and decorates its blocks', async ({ page }) => {
  const response = await page.goto(PATH);
  expect(response.status()).toBeLessThan(400);

  // EDS lifecycle: <body> gets the "appear" class once the page is ready
  await expect(page.locator('body')).toHaveClass(/appear/);

  // at least one block is decorated (data-block-status="loaded")
  await expect(page.locator('[data-block-status="loaded"]').first()).toBeVisible();
});
