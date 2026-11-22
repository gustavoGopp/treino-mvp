// Rosca na polia baixa, de costas para a torre, no motor novo. Os números vêm da ficha
// (../dados/movimentos/rosca-polia-costas.json); o corpo em pé e a coluna com o cabo, do núcleo ./polia-bracos.ts; o
// braço da rosca, do núcleo das roscas (./dobrar-o-cotovelo.ts, `bracoDaRosca`), como na rosca na polia
// (./rosca-polia.ts). De costas para a coluna, um passo à frente dela, a polia no ponto mais baixo, o estribo na mão
// direita. O que ele resolve em cada quadro, em vez de receber pronto:
//  - o braço parado atrás da linha do tronco (o úmero não se move) e o antebraço dobrando no plano do braço, a palma
//    para a frente; a outra mão pende solta ao lado do corpo;
//  - o quadril fica onde o centro de massa cai no meio dos pés (o cabo não entra na conta, como na rosca na polia);
//  - a roldana fica atrás, na linha da mão (o cabo sai de trás do corpo, por fora do quadril), e o cabo vai reto do
//    elo do estribo até ela; a pilha sobe o curso do cabo dividido pela relação da máquina.
import ficha from '../dados/movimentos/rosca-polia-costas.json';
import { sinal } from '../esqueleto';
import type { Esq, PoseBraco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, norm, perp } from '../vec';
import type { V3 } from '../vec';
import { bracoDaRosca } from './dobrar-o-cotovelo';
import { colunasECabos, compDoCabo, equilibrar, estriboNaMao, menorNoCiclo, montarEmPe, polegarDaPegada, torreComRoldanaEm } from './polia-bracos';
import type { CaboDaColuna, PedidoEmPe, PelveParada } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** Até que altura o quadro mostra a coluna (a polia está embaixo: o resto é cortado pela borda). */
const CORTADA_EM = 150;

function pedidoDoCorpo(u: number, erro?: string): PedidoEmPe {
  const w = f('pes.meiaDistancia');
  const x = suave(u);
  const cotovelo = mix(f('cotovelo.baixo'), f('cotovelo.cima'), u);
  const carga = erro === 'carga';
  const braco = (t: Tronco): PoseBraco => {
    const b = bracoDaRosca(t.torax, 'R', {
      paraFora: f('braco.paraFora'),
      aFrente: -f('braco.atras') + (erro === 'cotovelo' ? (f('braco.atras') + f('erro.cotovelo.braco')) * x : 0),
      cotovelo,
      supinacao: f('maos.supinacao'),
      diam: obj('estribo', 'pegadaDiam'),
      prot: carga ? f('erro.carga.prot') : 0,
      elev: carga ? f('erro.carga.elev') : 0,
    });
    // o antebraço dobra em volta de um eixo de lado a lado (o cotovelo é uma dobradiça), aberto para fora o ângulo de
    // carregamento, como na rosca na polia
    const s = sinal('R'),
      um = norm(b.umero!),
      fora = dirRef(t.torax, [s, 0, 0]),
      frente = norm(perp(dirRef(t.torax, [0, 0, 1]), um)),
      c = cotovelo * rad,
      // no erro do cotovelo, o braço gira para fora e a mão abre para o lado: o cabo passa por fora do braço (até 19/11
      // ele atravessava o braço)
      be = (f('antebraco.paraFora') + (erro === 'cotovelo' ? f('erro.cotovelo.maoFora') * x : 0)) * rad;
    const antebraco = norm(add(mul(add(mul(um, Math.cos(c)), mul(frente, Math.sin(c))), Math.cos(be)), mul(fora, Math.sin(be))));
    return { ...b, antebraco, mao: { ...b.mao, polegar: polegarDaPegada(um, antebraco, b.polo, s, f('maos.supinacao')) } };
  };
  // a mão livre pende solta ao lado do corpo
  const solta = (t: Tronco): PoseBraco => {
    const a = f('outro.braco') * rad;
    const d = dirRef(t.torax, [sinal('L') * Math.sin(a), -Math.cos(a), 0]);
    return { umero: d, antebraco: norm(add(d, dirRef(t.torax, [0, 0, 0.12]))), polo: dirRef(t.torax, [0, 0, -1]), mao: { polegar: dirRef(t.torax, [0, 0, 1]), forma: 'relaxada' } };
  };
  return {
    pes: { R: { bola: [-w, 0, 0] }, L: { bola: [w, 0, 0] } },
    joelho: f('joelho'),
    tronco: f('tronco'),
    toracica: carga ? f('erro.carga.toracica') : 0,
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    giro: erro === 'giro' ? f('erro.giro') * x : 0,
    bracos: (t) => ({ R: braco(t), L: solta(t) }),
  };
}

interface Calibrado {
  pelve: PelveParada;
  cabos: CaboDaColuna[];
  repouso: number[];
}
const CAL = new WeakMap<Corpo, Calibrado>();

const montar = (corpo: Corpo, pelve: PelveParada, u: number, erro?: string): Esq => montarEmPe(corpo, pedidoDoCorpo(u, erro), pelve);

function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  const meioDoPe = -corpo.m('pe.calcanharABola') / 2;
  const pelve = equilibrar(corpo, pedidoDoCorpo(0.5), meioDoPe);
  // a roldana de baixo, atrás, na linha da mão no começo (o cabo sai da mão para trás, no plano do braço)
  const e0 = montar(corpo, pelve, 0);
  const cabos: CaboDaColuna[] = [{ id: 'cabo', torre: torreComRoldanaEm([e0.lado.R.pegada[0], obj('torre', 'poliaMin'), pelve.z - f('polia.atras')], [0, 0, 1]) }];
  const repouso = [menorNoCiclo((u) => compDoCabo(cabos[0]!.torre, estriboNaMao(montar(corpo, pelve, u), 'R', cabos[0]!.torre).elo))];
  c = { pelve, cabos, repouso };
  CAL.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = montar(corpo, c.pelve, u, erro);
  const es = estriboNaMao(e, 'R', c.cabos[0]!.torre);
  const col = colunasECabos(c.cabos, [es.elo], c.repouso, f('pilha.folga'), false, CORTADA_EM);
  const pecas: Peca[] = [...col.pecas!.filter((p) => p.t === 'torre'), es.peca, ...col.pecas!.filter((p) => p.t !== 'torre')];
  const marcas: Record<string, V3> = { ...col.marcas, mao: e.lado.R.pegada };
  return { esq: e, prims: [chao(-60, 60, c.cabos[0]!.torre.base[2] - 50, 60), ...es.prims, ...col.prims], pecas, fios: col.fios, cargas: [], marcas, vies: { maoR: 1 } };
}

export const roscaPoliaCostas: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // bíceps do braço que trabalha (principal; a biblioteca conta só ele); o antebraço "só ajuda", como nas outras roscas
  papeis: { 'biceps:R': 'p', 'antebraco:R': 'a' },
  trajetorias: { mão: (q) => q.marcas.mao!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
