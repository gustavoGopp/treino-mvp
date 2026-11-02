import { expect, test, type Page } from '@playwright/test';
import { ana } from './jornada';
import { semToquePequeno } from './toque';

// R2: acompanhamento. A Ana (persona fictícia) faz o cadastro pelo app; o histórico de treinos é gravado direto no
// aparelho (IndexedDB), com datas no passado, e o relógio da página fica parado numa quinta-feira. Assim o teste vê o
// que a pessoa veria depois de 22 dias sem treinar, a sua semana, a evolução e a sugestão da semana leve.
// Com PRINTS=1, guarda as imagens do devlog e da página de diagnóstico em reports/ (pasta fora do git).

test.use({ timezoneId: 'America/Sao_Paulo' });
const AGORA = new Date('2026-11-05T15:00:00.000Z'); // quinta-feira, 12:00 em Brasília

const print = async (page: Page, nome: string) => {
  if (process.env.PRINTS) await page.screenshot({ path: `reports/r2-${nome}.png`, fullPage: false });
};

type Sessao = { dia: number; quando: string; hojeFoi?: 'leve' | 'normal' | 'pesado'; series?: Record<string, [number, number][]> };

/**
 * Grava um histórico no aparelho: cada sessão faz o dia `dia` do programa salvo, com as séries prescritas de cada
 * exercício (10 kg × 10, RIR 2; peso do corpo no 1º degrau), ou as séries dadas em `series` (kg, repetições).
 */
async function comHistorico(page: Page, sessoes: Sessao[]) {
  await page.evaluate(async (lista) => {
    const PESO_CORPO = ['ponte-gluteo', 'abdominal-chao'];
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
      const d = dias[s.dia]!;
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
                reps: 10,
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
}

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(AGORA);
  await ana(page);
});

test('volta depois de 22 dias: a mensagem sem culpa, menos séries e a carga 10% menor já preenchida', async ({ page }) => {
  // A semana de 12 a 14/10 com os 3 treinos; o último terminou em 14/10. Hoje, 05/11: 22 dias.
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-12T13:00:00.000Z' },
    { dia: 1, quando: '2026-10-13T13:00:00.000Z' },
    { dia: 2, quando: '2026-10-14T13:00:00.000Z' },
  ]);
  const volta = page.getByRole('region', { name: 'Bem-vindo de volta!' });
  await expect(volta).toContainText('Faz 22 dias do último treino. Estas 2 semanas vão mais leves, para o corpo se readaptar sem dor. O músculo não some em 3 semanas.');
  await expect(volta).toContainText('A carga começa 10% abaixo da última vez e já vem preenchida.');
  // 8 de 13 até a auditoria do treino: a ponte com halter (programa da Ana aprovado em 02/11/2026).
  await expect(volta).toContainText(/Séries no Corpo todo A\s*9 de 14/);
  await expect(volta).toContainText('3–4 repetições');
  await expect(page.getByText(/Você está na semana 1\. Cerca de metade das séries, RIR 3–4 e carga 10% abaixo da última vez/)).toBeVisible();
  await print(page, 'volta');
  await semToquePequeno(page);

  await page.getByRole('button', { name: 'Começar o treino Corpo todo A' }).click();
  await expect(page.getByRole('heading', { name: 'Agachamento búlgaro com apoio' })).toBeVisible();
  await expect(page.getByText('Meta: 2 × 8–12 (cada lado) · RIR 3–4')).toBeVisible();
  await expect(page.getByText('Hoje: 9 kg')).toBeVisible();
  await expect(page.getByText(/Última vez: 10 kg\. Volta da pausa: 10% mais leve/)).toBeVisible();
  await expect(page.getByLabel('Carga', { exact: true })).toHaveValue('9');
  await print(page, 'volta-treino');
  await semToquePequeno(page);
});

test('menos de 14 dias: nenhuma mensagem e a mesma carga', async ({ page }) => {
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-26T13:00:00.000Z' },
    { dia: 1, quando: '2026-10-28T13:00:00.000Z' },
    { dia: 2, quando: '2026-10-30T13:00:00.000Z' },
  ]);
  await expect(page.getByRole('region', { name: 'Bem-vindo de volta!' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Começar o treino Corpo todo A' }).click();
  await expect(page.getByLabel('Carga', { exact: true })).toHaveValue('10');
});

test('abre "a sua semana" pela faixa do Seu treino: treinos, séries por músculo e semanas com treino', async ({ page }) => {
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-20T13:00:00.000Z' },
    { dia: 1, quando: '2026-10-22T13:00:00.000Z' },
    { dia: 2, quando: '2026-10-24T13:00:00.000Z' },
    { dia: 0, quando: '2026-11-02T13:00:00.000Z' },
    { dia: 1, quando: '2026-11-03T13:00:00.000Z' },
  ]);
  const faixa = page.getByRole('link', { name: /A sua semana/ });
  await expect(faixa).toContainText('2 de 3');
  await expect(faixa).toContainText('2 de 3 treinos. Se der, o Corpo todo C cabe até domingo.');
  await print(page, 'faixa');
  await semToquePequeno(page);
  await faixa.click();

  await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
  await expect(page.getByText('02/11 a 08/11, em qualquer local')).toBeVisible();
  await expect(page.getByRole('heading', { name: /2 de 3 treinos/ })).toBeVisible();
  const musculos = page.getByRole('list', { name: 'Séries efetivas por músculo nesta semana' });
  await expect(musculos).toBeVisible();
  await expect(musculos.getByRole('listitem').first()).toBeVisible();
  // Os 4 estados em palavras, nunca em vermelho.
  await expect(musculos).toContainText(/na meta|crescendo|mantendo|ainda não treinou nesta semana/);
  const cores = await musculos.locator('.m-barra i').evaluateAll((els) => els.map((e) => getComputedStyle(e).backgroundColor));
  expect(cores.every((c) => c === cores[0])).toBe(true);
  // Semanas de 19/10 (3 treinos), 26/10 (nenhum) e a de hoje (2): 2 de 3, sem sequência que zera.
  await expect(page.getByRole('heading', { name: '2 semanas com treino nas últimas 3' })).toBeVisible();
  await print(page, 'semana');
  await semToquePequeno(page);
});

test('vê a evolução de um exercício: a melhor série de cada treino, com "recorde" e "subiu a carga"', async ({ page }) => {
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-12T13:00:00.000Z', series: { 'supino-reto': [[8, 10], [8, 9]] } },
    { dia: 2, quando: '2026-10-16T13:00:00.000Z', series: { 'supino-reto': [[8, 12], [8, 10]] } },
    { dia: 0, quando: '2026-10-19T13:00:00.000Z', series: { 'supino-reto': [[9, 8], [9, 8]] } },
  ]);
  await page.getByRole('link', { name: /A sua semana/ }).click();
  await page.getByRole('link', { name: 'Supino reto com halteres' }).click();
  await expect(page.getByRole('heading', { name: 'Supino reto com halteres' })).toBeVisible();
  const pontos = page.locator('.pontos-evolucao li');
  await expect(pontos).toHaveCount(3);
  await expect(pontos.nth(0)).toContainText('8 kg × 10');
  await expect(pontos.nth(1)).toContainText('8 kg × 12');
  await expect(pontos.nth(1)).toContainText('recorde');
  await expect(pontos.nth(2)).toContainText('9 kg × 8');
  await expect(pontos.nth(2)).toContainText('subiu a carga');
  await expect(page.getByText(/estimad|carga máxima/i)).toHaveCount(0);
  await print(page, 'evolucao');
  await semToquePequeno(page);
});

test('com o sinal, recebe a sugestão da semana leve: o toque "hoje foi" no fim do treino, sem nada marcado', async ({ page }) => {
  // Os 2 treinos de antes: um "pesado demais".
  await comHistorico(page, [
    { dia: 0, quando: '2026-11-02T13:00:00.000Z', hojeFoi: 'pesado' },
    { dia: 1, quando: '2026-11-03T13:00:00.000Z' },
  ]);
  await page.getByRole('button', { name: 'Começar o treino Corpo todo C' }).click();
  await page.getByLabel('Carga', { exact: true }).selectOption('10');
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await page.getByRole('banner').getByRole('button', { name: 'Terminar treino' }).click();

  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
  await semToquePequeno(page);
  const hojeFoi = page.getByRole('group', { name: 'Hoje foi: (opcional)' });
  for (const b of ['leve', 'normal', 'pesado demais']) await expect(hojeFoi.getByRole('button', { name: b, exact: true })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByRole('region', { name: 'Semana leve? (opcional)' })).toHaveCount(0);
  await hojeFoi.getByRole('button', { name: 'pesado demais' }).click();
  await expect(hojeFoi.getByRole('button', { name: 'pesado demais' })).toHaveAttribute('aria-pressed', 'true');

  const leve = page.getByRole('region', { name: 'Semana leve? (opcional)' });
  await expect(leve).toContainText('Motivo: "pesado demais" em 2 dos últimos 3 treinos.');
  await expect(leve).toContainText('Para descansar, não para crescer.');
  await print(page, 'semana-leve');
  await semToquePequeno(page);
  await leve.getByRole('button', { name: 'Fazer a semana leve' }).click();
  await expect(page.getByRole('region', { name: /^Semana leve até / })).toBeVisible();

  // No Seu treino, a semana leve já vale: metade das séries e RIR 3–4.
  await page.getByRole('link', { name: 'Voltar ao programa' }).click();
  await expect(page.getByText(/Você está na semana \d\. Semana leve: cerca de metade das séries/)).toBeVisible();
  await page.getByRole('button', { name: 'Voltar ao normal' }).click();
  await expect(page.getByRole('region', { name: /^Semana leve até / })).toHaveCount(0);
});
