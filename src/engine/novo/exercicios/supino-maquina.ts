// Supino sentado na máquina, no motor novo. Os números vêm da ficha (../dados/movimentos/supino-maquina.json); a
// máquina, de ../pecas-de-cena/supino-maquina.ts (o eixo acima da cabeça, os braços que pendem dele com os pegadores
// atravessados na ponta); o corpo sentado nela e as mãos presas nos pegadores, do núcleo ./maquina-de-empurrar.ts.
//
// Sentado, as costas e as escápulas no encosto, os pés no chão. O assento é regulado para o pegador ficar na linha do
// meio do peito, embaixo; os braços da máquina começam onde o cotovelo dobra o "alongamento confortável" (100°). As
// mãos empurram os pegadores, que andam num arco em volta do eixo (para a frente, subindo um pouco e se aproximando),
// até o cotovelo quase estender (12°), e voltam. Os cotovelos ficam a ~45° do tronco.
import ficha from '../dados/movimentos/supino-maquina.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { SUPINO_NA_MAQUINA } from '../pecas-de-cena/supino-maquina';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { anguloComCotovelo, linhaDoPeito, quadroNaMaquina, regular } from './maquina-de-empurrar';
import type { DesvioDeEmpurrar, OpcoesDeEmpurrar } from './maquina-de-empurrar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const a = f('cotovelos.doTronco') * rad;
const O: OpcoesDeEmpurrar = {
  modelo: SUPINO_NA_MAQUINA,
  amassa: f('assento.amassa'),
  lombar: f('lombar.sentado'),
  pescoco: f('pescoco.compensa'),
  pesMeia: f('pes.meiaDistancia'),
  joelho: f('joelho'),
  prot: -f('escapula.retracao'),
  elev: -f('escapula.depressao'),
  // o cotovelo para fora e para baixo, a 45° do tronco, e um pouco para trás
  polo: [-Math.sin(a), -Math.cos(a), -f('cotovelos.atras')],
  alvo: (corpo, e) => ({ y: linhaDoPeito(corpo, e) + f('pegador.naLinhaDoPeito'), z: 0 }),
  cotoveloEmCima: f('cotovelo.emCima'),
  cotoveloEmbaixo: f('cotovelo.embaixo'),
};

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  // no erro do banco, o assento mais baixo (os braços da máquina na mesma posição inicial; o fim, onde o cotovelo
  // quase estende com o corpo mais baixo)
  const R = regular(corpo, O, F.id, erro === 'banco' ? f('erro.banco.desce') : 0);
  let fim = R.fim;
  let dv: DesvioDeEmpurrar = {};
  if (erro === 'costas') dv = { aFrente: f('erro.costas.inclina') * u, prot: f('erro.costas.prot') * u };
  if (erro === 'trava') {
    fim = anguloComCotovelo(corpo, O, F.id, R, f('erro.trava.cotovelo'), { prot: f('erro.trava.prot') }, 'trava');
    dv = { prot: f('erro.trava.prot') * u };
  }
  return quadroNaMaquina(corpo, O, F.id, R, mix(R.inicio, fim, u), f('placas'), dv, (e) => ({ peito: [linhaDoPeito(corpo, e), 0, 0] }));
}

export const supinoMaquina: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // a ficha da técnica: peito (principal); ombro da frente e tríceps (secundários)
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's' },
  trajetorias: { 'mão': (q) => q.esq.lado.R.pegada },
};
