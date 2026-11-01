import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BIBLIOTECA, PADROES } from '../../src/domain/biblioteca';
import { REGRAS } from '../../src/domain/regras';
import { FUNCOES } from '../../src/domain/gerador/funcoes';
import {
  CAPACIDADES,
  cargaMaxHalter,
  cargasHalter,
  cargasKettlebell,
  capacidades,
  inventarioSchema,
  ITEM_IDS,
  ITENS,
  type Capacidade,
  type Inventario,
} from '../../src/domain/taxonomia/equipamentos';
import { existsSync } from 'node:fs';
import { EX } from '../../src/engine';

describe('biblioteca de exercícios', () => {
  it('ids únicos', () => {
    const ids = BIBLIOTECA.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('toda animação citada existe no motor, e toda animação do motor está na biblioteca', () => {
    const animacoes = new Set(EX.map((e: { id: string }) => e.id));
    const usadas = BIBLIOTECA.map((e) => e.animacaoId).filter((a): a is string => !!a);
    for (const a of usadas) expect(animacoes, a).toContain(a);
    // elevacao-lateral-b é clone de elevacao-lateral (mesma animação, outra prescrição)
    expect(new Set(usadas)).toEqual(new Set([...animacoes].filter((a) => a !== 'elevacao-lateral-b')));
  });

  it('os 29 exercícios novos do R0c (pesquisa-v2/08, seção 5) estão na biblioteca, sem animação, com ficha de técnica', () => {
    const NOVOS = ['hack', 'agachamento-smith', 'terra-hexagonal', 'goblet-kettlebell', 'supino-smith', 'supino-maquina', 'mergulho', 'mergulho-graviton', 'voador', 'puxada-frente', 'barra-fixa-graviton', 'remada-baixa-estacao', 'remada-articulada', 'remada-suspensao', 'desenvolvimento-maquina', 'voador-invertido', 'rosca-scott', 'rosca-maquina', 'triceps-maquina', 'hiperextensao', 'hip-thrust', 'coice-maquina', 'coice-polia', 'abducao-maquina', 'abducao-polia', 'aducao-maquina', 'panturrilha-em-pe-maquina', 'panturrilha-sentada', 'abdominal-maquina'];
    expect(NOVOS).toHaveLength(29);
    for (const id of NOVOS) {
      const e = BIBLIOTECA.find((x) => x.id === id);
      expect(e, id).toBeDefined();
      expect(e!.animacaoId, id).toBeNull();
      expect(existsSync(`docs/pesquisa/animacoes/${id}.md`), id).toBe(true);
    }
  });

  it('destaques da ficha: mergulho com complexidade 3 e ombro; terra hexagonal e hiperextensão com lombar; agachamento livre profundo', () => {
    const e = (id: string) => BIBLIOTECA.find((x) => x.id === id)!;
    expect(e('mergulho')).toMatchObject({ complexidade: 3, articulacoes: expect.arrayContaining(['ombro']) });
    expect(e('terra-hexagonal').articulacoes).toContain('lombar');
    expect(e('hiperextensao').articulacoes).toContain('lombar');
    expect(e('agachamento-barra').tags).toContain('profundo');
    expect(e('ponte-gluteo').padrao).toBe('extensao-quadril');
  });

  it('adutores como secundário dos agachamentos profundos e do afundo (kubo2019; plotkin2023)', () => {
    const comAdutores = BIBLIOTECA.filter((x) => x.musculos.secundarios.includes('adutores')).map((x) => x.id).sort();
    expect(comAdutores).toEqual(['afundo', 'afundo-peso-corpo', 'afundo-tras', 'agachamento-barra', 'bulgaro', 'bulgaro-peso-corpo']);
    expect(BIBLIOTECA.filter((x) => x.musculos.primarios.includes('adutores')).map((x) => x.id)).toEqual(['aducao-maquina']);
  });

  it('toda capacidade pedida por um exercício é dada por algum equipamento (ou é o apoio, que sempre existe)', () => {
    const tudo = Object.fromEntries(ITEM_IDS.map((id) => [id, {}])) as Inventario;
    const completo: Inventario = {
      ...tudo,
      polia_simples: { altura: 'regulavel' },
      multifuncional: { puxador: true, remadaBaixa: true, extensora: true, flexora: true, voador: true, supino: true },
      voador: { invertido: true },
      triceps_maquina: { acimaDaCabeca: true },
      banco_regulavel: { declina: true },
      elasticos: { intensidades: 3 },
      halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 },
      kettlebell: { pesosKg: [8] },
      anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 2, qtd: 4 }] },
    };
    const caps = capacidades(inventarioSchema.parse(completo));
    for (const c of new Set(BIBLIOTECA.flatMap((e) => e.requer.flat()))) expect(caps, c).toContain(c);
    // e nenhuma capacidade fica sem exercício (ou condição de função) que a peça, salvo "polia", que é só genérica
    const pedidas = new Set([...BIBLIOTECA.flatMap((e) => e.requer.flat()), ...FUNCOES.flatMap((f) => Object.values(f.condicoes ?? {}).flat())]);
    for (const c of Object.keys(CAPACIDADES) as Capacidade[]) if (c !== 'polia') expect(pedidas, c).toContain(c);
  });

  it('todo padrão de movimento tem pelo menos um exercício só com o peso do corpo ou com elástico', () => {
    // Extensora, abdução e adução pedem máquina ou polia: sem elas, viram lacunas explicadas (pesquisa-v2/08).
    for (const p of PADROES.filter((p) => !['isolador-quadriceps', 'abducao-quadril', 'aducao-quadril'].includes(p))) {
      expect(BIBLIOTECA.some((e) => e.padrao === p && e.requer.some((g) => g.every((c) => c === 'apoio' || c === 'elastico' || c === 'step'))), p).toBe(true);
    }
  });
});

describe('taxonomia', () => {
  it('valida inventário e rejeita item fora da taxonomia', () => {
    expect(inventarioSchema.safeParse({ barra_fixa: {}, step: {} }).success).toBe(true);
    expect(inventarioSchema.safeParse({ disco_voador: {} }).success).toBe(false);
  });

  it('capacidades derivam do inventário', () => {
    const c = capacidades({ estacao_polia_dupla: {}, banco_regulavel: { declina: true } });
    expect([...c]).toEqual(expect.arrayContaining(['polia', 'polia_dupla', 'polia_alta', 'estribo', 'banco', 'banco_inclinavel', 'banco_declinavel', 'apoio']));
    expect(c.has('halteres')).toBe(false);
  });

  it('equipamento.capacidades: o multifuncional vale pelas estações marcadas, e a polia simples pela altura', () => {
    const m = capacidades({ multifuncional: { puxador: true, remadaBaixa: false, extensora: true } });
    expect([...m]).toEqual(expect.arrayContaining(['puxador', 'polia_alta', 'cadeira_extensora']));
    for (const c of ['remada_estacao', 'polia_baixa', 'cadeira_flexora', 'voador', 'supino_maquina'] as const) expect(m.has(c), c).toBe(false);
    expect(capacidades({ multifuncional: { remadaBaixa: true, flexora: true, voador: true, supino: true } })).toEqual(
      new Set(['apoio', 'polia_baixa', 'remada_estacao', 'cadeira_flexora', 'voador', 'supino_maquina']),
    );
    expect(capacidades({ multifuncional: {} })).toEqual(new Set(['apoio']));
    const alta = capacidades({ polia_simples: { altura: 'alta' } });
    expect([alta.has('polia_alta'), alta.has('polia_baixa')]).toEqual([true, false]);
    const baixa = capacidades({ polia_simples: { altura: 'baixa' } });
    expect([baixa.has('polia_alta'), baixa.has('polia_baixa')]).toEqual([false, true]);
    const reg = capacidades({ polia_simples: { altura: 'regulavel' } });
    expect([reg.has('polia_alta'), reg.has('polia_baixa')]).toEqual([true, true]);
    expect(capacidades({ estacao_puxada: {}, estacao_remada: {} })).toEqual(new Set(['apoio', 'puxador', 'polia_alta', 'remada_estacao', 'polia_baixa']));
    expect(capacidades({ voador: {} }).has('voador_invertido')).toBe(false);
    expect(capacidades({ voador: { invertido: true } }).has('voador_invertido')).toBe(true);
    expect(capacidades({ triceps_maquina: { acimaDaCabeca: true } }).has('triceps_maquina_acima')).toBe(true);
    expect(capacidades({ cadeira_abdutora_adutora: {} })).toEqual(new Set(['apoio', 'abdutora', 'adutora']));
  });

  it('46 equipamentos (25 de antes e 21 do R0c), com atributos da seção 1.1 opcionais', () => {
    expect(ITEM_IDS).toHaveLength(46);
    expect(Object.values(ITENS).every((i) => i.nome.length > 0)).toBe(true);
    expect(inventarioSchema.safeParse({ leg_press: { menorAnilhaKg: 1.25 }, barra_longa: { pesoBarraKg: 20 }, graviton: { placas: 12 }, cadeira_extensora: {} }).success).toBe(true);
    expect(inventarioSchema.safeParse({ polia_simples: { alturaRegulavel: true } }).success).toBe(false);
    expect(inventarioSchema.safeParse({ kettlebell: { pesosKg: [] } }).success).toBe(false);
  });

  it('cargas de kettlebell: a lista da pessoa, em ordem e sem repetição', () => {
    expect(cargasKettlebell({ kettlebell: { pesosKg: [16, 8, 12, 8] } })).toEqual([8, 12, 16]);
    expect(cargasKettlebell({})).toEqual([]);
  });

  it('cargas de halter combinam fixos e montáveis', () => {
    const inv = {
      halteres_fixos: { minKg: 1, maxKg: 10, passoKg: 1 },
      anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 5, qtd: 4 }, { kg: 2, qtd: 4 }] },
    };
    const cargas = cargasHalter(inv);
    expect(cargas.slice(0, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(cargas).toContain(16); // 2 + 2×(5+2)
    expect(cargaMaxHalter(inv)).toBe(16);
    expect(cargasHalter({ anilhas_e_manoplas: { manoplas: 1, manoplaKg: 2, anilhas: [{ kg: 2, qtd: 2 }] } })).toEqual([2, 6]); // 1 manopla: 1 anilha de cada lado
    expect(cargaMaxHalter({})).toBe(0);
  });
});

it('todo id de regra citado em src/domain existe em regras.md', () => {
  const arquivos = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? arquivos(`${dir}/${d.name}`) : [`${dir}/${d.name}`]));
  const ids = arquivos('src/domain')
    .filter((f) => f.endsWith('.ts'))
    .flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/\br\('([^']+)'\)/g)].map((m) => m[1]!));
  expect(ids.length).toBeGreaterThan(0);
  for (const id of ids) expect(REGRAS, id).toHaveProperty([id]);
});
