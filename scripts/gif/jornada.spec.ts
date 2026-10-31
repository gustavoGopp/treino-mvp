import { test } from '@playwright/test';
import { ana } from '../../tests/e2e/jornada';

// Pausas curtas entre os passos para o GIF ficar legível.
test('jornada da Ana', async ({ page }) => {
  await ana(page, { pausa: 700 });
  await page.waitForTimeout(1200);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1500);
});
