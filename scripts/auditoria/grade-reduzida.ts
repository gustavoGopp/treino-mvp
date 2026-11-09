// A grade reduzida da frente A (docs/revisoes/proximos-passos/a-qualidade.md), num módulo próprio para os testes e os
// scripts: os 6 cenários comuns (academia, condomínio, casa, sem nada, só elásticos, halteres e banco) × 3 níveis × 2 a
// 6 dias (a divisão recomendada) × 30 a 90 min × 13 focos, sem dor: 5.850 programas. Só dados fictícios.
import { avisadoPeloGerador, type Achado } from '../../src/domain/avaliador';
import { gerarPrograma, type Perfil, type Programa } from '../../src/domain/gerador';
import { OPCOES_POR_DIAS, type DiasSemana } from '../../src/domain/gerador/divisoes';
import { NIVEIS } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { CENARIO, perfil } from './cenarios';
import { MINUTOS_Q, PRIORIDADES_Q } from './qualidade-grade';

export const CENARIOS_REDUZIDOS: { id: string; inventario: Inventario }[] = [
  ...['academia', 'condominio', 'casa', 'elasticos', 'halteres-banco'].map((id) => ({ id, inventario: CENARIO[id]!.inventario })),
  { id: 'sem-nada', inventario: {} },
];

export function* gradeReduzida(): Generator<{ cen: string; inv: Inventario; pf: Perfil; p: Programa }> {
  for (const c of CENARIOS_REDUZIDOS)
    for (const nivel of NIVEIS)
      for (const d of [2, 3, 4, 5, 6] as DiasSemana[])
        for (const minutos of MINUTOS_Q)
          for (const pr of PRIORIDADES_Q) {
            const pf = perfil({ nivel, divisao: OPCOES_POR_DIAS[d][0]!, minutos, prioridades: pr.grupos, dores: [] });
            delete pf.divisao;
            const r = gerarPrograma(pf, c.inventario);
            if (r.status === 'ok') yield { cen: c.id, inv: c.inventario, pf, p: r.programa };
          }
}

/** Os achados de um programa gerado que pedem ajuste e o gerador não avisa. */
export const naoAvisados = (p: Programa, achados: Achado[]) =>
  achados.filter((a) => (a.gravidade === 'ajustar' || a.gravidade === 'alerta' || a.gravidade === 'seguranca') && !avisadoPeloGerador(a, p.avisos, Object.fromEntries(p.dias.map((d) => [d.id, d.nome]))));

