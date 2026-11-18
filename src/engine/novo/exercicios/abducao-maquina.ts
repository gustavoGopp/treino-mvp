// Abdução de quadril na cadeira abdutora, no motor novo. Os números vêm da ficha
// (../dados/movimentos/abducao-maquina.json); o corpo sentado e a máquina, do núcleo ./quadril-na-maquina.ts. As
// almofadas por fora dos joelhos; as pernas abrem girando em volta do eixo vertical de cada quadril, e o braço da
// máquina gira junto. Na posição inicial de cada repetição as pernas ficam quase fechadas, com as placas sem encostar.
import ficha from '../dados/movimentos/abducao-maquina.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { quadroNaMaquina } from './quadril-na-maquina';
import type { OpcoesNaMaquina } from './quadril-na-maquina';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesNaMaquina = { bacia: f('bacia'), cervical: f('cervical'), cabeca: f('cabeca'), amassa: f('assento.amassa'), joelho: f('joelho') };

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  // no erro de soltar a volta, a volta só para no fim da máquina (a posição inicial), com as placas batendo
  const de = erro === 'solta' ? f('inicio') : f('abertura.inicio');
  const ate = erro === 'pouco' ? f('erro.pouco.fim') : f('abertura.fim');
  const tronco = erro === 'tronco' ? { bacia: f('bacia') + f('erro.tronco.bacia') * u, lombar: f('erro.tronco.lombar') * u, toracica: f('erro.tronco.toracica') * u, cervical: f('erro.tronco.cervical') * u } : {};
  return quadroNaMaquina(corpo, O, 'abducao', mix(de, ate, u), f('inicio'), tronco);
}

export const abducaoMaquina: Exercicio = {
  ficha: F,
  // de frente se veem os joelhos abrindo contra as almofadas; de cima, as coxas girando em volta do quadril; de lado, o
  // tronco parado no encosto (e o erro de embalar)
  vistas: ['frontal', 'cima', 'lateral'],
  quadro,
  // glúteos (médio, mínimo e a parte de cima do máximo), dos dois lados: o desenho tem um glúteo só, que não separa o médio
  papeis: { gluteo: 'p' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho },
};
