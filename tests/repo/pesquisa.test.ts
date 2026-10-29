import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Garante o princípio de evidência: toda regra tem selo e fonte, e toda fonte citada está na bibliografia.
const SELOS = ['robusta', 'moderada', 'um estudo', 'consenso'];

const regrasMd = readFileSync('docs/pesquisa/regras.md', 'utf8');
const fontesMd = readFileSync('docs/pesquisa/fontes.md', 'utf8');

const keysIn = (cell: string) => [...cell.matchAll(/`([^`]+)`/g)].map((m) => m[1]!);

const linhas = regrasMd
  .split('\n')
  .filter((l) => l.trim().startsWith('|'))
  .map((l) => l.trim().slice(1, -1).split('|').map((c) => c.trim()));
const [cabecalho, , ...regras] = linhas;

const fontes = fontesMd
  .split('\n')
  .filter((l) => l.startsWith('- `'))
  .map((l) => ({ key: keysIn(l)[0]!, linha: l }));
const chaves = new Set(fontes.map((f) => f.key));

describe('docs/pesquisa', () => {
  it('regras.md tem a tabela no formato esperado', () => {
    expect(cabecalho).toEqual(['id', 'regra', 'iniciante', 'intermediário', 'avançado', 'selo', 'fontes']);
    expect(regras.length).toBeGreaterThan(0);
  });

  it.each(regras.map((r) => [r[0], r] as const))('regra %s tem id, valores, selo e fontes válidos', (_id, r) => {
    expect(r).toHaveLength(7);
    expect(r[0]).toMatch(/^`[a-z0-9]+(\.[a-z0-9-]+)+`$/);
    for (const nivel of r.slice(2, 5)) expect(nivel).not.toBe('');
    expect(SELOS).toContain(r[5]);
    const citadas = keysIn(r[6]!);
    expect(citadas.length).toBeGreaterThan(0);
    for (const k of citadas) expect(chaves, `fonte ${k} ausente de fontes.md`).toContain(k);
  });

  it('ids das regras são únicos', () => {
    const ids = regras.map((r) => r[0]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cada fonte aparece uma vez, com status e data de conferência', () => {
    expect(chaves.size).toBe(fontes.length);
    for (const f of fontes) {
      expect(f.linha, f.key).toMatch(/\*\*status:\*\* (verificado-busca|NÃO VERIFICADO)/);
      expect(f.linha, f.key).toMatch(/conferido em \d{4}-\d{2}-\d{2}/);
    }
  });
});
