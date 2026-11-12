import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { diaEMes, faixaTexto, numeroBr, porCento, tempoNoRelogio, tempoPorExtenso } from '../../src/domain/numero';
import { serieEfetiva } from '../../src/domain/progressao';
import { DESCANSO, DOR, REDUCAO, RIR, SELOS } from '../../src/domain/regras';
import { porId, regrasSchema, selosSchema } from '../../src/domain/regras/schema';
import { avaliarDor } from '../../src/domain/triagem';
import { gerarPrograma as gerarProgramaDoTeste } from '../../src/domain/gerador';
import { PERSONAS as PERSONAS_DO_TESTE } from '../personas';
import { BIBLIOTECA, ehEmpurrar, ehPuxar, MUSCULOS, MUSCULOS_INFERIORES, PADROES, PADROES_EMPURRAR, PADROES_PUXAR, regiaoDoMusculo } from '../../src/domain/biblioteca';
import { REGRAS } from '../../src/domain/regras/completas';
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
    // Sem animação órfã: a cópia elevacao-lateral-b saiu na revisão de anatomia (02/11/2026, achado 9).
    expect(new Set(usadas)).toEqual(animacoes);
  });

  it('os 28 exercícios novos do R0c (pesquisa-v2/08, seção 5) ainda sem animação (a remada na suspensão foi animada em 04/11/2026) estão na biblioteca, com ficha de técnica', () => {
    const NOVOS = ['hack', 'agachamento-smith', 'terra-hexagonal', 'goblet-kettlebell', 'supino-smith', 'supino-maquina', 'mergulho', 'mergulho-graviton', 'voador', 'puxada-frente', 'barra-fixa-graviton', 'remada-baixa-estacao', 'remada-articulada', 'desenvolvimento-maquina', 'voador-invertido', 'rosca-scott', 'rosca-maquina', 'triceps-maquina', 'hiperextensao', 'hip-thrust', 'coice-maquina', 'coice-polia', 'abducao-maquina', 'abducao-polia', 'aducao-maquina', 'panturrilha-em-pe-maquina', 'panturrilha-sentada', 'abdominal-maquina'];
    expect(NOVOS).toHaveLength(28);
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

  // Lista completada na revisão de anatomia (02/11/2026, achado 6): todo agachar e todo afundo (tests/unit/anatomia.test.ts).
  it('adutores como secundário de todo agachamento e afundo (kubo2019; plotkin2023; kinoshita2026)', () => {
    const comAdutores = BIBLIOTECA.filter((x) => x.musculos.secundarios.includes('adutores')).map((x) => x.id).sort();
    expect(comAdutores).toEqual(BIBLIOTECA.filter((x) => x.padrao === 'agachar' || x.padrao === 'afundo').map((x) => x.id).sort());
    expect(BIBLIOTECA.filter((x) => x.musculos.primarios.includes('adutores')).map((x) => x.id)).toEqual(['aducao-maquina', 'aducao-caneleira', 'aducao-deitado']);
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
      caneleiras: { pesosKg: [2] },
      mini_band: { intensidades: 2 },
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

  it('49 equipamentos (25 de antes, 21 do R0c e 3 do catálogo completo), com atributos da seção 1.1 opcionais', () => {
    expect(ITEM_IDS).toHaveLength(49);
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

// Auditoria de 12/11/2026: definições repetidas que podiam divergir (e divergiam) passam a ter um lugar só.
describe('uma definição de cada', () => {
  it('empurrar e puxar valem pelo padrão do movimento: a flexão fechada é empurrar', () => {
    expect(ehEmpurrar('flexao-fechada')).toBe(true);
    for (const e of BIBLIOTECA) {
      expect(ehEmpurrar(e.id), e.id).toBe(PADROES_EMPURRAR.includes(e.padrao));
      expect(ehPuxar(e.id), e.id).toBe(PADROES_PUXAR.includes(e.padrao));
    }
    expect(ehEmpurrar('exercicio-que-nao-existe')).toBe(false);
  });

  it('os adutores são músculos de baixo, o abdômen é core e o resto é de cima', () => {
    expect(regiaoDoMusculo('adutores')).toBe('inferior');
    expect(regiaoDoMusculo('abdomen')).toBe('core');
    expect(MUSCULOS.filter((m) => regiaoDoMusculo(m) === 'inferior').sort()).toEqual([...MUSCULOS_INFERIORES].sort());
    expect(regiaoDoMusculo('peito')).toBe('superior');
  });

  it('cada definição existe num arquivo só de src/', () => {
    const fonte = (arq: string) => readFileSync(arq, 'utf8');
    const arquivos = (pasta: string): string[] =>
      readdirSync(pasta, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? arquivos(`${pasta}/${d.name}`) : /\.tsx?$/.test(d.name) ? [`${pasta}/${d.name}`] : []));
    const fora = arquivos('src').filter((a) => !a.startsWith('src/engine/'));
    const onde = (padrao: RegExp) => fora.filter((a) => padrao.test(fonte(a)));
    expect(onde(/const POR_ID\b[^=]*=/)).toEqual(['src/domain/biblioteca/index.ts']);
    expect(onde(/const LIMITE_DO_DIA\b/)).toEqual(['src/domain/regras/index.ts']);
    expect(onde(/const EMPURRAR_PUXAR_MAX\b/)).toEqual(['src/domain/gerador/familias.ts']);
    expect(onde(/const (MUSCULOS_)?INFERIORES\b/)).toEqual(['src/domain/biblioteca/index.ts']);
    expect(onde(/h \? q \/ h : q \? Infinity : 1/)).toEqual(['src/domain/gerador/index.ts']);
  });
});


// Auditoria de 12/11/2026: textos com números escritos à mão ("1 min 45 s", "4", "10", "20") saem das constantes.
describe('os números dos textos saem das constantes', () => {
  it('os ajudantes de texto', () => {
    expect(numeroBr(7.5)).toBe('7,5');
    expect(numeroBr(10)).toBe('10');
    expect(tempoPorExtenso(105)).toBe('1 min 45 s');
    expect(tempoPorExtenso(120)).toBe('2 min');
    expect(tempoPorExtenso(45)).toBe('45 s');
    expect(tempoNoRelogio(105)).toBe('1:45');
    expect(tempoNoRelogio(120)).toBe('2 min');
    expect(faixaTexto([8, 12])).toBe('8–12');
    expect(faixaTexto([8, 8])).toBe('8');
    expect(porCento(0.15)).toBe('15');
    expect(diaEMes('2026-11-12T10:00:00.000Z')).toBe('12/11');
  });

  it('o porquê do descanso diz o descanso que a regra prescreve', () => {
    const r = gerarProgramaDoTeste(PERSONAS_DO_TESTE.bruno.perfil, PERSONAS_DO_TESTE.bruno.inventario);
    if (r.status !== 'ok') throw new Error('sem programa');
    for (const x of r.programa.dias.flatMap((d) => d.exercicios)) {
      const texto = x.porque.find((q) => q.regraId === 'descanso.por-tipo')!.texto;
      const seg = (x.tipo === 'composto' ? DESCANSO.composto : DESCANSO.isolador)[PERSONAS_DO_TESTE.bruno.perfil.nivel];
      expect(texto).toContain(`Descanso de ${tempoPorExtenso(seg)}`);
    }
  });

  it('a série efetiva, a dor e a estagnação usam os limites das regras', () => {
    const s = { carga: { tipo: 'kg' as const, kg: 10 }, reps: 10 };
    expect(serieEfetiva({ ...s, rir: RIR.serieEfetivaMax })).toBe(true);
    expect(serieEfetiva({ ...s, rir: RIR.serieEfetivaMax + 1 })).toBe(false);
    expect(avaliarDor(4).mensagem).toContain(`${porCento(DOR.reducaoCarga[0])}–${porCento(DOR.reducaoCarga[1])}%`);
    expect(REDUCAO.dor).toBeGreaterThanOrEqual(DOR.reducaoCarga[0]);
    expect(REDUCAO.dor).toBeLessThanOrEqual(DOR.reducaoCarga[1]);
  });
});

// Auditoria de 12/11/2026: regras.json e selos.json entravam só com `as`, sem validação.
describe('regras.json e selos.json são validados na carga', () => {
  const regra = { id: 'volume.teste', regra: 'Texto', valores: { iniciante: 'a', intermediario: 'b', avancado: 'c' }, selo: 'consenso', fontes: ['fonte2020'] };

  it('os arquivos de hoje passam, e cada regra tem o seu selo', () => {
    expect(Object.keys(REGRAS).length).toBeGreaterThan(100);
    expect(Object.keys(SELOS).sort()).toEqual(Object.keys(REGRAS).sort());
    for (const id of Object.keys(REGRAS)) expect(SELOS[id]).toBe(REGRAS[id]!.selo);
  });

  it('um arquivo gerado errado falha na carga, com o motivo', () => {
    expect(regrasSchema.safeParse([regra]).success).toBe(true);
    expect(regrasSchema.safeParse([{ ...regra, selo: 'forte' }]).success).toBe(false);
    expect(regrasSchema.safeParse([{ ...regra, fontes: [] }]).success).toBe(false);
    expect(regrasSchema.safeParse([{ ...regra, valores: { iniciante: 'a', intermediario: 'b' } }]).success).toBe(false);
    expect(regrasSchema.safeParse([{ ...regra, extra: 1 }]).success).toBe(false);
    expect(regrasSchema.safeParse([regra, regra]).success).toBe(false);
    expect(regrasSchema.safeParse([{ ...regra, id: 'Sem Formato' }]).success).toBe(false);
    expect(selosSchema.safeParse({ 'volume.teste': 'consenso' }).success).toBe(true);
    expect(selosSchema.safeParse({ 'volume.teste': 'forte' }).success).toBe(false);
    expect(selosSchema.safeParse({}).success).toBe(false);
    expect(() => porId([{ ...regra, selo: undefined }])).toThrow();
  });
});
