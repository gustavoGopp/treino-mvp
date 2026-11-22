// O núcleo dos exercícios sentado na ponta da cadeira firme com o tronco inclinado à frente (os crucifixos invertidos
// com o peito nas coxas e a rosca concentrada). A cadeira é a de ./quadril-sentado-na-cadeira.ts
// (../pecas-de-cena/cadeira.ts, encostada na parede); aqui a pessoa senta mais na ponta e inclina o tronco, e por isso
// a altura da bacia e o lugar dos pés não podem vir da calibração de lá, que é feita com o tronco reto.
//
// O que este arquivo resolve, em vez de receber pronto (para cada tronco pedido):
//  - onde ficam os pés: à distância em que o joelho fica no ângulo pedido com a bola do pé no chão;
//  - a altura da bacia: a parte de baixo do glúteo e da coxa apoia no assento (amassando `amassa` cm), medida na
//    superfície do Boneco, com a bacia já inclinada (inclinar a bacia gira o glúteo para trás e para cima).
// E mede o que os exercícios precisam: quanto uma parte do corpo entra noutra (o peito na coxa, o braço na coxa).
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import { add, cross, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import type { Corpo } from '../tabelas';
import { apoioNoAssento, assento } from './quadril-sentado-na-cadeira';

export interface OpcoesNaPonta {
  /** Distância do centro do quadril à borda da frente do assento (cm): sentado na ponta. */
  quadrilABorda: number;
  /** Meia distância entre os pés (do meio ao centro da bola do pé). */
  pesMeiaDistancia: number;
  /** Quanto a ponta de cada pé vira para fora (graus). */
  pesAbrem: number;
  /** Ângulo do joelho com o pé chapado no chão. */
  joelho: number;
  /** Quanto o glúteo e a coxa afundam no assento (cm). */
  amassa: number;
}
/** O tronco inclinado: a bacia (`frente`) e a coluna, somados à curva de repouso. */
export type TroncoNaPonta = Omit<PoseTronco, 'pelve'>;

/** O tronco com a bacia em (0, y, z do quadril). */
export const troncoNaPonta = (corpo: Corpo, o: OpcoesNaPonta, y: number, t: TroncoNaPonta): Tronco => resolverTronco(corpo, { ...t, pelve: [0, y, -o.quadrilABorda] });

/** Os dois pés chapados no chão, à frente, na largura pedida, com a ponta virada `pesAbrem` graus para fora. */
export function pesNoChao(o: OpcoesNaPonta, bolaZ: number): Record<Lado, PosePerna> {
  const pe = (k: Lado): PosePerna => {
    const s = sinal(k),
      a = (o.pesAbrem * Math.PI) / 180;
    return { pe: { bola: [s * o.pesMeiaDistancia, 0, bolaZ], dir: [s * Math.sin(a), 0, Math.cos(a)] }, polo: norm([s * Math.sin(a), 0.3, Math.cos(a)]) };
  };
  return { R: pe('R'), L: pe('L') };
}

/** Os braços para a calibração das pernas: pendurados (não mudam a altura da bacia nem o lugar dos pés). */
const SOLTOS: Record<Lado, PoseBraco> = { R: { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'relaxada' } }, L: { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'relaxada' } } };

/**
 * Sentado na ponta com o tronco `t`: a altura da bacia (o glúteo e a coxa no assento) e o lugar da bola dos pés (os
 * joelhos no ângulo pedido). Quem chama guarda o resultado (../calibragens.ts): são algumas centenas de poses.
 */
export function sentarNaPonta(corpo: Corpo, o: OpcoesNaPonta, t: TroncoNaPonta): { y: number; bolaZ: number } {
  const A = assento();
  let c = { y: A.altura + 10, bolaZ: 15 };
  const esq = (y: number, bolaZ: number) => resolverMembros(troncoNaPonta(corpo, o, y, t), SOLTOS, pesNoChao(o, bolaZ));
  for (let i = 0; i < 4; i++) {
    const y = c.y;
    const bolaZ = resolver1((z) => esq(y, z).lado.L.ang.joelho - o.joelho, -15, 70);
    c = { y: y - o.amassa - apoioNoAssento(esq(y, bolaZ)), bolaZ };
  }
  return c;
}

/**
 * Quanto os pontos das partes `quais` entram nas partes `alvo` (cm; 0 ou menos = não entram): cada anel da pele do alvo
 * (12 pontos) contra os pontos que ficam no plano dele (a 1,5 cm); um ponto entra quando fica mais perto do centro do
 * anel que a pele do anel naquela direção (a mesma conta de ./polia-puxar.ts, `entraNoTronco`, para quaisquer partes).
 * `perto` filtra os pontos que contam (por exemplo, só os de um lado do corpo).
 */
export function entraNasPartes(e: Esq, alvo: (parte: string, p: V3) => boolean, quais: (parte: string, p: V3) => boolean): number {
  const P = pontosDoBoneco(e);
  const fora = P.filter((x) => quais(x.parte, x.p)).map((x) => x.p);
  let pior = -1e9;
  for (let i = 0; i + 12 <= P.length; i += 12) {
    if (!alvo(P[i]!.parte, P[i]!.p)) continue;
    const anel = P.slice(i, i + 12).map((x) => x.p);
    const c = mul(anel.reduce((a, b) => add(a, b), [0, 0, 0] as V3), 1 / 12);
    const n = norm(cross(sub(anel[0]!, c), sub(anel[3]!, c)));
    for (const p of fora) {
      const d = sub(p, c);
      const h = dot(d, n);
      if (Math.abs(h) > 1.5) continue;
      const r = sub(d, mul(n, h));
      const rr = Math.hypot(r[0], r[1], r[2]);
      if (rr < 1e-6) continue;
      const u = mul(r, 1 / rr);
      let pele = 0;
      for (const q of anel) pele = Math.max(pele, dot(sub(q, c), u));
      pior = Math.max(pior, pele - rr);
    }
  }
  return pior;
}

/** A menor distância (cm) entre os pontos da pele das partes `a` e os das partes `b`. */
export function distanciaEntre(e: Esq, a: (parte: string, p: V3) => boolean, b: (parte: string, p: V3) => boolean): number {
  const P = pontosDoBoneco(e);
  const A = P.filter((x) => a(x.parte, x.p)).map((x) => x.p),
    B = P.filter((x) => b(x.parte, x.p)).map((x) => x.p);
  let m = 1e9;
  for (const p of A) for (const q of B) m = Math.min(m, Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]));
  return m;
}

/**
 * O contato entre duas partes como um número só (cm): quanto entra, se encostam (positivo = amassa); senão, menos a
 * distância entre as peles (negativo = longe). Contínuo nos dois lados, para `resolver1`.
 */
export function contatoEntre(e: Esq, alvo: (parte: string, p: V3) => boolean, quais: (parte: string, p: V3) => boolean): number {
  const entra = entraNasPartes(e, alvo, quais);
  if (entra > 0) return entra;
  return -distanciaEntre(e, alvo, quais);
}

/** O peito e a barriga (as partes do tronco). */
export const ehTronco = (parte: string) => parte === 'tronco' || parte === 'cintura' || parte === 'emendaDaCintura';
