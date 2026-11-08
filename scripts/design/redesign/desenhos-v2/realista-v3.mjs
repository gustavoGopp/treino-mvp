// Redesign, lote 5, 3ª rodada (08/11/2026): a ilustração realista com a pessoa revista e, ao lado, a mesma cena só
// com o aparelho (reenquadrada), para o Gustavo decidir se a pessoa é necessária. Cada amostra aparece grande, no
// cartão do cadastro (112 × 84) e no cartão do tema escuro. São 2 folhas de 4 amostras (a altura de uma só passaria
// de 7800 px a 2×).
// Uso: node scripts/design/redesign/desenhos-v2/realista-v3.mjs docs/img/redesign-lote-5-realista-v3
//      (gera ...-v3a.png e ...-v3b.png)
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
const VERSOES = [
  ['a', 'Com a pessoa', true],
  ['b', 'Só o aparelho', false],
];
const svg = (id, sufixo, comPessoa, cls) =>
  `<svg class="${cls}" viewBox="${VIEWBOX}" aria-hidden="true">${ILUSTRACOES[id](id + sufixo, { pessoa: comPessoa })}</svg>`;

const secao = (id, n) => `
<section>
  <h2><span>${n + 1}</span> ${NOMES[id][0]}${NOMES[id][1] !== NOMES[id][0] ? `<small>${NOMES[id][1]}</small>` : ''}</h2>
  <div class="dois">
    ${VERSOES.map(([v, rot, cp]) => `<figure><figcaption><b>${v}</b> ${rot}</figcaption><div class="grande">${svg(id, 'g' + v, cp, 'g')}</div></figure>`).join('')}
  </div>
  <div class="cartoes">
    ${VERSOES.map(([v, rot, cp]) => `<div class="cartao"><i>${v} · ${rot}</i>${svg(id, 'c' + v, cp, 'p')}<b>${NOMES[id][0]}</b><small>+ marcar</small></div>`).join('')}
    ${VERSOES.map(([v, rot, cp]) => `<div class="cartao esc"><i>${v} · ${rot}</i><div class="ladrilho">${svg(id, 'e' + v, cp, 'p')}</div><b>${NOMES[id][0]}</b><small>+ marcar</small></div>`).join('')}
  </div>
</section>`;

const pagina = (ids, inicio, parte) => `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box}
body{font:15px/1.35 system-ui,sans-serif;margin:0;padding:16px;background:#F5F3EF;color:#1B1C1F;width:800px}
h1{font-size:24px;margin:0 0 4px}
.intro{margin:0 0 14px;color:#464B51;font-size:16px}
section{background:#fff;border-radius:16px;padding:12px;margin-bottom:12px;border:1.5px solid #D9D7D3}
h2{margin:0 0 8px;font-size:20px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
h2 span{color:#3F3AA8;font-weight:800}h2 small{font-size:14px;font-weight:400;color:#464B51}
.dois{display:flex;gap:16px}
figure{margin:0;flex:1}
figcaption{font-size:15px;font-weight:700;margin-bottom:4px}
figcaption b{display:inline-block;min-width:22px;height:22px;border-radius:11px;background:#E6EAFE;color:#3F3AA8;text-align:center;line-height:22px;margin-right:4px}
.grande{background:#F5F3EF;border-radius:12px}
.g{width:100%;height:auto;aspect-ratio:4/3;display:block}
.cartoes{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px}
.cartao{display:flex;flex-direction:column;align-items:flex-start;gap:4px;padding:8px 12px 10px;border:1.5px solid #5F636B;border-radius:16px;background:#fff;font-weight:700;line-height:1.2;font-size:16px;min-width:0}
.cartao i{font-style:normal;font-size:12px;font-weight:700;color:#3F3AA8;background:#E6EAFE;border-radius:8px;padding:1px 6px}
.cartao small{font-size:13px;font-weight:800;color:#464B51}
.p{width:112px;height:84px;display:block;flex:none}
.cartao.esc{background:#22211D;border-color:#9C998F;color:#F1EEE9}
.cartao.esc i{background:#272A4B;color:#A9B3FF}
.cartao.esc small{color:#BBB8B0}
.ladrilho{background:#F5F3EF;border-radius:10px}
.rodape{color:#464B51;font-size:14px;margin:4px 0 0}
</style>
<h1>Equipamentos: ilustração realista, 3ª rodada (${parte} de 2)</h1>
<p class="intro">Em cada aparelho, lado a lado: <b>a</b> com a pessoa usando e <b>b</b> só o aparelho (a mesma vista, aproximada). Embaixo, os dois no cartão do cadastro (112 × 84), no tema claro e no escuro.</p>
${ids.map((id, i) => secao(id, inicio + i)).join('')}
<p class="rodape">Tudo desenhado à mão em SVG (sem foto, sem marca). Pessoa com ~7,5 cabeças de altura, roupa justa de treino; aparelho em grafite, estofado na cor de ação do app.</p>`;

const base = process.argv[2] ?? 'docs/img/redesign-lote-5-realista-v3';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 800, height: 900 }, deviceScaleFactor: 2 });
for (const [parte, letra, ids, inicio] of [
  [1, 'a', ORDEM.slice(0, 4), 0],
  [2, 'b', ORDEM.slice(4), 4],
]) {
  await p.setContent(pagina(ids, inicio, parte));
  await p.screenshot({ path: `${base}${letra}.png`, fullPage: true });
  if (process.env.RECORTE) {
    const secs = await p.$$('section');
    for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: `${process.env.RECORTE}/v3-${inicio + i + 1}.png` });
  }
  console.log(`${base}${letra}.png`);
}
await b.close();
