import { describe, expect, it } from 'vitest';
import { EX, check, montarSvg } from '../../src/engine';
import { CTX } from '../../src/engine/contexto';
import { caixaPerto, ESTILOS, EXERCICIOS_R4, fracaoDoCorpo, montarSvgEstilo, PERTO_ABAIXO_DE } from '../../src/engine/estilo';

// Desde 03/11/2026, no modo Músculos dos estilos novos, a câmera fica perto do corpo quando ele ocupa menos de 70% do palco.
const f1 = (n: number) => String(Math.round(n * 10) / 10);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const esperado = (ex: any, view: string, mode: string, estilo: string, base: string) =>
  estilo !== 'atual' && mode === 'mus' && fracaoDoCorpo(ex, view) < PERTO_ABAIXO_DE ? caixaPerto(ex, view).map(f1).join(' ') : base;

// R4 (experimento do boneco): os estilos novos são uma opção paralela do motor.
// Com o estilo desligado ('atual'), a saída tem que ser a de sempre, caractere por caractere; e desenhar
// A ou B antes não pode mudar o que o estilo atual desenha depois (o estado do motor, CTX, é compartilhado).
// A comparação com o guia original (o mesmo SVG, quadro a quadro) continua em tests/motor/equivalencia.spec.ts.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
const N = 24;
const MODOS = ['tec', 'mus', 'traj'];
const animacao = (id: string): Animacao => EX.find((e: Animacao) => e.id === id);
const quadros = (ex: Animacao, view: string, mode: string) =>
  Array.from({ length: N }, (_, i) => montarSvg(ex, view, mode, (i / N) * ex.T, 0, 358));

describe('estilo do boneco (R4)', () => {
  it('os 2 exercícios do experimento existem no motor', () => {
    expect(EXERCICIOS_R4.sort()).toEqual(['goblet', 'puxada-unilateral']);
    for (const id of EXERCICIOS_R4) expect(animacao(id)).toBeTruthy();
  });

  it("com o estilo 'atual', a saída é idêntica à de montarSvg", () => {
    for (const id of EXERCICIOS_R4) {
      const ex = animacao(id);
      for (const view of ex.views)
        for (const mode of MODOS)
          for (let i = 0; i < N; i++) {
            const t = (i / N) * ex.T;
            const a = montarSvg(ex, view, mode, t, 0, 358);
            const b = montarSvgEstilo(ex, view, mode, t, 0, 358, 'atual');
            expect(b.html).toBe(a.html);
            expect(b.viewBox).toBe(a.viewBox);
          }
    }
  });

  it('desenhar A e B não muda o que o estilo atual desenha depois', () => {
    for (const id of EXERCICIOS_R4) {
      const ex = animacao(id);
      const antes = Object.fromEntries(ex.views.flatMap((v: string) => MODOS.map((m) => [`${v}|${m}`, quadros(ex, v, m)])));
      const L0 = JSON.stringify(ex.L0);
      for (const estilo of ['a', 'b'] as const)
        for (const view of ex.views)
          for (const mode of ['tec', 'mus'])
            for (let i = 0; i < N; i++) montarSvgEstilo(ex, view, mode, (i / N) * ex.T, 0, 358, estilo);
      for (const [chave, qs] of Object.entries(antes)) {
        const [view, mode] = chave.split('|') as [string, string];
        expect(quadros(ex, view, mode)).toEqual(qs);
      }
      expect(JSON.stringify(ex.L0)).toBe(L0);
      expect(CTX.MEAS).toBeNull();
    }
    // as outras 29 animações também ficam iguais
    for (const ex of EX.filter((e: Animacao) => !EXERCICIOS_R4.includes(e.id)).slice(0, 5)) {
      const v: string = ex.views[0]!;
      const a = quadros(ex, v, 'mus');
      montarSvgEstilo(animacao('goblet'), 'frontal', 'mus', 1, 0, 358, 'b');
      expect(quadros(ex, v, 'mus')).toEqual(a);
    }
  });

  it('A e B usam as mesmas poses (IK = 0) e o mesmo enquadramento do estilo atual', () => {
    for (const linha of check()) expect(linha).toMatch(/ik=0 /);
    for (const id of EXERCICIOS_R4) {
      const ex = animacao(id);
      for (const view of ex.views) {
        const base = montarSvg(ex, view, 'tec', 0, 0, 358).viewBox;
        for (const estilo of ESTILOS) for (const mode of ['tec', 'mus']) {
          const q = montarSvgEstilo(ex, view, mode, ex.T / 3, 0, 358, estilo);
          expect(q.viewBox).toBe(esperado(ex, view, mode, estilo, base));
          expect(q.html.length).toBeGreaterThan(200);
        }
      }
    }
  });

  it('A e B desenham todos os exercícios, em todas as vistas, modos e erros, no mesmo enquadramento', () => {
    for (const ex of EX as Animacao[])
      for (const estilo of ['a', 'b'] as const) {
        for (const view of ex.views) {
          const base = montarSvg(ex, view, 'tec', 0, 0, 358).viewBox;
          for (const mode of ['tec', 'mus', 'traj'])
            for (let i = 0; i < 6; i++) {
              const q = montarSvgEstilo(ex, view, mode, (i / 6) * ex.T, 0, 358, estilo);
              expect(q.viewBox).toBe(esperado(ex, view, mode, estilo, base));
              expect(q.classe).toBe(`estilo-${estilo} vista-${view}`);
            }
        }
        ex.errors.forEach((e: { view: string }, j: number) => {
          const html = montarSvgEstilo(ex, e.view, 'err', ex.T / 2, j, 358, estilo).html;
          if (estilo === 'a') {
            // R4 (05/11/2026): o certo é a figura cheia; o erro vem por cima, em vermelho tracejado (a cadeia que muda) ou,
            // num erro pequeno, a figura errada inteira em contorno fino
            expect(html).toMatch(/ea-pele-t"/);
            expect(html).not.toMatch(/ea-pele-t-e"/);
            expect(html).toMatch(/class="gh-e"|class="tor-e"|class="eq-err /); // a cadeia que muda, o errado inteiro ou só o objeto errado
            expect(html).not.toMatch(/class="gh"/);
          } else {
            expect(html).toMatch(new RegExp(`e${estilo}-pele-t-e"`)); // a figura que erra
            expect(html).toMatch(/class="gh"/); // e o certo, por cima
          }
        });
      }
  }, 30_000); // percorre todos os exercícios nos 2 estilos

  it('no modo músculos, todo exercício mostra o músculo principal em alguma vista', () => {
    for (const ex of EX as Animacao[]) {
      const t = ex.seq[2].t0 + ex.seq[2].dur / 2;
      const algum = ex.views.some((v: string) => /class="ea-mp"/.test(montarSvgEstilo(ex, v, 'mus', t, 0, 358, 'a').html));
      expect(algum, ex.id).toBe(true);
    }
  });

  it('face pull de cima: o rótulo sai do topo do palco (caixa da fase) nos estilos novos', () => {
    const fp = animacao('face-pull');
    const y = (html: string) => Number(/<text x="[^"]+" y="([^"]+)"[^>]*>mãos abrem/.exec(html)![1]);
    const [, y0, , h] = montarSvg(fp, 'top', 'tec', 0, 0, 358).viewBox.split(' ').map(Number) as [number, number, number, number];
    expect(y(montarSvg(fp, 'top', 'tec', 0, 0, 358).html)).toBeLessThan(y0 + h * 0.25); // clássico: no topo
    expect(y(montarSvgEstilo(fp, 'top', 'tec', 0, 0, 358, 'a').html)).toBeGreaterThan(y0 + h * 0.4); // novo: embaixo
  });

  it('o músculo só aparece no modo músculos, e o bíceps não aparece na vista de trás', () => {
    const pux = animacao('puxada-unilateral');
    for (const estilo of ['a', 'b'] as const) {
      expect(montarSvgEstilo(pux, 'posterior', 'tec', 1, 0, 358, estilo).html).not.toMatch(/-m[ps]"/);
      const mus = montarSvgEstilo(pux, 'posterior', 'mus', 1, 0, 358, estilo).html;
      expect(mus).toMatch(new RegExp(`e${estilo}-mp"`));
      expect(mus).toMatch(new RegExp(`e${estilo}-ms"`));
      expect(mus).not.toMatch(/class="(ms|mp|msl|mpl|scap)"/);
    }
    // bíceps: 7 formas possíveis; de trás, o bíceps (face da frente do braço) fica escondido. Conta só os músculos
    // (o acabamento de 04/11/2026 também desenha o tronco e o quadril com <path>).
    const nTras = (montarSvgEstilo(pux, 'posterior', 'mus', pux.T * 0.6, 0, 358, 'a').html.match(/<path [^>]*class="ea-m[ps]"/g) ?? []).length;
    expect(nTras).toBeLessThan(7);
  });

  it('Músculos com o corpo pequeno no palco (polia): câmera perto do corpo; Técnica com a torre inteira', () => {
    const pux = animacao('puxada-unilateral');
    expect(fracaoDoCorpo(pux, 'posterior')).toBeLessThan(PERTO_ABAIXO_DE);
    const tec = montarSvgEstilo(pux, 'posterior', 'tec', 0, 0, 358, 'a').viewBox.split(' ').map(Number);
    const mus = montarSvgEstilo(pux, 'posterior', 'mus', 0, 0, 358, 'a').viewBox.split(' ').map(Number);
    expect(mus[3]!).toBeLessThan(tec[3]! * 0.85);
    // e quem já ocupa o palco fica como estava
    const goblet = animacao('goblet');
    expect(montarSvgEstilo(goblet, 'lateral', 'mus', 0, 0, 358, 'a').viewBox).toBe(montarSvg(goblet, 'lateral', 'tec', 0, 0, 358).viewBox);
  });
});
