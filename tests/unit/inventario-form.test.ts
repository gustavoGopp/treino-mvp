import { describe, expect, it } from 'vitest';
import { CATEGORIAS, deForm, formVazio, itensDaCategoria, paraForm } from '../../src/features/onboarding/inventarioForm';
import { ITEM_IDS, type Inventario } from '../../src/domain/taxonomia/equipamentos';
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
    const f = {
      ...formVazio(),
      marcados: ['halteres_fixos', 'polia_simples', 'banco_regulavel', 'elasticos', 'anilhas_e_manoplas', 'multifuncional', 'kettlebell', 'voador', 'triceps_maquina'] as const,
    };
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
        'kettlebell.pesos',
        'multifuncional.estacoes',
        'poliaSimples.altura',
        'tricepsMaquina.acimaDaCabeca',
        'voador.invertido',
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

describe('atributos novos do R0c no checklist', () => {
  it('polia simples pela altura, estações do multifuncional, pesos do kettlebell, voador e tríceps', () => {
    const f = {
      ...formVazio(),
      marcados: ['polia_simples', 'multifuncional', 'kettlebell', 'voador', 'triceps_maquina'] as const,
      poliaSimples: { altura: 'baixa' as const, placas: '' },
      multifuncional: { estacoes: ['puxador' as const, 'extensora' as const] },
      kettlebell: { pesos: [16, 8, 8] },
      voador: { invertido: true },
      tricepsMaquina: { acimaDaCabeca: false },
    };
    const { inventario, erros } = deForm({ ...f, marcados: [...f.marcados] });
    expect(erros).toEqual({});
    expect(inventario).toEqual({
      polia_simples: { altura: 'baixa' },
      multifuncional: { puxador: true, remadaBaixa: false, extensora: true, flexora: false, voador: false, supino: false },
      kettlebell: { pesosKg: [8, 16] },
      voador: { invertido: true },
      triceps_maquina: { acimaDaCabeca: false },
    });
    expect(paraForm(inventario!)).toMatchObject({ poliaSimples: { altura: 'baixa' }, multifuncional: { estacoes: ['puxador', 'extensora'] }, kettlebell: { pesos: [8, 16] } });
  });

  it('atributos que a tela não pergunta (placas, menor anilha, peso da barra) passam intactos pela ida e volta', () => {
    const inv = { leg_press: { menorAnilhaKg: 1.25 }, barra_longa: { pesoBarraKg: 20 }, multifuncional: { puxador: true, placas: 15 }, cadeira_extensora: { placas: 12, kgPorPlaca: 5 } };
    const { inventario } = deForm(paraForm(inv as Inventario));
    expect(inventario).toEqual({ ...inv, multifuncional: { puxador: true, remadaBaixa: false, extensora: false, flexora: false, voador: false, supino: false, placas: 15 } });
  });

  it('a foto preenche a altura da polia, as estações e os pesos do kettlebell, só se estiverem vazios', async () => {
    const { comSugestoes } = await import('../../src/features/onboarding/inventarioForm');
    const n = comSugestoes(
      formVazio(),
      [
        { itemId: 'polia_simples', atributos: { altura: 'regulavel' } },
        { itemId: 'multifuncional', atributos: { puxador: true, supino: true, voador: false } },
        { itemId: 'kettlebell', atributos: { pesosKg: [12, 8, 'x'] } },
      ],
      ['polia_simples', 'multifuncional', 'kettlebell'],
    );
    expect(n.poliaSimples.altura).toBe('regulavel');
    expect(n.multifuncional.estacoes).toEqual(['puxador', 'supino']);
    expect(n.kettlebell.pesos).toEqual([8, 12]);
  });
});

describe('sugestões da foto no checklist', () => {
  it('marca só o confirmado e preenche só campos vazios', async () => {
    const { comSugestoes } = await import('../../src/features/onboarding/inventarioForm');
    const f = { ...formVazio(), marcados: ['halteres_fixos' as const], halteres: { min: '1', max: '', passo: '' } };
    const n = comSugestoes(
      f,
      [
        { itemId: 'halteres_fixos', atributos: { minKg: 2, maxKg: 20, passoKg: 2 } },
        { itemId: 'banco_regulavel', atributos: { declina: true } },
        { itemId: 'step' },
      ],
      ['halteres_fixos', 'banco_regulavel'],
    );
    expect(n.marcados).toEqual(['banco_regulavel', 'halteres_fixos']);
    expect(n.halteres).toEqual({ min: '1', max: '20', passo: '2' });
    expect(n.bancoRegulavel.declina).toBe(true);
    expect(f.marcados).toEqual(['halteres_fixos']); // não altera o original
  });
});
