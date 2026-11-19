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

// Orçamento: era 150 kB (boas-vindas) e 200 kB (programa) no lote técnico do redesign (06/11/2026). Na junção com a
// main (08/11/2026), o R5-CL (32 exercícios e as regras deles, +8 kB só no regras.json) e o R5c (tela de erro, avisos,
// termos) somaram cerca de 20 kB ao pacote inicial; o desempenho medido segue de 90 a 100 (revisoes/redesign/medidas.md).
// Os limites passaram a 175 e 220 kB; voltar abaixo de 150 está no backlog (separar os textos das regras do pacote).
test('a boas-vindas baixa menos de 175 kB de JavaScript comprimido', async ({ page }) => {
  const { kB, arquivos } = await jsDaTela(page, () => page.goto('/'));
  expect(arquivos.some((f) => /trabalhoBoneco|boneco\.worker|ponte|Guia/.test(f)), 'o motor do Boneco fica fora da boas-vindas').toBe(false);
  expect(kB, `JS da boas-vindas: ${arquivos.join(', ')}`).toBeLessThan(175);
});

// 16/11/2026, com o motor novo como único motor do app: o limite do programa passou de 220 para 285 kB. O motor novo
// (um corpo em três dimensões, com as tabelas de medidas) pesa mais que o de antes, e cada miniatura traz o arquivo do
// seu exercício: medido, 275 kB em 36 arquivos (o pacote inicial, 157; o motor, cerca de 70; os exercícios do dia e o
// que vem calculado para eles, cerca de 48). O número de antes (209 kB, com o motor de antes) é o que vale de
// comparação; enquanto os dois motores conviveram, este teste contava só 2 arquivos, porque o Worker demorava a começar
// e o teste parava de contar antes de o motor novo baixar. Baixar de novo está no backlog ("Da animação nova", Peso).
// 19/11/2026: o limite passou de 285 para 290 kB, por decisão do Gustavo ("pode subir o limite para 290 kB ou até mais
// se precisar"). O pintor por pares (src/engine/novo/pintor-por-pares.ts, cerca de 8 kB comprimidos) é baixado à parte,
// só quando o dia tem uma animação em que ele está ligado (src/engine/novo/pintor-ligado.ts), e com ele o programa
// passaria do limite de antes (docs/revisoes/animacao-nova/estudo-do-pintor.md, "Etapa 1" e "Etapa 2").
test('quem volta: o programa baixa o pacote inicial e o motor das miniaturas, menos de 290 kB comprimidos', async ({ page, context }) => {
  await ana(page);
  const outra = await context.newPage();
  const { kB, arquivos } = await jsDaTela(outra, () => outra.goto('/programa'));
  await expect(outra.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  // os textos do guia e as outras telas não vêm junto
  expect(arquivos.some((f) => /\/(Guia|Treino|Inventario|Dados)-/.test('/' + f)), arquivos.join(', ')).toBe(false);
  expect(kB, `JS do programa: ${arquivos.join(', ')}`).toBeLessThan(290);
});
