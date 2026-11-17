// Regras medidas das panturrilhas em pé (no chão, no degrau da escada e no step) e da sentada com halter. Os alvos
// que vêm da ficha do movimento (a altura do calcanhar em cima e embaixo, a superfície do apoio) chegam pelas marcas
// do quadro: `apoioDosPes` (y = a superfície onde a bola do pé pisa), `calcanharEmCima` e `calcanharEmbaixo` (y = a
// altura pedida do calcanhar), `maoNoApoioR` e `maoNoApoioL` (a pegada da mão que só equilibra).
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { centroDeMassa } from '../movimento';
import { dist, dot, norm, sub } from '../vec';

export const regrasDasPanturrilhas: Record<string, Regra> = {
  'joelhos-estendidos-na-panturrilha': (q) => {
    const j = q.map((x) => angulosDoLado(x.esq, 'R').joelho);
    const [a, b] = faixa(j);
    return { medido: `o joelho de apoio dobra de ${f1(a)}° a ${f1(b)}° no ciclo`, ok: b <= 10 && b - a <= 3 };
  },
  'calcanhar-sobe-o-maximo': (q) => {
    // o quadro com o calcanhar mais alto (a primeira fase com movimento pode ser a subida ou a descida)
    const fim = q.reduce((a, x) => (x.esq.lado.R.calcanhar[1] > a.esq.lado.R.calcanhar[1] ? x : a));
    const sobe = fim.esq.lado.R.calcanhar[1] - fim.marcas.apoioDosPes![1],
      pede = fim.marcas.calcanharEmCima![1] - fim.marcas.apoioDosPes![1];
    return { medido: `em cima, o calcanhar fica ${f1(sobe)} cm acima do apoio (a ficha: ${f1(pede)} cm)`, ok: Math.abs(sobe - pede) <= 0.5 };
  },
  'calcanhar-abaixo-da-beirada': (q) => {
    // o quadro com o calcanhar mais baixo
    const ini = q.reduce((a, x) => (x.esq.lado.R.calcanhar[1] < a.esq.lado.R.calcanhar[1] ? x : a));
    const desce = ini.marcas.apoioDosPes![1] - ini.esq.lado.R.calcanhar[1],
      pede = ini.marcas.apoioDosPes![1] - ini.marcas.calcanharEmbaixo![1];
    return { medido: `embaixo, o calcanhar fica ${f1(desce)} cm abaixo da beirada (a ficha: ${f1(pede)} cm)`, ok: desce >= 2 && Math.abs(desce - pede) <= 0.5 };
  },
  'peso-sobre-a-bola-do-pe': (q) => {
    const d = q.map((x) => centroDeMassa(x.esq, 'homem', x.cargas)[2] - x.esq.lado.R.bola[2]);
    const [a, b] = faixa(d);
    const cab = faixa(q.map((x) => x.esq.cabeca.o[2]));
    return { medido: `o centro de massa (corpo + carga) fica de ${f1(a)} a ${f1(b)} cm da vertical da bola do pé; a cabeça anda ${f1(cab[1] - cab[0])} cm para a frente ou para trás na subida`, ok: Math.max(-a, b) <= 1 && cab[1] - cab[0] <= 2 };
  },
  'joelhos-a-90-sentado': (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    return { medido: `o joelho dobra de ${f1(a)}° a ${f1(b)}° no ciclo`, ok: a >= 80 && b <= 100 };
  },
  'halter-sobre-a-coxa-perto-do-joelho': (q) => {
    // o centro do halter: quanto fica do joelho, ao longo da coxa, e quanto fica acima do eixo da coxa (do lado da
    // frente da coxa, que sentado fica para cima)
    const d = q.map((x) => {
      const L = x.esq.lado.R;
      const v = sub(x.marcas.halter!, L.joelho);
      const eixo = norm(sub(L.joelho, L.quadril));
      return { ao: -dot(v, eixo), acima: dot(v, L.coxa.z) };
    });
    const [a, b] = faixa(d.map((x) => x.ao));
    const [c, e] = faixa(d.map((x) => x.acima));
    return { medido: `o centro do halter fica de ${f1(a)} a ${f1(b)} cm do joelho, ao longo da coxa, e de ${f1(c)} a ${f1(e)} cm acima do eixo da coxa`, ok: b <= 20 && c > 0 };
  },
  'maos-paradas-no-apoio': (q) => {
    const nomes = (['maoNoApoioR', 'maoNoApoioL'] as const).filter((k) => q[0]!.marcas[k]);
    const anda = Math.max(...nomes.map((k) => Math.max(...q.map((x) => dist(x.marcas[k]!, q[0]!.marcas[k]!)))));
    return { medido: `a mão que equilibra anda no máximo ${f1(anda)} cm no ciclo`, ok: nomes.length > 0 && anda <= 0.1 };
  },
};
