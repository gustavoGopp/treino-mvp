// Voador invertido (crucifixo invertido na máquina), no motor novo (primeira animação deste exercício: até aqui ele era
// só cartão de texto). Os números vêm da ficha (../dados/movimentos/voador-invertido.json); o corpo sentado e a máquina,
// do núcleo ./no-voador.ts, o mesmo do voador: a mesma máquina, com o encosto recuado na guia e o assento mais alto.
// Sentado virado para o encosto, o peito nele, as mãos nos pegadores horizontais com as palmas para baixo; cada braço
// da máquina gira num eixo vertical sobre o ombro, e os braços abrem da frente até a linha do corpo, paralelos ao chão,
// com os cotovelos levemente dobrados e os ombros baixos.
import ficha from '../dados/movimentos/voador-invertido.json';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { noVoador } from './no-voador';
import type { Instante, OpcoesDoVoador } from './no-voador';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesDoVoador = {
  modo: 'invertido',
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
  const fim = erro === 'pouco' ? f('erro.pouco.psi') : f('psi.fim');
  const i: Instante = { psi: mix(f('psi.inicio'), fim, u) };
  const x = suave(u);
  // abrindo, os ombros sobem; a mão não sai do pegador
  if (erro === 'encolher') i.elev = (f('erro.encolher.elev') - f('escapula.elev')) * x;
  if (erro === 'embalar') {
    // o tronco vai para trás e o peito sai do encosto; o arco anda junto com o ombro
    Object.assign(i, { bacia: f('erro.embalar.bacia') * x, lombar: f('erro.embalar.lombar') * x, cervical: f('erro.embalar.cervical') * x, arcoSegueOOmbro: true });
  }
  return noVoador(corpo, O, i, f('inicio'));
}

export const voadorInvertido: Exercicio = {
  ficha: F,
  vistas: ['posterior', 'cima'],
  quadro,
  // só o ombro de trás, sem secundário (a biblioteca; achado 5 da revisão de anatomia, como nos crucifixos invertidos)
  papeis: { deltPost: 'p' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
