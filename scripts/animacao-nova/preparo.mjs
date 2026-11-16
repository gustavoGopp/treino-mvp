// O que o guia precisaria calcular ao abrir um exercício e não muda de uma vez para a outra: o quadro de cada vista
// e a vista da miniatura (src/engine/novo/dados/enquadramentos.gerado.json) e as calibrações demoradas do corpo no
// aparelho (src/engine/novo/dados/calibragens.gerado.json). Calcular na hora atrasava o primeiro desenho em segundos.
// Uso: node scripts/animacao-nova/preparo.mjs            (calcula tudo e grava as duas tabelas)
//      node scripts/animacao-nova/preparo.mjs conferir   (calcula tudo e falha se alguma tabela estiver diferente)
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovoTexto } from './empacotar.mjs';

const conferir = process.argv[2] === 'conferir';
const ENQ = 'src/engine/novo/dados/enquadramentos.gerado.json';
const CAL = 'src/engine/novo/dados/calibragens.gerado.json';
// As contas são feitas no navegador (o Chromium dos testes), e não no Node: as funções de matemática dos dois dão
// resultados que diferem na última casa, e o que fica guardado tem de ser o que o app calcularia.
const pacote = await motorNovoTexto(
  `export * from './src/engine/novo/app.ts'; export * from './src/engine/novo/ponte.ts'; export * from './src/engine/novo/calibragens.ts'; export { usarEnquadramentosGuardados } from './src/engine/novo/cena.ts';`,
);
const caminho = '/opt/pw-browsers/chromium';
const navegador = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pagina = await navegador.newPage();
await pagina.setContent('<!doctype html><title>preparo</title>');
await pagina.addScriptTag({ content: pacote });
// as tabelas ficam de fora: tudo é calculado de novo
const ids = await pagina.evaluate(() => {
  const m = globalThis.MOTOR;
  m.usarCalibragensGuardadas(false);
  m.usarEnquadramentosGuardados(false);
  return Object.keys(m.EXERCICIOS).sort();
});
const enquadramentos = {};
// um exercício por vez, para a página não ficar presa numa chamada só
for (const id of ids)
  enquadramentos[id] = await pagina.evaluate((id) => {
    const m = globalThis.MOTOR;
    const ex = m.EXERCICIOS[id];
    const e = m.enquadramentoCalculado(ex);
    // as poses dos erros também calibram o corpo: passa por todas
    for (const erro of ex.ficha.erros) for (const u of [0, 0.5, 1]) ex.quadro(m.CORPOS.homem, u, erro.id);
    return e;
  }, id);
const calibragens = Object.fromEntries((await pagina.evaluate(() => [...globalThis.MOTOR.calibragensCalculadas().entries()])).sort(([a], [b]) => (a < b ? -1 : 1)));
await navegador.close();
const texto = (o) => JSON.stringify(o, null, 1) + '\n';
// um número que não é número (NaN, infinito) vira `null` no arquivo e mudaria o desenho sem aviso
for (const [nome, o] of [
  ['enquadramentos', enquadramentos],
  ['calibragens', calibragens],
])
  if (/\bnull\b/.test(JSON.stringify(o))) throw new Error(`${nome}: há um valor que não é número; a tabela não pode guardá-lo`);
let ruim = 0;
for (const [arq, novo] of [
  [ENQ, texto(enquadramentos)],
  [CAL, texto(calibragens)],
]) {
  const velho = existsSync(arq) ? readFileSync(arq, 'utf8') : '';
  if (conferir) {
    if (velho !== novo) {
      ruim++;
      console.error(`${arq} está diferente do que o motor calcula: rode node scripts/animacao-nova/preparo.mjs`);
    }
  } else writeFileSync(arq, novo);
}
console.log(`${ids.length} exercícios, ${Object.keys(calibragens).length} calibrações${conferir ? (ruim ? '' : ': as tabelas conferem') : ': tabelas gravadas'}`);
process.exit(ruim ? 1 : 0);
