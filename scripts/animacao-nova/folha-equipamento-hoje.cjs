// Folha de conferência dos 49 desenhos de cartão de hoje (só leitura de public/equipamento/). Uso: node scripts/animacao-nova/folha-equipamento-hoje.cjs
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const dir = 'public/equipamento', out = 'docs/revisoes/animacao-nova/diagnostico';
const ids = fs.readdirSync(dir).filter(f => f.endsWith('.svg')).map(f => f.slice(0, -4)).sort();
const uri = id => 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(dir, id + '.svg')).toString('base64');
const css = `*{box-sizing:border-box}body{margin:0;padding:8px;font:11px system-ui,sans-serif;width:1500px}
.g{display:grid;gap:6px}.c{padding:4px;border-radius:6px}.l{background:#F5F3EF;color:#1B1C1F}.d{background:#10171b;color:#e8eaed}
.c img{display:block}.c b{display:block;font-weight:500;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.par{display:flex;gap:6px}`;
const cel = (id, w, h) => `<div class="par"><div class="c l"><img src="${uri(id)}" width="${w}" height="${h}"><b>${id}</b></div><div class="c d"><img src="${uri(id)}" width="${w}" height="${h}"><b>${id}</b></div></div>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1516, height: 800 }, deviceScaleFactor: 1 });
  // cartão ~96 px de largura (96x72), 49 itens, 7 por linha, cada um em claro e escuro
  await p.setContent(`<style>${css}.g{grid-template-columns:repeat(5,1fr)}</style><div class="g">${ids.map(i => cel(i, 96, 72)).join('')}</div>`);
  await p.screenshot({ path: `${out}/equipamento-hoje-cartao.png`, fullPage: true });
  // ampliado ~300 px, 3 imagens
  const n = Math.ceil(ids.length / 3);
  for (let k = 0; k < 3; k++) {
    const parte = ids.slice(k * n, (k + 1) * n);
    await p.setContent(`<style>${css}.g{grid-template-columns:repeat(2,1fr)}</style><div class="g">${parte.map(i => cel(i, 300, 225)).join('')}</div>`);
    await p.screenshot({ path: `${out}/equipamento-hoje-ampliado-${k + 1}.png`, fullPage: true });
  }
  await b.close();
  console.log(ids.length, 'svg;', 'partes de', n);
})();
