import { describe, expect, it } from 'vitest';
import { comIdsUnicos, estiloDasListras } from '../../src/features/programa/idsDoDesenho';

// Auditoria de 12/11/2026: os ids do desenho do Boneco (listras, recortes) se repetiam entre as miniaturas da página.
describe('ids do desenho', () => {
  const html = '<defs><pattern id="mh-listras"><rect/></pattern></defs><clipPath id="qd12"><polygon/></clipPath><path class="ea-pele-t" clip-path="url(#qd12)"/><path fill="url(#outro)"/>';

  it('cada id e cada referência a ele ganham o sufixo do desenho; o que aponta para fora fica', () => {
    const a = comIdsUnicos(html, ':r1:');
    expect(a).toContain('id="mh-listras-r1"');
    expect(a).toContain('id="qd12-r1"');
    expect(a).toContain('clip-path="url(#qd12-r1)"');
    expect(a).toContain('fill="url(#outro)"');
    expect(a).not.toMatch(/id="(mh-listras|qd12)"/);
  });

  it('dois desenhos iguais não repetem nenhum id', () => {
    const ids = (s: string) => [...s.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
    const juntos = [...ids(comIdsUnicos(html, ':r1:')), ...ids(comIdsUnicos(html, ':r2:'))];
    expect(new Set(juntos).size).toBe(juntos.length);
  });

  it('sem id, ou sem sufixo, o desenho fica como veio; o estilo aponta as listras para o padrão do desenho', () => {
    expect(comIdsUnicos('<path d="M0 0"/>', ':r1:')).toBe('<path d="M0 0"/>');
    expect(comIdsUnicos(html, '')).toBe(html);
    expect(estiloDasListras(':r1:')).toEqual({ '--mh-listras': 'url(#mh-listras-r1)' });
  });
});
