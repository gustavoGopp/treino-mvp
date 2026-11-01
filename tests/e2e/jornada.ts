import { expect, type Page } from '@playwright/test';

// Percorre o onboarding pela interface, como uma pessoa faria. Usado pelos testes E2E e pelo GIF do devlog.
// Persona fictícia Ana (tests/personas): iniciante, halteres fixos de 1 a 12 kg e banco reto, 3 x 45 min, prioridade pernas e glúteos.
// Desde o R1, quem não tem condição nenhuma passa pela triagem com "Nenhuma se aplica a mim" e não digita nada.

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

/** Triagem de quem não tem nenhuma condição: o botão marca "não" em todas, e a pessoa confere e continua. */
export async function triagemNenhuma(page: Page) {
  await expect(page.getByRole('heading', { name: 'Antes de começar, 9 perguntas rápidas' })).toBeVisible();
  await page.getByRole('button', { name: 'Nenhuma se aplica a mim' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
}

/** Minutos por toque (30, 45, 60, 75, 90); outro valor vai em "Outro". */
export async function minutosPorTreino(page: Page, minutos: string) {
  const g = grupo(page, /Quantos minutos/);
  if (['30', '45', '60', '75', '90'].includes(minutos)) await g.getByLabel(`${minutos} min`, { exact: true }).check();
  else {
    await g.getByLabel('Outro', { exact: true }).check();
    await page.getByLabel('Outro: quantos minutos?').fill(minutos);
  }
}

export async function ana(
  page: Page,
  {
    pausa = 0,
    minutos = '45',
    divisao,
    equipamentoExtra,
    passarTriagem,
  }: { pausa?: number; minutos?: string; divisao?: string; equipamentoExtra?: (page: Page) => Promise<void>; passarTriagem?: (page: Page) => Promise<void> } = {},
) {
  const p = () => (pausa ? page.waitForTimeout(pausa) : Promise.resolve());
  await page.goto('/');
  await p();
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  if (passarTriagem) await passarTriagem(page);
  else await triagemNenhuma(page);
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
  await minutosPorTreino(page, minutos);
  await page.getByLabel('Pernas', { exact: true }).check();
  await page.getByLabel('Glúteos', { exact: true }).check();
  // Divisão: passo opcional, nada vem marcado (divisao.recomendacao).
  if (divisao) await grupo(page, /Como prefere dividir/).getByLabel(divisao).check();
  await p();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await page.getByLabel('Halteres fixos', { exact: true }).check();
  await grupo(page, 'O mais leve').getByLabel('1 kg', { exact: true }).check();
  await grupo(page, 'O mais pesado').getByLabel('12 kg', { exact: true }).check();
  await grupo(page, 'De quanto em quanto').getByLabel('1 kg', { exact: true }).check();
  await page.getByLabel('Banco reto', { exact: true }).check();
  if (equipamentoExtra) await equipamentoExtra(page);
  await p();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'O que evitar (opcional)' })).toBeVisible();
  await p();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
}
