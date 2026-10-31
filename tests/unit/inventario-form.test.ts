import { describe, expect, it } from 'vitest';
import { CATEGORIAS, deForm, formVazio, itensDaCategoria, paraForm } from '../../src/features/onboarding/inventarioForm';
import { ITEM_IDS } from '../../src/domain/taxonomia/equipamentos';
import { PERSONAS } from '../personas';

describe('checklist do inventário', () => {
  it('cada item da taxonomia aparece em exatamente uma categoria', () => {
    const todos = CATEGORIAS.flatMap((c) => itensDaCategoria(c.id));
    expect([...todos].sort()).toEqual([...ITEM_IDS].sort());
  });

  it.each(Object.keys(PERSONAS))('ida e volta pelo formulário preserva o inventário de %s', (nome) => {
    const inv = PERSONAS[nome as keyof typeof PERSONAS].inventario;
    expect(deForm(paraForm(inv))).toEqual({ inventario: inv, erros: {} });
  });

  it('sem nada marcado, o inventário fica vazio (só peso do corpo)', () => {
    expect(deForm(formVazio())).toEqual({ inventario: {}, erros: {} });
  });

  it('pede os atributos que mudam a prescrição, sem valor padrão', () => {
    const f = { ...formVazio(), marcados: ['halteres_fixos', 'polia_simples', 'banco_regulavel', 'elasticos', 'anilhas_e_manoplas'] as const };
    const { inventario, erros } = deForm({ ...f, marcados: [...f.marcados], anilhas: { manoplas: '', manoplaKg: '', linhas: [{ kg: '', qtd: '' }] } });
    expect(inventario).toBeNull();
    expect(Object.keys(erros).sort()).toEqual(
      [
        'anilhas.linhas',
        'anilhas.manoplaKg',
        'anilhas.manoplas',
        'bancoRegulavel.declina',
        'elasticos.intensidades',
        'halteres.max',
        'halteres.min',
        'halteres.passo',
        'poliaSimples.regulavel',
      ].sort(),
    );
  });

  it('confere a faixa dos halteres e aceita vírgula como decimal', () => {
    const base = { ...formVazio(), marcados: ['halteres_fixos' as const] };
    expect(deForm({ ...base, halteres: { min: '10', max: '4', passo: '2' } }).erros['halteres.max']).toBeDefined();
    expect(deForm({ ...base, halteres: { min: '2', max: '4', passo: '5' } }).erros['halteres.passo']).toBeDefined();
    expect(deForm({ ...base, halteres: { min: '1,5', max: '10', passo: '0,5' } }).inventario).toEqual({
      halteres_fixos: { minKg: 1.5, maxKg: 10, passoKg: 0.5 },
    });
  });

  it('anilhas: quantidade inteira e linhas vazias ignoradas', () => {
    const f = {
      ...formVazio(),
      marcados: ['anilhas_e_manoplas' as const],
      anilhas: { manoplas: '2', manoplaKg: '2', linhas: [{ kg: '5', qtd: '2,5' }, { kg: '10', qtd: '0' }, { kg: '', qtd: '' }] },
    };
    expect(deForm(f).erros['anilhas.0.qtd']).toBeDefined();
    f.anilhas.linhas[0]!.qtd = '4';
    expect(deForm(f).inventario).toEqual({ anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 5, qtd: 4 }] } });
  });
});
