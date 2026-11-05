// @ts-nocheck
// Estilos do boneco (R4, levado a todos os exercícios a pedido do Gustavo em 02/11/2026).
// 'a' é o boneco padrão do app; 'atual' é o clássico (o do guia original); 'b' é a silhueta.
// Com 'atual', tudo vai para montarSvg (../svg.ts) e a saída é a de sempre, caractere por caractere: é esse estilo
// que a regressão compara com o guia original. Com 'a' ou 'b', a cena repete os passos de scene() (../cena.ts),
// com as mesmas poses e o mesmo equipamento, trocando só o corpo e os músculos. A caixa é a do estilo clássico.
import { concTimes, getPt, poseAt, scene, segAt } from '../cena';
import { CTX } from '../contexto';
import { ARROW3, C3, L3, PATH2, TX, VIEWS, body, f1 } from '../desenho';
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
      // opção (b) da folha: o equipamento da pose errada, em vermelho e translúcido, quando a mão que erra se move
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

// Enquadramento "perto do corpo": a mesma conta de fit() (../cena.ts), mas só com o esqueleto ao longo do ciclo,
// sem a torre e o equipamento alto. Serve para separar o efeito do estilo do efeito do tamanho da figura na tela.
const caixasPerto = {};
export function caixaPerto(ex, view) {
  const k = ex.id + '|' + view;
  if (caixasPerto[k]) return caixasPerto[k];
  const PJ = VIEWS[view].proj;
  const m = [1e9, -1e9, 1e9, -1e9];
  for (let i = 0; i < 24; i++) {
    const sk = skel(poseAt(ex, ex.K, (i / 24) * ex.T));
    const pts = [sk.P, sk.M, sk.N, sk.Hc];
    for (const s of ['R', 'L']) { const d = sk.side[s]; pts.push(d.S, d.E, d.W, d.G, d.Hp, d.K, d.A, d.heel, d.toe); }
    for (const p of pts) { const q = PJ(p); const r = p === sk.Hc ? 12 : 9; m[0] = Math.min(m[0], q[0] - r); m[1] = Math.max(m[1], q[0] + r); m[2] = Math.min(m[2], q[1] - r); m[3] = Math.max(m[3], q[1] + r); }
  }
  let [x0, x1, y0, y1] = m;
  if (view !== 'top') y1 = Math.max(y1, 0);
  let w = x1 - x0, h = y1 - y0;
  // folga maior em cima: a mão e a pegada passam do topo da cabeça na puxada (03/11/2026)
  const pad = 0.07; x0 -= w * pad; x1 += w * pad; y0 -= h * pad * 3.2; y1 += h * pad * 0.6; w = x1 - x0; h = y1 - y0;
  y0 -= h * 0.08; h = y1 - y0;
  if (w / h > 4 / 3) { const nh = (w * 3) / 4; y0 -= (nh - h) / 2 + (nh - h) * 0.1; h = nh; } else { const nw = (h * 4) / 3; x0 -= (nw - w) / 2; w = nw; }
  return (caixasPerto[k] = [x0, y0, w, h]);
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
 * "erro sobre o certo" (erroInvertido).
 */
const JUNTA_DA_TRAJETORIA = { E: 'E', S: 'S', K: 'K', A: 'A', P: 'Hp', Hp: 'Hp' };
export function acabamento(ex) {
  const juntas = [...new Set((Object.values(ex.paths ?? {}) as string[][][]).flatMap((ps) => ps.map((p) => JUNTA_DA_TRAJETORIA[p[0]!]).filter(Boolean)))];
  return { tronco1: 1, quadril: 1, folga: 1, mao: 1, conico: 1, fantasmaDif: 1, erroInvertido: 1, juntas };
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
