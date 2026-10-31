import { NIVEIS, r, type Nivel } from '../regras';

// Classificação de nível no onboarding (nivel.classificacao). Na dúvida, classifica para baixo:
// errar para baixo custa pouco (a progressão corrige), errar para cima expõe a volume e complexidade maiores.
// Decisão e fontes: docs/pesquisa/09-decisoes-m3.md, seção 2.

export const TEMPOS_DE_TREINO = [
  { id: 'menos-6m', texto: 'Menos de 6 meses' },
  { id: '6-24m', texto: 'De 6 meses a 2 anos' },
  { id: 'mais-24m', texto: 'Mais de 2 anos' },
] as const;
export type TempoDeTreino = (typeof TEMPOS_DE_TREINO)[number]['id'];

export const CONFIANCA_TECNICA = [
  { id: 'sim', texto: 'Sim, faço os exercícios básicos com segurança' },
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

/** Pausa a partir da qual a pessoa volta como iniciante (~6 meses parado). */
export const SEMANAS_PARADO_INICIANTE = 26;

export type Classificacao = { nivel: Nivel; motivo: string; regraId: string };

export function classificarNivel(r0: RespostasNivel): Classificacao {
  const regraId = r('nivel.classificacao');
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
