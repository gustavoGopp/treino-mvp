// Elevação de joelhos pendurado na barra fixa, no motor novo. Os números vêm da ficha
// (../dados/movimentos/elevacao-joelhos.json); o corpo pendurado, do núcleo ./pendurado.ts, e o movimento, de
// ./pendurado-joelhos.ts. Pegada pronada um pouco mais aberta que os ombros, braços estendidos, ombros ativos; os
// joelhos sobem e, no fim, a pelve enrola; o corpo não balança.
import ficha from '../dados/movimentos/elevacao-joelhos.json';
import { fichaSchema } from '../movimento';
import type { Exercicio } from '../movimento';
import { criarElevacaoDeJoelhos } from './pendurado-joelhos';

const F = fichaSchema.parse(ficha);
const E = criarElevacaoDeJoelhos(F, 'barra');

export const elevacaoJoelhos: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro: E.quadro,
  // o abdômen, principal; os oblíquos e o antebraço só ajudam (como em SO_AJUDA no guia de hoje). Os flexores do
  // quadril trabalham, mas o app não os conta (ficha da técnica)
  papeis: { abdomen: 'p', obliquos: 'a', antebraco: 'a' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho, quadril: (q) => q.esq.pelve.o },
};
