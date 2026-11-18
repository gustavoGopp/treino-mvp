// Supino inclinado na polia, com o banco entre as torres, no motor novo. Os números vêm da ficha
// (../dados/movimentos/supino-inclinado-polia.json); o corpo sentado, os braços, as colunas e os cabos, do núcleo
// ./polia-banco.ts. Sentado no banco regulável a 30°, no meio das duas torres, com as polias embaixo e um estribo em cada
// mão: as mãos saem do lado do peito e sobem até quase estender os cotovelos, um pouco para dentro; os cabos sobem do chão
// até as mãos, por fora do banco.
import ficha from '../dados/movimentos/supino-inclinado-polia.json';
import type { Exercicio } from '../movimento';
import { criarSupinoNaPolia } from './polia-banco';

const S = criarSupinoNaPolia(ficha, 'inclinado');

export const supinoInclinadoPolia: Exercicio = {
  ficha: S.ficha,
  // abre de três quartos, pela frente: a pessoa no banco inclinado, as duas torres e os cabos que sobem do chão às mãos (como
  // o crucifixo inclinado aprovado). De lado, o cabo de perto passaria na frente do banco; de frente, o encosto é pintado por
  // cima do corpo no estilo com cor de pele
  vistas: ['quina', 'cima'],
  quadro: S.quadro,
  // o peito (principal; o desenho não separa a parte de cima, a clavicular); a frente do ombro e o tríceps (secundários),
  // como a ficha da técnica e a biblioteca
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
