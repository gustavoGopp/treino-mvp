import { expect, test, type Locator, type Page, type Route } from '@playwright/test';
import { abrirExercicio, abrirLista, abrirTrocar, ana, detalhesDo, folhaPronta, maisOpcoes, marcarItem, minutosPorTreino, porQueDaSugestao, terminarTreino, triagem, triagemNenhuma, verAvisos } from '../../tests/e2e/jornada';
import { comHistorico, estadoDaPersona, estadoGuardado, Roteiro, semear, type Fluxo, type SessaoSemeada } from './colher';

// Inventário dos textos do app (16/11/2026): percorre o app inteiro e grava todo texto que cada tela, folha, bloco que
// abre, aviso e mensagem de erro mostra. As personas são as fictícias de tests/personas: a Ana faz o cadastro pela
// interface (como no roteiro de 13/11, scripts/design/frontend-novo/capturas.spec.ts, para os números serem
// comparáveis); as outras entram com o estado pronto gravado no aparelho. Cada teste é um trecho do app e guarda a
// parte dele; a montagem (montar.ts) junta tudo. Um passo que falha não derruba os seguintes: a falha fica anotada.
// A ordem dos testes dentro de cada fluxo é o 2º número de `roteiro(...)`.

type Corpo = (r: Roteiro, page: Page) => Promise<void>;
function roteiro(chave: string, ordem: number, fluxo: Fluxo, persona: string, corpo: Corpo) {
  test(chave, async ({ page }, info) => {
    const r = new Roteiro(page, info, chave, ordem, fluxo, persona);
    try {
      await corpo(r, page);
    } catch (e) {
      r.falhas.push(`o roteiro parou antes do fim: ${String(e).split('\n')[0]}`);
    }
    r.gravar();
  });
}

const grupo = (page: Page | Locator, nome: string | RegExp) => page.getByRole('group', { name: nome });
const nomeDeArquivo = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
/** Envia o formulário da tela sem o botão (que só aparece com as respostas dadas): é como as mensagens de "falta" são vistas. */
const forcarEnvio = (page: Page) => page.locator('main form').evaluate((f: HTMLFormElement) => f.requestSubmit());
/** A folha "De onde vem isto" de um selo, por cima do que estiver aberto. */
async function folhaDoSelo(r: Roteiro, nome: string, selo: Locator, o: { titulo: string; comoChegar: string }) {
  await r.passo(nome, async () => {
    await selo.click();
    await folhaPronta(r.page);
    await expect(r.page.getByRole('dialog', { name: 'De onde vem isto' }).locator('.selo-folha').first()).toBeVisible();
    await r.page.waitForTimeout(400); // as fontes chegam num pedaço à parte
    await r.foto(nome, { tipo: 'folha', ...o });
    await r.fecharFolha();
  });
}

// ====================================================================================================================
// CADASTRO (a Ana, pela interface)
// ====================================================================================================================

roteiro('cadastro-ana', 10, 'cadastro', 'ana', async (r, page) => {
  // ---- boas-vindas ----
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeVisible();
  await r.foto('boas-vindas', { titulo: 'Boas-vindas', comoChegar: 'Abrir o app pela 1ª vez.' });
  await r.folha('boas-vindas-folha-o-que-o-app-nao-faz', () => page.getByRole('button', { name: 'o que o app não faz' }).click(), {
    titulo: 'Folha "O que o app não faz"',
    comoChegar: 'Boas-vindas → toque em "o que o app não faz".',
  });
  await r.passo('boas-vindas, a privacidade', async () => {
    await page.getByRole('button', { name: /Seus dados ficam só neste celular/ }).click();
    await folhaPronta(page);
    await r.foto('boas-vindas-folha-seus-dados', { titulo: 'Folha "Seus dados ficam no aparelho"', comoChegar: 'Boas-vindas → toque em "Seus dados ficam só neste celular. Sem login."', tipo: 'folha' });
    await folhaDoSelo(r, 'boas-vindas-folha-selo-da-foto', page.getByRole('dialog').getByRole('button', { name: 'ver de onde vem' }), {
      titulo: 'Folha "De onde vem isto" (o selo "fonte" do texto da foto)',
      comoChegar: 'Boas-vindas → "Seus dados ficam só neste celular" → toque no selo "fonte".',
    });
    await r.fecharFolha();
  });

  // ---- saúde ----
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
  await r.foto('saude', { titulo: 'Saúde: a pergunta geral, com as 9 condições', comoChegar: 'Boas-vindas → "Começar".' });
  await r.folha('saude-folha-por-que-perguntamos', () => page.getByRole('button', { name: 'por que perguntamos' }).click(), {
    titulo: 'Folha "Por que esta pergunta"',
    comoChegar: 'Saúde → toque em "por que perguntamos".',
  });
  await r.folha('saude-folha-perguntas-completas', () => page.getByRole('button', { name: 'Ver as perguntas completas' }).click(), {
    titulo: 'Folha "As 9 perguntas completas"',
    comoChegar: 'Saúde → toque em "Ver as perguntas completas".',
  });
  await r.passo('saúde, quais valem', async () => {
    await page.getByRole('button', { name: 'Sim, alguma (ou não tenho certeza)' }).click();
    await expect(page.getByRole('heading', { name: 'Quais valem para você?' })).toBeVisible();
    await r.foto('saude-quais-valem', { titulo: 'Saúde: quais valem (as 9 perguntas para marcar)', comoChegar: 'Saúde → "Sim, alguma (ou não tenho certeza)".' });
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await r.foto('saude-quais-valem-erro-nenhuma-marcada', { titulo: 'Saúde: quais valem, sem nenhuma marcada', comoChegar: 'Quais valem → "Continuar" sem marcar nada.', tipo: 'erro' });
    // a pergunta dos ossos e articulações abre as regiões e a nota de dor de hoje
    await page.locator('label.opcao', { hasText: 'osso, articulação' }).first().getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByText('Marque pelo menos uma região com problema.')).toBeVisible();
    await r.foto('saude-quais-valem-regioes-erro-sem-regiao', { titulo: 'Saúde: quais valem, com "Quais regiões?" e nenhuma região marcada', comoChegar: 'Quais valem → marcar "Problema em osso, articulação, músculo ou tendão" → "Continuar".', tipo: 'erro' });
    const regioes = grupo(page, 'Quais regiões?');
    await regioes.getByLabel('Ombro').check();
    await regioes.getByLabel('Joelho').check();
    await regioes.getByLabel('Punho').check();
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByText('Dê a nota da dor de hoje em cada região marcada.')).toBeVisible();
    await r.foto('saude-quais-valem-regioes-erro-sem-notas', { titulo: 'Saúde: 3 regiões marcadas, sem as notas de dor', comoChegar: 'Quais regiões? → marcar Ombro, Joelho e Punho → "Continuar" sem dar as notas.', tipo: 'erro' });
    await grupo(page, /E hoje, dói no ombro/).getByLabel('7', { exact: true }).check();
    await grupo(page, /E hoje, dói no punho/).getByLabel('1', { exact: true }).check();
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByText('Dê a nota da dor de hoje na região marcada.')).toBeVisible();
    await r.foto('saude-quais-valem-regioes-erro-sem-uma-nota', { titulo: 'Saúde: 3 regiões marcadas, faltando 1 nota de dor', comoChegar: 'Quais regiões? → dar a nota do ombro (7) e do punho (1), sem a do joelho → "Continuar".', tipo: 'erro' });
    await grupo(page, /E hoje, dói no joelho/).getByLabel('4', { exact: true }).check();
    await page.getByRole('button', { name: 'Continuar' }).click();
    await folhaPronta(page);
    await r.foto('saude-folha-confirmar-nao-marcadas', { titulo: 'Folha "Nenhuma destas vale para você?" (8 não marcadas)', comoChegar: 'Quais valem → só "osso, articulação" marcada, com regiões e notas → "Continuar".', tipo: 'folha' });
    await page.getByRole('button', { name: 'Voltar e marcar' }).click();
    // 8 marcadas: a confirmação fala de uma só
    for (const p of ['coração', 'Dor no peito', 'tontura', 'Outra doença crônica', 'Remédio', 'acompanhamento', 'Gravidez']) await page.locator('label.opcao', { hasText: p }).first().getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Continuar' }).click();
    await folhaPronta(page);
    await r.foto('saude-folha-confirmar-nao-marcada-uma', { titulo: 'Folha "Nenhuma destas vale para você?" (1 não marcada)', comoChegar: 'Quais valem → marcar 8 das 9 → "Continuar".', tipo: 'folha' });
    await page.getByRole('button', { name: 'Isso, nenhuma destas' }).click();
    await expect(page.getByRole('heading', { name: 'Vamos pausar o programa automático' })).toBeVisible();
    await r.foto('saude-pausa', { titulo: 'Saúde: "Vamos pausar o programa automático" (8 respostas "sim")', comoChegar: 'Quais valem → 8 marcadas → confirmar as não marcadas.', tipo: 'aviso' });
    await folhaDoSelo(r, 'saude-pausa-folha-selo', page.locator('main button.selo').first(), { titulo: 'Folha "De onde vem isto" (o selo da pausa da triagem)', comoChegar: 'Vamos pausar → toque no selo.' });
    await page.getByLabel('Confirmo que fui avaliado e liberado').check();
    await r.foto('saude-pausa-liberacao-marcada', { titulo: 'Saúde: a pausa, com a liberação marcada', comoChegar: 'Vamos pausar → marcar "Confirmo que fui avaliado e liberado…".', tipo: 'aviso' });
  });
  // a Ana não tem condição nenhuma: volta e responde "Não, nenhuma"
  await page.goto('/comecar/triagem');
  await triagemNenhuma(page);

  // ---- experiência ----
  await expect(page.getByRole('heading', { name: 'Experiência', exact: true })).toBeVisible();
  await r.foto('experiencia-vazia', { titulo: 'Experiência: a 1ª pergunta, sem resposta', comoChegar: 'Saúde → "Não, nenhuma".', tipo: 'estado vazio' });
  await r.passo('experiência, envio sem resposta', async () => {
    await forcarEnvio(page);
    await expect(page.getByRole('alert')).toBeVisible();
    await r.foto('experiencia-erro-sem-resposta', {
      titulo: 'Experiência: as mensagens de "falta" sem nenhuma resposta',
      comoChegar: 'Só forçando o envio do formulário: sem as 3 respostas, o botão "Continuar" não aparece, e por toque estas mensagens não são vistas.',
      tipo: 'erro',
    });
    await page.reload();
    await expect(page.getByRole('heading', { name: 'Experiência', exact: true })).toBeVisible();
  });
  const nivel = async (tempo: string, pausa: RegExp, tecnica: RegExp | string) => {
    await grupo(page, /sem parar/).getByLabel(tempo).check();
    await grupo(page, /treinando agora/).getByLabel(pausa).check();
    await grupo(page, /confiança na técnica/).getByLabel(tecnica).check();
  };
  await r.passo('experiência, uma pergunta por vez', async () => {
    await grupo(page, /sem parar/).getByLabel('Mais de 2 anos').check();
    await r.foto('experiencia-2a-pergunta', { titulo: 'Experiência: a 2ª pergunta aparece ("Você está treinando agora?")', comoChegar: 'Experiência → responder a 1ª pergunta.' });
    await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
    await r.foto('experiencia-3a-pergunta', { titulo: 'Experiência: a 3ª pergunta aparece (confiança na técnica)', comoChegar: 'Experiência → responder a 2ª pergunta.' });
    await grupo(page, /confiança na técnica/).getByLabel(/^Sim/).check();
    await expect(page.getByRole('heading', { name: 'Seu nível: Avançado' })).toBeVisible();
    await r.foto('experiencia-nivel-avancado', { titulo: 'Experiência respondida: "Seu nível: Avançado", com "Quer começar num nível mais leve?"', comoChegar: 'Experiência → "Mais de 2 anos", "Estou treinando", "Sim".' });
    await nivel('De 6 meses a 2 anos', /^Estou treinando/, /^Sim/);
    await expect(page.getByRole('heading', { name: 'Seu nível: Intermediário' })).toBeVisible();
    await r.foto('experiencia-nivel-intermediario', { titulo: 'Experiência respondida: "Seu nível: Intermediário"', comoChegar: 'Experiência → "De 6 meses a 2 anos", "Estou treinando", "Sim".' });
    await nivel('Mais de 2 anos', /^Parei há mais de 6 meses/, /^Sim/);
    await expect(page.getByRole('heading', { name: 'Seu nível: Iniciante' })).toBeVisible();
    await r.foto('experiencia-nivel-iniciante-pela-pausa', { titulo: 'Experiência respondida: iniciante por mais de 6 meses parado', comoChegar: 'Experiência → "Mais de 2 anos", "Parei há mais de 6 meses", "Sim".' });
    await nivel('Mais de 2 anos', /^Estou treinando/, 'Mais ou menos');
    await r.foto('experiencia-nivel-iniciante-pela-tecnica', { titulo: 'Experiência respondida: iniciante por falta de confiança na técnica', comoChegar: 'Experiência → "Mais de 2 anos", "Estou treinando", "Mais ou menos".' });
  });
  await nivel('Menos de 6 meses', /^Estou treinando/, /^Sim/);
  await expect(page.getByRole('heading', { name: 'Seu nível: Iniciante' })).toBeVisible();
  await r.foto('experiencia-respondida', { titulo: 'Experiência respondida (a Ana: "Seu nível: Iniciante")', comoChegar: 'Experiência → "Menos de 6 meses", "Estou treinando", "Sim".' });
  // sessão de textos (16/11/2026): o motivo do nível e a regra dele ficam atrás do "por quê?" (antes: o selo ao lado do motivo)
  await r.folha('experiencia-folha-selo-do-nivel', () => page.locator('main .resultado').getByRole('button', { name: 'por quê?' }).click(), { titulo: 'Folha "Como o nível é definido" (por quê?)', comoChegar: 'Experiência respondida → "por quê?" ao lado de "Seu nível".' });
  await page.getByRole('button', { name: 'Continuar' }).click();

  // ---- rotina ----
  await expect(page.getByRole('heading', { name: 'Rotina', exact: true })).toBeVisible();
  await r.foto('rotina-vazia', { titulo: 'Rotina: a 1ª pergunta, sem resposta', comoChegar: 'Experiência → "Continuar".', tipo: 'estado vazio' });
  await r.folha('rotina-folha-por-que-dias', () => grupo(page, /Quantos dias/).getByRole('button', { name: 'por quê?' }).click(), { titulo: 'Folha "Quantos dias" (por quê?)', comoChegar: 'Rotina → "por quê?" em "Quantos dias por semana você pode treinar?".' });
  await r.passo('rotina, envio sem resposta', async () => {
    await forcarEnvio(page);
    await expect(page.getByRole('alert')).toBeVisible();
    await r.foto('rotina-erro-sem-resposta', {
      titulo: 'Rotina: as mensagens de "falta" sem nenhuma resposta',
      comoChegar: 'Só forçando o envio do formulário: sem os dias e os minutos, o botão "Continuar" não aparece, e por toque estas mensagens não são vistas.',
      tipo: 'erro',
    });
    await page.reload();
    await expect(page.getByRole('heading', { name: 'Rotina', exact: true })).toBeVisible();
  });
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await r.foto('rotina-2a-pergunta', { titulo: 'Rotina: a 2ª pergunta aparece ("Quantos minutos por treino?")', comoChegar: 'Rotina → "3 dias".' });
  await r.passo('rotina, outro valor de minutos', async () => {
    await minutosPorTreino(page, '');
    await r.foto('rotina-minutos-outro', { titulo: 'Rotina: minutos em "Outro", com o campo vazio', comoChegar: 'Rotina → "3 dias" → "Outro".' });
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await r.foto('rotina-minutos-outro-erro', { titulo: 'Rotina: "Outro" sem número válido', comoChegar: 'Rotina → "Outro" → "Continuar" com o campo vazio.', tipo: 'erro' });
  });
  await minutosPorTreino(page, '45');
  await r.foto('rotina-3a-pergunta', { titulo: 'Rotina: a 3ª pergunta aparece (grupos a priorizar)', comoChegar: 'Rotina → "3 dias" → "45 min".' });
  await r.folha('rotina-folha-por-que-grupos', () => page.locator('fieldset', { hasText: 'Priorizar algum grupo' }).getByRole('button', { name: 'por quê?' }).click(), { titulo: 'Folha "Grupos prioritários" (por quê?)', comoChegar: 'Rotina → "por quê?" em "Priorizar algum grupo?".' });
  await r.passo('rotina, as notas do foco', async () => {
    for (const g of ['Peito', 'Costas', 'Ombros']) await page.getByLabel(g, { exact: true }).check();
    await r.foto('rotina-foco-3-grupos', { titulo: 'Rotina: 3 grupos marcados (a nota "Com mais de 2 grupos…")', comoChegar: 'Rotina → marcar Peito, Costas e Ombros.', tipo: 'aviso' });
    for (const g of ['Costas', 'Ombros']) await page.getByLabel(g, { exact: true }).uncheck();
    await page.getByLabel('Braços', { exact: true }).check();
    await r.foto('rotina-foco-bracos', { titulo: 'Rotina: Peito e Braços marcados (a nota "Braços conta como 2")', comoChegar: 'Rotina → marcar Peito e Braços.', tipo: 'aviso' });
    for (const g of ['Peito', 'Braços']) await page.getByLabel(g, { exact: true }).uncheck();
  });
  await page.getByLabel('Pernas', { exact: true }).check();
  await page.getByLabel('Glúteos', { exact: true }).check();
  await r.foto('rotina-respondida', { titulo: 'Rotina respondida (a Ana: 3 dias, 45 min, Pernas e Glúteos)', comoChegar: 'Rotina → "3 dias", "45 min", Pernas e Glúteos.' });
  await page.getByRole('button', { name: 'Continuar' }).click();

  // ---- equipamento ----
  await expect(page.getByRole('heading', { name: 'Onde você treina?' })).toBeVisible();
  await r.foto('equipamento-lugar', { titulo: 'Equipamento: "Onde você treina?", sem nada marcado', comoChegar: 'Rotina → "Continuar".', tipo: 'estado vazio' });
  await r.folha('equipamento-folha-da-foto', () => page.getByRole('button', { name: 'Pela foto' }).click(), { titulo: 'Folha "Reconhecer pela foto" (como abre na 1ª vez)', comoChegar: 'Equipamento → "Pela foto".' });
  await abrirLista(page);
  await r.foto('equipamento-item-por-item-vazio', { titulo: 'Equipamento: item por item, sem nada marcado (categoria "Halteres e anilhas")', comoChegar: 'Equipamento → "Item por item".', tipo: 'estado vazio' });
  for (const categoria of ['Bancos', 'Polias e acessórios', 'Barras', 'Máquinas', 'Outros acessórios'])
    await r.passo(`equipamento, a categoria ${categoria}`, async () => {
      await grupo(page, 'Categorias').getByRole('button', { name: categoria, exact: true }).click();
      await r.foto(`equipamento-categoria-${nomeDeArquivo(categoria)}`, { titulo: `Equipamento: item por item, categoria "${categoria}"`, comoChegar: `Equipamento → "Item por item" → "${categoria}".` });
    });
  await r.passo('equipamento, a busca', async () => {
    await page.getByLabel('Procurar', { exact: true }).fill('xyz');
    await expect(page.getByText(/^Nada com/)).toBeVisible();
    await r.foto('equipamento-busca-sem-resultado', { titulo: 'Equipamento: busca sem resultado', comoChegar: 'Equipamento → "Item por item" → procurar "xyz".', tipo: 'estado vazio' });
    await page.getByLabel('Procurar', { exact: true }).fill('extensora');
    await r.foto('equipamento-busca-com-resultado', { titulo: 'Equipamento: busca com resultado', comoChegar: 'Equipamento → "Item por item" → procurar "extensora".' });
    await page.getByLabel('Procurar', { exact: true }).fill('');
  });
  // a folha de detalhes de cada item que tem detalhes, como abre ao marcar
  const COM_DETALHES = ['Halteres fixos', 'Anilhas e manoplas', 'Polia simples', 'Banco regulável', 'Elásticos', 'Polia dupla (crossover)', 'Multifuncional', 'Kettlebell', 'Caneleiras de peso', 'Mini-band', 'Voador', 'Máquina de tríceps'];
  for (const item of COM_DETALHES)
    await r.passo(`equipamento, a folha de ${item}`, async () => {
      await marcarItem(page, item);
      await expect(page.getByRole('dialog', { name: item })).toBeVisible();
      await r.foto(`equipamento-folha-${nomeDeArquivo(item)}`, { titulo: `Folha de detalhes: ${item}`, comoChegar: `Equipamento → "Item por item" → marcar "${item}".`, tipo: 'folha' });
      if (item === 'Halteres fixos') {
        await grupo(page, 'O mais leve').getByLabel('Outro', { exact: true }).check();
        await r.foto('equipamento-folha-halteres-fixos-outro', { titulo: 'Folha de detalhes: Halteres fixos, com "Outro" em "O mais leve"', comoChegar: 'Folha dos halteres → "Outro" em "O mais leve".', tipo: 'folha' });
      }
      if (item === 'Polia dupla (crossover)') {
        await page.getByRole('dialog').locator('summary', { hasText: 'Placas da torre' }).click();
        await r.foto('equipamento-folha-polia-dupla-placas', { titulo: 'Folha de detalhes: Polia dupla, com "Placas da torre (opcional)" aberto', comoChegar: 'Folha da polia dupla → "Placas da torre (opcional)".', tipo: 'bloco aberto' });
      }
      await r.fecharFolha();
    });
  await r.passo('equipamento, gerar com os detalhes por completar', async () => {
    await page.getByRole('button', { name: 'Gerar meu programa' }).click();
    await folhaPronta(page);
    const primeira = (await page.getByRole('dialog').locator('h2').first().innerText()).trim();
    await r.foto(`equipamento-folha-${nomeDeArquivo(primeira)}-erro`, { titulo: `Folha de detalhes: ${primeira}, com o que falta`, comoChegar: 'Equipamento → marcar os 12 itens com detalhes sem responder → "Gerar meu programa": a folha do 1º abre sozinha.', tipo: 'erro' });
    await r.fecharFolha();
    await page.evaluate(() => window.scrollTo(0, 0));
    await r.foto('equipamento-erro-detalhes-por-completar', { titulo: 'Equipamento: "Falta pouco", com os itens marcados "falta completar"', comoChegar: 'Equipamento → 12 itens com detalhes por responder → "Gerar meu programa" → fechar a folha.', tipo: 'erro' });
    for (const item of COM_DETALHES.filter((x) => x !== primeira && x !== 'Polia dupla (crossover)')) {
      await detalhesDo(page, item);
      await r.foto(`equipamento-folha-${nomeDeArquivo(item)}-erro`, { titulo: `Folha de detalhes: ${item}, com o que falta`, comoChegar: `Equipamento com "falta completar" → "Mudar" em ${item}.`, tipo: 'erro' });
      await r.fecharFolha();
    }
  });
  await r.passo('equipamento, um detalhe só por completar', async () => {
    for (const item of COM_DETALHES.filter((x) => x !== 'Polia simples')) await page.getByRole('button', { name: `Tirar ${item}` }).click();
    await page.getByRole('button', { name: 'Gerar meu programa' }).click();
    await folhaPronta(page);
    await r.fecharFolha();
    await page.evaluate(() => window.scrollTo(0, 0));
    await r.foto('equipamento-erro-um-detalhe', { titulo: 'Equipamento: "Há 1 detalhe para completar."', comoChegar: 'Equipamento → só a polia simples marcada, sem dizer onde ela fica → "Gerar meu programa".', tipo: 'erro' });
    await page.getByRole('button', { name: 'Tirar Polia simples' }).click();
  });
  await r.passo('equipamento, os números dos halteres', async () => {
    const outro = async (legenda: string, valor: string) => {
      await grupo(page, legenda).getByLabel('Outro', { exact: true }).check();
      await page.getByLabel(`${legenda}: outro valor`).fill(valor);
    };
    const tentar = async (nome: string, titulo: string, comoChegar: string, preencher: () => Promise<void>) => {
      await detalhesDo(page, 'Halteres fixos');
      await preencher();
      await page.getByRole('dialog').getByRole('button', { name: 'Pronto' }).click();
      await page.getByRole('button', { name: 'Gerar meu programa' }).click();
      await folhaPronta(page);
      await r.foto(nome, { titulo, comoChegar, tipo: 'erro' });
      await r.fecharFolha();
    };
    await marcarItem(page, 'Halteres fixos');
    await r.fecharFolha();
    await tentar('equipamento-folha-halteres-fixos-erro-limites', 'Folha dos halteres: peso acima do limite e passo pequeno demais', 'Folha dos halteres → o mais leve 5 kg, o mais pesado 300 kg, de 0,1 em 0,1 → "Pronto" → "Gerar meu programa".', async () => {
      await grupo(page, 'O mais leve').getByLabel('5 kg', { exact: true }).check();
      await outro('O mais pesado', '300');
      await outro('De quanto em quanto', '0.1');
    });
    await tentar('equipamento-folha-halteres-fixos-erro-ordem', 'Folha dos halteres: o mais pesado menor que o mais leve', 'Folha dos halteres → o mais leve 5 kg, o mais pesado 3 kg → "Pronto" → "Gerar meu programa".', async () => {
      await outro('O mais pesado', '3');
      await outro('De quanto em quanto', '1.5');
    });
    await tentar('equipamento-folha-halteres-fixos-erro-passo', 'Folha dos halteres: passo maior que a diferença', 'Folha dos halteres → o mais leve 5 kg, o mais pesado 9 kg, de 5 em 5 → "Pronto" → "Gerar meu programa".', async () => {
      await outro('O mais pesado', '9');
      await outro('De quanto em quanto', '5');
    });
    await page.getByRole('button', { name: 'Tirar Halteres fixos' }).click();
  });
  // os atalhos de lugar, a partir do formulário vazio (nada foi salvo ainda)
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Onde você treina?' })).toBeVisible();
  for (const [id, lugar] of [['academia', 'Academia completa'], ['condominio', 'Condomínio com multifuncional'], ['casa', 'Casa com halteres e elásticos'], ['corpo', 'Corpo livre']] as const)
    await r.passo(`equipamento, o atalho ${lugar}`, async () => {
      // cada atalho soma ao anterior; "Corpo livre" desmarca tudo, e os outros são colhidos a partir do vazio
      await page.getByRole('button', { name: 'Corpo livre' }).click();
      await page.getByRole('button', { name: lugar }).click();
      await expect(page.locator('.supos')).toBeVisible();
      await r.foto(`equipamento-lugar-${id}`, { titulo: `Equipamento: depois do atalho "${lugar}"`, comoChegar: `Equipamento → toque em "${lugar}".` });
    });
  await folhaDoSelo(r, 'equipamento-folha-selo-dos-atalhos', page.locator('.supos button.selo'), { titulo: 'Folha "De onde vem isto" (o selo dos atalhos de lugar)', comoChegar: 'Equipamento → um atalho de lugar → toque no selo.' });
  await r.passo('equipamento, a lista da academia completa', async () => {
    await page.getByRole('button', { name: 'Academia completa' }).click();
    await page.getByRole('button', { name: /^Conferir os \d+ itens/ }).click();
    await expect(page.getByRole('region', { name: /^Marcados/ })).toBeVisible();
    await r.foto('equipamento-item-por-item-academia', { titulo: 'Equipamento: item por item, com os itens da "Academia completa" marcados', comoChegar: 'Equipamento → "Academia completa" → "Conferir os N itens ›".' });
    // sessão de textos (16/11/2026): a explicação da menor anilha e a regra ficam atrás de "para que serve"
    await r.folha('equipamento-folha-selo-da-menor-anilha', () => page.getByRole('region', { name: 'Detalhes: Anilhas das máquinas e barras' }).getByRole('button', { name: 'para que serve' }).click(), {
      titulo: 'Folha "A menor anilha" (para que serve)',
      comoChegar: 'Equipamento com leg press, hack, smith ou barra marcados → "Anilhas das máquinas e barras" → "para que serve".',
    });
    await page.getByRole('button', { name: 'Corpo livre' }).click();
  });
  // o equipamento da Ana: halteres fixos de 1 a 12 kg e banco reto
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Onde você treina?' })).toBeVisible();
  const halteres = await marcarItem(page, 'Halteres fixos');
  await r.foto('equipamento-folha-do-item', { titulo: 'Folha de detalhes: Halteres fixos (a 1ª folha de item da Ana)', comoChegar: 'Equipamento → "Item por item" → marcar "Halteres fixos".', tipo: 'folha' });
  await grupo(halteres, 'O mais leve').getByLabel('1 kg', { exact: true }).check();
  await grupo(halteres, 'O mais pesado').getByLabel('12 kg', { exact: true }).check();
  await grupo(halteres, 'De quanto em quanto').getByLabel('1 kg', { exact: true }).check();
  await r.foto('equipamento-folha-do-item-respondida', { titulo: 'Folha de detalhes: Halteres fixos, respondida (1 a 12 kg, de 1 em 1)', comoChegar: 'Folha dos halteres → 1 kg, 12 kg, 1 kg.', tipo: 'folha' });
  await page.getByRole('dialog').last().getByRole('button', { name: 'Pronto' }).click();
  await marcarItem(page, 'Banco reto');
  await r.foto('equipamento-item-por-item', { titulo: 'Equipamento: item por item, com os 2 itens da Ana marcados', comoChegar: 'Equipamento → "Item por item" → Halteres fixos (1 a 12 kg) e Banco reto.' });
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
});

// ====================================================================================================================
// INÍCIO
// ====================================================================================================================

const inicioPronto = (page: Page) => expect(page.getByRole('button', { name: /^Começar o treino/ }).or(page.getByRole('link', { name: 'Continuar o treino em andamento' }))).toBeVisible();

/** "Sobre o programa" como abre e, depois, com cada bloco aberto (um por vez, ou todos de uma vez). */
async function sobreOPrograma(r: Roteiro, sufixo: string, quem: string, umPorVez: boolean) {
  const { page } = r;
  await r.passo(`sobre o programa${sufixo}`, async () => {
    await page.getByRole('button', { name: 'Sobre o programa' }).click();
    await folhaPronta(page);
    const folha = page.getByRole('dialog', { name: 'Sobre o programa' });
    // "Como está o seu programa" chega num pedaço à parte
    await expect(folha.getByRole('heading', { name: 'Como está o seu programa' })).toBeVisible();
    await r.foto(`sobre-o-programa${sufixo}`, { titulo: `Folha "Sobre o programa" como abre (${quem})`, comoChegar: 'Início → "Sobre o programa".', tipo: 'folha' });
    const blocos = folha.locator('summary');
    const quantos = await blocos.count();
    for (let i = 0; i < quantos; i++) {
      const rotulo = (await blocos.nth(i).innerText()).trim();
      await blocos.nth(i).click();
      if (!umPorVez) continue;
      await blocos.nth(i).scrollIntoViewIfNeeded();
      await r.foto(`sobre-o-programa${sufixo}-${nomeDeArquivo(rotulo.replace(/\(\d+\)/, ''))}`, { titulo: `Folha "Sobre o programa", com "${rotulo}" aberto (${quem})`, comoChegar: `Início → "Sobre o programa" → "${rotulo}".`, tipo: 'bloco aberto' });
      await blocos.nth(i).click();
    }
    if (!umPorVez) await r.foto(`sobre-o-programa${sufixo}-tudo-aberto`, { titulo: `Folha "Sobre o programa", com os ${quantos} blocos abertos (${quem})`, comoChegar: 'Início → "Sobre o programa" → abrir cada bloco.', tipo: 'bloco aberto' });
    await r.fecharFolha();
  });
}

/** As abas dos outros dias (a 1ª já está na foto do início). */
async function abasDosDias(r: Roteiro, prefixo: string, quem: string) {
  const { page } = r;
  const abas = page.getByRole('tab');
  const quantas = await abas.count();
  for (let i = 1; i < quantas; i++)
    await r.passo(`${prefixo}, a aba ${i + 1}`, async () => {
      await abas.nth(i).click();
      const dia = (await page.locator('.cartao-hoje h2').innerText()).trim();
      await r.foto(`${prefixo}-aba-${nomeDeArquivo(dia)}`, { titulo: `Início, aba "${dia}" (${quem})`, comoChegar: `Início → aba "${dia}".` });
    });
  await abas.first().click();
}

roteiro('inicio-ana', 10, 'inicio', 'ana', async (r, page) => {
  await ana(page);
  await r.foto('inicio', { titulo: 'Início, antes do 1º treino (a Ana)', comoChegar: 'Cadastro inteiro pela interface → "Gerar meu programa".' });
  await abasDosDias(r, 'inicio', 'a Ana');
  await r.passo('início, folha do exercício', async () => {
    // sem o apoio dos testes (que abre os blocos para conferi-los): a foto é da folha como ela abre
    await page.getByRole('tabpanel').getByRole('button').first().click();
    await folhaPronta(page);
    const folha = page.getByRole('dialog').last();
    await r.foto('folha-do-exercicio', { titulo: 'Folha do exercício como abre (o 1º do dia A: agachamento búlgaro)', comoChegar: 'Início → toque no 1º exercício da lista.', tipo: 'folha' });
    const mais = folha.locator('details.ver-mais summary');
    if (await mais.count()) {
      await mais.click();
      await r.foto('folha-do-exercicio-ver-mais-opcoes', { titulo: 'Folha do exercício, com "Ver mais opções" aberto', comoChegar: 'Folha do exercício → "Ver mais N opções".', tipo: 'bloco aberto' });
      await mais.click();
    }
    await folha.locator('summary', { hasText: /^Por que este exercício/ }).click();
    await folha.locator('summary', { hasText: /^Por que este exercício/ }).scrollIntoViewIfNeeded();
    await r.foto('folha-do-exercicio-por-que', { titulo: 'Folha do exercício, com "Por que este exercício" aberto', comoChegar: 'Folha do exercício → "Por que este exercício (N motivos)".', tipo: 'bloco aberto' });
    await folhaDoSelo(r, 'folha-do-exercicio-folha-selo', folha.locator('details[open] ul.lista button.selo').first(), { titulo: 'Folha "De onde vem isto" (o selo do 1º motivo do exercício)', comoChegar: 'Folha do exercício → "Por que este exercício" → toque no 1º selo.' });
    await r.fecharFolha();
  });
  await sobreOPrograma(r, '', 'a Ana', true);
  await r.passo('início, os avisos', async () => {
    await verAvisos(page);
    await r.foto('folha-avisos', { titulo: 'Folha "Avisos" (os ajustes possíveis da Ana)', comoChegar: 'Início → "Ver" na linha do aviso.', tipo: 'folha' });
    await folhaDoSelo(r, 'folha-avisos-folha-selo', page.getByRole('dialog', { name: 'Avisos' }).locator('button.selo').first(), { titulo: 'Folha "De onde vem isto" (o selo dos ajustes possíveis)', comoChegar: 'Folha "Avisos" → toque no selo.' });
    await r.fecharFolha();
  });
  await r.passo('início, como ler o seu treino', async () => {
    const comoLer = page.locator('details.como-ler');
    await comoLer.locator('summary').click();
    await comoLer.scrollIntoViewIfNeeded();
    await r.foto('como-ler-aberto', { titulo: 'Início, com "Como ler o seu treino" aberto', comoChegar: 'Início → "Como ler o seu treino".', tipo: 'bloco aberto' });
    await folhaDoSelo(r, 'como-ler-folha-selo', comoLer.locator('button.selo').first(), { titulo: 'Folha "De onde vem isto" (o selo de "Carga", em "Como ler o seu treino")', comoChegar: 'Início → "Como ler o seu treino" → toque no selo de "Carga".' });
    await comoLer.locator('summary').click();
  });
  await r.passo('início, exercício sem animação', async () => {
    await page.getByRole('tab').nth(1).click();
    await page.locator('.cartao-ex', { has: page.locator('.miniatura.vazia') }).first().getByRole('button').first().click();
    await folhaPronta(page);
    const folha = page.getByRole('dialog').last();
    await expect(folha.getByRole('button', { name: 'Como fazer: dicas e erros' })).toBeVisible();
    await r.foto('folha-do-exercicio-sem-animacao', { titulo: 'Folha de um exercício sem animação (guia em texto): crucifixo invertido sentado', comoChegar: 'Início → aba B → toque no exercício com "guia em texto".', tipo: 'folha' });
    await folha.getByRole('button', { name: 'Como fazer: dicas e erros' }).click();
    await folhaPronta(page);
    await r.foto('folha-como-fazer-em-texto', { titulo: 'Folha "Como fazer (em texto)" como abre', comoChegar: 'Folha do exercício sem animação → "Como fazer: dicas e erros".', tipo: 'folha' });
    await page.getByRole('dialog', { name: 'Como fazer (em texto)' }).locator('summary').click();
    await r.foto('folha-como-fazer-em-texto-passo-a-passo', { titulo: 'Folha "Como fazer (em texto)", com "Posição, execução e carga, passo a passo" aberto', comoChegar: 'Folha "Como fazer (em texto)" → "Posição, execução e carga, passo a passo".', tipo: 'bloco aberto' });
    await r.fecharFolha();
    await r.fecharFolha();
    await page.getByRole('tab').first().click();
  });
});

roteiro('inicio-ana-versoes', 20, 'inicio', 'ana', async (r, page) => {
  await semear(page, estadoDaPersona('ana'));
  await inicioPronto(page);
  await r.passo('início, prefiro', async () => {
    const folha = await abrirExercicio(page, /Agachamento búlgaro/);
    await folha.getByRole('button', { name: /^Prefiro / }).nth(1).click();
    await expect(folha.getByRole('button', { name: /^Você prefere / })).toBeVisible();
    await folha.locator('.preferencias').scrollIntoViewIfNeeded();
    await r.foto('folha-do-exercicio-preferencia-salva', { titulo: 'Folha do exercício, depois de "Prefiro…"', comoChegar: 'Folha do exercício → toque em "Prefiro <exercício>".', tipo: 'folha' });
    await r.fecharFolha();
    await expect(page.getByText('Há uma versão nova do seu programa.')).toBeVisible();
    await r.foto('inicio-versao-nova', { titulo: 'Início, com "Há uma versão nova do seu programa."', comoChegar: 'Início → folha do exercício → "Prefiro…" → fechar.', tipo: 'aviso' });
    await page.locator('.aviso-linha').getByRole('button', { name: /^Mais \d+ avisos?$/ }).click();
    await folhaPronta(page);
    await r.foto('inicio-versao-nova-folha-mais-avisos', { titulo: 'Folha "Avisos" aberta por "Mais 1 aviso"', comoChegar: 'Início com versão nova → "Mais 1 aviso".', tipo: 'folha' });
    await r.fecharFolha();
    await page.getByRole('button', { name: 'Atualizar', exact: true }).click();
    await expect(page.getByText('Programa atualizado com as regras novas.')).toBeVisible();
    await r.foto('inicio-programa-atualizado', { titulo: 'Início, depois de "Atualizar"', comoChegar: 'Início com versão nova → "Atualizar".', tipo: 'aviso' });
  });
  await r.passo('início, manter e reabrir os ajustes', async () => {
    const avisos = await verAvisos(page);
    await avisos.getByRole('button', { name: /^Manter/ }).click();
    await expect(page.getByText('Programa mantido.')).toBeVisible();
    await r.foto('inicio-programa-mantido', { titulo: 'Início, depois de "Manter" nos ajustes possíveis', comoChegar: 'Início → "Ver" → "Manter…".', tipo: 'aviso' });
    await page.getByRole('button', { name: 'Sobre o programa' }).click();
    await folhaPronta(page);
    const sobre = page.getByRole('dialog', { name: 'Sobre o programa' });
    await sobre.getByRole('button', { name: 'Ver ajustes possíveis' }).scrollIntoViewIfNeeded();
    await r.foto('sobre-o-programa-ver-ajustes', { titulo: 'Folha "Sobre o programa", com "Ver ajustes possíveis" no fim', comoChegar: 'Início → "Ver" → "Manter…" → "Sobre o programa".', tipo: 'folha' });
    await sobre.getByRole('button', { name: 'Ver ajustes possíveis' }).click();
    await folhaPronta(page);
    await page.getByRole('region', { name: 'Ajustes possíveis' }).locator('button.opcao-ajuste').first().click();
    await expect(page.getByText(/^Programa gerado de novo:/)).toBeVisible();
    await r.foto('inicio-programa-gerado-de-novo', { titulo: 'Início, depois de escolher um ajuste', comoChegar: 'Início → folha "Avisos" → toque no 1º ajuste possível.', tipo: 'aviso' });
  });
  await r.passo('versão nova com um treino em andamento', async () => {
    await comecarTreino(page);
    await page.getByRole('link', { name: /^Voltar ao início/ }).click();
    await inicioPronto(page);
    const folha = await abrirExercicio(page, /./);
    await folha.getByRole('button', { name: /^Prefiro / }).last().click();
    await r.fecharFolha();
    await expect(page.getByText('O programa será atualizado depois do treino em andamento.')).toBeVisible();
    await page.getByText('O programa será atualizado depois do treino em andamento.').scrollIntoViewIfNeeded();
    await r.foto('inicio-com-treino-em-andamento-e-versao-nova', { titulo: 'Início com um treino em andamento e uma mudança à espera ("O programa será atualizado depois do treino em andamento.")', comoChegar: 'Treino em andamento → voltar ao início → folha do exercício → "Prefiro…" → fechar.', tipo: 'aviso' });
  });
});

roteiro('inicio-ana-saude', 30, 'inicio', 'ana + saúde', async (r, page) => {
  await ana(page, {
    passarTriagem: async (p) => {
      await triagem(p, { simEm: ['osso, articulação'] });
      const regioes = grupo(p, 'Quais regiões?');
      for (const x of ['Ombro', 'Joelho', 'Punho']) await regioes.getByLabel(x).check();
      await grupo(p, /E hoje, dói no ombro/).getByLabel('7', { exact: true }).check();
      await grupo(p, /E hoje, dói no joelho/).getByLabel('4', { exact: true }).check();
      await grupo(p, /E hoje, dói no punho/).getByLabel('1', { exact: true }).check();
      await p.getByRole('button', { name: 'Continuar' }).click();
      await folhaPronta(p);
      await p.getByRole('dialog').getByRole('button', { name: 'Isso, nenhuma destas' }).click();
    },
  });
  await r.foto('inicio-ana-saude', { titulo: 'Início da Ana com dor no ombro (7), no joelho (4) e no punho (1): o aviso "Pela triagem"', comoChegar: 'Cadastro com "sim" só em osso e articulação, 3 regiões e as notas de hoje → "Gerar meu programa".' });
  await abasDosDias(r, 'inicio-ana-saude', 'a Ana com dor');
  await r.passo('início com dor, os avisos', async () => {
    await verAvisos(page);
    await r.foto('folha-avisos-ana-saude', { titulo: 'Folha "Avisos": "Pela triagem" e os outros avisos', comoChegar: 'Início com dor → "Ver" na linha do aviso.', tipo: 'folha' });
    await r.fecharFolha();
  });
  await sobreOPrograma(r, '-ana-saude', 'a Ana com dor', false);
  await r.passo('início com dor, folha do exercício', async () => {
    await abrirExercicio(page, /./);
    await r.foto('folha-do-exercicio-ana-saude', { titulo: 'Folha do 1º exercício da Ana com dor, com os motivos abertos', comoChegar: 'Início com dor → toque no 1º exercício → "Por que este exercício".', tipo: 'bloco aberto' });
    await r.fecharFolha();
  });
  await r.passo('refazer a triagem com resposta que pausa', async () => {
    await page.goto('/comecar/triagem');
    await expect(page.getByRole('heading', { name: 'Quais valem para você?' })).toBeVisible();
    await r.foto('refazer-a-triagem-com-sim', { titulo: 'Refazer a triagem (quem tinha um "sim": abre em "Quais valem", com as marcas, as regiões e as notas)', comoChegar: 'Meus dados → "Refazer a triagem".', fluxo: 'dados-e-locais' });
    await page.locator('label.opcao', { hasText: 'coração' }).first().getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Continuar' }).click();
    await folhaPronta(page);
    await page.getByRole('dialog').getByRole('button', { name: 'Isso, nenhuma destas' }).click();
    await expect(page.getByRole('heading', { name: 'Vamos pausar o programa automático' })).toBeVisible();
    await r.foto('refazer-a-triagem-pausa', { titulo: 'Refazer a triagem: "Vamos pausar o programa automático" (com o programa já feito)', comoChegar: 'Refazer a triagem → marcar "coração" → "Continuar" → confirmar.', fluxo: 'dados-e-locais', tipo: 'aviso' });
    await page.goto('/programa');
    await expect(page.getByRole('heading', { name: 'Programa pausado' })).toBeVisible();
    await r.foto('programa-pausado-pela-triagem', { titulo: '"Programa pausado" (a triagem refeita tem um "sim" sem liberação)', comoChegar: 'Refazer a triagem com "sim" em coração e sair sem confirmar a liberação → Início.', tipo: 'aviso' });
    await folhaDoSelo(r, 'programa-pausado-folha-selo', page.locator('main button.selo').first(), { titulo: 'Folha "De onde vem isto" (o selo do programa pausado)', comoChegar: 'Programa pausado → toque no selo.' });
  });
  await r.passo('dor em todas as regiões', async () => {
    const e = await estadoGuardado(page);
    const regioes = ['ombro', 'cotovelo', 'punho', 'lombar', 'quadril', 'joelho', 'tornozelo'];
    await semear(page, { ...e, triagem: { respostas: { ...e.triagem!.respostas, coracao: false, osteoarticular: true }, dores: regioes.map((articulacao) => ({ articulacao, nota: 7 })) } });
    await expect(page.getByRole('heading', { name: 'Programa pausado' })).toBeVisible();
    await r.foto('programa-pausado-sem-exercicio', { titulo: '"Programa pausado" (dor acima de 5 em todas as regiões: nenhum exercício possível)', comoChegar: 'Estado gravado no aparelho: triagem com dor 7 nas 7 regiões.', tipo: 'aviso' });
  });
  await r.passo('dor sem a nota de hoje (dado antigo)', async () => {
    const e = estadoDaPersona('ana');
    await semear(page, { ...e, triagem: { respostas: { ...e.triagem!.respostas, osteoarticular: true }, dores: [{ articulacao: 'ombro' }] } });
    await inicioPronto(page);
    await page.getByRole('button', { name: 'Atualizar', exact: true }).click().catch(() => undefined);
    await verAvisos(page);
    await r.foto('folha-avisos-dor-sem-nota', { titulo: 'Folha "Avisos": "Pela triagem" com uma região sem a nota de hoje', comoChegar: 'Estado gravado no aparelho: triagem antiga, com o ombro marcado e sem nota de dor → Início → "Ver".', tipo: 'folha' });
    await r.fecharFolha();
  });
});

for (const [i, nome, quem, descricao] of [
  [0, 'diego', 'o Diego', 'iniciante em casa, com elásticos e barra fixa'],
  [1, 'elisa', 'a Elisa', 'iniciante, sem equipamento nenhum'],
  [2, 'fabio', 'o Fábio', 'intermediário, só com uma barra fixa'],
  [3, 'bruno', 'o Bruno', 'intermediário voltando de 12 semanas parado, com 2 locais'],
  [4, 'carla', 'a Carla', 'avançada, academia completa'],
] as const)
  roteiro(`inicio-${nome}`, 40 + i, 'inicio', nome, async (r, page) => {
    await semear(page, estadoDaPersona(nome === 'bruno' ? 'bruno-2-locais' : nome));
    await inicioPronto(page);
    await r.foto(`inicio-${nome}`, { titulo: `Início, antes do 1º treino (${quem}: ${descricao})`, comoChegar: `Estado da persona ${nome} gravado no aparelho → abrir o app.` });
    await abasDosDias(r, `inicio-${nome}`, quem);
    if (await page.locator('.aviso-linha').count())
      await r.passo('os avisos', async () => {
        await verAvisos(page);
        await r.foto(`folha-avisos-${nome}`, { titulo: `Folha "Avisos" (${quem})`, comoChegar: 'Início → "Ver" na linha do aviso.', tipo: 'folha' });
        await r.fecharFolha();
      });
    await sobreOPrograma(r, `-${nome}`, quem, false);
    await r.passo('folha do exercício', async () => {
      await abrirExercicio(page, /./);
      await r.foto(`folha-do-exercicio-${nome}`, { titulo: `Folha do 1º exercício (${quem}), com os motivos abertos`, comoChegar: 'Início → toque no 1º exercício → "Por que este exercício".', tipo: 'bloco aberto' });
      await r.fecharFolha();
    });
    if (nome === 'bruno') {
      const onde = grupo(page, 'Onde vou treinar hoje?');
      const abas = page.getByRole('tab');
      for (let a = 0; a < (await abas.count()); a++)
        await r.passo(`onde vou treinar hoje, aba ${a + 1}`, async () => {
          await abas.nth(a).click();
          await onde.getByRole('button', { name: 'Academia do bairro' }).click();
          await expect(onde.locator('.box')).toBeVisible();
          const dia = (await page.locator('.cartao-hoje h2').innerText()).trim();
          await r.foto(`inicio-bruno-na-academia-do-bairro-${nomeDeArquivo(dia)}`, { titulo: `Início do Bruno, "${dia}" no 2º local (Academia do bairro): o que muda no treino`, comoChegar: `Início → aba "${dia}" → "Onde vou treinar hoje?" → "Academia do bairro".` });
        });
      await folhaDoSelo(r, 'inicio-bruno-folha-selo-do-local', onde.locator('.box button.selo'), { titulo: 'Folha "De onde vem isto" (o selo da troca de local)', comoChegar: 'Início com 2 locais → escolher o 2º local → toque no selo "fonte".' });
    }
  });

// ====================================================================================================================
// TREINO
// ====================================================================================================================

const comecarTreino = async (page: Page) => {
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await expect(page.getByRole('region', { name: /^Série \d/ })).toBeVisible();
};
const nomeDoExercicio = async (page: Page) => (await page.locator('h1.titulo').innerText()).trim();
/** Vai ao exercício seguinte pelo "⋯"; devolve false se não há próximo. */
async function proximo(r: Roteiro): Promise<boolean> {
  const folha = await maisOpcoes(r.page);
  const botao = folha.getByRole('button', { name: 'Próximo', exact: true });
  if (!(await botao.isEnabled())) {
    await r.fecharFolha();
    return false;
  }
  await botao.click();
  await r.page.waitForTimeout(400);
  return true;
}
/** Preenche o que falta da série aberta (a carga e a reserva) sem registrar. */
async function preencherSerie(page: Page, indiceDaCarga = 3) {
  const registro = page.getByRole('region', { name: /^Série \d/ });
  await expect(registro).toBeVisible();
  const carga = page.getByLabel('Carga', { exact: true });
  const mais = registro.getByRole('button', { name: /^(Mais carga|Próxima placa|Mais anilha de cada lado|Mais contrapeso)/ }).first();
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT'))) {
    if (!(await carga.inputValue())) await carga.selectOption({ index: indiceDaCarga });
  } else if ((await mais.count()) && (await registro.locator('.carga-valor').first().innerText()).trim() === '—') await mais.click();
  const rir = registro.getByRole('radio', { name: '2', exact: true });
  if (!(await rir.isChecked())) await rir.check();
}
async function serieFeita(page: Page, { pular = true } = {}) {
  await preencherSerie(page);
  await page.getByRole('region', { name: /^Série \d/ }).getByRole('button', { name: /^Série feita/ }).click();
  if (pular) {
    const b = page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: /^(Pular|Ok)$/ });
    if (await b.isVisible().catch(() => false)) await b.click();
  }
}
const sentiAlgo = async (page: Page) => {
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await folhaPronta(page);
  return page.getByRole('region', { name: 'Senti algo' });
};

// O roteiro de 13/11 (a Ana pela interface, dia A), na mesma ordem, e mais os modos do guia dentro do treino.
roteiro('treino-ana', 10, 'treino', 'ana', async (r, page) => {
  await ana(page);
  await comecarTreino(page);
  await r.foto('serie-vazia', { titulo: 'Treino: 1ª série do 1º exercício, vazia (1ª vez no exercício)', comoChegar: 'Início → "Começar o treino".', tipo: 'estado vazio' });
  await r.passo('treino, os modos do guia na série', async () => {
    const modos = grupo(page, 'O que o guia mostra');
    for (const modo of ['Erros', 'Músculos', 'Trajetória']) {
      await modos.getByRole('button', { name: modo, exact: true }).click();
      await r.foto(`serie-vazia-guia-${nomeDeArquivo(modo)}`, { titulo: `Treino: a série com o guia no modo "${modo}"`, comoChegar: `Treino → "${modo}" sob o Boneco.` });
    }
    await modos.getByRole('button', { name: 'Técnica', exact: true }).click();
    await page.getByRole('button', { name: 'Pausar o guia' }).click();
    await r.foto('serie-vazia-guia-pausado', { titulo: 'Treino: a série com o guia pausado', comoChegar: 'Treino → toque no Boneco.' });
    await page.getByRole('button', { name: 'Tocar o guia' }).click();
  });
  await r.passo('treino, por quê da 1ª vez', async () => {
    await porQueDaSugestao(page);
    await folhaPronta(page);
    await expect(page.getByRole('dialog', { name: 'Por quê' }).locator('.selo-folha').first()).toBeVisible();
    await r.foto('folha-por-que-da-1a-vez', { titulo: 'Folha "Por quê" de "1ª vez: comece leve." (a calibração da carga)', comoChegar: 'Treino → "por quê?" ao lado de "1ª vez: comece leve.".', tipo: 'folha' });
    await r.fecharFolha();
  });
  await folhaDoSelo(r, 'folha-selo-do-aquecimento', page.locator('.dicas-serie button.selo').first(), { titulo: 'Folha "De onde vem isto" (o selo do aquecimento)', comoChegar: 'Treino → toque no selo de "Antes: 1–2 séries leves de aquecimento".' });
  await r.passo('treino, por quê da reserva', async () => {
    await grupo(page, /RIR/).getByRole('button', { name: 'por quê?' }).click();
    await folhaPronta(page);
    await expect(page.getByRole('dialog', { name: 'Por quê' }).locator('.selo-folha').first()).toBeVisible();
    await page.waitForTimeout(400);
    await r.foto('folha-por-que-da-reserva', { titulo: 'Folha "Por quê" de "Quantas ainda conseguiria?" (o RIR)', comoChegar: 'Treino → "por quê?" ao lado da meta de reserva.', tipo: 'folha' });
    await r.fecharFolha();
  });
  await r.passo('treino, o que falta na série', async () => {
    await page.getByRole('radio', { name: '2', exact: true }).check();
    await r.foto('serie-falta-a-carga', { titulo: 'Treino: série com a reserva e sem a carga ("Falta escolher a carga.")', comoChegar: 'Treino → marcar a reserva sem escolher a carga.', tipo: 'erro' });
    await page.reload();
    await expect(page.getByRole('region', { name: /^Série \d/ })).toBeVisible();
    await page.getByLabel('Carga', { exact: true }).selectOption({ index: 3 });
    await r.foto('serie-falta-a-reserva', { titulo: 'Treino: série com a carga e sem a reserva ("Falta dizer quantas ainda conseguiria.")', comoChegar: 'Treino → escolher a carga sem marcar a reserva.', tipo: 'erro' });
  });
  await page.getByLabel('Carga', { exact: true }).selectOption({ index: 3 });
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await r.foto('serie-preenchida', { titulo: 'Treino: 1ª série preenchida', comoChegar: 'Treino → escolher a carga, +1 repetição e a reserva 2.' });
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
  await r.foto('descanso', { titulo: 'Treino: descanso depois da 1ª série (com "Série 1 salva · Desfazer")', comoChegar: 'Treino → "Série feita".' });
  await r.passo('treino, senti algo', async () => {
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await page.waitForTimeout(300);
    await r.foto('folha-senti-algo', { titulo: 'Folha "O que você sentiu?"', comoChegar: 'Treino → "Senti algo".', tipo: 'folha' });
    await folhaDoSelo(r, 'folha-senti-algo-folha-selo', page.getByRole('region', { name: 'Senti algo' }).locator('button.selo'), { titulo: 'Folha "De onde vem isto" (o selo de "O app não diagnostica.")', comoChegar: 'Folha "O que você sentiu?" → toque no selo.' });
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await page.waitForTimeout(300);
  });
  await r.passo('treino, mais opções', async () => {
    await maisOpcoes(page);
    await r.foto('folha-mais-opcoes', { titulo: 'Folha "Mais opções" (com uma série feita)', comoChegar: 'Treino → "⋯".', tipo: 'folha' });
    await r.fecharFolha();
  });
  await r.foto('descanso-sem-o-desfazer', { titulo: 'Treino: descanso, passados os 5 s do "Desfazer"', comoChegar: 'Treino → "Série feita" → esperar 5 s.' });
  // no descanso o registro sai da tela; "Mudar" volta aos números da série, com o descanso numa faixa
  await r.passo('treino, a série durante o descanso', async () => {
    await page.getByRole('button', { name: 'Mudar' }).click();
    await r.foto('serie-com-descanso', { titulo: 'Treino: 2ª série com o descanso numa faixa (e a mensagem da calibração)', comoChegar: 'Descanso → "Mudar".' });
  });
  await r.passo('treino, por quê', async () => {
    await page.getByRole('button', { name: 'por quê?' }).first().click();
    await folhaPronta(page);
    await page.waitForTimeout(400);
    await r.foto('folha-por-que-na-2a-serie', { titulo: 'Folha "Por quê" (o 1º "por quê?" da tela na 2ª série: a reserva)', comoChegar: '2ª série → o 1º "por quê?" da tela.', tipo: 'folha' });
    await r.fecharFolha();
  });
  await r.passo('treino, trocar exercício', async () => {
    const trocar = await abrirTrocar(page);
    await r.foto('folha-trocar-exercicio', { titulo: 'Folha "Trocar só neste treino por:"', comoChegar: 'Treino → "⋯" → "Trocar exercício".', tipo: 'folha' });
    const mais = trocar.locator('details.ver-mais summary');
    if (await mais.count()) {
      await mais.click();
      await r.foto('folha-trocar-exercicio-ver-mais', { titulo: 'Folha "Trocar só neste treino por:", com "Ver mais opções" aberto', comoChegar: 'Folha de troca → "Ver mais N opções".', tipo: 'bloco aberto' });
    }
    await r.fecharFolha();
  });
  // os outros exercícios do dia
  await r.passo('treino, os outros exercícios', async () => {
    for (let i = 2; i <= 7; i++) {
      if (!(await proximo(r))) break;
      await r.foto(`exercicio-${i}`, { titulo: `Treino: ${i}º exercício do dia A, 1ª série vazia (${await nomeDoExercicio(page)})`, comoChegar: `Treino → "⋯" → "Próximo" (${i - 1} vez${i > 2 ? 'es' : ''}).`, tipo: 'estado vazio' });
      if (i === 2) {
        // o fim do descanso: o relógio passa de zero e a tela inverte (os minutos saem do relógio do navegador)
        const voltar = page.getByRole('button', { name: /^(Descanso|Hora da próxima série)/ });
        if (await voltar.count()) {
          await voltar.click();
          for (let k = 0; k < 12 && !(await page.locator('.descanso-topo').getByText('Hora da próxima série').isVisible()); k++) await page.getByRole('button', { name: '−15 s' }).click();
          await r.foto('hora-da-proxima-serie', { titulo: 'Treino: fim do descanso, com a tela invertida ("Hora da próxima série")', comoChegar: 'Descanso → "−15 s" até o relógio passar de zero.', tipo: 'aviso' });
          await page.getByRole('button', { name: 'Ok' }).click();
        }
      }
    }
  });
  await r.passo('treino, terminar', async () => {
    await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
    await folhaPronta(page);
    await r.foto('folha-terminar-com-serie', { titulo: 'Folha "Terminar o treino agora?" (com série registrada)', comoChegar: 'Treino → "⋯" → "Terminar o treino agora".', tipo: 'folha' });
    await r.fecharFolha();
  });
  await r.passo('início com o treino em andamento', async () => {
    await page.getByRole('link', { name: /^Voltar ao início/ }).click();
    await inicioPronto(page);
    await r.foto('inicio-com-treino-em-andamento', { titulo: 'Início com um treino em andamento ("Continuar o treino em andamento")', comoChegar: 'Treino → "×" (voltar ao início).', fluxo: 'inicio' });
  });
});

// O que o roteiro de 13/11 não via: exercício completo, drop set, troca, dor, sinais de alerta e a validação.
roteiro('treino-ana-extras', 20, 'treino', 'ana', async (r, page) => {
  await semear(page, estadoDaPersona('ana'));
  await inicioPronto(page);
  await comecarTreino(page);
  await r.passo('dor antes da 1ª série', async () => {
    await (await sentiAlgo(page)).getByRole('button', { name: '0', exact: true }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await r.foto('aviso-dor-0', { titulo: 'Treino: depois da nota de dor 0 ("Pode seguir.")', comoChegar: 'Treino → "Senti algo" → nota 0.', tipo: 'aviso' });
    await (await sentiAlgo(page)).getByRole('button', { name: '2', exact: true }).click();
    await r.foto('aviso-dor-2-antes-da-serie', { titulo: 'Treino: nota de dor 2 antes da 1ª série', comoChegar: 'Treino → "Senti algo" → nota 2, sem série feita.', tipo: 'aviso' });
    await (await sentiAlgo(page)).getByRole('button', { name: '4', exact: true }).click();
    await r.foto('aviso-dor-4-antes-da-serie', { titulo: 'Treino: nota de dor 4 antes da 1ª série', comoChegar: 'Treino → "Senti algo" → nota 4, sem série feita.', tipo: 'aviso' });
    await folhaDoSelo(r, 'aviso-dor-folha-selo', page.locator('.aviso-seguranca button.selo'), { titulo: 'Folha "De onde vem isto" (o selo da escala de dor)', comoChegar: 'Treino → aviso de dor → toque no selo.' });
  });
  await r.passo('dor com o halter mais leve', async () => {
    await page.getByLabel('Carga', { exact: true }).selectOption({ index: 1 });
    await page.getByRole('radio', { name: '2', exact: true }).check();
    await page.getByRole('region', { name: /^Série \d/ }).getByRole('button', { name: /^Série feita/ }).click();
    await (await sentiAlgo(page)).getByRole('button', { name: '4', exact: true }).click();
    await expect(page.getByRole('alert')).toContainText('Não há carga menor aqui');
    await r.foto('aviso-dor-4-sem-carga-menor', { titulo: 'Treino: nota de dor 4 com o halter mais leve (não há carga menor)', comoChegar: 'Treino → série com o halter de 1 kg → "Senti algo" → nota 4.', tipo: 'aviso' });
    await page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: 'Pular' }).click();
    await r.foto('serie-depois-da-calibracao', { titulo: 'Treino: 2ª série, com a mensagem da calibração e as séries feitas (uma com dor)', comoChegar: 'Treino → 1ª série feita → "Pular" o descanso.' });
    await folhaDoSelo(r, 'folha-selo-da-calibracao', page.locator('p.calibracao button.selo'), { titulo: 'Folha "De onde vem isto" (o selo da calibração)', comoChegar: 'Treino → mensagem da calibração → toque no selo.' });
  });
  await r.passo('dor com carga para reduzir', async () => {
    await page.getByLabel('Carga', { exact: true }).selectOption({ index: 6 });
    await page.getByRole('region', { name: /^Série \d/ }).getByRole('button', { name: /^Série feita/ }).click();
    await (await sentiAlgo(page)).getByRole('button', { name: '4', exact: true }).click();
    await expect(page.getByRole('alert')).toContainText('Reduza a carga');
    await r.foto('aviso-dor-4', { titulo: 'Treino: nota de dor 4 depois de uma série ("Reduza a carga…")', comoChegar: 'Treino → série com 6 kg → "Senti algo" → nota 4.', tipo: 'aviso' });
    const pular = page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: 'Pular' });
    if (await pular.isVisible()) await pular.click();
  });
  await r.passo('exercício completo', async () => {
    // registra as séries que faltam; depois da última, o descanso mostra o que vem a seguir
    for (let n = 0; n < 6 && (await page.getByRole('region', { name: /^Série \d/ }).isVisible()); n++) await serieFeita(page, { pular: false });
    await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
    await r.foto('descanso-entre-exercicios', { titulo: 'Treino: descanso depois da última série do exercício ("A seguir · exercício 2 de 6")', comoChegar: 'Treino → registrar todas as séries do exercício.' });
    await page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: 'Pular' }).click();
    await expect(page.getByText('Séries completas.')).toBeVisible();
    await r.foto('exercicio-completo', { titulo: 'Treino: exercício com as séries completas', comoChegar: 'Treino → todas as séries do exercício → "Pular" o descanso.' });
    await page.getByRole('navigation', { name: 'Exercícios' }).getByRole('button', { name: 'Próximo exercício' }).click();
  });
  await r.passo('trocar pela alternativa', async () => {
    await (await abrirTrocar(page)).getByRole('button').first().click();
    await expect(page.getByText(/^No lugar de /)).toBeVisible();
    await r.foto('exercicio-trocado', { titulo: 'Treino: exercício trocado pela alternativa ("No lugar de …, só neste treino.")', comoChegar: 'Treino → "⋯" → "Trocar exercício" → toque na 1ª alternativa.', tipo: 'estado vazio' });
    await (await abrirTrocar(page)).getByRole('button', { name: /^Prefiro / }).first().click().catch(() => undefined);
    await r.foto('folha-trocar-exercicio-com-preferencia', { titulo: 'Folha "Trocar só neste treino por:", com um "Prefiro…" marcado', comoChegar: 'Treino → "⋯" → "Trocar exercício" → "Prefiro…".', tipo: 'folha' });
    await r.fecharFolha();
  });
  await r.passo('dor que encerra o exercício', async () => {
    await (await sentiAlgo(page)).getByRole('button', { name: '7', exact: true }).click();
    await folhaPronta(page);
    await expect(page.getByRole('dialog', { name: 'Trocar só neste treino por:' }).getByRole('alert')).toBeVisible();
    await r.foto('folha-trocar-depois-da-dor', { titulo: 'Folha de troca aberta pela nota de dor 7, com a orientação', comoChegar: 'Treino → "Senti algo" → nota 7.', tipo: 'aviso' });
    await r.fecharFolha();
    await expect(page.getByText('Exercício encerrado.')).toBeVisible();
    await r.foto('exercicio-encerrado-pela-dor', { titulo: 'Treino: exercício encerrado pela dor (a orientação e "Exercício encerrado.")', comoChegar: 'Treino → "Senti algo" → nota 7 → fechar a folha de troca.', tipo: 'aviso' });
    await page.getByRole('navigation', { name: 'Exercícios' }).getByRole('button', { name: 'Próximo exercício' }).click();
  });
  await r.passo('sinal de alerta que encerra o exercício', async () => {
    await (await sentiAlgo(page)).getByRole('button', { name: 'Formigamento ou dormência' }).click();
    await folhaPronta(page);
    await r.foto('folha-trocar-depois-do-sinal', { titulo: 'Folha de troca aberta por "Formigamento ou dormência", com a orientação', comoChegar: 'Treino → "Senti algo" → "Formigamento ou dormência".', tipo: 'aviso' });
    await folhaDoSelo(r, 'folha-trocar-depois-do-sinal-folha-selo', page.getByRole('dialog', { name: 'Trocar só neste treino por:' }).getByRole('alert').locator('button.selo'), { titulo: 'Folha "De onde vem isto" (o selo do sinal de alerta do exercício)', comoChegar: 'Folha de troca depois do sinal → toque no selo.' });
    await r.fecharFolha();
    await page.getByRole('navigation', { name: 'Exercícios' }).getByRole('button', { name: 'Próximo exercício' }).click();
  });
  await r.passo('último exercício completo', async () => {
    for (let n = 0; n < 8; n++) if (!(await proximo(r))) break;
    for (let n = 0; n < 6 && (await page.getByRole('region', { name: /^Série \d/ }).isVisible()); n++) await serieFeita(page);
    await expect(page.getByRole('navigation', { name: 'Exercícios' }).getByRole('button', { name: 'Terminar treino' })).toBeVisible();
    await r.foto('ultimo-exercicio-completo', { titulo: 'Treino: último exercício com as séries completas ("Terminar treino")', comoChegar: 'Treino → último exercício → registrar todas as séries.' });
    await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
    await folhaPronta(page);
    await r.foto('folha-terminar-com-exercicios-por-fazer', { titulo: 'Folha "Terminar o treino agora?" (com exercícios feitos e por fazer)', comoChegar: 'Treino com vários exercícios feitos → "⋯" → "Terminar o treino agora".', tipo: 'folha' });
    await r.fecharFolha();
  });
  // Na 3ª semana (fora da fase de aprendizado da iniciante), com histórico: a sugestão do dia e o drop set.
  await r.passo('a 3ª semana, com histórico', async () => {
    const ha = (dias: number) => new Date(Date.now() - dias * 86_400_000).toISOString();
    await semear(page, comHistorico(estadoDaPersona('ana'), [{ dia: 0, quando: ha(16) }, { dia: 1, quando: ha(14) }, { dia: 2, quando: ha(9) }, { dia: 0, quando: ha(7) }, { dia: 1, quando: ha(2) }]));
    await inicioPronto(page);
    await page.getByRole('tab').first().click();
    await r.foto('inicio-ana-na-3a-semana', { titulo: 'Início da Ana na 3ª semana (passada a fase de aprendizado), com 5 treinos no histórico', comoChegar: 'Histórico fictício: 5 treinos em 16 dias → Início → aba A.', fluxo: 'inicio' });
    await page.getByRole('tabpanel').getByRole('button').last().click();
    await folhaPronta(page);
    await r.foto('folha-do-exercicio-com-drop-set', { titulo: 'Folha de um exercício em bi-set e com a última série em drop set (o último do dia A)', comoChegar: 'Início na 3ª semana → aba A → último exercício.', fluxo: 'inicio', tipo: 'folha' });
    await r.fecharFolha();
    await comecarTreino(page);
    await r.foto('serie-com-sugestao-do-dia', { titulo: 'Treino: 1ª série de um exercício já feito, com a sugestão do dia ("Hoje: …")', comoChegar: 'Histórico fictício → aba A → "Começar o treino".' });
    await porQueDaSugestao(page);
    await folhaPronta(page);
    await page.waitForTimeout(400);
    await r.foto('folha-por-que-da-sugestao-do-dia', { titulo: 'Folha "Por quê" da sugestão do dia', comoChegar: 'Treino → "por quê?" ao lado de "Hoje: …".', tipo: 'folha' });
    await r.fecharFolha();
    // anda até o exercício com a última série em drop set e chega na última série dele
    for (let n = 0; n < 6 && !(await page.locator('p.meta:not(.sr)').count()); n++) if (!(await proximo(r))) break;
    await expect(page.locator('p.meta:not(.sr)')).toBeVisible();
    await r.foto('exercicio-com-drop-set', { titulo: `Treino: exercício com a última série em drop set (${await nomeDoExercicio(page)})`, comoChegar: 'Treino na 3ª semana → "⋯" → "Próximo" até o exercício com drop set.' });
    for (let n = 0; n < 6 && !(await grupo(page, 'Drop set (opcional)').count()); n++) await serieFeita(page);
    await expect(grupo(page, 'Drop set (opcional)')).toBeVisible();
    await grupo(page, 'Drop set (opcional)').scrollIntoViewIfNeeded();
    await r.foto('serie-com-drop-set', { titulo: 'Treino: a última série, com "Drop set (opcional)" e as 2 quedas', comoChegar: 'Exercício com drop set → chegar à última série.' });
    await folhaDoSelo(r, 'serie-com-drop-set-folha-selo', grupo(page, 'Drop set (opcional)').locator('button.selo'), { titulo: 'Folha "De onde vem isto" (o selo do drop set)', comoChegar: 'Última série com drop set → toque no selo.' });
  });
});

// O exercício sem animação (cartão de texto) dentro do treino: o 6º do dia B da Ana.
roteiro('treino-ana-texto', 30, 'treino', 'ana', async (r, page) => {
  await semear(page, estadoDaPersona('ana'));
  await inicioPronto(page);
  await page.getByRole('tab').nth(1).click();
  await comecarTreino(page);
  await r.passo('terminar sem série', async () => {
    await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
    await folhaPronta(page);
    await r.foto('folha-terminar-sem-serie', { titulo: 'Folha "Terminar o treino agora?" (sem nenhuma série)', comoChegar: 'Treino recém-aberto → "⋯" → "Terminar o treino agora".', tipo: 'folha' });
    await r.fecharFolha();
    await maisOpcoes(page);
    await r.foto('folha-mais-opcoes-sem-serie', { titulo: 'Folha "Mais opções" (no 1º exercício, sem série feita)', comoChegar: 'Treino recém-aberto → "⋯".', tipo: 'folha' });
    await r.fecharFolha();
  });
  await r.passo('exercício sem animação', async () => {
    for (let n = 0; n < 8 && !(await page.getByRole('button', { name: 'Como fazer: dicas e erros' }).count()); n++) if (!(await proximo(r))) break;
    await expect(page.getByRole('button', { name: 'Como fazer: dicas e erros' })).toBeVisible();
    await r.foto('exercicio-sem-animacao', { titulo: `Treino: exercício sem animação, com o cartão de texto fechado (${await nomeDoExercicio(page)})`, comoChegar: 'Início → aba B → "Começar o treino" → "⋯" → "Próximo" até o exercício com guia em texto.', tipo: 'estado vazio' });
    await page.getByRole('button', { name: 'Como fazer: dicas e erros' }).click();
    await folhaPronta(page);
    await r.foto('exercicio-sem-animacao-folha-como-fazer', { titulo: 'Treino: folha "Como fazer (em texto)" como abre', comoChegar: 'Exercício sem animação → "Como fazer: dicas e erros".', tipo: 'folha' });
    await page.getByRole('dialog', { name: 'Como fazer (em texto)' }).locator('summary').click();
    await r.foto('exercicio-sem-animacao-folha-como-fazer-passo-a-passo', { titulo: 'Treino: folha "Como fazer (em texto)", com o passo a passo aberto', comoChegar: 'Folha "Como fazer (em texto)" → "Posição, execução e carga, passo a passo".', tipo: 'bloco aberto' });
    await r.fecharFolha();
  });
});

// Os outros tipos de carga e de equipamento: máquina de placas, anilhas, barra, contrapeso, peso do corpo, elástico e o 2º local.
roteiro('treino-outras-personas', 40, 'treino', 'carla', async (r, page) => {
  await semear(page, estadoDaPersona('carla'));
  await inicioPronto(page);
  await page.getByRole('tab').nth(1).click();
  await comecarTreino(page);
  await r.passo('carla, o dia Inferior', async () => {
    for (let i = 1; i <= 9; i++) {
      await r.foto(`carla-inferior-${i}`, { titulo: `Treino da Carla: dia "Inferior", ${i}º exercício, 1ª série vazia (${await nomeDoExercicio(page)})`, comoChegar: `Estado da Carla → aba "Inferior" → "Começar o treino"${i > 1 ? ` → "⋯" → "Próximo" (${i - 1}x)` : ''}.`, tipo: 'estado vazio' });
      if (!(await proximo(r))) break;
    }
  });
  await r.passo('carla, o contrapeso', async () => {
    await terminarTreino(page);
    await page.goto('/programa');
    await inicioPronto(page);
    await page.getByRole('tab').first().click();
    await comecarTreino(page);
    await proximo(r);
    const trocar = await abrirTrocar(page);
    const mais = trocar.locator('details.ver-mais summary');
    if (await mais.count()) await mais.click();
    await r.foto('carla-folha-trocar-exercicio', { titulo: `Folha de troca da Carla (${await nomeDoExercicio(page)}): 13 alternativas`, comoChegar: 'Estado da Carla → dia "Superior" → 2º exercício → "⋯" → "Trocar exercício" → "Ver mais opções".', tipo: 'bloco aberto' });
    await trocar.getByRole('button', { name: /graviton/i }).first().click();
    await expect(page.getByText(/^No lugar de /)).toBeVisible();
    await r.foto('carla-contrapeso', { titulo: 'Treino da Carla: barra fixa assistida no graviton (a carga é o contrapeso)', comoChegar: 'Folha de troca → "Barra fixa assistida no graviton".', tipo: 'estado vazio' });
  });
  for (const [nome, quem] of [['elisa', 'da Elisa (peso do corpo)'], ['diego', 'do Diego (elásticos e barra fixa)'], ['fabio', 'do Fábio (barra fixa)']] as const)
    await r.passo(`treino de ${nome}`, async () => {
      await semear(page, estadoDaPersona(nome));
      await inicioPronto(page);
      await comecarTreino(page);
      for (let i = 1; i <= (nome === 'elisa' ? 4 : 3); i++) {
        await r.foto(`${nome}-exercicio-${i}`, { titulo: `Treino ${quem}: ${i}º exercício, 1ª série vazia (${await nomeDoExercicio(page)})`, comoChegar: `Estado de ${nome} → "Começar o treino"${i > 1 ? ` → "⋯" → "Próximo" (${i - 1}x)` : ''}.`, tipo: 'estado vazio', persona: nome });
        if (i === 1 && nome === 'elisa') {
          await abrirTrocar(page);
          await r.foto('elisa-folha-trocar-sem-alternativa', { titulo: 'Folha de troca sem alternativa ("Este exercício não tem alternativa com o seu equipamento.")', comoChegar: 'Estado da Elisa → treino → "⋯" → "Trocar exercício".', tipo: 'estado vazio', persona: nome });
          await r.fecharFolha();
        }
        if (!(await proximo(r))) break;
      }
    });
  await r.passo('bruno no 2º local', async () => {
    await semear(page, estadoDaPersona('bruno-2-locais'));
    await inicioPronto(page);
    await grupo(page, 'Onde vou treinar hoje?').getByRole('button', { name: 'Academia do bairro' }).click();
    await comecarTreino(page);
    for (let i = 1; i <= 9; i++) {
      if (await page.locator('p.troca-local').count()) {
        await r.foto(`bruno-troca-do-local-${i}`, { titulo: `Treino do Bruno no 2º local: ${i}º exercício, trocado pelo local, com o motivo (${await nomeDoExercicio(page)})`, comoChegar: `Estado do Bruno → "Academia do bairro" → "Começar o treino"${i > 1 ? ` → "Próximo" (${i - 1}x)` : ''}.`, tipo: 'estado vazio', persona: 'bruno' });
        if (i > 1) break;
      } else if (i === 1) await r.foto('bruno-volta-da-pausa-exercicio-1', { titulo: `Treino do Bruno (voltando de pausa): 1º exercício (${await nomeDoExercicio(page)})`, comoChegar: 'Estado do Bruno → "Academia do bairro" → "Começar o treino".', tipo: 'estado vazio', persona: 'bruno' });
      if (!(await proximo(r))) break;
    }
  });
});

// ====================================================================================================================
// GUIA
// ====================================================================================================================

const HUD = '.hud .phase, .hud .breath';
const guiaPronto = async (page: Page) => {
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.waitForTimeout(600);
};
/** Os 4 modos de um guia e, no fim, todos os blocos abertos. */
async function guiaResumido(r: Roteiro, prefixo: string, quem: string, comoChegar: string) {
  const { page } = r;
  const nome = (await page.getByRole('heading', { level: 1 }).innerText()).trim();
  await r.foto(`${prefixo}-tecnica`, { titulo: `Guia de ${quem}: ${nome}, modo Técnica`, comoChegar, alternam: HUD });
  for (const modo of ['Erros', 'Músculos', 'Trajetória']) {
    await grupo(page, 'Informação').getByRole('button', { name: modo, exact: true }).click();
    await r.foto(`${prefixo}-${nomeDeArquivo(modo)}`, { titulo: `Guia de ${quem}: ${nome}, modo ${modo}`, comoChegar: `${comoChegar} → "${modo}".` });
  }
  await grupo(page, 'Informação').getByRole('button', { name: 'Técnica', exact: true }).click();
  const fechados = page.locator('.secao-guia details:not([open]) > summary');
  for (let n = await fechados.count(); n > 0; n--) await fechados.first().click();
  await r.foto(`${prefixo}-tudo-aberto`, { titulo: `Guia de ${quem}: ${nome}, com os 7 blocos abertos`, comoChegar: `${comoChegar} → abrir cada bloco.`, tipo: 'bloco aberto' });
}

roteiro('guia-ana', 10, 'guia', 'ana', async (r, page) => {
  await semear(page, estadoDaPersona('ana'));
  await inicioPronto(page);
  await comecarTreino(page);
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await guiaPronto(page);
  await r.foto('tecnica', { titulo: 'Guia aberto pelo treino: agachamento búlgaro, modo Técnica', comoChegar: 'Treino → "Ver como fazer" (o livro, no cabeçalho).', alternam: HUD });
  await r.passo('guia, as vistas', async () => {
    const vistas = grupo(page, 'Visão').getByRole('button');
    for (let i = 0; i < (await vistas.count()); i++) {
      if ((await vistas.nth(i).getAttribute('aria-pressed')) === 'true') continue;
      const vista = (await vistas.nth(i).innerText()).trim();
      await vistas.nth(i).click();
      await r.foto(`tecnica-vista-${nomeDeArquivo(vista)}`, { titulo: `Guia: modo Técnica, vista "${vista}"`, comoChegar: `Guia → "${vista}".` });
    }
    await page.getByRole('button', { name: 'Pausar' }).click();
    await page.getByRole('button', { name: 'Lento' }).click();
    await r.foto('tecnica-pausado-e-lento', { titulo: 'Guia: modo Técnica, pausado e com "Lento" ligado', comoChegar: 'Guia → "Pausar" → "Lento".' });
    await page.getByRole('button', { name: 'Lento' }).click();
    await page.getByRole('button', { name: 'Reproduzir' }).click();
  });
  for (const [arquivo, modo] of [['erros', 'Erros'], ['musculos', 'Músculos'], ['trajetoria', 'Trajetória']] as const)
    await r.passo(`guia, modo ${modo}`, async () => {
      await grupo(page, 'Informação').getByRole('button', { name: modo, exact: true }).click();
      await r.foto(arquivo, { titulo: `Guia: agachamento búlgaro, modo ${modo}`, comoChegar: `Guia → "${modo}".` });
      if (modo !== 'Erros') return;
      const erros = page.locator('.errchip');
      for (let i = 1; i < (await erros.count()); i++) {
        await erros.nth(i).click();
        await r.foto(`erros-${i + 1}`, { titulo: `Guia: modo Erros, ${i + 1}º erro ("${(await erros.nth(i).innerText()).trim()}")`, comoChegar: `Guia → "Erros" → toque no ${i + 1}º erro.` });
      }
    });
  await grupo(page, 'Informação').getByRole('button', { name: 'Técnica', exact: true }).click();
  await r.passo('guia, os blocos que abrem', async () => {
    const blocos = page.locator('.secao-guia details');
    for (let i = 0; i < (await blocos.count()); i++) {
      const resumo = blocos.nth(i).locator('summary');
      const rotulo = (await resumo.innerText()).trim();
      if ((await blocos.nth(i).getAttribute('open')) === null) await resumo.click();
      await resumo.scrollIntoViewIfNeeded();
      await r.foto(`bloco-${nomeDeArquivo(rotulo)}`, { titulo: `Guia: só o bloco "${rotulo}" aberto`, comoChegar: `Guia → "${rotulo}"${i === 0 ? ' (vem aberto)' : ''}.`, tipo: 'bloco aberto' });
      await resumo.click();
    }
    await page.evaluate(() => window.scrollTo(0, 0));
  });
  await r.folha('folha-por-que-da-prescricao', () => page.locator('.rx').getByRole('button', { name: 'por quê?' }).click(), { titulo: 'Folha "A prescrição de hoje" (por quê?)', comoChegar: 'Guia → "por quê?" abaixo da prescrição.' });
  await r.passo('guia, a lista de conferência marcada', async () => {
    await page.locator('.check input').first().check();
    await page.locator('.check').scrollIntoViewIfNeeded();
    await r.foto('lista-de-conferencia', { titulo: 'Guia: "Confira em 5 segundos", com um item marcado', comoChegar: 'Guia → marcar o 1º item de "Confira em 5 segundos".' });
    await page.evaluate(() => window.scrollTo(0, 0));
  });
  await r.passo('guia, com o descanso contando', async () => {
    await page.getByRole('link', { name: 'Voltar ao treino' }).click();
    await expect(page).toHaveURL(/\/treino$/);
    await preencherSerie(page);
    await page.getByRole('region', { name: /^Série \d/ }).getByRole('button', { name: /^Série feita/ }).click();
    await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
    await page.getByRole('link', { name: 'Ver como fazer' }).click();
    await guiaPronto(page);
    await r.foto('tecnica-com-descanso', { titulo: 'Guia aberto durante o descanso (a faixa "Descanso" no alto)', comoChegar: 'Treino → "Série feita" → "Ver como fazer".' });
  });
  await r.passo('guia, aberto pelo programa', async () => {
    await page.goto('/programa');
    await inicioPronto(page);
    await page.getByRole('tabpanel').getByRole('button').nth(2).click();
    await folhaPronta(page);
    await page.getByRole('dialog').getByRole('link', { name: 'Ver como fazer' }).click();
    await guiaPronto(page);
    await guiaResumido(r, 'pelo-programa', 'halter (a Ana, pelo programa)', 'Início → 3º exercício da lista → "Ver como fazer"');
  });
});

roteiro('guia-carla', 20, 'guia', 'carla', async (r, page) => {
  await semear(page, estadoDaPersona('carla'));
  await inicioPronto(page);
  for (const [prefixo, exercicio] of [['carla-polia', /^Crucifixo na polia/], ['carla-polia-remada', /^Puxada unilateral/]] as const)
    await r.passo(`guia de ${prefixo}`, async () => {
      await page.goto('/programa');
      await inicioPronto(page);
      await page.getByRole('tabpanel').getByRole('button', { name: exercicio }).first().click();
      await folhaPronta(page);
      await page.getByRole('dialog').getByRole('link', { name: 'Ver como fazer' }).click();
      await guiaPronto(page);
      await guiaResumido(r, prefixo, 'polia (a Carla)', `Estado da Carla → Início → "${String(exercicio).replace(/[/^]/g, '')}…" → "Ver como fazer"`);
    });
});

roteiro('guia-elisa', 30, 'guia', 'elisa', async (r, page) => {
  await semear(page, estadoDaPersona('elisa'));
  await inicioPronto(page);
  for (const i of [0, 1])
    await r.passo(`guia do ${i + 1}º exercício da Elisa`, async () => {
      await page.goto('/programa');
      await inicioPronto(page);
      await page.getByRole('tabpanel').getByRole('button').nth(i).click();
      await folhaPronta(page);
      await page.getByRole('dialog').getByRole('link', { name: 'Ver como fazer' }).click();
      await guiaPronto(page);
      await guiaResumido(r, `elisa-corpo-livre-${i + 1}`, 'corpo livre (a Elisa)', `Estado da Elisa → Início → ${i + 1}º exercício → "Ver como fazer"`);
    });
});

roteiro('guia-catalogo', 40, 'guia', 'ninguém', async (r, page) => {
  await page.goto('/guia');
  await guiaPronto(page);
  await r.foto('catalogo', { titulo: 'Guia sem contexto (o catálogo das animações): supino inclinado com halteres', comoChegar: 'Abrir o endereço /guia (não há link para ele no app).', alternam: HUD });
  await r.passo('catálogo, as animações novas', async () => {
    await page.getByRole('navigation', { name: 'Treinos' }).getByRole('button', { name: 'Novas' }).click();
    await guiaPronto(page);
    await r.foto('catalogo-novas', { titulo: 'Guia sem contexto, grupo "Novas" (os nomes curtos de todas as animações novas)', comoChegar: 'Endereço /guia → "Novas".' });
  });
  await r.passo('catálogo, exercício com nota de montagem segura', async () => {
    await page.goto('/guia/bulgaro-suspensao');
    await guiaPronto(page);
    await r.foto('catalogo-nota-de-montagem-segura', { titulo: 'Guia de um exercício com a nota "Montagem segura" abaixo do palco (búlgaro na suspensão)', comoChegar: 'Abrir o endereço /guia/bulgaro-suspensao.' });
    await folhaDoSelo(r, 'catalogo-nota-de-montagem-segura-folha-selo', page.locator('.nota-guia button.selo'), { titulo: 'Folha "De onde vem isto" (o selo da montagem segura)', comoChegar: 'Guia com nota de montagem segura → toque no selo.' });
  });
});

// ====================================================================================================================
// FIM DO TREINO, SEMANA E EVOLUÇÃO
// ====================================================================================================================

roteiro('fim-ana', 10, 'fim-e-semana', 'ana', async (r, page) => {
  await semear(page, estadoDaPersona('ana'), '/semana');
  await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
  await r.foto('semana-vazia', { titulo: 'Semana sem nenhum treino (programa novo)', comoChegar: 'Início → "Semana" na barra de baixo, antes do 1º treino.', tipo: 'estado vazio' });
  await r.passo('semana, como ler este quadro', async () => {
    const resumo = page.locator('summary', { hasText: 'Como ler este quadro' });
    await resumo.click();
    await resumo.scrollIntoViewIfNeeded();
    await r.foto('semana-como-ler-este-quadro', { titulo: 'Semana, com "Como ler este quadro" aberto', comoChegar: 'Semana → "Como ler este quadro".', tipo: 'bloco aberto' });
    await folhaDoSelo(r, 'semana-como-ler-folha-selo', page.locator('details[open] button.selo').first(), { titulo: 'Folha "De onde vem isto" (o selo da série efetiva)', comoChegar: 'Semana → "Como ler este quadro" → toque no selo.' });
  });
  await r.passo('evolução sem treino', async () => {
    await page.goto('/evolucao/supino-reto');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await r.foto('evolucao-vazia', { titulo: 'Evolução de um exercício sem treino registrado', comoChegar: 'Abrir /evolucao/supino-reto antes do 1º treino (não há link para ela sem histórico).', tipo: 'estado vazio' });
  });
  await r.passo('fim sem série', async () => {
    await page.goto('/programa');
    await inicioPronto(page);
    await comecarTreino(page);
    await terminarTreino(page);
    await expect(page).toHaveURL(/\/treino\/fim$/);
    await r.foto('fim-sem-serie', { titulo: 'Fim do treino sem nenhuma série ("Guardar mesmo assim")', comoChegar: 'Treino recém-aberto → "⋯" → "Terminar o treino agora" → "Guardar mesmo assim".', tipo: 'estado vazio' });
  });
  await page.goto('/programa');
  await inicioPronto(page);
  await comecarTreino(page);
  await page.getByLabel('Carga', { exact: true }).selectOption({ index: 3 });
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await terminarTreino(page);
  await expect(page).toHaveURL(/\/treino\/fim$/);
  await r.foto('fim-do-treino', { titulo: 'Fim do treino com 1 série (o 1º treino da Ana)', comoChegar: 'Treino → 1 série → "⋯" → "Terminar o treino agora" → "Terminar o treino".' });
  await r.folha('fim-folha-o-que-conta', () => page.getByRole('button', { name: 'o que conta' }).click(), { titulo: 'Folha "A sua semana" (o que conta)', comoChegar: 'Fim do treino → "o que conta".' });
  await r.folha('fim-folha-para-que-serve', () => page.getByRole('button', { name: 'para que serve' }).click(), { titulo: 'Folha "Hoje foi" (para que serve)', comoChegar: 'Fim do treino → "para que serve".' });
  await r.folha('fim-folha-por-que-da-proxima-vez', () => page.locator('.resumo-ex').first().getByRole('button', { name: 'por quê?' }).click(), { titulo: 'Folha do "por quê?" de "Para a próxima vez" (o 1º exercício)', comoChegar: 'Fim do treino → "por quê?" na linha do exercício.' });
  await r.passo('fim, apagar este treino', async () => {
    await page.getByRole('button', { name: 'Registrei algo errado: apagar este treino' }).click();
    await page.getByRole('group', { name: 'Apagar este treino?' }).scrollIntoViewIfNeeded();
    await r.foto('fim-apagar-este-treino', { titulo: 'Fim do treino, com a confirmação "Apagar este treino?"', comoChegar: 'Fim do treino → "Registrei algo errado: apagar este treino".', tipo: 'aviso' });
    await page.getByRole('button', { name: 'Manter', exact: true }).click();
  });
  await page.goto('/semana');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await r.foto('semana-1-treino', { titulo: 'Semana com 1 treino', comoChegar: 'Fim do treino → "Ver a sua semana".' });
  await r.passo('evolução', async () => {
    await page.locator('a[href^="/evolucao/"]').first().click();
    await expect(page).toHaveURL(/\/evolucao\//);
    await r.foto('evolucao-1-treino', { titulo: 'Evolução de um exercício com 1 treino', comoChegar: 'Semana → "Sua evolução" → toque no exercício.' });
    await folhaDoSelo(r, 'evolucao-folha-selo', page.locator('main button.selo').first(), { titulo: 'Folha "De onde vem isto" (o selo da evolução)', comoChegar: 'Evolução → toque no selo.' });
  });
  await r.passo('início depois do 1º treino', async () => {
    await page.goto('/programa');
    await inicioPronto(page);
    await r.foto('inicio-depois-do-1o-treino', { titulo: 'Início, depois do 1º treino (com a faixa "A sua semana")', comoChegar: 'Fim do treino → "Voltar ao início".', fluxo: 'inicio' });
    await page.getByRole('tab').first().click();
    await page.getByRole('tabpanel').getByRole('button').first().click();
    await folhaPronta(page);
    await r.foto('folha-do-exercicio-com-historico', { titulo: 'Folha do exercício com histórico ("Ver a evolução deste exercício")', comoChegar: 'Início depois do 1º treino → aba A → 1º exercício.', fluxo: 'inicio', tipo: 'folha' });
    await page.getByRole('dialog').getByRole('link', { name: 'Ver a evolução deste exercício' }).click();
    await expect(page).toHaveURL(/\/evolucao\//);
    await r.foto('evolucao-pelo-programa', { titulo: 'Evolução aberta pela folha do exercício (voltar: "Treino")', comoChegar: 'Folha do exercício → "Ver a evolução deste exercício".' });
  });
  await r.passo('treino encerrado por segurança', async () => {
    await page.goto('/programa');
    await inicioPronto(page);
    await comecarTreino(page);
    await (await sentiAlgo(page)).getByRole('button', { name: 'Dor, pressão ou aperto no peito' }).click();
    await expect(page.getByRole('heading', { name: 'Treino encerrado por segurança' })).toBeVisible();
    await r.foto('fim-encerrado-por-seguranca', { titulo: 'Fim do treino encerrado por um sinal de alerta ("Treino encerrado por segurança", SAMU 192)', comoChegar: 'Treino → "Senti algo" → "Dor, pressão ou aperto no peito".', tipo: 'aviso' });
    await folhaDoSelo(r, 'fim-encerrado-por-seguranca-folha-selo', page.getByRole('alert').locator('button.selo'), { titulo: 'Folha "De onde vem isto" (o selo do alerta cardiovascular)', comoChegar: 'Treino encerrado por segurança → toque no selo.' });
  });
});

// Com histórico fictício gravado no aparelho e o relógio parado numa quinta-feira (como tests/e2e/acompanhamento.spec.ts).
const AGORA = new Date('2026-11-05T15:00:00.000Z'); // quinta-feira, 12:00 em Brasília
const em = (dia: string, hora = 13) => `2026-${dia}T${String(hora).padStart(2, '0')}:00:00.000Z`;
async function comTreinos(page: Page, sessoes: SessaoSemeada[], rota = '/programa', mudar: (e: ReturnType<typeof estadoDaPersona>) => ReturnType<typeof estadoDaPersona> = (e) => e) {
  await semear(page, mudar(comHistorico(estadoDaPersona('ana'), sessoes)), rota);
}

roteiro('semana-com-historico', 20, 'fim-e-semana', 'ana', async (r, page) => {
  await page.clock.setFixedTime(AGORA);
  const antes: SessaoSemeada[] = [
    { dia: 0, quando: em('10-20') },
    { dia: 1, quando: em('10-22') },
    { dia: 2, quando: em('10-24') },
    { dia: 0, quando: em('10-27'), series: { 'supino-reto': [[8, 10], [8, 9]] } },
    { dia: 1, quando: em('10-29') },
  ];
  await r.passo('semana completa', async () => {
    await comTreinos(page, [...antes, { dia: 2, quando: em('11-02') }, { dia: 1, quando: em('11-03') }, { dia: 0, quando: em('11-04'), series: { 'supino-reto': [[8, 12], [8, 12]] } }], '/semana');
    await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
    await r.foto('semana-completa', { titulo: 'Semana completa (3 de 3), com "O que subiu nesta semana", as últimas semanas e a evolução', comoChegar: 'Histórico fictício: 8 treinos em 3 semanas, os 3 desta semana feitos → "Semana".' });
    await page.getByRole('region', { name: 'O que subiu nesta semana' }).getByRole('link').first().click();
    await expect(page).toHaveURL(/\/evolucao\//);
    await r.foto('evolucao-com-historico', { titulo: 'Evolução de um exercício com vários treinos ("Começou com … · agora …", recorde)', comoChegar: 'Semana → "O que subiu nesta semana" → toque no exercício.' });
    await page.goto('/treino/fim');
    await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
    await r.foto('fim-com-recorde', { titulo: 'Fim do treino com recorde e carga para subir ("O que mudou hoje")', comoChegar: 'Histórico fictício: o último treino tem um recorde no supino → fim do treino.' });
    await r.folha('fim-com-recorde-folha-por-que-subir', () => page.locator('.resumo-ex', { has: page.locator('.acao-subir') }).first().getByRole('button', { name: 'por quê?' }).click(), { titulo: 'Folha do "por quê?" de um exercício com "Subir"', comoChegar: 'Fim do treino → "por quê?" na linha com "Subir".' });
    await page.goto('/programa');
    await inicioPronto(page);
    await r.foto('inicio-semana-completa', { titulo: 'Início com a semana completa e o lembrete de cópia', comoChegar: 'Histórico fictício: 8 treinos, nenhuma cópia exportada → Início.', fluxo: 'inicio' });
  });
  await r.passo('semana com 2 de 3', async () => {
    await comTreinos(page, [...antes.slice(0, 3), { dia: 0, quando: em('11-02') }, { dia: 1, quando: em('11-03') }], '/semana');
    await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
    await r.foto('semana-2-de-3', { titulo: 'Semana com 2 de 3 treinos e uma semana anterior sem treino', comoChegar: 'Histórico fictício: 3 treinos há 2 semanas e 2 nesta semana → "Semana".' });
  });
  await r.passo('revisão da meta', async () => {
    await comTreinos(page, [{ dia: 0, quando: em('10-06') }, { dia: 1, quando: em('10-13') }, { dia: 2, quando: em('10-20') }, { dia: 0, quando: em('10-27') }, { dia: 1, quando: em('11-02') }], '/semana');
    await expect(page.getByRole('heading', { name: 'Um programa que cabe melhor?' })).toBeVisible();
    await page.getByRole('heading', { name: 'Um programa que cabe melhor?' }).scrollIntoViewIfNeeded();
    await r.foto('semana-revisao-da-meta', { titulo: 'Semana com a oferta "Um programa que cabe melhor?"', comoChegar: 'Histórico fictício: 1 treino por semana nas últimas 4 semanas, com 3 planejados → "Semana".', tipo: 'aviso' });
  });
});

roteiro('volta-e-semana-leve', 30, 'fim-e-semana', 'ana', async (r, page) => {
  await page.clock.setFixedTime(AGORA);
  const volta = async (nome: string, dias: string, sessoes: SessaoSemeada[]) =>
    r.passo(`volta de ${dias}`, async () => {
      await comTreinos(page, sessoes);
      await expect(page.getByRole('region', { name: 'Bem-vindo de volta!' })).toBeVisible();
      await r.foto(`inicio-volta-${nome}`, { titulo: `Início na volta de uma pausa de ${dias}: o cartão "Bem-vindo de volta!"`, comoChegar: `Histórico fictício: último treino há ${dias} → Início.`, tipo: 'aviso' });
      await page.getByRole('region', { name: 'Bem-vindo de volta!' }).getByRole('button', { name: 'por quê?' }).click();
      await folhaPronta(page);
      await page.waitForTimeout(400);
      await r.foto(`inicio-volta-${nome}-folha-por-que`, { titulo: `Folha "Bem-vindo de volta!" (por quê?), pausa de ${dias}`, comoChegar: 'Início na volta da pausa → "por quê?".', tipo: 'folha' });
      await r.fecharFolha();
    });
  await volta('22-dias', '22 dias', [{ dia: 0, quando: em('10-12') }, { dia: 1, quando: em('10-13') }, { dia: 2, quando: em('10-14') }]);
  await r.passo('volta de 22 dias, sobre o programa e o treino', async () => {
    await page.getByRole('button', { name: 'Sobre o programa' }).click();
    await folhaPronta(page);
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'Como está o seu programa' })).toBeVisible();
    await r.foto('sobre-o-programa-na-volta', { titulo: 'Folha "Sobre o programa" na volta da pausa (a fase da semana 1)', comoChegar: 'Início na volta da pausa → "Sobre o programa".', tipo: 'folha' });
    await r.fecharFolha();
    await comecarTreino(page);
    await r.foto('treino-na-volta', { titulo: 'Treino na volta da pausa: a carga 10% menor já preenchida ("Hoje: 9 kg")', comoChegar: 'Início na volta da pausa → "Começar o treino".', fluxo: 'treino' });
    await porQueDaSugestao(page);
    await folhaPronta(page);
    await page.waitForTimeout(400);
    await r.foto('treino-na-volta-folha-por-que', { titulo: 'Folha "Por quê" da sugestão do dia na volta da pausa', comoChegar: 'Treino na volta da pausa → "por quê?" ao lado de "Hoje: 9 kg".', fluxo: 'treino', tipo: 'folha' });
    await r.fecharFolha();
  });
  await volta('15-dias', '15 dias', [{ dia: 0, quando: em('10-19') }, { dia: 1, quando: em('10-20') }, { dia: 2, quando: em('10-21') }]);
  await volta('60-dias', '60 dias', [{ dia: 0, quando: em('09-04') }, { dia: 1, quando: em('09-05') }, { dia: 2, quando: em('09-06') }]);
  await volta('200-dias', '200 dias', [{ dia: 0, quando: em('04-17') }, { dia: 1, quando: em('04-18') }, { dia: 2, quando: em('04-19') }]);
  await r.passo('volta de 200 dias, as respostas', async () => {
    await page.getByRole('region', { name: 'Bem-vindo de volta!' }).getByRole('button', { name: 'Agora não' }).click();
    await expect(page.getByText('Tudo bem: o programa segue, com a mesma volta leve.')).toBeVisible();
    await r.foto('inicio-volta-200-dias-agora-nao', { titulo: 'Início na volta de 200 dias, depois de "Agora não"', comoChegar: 'Início na volta de 200 dias → "Agora não".', tipo: 'aviso' });
    await comTreinos(page, [{ dia: 0, quando: em('04-17') }, { dia: 1, quando: em('04-18') }, { dia: 2, quando: em('04-19') }]);
    await page.getByRole('button', { name: 'Refazer o nível' }).click();
    await expect(page.getByRole('heading', { name: 'Experiência', exact: true })).toBeVisible();
    await r.foto('refazer-o-nivel', { titulo: 'Experiência aberta por "Refazer o nível" (a pausa e o nível vêm sem resposta)', comoChegar: 'Início na volta de 200 dias → "Refazer o nível".', fluxo: 'dados-e-locais' });
  });
  const pesados: SessaoSemeada[] = [{ dia: 2, quando: em('10-20') }, { dia: 1, quando: em('10-27') }, { dia: 0, quando: em('11-02'), hojeFoi: 'pesado' }, { dia: 1, quando: em('11-03'), hojeFoi: 'pesado' }];
  await r.passo('semana leve, a oferta', async () => {
    await comTreinos(page, pesados);
    await inicioPronto(page);
    await expect(page.locator('.aviso-linha')).toContainText('Semana leve?');
    await r.foto('inicio-oferta-de-semana-leve', { titulo: 'Início com a oferta "Semana leve? (opcional)" na linha do aviso', comoChegar: 'Histórico fictício: "pesado demais" em 2 dos últimos 3 treinos, na 3ª semana → Início.', tipo: 'aviso' });
    await verAvisos(page);
    await r.foto('inicio-oferta-de-semana-leve-folha-avisos', { titulo: 'Folha "Avisos": "Semana leve? (opcional)" e os outros avisos', comoChegar: 'Início com a oferta → "Ver".', tipo: 'folha' });
    await r.fecharFolha();
    await page.goto('/semana');
    await expect(page.getByRole('region', { name: 'Semana leve? (opcional)' })).toBeVisible();
    await page.getByRole('region', { name: 'Semana leve? (opcional)' }).scrollIntoViewIfNeeded();
    await r.foto('semana-com-oferta-de-semana-leve', { titulo: 'Semana com a oferta "Semana leve? (opcional)"', comoChegar: 'Histórico fictício com "pesado demais" → "Semana".', tipo: 'aviso' });
    await page.goto('/treino/fim');
    await expect(page.getByRole('region', { name: 'Semana leve? (opcional)' })).toBeVisible();
    await r.foto('fim-com-oferta-de-semana-leve', { titulo: 'Fim do treino com "pesado demais" marcado e a oferta "Semana leve? (opcional)"', comoChegar: 'Histórico fictício: o último treino marcado "pesado demais" → fim do treino.', tipo: 'aviso' });
    await page.getByRole('button', { name: 'Fazer a semana leve' }).click();
    await expect(page.getByRole('region', { name: /^Semana leve até / })).toBeVisible();
    await page.getByRole('region', { name: /^Semana leve até / }).scrollIntoViewIfNeeded();
    await r.foto('fim-com-semana-leve-ativa', { titulo: 'Fim do treino com a semana leve aceita ("Semana leve até …")', comoChegar: 'Fim do treino com a oferta → "Fazer a semana leve".', tipo: 'aviso' });
  });
  await r.passo('semana leve, ativa', async () => {
    await page.goto('/programa');
    await inicioPronto(page);
    await expect(page.locator('.aviso-linha')).toContainText(/^Semana leve até /);
    await r.foto('inicio-semana-leve-ativa', { titulo: 'Início com a semana leve ativa', comoChegar: 'Semana leve aceita → Início.', tipo: 'aviso' });
    await verAvisos(page);
    await r.foto('inicio-semana-leve-ativa-folha-avisos', { titulo: 'Folha "Avisos": "Semana leve até …", com "Voltar ao normal"', comoChegar: 'Início com a semana leve ativa → "Ver".', tipo: 'folha' });
    await r.fecharFolha();
    await page.getByRole('button', { name: 'Sobre o programa' }).click();
    await folhaPronta(page);
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'Como está o seu programa' })).toBeVisible();
    await r.foto('sobre-o-programa-na-semana-leve', { titulo: 'Folha "Sobre o programa" na semana leve (a fase diz "Semana leve: …")', comoChegar: 'Início com a semana leve ativa → "Sobre o programa".', tipo: 'folha' });
    await r.fecharFolha();
    await page.goto('/semana');
    await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
    await r.foto('semana-na-semana-leve', { titulo: 'Semana com a semana leve ativa (a meta é a prescrita para a semana)', comoChegar: 'Semana leve aceita → "Semana".', tipo: 'aviso' });
  });
  await r.passo('dor que se repete', async () => {
    await comTreinos(page, [{ dia: 2, quando: em('10-20') }, { dia: 1, quando: em('10-27') }, { dia: 0, quando: em('11-02'), dor: { 'supino-reto': 4 } }, { dia: 1, quando: em('11-03'), dor: { 'supino-reto': 4 } }]);
    await inicioPronto(page);
    await expect(page.getByRole('note')).toBeVisible();
    await r.foto('inicio-dor-que-se-repete', { titulo: 'Início com o aviso de dor que se repete no mesmo exercício', comoChegar: 'Histórico fictício: nota de dor 4 no supino nos 2 últimos treinos → Início.', tipo: 'aviso' });
    if (await page.locator('.aviso-linha').count()) {
      await verAvisos(page);
      await r.foto('inicio-dor-que-se-repete-folha-avisos', { titulo: 'Folha "Avisos" com a dor que se repete como motivo da semana leve', comoChegar: 'Início com dor que se repete → "Ver".', tipo: 'folha' });
      await r.fecharFolha();
    }
    await page.goto('/treino/fim');
    await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
    await r.foto('fim-com-dor', { titulo: 'Fim do treino com dor registrada (a linha do exercício diz "Ajustar")', comoChegar: 'Histórico fictício: nota de dor 4 no supino → fim do treino.', tipo: 'aviso' });
    await r.folha('fim-com-dor-folha-por-que', () => page.locator('.resumo-ex', { has: page.locator('.acao-ajustar') }).first().getByRole('button', { name: 'por quê?' }).click(), { titulo: 'Folha do "por quê?" de um exercício com "Ajustar" (dor)', comoChegar: 'Fim do treino com dor → "por quê?" na linha com "Ajustar".' });
  });
  await r.passo('o tempo dos treinos', async () => {
    await comTreinos(page, [{ dia: 0, quando: em('10-27'), minutos: 80 }, { dia: 1, quando: em('10-29'), minutos: 80 }, { dia: 2, quando: em('10-31'), minutos: 80 }]);
    await inicioPronto(page);
    await expect(page.locator('.aviso-linha')).toContainText('O tempo dos seus treinos');
    await r.foto('inicio-aviso-do-tempo', { titulo: 'Início com o aviso "O tempo dos seus treinos"', comoChegar: 'Histórico fictício: 3 treinos de 80 min, com 45 previstos → Início.', tipo: 'aviso' });
    await verAvisos(page);
    await r.foto('inicio-aviso-do-tempo-folha-avisos', { titulo: 'Folha "Avisos": "O tempo dos seus treinos"', comoChegar: 'Início com o aviso do tempo → "Ver".', tipo: 'folha' });
    await page.getByRole('dialog', { name: 'Avisos' }).getByRole('button', { name: 'Ajustar', exact: true }).click();
    await expect(page.getByText('Estimativa ajustada ao seu tempo real.')).toBeVisible();
    await r.fecharFolha();
    await r.foto('inicio-tempo-ajustado', { titulo: 'Início depois de "Ajustar" o tempo (e a versão nova do programa que isso oferece)', comoChegar: 'Folha "Avisos" → "Ajustar".', tipo: 'aviso' });
  });
});

// ====================================================================================================================
// MEUS DADOS E LOCAIS
// ====================================================================================================================

const meusDados = async (page: Page) => {
  await page.goto('/dados');
  await expect(page.getByRole('heading', { name: 'Meus dados' })).toBeVisible();
};

roteiro('dados-ana', 10, 'dados-e-locais', 'ana', async (r, page) => {
  await semear(page, estadoDaPersona('ana'));
  await inicioPronto(page);
  await meusDados(page);
  await r.foto('meus-dados', { titulo: 'Meus dados (a Ana)', comoChegar: 'Início → "Meus dados" na barra de baixo.' });
  await r.passo('meus dados, o que sai daqui', async () => {
    await page.getByRole('button', { name: 'o que sai daqui' }).click();
    await folhaPronta(page);
    await r.foto('meus-dados-folha-o-que-sai-daqui', { titulo: 'Folha "O que sai deste aparelho"', comoChegar: 'Meus dados → "o que sai daqui".', tipo: 'folha' });
    await r.fecharFolha();
  });
  await r.passo('meus dados, o navegador pode apagar', async () => {
    const aviso = page.getByRole('note').filter({ hasText: 'Este navegador pode apagar seus dados.' });
    await aviso.getByRole('button', { name: 'por quê?' }).click();
    await folhaPronta(page);
    await page.waitForTimeout(400);
    await r.foto('meus-dados-folha-o-navegador-e-os-seus-dados', { titulo: 'Folha "O navegador e os seus dados" (por quê?)', comoChegar: 'Meus dados → "por quê?" no aviso "Este navegador pode apagar seus dados.".', tipo: 'folha' });
    await r.fecharFolha();
  });
  await r.passo('meus dados, estilo do Boneco', async () => {
    await page.getByRole('button', { name: 'Estilo do Boneco' }).click();
    await page.waitForTimeout(2500);
    await r.foto('meus-dados-folha-estilo-do-boneco', { titulo: 'Folha do estilo do Boneco (os dois desenhos para escolher)', comoChegar: 'Meus dados → "Estilo do Boneco".', tipo: 'folha' });
    await r.fecharFolha();
  });
  let copia = '';
  await r.passo('meus dados, guardar uma cópia', async () => {
    await page.getByRole('button', { name: /^Guardar uma cópia/ }).click();
    await folhaPronta(page);
    await r.foto('meus-dados-folha-guardar-uma-copia', { titulo: 'Folha "Guardar uma cópia" (sem nenhuma cópia ainda)', comoChegar: 'Meus dados → "Guardar uma cópia".', tipo: 'folha' });
    const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
    copia = await download.path();
    await expect(page.getByRole('status').filter({ hasText: 'Arquivo exportado' })).toBeVisible();
    await r.foto('meus-dados-copia-exportada', { titulo: 'Meus dados logo depois de exportar ("Arquivo exportado…", "Última cópia: hoje")', comoChegar: 'Folha "Guardar uma cópia" → "Exportar meus dados (JSON)".', tipo: 'aviso' });
    await page.getByRole('button', { name: /^Guardar uma cópia/ }).click();
    await folhaPronta(page);
    await r.foto('meus-dados-folha-guardar-uma-copia-com-copia', { titulo: 'Folha "Guardar uma cópia" (com a cópia de hoje)', comoChegar: 'Meus dados depois de exportar → "Guardar uma cópia".', tipo: 'folha' });
    await r.fecharFolha();
  });
  await r.passo('meus dados, trazer uma cópia', async () => {
    await page.getByRole('button', { name: /^Trazer uma cópia/ }).click();
    await folhaPronta(page);
    await r.foto('meus-dados-folha-trazer-uma-copia', { titulo: 'Folha "Trazer uma cópia" (sem arquivo escolhido)', comoChegar: 'Meus dados → "Trazer uma cópia".', tipo: 'folha' });
    await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles({ name: 'outro-app.json', mimeType: 'application/json', buffer: Buffer.from('{"app":"outro"}') });
    await page.getByRole('button', { name: 'Importar dados' }).click();
    await expect(page.getByRole('alert')).toContainText('Seus dados atuais não foram alterados');
    await r.foto('meus-dados-folha-trazer-uma-copia-erro', { titulo: 'Folha "Trazer uma cópia", com um arquivo que não é do app', comoChegar: 'Folha "Trazer uma cópia" → escolher um JSON de outro app → "Importar dados".', tipo: 'erro' });
    await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles({ name: 'quebrado.json', mimeType: 'application/json', buffer: Buffer.from('isto não é JSON') });
    await page.getByRole('button', { name: 'Importar dados' }).click();
    await r.foto('meus-dados-folha-trazer-uma-copia-erro-de-leitura', { titulo: 'Folha "Trazer uma cópia", com um arquivo que não é JSON', comoChegar: 'Folha "Trazer uma cópia" → escolher um arquivo de texto qualquer → "Importar dados".', tipo: 'erro' });
    if (copia) {
      await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles(copia);
      await page.getByRole('button', { name: 'Importar dados' }).click();
      await expect(page.getByRole('status').filter({ hasText: 'Dados importados.' })).toBeVisible();
      await r.foto('meus-dados-copia-importada', { titulo: 'Meus dados logo depois de importar ("Dados importados.")', comoChegar: 'Folha "Trazer uma cópia" → escolher o arquivo exportado → "Importar dados".', tipo: 'aviso' });
    } else await r.fecharFolha();
  });
  await r.passo('meus dados, avisar um problema', async () => {
    await page.getByRole('button', { name: 'Avisar um problema' }).click();
    await page.getByRole('button', { name: 'Copiar as informações' }).scrollIntoViewIfNeeded();
    await r.foto('meus-dados-avisar-um-problema', { titulo: 'Meus dados, com "Avisar um problema" aberto (sem e-mail de contato no build)', comoChegar: 'Meus dados → "Avisar um problema".', tipo: 'bloco aberto' });
    await page.getByRole('button', { name: 'Copiar as informações' }).click();
    await expect(page.getByText(/^(Copiado\.|Não deu para copiar)/)).toBeVisible();
    await r.foto('meus-dados-avisar-um-problema-copia-1', { titulo: 'Meus dados: resposta de "Copiar as informações" (sem a permissão da área de transferência)', comoChegar: '"Avisar um problema" → "Copiar as informações".', tipo: 'aviso' });
    await page.context().grantPermissions(['clipboard-write', 'clipboard-read']).catch(() => undefined);
    await page.getByRole('button', { name: 'Copiar as informações' }).click();
    await page.waitForTimeout(300);
    await r.foto('meus-dados-avisar-um-problema-copia-2', { titulo: 'Meus dados: resposta de "Copiar as informações" (com a permissão da área de transferência)', comoChegar: '"Avisar um problema" → "Copiar as informações", com a permissão dada.', tipo: 'aviso' });
  });
  await r.passo('meus dados, a foto autorizada', async () => {
    await page.evaluate(() => localStorage.setItem('treino-foto-consentimento', '2026-11-10T12:00:00.000Z'));
    await meusDados(page);
    await r.foto('meus-dados-com-a-foto-autorizada', { titulo: 'Meus dados de quem já autorizou a foto (a linha "Foto do equipamento")', comoChegar: 'Autorizar a foto na folha "Reconhecer pela foto" → Meus dados.' });
    await page.getByRole('button', { name: /^Foto do equipamento/ }).click();
    await folhaPronta(page);
    await r.foto('meus-dados-folha-foto-do-equipamento', { titulo: 'Folha "Foto do equipamento" (retirar a autorização)', comoChegar: 'Meus dados → "Foto do equipamento".', tipo: 'folha' });
    await page.getByRole('button', { name: 'Retirar a autorização da foto' }).click();
    await expect(page.getByText('Autorização da foto retirada.')).toBeVisible();
    await r.foto('meus-dados-autorizacao-retirada', { titulo: 'Meus dados logo depois de retirar a autorização da foto', comoChegar: 'Folha "Foto do equipamento" → "Retirar a autorização da foto".', tipo: 'aviso' });
  });
  await r.passo('meus dados, apagar tudo', async () => {
    await page.getByRole('button', { name: 'Apagar todos os dados' }).click();
    await folhaPronta(page);
    await r.foto('meus-dados-folha-apagar-todos-os-dados', { titulo: 'Folha "Apagar todos os dados?"', comoChegar: 'Meus dados → "Apagar todos os dados".', tipo: 'folha' });
    await page.getByRole('dialog').getByRole('button', { name: 'Apagar tudo' }).click();
    await expect(page.getByRole('heading', { name: 'Treine onde estiver, com o que tiver' })).toBeVisible();
    await meusDados(page);
    await r.foto('meus-dados-sem-dados', { titulo: 'Meus dados de quem ainda não tem nada guardado', comoChegar: 'Boas-vindas → "Meus dados" (ou depois de "Apagar tudo").', tipo: 'estado vazio', persona: 'ninguém' });
    await page.getByRole('button', { name: /^Guardar uma cópia/ }).click();
    await folhaPronta(page);
    await r.foto('meus-dados-sem-dados-folha-guardar-uma-copia', { titulo: 'Folha "Guardar uma cópia" de quem não tem nada guardado (o botão fica desligado)', comoChegar: 'Meus dados sem dados → "Guardar uma cópia".', tipo: 'estado vazio', persona: 'ninguém' });
    await r.fecharFolha();
  });
});

roteiro('dados-edicao', 20, 'dados-e-locais', 'ana', async (r, page) => {
  await semear(page, estadoDaPersona('ana'));
  await inicioPronto(page);
  await meusDados(page);
  await page.getByRole('link', { name: /^Rotina e divisão/ }).click();
  await expect(page.getByRole('heading', { name: 'Rotina', exact: true })).toBeVisible();
  await r.foto('rotina-e-divisao', { titulo: 'Rotina e divisão (a rotina aberta por Meus dados, com o objetivo e a divisão)', comoChegar: 'Meus dados → "Rotina e divisão".' });
  await r.folha('rotina-e-divisao-folha-o-objetivo', () => page.getByRole('button', { name: 'o que muda' }).click(), { titulo: 'Folha "O objetivo" (o que muda)', comoChegar: 'Rotina e divisão → "o que muda" em "O que você quer agora?".' });
  await r.folha('rotina-e-divisao-folha-as-divisoes', () => page.locator('fieldset', { hasText: 'Como prefere dividir' }).getByRole('button', { name: 'por quê?' }).click(), { titulo: 'Folha "As divisões" (por quê?)', comoChegar: 'Rotina e divisão → "por quê?" em "Como prefere dividir?".' });
  await r.passo('rotina e divisão, com escolhas', async () => {
    await grupo(page, /O que você quer agora/).getByLabel('Ficar mais forte').check();
    await grupo(page, /Como prefere dividir/).getByRole('radio').last().check();
    await grupo(page, /Como prefere dividir/).scrollIntoViewIfNeeded();
    await r.foto('rotina-e-divisao-com-escolhas', { titulo: 'Rotina e divisão, com um objetivo e uma divisão escolhidos ("Deixar o app escolher" aparece)', comoChegar: 'Rotina e divisão → "Ficar mais forte" → a última divisão da lista.' });
    for (const dias of ['2 dias', '4 dias', '5 dias', '6 dias']) {
      await grupo(page, /Quantos dias/).getByLabel(dias).check();
      await grupo(page, /Como prefere dividir/).scrollIntoViewIfNeeded().catch(() => undefined);
      await r.foto(`rotina-e-divisao-${nomeDeArquivo(dias)}`, { titulo: `Rotina e divisão com ${dias}: as divisões oferecidas`, comoChegar: `Rotina e divisão → "${dias}".` });
    }
    await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await inicioPronto(page);
    await r.foto('inicio-depois-de-mudar-a-rotina', { titulo: 'Início depois de mudar o objetivo em Meus dados (a versão nova do programa)', comoChegar: 'Rotina e divisão → "Ficar mais forte" → "Salvar".', fluxo: 'inicio', tipo: 'aviso' });
    await meusDados(page);
    await r.foto('meus-dados-com-objetivo', { titulo: 'Meus dados com o objetivo "Ficar mais forte"', comoChegar: 'Rotina e divisão → "Ficar mais forte" → "Salvar" → Meus dados.' });
  });
  await r.passo('objetivo', async () => {
    await meusDados(page);
    await page.getByRole('link', { name: /^Objetivo/ }).click();
    await expect(page.getByRole('heading', { name: 'Rotina', exact: true })).toBeVisible();
    await page.waitForTimeout(300);
    await r.foto('objetivo', { titulo: 'Objetivo (a mesma tela da rotina, aberta na pergunta do objetivo)', comoChegar: 'Meus dados → "Objetivo".' });
  });
  await r.passo('algo a evitar', async () => {
    await meusDados(page);
    await page.getByRole('link', { name: /^Algo a evitar/ }).click();
    await expect(page.getByRole('heading', { name: 'Algo a evitar' })).toBeVisible();
    await r.foto('algo-a-evitar', { titulo: 'Algo a evitar', comoChegar: 'Meus dados → "Algo a evitar".' });
    await page.locator('summary', { hasText: 'Algum exercício que você quer evitar' }).click();
    await r.foto('algo-a-evitar-exercicios', { titulo: 'Algo a evitar, com a lista de exercícios aberta', comoChegar: 'Algo a evitar → "Algum exercício que você quer evitar? (opcional)".', tipo: 'bloco aberto' });
    await page.locator('details[open] label.opcao').first().getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Salvar e gerar o programa' }).click();
    await inicioPronto(page);
    await meusDados(page);
    await r.foto('meus-dados-com-algo-a-evitar', { titulo: 'Meus dados com 1 exercício a evitar ("1 marcado")', comoChegar: 'Algo a evitar → marcar 1 exercício → "Salvar e gerar o programa" → Meus dados.' });
  });
  await r.passo('refazer a triagem', async () => {
    await page.getByRole('link', { name: /^Refazer a triagem/ }).click();
    await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
    await r.foto('refazer-a-triagem', { titulo: 'Refazer a triagem (a mesma tela da saúde, com "Meu programa" no alto)', comoChegar: 'Meus dados → "Refazer a triagem".' });
  });
  await r.passo('as telas do cadastro com o programa feito', async () => {
    await page.goto('/comecar/nivel');
    await expect(page.getByRole('heading', { name: 'Experiência', exact: true })).toBeVisible();
    await r.foto('experiencia-com-o-programa-feito', { titulo: 'Experiência de quem já tem programa (as respostas guardadas e "Meu programa" no alto)', comoChegar: 'Refazer a triagem → "Não, nenhuma".' });
    await page.goto('/comecar/inventario');
    await expect(page.getByRole('heading', { name: 'Onde você treina?' })).toBeVisible();
    await r.foto('equipamento-com-o-programa-feito', { titulo: 'Equipamento de quem já tem programa (a lista já vem aberta, com os marcados)', comoChegar: 'Refazer a triagem → … → "Continuar" até o equipamento.' });
  });
});

roteiro('locais', 30, 'dados-e-locais', 'ana', async (r, page) => {
  await semear(page, estadoDaPersona('ana'), '/locais');
  await expect(page.getByRole('heading', { name: 'Meus locais' })).toBeVisible();
  await r.foto('locais', { titulo: 'Meus locais, com 1 local (a Ana)', comoChegar: 'Meus dados → "Meus locais".' });
  await r.folha('locais-folha-varios-locais', () => page.getByRole('button', { name: 'e nos outros?' }).click(), { titulo: 'Folha "Vários locais" (e nos outros?)', comoChegar: 'Meus locais → "e nos outros?".' });
  await r.passo('locais, editar', async () => {
    await page.locator('a[href^="/locais/"]').first().click();
    await expect(page).toHaveURL(/\/locais\/.+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await r.foto('locais-editar', { titulo: 'Editar local (nome e equipamento)', comoChegar: 'Meus locais → "Editar nome e equipamento".' });
  });
  await r.passo('locais, novo', async () => {
    await page.goto('/locais');
    await page.getByRole('link', { name: 'Cadastrar outro local' }).click();
    await expect(page.getByRole('heading', { name: 'Novo local' })).toBeVisible();
    await r.foto('locais-novo', { titulo: 'Novo local, vazio', comoChegar: 'Meus locais → "Cadastrar outro local".', tipo: 'estado vazio' });
    await page.getByRole('button', { name: 'Salvar local' }).click();
    await expect(page.getByText(/Dê um nome ao local/)).toBeVisible();
    await r.foto('locais-novo-erro-sem-nome', { titulo: 'Novo local, sem nome', comoChegar: 'Novo local → "Salvar local" sem dar o nome.', tipo: 'erro' });
    await page.getByRole('button', { name: 'Academia', exact: true }).click();
    await r.foto('locais-novo-com-nome', { titulo: 'Novo local, com o nome "Academia" (o título do equipamento muda)', comoChegar: 'Novo local → toque em "Academia".' });
    for (const item of ['Leg press', 'Cadeira flexora', 'Barra fixa', 'Banco reto']) await marcarItem(page, item);
    await page.getByRole('button', { name: 'Salvar local' }).click();
    await expect(page.getByRole('heading', { name: 'Meus locais' })).toBeVisible();
    await r.foto('locais-2-locais', { titulo: 'Meus locais, com 2 locais (a Ana com a "Academia")', comoChegar: 'Novo local → "Academia", 4 itens → "Salvar local".' });
    await page.getByRole('button', { name: 'Montar o programa para este local' }).click();
    await r.foto('locais-local-principal-trocado', { titulo: 'Meus locais, depois de "Montar o programa para este local"', comoChegar: 'Meus locais com 2 locais → "Montar o programa para este local".', tipo: 'aviso' });
    await page.goto('/programa');
    await inicioPronto(page);
    await r.foto('inicio-com-2-locais-e-versao-nova', { titulo: 'Início da Ana com 2 locais, depois de trocar o local principal ("Onde vou treinar hoje?" e a versão nova)', comoChegar: 'Meus locais → "Montar o programa para este local" → Início.', fluxo: 'inicio', tipo: 'aviso' });
  });
  await r.passo('locais do Bruno', async () => {
    await semear(page, estadoDaPersona('bruno-2-locais'), '/locais');
    await expect(page.getByRole('heading', { name: 'Meus locais' })).toBeVisible();
    await r.foto('locais-bruno', { titulo: 'Meus locais do Bruno (Prédio e Academia do bairro)', comoChegar: 'Estado do Bruno com 2 locais → Meus dados → "Meus locais".', persona: 'bruno' });
    await meusDados(page);
    await r.foto('meus-dados-bruno', { titulo: 'Meus dados do Bruno (2 locais, 4 dias)', comoChegar: 'Estado do Bruno com 2 locais → "Meus dados".', persona: 'bruno' });
  });
  await r.passo('evolução do Bruno numa máquina, por local', async () => {
    const bruno = estadoDaPersona('bruno-2-locais');
    const sessoes: SessaoSemeada[] = [{ dia: 0, quando: '2026-11-09T13:00:00.000Z' }, { dia: 0, quando: '2026-11-11T13:00:00.000Z' }];
    const noPredio = comHistorico(bruno, [sessoes[0]!], 'local-1').historico;
    const naAcademia = comHistorico(bruno, [sessoes[1]!], 'local-2').historico;
    await semear(page, { ...bruno, historico: [...noPredio, ...naAcademia] }, '/evolucao/crucifixo-polia');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await r.foto('evolucao-por-local', { titulo: 'Evolução de um exercício de polia com 2 locais (uma lista por local)', comoChegar: 'Histórico fictício do Bruno: o mesmo treino no Prédio e na Academia do bairro → evolução do crucifixo na polia.', fluxo: 'fim-e-semana', persona: 'bruno' });
  });
});

// ====================================================================================================================
// TERMOS E FOTO
// ====================================================================================================================

roteiro('termos', 10, 'termos-e-foto', 'ninguém', async (r, page) => {
  await page.goto('/termos');
  await expect(page.getByRole('heading', { name: 'Termos de uso e privacidade' })).toBeVisible();
  await r.foto('termos', { titulo: 'Termos de uso e privacidade', comoChegar: 'Boas-vindas → "termos de uso e o aviso de privacidade" (ou Meus dados → "Termos de uso e privacidade").' });
  const selos = page.locator('main button.selo');
  for (let i = 0; i < (await selos.count()); i++) await folhaDoSelo(r, `termos-folha-selo-${i + 1}`, selos.nth(i), { titulo: `Folha "De onde vem isto" (o ${i + 1}º selo dos termos)`, comoChegar: `Termos → toque no ${i + 1}º selo.` });
});

/** Um JPEG pequeno feito no navegador, para a folha da foto (a função de visão é simulada: nada sai do aparelho). */
async function jpeg(page: Page): Promise<Buffer> {
  const bytes = await page.evaluate(async () => {
    const c = document.createElement('canvas');
    c.width = 640;
    c.height = 480;
    const g = c.getContext('2d')!;
    g.fillStyle = '#8899aa';
    g.fillRect(0, 0, 640, 480);
    const b = await new Promise<Blob>((ok) => c.toBlob((x) => ok(x!), 'image/jpeg', 0.8));
    return [...new Uint8Array(await b.arrayBuffer())];
  });
  return Buffer.from(bytes);
}

// A função de visão (/api/vision) é simulada por rota, como em tests/e2e/foto.spec.ts. As mensagens que o servidor
// manda são as de api/_lib/pedido.ts, copiadas sem mudar.
const DO_SERVIDOR = [
  ['convite-invalido', 403, 'convite', 'Código de convite inválido.'],
  ['muitas-tentativas', 429, 'limite', 'Muitas tentativas com o código errado hoje. Use a lista ou tente amanhã.'],
  ['limite-de-fotos', 429, 'limite', 'Limite de fotos de hoje atingido. Use a lista ou tente amanhã.'],
  ['nao-configurado', 503, 'indisponivel', 'O reconhecimento por foto ainda não está configurado. Use a lista.'],
  ['pedido-invalido', 400, 'pedido', 'Pedido inválido.'],
  ['formato-nao-aceito', 400, 'fotos', 'Foto em formato ou tamanho não aceito.'],
  ['tamanho-no-servidor', 413, 'tamanho', 'As fotos juntas passam do tamanho aceito. Envie menos fotos por vez.'],
  ['modelo', 502, 'modelo', 'Não foi possível analisar as fotos agora. Use a lista.'],
] as const;

roteiro('foto', 20, 'termos-e-foto', 'ana', async (r, page) => {
  // o app espera 70 s pela análise antes de desistir: aqui, 4 s, para a mensagem da demora caber na colheita
  await page.addInitScript(() => {
    const original = AbortSignal.timeout.bind(AbortSignal);
    AbortSignal.timeout = (ms: number) => original(Math.min(ms, 4000));
  });
  await semear(page, estadoDaPersona('ana'), '/comecar/inventario');
  await expect(page.getByRole('heading', { name: 'Onde você treina?' })).toBeVisible();
  await page.getByRole('button', { name: 'Pela foto' }).click();
  await folhaPronta(page);
  const foto = (nome: string, titulo: string, comoChegar: string, tipo: 'folha' | 'erro' | 'carregando' | 'estado vazio' | 'bloco aberto' = 'folha') => r.foto(nome, { titulo, comoChegar, tipo });
  const arquivo = { name: 'academia.jpg', mimeType: 'image/jpeg', buffer: await jpeg(page) };
  const escolher = (arquivos: Parameters<Locator['setInputFiles']>[0] = arquivo) => page.getByLabel('Escolher fotos').setInputFiles(arquivos);
  const erro = page.locator('.foto-eq [role="alert"]');
  const responder = async (resposta: (rota: Route) => Promise<unknown> | unknown) => {
    await page.unroute('**/api/vision');
    await page.route('**/api/vision', resposta);
  };

  await foto('foto-sem-autorizacao', 'Folha "Reconhecer pela foto": sem a autorização ("Falta marcar a autorização acima.")', 'Equipamento → "Pela foto".');
  await page.getByLabel(/^Autorizo enviar as minhas fotos/).check();
  await foto('foto-autorizada', 'Folha da foto: com a autorização marcada', 'Folha da foto → marcar "Autorizo enviar as minhas fotos…".');
  await r.passo('foto, sem o código de convite', async () => {
    await escolher();
    await expect(erro).toBeVisible();
    await foto('foto-erro-sem-codigo', 'Folha da foto: fotos escolhidas sem o código de convite', 'Folha da foto → autorizar → "Escolher fotos" sem digitar o código.', 'erro');
  });
  await page.getByLabel('Código de convite').fill('beta1');
  await r.passo('foto, fotos demais', async () => {
    await escolher(Array.from({ length: 6 }, (_, i) => ({ ...arquivo, name: `foto-${i + 1}.jpg` })));
    await expect(erro).toHaveText(/^Escolha até/);
    await foto('foto-erro-fotos-demais', 'Folha da foto: mais de 5 fotos', 'Folha da foto → escolher 6 fotos.', 'erro');
  });
  await r.passo('foto, analisando e o resultado', async () => {
    await responder(async (rota) => {
      await new Promise((ok) => setTimeout(ok, 2500));
      await rota.fulfill({
        json: {
          itens: [
            { itemId: 'barra_fixa', confianca: 'alta', evidencia: 'foto 1, no batente' },
            { itemId: 'banco_regulavel', confianca: 'media', evidencia: 'foto 1, ao fundo', atributos: { declina: false } },
            { itemId: 'step', confianca: 'baixa', evidencia: 'foto 1, canto' },
            { itemId: 'esteira', confianca: 'alta' },
          ],
        },
      });
    });
    await escolher();
    await expect(page.getByText('Analisando as fotos…').first()).toBeVisible();
    await foto('foto-analisando', 'Folha da foto: "Analisando as fotos…"', 'Folha da foto → autorizar, digitar o código → escolher 1 foto.', 'carregando');
    await expect(page.getByRole('region', { name: 'O que encontramos nas fotos' })).toBeVisible();
    await foto('foto-resultado', 'Folha da foto: "O que encontramos nas fotos" (com certeza, provável, talvez e a esteira)', 'Folha da foto → 1 foto → o servidor (simulado) devolve 4 itens.');
    await page.getByRole('button', { name: 'Descartar e voltar' }).click();
    await foto('foto-ja-autorizada', 'Folha da foto de quem já autorizou ("Você autorizou o envio… em <data>")', 'Folha da foto depois do 1º envio → "Descartar e voltar".');
    await page.locator('.foto-eq summary', { hasText: 'Para onde vai a foto' }).click();
    await foto('foto-ja-autorizada-para-onde-vai', 'Folha da foto de quem já autorizou, com "Para onde vai a foto" aberto', 'Folha da foto já autorizada → "Para onde vai a foto".', 'bloco aberto');
  });
  await r.passo('foto, 2 itens por responder', async () => {
    await responder((rota) => rota.fulfill({ json: { itens: [{ itemId: 'kettlebell', confianca: 'media' }, { itemId: 'elasticos', confianca: 'media', evidencia: 'foto 1, na parede' }] } }));
    await escolher();
    await expect(page.getByText('Faltam responder 2 itens.')).toBeVisible();
    await foto('foto-resultado-2-por-responder', 'Folha da foto: resultado com 2 itens por responder', 'Folha da foto → o servidor (simulado) devolve 2 itens prováveis.');
    await page.getByRole('button', { name: 'Descartar e voltar' }).click();
  });
  await r.passo('foto, nada reconhecido', async () => {
    await responder((rota) => rota.fulfill({ json: { itens: [] } }));
    await escolher();
    await expect(page.getByText('Não reconhecemos nenhum equipamento.')).toBeVisible();
    await foto('foto-resultado-vazio', 'Folha da foto: nenhum equipamento reconhecido', 'Folha da foto → o servidor (simulado) não devolve nenhum item.', 'estado vazio');
    await page.getByRole('button', { name: 'Descartar e voltar' }).click();
  });
  const comErro = async (nome: string, titulo: string, comoChegar: string, esperado: RegExp, enviar: () => Promise<void>) =>
    r.passo(`foto, erro ${nome}`, async () => {
      await enviar();
      await expect(erro).toHaveText(esperado, { timeout: 10_000 });
      await foto(`foto-erro-${nome}`, `Folha da foto: ${titulo}`, comoChegar, 'erro');
    });
  await comErro('nao-abre', 'a foto que o navegador não abre', 'Folha da foto → escolher um arquivo que não é imagem (como um HEIC).', /^Não foi possível abrir/, () => escolher({ name: 'foto.heic', mimeType: 'image/heic', buffer: Buffer.from('isto não é uma imagem') }));
  await responder((rota) => rota.abort());
  await comErro('servidor-nao-respondeu', 'o servidor não respondeu', 'Folha da foto → o pedido falha com o aparelho conectado.', /^Não foi possível falar com o servidor/, () => escolher());
  await comErro('sem-conexao', 'sem conexão', 'Folha da foto → enviar com o aparelho sem rede.', /^Sem conexão\./, async () => {
    await page.context().setOffline(true);
    await escolher();
  });
  await page.context().setOffline(false);
  await responder((rota) => rota.fulfill({ status: 413, contentType: 'text/plain', body: 'Request Entity Too Large' }));
  await comErro('grandes-demais', 'as fotos ficaram grandes demais (o servidor recusa sem dizer por quê)', 'Folha da foto → o servidor responde 413 sem mensagem.', /^As fotos ficaram grandes demais/, () => escolher());
  await responder((rota) => rota.fulfill({ status: 500, contentType: 'text/html', body: '<h1>Internal Server Error</h1>' }));
  await comErro('analise', 'a análise falhou (o servidor responde com erro sem mensagem)', 'Folha da foto → o servidor responde 500 sem mensagem.', /^Não foi possível analisar as fotos agora/, () => escolher());
  await responder(() => undefined);
  await comErro('demora', 'a análise demorou demais', 'Folha da foto → o servidor não responde até o tempo máximo (70 s no app; 4 s nesta colheita).', /^A análise demorou demais/, () => escolher());
  for (const [nome, status, codigo, mensagem] of DO_SERVIDOR) {
    await responder((rota) => rota.fulfill({ status, json: { codigo, erro: mensagem } }));
    await comErro(`do-servidor-${nome}`, `a mensagem do servidor "${mensagem}"`, `Folha da foto → o servidor (simulado) responde ${status} com a mensagem de api/_lib/pedido.ts.`, new RegExp(`^${mensagem.replace(/[.?]/g, '\\$&')}$`), () => escolher());
  }
  await r.passo('foto, retirar a autorização', async () => {
    await page.getByRole('button', { name: 'Retirar a autorização' }).click();
    await foto('foto-autorizacao-retirada', 'Folha da foto depois de "Retirar a autorização" (a caixa de consentimento volta)', 'Folha da foto já autorizada → "Retirar a autorização".');
  });
});

// ====================================================================================================================
// AVISOS E ERROS
// ====================================================================================================================

test.describe('iPhone no Safari, sem instalar', () => {
  test.use({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  roteiro('avisos-iphone', 10, 'avisos-e-erros', 'ninguém', async (r, page) => {
    await page.goto('/');
    await expect(page.getByRole('region', { name: 'Instale o app para não perder seus dados' })).toBeVisible();
    await page.getByRole('region', { name: 'Instale o app para não perder seus dados' }).scrollIntoViewIfNeeded();
    await r.foto('instalar-no-iphone-boas-vindas', { titulo: 'Boas-vindas no iPhone (Safari, sem instalar): o aviso "Instale o app para não perder seus dados"', comoChegar: 'Abrir o app no Safari do iPhone, fora da tela de início.', tipo: 'aviso' });
    await folhaDoSelo(r, 'instalar-no-iphone-folha-selo', page.locator('.aviso-instalar button.selo'), { titulo: 'Folha "De onde vem isto" (o selo do aviso de instalar)', comoChegar: 'Aviso de instalar → toque no selo "fonte".' });
    await r.passo('instalar, no início', async () => {
      await semear(page, estadoDaPersona('ana'));
      await inicioPronto(page);
      await page.getByRole('region', { name: 'Instale o app para não perder seus dados' }).scrollIntoViewIfNeeded();
      await r.foto('instalar-no-iphone-inicio', { titulo: 'Início no iPhone (Safari, sem instalar): o aviso de instalar depois dos exercícios', comoChegar: 'Abrir o app com programa no Safari do iPhone, fora da tela de início.', tipo: 'aviso', persona: 'ana' });
    });
  });
});

roteiro('avisos-copia', 20, 'avisos-e-erros', 'ana', async (r, page) => {
  await page.clock.setFixedTime(AGORA);
  const treinos: SessaoSemeada[] = [{ dia: 0, quando: em('10-27') }, { dia: 1, quando: em('10-29') }, { dia: 2, quando: em('11-02') }];
  const lembrete = page.getByRole('region', { name: 'Guarde uma cópia dos seus treinos' });
  await comTreinos(page, treinos);
  await inicioPronto(page);
  await expect(lembrete).toBeVisible();
  await lembrete.scrollIntoViewIfNeeded();
  await r.foto('lembrete-de-copia', { titulo: 'Início com o lembrete "Guarde uma cópia dos seus treinos" (nenhuma cópia ainda)', comoChegar: 'Histórico fictício: 3 treinos terminados, nenhuma cópia exportada → Início.', tipo: 'aviso' });
  await folhaDoSelo(r, 'lembrete-de-copia-folha-selo', lembrete.locator('button.selo'), { titulo: 'Folha "De onde vem isto" (o selo do lembrete de cópia)', comoChegar: 'Lembrete de cópia → toque no selo "fonte".' });
  await r.passo('lembrete de cópia, exportar agora', async () => {
    await Promise.all([page.waitForEvent('download'), lembrete.getByRole('button', { name: 'Exportar agora' }).click()]);
    await expect(page.getByText(/^Arquivo exportado\./)).toBeVisible();
    await page.getByText(/^Arquivo exportado\./).scrollIntoViewIfNeeded();
    await r.foto('lembrete-de-copia-exportado', { titulo: 'Início logo depois de "Exportar agora" no lembrete de cópia', comoChegar: 'Lembrete de cópia → "Exportar agora".', tipo: 'aviso' });
  });
  await r.passo('lembrete de cópia, com cópia antiga', async () => {
    await page.evaluate(() => localStorage.setItem('treino-ultima-copia', '2026-10-20T12:00:00.000Z'));
    await page.goto('/programa');
    await expect(lembrete).toBeVisible();
    await lembrete.scrollIntoViewIfNeeded();
    await r.foto('lembrete-de-copia-com-treinos-novos', { titulo: 'Início com o lembrete de cópia de quem já exportou ("Você tem treinos novos desde a última cópia.")', comoChegar: 'Histórico fictício: 3 treinos depois da última cópia, feita há 16 dias → Início.', tipo: 'aviso' });
    await meusDados(page);
    await r.foto('meus-dados-com-copia-antiga', { titulo: 'Meus dados com a última cópia de dias atrás ("Última cópia: há 16 dias")', comoChegar: 'Última cópia exportada há 16 dias → Meus dados.', fluxo: 'dados-e-locais' });
  });
});

roteiro('erros', 30, 'avisos-e-erros', 'ana', async (r, page) => {
  // ---- o dado guardado que o app não consegue ler (como tests/e2e/dado-ilegivel.spec.ts) ----
  await r.passo('dado ilegível', async () => {
    await semear(page, { versao: 7, historico: 'isto não é uma lista', marca: 'dado-antigo' }, '/');
    await expect(page.getByRole('alert')).toBeVisible();
    await r.foto('dado-ilegivel-boas-vindas', { titulo: 'Boas-vindas com um dado guardado que o app não leu', comoChegar: 'Estado gravado no aparelho num formato inválido → abrir o app.', tipo: 'erro', persona: 'ninguém' });
    await meusDados(page);
    await r.foto('dado-ilegivel-meus-dados', { titulo: 'Meus dados com um dado guardado que o app não leu ("Exportar os dados que não foram lidos")', comoChegar: 'Estado gravado no aparelho num formato inválido → Meus dados.', tipo: 'erro', persona: 'ninguém' });
    await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar os dados que não foram lidos' }).click()]);
    await expect(page.getByRole('status').filter({ hasText: 'Arquivo exportado' })).toBeVisible();
    await r.foto('dado-ilegivel-exportado', { titulo: 'Meus dados depois de exportar os dados que não foram lidos', comoChegar: 'Meus dados com dado ilegível → "Exportar os dados que não foram lidos".', tipo: 'aviso', persona: 'ninguém' });
  });
  // ---- a tela de erro (ProvaDeErro) ----
  await r.passo('tela de erro', async () => {
    await semear(page, estadoDaPersona('ana'));
    await inicioPronto(page);
    await page.evaluate(() => sessionStorage.setItem('treino-teste-erro', '1'));
    await page.goto('/programa');
    await expect(page.getByRole('heading', { name: 'Algo deu errado nesta tela' })).toBeVisible();
    await r.foto('tela-de-erro', { titulo: 'Tela de erro ("Algo deu errado nesta tela")', comoChegar: 'Um erro de tela (forçado pela chave de teste do app) em qualquer tela.', tipo: 'erro' });
    await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados' }).click()]);
    await expect(page.getByRole('status').filter({ hasText: 'Arquivo exportado' })).toBeVisible();
    await page.getByRole('button', { name: 'Avisar um problema' }).click();
    await page.getByLabel('Informações do problema').scrollIntoViewIfNeeded();
    await r.foto('tela-de-erro-exportado-e-aviso-aberto', { titulo: 'Tela de erro, depois de exportar e com "Avisar um problema" aberto', comoChegar: 'Tela de erro → "Exportar meus dados" → "Avisar um problema".', tipo: 'erro' });
    await page.evaluate(() => sessionStorage.removeItem('treino-teste-erro'));
  });
  await r.passo('tela de erro sem dados', async () => {
    await page.evaluate(
      () =>
        new Promise<void>((ok) => {
          const pedido = indexedDB.deleteDatabase('keyval-store');
          pedido.onsuccess = pedido.onerror = pedido.onblocked = () => ok();
        }),
    );
    await page.evaluate(() => sessionStorage.setItem('treino-teste-erro', '1'));
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Algo deu errado nesta tela' })).toBeVisible();
    await page.getByRole('button', { name: 'Exportar meus dados' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await r.foto('tela-de-erro-sem-dados', { titulo: 'Tela de erro, ao exportar sem nada guardado', comoChegar: 'Tela de erro num aparelho sem dados → "Exportar meus dados".', tipo: 'erro', persona: 'ninguém' });
    await page.evaluate(() => sessionStorage.removeItem('treino-teste-erro'));
  });
  // ---- o aparelho recusa a gravação ----
  await r.passo('não foi possível salvar', async () => {
    await semear(page, estadoDaPersona('ana'));
    await inicioPronto(page);
    // a partir daqui, toda gravação no aparelho falha (como sem espaço ou numa aba anônima)
    await page.evaluate(() => {
      IDBObjectStore.prototype.put = function () {
        throw new DOMException('sem espaço', 'QuotaExceededError');
      };
    });
    await comecarTreino(page);
    await expect(page.getByRole('alert').filter({ hasText: 'Não foi possível salvar neste aparelho.' })).toBeVisible();
    await r.foto('nao-foi-possivel-salvar-treino', { titulo: 'Treino com o aviso "Não foi possível salvar neste aparelho."', comoChegar: 'O aparelho recusa a gravação (forçado na colheita) → "Começar o treino".', tipo: 'erro' });
    await preencherSerie(page);
    await page.getByRole('region', { name: /^Série \d/ }).getByRole('button', { name: /^Série feita/ }).click();
    await expect(page.getByText('Série 1 anotada, mas não salva')).toBeVisible();
    await r.foto('nao-foi-possivel-salvar-serie', { titulo: 'Descanso com "Série 1 anotada, mas não salva"', comoChegar: 'O aparelho recusa a gravação → "Série feita".', tipo: 'erro' });
    await page.getByRole('link', { name: /^Voltar ao início/ }).click();
    await inicioPronto(page);
    await r.foto('nao-foi-possivel-salvar-inicio', { titulo: 'Início com o aviso "Não foi possível salvar neste aparelho."', comoChegar: 'O aparelho recusa a gravação → Início.', tipo: 'erro' });
  });
});

// Os arquivos que não baixam (sem rede e sem o arquivo guardado): sem o service worker, para o pedido passar pela rede.
test.describe('sem o service worker', () => {
  test.use({ serviceWorkers: 'block' });
  roteiro('erros-de-carga', 40, 'avisos-e-erros', 'ana', async (r, page) => {
    // o pedaço do app (um arquivo de /assets) que contém uma frase: a lista dos arquivos vem do service worker
    const pedaco = async (contem: string) => {
      const sw = await (await page.request.get('/sw.js')).text();
      for (const arquivo of new Set(sw.match(/assets\/index-[\w-]+\.js/g) ?? [])) if ((await (await page.request.get(`/${arquivo}`)).text()).includes(contem)) return `**/${arquivo}`;
      throw new Error(`nenhum pedaço do app contém "${contem}"`);
    };
    const segurar = async (url: string | RegExp) => {
      let soltar = () => {};
      const espera = new Promise<void>((ok) => (soltar = ok));
      await page.route(url, async (rota) => {
        await espera;
        await rota.fallback();
      });
      return async () => {
        soltar();
        await page.unroute(url);
      };
    };
    await semear(page, estadoDaPersona('ana'));
    await inicioPronto(page);

    await r.passo('sobre o programa, conferindo e sem conferir', async () => {
      const avaliador = await pedaco('Dá para melhorar');
      const soltar = await segurar(avaliador);
      await page.getByRole('button', { name: 'Sobre o programa' }).click();
      await folhaPronta(page);
      await expect(page.getByText('Conferindo o programa…')).toBeVisible();
      await r.foto('sobre-o-programa-conferindo', { titulo: 'Folha "Sobre o programa" enquanto o avaliador chega ("Conferindo o programa…")', comoChegar: 'Início → "Sobre o programa", com a rede lenta e sem o arquivo guardado.', tipo: 'carregando', fluxo: 'inicio' });
      await soltar();
      await r.fecharFolha();
      await page.reload();
      await inicioPronto(page);
      await page.route(avaliador, (rota) => rota.abort());
      await page.getByRole('button', { name: 'Sobre o programa' }).click();
      await folhaPronta(page);
      await expect(page.getByText('Não deu para conferir o programa agora.')).toBeVisible();
      await r.foto('sobre-o-programa-sem-conferir', { titulo: 'Folha "Sobre o programa" quando o avaliador não baixa', comoChegar: 'Início → "Sobre o programa", sem rede e sem o arquivo guardado.', tipo: 'erro' });
      await page.unroute(avaliador);
      await r.fecharFolha();
    });
    await r.passo('a regra e as fontes, carregando e sem carregar', async () => {
      await page.reload();
      await inicioPronto(page);
      await page.locator('details.como-ler summary').click();
      const selo = page.locator('details.como-ler button.selo').first();
      let soltar = await segurar(/\/assets\/regras-[\w-]+\.js$/);
      await selo.click();
      await folhaPronta(page);
      await expect(page.getByText('Carregando a regra…')).toBeVisible();
      await r.foto('selo-carregando-a-regra', { titulo: 'Folha "De onde vem isto" enquanto a regra chega ("Carregando a regra…")', comoChegar: 'Toque num selo, com a rede lenta e sem o arquivo guardado.', tipo: 'carregando' });
      await soltar();
      await r.fecharFolha();
      await page.reload();
      await inicioPronto(page);
      await page.locator('details.como-ler summary').click();
      soltar = await segurar(/\/assets\/fontes-[\w-]+\.js$/);
      await selo.click();
      await folhaPronta(page);
      await expect(page.getByText('Carregando as fontes…')).toBeVisible();
      await r.foto('selo-carregando-as-fontes', { titulo: 'Folha "De onde vem isto" enquanto as fontes chegam ("Carregando as fontes…")', comoChegar: 'Toque num selo, com a rede lenta e sem o arquivo das fontes guardado.', tipo: 'carregando' });
      await soltar();
      await r.fecharFolha();
      await page.reload();
      await inicioPronto(page);
      await page.locator('details.como-ler summary').click();
      await page.route(/\/assets\/fontes-[\w-]+\.js$/, (rota) => rota.abort());
      await selo.click();
      await folhaPronta(page);
      await expect(page.getByText(/^Não deu para carregar as fontes agora/)).toBeVisible();
      await r.foto('selo-sem-as-fontes', { titulo: 'Folha "De onde vem isto" quando as fontes não baixam', comoChegar: 'Toque num selo, sem rede e sem o arquivo das fontes guardado.', tipo: 'erro' });
      await r.fecharFolha();
      await page.unroute(/\/assets\/fontes-[\w-]+\.js$/);
      await page.reload();
      await inicioPronto(page);
      await page.locator('details.como-ler summary').click();
      await page.route(/\/assets\/regras-[\w-]+\.js$/, (rota) => rota.abort());
      await selo.click();
      await folhaPronta(page);
      await expect(page.getByText(/^Não deu para carregar a regra agora/)).toBeVisible();
      await r.foto('selo-sem-a-regra', { titulo: 'Folha "De onde vem isto" quando a regra não baixa', comoChegar: 'Toque num selo, sem rede e sem o arquivo das regras guardado.', tipo: 'erro' });
      await r.fecharFolha();
      await page.unroute(/\/assets\/regras-[\w-]+\.js$/);
    });
    await r.passo('o guia animado que não carrega', async () => {
      await page.reload();
      await inicioPronto(page);
      // o texto do guia do 1º exercício (o agachamento búlgaro) não baixa
      await page.route(/\/assets\/bulgaro-[\w-]{8}\.js$/, (rota) => rota.abort());
      await comecarTreino(page);
      await expect(page.getByText('O guia animado não carregou agora.')).toBeVisible({ timeout: 15_000 });
      await r.foto('guia-animado-nao-carregou', { titulo: 'Treino quando o guia animado não carrega (o registro da série continua)', comoChegar: 'Treino, sem rede e sem os arquivos do guia guardados.', tipo: 'erro' });
      await page.unroute(/\/assets\/bulgaro-[\w-]{8}\.js$/);
      await terminarTreino(page);
    });
    await r.passo('o guia em texto que não baixa', async () => {
      await page.goto('/programa');
      await inicioPronto(page);
      await page.route(/\/assets\/crucifixo-invertido-sentado-[\w-]+\.js$/, (rota) => rota.abort());
      await page.getByRole('tab').nth(1).click();
      await page.locator('.cartao-ex', { has: page.locator('.miniatura.vazia') }).first().getByRole('button').first().click();
      await folhaPronta(page);
      await expect(page.getByText('Não deu para carregar o guia em texto deste exercício agora.')).toBeVisible();
      await r.foto('guia-em-texto-nao-baixou-na-folha', { titulo: 'Folha do exercício sem animação quando o guia em texto não baixa ("Tentar de novo")', comoChegar: 'Início → exercício com guia em texto, sem rede e sem o arquivo guardado.', tipo: 'erro' });
      await page.getByRole('dialog').getByRole('button', { name: 'Tentar de novo' }).click();
      await expect(page.getByRole('dialog').getByRole('button', { name: 'Recarregar o app' })).toBeVisible();
      await r.foto('guia-em-texto-nao-baixou-2a-vez', { titulo: 'Folha do exercício sem animação quando o guia em texto falha de novo ("Recarregar o app")', comoChegar: 'Guia em texto que não baixou → "Tentar de novo", ainda sem rede.', tipo: 'erro' });
      await r.fecharFolha();
      await comecarTreino(page);
      for (let n = 0; n < 8 && !(await page.getByText('Não deu para carregar o guia em texto deste exercício agora.').count()); n++) if (!(await proximo(r))) break;
      await expect(page.getByText('Não deu para carregar o guia em texto deste exercício agora.')).toBeVisible();
      await r.foto('guia-em-texto-nao-baixou-no-treino', { titulo: 'Treino num exercício sem animação quando o guia em texto não baixa', comoChegar: 'Treino → exercício com guia em texto, sem rede e sem o arquivo guardado.', tipo: 'erro' });
    });
  });
});
