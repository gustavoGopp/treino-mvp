// Ponte de glúteo com halter, no motor novo. Os números vêm da ficha (../dados/movimentos/ponte-gluteo-halter.json);
// a pose é a do núcleo das pontes (./ponte.ts): o halter deitado de través na dobra do quadril, apoiado no corpo, as
// duas mãos segurando as cabeças dele, os cotovelos no chão ao lado da cintura (correção de 10/11); o quadril sobe até
// ombros, quadril e joelhos ficarem em linha e o halter sobe junto.
import ficha from '../dados/movimentos/ponte-gluteo-halter.json';
import type { Exercicio } from '../movimento';
import { criarPonte } from './ponte';

// (correção de 19/11/2026) o halter assenta sobre a superfície inteira do corpo (a emenda da cintura inclusive), e não
// entre os pontos dos anéis
const P = criarPonte(ficha, 'halter', { superficieDensa: true });

export const ponteGluteoHalter: Exercicio = {
  ficha: P.ficha,
  vistas: ['lateral', 'cima'],
  quadro: P.quadro,
  // só o glúteo, principal, sem secundário (biblioteca; revisão de anatomia de 02/11/2026)
  papeis: { gluteo: 'p' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, halter: (q) => q.marcas.halter! },
};
