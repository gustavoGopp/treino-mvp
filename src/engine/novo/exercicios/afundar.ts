// O núcleo comum dos afundos e dos búlgaros do motor novo: um pé à frente, inteiro no chão, e outro atrás, apoiado
// na ponta (ou no banco); os pés não saem do lugar e o quadril sobe e desce entre eles. Quem chama diz onde o quadril
// está; as duas pernas saem dos pés presos, e a conferência mede os joelhos, o tronco e o equilíbrio.
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import type { Corpo } from '../tabelas';
import { dist, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

type Tronco = ReturnType<typeof resolverTronco>;
export interface PedidoDeAfundo {
  /** Qual perna fica à frente. */
  frente: Lado;
  /** O centro do quadril: altura e posição para a frente (cm; o pé da frente fica em z positivo). */
  quadrilY: number;
  quadrilZ: number;
  /** Inclinação do peito para a frente (graus). */
  tronco: number;
  /** Meia distância entre os pés, de lado a lado (cm): "como trilhos". */
  pesMeiaDistancia: number;
  /** Onde fica o tornozelo do pé da frente e a bola do pé de trás, em z (cm). */
  tornozeloDaFrente: number;
  bolaDeTras: number;
  /** Altura do apoio do pé de trás (0 = chão; no búlgaro, a altura do banco) e quanto o calcanhar sobe (graus). */
  apoioDeTras: number;
  calcanharDeTras: number;
  /** Quanto o joelho da frente cai para dentro (cm): o erro do valgo. */
  valgo: number;
  bracos(t: Tronco): { R: PoseBraco; L: PoseBraco };
}

export function afundar(corpo: Corpo, p: PedidoDeAfundo): Esq {
  if (!p.valgo) return montar(corpo, p, 0);
  // O erro do valgo: o plano da perna da frente gira para dentro o bastante para o joelho cair `valgo` cm. Quanto
  // girar depende de quanto o joelho está afastado da linha quadril–tornozelo, que se mede na pose certa.
  const L = montar(corpo, p, 0).lado[p.frente];
  const eixo = norm(sub(L.tornozelo, L.quadril));
  const doQuadril = sub(L.joelho, L.quadril);
  const afastado = dist(doQuadril, mul(eixo, dot(doQuadril, eixo)));
  return montar(corpo, p, Math.asin(Math.min(0.7, p.valgo / Math.max(afastado, 1))));
}
function montar(corpo: Corpo, p: PedidoDeAfundo, gira: number): Esq {
  const m = (id: string) => corpo.m(id);
  const tras: Lado = p.frente === 'R' ? 'L' : 'R';
  const sf = sinal(p.frente),
    st = sinal(tras);
  const dBola = m('pe.calcanharABola') - m('pe.calcanharAoTornozelo');
  const pernas: Record<Lado, PosePerna> = {
    // o joelho da frente aponta para a frente (no erro, girado para dentro)
    [p.frente]: { pe: { bola: [sf * p.pesMeiaDistancia, 0, p.tornozeloDaFrente + dBola], dir: [0, 0, 1], calc: 0 }, polo: [-sf * Math.sin(gira), 0, Math.cos(gira)] },
    // o joelho de trás aponta para o chão e um pouco para a frente
    [tras]: { pe: { bola: [st * p.pesMeiaDistancia, p.apoioDeTras, p.bolaDeTras], dir: [0, 0, 1], calc: p.calcanharDeTras }, polo: [0, -1, 0.4] },
  } as Record<Lado, PosePerna>;
  const pelve: V3 = [0, p.quadrilY, p.quadrilZ];
  const t = resolverTronco(corpo, { pelve, frente: p.tronco, cervical: -p.tronco * 0.25, cabeca: -p.tronco * 0.2 });
  const b = p.bracos(t);
  return resolverMembros(t, { R: b.R, L: b.L }, pernas);
}
