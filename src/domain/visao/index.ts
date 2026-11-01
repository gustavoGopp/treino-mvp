import { z } from 'zod';
import { inventarioSchema, ITENS, ITEM_IDS, type Inventario, type ItemId } from '../taxonomia/equipamentos.js';

// Visão (M4): o modelo só sugere; a pessoa confirma. Funções puras, sem rede.
// Plano: docs/PLANO-MVP.md, seção g. Decisões: docs/pesquisa/11-decisoes-m4.md.

export const CONFIANCAS = ['alta', 'media', 'baixa'] as const;
export type Confianca = (typeof CONFIANCAS)[number];

/** Atributos que a foto pode estimar (os mesmos do checklist; tudo opcional). */
const atributos = {
  type: 'object',
  additionalProperties: false,
  properties: {
    minKg: { type: 'number' },
    maxKg: { type: 'number' },
    passoKg: { type: 'number' },
    alturaRegulavel: { type: 'boolean' },
    declina: { type: 'boolean' },
    intensidades: { type: 'integer' },
  },
} as const;

/** JSON Schema da resposta do modelo, gerado da taxonomia: ids fora da lista não são possíveis. */
export const ESQUEMA_RESPOSTA = {
  type: 'object',
  additionalProperties: false,
  required: ['itens'],
  properties: {
    itens: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['itemId', 'confianca', 'evidencia'],
        properties: {
          itemId: { type: 'string', enum: [...ITEM_IDS] },
          confianca: { type: 'string', enum: [...CONFIANCAS] },
          evidencia: { type: 'string', description: 'Onde aparece na foto, em poucas palavras, em português.' },
          atributos,
        },
      },
    },
  },
} as const;

export type Sugestao = { itemId: ItemId; confianca: Confianca; evidencia: string; atributos?: Record<string, unknown> };

const itemBruto = z.object({
  itemId: z.string(),
  confianca: z.enum(CONFIANCAS),
  evidencia: z.string().max(300).default(''),
  atributos: z.record(z.unknown()).optional(),
});

const ORDEM: Record<Confianca, number> = { alta: 0, media: 1, baixa: 2 };

/**
 * Valida a resposta do modelo: descarta ids fora da taxonomia, junta repetidos (fica a maior confiança)
 * e só mantém atributos que passam no esquema do inventário. Nunca lança: resposta ruim vira lista vazia.
 */
export function validarSugestoes(bruto: unknown): Sugestao[] {
  const lista = z.object({ itens: z.array(z.unknown()) }).safeParse(bruto);
  if (!lista.success) return [];
  const porId = new Map<ItemId, Sugestao>();
  for (const x of lista.data.itens) {
    const r = itemBruto.safeParse(x);
    if (!r.success || !(r.data.itemId in ITENS)) continue;
    const itemId = r.data.itemId as ItemId;
    const s: Sugestao = { itemId, confianca: r.data.confianca, evidencia: r.data.evidencia.trim() };
    if (r.data.atributos && Object.keys(r.data.atributos).length) {
      const ok = inventarioSchema.safeParse({ [itemId]: r.data.atributos });
      if (ok.success) s.atributos = (ok.data as Record<string, Record<string, unknown>>)[itemId];
    }
    const antes = porId.get(itemId);
    if (!antes || ORDEM[s.confianca] < ORDEM[antes.confianca]) porId.set(itemId, s);
  }
  return ITEM_IDS.filter((id) => porId.has(id)).map((id) => porId.get(id)!);
}

/** Como cada sugestão aparece para a pessoa (plano, seção g.6): alta já marcada, média pergunta, baixa desmarcada. */
export const marcacaoInicial = (c: Confianca): 'marcado' | 'perguntar' | 'desmarcado' =>
  c === 'alta' ? 'marcado' : c === 'media' ? 'perguntar' : 'desmarcado';

/** Junta ao inventário só os itens confirmados (atributos da foto só onde o inventário ainda não tem). */
export function aplicarConfirmados(inv: Inventario, sugestoes: Sugestao[], confirmados: ItemId[]): Inventario {
  const novo: Record<string, unknown> = { ...inv };
  for (const s of sugestoes) {
    if (!confirmados.includes(s.itemId) || s.itemId in novo) continue;
    novo[s.itemId] = s.atributos ?? {};
  }
  return novo as Inventario;
}

/** Texto do pedido ao modelo (o esquema garante o formato; o texto explica a tarefa). */
export function instrucoes(): string {
  const lista = ITEM_IDS.map((id) => `- ${id}: ${ITENS[id].nome}`).join('\n');
  return [
    'Você recebe até 5 fotos de uma academia ou de um espaço de treino. Liste os equipamentos que aparecem, usando só os ids desta lista:',
    lista,
    'Regras:',
    '- Só inclua o que dá para ver. Na dúvida, use confiança "media" ou "baixa"; nunca invente.',
    '- "alta": o item aparece com clareza. "media": provável, mas parcial ou pequeno. "baixa": pode ser, mas é incerto.',
    '- Atributos só quando visíveis: halteres fixos (minKg, maxKg, passoKg pelos números nos halteres), polia simples (alturaRegulavel), banco regulável (declina), elásticos (intensidades = cores diferentes).',
    '- Em "evidencia", diga em poucas palavras onde o item aparece (ex.: "foto 2, à esquerda").',
  ].join('\n');
}
