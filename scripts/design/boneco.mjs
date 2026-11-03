// Revisão de design (03/11/2026), parte A: o Boneco (estilo A) nos exercícios com animação mais prescritos.
// Para cada um: cada vista, Técnica nas fases do movimento e Músculos no tamanho do palco do celular (360 px) e da
// miniatura do cartão (112 px), mais o mesmo quadro visto por quem tem daltonismo vermelho-verde (simulação
// de deuteranopia, Machado 2009). Mede também a área de cada músculo na tela e a fração do principal por vista
// (a conta de vistaDaMiniatura) e quanto da altura do palco o corpo ocupa (o resto é equipamento e chão). Só lê o motor: não muda nenhum desenho.
// Uso: node scripts/design/boneco.mjs [--raiz=<pasta de outra versão do app>] [--saida=<pasta>] [--so-medidas]
// Saída: imagens em reports/design/boneco/ (fora do git) e números em docs/revisoes/design/boneco-medidas.json.
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';

const arg = (n, d) => process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d;
const raiz = resolve(arg('raiz', '.'));
const saidaImg = arg('saida', 'reports/design/boneco');
const soMedidas = process.argv.includes('--so-medidas');
const arquivoMedidas = arg('medidas', 'docs/revisoes/design/boneco-medidas.json');

const entrada = `export * from './src/engine/index.ts'; export { prep } from './src/engine/cena.ts';
export * from './src/engine/estilo/index.ts'; export { FORMAS, listaDe, medida } from './src/engine/estilo/musculos.ts';
export { corpoNovo } from './src/engine/estilo/corpo.ts'; export { caixa } from './src/engine/svg.ts';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: raiz, loader: 'ts' }, bundle: true, format: 'esm', write: false, logLevel: 'silent' });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));

// os exercícios com animação, do mais prescrito ao menos (frequência do teste de estresse da auditoria)
const inv = readFileSync('docs/revisoes/auditoria/inventario.md', 'utf8');
const freq = new Map();
for (const l of inv.split('\n')) {
  const m = l.match(/^\| \d+ \| .*?`([a-z0-9-]+)` \|.*\| (animação|cartão de texto|\*\*nada\*\*) \|.*?\| ([\d.]+) \| ([\d.]+) \|/);
  if (m) freq.set(m[1], { guia: m[2], vaga: Number(m[3].replace(/\./g, '')) });
}
const ids = [...freq.entries()].filter(([id, f]) => f.guia === 'animação' && M.EX.some((e) => e.id === id)).sort((a, b) => b[1].vaga - a[1].vaga).map(([id]) => id);
const EXTRA = ['puxada-unilateral', 'face-pull', 'desenvolvimento', 'elevacao-lateral']; // o Diário do R3 e as correções da anatomia
const lista = [...ids.slice(0, 15), ...EXTRA.filter((x) => !ids.slice(0, 15).includes(x))];

// mesmo instante da miniatura do cartão (src/features/programa/Miniatura.tsx)
function instante(ex) {
  let t = 0;
  const p = [];
  for (const s of ex.seq) {
    if (s.kind === 'hold') p.push(t + s.dur / 2);
    t += s.dur;
  }
  return p[1] ?? t / 2;
}
const areaPol = (Q) => Math.abs(Q.reduce((s, q, i) => { const r = Q[(i + 1) % Q.length]; return s + q[0] * r[1] - r[0] * q[1]; }, 0)) / 2;

// altura do corpo (cabeça aos pés, no instante mais alto do ciclo) em % da altura do palco
function corpoPct(ex, v, box) {
  const PJ = M.VIEWS[v].proj;
  let y0 = 1e9, y1 = -1e9, x0 = 1e9, x1 = -1e9;
  for (let i = 0; i < 24; i++) {
    const sk = M.skel(M.poseAt(ex, ex.K, (i / 24) * ex.T));
    const pts = [sk.P, sk.M, sk.N, sk.Hc];
    for (const k of ['R', 'L']) { const d = sk.side[k]; pts.push(d.S, d.E, d.W, d.G, d.Hp, d.K, d.A, d.heel, d.toe); }
    for (const p of pts) { const q = PJ(p); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); }
  }
  return Math.round(Math.max((y1 - y0 + 24) / box[3], (x1 - x0 + 18) / box[2]) * 100);
}

// área de cada músculo visível, em px do palco de 360 px de largura (e da miniatura de 112)
function areas(ex, view, t) {
  M.montarSvgEstilo(ex, view, 'mus', t, 0, 360, 'a'); // prepara CTX na vista certa
  const box = M.caixa(ex, view);
  const esc = 360 / box[2];
  const sk = M.skel(M.poseAt(ex, ex.K, t));
  const out = [];
  for (const [id, lados, tipo] of M.listaDe(ex))
    for (const k of lados === 'RL' ? ['R', 'L'] : [lados]) {
      const m = M.FORMAS[id](sk, k === 'C' ? 'R' : k);
      if (m.n && M.CTX.PJ(m.n)[2] < -0.25) continue;
      const Q = m.q ?? m.p.map(M.CTX.PJ);
      out.push({ musculo: id, lado: k, tipo, px2Palco: Math.round(areaPol(Q) * esc * esc), px2Miniatura: Math.round(areaPol(Q) * esc * esc * (112 / 360) ** 2) });
    }
  return out;
}

const medidas = [];
for (const id of lista) {
  const ex = M.EX.find((e) => e.id === id);
  const t = instante(ex);
  const vistaMini = M.vistaDaMiniatura(ex, t, 'a');
  const vistas = ex.views.map((v) => {
    M.montarSvgEstilo(ex, v, 'mus', t, 0, 120, 'a');
    // fração do palco ocupada pelos principais (a mesma conta de vistaDaMiniatura)
    M.cenaEstilo(ex, v, 'mus', t, 'a');
    const b = M.caixa(ex, v);
        return { vista: v, corpoNoPalcoPct: corpoPct(ex, v, b), fracaoPrincipal: Math.round((M.medida.areaPrincipal / (b[2] * b[3])) * 10000) / 100, musculos: areas(ex, v, t) };
  });
  medidas.push({ id, vaga: freq.get(id)?.vaga ?? null, vistaDaMiniatura: vistaMini, vistas });
}
mkdirSync(join(arquivoMedidas, '..'), { recursive: true });
writeFileSync(arquivoMedidas, JSON.stringify({ raiz: raiz === resolve('.') ? '.' : 'outra versão', medidas }, null, 1) + '\n');
console.log('medidas:', arquivoMedidas);
if (soMedidas) process.exit(0);

// --- folhas: uma por exercício
const css = readFileSync('src/styles.css', 'utf8');
// matriz de deuteranopia (Machado, Oliveira e Fernandes 2009, severidade 1.0), aplicada como filtro SVG
const deut = '0.367322 0.860646 -0.227968 0 0  0.280085 0.672501 0.047413 0 0  -0.011820 0.042940 0.968881 0 0  0 0 0 1 0';
const svg = (q, w, filtro = '') => `<svg class="${q.classe}" viewBox="${q.viewBox}" style="width:${w}px;height:${(w * 3) / 4}px${filtro ? ';filter:url(#deut)' : ''}">${q.html}</svg>`;
const quadro = (q, w, rot, filtro) => `<figure style="width:${w}px">${svg(q, w, filtro)}<figcaption>${rot}</figcaption></figure>`;
mkdirSync(saidaImg, { recursive: true });
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch();
for (const tema of ['light', 'dark']) {
  const p = await b.newPage({ viewport: { width: 1200, height: 800 }, colorScheme: tema, deviceScaleFactor: 1 });
  for (const id of lista) {
    const ex = M.EX.find((e) => e.id === id);
    const t = instante(ex);
    const tempos = ex.seq.map((g) => ({ t: g.t0 + (g.kind === 'hold' ? g.dur / 2 : g.dur * 0.5), rot: g.label }));
    const vm = M.vistaDaMiniatura(ex, t, 'a');
    let html = `<style>${css}body{background:var(--bg);color:var(--ink);font:13px sans-serif;margin:12px}h1{font-size:18px;margin:0 0 4px}h2{font-size:14px;margin:12px 0 4px}.l{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}figure{margin:0;background:var(--stage);border:1px solid var(--line);border-radius:6px;overflow:hidden}figure svg{display:block}figcaption{padding:2px 6px;font-size:11px;color:var(--muted)}</style>`;
    html += `<svg width="0" height="0" style="position:absolute"><filter id="deut"><feColorMatrix type="matrix" values="${deut}"/></filter></svg>`;
    html += `<h1>${id} · Boneco · ${tema === 'light' ? 'tema claro' : 'tema escuro'}</h1>`;
    for (const v of ex.views) {
      html += `<h2>${v}${v === vm ? ' (vista da miniatura)' : ''}</h2><div class="l">`;
      html += tempos.slice(0, 4).map(({ t: tt, rot }) => quadro(M.montarSvgEstilo(ex, v, 'tec', tt, 0, 360, 'a'), 260, `técnica · ${rot}`)).join('');
      html += `</div><div class="l" style="margin-top:6px">`;
      html += quadro(M.montarSvgEstilo(ex, v, 'mus', t, 0, 360, 'a'), 360, 'músculos · palco (360 px)');
      html += quadro(M.montarSvgEstilo(ex, v, 'mus', t, 0, 360, 'a'), 360, 'o mesmo, simulando daltonismo vermelho-verde', true);
      html += quadro(M.montarSvgEstilo(ex, v, 'mus', t, 0, 120, 'a'), 112, 'miniatura (112 px)');
      html += '</div>';
    }
    await p.setContent(html);
    await p.screenshot({ path: `${saidaImg}/${id}-${tema === 'light' ? 'claro' : 'escuro'}.png`, fullPage: true });
  }
  await p.close();
}
await b.close();
console.log('folhas:', saidaImg, lista.length, 'exercícios');
