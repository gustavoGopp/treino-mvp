// Os 55 cenários de equipamento (docs/revisoes/catalogo/cenarios.md): os 12 cenários da auditoria do treino (fora
// "peso-corpo", que é o "vazio"), o inventário vazio, os 49 itens sozinhos e os 5 pares de casa, agrupados em classes.
// Cenários que abrem os mesmos exercícios (mesmas capacidades, condições e cargas) geram o mesmo programa: cada classe
// roda uma vez, representada pelo 1º da lista. Extraído de scripts/auditoria/catalogo.ts na sessão de qualidade dos
// treinos (05/11/2026), para o estresse de qualidade usar a mesma lista. Nada aqui é dado de uma pessoa real.
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { CENARIOS } from './cenarios';
import { CENARIOS_MIN, chaveDaClasse } from './minimo-cenarios';

export type GrupoDeCenario = 'atalho' | 'vazio' | 'item' | 'par' | 'persona';
export type Cen = { id: string; nome: string; inventario: Inventario; grupo: GrupoDeCenario };

const ATALHOS_IDS = new Set(['casa', 'casa+', 'condominio', 'condominio+', 'academia', 'academia+']);
/** Os 67 cenários, antes de agrupar. */
export const TODOS_OS_CENARIOS: Cen[] = [
  ...CENARIOS.filter((c) => c.id !== 'peso-corpo').map((c) => ({ id: c.id, nome: c.nome, inventario: c.inventario, grupo: ATALHOS_IDS.has(c.id) ? ('atalho' as const) : ('persona' as const) })),
  ...CENARIOS_MIN.map((c) => ({ id: c.tipo === 'item' ? `so:${c.id}` : c.id, nome: c.nome, inventario: c.inventario, grupo: c.tipo })),
];
const classes = new Map<string, Cen[]>();
for (const c of TODOS_OS_CENARIOS) {
  const k = chaveDaClasse(c.inventario);
  classes.set(k, [...(classes.get(k) ?? []), c]);
}
/** As 55 classes: o 1º cenário de cada uma representa as outras. */
export const CENARIOS_55: Cen[] = [...classes.values()].map((cs) => cs[0]!);
/** Os cenários que dão o mesmo programa que `c` (ele incluído, em 1º). */
export const membrosDaClasse = (c: Cen): Cen[] => classes.get(chaveDaClasse(c.inventario))!;
