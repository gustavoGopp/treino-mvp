// Regras medidas da família dos ombros (lote 3): as elevações laterais (com halteres e na polia) e os desenvolvimentos
// (com halteres, sentado, e com kettlebell, em pé). A lombar neutra, o antebraço na vertical, o tronco levemente à frente
// e o peso no meio do pé estão em ../conferir.ts.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { centroDeMassa } from '../movimento';
import type { Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { angulo, dist, dot, sub } from '../vec';
import type { V3 } from '../vec';
import { folgaDaCarga } from './stiffs';

const grau = Math.PI / 180;
/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** Os lados que trabalham: os dois, ou só o direito quando o esquerdo segura outra coisa (a polia, o kettlebell). */
const lados = (q: Quadro[]): ('R' | 'L')[] => (q[0]!.marcas.halter && q[0]!.pecas?.filter((p) => p.t === 'halter').length === 2 ? ['R', 'L'] : ['R']);
/**
 * Quanto a clavícula sobe além do ritmo normal do ombro (graus): o esqueleto sobe a clavícula com a elevação do braço
 * (../esqueleto.ts, McClure 2001); o que passa disso é o ombro encolhido.
 */
function alemDoRitmo(q: Quadro, corpo: Corpo, k: 'R' | 'L'): number {
  const L = q.esq.lado[k];
  const frac = Math.max(0, Math.min(1, (L.ang.elevacaoDoBraco - 20) / 130));
  return L.ang.claviculaElev - (corpo.m('clavicula.elevacaoRepouso') + corpo.m('clavicula.elevacaoNaElevacao') * frac);
}

export const regrasDosOmbros: Record<string, Regra> = {
  // ----- elevações laterais -----
  'braco-no-plano-da-escapula': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const b = sub(L.cotovelo, L.ombro);
    const a = Math.atan2(b[2], Math.abs(b[0])) / grau;
    return { medido: `no alto, o braço fica ${f1(a)}° à frente do plano do corpo (visto de cima)`, ok: a >= 20 && a <= 40 };
  },
  'braco-na-linha-do-ombro': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const d = L.cotovelo[1] - L.ombro[1];
    const el = angulo(sub(L.cotovelo, L.ombro), [0, -1, 0]);
    return { medido: `no alto, o cotovelo fica ${f1(Math.abs(d))} cm ${d >= 0 ? 'acima' : 'abaixo'} do centro do ombro (o braço a ${f1(el)}° da vertical)`, ok: Math.abs(d) <= 4 && el <= 100 };
  },
  'cotovelo-acima-da-mao': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const d = L.cotovelo[1] - L.pegada[1];
    const [c0, c1] = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `no alto, o cotovelo fica ${f1(d)} cm acima do centro da mão; o cotovelo dobra de ${f1(c0)}° a ${f1(c1)}° na subida`, ok: d >= 0.5 && d <= 10 && c0 >= 5 && c1 <= 30 };
  },
  'ombro-sem-encolher': (q, corpo) => {
    const ks = lados(q);
    const alem = Math.max(...q.flatMap((x) => ks.map((k) => alemDoRitmo(x, corpo, k))));
    const L0 = q[0]!.esq.lado.R,
      L1 = q[q.length - 1]!.esq.lado.R;
    const sobe = L1.acromioclavicular[1] - L0.acromioclavicular[1];
    return { medido: `a clavícula sobe no máximo ${f1(alem)}° além do ritmo do ombro; a ponta do ombro sobe ${f1(sobe)} cm com o braço (a clavícula vai de ${f1(L0.ang.claviculaElev)}° a ${f1(L1.ang.claviculaElev)}°)`, ok: alem <= 0.5 };
  },
  'peso-perto-do-meio-do-pe': (q, corpo) => {
    // o quadril fica parado enquanto o braço sobe: o centro de massa anda no pé, e tem de ficar na metade do meio dele
    const dB = corpo.m('pe.calcanharABola');
    const d = q.map((x) => centroDeMassa(x.esq, 'homem', x.cargas)[2] - (x.esq.lado.L.bola[2] + x.esq.lado.L.calcanhar[2]) / 2);
    const [a, b] = faixa(d);
    return { medido: `o centro de massa (corpo + carga) anda de ${f1(a)} a ${f1(b)} cm do meio do pé (pé de ${f1(dB)} cm do calcanhar à bola)`, ok: Math.max(-a, b) <= dB / 4 };
  },
  'carga-sem-encostar-nas-pernas': (q) => {
    const [a] = faixa(q.map(folgaDaCarga));
    return { medido: `da carga (ou da mão) à pele das pernas: no mínimo ${f1(a)} cm`, ok: a >= 0 };
  },
  'cabo-na-frente-do-corpo': (q) => {
    // o cabo vai reto da polia ao estribo e passa na frente do corpo, sem encostar (as mãos ficam de fora: seguram o estribo)
    let min = 1e9;
    for (const x of q.filter((_, i) => i % 4 === 0 || i === q.length - 1)) {
      const a = x.marcas.cabo0!,
        b = x.marcas.cabo1!;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte !== 'mao' && parte !== 'polegar' && !(parte === 'ante' && dist(p, x.esq.lado.R.punho) < 8)) min = Math.min(min, aoSegmento(p, a, b));
    }
    return { medido: `o cabo passa a no mínimo ${f1(min)} cm da pele`, ok: min >= 0.5 };
  },
};
