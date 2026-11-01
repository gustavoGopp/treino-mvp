import { describe, expect, it } from 'vitest';
import { BIBLIOTECA, POR_ID } from '../../src/domain/biblioteca';
import { FUNCAO, FUNCOES, funcaoSchema } from '../../src/domain/gerador/funcoes';

// selecao.funcao-da-vaga: a tabela 2.1 do T7 como dado validado.
const nivelDe = (funcao: string, exId: string) => FUNCAO[funcao]!.niveis.findIndex((n) => n.includes(exId));

describe('funções das vagas (selecao.funcao-da-vaga)', () => {
  it('todo exercício da biblioteca aparece em pelo menos uma função', () => {
    const usados = new Set(FUNCOES.flatMap((f) => f.niveis.flat()));
    expect(BIBLIOTECA.filter((e) => !usados.has(e.id)).map((e) => e.id)).toEqual([]);
  });
  it('cada exercício da função treina o músculo da função como principal', () => {
    for (const f of FUNCOES) for (const id of f.niveis.flat()) expect(POR_ID[id]!.musculos.primarios, `${f.id}/${id}`).toContain(f.musculo);
  });
  it('o esquema recusa id fora da biblioteca, exercício repetido e regra inexistente', () => {
    const base = { id: 'x', nome: 'X', musculo: 'peito', regras: [], niveis: [['supino-reto']] };
    expect(funcaoSchema.safeParse(base).success).toBe(true);
    expect(funcaoSchema.safeParse({ ...base, niveis: [['nao-existe']] }).success).toBe(false);
    expect(funcaoSchema.safeParse({ ...base, niveis: [['supino-reto'], ['supino-reto']] }).success).toBe(false);
    expect(funcaoSchema.safeParse({ ...base, regras: ['regra.que.nao.existe'] }).success).toBe(false);
    expect(funcaoSchema.safeParse({ ...base, musculo: 'costas' }).success).toBe(false);
  });
});

describe('selecao.alongado: a opção alongada vem antes na função', () => {
  it('tríceps acima da cabeça é uma função própria e obrigatória; a corda fica no complemento', () => {
    expect(FUNCAO['triceps-acima-cabeca']!.obrigatoria).toBe(true);
    expect(FUNCAO['triceps-acima-cabeca']!.niveis.flat()).toEqual(expect.arrayContaining(['triceps-frances', 'triceps-frances-halter']));
    expect(FUNCAO['triceps-acima-cabeca']!.niveis.flat()).not.toContain('triceps-corda');
  });
  it('cadeira flexora (sentada) antes da mesa flexora (deitada)', () => {
    expect(nivelDe('flexao-joelho', 'cadeira-flexora')).toBeLessThan(nivelDe('flexao-joelho', 'mesa-flexora'));
  });
  it('panturrilha em pé com apoio (step, leg press) antes da do chão', () => {
    expect(nivelDe('panturrilha-em-pe', 'panturrilha')).toBeLessThan(nivelDe('panturrilha-em-pe', 'panturrilha-chao'));
    expect(nivelDe('panturrilha-em-pe', 'panturrilha-leg-press')).toBe(0);
  });
});

describe('selecao.isolador-obrigatorio e selecao.gluteo', () => {
  it('extensora, tríceps acima da cabeça e panturrilha em pé são as obrigatórias', () => {
    expect(FUNCOES.filter((f) => f.obrigatoria).map((f) => f.id).sort()).toEqual(['extensora', 'panturrilha-em-pe', 'triceps-acima-cabeca']);
  });
  it('a ponte de glúteo é extensão de quadril; abdução ainda sem exercício (lacuna explicada)', () => {
    expect(POR_ID['ponte-gluteo']!.padrao).toBe('extensao-quadril');
    expect(FUNCAO['extensao-quadril']!.niveis.flat()).toContain('ponte-gluteo');
    expect(FUNCAO['abducao']!.niveis.flat()).toEqual([]);
    expect(FUNCAO['abducao']!.lacuna).toBeTruthy();
  });
});
