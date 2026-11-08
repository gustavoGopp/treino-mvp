// Redesign (06/11/2026): a folha de aprovação dos desenhos de equipamento (os 25 do app e os 24 novos, marcados com ★)
// e dos 4 lugares. Uso: node scripts/design/redesign/prototipo/folha-icones.mjs docs/revisoes/redesign/img/icones-equipamento.png
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
const D = 'docs/revisoes/redesign/prototipo/';
const win = {};
new Function('window', readFileSync(D + 'dados.js', 'utf8') + readFileSync(D + 'icones-novos.js', 'utf8'))(win);
const itens = win.DADOS.equipamento.flatMap((c) => c.itens);
const cel = (nome, svg, novo) => `<div class="c${novo ? ' n' : ''}"><svg viewBox="0 0 64 48">${svg}</svg><span>${nome}${novo ? ' ★' : ''}</span></div>`;
const html = `<style>body{font:13px system-ui;margin:12px;background:#fff}.g{display:grid;grid-template-columns:repeat(8,120px);gap:8px}.c{border:1px solid #ccc;border-radius:10px;padding:6px;text-align:center}.c.n{border:2px solid #3F3AA8}svg{width:96px;height:72px;fill:none;stroke:#333;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}h2{font-size:15px}</style>
<h2>Lugares</h2><div class="g">${Object.entries(win.ICONES_LUGAR).map(([k, v]) => cel(k, v, true)).join('')}</div>
<h2>Equipamentos (★ = desenho novo)</h2><div class="g">${itens.map((i) => cel(i.nome, i.desenho || win.ICONES_NOVOS[i.id] || '', !i.desenho)).join('')}</div>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1060, height: 900 } });
await p.setContent(html);
await p.screenshot({ path: process.argv[2], fullPage: true });
await b.close();
console.log(itens.length, 'itens;', itens.filter((i) => !i.desenho && !win.ICONES_NOVOS[i.id]).map((i) => i.id));
