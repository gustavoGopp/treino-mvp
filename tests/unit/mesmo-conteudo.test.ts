import { describe, expect, it } from 'vitest';
import { gerarPrograma } from '../../src/domain/gerador';
import { mesmoConteudo } from '../../src/features/app/estado';
import { programaSchema } from '../../src/storage/esquema';
import { PERSONAS } from '../personas';

describe('mesmoConteudo', () => {
  it('ignora a ordem das chaves e campos undefined, mas não a ordem das listas', () => {
    expect(mesmoConteudo({ a: 1, b: [1, 2], c: undefined }, { b: [1, 2], a: 1 })).toBe(true);
    expect(mesmoConteudo({ b: [2, 1] }, { b: [1, 2] })).toBe(false);
    expect(mesmoConteudo({ a: { x: 1 } }, { a: { x: 2 } })).toBe(false);
  });

  it('o programa salvo (passado pelo zod) é igual ao gerado de novo com as mesmas entradas', () => {
    for (const p of Object.values(PERSONAS)) {
      const r = gerarPrograma(p.perfil, p.inventario);
      if (r.status !== 'ok') throw new Error('bloqueado');
      expect(mesmoConteudo(programaSchema.parse(JSON.parse(JSON.stringify(r.programa))), r.programa)).toBe(true);
    }
  });
});
