import { describe, expect, it } from 'vitest';
import { porChaveSeDerCerto, umaVezSeDerCerto } from '../../src/domain/umaVez';

// Auditoria de 12/11/2026: uma importação que falhava (sem rede, versão nova publicada) ficava guardada até recarregar.
describe('guardar só o que deu certo', () => {
  it('a falha não fica guardada: a chamada seguinte tenta de novo; o acerto é feito uma vez só', async () => {
    let chamadas = 0;
    const carregar = umaVezSeDerCerto(async () => {
      chamadas++;
      if (chamadas === 1) throw new Error('sem rede');
      return `ok ${chamadas}`;
    });
    await expect(carregar()).rejects.toThrow('sem rede');
    await expect(carregar()).resolves.toBe('ok 2');
    await expect(carregar()).resolves.toBe('ok 2');
    expect(chamadas).toBe(2);
  });

  it('chamadas ao mesmo tempo dividem a mesma tentativa', async () => {
    let chamadas = 0;
    const carregar = umaVezSeDerCerto(async () => ++chamadas);
    expect(await Promise.all([carregar(), carregar(), carregar()])).toEqual([1, 1, 1]);
  });

  it('por chave: a que falha é esquecida, as outras ficam', async () => {
    const vezes: Record<string, number> = {};
    const carregar = porChaveSeDerCerto(async (k) => {
      vezes[k] = (vezes[k] ?? 0) + 1;
      if (k === 'ruim' && vezes[k] === 1) throw new Error('falhou');
      return `${k}:${vezes[k]}`;
    });
    await expect(carregar('ruim')).rejects.toThrow();
    expect(await carregar('boa')).toBe('boa:1');
    expect(await carregar('ruim')).toBe('ruim:2');
    expect(await carregar('boa')).toBe('boa:1');
    expect(await carregar('ruim')).toBe('ruim:2');
  });
});
