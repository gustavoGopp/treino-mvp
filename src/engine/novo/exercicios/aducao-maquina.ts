// Adução de quadril na cadeira adutora, no motor novo. Os números vêm da ficha
// (../dados/movimentos/aducao-maquina.json); o corpo sentado e a máquina, do núcleo ./quadril-na-maquina.ts (a mesma
// máquina da abdução, com as almofadas giradas para dentro dos joelhos). Das pernas abertas até um alongamento
// confortável, elas fecham girando em volta do eixo vertical de cada quadril até as almofadas quase se tocarem; o braço
// da máquina gira junto, e as placas sobem quando as pernas fecham.
import ficha from '../dados/movimentos/aducao-maquina.json';
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
  // abrir demais: a máquina regulada aberta demais, e o começo força a virilha (com as placas sem encostar, como no
  // certo); bater as placas: a volta sem controle só para no fim da máquina, com as placas batendo
  const inicio = erro === 'demais' ? f('erro.demais.abertura') + f('erro.demais.folga') : f('inicio');
  const de = erro === 'demais' ? f('erro.demais.abertura') : erro === 'bater' ? f('inicio') : f('abertura.inicio');
  return quadroNaMaquina(corpo, O, 'aducao', mix(de, f('abertura.fim'), u), inicio);
}

export const aducaoMaquina: Exercicio = {
  ficha: F,
  // de frente se veem os joelhos fechando contra as almofadas; de cima, as coxas girando em volta do quadril
  vistas: ['frontal', 'cima'],
  quadro,
  // adutores, dos dois lados (a ficha da técnica; sem secundário)
  papeis: { adutores: 'p' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho },
};
