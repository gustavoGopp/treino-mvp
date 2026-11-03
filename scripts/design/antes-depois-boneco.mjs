// Revisão de design (03/11/2026), parte C: o antes e o depois do Boneco, para a decisão do Gustavo.
// O "depois" é um ESBOÇO desenhado aqui, em memória: o motor e a linha de base não mudam. Se o Gustavo aprovar,
// a mudança de verdade é feita no motor (parte D), com as folhas de cada animação aprovadas uma a uma.
// Uso: node scripts/design/antes-depois-boneco.mjs  → docs/img/design-*.png
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const entrada = `export * from './src/engine/index.ts'; export * from './src/engine/estilo/index.ts';
export { FORMAS, LISTA, listaDe } from './src/engine/estilo/musculos.ts';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false, logLevel: 'silent' });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const ajud = JSON.parse(readFileSync('docs/revisoes/design/ajudantes.json', 'utf8'));
const FORMA_MARCA = { antebraco: 'antebraço', eretores: 'eretores (lombar)', obliquos: 'oblíquos', trapSuperior: 'trapézio superior', retoAbdominal: 'abdomen', deltAnt: 'ombro_anterior', panturrilha: 'panturrilha' };

const css = readFileSync('src/styles.css', 'utf8');
const deut = '0.367322 0.860646 -0.227968 0 0  0.280085 0.672501 0.047413 0 0  -0.011820 0.042940 0.968881 0 0  0 0 0 1 0';
const EXTRA = `
.ea-mh{fill:url(#listras);stroke:var(--m-borda);stroke-linejoin:round}
.op-b .ea-mh{fill:none;stroke:var(--m-s);stroke-width:2.2px;stroke-dasharray:3 2}
body{background:var(--bg);color:var(--ink);font:14px "IBM Plex Sans",system-ui,sans-serif;margin:0;padding:16px}
h1{font:700 22px/1.1 system-ui,sans-serif;margin:0 0 4px} p.sub{margin:0 0 12px;color:var(--muted);font-size:13px}
.g{display:grid;gap:10px} figure{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;overflow:hidden}
figure svg{display:block;width:100%;background:var(--stage)} figcaption{padding:6px 8px;font-size:13px;line-height:1.35}
figcaption b{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}
.leg{display:flex;flex-wrap:wrap;gap:10px;font-size:12.5px;color:var(--muted);padding:0 8px 8px}
.leg span{display:flex;align-items:center;gap:5px} .leg i{width:16px;height:11px;border-radius:3px;display:inline-block;border:1px solid var(--m-borda)}
.antes{border-color:var(--line)} .depois{border:2px solid var(--accent)}`;
const defs = `<svg width="0" height="0" style="position:absolute"><defs><pattern id="listras" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="var(--ea-pele)"/><rect width="1.5" height="3" fill="var(--m-s)"/></pattern></defs><filter id="deut"><feColorMatrix type="matrix" values="${deut}"/></filter></svg>`;

function instante(ex) {
  let t = 0;
  const p = [];
  for (const s of ex.seq) {
    if (s.kind === 'hold') p.push(t + s.dur / 2);
    t += s.dur;
  }
  return p[1] ?? t / 2;
}
const svg = (q, extra = '') => `<svg class="${q.classe}" viewBox="${q.viewBox}" style="aspect-ratio:4/3${extra}">${q.html}</svg>`;
const fig = (q, rot, txt, cls = '', leg = '', filtro = '') => `<figure class="${cls}">${svg(q, filtro ? ';filter:url(#deut)' : '')}${leg}<figcaption><b>${rot}</b>${txt}</figcaption></figure>`;
const leg2 = `<div class="leg"><span><i style="background:var(--m-p)"></i>alvo principal</span><span><i style="background:var(--m-s)"></i>secundários</span></div>`;
const leg3a = `<div class="leg"><span><i style="background:var(--m-p)"></i>principal</span><span><i style="background:var(--m-s)"></i>também trabalha (conta meia série)</span><span><i style="background:repeating-linear-gradient(45deg,var(--m-s) 0 2px,var(--ea-pele) 2px 4px)"></i>só ajuda a firmar</span></div>`;
const leg3b = `<div class="leg"><span><i style="background:var(--m-p)"></i>principal</span><span><i style="background:var(--m-s)"></i>também trabalha (conta meia série)</span><span><i style="background:none;border:2px dashed var(--m-s)"></i>só ajuda a firmar</span></div>`;

// marca como 'h' (só ajuda) as formas laranja que a biblioteca não conta para aquele exercício
function comAjudantes(ex) {
  const l = ajud.find((x) => x.animacao === ex.id);
  const so = new Set(l?.soAjuda ?? []);
  const original = M.LISTA[ex.id];
  M.LISTA[ex.id] = M.listaDe(ex).map(([f, k, t]) => [f, k, t === 's' && so.has(FORMA_MARCA[f]) ? 'h' : t]);
  return () => (original ? (M.LISTA[ex.id] = original) : delete M.LISTA[ex.id]);
}

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch();
async function pagina(arquivo, titulo, sub, corpo, colunas, largura = 1200, tema = 'light') {
  const p = await b.newPage({ viewport: { width: largura, height: 600 }, colorScheme: tema, deviceScaleFactor: 1 });
  await p.setContent(`<style>${css}${EXTRA}</style>${defs}<h1>${titulo}</h1><p class="sub">${sub}</p><div class="g" style="grid-template-columns:repeat(${colunas},1fr)">${corpo}</div>`);
  await p.screenshot({ path: arquivo, fullPage: true });
  await p.close();
  console.log(arquivo);
}
const ex = (id) => M.EX.find((e) => e.id === id);
const q = (id, v, modo = 'mus', estilo = 'a', t = null, perto = false) => M.montarSvgEstilo(ex(id), v, modo, t ?? instante(ex(id)), 0, 360, estilo, perto);

// 1. legenda: "só ajuda" × "secundário que conta"
{
  let corpo = '';
  for (const [id, v, nome] of [
    ['rosca-alternada', 'lateral', 'Rosca alternada (6ª mais prescrita)'],
    ['flexao', 'lateral', 'Flexão de braço (7ª)'],
    ['stiff', 'lateral', 'Stiff com halteres (5ª)'],
  ]) {
    const antes = q(id, v);
    const volta = comAjudantes(ex(id));
    const depois = q(id, v);
    volta();
    corpo += fig(antes, `antes · ${nome}`, 'O laranja é "secundário" na legenda, mas parte dele o programa não conta.', 'antes', leg2);
    corpo += fig(depois, 'depois, opção A: listras', 'Quem só ajuda a firmar fica listrado.', 'depois', leg3a);
    corpo += `<figure class="depois op-b">${svg(depois)}${leg3b}<figcaption><b>depois, opção B: contorno</b>Quem só ajuda fica só com o contorno tracejado.</figcaption></figure>`;
  }
  await pagina('docs/img/design-legenda.png', 'Laranja que conta × laranja que só ajuda', 'Esboço. 15 das 31 animações têm laranja que o programa não conta (em 9 delas, todo o laranja é assim). Opção C (não desenhada): deixar como está e só mudar a palavra da legenda para "também trabalham".', corpo, 3);
}

// 2. daltonismo: o mesmo quadro visto com deuteranopia, antes e com a opção A
{
  let corpo = '';
  for (const [id, v] of [
    ['rosca-alternada', 'lateral'],
    ['afundo', 'lateral'],
    ['puxada-unilateral', 'posterior'],
  ]) {
    const volta = comAjudantes(ex(id));
    const depois = q(id, v);
    volta();
    corpo += fig(q(id, v), `${id} · como a maioria vê`, '', 'antes', leg2);
    corpo += fig(q(id, v), 'com daltonismo vermelho-verde (simulação)', 'Vermelho e laranja viram dois tons de amarelo-oliva; a legenda fala de cores que a pessoa não vê.', 'antes', '', true);
    corpo += fig(depois, 'opção A, com daltonismo (simulação)', 'As listras não dependem da cor.', 'depois', '', true);
  }
  await pagina('docs/img/design-daltonismo.png', 'O Boneco para quem tem daltonismo vermelho-verde', 'Cerca de 8% dos homens de origem europeia (Birch 2012). Simulação de deuteranopia (Machado 2009). O vermelho × laranja tem contraste de 2,1:1 no tema claro e 1,7:1 no escuro (a WCAG pede 3:1 para gráfico que carrega informação).', corpo, 3);
}

// 3. adutores e a vista de frente do afundo e do búlgaro
{
  const orig = M.FORMAS.adutores;
  const maior = (sk, k) => {
    const m = orig(sk, k);
    const c = m.p.reduce((s, p) => [s[0] + p[0] / m.p.length, s[1] + p[1] / m.p.length, s[2] + p[2] / m.p.length], [0, 0, 0]);
    return { ...m, p: m.p.map((p) => [c[0] + (p[0] - c[0]) * 1.45, c[1] + (p[1] - c[1]) * 1.15, c[2] + (p[2] - c[2]) * 1.45]) };
  };
  let corpo = '';
  for (const id of ['afundo', 'bulgaro']) {
    const e = ex(id);
    const tEmCima = 0.05;
    corpo += fig(q(id, 'frontal'), `antes · ${id}, de frente, embaixo`, 'A coxa da frente aponta para quem olha: o principal (vermelho) e os adutores quase somem.', 'antes', leg2);
    M.FORMAS.adutores = maior;
    corpo += fig(q(id, 'frontal'), 'depois, opção 1: adutores maiores', 'Esboço: a mesma forma, uns 45% mais larga.', 'depois', leg2);
    corpo += fig(q(id, 'frontal', 'mus', 'a', tEmCima * e.T), 'opção 1, no alto do movimento', 'Em pé, a coxa da frente aparece inteira.', 'depois', leg2);
    M.FORMAS.adutores = orig;
    corpo += fig(q(id, 'lateral'), 'opção 2: Músculos abre de lado', 'O modo Músculos começa na vista em que o principal aparece mais (a mesma regra da miniatura). Sem mudar o desenho.', 'depois', leg2);
  }
  await pagina('docs/img/design-adutores.png', 'Adutores e a vista de frente do afundo e do búlgaro', 'Medido no palco de 360 px: de frente e embaixo, o quadríceps principal ocupa 36 px² no afundo e 17 px² no búlgaro; o da perna de trás (laranja), 430 px². Os adutores: 30 e 14 px² (1 a 3 px² na miniatura).', corpo, 4);
}

// 4. enquadramento: o corpo pequeno nos exercícios de polia
{
  let corpo = '';
  for (const [id, v, pct] of [
    ['puxada-unilateral', 'posterior', 59],
    ['face-pull', 'lateral', 62],
    ['elevacao-lateral', 'frontal', 62],
  ]) {
    corpo += fig(q(id, v), `antes · ${id}, ${v}`, `O corpo ocupa ${pct}% do palco: a câmera enquadra a torre inteira.`, 'antes', leg2);
    corpo += fig(q(id, v, 'mus', 'a', null, true), 'depois: perto do corpo no modo Músculos', 'Esboço com o enquadramento que o motor já tem (caixaPerto). Na Técnica e na Trajetória, a torre continua inteira.', 'depois', leg2);
  }
  await pagina('docs/img/design-enquadramento.png', 'Exercícios de polia: o corpo pequeno no palco', 'Na puxada unilateral de trás (o incômodo do Diário do R3) e no face pull. O face pull não tem vista de trás, onde o ombro posterior apareceria: isso é animação nova (R5).', corpo, 2, 900);
}

// 5. clássico × Boneco nos exercícios corrigidos pela anatomia
{
  let corpo = '';
  for (const [id, v, txt] of [
    ['afundo', 'lateral', 'No clássico, o glúteo ainda é principal; a conta diz secundário.'],
    ['elevacao-halteres', 'frontal', 'No clássico, o trapézio aparece; o texto diz que senti-lo é erro.'],
    ['desenvolvimento', 'frontal', 'No clássico, a lateral do ombro é principal; a conta diz secundária.'],
  ]) {
    corpo += fig(q(id, v, 'mus', 'atual'), `clássico · ${id}`, txt, 'antes', `<div class="leg"><span><i style="background:var(--mus-p)"></i>alvo principal</span><span><i style="background:var(--mus-s)"></i>secundários</span></div>`);
    corpo += fig(q(id, v), 'Boneco (padrão)', 'Com as correções da anatomia.', 'depois', leg2);
  }
  await pagina('docs/img/design-classico.png', 'O estilo clássico não recebeu as correções da anatomia', 'Três saídas: fica como está, com um aviso em "Meus dados"; recebe as correções (deixa de ser igual ao guia original, e o teste de equivalência deixa de valer para ele); ou sai, e ficam o Boneco e a Silhueta.', corpo, 2, 900);
}
await b.close();
