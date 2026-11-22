// Regras medidas da abdução de quadril em pé (../exercicios/abducao-elastico.ts): o tronco reto, a perna de fora que sobe
// pouco, o peso sobre o pé de apoio, a mão na parede e o elástico em volta do tornozelo. Cada uma recebe os quadros do
// começo até o fim da primeira fase com movimento. O limite vem do que a ficha da técnica e o cartão pedem.
// Os dedos para a frente e as pernas que não se atravessam já existem (./quadril-abrir-e-fechar.ts); o elástico pisado
// no meio da sola e livre do corpo, também (./elasticos.ts).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { centroDeMassa } from '../movimento';
import { dist, dot, norm, sub } from '../vec';

const graus = (x: number) => (Math.asin(Math.max(-1, Math.min(1, x))) * 180) / Math.PI;

export const REGRAS_ABDUCAO_EM_PE: Record<string, Regra> = {
  'abducao-em-pe-tronco-reto': (q) => {
    // a bacia não sobe (o eixo dos quadris na horizontal) nem gira (a frente dela para a frente); o tronco não inclina
    // para o lado (o eixo do tórax sem desvio de lado)
    const sobe = Math.max(...q.map((x) => Math.abs(graus(x.esq.pelve.x[1]))));
    const gira = Math.max(...q.map((x) => Math.abs(graus(x.esq.pelve.z[0]))));
    const inclina = Math.max(...q.map((x) => Math.abs(graus(x.esq.torax.y[0]))));
    return { medido: `a bacia sobe no máximo ${f1(sobe)}° de um lado e gira ${f1(gira)}°; o tronco inclina no máximo ${f1(inclina)}° para o lado`, ok: sobe <= 2 && gira <= 2 && inclina <= 3 };
  },
  'abducao-em-pe-perna-sobe-pouco': (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').abducaoDoQuadril));
    const joelho = Math.max(...q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    return { medido: `a perna de fora abre de ${f1(a)}° a ${f1(b)}°, com o joelho dobrado no máximo ${f1(joelho)}°`, ok: a <= 8 && b >= 15 && b <= 45 && joelho <= 10 };
  },
  'abducao-em-pe-peso-no-pe-de-apoio': (q) => {
    // o centro de massa, no chão, dentro do pé esquerdo: do calcanhar à ponta (0 a 1) e para o lado (cm do eixo do pé)
    const ts: number[] = [],
      ls: number[] = [];
    for (const x of q) {
      const L = x.esq.lado.L;
      const cm = centroDeMassa(x.esq, 'homem', x.cargas);
      const eixo = sub(L.ponta, L.calcanhar);
      eixo[1] = 0;
      const v = sub(cm, L.calcanhar);
      v[1] = 0;
      const t = dot(v, eixo) / dot(eixo, eixo);
      const lado = norm([eixo[2], 0, -eixo[0]]);
      ts.push(t);
      ls.push(dot(v, lado));
    }
    const [a, b] = faixa(ts),
      [c, d] = faixa(ls);
    const meia = q[0]!.esq.corpo.m('pe.largura') / 2;
    return { medido: `o centro de massa fica de ${f1(a * 100)}% a ${f1(b * 100)}% do caminho do calcanhar à ponta do pé de apoio e de ${f1(c)} a ${f1(d)} cm do eixo dele (meia largura do pé: ${f1(meia)} cm)`, ok: a >= 0.15 && b <= 0.85 && Math.max(Math.abs(c), Math.abs(d)) <= meia };
  },
  'abducao-em-pe-mao-na-parede': (q) => {
    // a palma da mão esquerda contra a face da parede (a marca `parede` dá o x da face)
    const folgas = q.map((x) => {
      const xp = x.marcas.parede![0];
      const mao = pontosDoBoneco(x.esq).filter((p) => p.parte === 'mao' && dist(p.p, x.esq.lado.L.punho) < 14);
      return xp - Math.max(...mao.map((p) => p.p[0]));
    });
    const [a, b] = faixa(folgas);
    return { medido: `a mão fica de ${f1(a)} a ${f1(b)} cm da parede (negativo = entra nela)`, ok: a >= -1 && b <= 1.5 };
  },
  'abducao-em-pe-elastico-no-tornozelo': (q) => {
    // o meio da volta (a marca `laco`) logo acima do tornozelo de fora, ao longo da canela, e a faixa assentada na pele
    const alturas = q.map((x) => {
      const R = x.esq.lado.R;
      return dot(sub(x.marcas.laco!, R.tornozelo), norm(sub(R.joelho, R.tornozelo)));
    });
    const folgas = q.map((x) => x.marcas.lacoRaio![0] - x.marcas.lacoRaio![1]);
    const [a, b] = faixa(alturas),
      [c, d] = faixa(folgas);
    return { medido: `a volta do elástico fica ${f1(a)}–${f1(b)} cm acima do centro do tornozelo, a ${f1(c)}–${f1(d)} cm do eixo além da pele`, ok: a >= 1 && b <= 8 && c >= 0 && d <= 1.5 };
  },
};
