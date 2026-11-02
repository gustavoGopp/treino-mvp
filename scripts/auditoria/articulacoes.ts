// Articulações que cada padrão de movimento carrega, para conferir o campo `articulacoes` da biblioteca.
// [opinião, consenso de anatomia] Uma articulação "carrega" quando o movimento a dobra ou estende sob carga, ou
// quando o músculo que trabalha a cruza: puxar dobra o cotovelo contra a carga (bíceps e braquial); empurrar o estende
// (tríceps). É a mesma lógica que a biblioteca já usa na barra fixa (ombro e cotovelo) e na rosca (cotovelo).
// Não é diagnóstico: serve só para achar exercícios cuja marcação está mais curta que a de outros do mesmo padrão.
import type { Articulacao, Exercicio, Padrao } from '../../src/domain/biblioteca';

export const ESPERADAS: Record<Padrao, Articulacao[]> = {
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

export const articulacoesEsperadas = (e: Exercicio): Articulacao[] => ESPERADAS[e.padrao];
