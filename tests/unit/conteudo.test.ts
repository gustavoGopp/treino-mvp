import { describe, expect, it } from 'vitest';
import { CONTEUDO } from '../../src/conteudo';
import { EX } from '../../src/engine';

describe('conteúdo dos exercícios', () => {
  it('todo exercício animado tem texto, e todo texto tem animação', () => {
    expect(Object.keys(CONTEUDO).sort()).toEqual(EX.map((e) => e.id).sort());
  });

  it.each(EX.map((e) => [e.id, e] as const))('%s: cada erro animado tem título e descrição, na mesma ordem', (id, ex) => {
    expect(CONTEUDO[id]!.errors.map((e) => e.id)).toEqual(ex.errors.map((e: { id: string }) => e.id));
  });
});
