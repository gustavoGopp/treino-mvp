import {
  ALTURAS_POLIA,
  ESTACOES_MULTIFUNCIONAL,
  inventarioSchema,
  ITENS,
  ITEM_IDS,
  type EstacaoMultifuncional,
  type Inventario,
  type ItemId,
} from '../../domain/taxonomia/equipamentos';
import { ATALHO, ITENS_DE_ANILHA, SO_NA_FOTO, type Atalho } from '../../domain/taxonomia/atalhos';

// Conversão entre o checklist da tela e o Inventario da taxonomia. Função pura, testada em tests/unit/inventario-form.test.ts.
// Nada vem pré-preenchido: um valor padrão errado mudaria a carga prescrita sem a pessoa perceber
// (docs/pesquisa/09-decisoes-m3.md, seção 7).

export type FormInventario = {
  marcados: ItemId[];
  halteres: { min: string; max: string; passo: string };
  anilhas: { manoplas: string; manoplaKg: string; linhas: { kg: string; qtd: string }[] };
  poliaDupla: { placas: string; kgPorPlaca: string };
  poliaSimples: { altura?: AlturaPolia; placas: string };
  bancoRegulavel: { declina?: boolean };
  elasticos: { intensidades: string };
  multifuncional: { estacoes: EstacaoMultifuncional[] };
  kettlebell: { pesos: number[] };
  voador: { invertido?: boolean };
  tricepsMaquina: { acimaDaCabeca?: boolean };
  /** Menor anilha, pergunta única para os itens de anilha (equipamento.menor-anilha). Vazio = sem resposta. */
  menorAnilha: string;
  /** Atributos que a tela não pergunta (placas, peso da barra, menor anilha): ficam como estavam. */
  extras: Partial<Record<ItemId, Record<string, unknown>>>;
};

export type AlturaPolia = (typeof ALTURAS_POLIA)[number];
export const NOME_ALTURA: Record<AlturaPolia, string> = { alta: 'No alto', baixa: 'Embaixo', regulavel: 'Regulável' };
export const NOME_ESTACAO: Record<EstacaoMultifuncional, string> = {
  puxador: 'Puxador alto',
  remadaBaixa: 'Remada baixa',
  extensora: 'Extensora',
  flexora: 'Flexora',
  voador: 'Voador',
  supino: 'Supino',
};

export const CATEGORIAS = [
  { id: 'halter', titulo: 'Halteres e anilhas' },
  { id: 'banco', titulo: 'Bancos' },
  { id: 'polia', titulo: 'Polias e acessórios' },
  { id: 'barra', titulo: 'Barras' },
  { id: 'maquina', titulo: 'Máquinas' },
  { id: 'acessorio', titulo: 'Outros acessórios' },
] as const;

/** Itens de cada categoria da tela. Os acessórios de polia aparecem junto das polias. A esteira fica só na foto. */
export function itensDaCategoria(cat: (typeof CATEGORIAS)[number]['id']): ItemId[] {
  return ITEM_IDS.filter((id) => {
    if (SO_NA_FOTO.includes(id)) return false;
    const c = ITENS[id].categoria as string;
    if (id.startsWith('acessorio_polia_')) return cat === 'polia';
    return c === cat;
  });
}

/** Nome curto para o cartão do equipamento (o nome completo da taxonomia fica como descrição). */
export const NOME_CURTO: Record<ItemId, string> = {
  estacao_polia_dupla: 'Polia dupla (crossover)',
  polia_simples: 'Polia simples',
  barra_fixa: 'Barra fixa',
  banco_regulavel: 'Banco regulável',
  banco_reto: 'Banco reto',
  halteres_fixos: 'Halteres fixos',
  anilhas_e_manoplas: 'Anilhas e manoplas',
  barra_longa: 'Barra longa',
  barra_w: 'Barra W',
  rack_de_agachamento: 'Rack de agachamento',
  smith: 'Smith',
  leg_press: 'Leg press',
  cadeira_extensora: 'Cadeira extensora',
  mesa_flexora: 'Mesa flexora',
  cadeira_flexora: 'Cadeira flexora',
  paralelas: 'Paralelas',
  acessorio_polia_corda: 'Corda',
  acessorio_polia_triangulo: 'Triângulo',
  acessorio_polia_barra_reta: 'Barra reta',
  acessorio_polia_estribo: 'Estribo',
  acessorio_polia_tornozeleira: 'Tornozeleira',
  elasticos: 'Elásticos',
  step: 'Step',
  bola_suica: 'Bola suíça',
  esteira: 'Esteira',
  barra_hexagonal: 'Barra hexagonal',
  kettlebell: 'Kettlebell',
  banco_scott: 'Banco Scott',
  banco_romano: 'Banco romano',
  estacao_puxada: 'Puxador alto',
  estacao_remada: 'Remada baixa (estação)',
  multifuncional: 'Multifuncional',
  supino_maquina: 'Supino na máquina',
  voador: 'Voador',
  desenvolvimento_maquina: 'Desenvolvimento na máquina',
  remada_articulada: 'Remada articulada',
  graviton: 'Graviton',
  rosca_maquina: 'Máquina de rosca',
  triceps_maquina: 'Máquina de tríceps',
  abdominal_maquina: 'Máquina de abdominal',
  hack: 'Hack',
  cadeira_abdutora_adutora: 'Abdutora e adutora',
  gluteo_maquina: 'Glúteo na máquina',
  panturrilha_em_pe_maquina: 'Panturrilha em pé',
  panturrilha_sentada_maquina: 'Panturrilha sentada',
  suspensao: 'Suspensão (TRX)',
};

/** Valores comuns, para escolher com um toque (sempre há "outro"). Nenhum vem marcado. */
export const VALORES = {
  halterMin: [1, 2, 3, 4, 5],
  halterMax: [8, 10, 12, 15, 20, 25, 30, 40],
  halterPasso: [0.5, 1, 2, 2.5, 5],
  manoplaKg: [1, 1.5, 2, 2.5, 3],
  anilhaKg: [0.5, 1, 1.25, 2, 2.5, 3, 4, 5, 10],
  kettlebellKg: [4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32],
  menorAnilhaKg: [0.5, 1, 1.25, 2, 2.5, 5],
} as const;

/** Itens cujos atributos a tela pergunta; os demais guardam o que já tinham em `extras`. */
const COM_FORM: ItemId[] = [
  'halteres_fixos',
  'anilhas_e_manoplas',
  'estacao_polia_dupla',
  'polia_simples',
  'banco_regulavel',
  'elasticos',
  'multifuncional',
  'kettlebell',
  'voador',
  'triceps_maquina',
];

export const formVazio = (): FormInventario => ({
  marcados: [],
  halteres: { min: '', max: '', passo: '' },
  anilhas: { manoplas: '', manoplaKg: '', linhas: [] },
  poliaDupla: { placas: '', kgPorPlaca: '' },
  poliaSimples: { placas: '' },
  bancoRegulavel: {},
  elasticos: { intensidades: '' },
  multifuncional: { estacoes: [] },
  kettlebell: { pesos: [] },
  voador: {},
  tricepsMaquina: {},
  menorAnilha: '',
  extras: {},
});

const txt = (n: number | undefined) => (n === undefined ? '' : String(n));

export function paraForm(inv: Inventario | undefined): FormInventario {
  const f = formVazio();
  if (!inv) return f;
  f.marcados = ITEM_IDS.filter((id) => id in inv);
  if (inv.halteres_fixos) f.halteres = { min: txt(inv.halteres_fixos.minKg), max: txt(inv.halteres_fixos.maxKg), passo: txt(inv.halteres_fixos.passoKg) };
  if (inv.anilhas_e_manoplas)
    f.anilhas = {
      manoplas: txt(inv.anilhas_e_manoplas.manoplas),
      manoplaKg: txt(inv.anilhas_e_manoplas.manoplaKg),
      linhas: inv.anilhas_e_manoplas.anilhas.map((a) => ({ kg: txt(a.kg), qtd: txt(a.qtd) })),
    };
  if (inv.estacao_polia_dupla) f.poliaDupla = { placas: txt(inv.estacao_polia_dupla.placas), kgPorPlaca: txt(inv.estacao_polia_dupla.kgPorPlaca) };
  if (inv.polia_simples)
    f.poliaSimples = { ...(inv.polia_simples.altura ? { altura: inv.polia_simples.altura } : {}), placas: txt(inv.polia_simples.placas) };
  if (inv.banco_regulavel) f.bancoRegulavel = { declina: inv.banco_regulavel.declina };
  if (inv.elasticos) f.elasticos = { intensidades: txt(inv.elasticos.intensidades) };
  if (inv.multifuncional) f.multifuncional = { estacoes: ESTACOES_MULTIFUNCIONAL.filter((e) => inv.multifuncional![e]) };
  if (inv.kettlebell) f.kettlebell = { pesos: [...inv.kettlebell.pesosKg].sort((a, b) => a - b) };
  if (inv.voador) f.voador = inv.voador.invertido === undefined ? {} : { invertido: inv.voador.invertido };
  if (inv.triceps_maquina) f.tricepsMaquina = inv.triceps_maquina.acimaDaCabeca === undefined ? {} : { acimaDaCabeca: inv.triceps_maquina.acimaDaCabeca };
  // A menor anilha vem do 1º item de anilha que a tem (a pergunta é uma só para todos).
  const menor = ITENS_DE_ANILHA.map((id) => (inv as Record<string, { menorAnilhaKg?: number } | undefined>)[id]?.menorAnilhaKg).find((k) => k !== undefined);
  f.menorAnilha = txt(menor);
  // Placas e kg por placa do multifuncional, do voador e da máquina de tríceps também ficam guardados.
  for (const id of f.marcados) {
    const a = (inv as Record<string, Record<string, unknown> | undefined>)[id];
    if (!a || !Object.keys(a).length) continue;
    if (ITENS_DE_ANILHA.includes(id)) {
      const resto = Object.fromEntries(Object.entries(a).filter(([k]) => k !== 'menorAnilhaKg'));
      if (Object.keys(resto).length) f.extras[id] = resto;
    } else if (!COM_FORM.includes(id)) f.extras[id] = { ...a };
    else if (id === 'multifuncional' || id === 'voador' || id === 'triceps_maquina' || id === 'polia_simples') {
      const { placas, kgPorPlaca } = a as { placas?: number; kgPorPlaca?: number };
      const resto = { ...(placas !== undefined && id !== 'polia_simples' ? { placas } : {}), ...(kgPorPlaca !== undefined ? { kgPorPlaca } : {}) };
      if (Object.keys(resto).length) f.extras[id] = resto;
    }
  }
  return f;
}

/** Chave do campo → mensagem de erro. */
export type ErrosInventario = Record<string, string>;

const num = (s: string) => (s.trim() === '' ? undefined : Number(s.replace(',', '.')));

export function deForm(f: FormInventario): { inventario: Inventario | null; erros: ErrosInventario } {
  const erros: ErrosInventario = {};
  const inv: Record<string, unknown> = {};
  const positivo = (chave: string, s: string, inteiro = false) => {
    const n = num(s);
    if (n === undefined || !Number.isFinite(n) || n <= 0 || (inteiro && !Number.isInteger(n))) {
      erros[chave] = inteiro ? 'Use um número inteiro maior que zero.' : 'Use um número maior que zero.';
      return undefined;
    }
    return n;
  };
  const opcional = (chave: string, s: string, inteiro = false) => (s.trim() === '' ? undefined : positivo(chave, s, inteiro));

  for (const id of f.marcados) {
    switch (id) {
      case 'halteres_fixos': {
        const minKg = positivo('halteres.min', f.halteres.min);
        const maxKg = positivo('halteres.max', f.halteres.max);
        const passoKg = positivo('halteres.passo', f.halteres.passo);
        if (minKg !== undefined && maxKg !== undefined && minKg > maxKg) erros['halteres.max'] = 'O mais pesado precisa ser maior ou igual ao mais leve.';
        if (minKg !== undefined && maxKg !== undefined && passoKg !== undefined && passoKg > maxKg - minKg && maxKg > minKg)
          erros['halteres.passo'] = 'O passo não pode ser maior que a diferença entre o mais leve e o mais pesado.';
        inv[id] = { minKg, maxKg, passoKg };
        break;
      }
      case 'anilhas_e_manoplas': {
        const manoplas = positivo('anilhas.manoplas', f.anilhas.manoplas, true);
        const manoplaKg = positivo('anilhas.manoplaKg', f.anilhas.manoplaKg);
        // Linhas sem quantidade (ou com 0) são pesos que a pessoa não tem.
        const linhas = f.anilhas.linhas.filter((l) => l.qtd.trim() !== '' && l.qtd.trim() !== '0');
        if (!linhas.length) erros['anilhas.linhas'] = 'Informe pelo menos um tipo de anilha (peso e quantidade).';
        const anilhas = linhas.map((l, i) => ({ kg: positivo(`anilhas.${i}.kg`, l.kg), qtd: positivo(`anilhas.${i}.qtd`, l.qtd, true) }));
        inv[id] = { manoplas, manoplaKg, anilhas };
        break;
      }
      case 'estacao_polia_dupla': {
        const placas = opcional('poliaDupla.placas', f.poliaDupla.placas, true);
        const kgPorPlaca = opcional('poliaDupla.kgPorPlaca', f.poliaDupla.kgPorPlaca);
        inv[id] = { ...(placas !== undefined ? { placas } : {}), ...(kgPorPlaca !== undefined ? { kgPorPlaca } : {}) };
        break;
      }
      case 'polia_simples': {
        if (f.poliaSimples.altura === undefined) erros['poliaSimples.altura'] = 'Diga onde fica a polia (no alto, embaixo ou regulável).';
        const placas = opcional('poliaSimples.placas', f.poliaSimples.placas, true);
        inv[id] = { ...f.extras[id], altura: f.poliaSimples.altura, ...(placas !== undefined ? { placas } : {}) };
        break;
      }
      case 'multifuncional':
        if (!f.multifuncional.estacoes.length) erros['multifuncional.estacoes'] = 'Marque pelo menos uma estação do multifuncional.';
        inv[id] = { ...f.extras[id], ...Object.fromEntries(ESTACOES_MULTIFUNCIONAL.map((e) => [e, f.multifuncional.estacoes.includes(e)])) };
        break;
      case 'kettlebell':
        if (!f.kettlebell.pesos.length) erros['kettlebell.pesos'] = 'Marque pelo menos um peso de kettlebell.';
        inv[id] = { pesosKg: [...new Set(f.kettlebell.pesos)].sort((a, b) => a - b) };
        break;
      case 'voador':
        if (f.voador.invertido === undefined) erros['voador.invertido'] = 'Diga se o voador também vira para trás.';
        inv[id] = { ...f.extras[id], invertido: f.voador.invertido };
        break;
      case 'triceps_maquina':
        if (f.tricepsMaquina.acimaDaCabeca === undefined) erros['tricepsMaquina.acimaDaCabeca'] = 'Diga se a máquina é com o braço acima da cabeça.';
        inv[id] = { ...f.extras[id], acimaDaCabeca: f.tricepsMaquina.acimaDaCabeca };
        break;
      case 'banco_regulavel':
        if (f.bancoRegulavel.declina === undefined) erros['bancoRegulavel.declina'] = 'Diga se o banco também declina.';
        inv[id] = { declina: f.bancoRegulavel.declina };
        break;
      case 'elasticos':
        inv[id] = { intensidades: positivo('elasticos.intensidades', f.elasticos.intensidades, true) };
        break;
      default:
        inv[id] = { ...f.extras[id] };
    }
  }
  // Menor anilha: gravada em cada item de anilha marcado; sem resposta, vale o padrão (MENOR_ANILHA_PADRAO_KG).
  const temAnilha = f.marcados.some((id) => ITENS_DE_ANILHA.includes(id));
  const menorAnilhaKg = temAnilha ? opcional('menorAnilha', f.menorAnilha) : undefined;
  if (menorAnilhaKg !== undefined)
    for (const id of f.marcados) if (ITENS_DE_ANILHA.includes(id)) inv[id] = { ...(inv[id] as object), menorAnilhaKg };
  if (Object.keys(erros).length) return { inventario: null, erros };
  const r = inventarioSchema.safeParse(inv);
  if (!r.success) return { inventario: null, erros: { geral: 'Confira os dados do equipamento.' } };
  return { inventario: r.data, erros };
}

/**
 * Junta ao formulário os itens que a pessoa confirmou nas sugestões da foto (M4).
 * Atributos da foto só preenchem campos vazios: o que a pessoa já informou nunca é trocado.
 */
export function comSugestoes(f: FormInventario, sugestoes: { itemId: ItemId; atributos?: Record<string, unknown> }[], confirmados: ItemId[]): FormInventario {
  const n: FormInventario = structuredClone(f);
  const vazio = (s: string) => s.trim() === '';
  const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? String(v) : '');
  for (const s of sugestoes) {
    // A esteira é reconhecida na foto, mas não entra no treino (cardio fica fora do MVP).
    if (!confirmados.includes(s.itemId) || SO_NA_FOTO.includes(s.itemId)) continue;
    if (!n.marcados.includes(s.itemId)) n.marcados.push(s.itemId);
    const a = s.atributos ?? {};
    if (s.itemId === 'halteres_fixos') {
      if (vazio(n.halteres.min)) n.halteres.min = num(a.minKg);
      if (vazio(n.halteres.max)) n.halteres.max = num(a.maxKg);
      if (vazio(n.halteres.passo)) n.halteres.passo = num(a.passoKg);
    }
    if (s.itemId === 'polia_simples' && n.poliaSimples.altura === undefined && (ALTURAS_POLIA as readonly unknown[]).includes(a.altura))
      n.poliaSimples.altura = a.altura as AlturaPolia;
    if (s.itemId === 'multifuncional' && !n.multifuncional.estacoes.length)
      n.multifuncional.estacoes = ESTACOES_MULTIFUNCIONAL.filter((e) => a[e] === true);
    if (s.itemId === 'kettlebell' && !n.kettlebell.pesos.length && Array.isArray(a.pesosKg))
      n.kettlebell.pesos = [...new Set(a.pesosKg.filter((k): k is number => typeof k === 'number' && k > 0))].sort((x, y) => x - y);
    if (s.itemId === 'banco_regulavel' && n.bancoRegulavel.declina === undefined && typeof a.declina === 'boolean') n.bancoRegulavel.declina = a.declina;
    if (s.itemId === 'elasticos' && vazio(n.elasticos.intensidades)) n.elasticos.intensidades = num(a.intensidades);
  }
  n.marcados = ITEM_IDS.filter((id) => n.marcados.includes(id));
  return n;
}

/**
 * Atalho de cenário (equipamento.atalhos): marca o conjunto típico e nunca desmarca o que a pessoa já marcou.
 * As estações do multifuncional só entram se a pessoa ainda não tiver escolhido nenhuma. Os "às vezes tem"
 * ficam desmarcados. Nenhum detalhe é preenchido: a tela continua perguntando.
 */
export function aplicarAtalho(f: FormInventario, id: Atalho['id']): FormInventario {
  const a = ATALHO[id];
  const n: FormInventario = structuredClone(f);
  n.marcados = ITEM_IDS.filter((x) => f.marcados.includes(x) || a.marca.includes(x));
  if (a.estacoes && a.marca.includes('multifuncional') && !n.multifuncional.estacoes.length) n.multifuncional.estacoes = [...a.estacoes];
  return n;
}
