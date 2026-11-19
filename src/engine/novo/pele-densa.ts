// A pele do Boneco amostrada densamente (acréscimo de 19/11/2026, a auditoria da fase C). A conferência automática
// (./conferir.ts) e `pontosDoBoneco` tomam 12 pontos em cada anel; a auditoria mostrou que, entre os pontos e entre os
// anéis, a pele desenhada vai mais longe (no hack, a pele entra 2,8 cm na almofada do ombro, e os 12 pontos medem 2,1).
// Aqui: 36 pontos por anel e, entre dois anéis vizinhos, 3 anéis no meio (cada ponto na reta entre os pontos do mesmo
// ângulo nos dois anéis: o casco que o desenho liga de um anel ao outro). Só mede; não muda o desenho.
import { formaDoBoneco } from './boneco';
import type { Anel } from './corpo3d';
import type { Esq } from './esqueleto';
import { add, mul, paraRef } from './vec';
import type { Ref, V3 } from './vec';

/** Um ponto da pele: a parte (o nome do volume, com R ou L no fim quando é de um lado) e o anel (com fração). */
export interface PontoDaPele {
  p: V3;
  parte: string;
  anel: number;
}

const noAnel = (an: Anel, th: number): V3 => {
  const sn = Math.sin(th);
  return add(add(an.c, mul(an.x, an.a * Math.cos(th))), mul(an.z, (sn >= 0 ? an.f : an.b) * sn));
};

/**
 * A pele densa das partes pedidas (pelo nome do volume: `braco`, `tronco`, `coxa`...; sem a lista, todas menos as mãos
 * e os pés, como a conferência automática, que deixa de fora o que encosta nas peças de propósito).
 */
export function peleDensa(e: Esq, partes?: string[], N = 36, SUB = 4): PontoDaPele[] {
  const out: PontoDaPele[] = [];
  for (const g of formaDoBoneco(e).grupos)
    for (const v of g.volumes) {
      const nome = v.nome ?? g.id;
      if (partes ? !partes.includes(nome) : ['mao', 'polegar', 'pe'].includes(nome)) continue;
      const parte = nome + (g.id.endsWith('R') ? 'R' : g.id.endsWith('L') ? 'L' : '');
      const A = v.vol.aneis;
      const P = A.map((an) => Array.from({ length: N }, (_, k) => noAnel(an, (k * 2 * Math.PI) / N)));
      for (let i = 0; i < A.length; i++)
        for (let s = 0; s < (i + 1 < A.length ? SUB : 1); s++) {
          const t = s / SUB;
          for (let k = 0; k < N; k++) out.push({ p: t ? add(mul(P[i]![k]!, 1 - t), mul(P[i + 1]![k]!, t)) : P[i]![k]!, parte, anel: i + t });
        }
    }
  return out;
}

/** Quanto um ponto entra numa caixa: a menor distância dele às faces (≤ 0 = fora), a mesma medida da conferência. */
export function entradaNaCaixa(p: V3, c: { ref: Ref; meias: V3 }): number {
  const l = paraRef(c.ref, p);
  return Math.min(c.meias[0] - Math.abs(l[0]), c.meias[1] - Math.abs(l[1]), c.meias[2] - Math.abs(l[2]));
}

/** A maior entrada de uma lista de pontos da pele em umas caixas (0 se nenhum entra) e a parte em que foi. */
export function maiorEntrada(pele: PontoDaPele[], caixas: { ref: Ref; meias: V3 }[]): { d: number; parte: string } {
  let r = { d: 0, parte: '' };
  for (const c of caixas)
    for (const x of pele) {
      const d = entradaNaCaixa(x.p, c);
      if (d > r.d) r = { d, parte: x.parte };
    }
  return r;
}
