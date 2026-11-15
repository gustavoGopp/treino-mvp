// Os exercícios do motor novo aprovados pelo Gustavo na folha (um por um, com a data e o que ele disse).
// É esta lista que o app vai consultar para escolher entre o motor novo e o de hoje. Ainda não está ligada às telas.
export const APROVADOS: Record<string, { em: string; oQueEleDisse: string }> = {
  'agachamento-peso-corpo': { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o agachamento com elástico' },
  'agachamento-elastico': { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o afundo com o peso do corpo' },
  'afundo-peso-corpo': { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o afundo com halteres' },
  afundo: { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o afundo com kettlebell' },
};
