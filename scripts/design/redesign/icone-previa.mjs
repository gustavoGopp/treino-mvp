// Redesign, lote 5: a prévia do ícone novo como ele aparece na tela inicial do Android (círculo, "squircle" e quadrado
// arredondado, com a zona segura de 40% tracejada) e no iOS. Uso: node scripts/design/redesign/icone-previa.mjs docs/img/redesign-lote-5-icone.png
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
const b64 = (f) => 'data:image/png;base64,' + readFileSync(f).toString('base64');
const m = b64('public/icon-maskable-512.png');
const a = b64('public/apple-touch-icon.png');
const cel = (rotulo, estilo, src = m) => `<figure><div class="i" style="${estilo}"><img src="${src}"></div><figcaption>${rotulo}</figcaption></figure>`;
const html = `<style>body{margin:0;font:600 15px system-ui;color:#fff;background:linear-gradient(160deg,#2b3a55,#5b4a6e);padding:24px}
.l{display:flex;gap:28px;flex-wrap:wrap;align-items:flex-start}figure{margin:0;text-align:center}figcaption{margin-top:8px}
.i{width:120px;height:120px;overflow:hidden;position:relative}.i img{width:100%;height:100%;display:block}
.z{position:absolute;inset:0;border:2px dashed rgba(255,255,255,.8);border-radius:50%;transform:scale(.8)}h1{font-size:18px;margin:0 0 16px}</style>
<h1>O ícone novo: o halter em Giz e grafite</h1><div class="l">
${cel('Círculo', 'border-radius:50%')}${cel('Squircle', 'border-radius:34%')}${cel('Quadrado arredondado', 'border-radius:18%')}
<figure><div class="i" style="border-radius:18%"><img src="${m}"><div class="z"></div></div><figcaption>Zona segura (40%)</figcaption></figure>
${cel('iOS', 'border-radius:22%', a)}</div>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 820, height: 260 }, deviceScaleFactor: 2 });
await p.setContent(html);
await p.screenshot({ path: process.argv[2], fullPage: true });
await b.close();
