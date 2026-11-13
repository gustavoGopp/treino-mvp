// O equipamento das cenas: as peças simples (as da conferência) ao lado do desenho realista, que usa o mesmo gerador
// dos 49 cartões do app (src/engine/novo/realista/base.mjs) com as medidas da tabela de objetos.
// Gera docs/revisoes/animacao-nova/prototipos/equipamento-realista.png.
// Uso: node scripts/animacao-nova/cena-realista.mjs
import { existsSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovo } from './empacotar.mjs';

const { modulo: m } = await motorNovo();
const corpo = m.CORPOS.homem;
const css = readFileSync('src/engine/novo/estilo.css', 'utf8') + m.cssDoBoneco();
const EX = { goblet: m.goblet, 'supino-reto': m.supinoReto, 'puxada-unilateral': m.puxadaUnilateral };
function svg(id, vista, frac, equipamento, tema = 'claro', boneco = 'cinza', modo = 'tec') {
  const ex = EX[id], T = m.duracao(ex.ficha.fases);
  const o = { corpo, vista, boneco, modo, equipamento };
  return m.svgDaCena(ex, frac * T, o, m.enquadrar(ex, { corpo, vista, boneco, equipamento }), tema);
}
const cel = (t, s, esc) => `<figure><div class="q${esc ? ' esc' : ''}">${s}</div><figcaption>${t}</figcaption></figure>`;
const LINHAS = [
  ['Puxada unilateral, de lado', 'puxada-unilateral', 'lateral', 0.5], ['Puxada unilateral, de trás', 'puxada-unilateral', 'posterior', 0.5], ['Puxada unilateral, três quartos de trás (vista que não é do app)', 'puxada-unilateral', 'quinaTras', 0.5],
  ['Supino reto, de lado', 'supino-reto', 'lateral', 0.5], ['Supino reto, de cima', 'supino-reto', 'cima', 0.5], ['Supino reto, três quartos (vista que não é do app)', 'supino-reto', 'quina', 0.5],
  ['Goblet, de lado', 'goblet', 'lateral', 0.6], ['Goblet, de frente', 'goblet', 'frontal', 0.6],
];
let html = `<!doctype html><meta charset="utf-8"><style>${css}
body{margin:0;padding:22px 24px;background:#fff;color:#171b20;font:14px/1.4 system-ui,sans-serif}h1{font-size:24px;margin:0 0 2px}p{margin:0 0 8px;color:#4d5661;max-width:1150px}
h2{font-size:15px;margin:14px 0 6px;border-top:2px solid #171b20;padding-top:6px}.l{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}figure{margin:0}figcaption{font-size:12px;color:#464b51;margin-top:2px}
.q{width:380px;height:285px;border-radius:10px;overflow:hidden;background:#f7f9fa}.q.esc{background:#10171b}.q svg,.q img{width:100%;height:100%;display:block}</style>
<h1>Equipamento das cenas: peças simples × o desenho dos cartões de hoje</h1><p>À esquerda, as peças simples do motor novo (ficam só para a conferência). Depois, o mesmo quadro com o equipamento desenhado pelo gerador dos 49 cartões de hoje, com as medidas da tabela de objetos: coluna de polia, colchonete, estribo, banco reto, halteres e anilhas. Nada disto está no app.</p>`;
for (const [titulo, id, vista, frac] of LINHAS) html += `<h2>${titulo}</h2><div class="l">${cel('peças simples', svg(id, vista, frac, 'simples'))}${cel('realista', svg(id, vista, frac, 'realista'))}${cel('realista · tema escuro', svg(id, vista, frac, 'realista', 'escuro'), true)}${cel('realista · cor de pele, músculos', svg(id, vista, frac, 'realista', 'claro', 'pele', 'mus'))}</div>`;
html += `<h2>Para comparar: os cartões de hoje dessas peças</h2><div class="l">${['polia_simples', 'estacao_polia_dupla', 'acessorio_polia_estribo', 'banco_reto', 'halteres_fixos', 'anilhas_e_manoplas'].map((h) => cel(`hoje · ${h}.svg`, `<img src="data:image/svg+xml;base64,${readFileSync(`public/equipamento/${h}.svg`).toString('base64')}">`)).join('')}</div>`;
const caminho = '/opt/pw-browsers/chromium';
const nav = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pg = await nav.newPage({ viewport: { width: 1640, height: 800 }, deviceScaleFactor: 2 });
pg.on('pageerror', (e) => console.log('erro:', String(e).slice(0, 300)));
await pg.setContent(html);
await pg.screenshot({ path: 'docs/revisoes/animacao-nova/prototipos/equipamento-realista.png', fullPage: true });
await nav.close();
console.log('equipamento-realista.png');
