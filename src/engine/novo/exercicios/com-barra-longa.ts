// O que os exercícios com a barra longa com anilhas têm em comum (o terra romeno, a remada curvada e o hip thrust): a
// pele desenhada do Boneco amostrada com densidade, para medir a folga da barra até o corpo. A barra é fina (2,8 cm) e a
// conta com os pontos da conferência (12 por seção, e as seções da coxa ficam a uns 10 cm umas das outras) a deixaria
// passar entre eles; e o tubo oval do núcleo dos stiffs (`folgaDasPernas`) é mais grosso que a coxa desenhada, o que
// deixava a barra a 3 ou 4 cm da pele quando a conta dizia 0,5.
import { formaDoBoneco } from '../boneco';
import type { Esq } from '../esqueleto';
import { raioDaPegada } from '../pecas-de-cena/barra-longa';
import { add, dist, dot, mul, sub } from '../vec';
import type { V3 } from '../vec';

/**
 * Pontos da pele das partes pedidas: entre duas seções seguidas do desenho, 8 seções intermediárias, com 36 pontos em
 * cada uma.
 */
export function peleDensa(e: Esq, partes: ReadonlySet<string>): V3[] {
  const out: V3[] = [];
  for (const g of formaDoBoneco(e).grupos)
    for (const v of g.volumes) {
      if (!partes.has(v.nome ?? g.id)) continue;
      const A = v.vol.aneis;
      for (let i = 0; i + 1 < A.length; i++)
        for (let j = 0; j < 8; j++) {
          const t = j / 8,
            p = A[i]!,
            r = A[i + 1]!;
          const L = (x: V3, y: V3): V3 => [x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t];
          const c = L(p.c, r.c),
            X = L(p.x, r.x),
            Z = L(p.z, r.z);
          const a = p.a + (r.a - p.a) * t,
            f = p.f + (r.f - p.f) * t,
            b = p.b + (r.b - p.b) * t;
          for (let k = 0; k < 36; k++) {
            const th = (k * Math.PI) / 18,
              sn = Math.sin(th);
            out.push(add(add(c, mul(X, a * Math.cos(th))), mul(Z, (sn >= 0 ? f : b) * sn)));
          }
        }
    }
  return out;
}
/** Distância de um ponto a um segmento. */
export function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, add(a, mul(ab, t)));
}
/**
 * A menor distância (cm) da superfície da pegada da barra, no trecho de `a` a `b`, à pele das partes pedidas. Medida
 * só contra a superfície: uma barra enterrada fundo no corpo daria distância positiva (quem usa parte de fora dele).
 */
export function folgaDaBarraNaPele(e: Esq, a: V3, b: V3, partes: ReadonlySet<string>): number {
  return folgaDaBarraNosPontos(peleDensa(e, partes), a, b);
}
/** O mesmo, com os pontos da pele já calculados (para medir várias posições da barra na mesma pose). */
export function folgaDaBarraNosPontos(pele: V3[], a: V3, b: V3): number {
  let min = 1e9;
  for (const p of pele) min = Math.min(min, aoSegmento(p, a, b) - raioDaPegada());
  return min;
}
export const PERNAS: ReadonlySet<string> = new Set(['coxa', 'canela']);
