// Cenários fictícios da auditoria do treino (docs/revisoes/auditoria-treino.md).
// Nada aqui é dado de uma pessoa real: os inventários seguem os 3 atalhos de cenário (src/domain/taxonomia/atalhos.ts),
// com e sem os itens "às vezes tem", mais os mínimos e as personas fictícias de tests/personas.
import type { Grupo, Perfil } from '../../src/domain/gerador';
import { DIVISAO_IDS, DIVISOES, type DivisaoId } from '../../src/domain/gerador/divisoes';
import type { Articulacao } from '../../src/domain/biblioteca';
import { NIVEIS, type Nivel } from '../../src/domain/regras';
import { ATALHOS } from '../../src/domain/taxonomia/atalhos';
import type { Inventario, ItemId } from '../../src/domain/taxonomia/equipamentos';
import { respostasNenhuma } from '../../src/domain/triagem';
import { ana, bruno, brunoAcademiaDoBairro, carla, diego } from '../../tests/personas';

/** Atributos fictícios, típicos de cada item, para um atalho virar um inventário que o gerador entende. */
const ATRIBUTOS: Partial<Record<ItemId, object>> = {
  anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 1, qtd: 4 }, { kg: 2, qtd: 4 }, { kg: 5, qtd: 4 }] },
  halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 },
  elasticos: { intensidades: 3 },
  banco_regulavel: { declina: false },
  kettlebell: { pesosKg: [8, 12, 16] },
  multifuncional: { puxador: true, remadaBaixa: true },
  polia_simples: { altura: 'regulavel' },
  voador: { invertido: false },
  triceps_maquina: { acimaDaCabeca: false },
};

function deAtalho(id: 'casa' | 'condominio' | 'academia', extras: 'sem' | 'com', ajuste: Partial<Record<ItemId, object>> = {}): Inventario {
  const a = ATALHOS.find((x) => x.id === id)!;
  const itens = [...a.marca, ...(extras === 'com' ? a.asVezes : [])];
  const inv: Record<string, object> = {};
  for (const k of itens) inv[k] = { ...(ATRIBUTOS[k] ?? {}) };
  if (id === 'academia') inv.halteres_fixos = { minKg: 2, maxKg: 40, passoKg: 2 };
  return { ...inv, ...ajuste } as Inventario;
}

export type Cenario = { id: string; nome: string; inventario: Inventario; comum: boolean };

/** Os cenários do mapa da cobertura e do teste de estresse. "comum" = cenário típico, para a prioridade dos achados. */
export const CENARIOS: Cenario[] = [
  { id: 'casa', nome: 'Casa com halteres e elásticos (atalho)', inventario: deAtalho('casa', 'sem'), comum: true },
  { id: 'casa+', nome: 'Casa + os "às vezes tem" (banco, barra fixa, kettlebell, suspensão, step, bola)', inventario: deAtalho('casa', 'com'), comum: true },
  { id: 'condominio', nome: 'Condomínio com multifuncional (atalho: puxador e remada)', inventario: deAtalho('condominio', 'sem'), comum: true },
  {
    id: 'condominio+',
    nome: 'Condomínio + os "às vezes tem" e o multifuncional com todas as estações',
    inventario: deAtalho('condominio', 'com', { multifuncional: { puxador: true, remadaBaixa: true, extensora: true, flexora: true, voador: true, supino: true } }),
    comum: true,
  },
  { id: 'academia', nome: 'Academia completa (atalho)', inventario: deAtalho('academia', 'sem'), comum: true },
  { id: 'academia+', nome: 'Academia completa + kettlebell, elásticos, bola e suspensão (a Carla)', inventario: carla.inventario, comum: false },
  { id: 'peso-corpo', nome: 'Só o peso do corpo (nada marcado)', inventario: {}, comum: false },
  { id: 'elasticos', nome: 'Só elásticos', inventario: { elasticos: { intensidades: 3 } }, comum: false },
  { id: 'halteres', nome: 'Só halteres (2 a 20 kg), sem banco', inventario: { halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 } }, comum: true },
  { id: 'halteres-banco', nome: 'Halteres de 1 a 12 kg e banco reto (a Ana)', inventario: ana.inventario, comum: true },
  { id: 'diego', nome: 'Elásticos e barra fixa de porta (o Diego)', inventario: diego.inventario, comum: false },
  { id: 'bruno', nome: 'Prédio com polia dupla, halteres e banco regulável (o Bruno)', inventario: bruno.inventario, comum: false },
  { id: 'bairro', nome: 'Academia do bairro sem polia (2º local do Bruno)', inventario: brunoAcademiaDoBairro, comum: false },
];
export const CENARIO = Object.fromEntries(CENARIOS.map((c) => [c.id, c])) as Record<string, Cenario>;

/** Pares de locais para o treino do dia num 2º local (local.treino-do-dia). */
export const PARES_DE_LOCAIS: [string, string][] = [
  ['bruno', 'bairro'],
  ['bairro', 'bruno'],
  ['academia', 'condominio'],
  ['condominio', 'casa'],
  ['academia', 'halteres-banco'],
];

export const MINUTOS = [20, 30, 45, 60, 75, 90, 120, 150];
export const PRIORIDADES: { id: string; grupos: Grupo[] }[] = [
  { id: 'nenhuma', grupos: [] },
  { id: 'superior', grupos: ['peito', 'costas', 'ombros', 'bracos'] },
  { id: 'inferior', grupos: ['pernas', 'gluteos'] },
  { id: 'misto', grupos: ['peito', 'costas', 'ombros', 'pernas'] },
  { id: 'todos', grupos: ['peito', 'costas', 'ombros', 'bracos', 'pernas', 'gluteos', 'abdomen'] },
];
export type Dor = { articulacao: Articulacao; nota: number };
export const DORES: { id: string; dores: Dor[] }[] = [
  { id: 'sem dor', dores: [] },
  { id: 'ombro 7', dores: [{ articulacao: 'ombro', nota: 7 }] },
  { id: 'joelho 7', dores: [{ articulacao: 'joelho', nota: 7 }] },
  { id: 'lombar 7', dores: [{ articulacao: 'lombar', nota: 7 }] },
  { id: 'cotovelo 7', dores: [{ articulacao: 'cotovelo', nota: 7 }] },
  { id: 'ombro 4', dores: [{ articulacao: 'ombro', nota: 4 }] },
  { id: 'joelho 7 + lombar 7', dores: [{ articulacao: 'joelho', nota: 7 }, { articulacao: 'lombar', nota: 7 }] },
  { id: 'ombro 7 + joelho 4', dores: [{ articulacao: 'ombro', nota: 7 }, { articulacao: 'joelho', nota: 4 }] },
];

export function perfil(o: { nivel: Nivel; divisao: DivisaoId; minutos: number; prioridades: Grupo[]; dores: Dor[] }): Perfil {
  const respostas = { ...respostasNenhuma(), osteoarticular: o.dores.length > 0 };
  return {
    nivel: o.nivel,
    semanasParado: 0,
    diasSemana: DIVISOES[o.divisao].diasSemana,
    divisao: o.divisao,
    minutosSessao: o.minutos,
    prioridades: o.prioridades,
    evitarExercicios: [],
    evitarEquipamentos: [],
    triagem: { respostas, ...(o.dores.length ? { dores: o.dores } : {}) },
  };
}

export type Caso = { cenario: Cenario; nivel: Nivel; divisao: DivisaoId; minutos: number; prioridade: (typeof PRIORIDADES)[number]; dor: (typeof DORES)[number] };

/** A grade completa: cenário × nível × divisão (2 a 6 dias) × minutos × prioridade × dor. */
export function* grade(opts: { cenarios?: Cenario[]; amostra?: number } = {}): Generator<Caso> {
  let i = 0;
  for (const cenario of opts.cenarios ?? CENARIOS)
    for (const nivel of NIVEIS)
      for (const divisao of DIVISAO_IDS)
        for (const minutos of MINUTOS)
          for (const prioridade of PRIORIDADES)
            for (const dor of DORES) {
              // Amostra espalhada (hash multiplicativo), para não cair sempre nas mesmas dores ou prioridades.
              if (opts.amostra && Math.imul(i++, 2654435761) >>> 0 >= 2 ** 32 / opts.amostra) continue;
              yield { cenario, nivel, divisao, minutos, prioridade, dor };
            }
}

export const nomeDoCaso = (c: Caso) =>
  `${c.cenario.id} · ${c.nivel} · ${DIVISOES[c.divisao].nome} (${DIVISOES[c.divisao].diasSemana} dias) · ${c.minutos} min · prioridade ${c.prioridade.id} · ${c.dor.id}`;
