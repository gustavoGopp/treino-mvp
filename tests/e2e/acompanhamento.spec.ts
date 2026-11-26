import { expect, test, type Page } from './base';
import { ana, entenda, folhaPronta, porQueDaSugestao, sobreOPrograma, terminarTreino, verAvisos } from './jornada';
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
      // espera a transação fechar, não só o pedido: navegar antes disso podia perder a gravação (falha vista no GitHub em 22/11/2026)
      r.transaction!.oncomplete = () => ok();
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
  // 9 de 17 desde o pacote 2, de 15/11/2026 (o goblet no lugar do búlgaro na vaga de agachar; o A com 17 séries);
  // 9 de 15 desde o R5d até o pacote 2 (o abdominal saiu do A: com foco, os isoladores de quem não é foco entram depois);
  // 9 de 16 desde a sessão de qualidade dos treinos (o abdominal protegido no A; o búlgaro com 2 séries); 9 de 15 antes;
  // 8 de 13 até a auditoria do treino (a ponte com halter); 9 de 14 até a sessão de equipamento mínimo (a flexão deslizante).
  await expect(volta).toContainText(/Séries no Corpo todo A\s*9 de 17/);
  await expect(volta).toContainText('3 a 4 repetições');
  // no dia da volta, ela é a única mensagem, e o "Começar" fica à vista sem rolar
  await expect(page.locator('.aviso-linha')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Começar o treino Corpo todo A' })).toBeInViewport({ ratio: 1 });
  await print(page, 'volta');
  await semToquePequeno(page);
  // sessão de textos (16/11/2026): a explicação da volta saiu do cartão e está em "Entenda o treino"
  await expect(volta.getByRole('button', { name: 'por quê?' })).toHaveCount(0);
  const porque = await entenda(page, 'A sua semana e as pausas');
  await expect(porque).toContainText('Faz 22 dias do último treino. Estas 2 semanas vão mais leves, para o corpo se readaptar sem dor. O músculo não some em 3 semanas.');
  await expect(porque).toContainText('A carga começa 10% abaixo da última vez e já vem preenchida.');
  await expect((await sobreOPrograma(page)).getByText(/Semana 1\. Cerca de metade das séries, RIR 3–4 e carga 10% abaixo da última vez/)).toBeVisible();
  await page.goto('/programa');

  await page.getByRole('button', { name: 'Começar o treino Corpo todo A' }).click();
  await expect(page.getByRole('heading', { name: 'Agachamento goblet com calcanhar elevado' })).toBeVisible();
  // lote 2 do redesign: a meta curta; a reserva-alvo marcada nos botões do RIR; o motivo no "por quê?"
  // 2 séries: o 1º exercício do programa tem 4, e a semana 1 da volta tem cerca de metade. Desde o pacote 2 (15/11/2026)
  // é o goblet (dois lados, 8–15, sem "cada lado"); do R5d até lá, o búlgaro ("2 × 8–12 cada lado"). 1 série da sessão de
  // qualidade dos treinos até o R5d (o abdominal protegido tirava 2; qualidade-treinos.md, F.5).
  await expect(page.locator('p.meta').first()).toHaveText('2 séries de 8 a 15');
  await expect(page.locator('.rir-meta')).toContainText('meta de hoje: 3 ou 4');
  await expect(page.getByText('Hoje: 9 kg')).toBeVisible();
  const motivo = await porQueDaSugestao(page, 'Agachamento goblet com calcanhar elevado');
  await expect(motivo).toContainText(/Última vez: 10 kg\. Volta da pausa: 10% mais leve/);
  await page.goto('/treino');
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
  await expect(page.getByText('02/11 a 08/11', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: /2 de 3 treinos/ })).toBeVisible();
  // sessão de textos (16/11/2026): a frase da semana saiu da tela e fica em "Entenda o treino"
  await expect(page.getByText(/Se der, o Corpo todo C/)).toHaveCount(0);
  // lote M5 (22/11/2026): a tabela de músculos foi para uma gaveta; a tela abre pelos treinos e pelas semanas
  const musculos = page.getByRole('list', { name: 'Séries efetivas por músculo nesta semana' });
  await expect(musculos).toBeHidden();
  await page.locator('summary', { hasText: 'Séries por músculo nesta semana' }).click();
  await expect(musculos).toBeVisible();
  await expect(musculos.getByRole('listitem').first()).toBeVisible();
  // Os 4 estados em palavras, nunca em vermelho.
  await expect(musculos).toContainText(/na meta|dá para crescer|dá para manter/);
  const cores = await musculos.locator('.m-barra i').evaluateAll((els) => els.map((e) => getComputedStyle(e).backgroundColor));
  expect(cores.every((c) => c === cores[0])).toBe(true);
  // Semanas de 19/10 (3 treinos), 26/10 (nenhum) e a de hoje (2): 2 de 3, sem sequência que zera.
  // lote M5: a contagem em palavras é o título da faixa, à vista (antes, só no nome acessível dos quadradinhos)
  await expect(page.getByRole('heading', { name: '2 de 3 semanas com treino' })).toBeVisible();
  await expect(page.getByRole('img', { name: '2 de 3 semanas com treino' })).toBeVisible();
  await print(page, 'semana');
  await semToquePequeno(page);
  // o que saiu da tela está em "Entenda o treino": a frase da semana e como ler o quadro
  const pausas = await entenda(page, 'A sua semana e as pausas');
  await expect(pausas).toContainText('Se der, o Corpo todo C cabe até domingo.');
  await expect(pausas).toContainText('A barra é o que foi feito; o traço tracejado é a meta.');
  await expect(pausas).toContainText('conta os treinos de qualquer local');
});

test('vê a evolução de um exercício: a melhor série de cada treino, com "recorde" e "subiu a carga"', async ({ page }) => {
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-12T13:00:00.000Z', series: { 'supino-reto': [[8, 10], [8, 9]] } },
    { dia: 1, quando: '2026-10-16T13:00:00.000Z', series: { 'supino-reto': [[8, 12], [8, 10]] } },
    { dia: 0, quando: '2026-10-19T13:00:00.000Z', series: { 'supino-reto': [[9, 8], [9, 8]] } },
  ]);
  await page.getByRole('link', { name: /A sua semana/ }).click();
  await page.locator('summary', { hasText: /^Evolução \(\d+\)$/ }).click();
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

// Pedido do Gustavo (26/11/2026; registro.treino-feito): uma série de um treino antigo se corrige pela evolução.
test('uma série de um treino antigo se corrige pela evolução do exercício', async ({ page }) => {
  await comHistorico(page, [
    { dia: 0, quando: '2026-10-12T13:00:00.000Z', series: { 'supino-reto': [[8, 10], [8, 9]] } },
    { dia: 1, quando: '2026-10-16T13:00:00.000Z', series: { 'supino-reto': [[8, 12], [8, 10]] } },
  ]);
  await page.goto('/evolucao/supino-reto');
  const pontos = page.locator('.pontos-evolucao li');
  await expect(pontos.nth(0)).toContainText('8 kg × 10');
  await pontos.nth(0).getByRole('button', { name: /^Ver e corrigir as séries de/ }).click();
  const treino = page.getByRole('dialog', { name: /^Treino de/ });
  await folhaPronta(page);
  await expect(treino.getByRole('button', { name: /^Corrigir a/ })).toHaveCount(2);
  await treino.getByRole('button', { name: 'Corrigir a 2ª série' }).click();
  const folha = page.getByRole('dialog', { name: 'Corrigir a 2ª série' });
  await folhaPronta(page);
  await folha.getByLabel('Repetições').fill('14');
  await folha.getByRole('button', { name: 'Guardar a correção' }).click();
  await expect(folha).toHaveCount(0);
  // a melhor série daquele treino passa a ser a corrigida, e o recorde do treino seguinte deixa de ser recorde
  await expect(pontos.nth(0)).toContainText('8 kg × 14');
  await expect(pontos.nth(1)).not.toContainText('recorde');
  await semToquePequeno(page);
});

test('lote 4: o recorde do treino aparece em "O que mudou hoje" e em "Subiu nesta semana", e leva à evolução', async ({ page }) => {
  // Semana de 02/11: supino 8 kg × 10 na segunda e 8 kg × 12 na terça (recorde).
  await comHistorico(page, [
    { dia: 0, quando: '2026-11-02T13:00:00.000Z', series: { 'supino-reto': [[8, 10], [8, 9]] } },
    // o mesmo dia A: desde a biblioteca ampliada (R5-CL), o supino não está mais no C
    { dia: 0, quando: '2026-11-03T13:00:00.000Z', series: { 'supino-reto': [[8, 12], [8, 10]] } },
  ]);
  // o fim do treino mostra a última sessão
  await page.goto('/treino/fim');
  const mudou = page.getByRole('region', { name: 'O que mudou hoje' });
  // lote M5: o treino na semana e o que melhorou, em palavras
  await expect(mudou.getByRole('link', { name: '2º treino da semana. Falta 1.' })).toBeVisible();
  await expect(mudou).toContainText('Você bateu 1 recorde.');
  await expect(mudou.getByRole('list', { name: 'Recordes de hoje' })).toContainText(/recorde\s*Supino reto com halteres:\s*8 kg × 12/);
  await semToquePequeno(page);

  await page.goto('/semana');
  const subiu = page.getByRole('region', { name: 'Subiu nesta semana' });
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
  await expect(page.getByRole('region', { name: 'Semana leve?' })).toHaveCount(0);
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
  const hojeFoi = page.getByRole('group', { name: 'Hoje foi' });
  for (const b of ['leve', 'normal', 'pesado demais']) await expect(hojeFoi.getByRole('button', { name: b, exact: true })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByRole('region', { name: 'Semana leve?' })).toHaveCount(0);
  await hojeFoi.getByRole('button', { name: 'pesado demais' }).click();
  await expect(hojeFoi.getByRole('button', { name: 'pesado demais' })).toHaveAttribute('aria-pressed', 'true');

  const leve = page.getByRole('region', { name: 'Semana leve?' });
  await expect(leve).toContainText('Metade das séries por 7 dias, mesma carga.');
  // o motivo e a explicação ficam em "Entenda o treino"
  const pausas = await entenda(page, 'A sua semana e as pausas');
  await expect(pausas).toContainText('Motivo: "pesado demais" em 2 dos últimos 3 treinos.');
  await expect(pausas).toContainText('Para descansar, não para crescer.');
  await page.goto('/treino/fim');
  await print(page, 'semana-leve');
  await semToquePequeno(page);
  await leve.getByRole('button', { name: 'Fazer', exact: true }).click();
  await expect(page.getByRole('region', { name: /^Semana leve até / })).toBeVisible();

  // No Seu treino, a semana leve já vale: metade das séries e RIR 3–4.
  await page.getByRole('link', { name: 'Voltar ao início' }).click();
  await expect((await sobreOPrograma(page)).getByText(/Semana \d\. Semana leve: cerca de metade das séries/)).toBeVisible();
  await page.goto('/programa');
  // a semana leve ativa é o aviso do dia, em 1 linha; "Voltar ao normal" fica na folha
  await expect(page.locator('.aviso-linha')).toContainText(/^Semana leve até /);
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeInViewport({ ratio: 1 });
  await (await verAvisos(page)).getByRole('button', { name: 'Voltar ao normal' }).click();
  await expect(page.getByRole('region', { name: /^Semana leve até / })).toHaveCount(0);
  await expect(page.locator('.aviso-linha', { hasText: 'Semana leve' })).toHaveCount(0);
});

// Lote M5 da análise crítica (22/11/2026): um motivo para voltar.
test('M5: quem volta depois de 9 dias é recebido; com 3 dias, que é o intervalo de sempre, não', async ({ page }) => {
  const antes = [
    { dia: 0, quando: '2026-10-05T13:00:00.000Z' },
    { dia: 1, quando: '2026-10-13T13:00:00.000Z' },
    { dia: 2, quando: '2026-10-20T13:00:00.000Z' },
  ];
  // o último treino terminou em 27/10; hoje, 05/11: 9 dias
  await comHistorico(page, [...antes, { dia: 0, quando: '2026-10-27T13:00:00.000Z' }]);
  const recepcao = page.getByText('Bom te ver de novo. Faz 9 dias do último treino, e a carga é a mesma.');
  await expect(recepcao).toBeVisible();
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeInViewport({ ratio: 1 });
  await semToquePequeno(page);
  // o último treino em 02/11: 3 dias
  await comHistorico(page, [...antes, { dia: 0, quando: '2026-10-27T13:00:00.000Z' }, { dia: 1, quando: '2026-11-02T13:00:00.000Z' }]);
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeVisible();
  await expect(page.getByText(/Bom te ver de novo/)).toHaveCount(0);
});

const SEMANA_DO_CARTAO = [
  { dia: 0, quando: '2026-10-27T13:00:00.000Z' },
  { dia: 0, quando: '2026-11-02T13:00:00.000Z' },
  { dia: 1, quando: '2026-11-03T13:00:00.000Z' },
];

test('M5: o cartão da semana sai pelo compartilhar do celular, só com a frequência', async ({ page }) => {
  await comHistorico(page, SEMANA_DO_CARTAO);
  await page.goto('/treino/fim');
  await page.evaluate(() => {
    const w = window as unknown as { __mandado: unknown };
    navigator.canShare = (d?: ShareData) => !!d?.files?.length;
    navigator.share = async (d?: ShareData) => {
      const f = d!.files![0]!;
      w.__mandado = { nome: f.name, tipo: f.type, bytes: f.size, texto: d!.text, chaves: Object.keys(d!).sort() };
    };
  });
  await page.getByRole('button', { name: 'Mandar a minha semana' }).click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { __mandado?: { nome: string } }).__mandado?.nome)).toBe('minha-semana-de-treino.png');
  const mandado = await page.evaluate(() => (window as unknown as { __mandado: { tipo: string; bytes: number; texto: string; chaves: string[] } }).__mandado);
  expect(mandado.tipo).toBe('image/png');
  expect(mandado.bytes).toBeGreaterThan(2000);
  // só a imagem e a frase da frequência: nada de carga, de exercício ou de endereço
  expect(mandado.chaves).toEqual(['files', 'text']);
  expect(mandado.texto).toBe('2 de 3 treinos nesta semana. 2ª semana seguida.');
  await semToquePequeno(page);
});

test('M5: sem compartilhar no aparelho, o cartão é salvo como imagem; e o próximo treino vira um compromisso da agenda', async ({ page }) => {
  await comHistorico(page, SEMANA_DO_CARTAO);
  await page.goto('/treino/fim');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'canShare', { configurable: true, value: undefined });
  });
  const [imagem] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Mandar a minha semana' }).click()]);
  expect(imagem.suggestedFilename()).toBe('minha-semana-de-treino.png');
  await expect(page.getByRole('status').filter({ hasText: 'Imagem salva. Mande para quem você quiser.' })).toBeVisible();
  if (process.env.PRINTS) await imagem.saveAs('reports/m5-cartao.png');

  // "Quando é o próximo?": o treino de hoje começou às 10:00 (Brasília) de 03/11; com 3 treinos por semana, a sugestão é 06/11 às 10:00
  const quando = page.getByRole('region', { name: 'Quando é o próximo?' });
  await expect(quando.getByLabel('Dia e hora do próximo treino')).toHaveValue('2026-11-06T10:00');
  const [agenda] = await Promise.all([page.waitForEvent('download'), quando.getByRole('button', { name: 'Pôr na agenda' }).click()]);
  expect(agenda.suggestedFilename()).toBe('proximo-treino.ics');
  const texto = (await (await import('node:fs/promises')).readFile(await agenda.path(), 'utf8')).split('\r\n');
  expect(texto).toContain('DTSTART:20261106T100000');
  expect(texto).toContain('SUMMARY:Treino: Corpo todo C');
  expect(texto).toContain('TRIGGER:-PT30M');
  // o compromisso leva só o nome do treino
  expect(texto.join('\n')).not.toMatch(/kg|séries|dor/i);
  // a pessoa escolhe outro dia e outra hora
  await quando.getByLabel('Dia e hora do próximo treino').fill('2026-11-07T18:30');
  const [outra] = await Promise.all([page.waitForEvent('download'), quando.getByRole('button', { name: 'Pôr na agenda' }).click()]);
  expect(await (await import('node:fs/promises')).readFile(await outra.path(), 'utf8')).toContain('DTSTART:20261107T183000');
  await semToquePequeno(page);
});
