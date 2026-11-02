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
