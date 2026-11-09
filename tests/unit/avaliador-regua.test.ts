import { beforeAll, describe, expect, it } from 'vitest';
import { avaliar, type Avaliacao } from '../../src/domain/avaliador';
import type { Perfil, Programa } from '../../src/domain/gerador';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { CENARIOS_REDUZIDOS, gradeReduzida, naoAvisados } from '../../scripts/auditoria/grade-reduzida';

// O avaliador como régua do gerador (R5b): na grade reduzida inteira (6 cenários comuns × 3 níveis × 2 a 6 dias × 30 a
// 90 min × 13 focos, sem dor; 5.850 programas), nenhum achado de segurança nem alerta, nenhum "ajustar" que o gerador
// não avise, e "está bom" ou só "limite" em pelo menos 80% (o aceite do R5b).
type Caso = { cen: string; inv: Inventario; pf: Perfil; p: Programa; a: Avaliacao };
const CASOS: Caso[] = [];
// Gerada antes dos testes, cedendo a vez a cada 50 programas (um bloco longo sem pausa faz o Vitest perder o contato).
beforeAll(async () => {
  for (const x of gradeReduzida()) {
    CASOS.push({ ...x, a: avaliar(x.p, x.pf, x.inv) });
    if (CASOS.length % 50 === 0) await new Promise((ok) => setTimeout(ok, 0));
  }
}, 120_000);
const nome = (x: Caso) => `${x.cen} ${x.pf.nivel} ${x.p.divisao} ${x.pf.minutosSessao} min ${x.pf.prioridades.join('+') || 'sem foco'}`;

describe('o avaliador como régua do gerador (grade reduzida)', () => {
  it('cobre a grade inteira', () => {
    expect(CASOS.length).toBe(CENARIOS_REDUZIDOS.length * 3 * 5 * 5 * 13);
  });
  it('nenhum achado de segurança nem alerta: o gerador nunca põe exercício impossível, evitado, acima do nível ou numa região com dor', () => {
    for (const x of CASOS) expect(x.a.achados.filter((y) => y.gravidade === 'seguranca' || y.gravidade === 'alerta').map((y) => y.texto), nome(x)).toEqual([]);
  });
  it('nenhum "ajustar" que o gerador não avise', () => {
    for (const x of CASOS) expect(naoAvisados(x.p, x.a.achados).map((y) => `${y.tipo}: ${y.texto}`), nome(x)).toEqual([]);
  });
  it('"está bom" ou só "limite" em pelo menos 80% dos programas', () => {
    const bons = CASOS.filter((x) => x.a.veredito === 'bom' || x.a.veredito === 'limite').length;
    expect(bons / CASOS.length).toBeGreaterThanOrEqual(0.8);
  });
});
