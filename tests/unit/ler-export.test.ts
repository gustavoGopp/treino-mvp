import { describe, expect, it } from 'vitest';
import { lerExport, resumirExport, textoDoResumo } from '../../scripts/export/ler-export';
import { exportarJson } from '../../src/storage/arquivo';
import type { Estado } from '../../src/storage/esquema';
import { bruno } from '../personas';
import { dia, estadoDe, serieTipica, treinar } from './apoio-treino';

// R5a (d-longo-prazo.md, opção 1e): o script que lê um export. Só com um export fictício, do Bruno (persona); um export
// real nunca entra no repositório.

const DIAS = ['superior-a', 'inferior-a', 'superior-b', 'inferior-b'];
function oitoSemanasParado(): Estado {
  let e = estadoDe(bruno);
  for (let w = 0; w < 8; w++) [0, 1, 3, 4].forEach((k, i) => (e = treinar(e, w * 7 + k, DIAS[i]!)));
  return e;
}

describe('a leitura do export (scripts/export/ler-export.ts)', () => {
  it('conta treinos, sugestões, "estagnado" e semana leve de um histórico parado', () => {
    const e = oitoSemanasParado();
    const r = resumirExport(e);
    expect(r.treinos).toBe(32);
    expect(r.semSerie).toBe(0);
    expect(r.semanasComTreino).toBe(8);
    // Cada exercício feito recebe uma sugestão: a soma é o total de exercícios feitos.
    const feitos = e.historico.flatMap((s) => s.exercicios.filter((x) => x.series.length)).length;
    expect(Object.values(r.sugestoes).reduce((a, b) => a + b, 0)).toBe(feitos);
    // Desde o pacote 5 (16/11/2026), a janela do "sem melhora" vem do nível (progressao.estagnacao): para o Bruno,
    // intermediário, 8 sessões paradas do mesmo exercício (antes, 3 para todos). Com 2 estagnados, a semana leve é
    // sugerida. A puxada com barra reta (nos dois dias de Superior, desde o pacote 2, 15/11/2026) e o abdominal na polia
    // (nos dois de Inferior) chegam à 8ª sessão parada no fim da 4ª semana, e a semana leve é sugerida da 5ª em diante
    // (4 semanas das 8). Os exercícios feitos 1 vez por semana só chegam à 8ª sessão no fim da 8ª semana.
    // Com a janela de 3, bastavam 4 semanas de histórico, e a sugestão vinha da 2ª em diante (3 semanas das 4).
    expect(r.sugestoes.estagnado).toBeGreaterThan(0);
    expect(r.exerciciosEstagnados).toBeGreaterThanOrEqual(2);
    expect(r.semanasComSemanaLeveSugerida).toBe(4);
    expect(textoDoResumo(r)).toMatch(/^Treinos feitos: 32 em 8 semanas/);
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
