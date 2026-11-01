import { z } from 'zod';
import { ARTICULACOES, BIBLIOTECA, MUSCULOS, PADROES } from '../domain/biblioteca';
import { GRUPOS, type Grupo, type Perfil, type Programa } from '../domain/gerador';
import { DIVISAO_IDS } from '../domain/gerador/divisoes';
import { CONFIANCA_TECNICA, TEMPOS_DE_TREINO } from '../domain/nivel';
import { NIVEIS } from '../domain/regras';
import { ITEM_IDS, inventarioSchema, type ItemId } from '../domain/taxonomia/equipamentos';
import { PERGUNTAS, type PerguntaId } from '../domain/triagem';

// Estado guardado no aparelho (IndexedDB) e no arquivo de exportação. Versionado: toda mudança de formato
// ganha uma versão nova e uma migração em src/storage/migracao.ts, com teste.

export const VERSAO_ESTADO = 4;

const enumDe = <T extends string>(xs: readonly T[]) => z.enum(xs as unknown as [T, ...T[]]);
const ids = <T extends { id: string }>(xs: readonly T[]) => xs.map((x) => x.id) as T['id'][];
const data = z.string().datetime({ offset: true });

const articulacao = enumDe(ARTICULACOES);
const musculo = enumDe(MUSCULOS);
const nivel = enumDe(NIVEIS);
const grupo = enumDe(Object.keys(GRUPOS) as Grupo[]);
const itemId = enumDe(ITEM_IDS as ItemId[]);
const exercicioId = z.string().refine((id) => BIBLIOTECA.some((e) => e.id === id), 'exercício fora da biblioteca');
const faixa = z.tuple([z.number(), z.number()]);

export const triagemSchema = z.object({
  respostas: z.object(Object.fromEntries(PERGUNTAS.map((p) => [p.id, z.boolean()])) as Record<PerguntaId, z.ZodBoolean>),
  regioes: z.array(articulacao).optional(),
  liberacaoConfirmada: z.boolean().optional(),
  /** Data em que a pessoa confirmou a liberação (seguranca.triagem). Só a data: nada sobre o profissional. */
  liberacaoConfirmadaEm: data.optional(),
});

export const nivelSchema = z.object({
  respostas: z.object({
    tempoContinuo: enumDe(ids(TEMPOS_DE_TREINO)),
    semanasParado: z.number().int().min(0).max(520),
    tecnica: enumDe(ids(CONFIANCA_TECNICA)),
  }),
  escolhido: nivel,
});

export const rotinaSchema = z.object({
  diasSemana: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
  /** Divisão escolhida (divisao.recomendacao). Ausente = a pessoa não escolheu, e vale a recomendada. */
  divisao: enumDe(DIVISAO_IDS).optional(),
  minutosSessao: z.number().int().min(20).max(150),
  prioridades: z.array(grupo),
});

export const restricoesSchema = z.object({
  evitarExercicios: z.array(exercicioId),
  evitarEquipamentos: z.array(itemId),
  dores: z.array(z.object({ articulacao, intensidade: z.number().int().min(0).max(10) })),
});

const porque = z.object({ regraId: z.string(), texto: z.string() });
const exercicioPrescrito = z.object({
  exId: exercicioId,
  nome: z.string(),
  padrao: enumDe(PADROES),
  tipo: z.enum(['composto', 'isolador']),
  funcao: z.string().optional(),
  series: z.number().int().positive(),
  reps: faixa,
  rir: faixa,
  descansoSeg: z.number().nonnegative(),
  unilateral: z.boolean(),
  animacaoId: z.string().nullable(),
  supersetCom: z.string().optional(),
  dropSet: z.boolean().optional(),
  alternativas: z.array(exercicioId),
  porque: z.array(porque),
});
const volume = z.record(musculo, z.number()).transform((v) => v as Partial<Record<z.infer<typeof musculo>, number>>);

export const programaSchema = z.object({
  versao: z.literal(1),
  entradasHash: z.string(),
  divisao: z.string(),
  divisaoId: enumDe(DIVISAO_IDS).optional(),
  dias: z.array(
    z.object({ id: z.string(), nome: z.string(), exercicios: z.array(exercicioPrescrito), minutosEstimados: z.number() }),
  ),
  volumeSemanal: volume,
  metas: volume,
  fases: z.array(
    z.object({ semanas: z.string(), fatorSeries: z.number(), rir: faixa.nullable(), texto: z.string(), regraId: z.string() }),
  ),
  avisos: z.array(porque),
  porque: z.array(porque),
  regioesExcluidas: z.array(articulacao),
}) satisfies z.ZodType<Programa, z.ZodTypeDef, unknown>;

const carga = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('kg'), kg: z.number().nonnegative() }),
  z.object({ tipo: z.literal('placa'), placa: z.number().int().positive() }),
  z.object({ tipo: z.literal('degrau'), degrau: z.number().int().nonnegative() }),
]);
const serie = z.object({
  carga,
  reps: z.number().int().nonnegative(),
  rir: z.number().int().min(0).max(10),
  amplitudeCompleta: z.boolean().optional(),
  dor: z.number().int().min(0).max(10).optional(),
  /** Quedas de carga do drop set (tempo.drop-set), registradas na última série; a progressão não as usa. */
  quedas: z.array(z.object({ carga, reps: z.number().int().nonnegative() })).max(2).optional(),
});
export const sessaoSchema = z.object({
  id: z.string(),
  diaId: z.string(),
  semana: z.number().int().positive(),
  inicio: data,
  fim: data.optional(),
  encerradaPorAlerta: z.boolean().optional(),
  exercicios: z.array(
    z.object({ exId: exercicioId, noLugarDe: exercicioId.optional(), series: z.array(serie), interrompido: z.boolean().optional() }),
  ),
});

export const estadoSchema = z.object({
  versao: z.literal(VERSAO_ESTADO),
  avisoAceitoEm: data.optional(),
  triagem: triagemSchema.optional(),
  nivel: nivelSchema.optional(),
  rotina: rotinaSchema.optional(),
  inventario: inventarioSchema.optional(),
  restricoes: restricoesSchema.optional(),
  /** Programa salvo: só muda quando a pessoa pede (docs/pesquisa/09-decisoes-m3.md, seção 5). */
  programa: z.object({ programa: programaSchema, geradoEm: data }).optional(),
  /** Painel de ajustes calculados: "Manter" recolhe o painel até a pessoa reabrir. */
  ajustes: z.object({ recolhido: z.boolean() }).optional(),
  /** Sessões terminadas, da mais antiga à mais recente (M5). */
  historico: z.array(sessaoSchema),
  /** Treino em andamento, salvo a cada série para não se perder se o app fechar. */
  sessaoAtual: sessaoSchema.optional(),
});

export type Estado = z.infer<typeof estadoSchema>;
export type TriagemSalva = z.infer<typeof triagemSchema>;
export type NivelSalvo = z.infer<typeof nivelSchema>;
export type Rotina = z.infer<typeof rotinaSchema>;
export type Restricoes = z.infer<typeof restricoesSchema>;

export const estadoVazio = (): Estado => ({ versao: VERSAO_ESTADO, historico: [] });

/** Perfil completo para o gerador, ou null se ainda falta algum passo do onboarding. */
export function perfilDe(e: Estado): Perfil | null {
  if (!e.triagem || !e.nivel || !e.rotina || !e.restricoes) return null;
  return {
    nivel: e.nivel.escolhido,
    semanasParado: e.nivel.respostas.semanasParado,
    diasSemana: e.rotina.diasSemana,
    ...(e.rotina.divisao ? { divisao: e.rotina.divisao } : {}),
    minutosSessao: e.rotina.minutosSessao,
    prioridades: e.rotina.prioridades,
    evitarExercicios: e.restricoes.evitarExercicios,
    evitarEquipamentos: e.restricoes.evitarEquipamentos,
    dores: e.restricoes.dores,
    triagem: {
      respostas: e.triagem.respostas,
      ...(e.triagem.regioes ? { regioes: e.triagem.regioes } : {}),
      ...(e.triagem.liberacaoConfirmada ? { liberacaoConfirmada: true } : {}),
    },
  };
}

/** Passos do onboarding, na ordem. O primeiro incompleto é para onde a pessoa volta. */
export const PASSOS = [
  { id: 'aviso', rota: '/', titulo: 'Boas-vindas' },
  { id: 'triagem', rota: '/comecar/triagem', titulo: 'Triagem' },
  { id: 'nivel', rota: '/comecar/nivel', titulo: 'Experiência' },
  { id: 'rotina', rota: '/comecar/rotina', titulo: 'Rotina' },
  { id: 'inventario', rota: '/comecar/inventario', titulo: 'Equipamento' },
  { id: 'restricoes', rota: '/comecar/restricoes', titulo: 'Restrições' },
] as const;
export type PassoId = (typeof PASSOS)[number]['id'];

export function passoCompleto(e: Estado, id: PassoId): boolean {
  switch (id) {
    case 'aviso':
      return !!e.avisoAceitoEm;
    case 'triagem':
      return !!e.triagem;
    case 'nivel':
      return !!e.nivel;
    case 'rotina':
      return !!e.rotina;
    case 'inventario':
      return !!e.inventario;
    case 'restricoes':
      return !!e.restricoes;
  }
}

/** Primeiro passo que falta, ou null se o onboarding está completo. */
export const primeiroPassoPendente = (e: Estado) => PASSOS.find((p) => !passoCompleto(e, p.id)) ?? null;
