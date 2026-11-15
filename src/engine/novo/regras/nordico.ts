// Regras medidas da flexão nórdica (../exercicios/nordico.ts). Recebem os quadros do começo até o toque das mãos
// (o fim da primeira fase com movimento, a descida lenta).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import { obj } from '../tabelas';
import { angulo, dist, sub } from '../vec';
import type { V3 } from '../vec';

const deLado = (v: V3): V3 => [0, v[1], v[2]];
/** De lado, o ângulo no quadril entre o joelho e a cabeça (180 = em linha). */
const linha = (e: Esq) => angulo(deLado(sub(e.lado.R.joelho, e.lado.R.quadril)), deLado(sub(e.cabeca.o, e.lado.R.quadril)));
/** O ponto mais baixo de algumas partes do lado direito, perto de um ponto. */
function baixoPerto(e: Esq, partes: string[], perto: V3, r: number): number {
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (partes.includes(parte) && p[0] < 0 && dist(p, perto) < r) m = Math.min(m, p[1]);
  return m;
}
function maoMaisBaixa(e: Esq): number {
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'mao') m = Math.min(m, p[1]);
  return m;
}

export const REGRAS_NORDICO: Record<string, Regra> = {
  'nordico-corpo-reto': (q) => {
    const [a] = faixa(q.map((x) => linha(x.esq)));
    const giro = (e: Esq) => angulo(deLado(sub(e.lado.R.quadril, e.lado.R.joelho)), [0, 1, 0]);
    return { medido: `de lado, joelho, quadril e cabeça fazem no mínimo ${f1(a)}° (180° = em linha); a coxa gira de ${f1(giro(q[0]!.esq))}° a ${f1(giro(q[q.length - 1]!.esq))}° da vertical`, ok: a >= 165 };
  },
  'nordico-desce-devagar': (q) => {
    // do primeiro quadro em que o quadril sai do lugar até o toque das mãos (60 quadros por segundo)
    const p0 = q[0]!.esq.pelve.o;
    const comeca = q.findIndex((x) => dist(x.esq.pelve.o, p0) > 0.05);
    const s = (q.length - comeca) / 60;
    return { medido: `a descida, do ajoelhado até as mãos, leva ${f1(s)} s`, ok: s >= 3 && s <= 5 };
  },
  'nordico-calcanhares-presos': (q) => {
    // o alto do calcanhar contra a parte de baixo do sofá (encostado: no máximo 1 cm de folga, a tolerância de contato
    // das outras regras), e o calcanhar para dentro da borda da frente
    const d = q.map((x) => {
      const b = x.marcas.debaixoDoSofa!;
      let alto = -1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'pe' && p[0] < 0 && dist(p, x.esq.lado.R.calcanhar) < 7) alto = Math.max(alto, p[1]);
      return { folga: b[1] - alto, dentro: b[2] - x.esq.lado.R.calcanhar[2] };
    });
    const [a, b] = faixa(d.map((x) => x.folga)),
      [c] = faixa(d.map((x) => x.dentro));
    return { medido: `o alto do calcanhar fica de ${f1(a)} a ${f1(b)} cm da parte de baixo do sofá (negativo = aperta) e ${f1(c)} cm para dentro da borda da frente`, ok: a >= -1.5 && b <= 1 && c >= 3 };
  },
  'nordico-joelhos-na-almofada': (q) => {
    const tampo = 2 * obj('colchonete', 'esp'); // o colchonete dobrado ao meio
    const d = q.map((x) => ({ j: baixoPerto(x.esq, ['canela', 'coxa'], x.esq.lado.R.joelho, 9) - tampo, t: baixoPerto(x.esq, ['canela'], x.esq.lado.R.tornozelo, 10) - tampo }));
    const [a, b] = faixa(d.map((x) => x.j)),
      [c, e] = faixa(d.map((x) => x.t));
    return { medido: `o joelho fica de ${f1(a)} a ${f1(b)} cm do tampo do colchonete dobrado e a canela, perto do tornozelo, de ${f1(c)} a ${f1(e)} cm (negativo = afunda)`, ok: a >= -1.5 && b <= 0.5 && c >= -1.5 && e <= 1 };
  },
  'nordico-maos-tocam-o-chao': (q) => {
    const m = maoMaisBaixa(q[q.length - 1]!.esq),
      n = maoMaisBaixa(q[Math.floor(q.length * 0.5)]!.esq);
    return { medido: `no toque, a palma fica a ${f1(m)} cm do chão; no meio da descida, a ${f1(n)} cm (as mãos esperam na frente do peito)`, ok: m >= -1 && m <= 1 && n > 20 };
  },
};
