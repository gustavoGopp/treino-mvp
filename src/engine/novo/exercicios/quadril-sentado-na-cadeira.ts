// O núcleo dos exercícios sentados na cadeira firme (abdução com mini band e extensão de joelho com caneleira).
// Sentado no assento da cadeira (pecas-de-cena/cadeira.ts, encostada na parede), o tronco reto, as mãos segurando as
// bordas dos lados do assento, ao lado do quadril. As pernas vêm do exercício: o pé apoiado no chão (com o joelho a
// `joelho` graus) ou a perna livre (a coxa na mesma direção da outra e a canela pela flexão do joelho).
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo e por opções):
//  - onde ficam os pés: à distância em que o joelho fica no ângulo pedido com a bola do pé no chão;
//  - a altura da bacia: a parte de baixo do glúteo e da coxa apoia no assento (amassando `amassa` cm), medida na
//    superfície do Boneco.
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import { obj } from '../tabelas';
import type { Corpo } from '../tabelas';
import { norm } from '../vec';
import type { V3 } from '../vec';

export interface OpcoesSentado {
  /** Distância do centro do quadril à borda da frente do assento (cm): sentado mais na beira ou mais para dentro. */
  quadrilABorda: number;
  /** Meia distância entre os pés (do meio ao centro da bola do pé). */
  pesMeiaDistancia: number;
  /** Ângulo do joelho com o pé chapado no chão. */
  joelho: number;
  /** Quanto o glúteo e a coxa afundam no assento (cm). */
  amassa: number;
  /** As mãos nas bordas dos lados do assento: quantos cm à frente do centro do quadril. */
  maosAFrente: number;
}

/** O assento: a borda da frente fica em z = 0; o encosto, para −z. */
export const assento = () => ({ altura: obj('cadeira', 'assentoAltura'), larg: obj('cadeira', 'assentoLarg'), esp: obj('cadeira', 'assentoEsp'), zBorda: 0 });

interface Calib {
  y: number;
  bolaZ: number;
}
const CALIB = new WeakMap<Corpo, Map<string, Calib>>();

/** O tronco sentado: a bacia em (0, y, z do quadril), com a inclinação e as flexões pedidas. */
export function troncoSentado(corpo: Corpo, o: OpcoesSentado, y: number, t: { frente?: number; lombar?: number; toracica?: number } = {}): Tronco {
  return resolverTronco(corpo, { pelve: [0, y, -o.quadrilABorda], ...t });
}

/** As mãos segurando as bordas dos lados do assento, ao lado do quadril, com o polegar para a frente. */
export function maosNoAssento(o: OpcoesSentado): Record<Lado, PoseBraco> {
  const A = assento();
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return { pegada: [s * (A.larg / 2 - 0.3), A.altura - A.esp / 2, -o.quadrilABorda + o.maosAFrente], polo: [s * 0.5, 0, -1], mao: { polegar: [0, 0, 1], forma: 'pegada', diam: A.esp } };
  };
  return { R: braco('R'), L: braco('L') };
}

/** O pé chapado no chão, à frente, na largura pedida; `abre` gira o joelho para fora em volta da linha do quadril ao tornozelo. */
export function peNoChao(o: OpcoesSentado, k: Lado, bolaZ: number, abre = 0, peFora = 0): PosePerna {
  const s = sinal(k);
  return { pe: { bola: [s * (o.pesMeiaDistancia + peFora), 0, bolaZ], dir: [0, 0, 1] }, polo: joelhoParaFora(s, abre) };
}
/** O polo do joelho girado `abre` graus para fora (em volta da vertical, partindo de quase para a frente). */
function joelhoParaFora(s: number, abre: number): V3 {
  const a = (abre * Math.PI) / 180 + 0.05;
  return norm([s * Math.sin(a), 0.3, Math.cos(a)]);
}

/**
 * A calibração da pose sentada: a distância dos pés (o joelho no ângulo pedido) e a altura da bacia (o glúteo e a coxa
 * no assento). `pernas` monta as duas pernas a partir de bolaZ (o exercício decide qual perna é livre).
 */
export function calibrarSentado(corpo: Corpo, o: OpcoesSentado, chave: string, pernas: (t: Tronco, bolaZ: number) => Record<Lado, PosePerna>): Calib {
  let m = CALIB.get(corpo);
  if (!m) CALIB.set(corpo, (m = new Map()));
  const k = `${chave}|${JSON.stringify(o)}`;
  const ja = m.get(k);
  if (ja) return ja;
  const A = assento();
  let c: Calib = { y: A.altura + 10, bolaZ: 15 };
  const esq = (cc: Calib) => {
    const t = troncoSentado(corpo, o, cc.y);
    return resolverMembros(t, maosNoAssento(o), pernas(t, cc.bolaZ));
  };
  for (let i = 0; i < 4; i++) {
    const cc: Calib = c;
    const bolaZ = resolver1((z) => esq({ ...cc, bolaZ: z }).lado.L.ang.joelho - o.joelho, -10, 60);
    const e = esq({ ...cc, bolaZ });
    // o ponto mais baixo do glúteo e da coxa em cima do assento (da borda para trás)
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (['pelve', 'coxa', 'cintura'].includes(parte) && p[2] < A.zBorda && Math.abs(p[0]) < A.larg / 2) min = Math.min(min, p[1]);
    c = { y: cc.y + (A.altura - o.amassa) - min, bolaZ };
  }
  m.set(k, c);
  return c;
}

/** O ponto mais baixo do glúteo e da coxa sobre o assento, acima do tampo (cm; negativo = afunda). */
export function apoioNoAssento(e: Esq): number {
  const A = assento();
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (['pelve', 'coxa', 'cintura'].includes(parte) && p[2] < A.zBorda && Math.abs(p[0]) < A.larg / 2) min = Math.min(min, p[1]);
  return min - A.altura;
}
