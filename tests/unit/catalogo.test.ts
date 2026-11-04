import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { gerarPrograma, type Perfil } from '../../src/domain/gerador';
import { type Nivel } from '../../src/domain/regras';
import { type Inventario } from '../../src/domain/taxonomia/equipamentos';
import { respostasNenhuma } from '../../src/domain/triagem';

// Decisões da sessão de catálogo (docs/pesquisa-v2/11-catalogo-completo.md; Gustavo, 04/11/2026).
const perfil = (nivel: Nivel): Perfil => ({
  nivel,
  semanasParado: 0,
  diasSemana: 3,
  divisao: 'ct-abc',
  minutosSessao: 45,
  prioridades: [],
  evitarExercicios: [],
  evitarEquipamentos: [],
  triagem: { respostas: respostasNenhuma() },
});
const gerar = (pf: Perfil, inv: Inventario) => {
  const r = gerarPrograma(pf, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};

describe('correções do doc 11', () => {
  it('tecnica.parcial-alongada: só o avançado recebe o texto da parcial alongada', () => {
    const tem = (n: Nivel) => gerar(perfil(n), {}).porque.some((q) => q.regraId === 'tecnica.parcial-alongada');
    expect(tem('avancado')).toBe(true);
    expect(tem('intermediario')).toBe(false);
    expect(tem('iniciante')).toBe(false);
  });
  it('complexidades revistas (B.2.2) e a lombar na elevação de joelhos', () => {
    expect(POR_ID['remada-invertida']!.complexidade).toBe(1);
    expect(POR_ID['crucifixo-halteres']!.complexidade).toBe(2);
    expect(POR_ID['agachamento-smith']!.complexidade).toBe(1);
    expect(POR_ID['elevacao-joelhos']!.articulacoes).toContain('lombar');
  });
});
