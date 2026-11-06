// Agente 2: efeito, no gerador, de tirar do cadastro as prioridades, o objetivo e o "algo a evitar" (perfil sem eles).
// Uso: npx vite-node scripts/design/redesign/agente-2/efeito-gerador.ts
import { gerarPrograma, type Perfil } from '../../../../src/domain/gerador';
import { ana, bruno, carla, diego, elisa, fabio } from '../../../../tests/personas/index';

const resumo = (p: Perfil, inv: Parameters<typeof gerarPrograma>[1]) => {
  const r = gerarPrograma(p, inv) as unknown as { programa?: { divisao: string; dias: { exercicios: { exId: string; series: number }[] }[]; volumeSemanal: Record<string, number> } };
  const prog = r.programa ?? (r as unknown as { divisao: string; dias: { exercicios: { exId: string; series: number }[] }[]; volumeSemanal: Record<string, number> });
  const series = prog.dias.flatMap((d) => d.exercicios).reduce((s, e) => s + e.series, 0);
  const ex = new Set(prog.dias.flatMap((d) => d.exercicios.map((e) => e.exId)));
  return { divisao: prog.divisao, series, ex };
};
for (const pe of [ana, bruno, carla, diego, elisa, fabio]) {
  const hoje = resumo(pe.perfil, pe.inventario);
  const sem = resumo({ ...pe.perfil, prioridades: [], objetivo: undefined, evitarExercicios: [], evitarEquipamentos: [] } as Perfil, pe.inventario);
  const iguais = [...hoje.ex].filter((x) => sem.ex.has(x)).length;
  console.log(
    `${pe.nome}: prioridades=${pe.perfil.prioridades.join('+') || '—'} objetivo=${pe.perfil.objetivo ?? '—'} evitar=${[...pe.perfil.evitarEquipamentos, ...pe.perfil.evitarExercicios].join('+') || '—'} | hoje: ${hoje.divisao}, ${hoje.series} séries, ${hoje.ex.size} exercícios | sem: ${sem.divisao}, ${sem.series} séries, ${sem.ex.size} exercícios | exercícios em comum: ${iguais}`,
  );
}
