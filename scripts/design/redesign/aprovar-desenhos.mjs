// Redesign, lote 5 (08/11/2026): a folha para o Gustavo aprovar, um a um, os 24 desenhos de equipamento que faltam no
// app. Cada desenho aparece numerado, grande e no tamanho do cartão do app (56 × 42), com o nome; os 3 que a proposta
// chamou de esboço vêm marcados. Uso: node scripts/design/redesign/aprovar-desenhos.mjs docs/img/redesign-lote-5-desenhos.png
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
const D = 'docs/revisoes/redesign/prototipo/';
const win = {};
new Function('window', readFileSync(D + 'dados.js', 'utf8') + readFileSync(D + 'icones-novos.js', 'utf8'))(win);
const nomes = Object.fromEntries(win.DADOS.equipamento.flatMap((c) => c.itens).map((i) => [i.id, i.nome]));
const ESBOCOS = ['gluteo_maquina', 'abdominal_maquina', 'remada_articulada'];
const cel = ([id, svg], n) =>
  `<div class="c${ESBOCOS.includes(id) ? ' e' : ''}"><b>${n + 1}</b><svg class="g" viewBox="0 0 64 48">${svg}</svg><svg class="p" viewBox="0 0 64 48">${svg}</svg><span>${nomes[id] ?? id}${ESBOCOS.includes(id) ? '<br><i>esboço</i>' : ''}</span></div>`;
const html = `<style>body{font:15px system-ui;margin:16px;background:#F5F3EF;color:#1B1C1F}.grade{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.c{position:relative;background:#fff;border:1.5px solid #D9D7D3;border-radius:14px;padding:10px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
.c.e{border:2.5px dashed #7B5612}.c b{position:absolute;left:8px;top:6px;font-size:14px;color:#3F3AA8}
svg{fill:none;stroke:#3F3AA8;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}.g{width:144px;height:108px}.p{width:56px;height:42px;stroke:#464B51}
span{font-weight:700;line-height:1.2}i{font-weight:800;color:#7B5612;font-style:normal}h1{font-size:20px;margin:0 0 4px}p{margin:0 0 12px;color:#464B51}</style>
<h1>Os 24 desenhos de equipamento que faltam</h1><p>Grande, e no tamanho do cartão do app (o pequeno, cinza). Tracejado = esboço.</p>
<div class="grade">${Object.entries(win.ICONES_NOVOS).map(cel).join('')}</div>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 760, height: 900 }, deviceScaleFactor: 2 });
await p.setContent(html);
await p.screenshot({ path: process.argv[2], fullPage: true });
await b.close();
console.log(Object.keys(win.ICONES_NOVOS).map((id, i) => `${i + 1}. ${nomes[id] ?? id}`).join('\n'));
