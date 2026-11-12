import { diaNoLocal, type DiaNoLocal } from '../../domain/locais';
import type { SerieRegistrada } from '../../domain/progressao';
import { hojeDaSessao, hojeNoPrograma, opcoesDeHoje, proximoDia, type Hoje, type OpcoesSugestao, type Sessao } from '../../domain/sessao';
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

/** Registra a série. A nota de dor dada antes da 1ª série (`dorSemSerie`) passa para ela. */
export const registrarSerie = (e: Estado, i: number, s: SerieRegistrada) =>
  mudarExercicio(e, i, ({ dorSemSerie, ...x }) => ({ ...x, series: [...x.series, comDor(s, dorSemSerie)] }));
/** Desfaz a última série. Se era a única e levava a nota de dor, a nota volta para o exercício: ela não se perde. */
export const desfazerSerie = (e: Estado, i: number) =>
  mudarExercicio(e, i, (x) => {
    const tirada = x.series.at(-1);
    const series = x.series.slice(0, -1);
    return { ...x, series, ...(!series.length && tirada?.dor ? { dorSemSerie: tirada.dor } : {}) };
  });
/**
 * A nota de dor do "Senti algo" (seguranca.dor.escala; R5a): fica na última série feita do exercício, com a maior nota
 * se já havia uma. Sem série feita, fica no próprio exercício (`dorSemSerie`) e passa para a 1ª série que for
 * registrada; se o exercício for encerrado antes disso, a nota continua nele. `naSerie` diz onde ela ficou.
 */
export function anotarDor(e: Estado, i: number, nota: number): { estado: Estado; naSerie: boolean } {
  const x = e.sessaoAtual?.exercicios[i];
  const n = Math.round(nota);
  if (!x || n < 1) return { estado: e, naSerie: false };
  if (!x.series.length) return { estado: mudarExercicio(e, i, (y) => ({ ...y, dorSemSerie: Math.max(y.dorSemSerie ?? 0, n) })), naSerie: false };
  return { estado: mudarExercicio(e, i, (y) => ({ ...y, series: y.series.map((s, k) => (k === y.series.length - 1 ? comDor(s, n) : s)) })), naSerie: true };
}

/** A série com a nota de dor (a maior, se já havia uma); notas abaixo de 1 não são guardadas. */
export const comDor = (s: SerieRegistrada, nota?: number): SerieRegistrada =>
  nota && nota > 0 ? { ...s, dor: Math.max(s.dor ?? 0, Math.round(nota)) } : s;

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

/** O treino em andamento ainda não tem nenhuma série (registro.treino-feito): "Terminar" oferece descartar. */
export const semSerie = (e: Estado) => !!e.sessaoAtual && !e.sessaoAtual.exercicios.some((x) => x.series.length > 0);

/** Apaga o último treino do histórico (registro.treino-feito), depois da confirmação de quem usa. */
export function apagarUltimoTreino(e: Estado, sessaoId: string): Estado {
  if (e.historico.at(-1)?.id !== sessaoId) return e;
  return { ...e, historico: e.historico.slice(0, -1) };
}

/** Corrige uma série do último treino (registro.treino-feito): a carga, as repetições, o RIR ou a dor digitados errado. */
export function corrigirSerie(e: Estado, sessaoId: string, exercicio: number, serie: number, nova: SerieRegistrada): Estado {
  const ult = e.historico.at(-1);
  if (ult?.id !== sessaoId || !ult.exercicios[exercicio]?.series[serie]) return e;
  const exercicios = ult.exercicios.map((x, j) => (j === exercicio ? { ...x, series: x.series.map((s, n) => (n === serie ? nova : s)) } : x));
  return { ...e, historico: [...e.historico.slice(0, -1), { ...ult, exercicios }] };
}

/** Descarta o treino em andamento sem guardar. */
export function descartarSessao(e: Estado): Estado {
  const { sessaoAtual, ...resto } = e;
  void sessaoAtual;
  return resto;
}
