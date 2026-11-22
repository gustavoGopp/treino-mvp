// Abdução de quadril deitado de lado, com mini band nos tornozelos, no motor novo. Os números vêm da ficha
// (../dados/movimentos/abducao-deitado-mini-band.json); o corpo e o movimento, do núcleo ./quadril-abrir-deitado.ts
// (o mesmo da abdução deitado e da abdução com caneleira aprovadas). Deitado sobre o lado esquerdo, de costas para
// quem vê, a cabeça no braço de baixo, a perna de baixo dobrada; a mini band em volta dos dois tornozelos
// (../pecas-de-cena/mini-band.ts, `lacoNasCanelas`). A perna de cima sobe estendida, um pouco atrás da linha do
// corpo, e a faixa estica entre os dois tornozelos.
import ficha from '../dados/movimentos/abducao-deitado-mini-band.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { lacoNasCanelas, miniBand } from '../pecas-de-cena/mini-band';
import type { Corpo } from '../tabelas';
import { abducaoDeLado, poseDaAbducao } from './quadril-abrir-deitado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = abducaoDeLado(corpo, F, f('piso'), poseDaAbducao(F, u, erro));
  const laco = lacoNasCanelas(e, f('faixa.acimaDoTornozelo'));
  const mb = miniBand(laco);
  return {
    esq: e,
    prims: [chao(-110, 110, -60, 60), ...mb.prims],
    pecas: [mb.peca],
    fios: [{ id: 'elastico', comp: laco.comp, estica: true, objeto: 'miniBand' }],
    cargas: [],
    marcas: { piso: [0, f('piso'), 0], faixaR: laco.centros.R, faixaL: laco.centros.L },
    vies: { bracoR: -30 },
  };
}

export const abducaoDeitadoMiniBand: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // glúteos (médio, mínimo e a parte de cima do máximo): o desenho tem um glúteo só, que não separa o médio
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};
