import { describe, expect, it } from 'vitest';
import {
  blocoAtual,
  cargaDaVolta,
  diasSemTreino,
  faixaDaPausa,
  hojeNoPrograma,
  opcoesCarga,
  semanaDoPrograma,
  sugestaoDoExercicio,
  ultimaSerie,
  type Sessao,
} from '../../src/domain/sessao';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import type { Estado } from '../../src/storage/esquema';
import { diaDoTreino, hojeDoEstado, inventarioDoTreino, opcoesDaCarga } from '../../src/features/treino/acoes';
import { ana, bruno, carla, LOCAIS_DO_BRUNO } from '../personas';
import { dia, estadoDe, serieTipica, treinar } from './apoio-treino';

// Pausas detectadas sozinhas (readaptacao.durante-uso; pesquisa-v2/07, seção 3): os casos P1 a P9 do T6, os casos com
// locais e o teste de propriedade. O Bruno é rodado como "treinando" no cadastro, para isolar a pausa durante o uso.

/** A carga que a tela pré-preenche hoje: a sugerida, ou a última registrada. */
function cargaDeHoje(e: Estado, n: number, diaId: string, exId: string, localId = 'local-1') {
  const s = { id: dia(n), inicio: dia(n), diaId, localId };
  const x = diaDoTreino(e, s)!.dia.exercicios.find((y) => y.exId === exId)!;
  const op = opcoesDaCarga(e, s);
  const sug = sugestaoDoExercicio(e.historico, x, inventarioDoTreino(e, s), op);
  return { sug, carga: sug.proxima ?? ultimaSerie(e.historico, exId, op.local)?.carga, x };
}

const DIAS_BRUNO = ['superior-a', 'inferior-a', 'superior-b', 'inferior-b'];
/** O Bruno treina 2 semanas (segunda, terça, quinta e sexta); o último treino termina no dia 11. */
function brunoDuasSemanas(e = estadoDe(bruno), locais: (n: number) => string = () => 'local-1'): Estado {
  [0, 1, 3, 4, 7, 8, 10, 11].forEach((n, i) => (e = treinar(e, n, DIAS_BRUNO[i % 4]!, locais(n))));
  return e;
}
const ULTIMO = 11;
const totalSeries = (e: Estado, n: number, diaId: string) => hojeDoEstado(e, dia(n))!.dias.find((d) => d.id === diaId)!.exercicios.reduce((t, x) => t + x.series, 0);
const seriesNormais = (e: Estado, diaId: string) => e.programa!.programa.dias.find((d) => d.id === diaId)!.exercicios.reduce((t, x) => t + x.series, 0);

describe('faixas da pausa (readaptacao.durante-uso)', () => {
  it.each([
    [0, 'normal', 0],
    [13, 'normal', 0],
    [14, 'rir+1', 0],
    [20, 'rir+1', 0],
    [21, 'volta', 0.1],
    [56, 'volta', 0.1],
    [57, 'volta', 0.15],
    [182, 'volta', 0.15],
    [183, 'refazer-nivel', 0.2],
  ])('%i dias → %s, redução %s', (d, faixa, reducao) => expect(faixaDaPausa(d)).toEqual({ faixa, reducao }));

  it('a pausa conta do fim do último treino feito até hoje; uma sessão sem série nenhuma não conta como treino', () => {
    const s = (inicio: string, series: number): Sessao => ({ id: inicio, diaId: 'x', semana: 1, inicio, fim: inicio, exercicios: [{ exId: 'supino-reto', series: Array.from({ length: series }, () => serieTipica('supino-reto')) }] });
    expect(diasSemTreino([], dia(0))).toBeUndefined();
    expect(diasSemTreino([s(dia(0), 2)], dia(22))).toBe(22);
    expect(diasSemTreino([s(dia(0), 2), s(dia(10), 0)], dia(22))).toBe(22);
  });
});

describe('os casos P1 a P9 do T6', () => {
  const e = brunoDuasSemanas();
  const SUP = 'superior-a';

  it('P1: Bruno, 10 dias sem treinar → normal: as séries e o RIR do programa e a mesma carga (10 kg)', () => {
    const n = ULTIMO + 10;
    const h = hojeDoEstado(e, dia(n))!;
    expect(h.faixa).toBe('normal');
    expect(h.bloco.pausaDias).toBeUndefined();
    expect(totalSeries(e, n, SUP)).toBe(seriesNormais(e, SUP));
    expect(h.dias.find((d) => d.id === SUP)).toEqual(e.programa!.programa.dias.find((d) => d.id === SUP));
    expect(cargaDeHoje(e, n, SUP, 'supino-reto').carga).toEqual({ tipo: 'kg', kg: 10 });
  });

  it('P2: Bruno, 16 dias → na 1ª sessão de cada dia, RIR +1 (1–2 vira 2–3), com 10 kg; a partir da 2ª, normal', () => {
    const n = ULTIMO + 16;
    const h = hojeDoEstado(e, dia(n))!;
    expect(h.faixa).toBe('rir+1');
    expect(h.rirMais1).toEqual(DIAS_BRUNO);
    const { x, carga } = cargaDeHoje(e, n, SUP, 'supino-reto');
    expect(x.rir).toEqual([2, 3]);
    expect(carga).toEqual({ tipo: 'kg', kg: 10 });
    expect(totalSeries(e, n, SUP)).toBe(seriesNormais(e, SUP));
    const e2 = treinar(e, n, SUP);
    const h2 = hojeDoEstado(e2, dia(n + 1))!;
    expect(h2.rirMais1).toEqual(['inferior-a', 'superior-b', 'inferior-b']);
    expect(h2.dias.find((d) => d.id === SUP)!.exercicios[0]!.rir).toEqual([1, 2]);
  });

  it('P3 (critério 6): Bruno, 22 dias → volta gradual com carga −10%: semana 1 com ~55% das séries, RIR 3–4 e 9 kg; semana 2 com ~75% e RIR 2–3; semana 3 normal', () => {
    const n = ULTIMO + 22;
    const h = hojeDoEstado(e, dia(n))!;
    expect(h.faixa).toBe('volta');
    expect(h.bloco).toMatchObject({ pausaDias: 22, reducao: 0.1, calibrar: false });
    expect(h.semana).toBe(1);
    expect(h.fase?.regraId).toBe('readaptacao.semana1');
    const normal = e.programa!.programa.dias.find((d) => d.id === SUP)!.exercicios;
    const sup = h.dias.find((d) => d.id === SUP)!.exercicios;
    sup.forEach((x, i) => {
      expect(x.series).toBe(Math.max(1, Math.round(normal[i]!.series * 0.55)));
      expect(x.rir).toEqual([3, 4]);
    });
    expect(seriesNormais(e, SUP)).toBe(28);
    expect(totalSeries(e, n, SUP)).toBe(16);
    const { sug, carga } = cargaDeHoje(e, n, SUP, 'supino-reto');
    expect(carga).toEqual({ tipo: 'kg', kg: 9 });
    expect(sug.motivo).toBe('Última vez: 10 kg. Volta da pausa: 10% mais leve, para o corpo se readaptar sem dor.');
    expect(sug.regraId).toBe('readaptacao.semana1');
    // Semana 1 da volta: a calibração só desce.
    expect(opcoesDaCarga(e, { id: dia(n), inicio: dia(n) }).soDesce).toBe(true);

    // A volta cai num sábado (dia 33): a semana 1 do bloco é este fim de semana. Depois, semana 2 a partir da segunda.
    let v = e;
    const supino9 = (exId: string) => (exId === 'supino-reto' ? { carga: { tipo: 'kg' as const, kg: 9 }, reps: 10, rir: 3 } : serieTipica(exId));
    v = treinar(v, n, SUP, 'local-1', supino9);
    v = treinar(v, n + 1, 'inferior-a');
    const seg = n + 2;
    const h2 = hojeDoEstado(v, dia(seg))!;
    expect(h2.semana).toBe(2);
    expect(h2.fase?.regraId).toBe('readaptacao.semana2');
    expect(totalSeries(v, seg, SUP)).toBe(21);
    expect(h2.dias.find((d) => d.id === SUP)!.exercicios[0]!.rir).toEqual([2, 3]);
    // Depois da 1ª vez no bloco, a carga segue a dupla progressão do bloco (9 kg), e não volta aos 10 kg de antes.
    expect(cargaDeHoje(v, seg, SUP, 'supino-reto').carga).toEqual({ tipo: 'kg', kg: 9 });
    [0, 1, 3, 4].forEach((k, i) => (v = treinar(v, seg + k, DIAS_BRUNO[(i + 2) % 4]!)));
    const h3 = hojeDoEstado(v, dia(seg + 7))!;
    expect(h3.semana).toBe(3);
    expect(totalSeries(v, seg + 7, SUP)).toBe(28);
  });

  it('P4: Bruno, 70 dias → carga −15%: 8,5 kg vira 8 kg (para baixo, nos halteres de 1 em 1 kg)', () => {
    const n = ULTIMO + 70;
    expect(hojeDoEstado(e, dia(n))!.bloco.reducao).toBe(0.15);
    expect(cargaDeHoje(e, n, SUP, 'supino-reto').carga).toEqual({ tipo: 'kg', kg: 8 });
  });

  it('P5: Bruno, 200 dias → propõe refazer o nível; a 1ª série acerta a carga, começando em 8 kg (−20%)', () => {
    const n = ULTIMO + 200;
    const h = hojeDoEstado(e, dia(n))!;
    expect(h.faixa).toBe('refazer-nivel');
    expect(h.bloco.calibrar).toBe(true);
    const { sug, carga } = cargaDeHoje(e, n, SUP, 'supino-reto');
    expect(sug.acao).toBe('calibrar');
    expect(carga).toEqual({ tipo: 'kg', kg: 8 });
    expect(sug.motivo).toMatch(/começando 20% abaixo/);
  });

  it('P6: Ana treinou a semana 1 (aprendizado) e ficou 10 dias sem treinar → volta na semana 2, ainda no aprendizado, com RIR 3–4', () => {
    let a = estadoDe(ana);
    const dias = a.programa!.programa.dias.map((d) => d.id);
    [0, 2, 4].forEach((n, i) => (a = treinar(a, n, dias[i]!)));
    const n = 4 + 10;
    const h = hojeDoEstado(a, dia(n))!;
    expect(h.semana).toBe(2);
    expect(h.fase?.regraId).toBe('iniciante.fase-aprendizado');
    expect(h.dias[0]!.exercicios[0]!.rir).toEqual([3, 4]);
    expect(totalSeries(a, n, dias[0]!)).toBe(12);
    // Antes do R2, a semana era a do calendário: a 3ª, com o programa completo.
    expect(seriesNormais(a, dias[0]!)).toBe(14); // 13 até a auditoria do treino (a ponte com halter; snapshots aprovados em 02/11/2026)
  });

  it('P7: Bruno, na semana 2 de uma volta, fica mais 15 dias sem treinar → só o RIR +1; a volta gradual não recomeça', () => {
    let v = e;
    const n = ULTIMO + 22;
    [0, 1, 3, 4].forEach((k, i) => (v = treinar(v, n + k, DIAS_BRUNO[i]!)));
    v = treinar(v, n + 7, SUP);
    const m = n + 7 + 15;
    const h = hojeDoEstado(v, dia(m))!;
    expect(h.faixa).toBe('rir+1');
    expect(h.bloco.pausaDias).toBe(22);
    expect(h.semana).toBe(3);
    expect(h.rirMais1).toEqual(DIAS_BRUNO);
  });

  it('P8: Bruno treina 1 vez por semana durante 5 semanas (pausas de 7 dias) → nunca é pausa, e o programa anda 1 semana por vez', () => {
    let v = estadoDe(bruno);
    for (let w = 0; w < 5; w++) {
      const h = hojeDoEstado(v, dia(w * 7))!;
      expect(h.faixa ?? 'normal').toBe('normal');
      expect(h.semana).toBe(w + 1);
      v = treinar(v, w * 7, DIAS_BRUNO[w % 4]!);
    }
    expect(blocoAtual(v.historico, dia(35)).pausaDias).toBeUndefined();
  });

  it('P9: polia na placa 8, 30 dias → 8 × 0,9 = 7,2 → placa 7', () => {
    const n = ULTIMO + 30;
    expect(cargaDeHoje(e, n, SUP, 'puxada-unilateral').carga).toEqual({ tipo: 'placa', placa: 7 });
  });
});

describe('a carga da volta em cada tipo de carga (readaptacao.semana1)', () => {
  const op = (exId: string, inv: Inventario) => opcoesCarga(exId, inv);
  it('kg pela lista do inventário de hoje, sempre para baixo; barra sem lista em degraus de 2,5 kg', () => {
    expect(cargaDaVolta({ tipo: 'kg', kg: 10 }, 0.1, op('supino-reto', bruno.inventario))).toEqual({ tipo: 'kg', kg: 9 });
    expect(cargaDaVolta({ tipo: 'kg', kg: 40 }, 0.15, { tipo: 'barra' })).toEqual({ tipo: 'kg', kg: 32.5 });
  });
  it('placa × (1 − redução), para baixo; anilhas no múltiplo da menor anilha; contrapeso com uma placa a mais; degrau um abaixo', () => {
    expect(cargaDaVolta({ tipo: 'placa', placa: 8 }, 0.1, { tipo: 'polia' })).toEqual({ tipo: 'placa', placa: 7 });
    expect(cargaDaVolta({ tipo: 'placa', placa: 1 }, 0.2, { tipo: 'polia' })).toEqual({ tipo: 'placa', placa: 1 });
    expect(cargaDaVolta({ tipo: 'anilha', kgPorLado: 20 }, 0.1, { tipo: 'anilha', menorAnilhaKg: 5 })).toEqual({ tipo: 'anilha', kgPorLado: 15 });
    expect(cargaDaVolta({ tipo: 'contrapeso', placa: 3 }, 0.1, { tipo: 'assistida', placasMax: 10 })).toEqual({ tipo: 'contrapeso', placa: 4 });
    expect(cargaDaVolta({ tipo: 'degrau', degrau: 2 }, 0.1, { tipo: 'peso-corpo' })).toEqual({ tipo: 'degrau', degrau: 1 });
    expect(cargaDaVolta({ tipo: 'degrau', degrau: 0 }, 0.1, { tipo: 'peso-corpo' })).toEqual({ tipo: 'degrau', degrau: 0 });
  });
});

describe('pausas com vários locais', () => {
  // Semana 1 no prédio; semana 2 com o Inferior A na academia do bairro (dia 8).
  const local = (n: number) => (n === 8 ? 'local-2' : 'local-1');
  const e = brunoDuasSemanas(estadoDe(bruno, LOCAIS_DO_BRUNO), local);

  it('a pausa conta o treino de qualquer local: o último foi no prédio, e 10 dias depois a academia do bairro também está "normal"', () => {
    expect(hojeDoEstado(e, dia(ULTIMO + 10))!.faixa).toBe('normal');
    expect(diasSemTreino(e.historico, dia(ULTIMO + 10))).toBe(10);
  });

  it('o Bruno volta de 30 dias na academia do bairro: a máquina parte da última carga daquele local −10%; o halter, da última em qualquer local', () => {
    const n = ULTIMO + 30;
    const flexora = cargaDeHoje(e, n, 'inferior-a', 'cadeira-flexora', 'local-2');
    expect(flexora.carga).toEqual({ tipo: 'placa', placa: 7 });
    expect(flexora.sug.regraId).toBe('readaptacao.semana1');
    // 10 kg × 0,9 = 9 kg; os halteres da academia do bairro vão de 2 em 2 kg, então vale o de baixo: 8 kg.
    const bulgaro = cargaDeHoje(e, n, 'inferior-a', 'bulgaro', 'local-2');
    expect(bulgaro.carga).toEqual({ tipo: 'kg', kg: 8 });
  });

  it('uma máquina sem registro naquele local recomeça pela calibração da 1ª série, que só desce na semana 1 da volta', () => {
    const n = ULTIMO + 30;
    // A puxada na polia só foi feita no prédio: numa 3ª academia (a da Carla), a polia é outra, e a carga recomeça
    // pela calibração, sem a carga do prédio.
    const e3 = { ...e, locais: [...e.locais!, { id: 'local-3', nome: 'Academia', inventario: carla.inventario }] };
    const { sug } = cargaDeHoje(e3, n, 'superior-a', 'puxada-unilateral', 'local-3');
    expect(sug.acao).toBe('calibrar');
    expect(sug.proxima).toBeUndefined();
    expect(sug.motivo).toMatch(/1ª vez nesta máquina neste local/);
    // A barra fixa (peso do corpo), nunca feita em lugar nenhum, também calibra.
    expect(cargaDeHoje(e, n, 'superior-a', 'barra-fixa', 'local-2').sug.acao).toBe('calibrar');
    expect(opcoesDaCarga(e, { id: dia(n), inicio: dia(n), localId: 'local-2' }).soDesce).toBe(true);
  });
});

describe('propriedades das pausas', () => {
  // Gerador de números determinístico (sem Math.random): LCG de Numerical Recipes.
  const lcg = (seed: number) => () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32;
  const sessaoEm = (n: number, kg = 10): Sessao => ({
    id: dia(n),
    diaId: 'superior-a',
    semana: 1,
    inicio: dia(n),
    fim: dia(n, 11),
    exercicios: [{ exId: 'supino-reto', series: [{ carga: { tipo: 'kg', kg }, reps: 10, rir: 2 }] }],
  });
  const prog = estadoDe(bruno).programa!.programa;

  it('com qualquer sequência de datas, a semana do programa nunca volta para trás dentro de um bloco', () => {
    for (let seed = 1; seed <= 200; seed++) {
      const rnd = lcg(seed);
      const h: Sessao[] = [];
      let n = 0;
      let antes = { inicio: '', semana: 0 };
      for (let k = 0; k < 25; k++) {
        n += 1 + Math.floor(rnd() * (rnd() < 0.15 ? 40 : 9));
        const hoje = hojeNoPrograma(prog, h, dia(n));
        if (hoje.bloco.inicio === antes.inicio) expect(hoje.semana).toBeGreaterThanOrEqual(antes.semana);
        else expect(hoje.semana).toBe(1);
        expect(hoje.semana).toBe(semanaDoPrograma(h, dia(n)));
        h.push(sessaoEm(n));
        antes = { inicio: blocoAtual(h, dia(n, 12)).inicio, semana: hoje.semana };
      }
    }
  });

  it('nenhuma pausa de até 13 dias muda a carga sugerida', () => {
    const inv = bruno.inventario;
    const x = prog.dias[0]!.exercicios.find((y) => y.exId === 'supino-reto')!;
    for (let seed = 1; seed <= 100; seed++) {
      const rnd = lcg(seed);
      const h: Sessao[] = [];
      let n = 0;
      for (let k = 0; k < 6; k++) {
        n += 1 + Math.floor(rnd() * 13);
        h.push(sessaoEm(n, 6 + Math.floor(rnd() * 5)));
      }
      const sug = (g: number) => {
        const hoje = hojeNoPrograma(prog, h, dia(n + g));
        const op = { ...(hoje.fase?.regraId === 'readaptacao.semana1' ? { soDesce: true } : {}), ...(hoje.bloco.pausaDias !== undefined ? { bloco: { inicio: hoje.bloco.inicio, reducao: hoje.bloco.reducao } } : {}) };
        const s = sugestaoDoExercicio(h, x, inv, op);
        return s.proxima ?? h.at(-1)!.exercicios[0]!.series[0]!.carga;
      };
      const base = sug(1);
      for (let g = 2; g <= 13; g++) expect(sug(g), `seed ${seed}, pausa ${g}`).toEqual(base);
    }
  });
});
