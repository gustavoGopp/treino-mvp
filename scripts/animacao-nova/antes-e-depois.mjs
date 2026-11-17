// A imagem do antes e depois da animação nova, para o devlog: o guia de hoje (em cima) e o motor novo (embaixo), o
// mesmo exercício no mesmo ponto do movimento, no modo Técnica e no modo Músculos.
// Uso: node scripts/animacao-nova/antes-e-depois.mjs [saida.png] [id:vista ...]
import { build } from 'esbuild';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovo } from './empacotar.mjs';

const args = process.argv.slice(2);
const saida = args.find((a) => a.endsWith('.png')) ?? 'docs/revisoes/animacao-nova/antes-e-depois.png';
const pedidos = args.filter((a) => !a.endsWith('.png'));
const PARES = (pedidos.length ? pedidos : ['supino-reto:lateral', 'goblet:lateral', 'puxada-unilateral:quinaTras', 'stiff:lateral', 'flexao:lateral']).map((p) => p.split(':'));

const { modulo: m } = await motorNovo(`export * from './src/engine/novo/app.ts';`);
const corpo = m.CORPOS.homem;
const { outputFiles } = await build({
  stdin: { contents: `export * from './src/engine/index.ts'; export { montarSvgEstilo } from './src/engine/estilo/index.ts';`, resolveDir: process.cwd(), loader: 'ts' },
  bundle: true,
  format: 'esm',
  write: false,
});
mkdirSync('node_modules/.tmp', { recursive: true });
writeFileSync('node_modules/.tmp/motor-de-hoje-ad.mjs', outputFiles[0].text);
const hoje = await import(new URL('../../node_modules/.tmp/motor-de-hoje-ad.mjs', import.meta.url).href);
// o guia de hoje não tem as vistas de três quartos: a comparação usa a de frente ou a de trás
const VISTA_HOJE = { lateral: 'lateral', frontal: 'frontal', posterior: 'posterior', cima: 'top', quina: 'frontal', quinaTras: 'posterior' };

/** O fim da primeira fase com movimento, nos dois motores. */
function fim(id) {
  const fases = m.EXERCICIOS[id].ficha.fases;
  const i = fases.findIndex((f) => f.tipo !== 'pausa');
  const novo = fases.slice(0, i + 1).reduce((a, f) => a + f.dur, 0) - 0.001;
  const seq = hoje.EX.find((e) => e.id === id).seq,
    j = seq.findIndex((s) => s.kind !== 'hold');
  return { novo, velho: seq[j].t0 + seq[j].dur };
}
const svgHoje = (id, vista, modo, t) => {
  const q = hoje.montarSvgEstilo(
    hoje.EX.find((e) => e.id === id),
    VISTA_HOJE[vista],
    modo,
    t,
    0,
    300,
    'a2',
    false,
    {},
  );
  return `<svg class="${q.classe}" viewBox="${q.viewBox}" preserveAspectRatio="xMidYMid meet">${q.html}</svg>`;
};
const svgNovo = (id, vista, modo, t) => m.svgDaCena(m.EXERCICIOS[id], t, { corpo, vista, boneco: 'cinza', modo }, m.enquadrar(m.EXERCICIOS[id], { corpo, vista, boneco: 'cinza' }, 0.06, 4 / 3), 'claro');

const W = 300,
  H = 225;
const cel = (svg) => `<div class="q" style="width:${W}px;height:${H}px">${svg}</div>`;
const linha = (titulo, celas) => `<div class="l"><div class="t">${titulo}</div>${celas.join('')}</div>`;
const css = readFileSync('src/styles.css', 'utf8') + readFileSync('src/engine/novo/estilo.css', 'utf8') + m.cssDoBoneco();
const html = `<!doctype html><meta charset="utf-8"><style>${css}
body{margin:0;padding:18px;font:13px system-ui;background:#fff;color:#111;width:max-content}
h1{font-size:18px;margin:0 0 10px}
.l{display:flex;gap:10px;align-items:center;margin-bottom:10px}
.t{width:96px;font-weight:600;font-size:13px;line-height:1.3}
.q{background:#f7f9fb;border-radius:10px;overflow:hidden}
.q svg{width:100%;height:100%;display:block}
.n{display:flex;gap:10px;margin:0 0 6px 106px}.n div{width:${W}px;font-size:12px;color:#555}
</style><h1>O guia animado: hoje e o motor novo</h1>
<div class="n">${PARES.map(([id]) => `<div>${m.EXERCICIOS[id].ficha.nome}</div>`).join('')}</div>
${linha(
  'Hoje · Técnica',
  PARES.map(([id, v]) => cel(svgHoje(id, v, 'tec', fim(id).velho))),
)}
${linha(
  'Novo · Técnica',
  PARES.map(([id, v]) => cel(svgNovo(id, v, 'tec', fim(id).novo))),
)}
${linha(
  'Hoje · Músculos',
  PARES.map(([id, v]) => cel(svgHoje(id, v, 'mus', fim(id).velho))),
)}
${linha(
  'Novo · Músculos',
  PARES.map(([id, v]) => cel(svgNovo(id, v, 'mus', fim(id).novo))),
)}`;
const caminho = '/opt/pw-browsers/chromium';
const b = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pg = await b.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 2 });
await pg.setContent(html);
await (await pg.$('body')).screenshot({ path: saida });
await b.close();
console.log(saida);
