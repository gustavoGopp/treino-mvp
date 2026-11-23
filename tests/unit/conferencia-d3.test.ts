import { describe, expect, it } from 'vitest';
import { gerarPrograma, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { respostasNenhuma } from '../../src/domain/triagem';
import { ana } from '../personas';

// Os itens que a conferência regra por regra (pacote D1, 22/11/2026) deixou para o pacote D3, feitos em 23/11/2026
// (`docs/revisoes/melhorias/d3-conferencia/README.md`). Cada bloco prende o exemplo que o conferente rodou.

type Dor = { articulacao: 'ombro' | 'joelho' | 'cotovelo' | 'lombar' | 'quadril' | 'punho' | 'tornozelo'; nota: number };
const perfil = (o: { nivel: Perfil['nivel']; dias: Perfil['diasSemana']; min: number; focos?: Grupo[]; dores?: Dor[]; parado?: number; divisao?: Perfil['divisao'] }): Perfil => ({
  nivel: o.nivel,
  semanasParado: o.parado ?? 0,
  diasSemana: o.dias,
  ...(o.divisao ? { divisao: o.divisao } : {}),
  minutosSessao: o.min,
  prioridades: o.focos ?? [],
  evitarExercicios: [],
  evitarEquipamentos: [],
  triagem: { respostas: { ...respostasNenhuma(), osteoarticular: !!o.dores?.length }, ...(o.dores?.length ? { dores: o.dores } : {}) },
});
const ok = (p: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(p, inv);
  if (r.status !== 'ok') throw new Error(`sem programa: ${r.status}`);
  return r.programa;
};

describe('selecao.peitoral-inclinado: o 2º empurrar olha a vaga que coube no dia, e não a do modelo', () => {
  // Halteres de 1 a 12 kg e banco reto (sem banco inclinável). Com 30 min, a vaga de empurrar horizontal do dia de
  // Empurrar é complemento e não cabe; antes, ela ainda "existia" e o dia saía com crucifixo, elevação e tríceps.
  it.each([5, 6] as const)('com %i dias de 30 min, todo dia de Empurrar tem um supino ou uma flexão', (dias) => {
    for (const nivel of ['iniciante', 'intermediario', 'avancado'] as const) {
      const p = ok(perfil({ nivel, dias, min: 30 }), ana.inventario);
      const empurrar = p.dias.filter((d) => d.nome.startsWith('Empurrar'));
      expect(empurrar.length).toBeGreaterThan(0);
      for (const d of empurrar) expect(d.exercicios.some((x) => x.tipo === 'composto' && x.padrao === 'empurrar-h')).toBe(true);
    }
  });

  it('com tempo, o dia que já tem a vaga de empurrar horizontal não ganha dois supinos retos', () => {
    const p = ok(perfil({ nivel: 'intermediario', dias: 5, min: 60 }), ana.inventario);
    for (const d of p.dias) expect(d.exercicios.filter((x) => x.exId === 'supino-reto').length).toBeLessThanOrEqual(1);
  });
});
