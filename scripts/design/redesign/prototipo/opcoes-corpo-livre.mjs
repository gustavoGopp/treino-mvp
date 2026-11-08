// Redesign (06/11/2026), adendo da Fase 3: opções lado a lado para o desenho do "Corpo livre", para a escolha do Gustavo.
// A e B usam o Boneco do motor, sem mudança (estilo A, o mesmo quadro das miniaturas do app); C e D são desenhos
// de linha no traço dos equipamentos; E é o desenho atual do protótipo, para comparar.
// Uso: npx vite-node scripts/design/redesign/prototipo/opcoes-corpo-livre.mjs  → docs/revisoes/redesign/img/adendo-corpo-livre.png
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const M = { ...(await import('../../../../src/engine/index.ts')), ...(await import('../../../../src/engine/estilo/index.ts')) };
const ex = (id) => M.EX.find((e) => e.id === id);
// o mesmo quadro das miniaturas do app (modo Músculos, no instante parado do meio e na vista que o app escolhe)
function instante(e) {
  let t = 0;
  const p = [];
  for (const s of e.seq) {
    if (s.kind === 'hold') p.push(t + s.dur / 2);
    t += s.dur;
  }
  return p[1] ?? t / 2;
}
const quadro = (id) => {
  const e = ex(id);
  const t = instante(e);
  const q = M.montarSvgEstilo(e, M.vistaDaMiniatura(e, t, 'a'), 'mus', t, 0, 240, 'a');
  return `<svg viewBox="${q.viewBox}" class="${q.classe ?? ''}">${q.html}</svg>`;
};
const linha = (d) => `<svg viewBox="0 0 64 48" class="linha">${d}</svg>`;
const win = {};
new Function('window', readFileSync('docs/revisoes/redesign/prototipo/icones-novos.js', 'utf8'))(win);
const opcoes = [
  ['A', 'O Boneco fazendo flexão', 'o mesmo boneco do guia; a cara do app', `<div class="palco">${quadro('flexao')}</div>`],
  ['B', 'O Boneco agachando', 'o mesmo boneco do guia, no agachamento sem peso', `<div class="palco">${quadro('agachamento-peso-corpo')}</div>`],
  ['C', 'Flexão no tapete (linha)', 'no traço dos equipamentos', linha('<rect x="4" y="38" width="56" height="4" rx="2"/><circle cx="51" cy="20" r="3.6"/><path d="M47 23 14 32" stroke-width="4.2"/><path d="M44 24.5V38M14 32l-3 6" stroke-width="3.2"/>')],
  ['D', 'Braços para cima, no tapete (linha)', 'no traço dos equipamentos', linha('<rect x="10" y="40" width="44" height="4" rx="2"/><circle cx="32" cy="9" r="4.5"/><path d="M32 15v13" stroke-width="5"/><path d="M32 17 22 6M32 17 42 6M32 28l-7 12M32 28l7 12" stroke-width="3.6"/>')],
  ['E', 'Hoje no protótipo', 'a pessoa agachando, de lado', linha(win.ICONES_LUGAR.corpo)],
];
const css = readFileSync('docs/revisoes/redesign/prototipo/boneco.css', 'utf8');
const html = `<style>${css}
body{font:15px system-ui;margin:16px;background:#F5F3EF;color:#171B20}h1{font-size:20px;margin:0 0 4px}p{margin:0 0 14px;color:#464B51}
.g{display:grid;grid-template-columns:repeat(5,200px);gap:12px}.c{background:#fff;border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:8px}
.c b{font-size:22px;color:#3F3AA8}.c span{font-weight:700}.c small{color:#464B51}
.palco{width:176px;aspect-ratio:4/3;border-radius:10px;overflow:hidden;background:var(--stage)}.palco svg{width:100%;height:100%;display:block}
svg.linha{width:176px;height:132px;fill:none;stroke:#171B20;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;background:#fff}
.opc{display:flex;align-items:center;gap:12px;border:2px solid #868A92;border-radius:16px;padding:8px 12px;background:#fff;margin-top:6px}.opc .mini{width:64px;height:48px;flex:none}.opc .mini svg{width:64px;height:48px}.opc .mini .palco{width:64px}</style>
<h1>Corpo livre: 5 opções para escolher</h1><p>Em cima, o desenho grande; embaixo, como ele fica na linha do cadastro.</p>
<div class="g">${opcoes.map(([l, t, s, d]) => `<div class="c"><b>${l}</b>${d}<span>${t}</span><small>${s}</small><div class="opc"><div class="mini">${d.replace('class="palco"', 'class="palco"').replace('class="linha"', 'class="linha" style="width:64px;height:48px"')}</div><span>Corpo livre</span></div></div>`).join('')}</div>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 400 } });
await p.setContent(html);
await p.screenshot({ path: 'docs/revisoes/redesign/img/adendo-corpo-livre.png', fullPage: true });
await b.close();
console.log('ok');
