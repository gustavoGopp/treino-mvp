// Empacota o motor novo (src/engine/novo) num módulo importável pelos scripts de folha, protótipo e conferência.
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
let n = 0;
/** Troca o desenho do Boneco pelo aprovado, sem as correções anatômicas (só para comparar lado a lado). */
const COMO_APROVADO = {
  name: 'boneco-aprovado',
  setup(b) {
    b.onLoad({ filter: /src\/engine\/novo\/dados\/boneco\.json$/ }, () => ({ contents: readFileSync('scripts/animacao-nova/dados/boneco-aprovado.json', 'utf8'), loader: 'json' }));
  },
};
export async function motorNovo(entrada = `export * from './src/engine/novo/index.ts';`, { aprovado = false } = {}) {
  const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false, loader: { '.json': 'json' }, plugins: aprovado ? [COMO_APROVADO] : [] });
  // grava num arquivo temporário (um erro do motor aparece com nome e linha, e não com o pacote inteiro)
  mkdirSync('node_modules/.tmp', { recursive: true });
  const arq = `node_modules/.tmp/motor-novo-${process.pid}-${n++}.mjs`;
  writeFileSync(arq, outputFiles[0].text);
  return { modulo: await import(pathToFileURL(arq).href), bytes: outputFiles[0].text.length };
}
/** O mesmo pacote como texto (para pôr dentro de uma página HTML que roda sozinha). */
export async function motorNovoTexto(entrada, opcoes = {}) {
  const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'iife', globalName: 'MOTOR', write: false, minify: true, loader: { '.json': 'json' }, ...opcoes });
  return outputFiles[0].text;
}
