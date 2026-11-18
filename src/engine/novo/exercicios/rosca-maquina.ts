// Rosca na máquina (tipo Scott), no motor novo. Os números vêm da ficha (../dados/movimentos/rosca-maquina.json); a
// máquina, de ../pecas-de-cena/rosca-maquina.ts; o corpo sentado nela, os braços no apoio e as mãos no pegador, do
// núcleo ./maquina-de-braco.ts (o mesmo do tríceps na máquina).
//
// Sentado, o tronco um pouco à frente e o peito no alto do apoio; os dois braços deitados no apoio inclinado, os
// cotovelos no eixo da máquina, as mãos na barra com a palma para cima. Os antebraços sobem juntos, de quase esticados
// até o fim (o antebraço perto da vertical), e descem controlando; a alavanca gira com eles e as placas sobem.
import ficha from '../dados/movimentos/rosca-maquina.json';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { ROSCA_NA_MAQUINA } from '../pecas-de-cena/rosca-maquina';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { alavancaDoCorpo, corpoNaMaquinaDeBraco, quadroNaMaquinaDeBraco, sentarNaMaquinaDeBraco } from './maquina-de-braco';
import type { OpcoesDeBraco } from './maquina-de-braco';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesDeBraco = {
  modelo: ROSCA_NA_MAQUINA,
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

const sentado = (corpo: Corpo) => sentarNaMaquinaDeBraco(corpo, O, F.id, f('cotovelo.baixo'));
/** A posição inicial da alavanca: a do cotovelo quase esticado (as placas apoiam aí). */
const inicio = (corpo: Corpo) => alavancaDoCorpo(O, corpoNaMaquinaDeBraco(corpo, O, sentado(corpo), f('cotovelo.baixo')));

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const S = sentado(corpo);
  const x = Math.max(0, Math.min(1, u));
  const baixo = erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.baixo');
  const tira = erro === 'tira' ? suave(x) : 0;
  const e = corpoNaMaquinaDeBraco(corpo, O, S, mix(baixo, f('cotovelo.cima'), x), { sobe: f('erro.tira.braco') * tira, frente: -f('erro.tira.tronco') * tira });
  return quadroNaMaquinaDeBraco(O, S, e, inicio(corpo), f('placas'));
}

export const roscaMaquina: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // bíceps (principal, é o que a biblioteca conta, sem secundário); o antebraço "só ajuda", como nas outras roscas
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { 'mão': (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
