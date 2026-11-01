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

export const VERSAO_ESTADO = 6;

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
  /**
   * Regiões marcadas e a dor de hoje, de 0 a 10 (seguranca.dor.programa). Desde a versão 5, é o único lugar
   * da dor no cadastro. Sem nota = região de um estado antigo, que segue excluída até a pessoa dar a nota.
   */
  dores: z.array(z.object({ articulacao, nota: z.number().int().min(0).max(10).optional() }).strict()).optional(),
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
  z.object({ tipo: z.literal('anilha'), kgPorLado: z.number().nonnegative() }),
  z.object({ tipo: z.literal('contrapeso'), placa: z.number().int().positive() }),
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
  /** Série de acerto da calibração (progressao.calibracao): fica no histórico, fora da dupla progressão. */
  calibracao: z.boolean().optional(),
});
export const sessaoSchema = z.object({
  id: z.string(),
  diaId: z.string(),
  semana: z.number().int().positive(),
  inicio: data,
  fim: data.optional(),
  encerradaPorAlerta: z.boolean().optional(),
  /** Local onde o treino foi feito (R1b). Sessão sem local = de antes do R1b, feita no 1º local (o único que existia). */
  localId: z.string().optional(),
  exercicios: z.array(
    z.object({ exId: exercicioId, noLugarDe: exercicioId.optional(), series: z.array(serie), interrompido: z.boolean().optional() }),
  ),
});

/** Um local de treino (R1b): o nome que a pessoa escolheu e o inventário dele. */
export const localSchema = z.object({
  id: z.string().regex(/^local-\d+$/),
  nome: z.string().trim().min(1).max(40),
  inventario: inventarioSchema,
});
export type Local = z.infer<typeof localSchema>;

export const estadoSchema = z.object({
  versao: z.literal(VERSAO_ESTADO),
  avisoAceitoEm: data.optional(),
  triagem: triagemSchema.optional(),
  nivel: nivelSchema.optional(),
  rotina: rotinaSchema.optional(),
  /** Locais de treino, cada um com o seu inventário (R1b). O 1º vem do cadastro. */
  locais: z
    .array(localSchema)
    .refine((ls) => new Set(ls.map((l) => l.id)).size === ls.length, 'id de local repetido')
    .optional(),
  /** Local para o qual o programa é montado. Ausente = o 1º local. */
  localPrincipalId: z.string().optional(),
  /** Último local escolhido em "onde vou treinar hoje" (lembrado, mas a escolha continua visível). */
  ultimoLocalId: z.string().optional(),
  /** "Prefiro este" por função (selecao.preferencia): id da função → id do exercício. Nada vem preferido. */
  preferidos: z.record(z.string(), exercicioId).optional(),
  restricoes: restricoesSchema.optional(),
  /**
   * Programa salvo: só muda quando a pessoa pede (docs/pesquisa/09-decisoes-m3.md, seção 5). `localId` é o local
   * para o qual ele foi montado (ausente = o 1º local).
   */
  programa: z.object({ programa: programaSchema, geradoEm: data, localId: z.string().optional() }).optional(),
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

// Locais (R1b). Funções puras sobre o estado: quem chama nunca lê `locais` direto.
/** O local para o qual o programa é montado: o marcado como principal, ou o 1º. */
export const localPrincipal = (e: Estado): Local | undefined =>
  e.locais?.find((l) => l.id === e.localPrincipalId) ?? e.locais?.[0];
export const localPorId = (e: Estado, id: string | undefined): Local | undefined => e.locais?.find((l) => l.id === id);
/** Inventário do local principal: o do programa. */
export const inventarioPrincipal = (e: Estado) => localPrincipal(e)?.inventario;
/** Local lembrado para o treino de hoje: o último usado, se ainda existe; senão, o principal. */
export const localDoTreino = (e: Estado): Local | undefined => localPorId(e, e.ultimoLocalId) ?? localPrincipal(e);
/** Local do programa salvo: aquele para o qual ele foi montado (ausente = o 1º local). */
export const localDoPrograma = (e: Estado): Local | undefined => localPorId(e, e.programa?.localId) ?? e.locais?.[0];
/** Local de uma sessão: a de antes do R1b, sem local, foi feita no 1º local (o único que existia). */
export const localDaSessao = (e: Estado, s: { localId?: string }): string | undefined => s.localId ?? e.locais?.[0]?.id;
/** Próximo id livre ("local-2", "local-3"…), determinístico. */
export function novoLocalId(e: Estado): string {
  const usados = new Set((e.locais ?? []).map((l) => l.id));
  let n = 1;
  while (usados.has(`local-${n}`)) n++;
  return `local-${n}`;
}
/** Grava o inventário de um local (cria o 1º, "Meu local", no cadastro). */
export function comInventario(e: Estado, id: string | undefined, inventario: Local['inventario'], nome?: string): Estado {
  const locais = e.locais ?? [];
  const alvo = id ?? locais[0]?.id;
  if (alvo && locais.some((l) => l.id === alvo))
    return { ...e, locais: locais.map((l) => (l.id === alvo ? { ...l, inventario, ...(nome ? { nome } : {}) } : l)) };
  return { ...e, locais: [...locais, { id: alvo ?? novoLocalId(e), nome: nome ?? NOME_LOCAL_PADRAO, inventario }] };
}
/** Todos os itens de todos os locais (para a lista de "o que evitar", que vale em qualquer local). */
export const inventarioDeTodos = (e: Estado): Local['inventario'] =>
  Object.assign({}, ...[...(e.locais ?? [])].reverse().map((l) => l.inventario)) as Local['inventario'];
/** Nome neutro do 1º local, que a pessoa troca quando quiser (R1b). */
export const NOME_LOCAL_PADRAO = 'Meu local';

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
    ...(e.preferidos && Object.keys(e.preferidos).length ? { preferidos: e.preferidos } : {}),
    evitarExercicios: e.restricoes.evitarExercicios,
    evitarEquipamentos: e.restricoes.evitarEquipamentos,
    triagem: {
      respostas: e.triagem.respostas,
      ...(e.triagem.dores?.length ? { dores: e.triagem.dores } : {}),
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
      return !!e.locais?.length;
    case 'restricoes':
      return !!e.restricoes;
  }
}

/** Primeiro passo que falta, ou null se o onboarding está completo. */
export const primeiroPassoPendente = (e: Estado) => PASSOS.find((p) => !passoCompleto(e, p.id)) ?? null;
