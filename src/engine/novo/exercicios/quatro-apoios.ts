// O núcleo dos exercícios em quatro apoios (o coice com elástico e, depois, o coice com caneleira): as mãos espalmadas
// no colchonete, sob os ombros, os braços quase estendidos; os joelhos no colchonete, sob o quadril; as costas retas.
// A perna que trabalha (a direita, perto de quem olha na vista de lado) é do exercício: ele diz a pose dela (e o que vai
// no pé). A outra fica de apoio: a coxa na vertical, a canela deitada no colchonete, para trás, o peito do pé nele.
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo e por opções):
//  - a altura do quadril: o joelho de apoio no colchonete (o raio da perna no joelho acima do tampo) e a coxa na vertical;
//  - a inclinação das costas: o quanto os ombros ficam acima do quadril, para a mão chegar ao colchonete sob o ombro com
//    o cotovelo no ângulo pedido (o ombro anda com o braço, por isso a conta se repete com o ombro de verdade).
// Nos erros, a bacia pode virar para a frente (a lombar arqueia: `bacia`, com o peito parado) e rolar para o lado da
// perna que trabalha (`rola`, em volta do quadril de apoio, que fica no lugar).
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Corpo } from '../tabelas';
import { REF0, anguloEm, dist, girarRef, norm } from '../vec';
import type { V3 } from '../vec';
import { maoEspalmada } from './apoio-no-chao';

export interface OpcoesQuatroApoios {
  /** Altura do tampo onde mãos e joelhos apoiam (o colchonete), em cm. */
  piso: number;
  /** Meia distância entre as mãos (do meio do corpo ao centro da palma). Os joelhos ficam sob os quadris. */
  maosMeia: number;
  /** O cotovelo quase estendido (graus de flexão). */
  cotovelo: number;
  /** A lombar além da curva de quem está em pé (graus; positivo = menos curva) e o pescoço (positivo = dobra). */
  lombar: number;
  cervical: number;
}
/** O que muda num quadro: quanto a bacia vira para a frente (lombar arqueando) e quanto rola para o lado (graus). */
export interface DesvioDaBacia {
  bacia?: number;
  rola?: number;
}
export interface QuatroApoios {
  /** As costas: os ombros acima do quadril (graus acima da horizontal). */
  beta: number;
  /** As mãos: o centro da palma em z (o joelho de apoio fica em z = 0). */
  zMao: number;
  /** O centro do quadril (com a coxa de apoio na vertical). */
  pelve: V3;
  /** A linha do tronco, da base do pescoço ao quadril: quantos graus ela desce da horizontal, para trás. */
  linha: number;
}

const rad = Math.PI / 180;
const CAL = new WeakMap<Corpo, Map<string, QuatroApoios>>();

/** A altura do centro do joelho apoiado: o raio da perna no joelho acima do tampo. */
export const alturaDoJoelho = (corpo: Corpo, o: OpcoesQuatroApoios) => o.piso + corpo.secoes.perna![0]!.b;

/** A perna de apoio: a coxa na vertical, a canela deitada no tampo, para trás, o peito do pé nele. */
export const pernaDeApoio = (): PosePerna => ({ coxa: [0, -1, 0], canela: norm([0, -0.035, -1]), peDir: norm([0, -0.2, -1]), polo: [0, 0, 1] });

/** As mãos espalmadas no tampo, em (±maosMeia, zMao), com os dedos para a frente e os cotovelos para trás. */
export function maosNoPiso(corpo: Corpo, o: OpcoesQuatroApoios, zMao: number): Record<Lado, PoseBraco> {
  const braco = (k: Lado) => maoEspalmada(corpo, k, o.maosMeia, o.piso, zMao, norm([sinal(k) * 0.15, 0, -1]));
  return { R: braco('R'), L: braco('L') };
}

/** O tronco: a bacia em `pelve`, as costas `beta` graus acima da horizontal, com o desvio do erro. */
export function troncoEmQuatroApoios(corpo: Corpo, o: OpcoesQuatroApoios, c: Pick<QuatroApoios, 'beta' | 'pelve'>, d: DesvioDaBacia = {}): Tronco {
  const bacia = d.bacia ?? 0,
    rola = d.rola ?? 0;
  // a bacia rola em volta do quadril de apoio (o esquerdo): o centro dela sobe e anda para o lado de apoio
  const hq = corpo.m('quadril.meiaDistancia');
  const pelve: V3 = [c.pelve[0] + hq * (1 - Math.cos(rola * rad)), c.pelve[1] + hq * Math.sin(rola * rad), c.pelve[2]];
  // a bacia vira `bacia` graus para a frente e a lombar arqueia o mesmo tanto: o peito não muda; ao rolar, a lombar
  // torce de volta e o peito fica de frente para o chão
  const r = rolada(90 - c.beta - o.lombar + bacia, -rola);
  return resolverTronco(corpo, { pelve, ...r, lombar: o.lombar - bacia, lombarGiro: rola, cervical: o.cervical, cabeca: 0 });
}

/**
 * A bacia inclinada `frente` graus e rolada `rola` graus em volta do próprio eixo do corpo (o que vai do quadril à
 * cabeça; em quatro apoios, quase na horizontal), escrita nos três ângulos do esqueleto (o giro em volta da vertical,
 * a inclinação à frente e a inclinação para o lado, nessa ordem): o esqueleto não tem um giro em volta desse eixo
 * depois da inclinação à frente, e a conta acha os três ângulos que dão a mesma bacia.
 */
function rolada(frente: number, rola: number): { frente: number; giro?: number; lado?: number } {
  if (!rola) return { frente };
  const deFrente = girarRef(REF0, [1, 0, 0], frente);
  const alvo = girarRef(deFrente, deFrente.y, rola);
  // o eixo z do alvo sai só do giro e da inclinação à frente (a inclinação para o lado gira em volta dele)
  const g = Math.atan2(alvo.z[0], alvo.z[2]) / rad;
  let melhor = { frente, giro: 0, lado: 0 },
    erro = 1e9;
  for (const f of [Math.asin(-alvo.z[1]) / rad, Math.asin(alvo.z[1]) / rad, 180 - Math.asin(-alvo.z[1]) / rad])
    for (const gg of [g, g + 180]) {
      let r = girarRef(REF0, [0, 1, 0], gg);
      r = girarRef(r, r.x, f);
      if (dist(r.z, alvo.z) > 1e-6) continue;
      const l = -anguloEm(r.x, alvo.x, r.z);
      const t = girarRef(r, r.z, -l);
      const e = dist(t.x, alvo.x) + dist(t.y, alvo.y);
      if (e < erro) {
        erro = e;
        melhor = { frente: f, giro: gg, lado: l };
      }
    }
  return melhor;
}

/** O corpo em quatro apoios, com a perna direita na pose que o exercício dá (calculada a partir do tronco). */
export function emQuatroApoios(corpo: Corpo, o: OpcoesQuatroApoios, perna: (t: Tronco) => PosePerna, d: DesvioDaBacia = {}): Esq {
  const c = calibrarQuatroApoios(corpo, o);
  const t = troncoEmQuatroApoios(corpo, o, c, d);
  return resolverMembros(t, maosNoPiso(corpo, o, c.zMao), { R: perna(t), L: pernaDeApoio() });
}

export function calibrarQuatroApoios(corpo: Corpo, o: OpcoesQuatroApoios): QuatroApoios {
  let m = CAL.get(corpo);
  if (!m) CAL.set(corpo, (m = new Map()));
  const chave = JSON.stringify(o);
  const ja = m.get(chave);
  if (ja) return ja;
  const L = corpo.m('coxa.comp');
  // o joelho de apoio em z = 0, sob o quadril; o centro do quadril na linha dos dois quadris
  const pelve: V3 = [0, alturaDoJoelho(corpo, o) + L, 0];
  /** Com as costas a `beta`, a mão vai para baixo do ombro (a conta se repete, porque o ombro anda com o braço). */
  const montar = (beta: number) => {
    const t = troncoEmQuatroApoios(corpo, o, { beta, pelve });
    let z = pelve[2] + 50,
      e = resolverMembros(t, maosNoPiso(corpo, o, z), { R: pernaDeApoio(), L: pernaDeApoio() });
    for (let i = 0; i < 4; i++) {
      z = (e.lado.R.ombro[2] + e.lado.L.ombro[2]) / 2;
      e = resolverMembros(t, maosNoPiso(corpo, o, z), { R: pernaDeApoio(), L: pernaDeApoio() });
    }
    return { e, z };
  };
  const beta = resolver1((b) => montar(b).e.lado.R.ang.cotovelo - o.cotovelo, -20, 40, 30);
  const { e, z } = montar(beta);
  const linha = Math.atan2(e.torax.o[1] - e.pelve.o[1], e.torax.o[2] - e.pelve.o[2]) / rad;
  const c: QuatroApoios = { beta, zMao: z, pelve, linha };
  m.set(chave, c);
  return c;
}
