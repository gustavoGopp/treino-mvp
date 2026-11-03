import { z } from 'zod';
import { POR_ID } from '../biblioteca';
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
 * Os degraus de um exercício (o 0 é a base). O elástico sobe pelas intensidades que a pessoa informou (1 a N); sem o
 * inventário, a escada de 1 intensidade.
 */
export function escadaDe(exId: string | undefined, inventario?: Inventario): string[] {
  const e = exId ? POR_ID[exId] : undefined;
  if (e?.carga === 'elastico') {
    const n = Math.max(1, inventario?.elasticos?.intensidades ?? 1);
    return Array.from({ length: 3 * n }, (_, i) => degrauDoElastico(i));
  }
  const propria = exId ? ESCADAS[exId] : undefined;
  return propria ? [ESCADA_GENERICA[0]!, ...propria] : ESCADA_GENERICA;
}

/** Nome do degrau, para o texto da carga (o elástico não depende de quantas intensidades a pessoa tem). */
export const nomeDoDegrau = (exId: string | undefined, d: number): string | undefined =>
  exId && POR_ID[exId]?.carga === 'elastico' ? degrauDoElastico(d) : escadaDe(exId)[d];
