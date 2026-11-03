// Cenários fictícios da sessão de equipamento mínimo (docs/revisoes/equipamento-minimo.md, Parte A).
// O inventário vazio, cada um dos 46 itens sozinho (com atributos típicos de quem tem só aquele item) e os pares
// mais prováveis em casa. Nada aqui é dado de uma pessoa real.
import { BIBLIOTECA, type Articulacao } from '../../src/domain/biblioteca';
import { FUNCOES } from '../../src/domain/gerador/funcoes';
import { capacidades, cargasHalter, cargasKettlebell, ITEM_IDS, ITENS, type Inventario, type ItemId } from '../../src/domain/taxonomia/equipamentos';

/**
 * Atributos típicos de quem tem só aquele item [opinião]: um par de halteres só, um elástico de uma intensidade só,
 * um kettlebell só, uma polia simples fixa no alto, um kit pequeno de manoplas, uma barra sem rack.
 */
export const SOZINHO: Partial<Record<ItemId, object>> = {
  halteres_fixos: { minKg: 5, maxKg: 5, passoKg: 5 },
  anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 1, qtd: 4 }, { kg: 2, qtd: 4 }] },
  elasticos: { intensidades: 1 },
  kettlebell: { pesosKg: [12] },
  polia_simples: { altura: 'alta' },
  multifuncional: { puxador: true, remadaBaixa: true },
  banco_regulavel: { declina: false },
  voador: { invertido: false },
  triceps_maquina: { acimaDaCabeca: false },
  barra_longa: { pesoBarraKg: 20, menorAnilhaKg: 2 },
  barra_hexagonal: { pesoBarraKg: 20, menorAnilhaKg: 2 },
};

export type CenarioMin = { id: string; nome: string; inventario: Inventario; tipo: 'vazio' | 'item' | 'par' };

const item = (k: ItemId): CenarioMin => ({ id: k, nome: `Só ${ITENS[k].nome.toLowerCase()}`, inventario: { [k]: { ...(SOZINHO[k] ?? {}) } } as Inventario, tipo: 'item' });

export const CENARIOS_MIN: CenarioMin[] = [
  { id: 'vazio', nome: 'Nada marcado (só o peso do corpo)', inventario: {}, tipo: 'vazio' },
  ...ITEM_IDS.map(item),
  { id: 'barra-porta+elasticos', nome: 'Barra fixa de porta + elásticos (3 intensidades)', inventario: { barra_fixa: {}, elasticos: { intensidades: 3 } }, tipo: 'par' },
  { id: 'halteres+bola', nome: 'Halteres de 2 a 10 kg + bola suíça', inventario: { halteres_fixos: { minKg: 2, maxKg: 10, passoKg: 2 }, bola_suica: {} }, tipo: 'par' },
  { id: 'suspensao+elasticos', nome: 'Suspensão + elásticos (3 intensidades)', inventario: { suspensao: {}, elasticos: { intensidades: 3 } }, tipo: 'par' },
  { id: 'banco+halteres-leves', nome: 'Banco reto + halteres leves (2 a 6 kg)', inventario: { banco_reto: {}, halteres_fixos: { minKg: 2, maxKg: 6, passoKg: 2 } }, tipo: 'par' },
  { id: 'step+elasticos', nome: 'Step + elásticos (3 intensidades)', inventario: { step: {}, elasticos: { intensidades: 3 } }, tipo: 'par' },
];

const CAPS_DE_CONDICAO = new Set(FUNCOES.flatMap((f) => Object.values(f.condicoes ?? {}).flat()));
/**
 * Dois cenários que abrem os mesmos exercícios, com as mesmas condições de função e as mesmas cargas de halter e
 * kettlebell, geram o mesmo programa: a grade roda uma vez por classe (o 1º cenário da lista é o representante).
 * Ex.: a corda para polia sozinha não abre nada, e fica na classe do inventário vazio.
 */
export const chaveDaClasse = (inv: Inventario) => {
  const caps = capacidades(inv);
  const possiveis = BIBLIOTECA.filter((e) => e.requer.some((g) => g.every((c) => caps.has(c)))).map((e) => e.id);
  return JSON.stringify([possiveis, [...caps].filter((c) => CAPS_DE_CONDICAO.has(c)).sort(), cargasHalter(inv), cargasKettlebell(inv)]);
};

export type Dor = { articulacao: Articulacao; nota: number };
/** As dores da grade: as 4 regiões da pergunta (joelho, punho, ombro, lombar) e as combinações da auditoria. */
export const DORES_MIN: { id: string; dores: Dor[] }[] = [
  { id: 'sem dor', dores: [] },
  { id: 'joelho 7', dores: [{ articulacao: 'joelho', nota: 7 }] },
  { id: 'punho 7', dores: [{ articulacao: 'punho', nota: 7 }] },
  { id: 'ombro 7', dores: [{ articulacao: 'ombro', nota: 7 }] },
  { id: 'lombar 7', dores: [{ articulacao: 'lombar', nota: 7 }] },
  { id: 'cotovelo 7', dores: [{ articulacao: 'cotovelo', nota: 7 }] },
  { id: 'ombro 4', dores: [{ articulacao: 'ombro', nota: 4 }] },
  { id: 'joelho 7 + lombar 7', dores: [{ articulacao: 'joelho', nota: 7 }, { articulacao: 'lombar', nota: 7 }] },
];
