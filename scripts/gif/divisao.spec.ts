import { expect, test } from '@playwright/test';
import { triagem } from '../../tests/e2e/jornada';

// Print da escolha da divisão para o devlog do R0b (persona fictícia: iniciante, 4 dias de 60 min).
// Uso: npx playwright test -c scripts/gif/playwright.config.ts divisao
test('divisão', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await triagem(page);
  await page.getByRole('group', { name: /sem parar/ }).getByLabel('De 6 meses a 2 anos').check();
  await page.getByRole('group', { name: /treinando agora/ }).getByLabel(/^Estou treinando/).check();
  await page.getByRole('group', { name: /confiança na técnica/ }).getByLabel(/^Sim/).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('group', { name: /Quantos dias/ }).getByLabel('4 dias').check();
  await page.getByLabel('Quantos minutos por treino?').fill('60');
  const divisao = page.getByRole('group', { name: /Como prefere dividir/ });
  await expect(divisao).toBeVisible();
  await divisao.scrollIntoViewIfNeeded();
  await divisao.screenshot({ path: 'docs/img/r0b-divisao.png' });
});
