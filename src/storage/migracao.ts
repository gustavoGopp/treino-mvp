import type { z } from 'zod';
import { estadoSchema, VERSAO_ESTADO, type Estado } from './esquema';

// Migrações do estado guardado. Cada entrada leva da versão N para N + 1.
// Cada mudança de formato entra aqui, com teste em tests/unit/armazenamento.test.ts.
export type Migracao = (anterior: Record<string, unknown>) => Record<string, unknown>;
export const MIGRACOES: Record<number, Migracao> = {
  // 1 → 2 (M5): histórico de sessões de treino.
  1: (anterior) => ({ ...anterior, historico: [] }),
  // 2 → 3 (R0b): a rotina passa a aceitar 6 dias e a divisão escolhida. Nada é inventado: sem escolha,
  // vale a recomendada (para 2, 3 e 4 dias é a mesma estrutura de antes). O programa salvo não muda.
  2: (anterior) => ({ ...anterior }),
};

export type ResultadoMigracao = { ok: true; estado: Estado } | { ok: false; erro: string };

export function migrar(
  bruto: unknown,
  migracoes: Record<number, Migracao> = MIGRACOES,
  atual = VERSAO_ESTADO,
  esquema: z.ZodType<Estado, z.ZodTypeDef, unknown> = estadoSchema,
): ResultadoMigracao {
  if (!bruto || typeof bruto !== 'object' || Array.isArray(bruto)) return { ok: false, erro: 'Os dados não estão no formato do app.' };
  let dados = bruto as Record<string, unknown>;
  const versao = dados.versao;
  if (typeof versao !== 'number' || !Number.isInteger(versao) || versao < 1)
    return { ok: false, erro: 'Os dados não têm uma versão reconhecida.' };
  if (versao > atual) return { ok: false, erro: 'Estes dados vêm de uma versão mais nova do app. Atualize o app e tente de novo.' };

  for (let v = versao; v < atual; v++) {
    const passo = migracoes[v];
    if (!passo) return { ok: false, erro: `Não há como converter dados da versão ${v}.` };
    dados = { ...passo(dados), versao: v + 1 };
  }

  const r = esquema.safeParse(dados);
  if (!r.success) {
    const p = r.error.issues[0]!;
    return { ok: false, erro: `Dado inválido em "${p.path.join('.') || 'raiz'}": ${p.message}.` };
  }
  return { ok: true, estado: r.data };
}
