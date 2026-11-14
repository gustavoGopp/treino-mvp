import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
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

  // Pacote 0 da sessão "treino para todos" (14/11/2026): com dor forte no joelho, o app tirava o agachamento e ainda
  // mandava ajoelhar na puxada e no abdominal. A posição de base vem do texto de execução do próprio app.
  it('o exercício cuja posição de base apoia o peso do corpo no joelho marca o joelho', () => {
    const APOIA = /ajoelh|quatro apoios|joelho apoiado/i;
    // "De pé ou ajoelhado atrás do banco": dá para fazer de pé; não conta.
    const OPCIONAL = new Set(['rosca-scott-banco-inclinado']);
    const pasta = 'src/conteudo/exercicios';
    const apoiam = readdirSync(pasta)
      .filter((f) => f.endsWith('.json'))
      .map((f) => JSON.parse(readFileSync(join(pasta, f), 'utf8')) as { id: string; name?: string; setupEq?: string[]; setupBody?: string[] })
      .filter((c) => APOIA.test([c.name ?? '', ...(c.setupEq ?? []), ...(c.setupBody ?? [])].join(' ')) && !OPCIONAL.has(c.id))
      .map((c) => c.id)
      .sort();
    expect(apoiam).toEqual(['abdominal-polia', 'coice-caneleira', 'coice-elastico', 'coice-maquina', 'nordico', 'puxada-barra-reta', 'puxada-elastico', 'puxada-unilateral', 'roda-abdominal']);
    const semMarca = BIBLIOTECA.filter((e) => apoiam.includes(e.id) && !e.articulacoes.includes('joelho')).map((e) => e.id);
    expect(semMarca).toEqual([]);
  });
});
