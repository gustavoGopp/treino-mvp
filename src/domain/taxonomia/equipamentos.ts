import { z } from 'zod';

// Taxonomia controlada de equipamentos (equipamento.capacidades; pesquisa-v2/08, seção 1): 46 ids,
// que cobrem casa, condomínio e academia completa. Um id só existe quando muda o que dá para treinar
// ou quando a foto precisa distingui-lo. Os atributos são só os que mudam a prescrição ou o registro
// da carga (seção 1.1): pesos possíveis, placas, anilhas, alturas de polia e estações.

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
  // Novos no R0c (pesquisa-v2/08, seção 1).
  barra_hexagonal: { nome: 'Barra hexagonal (trap bar)', categoria: 'barra' },
  kettlebell: { nome: 'Kettlebell', categoria: 'halter' },
  banco_scott: { nome: 'Banco Scott', categoria: 'banco' },
  banco_romano: { nome: 'Banco romano (hiperextensão)', categoria: 'banco' },
  estacao_puxada: { nome: 'Puxador alto (estação de puxada)', categoria: 'polia' },
  estacao_remada: { nome: 'Remada baixa (estação)', categoria: 'polia' },
  multifuncional: { nome: 'Multifuncional (várias estações numa torre só)', categoria: 'polia' },
  supino_maquina: { nome: 'Supino na máquina ou articulado', categoria: 'maquina' },
  voador: { nome: 'Voador (peck deck)', categoria: 'maquina' },
  desenvolvimento_maquina: { nome: 'Desenvolvimento na máquina', categoria: 'maquina' },
  remada_articulada: { nome: 'Remada articulada', categoria: 'maquina' },
  graviton: { nome: 'Graviton (barra e mergulho assistidos)', categoria: 'maquina' },
  rosca_maquina: { nome: 'Máquina de rosca', categoria: 'maquina' },
  triceps_maquina: { nome: 'Máquina de tríceps', categoria: 'maquina' },
  abdominal_maquina: { nome: 'Máquina de abdominal', categoria: 'maquina' },
  hack: { nome: 'Hack (agachamento articulado)', categoria: 'maquina' },
  cadeira_abdutora_adutora: { nome: 'Cadeira abdutora e adutora', categoria: 'maquina' },
  gluteo_maquina: { nome: 'Glúteo na máquina', categoria: 'maquina' },
  panturrilha_em_pe_maquina: { nome: 'Panturrilha em pé (máquina)', categoria: 'maquina' },
  panturrilha_sentada_maquina: { nome: 'Panturrilha sentada (máquina)', categoria: 'maquina' },
  suspensao: { nome: 'Suspensão (fitas tipo TRX)', categoria: 'acessorio' },
} as const;

export type ItemId = keyof typeof ITENS;
export const ITEM_IDS = Object.keys(ITENS) as ItemId[];

const kg = z.number().positive();
const inteiro = z.number().int().positive();
/** Máquinas e estações com torre de placas (registro por placa; progressao.incremento.polia). */
const torre = z.object({ placas: inteiro.optional(), kgPorPlaca: kg.optional() }).strict();
/** Máquinas de anilha: o peso do trenó é desconhecido (progressao.incremento.maquina-anilha). */
const deAnilha = z.object({ menorAnilhaKg: kg.optional() }).strict();
const barra = z.object({ pesoBarraKg: kg.optional(), menorAnilhaKg: kg.optional() }).strict();
/** Altura da polia simples: fixa no alto, fixa embaixo ou regulável (pesquisa-v2/08, seção 1). */
export const ALTURAS_POLIA = ['alta', 'baixa', 'regulavel'] as const;
/** Estações que o multifuncional pode ter; cada "sim" vale como a máquina equivalente. */
export const ESTACOES_MULTIFUNCIONAL = ['puxador', 'remadaBaixa', 'extensora', 'flexora', 'voador', 'supino'] as const;
export type EstacaoMultifuncional = (typeof ESTACOES_MULTIFUNCIONAL)[number];

export const inventarioSchema = z
  .object({
    estacao_polia_dupla: torre.optional(),
    // Sem altura (dado antigo de polia fixa, migração 3 → 4): a tela pede a altura, e até lá a polia não abre exercício.
    polia_simples: torre.extend({ altura: z.enum(ALTURAS_POLIA).optional() }).strict().optional(),
    halteres_fixos: z.object({ minKg: kg, maxKg: kg, passoKg: kg }).optional(),
    anilhas_e_manoplas: z
      .object({
        manoplas: inteiro,
        manoplaKg: kg.default(2),
        anilhas: z.array(z.object({ kg, qtd: inteiro })),
      })
      .optional(),
    banco_regulavel: z.object({ declina: z.boolean() }).optional(),
    elasticos: z.object({ intensidades: inteiro }).optional(),
    barra_longa: barra.optional(),
    barra_hexagonal: barra.optional(),
    kettlebell: z.object({ pesosKg: z.array(kg).min(1) }).strict().optional(),
    leg_press: deAnilha.optional(),
    hack: deAnilha.optional(),
    smith: deAnilha.optional(),
    panturrilha_sentada_maquina: deAnilha.optional(),
    estacao_puxada: torre.optional(),
    estacao_remada: torre.optional(),
    multifuncional: torre
      .extend(Object.fromEntries(ESTACOES_MULTIFUNCIONAL.map((e) => [e, z.boolean().optional()])) as Record<EstacaoMultifuncional, z.ZodOptional<z.ZodBoolean>>)
      .strict()
      .optional(),
    supino_maquina: torre.optional(),
    voador: torre.extend({ invertido: z.boolean().optional() }).strict().optional(),
    desenvolvimento_maquina: torre.optional(),
    remada_articulada: torre.optional(),
    graviton: z.object({ placas: inteiro.optional() }).strict().optional(),
    rosca_maquina: torre.optional(),
    triceps_maquina: torre.extend({ acimaDaCabeca: z.boolean().optional() }).strict().optional(),
    abdominal_maquina: torre.optional(),
    cadeira_extensora: torre.optional(),
    cadeira_flexora: torre.optional(),
    mesa_flexora: torre.optional(),
    cadeira_abdutora_adutora: torre.optional(),
    gluteo_maquina: torre.optional(),
    panturrilha_em_pe_maquina: torre.optional(),
  })
  .catchall(z.object({}).strict().optional())
  .superRefine((inv, ctx) => {
    for (const k of Object.keys(inv)) if (!(k in ITENS)) ctx.addIssue({ code: 'custom', message: `item fora da taxonomia: ${k}` });
  });

/**
 * Menor anilha padrão, em kg, para as máquinas de anilha e as barras quando a pessoa não informa.
 * [opinião] (pesquisa-v2/08, seção 1.1): a confirmar com a academia do Gustavo no T8; a pergunta é do R1.
 */
export const MENOR_ANILHA_PADRAO_KG = 2;

/** Inventário confirmado pela pessoa: só entra o que ela tem. Itens sem atributos usam {}. */
export type Inventario = z.infer<typeof inventarioSchema>;

// Capacidades: o que o inventário permite, independentemente do item exato (equipamento.capacidades).
// Os exercícios da biblioteca pedem capacidades, não itens (ex.: "polia_alta" vale para a polia dupla, a polia
// simples alta ou regulável, a estação de puxada e o puxador do multifuncional).
const tem = (i: Inventario, k: ItemId) => k in i;
const estacao = (i: Inventario, e: EstacaoMultifuncional) => !!i.multifuncional?.[e];
const alturaSimples = (i: Inventario) => i.polia_simples?.altura;
export const CAPACIDADES = {
  halteres: (i: Inventario) => !!i.halteres_fixos || !!i.anilhas_e_manoplas,
  kettlebell: (i: Inventario) => !!i.kettlebell,
  polia: (i: Inventario) => !!i.estacao_polia_dupla || !!i.polia_simples,
  polia_dupla: (i: Inventario) => !!i.estacao_polia_dupla,
  polia_alta: (i: Inventario) =>
    !!i.estacao_polia_dupla || alturaSimples(i) === 'alta' || alturaSimples(i) === 'regulavel' || tem(i, 'estacao_puxada') || estacao(i, 'puxador'),
  polia_baixa: (i: Inventario) =>
    !!i.estacao_polia_dupla || alturaSimples(i) === 'baixa' || alturaSimples(i) === 'regulavel' || tem(i, 'estacao_remada') || estacao(i, 'remadaBaixa'),
  puxador: (i: Inventario) => tem(i, 'estacao_puxada') || estacao(i, 'puxador'),
  remada_estacao: (i: Inventario) => tem(i, 'estacao_remada') || estacao(i, 'remadaBaixa'),
  corda: (i: Inventario) => tem(i, 'acessorio_polia_corda'),
  triangulo: (i: Inventario) => tem(i, 'acessorio_polia_triangulo'),
  barra_reta_polia: (i: Inventario) => tem(i, 'acessorio_polia_barra_reta'),
  estribo: (i: Inventario) => tem(i, 'acessorio_polia_estribo') || !!i.estacao_polia_dupla,
  tornozeleira: (i: Inventario) => tem(i, 'acessorio_polia_tornozeleira'),
  banco: (i: Inventario) => tem(i, 'banco_reto') || tem(i, 'banco_regulavel'),
  banco_inclinavel: (i: Inventario) => tem(i, 'banco_regulavel'),
  banco_declinavel: (i: Inventario) => !!i.banco_regulavel?.declina,
  banco_scott: (i: Inventario) => tem(i, 'banco_scott'),
  banco_romano: (i: Inventario) => tem(i, 'banco_romano'),
  barra_fixa: (i: Inventario) => tem(i, 'barra_fixa'),
  barra_longa: (i: Inventario) => tem(i, 'barra_longa'),
  barra_w: (i: Inventario) => tem(i, 'barra_w'),
  barra_hexagonal: (i: Inventario) => tem(i, 'barra_hexagonal'),
  rack: (i: Inventario) => tem(i, 'rack_de_agachamento'),
  smith: (i: Inventario) => tem(i, 'smith'),
  barra_baixa: (i: Inventario) => tem(i, 'rack_de_agachamento') || tem(i, 'smith'),
  leg_press: (i: Inventario) => tem(i, 'leg_press'),
  hack: (i: Inventario) => tem(i, 'hack'),
  cadeira_extensora: (i: Inventario) => tem(i, 'cadeira_extensora') || estacao(i, 'extensora'),
  mesa_flexora: (i: Inventario) => tem(i, 'mesa_flexora'),
  cadeira_flexora: (i: Inventario) => tem(i, 'cadeira_flexora') || estacao(i, 'flexora'),
  abdutora: (i: Inventario) => tem(i, 'cadeira_abdutora_adutora'),
  adutora: (i: Inventario) => tem(i, 'cadeira_abdutora_adutora'),
  gluteo_maquina: (i: Inventario) => tem(i, 'gluteo_maquina'),
  panturrilha_em_pe: (i: Inventario) => tem(i, 'panturrilha_em_pe_maquina'),
  panturrilha_sentada: (i: Inventario) => tem(i, 'panturrilha_sentada_maquina'),
  supino_maquina: (i: Inventario) => tem(i, 'supino_maquina') || estacao(i, 'supino'),
  voador: (i: Inventario) => tem(i, 'voador') || estacao(i, 'voador'),
  voador_invertido: (i: Inventario) => !!i.voador?.invertido,
  desenvolvimento_maquina: (i: Inventario) => tem(i, 'desenvolvimento_maquina'),
  remada_articulada: (i: Inventario) => tem(i, 'remada_articulada'),
  graviton: (i: Inventario) => tem(i, 'graviton'),
  rosca_maquina: (i: Inventario) => tem(i, 'rosca_maquina'),
  triceps_maquina: (i: Inventario) => tem(i, 'triceps_maquina'),
  /** Máquina de tríceps com o braço acima da cabeça: vale na função "tríceps acima da cabeça" (08, seção 2). */
  triceps_maquina_acima: (i: Inventario) => !!i.triceps_maquina?.acimaDaCabeca,
  abdominal_maquina: (i: Inventario) => tem(i, 'abdominal_maquina'),
  paralelas: (i: Inventario) => tem(i, 'paralelas'),
  suspensao: (i: Inventario) => tem(i, 'suspensao'),
  elastico: (i: Inventario) => !!i.elasticos,
  step: (i: Inventario) => tem(i, 'step'),
  bola_suica: (i: Inventario) => tem(i, 'bola_suica'),
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

/** Pesos de kettlebell (kg), em ordem crescente e sem repetição (progressao.incremento.halteres). */
export const cargasKettlebell = (inv: Inventario): number[] => [...new Set((inv.kettlebell?.pesosKg ?? []).map(arred))].sort((a, b) => a - b);

const arred = (x: number) => Math.round(x * 100) / 100;
