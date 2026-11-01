import { describe, expect, it } from 'vitest';
import { DIVISOES, DIVISAO_IDS, META_MAX_CLASSICA, OPCOES_POR_DIAS, divisaoEscolhida, opcoesDeDivisao } from '../../src/domain/gerador/divisoes';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { metaMaxima } from '../../src/domain/gerador';
import { VOLUME } from '../../src/domain/regras';

// divisao.*: a divisão é escolhida pela pessoa entre opções equivalentes (pesquisa-v2/01).
describe('opções de divisão por número de dias (divisao.recomendacao)', () => {
  it('segue a tabela do T1: a 1ª é a recomendada', () => {
    expect(opcoesDeDivisao(2, 6).map((o) => o.id)).toEqual(['ct-ab']);
    expect(opcoesDeDivisao(3, 12).map((o) => o.id)).toEqual(['ct-abc', 'si-ct']);
    expect(opcoesDeDivisao(4, 12).map((o) => o.id)).toEqual(['si-2x', 'ct-4x']);
    expect(opcoesDeDivisao(5, 14).map((o) => o.id)).toEqual(['si-ppl', 'ct-5x']);
    expect(opcoesDeDivisao(6, 14).map((o) => o.id)).toEqual(['ppl-2x', 'si-3x']);
  });
  it('só uma opção é recomendada, e ela vem explicada', () => {
    for (const d of [2, 3, 4, 5, 6] as const) {
      const o = opcoesDeDivisao(d, 8);
      expect(o.filter((x) => x.recomendada)).toHaveLength(1);
      expect(o[0]!.recomendada).toBe(true);
      expect(o[0]!.descricao).toContain('Por que é a recomendada');
    }
  });
  it('divisao.seis-dias: aceita de 2 a 6 dias, e cada divisão tem tantos treinos quanto dias, com ids únicos', () => {
    expect(Object.keys(OPCOES_POR_DIAS).map(Number)).toEqual([2, 3, 4, 5, 6]);
    for (const id of DIVISAO_IDS) {
      const d = DIVISOES[id];
      expect(d.dias, id).toHaveLength(d.diasSemana);
      expect(new Set(d.dias.map((x) => x.id)).size, id).toBe(d.dias.length);
      for (const dia of d.dias) for (const v of dia.vagas) expect(FUNCAO[v.funcao], `${id}/${dia.id}/${v.funcao}`).toBeDefined();
    }
  });
  it('divisao.classica: só aparece com meta semanal ≤ 10, e com o aviso das faltas', () => {
    expect(opcoesDeDivisao(4, VOLUME.alvo.iniciante).map((o) => o.id)).toContain('classica-4');
    expect(opcoesDeDivisao(4, VOLUME.alvo.intermediario).map((o) => o.id)).not.toContain('classica-4');
    expect(opcoesDeDivisao(3, META_MAX_CLASSICA).find((o) => o.id === 'classica-3')!.aviso).toMatch(/faltar/);
    // intermediário sem prioridades: todas as metas no mínimo eficaz (6) → a clássica cabe
    expect(metaMaxima('intermediario', [])).toBeLessThanOrEqual(META_MAX_CLASSICA);
    expect(metaMaxima('intermediario', ['peito'])).toBeGreaterThan(META_MAX_CLASSICA);
  });
  it('divisao.frequencia-minima: fora da clássica, cada músculo grande aparece em 2 dias ou mais (meta acima de 10 pede 2 sessões)', () => {
    for (const id of DIVISAO_IDS.filter((x) => !DIVISOES[x].classica)) {
      const d = DIVISOES[id];
      for (const m of ['peito', 'costas', 'quadriceps', 'posteriores'] as const) {
        const dias = d.dias.filter((dia) => dia.vagas.some((v) => !v.complemento && !v.prioridade && FUNCAO[v.funcao]!.musculo === m)).length;
        expect(dias, `${id} ${m}`).toBeGreaterThanOrEqual(Math.ceil(12 / VOLUME.sessaoTeto));
      }
    }
  });
  it('a escolha vale se servir para os dias e as metas; senão, a recomendada', () => {
    expect(divisaoEscolhida(4, 12, 'ct-4x')).toMatchObject({ divisao: { id: 'ct-4x' }, escolhida: true });
    expect(divisaoEscolhida(4, 12)).toMatchObject({ divisao: { id: 'si-2x' }, escolhida: false });
    expect(divisaoEscolhida(4, 12, 'ppl-2x')).toMatchObject({ divisao: { id: 'si-2x' }, escolhida: false });
    expect(divisaoEscolhida(4, 12, 'classica-4')).toMatchObject({ divisao: { id: 'si-2x' }, escolhida: false });
    expect(divisaoEscolhida(4, 8, 'classica-4')).toMatchObject({ divisao: { id: 'classica-4' }, escolhida: true });
  });
});
