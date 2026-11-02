import type { Porque } from '../../domain/gerador';
import { diaNoLocal, type DiaNoLocal, type Troca } from '../../domain/locais';
import type { SerieRegistrada } from '../../domain/progressao';
import { hojeDaSessao, hojeNoPrograma, opcoesDeHoje, proximoDia, semanaLeveAtiva, type Hoje, type OpcoesSugestao, type Sessao } from '../../domain/sessao';
import type { Inventario } from '../../domain/taxonomia/equipamentos';
import { localDoPrograma, localDoTreino, localPorId, perfilDe, type Estado } from '../../storage/esquema';

// Ações sobre o treino em andamento (estado → estado). Puras: quem chama passa a data de agora e o fuso do aparelho.

/** A prescrição de hoje no programa salvo (bloco, semana, volta de pausa, semana leve). */
export function hojeDoEstado(e: Estado, agora: string, fusoMin = 0): Hoje | null {
  if (!e.programa) return null;
  return hojeNoPrograma(e.programa.programa, e.historico, agora, { fusoMin, ...(e.semanaLeve ? { semanaLeve: e.semanaLeve } : {}) });
}

/** A prescrição de uma sessão, refeita com o histórico de antes dela. */
export const hojeDoTreino = (e: Estado, s: Pick<Sessao, 'id' | 'inicio' | 'semanaLeve'>, fusoMin = 0): Hoje | null =>
  e.programa ? hojeDaSessao(e.programa.programa, e.historico, s, fusoMin) : null;

/**
 * O dia de um treino no local escolhido (local.treino-do-dia): no local do programa, o dia do programa; em outro
 * local, cada vaga troca para o equivalente possível ali, com o motivo. A prescrição da semana vale igual.
 */
export function diaDoTreino(
  e: Estado,
  s: Pick<Sessao, 'id' | 'inicio' | 'diaId' | 'localId' | 'semanaLeve'>,
  fusoMin = 0,
): (DiaNoLocal & { noLocalDoPrograma: boolean }) | null {
  const hoje = hojeDoTreino(e, s, fusoMin);
  if (!e.programa || !hoje) return null;
  const base = hoje.dias.find((d) => d.id === s.diaId) ?? hoje.dias[0]!;
  const perfil = perfilDe(e);
  const doPrograma = localDoPrograma(e);
  const local = localPorId(e, s.localId) ?? doPrograma;
  if (!perfil || !local || local.id === doPrograma?.id) return { dia: base, trocas: [], avisos: [], noLocalDoPrograma: true };
  return { ...diaNoLocal(base, perfil, local.inventario), noLocalDoPrograma: false };
}

/** Inventário do local de um treino (o do programa, se a sessão não diz). */
export const inventarioDoTreino = (e: Estado, s?: Pick<Sessao, 'localId'>): Inventario =>
  (localPorId(e, s?.localId) ?? localDoPrograma(e))?.inventario ?? {};

/**
 * Como ler o histórico de carga num treino (progressao.troca-equivalente): nas máquinas, só o do local de hoje (as
 * sessões antigas, sem local, são do 1º local); e, na semana 1 da volta de uma pausa, a calibração só desce.
 */
export function opcoesDaCarga(e: Estado, s: Pick<Sessao, 'id' | 'inicio' | 'localId' | 'semanaLeve'>, fusoMin = 0): OpcoesSugestao {
  const localId = s.localId ?? localDoPrograma(e)?.id;
  const hoje = hojeDoTreino(e, s, fusoMin);
  return {
    ...(localId ? { local: { localId, ...(e.locais?.[0] ? { localPadrao: e.locais[0].id } : {}) } } : {}),
    ...(hoje ? opcoesDeHoje(hoje) : {}),
  };
}

/** Prévia do dia num local, antes de começar ("onde vou treinar hoje?"). */
export function previaDoDia(e: Estado, agora: string, diaId: string, localId?: string, fusoMin = 0): { trocas: Troca[]; avisos: Porque[] } {
  const d = diaDoTreino(e, { id: agora, inicio: agora, diaId, ...(localId ? { localId } : {}), ...(semanaLeveAtiva(e.semanaLeve, agora, fusoMin) ? { semanaLeve: true } : {}) }, fusoMin);
  return { trocas: d?.trocas ?? [], avisos: d?.avisos ?? [] };
}

/**
 * Começa o treino de um dia (ou o próximo da rotação), no local escolhido (ou no lembrado). O local fica lembrado
 * para a próxima vez. Se já há um treino em andamento, mantém o atual.
 */
export function iniciarSessao(e: Estado, agora: string, diaId?: string, localId?: string, fusoMin = 0): Estado {
  if (e.sessaoAtual || !e.programa) return e;
  const programa = e.programa.programa;
  const id = diaId ?? proximoDia(programa, e.historico).id;
  const hoje = hojeDoEstado(e, agora, fusoMin)!;
  const local = localPorId(e, localId) ?? localDoTreino(e);
  const leve = hoje.semanaLeve ? { semanaLeve: true } : {};
  const d = diaDoTreino(e, { id: agora, inicio: agora, diaId: id, ...(local ? { localId: local.id } : {}), ...leve }, fusoMin);
  const lista: { exId: string; noLugarDe?: string }[] = d?.dia.exercicios ?? hoje.dias.find((x) => x.id === id)!.exercicios;
  const exercicios: Sessao['exercicios'] = lista.map((x) => ({ exId: x.exId, ...(x.noLugarDe ? { noLugarDe: x.noLugarDe } : {}), series: [] }));
  const sessaoAtual: Sessao = { id: agora, diaId: id, semana: hoje.semana, inicio: agora, ...(local ? { localId: local.id } : {}), ...leve, exercicios };
  return { ...e, sessaoAtual, ...(local && (e.locais?.length ?? 0) > 1 ? { ultimoLocalId: local.id } : {}) };
}

/** "Prefiro este" (selecao.preferencia): um toque marca; tocar de novo desfaz. Uma preferência por função. */
export function alternarPreferencia(e: Estado, funcaoId: string, exId: string): Estado {
  const atual = e.preferidos ?? {};
  const { [funcaoId]: antes, ...resto } = atual;
  const preferidos = antes === exId ? resto : { ...resto, [funcaoId]: exId };
  if (!Object.keys(preferidos).length) {
    const { preferidos: _, ...sem } = e;
    void _;
    return sem;
  }
  return { ...e, preferidos };
}

const mudarExercicio = (e: Estado, i: number, f: (x: Sessao['exercicios'][number]) => Sessao['exercicios'][number]): Estado =>
  e.sessaoAtual ? { ...e, sessaoAtual: { ...e.sessaoAtual, exercicios: e.sessaoAtual.exercicios.map((x, j) => (j === i ? f(x) : x)) } } : e;

export const registrarSerie = (e: Estado, i: number, s: SerieRegistrada) => mudarExercicio(e, i, (x) => ({ ...x, series: [...x.series, s] }));
export const desfazerSerie = (e: Estado, i: number) => mudarExercicio(e, i, (x) => ({ ...x, series: x.series.slice(0, -1) }));
export const interromperExercicio = (e: Estado, i: number) => mudarExercicio(e, i, (x) => ({ ...x, interrompido: true }));

/** Troca pela alternativa só nesta sessão (decisão 7). Se já havia séries, o exercício original fica registrado e a alternativa entra depois dele. */
export function trocarExercicio(e: Estado, i: number, alternativa: string): Estado {
  if (!e.sessaoAtual) return e;
  const atual = e.sessaoAtual.exercicios[i];
  if (!atual) return e;
  const original = atual.noLugarDe ?? atual.exId;
  const nova = { exId: alternativa, noLugarDe: original, series: [] };
  const exercicios = [...e.sessaoAtual.exercicios];
  if (atual.series.length) exercicios.splice(i + 1, 0, nova);
  else exercicios[i] = nova;
  return { ...e, sessaoAtual: { ...e.sessaoAtual, exercicios } };
}

/** Termina o treino: vai para o histórico. Exercícios sem série nenhuma continuam registrados (sem séries). */
export function terminarSessao(e: Estado, agora: string, porAlerta = false): Estado {
  if (!e.sessaoAtual) return e;
  const feita: Sessao = { ...e.sessaoAtual, fim: agora, ...(porAlerta ? { encerradaPorAlerta: true } : {}) };
  const { sessaoAtual, ...resto } = e;
  void sessaoAtual;
  return { ...resto, historico: [...e.historico, feita] };
}

/** Descarta o treino em andamento sem guardar. */
export function descartarSessao(e: Estado): Estado {
  const { sessaoAtual, ...resto } = e;
  void sessaoAtual;
  return resto;
}
