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

  await expect(page.getByRole('heading', { name: 'Experiência', exact: true })).toBeVisible();
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await grupo(page, /confiança na técnica/).getByLabel(/^Sim/).check();
  await expect(page.getByRole('heading', { name: 'Seu nível: Iniciante' })).toBeVisible();
  await p();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Rotina', exact: true })).toBeVisible();
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await minutosPorTreino(page, minutos);
  await page.getByLabel('Pernas', { exact: true }).check();
  await page.getByLabel('Glúteos', { exact: true }).check();
  // A divisão saiu do cadastro (design v2, item E): é escolhida depois, em "Meus dados".
  await p();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Onde você treina?' })).toBeVisible();
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

// Sessão de textos (16/11/2026, decisão do Gustavo): a explicação saiu das telas e mora em "Entenda o treino" (Meus
// dados). Os ajudantes abaixo abrem a página e o bloco pedido; quem chama no meio de um fluxo volta depois com
// `page.goto(...)` (o treino em andamento fica guardado no aparelho).
/** Abre "Entenda o treino" e o bloco pedido (pelo começo do título), e devolve o bloco aberto. */
export async function entenda(page: Page, bloco: RegExp | string) {
  await page.goto('/entenda');
  await expect(page.getByRole('heading', { name: 'Entenda o treino' })).toBeVisible();
  const d = page.locator('main > details').filter({ has: page.locator(':scope > summary', { hasText: bloco }) });
  await d.locator(':scope > summary').click();
  return d;
}
/**
 * O motivo da carga sugerida de um exercício (antes: o "por quê?" ao lado de "1ª vez: comece leve." ou de "Hoje: 9 kg"),
 * em "Entenda o treino" → "Os exercícios". Devolve o bloco do exercício aberto.
 */
export async function porQueDaSugestao(page: Page, exercicio: RegExp | string = /./) {
  const bloco = await entenda(page, /^Os exercícios/);
  const ex = bloco.locator('details').filter({ has: page.locator(':scope > summary', { hasText: exercicio }) }).first();
  await ex.locator(':scope > summary').click();
  return ex;
}

// Início (redesign, lote 4): cada exercício da lista abre uma folha com o resto; "Sobre o programa" e os avisos também.
/** Abre a folha de um exercício da lista do dia e devolve a folha. */
export async function abrirExercicio(page: Page, nome: string | RegExp) {
  await page.getByRole('tabpanel').getByRole('button', { name: nome }).first().click();
  await folhaPronta(page);
  const folha = page.getByRole('dialog').last();
  // sessão de textos (16/11/2026): as alternativas e o "prefiro este" ficam a um toque; os motivos do exercício
  // saíram da folha e estão em "Entenda o treino" → "Os exercícios"
  const bloco = folha.locator('summary', { hasText: /^Alternativas \(\d+\)$/ });
  if (await bloco.count()) await bloco.click();
  return folha;
}
/**
 * "O seu programa" (o resumo, a fase, a avaliação, os avisos e o porquê), em "Entenda o treino", com os blocos de dentro
 * abertos. Até 16/11/2026 era a folha "Sobre o programa" do início.
 */
export async function sobreOPrograma(page: Page) {
  const bloco = await entenda(page, 'O seu programa');
  // "Como está o seu programa" chega num pedaço à parte
  await expect(bloco.getByText(/^(Está bom|Dá para melhorar)/)).toBeVisible();
  for (const rotulo of [/^Avisos \(\d+\)$/, /^Limites e observações \(\d+\)$/]) {
    const dentro = bloco.locator('summary', { hasText: rotulo });
    if (await dentro.count()) await dentro.click();
  }
  return bloco;
}

/** Abre um bloco que abre no lugar (um `summary`), pelo começo do rótulo. */
export async function abrirBloco(onde: Page | Locator, rotulo: RegExp | string) {
  await onde.locator('summary', { hasText: rotulo }).click();
}
/** Abre a folha dos avisos pelo "Ver" (ou "Mais N avisos") da linha do aviso e devolve a folha. */
export async function verAvisos(page: Page) {
  await page.locator('.aviso-linha').getByRole('button', { name: /^(Ver|Ajustar|Mais \d+ avisos?)$/ }).click();
  await folhaPronta(page);
  // com um bloco só (os ajustes), o título da folha é o do bloco
  return page.getByRole('dialog', { name: /^(Avisos|Ajustes possíveis)$/ });
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

