import { mkdirSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { ana, triagemNenhuma } from '../../../../tests/e2e/jornada';
import { medir, type Medida } from '../../medir';

// Agente 4 (redesign, 06/11/2026): em cada tela do app de hoje, com a persona fictícia Ana, mede a organização visual:
// quantos tamanhos e pesos de letra aparecem de fato, quantas "caixas" (superfícies com fundo próprio) e quantos alvos
// de toque há na primeira tela (sem rolar) e na página inteira, quantas alturas de tela a página tem, onde fica o botão
// principal, quantos selos de evidência há e quantas linhas de texto passam de 75 caracteres. Reaproveita medir.ts.
// Saída: reports/design/redesign/agente-4/medidas-<projeto>.json e as capturas em reports/design/redesign/agente-4/antes/<projeto>/.
// Uso: npx playwright test -c scripts/design/redesign/agente-4/playwright.config.ts medidas

const AGORA = new Date('2026-11-05T15:00:00.000Z'); // quinta-feira, 12:00 em Brasília
const SAIDA = 'reports/design/redesign/agente-4';
type Organizacao = Medida & {
  tamanhosDeLetra: Record<string, number>;
  pesos: Record<string, number>;
  caixas: number;
  caixasNaPrimeiraTela: number;
  alvos: number;
  alvosNaPrimeiraTela: number;
  selos: number;
  selosNaPrimeiraTela: number;
  linhasLongas: { texto: string; caracteres: number }[];
  larguraTextoMax: number;
  titulos: { tag: string; px: number; peso: string; texto: string }[];
  navInferior: boolean;
  acaoFixa: boolean;
};
const medidas: Organizacao[] = [];

test.use({ deviceScaleFactor: 1.5 });
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(AGORA);
});
// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}, info) => {
  mkdirSync(SAIDA, { recursive: true });
  const atual = medidas.filter((m) => m.tela.startsWith(info.project.name + '/'));
  writeFileSync(`${SAIDA}/medidas-${info.project.name}.json`, JSON.stringify(atual, null, 1) + '\n');
});

async function organizacao(page: Page): Promise<Omit<Organizacao, keyof Medida>> {
  return page.evaluate(() => {
    const H = window.innerHeight;
    const vis = (e: Element) => {
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.opacity !== '0';
    };
    const naPrimeira = (e: Element) => e.getBoundingClientRect().top + window.scrollY < H;
    const comTexto = Array.from(document.body.querySelectorAll<HTMLElement>('*')).filter(
      (e) => !e.closest('svg, .stage, .miniatura') && vis(e) && Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim()),
    );
    const tamanhos: Record<string, number> = {};
    const pesos: Record<string, number> = {};
    for (const e of comTexto) {
      const s = getComputedStyle(e);
      const px = String(Math.round(parseFloat(s.fontSize) * 10) / 10);
      tamanhos[px] = (tamanhos[px] ?? 0) + 1;
      pesos[s.fontWeight] = (pesos[s.fontWeight] ?? 0) + 1;
    }
    // caixas: elementos visíveis com fundo opaco diferente do fundo da página, fora do palco (superfícies, cartões, chips, botões ficam de fora)
    const fundoPagina = getComputedStyle(document.body).backgroundColor;
    const caixasEls = Array.from(document.body.querySelectorAll<HTMLElement>('div, section, details, li, p, ul, ol, fieldset, label, a, dl, table')).filter((e) => {
      if (e.closest('svg, .stage, .miniatura, button')) return false;
      if (!vis(e)) return false;
      const s = getComputedStyle(e);
      const bg = s.backgroundColor;
      if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === fundoPagina) return false;
      const r = e.getBoundingClientRect();
      return r.width >= 120 && r.height >= 40;
    });
    const alvosEls = Array.from(document.querySelectorAll<HTMLElement>('a[href], button, select, summary, [role=button], [role=tab], input[type=text], input[type=number]')).filter(vis);
    const rotulos = Array.from(document.querySelectorAll<HTMLInputElement>('input[type=radio], input[type=checkbox]')).flatMap((i) => Array.from(i.labels ?? [])).filter(vis);
    const alvos = [...alvosEls, ...rotulos];
    const selos = Array.from(document.querySelectorAll<HTMLElement>('.selo')).filter(vis);
    // linhas longas: blocos de texto corrido (p, li, legend) com mais de 75 caracteres por linha estimada
    const linhasLongas: { texto: string; caracteres: number }[] = [];
    let larguraTextoMax = 0;
    for (const e of Array.from(document.body.querySelectorAll<HTMLElement>('p, li, legend, dd, span.fs-msg'))) {
      if (!vis(e) || e.closest('svg, .stage')) continue;
      const texto = e.innerText.trim().replace(/\s+/g, ' ');
      if (texto.length < 40) continue;
      const s = getComputedStyle(e);
      const px = parseFloat(s.fontSize);
      const r = e.getBoundingClientRect();
      const linhas = Math.max(1, Math.round(r.height / (px * (parseFloat(s.lineHeight) / px || 1.45))));
      const porLinha = Math.round(texto.length / linhas);
      larguraTextoMax = Math.max(larguraTextoMax, Math.round(r.width));
      if (porLinha > 75) linhasLongas.push({ texto: texto.slice(0, 50), caracteres: porLinha });
    }
    const titulos = Array.from(document.querySelectorAll<HTMLElement>('h1, h2, h3, h4, legend'))
      .filter(vis)
      .map((e) => {
        const s = getComputedStyle(e);
        return { tag: e.tagName.toLowerCase(), px: Math.round(parseFloat(s.fontSize) * 10) / 10, peso: s.fontWeight, texto: e.innerText.trim().replace(/\s+/g, ' ').slice(0, 40) };
      });
    return {
      tamanhosDeLetra: tamanhos,
      pesos,
      caixas: caixasEls.length,
      caixasNaPrimeiraTela: caixasEls.filter(naPrimeira).length,
      alvos: alvos.length,
      alvosNaPrimeiraTela: alvos.filter(naPrimeira).length,
      selos: selos.length,
      selosNaPrimeiraTela: selos.filter(naPrimeira).length,
      linhasLongas,
      larguraTextoMax,
      titulos,
      navInferior: !!document.querySelector('.nav-inferior'),
      acaoFixa: !!document.querySelector('.acao-fixa, .registro .salvar'),
    };
  });
}

async function foto(page: Page, nome: string) {
  const proj = test.info().project.name;
  const dir = `${SAIDA}/antes/${proj}`;
  mkdirSync(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${dir}/${nome}.png`, fullPage: false, animations: 'disabled' });
  await page.screenshot({ path: `${dir}/${nome}-inteira.png`, fullPage: true, animations: 'disabled' });
  const base = await medir(page, `${proj}/${nome}`);
  medidas.push({ ...base, ...(await organizacao(page)) });
}

const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });

test('cadastro', async ({ page }) => {
  await page.goto('/');
  await foto(page, '01-boas-vindas');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await expect(page.getByRole('heading', { name: 'Antes de começar, 9 perguntas rápidas' })).toBeVisible();
  await foto(page, '02-triagem-lista');
  await page.getByRole('button', { name: 'Sim, alguma vale' }).click();
  await foto(page, '02b-triagem-perguntas');
  await page.goBack().catch(() => {});
  await page.goto('/comecar/triagem');
  await triagemNenhuma(page);
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  await foto(page, '03-nivel-vazio');
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await grupo(page, /confiança na técnica/).getByLabel(/^Sim/).check();
  await foto(page, '03b-nivel-respondido');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  await foto(page, '04-rotina-vazia');
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await grupo(page, /Quantos minutos/).getByLabel('45 min', { exact: true }).check();
  await page.getByLabel('Pernas', { exact: true }).check();
  await foto(page, '04b-rotina-respondida');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await foto(page, '05-equipamento-lugar');
  await page.getByLabel('Halteres fixos', { exact: true }).check();
  await foto(page, '05b-equipamento-lista-halteres');
  await grupo(page, 'O mais leve').getByLabel('1 kg', { exact: true }).check();
  await grupo(page, 'O mais pesado').getByLabel('12 kg', { exact: true }).check();
  await grupo(page, 'De quanto em quanto').getByLabel('1 kg', { exact: true }).check();
  await page.getByLabel('Banco reto', { exact: true }).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  await foto(page, '06-confirmar');
});

test('programa, treino e acompanhamento', async ({ page }) => {
  await ana(page);
  await foto(page, '07-programa');
  await page.goto('/guia/afundo');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Pausar' }).click({ timeout: 2000 }).catch(() => {});
  await foto(page, '09-guia');
  await page.goto('/programa');
  await page.getByRole('button', { name: /^Começar o treino/ }).first().click();
  await expect(page).toHaveURL(/\/treino$/);
  await foto(page, '10-treino-serie');
  const carga = page.getByLabel('Carga', { exact: true });
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT'))) await carga.selectOption({ index: 6 });
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('region', { name: /^Série \d/ }).getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await foto(page, '11-treino-descanso');
  await page.getByRole('button', { name: 'Pular' }).click();
  await page.getByRole('button', { name: 'Senti algo' }).first().click();
  await foto(page, '12-treino-senti-algo');
  await page.getByRole('button', { name: 'Senti algo' }).first().click();
  await page.getByRole('button', { name: 'Trocar exercício' }).first().click();
  await foto(page, '12b-treino-trocar');
  await page.getByRole('button', { name: 'Terminar treino' }).first().click();
  await page.waitForTimeout(500);
  await foto(page, '13-fim-do-treino');
  await page.goto('/semana');
  await foto(page, '14-semana');
  await page.goto('/evolucao/afundo');
  await foto(page, '15-evolucao');
  await page.goto('/dados');
  await foto(page, '16-meus-dados');
  await page.goto('/locais');
  await foto(page, '17-locais');
  await page.goto('/locais/novo');
  await foto(page, '17b-novo-local');
});
