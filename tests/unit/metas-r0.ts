import { BIBLIOTECA, POR_ID } from '../../src/domain/biblioteca';
import { equipamentoDe, gerarPrograma, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { DIVISOES, DIVISAO_IDS } from '../../src/domain/gerador/divisoes';
import { NIVEIS, NIVEL_COMPLEXIDADE_MAX } from '../../src/domain/regras';
import { CAPACIDADES, capacidades, type Capacidade, type Inventario, type ItemId } from '../../src/domain/taxonomia/equipamentos';

// Metas do R0 (docs/PLANO-MVP.md, critério 4), medidas numa varredura do mesmo inventário:
// níveis × divisões × minutos × prioridades, como no pesquisa-v2/08, seção 3.1.
export const MINUTOS = [30, 45, 60, 75, 90];
export const PRIORIDADES: Grupo[][] = [[], ['peito', 'costas', 'ombros', 'pernas'], ['bracos', 'gluteos']];

export function varredura(base: Perfil, inv: Inventario): { perfil: Perfil; programa: Programa }[] {
  const out: { perfil: Perfil; programa: Programa }[] = [];
  for (const nivel of NIVEIS)
    for (const divisao of DIVISAO_IDS)
      for (const minutosSessao of MINUTOS)
        for (const prioridades of PRIORIDADES) {
          const perfil: Perfil = { ...base, nivel, divisao, diasSemana: DIVISOES[divisao].diasSemana, minutosSessao, prioridades, semanasParado: 0 };
          const r = gerarPrograma(perfil, inv);
          if (r.status === 'ok') out.push({ perfil, programa: r.programa });
        }
  return out;
}

export function medir(base: Perfil, inv: Inventario) {
  const progs = varredura(base, inv);
  const caps = capacidades(inv);
  const possiveis = BIBLIOTECA.filter((e) => e.requer.some((g) => g.every((c) => caps.has(c))) && e.complexidade <= NIVEL_COMPLEXIDADE_MAX.avancado);
  const usados = new Set(progs.flatMap(({ programa }) => programa.dias.flatMap((d) => d.exercicios.map((x) => x.exId))));
  const alternativas = new Set(progs.flatMap(({ programa }) => programa.dias.flatMap((d) => d.exercicios.flatMap((x) => x.alternativas))));
  // Equipamento sem exercício possível: nenhuma capacidade que só ele dá aparece num exercício possível.
  const semExercicio = (Object.keys(inv) as ItemId[]).filter((k) => {
    const dele = new Set((Object.keys(CAPACIDADES) as Capacidade[]).filter((c) => c !== 'apoio' && CAPACIDADES[c]({ [k]: inv[k] } as Inventario)));
    return !possiveis.some((e) => e.requer.some((g) => g.every((c) => caps.has(c)) && g.some((c) => dele.has(c))));
  });
  // Alternativas de outro equipamento, no melhor caso de cada exercício usado.
  const outras = new Map<string, number>();
  for (const { programa } of progs)
    for (const x of programa.dias.flatMap((d) => d.exercicios)) {
      const n = x.alternativas.filter((a) => equipamentoDe(POR_ID[a]!) !== equipamentoDe(POR_ID[x.exId]!)).length;
      outras.set(x.exId, Math.max(outras.get(x.exId) ?? 0, n));
    }
  return {
    programas: progs.length,
    possiveis: possiveis.map((e) => e.id),
    usados: [...usados].sort(),
    semVagaNemAlternativa: possiveis.map((e) => e.id).filter((id) => !usados.has(id) && !alternativas.has(id)),
    semExercicio,
    menosDe2Alternativas: [...outras].filter(([, n]) => n < 2).map(([id]) => id).sort(),
    progs,
  };
}
