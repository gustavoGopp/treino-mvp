// @ts-nocheck
// Estilos do boneco (R4, levado a todos os exercícios a pedido do Gustavo em 02/11/2026).
// 'a' é o boneco padrão do app; 'atual' é o clássico (o do guia original); 'b' é a silhueta.
// Com 'atual', tudo vai para montarSvg (../svg.ts) e a saída é a de sempre, caractere por caractere: é esse estilo
// que a regressão compara com o guia original. Com 'a' ou 'b', a cena repete os passos de scene() (../cena.ts),
// com as mesmas poses e o mesmo equipamento, trocando só o corpo e os músculos. A caixa é a do estilo clássico.
import { concTimes, getPt, poseAt, scene, segAt } from '../cena';
import { CTX } from '../contexto';
import { ARROW3, C3, L3, PATH2, TX, VIEWS, body, f1, textoSvg } from '../desenho';
import { B } from '../esqueleto';
import { skel } from '../esqueleto';
import { Z, add, comb, len, sub } from '../math';
import { caixa, montarSvg } from '../svg';
import { corpoNovo } from './corpo';
import { medida, musculosNovos } from './musculos';

// O Boneco ('a') usa o acabamento da auditoria (proposta 2, escolhida pelo Gustavo em 04/11/2026; piloto e lote
// aprovados no mesmo dia; docs/revisoes/boneco-acabamento/). 'a2' ficou como outro nome do mesmo boneco, para as
// folhas e os scripts da revisão.
export type Estilo = 'atual' | 'a' | 'b' | 'a2';
export const ESTILOS: Estilo[] = ['atual', 'a', 'b'];
export const NOMES_ESTILO: Record<Estilo, string> = { atual: 'Clássico', a: 'Boneco', b: 'Silhueta', a2: 'Boneco' };
/** Exercícios do experimento do R4 (os primeiros a ganhar os músculos anatômicos e uma lista própria em LISTA). */
export const EXERCICIOS_R4 = ['puxada-unilateral', 'goblet'];

// Guias que mudam nos estilos novos. Face pull, vista de cima: o rótulo saía no topo do palco, atrás da caixa da
// fase do app; desce para perto do cabo (pedido do Gustavo no R3, corrigido no estilo novo em 02/11/2026).
const GUIAS = {
  'face-pull': {
    top(sk) {
      // ao lado do cabo, abaixo do ponto em que a corda se junta (fora do alcance dos braços)
      const p = [sk.N[0], sk.N[1], sk.N[2] + 100];
      TX(p, 'mãos abrem ao lado', { cls: 'lbl-g', dx: 6 });
      TX(p, 'da cabeça', { cls: 'lbl-g', dx: 6, dy: 14 });
    },
  },
};

// As cadeias do corpo (tronco e cabeça, cada braço, cada perna) e a distância 3D entre duas juntas: servem ao fantasma
// do acabamento A2, ao "erro sobre o certo" e ao instante do erro (R4, 05/11/2026).
const CADEIAS = (() => {
  const c = [[['P'], ['M'], ['N'], ['Hc']]];
  for (const k of ['R', 'L']) {
    c.push([['N'], [k, 'S'], [k, 'E'], [k, 'W'], [k, 'G']]);
    c.push([['P'], [k, 'Hp'], [k, 'K'], [k, 'A'], [k, 'toe']]);
  }
  return c;
})();
const junta = (s, c) => (c.length === 1 ? s[c[0]] : s.side[c[0]][c[1]]);
const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
/** Diferença (cm) entre o certo e o errado: a maior distância entre juntas homólogas. */
const difDasPoses = (sk, ske) => Math.max(...CADEIAS.flatMap((cad) => cad.map((c) => dist3(junta(sk, c), junta(ske, c)))));
/** Diferença mínima (cm) para uma cadeia contar como "o que muda" no modo Erros. */
export const DIF_MINIMA_DA_CADEIA = 3;

// Acabamento A2: o fantasma verde só nas cadeias (tronco e cabeça, cada braço, cada perna) em que o certo e o
// errado diferem mais de 3 cm; o resto do corpo, igual nos dois, fica só com a figura que erra.
function fantasmaDif(sk, ske) {
  let desenhadas = 0;
  for (const cad of CADEIAS) {
    const dif = Math.max(...cad.map((c) => dist3(junta(sk, c), junta(ske, c))));
    if (dif < DIF_MINIMA_DA_CADEIA) continue;
    desenhadas++;
    const Q = cad.map((c) => junta(sk, c));
    const n0 = CTX.prims.length;
    for (let i = 0; i < Q.length - 1; i++) L3(Q[i], Q[i + 1], 'gh', 3.2);
    if (cad[cad.length - 1][0] === 'Hc') C3(sk.Hc, B.head, 'gh', { w: 1.6 });
    for (let i = n0; i < CTX.prims.length; i++) CTX.prims[i].l = 1.5;
  }
  return desenhadas;
}

// "Erro sobre o certo" (R4; piloto na auditoria de 04/11/2026, docs/revisoes/auditoria-fable.md, Parte D): desenha, em
// vermelho tracejado, só as cadeias da pose errada que diferem mais de 3 cm da certa, e escreve o nome do erro ao lado
// da junta que mais se afasta, do lado do palco (box) em que há espaço. Devolve quantas cadeias desenhou.
function erroSobreOCerto(sk, ske, titulo, box) {
  let desenhadas = 0, maior = 0, ondeRotulo = null;
  for (const cad of CADEIAS) {
    const difs = cad.map((c) => dist3(junta(sk, c), junta(ske, c)));
    const dif = Math.max(...difs);
    if (dif < DIF_MINIMA_DA_CADEIA) continue;
    desenhadas++;
    const Q = cad.map((c) => junta(ske, c));
    const n0 = CTX.prims.length;
    for (let i = 0; i < Q.length - 1; i++) L3(Q[i], Q[i + 1], 'gh-e', 3.6);
    if (cad[cad.length - 1][0] === 'Hc') C3(ske.Hc, B.head, 'hd-ge', { w: 2 });
    for (let i = n0; i < CTX.prims.length; i++) CTX.prims[i].l = 1.6;
    if (dif > maior) { maior = dif; ondeRotulo = Q[difs.indexOf(dif)]; }
  }
  if (desenhadas && titulo) {
    // o rótulo fica do lado em que há espaço: à direita da junta na metade esquerda do palco, e vice-versa; se mesmo
    // assim não cabe no palco (texto longo numa figura larga), fica centrado acima da junta, dentro do palco
    const q = CTX.PJ(ondeRotulo);
    const larg = 0.55 * 11 * CTX.KS * titulo.length;
    let direita = q[0] > box[0] + box[2] / 2;
    if (direita && q[0] - 9 * CTX.KS - larg < box[0]) direita = false;
    if (!direita && q[0] + 9 * CTX.KS + larg > box[0] + box[2]) {
      const x = Math.max(box[0] + larg / 2 + 2 * CTX.KS, Math.min(box[0] + box[2] - larg / 2 - 2 * CTX.KS, q[0]));
      TX([x, q[1] - 14 * CTX.KS], titulo, { scr: true, cls: 'lbl-e', anchor: 'middle', layer: 4.5 });
    } else TX(ondeRotulo, titulo, { cls: 'lbl-e', dx: direita ? -9 : 9, dy: -9, anchor: direita ? 'end' : 'start', layer: 4.5 });
  }
  return desenhadas;
}

/**
 * O instante do ciclo em que o certo e o errado mais se afastam (a maior distância entre juntas, em cm, em 48
 * amostras; empate fica com o menor t). É onde o guia abre o modo Erros e a folha tira o quadro do erro (R4; antes,
 * o meio da 3ª fase, em que alguns erros quase não apareciam). Em 3D: independe da vista. Determinístico.
 */
const instantes = {};
export function instanteDoErro(ex, errIdx = 0) {
  const k = ex.id + '|' + errIdx;
  if (instantes[k] !== undefined) return instantes[k];
  const e = ex.errors[errIdx];
  let melhor = 0, maior = -1;
  for (let i = 0; i < 48; i++) {
    const t = (i / 48) * ex.T;
    const d = difDasPoses(skel(poseAt(ex, ex.K, t)), skel(poseAt(ex, e.K, t)));
    if (d > maior) { maior = d; melhor = t; }
  }
  return (instantes[k] = melhor);
}
/** A maior diferença (cm) entre o certo e o errado ao longo do ciclo: abaixo de 3 cm, o erro é "pequeno" (escápulas, pegada). */
export function difMaximaDoErro(ex, errIdx = 0) {
  let maior = 0;
  for (let i = 0; i < 48; i++) {
    const t = (i / 48) * ex.T;
    maior = Math.max(maior, difDasPoses(skel(poseAt(ex, ex.K, t)), skel(poseAt(ex, ex.errors[errIdx].K, t))));
  }
  return maior;
}

/** Mesmos passos de scene() (../cena.ts), com o corpo e os músculos do estilo novo. */
export function cenaEstilo(ex, view, mode, t, estilo, errIdx = 0, box = null) {
  CTX.VIEW = view;
  CTX.PJ = VIEWS[view].proj;
  CTX.prims = [];
  const sk = skel(poseAt(ex, ex.K, t));
  // a figura fantasma (o certo, no modo Erros; o início e o fim, na Trajetória) fica por cima, em traço fino
  const fantasma = (s, pal) => {
    const n0 = CTX.prims.length;
    body(s, pal);
    for (let i = n0; i < CTX.prims.length; i++) CTX.prims[i].l = 1.5;
  };
  const AC = CTX.ACABAMENTO || {};
  if (mode === 'err' && AC.erroInvertido && !(AC.erroPequeno === 'hoje' && difMaximaDoErro(ex, errIdx || 0) < DIF_MINIMA_DA_CADEIA)) {
    // R4 (decisão do Gustavo, 05/11/2026; piloto na auditoria de 04/11): o certo é a figura cheia, e o erro aparece
    // só na cadeia que muda, em vermelho tracejado, com o nome do erro (CTX.ROTULO_ERRO, o título do texto do guia).
    const e = ex.errors[errIdx || 0];
    const ske = skel(poseAt(ex, e.K, t));
    ex._pal = 'n';
    ex.equip(sk);
    corpoNovo(sk, estilo);
    if (AC.erroEquip && ['R', 'L'].some((k) => dist3(sk.side[k].G, ske.side[k].G) >= DIF_MINIMA_DA_CADEIA)) {
      // decisão (b) do Gustavo (05/11/2026): o equipamento da pose errada, em vermelho translúcido, quando a mão que erra se move
      const n0 = CTX.prims.length;
      ex._pal = 'e';
      ex.equip(ske);
      ex._pal = 'n';
      for (let i = n0; i < CTX.prims.length; i++) { CTX.prims[i].l = 1.6; CTX.prims[i].s = CTX.prims[i].s.replace(/class="/, 'class="eq-err '); }
    }
    const b = box ?? caixa(ex, view);
    if (!erroSobreOCerto(sk, ske, CTX.ROTULO_ERRO ?? e.id, b)) {
      // erro pequeno demais para uma cadeia (na biblioteca de hoje, só o punho dobrado com o kettlebell: o corpo não
      // muda, o objeto sim): o equipamento da pose errada em vermelho, com o nome do erro na mão; ou, como opção da
      // folha (c), a figura errada inteira em contorno vermelho por cima
      const n0 = CTX.prims.length;
      if (AC.erroPequeno === 'contorno') {
        body(ske, 'e');
        for (let i = n0; i < CTX.prims.length; i++) CTX.prims[i].l = 1.5;
      } else {
        ex._pal = 'e';
        ex.equip(ske);
        ex._pal = 'n';
        for (let i = n0; i < CTX.prims.length; i++) { CTX.prims[i].l = 1.6; CTX.prims[i].s = CTX.prims[i].s.replace(/class="/, 'class="eq-err '); }
        const titulo = CTX.ROTULO_ERRO ?? e.id;
        const q = CTX.PJ(ske.side.R.G);
        const direita = q[0] > b[0] + b[2] / 2;
        TX(ske.side.R.G, titulo, { cls: 'lbl-e', dx: direita ? -12 : 12, dy: -9, anchor: direita ? 'end' : 'start', layer: 4.5 });
      }
    }
    return sk;
  }
  if (mode === 'err') {
    const e = ex.errors[errIdx || 0];
    const ske = skel(poseAt(ex, e.K, t));
    ex._pal = 'e';
    ex.equip(ske);
    ex._pal = 'n';
    corpoNovo(ske, estilo, true);
    // Erro pequeno (escápulas, por exemplo: nenhuma cadeia muda 3 cm), o fantasma inteiro, como no estilo A.
    if (!CTX.ACABAMENTO?.fantasmaDif || !fantasmaDif(sk, ske)) fantasma(sk, 'g');
    return sk;
  }
  ex._pal = 'n';
  ex.equip(sk);
  const partes = corpoNovo(sk, estilo);
  if (mode === 'mus') musculosNovos(ex, sk, partes, estilo);
  if (mode === 'tec') {
    const g = GUIAS[ex.id]?.[view] ?? ex.guides?.[view];
    if (g) g.call(ex, sk);
    if (AC.rotulosFora) rotulosForaDoCorpo(ex, view, box ?? caixa(ex, view));
  }
  if (mode === 'traj') {
    const a = skel(ex.K[ex.ext[0]]),
      b = skel(ex.K[ex.ext[1]]);
    fantasma(a, 'g2');
    fantasma(b, 'g');
    const ts = concTimes(ex, 36);
    const list = (ex.paths && ex.paths[view]) || [];
    list.forEach(([key, side, label], i) => {
      const Q = ts.map((tt) => CTX.PJ(getPt(skel(poseAt(ex, ex.K, tt)), key, side)));
      const elbow = key === 'E' || key === 'S' || key === 'K' || (key === 'P' && i > 0);
      PATH2(Q, elbow ? 'pt2' : 'pt', elbow ? 1.2 : 1.8, { dash: elbow ? '2.5 2' : '', asz: elbow ? 3.4 : 4.4 });
      if (label && i === 0) TX(Q[Q.length - 1], label, { scr: true, cls: 'lbl-p', dx: 7, dy: -7 });
    });
    const tw = ex.tower || (ex.towers && ex.towers[0]);
    if (tw && ex._liftRange && view !== 'top' && Math.abs(CTX.PJ([tw.x, 0, tw.z])[0] - CTX.PJ(sk.P)[0]) > 40) {
      const base = [tw.x, 0, tw.z];
      const pos = comb(1, base, 18, ex.tower ? ex.tower.ac : Z, -7, tw.out);
      const a3 = add(pos, [0, 36 + ex._liftRange[0], 0]),
        b3 = add(pos, [0, 36 + ex._liftRange[1], 0]);
      if (len(sub(CTX.PJ(a3), CTX.PJ(b3))) > 4) {
        ARROW3(a3, b3, 'pt', 1.4, 'pta');
        ARROW3(b3, a3, 'pt', 1.4, 'pta');
        TX(b3, 'carga', { cls: 'lbl-p', dx: 5, dy: -4 });
      }
    }
  }
  return sk;
}

/** A caixa do corpo na tela, ao longo do ciclo ([x0, y0, x1, y1]; as juntas com o raio da cabeça e dos membros), com cache. */
const corpos = {};
export function caixaDoCorpo(ex, view) {
  const k = ex.id + '|' + view;
  if (corpos[k]) return corpos[k];
  const PJ = VIEWS[view].proj;
  const m = [1e9, -1e9, 1e9, -1e9];
  for (let i = 0; i < 24; i++) {
    const sk = skel(poseAt(ex, ex.K, (i / 24) * ex.T));
    const pts = [sk.P, sk.M, sk.N, sk.Hc];
    for (const s of ['R', 'L']) { const d = sk.side[s]; pts.push(d.S, d.E, d.W, d.G, d.Hp, d.K, d.A, d.heel, d.toe); }
    for (const p of pts) { const q = PJ(p); const r = p === sk.Hc ? 12 : 9; m[0] = Math.min(m[0], q[0] - r); m[1] = Math.max(m[1], q[0] + r); m[2] = Math.min(m[2], q[1] - r); m[3] = Math.max(m[3], q[1] + r); }
  }
  return (corpos[k] = [m[0], m[2], m[1], m[3]]);
}

// Enquadramento "perto do corpo": a mesma conta de fit() (../cena.ts), mas só com o esqueleto ao longo do ciclo,
// sem a torre e o equipamento alto. Serve para separar o efeito do estilo do efeito do tamanho da figura na tela.
const caixasPerto = {};
export function caixaPerto(ex, view) {
  const k = ex.id + '|' + view;
  if (caixasPerto[k]) return caixasPerto[k];
  let [x0, y0, x1, y1] = caixaDoCorpo(ex, view);
  if (view !== 'top') y1 = Math.max(y1, 0);
  let w = x1 - x0, h = y1 - y0;
  // folga maior em cima: a mão e a pegada passam do topo da cabeça na puxada (03/11/2026)
  const pad = 0.07; x0 -= w * pad; x1 += w * pad; y0 -= h * pad * 3.2; y1 += h * pad * 0.6; w = x1 - x0; h = y1 - y0;
  y0 -= h * 0.08; h = y1 - y0;
  if (w / h > 4 / 3) { const nh = (w * 3) / 4; y0 -= (nh - h) / 2 + (nh - h) * 0.1; h = nh; } else { const nw = (h * 4) / 3; x0 -= (nw - w) / 2; w = nw; }
  return (caixasPerto[k] = [x0, y0, w, h]);
}

/*
 * Rótulos fora do corpo (R4, proposta 2; decisão do Gustavo, 05/11/2026). Um passo depois de desenhar o modo Técnica:
 * um rótulo de técnica (lbl-g) cujo texto passa por cima do corpo em algum instante do ciclo ganha um deslocamento
 * fixo em relação à sua âncora, escolhido uma vez por exercício e vista (o mais perto da âncora que, em todos os 24
 * instantes do ciclo, fica dentro do palco, abaixo da caixa da fase do app, fora do corpo e sem cruzar outro rótulo;
 * de preferência com a linha até o ponto sem atravessar o corpo). Como o deslocamento é fixo, o rótulo acompanha a
 * âncora sem pular de lado entre os quadros. Sem lugar, fica onde está. Rótulos que já estão fora não se movem. Os
 * rótulos de duas linhas (mesma âncora) viajam juntos. Determinístico (sem fonte: a largura é estimada em 0,6 em por
 * caractere; os rótulos que não se movem saem byte a byte como antes).
 */
const EM = 0.6;
/** Fração do alto do palco coberta pela caixa da fase e da respiração do app (styles.css, .hud). */
const HUD = 0.2;
const larguraDoTexto = (tx) => EM * tx.size * tx.str.length + 2 * CTX.KS;
function caixaDoTexto(tx) {
  const w = larguraDoTexto(tx);
  const x0 = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
  return [x0, tx.y - 0.8 * tx.size, x0 + w, tx.y + 0.25 * tx.size];
}
const cruza = (a, b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
/** O retângulo [x0, y0, x1, y1] encosta numa cápsula [ax, ay, bx, by, raio]? (a cápsula amostrada em 6 pontos). */
function tocaOCorpo(ret, caps) {
  for (const [x0, y0, x1, y1, r] of caps)
    for (let i = 0; i <= 5; i++) {
      const x = x0 + ((x1 - x0) * i) / 5, y = y0 + ((y1 - y0) * i) / 5;
      const dx = Math.max(ret[0] - x, 0, x - ret[2]), dy = Math.max(ret[1] - y, 0, y - ret[3]);
      if (dx * dx + dy * dy < r * r) return true;
    }
  return false;
}
/** O segmento (a, b) passa por dentro de alguma cápsula? (amostrado em 8 pontos). */
function atravessaOCorpo(a, b, caps) {
  for (let i = 1; i < 8; i++) {
    const x = a[0] + ((b[0] - a[0]) * i) / 8, y = a[1] + ((b[1] - a[1]) * i) / 8;
    if (tocaOCorpo([x, y, x, y], caps)) return true;
  }
  return false;
}
const N_CICLO = 24;
/**
 * O ciclo de um exercício numa vista, para os rótulos: as partes do corpo em cada instante, como cápsulas
 * [x0, y0, x1, y1, raio] na tela, e as âncoras dos rótulos de técnica em cada instante (as guias são desenhadas de
 * novo, com as prims descartadas). Cache por exercício e vista.
 */
const ciclos = {};
function cicloDosRotulos(ex, view) {
  const k = ex.id + '|' + view;
  if (ciclos[k]) return ciclos[k];
  const PJ = VIEWS[view].proj;
  const quadros = [];
  const g = GUIAS[ex.id]?.[view] ?? ex.guides?.[view];
  const prims = CTX.prims, meas = CTX.MEAS;
  CTX.MEAS = null;
  for (let i = 0; i < N_CICLO; i++) {
    const sk = skel(poseAt(ex, ex.K, (i / N_CICLO) * ex.T));
    const caps = [];
    const cap = (a, b, r) => { const A = PJ(a), Bq = PJ(b); caps.push([A[0], A[1], Bq[0], Bq[1], r]); };
    cap(sk.P, sk.M, 9); cap(sk.M, sk.N, 9); cap(sk.N, sk.Hc, 5); cap(sk.Hc, sk.Hc, B.head);
    for (const s of ['R', 'L']) { const d = sk.side[s]; cap(d.S, d.E, 5); cap(d.E, d.W, 4); cap(d.W, d.G, 4); cap(d.Hp, d.K, 7); cap(d.K, d.A, 5); cap(d.heel, d.toe, 3); }
    CTX.prims = [];
    if (g) g.call(ex, sk);
    // uma âncora por rótulo (as linhas de um rótulo de 2 linhas têm a mesma âncora), na ordem do desenho
    const ancoras = [];
    const vistas = new Set();
    for (const p of CTX.prims) {
      if (p.tx?.cls !== 'lbl-g') continue;
      const kk = f1(p.tx.ax) + ',' + f1(p.tx.ay);
      if (vistas.has(kk)) continue;
      vistas.add(kk);
      ancoras.push([p.tx.ax, p.tx.ay]);
    }
    quadros.push({ caps, ancoras });
  }
  CTX.prims = prims;
  CTX.MEAS = meas;
  return (ciclos[k] = { quadros });
}
/** Quebra um texto em duas linhas, na vírgula ou no espaço mais perto do meio; null se não dá para quebrar. */
function quebrar(str) {
  const meio = str.length / 2;
  let melhor = -1, dist = 1e9;
  for (let i = 1; i < str.length - 1; i++) {
    if (str[i] !== ' ') continue;
    const corte = str[i - 1] === ',' ? i : i; // depois da vírgula, se houver
    const d = Math.abs(corte - meio) - (str[i - 1] === ',' ? 4 : 0); // a vírgula ganha uma folga
    if (d < dist) { dist = d; melhor = corte; }
  }
  return melhor < 0 ? null : [str.slice(0, melhor).trimEnd(), str.slice(melhor + 1).trimStart()];
}
/** As decisões de cada rótulo (mover ou não, e o deslocamento), por exercício, vista e escala de texto. */
const decisoes = {};
function rotulosForaDoCorpo(ex, view, box) {
  const grupos = []; // índices das prims de cada rótulo (as linhas de um rótulo de 2 linhas têm a mesma âncora)
  const porAncora = new Map();
  let ordem = 0;
  CTX.prims.forEach((p, i) => {
    if (p.tx?.cls !== 'lbl-g') return;
    const k = f1(p.tx.ax) + ',' + f1(p.tx.ay);
    if (!porAncora.has(k)) { porAncora.set(k, grupos.length); grupos.push({ prims: [], ordem: ordem }); }
    grupos[porAncora.get(k)].prims.push(i);
    ordem++;
  });
  if (!grupos.length) return;
  const kd = ex.id + '|' + view + '|' + f1(CTX.KS * 100);
  if (!decisoes[kd]) decisoes[kd] = decidirRotulos(ex, view, box, grupos);
  const dec = decisoes[kd];
  grupos.forEach((g, gi) => {
    const d = dec[gi];
    if (!d) return;
    const txs = g.prims.map((i) => CTX.prims[i].tx);
    const ax = txs[0].ax, ay = txs[0].ay;
    const ret = [ax + d.dx, ay + d.dy, ax + d.dx + d.w, ay + d.dy + d.h];
    const linhas = d.textos ? d.textos.map((str) => ({ ...txs[0], str })) : txs;
    linhas.forEach((tx, j) => {
      const y = ret[1] + 0.8 * d.fs + j * d.linha;
      const novo = { ...tx, x: ret[0], y, anchor: 'start' };
      const sv = textoSvg(ret[0], y, tx.cls, tx.size, 'start', tx.str);
      if (g.prims[j] !== undefined) { const p = CTX.prims[g.prims[j]]; p.tx = novo; p.s = sv; }
      else CTX.prims.push({ l: CTX.prims[g.prims[0]].l, d: 0, s: sv, tx: novo });
    });
    // a linha fina da âncora até a borda mais próxima do texto (só quando o rótulo ficou longe do ponto)
    const bx = Math.max(ret[0], Math.min(ret[2], ax)), by = Math.max(ret[1], Math.min(ret[3], ay));
    if (Math.hypot(bx - ax, by - ay) > 2 * d.mg) CTX.prims.push({ l: 3, d: 0, s: `<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(bx)}" y2="${f1(by)}" class="gd" stroke-width="${f1(0.8 * CTX.KS)}" stroke-dasharray="2 2"/>` });
  });
}
function decidirRotulos(ex, view, box, grupos) {
  const { quadros } = cicloDosRotulos(ex, view);
  const fs = 11 * CTX.KS, linha = 1.25 * fs, mg = 4 * CTX.KS;
  const xMin = box[0] + mg, xMax = box[0] + box[2] - mg;
  const yTopo = box[1] + box[3] * HUD + mg, yFundo = box[1] + box[3] - mg;
  const noPalco = (ret) => ret[0] >= xMin && ret[2] <= xMax && ret[1] >= yTopo && ret[3] <= yFundo;
  // o retângulo de um rótulo num instante: a âncora daquele instante mais o deslocamento
  const retEm = (q, gi, dx, dy, w, h) => { const a = q.ancoras[gi]; return a ? [a[0] + dx, a[1] + dy, a[0] + dx + w, a[1] + dy + h] : null; };
  const postos = []; // [gi, dx, dy, w, h] dos rótulos que ficam (no lugar do autor) e dos já movidos
  const livreEmTodos = (gi, dx, dy, w, h, semAtravessar) =>
    quadros.every((q) => {
      const ret = retEm(q, gi, dx, dy, w, h);
      if (!ret) return true;
      if (!noPalco(ret) || tocaOCorpo(ret, q.caps)) return false;
      if (postos.some(([gj, ddx, ddy, ww, hh]) => { const o = retEm(q, gj, ddx, ddy, ww, hh); return gj !== gi && o && cruza([ret[0] - mg, ret[1] - mg, ret[2] + mg, ret[3] + mg], o); })) return false;
      if (semAtravessar) {
        const a = q.ancoras[gi];
        const bx = Math.max(ret[0], Math.min(ret[2], a[0])), by = Math.max(ret[1], Math.min(ret[3], a[1]));
        if (atravessaOCorpo(a, [bx, by], q.caps)) return false;
      }
      return true;
    });
  // 1) quem precisa mover: só o rótulo em que, em algum instante do ciclo, uma linha do corpo passa por dentro do
  // texto (no lugar que o autor deu; o miolo do texto, sem a folga das letras: encostar de leve no pé ou na mão não
  // move). Os outros ficam, e viram obstáculo para os que se movem.
  const medidas = grupos.map((g) => {
    const txs = g.prims.map((i) => CTX.prims[i].tx);
    const n = txs.length, w = Math.max(...txs.map(larguraDoTexto)), h = (n - 1) * linha + 1.05 * fs;
    const ret0 = caixaDoTexto(txs[0]);
    return { txs, n, w, h, off0: [ret0[0] - txs[0].ax, ret0[1] - txs[0].ay] };
  });
  const mexem = medidas.map(({ off0, w, h }, gi) =>
    quadros.some((q) => { const r = retEm(q, gi, off0[0] + 0.5 * fs, off0[1] + 0.25 * fs, Math.max(1, w - fs), Math.max(1, h - 0.5 * fs)); return r && tocaOCorpo(r, q.caps.map((c) => [c[0], c[1], c[2], c[3], 0.5])); }),
  );
  medidas.forEach(({ off0, w, h }, gi) => { if (!mexem[gi]) postos.push([gi, off0[0], off0[1], w, h]); });
  // 2) cada um dos que se movem, na ordem, procura o seu lugar
  const dec = [];
  grupos.forEach((g, gi) => {
    if (!mexem[gi]) { dec.push(null); return; }
    const { txs } = medidas[gi];
    let { n, w, h } = medidas[gi];
    // um rótulo de uma linha largo demais para caber ao lado do corpo é quebrado em duas (na vírgula ou no espaço
    // mais perto do meio), para ter onde ficar
    let textos = null;
    if (n === 1 && w > 0.4 * box[2]) {
      textos = quebrar(txs[0].str);
      if (textos) { n = 2; w = Math.max(...textos.map((t) => larguraDoTexto({ ...txs[0], str: t }))); h = linha + 1.05 * fs; }
    }
    // em volta da âncora, do mais perto ao mais longe: para o lado do palco com mais espaço, o outro lado, acima,
    // abaixo e as diagonais; primeiro só os lugares cuja linha até o ponto não atravessa o corpo
    const ax = txs[0].ax;
    const lado = ax < box[0] + box[2] / 2 ? -1 : 1;
    const dirs = [[lado, 0], [-lado, 0], [0, -1], [0, 1], [lado, -1], [-lado, -1], [lado, 1], [-lado, 1]];
    let achou = null;
    for (const semAtravessar of [true, false]) {
      for (let d = 1.2 * fs; !achou && d < Math.max(box[2], box[3]); d += 0.9 * fs)
        for (const [dx, dy] of dirs) {
          const cx = dx * (d + (dx ? w / 2 : 0)), cy = dy * (d + (dy ? h / 2 : 0));
          if (livreEmTodos(gi, cx - w / 2, cy - h / 2, w, h, semAtravessar)) { achou = { dx: cx - w / 2, dy: cy - h / 2 }; break; }
        }
      if (achou) break;
    }
    if (!achou) { dec.push(null); return; } // sem lugar no palco: fica onde está (o pior caso é o de hoje)
    postos.push([gi, achou.dx, achou.dy, w, h]);
    dec.push({ ...achou, w, h, fs, linha, mg, textos });
  });
  return dec;
}

/**
 * Prévia pequena (a escolha do estilo em "Meus dados"): o mesmo quadro de montarSvgEstilo, com a câmera
 * fechada no corpo daquele instante (sem o chão vazio nem o resto do ciclo). Só muda o enquadramento.
 */
export function montarPrevia(ex, view, mode, t, estilo: Estilo) {
  const q = montarSvgEstilo(ex, view, mode, t, 0, 120, estilo, true);
  const PJ = VIEWS[view].proj;
  const sk = skel(poseAt(ex, ex.K, t));
  const pts = [sk.P, sk.M, sk.N, sk.Hc];
  for (const k of ['R', 'L']) {
    const d = sk.side[k];
    pts.push(d.S, d.E, d.W, d.G, d.Hp, d.K, d.A, d.heel, d.toe);
  }
  let [x0, x1, y0, y1] = [1e9, -1e9, 1e9, -1e9];
  for (const p of pts) {
    const r = p === sk.Hc ? 12 : 8;
    const [x, y] = PJ(p);
    x0 = Math.min(x0, x - r); x1 = Math.max(x1, x + r); y0 = Math.min(y0, y - r); y1 = Math.max(y1, y + r);
  }
  if (view !== 'top') y1 = Math.max(y1, 2); // o pé fica no chão
  let w = x1 - x0, h = y1 - y0;
  if (w / h > 4 / 3) { const nh = (w * 3) / 4; y0 -= (nh - h) / 2; h = nh; } else { const nw = (h * 4) / 3; x0 -= (nw - w) / 2; w = nw; }
  return { ...q, viewBox: [x0, y0, w, h].map(f1).join(' ') };
}

/**
 * Vista da miniatura do cartão: no estilo clássico, a principal (como sempre); nos novos, a vista em que os
 * músculos principais ocupam mais espaço no palco (no supino, de cima, porque de lado o braço cobre o peitoral).
 */
export function vistaDaMiniatura(ex, t, estilo: Estilo) {
  if (estilo === 'atual' || ex.views.length < 2) return ex.views[0];
  let melhor = ex.views[0],
    maior = -1;
  for (const v of ex.views) {
    cenaEstilo(ex, v, 'mus', t, estilo);
    const b = caixa(ex, v);
    const frac = medida.areaPrincipal / (b[2] * b[3]);
    if (frac > maior * 1.15) {
      maior = frac;
      melhor = v;
    }
  }
  return melhor;
}

/**
 * Vista inicial do modo Técnica (R4, proposta 3; decisão do Gustavo, 05/11/2026): a vista em que a 1ª trajetória
 * (a mão, o pé ou o quadril de `paths`) percorre mais tela, em fração da largura do palco daquela vista. Troca só se a
 * vista ganha por mais de 15% da 1ª de `views` e o movimento nela não é ruído (MOVIMENTO_MINIMO); a vista `zoom` (a
 * lateral com a câmera fechada) não concorre. No
 * estilo clássico, e sem `paths`, a 1ª vista, como sempre. Só escolhe a vista: nenhum quadro muda.
 */
const vistasDoMovimento = {};
export function comprimentosDoMovimento(ex) {
  if (vistasDoMovimento[ex.id]) return vistasDoMovimento[ex.id];
  const v0 = ex.views[0];
  const traj = ex.paths?.[v0]?.[0];
  const out = {};
  if (traj) {
    const [key, side] = traj;
    const pontos = concTimes(ex, 36).map((t) => getPt(skel(poseAt(ex, ex.K, t)), key, side));
    for (const v of ex.views) {
      if (v === 'zoom') continue;
      const Q = pontos.map(VIEWS[v].proj);
      let L = 0;
      for (let i = 1; i < Q.length; i++) L += Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]);
      out[v] = L / caixa(ex, v)[2];
    }
  }
  return (vistasDoMovimento[ex.id] = out);
}
export function vistaDoMovimento(ex, estilo: Estilo) {
  const v0 = ex.views[0];
  if (estilo === 'atual' || ex.views.length < 2) return v0;
  const c = comprimentosDoMovimento(ex);
  if (c[v0] === undefined) return v0;
  let melhor = v0, maior = c[v0];
  for (const v of ex.views.slice(1)) if (c[v] !== undefined && c[v] > maior * 1.15 && c[v] >= MOVIMENTO_MINIMO) { maior = c[v]; melhor = v; }
  return melhor;
}
/** Uma vista só ganha se o movimento nela percorre pelo menos 8% da largura do palco (barra fixa: 4% × 7% é ruído). */
export const MOVIMENTO_MINIMO = 0.08;

/**
 * Quanto do palco o corpo ocupa, de 0 a 1 (a maior das duas medidas, largura ou altura, ao longo do ciclo). Nos
 * exercícios de polia a câmera enquadra a torre inteira e o corpo fica pequeno (46% a 62%; design.md, achado 6).
 */
const fracoes = {};
export function fracaoDoCorpo(ex, view) {
  const k = ex.id + '|' + view;
  if (fracoes[k] !== undefined) return fracoes[k];
  const PJ = VIEWS[view].proj;
  let y0 = 1e9, y1 = -1e9, x0 = 1e9, x1 = -1e9;
  for (let i = 0; i < 24; i++) {
    const sk = skel(poseAt(ex, ex.K, (i / 24) * ex.T));
    const pts = [sk.P, sk.M, sk.N, sk.Hc];
    for (const s of ['R', 'L']) { const d = sk.side[s]; pts.push(d.S, d.E, d.W, d.G, d.Hp, d.K, d.A, d.heel, d.toe); }
    for (const p of pts) { const q = PJ(p); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); }
  }
  const box = caixa(ex, view);
  return (fracoes[k] = Math.max((y1 - y0 + 24) / box[3], (x1 - x0 + 18) / box[2]));
}
/** No modo Músculos, a câmera perto do corpo quando ele ocupa menos de 70% do palco (decisão do Gustavo, 03/11/2026). */
export const PERTO_ABAIXO_DE = 0.7;

/**
 * O acabamento A2 (docs/revisoes/boneco-acabamento/): tronco inteiro, coxa saindo do quadril, folga em volta do braço
 * de perto, mão, membros que afinam, fantasma do erro só no que muda e só as juntas que importam no exercício (as que
 * a trajetória acompanha: cotovelo, ombro, joelho, tornozelo e quadril). Desde o R4 (05/11/2026), o modo Erros é o
 * "erro sobre o certo" (erroInvertido), com o equipamento da pose errada em vermelho translúcido (erroEquip; decisão
 * (b) do Gustavo, 05/11), e os rótulos de técnica saem de cima do corpo (rotulosFora).
 */
const JUNTA_DA_TRAJETORIA = { E: 'E', S: 'S', K: 'K', A: 'A', P: 'Hp', Hp: 'Hp' };
export function acabamento(ex) {
  const juntas = [...new Set((Object.values(ex.paths ?? {}) as string[][][]).flatMap((ps) => ps.map((p) => JUNTA_DA_TRAJETORIA[p[0]!]).filter(Boolean)))];
  return { tronco1: 1, quadril: 1, folga: 1, mao: 1, conico: 1, fantasmaDif: 1, erroInvertido: 1, erroEquip: 1, rotulosFora: 1, juntas };
}

/** Opções da cena do Boneco: o título do erro (o texto do guia), escrito ao lado da parte que erra no modo Erros. */
export type OpcoesEstilo = { tituloErro?: string };
/** Igual a montarSvg, com o estilo, nos 4 modos. `classe` vai no <svg> (o B apaga o equipamento; a vista de cima afina a corda). */
export function montarSvgEstilo(ex, view, mode, t, err, largura, estilo: Estilo = 'atual', perto = false, opcoes: OpcoesEstilo = {}) {
  if ((estilo === 'a' || estilo === 'a2') && !CTX.ACABAMENTO) {
    CTX.ACABAMENTO = acabamento(ex);
    CTX.ROTULO_ERRO = opcoes.tituloErro ?? null;
    try {
      return montarSvgEstilo(ex, view, mode, t, err, largura, 'a', perto, opcoes);
    } finally {
      CTX.ACABAMENTO = null;
      CTX.ROTULO_ERRO = null;
    }
  }
  const novo = estilo !== 'atual';
  if (!novo && !perto) return { ...montarSvg(ex, view, mode, t, err, largura), classe: '' };
  if (novo && mode === 'mus' && !perto && fracaoDoCorpo(ex, view) < PERTO_ABAIXO_DE) perto = true;
  const box = perto ? caixaPerto(ex, view) : caixa(ex, view);
  CTX.KS = box[2] / Math.max(260, largura || 360);
  if (novo) cenaEstilo(ex, view, mode, t, estilo, err, box);
  else scene(ex, view, mode, t, err);
  if (view !== 'top')
    CTX.prims.push({ l: 0, d: -1e9, s: `<line x1="${f1(box[0])}" y1="0" x2="${f1(box[0] + box[2])}" y2="0" class="floor" stroke-width="${f1(1.5 * CTX.KS)}"/>` });
  CTX.prims.sort((a, b) => a.l - b.l || a.d - b.d);
  return { viewBox: box.map(f1).join(' '), html: CTX.prims.map((p) => p.s).join(''), fase: segAt(ex, t), classe: novo ? `estilo-${estilo} vista-${view}` : '' };
}
