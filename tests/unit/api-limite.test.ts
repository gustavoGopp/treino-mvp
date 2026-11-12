import { describe, expect, it } from 'vitest';
import { criarLimite, LimiteCompartilhado, SCRIPT, VALIDADE_SEG } from '../../api/_lib/limite';
import { Limite, LIMITE_APARELHO, processarPedido, type Contexto } from '../../api/_lib/pedido';

// R5c, B1: o limite diário compartilhado no Upstash. O Redis é simulado aqui com a mesma regra do script:
// confere todas as chaves e só então soma. O script em si foi rodado num redis-server local em 07/11 (devlog, R5c):
// 4 pedidos de 5 fotos com limite 10 → 1, 1, 0, 0; o IP ficou com 10 e a validade com 2 dias.
function upstashFalso() {
  const banco = new Map<string, number>();
  const comandos: unknown[][] = [];
  const buscar = async (_url: string, init: { headers: Record<string, string>; body: string }) => {
    const c = JSON.parse(init.body) as (string | number)[];
    comandos.push(c);
    expect(init.headers.authorization).toBe('Bearer token-teste');
    expect(c[0]).toBe('EVAL');
    expect(c[1]).toBe(SCRIPT);
    const nChaves = c[2] as number;
    const chaves = c.slice(3, 3 + nChaves) as string[];
    const [n, ...resto] = c.slice(3 + nChaves) as number[];
    const maximos = resto.slice(0, nChaves);
    expect(resto[nChaves]).toBe(VALIDADE_SEG);
    const cabe = chaves.every((k, i) => (banco.get(k) ?? 0) + n! <= maximos[i]!);
    if (cabe) for (const k of chaves) banco.set(k, (banco.get(k) ?? 0) + n!);
    return { ok: true, json: async () => ({ result: cabe ? 1 : 0 }) };
  };
  return { banco, comandos, buscar };
}

const ctx: Contexto = { ip: '1.2.3.4', hoje: '2026-11-07', convites: ['BETA1'], chaveConfigurada: true };
const ok = { convite: 'beta1', aparelho: 'aparelho-123', fotos: ['/9j/' + 'A'.repeat(100)] };
const modelo = async () => ({ itens: [] });

describe('limite compartilhado (Upstash)', () => {
  it('duas instâncias da função dividem o mesmo contador', async () => {
    const u = upstashFalso();
    const a = new LimiteCompartilhado('https://x.upstash.io', 'token-teste', new Limite(), u.buscar);
    const b = new LimiteCompartilhado('https://x.upstash.io', 'token-teste', new Limite(), u.buscar);
    for (let i = 0; i < LIMITE_APARELHO; i++) expect((await processarPedido(ok, ctx, i % 2 ? a : b, modelo)).status).toBe(200);
    expect((await processarPedido(ok, ctx, a, modelo)).corpo.codigo).toBe('limite');
    expect((await processarPedido(ok, ctx, b, modelo)).corpo.codigo).toBe('limite');
    expect(u.banco.get('treino:ap:aparelho-123:2026-11-07')).toBe(LIMITE_APARELHO);
    // O pedido barrado não somou no IP, que ficou só com os que passaram. São 2 comandos por pedido: a consulta dos
    // convites errados do IP (que não soma nada) e o gasto das fotos.
    expect(u.banco.get('treino:ip:1.2.3.4:2026-11-07')).toBe(LIMITE_APARELHO);
    expect(u.banco.get('treino:cv:1.2.3.4:2026-11-07') ?? 0).toBe(0);
    expect(u.comandos).toHaveLength(2 * (LIMITE_APARELHO + 2));
  });

  it('se o Upstash falha, vale o contador em memória e o pedido segue', async () => {
    const falha = async () => {
      throw new TypeError('sem rede');
    };
    const l = new LimiteCompartilhado('https://x.upstash.io', 't', new Limite(), falha);
    expect((await processarPedido(ok, ctx, l, modelo)).status).toBe(200);
    const estranho = new LimiteCompartilhado('https://x.upstash.io', 't', new Limite(), async () => ({ ok: true, json: async () => ({ error: 'ERR' }) }));
    for (let i = 0; i < LIMITE_APARELHO; i++) expect((await processarPedido(ok, ctx, estranho, modelo)).status).toBe(200);
    expect((await processarPedido(ok, ctx, estranho, modelo)).corpo.codigo).toBe('limite');
  });

  it('sem o Upstash configurado, o limite fica na memória de cada instância e isso vai para o log', () => {
    const log: string[] = [];
    expect(criarLimite({}, (l) => log.push(l))).toBeInstanceOf(Limite);
    expect(log).toEqual([JSON.stringify({ evento: 'limite', compartilhado: false })]);
    criarLimite({ KV_REST_API_URL: 'https://x.upstash.io/', KV_REST_API_TOKEN: 't' }, (l) => log.push(l));
    expect(log).toHaveLength(1);
  });

  it('a devolução da cota (modelo com falha) chega ao contador compartilhado', async () => {
    const u = upstashFalso();
    const l = new LimiteCompartilhado('https://x.upstash.io', 'token-teste', new Limite(), u.buscar);
    const falha = async () => {
      throw new Error('fora do ar');
    };
    expect((await processarPedido(ok, ctx, l, falha)).status).toBe(502);
    expect(u.banco.get('treino:ap:aparelho-123:2026-11-07')).toBe(0);
    expect(u.banco.get('treino:ip:1.2.3.4:2026-11-07')).toBe(0);
  });

  it('usa o Upstash só com a URL e o token', () => {
    expect(criarLimite({})).toBeInstanceOf(Limite);
    expect(criarLimite({ KV_REST_API_URL: 'https://x.upstash.io' })).toBeInstanceOf(Limite);
    expect(criarLimite({ KV_REST_API_URL: 'https://x.upstash.io/', KV_REST_API_TOKEN: 't' })).toBeInstanceOf(LimiteCompartilhado);
    expect(criarLimite({ UPSTASH_REDIS_REST_URL: 'https://y.upstash.io', UPSTASH_REDIS_REST_TOKEN: 't' })).toBeInstanceOf(LimiteCompartilhado);
  });
});
