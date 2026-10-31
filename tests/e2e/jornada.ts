import { expect, type Page } from '@playwright/test';

// Percorre o onboarding pela interface, como uma pessoa faria. Usado pelos testes E2E e pelo GIF do devlog.
// Persona fictícia Ana (tests/personas): iniciante, halteres fixos de 1 a 12 kg e banco reto, 3 x 50 min, prioridade pernas e glúteos.

export type Opcoes = { simEm?: string[]; pausa?: number };

const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });

export async function triagem(page: Page, { simEm = [], pausa = 0 }: Opcoes = {}) {
  await expect(page.getByRole('heading', { name: 'Antes de começar, 9 perguntas rápidas' })).toBeVisible();
  const grupos = page.locator('fieldset').filter({ has: page.getByRole('radio', { name: 'Sim' }) });
  const n = await grupos.count();
  for (let i = 0; i < n; i++) {
    const g = grupos.nth(i);
    const texto = (await g.locator('legend').innerText()).trim();
    const sim = simEm.some((s) => texto.includes(s));
    await g.getByRole('radio', { name: sim ? 'Sim' : 'Não', exact: true }).check();
    if (pausa) await page.waitForTimeout(pausa / 3);
  }
  await page.getByRole('button', { name: 'Continuar' }).click();
}

export async function ana(page: Page, { pausa = 0 }: { pausa?: number } = {}) {
  const p = () => (pausa ? page.waitForTimeout(pausa) : Promise.resolve());
  await page.goto('/');
  await p();
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await triagem(page, { pausa });
  await p();

  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await grupo(page, /confiança na técnica/).getByLabel(/^Sim/).check();
  await expect(page.getByRole('heading', { name: 'Seu nível: Iniciante' })).toBeVisible();
  await p();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await page.getByLabel('Quantos minutos por treino?').fill('50');
  await page.getByLabel('Pernas').check();
  await page.getByLabel('Glúteos').check();
  await p();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await page.getByLabel('Halteres fixos').check();
  await page.getByLabel('Mais leve').fill('1');
  await page.getByLabel('Mais pesado').fill('12');
  await page.getByLabel('De quanto em quanto').fill('1');
  await page.getByLabel('Banco reto').check();
  await p();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Dores e o que evitar' })).toBeVisible();
  await grupo(page, /dor em alguma articulação/).getByLabel('Não').check();
  await p();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu programa', exact: true })).toBeVisible();
}
