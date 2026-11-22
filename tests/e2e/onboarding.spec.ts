import { expect, test, type Page } from '@playwright/test';
import { abrirExercicio, abrirLista, ana, confirmarNaoMarcadas, detalhesDo, folhaPronta, marcarItem, minutosPorTreino, porQueDaSugestao, pronto, sobreOPrograma, triagem, triagemNenhuma, verAvisos } from './jornada';

test('do zero ao programa em menos de 5 minutos (persona Ana)', async ({ page }) => {
  const inicio = Date.now();
  await ana(page);
  expect(Date.now() - inicio).toBeLessThan(5 * 60_000);

  // Vai direto ao treino: abas por dia e a lista com séries × repetições; o resto fica na folha de cada exercício.
  for (const dia of ['Corpo todo A', 'Corpo todo B', 'Corpo todo C']) await expect(page.getByRole('tab', { name: dia, exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toHaveAttribute('aria-selected', 'true');
  const painel = page.getByRole('tabpanel');
  // Pacote 2 (15/11/2026): o 1º do Corpo todo A é o goblet (dois lados, 8–15); antes era o búlgaro ("8–12 cada lado").
  // O "cada lado" segue conferido no exercício de um lado só do dia, a remada unilateral.
  await expect(painel.locator('.series').first()).toHaveText(/^\d × 8–15$/);
  await expect(painel.getByRole('button', { name: /Remada unilateral com halter apoiada no banco/ }).locator('.series')).toHaveText(/^\d × 8–12 cada lado$/);
  // Exercício com animação mostra a imagem.
  await expect(painel.locator('.miniatura svg').first()).toBeVisible();
  // Sem animação aprovada: "guia em texto", nunca uma animação improvisada. A flexão de joelho deslizante ganhou a
  // animação em 04/11/2026 e a ponte com halter em 10/11/2026 (R5-anim, lote 2): o dia A não tem mais cartão; o B tem
  // um (o crucifixo invertido sentado), conferido abaixo.
  await expect(painel.locator('.miniatura.vazia')).toHaveCount(0);
  // Semana 1 (fase de aprendizado da iniciante): RIR 3–4. Sessão de textos (16/11/2026): o porquê do exercício, com o
  // selo de evidência, saiu da folha e está em "Entenda o treino" → "Os exercícios" (conferido no fim deste teste).
  let folha = await abrirExercicio(page, /Agachamento goblet/);
  await expect(folha.locator('.sub-rx')).toContainText('RIR 3–4');
  await expect(folha.locator('.selo, .porque')).toHaveCount(0);
  await folha.getByRole('button', { name: 'Fechar' }).click();
  // Outro dia.
  await page.getByRole('tab', { name: 'Corpo todo B', exact: true }).click();
  await expect(painel.locator('.miniatura.vazia')).toHaveCount(1);
  // O stiff (bilateral) no B desde a sessão de equipamento mínimo: o stiff unilateral saiu para a flexão deslizante no A.
  await expect(painel.getByRole('button', { name: /Stiff com halteres/ })).toBeVisible();
  await page.getByRole('tab', { name: 'Corpo todo A', exact: true }).click();
  folha = await abrirExercicio(page, /Agachamento goblet/);
  await folha.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\/goblet\?de=programa&dia=corpo-a&ex=goblet$/);
  await expect(page.getByRole('heading', { name: 'Agachamento goblet com calcanhar elevado' })).toBeVisible();

  // Avisos de meta por músculo em "Entenda o treino" → "O seu programa" (era a folha "Sobre o programa").
  const sobre = await sobreOPrograma(page);
  await expect(sobre.getByText(/Abaixo da meta/).first()).toBeVisible();
  // R5b: "Como está o seu programa", a saída do avaliador, com o selo e o próximo passo de cada achado.
  await expect(sobre.getByRole('heading', { name: 'Como está o seu programa' })).toBeAttached();
  await expect(sobre.getByText(/^(Está bom|Dá para melhorar)/)).toBeVisible();
  await expect(sobre.getByText(/Foco abaixo da meta: .* Para chegar lá, mais minutos, mais dias ou menos grupos de foco\./)).toBeVisible();
  await expect(sobre.locator('.selo').first()).toBeVisible();
  // R5b: o porquê do exercício começa pelo específico (a vaga, o músculo, o foco, as séries da semana e por que ganhou).
  const exercicio = await porQueDaSugestao(page, 'Agachamento goblet com calcanhar elevado');
  await expect(exercicio.getByText(/^Vaga de agachar, para o quadríceps, o seu foco: \d+ das \d+ séries da semana/)).toBeVisible();
  await expect(exercicio.locator('.selo').first()).toBeVisible();
});

test('divisão: escolhida em Meus dados, sem nada marcado, com a recomendada explicada, e a escolha vira o programa', async ({ page }) => {
  await ana(page, { minutos: '60' });
  // Saiu do cadastro (design v2, item E): no cadastro não aparece.
  await page.goto('/dados');
  await page.getByRole('link', { name: 'Rotina e divisão' }).click();
  const divisao = page.getByRole('group', { name: /Como prefere dividir/ });
  await expect(divisao).toBeVisible();
  for (const r of await divisao.getByRole('radio').all()) await expect(r).not.toBeChecked();
  await expect(divisao.getByText('Recomendada', { exact: true })).toBeVisible();
  await expect(divisao.getByText(/cerca de 8 exercícios por treino/).first()).toBeVisible();
  // Iniciante: as metas cabem em 1 sessão por músculo, então a clássica aparece, com o aviso das faltas.
  await expect(divisao.getByText(/faltar a um dia tira a semana inteira/)).toBeVisible();
  await divisao.getByLabel(/Superior\/Inferior \+ Corpo todo/).check();
  // Mudar os dias limpa a escolha (a divisão é de um número de dias).
  await page.getByRole('group', { name: /Quantos dias/ }).getByLabel('4 dias').check();
  for (const r of await divisao.getByRole('radio').all()) await expect(r).not.toBeChecked();
  await page.getByRole('group', { name: /Quantos dias/ }).getByLabel('3 dias').check();
  await divisao.getByLabel(/Superior\/Inferior \+ Corpo todo/).check();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('button', { name: 'Atualizar', exact: true }).click();
  for (const dia of ['Superior A', 'Inferior A', 'Corpo todo']) await expect(page.getByRole('tab', { name: dia, exact: true })).toBeVisible();
  // A escolha fica salva na rotina.
  await page.goto('/comecar/rotina?de=dados');
  await expect(page.getByRole('group', { name: /Como prefere dividir/ }).getByLabel(/Superior\/Inferior \+ Corpo todo/)).toBeChecked();
});

test('triagem com "sim" bloqueia, e confirmar a liberação desbloqueia', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await triagem(page, { simEm: ['coração'] });

  await expect(page.getByRole('heading', { name: 'Vamos pausar o programa automático' })).toBeVisible();
  const continuar = page.getByRole('button', { name: 'Continuar com a liberação' });
  await expect(continuar).toBeDisabled();
  await page.reload();
  // Sem a confirmação, nada foi salvo: a triagem continua pendente.
  await expect(page).toHaveURL(/\/comecar\/triagem$/);
  await triagem(page, { simEm: ['coração'] });
  await page.getByLabel('Confirmo que fui avaliado e liberado').check();
  await continuar.click();
  await expect(page.getByRole('heading', { name: 'Experiência', exact: true })).toBeVisible();
});

test('lote 3: a saúde em uma pergunta mostra as perguntas inteiras a um toque, e "sim" sem nada marcado pede para voltar', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  // sessão de textos (16/11/2026): a explicação da pergunta saiu da tela ("por que perguntamos") e está em "Entenda o
  // treino" → "Por que o app pergunta e sugere" (tests/e2e/entenda.spec.ts)
  await expect(page.getByRole('button', { name: 'por que perguntamos' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Ver as perguntas completas' }).click();
  const completas = page.getByRole('dialog', { name: 'As 9 perguntas completas' });
  await expect(completas.getByRole('listitem')).toHaveCount(9);
  await expect(completas).toContainText('Você está grávida ou teve bebê nos últimos 6 meses?');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Sim, alguma (ou não tenho certeza)' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('alert')).toContainText('Nenhuma marcada. Se nenhuma vale, volte e toque em “Não, nenhuma”.');
  // marcar uma e voltar no diálogo mantém a marca; nada é salvo antes de confirmar
  await page.locator('label.opcao', { hasText: 'Dor no peito' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  const dialogo = page.getByRole('dialog', { name: 'Nenhuma destas vale para você?' });
  await expect(dialogo.getByRole('listitem')).toHaveCount(8);
  await folhaPronta(page);
  await dialogo.getByRole('button', { name: 'Voltar e marcar' }).click();
  await expect(page.locator('label.opcao', { hasText: 'Dor no peito' }).getByRole('checkbox')).toBeChecked();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
});

test('"sim" só no osteoarticular pede as regiões e a dor de hoje, e o aviso diz o motivo verdadeiro', async ({ page }) => {
  await ana(page, {
    passarTriagem: async (p) => {
      await triagem(p, { simEm: ['osso, articulação'] });
      await expect(p.getByText('Marque pelo menos uma região com problema.')).toBeVisible();
      await p.getByRole('group', { name: 'Quais regiões?' }).getByLabel('Ombro').check();
      await p.getByRole('button', { name: 'Continuar' }).click();
      await expect(p.getByText('Dê a nota da dor de hoje na região marcada.')).toBeVisible();
      await p.getByRole('group', { name: /E hoje, dói no ombro/ }).getByLabel('7', { exact: true }).check();
      await p.getByRole('button', { name: 'Continuar' }).click();
      // lote 3 do redesign: as não marcadas são confirmadas, uma a uma, com a pergunta inteira
      const dialogo = p.getByRole('dialog', { name: 'Nenhuma destas vale para você?' });
      await expect(dialogo).toContainText('Você não marcou estas 8:');
      await expect(dialogo).toContainText('Algum médico já disse que você tem problema no coração ou pressão alta?');
      await confirmarNaoMarcadas(p);
      await expect(p.getByRole('heading', { name: 'Experiência', exact: true })).toBeVisible();
    },
  });
  // lote 3 do redesign: o resumo da dor da triagem é o 1º aviso do programa novo, com o selo, até o 1º treino
  await expect(page.locator('.aviso-linha')).toContainText('Pela triagem: ombro (dor 7 hoje).');
  const avisos = await verAvisos(page);
  await expect(avisos.getByRole('region', { name: /Pela triagem/ })).toContainText('Ombro, dor 7 hoje: os exercícios que carregam a região ficam de fora.');
  await page.keyboard.press('Escape');
  await sobreOPrograma(page);
  await expect(page.getByText(/peito 0 de \d+ séries por semana\. Os exercícios que carregam o ombro saíram por causa da dor no ombro \(7 hoje\)/)).toBeVisible();
  await expect(page.getByText(/Procure avaliação profissional\. Quando a dor baixar/)).toBeVisible();
});

// Critério 1, refeito no lote M1 da análise crítica (19/11/2026). Antes, o teste conferia "até 11 toques" e pulava a tela
// de equipamento, que é justamente onde a porta emperrava: 13 toques na academia completa, 21 no condomínio e 24 em casa
// (docs/revisoes/analise-critica/relatorio.md). Agora a conta inclui essa tela, nos quatro atalhos, e a meta é 15.
const contarToques = async (page: Page) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __toques: number; __caracteres: number };
    w.__toques = 0;
    w.__caracteres = 0;
    addEventListener('pointerdown', () => w.__toques++, true);
    addEventListener('beforeinput', (e) => (w.__caracteres += ((e as InputEvent).data ?? '').length), true);
    addEventListener('keydown', (e) => e.key.length === 1 && w.__caracteres++, true);
  });
  return () => page.evaluate(() => {
    const w = window as unknown as { __toques: number; __caracteres: number };
    return { toques: w.__toques, caracteres: w.__caracteres };
  });
};
/** Da abertura até a tela de equipamento, sem nenhuma condição de saúde: 3 dias de 45 min, com dois grupos de foco. */
const ateOEquipamento = async (page: Page, experiencia: 'treina' | 'nunca') => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await triagemNenhuma(page);
  const grupo = (nome: RegExp) => page.getByRole('group', { name: nome });
  if (experiencia === 'nunca') await grupo(/sem parar/).getByLabel('Nunca treinei').check();
  else {
    await grupo(/sem parar/).getByLabel('Menos de 6 meses').check();
    await grupo(/treinando agora/).getByLabel(/^Estou treinando/).check();
    await grupo(/confiança na técnica/).getByLabel(/^Sim/).check();
  }
  await expect(page.getByRole('heading', { name: 'Seu nível: Iniciante' })).toBeVisible();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await grupo(/Quantos dias/).getByLabel('3 dias').check();
  await minutosPorTreino(page, '45');
  await page.getByLabel('Pernas', { exact: true }).check();
  await page.getByLabel('Glúteos', { exact: true }).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Onde você treina?' })).toBeVisible();
};

for (const lugar of ['Academia completa', 'Condomínio com multifuncional', 'Casa com halteres e elásticos', 'Corpo livre'])
  test(`da abertura ao programa em até 15 toques e 0 caractere, contando a tela de equipamento: ${lugar} (critério 1)`, async ({ page }) => {
    const contagem = await contarToques(page);
    await ateOEquipamento(page, 'treina');
    await page.getByRole('button', { name: lugar }).click();
    await page.getByRole('button', { name: 'Gerar meu programa' }).click();
    // o programa sai na hora: nenhuma folha de detalhe, nenhum "falta pouco"
    await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
    const { toques, caracteres } = await contagem();
    expect(caracteres).toBe(0);
    // Começar, "Não, nenhuma", 3 no nível, Continuar, 3 dias, 45 min, Pernas, Glúteos, Continuar, o lugar e "Gerar": 13
    expect(toques).toBeLessThanOrEqual(15);
  });

test('"Nunca treinei" não pergunta da pausa nem da técnica, chega ao programa em menos toques e cai no aprendizado, não na volta de pausa', async ({ page }) => {
  const contagem = await contarToques(page);
  await ateOEquipamento(page, 'nunca');
  await page.getByRole('button', { name: 'Condomínio com multifuncional' }).click();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  expect((await contagem()).toques).toBeLessThanOrEqual(11);
  // nenhum exercício com 1 série (a volta de pausa dava "1 ×" a quem nunca tinha treinado)
  const series = await page.locator('.treino-lista li, [role="tabpanel"] li').allTextContents();
  expect(series.length).toBeGreaterThan(0);
  for (const t of series) expect(t).not.toMatch(/(^|\D)1\s*×/);
  // na volta ao cadastro, a resposta está lá e as duas perguntas continuam fora
  await page.goto('/comecar/nivel');
  await expect(page.getByRole('group', { name: /sem parar/ }).getByLabel('Nunca treinei')).toBeChecked();
  await expect(page.getByRole('group', { name: /treinando agora/ })).toHaveCount(0);
  await expect(page.getByRole('group', { name: /confiança na técnica/ })).toHaveCount(0);
});

test('atalho "academia completa": nada vem marcado, o toque marca o conjunto e os detalhes vêm com valores típicos', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/inventario');
  for (const a of ['Casa com halteres e elásticos', 'Condomínio com multifuncional', 'Academia completa'])
    await expect(page.getByRole('button', { name: a })).toHaveAttribute('aria-pressed', 'false');
  // A esteira saiu da lista (continua só na foto).
  await expect(page.getByLabel('Esteira', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Academia completa' }).click();
  await expect(page.getByRole('button', { name: 'Academia completa' })).toHaveAttribute('aria-pressed', 'true');
  // lote 3 do redesign: o que o app supôs em 1 linha; conferir abre os marcados
  await expect(page.locator('.supos')).toContainText(/\d+ itens marcados/);
  // a Ana já tinha itens, então a lista já vem aberta (no cadastro novo, "Conferir os N itens ›" abre)
  await abrirLista(page);
  const marcados = page.getByRole('region', { name: /^Marcados/ });
  await expect(marcados).toContainText('Leg press');
  // O que a Ana já tinha marcado continua marcado.
  await expect(marcados).toContainText('Halteres fixos');
  const asVezes = page.getByRole('group', { name: /Às vezes tem/ });
  for (const x of ['Kettlebell', 'Elásticos', 'Bola suíça', 'Suspensão (TRX) ou argolas']) await expect(asVezes.getByLabel(x, { exact: true })).not.toBeChecked();
  // A pergunta única da menor anilha aparece (leg press, hack, smith…), sem resposta marcada.
  const anilha = page.getByRole('group', { name: 'Qual a menor anilha?' });
  for (const r of await anilha.getByRole('radio').all()) await expect(r).not.toBeChecked();
  await anilha.getByLabel('1,25 kg', { exact: true }).check();
  // Design v2 (item D): os detalhes vêm com valores típicos, editáveis; o lado conservador nos "sim ou não".
  await expect((await detalhesDo(page, 'Polia simples')).getByRole('group', { name: 'Onde fica a polia?' }).getByLabel('Regulável')).toBeChecked();
  await pronto(page);
  await expect((await detalhesDo(page, 'Voador')).getByRole('group', { name: /O voador também vira/ }).getByLabel('Não')).toBeChecked();
  await pronto(page);
  await expect((await detalhesDo(page, 'Banco regulável')).getByRole('group', { name: /O banco também declina/ }).getByLabel('Não')).toBeChecked();
  await pronto(page);
  // "Tirar" desmarca na hora
  await page.getByRole('button', { name: 'Tirar Leg press' }).click();
  await expect(marcados).not.toContainText('Leg press');
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
});

test('lote 3: a busca acha o item pelo nome em qualquer categoria, e o detalhe que falta abre sozinho ao gerar', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/inventario');
  await page.getByLabel('Procurar', { exact: true }).fill('extensora');
  await expect(page.locator('.grade-2 .item-eq')).toHaveCount(1);
  await page.locator('.grade-2').getByLabel('Cadeira extensora', { exact: true }).check();
  await page.getByLabel('Procurar', { exact: true }).fill('xyz');
  await expect(page.getByText('Nada com “xyz”. Confira a escrita ou procure pela categoria.')).toBeVisible();
  // marcar a polia simples abre os detalhes; fechar sem responder e gerar abre de novo, com o erro
  const polia = await marcarItem(page, 'Polia simples');
  await expect(polia.getByRole('group', { name: 'Onde fica a polia?' })).toBeVisible();
  await polia.getByRole('button', { name: 'Fechar' }).click();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('dialog', { name: 'Polia simples' })).toBeVisible();
  await expect(page.getByRole('region', { name: /^Marcados/ }).getByText('falta completar')).toBeVisible();
  // lote M1: ela já tinha fechado esta folha sem responder, então o campo diz o que falta
  await expect(page.getByRole('dialog', { name: 'Polia simples' }).locator('.erro')).toHaveText('Diga onde fica a polia (no alto, embaixo ou regulável).');
});

// Lote M1 da análise crítica (19/11/2026): antes, o toque em "Gerar meu programa" pintava de vermelho, de uma vez,
// campos que a pessoa nunca tinha visto, e a mensagem não saía enquanto ela preenchia.
test('o erro do detalhe só aparece no campo que a pessoa mexeu ou tentou fechar, e some ao corrigir', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/inventario');
  await page.getByRole('button', { name: 'Casa com halteres e elásticos' }).click();
  await page.getByRole('group', { name: /Às vezes tem/ }).getByLabel('Kettlebell', { exact: true }).check();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  // a folha do que falta abre sozinha, e a tela diz quanto falta; o campo, que ela ainda não viu, não vem em vermelho
  const folha = page.getByRole('dialog', { name: 'Kettlebell' });
  await expect(folha).toBeVisible();
  await folhaPronta(page);
  await expect(page.getByRole('alert')).toContainText('Há 1 detalhe para completar.');
  await expect(folha.locator('.erro')).toHaveCount(0);
  // "Pronto" sem responder: a folha fica e diz o que falta
  await folha.getByRole('button', { name: 'Pronto' }).click();
  await expect(folha.locator('.erro')).toHaveText('Marque pelo menos um peso de kettlebell.');
  // corrigiu: o erro do campo e o aviso da tela somem na hora, sem novo toque em "Gerar"
  await folha.getByLabel('8 kg', { exact: true }).check();
  await expect(folha.locator('.erro')).toHaveCount(0);
  await expect(page.getByRole('alert')).toHaveCount(0);
  await folha.getByRole('button', { name: 'Pronto' }).click();
  await expect(folha).toHaveCount(0);
  await expect(page.getByRole('region', { name: /^Marcados/ }).getByText('falta completar')).toHaveCount(0);
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
});

test('escolher uma opção calculada gera o programa de novo com o novo perfil', async ({ page }) => {
  await ana(page, { minutos: '40' });
  // Os ajustes entram na linha de aviso (um por vez); nenhuma opção vem escolhida.
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toBeVisible();
  await expect(page.locator('.aviso-linha')).toContainText(/abaixo da meta\.|passa do tempo\./);
  await expect(page.locator('.aviso-linha').getByRole('button', { name: 'Ajustar', exact: true })).toBeVisible();
  let avisos = await verAvisos(page);
  await avisos.getByRole('region', { name: 'Ajustes possíveis' }).getByRole('button', { name: /^4 treinos de 40 min/ }).click();
  await expect(page.getByRole('status')).toContainText('4 treinos de 40 min');
  await expect((await sobreOPrograma(page)).getByRole('list', { name: 'Resumo' })).toContainText('4x por semana');
  await page.goto('/programa');
  // Com 4 dias, a recomendada é Superior/Inferior 2x.
  await expect(page.getByRole('tab', { name: 'Superior A', exact: true })).toBeVisible();

  // "Manter" tira o aviso da tela; dá para trazê-lo de volta em "Entenda o treino" → "O seu programa".
  if (await page.locator('.aviso-linha').filter({ hasText: /abaixo da meta\.|passa do tempo\./ }).isVisible()) {
    avisos = await verAvisos(page);
    await avisos.getByRole('button', { name: /^Manter/ }).click();
    await expect(page.locator('.aviso-linha')).toHaveCount(0);
    await (await sobreOPrograma(page)).getByRole('button', { name: 'Ver ajustes possíveis' }).click();
    await expect(page).toHaveURL(/\/programa$/);
    avisos = await verAvisos(page);
    await expect(avisos.getByRole('region', { name: 'Ajustes possíveis' })).toBeVisible();
  }
});

test('recarregar a página mantém perfil, inventário e programa', async ({ page }) => {
  await ana(page);
  const antes = await page.locator('main').innerText();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  // as miniaturas chegam num pedaço próprio, alguns milissegundos depois (lote técnico do redesign)
  await expect.poll(() => page.locator('main').innerText()).toBe(antes);
  // A raiz abre direto no programa.
  await page.goto('/');
  await expect(page).toHaveURL(/\/programa$/);
  // E as respostas continuam nas telas do perfil.
  await page.goto('/comecar/inventario');
  await expect(page.getByRole('region', { name: /^Marcados/ })).toContainText('Halteres fixos');
  await expect((await detalhesDo(page, 'Halteres fixos')).getByRole('group', { name: 'O mais pesado' }).getByLabel('12 kg', { exact: true })).toBeChecked();
});

test('Meus dados mostra a versão do app e a data da publicação', async ({ page }) => {
  // R3: para a pessoa conferir se o celular já está com a versão nova.
  await page.goto('/dados');
  await expect(page.getByText(/^Versão ([0-9a-f]{7}|local) · \d{2}\/\d{2}\/\d{4}$/)).toBeVisible();
});

test('exportar, apagar e importar devolve o mesmo estado', async ({ page }) => {
  await ana(page);
  const programa = await page.locator('main').innerText();
  await page.getByRole('link', { name: 'Meus dados' }).click();

  // lote 5 do redesign: guardar, trazer e apagar abrem em folhas
  await page.getByRole('button', { name: 'Guardar uma cópia' }).click();
  await folhaPronta(page);
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
  expect(download.suggestedFilename()).toMatch(/^treino-mvp-\d{4}-\d{2}-\d{2}\.json$/);
  const arquivo = await download.path();
  const exportado = JSON.parse(await (await import('node:fs/promises')).readFile(arquivo, 'utf8'));

  await page.getByRole('button', { name: 'Apagar todos os dados' }).click();
  await folhaPronta(page);
  const apagar = page.getByRole('dialog', { name: 'Apagar todos os dados?' });
  await expect(apagar).toContainText('O perfil, o programa e os treinos saem deste aparelho e não voltam.');
  await apagar.getByRole('button', { name: 'Apagar tudo' }).click();
  await expect(page.getByRole('heading', { name: 'Treine onde estiver, com o que tiver' })).toBeVisible();

  await page.goto('/dados');
  await page.getByRole('button', { name: 'Trazer uma cópia' }).click();
  await folhaPronta(page);
  await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles(arquivo);
  await page.getByRole('button', { name: 'Importar dados' }).click();
  await expect(page.getByRole('status')).toHaveText('Dados importados.');

  await page.getByRole('button', { name: 'Guardar uma cópia' }).click();
  await folhaPronta(page);
  const [download2] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
  const reexportado = JSON.parse(await (await import('node:fs/promises')).readFile(await download2.path(), 'utf8'));
  expect(reexportado.estado).toEqual(exportado.estado);

  await page.getByRole('navigation', { name: 'Seções' }).getByRole('link', { name: 'Treino' }).click();
  expect(await page.locator('main').innerText()).toBe(programa);
});

test('importar um arquivo inválido não altera os dados', async ({ page }) => {
  await ana(page);
  await page.goto('/dados');
  await page.getByRole('button', { name: 'Trazer uma cópia' }).click();
  await folhaPronta(page);
  await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles({ name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{"app":"outro"}') });
  await page.getByRole('button', { name: 'Importar dados' }).click();
  await expect(page.getByRole('alert')).toContainText('Seus dados atuais não foram alterados');
  await page.goto('/');
  await expect(page).toHaveURL(/\/programa$/);
});

test('equipamento por toque: anilhas com contador e valor fora da lista em "Outro"', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/inventario');
  // lote M1 da análise crítica: "manopla" não é palavra de quem começa; o cartão diz "Halteres de montar" e a folha explica
  await marcarItem(page, 'Halteres de montar');
  const detalhes = page.getByRole('region', { name: 'Detalhes: Halteres de montar' });
  await expect(detalhes).toContainText('A manopla é a barrinha curta do halter de montar');
  await detalhes.getByRole('group', { name: 'Quantas manoplas (as barrinhas)?' }).getByLabel('2').check();
  await detalhes.getByRole('group', { name: 'Peso de cada manopla' }).getByLabel('Outro').check();
  await detalhes.getByLabel('Peso de cada manopla: outro valor').fill('1.8');
  await detalhes.getByRole('button', { name: 'Mais anilhas de 5 kg' }).click();
  await detalhes.getByRole('button', { name: 'Mais anilhas de 5 kg' }).click();
  await expect(detalhes.getByLabel('Quantidade de anilhas de 5 kg')).toHaveText('4');
  await pronto(page);
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await page.goto('/comecar/inventario');
  await detalhesDo(page, 'Halteres de montar');
  await expect(page.getByLabel('Peso de cada manopla: outro valor')).toHaveValue('1.8');
  await expect(page.getByLabel('Quantidade de anilhas de 5 kg')).toHaveText('4');
});

test('catálogo do R0c: equipamento novo sem desenho, estações do multifuncional e cartão de texto do exercício sem animação', async ({ page }) => {
  await ana(page, {
    equipamentoExtra: async (p) => {
      // Lote 5 do redesign: todo item tem o desenho realista dele (um SVG próprio), com o nome sempre escrito.
      await marcarItem(p, 'Hack ou pendular');
      const desenho = p.locator('label.item-eq', { has: p.getByLabel('Hack ou pendular', { exact: true }) }).locator('img.icone-eq');
      await expect(desenho).toHaveAttribute('src', '/equipamento/hack.svg');
      await expect.poll(() => desenho.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);
      // Multifuncional: sem estação marcada, a tela pede uma (a folha dele abre de novo ao gerar).
      const multi = await marcarItem(p, 'Multifuncional');
      await multi.getByRole('button', { name: 'Fechar' }).click();
      await p.getByRole('button', { name: 'Gerar meu programa' }).click();
      await expect(p.getByText('Marque pelo menos uma estação do multifuncional.')).toBeVisible();
      await p.getByRole('group', { name: 'Quais estações o seu tem?' }).getByLabel('Extensora').check();
      await pronto(p);
      // Polia simples: a altura (no alto, embaixo ou regulável).
      const polia = await marcarItem(p, 'Polia simples');
      await polia.getByRole('group', { name: 'Onde fica a polia?' }).getByLabel('Embaixo').check();
      await pronto(p);
    },
  });
  const painel = page.getByRole('tabpanel');
  // A iniciante agacha no hack (estável), que ainda não tem animação: cartão de texto, nunca animação improvisada.
  // lote 4 do redesign: a lista abre a folha do exercício; lote 2: a montagem segura vem sempre aberta.
  const cartao = await abrirExercicio(page, /Agachamento no hack/);
  await expect(cartao.getByText('Montagem segura')).toBeVisible();
  await expect(cartao.getByText(/Solte a trava de segurança/)).toBeVisible();
  // sessão de textos (16/11/2026): as alternativas ficam a um toque, todas de uma vez (antes: 3 à vista e "ver mais")
  await expect(cartao.locator('summary', { hasText: /^Alternativas \(\d+\)$/ })).toBeVisible();
  await expect(cartao.getByText(/^Ver mais \d+ opç/)).toHaveCount(0);
  await cartao.getByRole('button', { name: 'Fechar' }).click();
  // A extensora vem da estação do multifuncional (no dia B).
  await page.getByRole('tab', { name: 'Corpo todo B', exact: true }).click();
  await expect(painel.getByRole('button', { name: /Cadeira extensora/ })).toBeVisible();
});

test('lote 3: "algo a evitar" fica em Meus dados e gera o programa de novo sem o exercício escolhido', async ({ page }) => {
  await ana(page);
  // Pacote 2 (15/11/2026): o exercício a evitar é o goblet, que está no programa da Ana (antes, o búlgaro, que saiu dele:
  // com o búlgaro, a última verificação passaria sem provar nada).
  await expect(page.getByRole('tabpanel').getByRole('button', { name: /Agachamento goblet com calcanhar elevado/ })).toHaveCount(1);
  await page.getByRole('navigation', { name: 'Seções' }).getByRole('link', { name: 'Meus dados' }).click();
  await page.getByRole('link', { name: 'Algo a evitar' }).click();
  await expect(page.getByRole('heading', { name: 'Algo a evitar' })).toBeVisible();
  await page.getByText('Exercícios a evitar', { exact: true }).click();
  await page.getByLabel('Agachamento goblet com calcanhar elevado', { exact: true }).check();
  await page.getByRole('button', { name: 'Salvar e gerar o programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await expect(page.getByRole('tabpanel').getByRole('button', { name: /Agachamento goblet com calcanhar elevado/ })).toHaveCount(0);
});
