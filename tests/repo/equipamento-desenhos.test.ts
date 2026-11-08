import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ITEM_IDS } from '../../src/domain/taxonomia/equipamentos';

// Lote 5 do redesign: cada item do equipamento tem o desenho dele em public/equipamento/<id>.svg, autossuficiente
// (sem script, sem referência externa, sem fonte), para o cadastro e a foto.
describe('desenhos do equipamento', () => {
  it('existe um SVG para cada um dos itens', () => {
    const faltam = ITEM_IDS.filter((id) => !existsSync(`public/equipamento/${id}.svg`));
    expect(faltam).toEqual([]);
  });

  it('cada SVG é autossuficiente: sem script, sem link externo, sem imagem embutida e sem fonte', () => {
    for (const id of ITEM_IDS) {
      const svg = readFileSync(`public/equipamento/${id}.svg`, 'utf8');
      expect(svg, id).toMatch(/^<svg[^>]*viewBox="0 0 160 120"/);
      expect(svg, id).not.toMatch(/<script|href=|<image|<text|@import|font-family/i);
    }
  });
});
