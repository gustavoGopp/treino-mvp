import { z } from 'zod';

// Taxonomia controlada de equipamentos. Os ids partem do inventário da academia de referência
// (gabarito da visão) e cobrem casa, academia pequena e academia completa.
// Os atributos são só os que mudam a prescrição (carga máxima, incrementos, alturas de polia).

export const ITENS = {
  estacao_polia_dupla: { nome: 'Estação de polia dupla (crossover) com altura regulável', categoria: 'polia' },
  polia_simples: { nome: 'Polia simples', categoria: 'polia' },
  barra_fixa: { nome: 'Barra fixa', categoria: 'barra' },
  banco_regulavel: { nome: 'Banco regulável (inclina)', categoria: 'banco' },
  banco_reto: { nome: 'Banco reto', categoria: 'banco' },
  halteres_fixos: { nome: 'Halteres fixos', categoria: 'halter' },
  anilhas_e_manoplas: { nome: 'Anilhas e manoplas para montar halteres', categoria: 'halter' },
  barra_longa: { nome: 'Barra longa (olímpica ou comum)', categoria: 'barra' },
  barra_w: { nome: 'Barra W', categoria: 'barra' },
  rack_de_agachamento: { nome: 'Rack ou gaiola de agachamento', categoria: 'maquina' },
  smith: { nome: 'Smith', categoria: 'maquina' },
  leg_press: { nome: 'Leg press', categoria: 'maquina' },
  cadeira_extensora: { nome: 'Cadeira extensora', categoria: 'maquina' },
  mesa_flexora: { nome: 'Mesa flexora (deitada)', categoria: 'maquina' },
  cadeira_flexora: { nome: 'Cadeira flexora (sentada)', categoria: 'maquina' },
  paralelas: { nome: 'Paralelas', categoria: 'barra' },
  acessorio_polia_corda: { nome: 'Corda para polia', categoria: 'acessorio' },
  acessorio_polia_triangulo: { nome: 'Triângulo para polia', categoria: 'acessorio' },
  acessorio_polia_barra_reta: { nome: 'Barra reta para polia', categoria: 'acessorio' },
  acessorio_polia_estribo: { nome: 'Estribo (pegador de uma mão)', categoria: 'acessorio' },
  acessorio_polia_tornozeleira: { nome: 'Tornozeleira para polia', categoria: 'acessorio' },
  elasticos: { nome: 'Elásticos (faixas ou tubos)', categoria: 'acessorio' },
  step: { nome: 'Step', categoria: 'acessorio' },
  bola_suica: { nome: 'Bola suíça', categoria: 'acessorio' },
  esteira: { nome: 'Esteira', categoria: 'cardio' },
} as const;

export type ItemId = keyof typeof ITENS;
export const ITEM_IDS = Object.keys(ITENS) as ItemId[];

const kg = z.number().positive();
export const inventarioSchema = z
  .object({
    estacao_polia_dupla: z.object({ placas: z.number().int().positive().optional(), kgPorPlaca: kg.optional() }).optional(),
    polia_simples: z.object({ alturaRegulavel: z.boolean(), placas: z.number().int().positive().optional() }).optional(),
    halteres_fixos: z.object({ minKg: kg, maxKg: kg, passoKg: kg }).optional(),
    anilhas_e_manoplas: z
      .object({
        manoplas: z.number().int().positive(),
        manoplaKg: kg.default(2),
        anilhas: z.array(z.object({ kg, qtd: z.number().int().positive() })),
      })
      .optional(),
    banco_regulavel: z.object({ declina: z.boolean() }).optional(),
    elasticos: z.object({ intensidades: z.number().int().positive() }).optional(),
  })
  .catchall(z.object({}).strict().optional())
  .superRefine((inv, ctx) => {
    for (const k of Object.keys(inv)) if (!(k in ITENS)) ctx.addIssue({ code: 'custom', message: `item fora da taxonomia: ${k}` });
  });

/** Inventário confirmado pela pessoa: só entra o que ela tem. Itens sem atributos usam {}. */
export type Inventario = z.infer<typeof inventarioSchema>;

// Capacidades: o que o inventário permite, independentemente do item exato.
// Os exercícios da biblioteca pedem capacidades, não itens (ex.: "polia" vale para polia simples ou dupla).
export const CAPACIDADES = {
  halteres: (i: Inventario) => !!i.halteres_fixos || !!i.anilhas_e_manoplas,
  polia: (i: Inventario) => !!i.estacao_polia_dupla || !!i.polia_simples,
  polia_dupla: (i: Inventario) => !!i.estacao_polia_dupla,
  polia_alta: (i: Inventario) => !!i.estacao_polia_dupla || !!i.polia_simples?.alturaRegulavel,
  polia_baixa: (i: Inventario) => !!i.estacao_polia_dupla || !!i.polia_simples?.alturaRegulavel,
  corda: (i: Inventario) => 'acessorio_polia_corda' in i,
  triangulo: (i: Inventario) => 'acessorio_polia_triangulo' in i,
  barra_reta_polia: (i: Inventario) => 'acessorio_polia_barra_reta' in i,
  estribo: (i: Inventario) => 'acessorio_polia_estribo' in i || !!i.estacao_polia_dupla,
  banco: (i: Inventario) => 'banco_reto' in i || 'banco_regulavel' in i,
  banco_inclinavel: (i: Inventario) => 'banco_regulavel' in i,
  banco_declinavel: (i: Inventario) => !!i.banco_regulavel?.declina,
  barra_fixa: (i: Inventario) => 'barra_fixa' in i,
  barra_longa: (i: Inventario) => 'barra_longa' in i,
  barra_w: (i: Inventario) => 'barra_w' in i,
  rack: (i: Inventario) => 'rack_de_agachamento' in i,
  barra_baixa: (i: Inventario) => 'rack_de_agachamento' in i || 'smith' in i,
  leg_press: (i: Inventario) => 'leg_press' in i,
  cadeira_extensora: (i: Inventario) => 'cadeira_extensora' in i,
  mesa_flexora: (i: Inventario) => 'mesa_flexora' in i,
  cadeira_flexora: (i: Inventario) => 'cadeira_flexora' in i,
  paralelas: (i: Inventario) => 'paralelas' in i,
  elastico: (i: Inventario) => !!i.elasticos,
  step: (i: Inventario) => 'step' in i,
  bola_suica: (i: Inventario) => 'bola_suica' in i,
  apoio: () => true, // parede, porta, cadeira: sempre existe
} as const;

export type Capacidade = keyof typeof CAPACIDADES;
export const capacidades = (inv: Inventario) =>
  new Set((Object.keys(CAPACIDADES) as Capacidade[]).filter((c) => CAPACIDADES[c](inv)));

/**
 * Cargas possíveis por halter (kg), em ordem crescente: pares fixos + montagens com as anilhas
 * (cada halter recebe o mesmo conjunto de anilhas dos dois lados; 2 halteres = 4 lados).
 */
export function cargasHalter(inv: Inventario): number[] {
  const cargas = new Set<number>();
  const f = inv.halteres_fixos;
  if (f) for (let k = f.minKg; k <= f.maxKg + 1e-9; k += f.passoKg) cargas.add(arred(k));
  const m = inv.anilhas_e_manoplas;
  if (m && m.manoplas >= 1) {
    const lados = m.manoplas >= 2 ? 4 : 2; // com 1 manopla, monta-se 1 halter (unilateral)
    let somas = new Set([0]);
    for (const a of m.anilhas) {
      const porLado = Math.floor(a.qtd / lados);
      const novas = new Set<number>();
      for (const s of somas) for (let n = 0; n <= porLado; n++) novas.add(arred(s + n * a.kg));
      somas = novas;
    }
    for (const s of somas) cargas.add(arred(m.manoplaKg + 2 * s));
  }
  return [...cargas].sort((a, b) => a - b);
}

export const cargaMaxHalter = (inv: Inventario) => cargasHalter(inv).at(-1) ?? 0;

const arred = (x: number) => Math.round(x * 100) / 100;
