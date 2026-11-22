import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { CARTOES, CONTEUDO } from '../../src/conteudo';
import { carregarCartao, temCartao } from '../../src/conteudo/cartoes';
import { BIBLIOTECA, POR_ID } from '../../src/domain/biblioteca';
import { EX } from '../../src/engine';
import { APROVADOS } from '../../src/engine/novo/aprovados';

describe('conteúdo dos exercícios', () => {
  // ligação das 81 animações (22/11/2026): a lista de animações é a das aprovadas no motor novo (171); o motor de antes só tem as 90
  // primeiras, e a ordem dos erros delas continua conferida contra ele, logo abaixo. A das 81 é conferida contra a ficha
  // de movimento do motor novo por `scripts/animacao-nova/conferir-textos-restantes.ts`.
  it('todo exercício animado tem texto, e todo texto tem animação', () => {
    expect(Object.keys(CONTEUDO).sort()).toEqual(Object.keys(APROVADOS).sort());
    expect(Object.keys(CARTOES)).toEqual([]);
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

  // Auditoria de 12/11/2026: 20 exercícios da biblioteca não tinham animação nem cartão e apareciam como "Sem guia
  // ainda". O CLAUDE.md pede o cartão de texto para todo exercício sem animação aprovada.
  it('todo exercício da biblioteca tem guia: a animação aprovada ou o cartão de texto, com a ficha de técnica e a fonte', () => {
    const semGuia = BIBLIOTECA.filter((e) => e.animacaoId === null && !CARTOES[e.id]).map((e) => e.id);
    expect(semGuia).toEqual([]);
    for (const e of BIBLIOTECA.filter((x) => x.animacaoId === null)) {
      const ficha = `docs/pesquisa/animacoes/${e.id}.md`;
      expect(existsSync(ficha), `${e.id} sem ficha de técnica`).toBe(true);
      expect(readFileSync(ficha, 'utf8'), `${e.id}: a ficha não diz a fonte`).toMatch(/## Fontes\n- `[a-z0-9-]+`/);
      expect(CARTOES[e.id]!.name, e.id).toBe(e.nome);
    }
  });

  // ligação das 81 animações (22/11/2026): não sobra exercício sem animação. A regra continua valendo para o que vier: sem animação
  // aprovada, o exercício só entra com cartão de texto (nunca animação improvisada).
  it('todo exercício da biblioteca tem animação aprovada e texto do guia; se algum vier sem animação, tem de ter cartão de texto', () => {
    for (const e of BIBLIOTECA) {
      if (e.animacaoId === null) expect(CARTOES[e.id], e.id).toBeDefined();
      else expect(CONTEUDO[e.animacaoId], e.id).toBeDefined();
    }
    expect(BIBLIOTECA.filter((e) => e.animacaoId === null)).toEqual([]);
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
    // ligação das 81 animações (22/11/2026): nos exercícios que eram cartão, a montagem segura virou a nota do guia, que fica à vista
    // no guia e na tela do treino. A panturrilha no degrau já era animada e nunca teve cartão.
    for (const e of BIBLIOTECA.filter((x) => x.tags.includes('montagem') && x.id !== 'panturrilha-degrau')) expect(CONTEUDO[e.animacaoId!]!.note, e.id).toBeTruthy();
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
