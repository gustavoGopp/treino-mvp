// Agente 5: o ícone provisório (docs/revisoes/redesign/img/agente-5-icone-{claro,escuro}.svg) visto como o celular mostra:
// nas máscaras de launcher (círculo, "squircle", quadrado arredondado), sobre fundo de launcher claro e escuro, em 48 e 96 px,
// com o círculo da zona segura (raio de 40% da largura, web.dev "Adaptive icon support in PWAs with maskable icons").
// Também imprime as razões de contraste do desenho sobre o fundo do ícone e do ícone sobre o launcher.
// Uso: node scripts/design/redesign/agente-5/icone.mjs  → docs/revisoes/redesign/img/agente-5-icone.png
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const lum = (h) => { const f = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16) / 255); return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)]; return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const pares = [['#FFFFFF', '#722987', 'desenho branco no ícone claro'], ['#DFA1F3', '#2E2132', 'desenho lilás no ícone escuro'], ['#722987', '#F2F2F2', 'ícone claro no launcher claro'], ['#722987', '#121212', 'ícone claro no launcher escuro'], ['#2E2132', '#F2F2F2', 'ícone escuro no launcher claro'], ['#2E2132', '#121212', 'ícone escuro no launcher escuro'], ['#FFFFFF', '#0A7C72', 'hoje: desenho branco no ícone verde-azulado']];
for (const [a, b, t] of pares) console.log(`${t}: ${cr(a, b).toFixed(2)}:1`);
const svg = (t) => readFileSync(`docs/revisoes/redesign/img/agente-5-icone-${t}.svg`, 'utf8').replace(/<title>.*?<\/title>/, '');
const hoje = readFileSync('public/icon.svg', 'utf8');
const masc = { círculo: '50%', squircle: '30%', 'quadrado arred.': '18%' };
const cel = (s, r, px, seguro = false) => `<div style="width:${px}px;height:${px}px;border-radius:${r};overflow:hidden;position:relative">${s.replace('<svg ', `<svg width="${px}" height="${px}" `)}${seguro ? `<div style="position:absolute;inset:10%;border:2px dashed #ffcf33;border-radius:50%"></div>` : ''}</div>`;
const faixa = (fundo, cor) => `<div style="background:${fundo};color:${cor};padding:14px;border-radius:14px;display:grid;grid-template-columns:repeat(9,auto);gap:14px;align-items:end;justify-content:start">
${['claro', 'escuro'].map((t) => Object.entries(masc).map(([n, r]) => `<figure style="margin:0;text-align:center">${cel(svg(t), r, 96)}<figcaption>${t}<br>${n}</figcaption></figure>`).join('')).join('')}
<figure style="margin:0;text-align:center">${cel(svg('claro'), '50%', 48)}<figcaption>48 px</figcaption></figure><figure style="margin:0;text-align:center">${cel(svg('escuro'), '50%', 48)}<figcaption>48 px</figcaption></figure><figure style="margin:0;text-align:center">${cel(hoje.replace('rx="96"', 'rx="0"'), '50%', 48)}<figcaption>hoje</figcaption></figure></div>`;
const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;padding:14px;font:13px system-ui;background:#fff;width:1100px">
<h3 style="margin:0 0 8px">Ícone provisório (Ameixa): nas máscaras do Android, no launcher claro e no escuro</h3>
${faixa('#F2F2F2', '#15171C')}<div style="height:10px"></div>${faixa('#121212', '#EEE')}
<div style="display:flex;gap:14px;align-items:center;margin-top:10px">${cel(svg('claro'), '0', 160, true)}${cel(svg('escuro'), '0', 160, true)}<p style="max-width:600px">Tracejado amarelo: a zona segura de um ícone "maskable" (círculo com raio de 40% da largura). O halter inteiro cabe nela, então nenhuma máscara corta o desenho.</p></div></body>`;
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1128, height: 600 }, deviceScaleFactor: 1 });
await p.setContent(html);
await p.screenshot({ path: 'docs/revisoes/redesign/img/agente-5-icone.png', fullPage: true });
await b.close();
