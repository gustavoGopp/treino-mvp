import { beforeAll, describe, expect, it, vi } from 'vitest';
import { contextoDeSelecao, gerarPrograma } from '../../src/domain/gerador';
import { medirCuidados, MEDIDA_IDS, MEDIDAS } from '../../scripts/auditoria/cuidados';
import { populacao } from '../../scripts/auditoria/populacao';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS } from '../personas/todos';

// Sessão "treino para todos", etapa 1: o protótipo (scripts/auditoria/prototipo) é uma cópia do gerador para medir
// regras novas sem mudar o app. Com todas as regras desligadas (PROT=nada), ele tem de dar o mesmo programa que o app:
// é isso que garante que o "antes" das medidas é o app de verdade.
const TODAS = { ...PERSONAS, ...PERSONAS_NOVAS };

describe('protótipo do gerador, com tudo desligado', () => {
  let gerarNoPrototipo: typeof gerarPrograma;
  beforeAll(async () => {
    vi.stubEnv('PROT', 'nada');
    vi.resetModules();
    gerarNoPrototipo = ((await import('../../scripts/auditoria/prototipo/gerador')) as unknown as { gerarPrograma: typeof gerarPrograma }).gerarPrograma;
  });
  it.each(Object.entries(TODAS))('dá o mesmo programa que o app para %s', (_nome, p) => {
    expect(gerarNoPrototipo(p.perfil, p.inventario)).toEqual(gerarPrograma(p.perfil, p.inventario));
  });
});

describe('os 20 cuidados (régua da sessão)', () => {
  it('toda medida tem cuidado de 1 a 20, tipo e nome', () => {
    for (const k of MEDIDA_IDS) {
      expect(MEDIDAS[k].cuidado).toBeGreaterThanOrEqual(1);
      expect(MEDIDAS[k].cuidado).toBeLessThanOrEqual(20);
      expect(MEDIDAS[k].nome.length).toBeGreaterThan(10);
    }
  });
  it.each(Object.entries(TODAS))('mede o programa de %s sem defeito de segurança', (_nome, p) => {
    const r = gerarPrograma(p.perfil, p.inventario);
    expect(r.status).toBe('ok');
    if (r.status !== 'ok') return;
    const c = medirCuidados(r.programa, p.perfil, p.inventario, contextoDeSelecao(p.perfil, p.inventario));
    expect(c.falhas.has('c14a')).toBe(false);
    expect(c.n.series).toBeGreaterThan(0);
  });
  it('os pesos da população somam 1', () => {
    let soma = 0;
    for (const c of populacao()) soma += c.peso;
    expect(soma).toBeCloseTo(1, 6);
  });
});
