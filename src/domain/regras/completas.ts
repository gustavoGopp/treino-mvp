import regrasJson from './regras.json';
import type { Regra } from './index';

// As regras por extenso (texto, valores por nível e fontes), geradas de docs/pesquisa/regras.md. Fora do pacote inicial
// do app: a tela as carrega com carregarRegras() (./carregar.ts); os testes e os scripts as importam direto daqui.
export const REGRAS: Record<string, Regra> = Object.fromEntries((regrasJson as Regra[]).map((r) => [r.id, r]));
