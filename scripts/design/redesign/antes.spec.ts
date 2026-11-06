import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { triagemNenhuma } from '../../../tests/e2e/jornada';
import { medir, type Medida } from '../medir';

// Redesign (06/11/2026), Fase 1: o inventário do app de hoje, por script. Para cada persona fictícia (o estado vem de
// estados.mjs, gerado pelo gerador real), cada tela e estado é capturado e medido (toque, contraste, botão principal,
// alturas de tela). O cadastro é percorrido pela interface, com a Ana e as variantes da tela de equipamento.
// Saída: imagens em reports/design/redesign/antes/<projeto>/<persona>/ (fora do git) e os números em
// docs/revisoes/redesign/antes/medidas-<projeto>.json. O conjunto de referência versionado é copiado por referencia.mjs.

const AGORA = new Date('2026-11-05T15:00:00.000Z'); // quinta-feira, 12:00 em Brasília
const SAIDA = 'docs/revisoes/redesign/antes';
const PERSONAS = ['ana', 'bruno', 'carla', 'diego', 'elisa', 'fabio'] as const;
const medidas: Medida[] = [];

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(AGORA);
});
// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}, info) => {
  mkdirSync(SAIDA, { recursive: true });
  const atual = medidas.filter((m) => m.tela.startsWith(info.project.name + '/'));
  const arquivo = `${SAIDA}/medidas-${info.project.name}.json`;
  const antigas: Medida[] = existsSync(arquivo) ? JSON.parse(readFileSync(arquivo, 'utf8')) : [];
  const novas = new Set(atual.map((m) => m.tela));
  writeFileSync(arquivo, JSON.stringify([...antigas.filter((m) => !novas.has(m.tela)), ...atual], null, 1) + '\n');
});

/** Captura o que se vê sem rolar (-relance) e a página inteira, e mede a tela. */
async function foto(page: Page, persona: string, nome: string) {
  const proj = test.info().project.name;
  const dir = `reports/design/redesign/antes/${proj}/${persona}`;
  mkdirSync(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${dir}/${nome}-relance.png`, fullPage: false, animations: 'disabled' });
  await page.screenshot({ path: `${dir}/${nome}.png`, fullPage: true, animations: 'disabled' });
  medidas.push(await medir(page, `${proj}/${persona}/${nome}`));
}

/** Grava o estado da persona no aparelho (IndexedDB) e recarrega. */
async function comEstado(page: Page, persona: string) {
  const estado = JSON.parse(readFileSync(`reports/design/redesign/estados/${persona}.json`, 'utf8'));
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Entendi, vamos começar' })).toBeVisible();
  await page.evaluate(async (e) => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onupgradeneeded = () => r.result.createObjectStore('keyval');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    await new Promise<void>((ok, erro) => {
      const r = db.transaction('keyval', 'readwrite').objectStore('keyval').put(e, 'estado');
      r.onsuccess = () => ok();
      r.onerror = () => erro(r.error);
    });
  }, estado);
}

const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });

test('cadastro (Ana) e as variantes da tela de equipamento', async ({ page }) => {
  const P = 'cadastro';
  await page.goto('/');
  await foto(page, P, '01-boas-vindas');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await expect(page.getByRole('heading', { name: 'Antes de começar, 9 perguntas rápidas' })).toBeVisible();
  await foto(page, P, '02-triagem');
  await page.getByRole('button', { name: 'Sim, alguma vale' }).click();
  await foto(page, P, '02b-triagem-uma-a-uma');
  await page.goBack();
  await page.goto('/comecar/triagem');
  await triagemNenhuma(page);
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  await foto(page, P, '03-nivel-vazio');
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await grupo(page, /confiança na técnica/).getByLabel(/^Sim/).check();
  await foto(page, P, '03b-nivel-respondido');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  await foto(page, P, '04-rotina-vazia');
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await grupo(page, /Quantos minutos/).getByLabel('45 min', { exact: true }).check();
  await page.getByLabel('Pernas', { exact: true }).check();
  await page.getByLabel('Glúteos', { exact: true }).check();
  await foto(page, P, '04b-rotina-respondida');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await foto(page, P, '05-equipamento-vazio');
  await page.getByRole('button', { name: /^(✓ )?Academia completa$/ }).click();
  await foto(page, P, '05b-equipamento-academia-completa');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await page.getByRole('button', { name: /^(✓ )?Corpo livre$/ }).click();
  await foto(page, P, '05c-equipamento-corpo-livre');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await page.getByLabel('Halteres fixos', { exact: true }).check();
  await grupo(page, 'O mais leve').getByLabel('1 kg', { exact: true }).check();
  await grupo(page, 'O mais pesado').getByLabel('12 kg', { exact: true }).check();
  await grupo(page, 'De quanto em quanto').getByLabel('1 kg', { exact: true }).check();
  await page.getByLabel('Banco reto', { exact: true }).check();
  await foto(page, P, '05d-equipamento-lista-ana');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  await foto(page, P, '06-confirmar');
  await page.locator('details.evitar > summary').click();
  await foto(page, P, '06b-confirmar-evitar-aberto');
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await foto(page, P, '07-programa-recem-gerado');
});

/** Salva a série atual: carga se ainda não houver, RIR 2, "Série feita". */
async function salvarSerie(page: Page) {
  const registro = page.getByRole('region', { name: /^Série \d/ });
  const carga = page.getByLabel('Carga', { exact: true });
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT')) && !(await carga.inputValue())) await carga.selectOption({ index: 6 });
  if ((await page.getByRole('button', { name: 'Mais carga' }).count()) && (await page.locator('#carga-kg').innerText()) === '—') await page.getByRole('button', { name: 'Mais carga' }).click();
  const rir = registro.getByRole('radio', { name: '2', exact: true });
  if (!(await rir.isChecked())) await rir.check();
  await registro.getByRole('button', { name: /^Série feita/ }).click();
}

for (const persona of PERSONAS) {
  test(`telas de uso: ${persona}`, async ({ page }) => {
    await comEstado(page, persona);
    await page.goto('/programa');
    await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
    await foto(page, persona, '10-programa');
    const abas = page.getByRole('tab');
    if ((await abas.count()) > 1) {
      await abas.nth(1).click();
      await foto(page, persona, '10b-programa-dia-2');
      await abas.nth(0).click();
    }
    const nomeDia = (await abas.nth(0).innerText()).trim();
    await page.getByRole('button', { name: `Começar o treino ${nomeDia}` }).click();
    await expect(page).toHaveURL(/\/treino$/);
    await foto(page, persona, '11-treino-serie-1');
    const guia = page.getByRole('link', { name: 'Ver como fazer' });
    if (await guia.count()) {
      await guia.click();
      await expect(page).toHaveURL(/\/guia\//);
      await foto(page, persona, '16-guia-tecnica');
      await page.getByRole('button', { name: 'Músculos' }).click();
      await foto(page, persona, '16b-guia-musculos');
      await page.getByRole('button', { name: 'Erros' }).click();
      await foto(page, persona, '16c-guia-erros');
      await page.goBack();
      await expect(page).toHaveURL(/\/treino$/);
    } else {
      const cartao = page.locator('details.cartao-texto > summary');
      if (await cartao.count()) {
        await cartao.click();
        await foto(page, persona, '16d-cartao-texto-aberto');
        await cartao.click();
      }
    }
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await foto(page, persona, '14-treino-senti-algo');
    await page.getByRole('button', { name: 'Senti algo' }).click();
    const trocar = page.getByRole('button', { name: 'Trocar exercício' });
    if (await trocar.count()) {
      await trocar.click();
      await foto(page, persona, '15-treino-trocar');
      await trocar.click();
    }
    await salvarSerie(page);
    await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
    await foto(page, persona, '12-treino-descanso');
    await page.getByRole('button', { name: 'Pular' }).click();
    await foto(page, persona, '13-treino-serie-2');
    // termina a sessão inteira para chegar ao fim do treino
    const registro = page.getByRole('region', { name: /^Série \d/ });
    for (let n = 0; n < 60 && (await registro.isVisible()); n++) {
      await salvarSerie(page);
      const pular = page.getByRole('button', { name: 'Pular' });
      if (await pular.isVisible()) await pular.click();
    }
    const terminar = page.getByRole('button', { name: 'Terminar treino' });
    if (await terminar.isVisible()) await terminar.click();
    await expect(page).toHaveURL(/\/treino\/fim$/, { timeout: 15_000 });
    await foto(page, persona, '17-fim-do-treino');
    await page.goto('/semana');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await foto(page, persona, '18-semana');
    const evolucao = page.locator('.lista-evolucao a').first();
    if (await evolucao.count()) {
      await evolucao.click();
      await expect(page).toHaveURL(/\/evolucao\//);
      await foto(page, persona, '19-evolucao');
    }
    await page.goto('/dados');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await foto(page, persona, '20-meus-dados');
    if (persona === 'bruno') {
      await page.goto('/locais');
      await expect(page.getByRole('heading', { name: 'Meus locais' })).toBeVisible();
      await foto(page, persona, '21-locais');
      await page.goto('/locais/local-2');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await foto(page, persona, '22-editar-local');
    }
  });
}

test('treino: exercício sem animação (Ana, 2º exercício, a ponte de glúteo)', async ({ page }) => {
  await comEstado(page, 'ana');
  await page.goto('/programa');
  const nomeDia = (await page.getByRole('tab').nth(0).innerText()).trim();
  await page.getByRole('button', { name: `Começar o treino ${nomeDia}` }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await page.getByRole('button', { name: 'Próximo' }).click();
  await expect(page.getByRole('heading', { name: /Ponte de glúteo/ })).toBeVisible();
  await foto(page, 'ana', '16e-treino-cartao-fechado');
  await page.locator('details.cartao-texto > summary').click();
  await foto(page, 'ana', '16f-treino-cartao-aberto');
});
