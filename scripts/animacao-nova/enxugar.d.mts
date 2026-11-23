// Tipos de enxugar.mjs (o arquivo fica em JavaScript porque o vite.config.ts e os testes do motor o importam direto).
/** Os arquivos de dados do motor que o build enxuga. */
export const DADOS_ENXUGADOS: RegExp;
/** O JSON de um arquivo de dados do motor, sem os textos que o desenho não lê; `null` para os outros arquivos. */
export function enxugar(caminho: string, texto: string): string | null;
