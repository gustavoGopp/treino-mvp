import { describe, expect, it } from 'vitest';
import { opcoesDeAjuste } from '../../src/domain/gerador/opcoes';
import { ana, bruno, diego } from '../personas';

describe('escolhas calculadas (opcoesDeAjuste)', () => {
  it('sem problema, sem opções', () => {
    expect(opcoesDeAjuste(bruno.perfil, bruno.inventario)).toEqual([]);
  });
  it('Diego (3 × 30): +15 min aparece e resolve; "manter" sempre por último', () => {
    // Com 45 min, de 06/11/2026 até o R5d o Diego não tinha o que ajustar; desde o R5d (a meta do foco do iniciante foi de
    // 8 para 10), as costas ficam com 9 de 10 e um dia passa 2 min do tempo, e o +15 min resolve os dois. Com 30 min, o
    // +15 min continua aparecendo e reduzindo os problemas (sem resolver tudo, desde o R5d: os 45 min do Diego são os de cima).
    const com45 = opcoesDeAjuste(diego.perfil, diego.inventario).find((x) => x.id === 'mais-tempo')!;
    expect(com45.diasAcimaDoTempo).toBe(0);
    expect(com45.abaixoDaMeta).toEqual([]);
    const o = opcoesDeAjuste({ ...diego.perfil, minutosSessao: 30 }, diego.inventario);
    expect(o.at(-1)!.id).toBe('manter');
    const maisTempo = o.find((x) => x.id === 'mais-tempo')!;
    expect(maisTempo.minutosSessao).toBe(45);
    const manter = o.at(-1)!;
    expect(maisTempo.diasAcimaDoTempo + maisTempo.abaixoDaMeta.length).toBeLessThan(manter.diasAcimaDoTempo + manter.abaixoDaMeta.length);
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
