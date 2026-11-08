import type { Articulacao } from '../../domain/biblioteca';

// Nomes das regiões e o efeito da dor de hoje no programa (seguranca.dor.programa), num arquivo pequeno: a triagem e o
// início (o resumo da dor no programa novo, lote 3 do redesign) usam os mesmos textos.
export const NOME_ARTICULACAO: Record<Articulacao, string> = {
  ombro: 'Ombro',
  cotovelo: 'Cotovelo',
  punho: 'Punho',
  lombar: 'Lombar',
  quadril: 'Quadril',
  joelho: 'Joelho',
  tornozelo: 'Tornozelo',
};

export const EFEITO_DA_DOR = {
  exclui: 'os exercícios que carregam a região ficam de fora',
  'prefere-outros': 'o app prefere exercícios que poupam a região',
  lembrete: 'programa normal, com um lembrete nos exercícios da região',
} as const;
