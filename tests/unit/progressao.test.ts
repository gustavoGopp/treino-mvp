import { describe, expect, it } from 'vitest';
import { proximaCarga, serieEfetiva, sugerirProgressao, sugerirSemanaLeve, type Carga, type SessaoExercicio } from '../../src/domain/progressao';

const kg = (k: number): Carga => ({ tipo: 'kg', kg: k });
const sessao = (c: Carga, reps: number[], rir = 1, extra: Partial<SessaoExercicio['series'][number]> = {}): SessaoExercicio => ({
  series: reps.map((r) => ({ carga: c, reps: r, rir, ...extra })),
});
const alvo = { reps: [8, 12] as [number, number], rir: [1, 2] as [number, number] };
const halter = { tipo: 'halter' as const, lista: [8, 9, 10, 12, 14, 16, 18] };

describe('dupla progressão', () => {
  it('sem histórico: manter', () => expect(sugerirProgressao([], alvo, halter).acao).toBe('manter'));
  it('dentro da faixa: manter e buscar +1 repetição', () => {
    expect(sugerirProgressao([sessao(kg(10), [10, 9, 9])], alvo, halter)).toMatchObject({ acao: 'manter', regraId: 'progressao.manter' });
  });
  it('topo da faixa em 2 sessões seguidas: subir para o próximo halter', () => {
    const h = [sessao(kg(20), [12, 12, 12]), sessao(kg(20), [12, 12, 12])];
    expect(sugerirProgressao(h, alvo, { tipo: 'halter', lista: [20, 22] })).toMatchObject({ acao: 'subir', proxima: kg(22), regraId: 'progressao.subir' });
  });
  it('topo em uma sessão só: ainda manter', () => {
    expect(sugerirProgressao([sessao(kg(10), [11, 10, 10]), sessao(kg(10), [12, 12, 12])], alvo, halter).acao).toBe('manter');
  });
  it('repetições com amplitude encurtada não contam', () => {
    const h = [sessao(kg(10), [12, 12, 12]), sessao(kg(10), [12, 12, 12], 1, { amplitudeCompleta: false })];
    expect(sugerirProgressao(h, alvo, halter).acao).toBe('manter');
  });
  it('as quedas do drop set ficam fora da progressão (tempo.drop-set)', () => {
    const h = [sessao(kg(10), [12, 12, 12]), sessao(kg(10), [12, 12, 12])];
    const comQuedas = h.map((x) => ({ series: x.series.map((y, i) => (i === 2 ? { ...y, quedas: [{ carga: kg(8), reps: 8 }, { carga: kg(6), reps: 6 }] } : y)) }));
    expect(sugerirProgressao(comQuedas, alvo, halter)).toEqual(sugerirProgressao(h, alvo, halter));
  });
  it('salto acima de 10% pede 1–2 repetições acima do topo antes', () => {
    const h = [sessao(kg(8), [12, 12, 12]), sessao(kg(8), [12, 12, 12])];
    const s = sugerirProgressao(h, alvo, { tipo: 'halter', lista: [8, 10] });
    expect(s).toMatchObject({ acao: 'manter', regraId: 'progressao.salto-grande' });
    const h2 = [sessao(kg(8), [13, 13, 13]), sessao(kg(8), [13, 13, 13])];
    expect(sugerirProgressao(h2, alvo, { tipo: 'halter', lista: [8, 10] })).toMatchObject({ acao: 'subir', proxima: kg(10) });
  });
  it('carga leve demais: 2 incrementos, se o salto total ficar em até ~10%', () => {
    const fina = { tipo: 'halter' as const, lista: [20, 21, 22, 24] };
    expect(sugerirProgressao([sessao(kg(20), [15, 13, 12])], alvo, fina)).toMatchObject({ acao: 'subir', proxima: kg(22), regraId: 'progressao.carga-leve' });
  });
  it('carga leve demais com salto grande: 1 incremento só (auditoria, achado 3; antes, 9 → 12 kg, +33%)', () => {
    expect(sugerirProgressao([sessao(kg(9), [15, 13, 12])], alvo, halter)).toMatchObject({ acao: 'subir', proxima: kg(10), regraId: 'progressao.carga-leve' });
  });
  describe('sem vaivém (auditoria do treino, achado 3)', () => {
    const faixa = { reps: [6, 10] as [number, number], rir: [1, 2] as [number, number] };
    it('halteres de 2 em 2 kg: 18 kg × 12 sobe para 20, e não para 22 (+22%)', () => {
      const op = { tipo: 'halter' as const, lista: [16, 18, 20, 22, 24] };
      expect(sugerirProgressao([sessao(kg(18), [12, 11, 10])], faixa, op)).toMatchObject({ acao: 'subir', proxima: kg(20) });
    });
    it('máquina de placas: na carga leve, 1 placa por vez', () => {
      const p = (n: number): Carga => ({ tipo: 'placa', placa: n });
      const op = { tipo: 'maquina' as const, placasMax: 15 };
      expect(sugerirProgressao([sessao(p(8), [17, 16, 15], 0)], { reps: [10, 15], rir: [0, 1] }, op)).toMatchObject({ acao: 'subir', proxima: p(9) });
    });
    it('só 2 pares (5 e 10 kg): depois de voltar dos 10 kg, não tenta os 10 kg de novo logo em seguida; segue a escada', () => {
      const op = { tipo: 'halter' as const, lista: [5, 10] };
      const h = [sessao(kg(5), [23, 22, 21]), sessao(kg(10), [0, 0, 0], 0), sessao(kg(5), [23, 22, 21])];
      expect(sugerirProgressao(h.slice(0, 1), faixa, op)).toMatchObject({ acao: 'subir', proxima: kg(10) });
      expect(sugerirProgressao(h.slice(0, 2), faixa, op)).toMatchObject({ acao: 'voltar', proxima: kg(5) });
      expect(sugerirProgressao(h, faixa, op)).toMatchObject({ acao: 'manter', regraId: 'equipamento.escada-carga-leve' });
      // Passadas 6 sessões sem tentar, a carga volta a ser sugerida.
      const depois = [...h, ...Array.from({ length: 6 }, () => sessao(kg(5), [24, 23, 22]))];
      expect(sugerirProgressao(depois, faixa, op)).toMatchObject({ acao: 'subir', proxima: kg(10) });
    });
  });
  it('subiu e a 1ª série ficou abaixo do mínimo: voltar à carga anterior', () => {
    const h = [sessao(kg(10), [12, 12, 12]), sessao(kg(12), [6, 6, 5])];
    expect(sugerirProgressao(h, alvo, halter)).toMatchObject({ acao: 'voltar', proxima: kg(10), regraId: 'progressao.salto-grande' });
  });
  it('2 sessões abaixo do mínimo: reduzir 5–10%', () => {
    const h = [sessao(kg(14), [7, 6, 6]), sessao(kg(14), [7, 6, 5])];
    expect(sugerirProgressao(h, alvo, halter)).toMatchObject({ acao: 'reduzir', proxima: kg(12), regraId: 'progressao.reduzir' });
  });
  it('3 sessões sem melhora: estagnado', () => {
    const h = [sessao(kg(12), [10, 9, 9]), sessao(kg(12), [10, 9, 8]), sessao(kg(12), [9, 9, 9])];
    expect(sugerirProgressao(h, alvo, halter).acao).toBe('estagnado');
  });
  it('sem carga maior disponível: escada de dificuldade', () => {
    const h = [sessao(kg(18), [12, 12, 12]), sessao(kg(18), [12, 12, 12])];
    expect(sugerirProgressao(h, alvo, halter)).toMatchObject({ acao: 'manter', regraId: 'equipamento.escada-carga-leve' });
  });
  it('polia: +1 placa; respeita o limite da pilha', () => {
    const p = (n: number): Carga => ({ tipo: 'placa', placa: n });
    const h = [sessao(p(6), [12, 12, 12]), sessao(p(6), [12, 12, 12])];
    expect(sugerirProgressao(h, alvo, { tipo: 'polia' })).toMatchObject({ acao: 'subir', proxima: p(7) });
    expect(sugerirProgressao(h, alvo, { tipo: 'polia', placasMax: 6 }).regraId).toBe('equipamento.escada-carga-leve');
  });
  it('peso do corpo: próximo degrau da escada', () => {
    const d = (n: number): Carga => ({ tipo: 'degrau', degrau: n });
    const h = [sessao(d(0), [20, 20]), sessao(d(0), [20, 20])];
    expect(sugerirProgressao(h, { reps: [8, 20], rir: [1, 2] }, { tipo: 'peso-corpo' })).toMatchObject({ acao: 'subir', proxima: d(1) });
    expect(proximaCarga(d(3), 1, { tipo: 'peso-corpo' })).toBeUndefined();
    expect(proximaCarga(d(0), -1, { tipo: 'peso-corpo' })).toBeUndefined();
  });
  it('barra sem o passo informado: degraus de 2,5 kg; a redução cai no degrau mais perto (antes, 37 kg, que não existe)', () => {
    expect(proximaCarga(kg(40), 1, { tipo: 'barra' })).toEqual(kg(42.5));
    expect(proximaCarga(kg(2.5), -1, { tipo: 'barra' })).toBeUndefined();
    const h = [sessao(kg(40), [7, 6]), sessao(kg(40), [6, 6])];
    expect(sugerirProgressao(h, alvo, { tipo: 'barra' })).toMatchObject({ acao: 'reduzir', proxima: kg(37.5) });
    // Com a menor anilha de 2 kg (passo de 4 kg a partir da barra de 20): 40 → 36.
    expect(sugerirProgressao(h, alvo, { tipo: 'barra', passoKg: 4, baseKg: 20 })).toMatchObject({ acao: 'reduzir', proxima: kg(36) });
  });
});

describe('segurança na progressão', () => {
  it('dor > 5: interromper; dor 3–5: ajustar com carga menor', () => {
    expect(sugerirProgressao([sessao(kg(12), [10], 1, { dor: 6 })], alvo, halter).acao).toBe('interromper');
    expect(sugerirProgressao([sessao(kg(12), [10], 1, { dor: 4 })], alvo, halter)).toMatchObject({ acao: 'ajustar', proxima: kg(10) });
  });
});

describe('semana leve e série efetiva', () => {
  it('sugere só com sinal, e nunca na carência (deload.semana-leve)', () => {
    const sem = { exerciciosEstagnados: 0, pesadoNosUltimos3: 0, dorQueSeRepete: 0 };
    expect(sugerirSemanaLeve(sem).sugerir).toBe(false);
    expect(sugerirSemanaLeve({ ...sem, exerciciosEstagnados: 1, pesadoNosUltimos3: 1 }).sugerir).toBe(false);
    expect(sugerirSemanaLeve({ exerciciosEstagnados: 2, pesadoNosUltimos3: 2, dorQueSeRepete: 1 }).motivos).toHaveLength(3);
    expect(sugerirSemanaLeve({ ...sem, pesadoNosUltimos3: 2 }).sugerir).toBe(true);
    expect(sugerirSemanaLeve({ ...sem, pesadoNosUltimos3: 2, carencia: true }).sugerir).toBe(false);
    expect(sugerirSemanaLeve(sem).texto).toMatch(/^Para descansar, não para crescer\./);
  });
  it('RIR até 4 conta; acima não', () => {
    expect(serieEfetiva({ carga: kg(10), reps: 10, rir: 4 })).toBe(true);
    expect(serieEfetiva({ carga: kg(10), reps: 10, rir: 5 })).toBe(false);
  });
});

describe('tipos de carga do R0c (pesquisa-v2/08, seção 1.1)', () => {
  const anilha = (k: number): Carga => ({ tipo: 'anilha', kgPorLado: k });
  const contra = (p: number): Carga => ({ tipo: 'contrapeso', placa: p });
  it('progressao.incremento.maquina-anilha: sobe o menor par de anilhas (padrão 2 kg, ou o informado)', () => {
    expect(proximaCarga(anilha(20), 1, { tipo: 'anilha' })).toEqual(anilha(22));
    expect(proximaCarga(anilha(20), 1, { tipo: 'anilha', menorAnilhaKg: 1.25 })).toEqual(anilha(21.25));
    expect(proximaCarga(anilha(2), -2, { tipo: 'anilha' })).toBeUndefined();
    const h = [sessao(anilha(20), [12, 12, 12]), sessao(anilha(20), [12, 12, 12])];
    expect(sugerirProgressao(h, alvo, { tipo: 'anilha' })).toMatchObject({ acao: 'subir', proxima: anilha(22), regraId: 'progressao.subir' });
    // abaixo do mínimo em 2 sessões: reduz para o múltiplo do passo, pelo menos 1 passo
    const baixo = [sessao(anilha(20), [6, 6]), sessao(anilha(20), [6, 6])];
    expect(sugerirProgressao(baixo, alvo, { tipo: 'anilha' })).toMatchObject({ acao: 'reduzir', proxima: anilha(18) });
  });
  it('progressao.incremento.assistido: progredir é tirar placa de contrapeso; mais placa = mais fácil', () => {
    expect(proximaCarga(contra(6), 1, { tipo: 'assistida' })).toEqual(contra(5));
    expect(proximaCarga(contra(6), -1, { tipo: 'assistida' })).toEqual(contra(7));
    expect(proximaCarga(contra(6), -1, { tipo: 'assistida', placasMax: 6 })).toBeUndefined();
    const h = [sessao(contra(6), [12, 12, 12]), sessao(contra(6), [12, 12, 12])];
    expect(sugerirProgressao(h, alvo, { tipo: 'assistida' })).toMatchObject({ acao: 'subir', proxima: contra(5) });
    // tirar placa e ficar pesado demais: volta à placa anterior (o sentido "mais difícil" é invertido)
    const pesado = [sessao(contra(6), [12, 12]), sessao(contra(5), [5, 5])];
    expect(sugerirProgressao(pesado, alvo, { tipo: 'assistida' })).toMatchObject({ acao: 'voltar', proxima: contra(6), regraId: 'progressao.salto-grande' });
    // dor 3–5: mais ajuda
    expect(sugerirProgressao([sessao(contra(4), [10], 1, { dor: 4 })], alvo, { tipo: 'assistida' }).proxima).toEqual(contra(5));
  });
  it('sem contrapeso para tirar: a sugestão é passar para a versão livre (barra fixa ou mergulho)', () => {
    const h = [sessao(contra(1), [12, 12, 12]), sessao(contra(1), [12, 12, 12])];
    const s = sugerirProgressao(h, alvo, { tipo: 'assistida' });
    expect(s).toMatchObject({ acao: 'subir', regraId: 'progressao.incremento.assistido' });
    expect(s.proxima).toBeUndefined();
    expect(s.motivo).toMatch(/versão livre/);
  });
  it('kettlebell: próximo peso da lista; salto acima de ~10% pede repetições acima do topo antes (progressao.salto-grande)', () => {
    const kb = { tipo: 'kettlebell' as const, lista: [8, 12, 16] };
    expect(proximaCarga(kg(8), 1, kb)).toEqual(kg(12));
    const h = [sessao(kg(8), [12, 12, 12]), sessao(kg(8), [12, 12, 12])];
    expect(sugerirProgressao(h, alvo, kb)).toMatchObject({ acao: 'manter', regraId: 'progressao.salto-grande' });
    const h2 = [sessao(kg(8), [13, 13, 13]), sessao(kg(8), [13, 13, 13])];
    expect(sugerirProgressao(h2, alvo, kb)).toMatchObject({ acao: 'subir', proxima: kg(12) });
  });
});
