// Abdução de quadril deitado de lado, sem carga, no motor novo. Os números vêm da ficha
// (../dados/movimentos/abducao-deitado.json); o corpo e o movimento, do núcleo ./quadril-abrir-deitado.ts.
import ficha from '../dados/movimentos/abducao-deitado.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { abducaoDeLado, poseDaAbducao } from './quadril-abrir-deitado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = abducaoDeLado(corpo, F, f('piso'), poseDaAbducao(F, u, erro));
  return { esq: e, prims: [chao(-110, 110, -60, 60)], fios: [], cargas: [], marcas: { piso: [0, f('piso'), 0] }, vies: { bracoR: -30 } };
}

export const abducaoDeitado: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // glúteos (médio, mínimo e a parte de cima do máximo): o desenho tem um glúteo só, que não separa o médio
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};
