// Revisão de design v2: o Boneco em PNG (claro e escuro) para o canvas da reformulação visual, que não aceita o
// SVG com as classes do app. Lê o que gerar.mjs produziu. Saída: reports/design/prototipo/ (fora do git).
// Uso: node scripts/design/prototipo/gerar.mjs && node scripts/design/prototipo/rasterizar.mjs
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const B = JSON.parse(readFileSync('reports/design/prototipo/boneco.js', 'utf8').replace(/^window\.BONECO=/, '').replace(/;\s*$/, ''));
const css = readFileSync('reports/design/prototipo/boneco.css', 'utf8');
const SAIDA = 'reports/design/prototipo';
mkdirSync(SAIDA, { recursive: true });
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch();
for (const tema of ['claro', 'escuro']) {
  const p = await b.newPage({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 2 });
  const foto = async (q, w, h, nome) => {
    await p.setContent(`<style>${css}body{margin:0;font-family:"Atkinson Hyperlegible Next",system-ui,sans-serif}.palco{width:${w}px;height:${h}px;background:var(--b-stage)}svg{display:block;width:100%;height:100%}</style>
      <div class="palco" data-x ${tema === 'escuro' ? '' : ''}><svg class="${q.c}" viewBox="${q.v}">${q.h}</svg></div>`);
    if (tema === 'escuro') await p.evaluate(() => document.documentElement.setAttribute('data-tema', 'escuro'));
    await p.locator('.palco').screenshot({ path: `${SAIDA}/${nome}-${tema}.png` });
  };
  for (const [id, q] of Object.entries(B.mini)) await foto(q, 160, 120, `mini-${id}`);
  const seq = B.guia['lateral|tec'].quadros;
  for (let i = 0; i < seq.length; i += 3) await foto(seq[i], 390, 292, `guia-tec-${String(i / 3).padStart(2, '0')}`);
  await foto(B.guia['lateral|mus'].quadros[12], 390, 292, 'guia-mus');
  await foto(B.guia['frontal|tec'].quadros[12], 390, 292, 'guia-frontal');
  await p.close();
}
await b.close();
console.log('ok');
