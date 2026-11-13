// Prova: o equipamento das cenas desenhado com o mesmo gerador dos 49 cartões de hoje
// (scripts/desenhos-equipamento/realista/base.mjs: 3D, materiais em quatro tons, costura no estofado, sombra macia),
// com as medidas da tabela de objetos, na vista de cada cena e junto com o Boneco novo.
// Gera docs/revisoes/animacao-nova/prototipos/equipamento-realista.png (peças simples × realistas, lado a lado).
// Uso: node scripts/animacao-nova/cena-realista.mjs
import { existsSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { MAT, cena as cenaRealista } from '../desenhos-equipamento/realista/base.mjs';
import { motorNovo } from './empacotar.mjs';

const { modulo: m } = await motorNovo();
const corpo = m.CORPOS.homem;
const css = readFileSync('src/engine/novo/estilo.css', 'utf8') + m.cssDoBoneco();
const o = (id, k) => m.obj(id, k);
const X = [1, 0, 0], Y = [0, 1, 0], Z = [0, 0, 1];

/** A câmera do motor novo no formato que o gerador realista espera (x na tela, y para baixo, z = longe de quem olha). */
const cameraRealista = (cam) => ({
  P: (p) => [m.dot(p, cam.dir), -m.dot(p, cam.cima), -m.dot(p, cam.para)],
  rot: (v) => [m.dot(v, cam.dir), m.dot(v, cam.cima), -m.dot(v, cam.para)],
  s: 1,
});

/** O equipamento de um quadro, desenhado pelo gerador realista: lê as peças simples do quadro e refaz cada uma. */
function equipamentoRealista(q, cam, id) {
  const C = cenaRealista(id, cameraRealista(cam));
  const P = q.prims;
  const deCima = Math.abs(cam.para[1]) > 0.1;
  for (let i = 0; i < P.length; i++) {
    const p = P[i];
    if (p.t === 'volume' && p.cls === 'aco' && P[i + 1]?.t === 'prisma' && P[i + 2]?.t === 'prisma') {
      // halter sextavado: duas cabeças de seis faces e o cabo cromado (o cabo um pouco para trás, para a mão ficar por cima)
      const [h1, h2] = [P[i + 1], P[i + 2]];
      const r = o('halter', 'cabecaLargura') / 2;
      C.cilindro(h1.a, h2.a, o('halter', 'caboDiam') / 2, MAT.cromo, { lados: 10, dz: 6 });
      for (const h of [h1, h2]) C.cilindro(h.a, h.b, r, MAT.ferro, { lados: 6, up: p.vol.aneis[0].z });
      i += 2;
    } else if (p.t === 'volume' && p.cls === 'ferro') {
      // anilha deitada (sob o calcanhar)
      const A = p.vol.aneis, a = A[0].c, b = A[A.length - 1].c;
      C.anilha(a, b, Math.max(...A.map((x) => x.a)), MAT.anilha);
    } else if (p.t === 'caixa' && p.cls === 'estofado') {
      // banco reto: estofado com costura, viga, colunas e pés em T com ponteiras de borracha
      const c = p.ref.o, [lx, ly, lz] = p.meias, tubo = o('bancoReto', 'tubo'), baseL = o('bancoReto', 'baseLarg') / 2;
      const yBaixo = c[1] - ly;
      C.estofado([c[0], yBaixo, c[2]], Z, Y, X, lz * 2, ly * 2, lx * 2);
      C.tubo([c[0], yBaixo - tubo / 2, c[2] - lz + 6], [c[0], yBaixo - tubo / 2, c[2] + lz - 6], tubo, tubo, MAT.metal);
      for (const s of [-1, 1]) {
        const z = c[2] + s * (lz - 16);
        C.tubo([c[0], tubo, z], [c[0], yBaixo - tubo, z], tubo, tubo, MAT.metal);
        C.tubo([c[0] - baseL, tubo / 2, z], [c[0] + baseL, tubo / 2, z], tubo, tubo, MAT.metal);
        for (const sx of [-1, 1]) C.cilindro([c[0] + sx * (baseL - 2), 0, z], [c[0] + sx * (baseL - 2), 1.2, z], 3.2, MAT.borracha, { lados: 10 });
      }
      if (deCima) C.sombra(c[0], c[2], baseL, lz + 8, 0.18);
      // as outras caixas do banco simples (viga e pés) já foram refeitas aqui
      while (P[i + 1]?.t === 'caixa' && P[i + 1].cls === 'esc') i++;
    }
  }
  return { itens: C.itens.map((it) => ({ d: -it.z, camada: it.z > 1e8 ? 0 : 1, s: it.svg })), defs: C.defs.join('') };
}

const f1 = (n) => Math.round(n * 10) / 10;
function svg(id, vista, frac, realista, tema = 'claro', boneco = 'cinza', modo = 'tec') {
  const ex = m.EXERCICIOS?.[id] ?? { goblet: m.goblet, 'supino-reto': m.supinoReto }[id];
  const cam = m.VISTAS[vista], T = m.duracao(ex.ficha.fases);
  const q = ex.quadro(corpo, m.instante(ex.ficha.fases, frac * T).u);
  const vb = m.enquadrar(ex, { corpo, vista, boneco });
  const corpoItens = m.desenharBoneco(q.esq, cam, { estilo: boneco, papeis: modo === 'mus' ? ex.papeis : undefined });
  let objetos, defs = '';
  if (realista) ({ itens: objetos, defs } = equipamentoRealista(q, cam, `${id}-${vista}`));
  else objetos = q.prims.filter((p) => p.t !== 'chao').flatMap((p) => m.desenharPrim(cam, p, 'volume'));
  const chao = cam.para[1] === 0 ? `<line class="n-chao-l" x1="${f1(vb[0])}" y1="0" x2="${f1(vb[0] + vb[2])}" y2="0"/>` : '';
  return `<svg class="novo boneco ${boneco}${tema === 'escuro' ? ' escuro' : ''}" viewBox="${vb.map(f1).join(' ')}"><defs>${defs}</defs>${m.DEFS_DO_BONECO}${chao}${m.pintar([...objetos, ...corpoItens])}</svg>`;
}

const cel = (t, s, esc) => `<figure><div class="q${esc ? ' esc' : ''}">${s}</div><figcaption>${t}</figcaption></figure>`;
const LINHAS = [
  ['Supino reto, de lado', 'supino-reto', 'lateral', 0.5], ['Supino reto, de cima', 'supino-reto', 'cima', 0.5], ['Supino reto, três quartos (vista que não é do app)', 'supino-reto', 'quina', 0.5],
  ['Goblet, de lado', 'goblet', 'lateral', 0.6], ['Goblet, de frente', 'goblet', 'frontal', 0.6], ['Goblet, três quartos (vista que não é do app)', 'goblet', 'quina', 0.6],
];
let html = `<!doctype html><meta charset="utf-8"><style>${css}
body{margin:0;padding:22px 24px;background:#fff;color:#171b20;font:14px/1.4 system-ui,sans-serif}h1{font-size:24px;margin:0 0 2px}p{margin:0 0 8px;color:#4d5661;max-width:1150px}
h2{font-size:15px;margin:14px 0 6px;border-top:2px solid #171b20;padding-top:6px}.l{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}figure{margin:0}figcaption{font-size:12px;color:#464b51;margin-top:2px}
.q{width:380px;height:285px;border-radius:10px;overflow:hidden;background:#f7f9fa}.q.esc{background:#10171b}.q svg,.q img{width:100%;height:100%;display:block}</style>
<h1>Equipamento das cenas: peças simples × o realismo dos cartões de hoje</h1><p>À esquerda, as peças simples do motor novo. No meio e à direita, o mesmo quadro com o equipamento desenhado pelo gerador dos 49 cartões de hoje (materiais em quatro tons, estofado com costura, cabeça sextavada, anilha com aro), com as medidas da tabela de objetos. É uma prova: banco reto, halteres e anilhas. Nada disto está no app.</p>`;
for (const [titulo, id, vista, frac] of LINHAS) html += `<h2>${titulo}</h2><div class="l">${cel('peças simples', svg(id, vista, frac, false))}${cel('realista', svg(id, vista, frac, true))}${cel('realista · tema escuro', svg(id, vista, frac, true, 'escuro'), true)}${cel('realista · cor de pele, músculos', svg(id, vista, frac, true, 'claro', 'pele', 'mus'))}</div>`;
html += `<h2>Para comparar: os cartões de hoje dessas peças</h2><div class="l">${['banco_reto', 'halteres_fixos', 'anilhas_e_manoplas'].map((h) => cel(`hoje · ${h}.svg`, `<img src="data:image/svg+xml;base64,${readFileSync(`public/equipamento/${h}.svg`).toString('base64')}">`)).join('')}</div>`;
const caminho = '/opt/pw-browsers/chromium';
const nav = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pg = await nav.newPage({ viewport: { width: 1640, height: 800 }, deviceScaleFactor: 2 });
pg.on('pageerror', (e) => console.log('erro:', String(e).slice(0, 300)));
await pg.setContent(html);
await pg.screenshot({ path: 'docs/revisoes/animacao-nova/prototipos/equipamento-realista.png', fullPage: true });
await nav.close();
console.log('equipamento-realista.png');
