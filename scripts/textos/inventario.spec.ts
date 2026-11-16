import { expect, test, type Page } from '@playwright/test';
import { abrirLista, ana, detalhesDo, folhaPronta, marcarItem, minutosPorTreino, triagemNenhuma } from '../../tests/e2e/jornada';
import { Roteiro, type Fluxo } from './colher';

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

const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });
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
async function folhaDoSelo(r: Roteiro, nome: string, selo: ReturnType<Page['locator']>, o: { titulo: string; comoChegar: string }) {
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
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
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
    await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
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
  await folhaDoSelo(r, 'experiencia-folha-selo-do-nivel', page.locator('main .resultado button.selo'), { titulo: 'Folha "De onde vem isto" (o selo do nível)', comoChegar: 'Experiência respondida → toque no selo ao lado do motivo do nível.' });
  await page.getByRole('button', { name: 'Continuar' }).click();

  // ---- rotina ----
  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
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
    await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
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
  await r.folha('rotina-folha-por-que-grupos', () => page.locator('fieldset', { hasText: 'Quais grupos' }).getByRole('button', { name: 'por quê?' }).click(), { titulo: 'Folha "Grupos prioritários" (por quê?)', comoChegar: 'Rotina → "por quê?" em "Quais grupos você quer priorizar?".' });
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
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await r.foto('equipamento-lugar', { titulo: 'Equipamento: "Onde você treina?", sem nada marcado', comoChegar: 'Rotina → "Continuar".', tipo: 'estado vazio' });
  await r.folha('equipamento-folha-da-foto', () => page.getByRole('button', { name: 'Pela foto' }).click(), { titulo: 'Folha "Reconhecer pela foto" (como abre na 1ª vez)', comoChegar: 'Equipamento → "Pela foto".' });
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
    await folhaDoSelo(r, 'equipamento-folha-selo-da-menor-anilha', page.getByRole('region', { name: 'Detalhes: Anilhas das máquinas e barras' }).locator('button.selo'), {
      titulo: 'Folha "De onde vem isto" (o selo da menor anilha)',
      comoChegar: 'Equipamento com leg press, hack, smith ou barra marcados → "Anilhas das máquinas e barras" → toque no selo.',
    });
    await page.getByRole('button', { name: 'Corpo livre' }).click();
  });
  await abrirLista(page);
  await r.foto('equipamento-item-por-item-vazio', { titulo: 'Equipamento: item por item, sem nada marcado (categoria "Halteres e anilhas")', comoChegar: 'Equipamento → "Item por item".', tipo: 'estado vazio' });
  for (const categoria of ['Bancos', 'Polias e acessórios', 'Barras', 'Máquinas', 'Outros acessórios'])
    await r.passo(`equipamento, a categoria ${categoria}`, async () => {
      await grupo(page, 'Categorias').getByRole('button', { name: categoria, exact: true }).click();
      await r.foto(`equipamento-categoria-${nomeDeArquivo(categoria)}`, { titulo: `Equipamento: item por item, categoria "${categoria}"`, comoChegar: `Equipamento → "Item por item" → "${categoria}".` });
    });
  await r.passo('equipamento, a busca', async () => {
    await page.getByLabel('Procurar pelo nome').fill('xyz');
    await expect(page.getByText(/^Nada com/)).toBeVisible();
    await r.foto('equipamento-busca-sem-resultado', { titulo: 'Equipamento: busca sem resultado', comoChegar: 'Equipamento → "Item por item" → procurar "xyz".', tipo: 'estado vazio' });
    await page.getByLabel('Procurar pelo nome').fill('extensora');
    await r.foto('equipamento-busca-com-resultado', { titulo: 'Equipamento: busca com resultado', comoChegar: 'Equipamento → "Item por item" → procurar "extensora".' });
    await page.getByLabel('Procurar pelo nome').fill('');
  });
  // a folha de detalhes de cada item que tem detalhes, como abre ao marcar
  const COM_DETALHES = ['Halteres fixos', 'Anilhas e manoplas', 'Polia simples', 'Banco regulável', 'Elásticos', 'Polia dupla (crossover)', 'Multifuncional', 'Kettlebell', 'Caneleiras de peso', 'Mini-band', 'Voador', 'Máquina de tríceps'];
  for (const item of COM_DETALHES)
    await r.passo(`equipamento, a folha de ${item}`, async () => {
      await marcarItem(page, item);
      await expect(page.getByRole('dialog', { name: item })).toBeVisible();
      await r.foto(`equipamento-folha-${nomeDeArquivo(item)}`, { titulo: `Folha de detalhes: ${item}`, comoChegar: `Equipamento → "Item por item" → marcar "${item}".`, tipo: 'folha' });
      if (item === 'Halteres fixos') {
        await grupo(page, 'O mais leve').getByLabel('Outro').check();
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
      await grupo(page, legenda).getByLabel('Outro').check();
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
      await page.getByLabel('O mais pesado: outro valor').fill('3');
      await page.getByLabel('De quanto em quanto: outro valor').fill('1');
    });
    await tentar('equipamento-folha-halteres-fixos-erro-passo', 'Folha dos halteres: passo maior que a diferença', 'Folha dos halteres → o mais leve 5 kg, o mais pesado 8 kg, de 5 em 5 → "Pronto" → "Gerar meu programa".', async () => {
      await page.getByLabel('O mais pesado: outro valor').fill('8');
      await page.getByLabel('De quanto em quanto: outro valor').fill('5');
    });
    await page.getByRole('button', { name: 'Tirar Halteres fixos' }).click();
  });
  // o equipamento da Ana: halteres fixos de 1 a 12 kg e banco reto
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
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
