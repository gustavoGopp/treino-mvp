// A população do retrato (sessão "treino para todos", 12/11/2026): quem o app precisa atender bem, por dimensão, e os
// pesos da conta ponderada. Só dados fictícios. Os PESOS SÃO ESTIMATIVA do projeto, sem dado de uso real (tudo fica no
// aparelho de cada pessoa); a justificativa de cada um está em docs/revisoes/treino-para-todos/diagnostico.md, seção 1.
import type { Articulacao } from '../../src/domain/biblioteca';
import type { Grupo, Perfil } from '../../src/domain/gerador';
import { OPCOES_POR_DIAS, type DiasSemana } from '../../src/domain/gerador/divisoes';
import { NIVEIS, type Nivel } from '../../src/domain/regras';
import { perfil, type Prioridade, type SituacaoDeDor } from './cenarios';
import { CENARIOS_55, type Cen } from './cenarios-55';

export const DIAS_P: DiasSemana[] = [2, 3, 4, 5, 6];
/** Os minutos que o cadastro oferece (src/features/onboarding/Rotina.tsx). */
export const MINUTOS_P = [30, 45, 60, 75, 90];
export const FOCOS_P: Prioridade[] = [
  { id: 'nenhum', grupos: [] },
  ...(['peito', 'costas', 'ombros', 'bracos', 'pernas', 'gluteos', 'abdomen'] as Grupo[]).map((g) => ({ id: g, grupos: [g] })),
  { id: 'superiores', grupos: ['peito', 'costas', 'ombros', 'bracos'] },
  { id: 'inferiores', grupos: ['pernas', 'gluteos'] },
  { id: 'peito+costas', grupos: ['peito', 'costas'] },
];
const ARTICULACOES_P: Articulacao[] = ['ombro', 'cotovelo', 'punho', 'lombar', 'quadril', 'joelho', 'tornozelo'];
/** Sem dor, e cada articulação do cadastro em duas intensidades: 4 (o app prefere outros exercícios) e 7 (a região sai). */
export const DORES_P: SituacaoDeDor[] = [
  { id: 'sem dor', dores: [] },
  ...ARTICULACOES_P.flatMap((a) => [4, 7].map((nota) => ({ id: `${a} ${nota}`, dores: [{ articulacao: a, nota }] }))),
];

// ---------- os pesos (estimativa) ----------
/** Fatia de cada cenário de equipamento: onde as pessoas treinam. Os que não estão na lista dividem `resto`. */
const PESO_CENARIO: Record<string, number> = {
  academia: 0.2,
  'academia+': 0.2,
  bairro: 0.08,
  condominio: 0.06,
  'condominio+': 0.06,
  bruno: 0.03,
  casa: 0.05,
  'casa+': 0.05,
  halteres: 0.02,
  'halteres-banco': 0.02,
  'so:halteres_fixos': 0.01,
  'so:anilhas_e_manoplas': 0.01,
  'banco+halteres-leves': 0.01,
  'halteres+bola': 0.01,
  elasticos: 0.02,
  diego: 0.01,
  'step+elasticos': 0.01,
  'suspensao+elasticos': 0.01,
  vazio: 0.08,
  'so:barra_fixa': 0.01,
  'so:kettlebell': 0.005,
  'so:suspensao': 0.005,
};
const RESTO_CENARIOS = 1 - Object.values(PESO_CENARIO).reduce((t, x) => t + x, 0);
const OUTROS = CENARIOS_55.filter((c) => !(c.id in PESO_CENARIO)).length;
export const pesoDoCenario = (id: string) => PESO_CENARIO[id] ?? RESTO_CENARIOS / OUTROS;
export const PESO_NIVEL: Record<Nivel, number> = { iniciante: 0.45, intermediario: 0.35, avancado: 0.2 };
export const PESO_DIAS: Record<number, number> = { 2: 0.1, 3: 0.35, 4: 0.28, 5: 0.2, 6: 0.07 };
export const PESO_MINUTOS: Record<number, number> = { 30: 0.12, 45: 0.28, 60: 0.38, 75: 0.12, 90: 0.1 };
export const PESO_FOCO: Record<string, number> = {
  nenhum: 0.35,
  peito: 0.05,
  costas: 0.04,
  ombros: 0.04,
  bracos: 0.07,
  pernas: 0.06,
  gluteos: 0.09,
  abdomen: 0.05,
  superiores: 0.08,
  inferiores: 0.09,
  'peito+costas': 0.08,
};
/** 78% sem dor; a dor, por articulação (lombar, joelho e ombro são as mais comuns), 60% leve (4) e 40% forte (7). */
const PESO_ARTICULACAO: Record<Articulacao, number> = { lombar: 0.06, joelho: 0.05, ombro: 0.05, cotovelo: 0.015, punho: 0.015, quadril: 0.015, tornozelo: 0.015 };
export const pesoDaDor = (id: string) => {
  if (id === 'sem dor') return 1 - Object.values(PESO_ARTICULACAO).reduce((t, x) => t + x, 0);
  const [a, nota] = id.split(' ') as [Articulacao, string];
  return PESO_ARTICULACAO[a] * (nota === '4' ? 0.6 : 0.4);
};

export type CasoP = { indice: number; cen: Cen; pf: Perfil; foco: string; dor: string; peso: number };
export type OpcoesDaPopulacao = { dores?: SituacaoDeDor[]; objetivo?: Perfil['objetivo'] };

/** A população: 55 cenários × 3 níveis × 2 a 6 dias × 5 durações × 11 focos × 15 situações de dor = 680.625 programas. */
export function* populacao(o: OpcoesDaPopulacao = {}): Generator<CasoP> {
  let indice = 0;
  for (const cen of CENARIOS_55)
    for (const nivel of NIVEIS)
      for (const dias of DIAS_P)
        for (const minutos of MINUTOS_P)
          for (const foco of FOCOS_P)
            for (const dor of o.dores ?? DORES_P) {
              const pf = perfil({ nivel, divisao: OPCOES_POR_DIAS[dias][0]!, minutos, prioridades: foco.grupos, dores: dor.dores });
              delete pf.divisao;
              if (o.objetivo) pf.objetivo = o.objetivo;
              const peso = pesoDoCenario(cen.id) * PESO_NIVEL[nivel] * PESO_DIAS[dias]! * PESO_MINUTOS[minutos]! * PESO_FOCO[foco.id]! * pesoDaDor(dor.id);
              yield { indice: indice++, cen, pf, foco: foco.id, dor: dor.id, peso };
            }
}

export const nomeDoCasoP = (c: CasoP) => `${c.cen.id} · ${c.pf.nivel} · ${c.pf.diasSemana} dias · ${c.pf.minutosSessao} min · foco ${c.foco} · ${c.dor}`;
