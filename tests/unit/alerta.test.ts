import { describe, expect, it } from 'vitest';
import { alertaPendente } from '../../src/domain/sessao';

// seguranca.alerta.cardiovascular: depois de um treino encerrado por sinal de alerta do coração, novos treinos ficam
// bloqueados até a pessoa confirmar que foi avaliada.
const treino = (dia: string, extra: object = {}) => ({ inicio: `2026-11-${dia}T13:00:00.000Z`, fim: `2026-11-${dia}T13:40:00.000Z`, ...extra });

describe('bloqueio depois do sinal de alerta do coração', () => {
  it('sem treino encerrado por alerta, nada bloqueia', () => {
    expect(alertaPendente([])).toBe(false);
    expect(alertaPendente([treino('02'), treino('04')])).toBe(false);
  });

  it('um treino encerrado pelo alerta bloqueia até a confirmação, mesmo com treinos antigos depois dele no histórico', () => {
    expect(alertaPendente([treino('02'), treino('04', { encerradaPorAlerta: true })])).toBe(true);
    expect(alertaPendente([treino('04', { encerradaPorAlerta: true }), treino('06')])).toBe(true);
  });

  it('a confirmação posterior ao treino libera; uma anterior, não', () => {
    const h = [treino('04', { encerradaPorAlerta: true })];
    expect(alertaPendente(h, '2026-11-05T10:00:00.000Z')).toBe(false);
    expect(alertaPendente(h, '2026-11-03T10:00:00.000Z')).toBe(true);
  });

  it('um alerta novo depois da confirmação bloqueia de novo', () => {
    const h = [treino('04', { encerradaPorAlerta: true }), treino('10', { encerradaPorAlerta: true })];
    expect(alertaPendente(h, '2026-11-05T10:00:00.000Z')).toBe(true);
    expect(alertaPendente(h, '2026-11-11T10:00:00.000Z')).toBe(false);
  });

  it('o sinal de cauda equina manda a um pronto-socorro e não bloqueia (a regra dele não pede)', () => {
    expect(alertaPendente([treino('04', { encerradaPorAlerta: true, alerta: 'cauda-equina' as const })])).toBe(false);
  });

  it('sem hora de fim, vale a de início', () => {
    expect(alertaPendente([{ inicio: '2026-11-04T13:00:00.000Z', encerradaPorAlerta: true }], '2026-11-04T12:00:00.000Z')).toBe(true);
  });
});
