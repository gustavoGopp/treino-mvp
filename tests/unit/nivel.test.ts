import { describe, expect, it } from 'vitest';
import { classificarNivel, niveisPermitidos, SEMANAS_PARADO_INICIANTE, type RespostasNivel } from '../../src/domain/nivel';

const base: RespostasNivel = { tempoContinuo: '6-24m', semanasParado: 0, tecnica: 'sim' };

describe('classificarNivel (nivel.classificacao)', () => {
  it('usa o tempo de treino contínuo quando a técnica é segura e não há pausa longa', () => {
    expect(classificarNivel({ ...base, tempoContinuo: 'menos-6m' }).nivel).toBe('iniciante');
    expect(classificarNivel(base).nivel).toBe('intermediario');
    expect(classificarNivel({ ...base, tempoContinuo: 'mais-24m' }).nivel).toBe('avancado');
  });

  it('na dúvida sobre a técnica, classifica para baixo', () => {
    for (const tecnica of ['mais-ou-menos', 'nao'] as const)
      expect(classificarNivel({ ...base, tempoContinuo: 'mais-24m', tecnica }).nivel).toBe('iniciante');
  });

  it('mais de ~6 meses parado volta para iniciante; até lá mantém o nível', () => {
    expect(classificarNivel({ ...base, tempoContinuo: 'mais-24m', semanasParado: SEMANAS_PARADO_INICIANTE }).nivel).toBe('avancado');
    expect(classificarNivel({ ...base, tempoContinuo: 'mais-24m', semanasParado: SEMANAS_PARADO_INICIANTE + 1 }).nivel).toBe('iniciante');
  });

  it('sempre cita a regra e explica o motivo', () => {
    const c = classificarNivel(base);
    expect(c.regraId).toBe('nivel.classificacao');
    expect(c.motivo.length).toBeGreaterThan(10);
  });

  it('a pessoa pode baixar o nível, nunca subir', () => {
    expect(niveisPermitidos('iniciante')).toEqual(['iniciante']);
    expect(niveisPermitidos('intermediario')).toEqual(['iniciante', 'intermediario']);
    expect(niveisPermitidos('avancado')).toEqual(['iniciante', 'intermediario', 'avancado']);
  });
});
