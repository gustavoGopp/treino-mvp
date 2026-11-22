// Regra medida do tríceps francês unilateral com halter: o halter não encosta no corpo, medido com a forma das cabeças
// (as outras regras são as dos tríceps franceses: ./triceps-frances.ts e ./triceps-frances-unilateral.ts).
import { pontosDoBoneco } from '../boneco';
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Prim } from '../desenho';
import { dist, dot, norm, sub } from '../vec';
import type { V3 } from '../vec';

/**
 * Distância de um ponto a uma cabeça do halter (prisma de seis lados), tomada como um cilindro de pontas planas com o
 * raio de fora do prisma (a medida da tabela): ao longo do eixo, fora das pontas, a distância é até a face plana, e
 * não até uma ponta arredondada.
 */
function aoCilindro(p: V3, c: Extract<Prim, { t: 'prisma' }>): number {
  const u = norm(sub(c.b, c.a));
  const L = dist(c.a, c.b);
  const ap = sub(p, c.a);
  const t = dot(ap, u);
  const radial = Math.hypot(...sub(ap, [u[0] * t, u[1] * t, u[2] * t])) - c.ra;
  const axial = t < 0 ? -t : t > L ? t - L : 0;
  return axial > 0 ? (radial > 0 ? Math.hypot(radial, axial) : axial) : radial;
}
/** As partes do corpo em que o halter não pode encostar (a mão que o segura fica de fora). */
const LIVRES = new Set(['cabeca', 'pescoco', 'tronco', 'braco', 'ante', 'cintura', 'emendaDaCintura', 'pelve']);

export const REGRAS_TRICEPS_FRANCES_UNILATERAL_HALTER: Record<string, Regra> = {
  'triceps-frances-halter-livre-do-corpo': (q) => {
    // as duas cabeças do halter contra a pele (fora as mãos), com a forma de verdade das cabeças (pontas planas): a
    // regra dos tríceps franceses com as duas mãos mede a cabeça como uma cápsula, e com o cabo atravessando a mão a
    // ponta arredondada da cápsula entraria no punho
    let min = 1e9,
      qual = '';
    for (const x of q.filter((_, i) => i % 3 === 0 || i === q.length - 1)) {
      const P = pontosDoBoneco(x.esq).filter((p) => LIVRES.has(p.parte));
      for (const c of x.prims) {
        if (c.t !== 'prisma') continue;
        for (const p of P) {
          const d = aoCilindro(p.p, c);
          if (d < min) {
            min = d;
            qual = p.parte;
          }
        }
      }
    }
    return { medido: `o halter passa a no mínimo ${f1(min)} cm da pele (${qual})`, ok: min >= 1 };
  },
};
