import { mkdirSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { ana } from '../../../../tests/e2e/jornada';
import { medir, type Medida } from '../../medir';

// Agente 1 (retenção): o que a pessoa vê, sem rolar, em cada momento que importa para voltar ao app.
// Persona fictícia Ana (tests/personas): iniciante, halteres de 1 a 12 kg e banco reto, 3 × 45 min.
// O histórico é gravado direto no aparelho (IndexedDB), como em tests/e2e/acompanhamento.spec.ts, e o relógio da
// página fica parado numa quinta-feira (05/11/2026, 12:00 em Brasília).
// Saída: imagens em reports/design/redesign/agente-1/<projeto>/ (fora do git) e os números em
// reports/design/redesign/agente-1/medidas-<projeto>.json.

const AGORA = new Date('2026-11-05T15:00:00.000Z');
const SAIDA = 'reports/design/redesign/agente-1';

type Bloco = { tipo: string; texto: string; topoPct: number; alturaPct: number; visivel: boolean };
type MedidaMomento = Medida & {
  momento: string;
  url: string;
  /** Blocos de conteúdo (títulos, caixas, faixas, botões) na ordem da página, com a posição em % da altura da tela. */
  blocos: Bloco[];
  /** Quantos blocos "falam" com a pessoa (caixas, faixas, avisos, status) na página inteira e acima da dobra. */
  mensagens: { total: number; acimaDaDobra: number };
  botoes: { total: number; acimaDaDobra: number; textos: string[] };
  palavras: { total: number; acimaDaDobra: number };
};
const medidas: MedidaMomento[] = [];

test.use({ deviceScaleFactor: 1.5 });
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(AGORA);
});
// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}, info) => {
  mkdirSync(SAIDA, { recursive: true });
  const atual = medidas.filter((m) => m.tela.startsWith(info.project.name + '/'));
  if (!atual.length) return; // rodando só o teste extra (-g "fim com semana leve"): não apaga as medidas da jornada
  writeFileSync(`${SAIDA}/medidas-${info.project.name}.json`, JSON.stringify(atual, null, 1) + '\n');
});

/** Blocos da página: o que a pessoa lê, na ordem, e onde cada um fica em relação à altura da tela. */
async function blocos(page: Page) {
  return page.evaluate(() => {
    const H = window.innerHeight;
    const sel = 'h1, h2, h3, .faixa, .faixa-semana, .box, .fase, .warnbox, .caixa-erro, [role=status], .fichas, .abas, .cartao-ex, .btn, .link-sec, .nav-inferior, .acao-fixa, .hoje-foi, .pontos-evolucao, .musculos, .semanas, details.sobre';
    const vis = (e: Element) => {
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
    };
    const out: Bloco[] = [];
    for (const e of Array.from(document.querySelectorAll<HTMLElement>(sel))) {
      if (!vis(e)) continue;
      if (e.closest('details:not([open]) > :not(summary)')) continue;
      const r = e.getBoundingClientRect();
      const topo = r.top + window.scrollY;
      const texto = (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 70);
      if (!texto) continue;
      const tipo = e.className && typeof e.className === 'string' ? e.className.split(' ')[0]! : e.tagName.toLowerCase();
      out.push({ tipo: e.tagName.toLowerCase() === 'h1' || e.tagName.toLowerCase() === 'h2' || e.tagName.toLowerCase() === 'h3' ? e.tagName.toLowerCase() : tipo, texto, topoPct: Math.round((topo / H) * 100), alturaPct: Math.round((r.height / H) * 100), visivel: topo + Math.min(r.height, 24) <= H });
    }
    const falam = out.filter((b) => ['faixa', 'faixa-semana', 'box', 'fase', 'warnbox', 'caixa-erro', 'status'].includes(b.tipo) || b.tipo === 'div');
    const btns = Array.from(document.querySelectorAll<HTMLElement>('.btn, button, a.link-sec')).filter(vis).filter((e) => !e.closest('details:not([open])') && !e.closest('.nav-inferior'));
    const dobra = (e: HTMLElement) => e.getBoundingClientRect().top + window.scrollY + 24 <= H;
    const palavras = (txt: string) => txt.trim().split(/\s+/).filter(Boolean).length;
    const main = document.querySelector('main') ?? document.body;
    const acima = Array.from(main.querySelectorAll<HTMLElement>('p, h1, h2, h3, li, legend, span.fs-msg, dt, dd, button, a')).filter(vis).filter((e) => e.getBoundingClientRect().top + window.scrollY < H && !Array.from(e.children).some((c) => ['P', 'LI', 'H2', 'H3'].includes(c.tagName)));
    return {
      blocos: out,
      mensagens: { total: falam.length, acimaDaDobra: falam.filter((b) => b.visivel).length },
      botoes: { total: btns.length, acimaDaDobra: btns.filter(dobra).length, textos: btns.map((b) => (b.innerText || b.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40)) },
      palavras: { total: palavras(main.innerText), acimaDaDobra: acima.reduce((t, e) => t + palavras(e.innerText), 0) },
    };
  });
}

async function foto(page: Page, momento: string) {
  const proj = test.info().project.name;
  const dir = `${SAIDA}/${proj}`;
  mkdirSync(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${dir}/${momento}.png`, fullPage: false, animations: 'disabled' });
  await page.screenshot({ path: `${dir}/${momento}-inteira.png`, fullPage: true, animations: 'disabled' });
  const m = await medir(page, `${proj}/${momento}`);
  const b = await blocos(page);
  medidas.push({ ...m, ...b, momento, url: new URL(page.url()).pathname });
}

type Sessao = { dia: number; quando: string; hojeFoi?: 'leve' | 'normal' | 'pesado'; series?: Record<string, [number, number][]>; /** Repetições de cada série (10 se ausente); sobe de treino em treino para a dupla progressão não ver "estagnado". */ reps?: number };

/** Grava um histórico no aparelho (mesma técnica de tests/e2e/acompanhamento.spec.ts). */
async function comHistorico(page: Page, sessoes: Sessao[]) {
  await page.evaluate(async (lista) => {
    const PESO_CORPO = ['ponte-gluteo', 'abdominal-chao', 'flexao-joelho-deslizante', 'ponte-gluteo-halter'];
    const abrir = () =>
      new Promise<IDBDatabase>((ok, erro) => {
        const r = indexedDB.open('keyval-store');
        r.onsuccess = () => ok(r.result);
        r.onerror = () => erro(r.error);
      });
    const db = await abrir();
    const loja = () => db.transaction('keyval', 'readwrite').objectStore('keyval');
    type Dia = { id: string; exercicios: { exId: string; series: number }[] };
    const estado = await new Promise<{ programa: { programa: { dias: Dia[] } }; historico: unknown[] }>((ok) => {
      const r = loja().get('estado');
      r.onsuccess = () => ok(r.result);
    });
    const dias = estado.programa.programa.dias;
    estado.historico = lista.map((s) => {
      const d = dias[s.dia % dias.length]!;
      const fim = new Date(Date.parse(s.quando) + 50 * 60_000).toISOString();
      return {
        id: s.quando,
        diaId: d.id,
        semana: 1,
        inicio: s.quando,
        fim,
        localId: 'local-1',
        ...(s.hojeFoi ? { hojeFoi: s.hojeFoi } : {}),
        exercicios: d.exercicios.map((x) => ({
          exId: x.exId,
          series: s.series?.[x.exId]
            ? s.series[x.exId]!.map(([kg, reps]) => ({ carga: { tipo: 'kg', kg }, reps, rir: 2 }))
            : Array.from({ length: x.series }, () => ({
                carga: PESO_CORPO.includes(x.exId) ? { tipo: 'degrau', degrau: 0 } : { tipo: 'kg', kg: 10 },
                reps: s.reps ?? 10,
                rir: 2,
              })),
        })),
      };
    });
    await new Promise<void>((ok) => {
      const r = loja().put(estado, 'estado');
      r.onsuccess = () => ok();
    });
  }, sessoes);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

/** Uma semana cheia da Ana (3 treinos, seg/qua/sex) começando numa segunda (AAAA-MM-DD). */
const semana = (segunda: string, extra: Partial<Sessao> = {}): Sessao[] => {
  const t = Date.parse(`${segunda}T13:00:00.000Z`);
  return [0, 2, 4].map((k, i) => ({ dia: i, quando: new Date(t + k * 86_400_000).toISOString(), ...extra }));
};
/** Semanas seguidas em que cada treino faz 1 repetição a mais que o anterior do mesmo dia (progresso normal). */
const semanasProgredindo = (segundas: string[]): Sessao[] => segundas.flatMap((seg, i) => semana(seg, { reps: 9 + i }));

test('momentos da jornada da Ana', async ({ page }) => {
  await ana(page);
  // M0: a 1ª abertura, logo depois do cadastro (sem histórico).
  await foto(page, '01-inicio-primeira-abertura');

  // M1: a 1ª abertura depois do 1º treino (ontem, quarta 04/11).
  await comHistorico(page, [{ dia: 0, quando: '2026-11-04T13:00:00.000Z' }]);
  await foto(page, '02-inicio-depois-do-1o-treino');
  await page.goto('/semana');
  await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
  await foto(page, '03-semana-depois-do-1o-treino');

  // M2: o dia de treino chegando, na 2ª semana (2 de 3 feitos nesta semana).
  await page.goto('/programa');
  await comHistorico(page, [...semana('2026-10-26'), { dia: 0, quando: '2026-11-02T13:00:00.000Z' }, { dia: 1, quando: '2026-11-03T13:00:00.000Z' }]);
  await foto(page, '04-inicio-dia-de-treino-2a-semana');

  // M3: a volta depois de 22 dias (os 3 treinos de 12 a 14/10; o último terminou em 14/10, como no e2e do R2).
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-12T13:00:00.000Z' },
    { dia: 1, quando: '2026-10-13T13:00:00.000Z' },
    { dia: 2, quando: '2026-10-14T13:00:00.000Z' },
  ]);
  await foto(page, '05-inicio-volta-22-dias');
  // Volta depois de 20 dias (RIR +1, mesma carga): o último treino em 16/10.
  await comHistorico(page, semana('2026-10-12'));
  await foto(page, '05b-inicio-volta-20-dias');
  // Volta depois de 69 dias (último treino em 28/08): carga −15%.
  await comHistorico(page, semana('2026-08-24'));
  await foto(page, '06-inicio-volta-70-dias');

  // M4: a 4ª semana (3 semanas cheias atrás, progredindo; hoje quinta, 2 de 3 nesta semana).
  await comHistorico(page, [...semanasProgredindo(['2026-10-12', '2026-10-19', '2026-10-26']), { dia: 0, quando: '2026-11-02T13:00:00.000Z', reps: 12 }, { dia: 1, quando: '2026-11-03T13:00:00.000Z', reps: 12 }]);
  await foto(page, '07-inicio-4a-semana');
  await page.goto('/semana');
  await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
  await foto(page, '08-semana-4a-semana');
  await page.goto('/evolucao/supino-reto');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await foto(page, '09-evolucao-4a-semana');

  // Semana com menos treino: 3 das últimas 4 semanas com 1 de 3 → a revisão da meta.
  await page.goto('/programa');
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-05T13:00:00.000Z' },
    { dia: 1, quando: '2026-10-13T13:00:00.000Z' },
    { dia: 2, quando: '2026-10-20T13:00:00.000Z' },
    { dia: 0, quando: '2026-10-27T13:00:00.000Z' },
    { dia: 1, quando: '2026-11-03T13:00:00.000Z' },
  ]);
  await foto(page, '10-inicio-semanas-com-menos-treino');
  await page.goto('/semana');
  await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
  await foto(page, '11-semana-revisao-da-meta');

  // Evolução com recorde e carga que subiu (E1 da pesquisa 07).
  await page.goto('/programa');
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-12T13:00:00.000Z', series: { 'supino-reto': [[8, 10], [8, 9]] } },
    { dia: 0, quando: '2026-10-16T13:00:00.000Z', series: { 'supino-reto': [[8, 12], [8, 10]] } },
    { dia: 0, quando: '2026-10-19T13:00:00.000Z', series: { 'supino-reto': [[9, 8], [9, 8]] } },
    { dia: 0, quando: '2026-10-26T13:00:00.000Z', series: { 'supino-reto': [[9, 10], [9, 9]] } },
    { dia: 0, quando: '2026-11-02T13:00:00.000Z', series: { 'supino-reto': [[9, 12], [9, 10]] } },
  ]);
  await page.goto('/evolucao/supino-reto');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await foto(page, '12-evolucao-recorde');

  // Semana leve sugerida de propósito ("pesado demais" em 2 dos últimos 3), para medir o empilhamento das caixas.
  await page.goto('/programa');
  await comHistorico(page, [...semanasProgredindo(['2026-10-19', '2026-10-26']), { dia: 0, quando: '2026-11-02T13:00:00.000Z', reps: 11, hojeFoi: 'pesado' }, { dia: 1, quando: '2026-11-03T13:00:00.000Z', reps: 11, hojeFoi: 'pesado' }]);
  await foto(page, '12b-inicio-semana-leve-sugerida');

  // M5: o fim do treino (uma série feita e "Terminar treino"), com 2 treinos antes nesta semana.
  await page.goto('/programa');
  await comHistorico(page, [...semanasProgredindo(['2026-10-26']), { dia: 0, quando: '2026-11-02T13:00:00.000Z', reps: 10 }, { dia: 1, quando: '2026-11-03T13:00:00.000Z', reps: 10 }]);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page).toHaveURL(/\/treino$/);
  const carga = page.getByLabel('Carga', { exact: true });
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT'))) await carga.selectOption({ index: 6 });
  await page.getByRole('region', { name: /^Série \d/ }).getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await page.getByRole('button', { name: 'Pular' }).click({ timeout: 3000 }).catch(() => {});
  await page.getByRole('banner').getByRole('button', { name: 'Terminar treino' }).click();
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
  await foto(page, '13-fim-do-treino');
  await page.getByRole('group', { name: 'Hoje foi: (opcional)' }).getByRole('button', { name: 'normal', exact: true }).click();
  await foto(page, '14-fim-do-treino-hoje-foi-marcado');
  await page.getByRole('link', { name: 'Ver a sua semana' }).click();
  await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
  await foto(page, '15-semana-logo-depois-do-treino');
  await page.goto('/programa');
  await foto(page, '16-inicio-logo-depois-do-treino');
});

// Extra (2ª sessão do agente 1): o fim do treino quando a semana leve é sugerida ("pesado demais" nos 2 treinos
// anteriores). Mede onde fica "Ver a sua semana" com a caixa da semana leve entre "Hoje foi" e "Para a próxima vez".
// Saída à parte: reports/design/redesign/agente-1/medidas-fim-semana-leve-<projeto>.json.
// Uso: npx playwright test -c scripts/design/redesign/agente-1/playwright.config.ts momentos -g "fim com semana leve"
test('fim com semana leve sugerida', async ({ page }) => {
  await ana(page);
  await comHistorico(page, [...semanasProgredindo(['2026-10-26']), { dia: 0, quando: '2026-11-02T13:00:00.000Z', reps: 10, hojeFoi: 'pesado' }, { dia: 1, quando: '2026-11-03T13:00:00.000Z', reps: 10, hojeFoi: 'pesado' }]);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page).toHaveURL(/\/treino$/);
  const carga = page.getByLabel('Carga', { exact: true });
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT'))) await carga.selectOption({ index: 6 });
  await page.getByRole('region', { name: /^Série \d/ }).getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await page.getByRole('button', { name: 'Pular' }).click({ timeout: 3000 }).catch(() => {});
  await page.getByRole('banner').getByRole('button', { name: 'Terminar treino' }).click();
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Semana leve\?/ })).toBeVisible();
  const antes = medidas.length;
  await foto(page, '13c-fim-do-treino-semana-leve');
  const proj = test.info().project.name;
  writeFileSync(`${SAIDA}/medidas-fim-semana-leve-${proj}.json`, JSON.stringify(medidas.slice(antes), null, 1) + '\n');
  medidas.splice(antes);
});
