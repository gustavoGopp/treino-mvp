import { NIVEIS, r, type Nivel } from '../regras';

// Classificação de nível no onboarding (nivel.classificacao). Na dúvida, classifica para baixo:
// errar para baixo custa pouco (a progressão corrige), errar para cima expõe a volume e complexidade maiores.
// Decisão e fontes: docs/pesquisa/09-decisoes-m3.md, seção 2.

// "Nunca treinei" (lote M1 da análise crítica, 19/11/2026): antes, quem nunca treinou marcava "parei há mais de 6
// meses" e caía na volta de pausa (readaptacao.semana1: metade das séries, 2 viravam 1, e um texto sobre "a carga que
// você usava antes da pausa"). Agora é uma resposta própria: iniciante, zero semana parada, fase de aprendizado.
export const TEMPOS_DE_TREINO = [
  { id: 'nunca', texto: 'Nunca treinei' },
  { id: 'menos-6m', texto: 'Menos de 6 meses' },
  { id: '6-24m', texto: 'De 6 meses a 2 anos' },
  { id: 'mais-24m', texto: 'Mais de 2 anos' },
] as const;
export type TempoDeTreino = (typeof TEMPOS_DE_TREINO)[number]['id'];

export const CONFIANCA_TECNICA = [
  { id: 'sim', texto: 'Sim' },
  { id: 'mais-ou-menos', texto: 'Mais ou menos' },
  { id: 'nao', texto: 'Não' },
] as const;
export type ConfiancaTecnica = (typeof CONFIANCA_TECNICA)[number]['id'];

export type RespostasNivel = {
  /** Tempo de treino de força contínuo, sem pausas longas. */
  tempoContinuo: TempoDeTreino;
  /** Semanas sem treinar até hoje (0 = treinando). */
  semanasParado: number;
  tecnica: ConfiancaTecnica;
};

/**
 * Quem nunca treinou não responde a pausa nem a técnica: não há pausa de algo que não começou, nem técnica para
 * confiar. Vale zero semana parada (não é volta de pausa) e técnica "não" (o lado de baixo da regra).
 */
export const RESPOSTAS_DE_QUEM_NUNCA_TREINOU: RespostasNivel = { tempoContinuo: 'nunca', semanasParado: 0, tecnica: 'nao' };

/** Pausa a partir da qual a pessoa volta como iniciante (~6 meses parado). */
export const SEMANAS_PARADO_INICIANTE = 26;

/**
 * Faixas de pausa que a pessoa escolhe com um toque, em vez de contar semanas.
 * Cada faixa guarda um número de semanas representativo, alinhado aos limites de readaptacao.gatilho
 * (< 2: normal; 2 a < 3: 1ª sessão com RIR +1; ≥ 3: protocolo) e de nivel.classificacao (> ~6 meses: iniciante).
 */
export const PAUSAS = [
  { id: 'treinando', texto: 'Estou treinando (ou parei há menos de 2 semanas)', semanas: 0 },
  { id: '2-semanas', texto: 'Parei há umas 2 semanas', semanas: 2 },
  { id: '3-semanas-6-meses', texto: 'Parei há 3 semanas a 6 meses', semanas: 12 },
  { id: 'mais-6-meses', texto: 'Parei há mais de 6 meses', semanas: SEMANAS_PARADO_INICIANTE + 4 },
] as const;
export type PausaId = (typeof PAUSAS)[number]['id'];

/** Faixa correspondente a um número de semanas (para reabrir o formulário com o valor salvo). */
export function pausaDe(semanas: number): PausaId {
  if (semanas < 2) return 'treinando';
  if (semanas < 3) return '2-semanas';
  if (semanas <= SEMANAS_PARADO_INICIANTE) return '3-semanas-6-meses';
  return 'mais-6-meses';
}

export type Classificacao = { nivel: Nivel; motivo: string; regraId: string };

export function classificarNivel(r0: RespostasNivel): Classificacao {
  const regraId = r('nivel.classificacao');
  if (r0.tempoContinuo === 'nunca') return { nivel: 'iniciante', motivo: 'Nunca treinou: começamos pelo aprendizado.', regraId };
  if (r0.tecnica !== 'sim')
    return { nivel: 'iniciante', motivo: 'Sem confiança total na técnica básica: começamos pelo aprendizado.', regraId };
  if (r0.semanasParado > SEMANAS_PARADO_INICIANTE)
    return { nivel: 'iniciante', motivo: 'Mais de ~6 meses parado: o corpo volta a responder como o de quem está começando.', regraId };
  if (r0.tempoContinuo === 'menos-6m') return { nivel: 'iniciante', motivo: 'Menos de ~6 meses de treino contínuo.', regraId };
  if (r0.tempoContinuo === '6-24m')
    return { nivel: 'intermediario', motivo: 'De ~6 meses a ~2 anos de treino contínuo, com técnica estável.', regraId };
  return { nivel: 'avancado', motivo: 'Mais de ~2 anos de treino contínuo, com técnica estável.', regraId };
}

/** Níveis que a pessoa pode escolher: o sugerido ou abaixo dele, nunca acima. */
export const niveisPermitidos = (sugerido: Nivel): Nivel[] => NIVEIS.slice(0, NIVEIS.indexOf(sugerido) + 1);

export const NOME_NIVEL: Record<Nivel, string> = { iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' };
