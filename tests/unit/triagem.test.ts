import { describe, expect, it } from 'vitest';
import { avaliarDor, avaliarSinal, avaliarTriagem, PERGUNTAS, type Respostas } from '../../src/domain/triagem';

const nao = Object.fromEntries(PERGUNTAS.map((p) => [p.id, false])) as Respostas;

describe('triagem', () => {
  it('sem "sim": libera', () => expect(avaliarTriagem({ respostas: nao }).bloqueado).toBe(false));
  it('qualquer "sim" bloqueia, inclusive gravidez e doença aguda', () => {
    for (const p of PERGUNTAS.filter((p) => p.id !== 'osteoarticular'))
      expect(avaliarTriagem({ respostas: { ...nao, [p.id]: true } }).bloqueado, p.id).toBe(true);
  });
  it('osteoarticular sem região marcada também bloqueia; com região, exclui a região', () => {
    expect(avaliarTriagem({ respostas: { ...nao, osteoarticular: true } }).bloqueado).toBe(true);
    expect(avaliarTriagem({ respostas: { ...nao, osteoarticular: true }, regioes: ['ombro'] })).toMatchObject({ bloqueado: false, regioesExcluidas: ['ombro'] });
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
