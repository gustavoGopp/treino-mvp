import { ESTACOES_MULTIFUNCIONAL, type EstacaoMultifuncional, type Inventario, type ItemId } from './equipamentos';

// Atalhos de cenário na tela de equipamento (equipamento.atalhos; pesquisa-v2/08, seção 3). Nenhum vem
// selecionado (decisão 7 do M3): o toque marca o conjunto típico, sem desmarcar nada, e os "às vezes tem"
// aparecem logo abaixo, desmarcados.
// "Programa na hora" (decisão do Gustavo de 19/11/2026, lote M1 da análise crítica): os três atalhos com equipamento
// trazem um kit típico nos detalhes (`padroes`), e o programa sai sem pergunta nenhuma. Isso revoga "os detalhes que
// mudam o programa continuam sendo perguntados" (devlog de 03/11): o ajuste fica para depois, na hora de anotar a carga
// ("Meus pesos são outros") ou em "Meus locais". Quem marca item por item continua respondendo os detalhes.
// "Corpo livre" (sessão de equipamento mínimo, decisão do Gustavo de 03/11/2026) é a escolha explícita de treinar
// sem equipamento: o toque desmarca tudo, e o programa usa o chão, uma parede e uma cadeira firme.
// [opinião] Os conjuntos vêm do T7 (guias de condomínio, páginas de rede e lojas, não verificados).
// O atalho só mexe no formulário de um inventário: serve igual quando houver mais de um local (R1b).

export type Atalho = {
  id: 'casa' | 'condominio' | 'academia' | 'corpo';
  nome: string;
  /** Itens marcados pelo toque. */
  marca: ItemId[];
  /** Estações do multifuncional marcadas pelo toque; as outras ficam para a pessoa confirmar. */
  estacoes?: EstacaoMultifuncional[];
  /** "Às vezes tem": aparecem desmarcados, a um toque cada. */
  asVezes: ItemId[];
  /** Sem equipamento: o toque desmarca tudo (a escolha explícita de "não tenho nada"). */
  semEquipamento?: true;
  /** Texto curto mostrado logo abaixo, depois do toque. */
  ajuda?: string;
  /**
   * Kit típico: respostas típicas dos detalhes, preenchidas só onde a pessoa ainda não respondeu (design v2, item D, e
   * o lote M1 de 19/11/2026). Ficam editáveis em "Meus locais"; a 1ª série de cada exercício acerta a carga.
   */
  padroes?: {
    halteres?: { minKg: number; maxKg: number; passoKg: number };
    alturaPolia?: 'alta' | 'baixa' | 'regulavel';
    voadorInvertido?: boolean;
    bancoDeclina?: boolean;
    tricepsAcimaDaCabeca?: boolean;
    elasticos?: { intensidades: number };
  };
};

export const ATALHOS: Atalho[] = [
  {
    id: 'casa',
    nome: 'Casa com halteres e elásticos',
    // Halteres comuns, não de montar (lote M1): é o que a maioria tem em casa; quem monta os seus marca "Anilhas e
    // manoplas" logo abaixo, e aí responde os detalhes.
    marca: ['halteres_fixos', 'elasticos'],
    // [opinião] O lado conservador: poucos pares e leves (2 a 10 kg, de 2 em 2) e 3 elásticos de forças diferentes (os
    // kits costumam vir com 3 a 5). Sem fonte: é juízo do projeto, corrigido pela pessoa no primeiro treino.
    padroes: { halteres: { minKg: 2, maxKg: 10, passoKg: 2 }, elasticos: { intensidades: 3 } },
    asVezes: ['anilhas_e_manoplas', 'banco_reto', 'banco_regulavel', 'barra_fixa', 'kettlebell', 'suspensao', 'step', 'bola_suica', 'caneleiras', 'mini_band', 'roda_abdominal'],
  },
  {
    id: 'condominio',
    nome: 'Condomínio com multifuncional',
    marca: ['multifuncional', 'banco_regulavel', 'halteres_fixos', 'bola_suica'],
    estacoes: ['puxador', 'remadaBaixa'],
    // [opinião] O lado conservador: halteres de 2 a 12 kg, de 2 em 2, e banco que não declina. Sem fonte (pesquisa-v2/08,
    // seção 3: não há lista oficial do que um prédio tem); a pessoa corrige no primeiro treino.
    padroes: { halteres: { minKg: 2, maxKg: 12, passoKg: 2 }, bancoDeclina: false },
    asVezes: ['barra_longa', 'barra_w', 'barra_fixa', 'elasticos', 'step', 'kettlebell', 'caneleiras', 'mini_band', 'roda_abdominal'],
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
    // [opinião] Halteres de 2 a 40 kg, de 2 em 2, e polia regulável; nos "sim ou não" dos aparelhos (voador invertido,
    // banco que declina, tríceps acima da cabeça), o lado conservador: nenhum exercício que o aparelho talvez não
    // permita. equipamento.atalhos.
    padroes: { halteres: { minKg: 2, maxKg: 40, passoKg: 2 }, alturaPolia: 'regulavel', voadorInvertido: false, bancoDeclina: false, tricepsAcimaDaCabeca: false },
  },
];

ATALHOS.push({
  id: 'corpo',
  nome: 'Corpo livre',
  marca: [],
  asVezes: [],
  semEquipamento: true,
  ajuda: 'Sem equipamento: o programa usa o chão, uma parede e uma cadeira firme. Dá para marcar algum item depois, se aparecer.',
});

export const ATALHO: Record<Atalho['id'], Atalho> = Object.fromEntries(ATALHOS.map((a) => [a.id, a])) as Record<Atalho['id'], Atalho>;

/** Itens de anilha que usam a pergunta única "qual a menor anilha?" (equipamento.menor-anilha). */
export const ITENS_DE_ANILHA: ItemId[] = ['leg_press', 'hack', 'smith', 'panturrilha_sentada_maquina', 'barra_longa', 'barra_hexagonal'];

/** Itens só reconhecidos na foto, fora da lista de treino (cardio não é prescrito no MVP). */
export const SO_NA_FOTO: ItemId[] = ['esteira'];

/** Os atalhos que trazem um kit típico (todos menos "Corpo livre", que não tem equipamento). */
export const ATALHOS_COM_KIT = ATALHOS.filter((a) => a.padroes).map((a) => a.id);

/**
 * O inventário que um atalho gera sozinho, sem nenhum toque a mais: o kit típico daquele lugar. É o mesmo que o
 * formulário da tela de equipamento produz (`aplicarAtalho` e `deForm`; tests/unit/inventario-form.test.ts confere que os
 * dois batem). Fica aqui, sem o formulário, para a tela do programa reconhecer o kit sem baixar o código do cadastro
 * (22/11/2026: com o formulário junto, a tela do programa passava do limite de peso).
 */
export function inventarioDoKit(id: Atalho['id']): Inventario {
  const a = ATALHO[id];
  const p = a.padroes ?? {};
  const inv: Record<string, object> = {};
  for (const item of a.marca) {
    if (item === 'halteres_fixos') inv[item] = { ...p.halteres };
    else if (item === 'elasticos') inv[item] = { ...p.elasticos };
    else if (item === 'banco_regulavel') inv[item] = { declina: p.bancoDeclina };
    else if (item === 'polia_simples') inv[item] = { altura: p.alturaPolia };
    else if (item === 'voador') inv[item] = { invertido: p.voadorInvertido };
    else if (item === 'triceps_maquina') inv[item] = { acimaDaCabeca: p.tricepsAcimaDaCabeca };
    else if (item === 'multifuncional') inv[item] = Object.fromEntries(ESTACOES_MULTIFUNCIONAL.map((e) => [e, (a.estacoes ?? []).includes(e)]));
    else inv[item] = {};
  }
  return inv as Inventario;
}

const canonico = (v: unknown): unknown =>
  Array.isArray(v) ? v.map(canonico) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canonico((v as Record<string, unknown>)[k])])) : v;

/**
 * O inventário é, sem tirar nem pôr, o kit típico de um atalho? Serve para o programa dizer "montado para um kit
 * típico" enquanto a pessoa não ajustou nada. Nada é guardado: sai da comparação, e some no primeiro ajuste.
 */
export function kitTipicoDe(inv: Inventario | undefined): Atalho['id'] | undefined {
  if (!inv) return undefined;
  const alvo = JSON.stringify(canonico(inv));
  return ATALHOS_COM_KIT.find((id) => JSON.stringify(canonico(inventarioDoKit(id))) === alvo);
}
