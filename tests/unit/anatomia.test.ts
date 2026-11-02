import { describe, expect, it } from 'vitest';
import { BIBLIOTECA } from '../../src/domain/biblioteca';

// Revisão de anatomia (docs/revisoes/anatomia.md, 02/11/2026): os músculos de cada exercício, decididos item a item
// pelo Gustavo. O secundário conta meia série (volume.serie-indireta.peso), então cada regra aqui muda o volume.

describe('músculos da biblioteca (revisão de anatomia)', () => {
  it('achado 1: extensão de quadril com o joelho dobrado não conta os posteriores', () => {
    // Plotkin 2023 (PMID 37877099; um estudo): no hip thrust os posteriores quase não cresceram. A ponte e os coices
    // têm o joelho dobrado como o hip thrust (os coices, por analogia: opinião aprovada pelo Gustavo).
    const extensao = BIBLIOTECA.filter((e) => e.padrao === 'extensao-quadril');
    expect(extensao.map((e) => e.id).sort()).toEqual(['coice-maquina', 'coice-polia', 'hip-thrust', 'ponte-gluteo', 'ponte-gluteo-halter']);
    for (const e of extensao) {
      expect(e.musculos.primarios, e.id).not.toContain('posteriores');
      expect(e.musculos.secundarios, e.id).not.toContain('posteriores');
    }
  });
});
