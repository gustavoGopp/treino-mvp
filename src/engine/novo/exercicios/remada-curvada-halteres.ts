// Remada curvada com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/remada-curvada-halteres.json).
// O corpo parado é o do stiff (./dobrar-o-quadril.ts): pés paralelos na largura do quadril, joelhos levemente dobrados,
// o quadril vai para trás e o tronco inclina com a coluna neutra, com o centro de massa (corpo + halteres pendurados)
// sobre o meio do pé. Daí em diante o quadril e o tronco ficam parados e os dois braços puxam (núcleo ./remada.ts).
import ficha from '../dados/movimentos/remada-curvada-halteres.json';
import type { Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { alcanceDoBraco, dobrarOQuadril, maoNoAngulo } from './dobrar-o-quadril';
import { criarRemada } from './remada';
import type { BaseDaRemada } from './remada';

const f = daFicha(fichaSchema.parse(ficha));

function base(corpo: Corpo): BaseDaRemada {
  const alcance = alcanceDoBraco(corpo, 3);
  // para o equilíbrio, os halteres pendurados embaixo dos ombros (a posição do começo)
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
      const R = braco('R'),
        L = braco('L');
      return { R, L, cargas: [{ massa: f('carga'), pos: R.pegada! }, { massa: f('carga'), pos: L.pegada! }] };
    },
  });
  const pe = (s: number): PosePerna => ({ pe: { bola: D.bola(s), dir: [0, 0, 1], calc: 0 }, polo: [0, 0, 1] });
  return { tronco: D.e.pose, pernas: { R: pe(-1), L: pe(1) }, prims: [chao(-70, 70, -100, 100)], pecas: [], marcas: {} };
}

const R = criarRemada(ficha, { bracos: 'dois', carga: 'halter', base, erros: { e1: 'arredondar', e2: 'subir', e3: 'encolher', e4: 'soBracos' } });

export const remadaCurvadaHalteres: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro: R.quadro,
  // costas (dorsal e meio das costas) em vermelho; bíceps e ombro de trás em laranja (correção de 10/11)
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
