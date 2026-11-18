// O corpo ajoelhado na almofada do graviton (a barra e o mergulho assistidos): o que os dois têm em comum. Os braços e
// o tronco fazem o movimento das animações aprovadas sem máquina (a barra fixa, ./barra-fixa-base.ts, e o mergulho,
// ./mergulho.ts), com as mesmas formas do corpo (`Forma`, do núcleo ./pendurado.ts); a diferença é a almofada nos
// joelhos e as pernas dobradas atrás. A máquina vem de ../pecas-de-cena/graviton.ts.
//
// As mãos seguram as alças e os joelhos ficam na almofada o tempo todo. Por isso a posição do corpo sai de duas
// condições, e não do equilíbrio sobre as mãos (o corpo pendurado das aprovadas): a almofada empurra os joelhos e
// segura parte do peso.
//  1) o braço alcança a alça com a dobra de cotovelo pedida (`pelvePeloCotovelo`, a mesma conta das aprovadas): ela
//     dá a altura da bacia;
//  2) o joelho fica em cima da almofada, que só anda no arco da alavanca: a bacia vai para a frente ou para trás até o
//     centro do joelho ficar à distância certa do eixo. O ângulo da alavanca sai daí, e a canela deita ao longo da
//     almofada (com a frente da canela no topo dela), os pés soltos atrás.
// A pilha sobe quando a almofada desce (../pecas-de-cena/graviton.ts).
import { resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PosePerna, Tronco } from '../esqueleto';
import { obj } from '../tabelas';
import type { Corpo } from '../tabelas';
import { add, dirRef, mul, noRef, norm } from '../vec';
import type { V3 } from '../vec';
import { eixoDoGraviton, topoAbaixoDoEixo } from '../pecas-de-cena/graviton';
import { montar, pelvePeloCotovelo } from './pendurado';
import type { Apoio, Forma } from './pendurado';

const rad = Math.PI / 180;

/** As pernas ajoelhadas: a dobra do quadril (a coxa à frente da linha da bacia), a ponta do pé e as coxas juntas. */
export interface PernasAjoelhadas {
  quadril: number;
  /** Quanto a ponta do pé estica além do ângulo reto com a canela (graus). */
  plantar: number;
  /** Quanto cada coxa vem para o meio (graus). */
  juntas: number;
  /** Quanto a canela desce em relação à almofada, do joelho para o tornozelo (graus): a frente dela fica no topo da almofada. */
  canela: number;
}

/** Quanto o centro do joelho fica acima do topo da almofada: a frente da canela logo abaixo da patela (como em quatro apoios). */
export const joelhoAcimaDaAlmofada = (corpo: Corpo) => corpo.secoes.perna![0]!.b;
/**
 * A distância do eixo da alavanca ao centro do joelho, e o ângulo dessa linha acima da almofada (graus): o topo da
 * almofada fica `almofadaAbaixoDoEixo` abaixo da linha do eixo, e o centro do joelho, a frente da canela acima dele.
 */
function raioDoJoelho(corpo: Corpo) {
  const s = obj('graviton', 'alavancaAteJoelho'),
    h = joelhoAcimaDaAlmofada(corpo) - topoAbaixoDoEixo();
  return { D: Math.hypot(s, h), acima: Math.atan2(h, s) / rad };
}

/** Uma direção no plano de lado do mundo: `graus` a partir de para baixo, girando para a frente (+z). */
const noPlano = (graus: number, x = 0): V3 => norm([x, -Math.cos(graus * rad), Math.sin(graus * rad)]);
/** As pernas com a alavanca no ângulo dado: a coxa presa à bacia, a canela deitada ao longo da almofada. */
export function pernasNaAlmofada(p: PernasAjoelhadas, alavanca: number): (t: Tronco) => Record<Lado, PosePerna> {
  return (t) => {
    const perna = (k: Lado): PosePerna => {
      const x = -sinal(k) * Math.sin(p.juntas * rad);
      // a canela aponta para trás ao longo da almofada (−(90 + alavanca) a partir de para baixo) e desce um pouco
      const canela = -(90 + alavanca) + p.canela;
      return {
        coxa: dirRef(t.pelve, [x, -Math.cos(p.quadril * rad), Math.sin(p.quadril * rad)]),
        canela: noPlano(canela),
        peDir: noPlano(canela + 90 - p.plantar),
        polo: dirRef(t.pelve, [0, -Math.cos((p.quadril + 90) * rad), Math.sin((p.quadril + 90) * rad)]),
      };
    };
    return { R: perna('R'), L: perna('L') };
  };
}

/** O corpo com a bacia em `pelve`, as mãos nas alças e a alavanca no ângulo dado. */
const montarNaAlmofada = (corpo: Corpo, a: Apoio, f: Omit<Forma, 'pernas'>, p: PernasAjoelhadas, pelve: V3, alavanca: number): Esq => montar(corpo, a, { ...f, pernas: pernasNaAlmofada(p, alavanca) }, pelve);

/** O centro do joelho direito, sem resolver o resto do corpo (a coxa sai da bacia). */
function joelhoDe(corpo: Corpo, f: Omit<Forma, 'pernas'>, p: PernasAjoelhadas, pelve: V3): V3 {
  const t = resolverTronco(corpo, { pelve, frente: f.frente, lombar: f.lombar ?? 0, toracica: f.toracica ?? 0, cervical: f.cervical ?? 0, cabeca: f.cabeca ?? 0 });
  const quadril = noRef(t.pelve, [sinal('R') * corpo.m('quadril.meiaDistancia'), 0, 0]);
  return add(quadril, mul(norm(pernasNaAlmofada(p, 0)(t).R.coxa!), corpo.m('coxa.comp')));
}

export interface NaAlmofada {
  e: Esq;
  pelve: V3;
  /** O ângulo da alavanca (graus acima da horizontal, para trás). */
  alavanca: number;
}

/**
 * O corpo ajoelhado na almofada, com o cotovelo dobrado `cotovelo` graus: a bacia na altura em que o braço alcança a
 * alça com essa dobra e na posição (para a frente ou para trás) em que o joelho fica no arco da almofada. `acima`: as
 * mãos ficam acima dos ombros (a barra) ou abaixo (a paralela).
 */
export function naAlmofada(corpo: Corpo, a: Apoio, f: Omit<Forma, 'pernas'>, p: PernasAjoelhadas, cotovelo: number, acima: boolean): NaAlmofada {
  const O = eixoDoGraviton();
  const { D, acima: dAcima } = raioDoJoelho(corpo);
  let z = 0,
    y = 0;
  const forma = (al: number): Forma => ({ ...f, pernas: pernasNaAlmofada(p, al) });
  for (let i = 0; i < 6; i++) {
    y = pelvePeloCotovelo(corpo, a, forma(0), z, cotovelo, acima);
    const K = joelhoDe(corpo, f, p, [0, y, z]);
    const dy = K[1] - O[1];
    const zc = O[2] - Math.sqrt(Math.max(0, D * D - dy * dy));
    z += zc - K[2];
  }
  y = pelvePeloCotovelo(corpo, a, forma(0), z, cotovelo, acima);
  const K = joelhoDe(corpo, f, p, [0, y, z]);
  const alavanca = Math.atan2(K[1] - O[1], O[2] - K[2]) / rad - dAcima;
  const pelve: V3 = [0, y, z];
  return { e: montarNaAlmofada(corpo, a, f, p, pelve, alavanca), pelve, alavanca };
}
