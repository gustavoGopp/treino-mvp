import type { Perfil } from '../../src/domain/gerador';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';

// Personas fictícias usadas nos testes versionados. Nenhuma é uma pessoa real.
const semRisco = {
  respostas: {
    coracao: false,
    peito: false,
    tontura: false,
    'doenca-cronica': false,
    medicamento: false,
    osteoarticular: false,
    supervisao: false,
    gravidez: false,
    'doenca-aguda': false,
  },
};

export type Persona = { nome: string; descricao: string; perfil: Perfil; inventario: Inventario };

/** Bruno: intermediário voltando de pausa, academia de prédio com polia dupla (cenário 1, versão fictícia). */
export const bruno: Persona = {
  nome: 'Bruno',
  descricao: 'Intermediário voltando de 3 meses parado; academia de prédio com polia dupla, halteres e banco regulável.',
  perfil: {
    nivel: 'intermediario',
    semanasParado: 12,
    diasSemana: 4,
    minutosSessao: 70,
    prioridades: ['peito', 'costas', 'ombros', 'bracos'],
    evitarExercicios: [],
    evitarEquipamentos: ['barra_longa'],
    triagem: semRisco,
  },
  inventario: {
    estacao_polia_dupla: {},
    barra_fixa: {},
    banco_regulavel: { declina: true },
    halteres_fixos: { minKg: 1, maxKg: 10, passoKg: 1 },
    anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 2, qtd: 4 }, { kg: 3, qtd: 4 }, { kg: 5, qtd: 4 }] },
    barra_longa: {},
    acessorio_polia_barra_reta: {},
    acessorio_polia_corda: {},
    acessorio_polia_triangulo: {},
    elasticos: { intensidades: 3 },
    step: {},
    bola_suica: {},
    esteira: {},
  },
};

/** Ana: iniciante, só halteres fixos e banco reto (cenário 2). */
export const ana: Persona = {
  nome: 'Ana',
  descricao: 'Iniciante; academia do prédio com halteres fixos de 1 a 12 kg e banco reto; 3 dias de 45 min; quer glúteos e pernas.',
  perfil: {
    nivel: 'iniciante',
    semanasParado: 0,
    diasSemana: 3,
    minutosSessao: 45,
    prioridades: ['gluteos', 'pernas'],
    evitarExercicios: [],
    evitarEquipamentos: [],
    triagem: semRisco,
  },
  inventario: { halteres_fixos: { minKg: 1, maxKg: 12, passoKg: 1 }, banco_reto: {} },
};

/** Diego: iniciante em casa, elásticos e barra fixa (cenário 3). */
export const diego: Persona = {
  nome: 'Diego',
  descricao: 'Iniciante em casa, com elásticos e barra fixa de porta.',
  perfil: {
    nivel: 'iniciante',
    semanasParado: 0,
    diasSemana: 3,
    minutosSessao: 45,
    prioridades: ['peito', 'costas'],
    evitarExercicios: [],
    evitarEquipamentos: [],
    triagem: semRisco,
  },
  inventario: { elasticos: { intensidades: 4 }, barra_fixa: {} },
};

/**
 * Carla: avançada, academia completa, 5 dias (cenário 4). Desde o R0c (decisão de 01/11/2026), ela tem os
 * 46 equipamentos do catálogo, para as metas do R0 medirem o catálogo inteiro (tests/unit/metas-r0.test.ts).
 */
export const carla: Persona = {
  nome: 'Carla',
  descricao: 'Avançada; academia completa, com todos os 46 equipamentos do catálogo; 5 dias de 75 min.',
  perfil: {
    nivel: 'avancado',
    semanasParado: 0,
    diasSemana: 5,
    minutosSessao: 75,
    prioridades: ['peito', 'costas', 'ombros', 'pernas'],
    evitarExercicios: [],
    evitarEquipamentos: [],
    triagem: semRisco,
  },
  inventario: {
    estacao_polia_dupla: {},
    polia_simples: { altura: 'regulavel' },
    barra_fixa: {},
    banco_regulavel: { declina: true },
    banco_reto: {},
    halteres_fixos: { minKg: 2, maxKg: 40, passoKg: 2 },
    anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 5, qtd: 4 }, { kg: 10, qtd: 4 }] },
    barra_longa: {},
    barra_w: {},
    rack_de_agachamento: {},
    smith: {},
    leg_press: {},
    cadeira_extensora: {},
    mesa_flexora: {},
    cadeira_flexora: {},
    paralelas: {},
    acessorio_polia_corda: {},
    acessorio_polia_triangulo: {},
    acessorio_polia_barra_reta: {},
    acessorio_polia_estribo: {},
    acessorio_polia_tornozeleira: {},
    elasticos: { intensidades: 4 },
    step: {},
    bola_suica: {},
    esteira: {},
    barra_hexagonal: {},
    kettlebell: { pesosKg: [8, 12, 16, 20, 24] },
    banco_scott: {},
    banco_romano: {},
    estacao_puxada: {},
    estacao_remada: {},
    multifuncional: { puxador: true, remadaBaixa: true, extensora: true, flexora: true, voador: true, supino: true },
    supino_maquina: {},
    voador: { invertido: true },
    desenvolvimento_maquina: {},
    remada_articulada: {},
    graviton: {},
    rosca_maquina: {},
    triceps_maquina: { acimaDaCabeca: false },
    abdominal_maquina: {},
    hack: {},
    cadeira_abdutora_adutora: {},
    gluteo_maquina: {},
    panturrilha_em_pe_maquina: {},
    panturrilha_sentada_maquina: {},
    suspensao: {},
  },
};

export const PERSONAS = { bruno, ana, diego, carla };

/**
 * R1b: o 2º local do Bruno, fictício. O "prédio" é o equipamento de sempre (bruno.inventario); a "academia do bairro"
 * tem halteres de 2 a 30 kg, banco regulável, barra fixa, paralelas, leg press, extensora e flexora, e nenhuma polia.
 */
export const brunoAcademiaDoBairro: Inventario = {
  halteres_fixos: { minKg: 2, maxKg: 30, passoKg: 2 },
  banco_regulavel: { declina: false },
  barra_fixa: {},
  paralelas: {},
  leg_press: { menorAnilhaKg: 5 },
  cadeira_extensora: {},
  cadeira_flexora: {},
};
export const LOCAIS_DO_BRUNO = [
  { id: 'local-1', nome: 'Prédio', inventario: bruno.inventario },
  { id: 'local-2', nome: 'Academia do bairro', inventario: brunoAcademiaDoBairro },
];
