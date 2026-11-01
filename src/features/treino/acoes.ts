import type { SerieRegistrada } from '../../domain/progressao';
import { diaDaSemana, proximoDia, semanaDoPrograma, type Sessao } from '../../domain/sessao';
import type { Estado } from '../../storage/esquema';

// Ações sobre o treino em andamento (estado → estado). Puras: quem chama passa a data de agora.

/** Começa o treino de um dia (ou o próximo da rotação). Se já há um treino em andamento, mantém o atual. */
export function iniciarSessao(e: Estado, agora: string, diaId?: string): Estado {
  if (e.sessaoAtual || !e.programa) return e;
  const programa = e.programa.programa;
  const id = diaId ?? proximoDia(programa, e.historico).id;
  const semana = semanaDoPrograma(e.historico, agora);
  const dia = diaDaSemana(programa, id, semana);
  const sessaoAtual: Sessao = { id: agora, diaId: id, semana, inicio: agora, exercicios: dia.exercicios.map((x) => ({ exId: x.exId, series: [] })) };
  return { ...e, sessaoAtual };
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
