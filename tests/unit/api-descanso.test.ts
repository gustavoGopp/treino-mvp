import { afterEach, describe, expect, it, vi } from 'vitest';

// A porta de entrada da função do aviso (api/descanso.ts), carregada de verdade, com as bibliotecas dela. Em 22/11/2026
// a função quebrava ao iniciar na Vercel (a importação da web-push), e os testes das regras (api-aviso.test.ts), que
// não carregam este arquivo, passavam.
const pedir = async (corpo: string) => {
  const { POST } = await import('../../api/descanso');
  return POST(new Request('https://app.exemplo/api/descanso', { method: 'POST', headers: { host: 'app.exemplo', 'content-type': 'application/json' }, body: corpo }));
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('api/descanso', () => {
  it('carrega e, sem as chaves, responde "desligado"', async () => {
    vi.stubEnv('VITE_AVISO_CHAVE', '');
    const r = await pedir(JSON.stringify({ acao: 'marcar' }));
    expect(r.status).toBe(503);
    expect(await r.json()).toEqual({ codigo: 'desligado' });
  });

  it('corpo que não é JSON é recusado', async () => {
    expect((await pedir('não é json')).status).toBe(400);
  });

  it('com as chaves, marca na fila com o atraso, sem novas tentativas e com o endereço da própria função', async () => {
    const { generateVAPIDKeys } = await import('web-push');
    const par = generateVAPIDKeys();
    vi.stubEnv('VITE_AVISO_CHAVE', par.publicKey);
    vi.stubEnv('AVISO_CHAVE_PRIVADA', par.privateKey);
    vi.stubEnv('QSTASH_TOKEN', 'token-de-teste');
    vi.stubEnv('QSTASH_URL', '');
    const chamadas: { url: string; init: RequestInit }[] = [];
    vi.stubGlobal('fetch', async (url: string, init: RequestInit) => {
      chamadas.push({ url, init });
      return Response.json({ messageId: 'msg_0001' });
    });
    const assinatura = { endpoint: 'https://fcm.googleapis.com/fcm/send/abc', keys: { p256dh: 'B'.repeat(87), auth: 'a'.repeat(22) } };
    const r = await pedir(JSON.stringify({ acao: 'marcar', assinatura, falta: 90_000, id: 'descanso-0001' }));
    expect(await r.json()).toEqual({ mensagem: 'msg_0001' });
    expect(chamadas).toHaveLength(1);
    expect(chamadas[0]!.url).toBe('https://qstash.upstash.io/v2/publish/https://app.exemplo/api/descanso');
    const h = chamadas[0]!.init.headers as Record<string, string>;
    expect(h.authorization).toBe('Bearer token-de-teste');
    expect(h['upstash-delay']).toBe('90s');
    expect(h['upstash-retries']).toBe('0');
    expect(String(chamadas[0]!.init.body)).not.toContain('fcm.googleapis.com');
  });
});
