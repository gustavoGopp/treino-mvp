import { z } from 'zod';
import { ALTURAS_POLIA, ESTACOES_MULTIFUNCIONAL, inventarioSchema, ITENS, ITEM_IDS, type Inventario, type ItemId } from '../taxonomia/equipamentos.js';

// Visão (M4): o modelo só sugere; a pessoa confirma. Funções puras, sem rede.
// Plano: docs/PLANO-MVP.md, seção g. Decisões: docs/pesquisa/11-decisoes-m4.md.

/**
 * Limites do pedido da foto, os mesmos no aparelho e no servidor. A Vercel recusa corpo acima de 4,5 MB antes de a
 * função rodar (vercel.com/docs/functions/limitations), então a soma das fotos tem teto próprio, com folga: a foto
 * reduzida no aparelho (1568 px, JPEG 0,8) costuma ficar bem abaixo de 1 MB em base64.
 */
export const LIMITES_FOTO = { maxFotos: 5, maxBase64PorFoto: 2_000_000, maxBase64Total: 4_000_000 };

/** Quanto o aparelho espera pela análise antes de desistir: um pouco mais que a duração máxima da função (60 s). */
export const ESPERA_MAX_FOTO_MS = 70_000;

/**
 * As mensagens de erro da foto, uma por tipo (auditoria de 12/11/2026: qualquer erro de rede virava "Sem conexão", e
 * a foto que o navegador não abre mostrava o texto dele, em inglês). Todas levam à lista, que faz o mesmo.
 */
export const ERRO_DA_FOTO = {
  abrir: 'Não foi possível abrir uma das fotos neste navegador (alguns formatos, como o HEIC, não abrem). Tire a foto de novo ou escolha outra, ou use a lista abaixo.',
  tamanho: 'As fotos ficaram grandes demais para enviar juntas. Envie menos fotos por vez, ou use a lista abaixo.',
  semConexao: 'Sem conexão. Use a lista abaixo.',
  servidor: 'Não foi possível falar com o servidor agora. Tente de novo em instantes, ou use a lista abaixo.',
  demora: 'A análise demorou demais e foi interrompida. Tente com menos fotos, ou use a lista abaixo.',
  analise: 'Não foi possível analisar as fotos agora. Use a lista.',
} as const;

/** A mensagem de uma resposta de erro do servidor: a que ele mandou, se mandou; senão, pelo código da resposta. */
export function erroDaResposta(status: number, doServidor?: unknown): string {
  if (typeof doServidor === 'string' && doServidor.trim()) return doServidor;
  return status === 413 ? ERRO_DA_FOTO.tamanho : ERRO_DA_FOTO.analise;
}

/** A mensagem de um pedido que não teve resposta: o tempo acabou, o aparelho está sem rede, ou o servidor não respondeu. */
export function erroSemResposta(nomeDoErro: string | undefined, conectado: boolean): string {
  if (nomeDoErro === 'TimeoutError' || nomeDoErro === 'AbortError') return ERRO_DA_FOTO.demora;
  return conectado ? ERRO_DA_FOTO.servidor : ERRO_DA_FOTO.semConexao;
}

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
    altura: { type: 'string', enum: [...ALTURAS_POLIA] },
    declina: { type: 'boolean' },
    intensidades: { type: 'integer' },
    // Multifuncional: as estações que aparecem na foto (pesquisa-v2/08, seção 4).
    ...Object.fromEntries(ESTACOES_MULTIFUNCIONAL.map((e) => [e, { type: 'boolean' }])),
    // Kettlebell: os números pintados.
    pesosKg: { type: 'array', items: { type: 'number' } },
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

/**
 * Dicas para não confundir aparelhos parecidos (visao.desambiguacao; pesquisa-v2/08, seção 4).
 * O par confundível ausente da foto conta como falso positivo grave no eval (scripts/eval-vision.ts).
 */
export const DICAS_DESAMBIGUACAO: { par: [ItemId, ItemId, ...ItemId[]]; dica: string }[] = [
  { par: ['hack', 'leg_press'], dica: 'hack: a pessoa fica em pé ou quase, com as costas num encosto inclinado e almofadas sobre os ombros; leg press: sentada ou deitada, empurra uma plataforma com os pés.' },
  { par: ['voador', 'estacao_polia_dupla'], dica: 'voador: assento com encosto e dois braços presos à máquina, sem cabos soltos; polia dupla: duas torres altas, com cabos e pegadores soltos.' },
  { par: ['multifuncional', 'estacao_polia_dupla', 'polia_simples'], dica: 'multifuncional: uma estrutura com assento fixo, puxador alto com almofada de coxa e às vezes extensora ou voador; estação de polia: torre(s) sem assento.' },
  { par: ['smith', 'rack_de_agachamento'], dica: 'smith: barra presa em trilhos verticais; rack: barra solta, apoiada em ganchos.' },
  { par: ['cadeira_extensora', 'cadeira_flexora', 'cadeira_abdutora_adutora'], dica: 'extensora: almofada na frente da canela, embaixo; cadeira flexora: almofada atrás do calcanhar e outra sobre a coxa; abdutora e adutora: almofadas dos lados dos joelhos.' },
  { par: ['mesa_flexora', 'banco_romano'], dica: 'mesa flexora: a pessoa deita de bruços, com almofada atrás dos tornozelos; banco romano: apoio no quadril e trava dos pés, inclinado a 45° ou reto.' },
  { par: ['panturrilha_em_pe_maquina', 'panturrilha_sentada_maquina', 'hack'], dica: 'panturrilha em pé: almofadas nos ombros e um degrau pequeno para a ponta dos pés; panturrilha sentada: almofada sobre os joelhos, pessoa sentada.' },
  { par: ['supino_maquina', 'desenvolvimento_maquina'], dica: 'supino na máquina: pegadores à frente do peito; desenvolvimento na máquina: pegadores acima dos ombros (algumas máquinas fazem os dois).' },
  { par: ['remada_articulada', 'supino_maquina'], dica: 'remada articulada: almofada no peito e pegadores à frente, para puxar; supino na máquina: encosto atrás, para empurrar.' },
  { par: ['estacao_puxada', 'estacao_remada'], dica: 'puxador alto: barra no alto e almofada de coxa; remada baixa: assento baixo, apoio para os pés e cabo baixo (muitas vezes na mesma torre).' },
  { par: ['banco_scott', 'banco_regulavel'], dica: 'banco Scott: almofada inclinada para os braços na frente do assento.' },
  { par: ['graviton', 'paralelas', 'barra_fixa'], dica: 'graviton: plataforma para os joelhos e torre de pesos; paralelas e barra fixa: barras sem torre.' },
  { par: ['barra_hexagonal', 'barra_longa'], dica: 'barra hexagonal: moldura em forma de hexágono, com a pessoa dentro e pegadores dos lados.' },
  { par: ['suspensao', 'elasticos'], dica: 'suspensão: fitas de nylon com fivelas e pegadores; elásticos: borracha colorida.' },
  // Catálogo completo (pesquisa-v2/11, B.2.3): a caneleira confunde com a tornozeleira da polia, e a mini-band com o elástico longo.
  { par: ['caneleiras', 'acessorio_polia_tornozeleira'], dica: 'caneleira de peso: almofada grossa e pesada que se prende no tornozelo com velcro, com o kg escrito; tornozeleira da polia: tira fina com uma argola de metal para prender o cabo.' },
  { par: ['mini_band', 'elasticos'], dica: 'mini-band: laço curto e largo de borracha ou tecido, do tamanho de duas mãos abertas, sem pegadores; elásticos: faixas ou tubos longos, muitas vezes com pegadores nas pontas.' },
];

/** Texto do pedido ao modelo (o esquema garante o formato; o texto explica a tarefa). */
export function instrucoes(): string {
  const lista = ITEM_IDS.map((id) => `- ${id}: ${ITENS[id].nome}`).join('\n');
  return [
    'Você recebe até 5 fotos de uma academia ou de um espaço de treino. Liste os equipamentos que aparecem, usando só os ids desta lista:',
    lista,
    'Regras:',
    '- Só inclua o que dá para ver. Na dúvida, use confiança "media" ou "baixa"; nunca invente.',
    '- "alta": o item aparece com clareza. "media": provável, mas parcial ou pequeno. "baixa": pode ser, mas é incerto.',
    '- Atributos só quando visíveis: halteres fixos (minKg, maxKg, passoKg pelos números nos halteres), polia simples (altura: "alta", "baixa" ou "regulavel"), banco regulável (declina), elásticos (intensidades = cores diferentes), multifuncional (puxador, remadaBaixa, extensora, flexora, voador, supino: true para cada estação que aparece), kettlebell (pesosKg pelos números pintados), caneleiras (pesosKg pelo kg escrito em cada uma), mini-band (intensidades = cores diferentes).',
    '- Esteira, bicicleta e elíptico: liste só a esteira; eles não entram no treino.',
    '- Em "evidencia", diga em poucas palavras onde o item aparece (ex.: "foto 2, à esquerda").',
    'Para não confundir aparelhos parecidos:',
    ...DICAS_DESAMBIGUACAO.map((d) => `- ${d.dica}`),
  ].join('\n');
}
