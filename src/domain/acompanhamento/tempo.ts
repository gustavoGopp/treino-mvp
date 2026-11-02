import { colchaoDe, minutos, type Programa } from '../gerador';
import { r } from '../regras';
import { hojeDaSessao, resumoSessao, treinoFeito, type Sessao } from '../sessao';

// Calibração do tempo (tempo.calibracao; pesquisa-v2/05, seção 5): depois de 3 treinos terminados, o tempo real
// registrado ajusta a margem pessoal do tempo estimado, no lugar dos 10% fixos (tempo.colchao). É medição da própria
// pessoa, não um estudo. Só propõe; nada muda sem o aceite.

export const TEMPO_CALIBRACAO = {
  sessoesMin: 3,
  ultimas: 6,
  feitoMin: 0.8, // só conta o treino com 80% ou mais das séries prescritas
  diferencaMin: 5, // só oferece com 5 min ou mais de diferença
  margemMin: -0.1,
  margemMax: 0.5,
};

export type CalibracaoDoTempo = {
  sessoes: number;
  /** Diferença média, em minutos, entre o real e o estimado com a margem de hoje (positiva = demora mais). */
  diferenca: number;
  /** A margem pessoal proposta (no lugar da de hoje). */
  margem: number;
  texto: string;
  regraId: string;
};

const mediana = (xs: number[]) => {
  const o = [...xs].sort((a, b) => a - b);
  const m = Math.floor(o.length / 2);
  return o.length % 2 ? o[m]! : (o[m - 1]! + o[m]!) / 2;
};

/** A proposta de ajuste do tempo estimado, ou null (poucos treinos, diferença pequena ou já ajustado). */
export function calibracaoDoTempo(programa: Programa, historico: Sessao[], o: { margemAtual?: number; fusoMin?: number } = {}): CalibracaoDoTempo | null {
  const atual = colchaoDe({ ...(o.margemAtual !== undefined ? { margemTempo: o.margemAtual } : {}) });
  const medidas = historico
    .filter((s) => treinoFeito(s) && !s.encerradaPorAlerta)
    .flatMap((s) => {
      const dia = hojeDaSessao(programa, historico, s, o.fusoMin).dias.find((d) => d.id === s.diaId);
      const real = resumoSessao(s).minutos;
      if (!dia || real === undefined) return [];
      const prescritas = dia.exercicios.reduce((t, x) => t + x.series, 0);
      const feitas = s.exercicios.reduce((t, e) => t + e.series.length, 0);
      if (!prescritas || feitas / prescritas < TEMPO_CALIBRACAO.feitoMin) return [];
      const base = minutos(dia.exercicios, 0);
      return base > 0 ? [{ real, base }] : [];
    })
    .slice(-TEMPO_CALIBRACAO.ultimas);
  if (medidas.length < TEMPO_CALIBRACAO.sessoesMin) return null;
  const margem = Math.round(Math.min(TEMPO_CALIBRACAO.margemMax, Math.max(TEMPO_CALIBRACAO.margemMin, mediana(medidas.map((m) => m.real / m.base)) - 1)) * 100) / 100;
  const diferenca = Math.round(medidas.reduce((t, m) => t + (m.real - m.base * (1 + atual)), 0) / medidas.length);
  if (Math.abs(diferenca) < TEMPO_CALIBRACAO.diferencaMin || Math.abs(margem - atual) < 0.05) return null;
  const quanto = `cerca de ${Math.abs(diferenca)} min a ${diferenca > 0 ? 'mais' : 'menos'}`;
  return {
    sessoes: medidas.length,
    diferenca,
    margem,
    texto: `Seus treinos levam ${quanto} que o previsto (nos últimos ${medidas.length}). Ajustar a estimativa do tempo?`,
    regraId: r('tempo.calibracao'),
  };
}
