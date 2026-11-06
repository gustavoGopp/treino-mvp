import { expect, type Page } from '@playwright/test';

// Percorre o onboarding pela interface, como uma pessoa faria. Usado pelos testes E2E e pelo GIF do devlog.
// Persona fictícia Ana (tests/personas): iniciante, halteres fixos de 1 a 12 kg e banco reto, 3 x 45 min, prioridade pernas e glúteos.
// Desde o R1, quem não tem condição nenhuma passa pela triagem com "Nenhuma se aplica a mim" e não digita nada.

export type Opcoes = { simEm?: string[]; pausa?: number };

const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });

export async function triagem(page: Page, { simEm = [], pausa = 0 }: Opcoes = {}) {
  await expect(page.getByRole('heading', { name: 'Antes de começar, 9 perguntas rápidas' })).toBeVisible();
  // Design v2: a triagem abre na lista das 9; quem tem alguma condição responde uma a uma.
  await page.getByRole('button', { name: 'Sim, alguma vale' }).click();
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

/** Triagem de quem não tem nenhuma condição: as 9 à vista numa lista, e um toque em "Nenhuma vale para mim". */
export async function triagemNenhuma(page: Page) {
  await expect(page.getByRole('heading', { name: 'Antes de começar, 9 perguntas rápidas' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'As 9 condições' }).getByRole('listitem')).toHaveCount(9);
  await page.getByRole('button', { name: 'Nenhuma vale para mim' }).click();
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
  // A divisão saiu do cadastro (design v2, item E): é escolhida depois, em "Meus dados".
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

  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  await p();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  if (divisao) await escolherDivisao(page, divisao);
}

/** Escolhe a divisão em "Meus dados" → "Mudar a rotina ou a divisão" e aceita a versão nova do programa. */
export async function escolherDivisao(page: Page, divisao: string) {
  await page.goto('/dados');
  await page.getByRole('link', { name: 'Mudar a rotina ou a divisão' }).click();
  await grupo(page, /Como prefere dividir/).getByLabel(divisao).check();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  const atualizar = page.getByRole('button', { name: 'Atualizar', exact: true });
  if (await atualizar.isVisible()) await atualizar.click();
}

// Treino (redesign, lote 2): anterior, próximo, trocar e terminar ficam no "⋯" do exercício; terminar pede confirmação.
/** Abre o "⋯" (Mais opções) do exercício e devolve a folha. */
export async function maisOpcoes(page: Page) {
  await page.getByRole('button', { name: /^Mais opções/ }).click();
  return page.getByRole('dialog', { name: 'Mais opções' });
}
/** Termina o treino pelo "⋯", confirmando. */
export async function terminarTreino(page: Page) {
  await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
  await page.getByRole('dialog', { name: 'Terminar o treino agora?' }).getByRole('button', { name: 'Terminar o treino', exact: true }).click();
}
/** Abre a folha de troca do exercício pelo "⋯". */
export async function abrirTrocar(page: Page) {
  await (await maisOpcoes(page)).getByRole('button', { name: 'Trocar exercício' }).click();
  return page.getByRole('region', { name: 'Trocar exercício' });
}
/** Vai ao próximo exercício: pelo botão que aparece quando o exercício acabou, ou pelo "⋯". */
export async function proximoExercicio(page: Page) {
  const fora = page.getByRole('navigation', { name: 'Exercícios' }).getByRole('button', { name: 'Próximo ›' });
  if (await fora.isVisible()) return fora.click();
  await (await maisOpcoes(page)).getByRole('button', { name: 'Próximo ›' }).click();
}
