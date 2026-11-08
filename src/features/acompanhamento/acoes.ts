import { resumoDaSemana, type ResumoDaSemana } from '../../domain/acompanhamento/semana';
import { semanaLeveDeHoje } from '../../domain/acompanhamento/semana-leve';
import { calibracaoDoTempo } from '../../domain/acompanhamento/tempo';
import { SEMANA_LEVE } from '../../domain/regras';
import { diaLocal, semanaLeveAtiva, treinoFeito } from '../../domain/sessao';
import { localDaSessao, localDoPrograma, localPorId, type Estado } from '../../storage/esquema';
import { comProgramaNovo } from '../app/estado';

// Ações do acompanhamento (R2), estado → estado. Puras: quem chama passa a data de agora e o fuso do aparelho.
// Nada aqui muda o programa sem um toque da pessoa (decisão do Gustavo: o programa salvo só muda quando ela pede).

/** "A sua semana" a partir do estado salvo (null antes do programa). */
export function semanaDoEstado(e: Estado, agora: string, fusoMin = 0): ResumoDaSemana | null {
  if (!e.programa || !e.rotina) return null;
  return resumoDaSemana(e.programa.programa, e.historico, agora, {
    fusoMin,
    planejados: e.rotina.diasSemana,
    ...(e.semanaLeve ? { semanaLeve: e.semanaLeve } : {}),
    ...(e.respostas?.revisaoMetaEm ? { revisaoRespondidaEm: e.respostas.revisaoMetaEm } : {}),
  });
}

const comResposta = (e: Estado, chave: keyof NonNullable<Estado['respostas']>, agora: string): Estado => ({
  ...e,
  respostas: { ...e.respostas, [chave]: agora },
});

/** Revisão da meta aceita: o programa é gerado de novo com menos dias, e a divisão volta a ser a recomendada. */
export function aceitarMenosDias(e: Estado, dias: 2 | 3 | 4 | 5, agora: string): Estado {
  if (!e.rotina) return e;
  const { divisao, ...rotina } = e.rotina;
  void divisao;
  return comProgramaNovo(comResposta({ ...e, rotina: { ...rotina, diasSemana: dias }, ajustes: undefined }, 'revisaoMetaEm', agora), agora);
}

/** "Manter": o programa não muda, e a oferta some por 4 semanas. */
export const manterDias = (e: Estado, agora: string): Estado => comResposta(e, 'revisaoMetaEm', agora);

export { comResposta };

/** A semana leve de hoje (sugestão, carência e aviso de dor), a partir do estado salvo. */
export function semanaLeveDoEstado(e: Estado, agora: string, fusoMin = 0) {
  if (!e.programa) return null;
  const sug = semanaLeveDeHoje(e.programa.programa, e.historico, agora, {
    fusoMin,
    inventario: (id) => (localPorId(e, id) ?? localDoPrograma(e))?.inventario ?? {},
    localDe: (s) => localDaSessao(e, s),
    ...(e.locais?.[0] ? { localPadrao: e.locais[0].id } : {}),
    ...(e.semanaLeve ? { semanaLeve: e.semanaLeve } : {}),
  });
  const ativa = semanaLeveAtiva(e.semanaLeve, agora, fusoMin);
  // "Agora não" esconde a sugestão por 7 dias (deload.semana-leve; R5a). Antes, só até o próximo treino.
  const recusa = e.respostas?.semanaLeveEm;
  const recusada = !!recusa && diaLocal(agora, fusoMin) - diaLocal(recusa, fusoMin) < SEMANA_LEVE.recusaDias;
  return { ...sug, ativa, mostrar: sug.sugerir && !ativa && !recusada, ...(ativa && e.semanaLeve ? { ate: fimDaSemanaLeve(e.semanaLeve.inicio) } : {}) };
}

/** O último dia da semana leve (o 7º dia a partir do aceite), AAAA-MM-DD. */
const fimDaSemanaLeve = (inicio: string) => new Date(Date.parse(inicio) + (SEMANA_LEVE.dias - 1) * 86_400_000).toISOString().slice(0, 10);

/** "Fazer a semana leve": vale por 7 dias a partir de agora (decisão do Gustavo, 02/11/2026). O programa salvo não muda. */
export const aceitarSemanaLeve = (e: Estado, agora: string): Estado => ({ ...e, semanaLeve: { inicio: agora } });
/** "Voltar ao normal": encerra a semana leve antes dos 7 dias. */
export const encerrarSemanaLeve = (e: Estado, agora: string): Estado => (e.semanaLeve ? { ...e, semanaLeve: { ...e.semanaLeve, encerradaEm: agora } } : e);
/** "Agora não": a sugestão some por 7 dias (deload.semana-leve; R5a). */
export const recusarSemanaLeve = (e: Estado, agora: string): Estado => comResposta(e, 'semanaLeveEm', agora);

/** O toque opcional do fim do treino: um toque marca, tocar de novo desfaz (nada vem marcado). */
export function marcarHojeFoi(e: Estado, sessaoId: string, valor: 'leve' | 'normal' | 'pesado'): Estado {
  return {
    ...e,
    historico: e.historico.map((s) => {
      if (s.id !== sessaoId) return s;
      if (s.hojeFoi === valor) {
        const { hojeFoi, ...resto } = s;
        void hojeFoi;
        return resto;
      }
      return { ...s, hojeFoi: valor };
    }),
  };
}

/** A proposta de ajuste do tempo estimado (tempo.calibracao), escondida depois de um "Não" até o próximo treino. */
export function tempoDoEstado(e: Estado, fusoMin = 0) {
  if (!e.programa) return null;
  const c = calibracaoDoTempo(e.programa.programa, e.historico, { fusoMin, ...(e.margemTempo !== undefined ? { margemAtual: e.margemTempo } : {}) });
  const ultimoFim = e.historico.filter(treinoFeito).at(-1)?.fim;
  const recusada = !!e.respostas?.tempoEm && (!ultimoFim || Date.parse(e.respostas.tempoEm) > Date.parse(ultimoFim));
  return c && !recusada ? c : null;
}
/** "Ajustar": a margem pessoal entra no perfil; o aviso "Há uma versão nova do seu programa" oferece atualizar. */
export const aceitarMargemTempo = (e: Estado, margem: number, agora: string): Estado => comResposta({ ...e, margemTempo: margem }, 'tempoEm', agora);
/** "Não": nada muda, e a proposta some até o próximo treino. */
export const recusarMargemTempo = (e: Estado, agora: string): Estado => comResposta(e, 'tempoEm', agora);
