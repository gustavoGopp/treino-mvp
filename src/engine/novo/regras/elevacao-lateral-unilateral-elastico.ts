// Regras medidas da elevação lateral unilateral com o elástico sob o pé do outro lado: o tubo sai de sob o pé esquerdo
// e cruza à frente do corpo até a mão direita; só a mão direita segura; o trecho entre o pé e a mão já está tenso
// embaixo e não passa do máximo do fabricante. O braço, o ombro, o tronco e o peso usam as regras das elevações
// (./ombros.ts e ../conferir.ts); o pé no elástico e o tubo fora do corpo, as do elástico (./elasticos.ts).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { dist } from '../vec';
import type { V3 } from '../vec';

/** O caminho do elástico (o fio de classe `fita`). */
const caminho = (q: Quadro): V3[] => q.prims.flatMap((p) => (p.t === 'fio' && p.cls === 'fita' ? p.pts : []));

export const REGRAS_ELEVACAO_UNILATERAL_ELASTICO: Record<string, Regra> = {
  'elastico-unilateral-cruza-a-frente': (q) => {
    // o tubo sai de sob o pé esquerdo (a borda de dentro da sola, x > 0) e sobe para a mão direita; onde ele passa
    // diante da perna direita (de 2 em 2 cm de altura, os pontos do tubo cuja posição de lado cai dentro da perna), quanto
    // ele fica à frente da pele dela ali
    let pior = 1e9;
    const alturas: number[] = [];
    for (const x of q.filter((_, i) => i % 4 === 0 || i === q.length - 1)) {
      const pts = caminho(x);
      const perna = pontosDoBoneco(x.esq).filter((p) => (p.parte === 'canela' || p.parte === 'coxa') && p.p[0] < 0);
      for (let y = 4; y <= x.esq.lado.R.quadril[1]; y += 2) {
        // o ponto do tubo nessa altura (o primeiro trecho que a cruza)
        let c: V3 | undefined;
        for (let i = 1; i < pts.length && !c; i++) {
          const a = pts[i - 1]!,
            b = pts[i]!;
          if ((a[1] - y) * (b[1] - y) > 0 || a[1] === b[1]) continue;
          const t = (y - a[1]) / (b[1] - a[1]);
          c = [a[0] + (b[0] - a[0]) * t, y, a[2] + (b[2] - a[2]) * t];
        }
        if (!c) continue;
        const ali = perna.filter((p) => Math.abs(p.p[1] - y) < 1.5);
        if (!ali.length) continue;
        const xs = ali.map((p) => p.p[0]);
        if (c[0] < Math.min(...xs) || c[0] > Math.max(...xs)) continue;
        const frente = Math.max(...ali.filter((p) => Math.abs(p.p[0] - c![0]) < 2).map((p) => p.p[2]), -1e9);
        alturas.push(y);
        pior = Math.min(pior, c[2] - frente);
      }
    }
    const peEsquerdo = q.every((x) => x.marcas.solaLdentro![0] > 0 && x.marcas.solaLfora![0] > x.marcas.solaLdentro![0]);
    const [h0, h1] = alturas.length ? faixa(alturas) : [0, 0];
    return { medido: `o tubo sai de sob o pé ${peEsquerdo ? 'esquerdo' : 'DIREITO'} e passa diante da perna direita de ${f1(h0)} a ${f1(h1)} cm do chão, no mínimo ${f1(pior)} cm à frente da pele dela`, ok: peEsquerdo && alturas.length > 0 && pior >= 0 };
  },
  'elastico-unilateral-na-mao-que-trabalha': (q) => {
    // o centro da mão direita sobre o pegador (a marca `pegadorR`); a mão esquerda longe do elástico (solta)
    const naMao = q.map((x) => dist(x.marcas.pegadorR!, x.esq.lado.R.pegada));
    const solta = Math.min(...q.map((x) => Math.min(...caminho(x).map((p) => dist(p, x.esq.lado.L.pegada)))));
    const [a, b] = faixa(naMao);
    return { medido: `o centro da mão direita fica a ${f1(a)}–${f1(b)} cm do pegador; a mão esquerda fica no mínimo a ${f1(solta)} cm do elástico`, ok: b <= 0.5 && solta >= 8 };
  },
  'elastico-unilateral-esticado-desde-embaixo': (q) => {
    // a marca `trechoLivre` = [comprimento do trecho entre o pé e a mão, comprimento dele em repouso, 0]
    const e = q.map((x) => x.marcas.trechoLivre![0] / x.marcas.trechoLivre![1]);
    const [a, b] = faixa(e);
    const max = obj('elastico', 'esticaAte');
    return { medido: `o trecho entre o pé e a mão estica de ${f1(a)} vez (embaixo) a ${f1(b)} vezes (no alto) o comprimento em repouso (${f1(q[0]!.marcas.trechoLivre![1])} cm); o máximo do fabricante é ${f1(max)}`, ok: a >= 1 && b <= max };
  },
};
