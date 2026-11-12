import { describe, expect, it } from 'vitest';
import { LIMITE_APARELHO, LIMITE_CONVITE_ERRADO, LIMITE_IP, Limite, MAX_FOTOS, processarPedido, type Contexto } from '../../api/_lib/pedido';

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
