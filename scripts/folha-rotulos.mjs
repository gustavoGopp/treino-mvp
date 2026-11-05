// Folha dos rótulos de técnica do Boneco (R4, proposta 2, 05/11/2026): os quadros do modo Técnica de cada vista, em
// duas linhas, "hoje" (o rótulo onde o autor da animação o pôs) e "proposta" (o rótulo que cai em cima do corpo vai
// para a faixa de baixo ou de cima do palco, com uma linha fina até o ponto). Não muda nenhuma linha de base.
// Uso: node scripts/folha-rotulos.mjs <saida.png> [--ids=a,b] [--pagina=N] [--por-pagina=8] [--titulo="..."]
// Animações em revisão (src/engine/exercicios/revisao/) podem entrar pela lista de ids.
import { build } from 'esbuild';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const saida = args.find((a) => !a.startsWith('--')) ?? 'test-results/folha-rotulos.png';
const opt = (n, d) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const ids = opt('ids', '') ? opt('ids', '').split(',') : null;
const porPagina = Number(opt('por-pagina', 8));
const pagina = Number(opt('pagina', 0));

const revisao = (ids ?? []).filter((id) => existsSync(`src/engine/exercicios/revisao/${id}.ts`));
const entrada = `export * from './src/engine/index.ts'; export { prep, calib } from './src/engine/cena.ts'; export * from './src/engine/estilo/index.ts';
export const REVISAO = {${revisao.map((id) => `'${id}': (await import('./src/engine/exercicios/revisao/${id}.ts')).default`).join(',')}};`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
for (const ex of Object.values(M.REVISAO)) { M.prep(ex); M.calib(ex); }
const css = readFileSync('src/styles.css', 'utf8');
const nome = (id) => {
  const f = [`src/conteudo/exercicios/${id}.json`, `src/conteudo/revisao/${id}.json`].find(existsSync);
  return f ? JSON.parse(readFileSync(f, 'utf8')).name : id;
};
const quadro = (ex, view, t, fora) => {
  M.CTX.ACABAMENTO = { ...M.acabamento(ex), rotulosFora: fora ? 1 : 0 };
  let q;
  try { q = M.montarSvgEstilo(ex, view, 'tec', t, 0, 300, 'a'); } finally { M.CTX.ACABAMENTO = null; }
  return `<figure><svg class="${q.classe}" viewBox="${q.viewBox}">${q.html}</svg></figure>`;
};
let lista = ids ? ids.map((id) => M.REVISAO[id] ?? M.EX.find((e) => e.id === id) ?? (() => { throw new Error('não achei ' + id); })()) : M.EX;
const total = Math.ceil(lista.length / porPagina);
const pag = pagina ? lista.slice((pagina - 1) * porPagina, pagina * porPagina) : lista;
let html = `<!doctype html><html><style>${css}body{font:13px var(--font-b);margin:12px}h2{font-size:15px;margin:14px 0 4px}h3{font-size:13px;margin:8px 0 2px;font-weight:600}.l{display:grid;grid-template-columns:90px repeat(4,1fr);gap:6px;width:1090px;align-items:center}figure{margin:0;background:var(--stage);border:1px solid var(--line)}figure svg{width:100%;height:185px;display:block}.r{font-weight:700;font-size:12px}</style>`;
html += `<h1 style="font-size:18px">${opt('titulo', 'Rótulos de técnica: hoje × proposta (R4)')}${pagina ? ` · página ${pagina} de ${total}` : ''}</h1>`;
for (const ex of pag) {
  const tempos = ex.seq.map((g) => g.t0 + g.dur / 2).slice(0, 4);
  html += `<h2>${nome(ex.id)} <small style="font-weight:400">(${ex.id})</small></h2>`;
  for (const view of ex.views) {
    html += `<h3>vista ${view}</h3>`;
    html += `<div class="l"><div class="r">hoje</div>${tempos.map((t) => quadro(ex, view, t, false)).join('')}</div>`;
    html += `<div class="l"><div class="r">proposta</div>${tempos.map((t) => quadro(ex, view, t, true)).join('')}</div>`;
  }
}
html += '</html>';
const tmp = `/tmp/folha-rotulos-${process.pid}.html`;
writeFileSync(tmp, html);
const { chromium } = createRequire(import.meta.url)('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1130, height: 800 } });
await p.goto('file://' + tmp);
await p.screenshot({ path: saida, fullPage: true });
await b.close();
console.log('folha:', saida, `(${pag.length} exercícios${pagina ? `, página ${pagina}/${total}` : ''})`);
