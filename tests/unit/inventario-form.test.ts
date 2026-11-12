import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { aplicarAtalho, CATEGORIAS, comSugestoes, deForm, formVazio, itensDaCategoria, paraForm, type FormInventario } from '../../src/features/onboarding/inventarioForm';
import { ATALHOS, ITENS_DE_ANILHA } from '../../src/domain/taxonomia/atalhos';
import { gerarPrograma } from '../../src/domain/gerador';
import { cargasHalter, HALTER, inventarioSchema, ITEM_IDS, sanarInventario, type Inventario } from '../../src/domain/taxonomia/equipamentos';
import { migrar } from '../../src/storage/migracao';
import { carla, PERSONAS } from '../personas';

describe('checklist do inventário', () => {
  it('cada item da taxonomia aparece em exatamente uma categoria, salvo a esteira, que fica só na foto (R1)', () => {
    const todos = CATEGORIAS.flatMap((c) => itensDaCategoria(c.id));
    expect([...todos].sort()).toEqual(ITEM_IDS.filter((id) => id !== 'esteira').sort());
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

  it('atributos que a tela não pergunta (placas, peso da barra) passam intactos; a menor anilha, pergunta única, vale para todos os itens de anilha', () => {
    const inv = { leg_press: { menorAnilhaKg: 1.25 }, barra_longa: { pesoBarraKg: 20 }, multifuncional: { puxador: true, placas: 15 }, cadeira_extensora: { placas: 12, kgPorPlaca: 5 } };
    const { inventario } = deForm(paraForm(inv as Inventario));
    expect(inventario).toEqual({
      ...inv,
      barra_longa: { pesoBarraKg: 20, menorAnilhaKg: 1.25 },
      multifuncional: { puxador: true, remadaBaixa: false, extensora: false, flexora: false, voador: false, supino: false, placas: 15 },
    });
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

describe('itens novos do catálogo completo no checklist (04/11/2026)', () => {
  it('caneleiras pelos pesos (como o kettlebell), mini-band pelas intensidades (como os elásticos), roda sem detalhe', () => {
    const f: FormInventario = { ...formVazio(), marcados: ['caneleiras', 'mini_band', 'roda_abdominal'], caneleiras: { pesos: [3, 1, 1] }, miniBand: { intensidades: '3' } };
    const { inventario, erros } = deForm(f);
    expect(erros).toEqual({});
    expect(inventario).toEqual({ caneleiras: { pesosKg: [1, 3] }, mini_band: { intensidades: 3 }, roda_abdominal: {} });
    expect(paraForm(inventario!)).toMatchObject({ caneleiras: { pesos: [1, 3] }, miniBand: { intensidades: '3' } });
    const vazio = deForm({ ...formVazio(), marcados: ['caneleiras', 'mini_band'] });
    expect(Object.keys(vazio.erros).sort()).toEqual(['caneleiras.pesos', 'miniBand.intensidades']);
  });
  it('a foto preenche os pesos das caneleiras e as intensidades da mini-band, só se estiverem vazios', () => {
    const n = comSugestoes(
      formVazio(),
      [
        { itemId: 'caneleiras', atributos: { pesosKg: [2, 1, 'x'] } },
        { itemId: 'mini_band', atributos: { intensidades: 4 } },
      ],
      ['caneleiras', 'mini_band'],
    );
    expect(n.caneleiras.pesos).toEqual([1, 2]);
    expect(n.miniBand.intensidades).toBe('4');
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

describe('atalhos de cenário (equipamento.atalhos)', () => {
  it('nada vem pré-marcado: o formulário vazio não tem nenhum item', () => {
    expect(formVazio().marcados).toEqual([]);
  });
  it('"Corpo livre": o toque desmarca tudo, e o inventário fica vazio (só o peso do corpo)', () => {
    const antes: FormInventario = { ...formVazio(), marcados: ['esteira', 'kettlebell', 'elasticos'] };
    const f = aplicarAtalho(antes, 'corpo');
    expect(f.marcados).toEqual([]);
    expect(deForm(f).inventario).toEqual({});
  });
  it('o toque marca o conjunto, sem desmarcar nada, e os "às vezes tem" ficam desmarcados', () => {
    for (const a of ATALHOS.filter((x) => !x.semEquipamento)) {
      const antes: FormInventario = { ...formVazio(), marcados: ['esteira', 'kettlebell'] };
      const f = aplicarAtalho(antes, a.id);
      expect(f.marcados, a.id).toEqual(expect.arrayContaining([...a.marca, 'esteira', 'kettlebell']));
      for (const id of a.asVezes.filter((x) => x !== 'kettlebell')) expect(f.marcados, `${a.id}: ${id}`).not.toContain(id);
      expect(a.marca.some((x) => a.asVezes.includes(x)), a.id).toBe(false);
      expect(a.marca).not.toContain('esteira');
    }
  });
  it('condomínio: puxador e remada marcados no multifuncional; as estações já escolhidas não mudam', () => {
    expect(aplicarAtalho(formVazio(), 'condominio').multifuncional.estacoes).toEqual(['puxador', 'remadaBaixa']);
    const ja = { ...formVazio(), multifuncional: { estacoes: ['extensora' as const] } };
    expect(aplicarAtalho(ja, 'condominio').multifuncional.estacoes).toEqual(['extensora']);
  });
  it('academia completa vem com valores típicos nos detalhes e passa sem pergunta nenhuma (design v2, item D)', () => {
    const f = aplicarAtalho(formVazio(), 'academia');
    expect(deForm(f).erros).toEqual({});
    expect(f.halteres).toEqual({ min: '2', max: '40', passo: '2' });
    expect(f.poliaSimples.altura).toBe('regulavel');
    // o lado conservador nos "sim ou não"
    expect([f.voador.invertido, f.bancoRegulavel.declina, f.tricepsMaquina.acimaDaCabeca]).toEqual([false, false, false]);
  });
  it('os valores típicos não passam por cima do que a pessoa já respondeu', () => {
    const ja: FormInventario = { ...formVazio(), halteres: { min: '1', max: '12', passo: '1' }, voador: { invertido: true } };
    const f = aplicarAtalho(ja, 'academia');
    expect(f.halteres).toEqual({ min: '1', max: '12', passo: '1' });
    expect(f.voador.invertido).toBe(true);
  });
  it('nos outros atalhos, os detalhes continuam sendo perguntados', () => {
    const { erros } = deForm(aplicarAtalho(formVazio(), 'condominio'));
    expect(Object.keys(erros)).toEqual(expect.arrayContaining(['halteres.min', 'bancoRegulavel.declina']));
  });
  it('academia completa com os detalhes mínimos gera o programa', () => {
    const f = aplicarAtalho(formVazio(), 'academia');
    const pronto: FormInventario = {
      ...f,
      halteres: { min: '2', max: '40', passo: '2' },
      poliaSimples: { altura: 'regulavel', placas: '' },
      bancoRegulavel: { declina: true },
      voador: { invertido: true },
      tricepsMaquina: { acimaDaCabeca: false },
    };
    const { inventario, erros } = deForm(pronto);
    expect(erros).toEqual({});
    expect(gerarPrograma(carla.perfil, inventario!).status).toBe('ok');
  });
});

describe('menor anilha (equipamento.menor-anilha)', () => {
  it('a resposta única vai para cada item de anilha marcado, e volta para o formulário', () => {
    const f: FormInventario = { ...formVazio(), marcados: ['leg_press', 'smith', 'barra_longa', 'banco_reto'], menorAnilha: '1,25' };
    const { inventario } = deForm(f);
    expect(inventario).toEqual({ leg_press: { menorAnilhaKg: 1.25 }, smith: { menorAnilhaKg: 1.25 }, barra_longa: { menorAnilhaKg: 1.25 }, banco_reto: {} });
    expect(paraForm(inventario!).menorAnilha).toBe('1.25');
    expect(deForm(paraForm(inventario!)).inventario).toEqual(inventario);
  });
  it('sem resposta, nada é gravado (vale o padrão de 2 kg na hora do treino)', () => {
    const { inventario } = deForm({ ...formVazio(), marcados: ['hack', 'barra_hexagonal'] });
    expect(inventario).toEqual({ hack: {}, barra_hexagonal: {} });
  });
  it('sem item de anilha, a resposta é ignorada', () => {
    expect(deForm({ ...formVazio(), marcados: ['banco_reto'], menorAnilha: '2' }).inventario).toEqual({ banco_reto: {} });
    expect(ITENS_DE_ANILHA).toHaveLength(6);
  });
  it('valor inválido pede correção', () => {
    expect(deForm({ ...formVazio(), marcados: ['leg_press'], menorAnilha: '0' }).erros).toHaveProperty('menorAnilha');
  });
});

describe('esteira (R1): reconhecida na foto, fora do treino', () => {
  it('a sugestão da foto não marca a esteira, mesmo confirmada', () => {
    const f = comSugestoes(formVazio(), [{ itemId: 'esteira' }, { itemId: 'step' }], ['esteira', 'step']);
    expect(f.marcados).toEqual(['step']);
  });
});

// Auditoria de 12/11/2026: halteres com o mínimo acima do máximo, passo absurdo e anilhas sem anilha.
describe('halteres e anilhas: o que o formulário, o esquema e a migração aceitam', () => {
  const halteres = (min: string, max: string, passo: string) => deForm({ ...formVazio(), marcados: ['halteres_fixos'], halteres: { min, max, passo } });

  it('o formulário recusa passo menor que o mínimo e halter acima do máximo, com o limite na mensagem', () => {
    expect(halteres('1', '12', '0,001').erros['halteres.passo']).toBe(`O passo precisa ser de pelo menos ${String(HALTER.passoMinKg).replace('.', ',')} kg.`);
    expect(halteres('1', '1200', '1').erros['halteres.max']).toBe(`Confira o peso: o app aceita até ${HALTER.maxKg} kg por halter.`);
    expect(halteres('1', '12', '1')).toMatchObject({ erros: {}, inventario: { halteres_fixos: { minKg: 1, maxKg: 12, passoKg: 1 } } });
    // um par só (mínimo igual ao máximo) continua valendo
    expect(halteres('5', '5', '5').erros).toEqual({});
  });

  it('o esquema recusa o que deixaria a lista de cargas vazia ou sem fim', () => {
    const ok = (inv: unknown) => inventarioSchema.safeParse(inv).success;
    expect(ok({ halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 } })).toBe(true);
    expect(ok({ halteres_fixos: { minKg: 5, maxKg: 5, passoKg: 5 } })).toBe(true);
    expect(ok({ halteres_fixos: { minKg: 20, maxKg: 2, passoKg: 2 } })).toBe(false);
    expect(ok({ halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 0.001 } })).toBe(false);
    expect(ok({ halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 50 } })).toBe(false);
    expect(ok({ halteres_fixos: { minKg: 2, maxKg: 2000, passoKg: 2 } })).toBe(false);
    expect(ok({ anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 1, qtd: 4 }] } })).toBe(true);
    expect(ok({ anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [] } })).toBe(false);
  });

  it('sanarInventario corrige o que dá para corrigir sem inventar, e a lista de cargas deixa de ser vazia', () => {
    const invertido = { halteres_fixos: { minKg: 20, maxKg: 2, passoKg: 2 } } as Inventario;
    expect(cargasHalter(invertido)).toEqual([]);
    expect(sanarInventario(invertido)).toEqual({ halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 } });
    expect(cargasHalter(sanarInventario(invertido) as Inventario)).toHaveLength(10);
    // passo maior que a diferença: vira a diferença (o mais leve e o mais pesado existem)
    expect(sanarInventario({ halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 50 } })).toEqual({ halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 18 } });
    // passo e peso fora dos limites: ficam no limite
    expect(sanarInventario({ halteres_fixos: { minKg: 2, maxKg: 2000, passoKg: 0.001 } })).toEqual({
      halteres_fixos: { minKg: 2, maxKg: HALTER.maxKg, passoKg: HALTER.passoMinKg },
    });
    // manoplas sem nenhuma anilha não montam halter: o item sai, o resto fica
    expect(sanarInventario({ anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [] }, barra_fixa: {} })).toEqual({ barra_fixa: {} });
    // o que já está certo não muda (nem de identidade)
    const certo = { halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 }, barra_fixa: {} };
    expect(sanarInventario(certo)).toBe(certo);
    for (const inv of [invertido, { halteres_fixos: { minKg: 2, maxKg: 2000, passoKg: 0.001 } }, { anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [] } }])
      expect(inventarioSchema.safeParse(sanarInventario(inv)).success).toBe(true);
  });

  it('um estado da versão 7 com esses inventários continua legível depois da migração', () => {
    const antigo = JSON.parse(readFileSync('tests/unit/fixtures/estado-v7.json', 'utf8')) as { locais: { id: string; nome: string; inventario: unknown }[] };
    antigo.locais[0]!.inventario = { ...(antigo.locais[0]!.inventario as object), halteres_fixos: { minKg: 20, maxKg: 2, passoKg: 2 } };
    antigo.locais.push({ id: 'local-2', nome: 'Casa', inventario: { anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [] }, barra_fixa: {} } });
    const r = migrar(antigo);
    if (!r.ok) throw new Error(r.erro);
    expect(r.estado.locais![0]!.inventario.halteres_fixos).toEqual({ minKg: 2, maxKg: 20, passoKg: 2 });
    expect(r.estado.locais![1]!.inventario).toEqual({ barra_fixa: {} });
  });
});
