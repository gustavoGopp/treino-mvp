// A grade reduzida (docs/revisoes/proximos-passos/a-qualidade.md): os 6 cenários comuns (academia, condomínio, casa,
// só o peso do corpo, só elásticos, halteres e banco) × 3 níveis × 2 a 6 dias (a divisão recomendada) × 30 a 90 min ×
// 13 prioridades, sem dor nem exercício evitado: 5.850 programas. Serve de régua rápida (R5b: o avaliador; os testes).
// Só dados fictícios; determinística.
import { GRUPOS, type Grupo, type Perfil } from '../../src/domain/gerador';
import { OPCOES_POR_DIAS, type DiasSemana } from '../../src/domain/gerador/divisoes';
import { NIVEIS, type Nivel } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { CENARIO, perfil } from './cenarios';

export const CENARIOS_REDUZIDA = ['academia', 'condominio', 'casa', 'peso-corpo', 'elasticos', 'halteres-banco'] as const;
export const MINUTOS_REDUZIDA = [30, 45, 60, 75, 90];
const G = Object.keys(GRUPOS) as Grupo[];
export const PRIORIDADES_REDUZIDA: { id: string; grupos: Grupo[] }[] = [
  { id: 'nenhuma', grupos: [] },
  ...G.map((g) => ({ id: g, grupos: [g] })),
  { id: 'peito+costas', grupos: ['peito', 'costas'] },
  { id: 'pernas+gluteos', grupos: ['pernas', 'gluteos'] },
  { id: 'peito+bracos', grupos: ['peito', 'bracos'] },
  { id: 'costas+ombros', grupos: ['costas', 'ombros'] },
  { id: 'pernas+gluteos+abdomen', grupos: ['pernas', 'gluteos', 'abdomen'] },
];

export type CasoReduzido = { nome: string; cenario: string; nivel: Nivel; dias: DiasSemana; minutos: number; prioridade: string; perfil: Perfil; inventario: Inventario };

export function* gradeReduzida(): Generator<CasoReduzido> {
  for (const cenario of CENARIOS_REDUZIDA)
    for (const nivel of NIVEIS)
      for (const dias of [2, 3, 4, 5, 6] as DiasSemana[])
        for (const minutos of MINUTOS_REDUZIDA)
          for (const pr of PRIORIDADES_REDUZIDA) {
            const pf = perfil({ nivel, divisao: OPCOES_POR_DIAS[dias][0]!, minutos, prioridades: pr.grupos, dores: [] });
            delete pf.divisao; // a recomendada dos dias (corpo todo quando não há puxar: divisao.sem-puxar)
            yield { nome: `${cenario} · ${nivel} · ${dias} dias · ${minutos} min · ${pr.id}`, cenario, nivel, dias, minutos, prioridade: pr.id, perfil: pf, inventario: CENARIO[cenario]!.inventario };
          }
}
