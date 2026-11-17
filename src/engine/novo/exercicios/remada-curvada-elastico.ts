// Remada curvada em pé com elástico, pisando no meio, no motor novo. Os números vêm da ficha
// (../dados/movimentos/remada-curvada-elastico.json). O corpo parado é o da remada curvada com halteres aprovada
// (./remada-curvada-halteres.ts, sobre ./dobrar-o-quadril.ts): pés na largura do quadril, joelhos levemente dobrados, o
// quadril para trás e o tronco bem inclinado com a coluna neutra, o centro de massa sobre o meio do pé. Os dois braços
// puxam como lá (núcleo ./remada.ts), cada mão com um pegador do tubo da tabela (48 pol). Os dois pés pisam no meio do
// tubo, sob o meio da sola; de cada pegador, o tubo desce por fora da perna até a borda de fora do pé, passa por baixo
// dos dois pés e pelo chão entre eles (./elastico-pisado.ts). O elástico, pisado e seguro pelo mesmo corpo, não pesa no
// equilíbrio: ele puxa as mãos para os pés e os pés para as mãos.
// O erro "pisar só com a ponta do pé" é pose: os calcanhares sobem e o tubo fica sob a ponta dos dedos.
import ficha from '../dados/movimentos/remada-curvada-elastico.json';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca } from '../pecas';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, sub } from '../vec';
import { alcanceDoBraco, dobrarOQuadril, maoNoAngulo } from './dobrar-o-quadril';
import { comprimento } from './elastico-faixa';
import { bordasDaSolaEm, trechoAteOPe } from './elastico-pisado';
import { criarRemada } from './remada';
import type { BaseDaRemada } from './remada';

const f = daFicha(fichaSchema.parse(ficha));
/** O meio da sola, do calcanhar à ponta do pé: entre o calcanhar e a bola (onde a rosca com elástico aprovada pisa). */
const MEIO_DA_SOLA = 0.4;

/** O corpo parado; com `naPonta`, os calcanhares levantados (o erro do pé), o resto igual. */
function base(corpo: Corpo, naPonta = false): BaseDaRemada {
  const alcance = alcanceDoBraco(corpo, 3);
  // o equilíbrio sai do corpo sem carga: o elástico é uma força de dentro (das mãos aos pés)
  const D = dobrarOQuadril(corpo, {
    joelho: f('joelho'),
    tronco: f('tronco.inclinacao'),
    lombar: 0,
    toracica: 0,
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    pesMeiaDistancia: f('pes.meiaDistancia'),
    apoio: 'dois',
    bracos(e) {
      const braco = (k: Lado): PoseBraco => ({ pegada: maoNoAngulo(e, k, e.lado[k].ombro[0], alcance, 0), polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
      return { R: braco('R'), L: braco('L'), cargas: [] };
    },
  });
  const pe = (s: number, calc: number): PosePerna => ({ pe: { bola: D.bola(s), dir: [0, 0, 1], calc }, polo: [0, 0, 1] });
  const calc = naPonta ? f('erro.pe.calcanhar') : 0;
  const pernas = { R: pe(-1, calc), L: pe(1, calc) };
  // na ponta do pé, o corpo inteiro sobe e vai com o tornozelo (os joelhos ficam no mesmo ângulo)
  const solto: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const tornozelo = (c: number) => resolverMembros(resolverTronco(corpo, D.e.pose), { R: solto, L: solto }, { R: pe(-1, c), L: pe(1, c) }).lado.R.tornozelo;
  const anda = sub(tornozelo(calc), tornozelo(0));
  return { tronco: { ...D.e.pose, pelve: add(D.e.pose.pelve, anda) }, pernas, prims: [chao(-70, 70, -100, 100)], pecas: [], marcas: {} };
}

const ERROS = { costas: 'arredondar', tronco: 'subir' } as const;
const R = criarRemada(ficha, { bracos: 'dois', carga: 'elastico', base: (c) => base(c), erros: ERROS });
// o erro do pé: a mesma remada, com os calcanhares levantados
const NA_PONTA = criarRemada(ficha, { bracos: 'dois', carga: 'elastico', base: (c) => base(c, true), erros: ERROS });

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const q = erro === 'pe' ? NA_PONTA.quadro(corpo, u) : R.quadro(corpo, u, erro);
  const e = q.esq;
  const t = erro === 'pe' ? f('erro.pe.sola') : MEIO_DA_SOLA;
  // de cada pegador, por fora da perna do mesmo lado até a borda de fora do pé; por baixo dos dois pés, de uma borda à outra
  const lado = (k: Lado) => {
    const sola = bordasDaSolaEm(corpo, e, k, t);
    const sobe = trechoAteOPe(e, k, sola.fora, [sinal(k), 0, 0], f('elastico.folgaNaPerna'), { r: f('elastico.voltaNaMao'), n: f('elastico.voltas') });
    return { pts: [...sobe.pts, sola.dentro], ponta: sobe.ponta, sola };
  };
  const tR = lado('R'),
    tL = lado('L');
  const pts = [...tR.pts, ...tL.pts.slice().reverse()];
  const comp = comprimento(pts);
  const pecas: Peca[] = [...(q.pecas ?? []), { t: 'elastico', pts, estica: comp / obj('elastico', 'comp') }];
  for (const k of LADOS) pecas.push(pegadorNaMao(e.lado[k].pegada, e.lado[k].mao.x, (k === 'R' ? tR : tL).ponta, `pegador${k}`));
  return {
    ...q,
    prims: [...q.prims, { t: 'fio', pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas,
    fios: [{ id: 'elastico', comp, estica: true }],
    marcas: { ...q.marcas, mao: e.lado.R.pegada, solaRfora: tR.sola.fora, solaRdentro: tR.sola.dentro, solaLfora: tL.sola.fora, solaLdentro: tL.sola.dentro, pegadorR: e.lado.R.pegada, pegadorL: e.lado.L.pegada },
    vies: { ...q.vies, maoR: 1, maoL: 1 },
  };
}

export const remadaCurvadaElastico: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // costas (dorsal e meio das costas) em vermelho; bíceps e ombro de trás em laranja, como a curvada com halteres
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { mão: (q) => q.marcas.mao!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
