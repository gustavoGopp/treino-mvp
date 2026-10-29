import { z } from 'zod';

// Textos de um exercício do guia (separados do motor de animação).
// Os nomes dos campos seguem o guia original (referencia/guia-execucao-fase1.html).
const texto = z.string().min(1);

export const conteudoExercicioSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: texto,
    short: texto,
    target: texto,
    // Prescrição legada da referência: sai daqui no M2, quando o programa passa a vir do gerador.
    rx: texto,
    sets: z.number().int().positive(),
    setLbl: z.array(texto).optional(),
    setUnit: texto.optional(),
    rest: z.object({ opts: z.array(z.number().positive()).min(1), def: z.number().positive(), note: texto.optional() }),
    feel: texto,
    feelNote: texto,
    setupEq: z.array(texto).min(1),
    setupBody: z.array(texto).min(1),
    exec: z.array(z.tuple([z.enum(['hold', 'ecc', 'conc']), texto, texto])).min(1),
    range: z.array(texto).min(1),
    breath: texto,
    cues: z.array(texto).min(1).max(3),
    check: z.array(texto).min(1),
    vary: texto,
    note: texto.optional(),
    extLabels: z.tuple([texto, texto]),
    errors: z.array(z.object({ id: texto, title: texto, desc: texto })).min(1),
  })
  .strict();

export type ConteudoExercicio = z.infer<typeof conteudoExercicioSchema>;
