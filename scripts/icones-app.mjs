// Redesign, lote 5 (08/11/2026): o ícone do app (o halter inclinado da proposta do agente 5, nas cores de Giz e grafite,
// a direção escolhida pelo Gustavo). Gera o SVG (aba do navegador) e os PNG que o Android e o iOS pedem: 192 e 512 com
// cantos redondos (purpose "any"), 512 sangrado (purpose "maskable", o halter dentro da zona segura de 40%) e 180 para
// o iOS (sangrado; o iOS arredonda sozinho). Usa o Chromium do Playwright, sem dependência nova.
// Uso: node scripts/icones-app.mjs
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const FUNDO = '#3F3AA8';
const HALTER = `<g fill="#FFFFFF" transform="rotate(-35 256 256)"><rect x="150" y="236" width="212" height="40" rx="12"/><rect x="146" y="164" width="48" height="184" rx="16"/><rect x="318" y="164" width="48" height="184" rx="16"/><rect x="100" y="200" width="40" height="112" rx="14"/><rect x="372" y="200" width="40" height="112" rx="14"/></g>`;
const svg = (redondo) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>treino-mvp</title><rect width="512" height="512"${redondo ? ' rx="96"' : ''} fill="${FUNDO}"/>${HALTER}</svg>`;

writeFileSync('public/icon.svg', svg(true) + '\n');
const b = await chromium.launch();
const p = await b.newPage();
for (const [arquivo, lado, redondo] of [
  ['public/icon-192.png', 192, true],
  ['public/icon-512.png', 512, true],
  ['public/icon-maskable-512.png', 512, false],
  ['public/apple-touch-icon.png', 180, false],
]) {
  await p.setViewportSize({ width: lado, height: lado });
  await p.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:${lado}px;height:${lado}px}</style>${svg(redondo)}`);
  await p.screenshot({ path: arquivo, omitBackground: true });
  console.log(arquivo);
}
await b.close();
