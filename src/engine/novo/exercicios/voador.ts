// Voador (peck deck), no motor novo (primeira animação deste exercício: até aqui ele era só cartão de texto). Os números
// vêm da ficha (../dados/movimentos/voador.json); o corpo sentado e a máquina, do núcleo ./no-voador.ts. Sentado de
// costas para o encosto, as mãos nos pegadores verticais; cada braço da máquina gira num eixo vertical sobre o ombro,
// e o pegador anda num arco em volta dele: o cotovelo fica levemente dobrado e no mesmo ângulo do começo ao fim. Fechado,
// as mãos à frente do peito, quase se tocando; aberto, os braços param um pouco antes da linha do ombro.
import ficha from '../dados/movimentos/voador.json';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { noVoador } from './no-voador';
import type { Instante, OpcoesDoVoador } from './no-voador';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesDoVoador = {
  modo: 'voador',
  bacia: f('bacia'),
  lombar: f('lombar'),
  cervical: f('cervical'),
  cabeca: f('cabeca'),
  prot: f('escapula.prot'),
  elev: f('escapula.elev'),
  cotoveloBaixo: f('cotovelo.paraBaixo'),
  amassa: f('assento.amassa'),
  psiMeio: f('psi.meio'),
  pes: { meia: f('pes.meiaDistancia'), frente: f('pes.frente') },
};

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const fim = erro === 'abrir' ? f('erro.abrir.psi') : f('psi.aberto');
  const i: Instante = { psi: mix(f('psi.fechado'), fim, u) };
  if (erro === 'costas') {
    // aberto, as costas saem do encosto: o tronco vai para a frente e o arco anda junto com o ombro
    const x = suave(u);
    Object.assign(i, { bacia: f('erro.costas.bacia') * x, toracica: f('erro.costas.toracica') * x, cervical: f('erro.costas.cervical') * x, arcoSegueOOmbro: true });
  }
  // fechando, os ombros vão para a frente; a mão não sai do pegador, então o cotovelo dobra (como no fim de um supino)
  if (erro === 'supino') i.prot = f('erro.supino.prot') * (1 - u) * (1 - u);
  return noVoador(corpo, O, i, erro === 'abrir' ? f('erro.abrir.inicio') : f('inicio'));
}

export const voador: Exercicio = {
  ficha: F,
  vistas: ['cima', 'frontal'],
  quadro,
  // o peito (principal) e a frente do ombro (secundário): a ficha da técnica e a biblioteca
  papeis: { peitoral: 'p', deltAnt: 's' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
