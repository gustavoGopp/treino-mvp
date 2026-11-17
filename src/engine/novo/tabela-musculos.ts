// Motor novo: a tabela dos músculos (bloco A): de onde cada grupo sai, onde prende, por cima de quem passa e a fonte.
// Fica fora de ./tabelas.ts de propósito: só a conferência e os documentos a usam, e assim ela não pesa no app.
import { z } from 'zod';
import musculosJson from './dados/musculos.json';

const PARTE = z.enum(['tronco', 'pelve', 'braco', 'ante', 'mao', 'coxa', 'canela', 'pe']);
const ponta = z.object({ osso: PARTE, onde: z.string().min(3) });
const grupoMuscular = z.object({
  nome: z.string(),
  /** Os músculos reais que a forma do desenho representa. */
  musculos: z.array(z.string()).min(1),
  origem: ponta,
  insercao: ponta,
  /** A parte do corpo em que a massa do músculo fica (é nela que a forma é desenhada). */
  ventre: PARTE,
  /** As articulações que ele atravessa. */
  cruza: z.array(z.string()),
  camada: z.enum(['superficial', 'profunda']),
  /** Os grupos que ele cobre onde os dois se encontram (ele é pintado depois). */
  cobre: z.array(z.string()),
  forma: z.string(),
  fonte: z.string(),
  pagina: z.string(),
  /** Os grupos do conteúdo do app (src/domain/biblioteca) a que ele corresponde. */
  conteudo: z.array(z.string()),
  /** Porções que o conteúdo ou o guia de hoje distinguem e que este desenho ainda mostra como uma forma só. */
  naoSepara: z.array(z.string()).optional(),
});
const musculosSchema = z
  .object({ fontes: z.record(z.string()), regraDeForma: z.object({ texto: z.string(), fonte: z.string(), estado: z.string() }), ossoDeCadaParte: z.record(z.string()), grupos: z.record(grupoMuscular) })
  .superRefine((t, ctx) => {
    for (const [id, g] of Object.entries(t.grupos)) {
      if (!(g.fonte in t.fontes)) ctx.addIssue({ code: 'custom', message: `músculo ${id}: fonte "${g.fonte}" não está na lista` });
      for (const c of g.cobre) if (!(c in t.grupos)) ctx.addIssue({ code: 'custom', message: `músculo ${id}: cobre "${c}", que não está na tabela` });
    }
  });
export const MUSCULOS = musculosSchema.parse(musculosJson);
export type GrupoMuscular = z.infer<typeof grupoMuscular>;
