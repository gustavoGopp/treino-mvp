import { describe, expect, it } from 'vitest';
import { calibrar, emCalibracao, fimDaCalibracao, semCalibracao } from '../../src/domain/progressao/calibracao';
import { calibracaoNaSessao, sugestaoDoExercicio, type Sessao } from '../../src/domain/sessao';
import { sugerirProgressao, type OpcoesCarga } from '../../src/domain/progressao';
import { cargasHalter } from '../../src/domain/taxonomia/equipamentos';
import { ana, bruno } from '../personas';

// progressao.calibracao: os casos C1 a C7 do T6 (pesquisa-v2/07, seção 2.3), agora no R1b (pesquisa-v2/09).
const halterAna: OpcoesCarga = { tipo: 'halter', lista: cargasHalter(ana.inventario) };
const halterBruno: OpcoesCarga = { tipo: 'halter', lista: cargasHalter(bruno.inventario) };
const kg = (k: number) => ({ tipo: 'kg' as const, kg: k });

describe('progressao.calibracao: casos do T6', () => {
  it('C1: Ana, goblet 6 kg, 20 repetições com reserva 3 → 2 incrementos passam de +25% → 7 kg', () => {
    const c = calibrar({ carga: kg(6), reps: 20, rir: 3 }, { reps: [8, 12], rir: [2, 3] }, halterAna);
    expect(c).toMatchObject({ acao: 'subir', proxima: kg(7), perto: false, regraId: 'progressao.calibracao' });
  });
  it('C2: Bruno, supino 10 kg, 6 repetições com reserva 1 → Brzycki 8,5 → para baixo → 8 kg', () => {
    expect(calibrar({ carga: kg(10), reps: 6, rir: 1 }, { reps: [8, 12], rir: [1, 2] }, halterBruno)).toMatchObject({ acao: 'descer', proxima: kg(8) });
  });
  it('C3: Bruno, rosca 8 kg, 14 repetições com reserva 1 → dentro de A ± 2 → mantém', () => {
    expect(calibrar({ carga: kg(8), reps: 14, rir: 1 }, { reps: [10, 20], rir: [0, 1] }, halterBruno)).toMatchObject({ acao: 'manter', proxima: kg(8), perto: true });
  });
  it('C4: Ana, elevação lateral 2 kg, 30 repetições com reserva 4 → teto de +25% dá 2 kg → mínimo de 1 incremento → 3 kg', () => {
    expect(calibrar({ carga: kg(2), reps: 30, rir: 4 }, { reps: [10, 20], rir: [1, 2] }, halterAna)).toMatchObject({ acao: 'subir', proxima: kg(3) });
  });
  it('C5: puxada na polia, placa 5, 15 repetições com reserva 3 → 2 placas → placa 7', () => {
    expect(calibrar({ carga: { tipo: 'placa', placa: 5 }, reps: 15, rir: 3 }, { reps: [8, 12], rir: [1, 2] }, { tipo: 'polia' })).toMatchObject({
      acao: 'subir',
      proxima: { tipo: 'placa', placa: 7 },
    });
  });
  it('na barra, não manda descer abaixo da barra vazia', () => {
    const c = calibrar({ carga: kg(20), reps: 4, rir: 0 }, { reps: [8, 12], rir: [1, 2] }, { tipo: 'barra', passoKg: 4, baseKg: 20 });
    expect(c.proxima === undefined || (c.proxima.tipo === 'kg' && c.proxima.kg >= 20)).toBe(true);
  });
  it('C6: semana 1 da volta de pausa, remada 9 kg, 12 repetições com reserva 5 → não sobe → mantém 9 kg', () => {
    const c = calibrar({ carga: kg(9), reps: 12, rir: 5 }, { reps: [8, 12], rir: [3, 4] }, halterBruno, { soDesce: true });
    expect(c).toMatchObject({ acao: 'manter', proxima: kg(9), perto: false });
    // Sem a proteção, a mesma série subiria.
    expect(calibrar({ carga: kg(9), reps: 12, rir: 5 }, { reps: [8, 12], rir: [3, 4] }, halterBruno).acao).toBe('subir');
  });
  it('C6b: na semana 1 da volta, a calibração ainda desce quando pesa', () => {
    expect(calibrar({ carga: kg(9), reps: 5, rir: 1 }, { reps: [8, 12], rir: [3, 4] }, halterBruno, { soDesce: true }).acao).toBe('descer');
  });
  it('C7: uma série com dor 4/10: a regra de dor manda (reduzir e avisar), não a calibração', () => {
    const s = sugerirProgressao([{ series: [{ carga: kg(8), reps: 10, rir: 2, dor: 4, calibracao: true }] }], { reps: [8, 12], rir: [1, 2] }, halterBruno);
    expect(s.regraId).toBe('seguranca.dor.escala');
    expect(s.acao).toBe('ajustar');
  });
});

describe('progressao.calibracao: os 5 tipos de carga (pesquisa-v2/08, tabela 1.1)', () => {
  const alvo = { reps: [8, 12] as [number, number], rir: [1, 2] as [number, number] }; // A = 11,5
  it('anilhas na máquina: só passos do menor par, nunca a fórmula', () => {
    const o: OpcoesCarga = { tipo: 'anilha', menorAnilhaKg: 5 };
    expect(calibrar({ carga: { tipo: 'anilha', kgPorLado: 20 }, reps: 20, rir: 4 }, alvo, o).proxima).toEqual({ tipo: 'anilha', kgPorLado: 30 });
    expect(calibrar({ carga: { tipo: 'anilha', kgPorLado: 20 }, reps: 7, rir: 1 }, alvo, o).proxima).toEqual({ tipo: 'anilha', kgPorLado: 15 });
  });
  it('contrapeso: leve demais = tirar placa; pesada = pôr placa', () => {
    const o: OpcoesCarga = { tipo: 'assistida', placasMax: 10 };
    expect(calibrar({ carga: { tipo: 'contrapeso', placa: 6 }, reps: 15, rir: 2 }, alvo, o).proxima).toEqual({ tipo: 'contrapeso', placa: 5 });
    expect(calibrar({ carga: { tipo: 'contrapeso', placa: 6 }, reps: 4, rir: 0 }, alvo, o).proxima).toEqual({ tipo: 'contrapeso', placa: 8 });
  });
  it('degrau: leve demais sobe 1 degrau; pesada desce', () => {
    const o: OpcoesCarga = { tipo: 'peso-corpo' };
    expect(calibrar({ carga: { tipo: 'degrau', degrau: 0 }, reps: 14, rir: 2 }, alvo, o).proxima).toEqual({ tipo: 'degrau', degrau: 1 });
    expect(calibrar({ carga: { tipo: 'degrau', degrau: 1 }, reps: 6, rir: 1 }, alvo, o).proxima).toEqual({ tipo: 'degrau', degrau: 0 });
  });
  it('placa: pesada demais com folga de 6 → 2 placas a menos; nunca abaixo da placa 1', () => {
    expect(calibrar({ carga: { tipo: 'placa', placa: 6 }, reps: 4, rir: 1 }, alvo, { tipo: 'polia' }).proxima).toEqual({ tipo: 'placa', placa: 4 });
    expect(calibrar({ carga: { tipo: 'placa', placa: 1 }, reps: 4, rir: 1 }, alvo, { tipo: 'polia' }).acao).toBe('manter');
  });
  it('kg conhecido com até 12 repetições somadas: a fórmula para cima, para baixo no inventário', () => {
    // faixa 6–10, RIR 1–2 → A = 9,5; 10 kg × 10 + 2 = 12 → 10 × 27,5 / 25 = 11 kg
    expect(calibrar({ carga: kg(10), reps: 10, rir: 2 }, { reps: [6, 10], rir: [1, 2] }, halterAna).proxima).toEqual(kg(11));
  });
});

describe('séries de calibração fora da dupla progressão', () => {
  it('emCalibracao: verdadeiro até haver uma série de trabalho; semCalibracao tira as séries de acerto', () => {
    const h = [{ series: [{ carga: kg(6), reps: 20, rir: 3, calibracao: true }] }];
    expect(emCalibracao([])).toBe(true);
    expect(emCalibracao(h)).toBe(true);
    const h2 = [...h, { series: [{ carga: kg(6), reps: 20, rir: 3, calibracao: true }, { carga: kg(7), reps: 11, rir: 2 }] }];
    expect(emCalibracao(h2)).toBe(false);
    expect(semCalibracao(h2)).toEqual([{ series: [{ carga: kg(7), reps: 11, rir: 2 }] }]);
  });
  it('histórico de antes do R1b (sem marca) conta como trabalho: ninguém recalibra o que já fazia', () => {
    expect(emCalibracao([{ series: [{ carga: kg(6), reps: 10, rir: 2 }] }])).toBe(false);
  });
});

describe('progressao.calibracao: a saída (R5a; d-longo-prazo.md, D1)', () => {
  // Elevação lateral da Ana: 12–20 repetições, RIR 1–2 → A = 17,5; janela de 15,5 a 19,5. Halteres de 1 em 1 kg.
  const alvo = { reps: [12, 20] as [number, number], rir: [1, 2] as [number, number] };
  const x = { exId: 'elevacao-lateral', ...alvo };
  const acerto = (k: number, reps: number, rir: number) => ({ carga: kg(k), reps, rir, calibracao: true });
  const sessao = (n: number, series: Sessao['exercicios'][number]['series']): Sessao => ({
    id: `s${n}`, diaId: 'a', semana: 1, inicio: `2026-11-0${n}T10:00:00Z`, fim: `2026-11-0${n}T11:00:00Z`, exercicios: [{ exId: x.exId, series }],
  });

  it('"4 kg dá R = 24, 5 kg dá R = 12": nenhum peso cai na janela; na 3ª série de acerto, a carga de R mais perto de A vira a de trabalho', () => {
    expect(calibrar({ carga: kg(4), reps: 21, rir: 3 }, alvo, halterAna).acao).toBe('subir');
    expect(calibrar({ carga: kg(5), reps: 9, rir: 3 }, alvo, halterAna).acao).toBe('descer');
    const series = [acerto(3, 30, 5), acerto(4, 21, 3), acerto(5, 9, 3)];
    expect(fimDaCalibracao(series.slice(0, 2), alvo)).toBeUndefined();
    const fim = fimDaCalibracao(series, alvo)!;
    // |24 − 17,5| = 6,5 e |12 − 17,5| = 5,5: fica o de 5 kg.
    expect(fim).toMatchObject({ proxima: kg(5), perto: true, regraId: 'progressao.calibracao' });
    expect(fim.motivo).toMatch(/^Fim da calibração: 5 kg/);
  });

  it('no empate, fica a carga mais leve', () => {
    // A = 17,5: R = 14,5 (−3) e R = 20,5 (+3).
    expect(fimDaCalibracao([acerto(5, 12, 2), acerto(4, 18, 2), acerto(6, 4, 2)], alvo)!.proxima).toEqual(kg(4));
  });

  it('a sugestão da próxima sessão sai da calibração, e a 1ª série dela já conta como trabalho', () => {
    // A calibração indo e voltando em 2 sessões (o rastro do simulador da frente D).
    const h = [sessao(2, [acerto(3, 30, 5), acerto(4, 21, 3)]), sessao(4, [acerto(5, 9, 3)])];
    const sug = sugestaoDoExercicio(h, x, ana.inventario);
    expect(sug).toMatchObject({ acao: 'manter', proxima: kg(5), regraId: 'progressao.calibracao' });
    expect(calibracaoNaSessao(h, x, ana.inventario, [])).toMatchObject({ calibrando: false, fim: true });
    // Com só 2 séries de acerto, ainda calibra.
    expect(calibracaoNaSessao(h.slice(0, 1), x, ana.inventario, []).calibrando).toBe(true);
  });

  it('dentro da mesma sessão: depois da 3ª série de acerto, a 4ª é de trabalho, com a carga escolhida', () => {
    const c = calibracaoNaSessao([], x, ana.inventario, [acerto(3, 30, 5), acerto(4, 21, 3), acerto(5, 9, 3)]);
    expect(c).toMatchObject({ calibrando: false, fim: true, ultima: { proxima: kg(5) } });
  });

  it('a calibração que acerta não muda: a série perto do alvo continua virando a de trabalho', () => {
    const c = calibracaoNaSessao([], x, ana.inventario, [acerto(3, 30, 5), acerto(4, 21, 3)]);
    expect(c.calibrando).toBe(true);
    expect(c.fim).toBeUndefined();
  });
});

