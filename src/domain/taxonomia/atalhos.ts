import type { EstacaoMultifuncional, ItemId } from './equipamentos';

// Atalhos de cenário na tela de equipamento (equipamento.atalhos; pesquisa-v2/08, seção 3). Nenhum vem
// selecionado (decisão 7 do M3): o toque marca o conjunto típico, sem desmarcar nada, e os "às vezes tem"
// aparecem logo abaixo, desmarcados. Os detalhes que mudam o programa continuam sendo perguntados.
// [opinião] Os conjuntos vêm do T7 (guias de condomínio, páginas de rede e lojas, não verificados).
// O atalho só mexe no formulário de um inventário: serve igual quando houver mais de um local (R1b).

export type Atalho = {
  id: 'casa' | 'condominio' | 'academia';
  nome: string;
  /** Itens marcados pelo toque. */
  marca: ItemId[];
  /** Estações do multifuncional marcadas pelo toque; as outras ficam para a pessoa confirmar. */
  estacoes?: EstacaoMultifuncional[];
  /** "Às vezes tem": aparecem desmarcados, a um toque cada. */
  asVezes: ItemId[];
};

export const ATALHOS: Atalho[] = [
  {
    id: 'casa',
    nome: 'Casa com halteres e elásticos',
    marca: ['anilhas_e_manoplas', 'elasticos'],
    asVezes: ['banco_reto', 'banco_regulavel', 'barra_fixa', 'kettlebell', 'suspensao', 'step', 'bola_suica'],
  },
  {
    id: 'condominio',
    nome: 'Condomínio com multifuncional',
    marca: ['multifuncional', 'banco_regulavel', 'halteres_fixos', 'bola_suica'],
    estacoes: ['puxador', 'remadaBaixa'],
    asVezes: ['barra_longa', 'barra_w', 'barra_fixa', 'elasticos', 'step', 'kettlebell'],
  },
  {
    id: 'academia',
    nome: 'Academia completa',
    marca: [
      'estacao_polia_dupla',
      'polia_simples',
      'acessorio_polia_corda',
      'acessorio_polia_triangulo',
      'acessorio_polia_barra_reta',
      'acessorio_polia_estribo',
      'acessorio_polia_tornozeleira',
      'barra_fixa',
      'paralelas',
      'graviton',
      'banco_reto',
      'banco_regulavel',
      'banco_scott',
      'banco_romano',
      'halteres_fixos',
      'barra_longa',
      'barra_w',
      'barra_hexagonal',
      'rack_de_agachamento',
      'smith',
      'leg_press',
      'hack',
      'cadeira_extensora',
      'cadeira_flexora',
      'mesa_flexora',
      'cadeira_abdutora_adutora',
      'gluteo_maquina',
      'panturrilha_em_pe_maquina',
      'panturrilha_sentada_maquina',
      'estacao_puxada',
      'estacao_remada',
      'supino_maquina',
      'voador',
      'desenvolvimento_maquina',
      'remada_articulada',
      'rosca_maquina',
      'triceps_maquina',
      'abdominal_maquina',
      'step',
    ],
    asVezes: ['kettlebell', 'elasticos', 'bola_suica', 'suspensao'],
  },
];

export const ATALHO: Record<Atalho['id'], Atalho> = Object.fromEntries(ATALHOS.map((a) => [a.id, a])) as Record<Atalho['id'], Atalho>;

/** Itens de anilha que usam a pergunta única "qual a menor anilha?" (equipamento.menor-anilha). */
export const ITENS_DE_ANILHA: ItemId[] = ['leg_press', 'hack', 'smith', 'panturrilha_sentada_maquina', 'barra_longa', 'barra_hexagonal'];

/** Itens só reconhecidos na foto, fora da lista de treino (cardio não é prescrito no MVP). */
export const SO_NA_FOTO: ItemId[] = ['esteira'];
