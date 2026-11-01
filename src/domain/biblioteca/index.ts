import { z } from 'zod';
import { CAPACIDADES, type Capacidade } from '../taxonomia/equipamentos';
import dados from './exercicios.json';

// Biblioteca de exercícios: dados, não código. Cada exercício pede capacidades do inventário
// (OU de grupos E), e aponta para a animação do guia quando houver uma aprovada.

export const MUSCULOS = [
  'peito',
  'costas',
  'ombro_anterior',
  'ombro_lateral',
  'ombro_posterior',
  'biceps',
  'triceps',
  'quadriceps',
  'posteriores',
  'gluteos',
  'panturrilha',
  'abdomen',
  /** Sem meta própria, como o ombro anterior (decisão de 01/11/2026, pesquisa-v2/08). */
  'adutores',
] as const;
export type Musculo = (typeof MUSCULOS)[number];

export const PADROES = [
  'empurrar-h',
  'empurrar-v',
  'puxar-h',
  'puxar-v',
  'agachar',
  'afundo',
  'dobrar-quadril',
  'extensao-quadril',
  'abducao-quadril',
  'aducao-quadril',
  'flexao-joelho',
  'isolador-peito',
  'isolador-ombro-lateral',
  'isolador-ombro-posterior',
  'isolador-biceps',
  'isolador-triceps',
  'isolador-quadriceps',
  'panturrilha',
  'core',
] as const;
export type Padrao = (typeof PADROES)[number];

export const ARTICULACOES = ['ombro', 'cotovelo', 'punho', 'lombar', 'quadril', 'joelho', 'tornozelo'] as const;
export type Articulacao = (typeof ARTICULACOES)[number];

const capacidade = z.enum(Object.keys(CAPACIDADES) as [Capacidade, ...Capacidade[]]);
export const exercicioSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    nome: z.string().min(1),
    padrao: z.enum(PADROES),
    musculos: z.object({ primarios: z.array(z.enum(MUSCULOS)).min(1), secundarios: z.array(z.enum(MUSCULOS)) }),
    requer: z.array(z.array(capacidade).min(1)).min(1),
    complexidade: z.number().int().min(1).max(3),
    tipo: z.enum(['composto', 'isolador']),
    faixaReps: z.tuple([z.number().int().positive(), z.number().int().positive()]),
    unilateral: z.boolean(),
    articulacoes: z.array(z.enum(ARTICULACOES)),
    tags: z.array(z.string()),
    /**
     * Como a carga sobe (pesquisa-v2/08, seção 1.1): halter e kettlebell pela lista de pesos; barra em kg;
     * polia e máquina com torre pela placa; anilha = máquina de anilhas (kg por lado); assistida = contrapeso
     * (mais placa = mais fácil); peso do corpo e elástico pela escada de dificuldade.
     */
    carga: z.enum(['halter', 'kettlebell', 'polia', 'peso-corpo', 'elastico', 'barra', 'maquina', 'anilha', 'assistida']),
    animacaoId: z.string().nullable(),
  })
  .strict()
  .refine((e) => e.faixaReps[0] < e.faixaReps[1], 'faixa de repetições invertida');

export type Exercicio = z.infer<typeof exercicioSchema>;

export const BIBLIOTECA: Exercicio[] = z.array(exercicioSchema).parse(dados);
export const POR_ID: Record<string, Exercicio> = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
