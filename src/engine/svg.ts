// @ts-nocheck
// Monta o SVG de um quadro, como o draw() do guia original (sem tocar no DOM).
import { fit, scene, segAt } from './cena';
import { CTX } from './contexto';
import { f1 } from './desenho';

const caixas = {};
export function caixa(ex, view) {
  const k = ex.id + '|' + view;
  if (!caixas[k]) caixas[k] = fit(ex, view);
  return caixas[k];
}

/** largura = largura do <svg> na tela, em px (define a escala de textos e setas, como no original). */
export function montarSvg(ex, view, mode, t, err, largura) {
  const box = caixa(ex, view);
  CTX.KS = box[2] / Math.max(260, largura || 360);
  scene(ex, view, mode, t, err);
  // chão
  if (view !== 'top')
    CTX.prims.push({ l: 0, d: -1e9, s: `<line x1="${f1(box[0])}" y1="0" x2="${f1(box[0] + box[2])}" y2="0" class="floor" stroke-width="${f1(1.5 * CTX.KS)}"/>` });
  CTX.prims.sort((a, b) => a.l - b.l || a.d - b.d);
  return { viewBox: box.map(f1).join(' '), html: CTX.prims.map((p) => p.s).join(''), fase: segAt(ex, t) };
}
