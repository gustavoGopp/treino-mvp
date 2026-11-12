import { Limite, type Contador, type LimiteDoPedido } from './pedido.js';

// Limite diário compartilhado entre as instâncias da função (R5c, B1): Redis no Upstash, pela API REST (sem dependência
// nova). Um comando por conferência (um script que confere todas as chaves e só então soma), com validade de 2 dias;
// cada pedido faz duas: a dos convites errados do IP e a das fotos.
// Sem as variáveis, ou se o Upstash não responder, vale o contador em memória de cada instância (como antes).
// Variáveis (a integração do Upstash no Marketplace da Vercel cria as KV_*): KV_REST_API_URL e KV_REST_API_TOKEN,
// ou UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN.

/** As chaves levam a data do dia; 2 dias de validade bastam e limpam o banco sozinhas. */
export const VALIDADE_SEG = 2 * 24 * 60 * 60;

/**
 * KEYS = as chaves; ARGV = n, os máximos na ordem das chaves e a validade. Devolve 1 se gastou, 0 se não coube.
 * Com n negativo (devolução da cota), a conferência sempre passa e o INCRBY subtrai.
 */
export const SCRIPT = `local n = tonumber(ARGV[1])
for i, k in ipairs(KEYS) do
  if (tonumber(redis.call('GET', k) or '0') + n) > tonumber(ARGV[i + 1]) then return 0 end
end
for i, k in ipairs(KEYS) do
  redis.call('INCRBY', k, n)
  redis.call('EXPIRE', k, ARGV[#KEYS + 2])
end
return 1`;

type Buscar = (url: string, init: { method: string; headers: Record<string, string>; body: string }) => Promise<{ ok: boolean; json(): Promise<unknown> }>;

export class LimiteCompartilhado implements Contador {
  constructor(
    private url: string,
    private token: string,
    private reserva: Contador = new Limite(),
    private buscar: Buscar = fetch,
  ) {}

  async usarTodos(limites: LimiteDoPedido[], n: number): Promise<boolean> {
    const comando = ['EVAL', SCRIPT, limites.length, ...limites.map((l) => `treino:${l.chave}`), n, ...limites.map((l) => l.max), VALIDADE_SEG];
    try {
      const r = await this.buscar(this.url, {
        method: 'POST',
        headers: { authorization: `Bearer ${this.token}`, 'content-type': 'application/json' },
        body: JSON.stringify(comando),
      });
      const corpo = (await r.json()) as { result?: unknown };
      if (!r.ok || (corpo.result !== 0 && corpo.result !== 1)) throw new Error('resposta inesperada');
      return corpo.result === 1;
    } catch {
      console.log(JSON.stringify({ evento: 'limite', reserva: true })); // sem chave nem IP no log
      return this.reserva.usarTodos(limites, n);
    }
  }
}

/**
 * Escolhe o contador pelas variáveis de ambiente. Sem o Upstash, o limite vale por instância da função, e isso fica
 * no log uma vez por instância (sem chave nem IP), para quem opera saber que o limite diário está mais frouxo.
 */
export function criarLimite(env: Record<string, string | undefined>, registrar: (linha: string) => void = console.log): Contador {
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
  const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) return new LimiteCompartilhado(url.replace(/\/+$/, ''), token);
  registrar(JSON.stringify({ evento: 'limite', compartilhado: false }));
  return new Limite();
}
