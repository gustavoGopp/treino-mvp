// Adução de quadril deitado de lado, com caneleira, no motor novo. Os números vêm da ficha
// (../dados/movimentos/aducao-caneleira.json); o corpo e o movimento, do núcleo ./quadril-fechar-deitado.ts (o mesmo
// da adução sem carga); a caneleira (../pecas-de-cena/caneleira.ts) fica no tornozelo da perna de baixo.
import ficha from '../dados/movimentos/aducao-caneleira.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { caneleira, caneleiraNaPerna } from '../pecas-de-cena/caneleira';
import type { Corpo } from '../tabelas';
import { mul } from '../vec';
import { aducaoDeLado, poseDaAducao } from './quadril-fechar-deitado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const { e } = aducaoDeLado(corpo, F, f('piso'), poseDaAducao(F, u, erro));
  // o lado de fora da perna direita (−x da bacia): deitado sobre ela, é o lado do chão
  const c = caneleiraNaPerna(e, 'R', mul(e.pelve.x, -1));
  const peca = caneleira(c);
  return {
    esq: e,
    prims: [chao(-110, 110, -60, 60), ...peca.prims],
    pecas: [peca.peca],
    fios: [],
    cargas: [{ massa: f('caneleira.massa'), pos: c.centro }],
    marcas: { piso: [0, f('piso'), 0], caneleira: c.centro, caneleiraRaio: [c.raio, 0, 0] },
  };
}

export const aducaoCaneleira: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // adutores da perna de baixo, sem secundário (a ficha da técnica)
  papeis: { 'adutores:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};
