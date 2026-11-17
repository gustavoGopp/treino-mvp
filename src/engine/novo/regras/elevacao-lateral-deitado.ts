// Regras medidas da elevação lateral deitado de lado com halter (../exercicios/elevacao-lateral-deitado.ts). O braço que
// sobe é o direito (o de cima). O corpo deitado e parado usa as regras do quadril deitado de lado (./quadril-abrir-e-fechar.ts).
// Marcas que os quadros dão: `piso` (o chão) e `halter` (o centro da pegada).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { angulo, dist, dot, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { folgaDaCarga } from './stiffs';

const grau = Math.PI / 180;
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** A menor folga entre o halter (os prismas) e a pele do corpo, fora da mão e do antebraço que o seguram. */
function folgaDoHalterAoCorpo(x: Quadro): number {
  const R = x.esq.lado.R;
  let min = 1e9;
  const cargas = x.prims.filter((p) => p.t === 'prisma');
  for (const { p, parte } of pontosDoBoneco(x.esq)) {
    if (parte === 'mao' || parte === 'polegar' || (parte === 'ante' && dist(p, R.punho) < 14)) continue;
    for (const c of cargas) if (c.t === 'prisma') min = Math.min(min, aoSegmento(p, c.a, c.b) - c.ra);
  }
  return min;
}

export const REGRAS_ELEVACAO_LATERAL_DEITADO: Record<string, Regra> = {
  'elevacao-deitado-braco-quase-vertical': (q) => {
    const fim = q[q.length - 1]!.esq,
      L = fim.lado.R;
    const braco = norm(sub(L.cotovelo, L.ombro));
    const daVertical = angulo(braco, [0, 1, 0]);
    // à frente do plano do corpo (o plano da coluna e da linha dos ombros): o ângulo do braço com esse plano
    const frente = Math.asin(Math.max(-1, Math.min(1, dot(braco, fim.torax.z)))) / grau;
    return { medido: `no alto, o braço fica a ${f1(daVertical)}° da vertical e ${f1(frente)}° à frente do plano do corpo`, ok: daVertical >= 5 && daVertical <= 25 && frente >= 5 && frente <= 40 };
  },
  'elevacao-deitado-cotovelo-levemente-dobrado': (q) => {
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `o cotovelo dobra de ${f1(a)}° a ${f1(b)}° no ciclo`, ok: a >= 5 && b <= 30 && b - a <= 3 };
  },
  'elevacao-deitado-halter-perto-da-coxa': (q) => {
    const x0 = q[0]!;
    const coxa = folgaDaCarga(x0);
    const frente = dot(sub(x0.marcas.halter!, x0.esq.pelve.o), x0.esq.pelve.z);
    const [corpo] = faixa(q.map(folgaDoHalterAoCorpo));
    const [pernas] = faixa(q.map(folgaDaCarga));
    return {
      medido: `embaixo, o halter fica a ${f1(coxa)} cm da pele das pernas, ${f1(frente)} cm à frente do centro do quadril; no ciclo, ele passa a no mínimo ${f1(Math.min(corpo, pernas))} cm do corpo`,
      ok: coxa >= 0 && coxa <= 4 && frente >= 5 && Math.min(corpo, pernas) >= 0,
    };
  },
};
