import { expect, test, type Page } from '@playwright/test';
import { ana, porQueDaSugestao, sobreOPrograma, terminarTreino, verAvisos } from './jornada';
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
  // lote 4 do redesign: a volta é o próprio cartão de hoje; a mensagem inteira, com o selo, fica no "por quê?".
  const volta = page.getByRole('region', { name: 'Bem-vindo de volta!' });
  // 9 de 15 desde o R5d (o abdominal saiu do A: com foco, os isoladores de quem não é foco entram depois);
  // 9 de 16 desde a sessão de qualidade dos treinos (o abdominal protegido no A; o búlgaro com 2 séries); 9 de 15 antes;
  // 8 de 13 até a auditoria do treino (a ponte com halter); 9 de 14 até a sessão de equipamento mínimo (a flexão deslizante).
  await expect(volta).toContainText(/Séries no Corpo todo A\s*9 de 15/);
  await expect(volta).toContainText('3–4 repetições');
  // no dia da volta, ela é a única mensagem, e o "Começar" fica à vista sem rolar
  await expect(page.locator('.aviso-linha')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Começar o treino Corpo todo A' })).toBeInViewport({ ratio: 1 });
  await print(page, 'volta');
  await semToquePequeno(page);
  await volta.getByRole('button', { name: 'por quê?' }).click();
  const porque = page.getByRole('dialog', { name: 'Bem-vindo de volta!' });
  await expect(porque).toContainText('Faz 22 dias do último treino. Estas 2 semanas vão mais leves, para o corpo se readaptar sem dor. O músculo não some em 3 semanas.');
  await expect(porque).toContainText('A carga começa 10% abaixo da última vez e já vem preenchida.');
  await page.keyboard.press('Escape');
  await expect((await sobreOPrograma(page)).getByText(/Você está na semana 1\. Cerca de metade das séries, RIR 3–4 e carga 10% abaixo da última vez/)).toBeVisible();
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: 'Começar o treino Corpo todo A' }).click();
  await expect(page.getByRole('heading', { name: 'Agachamento búlgaro com apoio' })).toBeVisible();
  // lote 2 do redesign: a meta curta; a reserva-alvo marcada nos botões do RIR; o motivo no "por quê?"
  // 2 séries desde o R5d: o búlgaro do programa volta a 4 (o abdominal saiu do A), e a semana 1 da volta tem cerca de
  // metade. 1 série da sessão de qualidade dos treinos até o R5d (o abdominal protegido tirava 2; qualidade-treinos.md, F.5).
  await expect(page.locator('p.meta').first()).toHaveText('2 × 8–12 cada lado');
  await expect(page.locator('.rir-meta')).toContainText('meta de hoje: 3–4');
  await expect(page.getByText('Hoje: 9 kg')).toBeVisible();
  const motivo = await porQueDaSugestao(page);
  await expect(motivo).toContainText(/Última vez: 10 kg\. Volta da pausa: 10% mais leve/);
  await page.keyboard.press('Escape');
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
  await print(page, 'faixa');
  await semToquePequeno(page);
  await faixa.click();

  await expect(page.getByRole('heading', { name: 'A sua semana' })).toBeVisible();
  await expect(page.getByText('02/11 a 08/11, em qualquer local')).toBeVisible();
  await expect(page.getByRole('heading', { name: /2 de 3 treinos/ })).toBeVisible();
  // lote 4 do redesign: a frase saiu da faixa do início e fica aqui
  await expect(page.getByText('2 de 3 treinos. Se der, o Corpo todo C cabe até domingo.')).toBeVisible();
  const musculos = page.getByRole('list', { name: 'Séries efetivas por músculo nesta semana' });
  await expect(musculos).toBeVisible();
  await expect(musculos.getByRole('listitem').first()).toBeVisible();
  // Os 4 estados em palavras, nunca em vermelho.
  await expect(musculos).toContainText(/na meta|crescendo|mantendo|ainda não treinou nesta semana/);
  const cores = await musculos.locator('.m-barra i').evaluateAll((els) => els.map((e) => getComputedStyle(e).backgroundColor));
  expect(cores.every((c) => c === cores[0])).toBe(true);
  // Semanas de 19/10 (3 treinos), 26/10 (nenhum) e a de hoje (2): 2 de 3, sem sequência que zera.
  await expect(page.getByRole('heading', { name: 'Últimas 3 semanas' })).toBeVisible();
  await expect(page.getByText('2 das últimas 3 semanas com treino.')).toBeVisible();
  await print(page, 'semana');
  await semToquePequeno(page);
});

test('vê a evolução de um exercício: a melhor série de cada treino, com "recorde" e "subiu a carga"', async ({ page }) => {
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-12T13:00:00.000Z', series: { 'supino-reto': [[8, 10], [8, 9]] } },
    { dia: 1, quando: '2026-10-16T13:00:00.000Z', series: { 'supino-reto': [[8, 12], [8, 10]] } },
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
  // lote 5 do redesign: a barra de baixo continua, com Semana acesa, e o voltar "Semana" no alto
  await expect(page.getByRole('navigation', { name: 'Seções' }).getByRole('link', { name: 'Semana' })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('header.top').getByRole('link', { name: 'Semana', exact: true })).toBeVisible();
  await print(page, 'evolucao');
  await semToquePequeno(page);
});

test('lote 4: o recorde do treino aparece em "O que mudou hoje" e em "O que subiu nesta semana", e leva à evolução', async ({ page }) => {
  // Semana de 02/11: supino 8 kg × 10 na segunda e 8 kg × 12 na terça (recorde).
  await comHistorico(page, [
    { dia: 0, quando: '2026-11-02T13:00:00.000Z', series: { 'supino-reto': [[8, 10], [8, 9]] } },
    // o mesmo dia A: desde a biblioteca ampliada (R5-CL), o supino não está mais no C
    { dia: 0, quando: '2026-11-03T13:00:00.000Z', series: { 'supino-reto': [[8, 12], [8, 10]] } },
  ]);
  // o fim do treino mostra a última sessão
  await page.goto('/treino/fim');
  const mudou = page.getByRole('region', { name: 'O que mudou hoje' });
  await expect(mudou).toContainText('2 de 3');
  await expect(mudou.getByRole('list', { name: 'Recordes de hoje' })).toContainText(/recorde\s*Supino reto com halteres:\s*8 kg × 12/);
  await semToquePequeno(page);

  await page.goto('/semana');
  const subiu = page.getByRole('region', { name: 'O que subiu nesta semana' });
  await expect(subiu).toContainText('Supino reto com halteres');
  await expect(subiu).toContainText('recorde');
  await semToquePequeno(page);
  await subiu.getByRole('link', { name: /Supino reto com halteres/ }).click();
  await expect(page.getByRole('heading', { name: 'Supino reto com halteres' })).toBeVisible();
  await expect(page.getByText(/Começou com 8 kg × 10/)).toBeVisible();
});

test('R5a: na fase de aprendizado da iniciante, o mesmo sinal não traz a semana leve', async ({ page }) => {
  // Semana 1 da Ana: "pesado demais" em 2 dos 3 treinos, mas é fase de aprendizado (iniciante.fase-aprendizado).
  await comHistorico(page, [
    { dia: 0, quando: '2026-11-02T13:00:00.000Z', hojeFoi: 'pesado' },
    { dia: 1, quando: '2026-11-03T13:00:00.000Z', hojeFoi: 'pesado' },
  ]);
  await expect(page.getByRole('button', { name: 'Começar o treino Corpo todo C' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Semana leve? (opcional)' })).toHaveCount(0);
  await expect(page.locator('.aviso-linha', { hasText: 'Semana leve' })).toHaveCount(0);
});

test('com o sinal, recebe a sugestão da semana leve: o toque "hoje foi" no fim do treino, sem nada marcado', async ({ page }) => {
  // A Ana é iniciante: nas semanas 1 e 2 (fase de aprendizado), nem semana leve (R5a). Por isso o histórico começa 2
  // semanas antes, e hoje é a semana 3. Os 2 treinos desta semana: um "pesado demais".
  await comHistorico(page, [
    { dia: 2, quando: '2026-10-20T13:00:00.000Z' },
    { dia: 1, quando: '2026-10-27T13:00:00.000Z' },
    { dia: 0, quando: '2026-11-02T13:00:00.000Z', hojeFoi: 'pesado' },
    { dia: 1, quando: '2026-11-03T13:00:00.000Z' },
  ]);
  await page.getByRole('button', { name: 'Começar o treino Corpo todo C' }).click();
  await page.getByLabel('Carga', { exact: true }).selectOption('10');
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await terminarTreino(page);

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
  await page.getByRole('link', { name: 'Voltar ao início' }).click();
  await expect((await sobreOPrograma(page)).getByText(/Você está na semana \d\. Semana leve: cerca de metade das séries/)).toBeVisible();
  await page.keyboard.press('Escape');
  // a semana leve ativa é o aviso do dia, em 1 linha; "Voltar ao normal" fica na folha
  await expect(page.locator('.aviso-linha')).toContainText(/^Semana leve até /);
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeInViewport({ ratio: 1 });
  await (await verAvisos(page)).getByRole('button', { name: 'Voltar ao normal' }).click();
  await expect(page.getByRole('region', { name: /^Semana leve até / })).toHaveCount(0);
  await expect(page.locator('.aviso-linha', { hasText: 'Semana leve' })).toHaveCount(0);
});
