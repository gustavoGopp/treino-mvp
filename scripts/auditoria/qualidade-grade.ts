// As dimensões da grade de qualidade (qualidade.ts), num módulo próprio para outros scripts usarem sem rodar a grade.
import { GRUPOS, type Grupo } from '../../src/domain/gerador';
import type { Prioridade } from './cenarios';

export const MINUTOS_Q = [30, 45, 60, 75, 90];
export const GRUPOS_IDS = Object.keys(GRUPOS) as Grupo[];
export const PRIORIDADES_Q: Prioridade[] = [
  { id: 'nenhuma', grupos: [] },
  ...GRUPOS_IDS.map((g) => ({ id: g, grupos: [g] })),
  { id: 'peito+costas', grupos: ['peito', 'costas'] },
  { id: 'pernas+gluteos', grupos: ['pernas', 'gluteos'] },
  { id: 'peito+bracos', grupos: ['peito', 'bracos'] },
  { id: 'costas+ombros', grupos: ['costas', 'ombros'] },
  { id: 'pernas+gluteos+abdomen', grupos: ['pernas', 'gluteos', 'abdomen'] },
];
