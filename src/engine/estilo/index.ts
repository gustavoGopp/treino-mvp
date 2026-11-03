// @ts-nocheck
// Estilos do boneco (R4, levado a todos os exercícios a pedido do Gustavo em 02/11/2026).
// 'a' é o boneco padrão do app; 'atual' é o clássico (o do guia original); 'b' é a silhueta.
// Com 'atual', tudo vai para montarSvg (../svg.ts) e a saída é a de sempre, caractere por caractere: é esse estilo
// que a regressão compara com o guia original. Com 'a' ou 'b', a cena repete os passos de scene() (../cena.ts),
// com as mesmas poses e o mesmo equipamento, trocando só o corpo e os músculos. A caixa é a do estilo clássico.
import { concTimes, getPt, poseAt, scene, segAt } from '../cena';
import { CTX } from '../contexto';
import { ARROW3, PATH2, TX, VIEWS, body, f1 } from '../desenho';
import { skel } from '../esqueleto';
import { Z, add, comb, len, sub } from '../math';
import { caixa, montarSvg } from '../svg';
import { corpoNovo } from './corpo';
import { medida, musculosNovos } from './musculos';

export type Estilo = 'atual' | 'a' | 'b';
export const ESTILOS: Estilo[] = ['atual', 'a', 'b'];
export const NOMES_ESTILO = { atual: 'Clássico', a: 'Boneco', b: 'Silhueta' };
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

/** Mesmos passos de scene() (../cena.ts), com o corpo e os músculos do estilo novo. */
export function cenaEstilo(ex, view, mode, t, estilo, errIdx = 0) {
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
  if (mode === 'err') {
    const e = ex.errors[errIdx || 0];
    const ske = skel(poseAt(ex, e.K, t));
    ex._pal = 'e';
    ex.equip(ske);
    ex._pal = 'n';
    corpoNovo(ske, estilo, true);
    fantasma(sk, 'g');
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

/** Igual a montarSvg, com o estilo, nos 4 modos. `classe` vai no <svg> (o B apaga o equipamento; a vista de cima afina a corda). */
export function montarSvgEstilo(ex, view, mode, t, err, largura, estilo: Estilo = 'atual', perto = false) {
  const novo = estilo !== 'atual';
  if (!novo && !perto) return { ...montarSvg(ex, view, mode, t, err, largura), classe: '' };
  if (novo && mode === 'mus' && !perto && fracaoDoCorpo(ex, view) < PERTO_ABAIXO_DE) perto = true;
  const box = perto ? caixaPerto(ex, view) : caixa(ex, view);
  CTX.KS = box[2] / Math.max(260, largura || 360);
  if (novo) cenaEstilo(ex, view, mode, t, estilo, err);
  else scene(ex, view, mode, t, err);
  if (view !== 'top')
    CTX.prims.push({ l: 0, d: -1e9, s: `<line x1="${f1(box[0])}" y1="0" x2="${f1(box[0] + box[2])}" y2="0" class="floor" stroke-width="${f1(1.5 * CTX.KS)}"/>` });
  CTX.prims.sort((a, b) => a.l - b.l || a.d - b.d);
  return { viewBox: box.map(f1).join(' '), html: CTX.prims.map((p) => p.s).join(''), fase: segAt(ex, t), classe: novo ? `estilo-${estilo} vista-${view}` : '' };
}
