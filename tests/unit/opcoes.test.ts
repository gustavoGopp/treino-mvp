import { describe, expect, it } from 'vitest';
import { opcoesDeAjuste } from '../../src/domain/gerador/opcoes';
import { ana, bruno, diego } from '../personas';

describe('escolhas calculadas (opcoesDeAjuste)', () => {
  it('sem problema, sem opções', () => {
    expect(opcoesDeAjuste(bruno.perfil, bruno.inventario)).toEqual([]);
  });
  it('Diego (3 × 45): +1 dia aparece e resolve; "manter" sempre por último', () => {
    const o = opcoesDeAjuste(diego.perfil, diego.inventario);
    expect(o.at(-1)!.id).toBe('manter');
    const maisUm = o.find((x) => x.id === 'mais-um-dia')!;
    expect(maisUm.diasSemana).toBe(4);
    expect(maisUm.diasAcimaDoTempo).toBe(0);
    expect(maisUm.abaixoDaMeta).not.toEqual(expect.arrayContaining(['peito', 'costas']));
  });
  it('Ana (3 × 50): oferece opções que reduzem os problemas, ordenadas da melhor para a pior', () => {
    const o = opcoesDeAjuste(ana.perfil, ana.inventario);
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
