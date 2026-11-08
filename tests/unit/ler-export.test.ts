import { describe, expect, it } from 'vitest';
import { lerExport, resumirExport, textoDoResumo } from '../../scripts/export/ler-export';
import { exportarJson } from '../../src/storage/arquivo';
import type { Estado } from '../../src/storage/esquema';
import { bruno } from '../personas';
import { dia, estadoDe, serieTipica, treinar } from './apoio-treino';

// R5a (d-longo-prazo.md, opção 1e): o script que lê um export. Só com um export fictício, do Bruno (persona); um export
// real nunca entra no repositório.

const DIAS = ['superior-a', 'inferior-a', 'superior-b', 'inferior-b'];
function quatroSemanasParado(): Estado {
  let e = estadoDe(bruno);
  for (let w = 0; w < 4; w++) [0, 1, 3, 4].forEach((k, i) => (e = treinar(e, w * 7 + k, DIAS[i]!)));
  return e;
}

describe('a leitura do export (scripts/export/ler-export.ts)', () => {
  it('conta treinos, sugestões, "estagnado" e semana leve de um histórico parado', () => {
    const e = quatroSemanasParado();
    const r = resumirExport(e);
    expect(r.treinos).toBe(16);
    expect(r.semSerie).toBe(0);
    expect(r.semanasComTreino).toBe(4);
    // Cada exercício feito recebe uma sugestão: a soma é o total de exercícios feitos.
    const feitos = e.historico.flatMap((s) => s.exercicios.filter((x) => x.series.length)).length;
    expect(Object.values(r.sugestoes).reduce((a, b) => a + b, 0)).toBe(feitos);
    // Com 3 sessões paradas, os exercícios ficam "estagnados" (na 4ª semana), e a semana leve é sugerida (da 3ª em diante).
    expect(r.sugestoes.estagnado).toBeGreaterThan(0);
    expect(r.exerciciosEstagnados).toBeGreaterThanOrEqual(2);
    expect(r.semanasComSemanaLeveSugerida).toBe(2);
    expect(textoDoResumo(r)).toMatch(/^Treinos feitos: 16 em 4 semanas/);
  });

  it('lê o arquivo exportado pelo app (o mesmo formato da importação) e conta a dor, o treino vazio e a calibração', () => {
    let e = estadoDe(bruno);
    e = treinar(e, 0, 'superior-a', 'local-1', (exId) => ({ ...serieTipica(exId), dor: 4 }));
    e = treinar(e, 2, 'inferior-a', 'local-1', (exId) => ({ ...serieTipica(exId), calibracao: true }));
    e = { ...e, historico: [...e.historico, { id: dia(3), diaId: 'superior-b', semana: 1, inicio: dia(3), fim: dia(3, 11), exercicios: [] }] };
    const r = lerExport(exportarJson(e, dia(4)));
    expect(r.treinos).toBe(2);
    expect(r.semSerie).toBe(1);
    expect(r.dor3a5).toBeGreaterThan(0);
    expect(r.seriesDeAcerto).toBeGreaterThan(0);
    expect(r.calibracoesLongas).toBe(0);
    expect(() => lerExport('{"app":"outro"}')).toThrow('não foi exportado');
  });
});
