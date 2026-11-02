import type { Programa } from '../gerador';
import { sugerirProgressao, sugerirSemanaLeve } from '../progressao';
import { semCalibracao } from '../progressao/calibracao';
import { r, SEMANA_LEVE } from '../regras';
import { diaLocal, hojeNoPrograma, historicoDoExercicio, opcoesCarga, treinoFeito, type LocalDaCarga, type Sessao } from '../sessao';
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

/** Os exercícios do programa com dor de 3 a 5 nas 2 últimas sessões em que foram feitos. */
export function dorQueSeRepete(historico: Sessao[]): string[] {
  const ids = [...new Set(historico.flatMap((s) => s.exercicios.map((e) => e.exId)))];
  return ids.filter((id) => {
    const ult = historico
      .filter(treinoFeito)
      .map((s) => s.exercicios.filter((e) => e.exId === id).flatMap((e) => e.series))
      .filter((xs) => xs.length > 0)
      .slice(-2);
    const max = (xs: { dor?: number }[]) => Math.max(0, ...xs.map((x) => x.dor ?? 0));
    return ult.length === 2 && ult.every((xs) => max(xs) >= SEMANA_LEVE.dorMin && max(xs) <= SEMANA_LEVE.dorMax);
  });
}

/** A sugestão da semana leve de hoje, com os motivos, a carência e o aviso de dor. */
export function semanaLeveDeHoje(programa: Programa, historico: Sessao[], hojeIso: string, o: OpcoesSemanaLeve): SemanaLeveSugerida {
  const fuso = o.fusoMin ?? 0;
  const treinos = historico.filter(treinoFeito);
  const hoje = hojeNoPrograma(programa, historico, hojeIso, { fusoMin: fuso, ...(o.semanaLeve ? { semanaLeve: o.semanaLeve } : {}) });

  // 1) Exercícios estagnados (progressao.estagnacao), na dupla progressão do bloco de hoje.
  const vagas = new Map(programa.dias.flatMap((d) => d.exercicios.map((x) => [x.exId, x] as const)));
  const desde = hoje.bloco.pausaDias !== undefined ? hoje.bloco.inicio : undefined;
  let estagnados = 0;
  for (const [exId, x] of vagas) {
    const ultima = [...treinos].reverse().find((s) => s.exercicios.some((e) => e.exId === exId && e.series.length));
    if (!ultima) continue;
    const localId = o.localDe(ultima);
    const local: LocalDaCarga | undefined = localId ? { localId, ...(o.localPadrao ? { localPadrao: o.localPadrao } : {}) } : undefined;
    const h = semCalibracao(historicoDoExercicio(historico, exId, local, { semLeve: true, ...(desde ? { desde } : {}) }));
    if (sugerirProgressao(h, { reps: x.reps, rir: x.rir }, opcoesCarga(exId, o.inventario(localId))).acao === 'estagnado') estagnados++;
  }

  // 2) "Pesado demais" nos últimos 3 treinos (o toque opcional do fim do treino).
  const pesado = treinos.slice(-SEMANA_LEVE.pesadoDe).filter((s) => s.hojeFoi === 'pesado').length;

  // 3) Dor que se repete: soma à regra de dor, nunca no lugar dela.
  const comDor = dorQueSeRepete(historico);
  const dor: AvisoDeDor | undefined = comDor.length
    ? {
        exIds: comDor,
        texto:
          'Dor de 3 a 5 no mesmo exercício em 2 treinos seguidos: reduza a carga, encurte a amplitude ou use a alternativa. Se piorar ou durar mais de 1 a 2 semanas, procure avaliação profissional.',
        regraId: r('seguranca.dor.escala'),
      }
    : undefined;

  // Carência: as 3 semanas depois de uma volta de pausa, a semana leve em curso e as 3 semanas depois dela.
  const dias = SEMANA_LEVE.carenciaSemanas * 7;
  const depoisDaVolta = hoje.bloco.pausaDias !== undefined && hoje.semana <= SEMANA_LEVE.carenciaSemanas;
  const depoisDaLeve = !!o.semanaLeve && diaLocal(hojeIso, fuso) - diaLocal(o.semanaLeve.inicio, fuso) < SEMANA_LEVE.dias + dias;
  const carencia = depoisDaVolta || depoisDaLeve;

  const s = sugerirSemanaLeve({ exerciciosEstagnados: estagnados, pesadoNosUltimos3: pesado, dorQueSeRepete: comDor.length, carencia });
  return { ...s, carencia, ...(dor ? { dor } : {}) };
}
