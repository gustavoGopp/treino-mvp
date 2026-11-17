import { expect, type Locator, type Page } from '@playwright/test';

// Percorre o onboarding pela interface, como uma pessoa faria. Usado pelos testes E2E e pelo GIF do devlog.
// Persona fictícia Ana (tests/personas): iniciante, halteres fixos de 1 a 12 kg e banco reto, 3 x 45 min, prioridade pernas e glúteos.
// Desde o R1, quem não tem condição nenhuma passa pela triagem com "Nenhuma se aplica a mim" e não digita nada.

export type Opcoes = { simEm?: string[]; pausa?: number };

const grupo = (page: Page | Locator, nome: string | RegExp) => page.getByRole('group', { name: nome });

/**
 * Triagem com alguma condição (lote 3 do redesign): "Sim, alguma (ou não tenho certeza)", marca as que valem (pelo texto
 * da condição ou da pergunta inteira) e toca em "Continuar". Se a tela pedir a confirmação das não marcadas, confirma;
 * se aparecer um erro (por exemplo, falta a região), para ali para o teste seguir.
 */
export async function triagem(page: Page, { simEm = [], pausa = 0 }: Opcoes = {}) {
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
  await page.getByRole('button', { name: 'Sim, alguma (ou não tenho certeza)' }).click();
  await expect(page.getByRole('heading', { name: 'Quais valem para você?' })).toBeVisible();
  for (const s of simEm) {
    await page.locator('label.opcao', { hasText: s }).first().getByRole('checkbox').check();
    if (pausa) await page.waitForTimeout(pausa / 3);
  }
  await page.getByRole('button', { name: 'Continuar' }).click();
  await confirmarNaoMarcadas(page);
}

/** Na tela do "sim": confirma que as não marcadas não valem, se o diálogo abrir (sem erro na tela). */
export async function confirmarNaoMarcadas(page: Page) {
  const dialogo = page.getByRole('dialog', { name: 'Nenhuma destas vale para você?' });
  await expect(dialogo.or(page.getByRole('alert')).or(page.getByRole('heading', { name: /Vamos pausar|Sua experiência/ })).first()).toBeVisible();
  if (await dialogo.isVisible()) {
    await folhaPronta(page);
    await dialogo.getByRole('button', { name: 'Isso, nenhuma destas' }).click();
  }
}

/** Triagem de quem não tem nenhuma condição: as 9 à vista numa lista, e um toque em "Não, nenhuma". */
export async function triagemNenhuma(page: Page) {
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'As 9 condições' }).getByRole('listitem')).toHaveCount(9);
  await page.getByRole('button', { name: 'Não, nenhuma' }).click();
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
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
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
  // lote 3 do redesign: item por item; marcar um item com detalhes abre a folha dele
  const halteres = await marcarItem(page, 'Halteres fixos');
  await grupo(halteres, 'O mais leve').getByLabel('1 kg', { exact: true }).check();
  await grupo(halteres, 'O mais pesado').getByLabel('12 kg', { exact: true }).check();
  await grupo(halteres, 'De quanto em quanto').getByLabel('1 kg', { exact: true }).check();
  await pronto(page);
  await marcarItem(page, 'Banco reto');
  if (equipamentoExtra) await equipamentoExtra(page);
  await p();
  // lote 3 do redesign: o "Tudo certo?" saiu; o equipamento gera o programa
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  if (divisao) await escolherDivisao(page, divisao);
}

/** Escolhe a divisão em "Meus dados" → "Rotina e divisão" e aceita a versão nova do programa. */
export async function escolherDivisao(page: Page, divisao: string) {
  await page.goto('/dados');
  await page.getByRole('link', { name: 'Rotina e divisão' }).click();
  await grupo(page, /Como prefere dividir/).getByLabel(divisao).check();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  const atualizar = page.getByRole('button', { name: 'Atualizar', exact: true });
  if (await atualizar.isVisible()) await atualizar.click();
}

// Treino (redesign, lote 2): anterior, próximo, trocar e terminar ficam no "⋯" do exercício; terminar pede confirmação.
/** Espera a folha aberta terminar de subir (200 ms), para o toque não cair no meio do movimento. */
export async function folhaPronta(page: Page) {
  await page.locator('.folha').last().evaluate((e) => Promise.all(e.getAnimations().map((a) => a.finished)));
}
/** Abre o "⋯" (Mais opções) do exercício e devolve a folha. */
export async function maisOpcoes(page: Page) {
  await page.getByRole('button', { name: /^Mais opções/ }).click();
  await folhaPronta(page);
  return page.getByRole('dialog', { name: 'Mais opções' });
}
/** Termina o treino pelo "⋯", confirmando (sem série, "Guardar mesmo assim"; registro.treino-feito). */
export async function terminarTreino(page: Page) {
  await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
  await folhaPronta(page);
  await page.getByRole('dialog', { name: 'Terminar o treino agora?' }).getByRole('button', { name: /^(Terminar o treino|Guardar mesmo assim)$/ }).click();
}
/** Abre a folha de troca do exercício pelo "⋯". */
export async function abrirTrocar(page: Page) {
  await (await maisOpcoes(page)).getByRole('button', { name: 'Trocar exercício' }).click();
  await folhaPronta(page);
  return page.getByRole('region', { name: 'Trocar exercício' });
}
/** Vai ao próximo exercício: pelo botão que aparece quando o exercício acabou, ou pelo "⋯". */
export async function proximoExercicio(page: Page) {
  const fora = page.getByRole('navigation', { name: 'Exercícios' }).getByRole('button', { name: 'Próximo exercício' });
  if (await fora.isVisible()) return fora.click();
  await (await maisOpcoes(page)).getByRole('button', { name: 'Próximo', exact: true }).click();
}

/** Abre o "por quê?" da linha da sugestão do dia (acima do painel da série) e devolve a folha, com o motivo e o selo. */
export async function porQueDaSugestao(page: Page) {
  await page.locator('p.dica').filter({ has: page.getByRole('button', { name: 'por quê?' }) }).first().getByRole('button', { name: 'por quê?' }).click();
  return page.getByRole('dialog', { name: 'Por quê' });
}

// Início (redesign, lote 4): cada exercício da lista abre uma folha com o resto; "Sobre o programa" e os avisos também.
/** Abre a folha de um exercício da lista do dia e devolve a folha. */
export async function abrirExercicio(page: Page, nome: string | RegExp) {
  await page.getByRole('tabpanel').getByRole('button', { name: nome }).first().click();
  await folhaPronta(page);
  const folha = page.getByRole('dialog').last();
  // estudo dos textos (13/11/2026): os motivos ficam a um toque, num bloco que abre no lugar
  const porque = folha.locator('summary', { hasText: /^Por que este exercício/ });
  if (await porque.count()) await porque.click();
  return folha;
}
/** Abre "Sobre o programa" (o resumo, a fase, os avisos do programa e o porquê) e devolve a folha. */
export async function sobreOPrograma(page: Page) {
  await page.getByRole('button', { name: 'Sobre o programa' }).click();
  await folhaPronta(page);
  const folha = page.getByRole('dialog', { name: 'Sobre o programa' });
  // estudo dos textos (13/11/2026): os avisos e os limites ficam a um toque, em blocos que abrem no lugar
  for (const rotulo of [/^Avisos \(\d+\)$/, /^Limites e observações \(\d+\)$/]) {
    const bloco = folha.locator('summary', { hasText: rotulo });
    if (await bloco.count()) await bloco.click();
  }
  return folha;
}

/** Abre um bloco que abre no lugar (um `summary`), pelo começo do rótulo. */
export async function abrirBloco(onde: Page | Locator, rotulo: RegExp | string) {
  await onde.locator('summary', { hasText: rotulo }).click();
}
/** Abre a folha dos avisos pelo "Ver" (ou "Mais N avisos") da linha do aviso e devolve a folha. */
export async function verAvisos(page: Page) {
  await page.locator('.aviso-linha').getByRole('button', { name: /^(Ver|Mais \d+ avisos?)$/ }).click();
  await folhaPronta(page);
  return page.getByRole('dialog', { name: 'Avisos' });
}

// Equipamento (redesign, lote 3): o lugar primeiro; "Item por item" abre os marcados, a busca, as categorias e a grade.
/** Abre a lista item por item, se ainda estiver fechada. */
export async function abrirLista(page: Page) {
  const b = page.getByRole('button', { name: 'Item por item' });
  if ((await b.getAttribute('aria-expanded')) !== 'true') await b.click();
}
/**
 * Marca (ou desmarca) um item pela grade, procurando a categoria pelos chips (sem digitar). Se o item tem detalhes, a
 * folha dele abre: devolve a folha, pronta para tocar.
 */
export async function marcarItem(page: Page, nome: string, marcado = true) {
  await abrirLista(page);
  const caixa = page.locator('.grade-2').getByLabel(nome, { exact: true });
  const chips = page.getByRole('group', { name: 'Categorias' }).getByRole('button');
  for (let i = 0; i < (await chips.count()) && !(await caixa.count()); i++) await chips.nth(i).click();
  await caixa.setChecked(marcado);
  const folha = page.getByRole('dialog', { name: nome });
  if (marcado && (await folha.count())) await folhaPronta(page);
  return folha;
}
/** Abre os detalhes de um item marcado ("Mudar") e devolve a folha. */
export async function detalhesDo(page: Page, nome: string) {
  await abrirLista(page);
  await page.getByRole('button', { name: `Mudar ${nome}` }).click();
  await folhaPronta(page);
  return page.getByRole('dialog', { name: nome });
}
/** Fecha a folha de detalhes do item ("Pronto"). */
export async function pronto(page: Page) {
  await page.getByRole('dialog').last().getByRole('button', { name: 'Pronto' }).click();
}

