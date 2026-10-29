// Gera a linha de base do motor de animação a partir do guia original (referencia/guia-execucao-fase1.html).
// O arquivo de referência não é alterado: o gancho de QA é injetado só em memória.
// Uso: node scripts/linha-de-base-motor.mjs
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(raiz, 'referencia/guia-execucao-fase1.html');
const saida = resolve(raiz, 'tests/visual/linha-de-base/motor.json');
const sha = (s) => createHash('sha256').update(s).digest('hex');

export const N_TEMPOS = 24;

const original = readFileSync(htmlPath, 'utf8');
const gancho = 'window.__guia={prims:()=>prims,setKS:k=>{KS=k},prep,calib,segAt,';
if (!original.includes('window.__guia={')) throw new Error('gancho de QA não encontrado no guia');
const instrumentado = original.replace('window.__guia={', gancho);

const browser = await chromium.launch();
const page = await browser.newPage();
const erros = [];
page.on('pageerror', (e) => erros.push(e.message));
await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
await page.route('**/guia.html', (r) => r.fulfill({ contentType: 'text/html', body: instrumentado }));
await page.goto('http://localhost/guia.html');
await page.waitForFunction(() => !!window.__guia);

const resultado = await page.evaluate((N) => {
  const g = window.__guia;
  const quadro = (ex, view, mode, t, err) => {
    g.setKS(1);
    g.scene(ex, view, mode, t, err);
    const ps = g.prims().slice().sort((a, b) => a.l - b.l || a.d - b.d);
    return ps.map((p) => p.s).join('');
  };
  const exercicios = g.EX.map((ex) => {
    const frames = {};
    const chave = {};
    const fits = {};
    for (const view of ex.views) {
      fits[view] = g.fit(ex, view);
      for (const mode of ['tec', 'mus', 'traj']) {
        const arr = [];
        for (let i = 0; i < N; i++) arr.push(quadro(ex, view, mode, (i / N) * ex.T, 0));
        frames[`${view}|${mode}`] = arr;
        if (mode === 'tec') chave[view] = [arr[0], arr[N / 2]];
      }
    }
    ex.errors.forEach((e, j) => {
      if (!fits[e.view]) fits[e.view] = g.fit(ex, e.view);
      const arr = [];
      for (let i = 0; i < N; i++) arr.push(quadro(ex, e.view, 'err', (i / N) * ex.T, j));
      frames[`${e.view}|err|${e.id}`] = arr;
    });
    return { id: ex.id, T: ex.T, L0: ex.L0, lift: ex._liftRange ?? null, fits, frames, chave };
  });
  return { exercicios, check: g.check() };
}, N_TEMPOS);
await browser.close();
if (erros.length) throw new Error('erros de página: ' + erros.join('; '));

const out = {
  gerado: 'scripts/linha-de-base-motor.mjs',
  referenciaSha256: sha(original),
  nTempos: N_TEMPOS,
  check: resultado.check,
  exercicios: resultado.exercicios.map((e) => ({
    id: e.id,
    T: e.T,
    L0: e.L0,
    lift: e.lift,
    fits: e.fits,
    frames: Object.fromEntries(Object.entries(e.frames).map(([k, arr]) => [k, arr.map(sha)])),
    chave: e.chave,
  })),
};
mkdirSync(dirname(saida), { recursive: true });
writeFileSync(saida, JSON.stringify(out, null, 1) + '\n');
const nQuadros = out.exercicios.reduce((s, e) => s + Object.values(e.frames).flat().length, 0);
console.log(`linha de base: ${out.exercicios.length} exercícios, ${nQuadros} quadros → ${saida}`);
