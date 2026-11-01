import { describe, expect, it } from 'vitest';
import { avaliarDor, avaliarSinal, avaliarTriagem, efeitoDaDor, PERGUNTAS, respostasNenhuma, type Respostas } from '../../src/domain/triagem';

const nao = Object.fromEntries(PERGUNTAS.map((p) => [p.id, false])) as Respostas;

describe('triagem', () => {
  it('sem "sim": libera', () => expect(avaliarTriagem({ respostas: nao }).bloqueado).toBe(false));
  it('qualquer "sim" bloqueia, inclusive gravidez e doença aguda', () => {
    for (const p of PERGUNTAS.filter((p) => p.id !== 'osteoarticular'))
      expect(avaliarTriagem({ respostas: { ...nao, [p.id]: true } }).bloqueado, p.id).toBe(true);
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
    expect(Object.keys(r).sort()).toEqual(PERGUNTAS.map((p) => p.id).sort());
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
  });
  it('sinais cardiovasculares encerram a sessão e citam o SAMU', () => {
    const s = avaliarSinal('peito');
    expect(s.acao).toBe('encerrar-sessao');
    expect(s.mensagem).toContain('192');
    expect(avaliarSinal('formigamento').acao).toBe('encerrar-exercicio');
  });
});
