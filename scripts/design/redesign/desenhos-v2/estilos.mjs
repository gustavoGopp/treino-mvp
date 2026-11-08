// Redesign, lote 5 (08/11/2026): a folha para o Gustavo escolher o estilo dos desenhos de equipamento.
// 8 amostras (do mais fácil ao mais difícil de reconhecer), cada uma em 3 estilos: A "Linha detalhada",
// B "Com a pessoa" e C "Preenchido". Cada estilo aparece grande, no tamanho real do cartão do app (56 × 42)
// e no tema escuro. Os desenhos vêm de desenhos.mjs.
// Uso: node scripts/design/redesign/desenhos-v2/estilos.mjs docs/img/redesign-lote-5-estilos-desenho.png
import { chromium } from '@playwright/test';
import { DESENHOS, NOMES, RAIZ } from './desenhos.mjs';

const ORDEM = ['kettlebell', 'leg_press', 'estacao_polia_dupla', 'banco_scott', 'cadeira_abdutora_adutora', 'hack', 'banco_romano', 'graviton'];
const ESTILOS = [
  ['A', 'Linha detalhada', 'Só traço, com as peças que identificam o aparelho.'],
  ['B', 'Com a pessoa', 'O mesmo traço e uma pessoa usando o aparelho.'],
  ['C', 'Preenchido', 'Formas chapadas em 2 tons: estrutura e estofado.'],
];
const svg = (id, e, cls) => `<svg class="${cls}" ${RAIZ} aria-hidden="true">${DESENHOS[id][e]}</svg>`;
const cartao = (id, e, tema) =>
  `<div class="cartao ${tema}">${svg(id, e, 'p')}<b>${NOMES[id].curto}</b><small>+ marcar</small></div>`;

const linha = (id, n) => `
<section>
  <h2><span>${n + 1}</span>${NOMES[id].curto}<small>${NOMES[id].completo !== NOMES[id].curto ? NOMES[id].completo : ''}</small></h2>
  <div class="tres">
    ${ESTILOS.map(([e]) => `<div class="col"><i>${e}</i><div class="grande">${svg(id, e, 'g')}</div>${cartao(id, e, 'claro')}</div>`).join('')}
  </div>
  <div class="escuro">
    ${ESTILOS.map(([e]) => `<div class="col"><i>${e}</i>${svg(id, e, 'm')}${cartao(id, e, 'esc')}</div>`).join('')}
  </div>
</section>`;

const html = `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box}
body{font:15px/1.35 system-ui,sans-serif;margin:0;padding:16px;background:#F5F3EF;color:#1B1C1F;width:780px}
h1{font-size:24px;margin:0 0 4px}
.intro{margin:0 0 12px;color:#464B51;font-size:16px}
.legenda{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}
.legenda div{background:#fff;border-radius:12px;padding:10px 12px}
.legenda b{display:block;font-size:17px}.legenda b i{font-style:normal;color:#3F3AA8;font-weight:800;margin-right:6px}
.legenda span{color:#464B51;font-size:14px}
section{background:#fff;border-radius:16px;padding:12px;margin-bottom:14px;border:1.5px solid #D9D7D3}
h2{margin:0 0 8px;font-size:20px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
h2 span{color:#3F3AA8;font-weight:800}
h2 small{font-size:14px;font-weight:400;color:#464B51}
.tres,.escuro{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.col{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px}
.col > i{position:absolute;left:4px;top:2px;font-style:normal;font-weight:800;font-size:18px;color:#3F3AA8}
.grande{background:#F5F3EF;border-radius:12px;width:100%;display:flex;justify-content:center;padding:6px 0}
svg{--dz-sup:#FFFFFF;--dz-claro:color-mix(in srgb,currentColor 48%,var(--dz-sup));--dz-pessoa:color-mix(in srgb,currentColor 44%,var(--dz-sup))}
.escuro svg{--dz-pessoa:color-mix(in srgb,currentColor 58%,var(--dz-sup))}
.grande svg{--dz-sup:#F5F3EF}
.g{width:144px;height:108px;color:#3F3AA8}
.cartao{width:170px;min-height:112px;display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:12px;border:1.5px solid #5F636B;border-radius:16px;background:#fff;font-weight:700;line-height:1.2;font-size:17px}
.cartao small{font-size:13px;font-weight:800;color:#464B51}
.cartao .p{width:56px;height:42px;color:#464B51;flex:none}
.escuro{background:#151410;border-radius:12px;padding:10px 8px;margin-top:10px}
.escuro .col > i{color:#A9B3FF}
.m{width:96px;height:72px;color:#A9B3FF;--dz-sup:#151410}
.cartao.esc{background:#211F1C;border-color:#9C998F;color:#F1EEE9}
.cartao.esc small{color:#BBB8B0}
.cartao.esc .p{color:#BBB8B0;--dz-sup:#211F1C}
.rodape{color:#464B51;font-size:14px;margin:4px 0 0}
</style>
<h1>Desenhos de equipamento: 3 estilos para escolher</h1>
<p class="intro">8 aparelhos, do mais fácil ao mais difícil de reconhecer. Em cada um: o desenho grande, o cartão do cadastro no tamanho real (56 × 42) e, na faixa escura, o tema escuro.</p>
<div class="legenda">${ESTILOS.map(([e, t, d]) => `<div><b><i>${e}</i>${t}</b><span>${d}</span></div>`).join('')}</div>
${ORDEM.map(linha).join('')}
<p class="rodape">Desenhos à mão em SVG, sem foto nem marca. Na faixa escura: o desenho na cor de ação e o cartão desmarcado.</p>`;

const saida = process.argv[2] ?? 'docs/img/redesign-lote-5-estilos-desenho.png';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 812, height: 900 }, deviceScaleFactor: 2 });
await p.setContent(html);
await p.screenshot({ path: saida, fullPage: true });
if (process.env.RECORTE) {
  // recortes por amostra, para conferir de perto
  const secs = await p.$$('section');
  for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: `${process.env.RECORTE}/amostra-${i + 1}.png` });
}
await b.close();
console.log(saida);
