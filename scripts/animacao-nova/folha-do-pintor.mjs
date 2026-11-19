// A folha de antes e depois do pintor por pares (etapa 2 do estudo do pintor: ligar animação por animação). Para cada
// animação pedida, uma imagem em docs/revisoes/animacao-nova/pintor-por-pares/<id>.png, para o Gustavo aprovar antes
// de a animação entrar em src/engine/novo/pintor-ligado.ts:
// - em cima, a área pintada do jeito errado, hoje e com o pintor por pares, pela conferência da pintura
//   (src/engine/novo/conferir-pintura.ts, nos quadros de sempre: seis do ciclo e três de cada erro, em cada vista);
// - as vistas declaradas do exercício, no começo, no meio e no fim do movimento (u = 0, 0,5 e 1), hoje e por pares;
// - cada erro em que o desenho muda: o quadro do erro (u = 0, 0,5 ou 1, numa das vistas dele) em que mais muda.
// Em cada par, quanto da figura muda (pixels com algum canal mais de 8 em 255 diferente, desenhados a 480 × 360) e os
// achados da conferência naquele quadro, hoje e depois. Desenho cinza, tema claro. Não muda nada do app.
//
// Uso: node scripts/animacao-nova/folha-do-pintor.mjs <ids...>
//      node scripts/animacao-nova/folha-do-pintor.mjs --piores <n>   (as n animações com mais área pintada errada hoje)
//      --resumo <arquivo.png>: também a folha-resumo de um lote, numa página só (etapa 2, 19/11/2026): de cada animação,
//      o pior quadro da folha (o de mais área pintada errada hoje; empate, o que mais muda), hoje × por pares.
import { build } from 'esbuild';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

let args = process.argv.slice(2);
let arqResumo = null;
if (args.includes('--resumo')) {
  const i = args.indexOf('--resumo');
  arqResumo = args[i + 1];
  args = [...args.slice(0, i), ...args.slice(i + 2)];
}
const resumo = [];
const TMP = 'node_modules/.tmp/folha-do-pintor';
mkdirSync(TMP, { recursive: true });
const { outputFiles } = await build({
  stdin: { contents: `export * from './src/engine/novo/index.ts'; export * as PP from './src/engine/novo/pintor-por-pares.ts';`, resolveDir: process.cwd(), loader: 'ts' },
  bundle: true,
  format: 'esm',
  write: false,
  loader: { '.json': 'json' },
});
const arqMotor = `${TMP}/motor-${process.pid}.mjs`;
(await import('node:fs')).writeFileSync(arqMotor, outputFiles[0].text);
const m = await import(pathToFileURL(resolve(arqMotor)).href);
const corpo = m.CORPOS.homem;
const PINTOR = { ordenar: (it) => m.PP.ordenarPorPares(it), remendoDe: m.PP.remendoDe };

/** Os achados da conferência num quadro e numa vista, hoje e por pares (fora o que vai para trás de propósito). */
const achados = (q, vista, onde, id, pares) => m.pinturaDoQuadro(q, vista, onde, `folha-${id}-`, false, pares ? PINTOR : undefined).filter((a) => !a.deProposito);
/** O instante t do ciclo em que o quadro u aparece no app. */
function tempoDe(ex, u) {
  const T = m.duracao(ex.ficha.fases);
  let melhor = 0,
    dif = 1e9;
  for (let i = 0; i <= 2000; i++) {
    const t = (i / 2000) * T;
    const d = Math.abs(m.instante(ex.ficha.fases, t).u - u);
    if (d < dif - 1e-9) [melhor, dif] = [t, d];
  }
  return melhor;
}
const somaArea = (l) => l.reduce((s, a) => s + a.area, 0);
const cm2 = (x) => `${Math.round(x).toLocaleString('pt-BR')} cm²`;

let ids = args;
if (args[0] === '--piores') {
  // as animações com mais área pintada errada hoje (a conferência de sempre)
  const n = Number(args[1] ?? 6);
  const area = [];
  for (const id of Object.keys(m.EXERCICIOS).sort()) {
    const ex = m.EXERCICIOS[id];
    let a = 0;
    for (const { q, onde, vistas } of m.quadrosMedidos(ex, corpo)) for (const v of vistas) a += somaArea(achados(q, v, onde, id, false));
    area.push({ id, a });
  }
  ids = area
    .sort((x, y) => y.a - x.a)
    .slice(0, n)
    .map((x) => x.id);
  console.log('as piores hoje:', area.slice(0, n).map((x) => `${x.id} (${cm2(x.a)})`).join(', '));
}

const css = readFileSync('src/engine/novo/estilo.css', 'utf8') + m.cssDoBoneco();
const comEstilo = (s) => s.replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" `).replace(/(<svg[^>]*>)/, `$1<style>${css}</style>`);
const caminho = '/opt/pw-browsers/chromium';
const nav = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pg = await nav.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
/**
 * Quanto da figura muda de um SVG para o outro (fração dos pixels que não são fundo), desenhados a 480 × 360, e a
 * imagem do que muda: o desenho por pares, apagado, com os pixels que mudam em magenta.
 */
const fracaoQueMuda = async (a, b) => {
  if (a === b) return { f: 0 };
  const r = await pg.evaluate(
    async ([a, b]) => {
      const img = async (s) => {
        const im = new Image();
        im.src = URL.createObjectURL(new Blob([s], { type: 'image/svg+xml' }));
        await im.decode();
        const tela = Object.assign(document.createElement('canvas'), { width: 480, height: 360 });
        const x = tela.getContext('2d', { willReadFrequently: true });
        x.clearRect(0, 0, 480, 360);
        x.drawImage(im, 0, 0, 480, 360);
        URL.revokeObjectURL(im.src);
        return x.getImageData(0, 0, 480, 360).data;
      };
      const [A, B] = [await img(a), await img(b)];
      let muda = 0,
        figura = 0;
      const tela = Object.assign(document.createElement('canvas'), { width: 480, height: 360 });
      const x = tela.getContext('2d');
      const D = x.createImageData(480, 360);
      for (let i = 0; i < A.length; i += 4) {
        if (Math.abs(A[i] - 247) + Math.abs(A[i + 1] - 249) + Math.abs(A[i + 2] - 250) > 12) figura++;
        const m = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2])) > 8;
        if (m) muda++;
        const c = m ? [255, 0, 170] : [B[i] * 0.3 + 255 * 0.7, B[i + 1] * 0.3 + 255 * 0.7, B[i + 2] * 0.3 + 255 * 0.7];
        D.data.set([c[0], c[1], c[2], 255], i);
      }
      x.putImageData(D, 0, 0);
      return { muda, figura, url: tela.toDataURL('image/png') };
    },
    [comEstilo(a), comEstilo(b)],
  );
  return { f: r.muda / Math.max(1, r.figura), url: r.url };
};
const pc = (f) => (f === 0 ? 'igual' : `muda ${(100 * f).toFixed(f < 0.001 ? 2 : 1).replace('.', ',')}% da figura`);

const pasta = 'docs/revisoes/animacao-nova/pintor-por-pares';
mkdirSync(pasta, { recursive: true });
for (const id of ids) {
  const ex = m.EXERCICIOS[id];
  if (!ex) throw new Error(`animação desconhecida: ${id}`);
  const F = ex.ficha;
  // a conferência inteira, hoje e por pares
  let [nA, nD, aA, aD] = [0, 0, 0, 0];
  for (const { q, onde, vistas } of m.quadrosMedidos(ex, corpo))
    for (const v of vistas) {
      const [x, y] = [achados(q, v, onde, id, false), achados(q, v, onde, id, true)];
      nA += x.length;
      nD += y.length;
      aA += somaArea(x);
      aD += somaArea(y);
    }
  /** Um par (hoje, por pares) de um quadro. */
  const par = async (vista, u, erro) => {
    const t = tempoDe(ex, u);
    const o = { corpo, vista, boneco: 'cinza', modo: erro ? 'err' : 'tec', erro };
    const vb = m.enquadrar(ex, { corpo, vista, boneco: 'cinza' });
    const a = m.svgDaCena(ex, t, { ...o, pintor: 'hoje' }, vb),
      b = m.svgDaCena(ex, t, { ...o, pintor: 'pares' }, vb);
    const q = ex.quadro(corpo, u, erro);
    const [x, y] = [achados(q, vista, '', id, false), achados(q, vista, '', id, true)];
    return { vista, u, erro, a, b, ...(await fracaoQueMuda(a, b)), antes: x, depois: y };
  };
  const linhas = [];
  for (const vista of ex.vistas) {
    const pares = [];
    for (const u of [0, 0.5, 1]) pares.push(await par(vista, u));
    linhas.push({ titulo: `${m.VISTAS[vista].nome}`, pares, rotulo: (p) => ({ 0: 'começo', 0.5: 'meio', 1: 'fim' })[p.u] });
  }
  for (const er of F.erros) {
    let pior = null;
    for (const vista of new Set([...ex.vistas, er.vista]))
      for (const u of [0, 0.5, 1]) {
        const p = await par(vista, u, er.id);
        if (p.f > 0 && (!pior || p.f > pior.f)) pior = p;
      }
    if (pior) linhas.push({ titulo: `Erro "${er.titulo}"`, pares: [pior], rotulo: (p) => `${m.VISTAS[p.vista].nome.toLowerCase()}, u = ${String(p.u).replace('.', ',')}` });
  }
  const errosIguais = F.erros.length - linhas.filter((l) => l.titulo.startsWith('Erro')).length;
  const ach = (l) => (l.length ? `${l.length} achado${l.length > 1 ? 's' : ''}, ${somaArea(l).toFixed(1).replace('.', ',')} cm²` : 'sem achado');
  const W = 300,
    H = 225;
  const dif = (p) => (p.url ? `<figure><img class="q" src="${p.url}"><figcaption><b>o que muda</b>, em magenta</figcaption></figure>` : '');
  const fig = (p, qual) => `<figure><div class="q">${(qual === 'a' ? p.a : p.b).replace('<svg ', `<svg style="width:${W}px;height:${H}px" `)}</div><figcaption>${qual === 'a' ? `<b>hoje</b>: ${ach(p.antes)}` : `<b>por pares</b>: ${ach(p.depois)}`}</figcaption></figure>`;
  const html = `<!doctype html><meta charset="utf-8"><style>${css}
body{margin:16px;font:14px system-ui,sans-serif;background:#fff;color:#1d2024;width:${6 * (W + 8) + 80}px}
h1{font-size:20px;margin:0 0 4px}.topo{font-size:16px;margin:0 0 4px}.nota{color:#555;margin:0 0 14px}
h2{font-size:15px;margin:14px 0 6px}.l{display:flex;gap:12px;flex-wrap:wrap}.par{border:1px solid #d7dde2;border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px}
.par>.t{font-weight:600}.par>.m{color:#555}.par .figs{display:flex;gap:6px}.par.muda{border-color:#c2410c}figure{margin:0}figcaption{font-size:12px;color:#333}
.q{border-radius:6px;overflow:hidden;width:${W}px;height:${H}px}</style>
<h1>${id}: hoje × pintor por pares</h1>
<p class="topo">Área pintada do jeito errado (conferência da pintura, ${m.quadrosMedidos(ex, corpo).length} quadros em cada vista): <b>hoje ${cm2(aA)}</b> (${nA} achados) → <b>por pares ${cm2(aD)}</b> (${nD} achados).</p>
<p class="nota">Desenho cinza, tema claro. Em cada quadro, o de hoje, o por pares e, quando muda, o que muda (em magenta, sobre o por pares apagado); borda laranja = o desenho muda. Embaixo de cada desenho, os achados da conferência naquele quadro. ${errosIguais ? `${errosIguais} de ${F.erros.length} erros não mudam em nenhum quadro conferido (u = 0, 0,5 e 1).` : ''}</p>
${linhas.map((l) => `<h2>${l.titulo}</h2><div class="l">${l.pares.map((p) => `<div class="par${p.f ? ' muda' : ''}"><div class="t">${l.rotulo(p)}</div><div class="figs">${fig(p, 'a')}${fig(p, 'b')}${dif(p)}</div><div class="m">${pc(p.f)}</div></div>`).join('')}</div>`).join('')}`;
  await pg.setContent(html);
  const arq = `${pasta}/${id}.png`;
  await pg.screenshot({ path: arq, fullPage: true });
  // para a folha-resumo: o pior quadro desta folha, e quanto muda o quadro que mais muda
  const todos = linhas.flatMap((l) => l.pares.map((p) => ({ ...p, titulo: l.titulo, rot: l.rotulo(p) })));
  const pior = todos.reduce((a, p) => (somaArea(p.antes) > somaArea(a.antes) + 1e-9 || (Math.abs(somaArea(p.antes) - somaArea(a.antes)) <= 1e-9 && p.f > a.f) ? p : a));
  resumo.push({ id, aA, aD, nA, nD, pior, maisMuda: Math.max(...todos.map((p) => p.f)), muda: todos.filter((p) => p.f > 0).length, quadros: todos.length });
  console.log(`${arq}: hoje ${cm2(aA)} (${nA} achados) → por pares ${cm2(aD)} (${nD} achados); muda ${todos.filter((p) => p.f > 0).length} de ${todos.length} quadros da folha, até ${pc(Math.max(...todos.map((p) => p.f)))}`);
}
if (arqResumo) {
  const W = 300,
    H = 225;
  const ach = (l) => (l.length ? `${l.length} achado${l.length > 1 ? 's' : ''}, ${somaArea(l).toFixed(1).replace('.', ',')} cm²` : 'sem achado');
  const svg = (s) => `<div class="q">${s.replace('<svg ', `<svg style="width:${W}px;height:${H}px" `)}</div>`;
  const html = `<!doctype html><meta charset="utf-8"><style>${css}
body{margin:16px;font:14px system-ui,sans-serif;background:#fff;color:#1d2024;width:${3 * (W + 8) + 330}px}
h1{font-size:20px;margin:0 0 4px}.nota{color:#555;margin:0 0 12px}
.l{display:flex;gap:10px;align-items:flex-start;border-top:1px solid #d7dde2;padding:8px 0}.t{width:300px;font-size:13px}.t b{font-size:15px}
figure{margin:0}figcaption{font-size:12px;color:#333}.q{border-radius:6px;overflow:hidden;width:${W}px;height:${H}px}</style>
<h1>Pintor por pares, ${resumo.length} animações: o pior quadro de cada uma</h1>
<p class="nota">Em cada linha, o quadro da folha (u = 0, 0,5 e 1, em cada vista e no pior quadro de cada erro) com mais área pintada do jeito errado hoje: o de hoje, o por pares e o que muda (em magenta). À esquerda, a conferência da pintura inteira, hoje e por pares, e quanto o desenho muda. Desenho cinza, tema claro. As folhas completas estão ao lado, uma por animação.</p>
${resumo
  .map(
    (r) => `<div class="l"><div class="t"><b>${r.id}</b><br>${r.pior.titulo}, ${r.pior.rot}<br><br>conferência inteira: hoje ${cm2(r.aA)} (${r.nA} achados) → por pares ${cm2(r.aD)} (${r.nD} achados)<br><br>neste quadro: ${pc(r.pior.f)}<br>na folha: muda ${r.muda} de ${r.quadros} quadros, até ${pc(r.maisMuda).replace('muda ', '')}</div>
<figure>${svg(r.pior.a)}<figcaption><b>hoje</b>: ${ach(r.pior.antes)}</figcaption></figure><figure>${svg(r.pior.b)}<figcaption><b>por pares</b>: ${ach(r.pior.depois)}</figcaption></figure>${r.pior.url ? `<figure><img class="q" src="${r.pior.url}"><figcaption><b>o que muda</b>, em magenta</figcaption></figure>` : ''}</div>`,
  )
  .join('')}`;
  await pg.setViewportSize({ width: 3 * (W + 8) + 362, height: 900 });
  await pg.setContent(html);
  await pg.screenshot({ path: arqResumo, fullPage: true });
  console.log(`folha-resumo: ${arqResumo}`);
}
await nav.close();
