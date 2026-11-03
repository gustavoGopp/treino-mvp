import { mkdirSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { ana, triagemNenhuma } from '../../tests/e2e/jornada';
import { medir, type Medida } from './medir';

// Revisão de design (03/11/2026), parte A: cada tela do app no celular, com a persona fictícia Ana (iniciante,
// halteres de 1 a 12 kg e banco reto) e uma variação dela com elásticos (para os exercícios sem guia).
// Cada captura também passa pelas medições de medir.ts. Saída: as imagens em reports/design/telas/<projeto>/ (fora do
// git: são muitas e pesadas; as escolhidas para o relatório vão para docs/img/) e os números em docs/revisoes/design/medidas-<projeto>.json.
// Uso: npx playwright test -c scripts/design capturas

const AGORA = new Date('2026-11-05T15:00:00.000Z'); // quinta-feira, 12:00 em Brasília
const SAIDA = 'docs/revisoes/design';
const medidas: Medida[] = [];

test.use({ deviceScaleFactor: 1.5 });
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(AGORA);
  // fontes do Google bloqueadas: a captura não depende da rede (o app cai nas fontes do sistema, como offline)
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
});
// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}, info) => {
  mkdirSync(SAIDA, { recursive: true });
  const atual = medidas.filter((m) => m.tela.startsWith(info.project.name + '/'));
  writeFileSync(`${SAIDA}/medidas-${info.project.name}.json`, JSON.stringify(atual, null, 1) + '\n');
});

async function foto(page: Page, nome: string, inteira = true) {
  const proj = test.info().project.name;
  const dir = `reports/design/telas/${proj}`;
  mkdirSync(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  // o que se vê sem rolar (leitura de relance) e a página inteira
  await page.screenshot({ path: `${dir}/${nome}.png`, fullPage: inteira, animations: 'disabled' });
  medidas.push(await medir(page, `${proj}/${nome}`));
}

const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });

test('cadastro', async ({ page }) => {
  await page.goto('/');
  await foto(page, '01-boas-vindas');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
  await foto(page, '02-triagem-relance', false);
  await foto(page, '02-triagem');
  await triagemNenhuma(page);
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  await foto(page, '03-nivel-vazio');
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await grupo(page, /confiança na técnica/).getByLabel(/^Sim/).check();
  await foto(page, '03-nivel');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  await foto(page, '04-rotina');
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await grupo(page, /Quantos minutos/).getByLabel('45 min', { exact: true }).check();
  await page.getByLabel('Pernas', { exact: true }).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await foto(page, '05-equipamento-relance', false);
  await foto(page, '05-equipamento');
  await page.getByLabel('Halteres fixos', { exact: true }).check();
  await foto(page, '05-equipamento-halteres');
  await grupo(page, 'O mais leve').getByLabel('1 kg', { exact: true }).check();
  await grupo(page, 'O mais pesado').getByLabel('12 kg', { exact: true }).check();
  await grupo(page, 'De quanto em quanto').getByLabel('1 kg', { exact: true }).check();
  await page.getByLabel('Banco reto', { exact: true }).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  await foto(page, '06-restricoes');
});

test('programa, treino e acompanhamento', async ({ page }) => {
  await ana(page);
  await foto(page, '07-programa-relance', false);
  await foto(page, '07-programa');
  const cartao = page.getByText('Como fazer (em texto)').locator('visible=true').first();
  if (await cartao.count()) {
    await cartao.click();
    await cartao.scrollIntoViewIfNeeded();
    await foto(page, '08-cartao-de-texto', false);
  }

  await page.goto('/guia/afundo');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  for (const [modo, nome] of [
    ['Técnica', 'tec'],
    ['Músculos', 'mus'],
    ['Trajetória', 'traj'],
    ['Erros', 'err'],
  ] as const) {
    const b = grupo(page, 'Informação').getByRole('button', { name: new RegExp(modo, 'i') });
    if (await b.count()) await b.click();
    await page.getByRole('button', { name: 'Pausar' }).click({ timeout: 2000 }).catch(() => {});
    await foto(page, `09-guia-afundo-${nome}`, nome === 'tec');
    await page.getByRole('button', { name: 'Reproduzir' }).click({ timeout: 2000 }).catch(() => {});
  }

  await page.goto('/programa');
  await page.getByRole('button', { name: /^Começar o treino/ }).first().click();
  await expect(page).toHaveURL(/\/treino$/);
  await foto(page, '10-treino-relance', false);
  await foto(page, '10-treino');
  const carga = page.getByLabel('Carga', { exact: true });
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT'))) await carga.selectOption({ index: 6 });
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('region', { name: /^Série \d/ }).getByRole('radio', { name: '2', exact: true }).check();
  await foto(page, '10-treino-pronto-para-salvar', false);
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await foto(page, '11-descanso', false);
  await page.getByRole('button', { name: 'Pular' }).click();
  // o guia aberto a partir do treino ("Ver como fazer"), como a pessoa o vê na academia
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Pausar' }).click({ timeout: 2000 }).catch(() => {});
  await foto(page, '11b-guia-a-partir-do-treino-relance', false);
  await foto(page, '11b-guia-a-partir-do-treino');
  await page.goBack();
  // o exercício sem animação (ponte de glúteo com halter, cartão de texto), no treino
  for (let k = 0; k < 6; k++) {
    if (await page.getByText('Como fazer (em texto)').locator('visible=true').count()) break;
    await page.getByRole('button', { name: 'Próximo ›' }).click();
  }
  await foto(page, '11c-treino-sem-animacao-relance', false);
  await page.getByText('Como fazer (em texto)').locator('visible=true').first().click();
  await foto(page, '11c-treino-cartao-de-texto');
  await page.getByRole('button', { name: 'Senti algo' }).first().click();
  await foto(page, '12-senti-algo', false);
  await page.keyboard.press('Escape');
  await page.goto('/treino');
  await page.getByRole('button', { name: 'Terminar treino' }).first().click();
  await page.getByRole('button', { name: /Terminar|Sim/ }).first().click({ timeout: 2000 }).catch(() => {});
  await page.waitForTimeout(500);
  await foto(page, '13-fim-do-treino');

  await page.goto('/semana');
  await foto(page, '14-semana');
  await page.goto('/evolucao/bulgaro');
  await foto(page, '15-evolucao');
  await page.goto('/dados');
  await foto(page, '16-meus-dados');
  await page.goto('/locais');
  await foto(page, '17-locais');
});

test('exercícios sem guia (elásticos)', async ({ page }) => {
  await ana(page, { equipamentoExtra: async (p) => {
    await p.getByLabel('Elásticos', { exact: true }).check();
    await p.getByRole('group', { name: /Quantos elásticos/ }).getByLabel('3', { exact: true }).check();
  } });
  const breve = page.getByText(/Sem guia ainda|guia em texto/).locator('visible=true').first();
  if (await breve.count()) await breve.scrollIntoViewIfNeeded();
  await foto(page, '18-programa-com-elasticos-relance', false);
  await foto(page, '18-programa-com-elasticos');
});
