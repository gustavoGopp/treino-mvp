import { inventarioSchema, ITENS, ITEM_IDS, type Inventario, type ItemId } from '../../domain/taxonomia/equipamentos';

// Conversão entre o checklist da tela e o Inventario da taxonomia. Função pura, testada em tests/unit/inventario-form.test.ts.
// Nada vem pré-preenchido: um valor padrão errado mudaria a carga prescrita sem a pessoa perceber
// (docs/pesquisa/09-decisoes-m3.md, seção 7).

export type FormInventario = {
  marcados: ItemId[];
  halteres: { min: string; max: string; passo: string };
  anilhas: { manoplas: string; manoplaKg: string; linhas: { kg: string; qtd: string }[] };
  poliaDupla: { placas: string; kgPorPlaca: string };
  poliaSimples: { regulavel?: boolean; placas: string };
  bancoRegulavel: { declina?: boolean };
  elasticos: { intensidades: string };
};

export const CATEGORIAS = [
  { id: 'halter', titulo: 'Halteres e anilhas' },
  { id: 'banco', titulo: 'Bancos' },
  { id: 'polia', titulo: 'Polias e acessórios' },
  { id: 'barra', titulo: 'Barras' },
  { id: 'maquina', titulo: 'Máquinas' },
  { id: 'acessorio', titulo: 'Outros acessórios' },
  { id: 'cardio', titulo: 'Cardio' },
] as const;

/** Itens de cada categoria da tela. Os acessórios de polia aparecem junto das polias. */
export function itensDaCategoria(cat: (typeof CATEGORIAS)[number]['id']): ItemId[] {
  return ITEM_IDS.filter((id) => {
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
};

/** Valores comuns, para escolher com um toque (sempre há "outro"). Nenhum vem marcado. */
export const VALORES = {
  halterMin: [1, 2, 3, 4, 5],
  halterMax: [8, 10, 12, 15, 20, 25, 30, 40],
  halterPasso: [0.5, 1, 2, 2.5, 5],
  manoplaKg: [1, 1.5, 2, 2.5, 3],
  anilhaKg: [0.5, 1, 1.25, 2, 2.5, 3, 4, 5, 10],
} as const;

export const formVazio = (): FormInventario => ({
  marcados: [],
  halteres: { min: '', max: '', passo: '' },
  anilhas: { manoplas: '', manoplaKg: '', linhas: [] },
  poliaDupla: { placas: '', kgPorPlaca: '' },
  poliaSimples: { placas: '' },
  bancoRegulavel: {},
  elasticos: { intensidades: '' },
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
  if (inv.polia_simples) f.poliaSimples = { regulavel: inv.polia_simples.alturaRegulavel, placas: txt(inv.polia_simples.placas) };
  if (inv.banco_regulavel) f.bancoRegulavel = { declina: inv.banco_regulavel.declina };
  if (inv.elasticos) f.elasticos = { intensidades: txt(inv.elasticos.intensidades) };
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
        if (f.poliaSimples.regulavel === undefined) erros['poliaSimples.regulavel'] = 'Diga se a altura da polia é regulável.';
        const placas = opcional('poliaSimples.placas', f.poliaSimples.placas, true);
        inv[id] = { alturaRegulavel: f.poliaSimples.regulavel, ...(placas !== undefined ? { placas } : {}) };
        break;
      }
      case 'banco_regulavel':
        if (f.bancoRegulavel.declina === undefined) erros['bancoRegulavel.declina'] = 'Diga se o banco também declina.';
        inv[id] = { declina: f.bancoRegulavel.declina };
        break;
      case 'elasticos':
        inv[id] = { intensidades: positivo('elasticos.intensidades', f.elasticos.intensidades, true) };
        break;
      default:
        inv[id] = {};
    }
  }
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
    if (!confirmados.includes(s.itemId)) continue;
    if (!n.marcados.includes(s.itemId)) n.marcados.push(s.itemId);
    const a = s.atributos ?? {};
    if (s.itemId === 'halteres_fixos') {
      if (vazio(n.halteres.min)) n.halteres.min = num(a.minKg);
      if (vazio(n.halteres.max)) n.halteres.max = num(a.maxKg);
      if (vazio(n.halteres.passo)) n.halteres.passo = num(a.passoKg);
    }
    if (s.itemId === 'polia_simples' && n.poliaSimples.regulavel === undefined && typeof a.alturaRegulavel === 'boolean') n.poliaSimples.regulavel = a.alturaRegulavel;
    if (s.itemId === 'banco_regulavel' && n.bancoRegulavel.declina === undefined && typeof a.declina === 'boolean') n.bancoRegulavel.declina = a.declina;
    if (s.itemId === 'elasticos' && vazio(n.elasticos.intensidades)) n.elasticos.intensidades = num(a.intensidades);
  }
  n.marcados = ITEM_IDS.filter((id) => n.marcados.includes(id));
  return n;
}
