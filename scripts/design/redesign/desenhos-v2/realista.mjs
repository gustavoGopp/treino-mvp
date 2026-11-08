// Redesign, lote 5, 2ª rodada (08/11/2026): a folha da ilustração realista dos equipamentos, para o Gustavo.
// As 8 amostras grandes (320 × 240), no cartão do cadastro no tamanho novo (112 × 84) e num cartão do tema escuro.
// Os desenhos vêm de realista/aparelhos.mjs (aparelho e pessoa em 3D, projetados em SVG escrito à mão).
// Uso: node scripts/design/redesign/desenhos-v2/realista.mjs docs/img/redesign-lote-5-realista.png
import { chromium } from '@playwright/test';
import { ILUSTRACOES, VIEWBOX } from './realista/aparelhos.mjs';

const NOMES = {
  kettlebell: ['Kettlebell', 'Kettlebell'],
  leg_press: ['Leg press', 'Leg press'],
  estacao_polia_dupla: ['Polia dupla (crossover)', 'Estação de polia dupla (crossover) com altura regulável'],
  banco_scott: ['Banco Scott', 'Banco Scott'],
  cadeira_abdutora_adutora: ['Abdutora e adutora', 'Cadeira abdutora e adutora (ou máquina de abdução em pé)'],
  hack: ['Hack ou pendular', 'Hack ou agachamento pendular'],
  banco_romano: ['Banco romano ou GHD', 'Banco romano (hiperextensão) ou GHD'],
  graviton: ['Graviton', 'Graviton (barra e mergulho assistidos)'],
};
const ORDEM = Object.keys(NOMES);
const svg = (id, sufixo, cls) => `<svg class="${cls}" viewBox="${VIEWBOX}" aria-hidden="true">${ILUSTRACOES[id](id + sufixo)}</svg>`;

const secao = (id, n) => `
<section>
  <div class="grande">${svg(id, 'g', 'g')}</div>
  <div class="lado">
    <h2><span>${n + 1}</span> ${NOMES[id][0]}</h2>
    ${NOMES[id][1] !== NOMES[id][0] ? `<p class="completo">${NOMES[id][1]}</p>` : ''}
    <div class="cartoes">
      <div class="cartao">${svg(id, 'c', 'p')}<b>${NOMES[id][0]}</b><small>+ marcar</small></div>
      <div class="cartao esc"><div class="ladrilho">${svg(id, 'e', 'p')}</div><b>${NOMES[id][0]}</b><small>+ marcar</small></div>
    </div>
  </div>
</section>`;

const html = `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box}
body{font:15px/1.35 system-ui,sans-serif;margin:0;padding:16px;background:#F5F3EF;color:#1B1C1F;width:800px}
h1{font-size:24px;margin:0 0 4px}
.intro{margin:0 0 14px;color:#464B51;font-size:16px}
section{display:flex;gap:16px;background:#fff;border-radius:16px;padding:12px;margin-bottom:12px;border:1.5px solid #D9D7D3}
.grande{flex:none;width:320px;height:240px;background:#F5F3EF;border-radius:12px}
.g{width:320px;height:240px;display:block}
.lado{flex:1;min-width:0;display:flex;flex-direction:column}
h2{margin:0;font-size:20px}h2 span{color:#3F3AA8;font-weight:800}
.completo{margin:2px 0 0;color:#464B51;font-size:14px}
.cartoes{display:flex;gap:10px;margin-top:auto}
.cartao{width:192px;display:flex;flex-direction:column;align-items:flex-start;gap:4px;padding:10px 12px;border:1.5px solid #5F636B;border-radius:16px;background:#fff;font-weight:700;line-height:1.2;font-size:16px}
.cartao small{font-size:13px;font-weight:800;color:#464B51}
.p{width:112px;height:84px;display:block;flex:none}
.cartao.esc{background:#22211D;border-color:#9C998F;color:#F1EEE9}
.cartao.esc small{color:#BBB8B0}
.ladrilho{background:#F5F3EF;border-radius:10px}
.rodape{color:#464B51;font-size:14px;margin:4px 0 0}
</style>
<h1>Equipamentos: ilustração realista (2ª rodada)</h1>
<p class="intro">Aparelho em 3/4 com volume e uma pessoa usando, nas 8 amostras. À esquerda o desenho grande; à direita o cartão do cadastro no tamanho novo (112 × 84) e o mesmo cartão no tema escuro (o desenho fica num ladrilho claro).</p>
${ORDEM.map(secao).join('')}
<p class="rodape">Tudo desenhado à mão em SVG (sem foto, sem marca). Aparelho em grafite e cinza, estofado na cor de ação do app; pessoa com camiseta clara, bermuda grafite e tênis.</p>`;

const saida = process.argv[2] ?? 'docs/img/redesign-lote-5-realista.png';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 800, height: 900 }, deviceScaleFactor: 2 });
await p.setContent(html);
await p.screenshot({ path: saida, fullPage: true });
if (process.env.RECORTE) {
  const secs = await p.$$('section');
  for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: `${process.env.RECORTE}/real-${i + 1}.png` });
}
await b.close();
console.log(saida);
