// Peça de cena: a mini band, o elástico curto em laço (medidas em ../dados/objetos/mini-band.json), em volta das duas
// coxas. Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `mini_band`): a faixa larga e chata
// na cor de ação, com a borda escura e um brilho claro. Aqui ela é um anel que passa por fora das duas coxas, logo
// acima dos joelhos: no plano perpendicular às coxas, o fecho das duas seções (meia volta por fora de cada coxa e dois
// trechos retos, por cima e por baixo, de uma à outra). A faixa tem a largura de fábrica ao longo da coxa e estreita
// ao esticar (a borracha não muda de volume: esticada λ vezes, a largura cai na raiz de λ, como o elástico longo).
// Cada pedaço do anel é pintado na sua profundidade: o que passa por trás da coxa fica atrás dela.
import { pontosDoBoneco } from '../boneco';
import type { Prim } from '../desenho';
import type { Esq, Lado } from '../esqueleto';
import type { PecaPropria } from '../pecas';
import type { Material } from '../realista/base.mjs';
import { mix } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, cross, dist, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('miniBand', id);
/** A cor de ação do cartão (traço, sombra, meio, luz). */
const ACAO: Material = ['#16124A', '#211D66', '#3F3AA8', '#7E7ADB'];

export interface Laco {
  /** Os pontos do anel (fechado: o último liga no primeiro), o eixo das coxas (a largura da faixa vai ao longo dele). */
  pts: V3[];
  eixo: V3;
  /** Comprimento do anel (cm) e quanto ele está esticado (1 = em repouso). */
  comp: number;
  estica: number;
  /** O centro da seção de cada coxa por onde a faixa passa. */
  centros: Record<Lado, V3>;
}

/** O centro e o raio (por fora da pele) da seção da coxa `k` a `acima` cm do joelho, medidos na superfície do Boneco. */
export function secaoDaCoxa(e: Esq, k: Lado, acima: number): { c: V3; eixo: V3; r: number } {
  const X = e.lado[k];
  const eixo = norm(sub(X.quadril, X.joelho));
  const c = add(X.joelho, mul(eixo, acima));
  const meia = g('larg') / 2;
  let r = 0;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'coxa' || dist(p, X.joelho) > acima + 15) continue;
    const v = sub(p, c);
    const t = dot(v, eixo);
    if (Math.abs(t) > meia) continue;
    const radial = Math.hypot(...sub(v, mul(eixo, t)));
    if (radial < 14) r = Math.max(r, radial);
  }
  return { c, eixo, r };
}

/** O anel em volta das duas coxas, a `acima` cm dos joelhos. */
export function lacoNasCoxas(e: Esq, acima: number): Laco {
  const R = secaoDaCoxa(e, 'R', acima),
    L = secaoDaCoxa(e, 'L', acima);
  const eixo = norm(add(R.eixo, L.eixo));
  const r = Math.max(R.r, L.r) + g('esp') / 2;
  // no plano perpendicular às coxas: e1 do centro da direita para o da esquerda, e2 para cima
  const e1 = norm(sub(sub(L.c, R.c), mul(eixo, dot(sub(L.c, R.c), eixo))));
  let e2 = cross(eixo, e1);
  if (e2[1] < 0) e2 = mul(e2, -1);
  const pts: V3[] = [];
  const arco = (c: V3, de: number, ate: number) => {
    const n = 14;
    for (let i = 0; i <= n; i++) {
      const a = ((de + ((ate - de) * i) / n) * Math.PI) / 180;
      pts.push(add(c, add(mul(e1, r * Math.cos(a)), mul(e2, r * Math.sin(a)))));
    }
  };
  // meia volta por fora da coxa direita (de cima para baixo, pelo lado de fora) e da esquerda (de baixo para cima)
  arco(R.c, 90, 270);
  arco(L.c, -90, 90);
  let comp = 0;
  for (let i = 0; i < pts.length; i++) comp += dist(pts[i]!, pts[(i + 1) % pts.length]!);
  return { pts, eixo, comp, estica: comp / g('comp'), centros: { R: R.c, L: L.c } };
}

/** A faixa ao longo do anel, com a largura ao longo das coxas (estreita ao esticar). */
export function miniBand(l: Laco): { prims: Prim[]; peca: PecaPropria } {
  const larg = g('larg') / Math.sqrt(Math.max(1, l.estica));
  const h = mul(l.eixo, larg / 2);
  return {
    prims: [{ t: 'fio', pts: [...l.pts, l.pts[0]!], larg: g('esp'), cls: 'fita' }],
    peca: {
      t: 'propria',
      nome: 'mini-band',
      desenhar(C, _M, o) {
        const M = o.tema === 'claro' ? ACAO : ACAO.map((t) => mix(t, '#aeb8c2', 0.25));
        const f1 = (n: number) => (Math.round(n * 100) / 100).toString();
        const n = l.pts.length;
        const meio = mul(l.pts.reduce((acc, p) => add(acc, p), [0, 0, 0] as V3), 1 / n);
        for (let i = 0; i < n; i++) {
          const a = l.pts[i]!,
            b = l.pts[(i + 1) % n]!;
          // o pedaço da faixa: um quadrilátero de a a b, com a largura ao longo das coxas (um pouco sobreposto ao
          // vizinho, para não abrir fresta entre eles)
          const Q = [add(a, h), add(b, h), sub(b, h), sub(a, h)].map((p) => C.P(p));
          const z = Q.reduce((s, q) => s + q[2], 0) / 4;
          // a face clara de fora, a de dentro mais escura: o lado da faixa virado para quem olha
          const normal = norm(sub(mul(add(a, b), 0.5), meio));
          const meioAB = mul(add(a, b), 0.5);
          const luz = C.P(add(meioAB, normal))[2] < C.P(meioAB)[2];
          const d = `M${Q.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L')}Z`;
          C.bruto(z, `<path d="${d}" fill="${luz ? M[2] : M[1]}" stroke="${luz ? M[2] : M[1]}" stroke-width="0.6" stroke-linejoin="round"/>`);
          // as bordas da faixa (o traço escuro) e um brilho no meio
          const borda = (p: V3, q: V3) => {
            const P = C.P(p),
              R = C.P(q);
            return `M${f1(P[0])} ${f1(P[1])}L${f1(R[0])} ${f1(R[1])}`;
          };
          C.bruto(z - 0.01, `<path d="${borda(add(a, h), add(b, h))}${borda(sub(a, h), sub(b, h))}" stroke="${M[0]}" stroke-width="0.45" fill="none" stroke-linecap="round"/>`);
          if (luz) C.bruto(z - 0.02, `<path d="${borda(add(a, mul(h, 0.2)), add(b, mul(h, 0.2)))}" stroke="${M[3]}" stroke-width="0.35" fill="none" opacity="0.7"/>`);
        }
      },
    },
  };
}
