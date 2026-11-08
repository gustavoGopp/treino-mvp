import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
// @ts-expect-error script .mjs sem tipos
import { chavesDasRegras, lerFontes } from '../../scripts/gerar-fontes.mjs';

it('src/conteudo/fontes.json está em dia com docs/pesquisa/fontes.md (rode node scripts/gerar-fontes.mjs)', () => {
  const regras = JSON.parse(readFileSync('src/domain/regras/regras.json', 'utf8'));
  const md = readFileSync('docs/pesquisa/fontes.md', 'utf8');
  const json = JSON.parse(readFileSync('src/conteudo/fontes.json', 'utf8'));
  expect(json).toEqual(lerFontes(md, chavesDasRegras(regras)));
});
