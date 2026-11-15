// Elevação de joelhos nas paralelas, no motor novo. Os números vêm da ficha
// (../dados/movimentos/elevacao-joelhos-paralelas.json); o corpo sustentado pelas mãos, do núcleo ./pendurado.ts, e o
// movimento, de ./pendurado-joelhos.ts (o mesmo da elevação de joelhos na barra). Corpo sustentado nas paralelas com
// os braços retos (a ficha aceita os antebraços nas almofadas, mas o cartão começa pelos braços retos), ombros longe
// das orelhas; os joelhos sobem e, no fim, a pelve enrola. As paralelas: ../pecas-de-cena/paralelas.ts.
import ficha from '../dados/movimentos/elevacao-joelhos-paralelas.json';
import { fichaSchema } from '../movimento';
import type { Exercicio } from '../movimento';
import { criarElevacaoDeJoelhos } from './pendurado-joelhos';

const F = fichaSchema.parse(ficha);
const E = criarElevacaoDeJoelhos(F, 'paralelas');

export const elevacaoJoelhosParalelas: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro: E.quadro,
  // o abdômen, principal; os oblíquos só ajudam (correção de 04/11, SO_AJUDA). Os flexores do quadril trabalham, mas o
  // app não os conta (ficha da técnica)
  papeis: { abdomen: 'p', obliquos: 'a' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho, quadril: (q) => q.esq.pelve.o },
};
