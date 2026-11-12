import type { ExercicioPrescrito, Programa } from '../gerador';
import { sugerirProgressao, sugerirSemanaLeve } from '../progressao';
import { semCalibracao } from '../progressao/calibracao';
import { DOR, r, SEMANA_LEVE } from '../regras';
import { diaLocal, dorDoExercicio, hojeNoPrograma, historicoDoExercicio, naFaseDeAprendizado, opcoesCarga, prescricaoDaVaga, treinoFeito, type LocalDaCarga, type Sessao } from '../sessao';
import type { Inventario } from '../taxonomia/equipamentos';

// Os sinais da semana leve (deload.semana-leve; pesquisa-v2/07, seção 6): 2 exercícios estagnados, "pesado demais" em
// 2 dos últimos 3 treinos, ou dor de 3 a 5 no mesmo exercício em 2 sessões seguidas. A dor que se repete mostra também
// o aviso de dor e de avaliação (seguranca.dor.escala), que vale sempre, mesmo quando a semana leve não é sugerida.

export type AvisoDeDor = { exIds: string[]; texto: string; regraId: string };
export type SemanaLeveSugerida = ReturnType<typeof sugerirSemanaLeve> & {
  /** Não sugere: nas 3 semanas depois de uma volta de pausa ou de uma semana leve, ou com a semana leve em curso. */
  carencia: boolean;
  dor?: AvisoDeDor;
};

export type OpcoesSemanaLeve = {
  fusoMin?: number;
  /** Inventário de um local (para as opções de carga de cada exercício). */
  inventario: (localId: string | undefined) => Inventario;
  /** O local de uma sessão (as de antes do R1b são do 1º local). */
  localDe: (s: Sessao) => string | undefined;
  localPadrao?: string;
  semanaLeve?: { inicio: string; encerradaEm?: string };
};

/**
 * Dor que se repete (seguranca.dor.escala): os exercícios com nota de 3 ou mais nas 2 últimas sessões em que foram
 * tentados. Conta a nota das séries e a dada antes da 1ª série (o exercício encerrado pela dor não tem série).
 */
export function dorRepetida(historico: Sessao[]): { exId: string; notas: number[] }[] {
  const ids = [...new Set(historico.flatMap((s) => s.exercicios.map((e) => e.exId)))];
  return ids.flatMap((exId) => {
    const notas = historico
      .filter((s) => !!s.fim)
      .map((s) => s.exercicios.filter((e) => e.exId === exId && (e.series.length > 0 || e.dorSemSerie !== undefined)))
      .filter((es) => es.length > 0)
      .slice(-2)
      .map((es) => Math.max(...es.map(dorDoExercicio)));
    return notas.length === 2 && notas.every((n) => n >= DOR.ajustarDe) ? [{ exId, notas }] : [];
  });
}

/** O gatilho da semana leve (deload.semana-leve): dor de 3 a 5 nas 2 vezes. Acima de 5, a saída é a alternativa. */
export function dorQueSeRepete(historico: Sessao[]): string[] {
  return dorRepetida(historico)
    .filter((d) => d.notas.every((n) => n <= SEMANA_LEVE.dorMax))
    .map((d) => d.exId);
}

/** A sugestão da semana leve de hoje, com os motivos, a carência e o aviso de dor. */
export function semanaLeveDeHoje(programa: Programa, historico: Sessao[], hojeIso: string, o: OpcoesSemanaLeve): SemanaLeveSugerida {
  const fuso = o.fusoMin ?? 0;
  const treinos = historico.filter(treinoFeito);
  const hoje = hojeNoPrograma(programa, historico, hojeIso, { fusoMin: fuso, ...(o.semanaLeve ? { semanaLeve: o.semanaLeve } : {}) });

  // 1) Exercícios estagnados (progressao.estagnacao), na dupla progressão do bloco de hoje. Conta o exercício feito na
  // vaga da última vez (a alternativa, numa troca: `noLugarDe`), e não a vaga que ninguém fez (R5a; D2).
  const vagas = new Map(programa.dias.flatMap((d) => d.exercicios.map((x) => [x.exId, x] as const)));
  const desde = hoje.bloco.pausaDias !== undefined ? hoje.bloco.inicio : undefined;
  const feitos = new Map<string, { x: Pick<ExercicioPrescrito, 'reps' | 'rir'>; ultima: Sessao }>();
  for (const [vaga, prescrito] of vagas) {
    const ultima = [...treinos].reverse().find((s) => s.exercicios.some((e) => (e.noLugarDe ?? e.exId) === vaga && e.series.length));
    const feito = [...(ultima?.exercicios ?? [])].reverse().find((e) => (e.noLugarDe ?? e.exId) === vaga && e.series.length);
    if (!ultima || !feito || feitos.has(feito.exId)) continue;
    feitos.set(feito.exId, { x: prescricaoDaVaga(prescrito, feito.exId), ultima });
  }
  let estagnados = 0;
  for (const [exId, { x, ultima }] of feitos) {
    const localId = o.localDe(ultima);
    const local: LocalDaCarga | undefined = localId ? { localId, ...(o.localPadrao ? { localPadrao: o.localPadrao } : {}) } : undefined;
    const h = semCalibracao(historicoDoExercicio(historico, exId, local, { semLeve: true, ...(desde ? { desde } : {}) }));
    if (sugerirProgressao(h, { reps: x.reps, rir: x.rir }, opcoesCarga(exId, o.inventario(localId))).acao === 'estagnado') estagnados++;
  }

  // 2) "Pesado demais" nos últimos 3 treinos (o toque opcional do fim do treino).
  const pesado = treinos.slice(-SEMANA_LEVE.pesadoDe).filter((s) => s.hojeFoi === 'pesado').length;

  // 3) Dor que se repete: soma à regra de dor, nunca no lugar dela. O aviso vale para toda dor de 3 ou mais nas 2
  // últimas vezes; a semana leve, só para a de 3 a 5 (acima de 5 o exercício já foi encerrado).
  const repetida = dorRepetida(historico);
  const comDor = dorQueSeRepete(historico);
  const alta = repetida.some((d) => d.notas.some((n) => n > DOR.ajustarAte));
  const dor: AvisoDeDor | undefined = repetida.length
    ? {
        exIds: repetida.map((d) => d.exId),
        texto: alta
          ? `Dor no mesmo exercício em 2 treinos seguidos, com nota acima de ${DOR.ajustarAte}: use a alternativa e procure avaliação profissional.`
          : `Dor de ${DOR.ajustarDe} a ${DOR.ajustarAte} no mesmo exercício em 2 treinos seguidos: reduza a carga, encurte a amplitude ou use a alternativa. Se piorar ou durar mais de 1 a 2 semanas, procure avaliação profissional.`,
        regraId: r('seguranca.dor.escala'),
      }
    : undefined;

  // Carência: as 3 semanas depois de uma volta de pausa, a semana leve em curso e as 3 semanas depois dela.
  const dias = SEMANA_LEVE.carenciaSemanas * 7;
  const depoisDaVolta = hoje.bloco.pausaDias !== undefined && hoje.semana <= SEMANA_LEVE.carenciaSemanas;
  const depoisDaLeve = !!o.semanaLeve && diaLocal(hojeIso, fuso) - diaLocal(o.semanaLeve.inicio, fuso) < SEMANA_LEVE.dias + dias;
  // A fase de aprendizado do iniciante também é carência (iniciante.fase-aprendizado; R5a).
  const carencia = depoisDaVolta || depoisDaLeve || naFaseDeAprendizado(hoje);

  const s = sugerirSemanaLeve({ exerciciosEstagnados: estagnados, pesadoNosUltimos3: pesado, dorQueSeRepete: comDor.length, carencia });
  return { ...s, carencia, ...(dor ? { dor } : {}) };
}
