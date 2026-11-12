import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LIMITE_APARELHO, LIMITE_CONVITE_ERRADO, LIMITE_IP, Limite, MAX_BASE64, MAX_BASE64_TOTAL, MAX_FOTOS, processarPedido, type Contexto } from '../../api/_lib/pedido';
import { reconhecer, TEMPO_MAX_MODELO_MS } from '../../api/_lib/modelo';
import { ERRO_DA_FOTO, erroDaResposta, erroSemResposta, ESPERA_MAX_FOTO_MS, LIMITES_FOTO } from '../../src/domain/visao';

const ctx: Contexto = { ip: '1.2.3.4', hoje: '2026-11-01', convites: ['BETA1'], chaveConfigurada: true };
const foto = '/9j/' + 'A'.repeat(100);
const ok = { convite: 'beta1', aparelho: 'aparelho-123', fotos: [foto] };
const modelo = async () => ({ itens: [{ itemId: 'banco_reto', confianca: 'alta', evidencia: 'foto 1' }, { itemId: 'disco', confianca: 'alta', evidencia: '' }] });

describe('api/vision: regras do pedido', () => {
  it('sem chave configurada, responde 503 e o app usa a lista', async () => {
    expect((await processarPedido(ok, { ...ctx, chaveConfigurada: false }, new Limite(), modelo)).status).toBe(503);
  });

  it('exige convite válido (sem diferenciar maiúsculas) e aparelho identificado', async () => {
    expect((await processarPedido({ ...ok, convite: 'errado' }, ctx, new Limite(), modelo)).corpo.codigo).toBe('convite');
    expect((await processarPedido({ ...ok, aparelho: 'x' }, ctx, new Limite(), modelo)).status).toBe(400);
  });

  it('um corpo que não é objeto (null) vira 400, não erro interno', async () => {
    expect((await processarPedido(null as never, ctx, new Limite(), modelo)).status).toBe(400);
  });

  it('depois de muitos convites errados no dia, o IP não tenta mais, nem com o código certo', async () => {
    const limite = new Limite();
    for (let i = 0; i < LIMITE_CONVITE_ERRADO; i++)
      expect((await processarPedido({ ...ok, convite: `chute-${i}` }, ctx, limite, modelo)).status).toBe(403);
    expect((await processarPedido({ ...ok, convite: 'chute' }, ctx, limite, modelo)).status).toBe(429);
    expect((await processarPedido(ok, ctx, limite, modelo)).status).toBe(429);
    // outro IP e o dia seguinte não são afetados; e poucos erros não barram quem acerta depois
    expect((await processarPedido(ok, { ...ctx, ip: '5.6.7.8' }, limite, modelo)).status).toBe(200);
    expect((await processarPedido(ok, { ...ctx, hoje: '2026-11-02' }, limite, modelo)).status).toBe(200);
    const outro = new Limite();
    await processarPedido({ ...ok, convite: 'errado' }, ctx, outro, modelo);
    expect((await processarPedido(ok, ctx, outro, modelo)).status).toBe(200);
  });

  it('aceita de 1 a 5 fotos JPEG em base64, dentro do tamanho', async () => {
    const r = (fotos: unknown) => processarPedido({ ...ok, fotos }, ctx, new Limite(), modelo);
    expect((await r([])).corpo.codigo).toBe('fotos');
    expect((await r(Array(MAX_FOTOS + 1).fill(foto))).corpo.codigo).toBe('fotos');
    expect((await r(['iVBORw0KGgo'])).corpo.codigo).toBe('fotos'); // PNG
    expect((await r(['/9j/' + 'A'.repeat(2_000_001)])).corpo.codigo).toBe('fotos');
    expect((await r(Array(MAX_FOTOS).fill(foto))).status).toBe(200);
  });

  it('devolve só itens da taxonomia', async () => {
    expect((await processarPedido(ok, ctx, new Limite(), modelo)).corpo).toEqual({ itens: [{ itemId: 'banco_reto', confianca: 'alta', evidencia: 'foto 1' }] });
  });

  it('limita as fotos por aparelho por dia', async () => {
    const limite = new Limite();
    for (let i = 0; i < LIMITE_APARELHO; i++) expect((await processarPedido(ok, ctx, limite, modelo)).status).toBe(200);
    expect((await processarPedido(ok, ctx, limite, modelo)).corpo.codigo).toBe('limite');
    expect((await processarPedido(ok, { ...ctx, hoje: '2026-11-02' }, limite, modelo)).status).toBe(200);
  });

  it('um pedido barrado pelo aparelho não gasta a cota do IP (R5c)', async () => {
    const limite = new Limite();
    for (let i = 0; i < LIMITE_APARELHO; i++) expect((await processarPedido(ok, ctx, limite, modelo)).status).toBe(200);
    // O mesmo aparelho insiste muitas vezes: todas barradas, e nenhuma conta no IP.
    for (let i = 0; i < LIMITE_IP; i++) expect((await processarPedido(ok, ctx, limite, modelo)).corpo.codigo).toBe('limite');
    // Outros aparelhos no mesmo IP (a academia) ainda têm LIMITE_IP − LIMITE_APARELHO fotos.
    const outros = (LIMITE_IP - LIMITE_APARELHO) / LIMITE_APARELHO;
    for (let a = 0; a < outros; a++)
      for (let i = 0; i < LIMITE_APARELHO; i++)
        expect((await processarPedido({ ...ok, aparelho: `aparelho-outro-${a}` }, ctx, limite, modelo)).status).toBe(200);
    expect((await processarPedido({ ...ok, aparelho: 'aparelho-mais-um' }, ctx, limite, modelo)).corpo.codigo).toBe('limite');
  });

  it('erro do modelo vira mensagem clara, sem detalhes internos', async () => {
    const r = await processarPedido(ok, ctx, new Limite(), async () => {
      throw new Error('segredo interno');
    });
    expect(r).toEqual({ status: 502, corpo: { codigo: 'modelo', erro: 'Não foi possível analisar as fotos agora. Use a lista.' } });
  });
});

// Auditoria de 12/11/2026: a cota, o tamanho do pedido e o tempo da chamada.
describe('api/vision: cota devolvida, tamanho do pedido e tempo máximo', () => {
  it('quando o modelo falha, a cota do aparelho e a do IP voltam: a pessoa pode tentar de novo', async () => {
    const limite = new Limite();
    const falha = async () => {
      throw new Error('modelo fora do ar');
    };
    const cinco = { ...ok, fotos: Array(MAX_FOTOS).fill(foto) };
    // sem a devolução, o 3º pedido de 5 fotos já estouraria o limite de 10 por aparelho
    for (let i = 0; i < 6; i++) expect((await processarPedido(cinco, ctx, limite, falha)).status).toBe(502);
    expect((await processarPedido(cinco, ctx, limite, modelo)).status).toBe(200);
    expect((await processarPedido(cinco, ctx, limite, modelo)).status).toBe(200);
    expect((await processarPedido(cinco, ctx, limite, modelo)).corpo.codigo).toBe('limite');
  });

  it('o pedido inteiro cabe no corpo que a Vercel aceita (4,5 MB): a soma das fotos tem teto próprio', async () => {
    expect(MAX_BASE64_TOTAL).toBeLessThan(4.5 * 1024 * 1024 - 100_000);
    expect(MAX_BASE64).toBeLessThanOrEqual(MAX_BASE64_TOTAL);
    // o cliente confere com os mesmos números antes de enviar
    expect(LIMITES_FOTO).toEqual({ maxFotos: MAX_FOTOS, maxBase64PorFoto: MAX_BASE64, maxBase64Total: MAX_BASE64_TOTAL });
    const grande = '/9j/' + 'A'.repeat(1_500_000);
    const limite = new Limite();
    const r = await processarPedido({ ...ok, fotos: [grande, grande, grande] }, ctx, limite, modelo);
    expect(r.status).toBe(413);
    expect(r.corpo.codigo).toBe('tamanho');
    // o pedido recusado pelo tamanho não gasta cota
    for (let i = 0; i < LIMITE_APARELHO; i++) expect((await processarPedido(ok, ctx, limite, modelo)).status).toBe(200);
    expect((await processarPedido({ ...ok, fotos: [grande, grande] }, { ...ctx, hoje: '2026-11-02' }, limite, modelo)).status).toBe(200);
  });

  it('a chamada ao modelo tem tempo máximo e não é refeita sozinha', async () => {
    let opcoes: unknown;
    const cliente = {
      beta: {
        messages: {
          create: async (_p: unknown, o: unknown) => {
            opcoes = o;
            return { stop_reason: 'end_turn', model: 'm', usage: { input_tokens: 1, output_tokens: 1 }, content: [{ type: 'text', text: '{"itens":[]}' }] };
          },
        },
      },
    };
    const r = await reconhecer(cliente as never, [foto]);
    expect(r.json).toEqual({ itens: [] });
    expect(opcoes).toEqual({ timeout: TEMPO_MAX_MODELO_MS, maxRetries: 0 });
    // o tempo da chamada cabe na duração máxima da função, com folga para o resto do pedido
    const vercel = JSON.parse(readFileSync('vercel.json', 'utf8')) as { functions: Record<string, { maxDuration: number }> };
    expect(vercel.functions['api/vision.ts']!.maxDuration * 1000).toBeGreaterThanOrEqual(TEMPO_MAX_MODELO_MS + 5000);
  });
});

describe('mensagens de erro da foto, no aparelho', () => {
  it('sem resposta: a demora, a falta de rede e o servidor têm mensagens diferentes', () => {
    expect(erroSemResposta('TimeoutError', true)).toBe(ERRO_DA_FOTO.demora);
    expect(erroSemResposta('AbortError', true)).toBe(ERRO_DA_FOTO.demora);
    expect(erroSemResposta('TypeError', true)).toBe(ERRO_DA_FOTO.servidor);
    expect(erroSemResposta('TypeError', false)).toBe(ERRO_DA_FOTO.semConexao);
    expect(erroSemResposta(undefined, true)).toBe(ERRO_DA_FOTO.servidor);
  });
  it('com resposta: vale a mensagem do servidor; sem ela, o código da resposta', () => {
    expect(erroDaResposta(429, 'Limite de fotos de hoje atingido.')).toBe('Limite de fotos de hoje atingido.');
    expect(erroDaResposta(413)).toBe(ERRO_DA_FOTO.tamanho);
    expect(erroDaResposta(500, '')).toBe(ERRO_DA_FOTO.analise);
    expect(erroDaResposta(502, { erro: 'objeto' })).toBe(ERRO_DA_FOTO.analise);
  });
  it('todas as mensagens são em português e levam à lista', () => {
    for (const t of Object.values(ERRO_DA_FOTO)) expect(t).toMatch(/lista/);
    expect(ESPERA_MAX_FOTO_MS).toBeGreaterThan(60_000);
  });
});
