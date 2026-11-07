import { z } from 'zod';
import { MUSCULOS } from '../biblioteca';
import { FUNCAO } from '../gerador/funcoes';
import { REGRAS } from '../regras';
import dados from './complementos.json';

// Funções que se complementam nos músculos grandes (selecao.exercicios-por-musculo: 2 de funções complementares;
// selecao.gluteo: agachar ou afundo → extensão de quadril → abdução). Cada grupo junta funções da tabela de funções
// (funcoes.json), para o avaliador medir como o gerador. O glúteo aceita o "dobrar o quadril" como extensão de quadril
// (o stiff estende o quadril; frente B da sessão de próximos passos, 06/11/2026).

export const complementoSchema = z
  .object({
    musculo: z.enum(MUSCULOS),
    regra: z.string().refine((id) => id in REGRAS, 'regra fora de regras.md'),
    grupos: z
      .array(
        z
          .object({
            id: z.string().regex(/^[a-z0-9-]+$/),
            nome: z.string().min(1),
            funcoes: z.array(z.string().refine((f) => f in FUNCAO, 'função fora de funcoes.json')).min(1),
          })
          .strict(),
      )
      .min(2),
  })
  .strict();
export type Complemento = z.infer<typeof complementoSchema>;

export const COMPLEMENTOS: Complemento[] = z.array(complementoSchema).parse(dados);
