import Anthropic from '@anthropic-ai/sdk';
import { ESQUEMA_RESPOSTA, instrucoes } from '../../src/domain/visao/index.js';

// Chamada ao Claude com saída estruturada (JSON Schema gerado da taxonomia).
// Modelo configurável em VISION_MODEL; o padrão é o Opus atual. A escolha final é do Gustavo,
// depois do eval com as fotos reais (scripts/eval-vision.ts): o mais barato que atingir recall ≥ 85% e precisão ≥ 90%.
export const MODELO_PADRAO = 'claude-opus-5-5';

/**
 * Tempo máximo da chamada ao modelo. O padrão do SDK é de 10 minutos com 2 novas tentativas; a função da Vercel tem
 * 60 s (vercel.json), e a pessoa está esperando com o celular na mão. Sem nova tentativa automática: a cota volta
 * quando a chamada falha, e a pessoa tenta de novo ou usa a lista.
 */
export const TEMPO_MAX_MODELO_MS = 50_000;

export type Uso = { modelo: string; input: number; output: number };

export async function reconhecer(client: Anthropic, fotosBase64: string[], modelo = MODELO_PADRAO): Promise<{ json: unknown; uso: Uso }> {
  const resposta = await client.beta.messages.create({
    model: modelo,
    // O raciocínio do modelo (sempre ligado no Opus 5.5) conta neste teto: com 4000, uma foto cheia podia parar em
    // "max_tokens" e virar erro 502 com a cota já gasta. É só o teto; o gasto continua sendo o que o modelo usa.
    max_tokens: 16000,
    // Se o modelo recusar, a API refaz o pedido em outro modelo na mesma chamada.
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: ESQUEMA_RESPOSTA } },
    messages: [
      {
        role: 'user',
        content: [
          ...fotosBase64.map((data) => ({ type: 'image' as const, source: { type: 'base64' as const, media_type: 'image/jpeg' as const, data } })),
          { type: 'text' as const, text: instrucoes() },
        ],
      },
    ],
  }, { timeout: TEMPO_MAX_MODELO_MS, maxRetries: 0 });
  if (resposta.stop_reason === 'refusal' || resposta.stop_reason === 'max_tokens') throw new Error(`parou: ${resposta.stop_reason}`);
  const texto = resposta.content.find((b) => b.type === 'text');
  if (!texto || texto.type !== 'text') throw new Error('sem texto');
  return { json: JSON.parse(texto.text), uso: { modelo: resposta.model, input: resposta.usage.input_tokens, output: resposta.usage.output_tokens } };
}
