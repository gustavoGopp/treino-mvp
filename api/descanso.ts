// A web-push 4 é um módulo ES sem exportação padrão: `import webpush from` passa nos tipos e quebra ao iniciar na Vercel
// (22/11/2026). O teste tests/unit/api-descanso.test.ts carrega este arquivo de verdade.
import { sendNotification } from 'web-push';
import { processarAviso } from './_lib/aviso.js';
import { criarLimite } from './_lib/limite.js';

// O aviso de fim do descanso com a tela bloqueada (lote M4, passo 2). As regras estão em _lib/aviso.ts.
// Variáveis de ambiente (Vercel): VITE_AVISO_CHAVE (a chave pública dos avisos; a mesma que o app usa no build),
// AVISO_CHAVE_PRIVADA (a chave privada do par) e QSTASH_TOKEN (a fila gratuita do Upstash). Opcionais: QSTASH_URL
// (a região da fila) e AVISO_CONTATO (o contato que os serviços de aviso exigem; por padrão, o endereço do app).
// Sem as três primeiras, a função responde "desligado" e o app nem oferece o aviso.

const limite = criarLimite(process.env);

export async function POST(req: Request): Promise<Response> {
  let corpo: unknown;
  try {
    corpo = await req.json();
  } catch {
    return Response.json({ codigo: 'pedido' }, { status: 400 });
  }
  const publica = process.env.VITE_AVISO_CHAVE ?? '';
  const privada = process.env.AVISO_CHAVE_PRIVADA ?? '';
  const token = process.env.QSTASH_TOKEN ?? '';
  const fila = (process.env.QSTASH_URL || 'https://qstash.upstash.io').replace(/\/+$/, '');
  const origem = `https://${req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? ''}`;
  const autorizacao = { authorization: `Bearer ${token}` };

  const r = await processarAviso(
    corpo,
    {
      ip: (req.headers.get('x-forwarded-for') ?? '').split(',')[0]!.trim() || 'desconhecido',
      hoje: new Date().toISOString().slice(0, 10),
      agora: Date.now(),
      configurado: !!(publica && privada && token),
      segredo: privada,
    },
    limite,
    {
      async publicar(texto, atrasoSeg) {
        const resp = await fetch(`${fila}/v2/publish/${origem}/api/descanso`, {
          method: 'POST',
          // sem novas tentativas: aviso de descanso fora de hora não serve
          headers: { ...autorizacao, 'content-type': 'application/json', 'upstash-delay': `${atrasoSeg}s`, 'upstash-retries': '0' },
          body: texto,
        });
        const j = (await resp.json()) as { messageId?: unknown };
        if (!resp.ok || typeof j.messageId !== 'string') throw new Error('fila');
        return j.messageId;
      },
      async apagar(mensagem) {
        const resp = await fetch(`${fila}/v2/messages/${encodeURIComponent(mensagem)}`, { method: 'DELETE', headers: autorizacao });
        if (!resp.ok && resp.status !== 404) throw new Error('fila');
      },
      async enviar(assinatura, texto) {
        await sendNotification(assinatura, texto, {
          TTL: 60, // o serviço do navegador guarda por 1 min; depois disso o aviso não faz mais sentido
          urgency: 'high',
          vapidDetails: { subject: process.env.AVISO_CONTATO || origem, publicKey: publica, privateKey: privada },
        });
      },
    },
  );
  if (r.corpo.codigo) console.log(JSON.stringify({ evento: 'aviso', codigo: r.corpo.codigo })); // sem endereço nem IP
  return Response.json(r.corpo, { status: r.status, headers: { 'cache-control': 'no-store' } });
}
