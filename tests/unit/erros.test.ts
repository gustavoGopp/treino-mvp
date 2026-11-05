import { describe, expect, it } from 'vitest';
import { EX, montarSvg } from '../../src/engine';
import { CTX } from '../../src/engine/contexto';
import { DIF_MINIMA_DA_CADEIA, difMaximaDoErro, instanteDoErro, montarSvgEstilo } from '../../src/engine/estilo';

// R4 (decisão do Gustavo, 05/11/2026; piloto na auditoria de 04/11): no modo Erros do Boneco, o certo é a figura cheia e
// só a parte do corpo que erra aparece em vermelho tracejado, com o nome do erro ao lado da junta que mais se afasta.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
const animacao = (id: string): Animacao => EX.find((e: Animacao) => e.id === id);
const erroDe = (ex: Animacao, id: string) => ex.errors.findIndex((e: { id: string }) => e.id === id);
const conta = (html: string, re: RegExp) => (html.match(re) ?? []).length;
// uma cadeia do corpo em linhas: tronco (P-M-N-Hc) = 3, braço (N-S-E-W-G) = 4, perna (P-Hp-K-A-toe) = 4
const LINHAS = { tronco: 3, braco: 4, perna: 4 };

describe('modo Erros: o erro sobre o certo', () => {
  it.each([
    // o cotovelo vai à frente: só o braço direito muda
    ['rosca-martelo', 'cotovelo', 'Cotovelos vão para a frente', LINHAS.braco, 'lateral'],
    // as costas arredondam: o tronco e, com ele, os dois braços (os ombros vão junto); as pernas ficam
    ['remada-unilateral-sem-banco', 'arred', 'Arredondar as costas', LINHAS.tronco + 2 * LINHAS.braco, 'lateral'],
    // descer pouco: o corpo inteiro fica mais alto (todas as 5 cadeias)
    ['goblet', 'raso', 'Descer pouco', LINHAS.tronco + 2 * LINHAS.braco + 2 * LINHAS.perna, 'lateral'],
  ])('%s, erro "%s": o certo cheio, só as cadeias que mudam em vermelho tracejado e o título ao lado', (id, erro, titulo, linhas, view) => {
    const ex = animacao(id);
    const i = erroDe(ex, erro);
    const html = montarSvgEstilo(ex, view, 'err', instanteDoErro(ex, i), i, 358, 'a', false, { tituloErro: titulo }).html;
    expect(html).toMatch(/ea-pele-t"/); // o certo, figura cheia (sem o sufixo -e)
    expect(html).not.toMatch(/ea-pele-t-e"/);
    expect(conta(html, /<line [^>]*class="gh-e"/g)).toBe(linhas);
    expect(html).not.toMatch(/class="gh"/); // nada do fantasma verde
    expect(html).toContain(`class="lbl-e"`);
    expect(html).toContain(`>${titulo}</text>`);
  });

  it('sem o título, o rótulo é o id do erro; o estilo clássico ignora as opções', () => {
    const goblet = animacao('goblet');
    const i = erroDe(goblet, 'raso');
    expect(montarSvgEstilo(goblet, 'lateral', 'err', 1, i, 358, 'a').html).toContain('>raso</text>');
    const a = montarSvgEstilo(goblet, 'lateral', 'err', 1, i, 358, 'atual').html;
    expect(montarSvgEstilo(goblet, 'lateral', 'err', 1, i, 358, 'atual', false, { tituloErro: 'Descer pouco' }).html).toBe(a);
    expect(a).toBe(montarSvg(goblet, 'lateral', 'err', 1, i, 358).html);
    expect(CTX.ROTULO_ERRO).toBeNull();
    expect(CTX.ACABAMENTO).toBeNull();
  });

  it('um erro pequeno (nenhuma cadeia muda 3 cm): o certo cheio, só o objeto da pose errada em vermelho e o nome na mão', () => {
    // "encolher os ombros" move o braço inteiro (7 cm na elevação lateral): é um erro de cadeia. Erro em que o corpo não
    // muda: o punho dobrado com o kettlebell (só a bola cai para trás) e o elástico no pescoço na flexão.
    const pequenos = EX.flatMap((ex: Animacao) => ex.errors.map((e: { id: string }, k: number) => [ex, k, `${ex.id}:${e.id}`] as const)).filter(([ex, k]) => difMaximaDoErro(ex, k) < DIF_MINIMA_DA_CADEIA);
    // (e, desde a aprovação das 16 de 05/11, o elástico que sobe para o pescoço na flexão: só a faixa muda de lugar)
    expect(pequenos.map(([, , id]) => id)).toEqual(['desenvolvimento-unilateral-kettlebell:punho', 'flexao-elastico:pescoco']);
    expect(difMaximaDoErro(animacao('elevacao-halteres'), erroDe(animacao('elevacao-halteres'), 'encolher'))).toBeGreaterThan(DIF_MINIMA_DA_CADEIA);
    const [ex, k] = pequenos[0]!;
    const html = montarSvgEstilo(ex, ex.errors[k].view, 'err', instanteDoErro(ex, k), k, 358, 'a', false, { tituloErro: 'Punho dobrado' }).html;
    expect(html).toMatch(/ea-pele-t"/);
    expect(html).not.toMatch(/class="gh-e"|class="gh"|tor-e"/);
    expect(html).toMatch(/class="eq-err kb-alca-e"/); // o kettlebell da pose errada, em vermelho
    expect(html).toContain('>Punho dobrado</text>');
  });

  it('o instante do erro é o da maior diferença entre o certo e o errado, determinístico e dentro do ciclo', () => {
    for (const ex of EX as Animacao[])
      ex.errors.forEach((_: unknown, i: number) => {
        const t = instanteDoErro(ex, i);
        expect(t).toBeGreaterThanOrEqual(0);
        expect(t).toBeLessThan(ex.T);
        expect(instanteDoErro(ex, i)).toBe(t);
      });
    // "descer pouco" no goblet: a diferença é maior embaixo (a 3ª fase, a pausa no fundo)
    const goblet = animacao('goblet');
    const t = instanteDoErro(goblet, erroDe(goblet, 'raso'));
    expect(t).toBeGreaterThanOrEqual(goblet.seq[2].t0);
    expect(t).toBeLessThan(goblet.seq[2].t0 + goblet.seq[2].dur);
  });
});
