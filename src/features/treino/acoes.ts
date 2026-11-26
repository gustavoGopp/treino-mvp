import { diaNoLocal, type DiaNoLocal } from '../../domain/locais';
import type { SerieRegistrada } from '../../domain/progressao';
import { alertaPendente, hojeDaSessao, hojeNoPrograma, opcoesDeHoje, proximoDia, type Hoje, type OpcoesSugestao, type Sessao } from '../../domain/sessao';
import { comHalterMaisPesado, type Inventario } from '../../domain/taxonomia/equipamentos';
import { comInventario, localDoPrograma, localDoTreino, localPorId, perfilDe, type Estado } from '../../storage/esquema';

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

/** "Meus pesos são outros": grava o halter mais pesado no local do treino (o do programa, se a sessão não diz). */
export function corrigirHalterMaisPesado(e: Estado, s: Pick<Sessao, 'localId'> | undefined, maxKg: number): Estado {
  const local = localPorId(e, s?.localId) ?? localDoPrograma(e);
  return local ? comInventario(e, local.id, comHalterMaisPesado(local.inventario, maxKg)) : e;
}

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
  // seguranca.alerta.cardiovascular: sem a confirmação da avaliação, nenhum treino novo começa
  if (alertaPendente(e.historico, e.respostas?.alertaAvaliadoEm)) return e;
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

/** Onde está a série a corrigir: no treino aberto (sem `sessaoId`) ou num treino do histórico. */
export type OndeSerie = { sessaoId?: string; exIndex: number; n: number };
type ExercicioDaSessao = Sessao['exercicios'][number];

/** A série apontada, se ela existe. */
const serieEm = (e: Estado, onde: OndeSerie) =>
  (onde.sessaoId === undefined ? e.sessaoAtual : e.historico.find((s) => s.id === onde.sessaoId))?.exercicios[onde.exIndex]?.series[onde.n];

/** Muda um exercício do treino aberto ou de um treino do histórico. */
function noExercicio(e: Estado, onde: OndeSerie, f: (x: ExercicioDaSessao) => ExercicioDaSessao): Estado {
  const mudar = (s: Sessao): Sessao => ({ ...s, exercicios: s.exercicios.map((x, j) => (j === onde.exIndex ? f(x) : x)) });
  if (onde.sessaoId === undefined) return e.sessaoAtual ? { ...e, sessaoAtual: mudar(e.sessaoAtual) } : e;
  return { ...e, historico: e.historico.map((s) => (s.id === onde.sessaoId ? mudar(s) : s)) };
}

/**
 * Corrige uma série já registrada (registro.treino-feito; pedido do Gustavo, 26/11/2026): a carga, as repetições e quantas
 * sobraram. A nota de dor, as quedas do drop set e a marca de acerto da carga ficam como estavam.
 */
export function corrigirSerie(e: Estado, onde: OndeSerie, nova: Pick<SerieRegistrada, 'carga' | 'reps' | 'rir'>): Estado {
  if (!serieEm(e, onde)) return e;
  return noExercicio(e, onde, (x) => ({ ...x, series: x.series.map((s, k) => (k === onde.n ? { ...s, carga: nova.carga, reps: nova.reps, rir: nova.rir } : s)) }));
}

/**
 * Apaga uma série já registrada (registro.treino-feito). A nota de dor dela não se perde: vai para a última série que
 * fica ou, sem nenhuma, para o próprio exercício, como no "Desfazer".
 */
export const apagarSerie = (e: Estado, onde: OndeSerie) =>
  !serieEm(e, onde) ? e : noExercicio(e, onde, (x) => {
    const tirada = x.series[onde.n];
    const series = x.series.filter((_, k) => k !== onde.n);
    if (!tirada?.dor) return { ...x, series };
    if (!series.length) return { ...x, series, dorSemSerie: Math.max(x.dorSemSerie ?? 0, tirada.dor) };
    return { ...x, series: series.map((s, k) => (k === series.length - 1 ? comDor(s, tirada.dor) : s)) };
  });

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
export function terminarSessao(e: Estado, agora: string, porAlerta = false, alerta?: Sessao['alerta']): Estado {
  if (!e.sessaoAtual) return e;
  const feita: Sessao = { ...e.sessaoAtual, fim: agora, ...(porAlerta ? { encerradaPorAlerta: true } : {}), ...(porAlerta && alerta ? { alerta } : {}) };
  const { sessaoAtual, ...resto } = e;
  void sessaoAtual;
  return { ...resto, historico: [...e.historico, feita] };
}

/** Por quanto tempo depois do encerramento por um sinal de alerta a tela oferece "Toquei sem querer" ([opinião] do projeto). */
export const MINUTOS_PARA_VOLTAR_DO_ALERTA = 15;

/**
 * "Toquei sem querer. Voltar ao treino" (pacote D2; decisão do Gustavo de 22/11/2026, a saída C do pedido 7): o sinal de
 * alerta continua encerrando o treino com um toque, e a orientação de segurança aparece primeiro; nessa tela, por 15
 * minutos, a pessoa pode desfazer um toque errado. O treino volta a ficar aberto, com as séries que já tinha, e o
 * encerramento por alerta sai do histórico (não bloqueia o próximo treino).
 */
export function podeVoltarDoAlerta(e: Estado, sessaoId: string, agora: string): boolean {
  const ult = e.historico.at(-1);
  if (e.sessaoAtual || !ult || ult.id !== sessaoId || !ult.encerradaPorAlerta || !ult.fim) return false;
  const minutos = (Date.parse(agora) - Date.parse(ult.fim)) / 60000;
  return minutos >= 0 && minutos <= MINUTOS_PARA_VOLTAR_DO_ALERTA;
}
export function voltarDoAlerta(e: Estado, sessaoId: string, agora: string): Estado {
  if (!podeVoltarDoAlerta(e, sessaoId, agora)) return e;
  const { fim, encerradaPorAlerta, alerta, ...aberta } = e.historico.at(-1)!;
  void fim;
  void encerradaPorAlerta;
  void alerta;
  return { ...e, historico: e.historico.slice(0, -1), sessaoAtual: aberta };
}

/** O treino em andamento ainda não tem nenhuma série (registro.treino-feito): "Terminar" oferece descartar. */
export const semSerie = (e: Estado) => !!e.sessaoAtual && !e.sessaoAtual.exercicios.some((x) => x.series.length > 0);

/** Apaga o último treino do histórico (registro.treino-feito), depois da confirmação de quem usa. */
export function apagarUltimoTreino(e: Estado, sessaoId: string): Estado {
  if (e.historico.at(-1)?.id !== sessaoId) return e;
  return { ...e, historico: e.historico.slice(0, -1) };
}

/** Descarta o treino em andamento sem guardar. */
export function descartarSessao(e: Estado): Estado {
  const { sessaoAtual, ...resto } = e;
  void sessaoAtual;
  return resto;
}

/** A pessoa confirmou que foi avaliada depois do sinal de alerta do coração: os treinos voltam (seguranca.alerta.cardiovascular). */
export const confirmarAvaliacaoDoAlerta = (e: Estado, agora: string): Estado => ({ ...e, respostas: { ...e.respostas, alertaAvaliadoEm: agora } });
