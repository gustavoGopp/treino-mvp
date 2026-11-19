// O elástico longo em laço (a faixa chata de 41 pol, tipo "super band"; medidas em ../dados/objetos/elastico-longo.json).
// A faixa é desenhada ao longo do caminho que o exercício dá, na largura de fábrica, e estreita ao esticar: a borracha
// não muda de volume, e esticada λ vezes a largura e a espessura caem na raiz de λ (como o tubo em ../equipamento.ts).
// Cada pedaço do caminho é pintado na sua profundidade (o que passa atrás das costas fica atrás do corpo, o que sobe
// pela frente fica na frente). Um filete claro no meio mostra que a faixa é chata, e não um tubo.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { mix } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { dist } from '../vec';
import type { V3 } from '../vec';

/** A largura da faixa (cm) esticada `estica` vezes. */
export const larguraDaFaixa = (estica: number) => obj('elasticoLongo', 'larg') / Math.sqrt(Math.max(1, estica));

/** Corta a polilinha em pedaços de até `passo` cm (para a pintura por profundidade). */
function pedacos(pts: V3[], passo: number): V3[][] {
  const out: V3[][] = [];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!,
      b = pts[i]!;
    const n = Math.max(1, Math.ceil(dist(a, b) / passo));
    for (let k = 0; k < n; k++) {
      const p = (t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      out.push([p(k / n), p((k + 1) / n)]);
    }
  }
  return out;
}

/**
 * A faixa ao longo de `pts`, esticada `estica` vezes (1 = em repouso). `nome` distingue as faixas de um mesmo quadro;
 * `cenario` manda a faixa para trás do corpo e para fora do enquadramento (o trecho que vai até uma âncora longe).
 */
export function faixaElastica(pts: V3[], estica: number, nome = 'faixa', cenario = false): { prims: Prim[]; peca: PecaPropria } {
  const larg = larguraDaFaixa(estica);
  return {
    prims: [{ t: 'fio', pts, larg: obj('elasticoLongo', 'esp'), cls: 'fita' }],
    peca: {
      t: 'propria',
      nome,
      cenario,
      desenhar(C, M) {
        const f1 = (n: number) => (Math.round(n * 100) / 100).toString();
        for (const p of pedacos(pts, 4)) {
          // a borda (traço), a face e o filete do meio num item só, com as pontas retas: os pedaços se emendam sem
          // marca, e cada um é pintado na sua profundidade
          const Q = p.map((x) => C.P(x));
          const d = `M${Q.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L')}`;
          const z = Q.reduce((s, q) => s + q[2], 0) / Q.length;
          const linha = (cor: string, w: number) => `<path d="${d}" stroke="${cor}" stroke-width="${f1(w)}" stroke-linecap="butt" fill="none"/>`;
          C.bruto(z, linha(M.estofado[3]!, larg + 0.45) + linha(M.estofado[1]!, larg) + linha(mix(M.estofado[1]!, '#ffffff', 0.35), larg * 0.22));
          // o pedaço, para a conferência da pintura e dos fios (não muda o desenho)
          C.geo({ fio: p, w: larg + 0.45 });
        }
      },
    },
  };
}
