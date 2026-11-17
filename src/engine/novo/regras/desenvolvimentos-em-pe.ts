// Regras medidas dos desenvolvimentos em pé com halteres (um halter só, ou um em cada mão): a carga embaixo na altura
// do ombro, o tronco sem inclinar para o lado e as pernas paradas. As outras (o antebraço na vertical, os braços quase
// estendidos, a carga longe da cabeça, o peso no meio do pé) estão em ../conferir.ts e em ./ombros.ts.
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';

const grau = Math.PI / 180;

export const REGRAS_DESENVOLVIMENTOS_EM_PE: Record<string, Regra> = {
  'carga-na-altura-do-ombro': (q) => {
    // embaixo, o centro da mão (o meio do cabo do halter) contra a ponta do ombro (a articulação acromioclavicular)
    const x = q[0]!.esq;
    const lados = (q[0]!.pecas ?? []).filter((p) => p.t === 'halter').length === 2 ? (['R', 'L'] as const) : (['R'] as const);
    const d = lados.map((k) => x.lado[k].pegada[1] - x.lado[k].acromioclavicular[1]);
    const pior = d.reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a));
    return { medido: `embaixo, o centro da mão fica ${f1(Math.abs(pior))} cm ${pior >= 0 ? 'acima' : 'abaixo'} da ponta do ombro`, ok: Math.abs(pior) <= 6 };
  },
  'tronco-sem-inclinar-para-o-lado': (q) => {
    // o eixo do peito, visto de frente: quanto ele sai da vertical para um dos lados
    const [a, b] = faixa(q.map((x) => Math.atan2(x.esq.torax.y[0], x.esq.torax.y[1]) / grau));
    return { medido: `visto de frente, o peito fica de ${f1(a)}° a ${f1(b)}° da vertical (positivo = para a esquerda)`, ok: Math.max(-a, b) <= 2 };
  },
  'pernas-paradas': (q) => {
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.joelho));
    const [c, d] = faixa(q.map((x) => x.esq.lado.L.ang.joelho));
    return { medido: `os joelhos dobram de ${f1(a)}° a ${f1(b)}° (direito) e de ${f1(c)}° a ${f1(d)}° (esquerdo) no ciclo`, ok: b - a <= 1 && d - c <= 1 };
  },
};
