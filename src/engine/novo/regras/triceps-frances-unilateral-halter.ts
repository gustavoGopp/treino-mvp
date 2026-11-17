// Regra medida do tríceps francês unilateral com halter: a outra mão segura o braço que trabalha, logo acima do
// cotovelo, e fica com ele (as outras regras são as dos tríceps franceses: ./triceps-frances.ts e
// ./triceps-frances-unilateral.ts).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
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
  'triceps-frances-mao-no-cotovelo': (q) => {
    // a menor distância entre a pele da mão esquerda e a do braço direito (perto do cotovelo), e onde a mão fica
    const folgas: number[] = [],
      doCotovelo: number[] = [];
    for (const [i, x] of q.entries()) {
      doCotovelo.push(dist(x.esq.lado.L.pegada, x.esq.lado.R.cotovelo));
      if (i % 4 && i !== q.length - 1) continue;
      const pts = pontosDoBoneco(x.esq);
      const mao = pts.filter((p) => (p.parte === 'mao' || p.parte === 'polegar') && p.p[0] > x.esq.lado.R.cotovelo[0] && dist(p.p, x.esq.lado.L.pegada) < 12).map((p) => p.p);
      const braco = pts.filter((p) => p.parte === 'braco' && dist(p.p, x.esq.lado.R.cotovelo) < 14).map((p) => p.p);
      let m = 1e9;
      for (const a of mao) for (const b of braco) m = Math.min(m, dist(a, b));
      folgas.push(m);
    }
    const [a, b] = faixa(folgas),
      [c, d] = faixa(doCotovelo);
    return { medido: `a pele da mão esquerda fica de ${f1(a)} a ${f1(b)} cm da pele do braço direito; o centro da mão fica de ${f1(c)} a ${f1(d)} cm do cotovelo`, ok: b <= 1.5 && d <= 12 };
  },
};
