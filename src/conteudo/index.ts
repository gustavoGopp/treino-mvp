import { cartaoTextoSchema, conteudoExercicioSchema, type CartaoTexto, type ConteudoExercicio } from './schema';

const arquivos = import.meta.glob<{ default: unknown }>('./exercicios/*.json', { eager: true });

// Valida tudo no carregamento: um JSON fora do formato quebra o app (e os testes) na hora.
// Dois tipos no mesmo lugar: o texto do guia animado (com a prescrição "rx") e o cartão de texto de quem ainda
// não tem animação aprovada (com "carga"). tests/unit/conteudo.test.ts confere quem é quem.
const lidos = Object.entries(arquivos).map(([caminho, m]) => {
  const bruto = m.default as Record<string, unknown>;
  const c = 'rx' in bruto ? { tipo: 'guia' as const, dado: conteudoExercicioSchema.parse(bruto) } : { tipo: 'cartao' as const, dado: cartaoTextoSchema.parse(bruto) };
  if (!caminho.endsWith(`/${c.dado.id}.json`)) throw new Error(`id ${c.dado.id} não bate com o arquivo ${caminho}`);
  return c;
});

/** Textos do guia animado, pelo id da animação. */
export const CONTEUDO: Record<string, ConteudoExercicio> = Object.fromEntries(
  lidos.flatMap((c) => (c.tipo === 'guia' ? [[c.dado.id, c.dado]] : [])),
);

/** Cartões de texto, pelo id do exercício (só exercícios sem animação aprovada). */
export const CARTOES: Record<string, CartaoTexto> = Object.fromEntries(
  lidos.flatMap((c) => (c.tipo === 'cartao' ? [[c.dado.id, c.dado]] : [])),
);

export type { CartaoTexto, ConteudoExercicio };
