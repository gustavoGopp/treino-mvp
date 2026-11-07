import { validarSugestoes, type Sugestao } from '../../src/domain/visao/index.js';

// Regras do pedido de visão (plano, seção g.3): convite, limite por aparelho e por IP, tamanho e tipo das fotos.
// Nada é salvo e nada da imagem vai para o log. A chamada ao modelo é injetada (testes sem rede).

export const MAX_FOTOS = 5;
/** Limite de fotos por aparelho por dia (plano: ~10). */
export const LIMITE_APARELHO = 10;
/** Limite por IP por dia: várias pessoas podem dividir o mesmo IP (academia, empresa). */
export const LIMITE_IP = 40;
/** ~1,5 MB por foto em base64; a foto reduzida no aparelho fica bem abaixo disso. */
export const MAX_BASE64 = 2_000_000;

export type Pedido = { convite?: unknown; aparelho?: unknown; fotos?: unknown };
export type Resposta = { status: number; corpo: { itens?: Sugestao[]; erro?: string; codigo?: string } };
export type Contexto = { ip: string; hoje: string; convites: string[]; chaveConfigurada: boolean };
export type ChamarModelo = (fotosBase64: string[]) => Promise<unknown>;

export type LimiteDoPedido = { chave: string; max: number };

/** Contador do limite diário: em memória (Limite) ou compartilhado entre instâncias (LimiteCompartilhado, limite.ts). */
export type Contador = {
  /** Gasta `n` em todas as chaves só se todas couberem: um pedido barrado não gasta a cota de nenhuma. */
  usarTodos(limites: LimiteDoPedido[], n: number): boolean | Promise<boolean>;
};

/**
 * Contador simples em memória, por instância da função. É o padrão sem o Upstash configurado e a reserva quando ele
 * não responde. Para família e amigos (R5c), o que segura o gasto é o teto mensal no console da Anthropic.
 */
export class Limite implements Contador {
  private usos = new Map<string, number>();
  usarTodos(limites: LimiteDoPedido[], n: number): boolean {
    if (limites.some(({ chave, max }) => (this.usos.get(chave) ?? 0) + n > max)) return false;
    for (const { chave } of limites) this.usos.set(chave, (this.usos.get(chave) ?? 0) + n);
    return true;
  }
  usar(chave: string, n: number, max: number): boolean {
    return this.usarTodos([{ chave, max }], n);
  }
}

const erro = (status: number, codigo: string, mensagem: string): Resposta => ({ status, corpo: { codigo, erro: mensagem } });
const ehJpegBase64 = (s: string) => s.startsWith('/9j/'); // FF D8 FF em base64

export async function processarPedido(p: Pedido, ctx: Contexto, limite: Contador, chamar: ChamarModelo): Promise<Resposta> {
  if (!ctx.chaveConfigurada) return erro(503, 'indisponivel', 'O reconhecimento por foto ainda não está configurado. Use a lista.');
  if (typeof p.convite !== 'string' || !ctx.convites.includes(p.convite.trim().toUpperCase()))
    return erro(403, 'convite', 'Código de convite inválido.');
  if (typeof p.aparelho !== 'string' || !/^[a-zA-Z0-9-]{8,64}$/.test(p.aparelho)) return erro(400, 'pedido', 'Pedido inválido.');
  if (!Array.isArray(p.fotos) || p.fotos.length === 0 || p.fotos.length > MAX_FOTOS)
    return erro(400, 'fotos', `Envie de 1 a ${MAX_FOTOS} fotos.`);
  const fotos = p.fotos as unknown[];
  if (!fotos.every((f): f is string => typeof f === 'string' && f.length <= MAX_BASE64 && ehJpegBase64(f)))
    return erro(400, 'fotos', 'Foto em formato ou tamanho não aceito.');
  // O aparelho e o IP são conferidos juntos: antes, um pedido barrado pelo aparelho já tinha gastado a cota do IP.
  const limites = [
    { chave: `ap:${p.aparelho}:${ctx.hoje}`, max: LIMITE_APARELHO },
    { chave: `ip:${ctx.ip}:${ctx.hoje}`, max: LIMITE_IP },
  ];
  if (!(await limite.usarTodos(limites, fotos.length)))
    return erro(429, 'limite', 'Limite de fotos de hoje atingido. Use a lista ou tente amanhã.');
  try {
    const bruto = await chamar(fotos as string[]);
    return { status: 200, corpo: { itens: validarSugestoes(bruto) } };
  } catch {
    return erro(502, 'modelo', 'Não foi possível analisar as fotos agora. Use a lista.');
  }
}
