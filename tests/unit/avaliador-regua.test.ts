import { describe, expect, it } from 'vitest';
import { avaliar, avisadoPeloGerador as avisado } from '../../src/domain/avaliador';
import { ARTICULACOES } from '../../src/domain/biblioteca';
import { gerarPrograma, type Perfil } from '../../src/domain/gerador';
import { respostasNenhuma } from '../../src/domain/triagem';
import { gradeReduzida } from '../../scripts/auditoria/grade-reduzida';
import { PERSONAS } from '../personas';

// O avaliador como régua do gerador (R5b): nenhum programa gerado tem achado de segurança nem alerta, e todo
// "ajustar" que o avaliador acha o gerador também avisa (com o fato e o próximo passo). O aceite: "está bom" ou só
// "limite" em 80% ou mais da grade reduzida (docs/revisoes/r5b/medidas.md).

const gerados = [...gradeReduzida()].map((c) => {
  const g = gerarPrograma(c.perfil, c.inventario);
  if (g.status !== 'ok') throw new Error(`bloqueado: ${c.nome}`);
  return { ...c, p: g.programa, a: avaliar(g.programa, c.perfil, c.inventario) };
});

describe('o avaliador como régua do gerador (grade reduzida, 5.850 programas)', { timeout: 120_000 }, () => {
  it('nenhum achado de segurança nem alerta', () => {
    for (const c of gerados) expect(c.a.achados.filter((x) => x.gravidade === 'seguranca' || x.gravidade === 'alerta').map((x) => x.texto), c.nome).toEqual([]);
  });
  it('nenhum "ajustar" que o gerador não avise', () => {
    for (const c of gerados) for (const x of c.a.achados.filter((y) => y.gravidade === 'ajustar')) expect(avisado(x, c.p), `${c.nome}: ${x.texto}`).toBe(true);
  });
  it('"está bom" ou só "limite" em 80% ou mais', () => {
    const ok = gerados.filter((c) => c.a.veredito === 'bom' || c.a.veredito === 'limite').length;
    expect(ok / gerados.length).toBeGreaterThanOrEqual(0.8);
  });
});

describe('com dor: as 6 personas × 7 regiões × dor 4 e 7', { timeout: 60_000 }, () => {
  it('o programa gerado nunca carrega uma região com dor acima de 5 nem pede o que não há (0 segurança, 0 alerta)', () => {
    for (const [nome, pe] of Object.entries(PERSONAS))
      for (const articulacao of ARTICULACOES)
        for (const nota of [4, 7]) {
          const perfil: Perfil = { ...pe.perfil, triagem: { respostas: { ...respostasNenhuma(), osteoarticular: true }, dores: [{ articulacao, nota }] } };
          const g = gerarPrograma(perfil, pe.inventario);
          if (g.status !== 'ok') continue;
          const a = avaliar(g.programa, perfil, pe.inventario);
          expect(a.achados.filter((x) => x.gravidade === 'seguranca' || x.gravidade === 'alerta').map((x) => x.texto), `${nome} ${articulacao} ${nota}`).toEqual([]);
          for (const x of a.achados.filter((y) => y.gravidade === 'ajustar')) expect(avisado(x, g.programa), `${nome} ${articulacao} ${nota}: ${x.texto}`).toBe(true);
        }
  });
});
