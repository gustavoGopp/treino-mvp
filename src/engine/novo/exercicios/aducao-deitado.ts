// Adução de quadril deitado de lado, sem carga, no motor novo. Os números vêm da ficha
// (../dados/movimentos/aducao-deitado.json); o corpo e o movimento, do núcleo ./quadril-fechar-deitado.ts.
import ficha from '../dados/movimentos/aducao-deitado.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { aducaoDeLado, poseDaAducao } from './quadril-fechar-deitado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const { e } = aducaoDeLado(corpo, F, f('piso'), poseDaAducao(F, u, erro));
  return { esq: e, prims: [chao(-110, 110, -60, 60)], fios: [], cargas: [], marcas: { piso: [0, f('piso'), 0] } };
}

export const aducaoDeitado: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // adutores da perna de baixo, sem secundário (a ficha da técnica)
  papeis: { 'adutores:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};
