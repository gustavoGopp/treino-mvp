import { z } from 'zod';
import { BIBLIOTECA, MUSCULOS } from '../biblioteca';
import { REGRAS } from '../regras';
import dados from './funcoes.json';

// Funções das vagas (docs/pesquisa-v2/08-equipamentos-v2.md, tabela 2.1; regra selecao.funcao-da-vaga).
// Cada função lista os exercícios em níveis: o nível 1 é a 1ª escolha, e os exercícios do mesmo nível
// são equivalentes (selecao.equivalencia). O nível seguinte só entra se nada do anterior for possível.
// Só entram ids que já existem na biblioteca; os exercícios novos chegam no R0c.

const POR_ID = new Map(BIBLIOTECA.map((e) => [e.id, e]));
const regraId = z.string().refine((id) => id in REGRAS, 'regra fora de regras.md');

export const funcaoSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    nome: z.string().min(1),
    /** Músculo que a função treina como principal. */
    musculo: z.enum(MUSCULOS),
    /** Isolador obrigatório quando o equipamento permite (selecao.isolador-obrigatorio): não sai nos cortes. */
    obrigatoria: z.boolean().optional(),
    /** Regras citadas no "porquê" de quem preenche a vaga. */
    regras: z.array(regraId),
    /** Regra do aviso quando o nível 1 não é possível (ex.: equipamento.sem-puxada-vertical). */
    semNivel1: regraId.optional(),
    /** Função usada no lugar quando nenhum nível é possível (ex.: flexão de joelho → dobrar o quadril). */
    seNada: z.string().optional(),
    /** Aviso quando a vaga fica sem exercício possível: o que falta e o que isso muda. */
    lacuna: z.object({ falta: z.string().min(1), texto: z.string().min(1), regra: regraId }).strict().optional(),
    niveis: z.array(z.array(z.string())).min(1),
  })
  .strict()
  .superRefine((f, ctx) => {
    const vistos = new Set<string>();
    for (const id of f.niveis.flat()) {
      const e = POR_ID.get(id);
      if (!e) ctx.addIssue({ code: 'custom', message: `${f.id}: exercício fora da biblioteca: ${id}` });
      else if (!e.musculos.primarios.includes(f.musculo))
        ctx.addIssue({ code: 'custom', message: `${f.id}: ${id} não tem ${f.musculo} como músculo principal` });
      if (vistos.has(id)) ctx.addIssue({ code: 'custom', message: `${f.id}: ${id} repetido` });
      vistos.add(id);
    }
  });

export type Funcao = z.infer<typeof funcaoSchema>;

export const FUNCOES: Funcao[] = z
  .array(funcaoSchema)
  .superRefine((fs, ctx) => {
    const ids = new Set(fs.map((f) => f.id));
    if (ids.size !== fs.length) ctx.addIssue({ code: 'custom', message: 'id de função repetido' });
    for (const f of fs) if (f.seNada && !ids.has(f.seNada)) ctx.addIssue({ code: 'custom', message: `${f.id}: seNada inexistente` });
  })
  .parse(dados);

export type FuncaoId = string;
export const FUNCAO: Record<FuncaoId, Funcao> = Object.fromEntries(FUNCOES.map((f) => [f.id, f]));

/** Funções em que um exercício aparece (para as alternativas e o "porquê"). */
export const funcoesDoExercicio = (exId: string) => FUNCOES.filter((f) => f.niveis.some((n) => n.includes(exId)));
