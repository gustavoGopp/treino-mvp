// O apoio no chão (ou num apoio fixo), o que o pike e a extensão de tríceps com o peso do corpo têm em comum: os pés
// apoiados na ponta, com o calcanhar levantado e parado, e as mãos espalmadas num plano (o chão ou o tampo de uma
// bancada). Parte das mesmas ideias da flexão aprovada (./flexao.ts), sem mexer nela: o pé gira na bola do pé, a mão
// fica plantada pelo punho e pelos dedos.
import { pontosDoBoneco } from '../boneco';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import type { Corpo } from '../tabelas';
import type { V3 } from '../vec';

const rad = Math.PI / 180;

/**
 * Os dois pés na ponta, na largura `meia` (cm do meio do corpo), com a bola do pé em z = 0 e o calcanhar levantado
 * `calc` graus. Devolve a pose das pernas e onde fica o tornozelo (no plano do meio do corpo): com o calcanhar parado,
 * o tornozelo não sai do lugar, e o corpo gira em torno dele.
 */
export function pesNaPonta(corpo: Corpo, meia: number, calc: number, polo: V3): { pernas: Record<Lado, PosePerna>; tornozelo: V3 } {
  const m = (id: string) => corpo.m(id);
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * meia, 0, 0], dir: [0, 0, 1], calc }, polo });
  const hM = m('altura.maleolo'),
    r = m('pe.calcanharABola') - m('pe.calcanharAoTornozelo'),
    c = calc * rad;
  const tornozelo: V3 = [0, hM * Math.cos(c) + r * Math.sin(c), -(r * Math.cos(c)) + hM * Math.sin(c)];
  return { pernas: { R: perna('R'), L: perna('L') }, tornozelo };
}

/** Distância do quadril ao tornozelo com o joelho dobrado `joelho` graus (cm). */
export function quadrilAoTornozelo(corpo: Corpo, joelho: number): number {
  const a = corpo.m('coxa.comp'),
    b = corpo.m('perna.comp');
  return Math.sqrt(a * a + b * b + 2 * a * b * Math.cos(joelho * rad));
}

/**
 * A mão espalmada num plano horizontal na altura `y` (o chão é 0), com o centro da palma em (±x, y, z) e os dedos
 * para a frente (+z), um pouco abertos para fora, como na flexão aprovada. `polo` diz para onde o cotovelo aponta.
 */
export function maoEspalmada(corpo: Corpo, k: Lado, x: number, y: number, z: number, polo: V3, extra: Partial<PoseBraco> = {}): PoseBraco {
  const s = sinal(k);
  return { punho: [s * x, y + corpo.m('raio.punho') * 0.85, z - corpo.m('mao.palma') * 0.45], polo, mao: { polegar: [-s, 0, 0.25], dedos: [s * 0.08, 0, 1], forma: 'aberta' }, ...extra };
}

/** O ponto mais baixo de uma parte do Boneco (na superfície), por exemplo da cabeça. */
export function maisBaixoDa(e: Esq, partes: string[]): V3 {
  let melhor: V3 = [0, 1e9, 0];
  for (const { p, parte } of pontosDoBoneco(e)) if (partes.includes(parte) && p[1] < melhor[1]) melhor = p;
  return melhor;
}
