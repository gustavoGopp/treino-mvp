import { mkdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { ana } from '../../../../tests/e2e/jornada';

// Teste de fumaça do agente 5: o app em 4173 responde, a jornada da Ana chega ao programa e a letra carrega.
const DIR = 'reports/design/redesign/agente-5/fumaca';

test('programa da Ana', async ({ page }) => {
  mkdirSync(DIR, { recursive: true });
  await page.clock.setFixedTime(new Date('2026-11-05T15:00:00.000Z'));
  await ana(page);
  await page.evaluate(() => document.fonts.ready);
  const fontes = await page.evaluate(() => Array.from(document.fonts).map((f) => `${f.family} ${f.weight} ${f.status}`));
  console.log('fontes:', fontes.join(' | '));
  await page.screenshot({ path: `${DIR}/${test.info().project.name}-programa.png` });
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
});
