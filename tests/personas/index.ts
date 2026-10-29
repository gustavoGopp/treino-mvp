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
    dores: [],
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
  descricao: 'Iniciante; academia do prédio com halteres fixos de 1 a 12 kg e banco reto; quer glúteos e pernas.',
  perfil: {
    nivel: 'iniciante',
    semanasParado: 0,
    diasSemana: 3,
    minutosSessao: 50,
    prioridades: ['gluteos', 'pernas'],
    evitarExercicios: [],
    evitarEquipamentos: [],
    dores: [],
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
    dores: [],
    triagem: semRisco,
  },
  inventario: { elasticos: { intensidades: 4 }, barra_fixa: {} },
};

/** Carla: avançada, academia completa, 5 dias (cenário 4). */
export const carla: Persona = {
  nome: 'Carla',
  descricao: 'Avançada; academia completa; 5 dias de 75 min.',
  perfil: {
    nivel: 'avancado',
    semanasParado: 0,
    diasSemana: 5,
    minutosSessao: 75,
    prioridades: ['peito', 'costas', 'ombros', 'pernas'],
    evitarExercicios: [],
    evitarEquipamentos: [],
    dores: [],
    triagem: semRisco,
  },
  inventario: {
    estacao_polia_dupla: {},
    barra_fixa: {},
    banco_regulavel: { declina: true },
    banco_reto: {},
    halteres_fixos: { minKg: 2, maxKg: 40, passoKg: 2 },
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
    step: {},
    esteira: {},
  },
};

export const PERSONAS = { bruno, ana, diego, carla };
