import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BIBLIOTECA, PADROES } from '../../src/domain/biblioteca';
import { REGRAS } from '../../src/domain/regras';
import { cargaMaxHalter, cargasHalter, capacidades, inventarioSchema } from '../../src/domain/taxonomia/equipamentos';
import { EX } from '../../src/engine';

describe('biblioteca de exercícios', () => {
  it('ids únicos', () => {
    const ids = BIBLIOTECA.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('toda animação citada existe no motor, e as 25 animações únicas estão na biblioteca', () => {
    const animacoes = new Set(EX.map((e: { id: string }) => e.id));
    const usadas = BIBLIOTECA.map((e) => e.animacaoId).filter((a): a is string => !!a);
    for (const a of usadas) expect(animacoes, a).toContain(a);
    // elevacao-lateral-b é clone de elevacao-lateral (mesma animação, outra prescrição)
    expect(new Set(usadas)).toEqual(new Set([...animacoes].filter((a) => a !== 'elevacao-lateral-b')));
  });

  it('todo padrão de movimento tem pelo menos um exercício só com o peso do corpo ou com elástico', () => {
    for (const p of PADROES.filter((p) => !['isolador-quadriceps'].includes(p))) {
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
