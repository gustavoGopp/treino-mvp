import { expect, test, type Page } from '@playwright/test';
import { criterios } from './criterios';
import { abrirExercicio, abrirTrocar, ana, detalhesDo, folhaPronta, maisOpcoes, pronto, proximoExercicio, sobreOPrograma, terminarTreino, verAvisos } from './jornada';

// Redesign (06/11/2026), lote 1: os 4 critérios (toque de 44 px, contraste, texto cortado e foco coberto) em todas as
// telas, nos 7 cenários que o protótipo mediu (docs/revisoes/redesign/proposta.md, seção 13). Os cenários de 320 px,
// zoom de 200% e letra a 125% vêm da crítica independente (G4 e a WCAG 1.4.10: o conteúdo cabe em 320 px sem rolar de
// lado). Uma combinação que o app de hoje ainda não cumpre fica como `fixme`, com o lote que reconstrói aquela tela;
// quando o lote entrar, o `fixme` sai.

type Cenario = { nome: string; largura?: number; altura?: number; tema: 'light' | 'dark'; letra?: number };
const CENARIOS: Cenario[] = [
  { nome: 'claro', tema: 'light' },
  { nome: 'escuro', tema: 'dark' },
  { nome: 'pequeno', largura: 360, altura: 740, tema: 'light' },
  { nome: 'baixo', largura: 412, altura: 640, tema: 'light' },
  { nome: 'estreito', largura: 320, altura: 640, tema: 'light' },
  { nome: 'zoom200', largura: 206, altura: 420, tema: 'light' },
  { nome: 'letra125', tema: 'light', letra: 125 },
];

// O que ainda falha no fim do lote 1 (medido em 06/11/2026), por cenário e grupo de telas, e o lote que reconstrói a tela.
// Lote 2 (06/11/2026): treino e guia passaram a cumprir os 4 critérios nos 7 cenários; sobram os de outros lotes.
const PENDENTE: Record<string, string> = {
};

async function preparar(page: Page, c: Cenario) {
  await page.emulateMedia({ colorScheme: c.tema });
  if (c.largura) await page.setViewportSize({ width: c.largura, height: c.altura! });
  // a letra maior do sistema: o Android aumenta a letra base da página
  if (c.letra) await page.addInitScript((p) => document.addEventListener('DOMContentLoaded', () => (document.documentElement.style.fontSize = `${p}%`)), c.letra);
}

async function salvarSerie(page: Page) {
  // a tela do treino chega num pedaço próprio: espera a série antes de olhar a carga (o `count` não espera)
  await expect(page.getByRole('region', { name: /^Série \d/ })).toBeVisible();
  const carga = page.getByLabel('Carga', { exact: true });
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT')) && !(await carga.inputValue())) await carga.selectOption({ index: 6 });
  const rir = page.getByRole('radio', { name: '2', exact: true });
  if (!(await rir.isChecked())) await rir.check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
}

async function comecar(page: Page) {
  await ana(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page).toHaveURL(/\/treino$/);
}

const GRUPOS: Record<string, (page: Page) => Promise<void>> = {
  // lote 3
  cadastro: async (page) => {
    await page.goto('/');
    await criterios(page); // boas-vindas
    await page.getByRole('button', { name: 'Começar', exact: true }).click();
    await criterios(page); // triagem em lista
    await page.getByRole('button', { name: 'Ver as perguntas completas' }).click();
    await folhaPronta(page);
    await criterios(page); // as 9 perguntas inteiras
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Sim, alguma (ou não tenho certeza)' }).click();
    await criterios(page); // a tela do "sim"
    await page.locator('label.opcao', { hasText: 'Dor no peito' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Continuar' }).click();
    await folhaPronta(page);
    await criterios(page); // a confirmação das não marcadas
    await page.goto('/comecar/triagem');
    await page.getByRole('button', { name: 'Não, nenhuma' }).click();
    await page.getByRole('group', { name: /sem parar/ }).getByLabel('Menos de 6 meses').check();
    await page.getByRole('group', { name: /treinando agora/ }).getByLabel(/^Estou treinando/).check();
    await page.getByRole('group', { name: /confiança na técnica/ }).getByLabel(/^Sim/).check();
    await criterios(page); // nível
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('group', { name: /Quantos dias/ }).getByLabel('3 dias').check();
    await page.getByRole('group', { name: /Quantos minutos/ }).getByLabel('45 min', { exact: true }).check();
    await criterios(page); // rotina
    await page.getByRole('button', { name: 'Continuar' }).click();
    await criterios(page); // equipamento, vazio
    await page.getByRole('button', { name: 'Academia completa' }).click();
    await criterios(page); // equipamento, com a academia completa
    await page.getByRole('button', { name: /^Conferir os \d+ itens/ }).click();
    await criterios(page); // a lista: marcados, busca, categorias e grade
    await detalhesDo(page, 'Polia simples');
    await criterios(page); // a folha dos detalhes (era a pendência "Regulável" a 125%)
    await pronto(page);
    await page.getByRole('button', { name: 'Pela foto' }).click();
    await folhaPronta(page);
    await criterios(page); // a folha da foto
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Gerar meu programa' }).click();
    await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
    await criterios(page); // o programa recém-gerado
  },
  // lote 4
  inicio: async (page) => {
    await ana(page);
    await criterios(page); // Seu treino
    await page.getByRole('tab').nth(1).click();
    await criterios(page); // outro dia
    await abrirExercicio(page, /./);
    await criterios(page); // a folha do exercício
    await page.keyboard.press('Escape');
    await sobreOPrograma(page);
    await criterios(page); // "Sobre o programa"
    await page.keyboard.press('Escape');
    if (await page.locator('.aviso-linha').count()) {
      await verAvisos(page);
      await criterios(page); // a folha dos avisos
      await page.keyboard.press('Escape');
    }
  },
  // lote 2
  treino: async (page) => {
    await comecar(page);
    await criterios(page); // série 1
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await criterios(page);
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await abrirTrocar(page);
    await criterios(page);
    await page.keyboard.press('Escape');
    await maisOpcoes(page);
    await criterios(page); // o "⋯"
    await page.keyboard.press('Escape');
    await salvarSerie(page);
    await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
    await criterios(page); // descanso
    await page.getByRole('button', { name: 'Pular' }).click();
    await criterios(page); // série 2
    await proximoExercicio(page);
    await expect(page.getByRole('heading', { name: /Ponte de glúteo/ })).toBeVisible();
    await criterios(page); // exercício sem animação, cartão fechado
    await page.getByRole('button', { name: 'Como fazer: dicas e erros ›' }).click();
    await criterios(page); // cartão aberto
  },
  // lote 2
  guia: async (page) => {
    await comecar(page);
    await page.getByRole('link', { name: 'Ver como fazer' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const modo of ['Técnica', 'Erros', 'Músculos', 'Trajetória']) {
      await page.getByRole('button', { name: modo, exact: true }).click();
      await criterios(page);
    }
  },
  // lote 4
  'fim-e-semana': async (page) => {
    await comecar(page);
    await salvarSerie(page);
    await terminarTreino(page);
    await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
    await criterios(page); // fim do treino
    await page.goto('/semana');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await criterios(page); // semana
    await page.locator('.lista-evolucao a').first().click();
    await expect(page).toHaveURL(/\/evolucao\//);
    await criterios(page); // evolução
  },
  // lote 5
  'dados-e-locais': async (page) => {
    await ana(page);
    await page.goto('/dados');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await criterios(page);
    // lote 5: as folhas de Meus dados e o diálogo de apagar
    for (const linha of ['Estilo do Boneco', 'Guardar uma cópia', 'Trazer uma cópia', 'Apagar todos os dados']) {
      await page.getByRole('button', { name: linha }).click();
      await folhaPronta(page);
      await criterios(page);
      await page.keyboard.press('Escape');
    }
    await page.goto('/locais');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await criterios(page);
  },
};

for (const c of CENARIOS)
  for (const [grupo, percorrer] of Object.entries(GRUPOS)) {
    test(`${c.nome} · ${grupo}: toque, contraste, texto cortado e foco coberto`, async ({ page }) => {
      const pendente = PENDENTE[`${c.nome}/${grupo}`];
      test.fixme(!!pendente, pendente);
      test.setTimeout(120_000);
      await preparar(page, c);
      await percorrer(page);
    });
  }
