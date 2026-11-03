// Revisão de design v2 (03/11/2026): gera os desenhos do Boneco usados no protótipo navegável.
// O Boneco sai do motor do app, sem mudança nenhuma (estilo A, o padrão desde o R4). O protótipo só troca o que está
// em volta dele. Saída: reports/design/prototipo/boneco.js (os SVGs) e boneco.css (as classes do desenho,
// copiadas de src/styles.css).
// Uso: node scripts/design/prototipo/gerar.mjs
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const entrada = `export * from './src/engine/index.ts'; export * from './src/engine/estilo/index.ts';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false, logLevel: 'silent' });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const ex = (id) => M.EX.find((e) => e.id === id);
function instante(e) {
  let t = 0;
  const p = [];
  for (const s of e.seq) {
    if (s.kind === 'hold') p.push(t + s.dur / 2);
    t += s.dur;
  }
  return p[1] ?? t / 2;
}
const pack = (q) => ({ v: q.viewBox, h: q.html, c: q.classe, f: q.fase?.label ?? '' });
mkdirSync('reports/design/prototipo', { recursive: true });
const out = { mini: {}, guia: {} };
// miniaturas (a mesma regra do app: instante e vista de vistaDaMiniatura)
for (const id of ['bulgaro', 'stiff', 'supino-reto', 'remada-unilateral', 'triceps-frances-halter', 'afundo', 'elevacao-halteres', 'rosca-alternada', 'panturrilha-chao', 'abdominal-chao', 'goblet', 'flexao']) {
  const e = ex(id);
  const t = instante(e);
  out.mini[id] = pack(M.montarSvgEstilo(e, M.vistaDaMiniatura(e, t, 'a'), 'mus', t, 0, 120, 'a'));
}
// guia: o búlgaro animado, 30 quadros por ciclo, nos modos Técnica e Músculos, nas duas vistas
const b = ex('bulgaro');
for (const v of b.views)
  for (const modo of ['tec', 'mus']) {
    const quadros = [];
    for (let i = 0; i < 30; i++) quadros.push(pack(M.montarSvgEstilo(b, v, modo, (i / 30) * b.T, 0, 360, 'a')));
    out.guia[`${v}|${modo}`] = { T: b.T, quadros };
  }
writeFileSync('reports/design/prototipo/boneco.js', 'window.BONECO=' + JSON.stringify(out) + ';\n');

// as classes do desenho, sem os estilos das telas: tokens do Boneco (claro e escuro) + bloco svg + estilos A
const css = readFileSync('src/styles.css', 'utf8').split('\n');
const trecho = (de, ate) => css.slice(css.findIndex((l) => l.startsWith(de)), css.findIndex((l) => l.startsWith(ate))).join('\n');
const tokens = ['--stage', '--fig', '--fig-far', '--torso', '--joint', '--eq', '--eq-dark', '--cable', '--spine', '--mus-p', '--mus-s', '--err', '--ghost', '--path', '--guide', '--muted', '--line', '--accent', '--ink', '--bg', '--surface'];
const pegar = (bloco) => tokens.map((t) => (bloco.match(new RegExp(`${t}:[^;]+;`)) ?? [''])[0]).join(' ');
const raiz = css.slice(0, 40).join('\n');
const claro = raiz.split('@media')[0];
const escuro = raiz.split(':root[data-theme="dark"]{')[1] ?? '';
let saida = `/* Gerado por scripts/design/prototipo/gerar.mjs a partir de src/styles.css: só o desenho do Boneco. Os nomes
   ganham o prefixo b- para não se misturar com os do protótipo. */\n`;
const prefixar = (s) => s.replace(/var\(--/g, 'var(--b-').replace(/(^|[\s{;])--/g, '$1--b-');
saida += `.palco{${prefixar(pegar(claro))}}\n`;
saida += `[data-tema="escuro"] .palco{${prefixar(pegar(escuro))}}\n`;
saida += prefixar(trecho('/* svg */', '/* App */')) + '\n';
saida += prefixar(trecho('/* R4 (experimento do boneco)', '/* R4: tela de laboratório')).replace(/@media \(prefers-color-scheme: dark\)\{\s*:root:not\(\[data-theme="light"\]\)\{([^}]*)\}\s*\}/, '').replace(/:root\[data-theme="dark"\]\{/, '[data-tema="escuro"] .palco{').replace(/:root\{/, '.palco{') + '\n';
writeFileSync('reports/design/prototipo/boneco.css', saida);
console.log('ok', Object.keys(out.mini).length, 'miniaturas,', Object.keys(out.guia).length, 'sequências');
