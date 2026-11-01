import { BIBLIOTECA, type Exercicio } from '../biblioteca';
import { prescricaoDaSemana, type DiaPrograma, type ExercicioPrescrito, type Fase, type Programa } from '../gerador';
import { ESCADA_PESO_CORPO, sugerirProgressao, type Alvo, type Carga, type OpcoesCarga, type SerieRegistrada, type SessaoExercicio, type Sugestao } from '../progressao';
import { calibrar, emCalibracao, semCalibracao, type ResultadoCalibracao } from '../progressao/calibracao';
import { funcoesDoExercicio } from '../gerador/funcoes';
import { r } from '../regras';
import { CAPACIDADES, cargasHalter, cargasKettlebell, ITEM_IDS, type Inventario } from '../taxonomia/equipamentos';

// Sessão de treino: funções puras que ligam o programa, o histórico e a progressão.
// Datas entram como texto ISO (quem chama decide "hoje"); nada aqui lê o relógio.
// Decisões e fontes: docs/pesquisa/10-decisoes-m5.md.

export type ExercicioFeito = {
  /** Exercício que de fato foi feito (pode ser a alternativa). */
  exId: string;
  /** Exercício do programa que ele substituiu, se houve troca. */
  noLugarDe?: string;
  series: SerieRegistrada[];
  /** Encerrado por dor ou sinal de alerta. */
  interrompido?: boolean;
};

export type Sessao = {
  id: string;
  diaId: string;
  semana: number;
  inicio: string;
  fim?: string;
  /** Encerrada por sinal de alerta cardiovascular (seguranca.alerta.cardiovascular). */
  encerradaPorAlerta?: boolean;
  /** Local onde o treino foi feito (R1b); sem local = de antes do R1b, no 1º local. */
  localId?: string;
  exercicios: ExercicioFeito[];
};

/**
 * De qual local é o histórico que vale para a carga (progressao.troca-equivalente; decisão do Gustavo no R1b):
 * `localId` é o local de hoje; `localPadrao`, o das sessões sem local (o 1º local, o único que existia antes).
 */
export type LocalDaCarga = { localId: string; localPadrao?: string };

const POR_ID: Record<string, Exercicio> = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));

/** Próximo dia da rotação: o seguinte ao da última sessão terminada; o primeiro se não há histórico (decisão 1). */
export function proximoDia(programa: Programa, historico: Sessao[]): DiaPrograma {
  const ultima = [...historico].reverse().find((s) => s.fim && programa.dias.some((d) => d.id === s.diaId));
  if (!ultima) return programa.dias[0]!;
  const i = programa.dias.findIndex((d) => d.id === ultima.diaId);
  return programa.dias[(i + 1) % programa.dias.length]!;
}

/** Semana do programa, contada em semanas corridas desde a primeira sessão (decisão 2). */
export function semanaDoPrograma(historico: Sessao[], hojeIso: string): number {
  const primeira = historico[0]?.inicio;
  if (!primeira) return 1;
  const dias = Math.floor((Date.parse(hojeIso) - Date.parse(primeira)) / 86_400_000);
  return Math.max(1, Math.floor(dias / 7) + 1);
}

/** O dia com séries e RIR da semana (fases de readaptação e aprendizado). */
export function diaDaSemana(programa: Programa, diaId: string, semana: number): DiaPrograma {
  return prescricaoDaSemana(programa, semana).find((d) => d.id === diaId) ?? programa.dias[0]!;
}

/** Prescrição de quem ocupa a vaga: a do programa ou, numa troca, a da alternativa (repetições, lado e animação dela). */
export function prescricaoDaVaga(orig: ExercicioPrescrito, altId?: string): ExercicioPrescrito {
  const alt = altId && altId !== orig.exId ? POR_ID[altId] : undefined;
  return alt ? { ...orig, exId: alt.id, nome: alt.nome, reps: alt.faixaReps, unilateral: alt.unilateral, animacaoId: alt.animacaoId, alternativas: [] } : orig;
}

/** Fase que vale na semana (mesma leitura de prescricaoDaSemana: "1", "1–2", "3+", "1ª sessão"). */
export function faseDaSemana(p: Programa, semana: number): Fase | undefined {
  return p.fases.find((f) => {
    const [a, b] = f.semanas.split(/[–+]/).map((x) => parseInt(x, 10));
    if (Number.isNaN(a)) return semana === 1;
    if (f.semanas.endsWith('+')) return semana >= a!;
    return semana >= a! && semana <= (Number.isNaN(b) || b === undefined ? a! : b);
  });
}

export type ContextoGuia = { diaId: string; exId: string; /** Exercício da vaga, quando houve troca pela alternativa. */ vaga?: string };

/**
 * O que o guia mostra quando é aberto pelo programa ou pelo treino (R1): a prescrição da pessoa naquela semana
 * (séries, repetições, RIR e descanso, com as fases de aprendizado e readaptação), nunca a do programa de
 * referência. Devolve null se o dia ou o exercício não estão no programa (o guia mostra então o catálogo).
 */
export function prescricaoNoGuia(
  programa: Programa,
  ctx: ContextoGuia,
  semana: number,
): { dia: DiaPrograma; x: ExercicioPrescrito; semana: number; fase?: Fase } | null {
  const dia = prescricaoDaSemana(programa, semana).find((d) => d.id === ctx.diaId);
  const orig = dia?.exercicios.find((x) => x.exId === (ctx.vaga ?? ctx.exId));
  if (!dia || !orig) return null;
  const fase = faseDaSemana(programa, semana);
  return { dia, x: prescricaoDaVaga(orig, ctx.vaga ? ctx.exId : undefined), semana, ...(fase ? { fase } : {}) };
}

export type TipoCarga = Carga['tipo'];

/** Placas ou menor anilha do item que dá a capacidade do exercício (o 1º do inventário que a dá sozinho). */
function atributoDoItem(ex: Exercicio | undefined, inv: Inventario, chave: 'placas' | 'menorAnilhaKg'): number | undefined {
  if (!ex) return undefined;
  const caps = ex.requer.find((g) => g.every((c) => CAPACIDADES[c](inv))) ?? ex.requer[0]!;
  for (const id of ITEM_IDS) {
    const a = (inv as Record<string, Record<string, unknown> | undefined>)[id];
    if (!a || typeof a[chave] !== 'number') continue;
    if (caps.some((c) => c !== 'apoio' && CAPACIDADES[c]({ [id]: a } as Inventario))) return a[chave] as number;
  }
  return undefined;
}

/** Como registrar a carga de um exercício, conforme o equipamento (progressao.incremento.*; pesquisa-v2/08, seção 1.1). */
export function opcoesCarga(exId: string, inventario: Inventario): OpcoesCarga & { registro: TipoCarga } {
  const ex = POR_ID[exId];
  const tipo = ex?.carga ?? 'peso-corpo';
  const placas = atributoDoItem(ex, inventario, 'placas');
  switch (tipo) {
    case 'halter':
      return { tipo, registro: 'kg', lista: cargasHalter(inventario) };
    case 'kettlebell':
      return { tipo, registro: 'kg', lista: cargasKettlebell(inventario) };
    case 'polia':
    case 'maquina':
      return { tipo, registro: 'placa', ...(placas ? { placasMax: placas } : {}) };
    case 'anilha': {
      const menor = atributoDoItem(ex, inventario, 'menorAnilhaKg');
      return { tipo, registro: 'anilha', ...(menor ? { menorAnilhaKg: menor } : {}) };
    }
    case 'assistida':
      return { tipo, registro: 'contrapeso', ...(placas ? { placasMax: placas } : {}) };
    case 'peso-corpo':
    case 'elastico':
      return { tipo, registro: 'degrau' };
    case 'barra':
      return { tipo, registro: 'kg' };
  }
}

/**
 * Texto da carga para a tela. No degrau (peso do corpo, elástico), o nome do degrau vem depois da base:
 * "peso do corpo × 12", e não "mais repetições × 12" (R1). O exercício, quando conhecido, diz se a base é o elástico.
 */
export function textoCarga(c: Carga, exId?: string): string {
  if (c.tipo === 'degrau') {
    const base = exId && POR_ID[exId]?.carga === 'elastico' ? 'elástico' : 'peso do corpo';
    if (c.degrau === 0) return base;
    return `${base} · ${ESCADA_PESO_CORPO[c.degrau] ?? `degrau ${c.degrau + 1}`}`;
  }
  if (c.tipo === 'kg') return `${c.kg.toLocaleString('pt-BR')} kg`;
  if (c.tipo === 'placa') return `placa ${c.placa}`;
  if (c.tipo === 'anilha') return `${c.kgPorLado.toLocaleString('pt-BR')} kg por lado`;
  return `contrapeso ${c.placa}`;
}

/**
 * A carga do exercício depende da máquina (placa da torre, anilhas por lado, contrapeso): a placa 7 de uma torre não
 * pesa o mesmo que a de outra, e o trenó de cada leg press pesa diferente. Halteres, kettlebell, barra, peso do corpo
 * e elástico valem igual em qualquer local (kg é kg).
 */
export const cargaDaMaquina = (exId: string) => {
  const c = POR_ID[exId]?.carga;
  return c === 'polia' || c === 'maquina' || c === 'anilha' || c === 'assistida';
};

/**
 * Histórico de um exercício (só sessões em que ele foi feito com séries), do mais antigo ao mais recente. Com o local,
 * nas máquinas, só as sessões daquele local (decisão do R1b); fora delas, o histórico segue o exercício em qualquer local.
 * Nada é apagado nem misturado: é só uma leitura com filtro.
 */
export function historicoDoExercicio(historico: Sessao[], exId: string, local?: LocalDaCarga): SessaoExercicio[] {
  const noLocal = (s: Sessao) => !local || !cargaDaMaquina(exId) || (s.localId ?? local.localPadrao) === local.localId;
  return historico
    .filter(noLocal)
    .flatMap((s) => s.exercicios.filter((e) => e.exId === exId && e.series.length > 0))
    .map((e) => ({ series: e.series }));
}

/** Última série registrada de um exercício, para pré-preencher a próxima (decisão 3). */
export function ultimaSerie(historico: Sessao[], exId: string, local?: LocalDaCarga): SerieRegistrada | undefined {
  return historicoDoExercicio(historico, exId, local).at(-1)?.series.at(-1);
}

/** Opções de quem chama a sugestão: o local de hoje e a semana 1 da volta de uma pausa (a calibração só desce). */
export type OpcoesSugestao = { local?: LocalDaCarga; soDesce?: boolean };

/** Carga dentro do que o local tem: halteres e kettlebell pela lista do inventário (o maior até a carga). */
export function noInventario(c: Carga, o: OpcoesCarga): { carga: Carga; ajustada: boolean } {
  const lista = o.lista ?? [];
  if (c.tipo !== 'kg' || !lista.length || lista.some((k) => Math.abs(k - c.kg) < 1e-9)) return { carga: c, ajustada: false };
  const k = [...lista].reverse().find((x) => x <= c.kg) ?? lista[0]!;
  return { carga: { tipo: 'kg', kg: k }, ajustada: true };
}

/** Texto da 1ª vez (progressao.troca-equivalente): nunca mostra a carga do exercício antigo como número. */
export function textoPrimeiraVez(historico: Sessao[], exId: string, local?: LocalDaCarga): string {
  const comeco = 'comece com uma carga que pareça fácil; a 1ª série acerta a carga.';
  if (local && cargaDaMaquina(exId) && historicoDoExercicio(historico, exId).length)
    return `1ª vez nesta máquina neste local (a carga de outra máquina não vale aqui): ${comeco}`;
  const funcoes = funcoesDoExercicio(exId);
  const feito = [...historico]
    .reverse()
    .flatMap((s) => s.exercicios)
    .find((e) => e.exId !== exId && e.series.length > 0 && funcoes.some((f) => f.niveis.some((n) => n.includes(e.exId))));
  if (feito) return `Você já faz ${(POR_ID[feito.exId]?.nome ?? '').toLowerCase()}; aqui é a 1ª vez: ${comeco}`;
  return `1ª vez neste exercício: ${comeco.charAt(0).toUpperCase()}${comeco.slice(1)}`;
}

/**
 * Sugestão para a próxima sessão do exercício, com o alvo da prescrição (decisão 9). Na 1ª vez (e na 1ª vez de uma
 * máquina num local), a calibração na 1ª série (progressao.calibracao); depois, a dupla progressão, só com as séries
 * de trabalho. A dor manda antes de tudo (seguranca.dor.escala).
 */
export function sugestaoDoExercicio(
  historico: Sessao[],
  x: Pick<ExercicioPrescrito, 'exId' | 'reps' | 'rir'>,
  inventario: Inventario,
  opcoes: OpcoesSugestao = {},
): Sugestao {
  const h = historicoDoExercicio(historico, x.exId, opcoes.local);
  const op = opcoesCarga(x.exId, inventario);
  const alvo: Alvo = { reps: x.reps, rir: x.rir };
  const ultima = h.at(-1);
  if (ultima?.series.some((s) => (s.dor ?? 0) >= 3)) return sugerirProgressao(h, alvo, op);
  if (emCalibracao(h)) {
    const s = ultima?.series.at(-1);
    if (!s) return { acao: 'calibrar', motivo: textoPrimeiraVez(historico, x.exId, opcoes.local), regraId: r('progressao.calibracao') };
    const c = calibrar(s, alvo, op, { soDesce: opcoes.soDesce });
    const prox = noInventario(c.proxima, op).carga;
    return { acao: 'calibrar', proxima: prox, motivo: `Ainda calibrando: comece por ${textoCarga(prox, x.exId)} e acerte na 1ª série.`, regraId: r('progressao.calibracao') };
  }
  const sug = sugerirProgressao(semCalibracao(h), alvo, op);
  if (!sug.proxima) return sug;
  const { carga, ajustada } = noInventario(sug.proxima, op);
  return ajustada ? { ...sug, proxima: carga, motivo: `${sug.motivo} Aqui, o peso mais perto é ${textoCarga(carga, x.exId)}.` } : sug;
}

/**
 * Durante o treino: o exercício está em calibração enquanto não houver uma série de trabalho, nem no histórico (desta
 * chave de local) nem nesta sessão. Devolve o resultado da última série de acerto, para pré-preencher a próxima.
 */
export function calibracaoNaSessao(
  historico: Sessao[],
  x: Pick<ExercicioPrescrito, 'exId' | 'reps' | 'rir'>,
  inventario: Inventario,
  seriesDaSessao: SerieRegistrada[],
  opcoes: OpcoesSugestao = {},
): { calibrando: boolean; ultima?: ResultadoCalibracao } {
  const h = historicoDoExercicio(historico, x.exId, opcoes.local);
  const calibrando = emCalibracao(h) && !seriesDaSessao.some((s) => !s.calibracao);
  const s = seriesDaSessao.at(-1);
  if (!calibrando || !s) return { calibrando };
  return { calibrando, ultima: avaliarSerieDeCalibracao(s, x, inventario, opcoes) };
}

/** Avalia uma série feita em calibração: a próxima carga e se ela já caiu perto do alvo (vira série de trabalho). */
export function avaliarSerieDeCalibracao(
  s: Pick<SerieRegistrada, 'carga' | 'reps' | 'rir'>,
  x: Pick<ExercicioPrescrito, 'exId' | 'reps' | 'rir'>,
  inventario: Inventario,
  opcoes: OpcoesSugestao = {},
): ResultadoCalibracao {
  const op = opcoesCarga(x.exId, inventario);
  const c = calibrar(s, { reps: x.reps, rir: x.rir }, op, { soDesce: opcoes.soDesce });
  return { ...c, proxima: noInventario(c.proxima, op).carga };
}

/** Semana 1 de uma volta de pausa (readaptacao.semana1): a calibração não sobe a carga. */
export const soDesceNaSemana = (p: Programa, semana: number) => faseDaSemana(p, semana)?.regraId === 'readaptacao.semana1';

/** Lembrete de aquecimento antes do primeiro multiarticular de cada região (tempo.aquecimento; decisão 10). */
export function precisaAquecer(dia: DiaPrograma, indice: number): boolean {
  const INFERIORES = ['quadriceps', 'posteriores', 'gluteos', 'panturrilha'];
  const regiao = (x: ExercicioPrescrito) => (POR_ID[x.exId]?.musculos.primarios.some((m) => INFERIORES.includes(m)) ? 'inf' : 'sup');
  const x = dia.exercicios[indice];
  if (!x || x.tipo !== 'composto') return false;
  return !dia.exercicios.slice(0, indice).some((y) => y.tipo === 'composto' && regiao(y) === regiao(x));
}

export const REGRA_AQUECIMENTO = r('tempo.aquecimento');

/** Resumo de uma sessão terminada: séries feitas e efetivas por exercício. */
export function resumoSessao(s: Sessao) {
  const series = s.exercicios.flatMap((e) => e.series);
  return {
    exercicios: s.exercicios.filter((e) => e.series.length > 0).length,
    series: series.length,
    efetivas: series.filter((x) => x.rir <= 4 && x.amplitudeCompleta !== false).length,
    minutos: s.fim ? Math.max(1, Math.round((Date.parse(s.fim) - Date.parse(s.inicio)) / 60_000)) : undefined,
  };
}
