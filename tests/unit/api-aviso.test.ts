import { describe, expect, it } from 'vitest';
import { ATRASO_MAX_SEG, LIMITE_AVISOS_IP, desembaralhar, embaralhar, processarAviso, type Assinatura, type Contexto, type Rede } from '../../api/_lib/aviso';
import { Limite } from '../../api/_lib/pedido';

// Lote M4, passo 2: as regras do aviso de fim do descanso no servidor. A fila e o serviço de aviso são simulados.
const AGORA = Date.UTC(2026, 10, 22, 18, 0, 0);
const ctx: Contexto = { ip: '1.2.3.4', hoje: '2026-11-22', agora: AGORA, configurado: true, segredo: 'segredo-de-teste' };
const assinatura: Assinatura = { endpoint: 'https://fcm.googleapis.com/fcm/send/abc123', keys: { p256dh: 'B'.repeat(87), auth: 'a'.repeat(22) } };
const marcar = { acao: 'marcar', assinatura, fim: AGORA + 90_000, id: 'descanso-0001' };

function redeFalsa() {
  const fila: { corpo: string; atraso: number }[] = [];
  const apagados: string[] = [];
  const enviados: { assinatura: Assinatura; texto: string }[] = [];
  const rede: Rede = {
    publicar: async (corpo, atraso) => `msg_${fila.push({ corpo, atraso })}`,
    apagar: async (m) => void apagados.push(m),
    enviar: async (a, texto) => void enviados.push({ assinatura: a, texto }),
  };
  return { fila, apagados, enviados, rede };
}

describe('aviso do descanso: marcar', () => {
  it('põe na fila com o atraso certo, e o que fica na fila está embaralhado', async () => {
    const r = redeFalsa();
    const resp = await processarAviso(marcar, ctx, new Limite(), r.rede);
    expect(resp).toEqual({ status: 200, corpo: { mensagem: 'msg_1' } });
    expect(r.fila[0]!.atraso).toBe(90);
    expect(r.fila[0]!.corpo).not.toContain('fcm.googleapis.com');
    expect(r.fila[0]!.corpo).not.toContain(assinatura.keys.auth);
    const { acao, cifra } = JSON.parse(r.fila[0]!.corpo) as { acao: string; cifra: string };
    expect(acao).toBe('avisar');
    expect(desembaralhar(cifra, ctx.segredo)).toEqual({ assinatura, id: 'descanso-0001', fim: marcar.fim });
  });

  it('sem as chaves configuradas, responde "desligado" e não chama a fila', async () => {
    const r = redeFalsa();
    expect(await processarAviso(marcar, { ...ctx, configurado: false }, new Limite(), r.rede)).toEqual({ status: 503, corpo: { codigo: 'desligado' } });
    expect(r.fila).toHaveLength(0);
  });

  it.each([
    ['endereço que não é de um serviço de aviso', { ...marcar, assinatura: { ...assinatura, endpoint: 'https://exemplo.com/x' } }],
    ['endereço parecido com o da Apple, em outro domínio', { ...marcar, assinatura: { ...assinatura, endpoint: 'https://web.push.apple.com.exemplo.com/x' } }],
    ['endereço sem https', { ...marcar, assinatura: { ...assinatura, endpoint: 'http://fcm.googleapis.com/x' } }],
    ['sem as chaves do aparelho', { ...marcar, assinatura: { endpoint: assinatura.endpoint } }],
    ['sem o número do descanso', { ...marcar, id: undefined }],
    ['hora que não é número', { ...marcar, fim: 'já' }],
  ])('recusa: %s', async (_nome, pedido) => {
    const r = redeFalsa();
    expect((await processarAviso(pedido, ctx, new Limite(), r.rede)).status).toBe(400);
    expect(r.fila).toHaveLength(0);
  });

  it('aceita o endereço de aviso do iPhone', async () => {
    const r = redeFalsa();
    const pedido = { ...marcar, assinatura: { ...assinatura, endpoint: 'https://web.push.apple.com/QABC' } };
    expect((await processarAviso(pedido, ctx, new Limite(), r.rede)).status).toBe(200);
  });

  it('recusa hora no passado, cedo demais ou além de 15 min', async () => {
    const r = redeFalsa();
    for (const fim of [AGORA - 1000, AGORA + 2000, AGORA + (ATRASO_MAX_SEG + 1) * 1000])
      expect(await processarAviso({ ...marcar, fim }, ctx, new Limite(), r.rede)).toEqual({ status: 400, corpo: { codigo: 'hora' } });
    expect(r.fila).toHaveLength(0);
  });

  it('para no limite diário por IP', async () => {
    const r = redeFalsa();
    const limite = new Limite();
    for (let i = 0; i < LIMITE_AVISOS_IP; i++) expect((await processarAviso(marcar, ctx, limite, r.rede)).status).toBe(200);
    expect(await processarAviso(marcar, ctx, limite, r.rede)).toEqual({ status: 429, corpo: { codigo: 'limite' } });
    expect((await processarAviso(marcar, { ...ctx, ip: '5.6.7.8' }, limite, r.rede)).status).toBe(200);
  });

  it('fila fora do ar vira erro 502, sem estourar', async () => {
    const r = redeFalsa();
    r.rede.publicar = async () => {
      throw new Error('fora do ar');
    };
    expect(await processarAviso(marcar, ctx, new Limite(), r.rede)).toEqual({ status: 502, corpo: { codigo: 'fila' } });
  });
});

describe('aviso do descanso: desmarcar e avisar', () => {
  it('desmarcar tira da fila o pedido com aquele número', async () => {
    const r = redeFalsa();
    expect((await processarAviso({ acao: 'desmarcar', mensagem: 'msg_abc12345' }, ctx, new Limite(), r.rede)).status).toBe(200);
    expect(r.apagados).toEqual(['msg_abc12345']);
    expect((await processarAviso({ acao: 'desmarcar', mensagem: '../x' }, ctx, new Limite(), r.rede)).status).toBe(400);
  });

  it('avisar manda ao aparelho só o número do descanso e a hora do fim', async () => {
    const r = redeFalsa();
    await processarAviso(marcar, ctx, new Limite(), r.rede);
    const resp = await processarAviso(JSON.parse(r.fila[0]!.corpo), { ...ctx, agora: marcar.fim + 500 }, new Limite(), r.rede);
    expect(resp).toEqual({ status: 200, corpo: {} });
    expect(r.enviados).toEqual([{ assinatura, texto: JSON.stringify({ id: 'descanso-0001', fim: marcar.fim }) }]);
  });

  it('avisar recusa texto que esta função não embaralhou (outro segredo, ou mexido)', async () => {
    const r = redeFalsa();
    const recado = { assinatura, id: 'descanso-0001', fim: marcar.fim };
    const deOutro = embaralhar(recado, 'outro-segredo');
    const mexido = embaralhar(recado, ctx.segredo).replace(/.$/, (c) => (c === 'A' ? 'B' : 'A'));
    for (const cifra of [deOutro, mexido, 'qualquer-coisa', 42]) expect((await processarAviso({ acao: 'avisar', cifra }, ctx, new Limite(), r.rede)).status).toBe(400);
    expect(r.enviados).toHaveLength(0);
  });

  it('aviso que a fila entregou com mais de 1 min de atraso não é mandado', async () => {
    const r = redeFalsa();
    await processarAviso(marcar, ctx, new Limite(), r.rede);
    const resp = await processarAviso(JSON.parse(r.fila[0]!.corpo), { ...ctx, agora: marcar.fim + 61_000 }, new Limite(), r.rede);
    expect(resp).toEqual({ status: 200, corpo: { codigo: 'atrasado' } });
    expect(r.enviados).toHaveLength(0);
  });

  it('endereço vencido não vira erro para a fila (ela não tenta de novo)', async () => {
    const r = redeFalsa();
    await processarAviso(marcar, ctx, new Limite(), r.rede);
    r.rede.enviar = async () => {
      throw Object.assign(new Error('gone'), { statusCode: 410 });
    };
    expect(await processarAviso(JSON.parse(r.fila[0]!.corpo), { ...ctx, agora: marcar.fim }, new Limite(), r.rede)).toEqual({ status: 200, corpo: { codigo: 'nao-entregue' } });
  });

  it('ação desconhecida é recusada', async () => {
    expect((await processarAviso({ acao: 'outra' }, ctx, new Limite(), redeFalsa().rede)).status).toBe(400);
    expect((await processarAviso(null, ctx, new Limite(), redeFalsa().rede)).status).toBe(400);
  });
});
