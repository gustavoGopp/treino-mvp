import { estaInstalado } from '../app/avisos';
import { apagarLocal, gravarLocal, lerLocal, LOCAL } from '../app/local';

// O aviso de fim do descanso com a tela bloqueada ou em outro app (lote M4, passo 2). Um site não consegue marcar um
// aviso para daqui a 90 s sozinho; quem manda é o servidor do app (api/descanso.ts). Para sair o mínimo do aparelho:
// - o pedido só é feito quando a pessoa SAI do app no meio de um descanso (com o app aberto, o som da tela basta);
// - vão o endereço de aviso deste aparelho, o tempo que falta e um número sorteado. Nada do treino nem da saúde;
// - ao voltar ao app, o pedido é desfeito.
// Sem a chave pública no build (VITE_AVISO_CHAVE), o recurso inteiro fica desligado e nada aparece.

export const AVISO_CHAVE: string = (import.meta.env.VITE_AVISO_CHAVE as string | undefined) ?? '';
const MARCA = '/__descanso-atual'; // o mesmo nome em public/sw-descanso.js
/** Com menos que isso para o fim, não vale pedir: o aviso chegaria junto com a pessoa. */
const MINIMO_MS = 8000;

/**
 * - `desligado`: sem a chave no build, ou o navegador não tem avisos (nada aparece);
 * - `instalar`: iPhone pelo Safari, onde o aviso só existe com o app na tela de início (a tela diz isso, uma vez);
 * - `perguntar`: dá para ligar e a pessoa ainda não respondeu;
 * - `ligado`; `nao`: a pessoa recusou, aqui ou no pedido do navegador.
 */
export type EstadoDoAviso = 'desligado' | 'instalar' | 'perguntar' | 'ligado' | 'nao';

const ehIphone = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export function estadoDoAviso(): EstadoDoAviso {
  if (!AVISO_CHAVE) return 'desligado';
  const escolha = lerLocal(LOCAL.avisoDescanso);
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    if (!ehIphone() || estaInstalado()) return 'desligado';
    return escolha === 'nao' ? 'nao' : 'instalar';
  }
  if (Notification.permission === 'denied' || escolha === 'nao') return 'nao';
  return escolha === 'sim' && Notification.permission === 'granted' ? 'ligado' : 'perguntar';
}

/** Dá para ligar o aviso neste aparelho (Meus dados oferece, mesmo depois de um "Agora não"): o navegador tem avisos e não os negou. */
export function avisoDisponivel(): boolean {
  return !!AVISO_CHAVE && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && Notification.permission !== 'denied';
}

type Assinatura = { endpoint?: string; keys?: Record<string, string> };
let assinatura: Assinatura | null = null;

/** O service worker já registrado, ou nada (no servidor de desenvolvimento não há um, e `ready` esperaria para sempre). */
const registro = () => navigator.serviceWorker.getRegistration();

const bytes = (b64url: string) => Uint8Array.from(atob(b64url.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

/** Chamado dentro do toque em "Avisar": o navegador só mostra o pedido de permissão em resposta a um toque. */
export async function ligarAviso(): Promise<EstadoDoAviso> {
  try {
    if ((await Notification.requestPermission()) !== 'granted') {
      gravarLocal(LOCAL.avisoDescanso, 'nao');
      return 'nao';
    }
    const reg = await registro();
    if (!reg) return estadoDoAviso();
    const sub = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: bytes(AVISO_CHAVE) }));
    assinatura = sub.toJSON() as Assinatura;
    gravarLocal(LOCAL.avisoDescanso, 'sim');
    return 'ligado';
  } catch {
    // o navegador não conseguiu criar o endereço de aviso (sem rede, por exemplo): pergunta de novo no próximo descanso
    return estadoDoAviso();
  }
}

/** "Agora não" e "Entendi": a pergunta não volta no descanso. Em Meus dados, o aviso continua podendo ser ligado. */
export function recusarAviso(): void {
  gravarLocal(LOCAL.avisoDescanso, 'nao');
}

/** Meus dados, "Desligar": apaga o endereço de aviso deste aparelho. A pergunta volta no próximo descanso. */
export async function desligarAviso(): Promise<void> {
  apagarLocal(LOCAL.avisoDescanso);
  assinatura = null;
  try {
    await (await (await registro())?.pushManager.getSubscription())?.unsubscribe();
  } catch {
    /* sem endereço para apagar */
  }
}

/** No começo do descanso: deixa o endereço de aviso à mão, para o pedido sair na hora em que a pessoa deixa o app. */
export function prepararAviso(): void {
  if (assinatura || estadoDoAviso() !== 'ligado') return;
  void registro()
    .then((reg) => reg?.pushManager.getSubscription())
    .then((sub) => {
      assinatura = sub ? (sub.toJSON() as Assinatura) : null;
    })
    .catch(() => {});
}

const pedir = (corpo: object) =>
  fetch('/api/descanso', { method: 'POST', keepalive: true, headers: { 'content-type': 'application/json' }, body: JSON.stringify(corpo) });

async function marcarAtual(id: string | null): Promise<void> {
  try {
    const c = await caches.open('treino-descanso');
    if (id) await c.put(MARCA, new Response(JSON.stringify({ id })));
    else await c.delete(MARCA);
  } catch {
    /* sem a marca, o service worker não mostra o aviso: o som da tela continua valendo */
  }
}

/** O pedido em curso: resolve com o número dele na fila do servidor, ou null se não deu certo. */
let pendente: Promise<string | null> | null = null;

/** A pessoa saiu do app com o descanso correndo. */
export function marcarAviso(fim: number): void {
  const falta = fim - Date.now();
  if (pendente || !assinatura?.endpoint || falta < MINIMO_MS || estadoDoAviso() !== 'ligado') return;
  const id = crypto.randomUUID();
  const a = { endpoint: assinatura.endpoint, keys: assinatura.keys };
  pendente = Promise.all([pedir({ acao: 'marcar', assinatura: a, falta, id }), marcarAtual(id)])
    .then(async ([r]) => (r.ok ? (((await r.json()) as { mensagem?: string }).mensagem ?? null) : null))
    .catch(() => null);
}

/** A pessoa voltou ao app, ou o descanso parou: o pedido é desfeito e o aviso que já apareceu some. */
export function desmarcarAviso(): void {
  const p = pendente;
  pendente = null;
  if (!p) return;
  void p.then(async (mensagem) => {
    await marcarAtual(null);
    if (mensagem) await pedir({ acao: 'desmarcar', mensagem }).catch(() => {});
    try {
      for (const n of (await (await registro())?.getNotifications({ tag: 'descanso' })) ?? []) n.close();
    } catch {
      /* nada a fechar */
    }
  });
}
