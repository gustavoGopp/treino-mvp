import { describe, expect, it } from 'vitest';
import { planejadoDoMusculo } from '../../src/domain/acompanhamento/semana';
import { gerarPrograma, MUSCULOS_COM_META, type Programa } from '../../src/domain/gerador';
import { ana, carla, elisa, PERSONAS } from '../personas';

// A semana com a meta do programa (R5b; c-fluxo.md, pedido ao domínio 7): quando o programa planeja menos que a meta
// do nível, a Semana diz quanto ele planeja e por quê. Antes, 15 casos nas personas, 5 sem nenhum aviso.
const ok = (p: (typeof PERSONAS)['ana']): Programa => {
  const g = gerarPrograma(p.perfil, p.inventario);
  if (g.status !== 'ok') throw new Error('bloqueado');
  return g.programa;
};

describe('planejadoDoMusculo', () => {
  it('as 6 personas: 15 músculos com o programa abaixo da meta do nível, todos com o planejado e o motivo', () => {
    const casos = Object.values(PERSONAS).flatMap((p) => {
      const prog = ok(p);
      return MUSCULOS_COM_META.flatMap((m) => (planejadoDoMusculo(prog, m) ? [m] : []));
    });
    expect(casos).toHaveLength(15);
  });
  it('o motivo vem do aviso do programa: tempo, equipamento, divisão; sem aviso, "não coube mais"', () => {
    expect(planejadoDoMusculo(ok(ana), 'quadriceps')).toEqual({ series: 6, motivo: 'falta tempo' });
    expect(planejadoDoMusculo(ok(ana), 'ombro_lateral')).toEqual({ series: 4, motivo: 'não coube mais nos seus treinos' });
    expect(planejadoDoMusculo(ok(elisa), 'costas')).toEqual({ series: 0, motivo: 'sem exercício com o seu equipamento' });
    expect(planejadoDoMusculo(ok(carla), 'panturrilha')).toEqual({ series: 12, motivo: 'pela divisão escolhida' });
  });
  it('na meta, nada', () => {
    expect(planejadoDoMusculo(ok(ana), 'gluteos')).toBeUndefined();
  });
});
