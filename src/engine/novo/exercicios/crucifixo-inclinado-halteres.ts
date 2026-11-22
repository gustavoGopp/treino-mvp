// Crucifixo inclinado com halteres, no motor novo. Os números vêm da ficha
// (../dados/movimentos/crucifixo-inclinado-halteres.json); o arco dos braços, do núcleo ./crucifixo-deitado.ts. O corpo
// fica no banco regulável a 30° exatamente como no supino inclinado aprovado (./supino-inclinado.ts: a mesma peça, e o
// quadril, a bacia e o pescoço resolvidos lá até o glúteo, as costas e a nuca apoiarem; os pés no chão à frente).
import ficha from '../dados/movimentos/crucifixo-inclinado-halteres.json';
import { fichaSchema } from '../movimento';
import type { Exercicio } from '../movimento';
import { chao } from '../pecas';
import { bancoRegulavelNaCena } from '../pecas-de-cena/banco-regulavel';
import type { Corpo } from '../tabelas';
import { crucifixoDeitado } from './crucifixo-deitado';
import type { Deitado } from './crucifixo-deitado';
import { BANCO_DO_SUPINO, sentar } from './supino-inclinado';

const F = fichaSchema.parse(ficha);

function deitar(corpo: Corpo): Deitado {
  const s = sentar(corpo);
  const B = bancoRegulavelNaCena(BANCO_DO_SUPINO);
  return { t: s.t, pernas: s.pernas, prims: [chao(-110, 110, -110, 100), ...B.prims], pecas: [B.peca] };
}

const { quadro } = crucifixoDeitado(F, deitar);

export const crucifixoInclinadoHalteres: Exercicio = {
  ficha: F,
  vistas: ['cima', 'quina'], // abre de cima, como os outros crucifixos (decisão do Gustavo de 05/11/2026: de cima se vê o arco das mãos e o cotovelo fixo; de três quartos o braço de perto aponta para quem olha)
  quadro,
  // o peito (principal; o desenho não separa a parte de cima, a clavicular) e a frente do ombro (secundário): a ficha
  // da técnica e a biblioteca
  papeis: { peitoral: 'p', deltAnt: 's' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
