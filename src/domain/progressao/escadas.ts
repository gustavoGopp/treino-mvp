import { z } from 'zod';
import { POR_ID } from '../biblioteca';
import type { Nivel } from '../regras';
import type { Inventario } from '../taxonomia/equipamentos';
import dados from './escadas.json';

// Escadas de dificuldade sem kg (progressao.escada-por-exercicio; progressao.escada-elastico; pesquisa-v2/10, tabela 5.3).
// O degrau 0 é o exercício como no guia; cada degrau seguinte o deixa mais difícil sem carga externa. A ordem é
// consenso (ninguém testou uma ordem de degraus); o que tem evidência é o princípio: cada degrau mantém a série perto
// da falha dentro de ~6–30 repetições. O app nunca sugere uma carga ou um elástico que a pessoa não tem.

/** Escada genérica, para quem não tem escada própria (progressao.incremento.peso-corporal). */
export const ESCADA_GENERICA = ['mais repetições', 'descida de 3 s ou pausa embaixo', 'variação mais difícil', 'variação mais difícil, com descida de 3 s'];

export const ESCADAS: Record<string, string[]> = z
  .record(z.array(z.string().min(1)).min(1))
  .superRefine((r, ctx) => {
    for (const id of Object.keys(r)) {
      const e = POR_ID[id];
      if (!e) ctx.addIssue({ code: 'custom', message: `escada de exercício fora da biblioteca: ${id}` });
      else if (e.carga === 'elastico') ctx.addIssue({ code: 'custom', message: `${id}: o elástico usa a escada das intensidades` });
    }
  })
  .parse(dados);

/** Nome do degrau i do elástico: em cada intensidade, normal → mais esticado → mais esticado com descida de 3 s. */
export function degrauDoElastico(i: number): string {
  const k = Math.floor(i / 3) + 1;
  const sub = i % 3;
  const pre = k === 1 ? '' : `intensidade ${k}`;
  if (sub === 0) return k === 1 ? 'mais repetições' : pre;
  const resto = sub === 1 ? 'mais esticado (um passo mais longe)' : 'mais esticado, com descida de 3 s';
  return pre ? `${pre}, ${resto}` : resto;
}

/**
 * A mini-band é item próprio (equipamento.mini-band): o exercício que pede a capacidade `mini_band` sobe pelas
 * intensidades dela, e não pelas dos elásticos longos.
 */
export const pedeMiniBand = (exId: string | undefined): boolean => !!exId && !!POR_ID[exId]?.requer.some((g) => g.includes('mini_band'));

/**
 * Nome do degrau i da mini-band: em cada intensidade, normal → pausa com a faixa esticada → pausa com descida de 3 s.
 * A faixa curta não tem "um passo mais longe", como o elástico longo; a pausa e a descida lenta não pedem nada (consenso).
 */
export function degrauDaMiniBand(i: number): string {
  const k = Math.floor(i / 3) + 1;
  const sub = i % 3;
  const pre = k === 1 ? '' : `intensidade ${k}`;
  if (sub === 0) return k === 1 ? 'mais repetições' : pre;
  const resto = sub === 1 ? 'pausa de 2 s com a faixa esticada' : 'pausa de 2 s com a faixa esticada, com descida de 3 s';
  return pre ? `${pre}, ${resto}` : resto;
}

/**
 * Os degraus de um exercício (o 0 é a base). O elástico sobe pelas intensidades que a pessoa informou (1 a N); sem o
 * inventário, a escada de 1 intensidade. A mini-band, pelas intensidades da mini-band.
 */
export function escadaDe(exId: string | undefined, inventario?: Inventario): string[] {
  const e = exId ? POR_ID[exId] : undefined;
  if (e?.carga === 'elastico') {
    const mini = pedeMiniBand(exId);
    const n = Math.max(1, (mini ? inventario?.mini_band?.intensidades : inventario?.elasticos?.intensidades) ?? 1);
    return Array.from({ length: 3 * n }, (_, i) => (mini ? degrauDaMiniBand(i) : degrauDoElastico(i)));
  }
  const propria = exId ? ESCADAS[exId] : undefined;
  return propria ? [ESCADA_GENERICA[0]!, ...propria] : ESCADA_GENERICA;
}

/** Nome do degrau, para o texto da carga (o elástico e a mini-band não dependem de quantas intensidades a pessoa tem). */
export const nomeDoDegrau = (exId: string | undefined, d: number): string | undefined =>
  exId && POR_ID[exId]?.carga === 'elastico' ? (pedeMiniBand(exId) ? degrauDaMiniBand(d) : degrauDoElastico(d)) : escadaDe(exId)[d];

/**
 * O 1º degrau de um exercício pelo nível (progressao.degrau-inicial, R5d): iniciante no 0, intermediário no 1, avançado
 * no 2 (no elástico, a intensidade do meio das que a pessoa tem, se for mais alta); nunca além do último degrau. É só o
 * ponto de partida da 1ª vez: o estado guardado continua sendo o índice do degrau.
 */
export function degrauInicial(exId: string | undefined, nivel: Nivel, inventario?: Inventario): number {
  const n = escadaDe(exId, inventario).length;
  let d = nivel === 'avancado' ? 2 : nivel === 'intermediario' ? 1 : 0;
  if (nivel === 'avancado' && exId && POR_ID[exId]?.carga === 'elastico') d = Math.max(d, 3 * Math.floor((n / 3 - 1) / 2));
  return Math.max(0, Math.min(d, n - 1));
}

/** O exercício para onde a escada leva no último degrau (progressao.negativa-para-barra). */
export const DEPOIS_DA_ESCADA: Record<string, string> = { 'barra-fixa-negativa': 'barra-fixa' };
