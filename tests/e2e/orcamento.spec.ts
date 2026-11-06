import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { expect, test, type Page } from '@playwright/test';
import { ana } from './jornada';

// Lote técnico do redesign (06/11/2026): orçamento do JavaScript que a 1ª tela baixa, medido no build de produção
// (dist/). Antes do lote, qualquer tela baixava o app inteiro: 1.065 KiB, 271,5 KiB comprimidos
// (docs/revisoes/redesign/lote-1/base.json). A meta aprovada é menos de 150 kB comprimidos na 1ª tela.

/** Soma, em kB comprimidos (gzip), os .js do app que a página pede até assentar. */
async function jsDaTela(page: Page, abrir: () => Promise<unknown>) {
  const arquivos = new Set<string>();
  const ouvir = (r: { url: () => string }) => {
    const m = new URL(r.url()).pathname.match(/^\/(assets\/[^/]+\.js)$/);
    if (m) arquivos.add(m[1]!);
  };
  page.on('request', ouvir);
  await abrir();
  await page.waitForLoadState('networkidle');
  page.off('request', ouvir);
  const kB = [...arquivos].reduce((s, f) => s + gzipSync(readFileSync(`dist/${f}`)).length, 0) / 1000;
  test.info().annotations.push({ type: 'orçamento', description: `${kB.toFixed(1)} kB em ${arquivos.size} arquivos` });
  console.log(`orçamento (${test.info().title.slice(0, 30)}…): ${kB.toFixed(1)} kB comprimidos em ${arquivos.size} arquivos`);
  return { kB, arquivos: [...arquivos] };
}

test('a boas-vindas baixa menos de 150 kB de JavaScript comprimido', async ({ page }) => {
  const { kB, arquivos } = await jsDaTela(page, () => page.goto('/'));
  expect(arquivos.some((f) => /estiloBoneco|Miniatura|Guia/.test(f)), 'o motor do Boneco fica fora da boas-vindas').toBe(false);
  expect(kB, `JS da boas-vindas: ${arquivos.join(', ')}`).toBeLessThan(150);
});

test('quem volta: o programa baixa o pacote inicial e o motor das miniaturas, menos de 200 kB comprimidos', async ({ page, context }) => {
  await ana(page);
  const outra = await context.newPage();
  const { kB, arquivos } = await jsDaTela(outra, () => outra.goto('/programa'));
  await expect(outra.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  // os textos do guia e as outras telas não vêm junto
  expect(arquivos.some((f) => /\/(Guia|Treino|Inventario|Dados)-/.test('/' + f)), arquivos.join(', ')).toBe(false);
  expect(kB, `JS do programa: ${arquivos.join(', ')}`).toBeLessThan(200);
});
