import { describe, expect, it } from 'vitest';
import { noInventario, opcoesCarga, sugestaoDoExercicio, type Sessao } from '../../src/domain/sessao';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';

// Peso livre (pedido do Gustavo, 26/11/2026; progressao.incremento.halteres): a lista de halteres "de 2 a 30, de 2 em 2"
// não tem 9 nem 35. Agora qualquer valor pode ser registrado ("Outro peso…"), e o peso já registrado no exercício, no
// mesmo local, passa a contar como peso que a pessoa tem: a sugestão não o arredonda de volta para a lista.
const INV = { halteres_fixos: { minKg: 2, maxKg: 30, passoKg: 2 }, banco: {} } as unknown as Inventario;
const EX = 'supino-reto';
const alvo = { exId: EX, reps: [8, 12] as [number, number], rir: [1, 2] as [number, number] };
const sessao = (id: string, kg: number, reps: number, rir: number, localId?: string): Sessao =>
  ({
    id,
    diaId: 'a',
    semana: 3,
    inicio: id,
    ...(localId ? { localId } : {}),
    exercicios: [{ exId: EX, series: [1, 2, 3].map(() => ({ carga: { tipo: 'kg', kg }, reps, rir })) }],
  }) as Sessao;

describe('peso livre: o que a pessoa registrou conta como peso que ela tem', () => {
  it('sem histórico, a lista é a do equipamento (não tem 9 nem 35)', () => {
    const lista = opcoesCarga(EX, INV).lista!;
    expect(lista).toContain(8);
    expect(lista).not.toContain(9);
    expect(lista.at(-1)).toBe(30);
  });

  it('com 9 e 35 registrados, a lista os tem, em ordem, sem repetir', () => {
    const historico = [sessao('2026-11-20T10:00:00.000Z', 9, 10, 2), sessao('2026-11-22T10:00:00.000Z', 35, 10, 2), sessao('2026-11-24T10:00:00.000Z', 8, 10, 2)];
    const lista = opcoesCarga(EX, INV, { historico }).lista!;
    expect(lista.filter((k) => k === 9)).toHaveLength(1);
    expect(lista.at(-1)).toBe(35);
    expect(lista).toEqual([...lista].sort((a, b) => a - b));
    expect(lista.filter((k) => k === 8)).toHaveLength(1);
  });

  it('a carga da sessão aberta também conta (o "Outro peso…" antes de salvar o treino)', () => {
    expect(opcoesCarga(EX, INV, { daSessao: [{ tipo: 'kg', kg: 22.5 }] }).lista).toContain(22.5);
  });

  it('o peso registrado num local não vale em outro', () => {
    const historico = [sessao('2026-11-20T10:00:00.000Z', 35, 10, 2, 'academia')];
    expect(opcoesCarga(EX, INV, { historico, local: { localId: 'academia' } }).lista).toContain(35);
    expect(opcoesCarga(EX, INV, { historico, local: { localId: 'casa' } }).lista).not.toContain(35);
  });

  it('manter não arredonda 9 para 8, nem corta 35 para 30', () => {
    for (const kg of [9, 35]) {
      const historico = [sessao('2026-11-20T10:00:00.000Z', kg, 9, 2)];
      expect(sugestaoDoExercicio(historico, alvo, INV).acao, `${kg} kg`).toBe('manter');
      expect(noInventario({ tipo: 'kg', kg }, opcoesCarga(EX, INV, { historico }))).toEqual({ carga: { tipo: 'kg', kg }, ajustada: false });
    }
  });

  it('a subida a partir de 9 vai para o próximo peso que existe (10; salto de 11%, por isso 13 repetições), e de 35 não inventa um peso', () => {
    const topo = (kg: number) => [sessao('2026-11-18T10:00:00.000Z', kg, 13, 1), sessao('2026-11-20T10:00:00.000Z', kg, 13, 1)];
    const de9 = sugestaoDoExercicio(topo(9), alvo, INV);
    expect(de9.acao).toBe('subir');
    expect(de9.proxima).toEqual({ tipo: 'kg', kg: 10 });
    expect(sugestaoDoExercicio(topo(35), alvo, INV).proxima).toBeUndefined();
  });
});
