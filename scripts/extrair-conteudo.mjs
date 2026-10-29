// Extrai os textos dos exercícios do guia original para src/conteudo/exercicios/<id>.json.
// Os valores vêm dos objetos já avaliados no navegador (inclui os clones, como elevacao-lateral-b).
// Uso: node scripts/extrair-conteudo.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CAMPOS_TEXTO } from './campos-texto.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');


const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(raiz, 'referencia/guia-execucao-fase1.html'), 'utf8');
const destino = resolve(raiz, 'src/conteudo/exercicios');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
await page.route('**/guia.html', (r) => r.fulfill({ contentType: 'text/html', body: html }));
await page.goto('http://localhost/guia.html');
await page.waitForFunction(() => !!window.__guia);
const dados = await page.evaluate((campos) =>
  window.__guia.EX.map((ex) => {
    const o = { id: ex.id };
    for (const c of campos) if (ex[c] !== undefined) o[c] = ex[c];
    o.errors = ex.errors.map((e) => ({ id: e.id, title: e.title, desc: e.desc }));
    return o;
  }), CAMPOS_TEXTO);
await browser.close();

mkdirSync(destino, { recursive: true });
for (const d of dados) writeFileSync(resolve(destino, `${d.id}.json`), JSON.stringify(d, null, 2) + '\n');
console.log(`conteúdo extraído: ${dados.length} exercícios → ${destino}`);
