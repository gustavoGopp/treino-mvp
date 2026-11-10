import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
// @ts-expect-error script .mjs sem tipos
import { lerRegras } from '../../scripts/gerar-regras.mjs';

it('src/domain/regras/regras.json está em dia com docs/pesquisa/regras.md (rode node scripts/gerar-regras.mjs)', () => {
  const md = readFileSync('docs/pesquisa/regras.md', 'utf8');
  const json = JSON.parse(readFileSync('src/domain/regras/regras.json', 'utf8'));
  expect(json).toEqual(lerRegras(md));
});

it('src/domain/regras/selos.json tem o selo de cada regra de regras.json (o pacote inicial leva só o selo)', () => {
  const json = JSON.parse(readFileSync('src/domain/regras/regras.json', 'utf8')) as { id: string; selo: string }[];
  const selos = JSON.parse(readFileSync('src/domain/regras/selos.json', 'utf8'));
  expect(selos).toEqual(Object.fromEntries(json.map((r) => [r.id, r.selo])));
});
