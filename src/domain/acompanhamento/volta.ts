import { r } from '../regras';
import type { Hoje } from '../sessao/bloco';

// A mensagem de volta de uma pausa (readaptacao.durante-uso e acompanhamento.mensagens; pesquisa-v2/07, seções 3 e 4.4).
// Sem culpa: nada de "você parou", contagem de faltas, "perdeu" ou "deveria". Fato + o que muda hoje.

export type MensagemDeVolta = {
  titulo: string;
  texto: string;
  /** Mais de 182 dias: a proposta de refazer o nível (nada muda sem a escolha da pessoa). */
  refazerNivel: boolean;
  regraId: string;
};

/** "22 dias", "10 semanas", "7 meses": a pausa dita do jeito que se fala. */
export function tempoDaPausa(dias: number): string {
  if (dias <= 56) return `${dias} dias`;
  if (dias <= 182) return `${Math.floor(dias / 7)} semanas`;
  const meses = Math.floor(dias / 30.4);
  return meses >= 24 ? `${Math.floor(meses / 12)} anos` : `${meses} meses`;
}

/** A mensagem que o "Seu treino" mostra antes do 1º treino depois de uma pausa de 14 dias ou mais (null: nenhuma). */
export function mensagemDeVolta(hoje: Pick<Hoje, 'diasSemTreino' | 'faixa' | 'bloco'>): MensagemDeVolta | null {
  const d = hoje.diasSemTreino;
  if (d === undefined || !hoje.faixa || hoje.faixa === 'normal') return null;
  const titulo = 'Bem-vindo de volta!';
  const faz = `Faz ${tempoDaPausa(d)} do último treino.`;
  if (hoje.faixa === 'rir+1')
    return { titulo, texto: `${faz} No 1º treino de cada dia, 1 repetição a mais de reserva; a carga é a mesma.`, refazerNivel: false, regraId: r('readaptacao.durante-uso') };
  const pct = Math.round(hoje.bloco.reducao * 100);
  if (hoje.faixa === 'refazer-nivel')
    return {
      titulo,
      texto: `${faz} Estas 2 semanas vão mais leves, para o corpo se readaptar sem dor, e a 1ª série de cada exercício acerta a carga, começando ${pct}% abaixo da última vez. Quer refazer o nível? Leva 1 minuto.`,
      refazerNivel: true,
      regraId: r('readaptacao.durante-uso'),
    };
  const musculo = d <= 28 ? ' O músculo não some em 3 semanas.' : '';
  return {
    titulo,
    texto: `${faz} Estas 2 semanas vão mais leves, para o corpo se readaptar sem dor.${musculo} A carga começa ${pct}% abaixo da última vez e já vem preenchida.`,
    refazerNivel: false,
    regraId: r('readaptacao.durante-uso'),
  };
}

/**
 * A partir de quantos dias sem treino a pessoa é recebida (lote M5 da análise crítica, 22/11/2026). O roteiro do lote
 * pede "entre 3 e 13 dias"; com 2 ou 3 treinos por semana, 3 dias é o intervalo normal entre dois treinos, e a recepção
 * viraria ruído. Por isso conta a partir de 2 dias além do intervalo da rotina (7 ÷ treinos por semana, para cima), e
 * nunca antes de 3: 6 dias com 2 treinos por semana, 5 com 3, 4 com 4 ou mais. [opinião]
 */
export function diasParaRecepcao(planejados: number): number {
  return Math.max(3, Math.ceil(7 / Math.max(1, planejados)) + 2);
}

/**
 * A recepção de quem volta depois de alguns dias, antes de a pausa mudar o treino (até 13 dias; de 14 em diante vale a
 * mensagem de volta, acima). No mesmo tom: o fato e o que vale hoje, sem "você parou" nem contagem de faltas.
 * Só com o treino normal: na volta gradual e na semana leve, a tela já diz o que muda. Null: nenhuma recepção.
 */
export function recepcaoCurta(hoje: Pick<Hoje, 'diasSemTreino' | 'faixa' | 'fase'>, planejados: number): string | null {
  const d = hoje.diasSemTreino;
  // a fase que corta séries (começo leve, volta gradual, semana leve) já tem a sua linha na tela
  if (d === undefined || hoje.faixa !== 'normal' || (hoje.fase && hoje.fase.fatorSeries < 1) || d < diasParaRecepcao(planejados)) return null;
  return `Bom te ver de novo. Faz ${tempoDaPausa(d)} do último treino, e a carga é a mesma.`;
}
