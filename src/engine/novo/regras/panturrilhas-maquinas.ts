// Regras medidas das panturrilhas nas máquinas de panturrilha (em pé, ../exercicios/panturrilha-em-pe-maquina.ts, e
// sentada, ../exercicios/panturrilha-sentada.ts). Recebem os quadros do começo até o fim da primeira fase com
// movimento. O limite vem do que a ficha da técnica e o cartão pedem, não do que a pose deu. O calcanhar, os joelhos e o
// equilíbrio são medidos pelas regras das panturrilhas aprovadas (./panturrilhas.ts).
//
// Marcas que os quadros dão: `almofada` (o meio da face de baixo da almofada) e `normalAlmofada` (para cima, saindo
// dela); `pegadorR` e `pegadorL` (onde a mão fecha); `braco` ou `alavanca` (x: o ângulo agora; y: o da posição inicial;
// z: o raio do came, na em pé) e `pilha` (x: quanto as placas subiram, na em pé); na sentada, `anilhas` (o centro das
// anilhas no pino).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS } from '../esqueleto';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { dist, dot, sub } from '../vec';

const rad = Math.PI / 180;
const ge = (id: string) => obj('panturrilhaEmPe', id);
const gs = (id: string) => obj('panturrilhaSentada', id);
/** De 3 em 3 quadros e o último (a pele do Boneco custa caro). */
const amostra = (q: Quadro[]) => q.filter((_, i) => i % 3 === 0 || i === q.length - 1);

/**
 * A folga da pele contra a face de baixo de uma almofada (negativa: afunda no estofado), em cada lado do corpo, só sob a
 * almofada: `meia` (o meio de cada almofada, de lado; 0 = uma almofada só, no meio), `larg` e `comp` (o tamanho dela).
 */
function folgas(q: Quadro, partes: string[], meia: number, larg: number, comp: number, ao: (q: Quadro) => number[]): Record<'R' | 'L', number> {
  const A = q.marcas.almofada!,
    n = q.marcas.normalAlmofada!,
    a = ao(q) as [number, number, number];
  const out = { R: 1e9, L: 1e9 };
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if (!partes.includes(parte)) continue;
    const v = sub(p, A);
    if (Math.abs(Math.abs(p[0]) - meia) > larg / 2 || Math.abs(dot(v, a)) > comp / 2) continue;
    const k = p[0] < 0 ? 'R' : 'L';
    out[k] = Math.min(out[k], -dot(v, n));
  }
  return out;
}

export const REGRAS_PANTURRILHAS_MAQUINAS: Record<string, Regra> = {
  'ombros-sob-as-almofadas': (q) => {
    // a folga do alto dos ombros (o maior ponto da pele debaixo de cada almofada) contra a face de baixo dela
    const f: number[] = [];
    for (const x of amostra(q)) {
      const n = x.marcas.normalAlmofada!;
      const frente = (): number[] => [0, n[2], -n[1]];
      const c = folgas(x, ['tronco', 'pescoco', 'braco'], ge('ombreirasEntre') / 2, ge('ombreiraLarg'), ge('ombreiraComp'), frente);
      f.push(c.R, c.L);
    }
    const [a, b] = faixa(f);
    // as almofadas andam com os ombros: o quanto a base do pescoço anda, ao longo do braço da máquina, em relação a elas
    const anda = faixa(q.map((x) => x.esq.torax.o[2] - x.marcas.almofada![2]));
    return {
      medido: `o alto dos ombros fica de ${f1(-b)} a ${f1(-a)} cm para dentro da face de baixo das almofadas (afunda o estofado), nos dois lados e em todos os quadros; de frente para trás, a base do pescoço anda ${f1(anda[1] - anda[0])} cm debaixo delas`,
      ok: a >= -2.5 && b <= 0.5 && anda[1] - anda[0] <= 2,
    };
  },
  'maos-nos-pegadores-da-maquina': (q) => {
    const d = Math.max(...q.flatMap((x) => LADOS.map((k) => dist(x.esq.lado[k].pegada, x.marcas[k === 'R' ? 'pegadorR' : 'pegadorL']!))));
    return { medido: `a mão fica a até ${f1(d)} cm do centro do pegador, que anda com a máquina`, ok: d <= 0.5 };
  },
  'placas-sobem-com-as-almofadas': (q) => {
    // a pilha sobe o arco do came (o raio vezes o quanto o braço subiu desde a posição inicial)
    const erro = Math.max(...q.map((x) => Math.abs(x.marcas.pilha![0] - Math.max(0, x.marcas.braco![0] - x.marcas.braco![1]) * rad * x.marcas.braco![2])));
    const folga = Math.min(...q.map((x) => x.marcas.braco![0] - x.marcas.braco![1]));
    const y = q.map((x) => x.marcas.almofada![1]),
      p = q.map((x) => x.marcas.pilha![0]);
    const iBaixo = y.indexOf(Math.min(...y)),
      iAlto = y.indexOf(Math.max(...y));
    return {
      medido: `com as almofadas no ponto mais baixo, as placas ficam ${f1(p[iBaixo]!)} cm acima do repouso; no mais alto, ${f1(p[iAlto]!)} cm; o braço fica no mínimo ${f1(folga)}° acima da posição inicial; a subida difere do arco do came em até ${f1(erro)} cm`,
      ok: erro <= 0.1 && folga > 0 && p[iAlto]! > p[iBaixo]! + 1,
    };
  },
  'almofada-nas-coxas-perto-do-joelho': (q) => {
    // a almofada encosta nas duas coxas, perto do joelho, e fica no mesmo lugar delas
    const f: number[] = [];
    for (const x of amostra(q)) {
      const c = folgas(x, ['coxa'], 0, gs('almofadaLarg'), gs('almofadaComp'), (y) => y.marcas.almofadaAo!);
      f.push(c.R, c.L);
    }
    const [a, b] = faixa(f);
    const doJoelho = q.map((x) => {
      const L = x.esq.lado.R;
      return dot(sub(L.joelho, x.marcas.almofada!), x.marcas.almofadaAo!);
    });
    const [c, d] = faixa(doJoelho);
    return {
      medido: `as coxas ficam de ${f1(-b)} a ${f1(-a)} cm para dentro da face de baixo da almofada (afundam o estofado); o meio da almofada fica de ${f1(c)} a ${f1(d)} cm atrás do centro do joelho, ao longo da coxa`,
      ok: a >= -2.5 && b <= 0.5 && c >= 0 && d <= 15 && d - c <= 1,
    };
  },
  'anilhas-sobem-com-a-alavanca': (q) => {
    // as anilhas, no pino da alavanca, sobem quando o calcanhar sobe (e o joelho com ele)
    const y = q.map((x) => x.esq.lado.R.calcanhar[1]),
      a = q.map((x) => x.marcas.anilhas![1]);
    const iBaixo = y.indexOf(Math.min(...y)),
      iAlto = y.indexOf(Math.max(...y));
    const folga = Math.min(...q.map((x) => x.marcas.alavanca![0] - x.marcas.alavanca![1]));
    return {
      medido: `do calcanhar mais baixo ao mais alto, as anilhas sobem ${f1(a[iAlto]! - a[iBaixo]!)} cm; a alavanca fica no mínimo ${f1(folga)}° acima do batente (a trava aberta)`,
      ok: a[iAlto]! - a[iBaixo]! >= 2 && folga > 0,
    };
  },
};
