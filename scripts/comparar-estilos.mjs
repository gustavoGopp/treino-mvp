// R4 (experimento do boneco): grade de comparação dos estilos atual, A e B, lado a lado, nas mesmas fases.
// Uso:
//   node scripts/comparar-estilos.mjs                  → todas as grades em reports/r4/
//   node scripts/comparar-estilos.mjs <id> <vista>     → só uma (para conferir enquanto desenha)
// Gera: <id>-<vista>.png (celular: palco de 358 px, técnica e músculos, início/meio/fim)
//       miniaturas.png (o quadro do cartão do treino, 112 px, nos 3 estilos)
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const entrada = `export * from './src/engine/index.ts'; export * from './src/engine/estilo/index.ts';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const css = readFileSync('src/styles.css', 'utf8');
const SAIDA = 'reports/r4';
let PERTO = false; // enquadramento perto do corpo (grade extra da puxada de trás)
mkdirSync(SAIDA, { recursive: true });

// início, meio e fim do movimento: o meio da 1ª pausa, o meio da fase seguinte e o meio da 2ª pausa
function fases(ex) {
  const s = ex.seq;
  const meio = (g) => g.t0 + g.dur / 2;
  const pausas = s.filter((g) => g.kind === 'hold');
  const mov = s.find((g) => g.kind !== 'hold');
  return [
    ['início', meio(pausas[0] ?? s[0])],
    ['meio', meio(mov ?? s[1])],
    ['fim', meio(pausas[1] ?? s[2])],
  ];
}
const NOMES = { lateral: 'de lado', frontal: 'de frente', posterior: 'de trás', top: 'de cima' };
const svg = (ex, view, mode, t, estilo, largura, w, h) => {
  const q = M.montarSvgEstilo(ex, view, mode, t, 0, largura, estilo, PERTO);
  // ZOOM=x,y,w,h só para conferir o desenho de perto (não entra nas grades para o Gustavo)
  if (process.env.ZOOM) q.viewBox = process.env.ZOOM.replace(/,/g, ' ');
  return `<svg class="${q.classe}" viewBox="${q.viewBox}" style="width:${w}px;height:${h}px;display:block;background:var(--stage)">${q.html}</svg>`;
};
const estiloPagina = `<style>${css}body{background:#fff;color:#14202a;font:13px var(--font-b);margin:10px}h1{font-size:17px;margin:0 0 6px}
h2{font-size:14px;margin:12px 0 4px}.g{display:grid;gap:6px;align-items:start}.c{font-size:12px;font-weight:600;text-align:center}
.r{font-size:12px;font-weight:600;writing-mode:vertical-rl;transform:rotate(180deg);text-align:center}figure{margin:0}figcaption{font-size:11px;color:#566673;padding:1px 2px}</style>`;

async function foto(html, arquivo, largura) {
  writeFileSync('/tmp/r4-grade.html', html);
  const { chromium } = createRequire(import.meta.url)('playwright');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: largura, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file:///tmp/r4-grade.html');
  await p.screenshot({ path: arquivo, fullPage: true });
  await b.close();
  console.log('grade:', arquivo);
}

async function grade(id, view, perto = false) {
  PERTO = perto;
  const ex = M.EX.find((e) => e.id === id);
  const F = fases(ex);
  let html = `${estiloPagina}<h1>${id}, vista ${NOMES[view] ?? view}: atual × A × B${perto ? ' (enquadramento perto do corpo)' : ''}</h1>`;
  for (const [mode, nome] of [['tec', 'Técnica'], ['mus', 'Músculos']]) {
    html += `<h2>${nome}</h2><div class="g" style="grid-template-columns:18px repeat(3,358px)"><div></div>`;
    html += F.map(([f]) => `<div class="c">${f}</div>`).join('');
    for (const e of M.ESTILOS) {
      html += `<div class="r">${M.NOMES_ESTILO[e]}</div>`;
      html += F.map(([, t]) => svg(ex, view, mode, t, e, 358, 358, 268)).join('');
    }
    html += '</div>';
  }
  await foto(html, `${SAIDA}/${id}-${view}${perto ? '-perto' : ''}.png`, 1130);
  PERTO = false;
}

async function miniaturas() {
  // o mesmo quadro de src/features/programa/Miniatura.tsx: vista principal, modo músculos, meio da 2ª pausa
  const instante = (ex) => { let t = 0; const p = []; for (const s of ex.seq) { if (s.kind === 'hold') p.push(t + s.dur / 2); t += s.dur; } return p[1] ?? t / 2; };
  let html = `${estiloPagina}<h1>Miniatura do cartão do treino (112 px)</h1><div class="g" style="grid-template-columns:repeat(3,120px)">`;
  for (const id of M.EXERCICIOS_R4) {
    const ex = M.EX.find((e) => e.id === id);
    for (const e of M.ESTILOS) html += `<figure>${svg(ex, ex.views[0], 'mus', instante(ex), e, 120, 112, 84).replace('display:block', 'display:block;border-radius:10px')}<figcaption>${M.NOMES_ESTILO[e]}</figcaption></figure>`;
  }
  html += '</div>';
  await foto(html, `${SAIDA}/miniaturas.png`, 400);
}

const [id, view, perto] = process.argv.slice(2);
if (id) await grade(id, view ?? M.EX.find((e) => e.id === id).views[0], perto === 'perto');
else {
  for (const i of M.EXERCICIOS_R4) for (const v of M.EX.find((e) => e.id === i).views) await grade(i, v);
  await grade('puxada-unilateral', 'posterior', true);
  await miniaturas();
}
