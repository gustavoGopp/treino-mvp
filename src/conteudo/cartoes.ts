import { porChaveSeDerCerto } from '../domain/umaVez';
import { cartaoTextoSchema, type CartaoTexto } from './schema';

// Lote técnico do redesign (06/11/2026): o cartão de texto de um exercício sem animação é baixado sozinho, só quando
// aparece (no programa e no treino), em vez de todos os textos do guia virem no pacote inicial. Cada arquivo vira um
// pedaço pequeno, guardado pelo service worker. A validação é a mesma de index.ts (zod), feita na hora de carregar.
const arquivos = import.meta.glob<{ default: unknown }>('./exercicios/*.json');
const caminho = (exId: string) => `./exercicios/${exId}.json`;

/**
 * Há arquivo de texto com o id do exercício. Os arquivos do guia têm o id da animação; os cartões, o do exercício.
 * Só vale para exercício sem animação (tests/unit/conteudo.test.ts confere que bate com CARTOES).
 */
export const temCartao = (exId: string) => caminho(exId) in arquivos;

/** O cartão de um exercício, baixado uma vez; se a importação falhar, a próxima chamada tenta de novo. */
export const carregarCartao: (exId: string) => Promise<CartaoTexto | null> = porChaveSeDerCerto((exId) => {
  const f = arquivos[caminho(exId)];
  if (!f) return Promise.resolve(null);
  return f().then((m) => {
    const bruto = m.default as Record<string, unknown>;
    return 'carga' in bruto ? cartaoTextoSchema.parse(bruto) : null;
  });
});
