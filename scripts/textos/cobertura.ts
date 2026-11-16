// A tabela de cobertura do inventário dos textos: cada rota, folha, bloco que abre, aviso condicional, estado vazio e
// mensagem de erro ou validação achados em src/App.tsx e src/features (arquivo:linha), e a tela da colheita que o
// cobre (pelo nome, sem o número: a montagem acha o id). O que não é alcançável num navegador simulado fica em
// NAO_ALCANCADOS, com o motivo e o texto copiado do código-fonte.

export type TipoDeItem = 'rota' | 'folha' | 'bloco que abre' | 'por quê' | 'aviso condicional' | 'estado vazio' | 'carregando' | 'erro ou validação' | 'resposta de uma ação';
export type Linha = { fonte: string; item: string; tipo: TipoDeItem; telas: string[]; nota?: string };
export type NaoAlcancado = { fonte: string; item: string; texto: string; motivo: string };

export const COBERTURA: Linha[] = [];
export const NAO_ALCANCADOS: NaoAlcancado[] = [];
export const NOTAS: string[] = [];
