import { conteudoExercicioSchema, type ConteudoExercicio } from './schema';

const arquivos = import.meta.glob<{ default: unknown }>('./exercicios/*.json', { eager: true });

// Valida tudo no carregamento: um JSON fora do formato quebra o app (e os testes) na hora.
export const CONTEUDO: Record<string, ConteudoExercicio> = Object.fromEntries(
  Object.entries(arquivos).map(([caminho, m]) => {
    const c = conteudoExercicioSchema.parse(m.default);
    if (!caminho.endsWith(`/${c.id}.json`)) throw new Error(`id ${c.id} não bate com o arquivo ${caminho}`);
    return [c.id, c];
  }),
);

export type { ConteudoExercicio };
