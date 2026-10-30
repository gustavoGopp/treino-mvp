import type { Padrao } from '../biblioteca';

// Modelos de divisão por número de dias (frequencia.musculo: cada grupo 2x por semana quando o tempo permite).
// Cada dia é uma lista ordenada de vagas por padrão de movimento. As preferências são tags da biblioteca
// usadas como critério de escolha (ex.: 'inclinado' → selecao.peitoral-inclinado).

export type Vaga = {
  padrao: Padrao;
  prefere?: string[];
  /** Pode repetir um exercício já usado em outro dia da semana. */
  repetir?: boolean;
  /** Padrão alternativo quando nenhum exercício do padrão principal é possível com o inventário. */
  alternativa?: Padrao;
};
export type Dia = { id: string; nome: string; vagas: Vaga[] };

const torsoA: Dia = {
  id: 'torso-a',
  nome: 'Torso A',
  vagas: [
    { padrao: 'empurrar-h', prefere: ['inclinado'] },
    { padrao: 'puxar-v', alternativa: 'puxar-h' },
    { padrao: 'puxar-h', prefere: ['sentado'] },
    { padrao: 'isolador-peito', prefere: ['alongado'] },
    { padrao: 'isolador-ombro-lateral', prefere: ['polia'] },
    { padrao: 'isolador-ombro-posterior' },
    { padrao: 'core' },
  ],
};
const membrosA: Dia = {
  id: 'membros-a',
  nome: 'Membros A',
  vagas: [
    { padrao: 'agachar' },
    { padrao: 'dobrar-quadril' },
    { padrao: 'afundo', prefere: ['estatico'] },
    { padrao: 'panturrilha', prefere: ['unilateral'] },
    { padrao: 'isolador-biceps' },
    { padrao: 'isolador-triceps' },
  ],
};
const torsoB: Dia = {
  id: 'torso-b',
  nome: 'Torso B',
  vagas: [
    { padrao: 'empurrar-h', prefere: ['plano'] },
    { padrao: 'puxar-h', prefere: ['apoiado'] },
    { padrao: 'empurrar-v' },
    { padrao: 'puxar-v', prefere: ['unilateral'], alternativa: 'puxar-h' },
    { padrao: 'empurrar-h', prefere: ['peso-corpo'] },
    { padrao: 'isolador-ombro-lateral', prefere: ['halter'] },
    { padrao: 'core' },
  ],
};
const membrosB: Dia = {
  id: 'membros-b',
  nome: 'Membros B',
  vagas: [
    { padrao: 'afundo', prefere: ['bulgaro'] },
    { padrao: 'flexao-joelho', prefere: ['sentada'], alternativa: 'dobrar-quadril' },
    { padrao: 'panturrilha' },
    { padrao: 'isolador-biceps', prefere: ['alongado'] },
    { padrao: 'isolador-triceps', prefere: ['acima-cabeca'] },
    { padrao: 'isolador-ombro-lateral', prefere: ['polia'], repetir: true },
  ],
};
const superioresC: Dia = {
  id: 'superiores-c',
  nome: 'Superiores C',
  vagas: [
    { padrao: 'empurrar-h', prefere: ['inclinado'], repetir: true },
    { padrao: 'puxar-v', repetir: true, alternativa: 'puxar-h' },
    { padrao: 'puxar-h', repetir: true },
    { padrao: 'isolador-ombro-lateral', repetir: true },
    { padrao: 'isolador-biceps', repetir: true },
    { padrao: 'isolador-triceps', prefere: ['acima-cabeca'], repetir: true },
  ],
};

const corpoTodo = (id: string, nome: string, vagas: Vaga[]): Dia => ({ id, nome, vagas });

export const DIVISOES: Record<2 | 3 | 4 | 5, { nome: string; dias: Dia[] }> = {
  2: {
    nome: 'Corpo todo A/B',
    dias: [
      corpoTodo('corpo-a', 'Corpo todo A', [
        { padrao: 'agachar' },
        { padrao: 'empurrar-h', prefere: ['inclinado'] },
        { padrao: 'puxar-v', alternativa: 'puxar-h' },
        { padrao: 'dobrar-quadril' },
        { padrao: 'isolador-ombro-lateral' },
        { padrao: 'isolador-biceps' },
        { padrao: 'panturrilha', prefere: ['unilateral'] },
        { padrao: 'core' },
      ]),
      corpoTodo('corpo-b', 'Corpo todo B', [
        { padrao: 'afundo' },
        { padrao: 'puxar-h' },
        { padrao: 'empurrar-v' },
        { padrao: 'flexao-joelho', alternativa: 'dobrar-quadril' },
        { padrao: 'isolador-peito' },
        { padrao: 'isolador-triceps', prefere: ['acima-cabeca'] },
        { padrao: 'panturrilha' },
      ]),
    ],
  },
  3: {
    nome: 'Corpo todo A/B/C',
    dias: [
      corpoTodo('corpo-a', 'Corpo todo A', [
        { padrao: 'agachar' },
        { padrao: 'empurrar-h', prefere: ['inclinado'] },
        { padrao: 'puxar-h' },
        { padrao: 'dobrar-quadril' },
        { padrao: 'isolador-ombro-lateral' },
        { padrao: 'panturrilha', prefere: ['unilateral'] },
        { padrao: 'core' },
      ]),
      corpoTodo('corpo-b', 'Corpo todo B', [
        { padrao: 'afundo' },
        { padrao: 'empurrar-v' },
        { padrao: 'puxar-v', alternativa: 'puxar-h' },
        { padrao: 'flexao-joelho', alternativa: 'dobrar-quadril' },
        { padrao: 'isolador-biceps' },
        { padrao: 'isolador-triceps', prefere: ['acima-cabeca'] },
      ]),
      corpoTodo('corpo-c', 'Corpo todo C', [
        { padrao: 'agachar', repetir: true },
        { padrao: 'empurrar-h', prefere: ['plano'] },
        { padrao: 'puxar-h', prefere: ['apoiado'] },
        { padrao: 'panturrilha' },
        { padrao: 'isolador-peito' },
        { padrao: 'isolador-ombro-posterior' },
        { padrao: 'core' },
      ]),
    ],
  },
  4: { nome: 'Torso/Membros (2x)', dias: [torsoA, membrosA, torsoB, membrosB] },
  5: { nome: 'Torso/Membros (2x) + Superiores', dias: [torsoA, membrosA, torsoB, membrosB, superioresC] },
};
