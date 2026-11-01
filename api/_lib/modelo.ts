import Anthropic from '@anthropic-ai/sdk';
import { ESQUEMA_RESPOSTA, instrucoes } from '../../src/domain/visao/index.js';

// Chamada ao Claude com saída estruturada (JSON Schema gerado da taxonomia).
// Modelo configurável em VISION_MODEL; o padrão é o Opus atual. A escolha final é do Gustavo,
// depois do eval com as fotos reais (scripts/eval-vision.ts): o mais barato que atingir recall ≥ 85% e precisão ≥ 90%.
export const MODELO_PADRAO = 'claude-opus-5-5';

export type Uso = { modelo: string; input: number; output: number };

export async function reconhecer(client: Anthropic, fotosBase64: string[], modelo = MODELO_PADRAO): Promise<{ json: unknown; uso: Uso }> {
  const resposta = await client.beta.messages.create({
    model: modelo,
    max_tokens: 4000,
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
  });
  if (resposta.stop_reason === 'refusal' || resposta.stop_reason === 'max_tokens') throw new Error(`parou: ${resposta.stop_reason}`);
  const texto = resposta.content.find((b) => b.type === 'text');
  if (!texto || texto.type !== 'text') throw new Error('sem texto');
  return { json: JSON.parse(texto.text), uso: { modelo: resposta.model, input: resposta.usage.input_tokens, output: resposta.usage.output_tokens } };
}
