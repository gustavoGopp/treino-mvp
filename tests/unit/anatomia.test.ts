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

  it('achado 5: os crucifixos invertidos não contam costas; o face pull, que junta as escápulas, conta', () => {
    // Abrir os braços para trás (abdução horizontal) é do deltoide posterior e do infraespinal (Schoenfeld 2013,
    // PMID 23302754, EMG); o meio das costas só entra quando a técnica junta as escápulas, e o cartão do crucifixo
    // inverso pede o contrário. O face pull pede "entre as escápulas".
    const posterior = BIBLIOTECA.filter((e) => e.padrao === 'isolador-ombro-posterior');
    for (const e of posterior) {
      if (e.id.startsWith('face-pull')) expect(e.musculos.secundarios, e.id).toContain('costas');
      else expect(e.musculos.secundarios, e.id).not.toContain('costas');
    }
    expect(posterior.filter((e) => !e.id.startsWith('face-pull')).map((e) => e.id).sort()).toEqual(['crucifixo-inverso', 'crucifixo-invertido-curvado', 'voador-invertido']);
  });

});
