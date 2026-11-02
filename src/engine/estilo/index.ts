// @ts-nocheck
// R4 (experimento do boneco): os estilos novos como opção paralela do motor.
// Com estilo 'atual', tudo vai para montarSvg (../svg.ts) e a saída é a de sempre, caractere por caractere.
// Com 'a' ou 'b', a cena repete os passos de scene() (../cena.ts) nos modos técnica e músculos, com as mesmas
// poses e o mesmo equipamento, trocando só o corpo e os músculos. A caixa (enquadramento) é a do estilo atual.
import { poseAt, scene, segAt } from '../cena';
import { CTX } from '../contexto';
import { VIEWS, f1, muscles } from '../desenho';
import { skel } from '../esqueleto';
import { caixa, montarSvg } from '../svg';
import { corpoNovo } from './corpo';
import { LISTA, musculosNovos } from './musculos';

export type Estilo = 'atual' | 'a' | 'b';
export const ESTILOS: Estilo[] = ['atual', 'a', 'b'];
export const NOMES_ESTILO = { atual: 'Atual', a: 'Caminho A', b: 'Caminho B' };
/** Exercícios do experimento (os músculos anatômicos só existem para eles). */
export const EXERCICIOS_R4 = Object.keys(LISTA);

export function cenaEstilo(ex, view, mode, t, estilo) {
  CTX.VIEW = view;
  CTX.PJ = VIEWS[view].proj;
  CTX.prims = [];
  const sk = skel(poseAt(ex, ex.K, t));
  ex._pal = 'n';
  ex.equip(sk);
  const partes = corpoNovo(sk, estilo);
  if (mode === 'mus' && !musculosNovos(ex, sk, partes, estilo)) {
    // exercício fora do experimento: os músculos do estilo atual, por cima
    muscles(sk, ex.muscles.s, 'ms');
    muscles(sk, ex.muscles.p, 'mp');
  }
  if (mode === 'tec' && ex.guides && ex.guides[view]) ex.guides[view].call(ex, sk);
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
  const pad = 0.07; x0 -= w * pad; x1 += w * pad; y0 -= h * pad * 1.6; y1 += h * pad * 0.6; w = x1 - x0; h = y1 - y0;
  y0 -= h * 0.08; h = y1 - y0;
  if (w / h > 4 / 3) { const nh = (w * 3) / 4; y0 -= (nh - h) / 2 + (nh - h) * 0.1; h = nh; } else { const nw = (h * 4) / 3; x0 -= (nw - w) / 2; w = nw; }
  return (caixasPerto[k] = [x0, y0, w, h]);
}

/** Igual a montarSvg, com o estilo. Modos de A e B: 'tec' e 'mus'. `classe` vai no <svg> (o B apaga o equipamento). */
export function montarSvgEstilo(ex, view, mode, t, err, largura, estilo: Estilo = 'atual', perto = false) {
  const novo = estilo !== 'atual' && (mode === 'tec' || mode === 'mus');
  if (!novo && !perto) return { ...montarSvg(ex, view, mode, t, err, largura), classe: '' };
  const box = perto ? caixaPerto(ex, view) : caixa(ex, view);
  CTX.KS = box[2] / Math.max(260, largura || 360);
  if (novo) cenaEstilo(ex, view, mode, t, estilo);
  else scene(ex, view, mode, t, err);
  if (view !== 'top')
    CTX.prims.push({ l: 0, d: -1e9, s: `<line x1="${f1(box[0])}" y1="0" x2="${f1(box[0] + box[2])}" y2="0" class="floor" stroke-width="${f1(1.5 * CTX.KS)}"/>` });
  CTX.prims.sort((a, b) => a.l - b.l || a.d - b.d);
  return { viewBox: box.map(f1).join(' '), html: CTX.prims.map((p) => p.s).join(''), fase: segAt(ex, t), classe: novo ? `estilo-${estilo}` : '' };
}
