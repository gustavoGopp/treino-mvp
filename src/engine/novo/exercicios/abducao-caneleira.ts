// Abdução de quadril deitado de lado, com caneleira, no motor novo. Os números vêm da ficha
// (../dados/movimentos/abducao-caneleira.json); o corpo e o movimento, do núcleo ./quadril-abrir-deitado.ts (o mesmo
// da abdução sem carga); a caneleira (../pecas-de-cena/caneleira.ts) fica no tornozelo da perna de cima.
import ficha from '../dados/movimentos/abducao-caneleira.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { caneleira, caneleiraNaPerna } from '../pecas-de-cena/caneleira';
import type { Corpo } from '../tabelas';
import { mul } from '../vec';
import { abducaoDeLado, poseDaAbducao } from './quadril-abrir-deitado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = abducaoDeLado(corpo, F, f('piso'), poseDaAbducao(F, u, erro));
  // o velcro do lado de fora da perna direita (o lado direito da bacia, −x dela): deitado, é o lado de cima
  const c = caneleiraNaPerna(e, 'R', mul(e.pelve.x, -1));
  const peca = caneleira(c);
  return {
    esq: e,
    prims: [chao(-110, 110, -60, 60), ...peca.prims],
    pecas: [peca.peca],
    fios: [],
    cargas: [{ massa: f('caneleira.massa'), pos: c.centro }],
    marcas: { piso: [0, f('piso'), 0], caneleira: c.centro },
    vies: { bracoR: -30 },
  };
}

export const abducaoCaneleira: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // glúteos (médio, mínimo e a parte de cima do máximo): o desenho tem um glúteo só, que não separa o médio
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};
