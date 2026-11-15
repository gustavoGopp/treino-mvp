// O núcleo comum dos exercícios com elástico do motor novo (tríceps acima da cabeça, rosca, remada, puxada e face pull):
// o caminho do elástico esticado e o quanto ele estica.
//  - `fioPorFora`: um trecho de elástico esticado entre dois pontos (a mão e o pé, a mão e a âncora) que não pode
//    atravessar o corpo. Esticado, o elástico faz o caminho mais curto que contorna o corpo pelo lado pedido: no plano
//    que passa pelos dois pontos, é o fecho convexo dos pontos da pele (com uma folga) entre eles. Assim a faixa do
//    tríceps desce pelas costas, pelo glúteo e pela perna de trás até o pé, sem entrar no corpo.
//  - `comprimento`: a soma dos trechos de uma polilinha.
import { pontosDoBoneco } from '../boneco';
import type { Esq } from '../esqueleto';
import { add, cross, dist, dot, len, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';

export function comprimento(pts: V3[]): number {
  let c = 0;
  for (let i = 1; i < pts.length; i++) c += dist(pts[i - 1]!, pts[i]!);
  return c;
}

export interface OpcoesDoFio {
  /** Para que lado o elástico contorna o corpo (uma direção aproximada; o que vale é a parte dela perpendicular ao trecho). */
  lado: V3;
  /** As partes do corpo que o elástico contorna (nomes de `pontosDoBoneco`: tronco, pelve, coxa, canela, cabeca...). */
  partes: string[];
  /** A folga entre o elástico e a pele (cm): metade da espessura mais a roupa. */
  folga: number;
  /** Meia largura da fatia de corpo considerada em volta do plano do trecho (cm). */
  fatia?: number;
  /** Partes que o elástico não contorna perto das pontas (cm a partir de cada ponta), como a mão que o segura. */
  livreNasPontas?: number;
}

/**
 * O trecho de elástico esticado de `a` até `b`, contornando o corpo pelo lado `o.lado`. Devolve a polilinha (com `a` e
 * `b` nas pontas). Se a reta não encosta no corpo, a polilinha é a própria reta.
 */
export function fioPorFora(e: Esq, a: V3, b: V3, o: OpcoesDoFio): V3[] {
  const L = dist(a, b);
  const d = norm(sub(b, a));
  let w = perp(o.lado, d);
  if (len(w) < 1e-6) return [a, b];
  w = norm(w);
  const h = cross(d, w);
  const fatia = o.fatia ?? 3;
  const livre = o.livreNasPontas ?? 0;
  const partes = new Set(o.partes);
  // os pontos da pele na fatia, no plano (s ao longo do trecho, y para o lado de fora)
  const P: [number, number][] = [[0, 0], [L, 0]];
  for (const x of pontosDoBoneco(e)) {
    if (!partes.has(x.parte)) continue;
    const r = sub(x.p, a);
    const s = dot(r, d);
    if (s <= livre || s >= L - livre) continue;
    if (Math.abs(dot(r, h)) > fatia) continue;
    const y = dot(r, w) + o.folga;
    if (y > 0) P.push([s, y]);
  }
  if (P.length === 2) return [a, b];
  // o fecho de cima (o lado de fora) dos pontos, de s = 0 a s = L
  P.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  const fecho: [number, number][] = [];
  for (const p of P) {
    while (fecho.length >= 2) {
      const [o1, o2] = [fecho[fecho.length - 2]!, fecho[fecho.length - 1]!];
      // tira o do meio se ele não fica por fora da linha entre o anterior e o novo
      if ((o2[0] - o1[0]) * (p[1] - o1[1]) - (o2[1] - o1[1]) * (p[0] - o1[0]) >= 0) fecho.pop();
      else break;
    }
    fecho.push(p);
  }
  return fecho.map(([s, y]) => add(add(a, mul(d, s)), mul(w, y)));
}
