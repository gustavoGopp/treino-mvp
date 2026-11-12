import regrasJson from './regras.json';
import { porId, type Regra } from './schema';

// As regras por extenso (texto, valores por nível e fontes), geradas de docs/pesquisa/regras.md. Fora do pacote inicial
// do app: a tela as carrega com carregarRegras() (./carregar.ts); os testes e os scripts as importam direto daqui.
export const REGRAS: Record<string, Regra> = porId(regrasJson);
