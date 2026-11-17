// A adução de quadril deitado de lado (sem carga e com caneleira): o que as duas têm em comum.
// Deitado sobre o lado direito, de costas para quem vê, a cabeça no braço de baixo, a mão de cima no chão à frente do
// ombro. A perna de cima (a esquerda) dobrada, com o pé no chão à frente da perna de baixo; a perna de baixo (a
// direita, a que trabalha) estendida, em linha com o corpo, sobe num curso curto e volta a um dedo do chão, sem
// descansar. Os números vêm da ficha de cada exercício (as mesmas linhas nas duas); o corpo deitado vem do núcleo
// ./quadril-deitado-de-lado.ts.
import { pontosDoBoneco } from '../boneco';
import { resolverMembros } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, resolver1 } from '../movimento';
import type { Ficha } from '../movimento';
import type { Corpo } from '../tabelas';
import { add, dist, mix, mul, norm } from '../vec';
import type { V3 } from '../vec';
import { pernaEstendida } from './quadril-abrir-deitado';
import { direcao, eixosDaBacia, troncoDeLado } from './quadril-deitado-de-lado';
import type { OpcoesDeLado } from './quadril-deitado-de-lado';

const rad = Math.PI / 180;

export function opcoesDaAducao(F: Ficha, piso: number): OpcoesDeLado {
  const f = daFicha(F);
  return { baixo: 'R', deFrente: true, piso, bracoDeBaixo: { abre: f('bracoDeBaixo.abre'), cotovelo: f('bracoDeBaixo.cotovelo'), prot: f('bracoDeBaixo.prot'), elev: f('bracoDeBaixo.elev') }, maoDeCima: { frente: f('maoDeCima.frente'), abaixo: f('maoDeCima.abaixo') }, cabecaNoBraco: f('cabecaNoBraco') };
}

/** A perna de cima dobrada, com o pé chapado no chão à frente da perna de baixo. */
function pernaDeCima(t: Tronco, F: Ficha, piso: number): PosePerna {
  const f = daFicha(F);
  const E = eixosDaBacia(t, 'R');
  const q = t.pelve.o;
  const noChao = (v: V3): V3 => [v[0], 0, v[2]];
  const pes = norm(noChao(E.pes)),
    frente = norm(noChao(E.frente));
  const b = add(add([q[0], piso, q[2]], mul(pes, f('peDeCima.abaixo'))), mul(frente, f('peDeCima.frente')));
  const a = f('peDeCima.giro') * rad;
  return { pe: { bola: b, dir: norm(add(mul(pes, Math.cos(a)), mul(frente, Math.sin(a)))) }, polo: norm(add(E.cima, mul(frente, 0.7))) };
}

/** O ponto mais baixo da perna de baixo (da metade da coxa ao pé), acima do piso. */
function folgaDaPerna(e: Esq, piso: number): number {
  const R = e.lado.R,
    L = e.lado.L;
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'coxa' && parte !== 'canela' && parte !== 'pe') continue;
    if (dist(p, R.quadril) < 20) continue;
    const dR = Math.min(dist(p, R.joelho), dist(p, R.tornozelo)),
      dL = Math.min(dist(p, L.joelho), dist(p, L.tornozelo), dist(p, L.bola));
    if (dR < dL) min = Math.min(min, p[1]);
  }
  return min - piso;
}

export interface PoseDaAducao {
  /** Quanto a perna de baixo fecha (sobe) além da posição de baixo, em graus. */
  fecha: number;
  /** A folga da perna ao chão embaixo (cm). */
  folga: number;
  rola: number;
  /** Giro da perna para fora (graus): com o tronco rolado, o joelho vira para o teto. */
  giro: number;
}

const EMBAIXO = new WeakMap<Corpo, Map<string, number>>();
/** O esqueleto da adução deitado de lado numa pose. */
export function aducaoDeLado(corpo: Corpo, F: Ficha, piso: number, p: PoseDaAducao): { e: Esq; bracos: Record<Lado, PoseBraco> } {
  const f = daFicha(F);
  const o: OpcoesDeLado = { ...opcoesDaAducao(F, piso), rola: p.rola };
  const { t, bracos } = troncoDeLado(corpo, o);
  const E = eixosDaBacia(t, 'R');
  const cima = pernaDeCima(t, F, piso);
  const pe = (abre: number) => pernaEstendida(direcao(t, 'R', f('pernaDeBaixo.flexao'), abre), E.frente, p.giro, f('pe.flexaoPlantar'));
  const esq = (abre: number) => resolverMembros(t, bracos, { R: pe(abre), L: cima });
  // embaixo: a perna fica a `folga` cm do chão (a abertura que dá isso, guardada por corpo e por folga e rolamento)
  const chave = `${F.id}|${p.folga}|${p.rola.toFixed(2)}`;
  let m = EMBAIXO.get(corpo);
  if (!m) EMBAIXO.set(corpo, (m = new Map()));
  let a0 = m.get(chave);
  if (a0 === undefined) {
    a0 = resolver1((a) => folgaDaPerna(esq(a), piso) - p.folga, 20, -30, 24);
    m.set(chave, a0);
  }
  return { e: esq(a0 - p.fecha), bracos };
}

/** A pose da adução em u (0 = embaixo, 1 = em cima), certa ou num dos erros (`gira`, `tranco`, `descansa`). */
export function poseDaAducao(F: Ficha, u: number, erro?: string): PoseDaAducao {
  const f = daFicha(F);
  const p: PoseDaAducao = { fecha: f('aducao.curso') * u, folga: f('embaixo.folga'), rola: 0, giro: 0 };
  if (erro === 'gira') {
    p.rola = f('erro.gira.graus') * u;
    p.fecha = mix(0, f('erro.gira.curso'), u);
    p.giro = f('erro.gira.giroDaPerna') * u;
  } else if (erro === 'tranco') p.fecha = f('erro.tranco.curso') * u;
  else if (erro === 'descansa') p.folga = mix(f('embaixo.folga'), f('erro.descansa.folga'), 1 - u);
  return p;
}
