import { describe, expect, it } from 'vitest';
import { BIBLIOTECA, type Articulacao, type Padrao } from '../../src/domain/biblioteca';

// seguranca.dor.programa: com dor de hoje acima de 5, sai todo exercício que carrega a região. Para isso funcionar,
// a marcação tem de cobrir o que o padrão de movimento carrega (auditoria do treino, 02/11/2026, achado 1).
// [consenso, anatomia] Puxar dobra o cotovelo contra a carga (bíceps e braquial); empurrar o estende (tríceps);
// dobrar o quadril carrega a lombar. É a lógica que a biblioteca já usava na barra fixa, na rosca e no stiff.
const ESPERADAS: Record<Padrao, Articulacao[]> = {
  'empurrar-h': ['ombro', 'cotovelo'],
  'empurrar-v': ['ombro', 'cotovelo'],
  'puxar-h': ['ombro', 'cotovelo'],
  'puxar-v': ['ombro', 'cotovelo'],
  agachar: ['joelho', 'quadril'],
  afundo: ['joelho', 'quadril'],
  'dobrar-quadril': ['quadril', 'lombar'],
  'extensao-quadril': ['quadril'],
  'abducao-quadril': ['quadril'],
  'aducao-quadril': ['quadril'],
  'flexao-joelho': ['joelho'],
  'isolador-peito': ['ombro'],
  'isolador-ombro-lateral': ['ombro'],
  'isolador-ombro-posterior': ['ombro'],
  'isolador-biceps': ['cotovelo'],
  'isolador-triceps': ['cotovelo'],
  'isolador-quadriceps': ['joelho'],
  panturrilha: ['tornozelo'],
  core: [],
};

describe('articulações que cada exercício carrega (seguranca.dor.programa)', () => {
  it('todo exercício marca as articulações do seu padrão de movimento', () => {
    const faltando = BIBLIOTECA.flatMap((e) => ESPERADAS[e.padrao].filter((a) => !e.articulacoes.includes(a)).map((a) => `${e.id}: ${a}`));
    expect(faltando).toEqual([]);
  });
});
