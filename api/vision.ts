import Anthropic from '@anthropic-ai/sdk';
import { Limite, processarPedido, type Pedido } from './_lib/pedido';
import { reconhecer } from './_lib/modelo';

// Única função no servidor (CLAUDE.md): recebe fotos já reduzidas e sem metadados, valida o convite e o limite,
// chama o Claude e devolve sugestões validadas. Não guarda nada; os logs não levam imagem.
// Variáveis de ambiente (Vercel): ANTHROPIC_API_KEY (obrigatória), CONVITES (lista separada por vírgula),
// VISION_MODEL (opcional).

const limite = new Limite();
let cliente: Anthropic | null = null;

export async function POST(req: Request): Promise<Response> {
  let corpo: Pedido;
  try {
    corpo = (await req.json()) as Pedido;
  } catch {
    return Response.json({ codigo: 'pedido', erro: 'Pedido inválido.' }, { status: 400 });
  }
  const chave = process.env.ANTHROPIC_API_KEY;
  const r = await processarPedido(
    corpo,
    {
      ip: (req.headers.get('x-forwarded-for') ?? '').split(',')[0]!.trim() || 'desconhecido',
      hoje: new Date().toISOString().slice(0, 10),
      convites: (process.env.CONVITES ?? '').split(',').map((c) => c.trim().toUpperCase()).filter(Boolean),
      chaveConfigurada: !!chave,
    },
    limite,
    async (fotos) => {
      cliente ??= new Anthropic({ apiKey: chave });
      const { json, uso } = await reconhecer(cliente, fotos, process.env.VISION_MODEL || undefined);
      console.log(JSON.stringify({ evento: 'visao', fotos: fotos.length, ...uso })); // só números, nunca a imagem
      return json;
    },
  );
  return Response.json(r.corpo, { status: r.status, headers: { 'cache-control': 'no-store' } });
}
