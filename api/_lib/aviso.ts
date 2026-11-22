import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import type { Contador } from './pedido.js';

// Lote M4, passo 2 (22/11/2026): o aviso de fim do descanso com a tela bloqueada. Um site não consegue marcar um aviso
// para daqui a 90 s sozinho (docs/revisoes/analise-critica/mercado.md); quem manda é um servidor. O caminho:
//   1. "marcar": o aparelho manda o endereço de aviso dele e a hora do fim. Esta função embaralha os dois (AES-256-GCM)
//      e pede à fila (QStash, do Upstash, plano gratuito) que chame de volta nessa hora.
//   2. "avisar": a fila chama de volta; a função desembaralha e manda o aviso ao serviço do navegador (Web Push).
//   3. "desmarcar": a pessoa voltou ao app antes do fim; o pedido sai da fila.
// Nada é guardado aqui e nada de treino ou de saúde passa por aqui: só o endereço de aviso, a hora e um número sorteado
// no aparelho. A fila guarda o texto embaralhado até a hora do aviso; os logs não levam o endereço.
// As chamadas de rede são injetadas (testes sem rede), como em pedido.ts.

/** O aviso sai entre 5 s e 15 min depois do pedido: um descanso não passa disso. */
export const ATRASO_MIN_SEG = 5;
export const ATRASO_MAX_SEG = 15 * 60;
/** Pedidos de aviso por IP por dia: um treino longo tem perto de 30 descansos, e várias pessoas dividem o IP da academia. [opinião] */
export const LIMITE_AVISOS_IP = 300;
/** Só os serviços de aviso dos navegadores: a função não serve para chamar um endereço qualquer. */
const SERVICOS = [/^fcm\.googleapis\.com$/, /\.push\.apple\.com$/, /^updates\.push\.services\.mozilla\.com$/, /\.notify\.windows\.com$/];

export type Assinatura = { endpoint: string; keys: { p256dh: string; auth: string } };
export type Recado = { assinatura: Assinatura; id: string; fim: number };
export type Resposta = { status: number; corpo: { mensagem?: string; codigo?: string } };
export type Contexto = { ip: string; hoje: string; agora: number; configurado: boolean; segredo: string };
export type Rede = {
  /** Põe na fila; devolve o número do pedido na fila. */
  publicar(corpo: string, atrasoSeg: number): Promise<string>;
  /** Tira da fila; pedido que já saiu ou não existe não é erro. */
  apagar(mensagem: string): Promise<void>;
  /** Manda o aviso ao serviço do navegador. */
  enviar(assinatura: Assinatura, texto: string): Promise<void>;
};

const chave = (segredo: string) => createHash('sha256').update(`treino-mvp:aviso:${segredo}`).digest();

export function embaralhar(r: Recado, segredo: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', chave(segredo), iv);
  const dados = Buffer.concat([c.update(JSON.stringify(r), 'utf8'), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), dados]).toString('base64url');
}

/** Devolve null se o texto não foi embaralhado por esta função (a marca do AES-GCM não confere). */
export function desembaralhar(cifra: string, segredo: string): Recado | null {
  try {
    const b = Buffer.from(cifra, 'base64url');
    const d = createDecipheriv('aes-256-gcm', chave(segredo), b.subarray(0, 12));
    d.setAuthTag(b.subarray(12, 28));
    return JSON.parse(Buffer.concat([d.update(b.subarray(28)), d.final()]).toString('utf8')) as Recado;
  } catch {
    return null;
  }
}

const b64url = (s: unknown, min: number, max: number): s is string => typeof s === 'string' && s.length >= min && s.length <= max && /^[A-Za-z0-9_-]+=*$/.test(s);

function assinaturaValida(a: unknown): a is Assinatura {
  if (!a || typeof a !== 'object') return false;
  const { endpoint, keys } = a as { endpoint?: unknown; keys?: { p256dh?: unknown; auth?: unknown } };
  if (typeof endpoint !== 'string' || endpoint.length > 1024 || !keys) return false;
  let u: URL;
  try {
    u = new URL(endpoint);
  } catch {
    return false;
  }
  return u.protocol === 'https:' && SERVICOS.some((s) => s.test(u.hostname)) && b64url(keys.p256dh, 80, 100) && b64url(keys.auth, 16, 32);
}

const erro = (status: number, codigo: string): Resposta => ({ status, corpo: { codigo } });

export async function processarAviso(p: unknown, ctx: Contexto, limite: Contador, rede: Rede): Promise<Resposta> {
  if (!ctx.configurado) return erro(503, 'desligado');
  if (!p || typeof p !== 'object') return erro(400, 'pedido');
  const { acao, assinatura, fim, id, mensagem, cifra } = p as Record<string, unknown>;

  if (acao === 'marcar') {
    if (!assinaturaValida(assinatura) || typeof fim !== 'number' || !Number.isFinite(fim) || !b64url(id, 8, 64)) return erro(400, 'pedido');
    const atraso = Math.round((fim - ctx.agora) / 1000);
    if (atraso < ATRASO_MIN_SEG || atraso > ATRASO_MAX_SEG) return erro(400, 'hora');
    if (!(await limite.usarTodos([{ chave: `av:${ctx.ip}:${ctx.hoje}`, max: LIMITE_AVISOS_IP }], 1))) return erro(429, 'limite');
    try {
      const recado: Recado = { assinatura: { endpoint: assinatura.endpoint, keys: { p256dh: assinatura.keys.p256dh, auth: assinatura.keys.auth } }, id, fim };
      return { status: 200, corpo: { mensagem: await rede.publicar(JSON.stringify({ acao: 'avisar', cifra: embaralhar(recado, ctx.segredo) }), atraso) } };
    } catch {
      return erro(502, 'fila');
    }
  }

  if (acao === 'desmarcar') {
    if (!b64url(mensagem, 8, 128)) return erro(400, 'pedido');
    try {
      await rede.apagar(mensagem);
    } catch {
      return erro(502, 'fila');
    }
    return { status: 200, corpo: {} };
  }

  if (acao === 'avisar') {
    // Quem chama é a fila, mas o que autoriza é o texto embaralhado: só esta função, com o segredo, consegue produzi-lo.
    const r = typeof cifra === 'string' && cifra.length < 4096 ? desembaralhar(cifra, ctx.segredo) : null;
    if (!r || !assinaturaValida(r.assinatura)) return erro(400, 'pedido');
    // Aviso muito atrasado não avisa nada: a fila demorou, e a pessoa já voltou a treinar.
    if (ctx.agora - r.fim > 60_000) return { status: 200, corpo: { codigo: 'atrasado' } };
    try {
      await rede.enviar(r.assinatura, JSON.stringify({ id: r.id, fim: r.fim }));
    } catch {
      // Endereço vencido ou serviço fora do ar: tentar de novo depois não adianta, o descanso já acabou.
      return { status: 200, corpo: { codigo: 'nao-entregue' } };
    }
    return { status: 200, corpo: {} };
  }
  return erro(400, 'pedido');
}
