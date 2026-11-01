import { describe, expect, it } from 'vitest';
import { opcoesDeAjuste } from '../../src/domain/gerador/opcoes';
import { ana, bruno, diego } from '../personas';

describe('escolhas calculadas (opcoesDeAjuste)', () => {
  it('sem problema, sem opções', () => {
    expect(opcoesDeAjuste(bruno.perfil, bruno.inventario)).toEqual([]);
  });
  it('Diego (3 × 45): +15 min aparece e resolve; "manter" sempre por último', () => {
    const o = opcoesDeAjuste(diego.perfil, diego.inventario);
    expect(o.at(-1)!.id).toBe('manter');
    const maisTempo = o.find((x) => x.id === 'mais-tempo')!;
    expect(maisTempo.minutosSessao).toBe(60);
    expect(maisTempo.diasAcimaDoTempo).toBe(0);
    expect(maisTempo.abaixoDaMeta).toEqual([]);
  });
  it('+1 dia vai até 6 e volta para a divisão recomendada dos novos dias', () => {
    const p = { ...ana.perfil, divisao: 'si-ct' as const, minutosSessao: 35 };
    const maisUm = opcoesDeAjuste(p, ana.inventario).find((x) => x.id === 'mais-um-dia')!;
    expect(maisUm.perfil.diasSemana).toBe(4);
    expect(maisUm.perfil.divisao).toBeUndefined();
    const seis = { ...ana.perfil, diasSemana: 6 as const, divisao: 'ppl-2x' as const, minutosSessao: 25 };
    expect(opcoesDeAjuste(seis, ana.inventario).length).toBeGreaterThan(0);
    expect(opcoesDeAjuste(seis, ana.inventario).some((x) => x.id === 'mais-um-dia')).toBe(false);
  });
  it('Ana (3 × 40): oferece opções que reduzem os problemas, ordenadas da melhor para a pior', () => {
    const o = opcoesDeAjuste({ ...ana.perfil, minutosSessao: 40 }, ana.inventario);
    expect(o.length).toBeGreaterThan(1);
    const manter = o.at(-1)!;
    for (const x of o.slice(0, -1)) expect(x.abaixoDaMeta.length + x.diasAcimaDoTempo).toBeLessThan(manter.abaixoDaMeta.length + manter.diasAcimaDoTempo);
    expect(manter.texto).toContain('Metas reduzidas');
  });
  it('é determinístico', () => {
    expect(JSON.stringify(opcoesDeAjuste(diego.perfil, diego.inventario))).toBe(JSON.stringify(opcoesDeAjuste(diego.perfil, diego.inventario)));
  });
  it('triagem bloqueada: nenhuma opção', () => {
    const triagem = { ...diego.perfil.triagem, respostas: { ...diego.perfil.triagem.respostas, peito: true } };
    expect(opcoesDeAjuste({ ...diego.perfil, triagem }, diego.inventario)).toEqual([]);
  });
});
