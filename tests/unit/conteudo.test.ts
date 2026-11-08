import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { CARTOES, CONTEUDO } from '../../src/conteudo';
import { carregarCartao, temCartao } from '../../src/conteudo/cartoes';
import { BIBLIOTECA, POR_ID } from '../../src/domain/biblioteca';
import { EX } from '../../src/engine';

describe('conteúdo dos exercícios', () => {
  it('todo exercício animado tem texto, e todo texto tem animação', () => {
    expect(Object.keys(CONTEUDO).sort()).toEqual(EX.map((e) => e.id).sort());
  });

  it.each(EX.map((e) => [e.id, e] as const))('%s: cada erro animado tem título e descrição, na mesma ordem', (id, ex) => {
    expect(CONTEUDO[id]!.errors.map((e) => e.id)).toEqual(ex.errors.map((e: { id: string }) => e.id));
  });

  it('R1: nenhum texto de técnica traz prescrição fixa (RIR com número, faixa de kg do programa de referência, "rx")', () => {
    for (const [id, c] of [...Object.entries(CONTEUDO), ...Object.entries(CARTOES)]) {
      const texto = JSON.stringify(c);
      expect(texto, id).not.toMatch(/RIR \d/);
      expect(texto, id).not.toMatch(/\(\d+[–-]\d+ kg\)|até \d+ kg/);
      expect(texto, id).not.toMatch(/o programa diz/);
      for (const k of ['rx', 'sets', 'setLbl', 'setUnit', 'rest']) expect(c, `${id}.${k}`).not.toHaveProperty(k);
    }
  });

  it('todo cartão de texto é de um exercício da biblioteca sem animação aprovada (nunca animação improvisada)', () => {
    for (const id of Object.keys(CARTOES)) {
      expect(POR_ID[id], id).toBeDefined();
      expect(POR_ID[id]!.animacaoId, id).toBeNull();
    }
  });

  it('todo exercício com ficha de técnica e sem animação tem cartão de texto (os 29 do R0c e os da auditoria do treino)', () => {
    const comFicha = BIBLIOTECA.filter((e) => existsSync(`docs/pesquisa/animacoes/${e.id}.md`) && e.animacaoId === null && e.id !== 'agachamento-barra');
    expect(comFicha.length).toBeGreaterThanOrEqual(29);
    for (const e of comFicha) expect(CARTOES[e.id], e.id).toBeDefined();
  });

  it('auditoria do treino, lote 1: os 5 mais prescritos sem guia ganharam ficha de técnica e cartão de texto (ou, depois, a animação aprovada)', () => {
    for (const id of ['ponte-gluteo', 'crucifixo-halteres', 'crucifixo-inverso', 'cadeira-extensora', 'cadeira-flexora']) {
      expect(existsSync(`docs/pesquisa/animacoes/${id}.md`), id).toBe(true);
      const anim = POR_ID[id]?.animacaoId;
      expect(CARTOES[id] ?? (anim ? CONTEUDO[anim] : undefined), id).toBeDefined();
    }
  });

  it('seguranca.montagem: exercício com travas ou ancoragem (tag "montagem") tem a montagem no cartão, se tiver cartão', () => {
    for (const e of BIBLIOTECA.filter((x) => x.tags.includes('montagem')))
      if (CARTOES[e.id]) expect(CARTOES[e.id]!.montagem, e.id).toBeDefined();
  });

  // Lote técnico do redesign: o programa e o treino baixam o cartão sozinho (src/conteudo/cartoes.ts). Para todo
  // exercício sem animação, "tem cartão" e o cartão carregado batem com o índice completo (CARTOES).
  it('o cartão carregado sob demanda é o mesmo do índice completo, para todo exercício sem animação', async () => {
    for (const ex of BIBLIOTECA.filter((e) => !e.animacaoId)) {
      expect(temCartao(ex.id), ex.id).toBe(!!CARTOES[ex.id]);
      expect(await carregarCartao(ex.id), ex.id).toEqual(CARTOES[ex.id] ?? null);
    }
  });
});
