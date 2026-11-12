import { describe, expect, it } from 'vitest';
import { gerarPrograma } from '../../src/domain/gerador';
import { comProgramaNovo, comProgramaQueFalta, mesmoConteudo } from '../../src/features/app/estado';
import { iniciarSessao } from '../../src/features/treino/acoes';
import { programaSchema, VERSAO_ESTADO, type Estado } from '../../src/storage/esquema';
import { PERSONAS } from '../personas';

describe('mesmoConteudo', () => {
  it('ignora a ordem das chaves e campos undefined, mas não a ordem das listas', () => {
    expect(mesmoConteudo({ a: 1, b: [1, 2], c: undefined }, { b: [1, 2], a: 1 })).toBe(true);
    expect(mesmoConteudo({ b: [2, 1] }, { b: [1, 2] })).toBe(false);
    expect(mesmoConteudo({ a: { x: 1 } }, { a: { x: 2 } })).toBe(false);
  });

  it('o programa salvo (passado pelo zod) é igual ao gerado de novo com as mesmas entradas', () => {
    for (const p of Object.values(PERSONAS)) {
      const r = gerarPrograma(p.perfil, p.inventario);
      if (r.status !== 'ok') throw new Error('bloqueado');
      expect(mesmoConteudo(programaSchema.parse(JSON.parse(JSON.stringify(r.programa))), r.programa)).toBe(true);
    }
  });
});

// Auditoria de 12/11/2026: gerar o programa de novo no meio de um treino trocava as vagas por baixo dele.
describe('comProgramaNovo', () => {
  const ana = PERSONAS.ana;
  const base = (): Estado => {
    const r = gerarPrograma(ana.perfil, ana.inventario);
    if (r.status !== 'ok') throw new Error('persona bloqueada');
    return {
      versao: VERSAO_ESTADO,
      triagem: ana.perfil.triagem,
      nivel: { respostas: { tempoContinuo: '6-24m', semanasParado: 0, tecnica: 'sim' }, escolhido: ana.perfil.nivel },
      rotina: { diasSemana: ana.perfil.diasSemana, minutosSessao: ana.perfil.minutosSessao, prioridades: ana.perfil.prioridades },
      restricoes: { evitarExercicios: [], evitarEquipamentos: [] },
      locais: [{ id: 'local-1', nome: 'Meu local', inventario: ana.inventario }],
      programa: { programa: r.programa, geradoEm: '2026-11-01T10:00:00.000Z' },
      historico: [],
    };
  };
  const evitar = (e: Estado): Estado => ({ ...e, restricoes: { evitarExercicios: [e.programa!.programa.dias[0]!.exercicios[0]!.exId], evitarEquipamentos: [] } });

  it('sem treino aberto, gera o programa de novo com o cadastro atual', () => {
    const e = evitar(base());
    const novo = comProgramaNovo(e, '2026-11-02T10:00:00.000Z');
    expect(novo.programa!.geradoEm).toBe('2026-11-02T10:00:00.000Z');
    expect(novo.programa!.programa.dias[0]!.exercicios.map((x) => x.exId)).not.toContain(e.restricoes!.evitarExercicios[0]);
  });

  it('com um treino aberto, o programa salvo fica como está, e a mudança do cadastro continua guardada', () => {
    const e = evitar(iniciarSessao(base(), '2026-11-02T10:00:00.000Z'));
    expect(e.sessaoAtual).toBeDefined();
    expect(comProgramaNovo(e, '2026-11-02T10:05:00.000Z')).toBe(e);
    expect(comProgramaNovo(e, '2026-11-02T10:05:00.000Z', true).programa).toBe(e.programa);
  });

  // O programa salvo sai quando cita um exercício que deixou a biblioteca (storage/ids.ts): ao abrir, outro é gerado.
  it('cadastro completo e nenhum programa salvo: gera um ao abrir, mesmo com um treino aberto', () => {
    const { programa, ...sem } = iniciarSessao(base(), '2026-11-02T10:00:00.000Z');
    const lido = comProgramaQueFalta(sem, '2026-11-03T10:00:00.000Z');
    expect(lido.programa).toEqual({ programa: programa!.programa, geradoEm: '2026-11-03T10:00:00.000Z', localId: 'local-1' });
    expect(lido.sessaoAtual).toEqual(sem.sessaoAtual);
    // com programa salvo, nada muda; sem cadastro, nada é gerado
    const completo = base();
    expect(comProgramaQueFalta(completo, '2026-11-03T10:00:00.000Z')).toBe(completo);
    const vazio: Estado = { versao: VERSAO_ESTADO, historico: [] };
    expect(comProgramaQueFalta(vazio, '2026-11-03T10:00:00.000Z')).toBe(vazio);
  });
});
