import { test } from '@playwright/test';
import { ana } from '../../tests/e2e/jornada';

// GIF do M5: um treino com o app (persona fictícia Ana).
test('sessão da Ana', async ({ page }) => {
  await ana(page);
  const p = (ms = 700) => page.waitForTimeout(ms);
  await page.getByRole('button', { name: 'Começar o treino Corpo todo A' }).click();
  await p(1200);
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await p();
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await p(400);
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await p();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await p(2200);
  await page.getByRole('button', { name: 'Pular' }).click();
  await p();
  await page.getByRole('radio', { name: '1', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await p(1200);
  await page.getByRole('button', { name: 'Pular' }).click();
  await p(500);
  await page.getByRole('button', { name: 'Terminar treino' }).first().click();
  await p(2500);
});
