// Regras medidas do abdominal no banco declinado (../exercicios/abdominal-declinado.ts). As do abdominal no chão
// (./abdominais.ts) medem contra o chão; estas medem contra a face do encosto inclinado e os rolos das pernas. O pescoço
// que acompanha e as mãos no peito são as regras dos abdominais, como estão. O limite vem do que a ficha pede, não do
// que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { regioesDasCostas } from '../exercicios/abdominal';
import { bancoDoDeclinado, daFace } from '../exercicios/abdominal-declinado';
import { rolosDoDeclinado } from '../pecas-de-cena/banco-declinado';
import { sub } from '../vec';

const menor = (v: number[]) => (v.length ? Math.min(...v) : 1e9);

export const REGRAS_BANCO_DECLINADO: Record<string, Regra> = {
  'abdominal-declinado-costas-saem-do-banco': (q) => {
    // embaixo, as costas na altura das escápulas encostam na face (amassam até 1,5 cm, sem folga de mais de 1 cm); em
    // cima, as costas da altura das escápulas e a parte de cima da lombar saem dela
    const ini = regioesDasCostas(q[0]!.esq),
      fim = regioesDasCostas(q[q.length - 1]!.esq);
    const e0 = menor(ini.escapulas.map(daFace)),
      e1 = menor(fim.escapulas.map(daFace)),
      l1 = menor(fim.lombar.filter((p) => daFace(p) > -50).map(daFace));
    return { medido: `embaixo, as costas na altura das escápulas ficam a ${f1(e0)} cm da face do encosto; em cima, a ${f1(e1)} cm (o ponto mais perto da lombar, a ${f1(l1)} cm)`, ok: e0 >= -1.5 && e0 <= 1 && e1 >= 5 };
  },
  'abdominal-declinado-bacia-no-banco': (q) => {
    const g = faixa(q.map((x) => menor(pontosDoBoneco(x.esq).filter((y) => y.parte === 'pelve').map((y) => daFace(y.p)))));
    const anda = Math.max(...q.map((x) => Math.hypot(...sub(x.esq.pelve.o, q[0]!.esq.pelve.o))));
    return { medido: `a pele do glúteo fica de ${f1(g[0])} a ${f1(g[1])} cm da face do encosto (negativo = amassa); o centro do quadril anda ${f1(anda)} cm`, ok: g[0] >= -1.5 && g[1] <= 0.5 && anda <= 0.3 };
  },
  'abdominal-declinado-pernas-presas': (q, corpo) => {
    // a pele das pernas encosta nos quatro rolos (atrás dos joelhos e na frente dos tornozelos), amassando até 1,5 cm
    const b = bancoDoDeclinado(corpo);
    const R = rolosDoDeclinado(b);
    const folgas = q
      .filter((_, i) => i % 6 === 0)
      .map((x) => {
        const pele = pontosDoBoneco(x.esq).filter((y) => y.parte === 'coxa' || y.parte === 'canela' || y.parte === 'pe');
        return R.map((r) => {
          const lo = Math.min(r.a[0], r.b[0]),
            hi = Math.max(r.a[0], r.b[0]);
          return menor(pele.filter((y) => y.p[0] >= lo && y.p[0] <= hi).map((y) => Math.hypot(y.p[1] - r.a[1], y.p[2] - r.a[2]) - r.r));
        });
      });
    const [a, c] = faixa(folgas.flat());
    return { medido: `a pele das pernas fica de ${f1(a)} a ${f1(c)} cm dos quatro rolos (negativo = amassa)`, ok: a >= -1.5 && c <= 0.5 };
  },
};
