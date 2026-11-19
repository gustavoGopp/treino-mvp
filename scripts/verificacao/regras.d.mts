// Tipos de regras.mjs, para os testes em TypeScript (tests/repo/verificacao.test.ts).
export declare const PASSOS: { nome: string; comando: string[] }[];
export declare function ehLivre(caminho: string): boolean;
export declare function quePedemVerificacao(caminhos: string[]): string[];
export declare function regravaGabarito(comando: string): boolean;
export declare function ehGabarito(caminho: string): boolean;
