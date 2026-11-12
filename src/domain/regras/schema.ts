import { z } from 'zod';

// Esquema de regras.json e selos.json, gerados de docs/pesquisa/regras.md (scripts/gerar-regras.mjs). Como o resto dos
// dados (biblioteca, funções, escadas), são validados na carga: um arquivo gerado errado falha na hora, com o motivo,
// em vez de virar um selo "undefined" na tela (auditoria de 12/11/2026: os dois entravam só com `as`).

export const SELOS_VALIDOS = ['robusta', 'moderada', 'um estudo', 'consenso'] as const;
export type Selo = (typeof SELOS_VALIDOS)[number];
const selo = z.enum(SELOS_VALIDOS);
const idDeRegra = z.string().regex(/^[a-z0-9]+(\.[a-z0-9-]+)+$/, 'id de regra fora do formato');
const texto = z.string().min(1);

export const selosSchema = z.record(idDeRegra, selo).refine((s) => Object.keys(s).length > 0, 'nenhuma regra');

export const regraSchema = z
  .object({
    id: idDeRegra,
    regra: texto,
    valores: z.object({ iniciante: texto, intermediario: texto, avancado: texto }).strict(),
    selo,
    fontes: z.array(texto).min(1),
  })
  .strict();
export type Regra = z.infer<typeof regraSchema>;

export const regrasSchema = z
  .array(regraSchema)
  .min(1)
  .refine((rs) => new Set(rs.map((x) => x.id)).size === rs.length, 'id de regra repetido');

/** As regras por id, validadas. */
export const porId = (dados: unknown): Record<string, Regra> => Object.fromEntries(regrasSchema.parse(dados).map((x) => [x.id, x]));
