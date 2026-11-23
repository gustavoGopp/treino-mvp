import { porChaveSeDerCerto } from '../domain/umaVez';
import NOMES from './nomes-curtos.json';
import { conteudoExercicioSchema, type ConteudoExercicio } from './schema';

// Pacote D4 (23/11/2026): o guia baixa só o texto do exercício aberto. Antes, a tela importava o índice inteiro
// (index.ts), e abrir um exercício pedia os 171 arquivos de texto de uma vez (cerca de 180 kB comprimidos, medido);
// se um deles falhasse, o guia inteiro não abria. Cada texto continua num pedaço pequeno, guardado pelo service worker
// na instalação. A validação é a mesma de index.ts (zod), feita na hora de carregar.
const arquivos = import.meta.glob<{ default: unknown }>('./exercicios/*.json');

/**
 * O nome curto de cada exercício do guia, para os botões do dia: vem de um arquivo pequeno, gerado dos textos
 * (scripts/gerar-nomes-do-guia.mjs; tests/unit/conteudo.test.ts confere que está em dia).
 */
export const NOME_CURTO: Record<string, string> = NOMES;

/** O texto do guia de um exercício, baixado uma vez; se a importação falhar, a próxima chamada tenta de novo. */
export const carregarTextoDoGuia: (animacaoId: string) => Promise<ConteudoExercicio> = porChaveSeDerCerto((animacaoId) => {
  const f = arquivos[`./exercicios/${animacaoId}.json`];
  if (!f) return Promise.reject(new Error(`não há texto do guia para "${animacaoId}"`));
  return f().then((m) => {
    const texto = conteudoExercicioSchema.parse(m.default);
    if (texto.id !== animacaoId) throw new Error(`id ${texto.id} não bate com o arquivo ${animacaoId}.json`);
    return texto;
  });
});
