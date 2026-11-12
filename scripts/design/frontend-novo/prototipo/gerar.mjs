// Frontend novo (12/11/2026), etapa 1: os dados e o Boneco dos protótipos das direções visuais, tirados do próprio
// app, sem nada inventado e sem mudar o motor nem o domínio.
// - dados.js: o programa da persona fictícia Ana (tests/personas), gerado pelo gerador real, e os textos do guia do
//   1º exercício, copiados do conteúdo do app.
// - boneco.js: o Boneco do motor (estilo padrão, 'a'): a miniatura de cada exercício do dia A e o 1º exercício animado
//   nos modos Técnica e Músculos, na vista que o app escolhe para cada modo.
// - boneco.css: as classes do desenho, copiadas de src/styles.css, com os tons do palco nos dois temas.
// Uso: npx vite-node scripts/design/frontend-novo/prototipo/gerar.mjs
// (roda com o vite-node porque o conteúdo do guia é carregado com import.meta.glob, que só existe no Vite)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const SAIDA = 'docs/revisoes/frontend-novo/prototipos/comum';
mkdirSync(SAIDA, { recursive: true });

const M = {
  ...(await import('../../../../src/engine/index.ts')),
  ...(await import('../../../../src/engine/estilo/index.ts')),
  ...(await import('../../../../src/conteudo/index.ts')),
  ...(await import('../../../../src/domain/gerador/index.ts')),
  ...(await import('../../../../src/domain/sessao/index.ts')),
  ...(await import('../../../../tests/personas/index.ts')),
};
const ESTILO = 'a';
const ex = (id) => M.EX.find((e) => e.id === id);

// --- dados ---
const r = M.gerarPrograma(M.ana.perfil, M.ana.inventario);
if (r.status !== 'ok') throw new Error('o programa da Ana não foi gerado');
const programa = r.programa;
// a semana 1 da Ana é a fase de aprendizado: o app mostra a prescrição já com a fase (diaDaSemana), e o protótipo também
const SEMANA = 1;
const dias = programa.dias.map((d) => M.diaDaSemana(programa, d.id, SEMANA)).map((d) => ({
  id: d.id,
  nome: d.nome,
  minutos: d.minutosEstimados,
  exercicios: d.exercicios.map((x) => ({ exId: x.exId, nome: x.nome, series: x.series, reps: x.reps, rir: x.rir, descansoSeg: x.descansoSeg, animacaoId: x.animacaoId, unilateral: x.unilateral })),
}));
const primeiro = dias[0].exercicios.find((x) => x.animacaoId);
const c = M.CONTEUDO[primeiro.animacaoId];
const halteres = M.ana.inventario.halteres_fixos;
const cargas = [];
for (let kg = halteres.minKg; kg <= halteres.maxKg; kg += halteres.passoKg) cargas.push(kg);
const dados = {
  persona: `${M.ana.nome} (fictícia): ${M.ana.descricao}`,
  divisao: programa.divisao,
  diasPorSemana: M.ana.perfil.diasSemana,
  semana: SEMANA,
  dias,
  cargas,
  guia: { id: primeiro.animacaoId, nome: c.name, alvo: c.target, sentir: c.feel, dicas: c.cues },
};
writeFileSync(`${SAIDA}/dados.js`, '// Gerado por scripts/design/frontend-novo/prototipo/gerar.mjs. Não editar.\nwindow.DADOS=' + JSON.stringify(dados) + ';\n');

// --- Boneco ---
/** O instante parado da miniatura: o meio da 2ª pausa do movimento (o mesmo critério do protótipo do redesign). */
function instante(e) {
  let t = 0;
  const p = [];
  for (const s of e.seq) {
    if (s.kind === 'hold') p.push(t + s.dur / 2);
    t += s.dur;
  }
  return p[1] ?? t / 2;
}
const pack = (q) => ({ v: q.viewBox, h: q.html, c: q.classe ?? '', f: q.fase?.label ?? '', r: q.fase?.breath ?? '' });
const out = { mini: {}, guia: {} };
for (const x of dias[0].exercicios) {
  const e = x.animacaoId && ex(x.animacaoId);
  if (!e) continue;
  const t = instante(e);
  out.mini[x.animacaoId] = pack(M.montarSvgEstilo(e, M.vistaDaMiniatura(e, t, ESTILO), 'mus', t, 0, 120, ESTILO));
}
const b = ex(primeiro.animacaoId);
// 12 quadros por segundo: o bastante para o movimento ler como no app, sem pesar o arquivo
const N = Math.round(b.T * 12);
const seqs = {
  tec: { vista: M.vistaDoMovimento(b, ESTILO), modo: 'tec' },
  mus: { vista: M.vistaDaMiniatura(b, instante(b), ESTILO), modo: 'mus' },
};
for (const [k, s] of Object.entries(seqs)) {
  const quadros = [];
  for (let i = 0; i < N; i++) quadros.push(pack(M.montarSvgEstilo(b, s.vista, s.modo, (i / N) * b.T, 0, 360, ESTILO)));
  out.guia[k] = { T: b.T, vista: s.vista, quadros };
}
writeFileSync(`${SAIDA}/boneco.js`, '// Gerado por scripts/design/frontend-novo/prototipo/gerar.mjs a partir do motor (src/engine), sem mudança.\nwindow.BONECO=' + JSON.stringify(out) + ';\n');

// --- CSS do desenho: os blocos do Boneco de src/styles.css, sem os estilos das telas ---
const css = readFileSync('src/styles.css', 'utf8');
const linhas = css.split('\n');
const bloco = (de, ate) => {
  const i = linhas.findIndex((l) => l.startsWith(de));
  const j = ate ? linhas.findIndex((l, k) => k > i && l.startsWith(ate)) : linhas.length;
  if (i < 0 || j < 0) throw new Error(`bloco não achado: ${de} → ${ate}`);
  return linhas.slice(i, j).join('\n');
};
const tokensPalco = ['--stage', '--fig', '--fig-far', '--torso', '--joint', '--eq', '--eq-dark', '--cable', '--spine', '--elastic', '--mus-p', '--mus-s', '--err', '--ghost', '--path', '--guide', '--st-ink', '--st-muted', '--st-line'];
const raiz = css.slice(css.indexOf(':root{'), css.indexOf('/* o palco e as prévias do Boneco'));
const claro = raiz.split('@media')[0];
const escuro = raiz.split(':root[data-theme="dark"]{')[1];
const pegar = (txt) => tokensPalco.map((t) => (txt.match(new RegExp(`${t}:[^;]+;`)) ?? [''])[0]).join(' ');
const r4 = bloco('/* R4 (experimento do boneco)', '.ea-cont{');
const r4claro = r4.match(/:root\{([^}]*)\}/)[1];
const r4escuro = r4.match(/:root\[data-theme="dark"\]\{([^}]*)\}/)[1];
let saida = '/* Gerado por scripts/design/frontend-novo/prototipo/gerar.mjs a partir de src/styles.css: só o desenho do Boneco (não muda). */\n';
saida += `.palco{${pegar(claro)} ${r4claro.trim()} --ink:var(--st-ink); --muted:var(--st-muted); --line:var(--st-line); --font-b:var(--fonte);}\n`;
const palcoEscuro = `${pegar(escuro)} ${r4escuro.trim()}`;
saida += `@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .palco{${palcoEscuro}}}\n:root[data-theme="dark"] .palco{${palcoEscuro}}\n`;
saida += bloco('/* svg */', '/* Telas do app') + '\n';
saida += bloco('.ea-cont{', '/* R4: tela de laboratório') + '\n';
// só o acabamento do desenho: o que vem depois no arquivo são estilos das telas do app, que o protótipo não usa
saida += bloco('/* Acabamento A2', '/* Treino e guia em tela estreita') + '\n';
writeFileSync(`${SAIDA}/boneco.css`, saida);

const kb = (f) => Math.round(readFileSync(`${SAIDA}/${f}`).length / 1024);
console.log(`dados.js ${kb('dados.js')} kB · boneco.js ${kb('boneco.js')} kB (${Object.keys(out.mini).length} miniaturas, ${Object.keys(out.guia).length} sequências de ${N} quadros) · boneco.css ${kb('boneco.css')} kB`);
console.log(dias[0].nome, dias[0].minutos, 'min:', dias[0].exercicios.map((x) => `${x.nome} ${x.series}×${x.reps.join('–')} RIR ${x.rir.join('–')} ${x.descansoSeg}s${x.animacaoId ? '' : ' [sem animação]'}`).join(' | '));
