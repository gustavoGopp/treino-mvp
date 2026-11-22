// Regras medidas da caminhada lateral com mini band. Cada uma recebe os quadros do começo até o fim da primeira fase
// com movimento (o pé direito dá o passo para o lado; o esquerdo fica no chão).
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { angulo, dist } from '../vec';

export const REGRAS_CAMINHADA_LATERAL: Record<string, Regra> = {
  'caminhada-meio-agachado': (q) => {
    // os joelhos das pernas apoiadas (a que está no ar dobra mais, para o pé subir)
    const joelhos = faixa(q.flatMap((x) => (['R', 'L'] as const).filter((k) => x.esq.lado[k].bola[1] <= 0.05).map((k) => angulosDoLado(x.esq, k).joelho)));
    const quadril = faixa(q.map((x) => angulosDoLado(x.esq, 'L').quadril));
    const frente = faixa(q.map((x) => angulo([0, x.esq.torax.y[1], x.esq.torax.y[2]], [0, 1, 0])));
    // para o lado: o eixo do peito, de lado a lado, contra a horizontal
    const lado = Math.max(...q.map((x) => Math.abs(Math.asin(x.esq.torax.x[1]) / (Math.PI / 180))));
    return {
      medido: `os joelhos das pernas apoiadas dobram de ${f1(joelhos[0])}° a ${f1(joelhos[1])}°, o quadril de ${f1(quadril[0])}° a ${f1(quadril[1])}°; o peito inclina ${f1(frente[0])}° a ${f1(frente[1])}° à frente e no máximo ${f1(lado)}° para o lado`,
      ok: joelhos[0] >= 15 && joelhos[1] <= 50 && quadril[0] >= 15 && frente[1] <= 25 && lado <= 2,
    };
  },
  'caminhada-dedos-para-a-frente': (q) => {
    const pior = Math.max(...q.flatMap((x) => (['R', 'L'] as const).map((k) => angulo([x.esq.lado[k].pe.z[0], 0, x.esq.lado[k].pe.z[2]], [0, 0, 1]))));
    return { medido: `os dedos dos dois pés ficam a no máximo ${f1(pior)}° da frente`, ok: pior <= 10 };
  },
  'caminhada-passo-alem-do-quadril': (q) => {
    const ini = q[0]!.esq,
      fim = q[q.length - 1]!.esq;
    const largura = (e: typeof ini) => Math.abs(e.lado.R.bola[0] - e.lado.L.bola[0]);
    const quadris = dist(ini.lado.R.quadril, ini.lado.L.quadril);
    const parado = Math.max(...q.map((x) => dist(x.esq.lado.L.bola, ini.lado.L.bola)));
    const noAr = Math.max(...q.map((x) => x.esq.lado.R.bola[1]));
    return {
      medido: `os pés vão de ${f1(largura(ini))} cm a ${f1(largura(fim))} cm um do outro (os quadris a ${f1(quadris)} cm); o pé que dá o passo sobe ${f1(noAr)} cm; o outro anda ${f1(parado)} cm`,
      ok: Math.abs(largura(ini) - quadris) <= 5 && largura(fim) >= quadris + 15 && parado <= 0.1 && noAr >= 1,
    };
  },
};
