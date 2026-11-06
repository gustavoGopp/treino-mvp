import { z } from 'zod';

// As fontes por extenso que as regras citam (pedido ao domínio 1 do redesign, 06/11/2026), geradas de
// docs/pesquisa/fontes.md por scripts/gerar-fontes.mjs. O selo de evidência abre a regra e estas referências.
// O arquivo só é baixado quando a pessoa abre um selo (import dinâmico), para não pesar na primeira tela.
export const fonteSchema = z
  .object({
    citacao: z.string().min(10),
    link: z.union([z.literal(''), z.string().url()]),
    // quanto da fonte foi lido (docs/pesquisa/00-metodo.md)
    leitura: z.enum(['texto-completo', 'resumo', 'busca', 'nao-verificado']),
  })
  .strict();
export const fontesSchema = z.record(z.string().regex(/^[a-z0-9-]+$/), fonteSchema);
export type Fonte = z.infer<typeof fonteSchema>;

/** O que cada nível de leitura quer dizer, em palavras simples. */
export const TEXTO_LEITURA: Record<Fonte['leitura'], string> = {
  'texto-completo': 'lido na íntegra',
  resumo: 'lido só o resumo',
  busca: 'citação conferida por busca; o texto não foi lido',
  'nao-verificado': 'não verificado',
};

let promessa: Promise<Record<string, Fonte>> | undefined;
export function carregarFontes(): Promise<Record<string, Fonte>> {
  promessa ??= import('./fontes.json').then((m) => fontesSchema.parse(m.default));
  return promessa;
}
