// Supino na polia com o banco plano entre as torres, no motor novo. Os números vêm da ficha
// (../dados/movimentos/supino-polia.json); o corpo deitado, os braços, as colunas e os cabos, do núcleo ./polia-banco.ts.
// Deitado no banco plano, no meio das duas torres, com as polias embaixo e um estribo em cada mão: as mãos saem do lado do
// peito e sobem até quase estender os cotovelos, um pouco para dentro; os cabos sobem do chão até as mãos, por fora do banco.
import ficha from '../dados/movimentos/supino-polia.json';
import type { Exercicio } from '../movimento';
import { criarSupinoNaPolia } from './polia-banco';

const S = criarSupinoNaPolia(ficha, 'reto');

export const supinoPolia: Exercicio = {
  ficha: S.ficha,
  // abre de três quartos, pela cabeça: o corpo deitado no banco, as duas torres e os cabos que sobem do chão às mãos. De
  // lado, o cabo de perto passaria na frente do banco; de frente (pelos pés), as coxas tapam o tronco e a figura parece sentada
  vistas: ['quinaTras', 'cima'],
  quadro: S.quadro,
  // o peito (principal); a frente do ombro e o tríceps (secundários), como a ficha da técnica e a biblioteca
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
