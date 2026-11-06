import { expect, test } from '@playwright/test';
import { grupo } from './instrumentos';

// Agente 2: a tela seguinte abre no topo? (o app não volta a rolagem ao topo ao trocar de tela no cadastro)
test('a rolagem ao trocar de tela no cadastro', async ({ page }) => {
  const r: Record<string, number> = {};
  await page.goto('/');
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await expect(page.getByRole('heading', { name: 'Antes de começar, 9 perguntas rápidas' })).toBeVisible();
  r.triagemAbreEm = await page.evaluate(() => Math.round(scrollY));
  await page.getByRole('button', { name: 'Nenhuma vale para mim' }).click();
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  r.nivelAbreEm = await page.evaluate(() => Math.round(scrollY));
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await grupo(page, /confiança na técnica/).getByLabel(/^Sim/).check();
  await page.waitForTimeout(600);
  r.nivelAntesDeSair = await page.evaluate(() => Math.round(scrollY));
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  r.rotinaAbreEm = await page.evaluate(() => Math.round(scrollY));
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await grupo(page, /Quantos minutos/).getByLabel('45 min', { exact: true }).check();
  await page.waitForTimeout(600);
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  r.rotinaAntesDeSair = await page.evaluate(() => Math.round(scrollY));
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  r.equipamentoAbreEm = await page.evaluate(() => Math.round(scrollY));
  r.alturaDaTela = await page.evaluate(() => innerHeight);
  console.log(JSON.stringify(r));
});
