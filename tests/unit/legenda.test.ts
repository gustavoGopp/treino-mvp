import { describe, expect, it } from 'vitest';
import { BIBLIOTECA } from '../../src/domain/biblioteca';
import { EX } from '../../src/engine';
import { listaDe, SO_AJUDA } from '../../src/engine/estilo/musculos';
import { montarSvgEstilo } from '../../src/engine/estilo';
import { FORMA } from '../../scripts/auditoria/anatomia-regras';

// Legenda A (decisão do Gustavo em 03/11/2026): no desenho, o músculo que só ajuda a firmar (desenhado, mas não contado
// pela biblioteca naquele exercício) fica listrado, para não parecer o secundário que conta meia série.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
function soAjudaPelaBiblioteca(ex: Animacao): string[] {
  const conta = new Set<string>(BIBLIOTECA.filter((e) => e.animacaoId === ex.id).flatMap((e) => [...e.musculos.primarios, ...e.musculos.secundarios]));
  const formas = (listaDe(ex) as [string, string, 'p' | 's'][]).filter(([f, , t]) => t === 's' && !conta.has(FORMA[f]!)).map(([f]) => f);
  return [...new Set(formas)].sort();
}

describe('legenda: o laranja que só ajuda', () => {
  it('a lista do motor (SO_AJUDA) é exatamente o que a biblioteca não conta', () => {
    const pares: [string, string[]][] = EX.map((ex: Animacao) => [ex.id as string, soAjudaPelaBiblioteca(ex)]);
    const calculado = Object.fromEntries(pares.filter(([, l]) => l.length));
    const doMotor = Object.fromEntries(Object.entries(SO_AJUDA).map(([k, v]) => [k, [...v].sort()]));
    expect(doMotor).toEqual(calculado);
  });

  it('o músculo que só ajuda sai listrado, com o padrão no próprio desenho; o que conta continua laranja cheio', () => {
    const rosca: Animacao = EX.find((e: Animacao) => e.id === 'rosca-alternada');
    const q = montarSvgEstilo(rosca, 'lateral', 'mus', rosca.T / 2, 0, 360, 'a');
    expect(q.html).toContain('id="mh-listras"');
    expect(q.html).toMatch(/class="ea-mh"/);
    const remada: Animacao = EX.find((e: Animacao) => e.id === 'remada-unilateral');
    const r = montarSvgEstilo(remada, remada.views[0], 'mus', remada.T / 2, 0, 360, 'a');
    expect(r.html).not.toContain('ea-mh');
  });
});
