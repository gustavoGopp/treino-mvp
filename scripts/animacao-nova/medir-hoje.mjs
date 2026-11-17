// Mede o motor de animação DE HOJE (90 animações) e escreve o diagnóstico em docs/revisoes/animacao-nova/diagnostico/.
// Uso: node scripts/animacao-nova/medir-hoje.mjs   (não altera nada fora de docs/revisoes/animacao-nova/diagnostico/)
// Saídas: medidas-de-hoje.json, medidas-de-hoje.md e folhas-de-hoje.md (as folhas faltantes são geradas à parte,
// por scripts/folha-animacao.mjs, e este script só lista o que existe; passe --folhas para gerar as que faltam).
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SAIDA = 'docs/revisoes/animacao-nova/diagnostico';
mkdirSync(SAIDA, { recursive: true });
const GERAR_FOLHAS = process.argv.includes('--folhas');

const entrada = `export * from './src/engine/index.ts'; export { prep, calib } from './src/engine/cena.ts'; export { sub, len, dot, norm } from './src/engine/math.ts';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const m = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const { EX, CTX, skel, poseAt, segAt } = m;

/* ---------- vetores e ângulos ---------- */
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a) => Math.hypot(a[0], a[1], a[2]);
const dist = (a, b) => len(sub(a, b));
const neg = (a) => [-a[0], -a[1], -a[2]];
const ang = (a, b) => {
  const l = len(a) * len(b);
  if (l < 1e-9) return 0;
  return (Math.acos(Math.max(-1, Math.min(1, dot(a, b) / l))) * 180) / Math.PI;
};
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);

/* ---------- limites normais (CDC, Soucie 2011; punho: AAOS) ---------- */
const NORMAL = {
  joelho: { media: 140, max: 164 },
  cotovelo: { media: 148, max: 166 },
  quadril: { media: 132, max: 159 },
  ombro: { media: 170, max: 192 },
  dorsiflexao: { media: 15, max: 48 },
  flexaoPlantar: { media: 57, max: 90 },
  // Punho (AAOS): extensão 70 e flexão 80. O motor mede a dobra sem sinal; por isso "acima da média" usa 70 (o menor
  // dos dois) e não há máximo observado.
  punho: { media: 70, max: null },
};

/* ---------- ângulos de uma pose ---------- */
function angulos(sk) {
  const o = {};
  for (const k of ['R', 'L']) {
    const s = sk.side[k];
    o['joelho' + k] = ang(sub(s.K, s.Hp), sub(s.A, s.K));
    o['cotovelo' + k] = ang(sub(s.E, s.S), sub(s.W, s.E));
    o['quadril' + k] = ang(sub(s.K, s.Hp), neg(sk.uL));
    o['ombro' + k] = ang(sub(s.E, s.S), neg(sk.uT));
    o['dorsi' + k] = 90 - ang(sub(s.K, s.A), sub(s.toe, s.A));
    o['punho' + k] = ang(sub(s.W, s.E), sub(s.G, s.W));
  }
  o.tronco = ang(sk.uT, [0, 1, 0]);
  const p = sk.pose;
  const lp = p.lumbar || 0, tp = p.thor != null ? p.thor : lp, np = p.neck != null ? p.neck : tp;
  // "se existirem": só calcula se a pose declara ao menos um dos três campos
  const tem = p.lumbar != null || p.thor != null || p.neck != null;
  o.pescocoTorax = tem ? np - tp : null;
  o.toraxLombar = tem ? tp - lp : null;
  return o;
}

/* ---------- uso (%) a partir do inventário ---------- */
const bib = JSON.parse(readFileSync('src/domain/biblioteca/exercicios.json', 'utf8'));
const vaga = {};
let totalProgramas = null;
{
  const md = readFileSync('docs/revisoes/auditoria/inventario.md', 'utf8');
  const mt = md.match(/\(([\d.]+) programas fictícios\)/);
  if (mt) totalProgramas = Number(mt[1].replace(/\./g, ''));
  for (const linha of md.split('\n')) {
    const mm = linha.match(/^\| \d+ \| \*\*.*?\*\* `([^`]+)` \|/);
    if (!mm) continue;
    const cel = linha.split('|').map((c) => c.trim());
    // colunas: #, exercício, funções, equip, principal, nível, articulações, falta marcar, guia, fonte, vaga, alternativa, obs
    const v = Number(cel[11].replace(/\./g, ''));
    if (!Number.isNaN(v)) vaga[mm[1]] = v;
  }
}
const usoPorAnim = {};
const exerciciosDaAnim = {};
for (const e of bib) {
  if (!e.animacaoId) continue;
  (exerciciosDaAnim[e.animacaoId] ||= []).push(e.id);
  if (vaga[e.id] != null) usoPorAnim[e.animacaoId] = (usoPorAnim[e.animacaoId] ?? 0) + vaga[e.id];
}

/* ---------- medidas de uma animação ---------- */
const PONTAS = [['toe', 'toe'], ['heel', 'heel'], ['G', 'G'], ['K', 'K']];
const VEL = [['P', (s) => s.P], ['N', (s) => s.N], ['Hc', (s) => s.Hc],
  ['G_R', (s) => s.side.R.G], ['G_L', (s) => s.side.L.G], ['E_R', (s) => s.side.R.E], ['E_L', (s) => s.side.L.E],
  ['K_R', (s) => s.side.R.K], ['K_L', (s) => s.side.L.K]];
const JUNTAS = [['P', (s) => s.P], ['M', (s) => s.M], ['N', (s) => s.N], ['Hc', (s) => s.Hc],
  ...['R', 'L'].flatMap((k) => ['S', 'E', 'W', 'G', 'Hp', 'K', 'A', 'toe', 'heel'].map((j) => [`${j}_${k}`, (s) => s.side[k][j]]))];

function preparaCtx(ex) {
  CTX.PJ = m.VIEWS[ex.views[0]].proj; CTX.VIEW = ex.views[0]; CTX.prims = []; ex._pal = 'n';
}

function medir(ex) {
  const n = Math.round(ex.T * 60);
  const tempo = (i) => (i / n) * ex.T;
  const out = { id: ex.id, T: r2(ex.T), quadros: n };

  // esqueletos do ciclo (e a contagem de IKFAIL)
  CTX.IKFAIL = 0;
  const sks = [];
  let quadrosComFalha = 0;
  for (let i = 0; i < n; i++) {
    const antes = CTX.IKFAIL;
    sks.push(skel(poseAt(ex, ex.K, tempo(i))));
    if (CTX.IKFAIL > antes) quadrosComFalha++;
  }
  out.ikfail = { chamadas: CTX.IKFAIL, quadros: quadrosComFalha };

  // 1 e 2. ângulos
  const A = sks.map(angulos);
  const ang_ = {};
  const chaves = Object.keys(A[0]);
  for (const c of chaves) {
    const v = A.map((a) => a[c]).filter((x) => x != null);
    ang_[c] = v.length ? { min: r1(Math.min(...v)), max: r1(Math.max(...v)) } : null;
  }
  out.angulos = ang_;
  const maxDe = (nome) => Math.max(ang_[nome + 'R'].max, ang_[nome + 'L'].max);
  const minDe = (nome) => Math.min(ang_[nome + 'R'].min, ang_[nome + 'L'].min);
  const flexPlantar = Math.max(0, -minDe('dorsi'));
  const comp = {
    joelho: { pico: maxDe('joelho'), ...NORMAL.joelho },
    cotovelo: { pico: maxDe('cotovelo'), ...NORMAL.cotovelo },
    quadril: { pico: maxDe('quadril'), ...NORMAL.quadril },
    ombro: { pico: maxDe('ombro'), ...NORMAL.ombro },
    dorsiflexao: { pico: maxDe('dorsi'), ...NORMAL.dorsiflexao },
    flexaoPlantar: { pico: r1(flexPlantar), ...NORMAL.flexaoPlantar },
    punho: { pico: maxDe('punho'), ...NORMAL.punho },
  };
  for (const c of Object.values(comp)) {
    c.acimaDaMedia = c.pico > c.media;
    c.acimaDoMaximo = c.max != null && c.pico > c.max;
  }
  out.amplitudes = comp;

  // 3. contatos
  const contatos = {};
  for (const [nome, campo] of PONTAS) {
    for (const k of ['R', 'L']) {
      const pts = sks.map((s) => s.side[k][campo]);
      let ext = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) ext = Math.max(ext, dist(pts[i], pts[j]));
      const ymin = Math.min(...pts.map((p) => p[1]));
      const classe = ext < 0.5 ? 'fixo' : ext <= 4 ? 'desliza' : 'livre';
      contatos[`${nome}_${k}`] = { extensao: r2(ext), yMin: r2(ymin), classe, atravessaChao: ymin < -0.5 };
    }
  }
  out.contatos = contatos;

  // 4. velocidade (cíclica: o quadro n-1 liga ao 0, como no loop do app)
  const vel = {};
  for (const [nome, f] of VEL) {
    const pts = sks.map(f);
    const v = pts.map((p, i) => dist(pts[(i + 1) % n], p) * 60); // v[i]: entre i e i+1
    let pico = 0;
    for (const x of v) pico = Math.max(pico, x);
    let salto = 0, iSalto = 0;
    for (let i = 0; i < n; i++) {
      const d = Math.abs(v[(i + 1) % n] - v[i]);
      if (d > salto) { salto = d; iSalto = i; }
    }
    const iq = (iSalto + 1) % n; // o quadro em que a velocidade muda
    const fase = segAt(ex, tempo(iq));
    vel[nome] = {
      pico: r1(pico), salto: r1(salto), razao: pico > 1e-6 ? r2(salto / pico) : null,
      quadro: iq, t: r2(tempo(iq)), fase: fase.label, faseKind: fase.kind,
    };
  }
  out.velocidade = vel;
  // pior razão entre os pontos que se movem de verdade (pico >= 5 cm/s)
  let pior = null;
  for (const [nome, v] of Object.entries(vel)) {
    if (v.pico >= 5 && v.razao != null && (!pior || v.razao > pior.razao)) pior = { ponto: nome, ...v };
  }
  out.piorSalto = pior;

  // 5. fecho do ciclo: distância do último quadro ao primeiro, contra o passo médio (todos os pontos de VEL)
  const fecho = {};
  let fechoMax = 0, fechoRazaoMax = 0;
  for (const [nome, f] of VEL) {
    const pts = sks.map(f);
    const d = dist(pts[n - 1], pts[0]);
    let soma = 0;
    for (let i = 0; i < n - 1; i++) soma += dist(pts[i + 1], pts[i]);
    const passo = soma / (n - 1);
    const razao = passo > 0.02 ? d / passo : null; // sem passo útil (ponto parado): sem razão
    fecho[nome] = { d: r2(d), passoMedio: r2(passo), razao: razao == null ? null : r2(razao) };
    fechoMax = Math.max(fechoMax, d);
    if (razao != null) fechoRazaoMax = Math.max(fechoRazaoMax, razao);
  }
  out.fecho = { pontos: fecho, dMax: r2(fechoMax), razaoMax: r2(fechoRazaoMax) };

  // 6. simetria (esquerdo contra o espelho do direito)
  const simetria = {};
  let simMax = 0;
  for (const j of ['G', 'E', 'K', 'A']) {
    let mx = 0;
    for (const s of sks) {
      const r = s.side.R[j], l = s.side.L[j];
      mx = Math.max(mx, dist(l, [-r[0], r[1], r[2]]));
    }
    simetria[j] = r2(mx);
    simMax = Math.max(simMax, mx);
  }
  const lados = new Set((ex.muscles?.p ?? []).map((x) => x[1]));
  out.simetria = { diferenca: simetria, max: r2(simMax), deveriaSerSimetrico: lados.size > 0 && [...lados].every((l) => l === 'RL'), ladosPrimarios: [...lados] };

  // 7. cabo, elástico e fita
  const cabos = {}, fitas = {};
  let equipFalhou = 0;
  for (let i = 0; i < n; i++) {
    preparaCtx(ex);
    CTX.MEAS = [1e9, -1e9, 1e9, -1e9];
    ex._cab = {}; ex._fita = null;
    try { ex.equip(sks[i]); } catch { equipFalhou++; }
    CTX.MEAS = null;
    for (const [id, L] of Object.entries(ex._cab)) { const c = (cabos[id] ||= { min: 1e9, max: -1e9 }); c.min = Math.min(c.min, L); c.max = Math.max(c.max, L); }
    if (ex._fita) for (const [id, f] of Object.entries(ex._fita)) {
      const c = (fitas[id] ||= { min: 1e9, max: -1e9, longaMin: 1e9, longaMax: -1e9 });
      c.min = Math.min(c.min, f.min); c.max = Math.max(c.max, f.max);
      c.longaMin = Math.min(c.longaMin, f.max); c.longaMax = Math.max(c.longaMax, f.max);
    }
  }
  ex._cab = null; ex._fita = null; CTX.prims = [];
  out.equipFalhou = equipFalhou;
  out.cabos = Object.fromEntries(Object.entries(cabos).map(([id, c]) => [id, { min: r1(c.min), max: r1(c.max), variacao: r1(c.max - c.min), repouso: ex.L0?.[id] != null ? r1(ex.L0[id] + 10) : null }]));
  // fita: variacao = mudança da fita mais longa do quadro (a diferença entre as duas fitas no mesmo quadro não conta)
  out.fitas = Object.fromEntries(Object.entries(fitas).map(([id, c]) => [id, { min: r1(c.min), max: r1(c.max), variacao: r1(c.longaMax - c.longaMin) }]));

  // 8. tempos
  const soma = (kind) => ex.seq.filter((g) => g.kind === kind).reduce((s, g) => s + g.dur, 0);
  const exc = soma('ecc'), con = soma('conc'), hold = soma('hold');
  out.tempos = {
    fases: ex.seq.map((g) => ({ label: g.label, kind: g.kind, dur: r2(g.dur), tempo: g.tempo })),
    total: r2(ex.T), excentrica: r2(exc), concentrica: r2(con), pausas: r2(hold), razaoExcConc: con > 0 ? r2(exc / con) : null,
  };

  // 9. mãos
  const dm = sks.map((s) => dist(s.side.R.G, s.side.L.G));
  out.maos = { min: r1(Math.min(...dm)), max: r1(Math.max(...dm)) };

  // 10. erros animados
  out.erros = ex.errors.map((e) => {
    CTX.IKFAIL = 0;
    let mx = 0, tMx = 0, jMx = '';
    const N = 80;
    for (let i = 0; i < N; i++) {
      const t = (i / N) * ex.T;
      const se = skel(poseAt(ex, e.K, t)), sc = skel(poseAt(ex, ex.K, t));
      for (const [nome, f] of JUNTAS) {
        const d = dist(f(se), f(sc));
        if (d > mx) { mx = d; tMx = t; jMx = nome; }
      }
    }
    return { id: e.id, view: e.view, ik: CTX.IKFAIL, distMax: r1(mx), t: r2(tMx), junta: jMx, fase: segAt(ex, tMx).label };
  });
  return out;
}

const resultados = {};
for (const ex of EX) {
  const r = medir(ex);
  r.uso = usoPorAnim[ex.id] != null && totalProgramas ? { prescricoes: usoPorAnim[ex.id], porCemProgramas: r2((usoPorAnim[ex.id] / totalProgramas) * 100), exercicios: exerciciosDaAnim[ex.id] } : null;
  r.exerciciosDaBiblioteca = exerciciosDaAnim[ex.id] ?? [];
  resultados[ex.id] = r;
}
const ids = Object.keys(resultados);

writeFileSync(join(SAIDA, 'medidas-de-hoje.json'), JSON.stringify({
  geradoPor: 'scripts/animacao-nova/medir-hoje.mjs',
  quadrosPorSegundo: 60,
  limitesNormais: NORMAL,
  usoOrigem: { arquivo: 'docs/revisoes/auditoria/inventario.md', coluna: 'vaga', totalProgramas },
  animacoes: resultados,
}, null, 1));

/* ---------- alertas e resumo ---------- */
const LIM = { razao: 0.3, fita: 1, simetria: 3, fecho: 3 };
function alertas(r) {
  const a = [];
  const desl = Object.entries(r.contatos).filter(([, c]) => c.classe === 'desliza');
  if (desl.length) a.push('contato desliza');
  if (Object.values(r.contatos).some((c) => c.atravessaChao)) a.push('atravessa o chão');
  if (r.piorSalto && r.piorSalto.razao > LIM.razao) a.push('tranco');
  const passou = Object.entries(r.amplitudes).filter(([, c]) => c.acimaDoMaximo).map(([k]) => k);
  if (passou.length) a.push('acima do máximo: ' + passou.join('/'));
  if (Object.values(r.fitas).some((f) => f.variacao > LIM.fita)) a.push('fita muda');
  if (r.ikfail.chamadas > 0) a.push('IK falha');
  if (r.fecho.razaoMax > 3 || r.fecho.dMax > LIM.fecho) a.push('ciclo não fecha');
  if (r.simetria.deveriaSerSimetrico && r.simetria.max > LIM.simetria) a.push('assimétrico');
  if (r.erros.some((e) => e.ik > 0)) a.push('IK falha em erro');
  if (r.equipFalhou) a.push('equip falhou');
  return a;
}
for (const id of ids) resultados[id].alertas = alertas(resultados[id]);

const cont = (f) => ids.filter((id) => f(resultados[id])).length;
const resumo = {
  total: ids.length,
  contatoDesliza: cont((r) => Object.values(r.contatos).some((c) => c.classe === 'desliza')),
  atravessaChao: cont((r) => Object.values(r.contatos).some((c) => c.atravessaChao)),
  saltoRazaoMaiorQue03: cont((r) => r.piorSalto && r.piorSalto.razao > 0.3),
  saltoRazaoMaiorQue015: cont((r) => r.piorSalto && r.piorSalto.razao > 0.15),
  acimaDoMaximoAlgumaAmplitude: cont((r) => Object.values(r.amplitudes).some((c) => c.acimaDoMaximo)),
  acimaDaMediaAlgumaAmplitude: cont((r) => Object.values(r.amplitudes).some((c) => c.acimaDaMedia)),
  fitaMudaMaisQue1cm: cont((r) => Object.values(r.fitas).some((f) => f.variacao > LIM.fita)),
  comFita: cont((r) => Object.keys(r.fitas).length > 0),
  comCaboOuElastico: cont((r) => Object.keys(r.cabos).length > 0),
  ikfailCicloCorreto: cont((r) => r.ikfail.chamadas > 0),
  ikfailErros: cont((r) => r.erros.some((e) => e.ik > 0)),
  cicloNaoFecha: cont((r) => r.alertas.includes('ciclo não fecha')),
  assimetricoDeveriaSerSimetrico: cont((r) => r.alertas.includes('assimétrico')),
  deveriaSerSimetrico: cont((r) => r.simetria.deveriaSerSimetrico),
  maosFora: cont((r) => r.maos.max - r.maos.min > 8),
  semAlerta: cont((r) => r.alertas.length === 0),
};
writeFileSync(join(SAIDA, 'medidas-de-hoje.json'), JSON.stringify({
  geradoPor: 'scripts/animacao-nova/medir-hoje.mjs',
  quadrosPorSegundo: 60,
  limitesNormais: NORMAL,
  limitesDosAlertas: LIM,
  usoOrigem: { arquivo: 'docs/revisoes/auditoria/inventario.md', coluna: 'vaga', totalProgramas },
  resumo,
  animacoes: resultados,
}, null, 1));

/* ---------- markdown ---------- */
const nf = (x, d = 1) => (x == null ? '–' : Number(x).toFixed(d).replace('.', ','));
const usoTxt = (r) => (r.uso ? nf(r.uso.porCemProgramas, 1) : '');
const deslizaTxt = (r) => {
  const l = Object.entries(r.contatos).filter(([, c]) => c.classe === 'desliza').map(([k, c]) => `${k} ${nf(c.extensao)}`);
  return l.length ? l.join('; ') : '–';
};
const saltoTxt = (r) => (r.piorSalto ? `${nf(r.piorSalto.razao, 2)}; ${r.piorSalto.ponto}; ${r.piorSalto.fase}` : '–');
const fechoTxt = (r) => `${nf(r.fecho.dMax)} cm (${nf(r.fecho.razaoMax, 1)}× o passo)`;
const simTxt = (r) => `${nf(r.simetria.max)}${r.simetria.deveriaSerSimetrico ? ' (deveria ser simétrico)' : ''}`;
const caboTxt = (r) => {
  const p = [];
  for (const [id, c] of Object.entries(r.cabos)) p.push(`${id} ${nf(c.min, 0)}–${nf(c.max, 0)}`);
  for (const [id, f] of Object.entries(r.fitas)) p.push(`fita ${id} ${nf(f.min, 0)}–${nf(f.max, 0)} (Δ${nf(f.variacao)})`);
  return p.length ? p.join('; ') : '–';
};
const tempoTxt = (r) => `${nf(r.tempos.excentrica, 1)}/${nf(r.tempos.concentrica, 1)} (total ${nf(r.tempos.total, 1)})`;
const fmtAmp = (r, k) => `${nf(r.amplitudes[k].pico, 0)}${r.amplitudes[k].acimaDoMaximo ? ' !!' : r.amplitudes[k].acimaDaMedia ? ' !' : ''}`;

const top = (nome, chave, fmt, filtro = () => true) => {
  const l = ids.filter((id) => filtro(resultados[id]) && chave(resultados[id]) != null)
    .sort((a, b) => chave(resultados[b]) - chave(resultados[a])).slice(0, 15);
  return `### ${nome}\n\n| # | id | valor |\n| ---: | --- | --- |\n` + l.map((id, i) => `| ${i + 1} | ${id} | ${fmt(resultados[id])} |`).join('\n') + '\n';
};
const maxDesliza = (r) => Math.max(0, ...Object.values(r.contatos).filter((c) => c.classe === 'desliza').map((c) => c.extensao));
const excedeMax = (r) => Math.max(...Object.values(r.amplitudes).filter((c) => c.max != null).map((c) => c.pico / c.max));
const maxFita = (r) => Math.max(0, ...Object.values(r.fitas).map((f) => f.variacao));

const L = [];
L.push('# Medidas do motor de hoje (90 animações)');
L.push('');
L.push('> Gerado por `node scripts/animacao-nova/medir-hoje.mjs`. Não editar à mão. Cada animação é amostrada a 60 quadros por segundo (n = round(T × 60), t = i/n × T). Coordenadas em cm; ângulos em graus. Os números completos estão em `medidas-de-hoje.json`.');
L.push('');
L.push('## Resumo');
L.push('');
const R = resumo;
L.push(`- Animações medidas: **${R.total}**.`);
L.push(`- Com algum contato que **desliza** (extensão de 0,5 a 4 cm; suspeito de contato que deveria estar preso): **${R.contatoDesliza}**.`);
L.push(`- Com algum ponto que **atravessa o chão** (y < −0,5 cm em dedo do pé, calcanhar, pegada ou joelho): **${R.atravessaChao}**.`);
L.push(`- Com **salto de velocidade** com razão salto/pico > 0,3 (tranco): **${R.saltoRazaoMaiorQue03}**; > 0,15: **${R.saltoRazaoMaiorQue015}**. (Só entram pontos com velocidade de pico ≥ 5 cm/s; o quadro n−1 → 0 conta, como no laço do app.)`);
L.push(`- Que passam do **máximo observado** de alguma amplitude (joelho, cotovelo, quadril, ombro, dorsiflexão, flexão plantar): **${R.acimaDoMaximoAlgumaAmplitude}**; que passam da média de alguma (inclui o punho): **${R.acimaDaMediaAlgumaAmplitude}**.`);
L.push(`- Com fita de suspensão: ${R.comFita}; **fita que muda de comprimento > 1 cm**: **${R.fitaMudaMaisQue1cm}**.`);
L.push(`- Com cabo ou elástico: ${R.comCaboOuElastico}.`);
L.push(`- IK que falha (IKFAIL > 0) no ciclo correto: **${R.ikfailCicloCorreto}**; em algum erro animado: **${R.ikfailErros}**.`);
L.push(`- Ciclo que não fecha (último quadro a mais de 3 cm do primeiro, ou a mais de 3 passos médios): **${R.cicloNaoFecha}**.`);
L.push(`- Simetria: ${R.deveriaSerSimetrico} animações só têm músculos primários 'RL' (deveriam ser simétricas); **${R.assimetricoDeveriaSerSimetrico}** delas têm diferença > 3 cm entre o esquerdo e o espelho do direito (G, E, K, A).`);
L.push(`- Distância entre as mãos varia mais de 8 cm no ciclo: ${R.maosFora}.`);
L.push(`- Sem nenhum alerta: **${R.semAlerta}**.`);
L.push('');
L.push('### De onde vem a coluna "uso (%)"');
L.push('');
const comUso = ids.filter((id) => resultados[id].uso).length;
L.push(`Vem de \`docs/revisoes/auditoria/inventario.md\`, coluna **vaga** (quantas vezes o exercício foi prescrito no teste de estresse de ${totalProgramas?.toLocaleString('pt-BR')} programas fictícios). Ligação exercício → animação por \`animacaoId\` em \`src/domain/biblioteca/exercicios.json\` (quando mais de um exercício usa a mesma animação, as vagas são somadas). **uso (%) = vagas ÷ programas × 100**, isto é, prescrições por 100 programas: como o mesmo exercício pode entrar em mais de um dia do mesmo programa, o valor pode passar de 100 e não é a "fatia de programas que têm o exercício". Há uso para ${comUso} das ${ids.length} animações; as demais ficam em branco (o inventário não traz o exercício). \`regua.json\`, \`regua.md\` e \`catalogo/grade.json\` só têm contagens por cenário e defeitos, sem frequência por exercício, e não foram usados.`);
L.push('');
L.push('### Como ler a tabela');
L.push('');
L.push('- Colunas de ângulo: o pico (máximo) no ciclo entre os dois lados. `!` = acima da média normal; `!!` = acima do máximo observado (CDC, Soucie 2011). Normal (média / máximo): joelho 140/164, cotovelo 148/166, quadril 132/159, ombro 170/192, dorsiflexão 15/48, flexão plantar 57/90; punho: AAOS extensão 70, flexão 80.');
L.push('- Punho: o motor mede a dobra sem sinal (não sabe se é flexão ou extensão); por isso `!` usa 70 (o menor dos dois) e não há máximo.');
L.push('- Elevação do braço = ângulo entre o braço (S→E) e o eixo do tronco para baixo; é comparada com a flexão do ombro (170/192).');
L.push('- Contatos que deslizam: ponta (toe, heel, G, K) e lado, com a extensão do caminho em cm.');
L.push('- Maior salto de velocidade: razão salto/pico; ponto; fase em que ocorre. Razão < 0,15 = suave.');
L.push('- Fecho: maior distância (cm) entre o último quadro e o primeiro, entre os pontos P, N, Hc, G, E, K (R/L), e quantos passos médios isso vale (≈ 1× = fecha bem).');
L.push('- Simetria: maior diferença (cm) entre o lado esquerdo e o espelho do direito para G, E, K, A.');
L.push('- Cabo/fita: comprimento mín–máx (cm) no ciclo, por id. Para a fita, Δ = mudança da fita mais longa do quadro.');
L.push('- exc/conc: segundos de fase excêntrica / concêntrica.');
L.push('');
L.push('## Tabela por animação');
L.push('');
L.push('| id | uso (%) | joelho máx | cotovelo máx | quadril máx | ombro máx | tornozelo (dorsi máx) | punho máx | contatos que deslizam (cm) | maior salto de velocidade (razão; ponto; fase) | fecho do ciclo | simetria | cabo/fita (mín–máx) | exc/conc (s) | alertas |');
L.push('| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- |');
for (const id of ids) {
  const r = resultados[id];
  L.push(`| ${id} | ${usoTxt(r)} | ${fmtAmp(r, 'joelho')} | ${fmtAmp(r, 'cotovelo')} | ${fmtAmp(r, 'quadril')} | ${fmtAmp(r, 'ombro')} | ${fmtAmp(r, 'dorsiflexao')} | ${fmtAmp(r, 'punho')} | ${deslizaTxt(r)} | ${saltoTxt(r)} | ${fechoTxt(r)} | ${simTxt(r)} | ${caboTxt(r)} | ${tempoTxt(r)} | ${r.alertas.join(', ') || '–'} |`);
}
L.push('');
L.push('## As 15 piores em cada critério');
L.push('');
L.push(top('Contato que desliza (maior extensão, cm)', maxDesliza, (r) => nf(maxDesliza(r)) + ' cm: ' + deslizaTxt(r), (r) => maxDesliza(r) > 0));
L.push(top('Salto de velocidade (razão salto/pico)', (r) => r.piorSalto?.razao, (r) => `${nf(r.piorSalto.razao, 2)} (${r.piorSalto.ponto}; ${r.piorSalto.fase}; salto ${nf(r.piorSalto.salto)} cm/s, pico ${nf(r.piorSalto.pico)} cm/s)`));
L.push(top('Mais acima do máximo de amplitude (pico ÷ máximo observado, maior entre as amplitudes)', excedeMax, (r) => {
  const [k, c] = Object.entries(r.amplitudes).filter(([, c]) => c.max != null).sort((a, b) => b[1].pico / b[1].max - a[1].pico / a[1].max)[0];
  return `${k} ${nf(c.pico, 0)}° (máximo ${c.max}°; ${nf((c.pico / c.max) * 100, 0)}%)`;
}));
L.push(top('Ciclo que não fecha (distância do último ao primeiro quadro, cm)', (r) => r.fecho.dMax, (r) => `${nf(r.fecho.dMax)} cm (até ${nf(r.fecho.razaoMax, 1)}× o passo médio)`));
L.push(top('Assimetria em animação que deveria ser simétrica (cm)', (r) => r.simetria.max, (r) => nf(r.simetria.max) + ' cm ' + JSON.stringify(r.simetria.diferenca), (r) => r.simetria.deveriaSerSimetrico));
L.push(top('Fita que muda de comprimento (cm)', maxFita, (r) => nf(maxFita(r)) + ' cm: ' + caboTxt(r), (r) => Object.keys(r.fitas).length > 0));
L.push(top('Cabo ou elástico com maior variação de comprimento (cm)', (r) => Math.max(0, ...Object.values(r.cabos).map((c) => c.variacao)), (r) => caboTxt(r), (r) => Object.keys(r.cabos).length > 0));
L.push(top('Atravessa o chão (menor altura, cm; mais negativo primeiro)', (r) => -Math.min(...Object.values(r.contatos).map((c) => c.yMin)), (r) => { const [k, c] = Object.entries(r.contatos).sort((a, b) => a[1].yMin - b[1].yMin)[0]; return `${k} y mín ${nf(c.yMin, 2)} cm`; }, (r) => Object.values(r.contatos).some((c) => c.atravessaChao)));
L.push(top('Mãos: maior variação da distância entre elas (cm)', (r) => r.maos.max - r.maos.min, (r) => `${nf(r.maos.min)}–${nf(r.maos.max)} cm`));
L.push(top('Erro animado mais longe do certo (cm)', (r) => Math.max(0, ...r.erros.map((e) => e.distMax)), (r) => { const e = [...r.erros].sort((a, b) => b.distMax - a.distMax)[0]; return `${e.id}: ${nf(e.distMax)} cm (${e.junta}, t = ${nf(e.t, 2)} s, ${e.fase})`; }, (r) => r.erros.length > 0));
L.push(top('IK que falha (chamadas no ciclo correto; erros somam à parte)', (r) => r.ikfail.chamadas + r.erros.reduce((s, e) => s + e.ik, 0), (r) => `correto ${r.ikfail.chamadas} (${r.ikfail.quadros} quadros); erros ${r.erros.filter((e) => e.ik > 0).map((e) => `${e.id} ${e.ik}`).join(', ') || '0'}`, (r) => r.ikfail.chamadas + r.erros.reduce((s, e) => s + e.ik, 0) > 0));
L.push(top('Mais frequentes nos programas com alerta (uso % das animações que têm algum alerta)', (r) => r.uso?.porCemProgramas, (r) => `${nf(r.uso.porCemProgramas)} % — ${r.alertas.join(', ')}`, (r) => r.uso && r.alertas.length > 0));
L.push('');
L.push('## O que o motor não permite medir');
L.push('');
L.push('- Dobra do punho sem sinal (flexão ou extensão): só existe o ângulo entre os dois segmentos. Não há máximo observado para ele aqui.');
L.push('- Não há modelo de pé separado do tornozelo: a dorsiflexão usa o vetor tornozelo→dedo (toe) e a flexão plantar vem do mínimo desse mesmo ângulo.');
L.push('- Torção do antebraço (pronação/supinação), rotação do quadril e abdução do ombro não existem como ângulo: o ombro é medido só como o ângulo entre o braço e o tronco.');
L.push('- Colisão entre corpo e equipamento não é medida (só o chão em y = 0 para pontas do pé, calcanhar, pegada e joelho).');
L.push('- Cabo e elástico: `_cab` guarda só o menor comprimento por quadro; como cada id é chamado uma vez por quadro, o valor por quadro é o comprimento. Fita: só há min e max por quadro, e a variação usa a fita mais longa.');
fmtSave();
function fmtSave() { writeFileSync(join(SAIDA, 'medidas-de-hoje.md'), L.join('\n') + '\n'); }

/* ---------- folhas ---------- */
const pngs = [];
const varre = (d) => {
  if (!existsSync(d)) return;
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) { if (!p.startsWith(SAIDA)) varre(p); } else if (e.endsWith('.png')) pngs.push(p);
  }
};
varre('docs/revisoes');
// folha de contatos existente: docs/revisoes/**/folhas/<id>.png (ou r4/<id>.png)
const achaFolha = (id) => pngs.find((p) => /\/folhas\/[^/]+$/.test(p) && p.endsWith(`/${id}.png`)) ?? pngs.find((p) => p.includes('/r4/') && p.endsWith(`/${id}.png`));
const F = [];
let geradas = 0, faltam = 0, existentes = 0;
mkdirSync(join(SAIDA, 'folhas-hoje'), { recursive: true });
for (const id of ids) {
  let p = achaFolha(id);
  let origem = 'já existia';
  if (p) existentes++;
  else {
    const dest = join(SAIDA, 'folhas-hoje', `${id}.png`);
    if (!existsSync(dest) && GERAR_FOLHAS) {
      execFileSync('node', ['scripts/folha-animacao.mjs', id, dest, '--estilo=a2'], { stdio: 'ignore' });
    }
    if (existsSync(dest)) { p = dest; origem = 'gerada agora (estilo a2)'; geradas++; } else { origem = 'não existe (rodar com --folhas)'; faltam++; }
  }
  F.push(`| ${id} | ${p ?? '–'} | ${origem} |`);
}
writeFileSync(join(SAIDA, 'folhas-de-hoje.md'), [
  '# Folhas de contatos de hoje',
  '',
  '> Gerado por `node scripts/animacao-nova/medir-hoje.mjs --folhas`. Procura `docs/revisoes/**/folhas/<id>.png` e `docs/revisoes/r4/<id>.png`; o que falta é gerado com `node scripts/folha-animacao.mjs <id> docs/revisoes/animacao-nova/diagnostico/folhas-hoje/<id>.png --estilo=a2`.',
  '',
  `${ids.length} animações: ${existentes} com folha já existente, ${geradas} geradas agora, ${faltam} sem folha.`,
  '',
  '| id | caminho da folha | origem |',
  '| --- | --- | --- |',
  ...F, '',
].join('\n'));

console.log(JSON.stringify({ resumo, folhas: { existentes, geradas, faltam } }, null, 1));
