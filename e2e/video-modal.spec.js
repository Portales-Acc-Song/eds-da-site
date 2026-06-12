import { test, expect } from '@playwright/test';

const PATH = process.env.E2E_PATH || '/uemi/es/organos-gobierno';

test('a video card opens the modal and Escape closes it', async ({ page }) => {
  await page.goto(PATH);

  // .video-cards exists in the server HTML; skip only if the page has none
  test.skip(await page.locator('.video-cards').count() === 0, 'no video-cards block on this page');

  const playBtn = page.locator('.video-cards .play-btn').first();
  await playBtn.waitFor(); // wait for the lazy block to finish decorating
  await playBtn.click();
  await expect(page.locator('.modal')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.locator('.modal')).toHaveCount(0);
});
