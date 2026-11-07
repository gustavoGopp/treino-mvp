// Gera public/apple-touch-icon.png (180 × 180) a partir de public/icon.svg (R5c, pedido 17 ao design).
// O iPhone não usa o SVG do manifesto na tela de início e arredonda os cantos sozinho: o PNG sai quadrado e sem transparência.
// Uso: node scripts/icone-iphone.mjs   (o lote 5 do redesign pode trocar o desenho; o tamanho fica)
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const svg = readFileSync('public/icon.svg', 'utf8').replace(/<rect width="512" height="512" rx="\d+"/, '<rect width="512" height="512"');
const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
await pagina.setContent(`<html><body style="margin:0">${svg.replace('<svg ', '<svg width="180" height="180" ')}</body></html>`);
writeFileSync('public/apple-touch-icon.png', await pagina.screenshot({ type: 'png', omitBackground: false }));
await navegador.close();
console.log('public/apple-touch-icon.png (180 × 180)');
