// Apoio de scripts/auditoria/ver.ts: monta o perfil fictício de um pedido e escreve o programa em texto curto
// (sessão "treino para todos", 12/11/2026). Só dados fictícios.
import { POR_ID, type Articulacao } from '../../src/domain/biblioteca';
import { MUSCULOS_COM_META, seriesDeVolume, type Grupo, type Objetivo, type Perfil, type Programa } from '../../src/domain/gerador';
import { DIVISAO_IDS, DIVISOES, type DiasSemana, type DivisaoId } from '../../src/domain/gerador/divisoes';
import type { Nivel } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { respostasNenhuma } from '../../src/domain/triagem';
import { TODOS_OS_CENARIOS } from './cenarios-55';

export type Pedido = { cenario: string; nivel: Nivel; dias: string; min: number; focos: Grupo[]; objetivo?: Objetivo; dores: { articulacao: Articulacao; nota: number }[]; semanasParado: number };

export function inventarioDe(id: string): Inventario {
  const c = TODOS_OS_CENARIOS.find((x) => x.id === id);
  if (!c) throw new Error(`cenário desconhecido: ${id}. Opções: ${TODOS_OS_CENARIOS.map((x) => x.id).join(', ')}`);
  return c.inventario;
}

export function perfilDe(p: Pedido): Perfil {
  const divisao = (DIVISAO_IDS as readonly string[]).includes(p.dias) ? (p.dias as DivisaoId) : undefined;
  return {
    nivel: p.nivel,
    ...(p.objetivo ? { objetivo: p.objetivo } : {}),
    semanasParado: p.semanasParado,
    diasSemana: divisao ? DIVISOES[divisao].diasSemana : (Number(p.dias) as DiasSemana),
    ...(divisao ? { divisao } : {}),
    minutosSessao: p.min,
    prioridades: p.focos,
    evitarExercicios: [],
    evitarEquipamentos: [],
    triagem: { respostas: { ...respostasNenhuma(), osteoarticular: p.dores.length > 0 }, ...(p.dores.length ? { dores: p.dores } : {}) },
  };
}

const fmt = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');

/** O programa em texto: um dia por bloco, uma linha por exercício, depois as séries por músculo e os avisos. */
export function textoDoPrograma(programa: Programa, opts: { avisos?: boolean; porque?: boolean } = {}): string {
  const out: string[] = [`Divisão: ${programa.divisao}`];
  for (const d of programa.dias) {
    out.push(`\n${d.nome} (~${d.minutosEstimados} min)`);
    for (const x of d.exercicios) {
      const e = POR_ID[x.exId]!;
      const extra = [x.dropSet ? 'drop set' : '', x.supersetCom ? `bi-set com ${POR_ID[x.supersetCom]!.nome}` : '', x.animacaoId ? '' : 'cartão'].filter(Boolean).join('; ');
      out.push(
        `  ${x.series} × ${x.reps[0]}–${x.reps[1]}  ${e.nome}${x.unilateral ? ' (cada lado)' : ''}  · reserva ${x.rir[0]}–${x.rir[1]} · descanso ${x.descansoSeg}s${extra ? ` · ${extra}` : ''}`,
      );
      if (opts.porque) for (const q of x.porque.slice(0, 1)) out.push(`      ${q.texto}`);
    }
  }
  const v = programa.volumeSemanal;
  out.push(`\nSéries por semana (meta): ${MUSCULOS_COM_META.map((m) => `${m} ${fmt(v[m] ?? 0)} (${programa.metas[m] ?? 0})`).join(' · ')}`);
  const total = programa.dias.flatMap((d) => d.exercicios).reduce((t, x) => t + seriesDeVolume(x), 0);
  out.push(`Total: ${total} séries, ${programa.dias.reduce((t, d) => t + d.exercicios.length, 0)} exercícios, ${programa.dias.reduce((t, d) => t + d.minutosEstimados, 0)} min na semana`);
  if (programa.fases.length) out.push(`Fases: ${programa.fases.map((f) => `${f.semanas}: ${f.texto}`).join(' | ')}`);
  if (opts.avisos !== false && programa.avisos.length) out.push(`Avisos:\n${programa.avisos.map((a) => `  - [${a.regraId}] ${a.texto}`).join('\n')}`);
  return out.join('\n');
}
