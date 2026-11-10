// Redesign (06/11/2026), Fase 2: os dados do protótipo navegável, tirados do próprio app, sem nada inventado.
// - dados.js: o programa da persona fictícia Ana (gerado pelo gerador real em estados.mjs), as regras com selo,
//   as citações das fontes usadas (de docs/pesquisa/fontes.md), os textos do guia e dos cartões, as 9 perguntas da
//   triagem e os textos de segurança, copiados dos módulos do app.
// - boneco.js: o Boneco do motor, sem mudança (estilo A): miniaturas dos exercícios da Ana e o búlgaro animado nos
//   modos Técnica, Músculos e Erros, na vista que o app escolhe para cada modo.
// - boneco.css: as classes do desenho, copiadas de src/styles.css (tokens do palco nos dois temas).
// Uso: node scripts/design/redesign/estados.mjs && npx vite-node scripts/design/redesign/prototipo/gerar.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const SAIDA = 'docs/revisoes/redesign/prototipo';
mkdirSync(SAIDA, { recursive: true });
// Roda com vite-node: o conteúdo do guia é carregado com import.meta.glob, que só existe no Vite.
const M = {
  ...(await import('../../../../src/engine/index.ts')),
  ...(await import('../../../../src/engine/estilo/index.ts')),
  ...(await import('../../../../src/conteudo/index.ts')),
  ...(await import('../../../../src/domain/regras/index.ts')),
  ...(await import('../../../../src/domain/regras/completas.ts')),
  ...(await import('../../../../src/domain/triagem/index.ts')),
  ...(await import('../../../../src/domain/nivel/index.ts')),
  ...(await import('../../../../src/domain/biblioteca/index.ts')),
  ...(await import('../../../../src/domain/taxonomia/equipamentos.ts')),
  ...(await import('../../../../src/features/onboarding/inventarioForm.ts')),
  ...(await import('../../../../src/features/onboarding/icones.tsx')),
};
const { renderToStaticMarkup } = await import('react-dom/server');
const { createElement } = await import('react');
const ex = (id) => M.EX.find((e) => e.id === id);

// --- dados ---
const estado = JSON.parse(readFileSync('reports/design/redesign/estados/ana.json', 'utf8'));
const programa = estado.programa.programa;
const usadas = new Set();
const comSelo = (p) => {
  const r = M.REGRAS[p.regraId];
  if (r) r.fontes?.forEach((f) => usadas.add(f));
  return { ...p, selo: r?.selo ?? null };
};
const dias = programa.dias.map((d) => ({
  id: d.id,
  nome: d.nome,
  minutos: d.minutosEstimados,
  exercicios: d.exercicios.map((x) => ({ exId: x.exId, nome: x.nome, series: x.series, reps: x.reps, rir: x.rir, descansoSeg: x.descansoSeg, animacaoId: x.animacaoId, unilateral: x.unilateral, alternativas: x.alternativas, porque: x.porque.map(comSelo) })),
}));
const idsRegra = new Set(['seguranca.sem-diagnostico', 'seguranca.triagem.nenhuma', 'seguranca.montagem', 'rir.alvo', 'progressao.calibracao', 'readaptacao.durante-uso', 'acompanhamento.semana', 'iniciante.fase-aprendizado', 'seguranca.dor.programa', 'equipamento.atalhos', 'aquecimento.especifico', 'descanso.por-tipo', 'progressao.dupla', 'deload.semana-leve', 'rir.leitura', 'tempo.aquecimento', 'tempo.drop-set', 'progressao.troca-equivalente']);
for (const d of programa.dias) for (const x of d.exercicios) x.porque.forEach((p) => idsRegra.add(p.regraId));
programa.fases.forEach((f) => idsRegra.add(f.regraId));
programa.avisos.forEach((a) => idsRegra.add(a.regraId));
const regras = {};
for (const id of idsRegra) {
  const r = M.REGRAS[id];
  if (!r) continue;
  regras[id] = { regra: r.regra, selo: r.selo, fontes: r.fontes ?? [] };
  (r.fontes ?? []).forEach((f) => usadas.add(f));
}
// citações por extenso (o pedido ao domínio 6.1 do agente 4: hoje só existem em docs/pesquisa/fontes.md)
const fontesMd = readFileSync('docs/pesquisa/fontes.md', 'utf8');
const fontes = {};
for (const linha of fontesMd.split('\n')) {
  const m = linha.match(/^- `([^`]+)` — (.*?)(?: — \*\*status:\*\*|$)/);
  if (m && usadas.has(m[1])) fontes[m[1]] = m[2].replace(/ PMID: [^|]*\|/, '').replace(/ DOI: [^|]*\|/, '').replace(/\s*\| https?:\/\/\S+/, '').trim();
}
const guia = (id) => {
  const c = M.CONTEUDO[id];
  return c && { nome: c.name, curto: c.short, alvo: c.target, sentir: c.feel, dicas: c.cues, montagemEq: c.setupEq, montagemCorpo: c.setupBody, execucao: c.exec, respiracao: c.breath, checklist: c.check, erros: c.errors.map((e) => ({ titulo: e.title, desc: e.desc })) };
};
const cartao = (id) => {
  const c = M.CARTOES[id];
  return c && { nome: c.name, alvo: c.target, dicas: c.cues, montagem: c.montagem ?? [], erros: c.errors.map((e) => ({ titulo: e.title, desc: e.desc })), carga: c.carga };
};
const dados = {
  persona: 'Ana (fictícia): iniciante, halteres de 1 a 12 kg e banco reto, 3 × 45 min, prioridade pernas e glúteos',
  divisao: programa.divisao,
  dias,
  fases: programa.fases.map(comSelo),
  avisos: programa.avisos.map(comSelo),
  regras,
  fontes,
  guia: { bulgaro: guia('bulgaro'), stiff: guia('stiff') },
  cartoes: { 'ponte-gluteo-halter': cartao('ponte-gluteo-halter') },
  triagem: M.PERGUNTAS.map((p) => ({ id: p.id, texto: p.texto })),
  nivel: { tempos: M.TEMPOS_DE_TREINO, tecnica: M.CONFIANCA_TECNICA, pausas: M.PAUSAS.map((p) => ({ id: p.id, texto: p.texto })) },
  nomes: Object.fromEntries([...new Set(dias.flatMap((d) => d.exercicios.flatMap((x) => [x.exId, ...x.alternativas])))].map((id) => [id, M.POR_ID?.[id]?.nome ?? M.BIBLIOTECA.find((b) => b.id === id)?.nome ?? id])),
  // equipamento: as categorias e os nomes curtos da tela de hoje, e os 25 desenhos que já existem, tirados do app
  equipamento: M.CATEGORIAS.map((c) => ({
    id: c.id,
    titulo: c.titulo,
    itens: M.itensDaCategoria(c.id).map((id) => ({ id, nome: M.NOME_CURTO[id], completo: M.ITENS[id].nome, desenho: M.ICONES[id] ? renderToStaticMarkup(createElement('g', null, M.ICONES[id])).replace(/^<g>|<\/g>$/g, '') : null })),
  })),
  metas: programa.metas,
  volumeSemanal: programa.volumeSemanal,
};
writeFileSync(`${SAIDA}/dados.js`, '// Gerado por scripts/design/redesign/prototipo/gerar.mjs. Não editar.\nwindow.DADOS=' + JSON.stringify(dados) + ';\n');

// --- Boneco ---
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
const anim = new Set(dias.flatMap((d) => d.exercicios.map((x) => x.animacaoId)).filter(Boolean));
for (const id of anim) {
  const e = ex(id);
  if (!e) continue;
  const t = instante(e);
  out.mini[id] = pack(M.montarSvgEstilo(e, M.vistaDaMiniatura(e, t, 'a'), 'mus', t, 0, 120, 'a'));
}
const b = ex('bulgaro');
const N = 24;
const tituloErro = M.CONTEUDO.bulgaro.errors[0].title;
const seqs = {
  tec: { vista: M.vistaDoMovimento(b, 'a'), modo: 'tec', t0: 0, erro: 0 },
  mus: { vista: M.vistaDaMiniatura(b, instante(b), 'a'), modo: 'mus', t0: 0, erro: 0 },
  err: { vista: b.errors[0].view, modo: 'err', t0: M.instanteDoErro(b, 0), erro: 0 },
  traj: { vista: M.vistaDoMovimento(b, 'a'), modo: 'traj', t0: 0, erro: 0 },
};
for (const [k, s] of Object.entries(seqs)) {
  const quadros = [];
  for (let i = 0; i < N; i++) quadros.push(pack(M.montarSvgEstilo(b, s.vista, s.modo, s.t0 + (i / N) * b.T, s.erro, 360, 'a', false, { tituloErro })));
  out.guia[k] = { T: b.T, vista: s.vista, quadros };
}
writeFileSync(`${SAIDA}/boneco.js`, '// Gerado por scripts/design/redesign/prototipo/gerar.mjs a partir do motor (src/engine), sem mudança.\nwindow.BONECO=' + JSON.stringify(out) + ';\n');

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
const raiz = linhas.slice(0, 43).join('\n');
const claro = raiz.split('@media')[0];
const escuro = raiz.split(':root[data-theme="dark"]{')[1];
const pegar = (txt) => tokensPalco.map((t) => (txt.match(new RegExp(`${t}:[^;]+;`)) ?? [''])[0]).join(' ');
const r4 = bloco('/* R4 (experimento do boneco)', '.ea-cont{');
const r4claro = r4.match(/:root\{([^}]*)\}/)[1];
const r4escuro = r4.match(/:root\[data-theme="dark"\]\{([^}]*)\}/)[1];
let saida = '/* Gerado por scripts/design/redesign/prototipo/gerar.mjs a partir de src/styles.css: só o desenho do Boneco (não muda). */\n';
saida += `.palco{${pegar(claro)} ${r4claro.trim()} --ink:var(--st-ink); --muted:var(--st-muted); --line:var(--st-line); --font-b:var(--fonte);}\n`;
const palcoEscuro = `${pegar(escuro)} ${r4escuro.trim()}`;
saida += `@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .palco{${palcoEscuro}}}\n:root[data-theme="dark"] .palco{${palcoEscuro}}\n`;
saida += bloco('/* svg */', '/* Telas do app') + '\n';
saida += bloco('.ea-cont{', '/* R4: tela de laboratório') + '\n';
saida += bloco('/* Acabamento A2') + '\n';
writeFileSync(`${SAIDA}/boneco.css`, saida);
const kb = (f) => Math.round(readFileSync(`${SAIDA}/${f}`).length / 1024);
console.log(`dados.js ${kb('dados.js')} kB · boneco.js ${kb('boneco.js')} kB (${Object.keys(out.mini).length} miniaturas, ${Object.keys(out.guia).length} sequências) · boneco.css ${kb('boneco.css')} kB · ${Object.keys(regras).length} regras · ${Object.keys(fontes).length} fontes`);
