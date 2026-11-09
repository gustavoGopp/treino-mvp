import type { Perfil } from '../../src/domain/gerador';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { PERSONAS, type Persona } from './index';

// As 12 personas de teste da régua (frente G5; docs/revisoes/proximos-passos/g-biblioteca-ampliada.md, seção 1), recriadas
// no R5d (08/11/2026): a sessão da biblioteca descreveu os perfis, mas não os versionou. Todas fictícias; nenhuma é uma
// pessoa real. Somadas às 6 de index.ts, são as 18 personas da revisão cega e do antes e depois dos marcos.

const semRisco: Perfil['triagem'] = {
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
const perfil = (p: Pick<Perfil, 'nivel' | 'diasSemana' | 'minutosSessao' | 'prioridades'>): Perfil => ({
  semanasParado: 0,
  evitarExercicios: [],
  evitarEquipamentos: [],
  triagem: semRisco,
  ...p,
});
const persona = (nome: string, descricao: string, p: Parameters<typeof perfil>[0], inventario: Inventario): Persona => ({ nome, descricao, perfil: perfil(p), inventario });

export const iara = persona('Iara', 'Iniciante; sem equipamento nenhum; 3 dias de 45 min; sem foco.', { nivel: 'iniciante', diasSemana: 3, minutosSessao: 45, prioridades: [] }, {});
/** O caso que motivou o R5d, fictício: intermediário, sem nada, 60 min, foco nos superiores. */
export const gael = persona(
  'Gael',
  'Intermediário; sem equipamento nenhum; 3 dias de 60 min; foco nos superiores (peito, costas, ombros e braços).',
  { nivel: 'intermediario', diasSemana: 3, minutosSessao: 60, prioridades: ['peito', 'costas', 'ombros', 'bracos'] },
  {},
);
export const helena = persona('Helena', 'Intermediária; só elásticos (3 intensidades); 4 dias de 45 min; foco nos glúteos.', { nivel: 'intermediario', diasSemana: 4, minutosSessao: 45, prioridades: ['gluteos'] }, { elasticos: { intensidades: 3 } });
export const igor = persona('Igor', 'Avançado; só uma barra fixa de porta; 4 dias de 60 min; foco nas costas.', { nivel: 'avancado', diasSemana: 4, minutosSessao: 60, prioridades: ['costas'] }, { barra_fixa: {} });
export const joana = persona('Joana', 'Iniciante; halteres leves (1 a 5 kg), sem banco; 3 dias de 30 min; sem foco.', { nivel: 'iniciante', diasSemana: 3, minutosSessao: 30, prioridades: [] }, { halteres_fixos: { minKg: 1, maxKg: 5, passoKg: 1 } });
export const kaique = persona('Kaique', 'Intermediário; só kettlebells (8, 12 e 16 kg); 3 dias de 45 min; foco nas pernas.', { nivel: 'intermediario', diasSemana: 3, minutosSessao: 45, prioridades: ['pernas'] }, { kettlebell: { pesosKg: [8, 12, 16] } });
export const lia = persona('Lia', 'Intermediária; só uma fita de suspensão; 3 dias de 30 min; foco nas costas.', { nivel: 'intermediario', diasSemana: 3, minutosSessao: 30, prioridades: ['costas'] }, { suspensao: {} });
export const murilo = persona('Murilo', 'Iniciante; mini-band (3 intensidades) e step; 3 dias de 45 min; foco nos glúteos.', { nivel: 'iniciante', diasSemana: 3, minutosSessao: 45, prioridades: ['gluteos'] }, { mini_band: { intensidades: 3 }, step: {} });
export const nara = persona('Nara', 'Avançada; sem equipamento nenhum; 5 dias de 60 min; sem foco.', { nivel: 'avancado', diasSemana: 5, minutosSessao: 60, prioridades: [] }, {});
export const otto = persona(
  'Otto',
  'Intermediário; halteres de 2 a 20 kg e banco reto; 4 dias de 60 min; foco no peito e nos ombros.',
  { nivel: 'intermediario', diasSemana: 4, minutosSessao: 60, prioridades: ['peito', 'ombros'] },
  { halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 }, banco_reto: {} },
);
export const pietra = persona('Pietra', 'Iniciante; sem equipamento nenhum; 3 dias de 45 min; foco nos glúteos.', { nivel: 'iniciante', diasSemana: 3, minutosSessao: 45, prioridades: ['gluteos'] }, {});
export const rui = persona('Rui', 'Iniciante; só uma barra fixa de porta; 3 dias de 45 min; foco nas costas.', { nivel: 'iniciante', diasSemana: 3, minutosSessao: 45, prioridades: ['costas'] }, { barra_fixa: {} });

/** As 12 personas de teste da régua. */
export const PERSONAS_REGUA = { iara, gael, helena, igor, joana, kaique, lia, murilo, nara, otto, pietra, rui };
/** As 18: as 6 de index.ts e as 12 da régua. */
export const PERSONAS_18: Record<string, Persona> = { ...PERSONAS, ...PERSONAS_REGUA };
