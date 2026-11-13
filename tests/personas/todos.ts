import type { Persona } from './index';
import { carla } from './index';

// As 6 personas a mais da sessão "treino para todos" (12/11/2026): cobrem o que as 6 de ./index não cobrem (60 anos ou
// mais começando, só elásticos, 2 dias de 30 min, avançada sem equipamento, dor no joelho, ficar mais forte). Todas
// fictícias. A idade aparece só na descrição: o app não pergunta idade, e o perfil não a tem.
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

/** A academia completa do atalho do cadastro (a da Carla, sem os itens "às vezes tem"). */
const academia: Persona['inventario'] = (() => {
  const { kettlebell, elasticos, bola_suica, suspensao, caneleiras, mini_band, roda_abdominal, esteira, ...resto } = carla.inventario;
  void [kettlebell, elasticos, bola_suica, suspensao, caneleiras, mini_band, roda_abdominal, esteira];
  return resto;
})();

/** Gilberto: 67 anos, nunca treinou; academia do condomínio (multifuncional, halteres, banco); 2 dias de 45 min; saúde. */
export const gilberto: Persona = {
  nome: 'Gilberto',
  descricao: '67 anos, nunca treinou; academia do condomínio com multifuncional, halteres e banco; 2 dias de 45 min; objetivo saúde.',
  perfil: { nivel: 'iniciante', objetivo: 'saude', semanasParado: 0, diasSemana: 2, minutosSessao: 45, prioridades: [], evitarExercicios: [], evitarEquipamentos: [], triagem: semRisco },
  inventario: { multifuncional: { puxador: true, remadaBaixa: true }, banco_regulavel: { declina: false }, halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 }, bola_suica: {} },
};

/** Íris: intermediária, em casa, só elásticos (3 intensidades); 3 dias de 45 min; quer glúteos. */
export const iris: Persona = {
  nome: 'Íris',
  descricao: 'Intermediária; treina em casa só com elásticos (3 intensidades); 3 dias de 45 min; quer glúteos.',
  perfil: { nivel: 'intermediario', semanasParado: 0, diasSemana: 3, minutosSessao: 45, prioridades: ['gluteos'], evitarExercicios: [], evitarEquipamentos: [], triagem: semRisco },
  inventario: { elasticos: { intensidades: 3 } },
};

/** Jonas: intermediário, academia completa, só 2 dias de 30 min; sem foco. */
export const jonas: Persona = {
  nome: 'Jonas',
  descricao: 'Intermediário; academia completa; só consegue 2 dias de 30 min; sem grupo de foco.',
  perfil: { nivel: 'intermediario', semanasParado: 0, diasSemana: 2, minutosSessao: 30, prioridades: [], evitarExercicios: [], evitarEquipamentos: [], triagem: semRisco },
  inventario: academia,
};

/** Kátia: avançada (treinou anos em academia), agora sem equipamento nenhum; 4 dias de 60 min; sem foco. */
export const katia: Persona = {
  nome: 'Kátia',
  descricao: 'Avançada, treinou anos em academia; agora em casa, sem equipamento nenhum; 4 dias de 60 min; sem grupo de foco.',
  perfil: { nivel: 'avancado', semanasParado: 0, diasSemana: 4, minutosSessao: 60, prioridades: [], evitarExercicios: [], evitarEquipamentos: [], triagem: semRisco },
  inventario: {},
};

/** Leandro: iniciante, academia completa, 3 dias de 60 min; dor no joelho (7 de 10 hoje); sem foco. */
export const leandro: Persona = {
  nome: 'Leandro',
  descricao: 'Iniciante; academia completa; 3 dias de 60 min; marcou dor no joelho, nota 7 hoje; sem grupo de foco.',
  perfil: {
    nivel: 'iniciante',
    semanasParado: 0,
    diasSemana: 3,
    minutosSessao: 60,
    prioridades: [],
    evitarExercicios: [],
    evitarEquipamentos: [],
    triagem: { respostas: { ...semRisco.respostas, osteoarticular: true }, dores: [{ articulacao: 'joelho', nota: 7 }] },
  },
  inventario: academia,
};

/** Marina: intermediária, academia completa, 4 dias de 60 min; quer ficar mais forte; sem foco. */
export const marina: Persona = {
  nome: 'Marina',
  descricao: 'Intermediária; academia completa; 4 dias de 60 min; objetivo ficar mais forte; sem grupo de foco.',
  perfil: { nivel: 'intermediario', objetivo: 'forca', semanasParado: 0, diasSemana: 4, minutosSessao: 60, prioridades: [], evitarExercicios: [], evitarEquipamentos: [], triagem: semRisco },
  inventario: academia,
};

export const PERSONAS_NOVAS = { gilberto, iris, jonas, katia, leandro, marina };
