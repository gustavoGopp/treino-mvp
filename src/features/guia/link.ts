import type { ContextoGuia } from '../../domain/sessao';

// Link para o guia com o contexto de quem abriu (R1): o guia mostra a prescrição da pessoa naquela semana.
export type OrigemGuia = 'programa' | 'treino';
export type ContextoLink = ContextoGuia & { de: OrigemGuia };

export function linkDoGuia(animacaoId: string, ctx: ContextoLink): string {
  const q = new URLSearchParams({ de: ctx.de, dia: ctx.diaId, ex: ctx.exId, ...(ctx.vaga ? { vaga: ctx.vaga } : {}) });
  return `/guia/${animacaoId}?${q.toString()}`;
}

export function lerContexto(params: URLSearchParams): ContextoLink | null {
  const de = params.get('de');
  const diaId = params.get('dia');
  const exId = params.get('ex');
  if ((de !== 'programa' && de !== 'treino') || !diaId || !exId) return null;
  const vaga = params.get('vaga');
  return { de, diaId, exId, ...(vaga ? { vaga } : {}) };
}
