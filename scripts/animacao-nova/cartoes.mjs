// Três cartões de equipamento no traço novo (etapa 1 da animação nova): banco regulável, coluna de polia e halteres.
// Cada cartão sai das mesmas peças da cena (src/engine/novo/pecas.ts), com as medidas da tabela de objetos, vistas de
// três quartos. Gera docs/revisoes/animacao-nova/prototipos/cartoes/<id>.svg e cartoes.png (ao lado dos cartões de hoje).
// Uso: node scripts/animacao-nova/cartoes.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovo } from './empacotar.mjs';

const { modulo: m } = await motorNovo();
const SAIDA = 'docs/revisoes/animacao-nova/prototipos/cartoes';
const css = readFileSync('src/engine/novo/estilo.css', 'utf8');
const o = (id, medida) => m.obj(id, medida);
const yHalter = o('halter', 'cabecaAltura') / 2;
const CARTOES = [
  { id: 'banco_regulavel', nome: 'Banco regulável', hoje: ['banco_regulavel'], prims: m.bancoRegulavel(0, 0, 45), nota: 'encosto a 45°; estofado de 132 × 28,6 cm, a 44,5 cm do chão (Rogue Adjustable Bench 3.0)' },
  { id: 'coluna_de_polia', nome: 'Estação de polia (uma coluna regulável)', hoje: ['polia_simples', 'estacao_polia_dupla'], prims: [...m.torre({ base: [0, 0, 0], frente: [0, 0, 1], alturaDaPolia: o('torre', 'poliaMax') }, 0)], nota: 'coluna de 239 cm, polia de 17,8 a 193 cm, relação 2:1 (Life Fitness LCM-CC)' },
  { id: 'halteres', nome: 'Halteres', hoje: ['halteres_fixos'], prims: [...m.halter([-6, yHalter, 10], [1, 0, 0.3]), ...m.halter([6, yHalter, -16], [1, 0, -0.15])], nota: 'sextavado de 25 lb: 33 cm de comprimento, cabeça de 13,7 × 12,2 cm (RitFit)' },
];
const cam = m.camera('Três quartos', 40, 16);
function svg(c, tema) {
  const itens = c.prims.flatMap((p) => m.desenharPrim(cam, p, 'volume'));
  const k = m.caixaDosItens(itens);
  // cartão 4:3, com o objeto centrado e uma margem de 8%
  let w = k[2] - k[0], h = k[3] - k[1];
  const lado = Math.max(w / 4, h / 3) * 1.16;
  const W = lado * 4, H = lado * 3, x0 = (k[0] + k[2]) / 2 - W / 2, y0 = (k[1] + k[3]) / 2 - H / 2;
  const r = (n) => Math.round(n * 10) / 10;
  return `<svg xmlns="http://www.w3.org/2000/svg" class="novo${tema === 'escuro' ? ' escuro' : ''}" viewBox="${r(x0)} ${r(y0)} ${r(W)} ${r(H)}"><style>${css}</style>${m.pintar(itens)}</svg>`;
}
mkdirSync(SAIDA, { recursive: true });
let html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:22px 24px;background:#fff;color:#171b20;font:14px/1.4 system-ui,sans-serif}h1{font-size:22px;margin:0 0 4px}p{margin:0 0 10px;color:#4d5661;max-width:1000px}
h2{font-size:15px;margin:14px 0 6px;border-top:2px solid #171b20;padding-top:6px}.l{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}figure{margin:0}figcaption{font-size:12px;color:#464b51;margin-top:2px}
.q{width:240px;height:180px;border-radius:10px;overflow:hidden;background:#f7f9fa}.q.esc{background:#10171b}.q svg,.q img{width:100%;height:100%;display:block}.q.p{width:96px;height:72px}</style>
<h1>Cartões de equipamento: hoje × novo</h1><p>Três cartões no traço novo, feitos com as mesmas peças que aparecem nas cenas e com as medidas da tabela de objetos (cada medida com a sua fonte). Nada disto está no app.</p>`;
for (const c of CARTOES) {
  const claro = svg(c, 'claro'), escuro = svg(c, 'escuro');
  writeFileSync(`${SAIDA}/${c.id}.svg`, claro + '\n');
  const hoje = c.hoje.map((h) => `<figure><div class="q"><img src="data:image/svg+xml;base64,${readFileSync(`public/equipamento/${h}.svg`).toString('base64')}"></div><figcaption>hoje · ${h}.svg</figcaption></figure>`).join('');
  html += `<h2>${c.nome}</h2><div class="l">${hoje}<figure><div class="q">${claro}</div><figcaption>novo · tema claro</figcaption></figure><figure><div class="q esc">${escuro}</div><figcaption>novo · tema escuro</figcaption></figure><figure><div class="q p">${claro}</div><figcaption>novo · 96 px</figcaption></figure></div><p style="margin-top:4px">${c.nota}. Peso do arquivo novo: ${(claro.length / 1024).toFixed(1)} kB.</p>`;
}
const caminho = '/opt/pw-browsers/chromium';
const nav = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pg = await nav.newPage({ viewport: { width: 1100, height: 700 }, deviceScaleFactor: 2 });
await pg.setContent(html);
await pg.screenshot({ path: `${SAIDA}/cartoes.png`, fullPage: true });
await nav.close();
console.log('cartões:', CARTOES.map((c) => c.id).join(', '));
