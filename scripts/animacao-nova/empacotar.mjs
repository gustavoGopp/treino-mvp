// Empacota o motor novo (src/engine/novo) num módulo importável pelos scripts de folha, protótipo e conferência.
import { build } from 'esbuild';
import { mkdirSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
let n = 0;
export async function motorNovo(entrada = `export * from './src/engine/novo/index.ts';`) {
  const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false, loader: { '.json': 'json' } });
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
