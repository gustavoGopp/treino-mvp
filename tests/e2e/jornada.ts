import { expect, type Page } from '@playwright/test';

// Percorre o onboarding pela interface, como uma pessoa faria. Usado pelos testes E2E e pelo GIF do devlog.
// Persona fictícia Ana (tests/personas): iniciante, halteres fixos de 1 a 12 kg e banco reto, 3 x 45 min, prioridade pernas e glúteos.
// Desde o R1, quem não tem condição nenhuma passa pela triagem com "Nenhuma se aplica a mim" e não digita nada.

export type Opcoes = { simEm?: string[]; pausa?: number };

const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });

export async function triagem(page: Page, { simEm = [], pausa = 0 }: Opcoes = {}) {
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
  // A triagem abre na lista das 9; quem tem alguma condição responde uma a uma.
  await page.getByRole('button', { name: 'Sim, alguma destas vale' }).click();
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

/** Triagem de quem não tem nenhuma condição: as 9 à vista numa lista, e um toque em "Não tenho nenhuma destas". */
export async function triagemNenhuma(page: Page) {
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
  // Design v3: as 9 em 3 grupos, todas à vista, e o botão só no fim da lista.
  for (const g of ['Coração e circulação', 'Doenças e remédios', 'Agora ou recente'])
    await expect(page.getByRole('region', { name: g }).getByRole('listitem')).toHaveCount(3);
  await page.getByRole('button', { name: 'Não tenho nenhuma destas' }).click();
}

/** Minutos por toque (30, 45, 60, 75, 90), que responde e segue; outro valor vai em "Outro" e pede "Continuar". */
export async function minutosPorTreino(page: Page, minutos: string) {
  const g = grupo(page, /Quantos minutos/);
  if (['30', '45', '60', '75', '90'].includes(minutos)) await g.getByLabel(`${minutos} min`, { exact: true }).check();
  else {
    await g.getByLabel('Outro', { exact: true }).check();
    await page.getByLabel('Outro: quantos minutos?').fill(minutos);
    await page.getByRole('button', { name: 'Continuar' }).click();
  }
}

/** No "Tudo certo?": a linha opcional "Prioridade" abre os grupos; "Salvar" volta ao resumo (design v3, C4). */
export async function prioridades(page: Page, grupos: string[]) {
  await page.getByRole('link', { name: /Prioridade \(opcional\)/ }).click();
  for (const g of grupos) await page.getByLabel(g, { exact: true }).check();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
}

export async function ana(
  page: Page,
  {
    pausa = 0,
    minutos = '45',
    divisao,
    equipamentoExtra,
    passarTriagem,
  }: {
    pausa?: number;
    minutos?: string;
    divisao?: string;
    equipamentoExtra?: (page: Page) => Promise<void>;
    passarTriagem?: (page: Page) => Promise<void>;
  } = {},
) {
  const p = () => (pausa ? page.waitForTimeout(pausa) : Promise.resolve());
  await page.goto('/');
  await p();
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  if (passarTriagem) await passarTriagem(page);
  else await triagemNenhuma(page);
  await p();

  // Design v3: uma pergunta por tela, e o toque responde e segue. Com menos de 6 meses de treino, a técnica não muda o
  // nível e não é perguntada; o nível (iniciante, sem outro para escolher) vai direto para a rotina.
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await p();

  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await minutosPorTreino(page, minutos);
  // A divisão saiu do cadastro (design v2, item E) e a prioridade virou uma linha do "Tudo certo?" (design v3, C4).
  await p();

  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  // Design v3 (C5): 1º o lugar; a Ana monta a lista item por item.
  await page.getByRole('button', { name: 'Monto a lista item por item' }).click();
  await page.getByLabel('Halteres fixos', { exact: true }).check();
  await grupo(page, 'O mais leve').getByLabel('1 kg', { exact: true }).check();
  await grupo(page, 'O mais pesado').getByLabel('12 kg', { exact: true }).check();
  await grupo(page, 'De quanto em quanto').getByLabel('1 kg', { exact: true }).check();
  await page.getByLabel('Banco reto', { exact: true }).check();
  if (equipamentoExtra) await equipamentoExtra(page);
  await p();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  await prioridades(page, ['Pernas', 'Glúteos']);
  await p();
  await page.getByRole('button', { name: 'Montar meu treino' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  if (divisao) await escolherDivisao(page, divisao);
}

/** Escolhe a divisão em "Meus dados" → "Mudar a rotina ou a divisão" e aceita a versão nova do programa. */
export async function escolherDivisao(page: Page, divisao: string) {
  await page.goto('/dados');
  await page.getByRole('link', { name: 'Mudar a rotina ou a divisão' }).click();
  await grupo(page, /Como prefere dividir/)
    .getByLabel(divisao)
    .check();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  const atualizar = page.getByRole('button', {
    name: 'Atualizar',
    exact: true,
  });
  if (await atualizar.isVisible()) await atualizar.click();
}
