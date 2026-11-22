import { describe, expect, it } from 'vitest';
import { avaliarDor, avaliarSinal, avaliarTriagem, CUIDADOS_PRESSAO, efeitoDaDor, PERGUNTAS, RESPOSTA_IDS, respostasNenhuma, SEGUIMENTO_PRESSAO, type Pressao, type Respostas } from '../../src/domain/triagem';

const nao = Object.fromEntries(RESPOSTA_IDS.map((id) => [id, false])) as Respostas;

describe('triagem', () => {
  it('sem "sim": libera', () => expect(avaliarTriagem({ respostas: nao }).bloqueado).toBe(false));
  // M6 (22/11/2026): um teste por pergunta. O que a triagem vier a liberar com perguntas de seguimento sai desta lista
  // de propósito, à vista; os outros "sim" continuam bloqueando, sozinhos e sem a liberação.
  it.each(PERGUNTAS.filter((p) => p.id !== 'osteoarticular' && p.id !== 'pressao').map((p) => [p.id, p.curta] as const))('"sim" só em %s (%s) bloqueia', (id) => {
    const r = avaliarTriagem({ respostas: { ...nao, [id]: true } });
    expect(r).toMatchObject({ bloqueado: true, motivos: [id], regraId: 'seguranca.triagem' });
    expect(r.mensagem).toContain('procure um médico ou profissional de Educação Física');
  });
  it('osteoarticular sem região marcada também bloqueia; com região, segue a dor de hoje (seguranca.dor.programa)', () => {
    const osteo = { ...nao, osteoarticular: true };
    expect(avaliarTriagem({ respostas: osteo }).bloqueado).toBe(true);
    // Antes do R1, qualquer região marcada era excluída. Agora a nota de hoje decide.
    expect(avaliarTriagem({ respostas: osteo, dores: [{ articulacao: 'ombro', nota: 0 }] })).toMatchObject({
      bloqueado: false,
      regioesExcluidas: [],
      regioesDorLeve: [],
      regraId: 'seguranca.triagem.osteoarticular',
    });
    expect(avaliarTriagem({ respostas: osteo, dores: [{ articulacao: 'ombro', nota: 4 }] })).toMatchObject({ regioesExcluidas: [], regioesDorLeve: ['ombro'] });
    expect(avaliarTriagem({ respostas: osteo, dores: [{ articulacao: 'ombro', nota: 7 }] })).toMatchObject({ regioesExcluidas: ['ombro'], regioesDorLeve: [] });
    // Sem nota (região de um estado antigo, antes da versão 5): continua excluída, como antes.
    expect(avaliarTriagem({ respostas: osteo, dores: [{ articulacao: 'joelho' }] }).regioesExcluidas).toEqual(['joelho']);
  });
  it('efeito da nota: 0–2 lembrete, 3–5 prefere outros, acima de 5 ou sem nota exclui', () => {
    expect([0, 2, 3, 5, 6, 10, undefined].map(efeitoDaDor)).toEqual(['lembrete', 'lembrete', 'prefere-outros', 'prefere-outros', 'exclui', 'exclui', 'exclui']);
  });
  it('a dor vale também com a liberação confirmada e quando não há "sim" (dado migrado)', () => {
    const dores = [{ articulacao: 'joelho' as const, nota: 8 }];
    expect(avaliarTriagem({ respostas: { ...nao, coracao: true, osteoarticular: true }, dores, liberacaoConfirmada: true }).regioesExcluidas).toEqual(['joelho']);
    expect(avaliarTriagem({ respostas: nao, dores }).regioesExcluidas).toEqual(['joelho']);
  });
  it('"Nenhuma se aplica a mim" responde "não" a todas (seguranca.triagem.nenhuma)', () => {
    const r = respostasNenhuma();
    expect(Object.keys(r).sort()).toEqual(PERGUNTAS.map((p) => p.id).filter((id) => id !== 'pressao').sort());
    expect(Object.values(r).every((v) => v === false)).toBe(true);
    expect(avaliarTriagem({ respostas: r }).bloqueado).toBe(false);
  });
  it('liberação confirmada desbloqueia', () => {
    expect(avaliarTriagem({ respostas: { ...nao, coracao: true }, liberacaoConfirmada: true }).bloqueado).toBe(false);
  });
});

describe('dor e sinais de alerta', () => {
  it('escala de dor', () => {
    expect(avaliarDor(2).acao).toBe('seguir');
    expect(avaliarDor(4).acao).toBe('ajustar');
    expect(avaliarDor(6).acao).toBe('encerrar-exercicio');
    expect(avaliarDor(1, true).acao).toBe('encerrar-exercicio');
    // Auditoria de 12/11/2026: sem carga menor para usar (placa 1, o halter mais leve), o texto não manda reduzir.
    expect(avaliarDor(4).mensagem).toMatch(/^Reduza a carga em 10–20%/);
    expect(avaliarDor(4, false, false).mensagem).toBe('Não há carga menor aqui: encurte a amplitude ou desacelere. Se a dor não diminuir, troque pela alternativa.');
    expect(avaliarDor(4, false, false).acao).toBe('ajustar');
  });
  it('sinais cardiovasculares encerram a sessão e citam o SAMU', () => {
    const s = avaliarSinal('peito');
    expect(s.acao).toBe('encerrar-sessao');
    expect(s.mensagem).toContain('192');
    expect(avaliarSinal('formigamento').acao).toBe('encerrar-exercicio');
    // os dois sinais que a regra lista e a folha não tinha (conferência regra por regra, 22/11/2026)
    expect(avaliarSinal('estalo-com-dor')).toMatchObject({ acao: 'encerrar-exercicio', regraId: 'seguranca.alerta.musculoesqueletico' });
    expect(avaliarSinal('dor-irradiada')).toMatchObject({ acao: 'encerrar-exercicio', regraId: 'seguranca.alerta.musculoesqueletico' });
    // seguranca.alerta.musculoesqueletico: sinal de cauda equina pede atendimento urgente, e o treino acaba
    const urgente = avaliarSinal('cauda-equina');
    expect(urgente.acao).toBe('encerrar-sessao');
    expect(urgente.mensagem).toContain('pronto-socorro');
    expect(urgente.regraId).toBe('seguranca.alerta.musculoesqueletico');
  });
});

describe('a pergunta geral (lote 3 do redesign; seguranca.triagem.nenhuma)', () => {
  it('as 10 perguntas, na mesma ordem, cada uma com a condição em poucas palavras e a pergunta inteira de sempre', () => {
    expect(PERGUNTAS.map((p) => p.id)).toEqual(['coracao', 'pressao', 'peito', 'tontura', 'doenca-cronica', 'medicamento', 'osteoarticular', 'supervisao', 'gravidez', 'doenca-aguda']);
    for (const p of PERGUNTAS) {
      expect(p.curta.length).toBeGreaterThan(5);
      expect(p.curta.length).toBeLessThan(p.texto.length);
      expect(p.texto).toMatch(/\?$/);
    }
    // M6: coração e pressão alta são duas perguntas
    expect(PERGUNTAS.find((p) => p.id === 'coracao')!.texto).toBe('Algum médico já disse que você tem problema no coração?');
    expect(PERGUNTAS.find((p) => p.id === 'pressao')!.texto).toBe('Algum médico já disse que você tem pressão alta?');
  });
});

describe('pressão alta: o seguimento (M6; seguranca.triagem.pressao)', () => {
  const controlada: Pressao = { controlada: 'sim', restricao: false };

  it('controlada, sem restrição e sem outro "sim": libera com cuidados', () => {
    expect(avaliarTriagem({ respostas: nao, pressao: controlada })).toMatchObject({
      bloqueado: false,
      motivos: ['pressao'],
      cuidadosPressao: true,
      regraId: 'seguranca.triagem.pressao',
    });
  });
  it('com o remédio contínuo, libera só se o remédio for só o da pressão', () => {
    const comRemedio = { ...nao, medicamento: true };
    expect(avaliarTriagem({ respostas: comRemedio, pressao: { ...controlada, soRemedioDaPressao: true } })).toMatchObject({ bloqueado: false, cuidadosPressao: true, motivos: ['pressao', 'medicamento'] });
    expect(avaliarTriagem({ respostas: comRemedio, pressao: { ...controlada, soRemedioDaPressao: false } }).bloqueado).toBe(true);
    // sem a resposta sobre o remédio (não deveria acontecer pela tela): bloqueia
    expect(avaliarTriagem({ respostas: comRemedio, pressao: controlada }).bloqueado).toBe(true);
  });
  it.each([
    ['não controlada', { controlada: 'nao', restricao: false }],
    ['não sabe se está controlada', { controlada: 'nao-sei', restricao: false }],
    ['o médico pediu para limitar exercício', { controlada: 'sim', restricao: true }],
  ] as [string, Pressao][])('%s: bloqueia, com a mensagem de sempre', (_nome, pressao) => {
    const r = avaliarTriagem({ respostas: nao, pressao });
    expect(r).toMatchObject({ bloqueado: true, motivos: ['pressao'], cuidadosPressao: false, regraId: 'seguranca.triagem' });
    expect(r.mensagem).toContain('procure um médico ou profissional de Educação Física');
  });
  it.each(RESPOSTA_IDS.filter((id) => id !== 'medicamento'))('pressão controlada mais "sim" em %s: bloqueia', (id) => {
    const dores = id === 'osteoarticular' ? [{ articulacao: 'ombro' as const, nota: 2 }] : undefined;
    expect(avaliarTriagem({ respostas: { ...nao, [id]: true }, pressao: controlada, ...(dores ? { dores } : {}) }).bloqueado).toBe(true);
  });
  it('a liberação por caixinha continua valendo, e os cuidados aparecem para quem marcou pressão alta', () => {
    expect(avaliarTriagem({ respostas: { ...nao, peito: true }, pressao: controlada, liberacaoConfirmada: true })).toMatchObject({ bloqueado: false, cuidadosPressao: true });
    expect(avaliarTriagem({ respostas: nao, pressao: { controlada: 'nao', restricao: false }, liberacaoConfirmada: true })).toMatchObject({ bloqueado: false, cuidadosPressao: true });
    expect(avaliarTriagem({ respostas: { ...nao, coracao: true }, liberacaoConfirmada: true }).cuidadosPressao).toBe(false);
  });
  it('os textos são próprios do app, e os cuidados dizem o que fazer e quando parar', () => {
    expect(SEGUIMENTO_PRESSAO.controlada).toBe('A sua pressão está controlada?');
    expect(SEGUIMENTO_PRESSAO.restricao).toBe('Algum médico pediu para você evitar ou limitar exercício?');
    expect(SEGUIMENTO_PRESSAO.remedio).toBe('O remédio é só o da pressão?');
    expect(CUIDADOS_PRESSAO).toHaveLength(4);
    expect(CUIDADOS_PRESSAO.join(' ')).toMatch(/pelo menos 2 repetições sobrando.*Não prenda o ar.*tontura, dor no peito.*192.*refaça a triagem/);
  });
});
