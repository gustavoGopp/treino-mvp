// Tríceps na máquina (o braço apoiado à frente), no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-maquina.json); a máquina, de ../pecas-de-cena/triceps-maquina.ts (a irmã da máquina de
// rosca); o corpo sentado nela, os braços no apoio e as mãos nos pegadores, do núcleo ./maquina-de-braco.ts.
//
// Sentado, a bacia no apoio da lombar, o tronco um pouco à frente com as costas retas; os dois braços deitados no apoio
// inclinado, os cotovelos no eixo da máquina, as mãos nos pegadores em pé (a pegada neutra). Do cotovelo dobrado a
// 100°, os antebraços estendem juntos, para a frente e para baixo, até quase travar, e voltam; a alavanca gira com
// eles e as placas sobem.
import ficha from '../dados/movimentos/triceps-maquina.json';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { TRICEPS_NA_MAQUINA } from '../pecas-de-cena/triceps-maquina';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { alavancaDoCorpo, corpoNaMaquinaDeBraco, quadroNaMaquinaDeBraco, sentarNaMaquinaDeBraco } from './maquina-de-braco';
import type { OpcoesDeBraco } from './maquina-de-braco';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesDeBraco = {
  modelo: TRICEPS_NA_MAQUINA,
  amassa: f('assento.amassa'),
  apoioAmassa: f('apoio.amassa'),
  frente: f('tronco.frente'),
  lombar: f('lombar.sentado'),
  cervical: f('cervical'),
  cabeca: f('cabeca'),
  pesMeia: f('pes.meiaDistancia'),
  joelho: f('joelho'),
  prot: f('escapula.prot'),
  elev: f('escapula.elev'),
  supinacao: f('maos.supinacao'),
};

const sentado = (corpo: Corpo) => sentarNaMaquinaDeBraco(corpo, O, F.id, f('cotovelo.inicio'));
/** A posição inicial da alavanca: a do cotovelo dobrado do começo (as placas apoiam aí). */
const inicio = (corpo: Corpo) => alavancaDoCorpo(O, corpoNaMaquinaDeBraco(corpo, O, sentado(corpo), f('cotovelo.inicio')));

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const S = sentado(corpo);
  const x = Math.max(0, Math.min(1, u));
  const fim = erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.fim');
  const tira = erro === 'tira' ? suave(x) : 0;
  const e = corpoNaMaquinaDeBraco(corpo, O, S, mix(f('cotovelo.inicio'), fim, x), { sobe: f('erro.tira.braco') * tira, acharTronco: true });
  return quadroNaMaquinaDeBraco(O, S, e, inicio(corpo), f('placas'));
}

export const tricepsMaquina: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // tríceps (principal, é o que a biblioteca conta, sem secundário)
  papeis: { triceps: 'p' },
  trajetorias: { 'mão': (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
