// Confere o Boneco do motor novo contra o desenho aprovado (docs/revisoes/boneco-desenho/final/prancha-*.png).
// Para cada pose das pranchas, desenha lado a lado, no mesmo quadro e no mesmo tamanho (1,5 px por cm):
//   o aprovado (scripts/boneco-desenho/figura.mjs) | o do motor (src/engine/novo/boneco.ts) | a diferença
// e mede quanto as duas silhuetas coincidem. Na diferença: cinza = igual, vermelho = só no aprovado, azul = só no motor.
// Uso: node scripts/animacao-nova/conferir-desenho.mjs [cinza|pele] [saida.png]
import { existsSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { CINZA, PELE, naEscala } from '../boneco-desenho/estilos-finais.mjs';
import { figura, zerarFigura } from '../boneco-desenho/figura.mjs';
import { pontos } from '../boneco-desenho/poses.mjs';
import { zerarIds } from '../boneco-desenho/tinta.mjs';
import { motorNovo } from './empacotar.mjs';

const { modulo: m } = await motorNovo();
const corpo = m.CORPOS.homem;
const idEstilo = process.argv[2] === 'pele' ? 'pele' : 'cinza';
const saida = process.argv[3] ?? `docs/revisoes/animacao-nova/prototipos/conferencia-do-desenho-${idEstilo}.png`;
const ESC = 1.5;
const estilo = idEstilo === 'pele' ? PELE : CINZA;
const FUNDO = '#f7f9fa';

// o aprovado afasta os braços pendurados em 6° no próprio desenho; o motor faz isso na pose
const emPeReto = m.resolver(corpo, m.poseEmPe(corpo));
const emPe = m.resolver(corpo, m.poseEmPe(corpo, 6));
const PAPEL = {
  costas: { dorsal: 'p', biceps: 's', deltoide: 's', trapezio: 's' },
  agach: { quadriceps: 'p', gluteo: 's' },
  flex: { peitoral: 'p', triceps: 's', deltoide: 's', abdomen: 'a' },
  supino: { peitoral: 'p', triceps: 's', deltoide: 's' },
  puxada: { dorsal: 'p', biceps: 's', deltoide: 's', trapezio: 's' },
};
/** [nome, título, esqueleto (ou [o do aprovado, o do motor]), vista do motor, vista do desenho aprovado, caixa em cm, opções do aprovado, papéis] */
const CELAS = [
  ['frente', 'Em pé, de frente', [emPeReto, emPe], 'frontal', 'frente', [-43, -8, 86, 196], {}, null],
  ['lado', 'De lado', [emPeReto, emPe], 'lateral', 'lado', [-43, -8, 86, 196], {}, null],
  ['costas', 'De costas, com o músculo', [emPeReto, emPe], 'posterior', 'costas', [-43, -8, 86, 196], {}, PAPEL.costas],
  ['agach', 'Agachamento', m.goblet.quadro(corpo, 1).esq, 'lateral', 'lado', [-52, -8, 100, 138], { pegada: true }, PAPEL.agach],
  ['flex', 'Flexão', m.flexao.quadro(corpo, 1).esq, 'lateral', 'lado', [-16, -8, 200, 72], { maoNoChao: true }, PAPEL.flex],
  ['supino', 'Supino', m.supinoReto.quadro(corpo, 1).esq, 'lateral', 'lado', [-84, -8, 180, 104], { pegada: true }, PAPEL.supino],
  ['puxada', 'Ajoelhado, puxando o cabo', m.puxadaUnilateral.quadro(corpo, 1).esq, 'lateral', 'lado', [-72, -8, 132, 180], { pegada: true }, PAPEL.puxada],
];

// na página o traço é fixo em pixels; aqui o desenho vira imagem, então o traço é passado para cm (1,5 px por cm)
const css = m.cssDoBoneco().replace(/stroke-width:([\d.]+)px/g, (_, n) => `stroke-width:${Number(n) / ESC}px`).replaceAll('vector-effect:non-scaling-stroke', 'vector-effect:none').replace(/stroke-dasharray:3 2/g, 'stroke-dasharray:1.4 1.1');
const LISTRAS = m.DEFS_DO_BONECO;
function svgs([, , esqs, vista, vistaAp, [x0, y0, w, h], op, papeis]) {
  const [esqAp, esq] = Array.isArray(esqs) ? esqs : [esqs, esqs];
  zerarIds();
  zerarFigura();
  const cab = `xmlns="http://www.w3.org/2000/svg" width="${w * ESC}" height="${h * ESC}" viewBox="${x0} ${-(y0 + h)} ${w} ${h}"`;
  // o aprovado espelha a vista de costas a partir da pose de frente; o motor olha de trás de verdade
  const aprovado = `<svg ${cab}><rect x="${x0}" y="${-(y0 + h)}" width="${w}" height="${h}" fill="${FUNDO}"/><g transform="scale(1 -1)">${figura(pontos(esqAp, vistaAp === 'lado' ? 'lateral' : 'frontal'), vistaAp, naEscala(estilo, ESC), { tema: 'claro', papeis, ...op })}</g></svg>`;
  const itens = m.desenharBoneco(esq, m.VISTAS[vista], { estilo: idEstilo, papeis: papeis ?? undefined });
  const motor = `<svg ${cab} class="boneco ${idEstilo}"><style>${css}</style>${LISTRAS}<rect x="${x0}" y="${-(y0 + h)}" width="${w}" height="${h}" fill="${FUNDO}"/>${m.pintar(itens)}</svg>`;
  return { aprovado, motor };
}

const celas = CELAS.map((c) => ({ nome: c[0], titulo: c[1], w: c[5][2] * ESC, h: c[5][3] * ESC, ...svgs(c) }));
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:18px 20px;background:#fff;color:#171b20;font:14px/1.4 system-ui,sans-serif}h1{font-size:22px;margin:0 0 4px}p{margin:0 0 12px;color:#4d5661;max-width:1100px}
.l{display:flex;gap:10px;align-items:flex-end;margin:0 0 16px;flex-wrap:wrap}.c{font-size:12px;color:#464b51}.c canvas,.c svg{display:block;border-radius:10px;margin-top:3px}h2{font-size:15px;margin:10px 0 4px;border-top:2px solid #171b20;padding-top:6px}</style>
<h1>Conferência do desenho · ${estilo.nome}</h1><p>O aprovado, o do motor novo e a diferença das silhuetas, no mesmo quadro (1,5 px por cm). Cinza = igual; vermelho = só no aprovado; azul = só no motor.</p><div id="r"></div>`;

const caminho = '/opt/pw-browsers/chromium';
const nav = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pag = await nav.newPage({ viewport: { width: 1500, height: 900 }, deviceScaleFactor: 2 });
pag.on('pageerror', (e) => console.log('erro:', String(e).slice(0, 300)));
await pag.setContent(html);
const medidas = await pag.evaluate(async ({ celas, FUNDO }) => {
  const K = 2; // pixels por px de CSS na comparação
  const imagem = (svg) => new Promise((ok, erro) => {
    const im = new Image();
    im.onload = () => ok(im);
    im.onerror = () => erro(new Error('svg não carregou'));
    im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const fundo = [parseInt(FUNDO.slice(1, 3), 16), parseInt(FUNDO.slice(3, 5), 16), parseInt(FUNDO.slice(5, 7), 16)];
  const out = {};
  for (const c of celas) {
    const W = Math.round(c.w * K), H = Math.round(c.h * K);
    const tela = async (svg) => {
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H; cv.style.width = c.w + 'px'; cv.style.height = c.h + 'px';
      const g = cv.getContext('2d');
      g.drawImage(await imagem(svg), 0, 0, W, H);
      return cv;
    };
    const a = await tela(c.aprovado), b = await tela(c.motor);
    const da = a.getContext('2d').getImageData(0, 0, W, H).data, db = b.getContext('2d').getImageData(0, 0, W, H).data;
    const dif = document.createElement('canvas');
    dif.width = W; dif.height = H; dif.style.width = c.w + 'px'; dif.style.height = c.h + 'px';
    const gd = dif.getContext('2d'), id = gd.createImageData(W, H);
    const dentro = (d, i) => Math.abs(d[i] - fundo[0]) + Math.abs(d[i + 1] - fundo[1]) + Math.abs(d[i + 2] - fundo[2]) > 24;
    let ambos = 0, soA = 0, soB = 0;
    for (let i = 0; i < W * H * 4; i += 4) {
      const x = dentro(da, i), y = dentro(db, i);
      const cor = x && y ? [205, 211, 216] : x ? [214, 46, 38] : y ? [38, 110, 214] : [247, 249, 250];
      if (x && y) ambos++; else if (x) soA++; else if (y) soB++;
      id.data[i] = cor[0]; id.data[i + 1] = cor[1]; id.data[i + 2] = cor[2]; id.data[i + 3] = 255;
    }
    gd.putImageData(id, 0, 0);
    const igual = ambos / (ambos + soA + soB);
    out[c.nome] = { igual: Math.round(igual * 1000) / 10, soNoAprovadoCm2: Math.round(soA / (K * 1.5) ** 2), soNoMotorCm2: Math.round(soB / (K * 1.5) ** 2) };
    const lin = document.createElement('div');
    lin.innerHTML = `<h2>${c.titulo}: ${String(out[c.nome].igual).replace('.', ',')}% igual</h2>`;
    const l = document.createElement('div');
    l.className = 'l';
    for (const [t, el] of [['Aprovado', a], ['Motor novo', b], ['Diferença', dif]]) {
      const d = document.createElement('div');
      d.className = 'c';
      d.textContent = t;
      d.appendChild(el);
      l.appendChild(d);
    }
    lin.appendChild(l);
    document.getElementById('r').appendChild(lin);
  }
  return out;
}, { celas, FUNDO });
await pag.screenshot({ path: saida, fullPage: true });
await nav.close();
writeFileSync(saida.replace(/\.png$/, '.json'), JSON.stringify(medidas, null, 1) + '\n');
console.log(JSON.stringify(medidas));
