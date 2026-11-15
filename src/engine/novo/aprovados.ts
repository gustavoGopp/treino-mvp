// Os exercícios do motor novo aprovados pelo Gustavo na folha (um por um, com a data e o que ele disse).
// É esta lista que o app vai consultar para escolher entre o motor novo e o de hoje. Ainda não está ligada às telas.
// `como`: 'na folha' (ele olhou a folha e aprovou; é o padrão) ou 'por delegação' (desde 15/11/2026 ele pediu para
// ver só as de maior risco; as outras entram aqui depois de conferidas por quem integra, com a frase dele).
const DELEGOU = 'a gente pode delegar vários subagentes para fazer todos de uma vez e depois você só me manda [as que] você achar que tem mais chance de eu não gostar';
export const APROVADOS: Record<string, { em: string; oQueEleDisse: string; como?: 'na folha' | 'por delegação' }> = {
  'agachamento-peso-corpo': { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o agachamento com elástico' },
  'agachamento-elastico': { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o afundo com o peso do corpo' },
  'afundo-peso-corpo': { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o afundo com halteres' },
  afundo: { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o afundo com kettlebell' },
  'afundo-kettlebell': { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o afundo para trás' },
  'afundo-tras-peso-corpo': { em: '2026-11-15', oQueEleDisse: 'aprovada, segue para o búlgaro' },
  bulgaro: { em: '2026-11-15', oQueEleDisse: 'Eu estou aprovando e gostando de tudo que você está fazendo' },
  'bulgaro-peso-corpo': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  stiff: { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'stiff-kettlebell': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'stiff-elastico': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'stiff-unilateral': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'yt-suspensao': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'remada-suspensao': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'rosca-suspensao': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'flexao-fechada': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'flexao-elastico': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'bulgaro-suspensao': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  pike: { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'ponte-gluteo': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'flexao-joelho-deslizante': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'flexao-joelho-elastico': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'triceps-frances': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'triceps-frances-halter': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
  'triceps-frances-kettlebell': { em: '2026-11-15', oQueEleDisse: DELEGOU, como: 'por delegação' },
};
