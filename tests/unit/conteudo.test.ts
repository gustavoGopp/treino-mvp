import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { CARTOES, CONTEUDO } from '../../src/conteudo';
import { BIBLIOTECA, POR_ID } from '../../src/domain/biblioteca';
import { EX } from '../../src/engine';

describe('conteúdo dos exercícios', () => {
  it('todo exercício animado tem texto, e todo texto tem animação', () => {
    expect(Object.keys(CONTEUDO).sort()).toEqual(EX.map((e) => e.id).sort());
  });

  it.each(EX.map((e) => [e.id, e] as const))('%s: cada erro animado tem título e descrição, na mesma ordem', (id, ex) => {
    expect(CONTEUDO[id]!.errors.map((e) => e.id)).toEqual(ex.errors.map((e: { id: string }) => e.id));
  });

  it('todo cartão de texto é de um exercício da biblioteca sem animação aprovada (nunca animação improvisada)', () => {
    for (const id of Object.keys(CARTOES)) {
      expect(POR_ID[id], id).toBeDefined();
      expect(POR_ID[id]!.animacaoId, id).toBeNull();
    }
  });

  it('os 29 exercícios novos do R0c têm cartão de texto e ficha de técnica', () => {
    const novos = BIBLIOTECA.filter((e) => existsSync(`docs/pesquisa/animacoes/${e.id}.md`) && e.animacaoId === null && e.id !== 'agachamento-barra');
    expect(novos).toHaveLength(29);
    for (const e of novos) expect(CARTOES[e.id], e.id).toBeDefined();
  });

  it('seguranca.montagem: exercício com travas ou ancoragem (tag "montagem") tem a montagem no cartão, se tiver cartão', () => {
    for (const e of BIBLIOTECA.filter((x) => x.tags.includes('montagem')))
      if (CARTOES[e.id]) expect(CARTOES[e.id]!.montagem, e.id).toBeDefined();
  });
});
