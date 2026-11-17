// A abdução de quadril deitado de lado (sem carga e com caneleira): o que as duas têm em comum.
// Deitado sobre o lado esquerdo, de costas para quem vê (o glúteo fica à vista), a cabeça no braço de baixo, a mão de
// cima no chão à frente do peito, a perna de baixo dobrada para dar base. A perna de cima (a direita) sobe estendida,
// um pouco atrás da linha do corpo, com os dedos para a frente; a bacia não sai do lugar.
// Os números vêm da ficha de cada exercício (as mesmas linhas nas duas); o corpo deitado vem do núcleo
// ./quadril-deitado-de-lado.ts.
import { resolverMembros } from '../esqueleto';
import type { Esq, PosePerna } from '../esqueleto';
import type { Ficha } from '../movimento';
import { daFicha } from '../movimento';
import type { Corpo } from '../tabelas';
import { add, girar, mix, mul, norm, perp } from '../vec';
import type { V3 } from '../vec';
import { direcao, eixosDaBacia, pernaNoPiso, troncoDeLado } from './quadril-deitado-de-lado';
import type { OpcoesDeLado } from './quadril-deitado-de-lado';

const rad = Math.PI / 180;

export function opcoesDaFicha(F: Ficha, piso: number): OpcoesDeLado {
  const f = daFicha(F);
  return { baixo: 'L', piso, bracoDeBaixo: { abre: f('bracoDeBaixo.abre'), cotovelo: f('bracoDeBaixo.cotovelo'), prot: f('bracoDeBaixo.prot'), elev: f('bracoDeBaixo.elev') }, maoDeCima: { frente: f('maoDeCima.frente'), abaixo: f('maoDeCima.abaixo') }, cabecaNoBraco: f('cabecaNoBraco') };
}

/** A perna estendida: a direção dela, o joelho para `polo` girado `giro` graus para fora, os dedos com `flexaoPlantar`. */
export function pernaEstendida(dir: V3, frente: V3, giro: number, flexaoPlantar: number): PosePerna {
  const polo0 = norm(perp(frente, dir));
  // o giro para fora da perna direita (deitada sobre o lado esquerdo): o joelho e os dedos viram para o teto
  const polo = norm(girar(polo0, dir, -giro));
  const peDir = norm(add(mul(polo, Math.cos(flexaoPlantar * rad)), mul(dir, Math.sin(flexaoPlantar * rad))));
  return { coxa: dir, canela: dir, polo, peDir };
}

export interface PoseDaAbducao {
  /** Abertura do quadril de cima (graus). */
  abre: number;
  /** Flexão do quadril de cima (graus; negativo = atrás da linha do corpo). */
  flexao: number;
  /** Giro da perna para fora (graus). */
  giro: number;
  rola: number;
  cintura: number;
}

/** O esqueleto da abdução deitado de lado numa pose. */
export function abducaoDeLado(corpo: Corpo, F: Ficha, piso: number, p: PoseDaAbducao): Esq {
  const f = daFicha(F);
  const o: OpcoesDeLado = { ...opcoesDaFicha(F, piso), rola: p.rola, cintura: p.cintura };
  const { t, bracos } = troncoDeLado(corpo, o);
  const E = eixosDaBacia(t, 'L');
  const deCima = pernaEstendida(direcao(t, 'R', p.flexao, p.abre), E.frente, p.giro, f('pe.flexaoPlantar'));
  // a perna de baixo, dobrada à frente, deitada no chão; o pé de lado no chão, em ângulo reto com a canela
  const fq = f('pernaDeBaixo.quadril'),
    fk = fq - f('pernaDeBaixo.joelho');
  const deBaixo = pernaNoPiso(t, bracos, o, 'L', deCima, fq, fk, (d) => norm(perp(direcao(t, 'L', fk + 90 - f('pe.flexaoPlantar'), 0), d)));
  return resolverMembros(t, bracos, { R: deCima, L: deBaixo });
}

/** A pose da abdução em u (0 = embaixo, 1 = em cima), certa ou num dos erros (`rola`, `frente`, `alto`). */
export function poseDaAbducao(F: Ficha, u: number, erro?: string): PoseDaAbducao {
  const f = daFicha(F);
  const topo = erro === 'alto' ? f('erro.alto.topo') : f('abducao.topo');
  const p: PoseDaAbducao = { abre: mix(f('abducao.embaixo'), topo, u), flexao: -f('pernaDeCima.atras'), giro: 0, rola: 0, cintura: 0 };
  if (erro === 'rola') {
    p.rola = f('erro.rola.graus') * u;
    p.flexao = mix(-f('pernaDeCima.atras'), f('erro.rola.flexao'), u);
    p.giro = f('erro.rola.giroDaPerna') * u;
  } else if (erro === 'frente') p.flexao = mix(-f('pernaDeCima.atras'), f('erro.frente.flexao'), u);
  else if (erro === 'alto') p.cintura = f('erro.alto.cintura') * Math.max(0, (p.abre - f('abducao.topo')) / (topo - f('abducao.topo')));
  return p;
}
