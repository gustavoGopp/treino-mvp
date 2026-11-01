import { describe, expect, it } from 'vitest';
import { LIMITE_APARELHO, Limite, MAX_FOTOS, processarPedido, type Contexto } from '../../api/_lib/pedido';

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

  it('erro do modelo vira mensagem clara, sem detalhes internos', async () => {
    const r = await processarPedido(ok, ctx, new Limite(), async () => {
      throw new Error('segredo interno');
    });
    expect(r).toEqual({ status: 502, corpo: { codigo: 'modelo', erro: 'Não foi possível analisar as fotos agora. Use a lista.' } });
  });
});
