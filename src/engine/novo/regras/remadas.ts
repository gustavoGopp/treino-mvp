// Regras medidas das remadas com peso livre (núcleo ../exercicios/remada.ts): a unilateral no banco, a sem banco, a
// com kettlebell, a curvada com dois halteres e a apoiada no banco inclinado. Cada uma recebe os quadros do começo até o
// fim da primeira fase com movimento. O limite vem do que a ficha da técnica pede, não do que a pose deu.
// A lombar neutra, a mão de apoio parada, as escápulas que se juntam e a pegada neutra já existem (../conferir.ts e
// ./suspensao.ts) e são usadas como estão.
import { pontosDoBoneco } from '../boneco';
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Prim } from '../desenho';
import { formaDoKettlebell } from '../equipamento';
import type { Esq } from '../esqueleto';
import type { Quadro } from '../movimento';
import type { Peca } from '../pecas';
import { angulo, comb, dist, dot, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { partesDoHalter, regraDePintura } from './ordem-de-pintura';
import type { ParteDaPeca } from './ordem-de-pintura';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
const rad = Math.PI / 180;
/** Inclinação do peito à frente da vertical (graus). */
const peito = (e: Esq) => Math.atan2(e.torax.y[2], e.torax.y[1]) / rad;
/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** As cargas do quadro: as cabeças do halter (prismas) e a bola do kettlebell (esfera). */
const cargasDo = (q: Quadro) => q.prims.filter((p): p is Extract<Prim, { t: 'prisma' }> | Extract<Prim, { t: 'esfera' }> => p.t === 'prisma' || p.t === 'esfera');
/** Distância de um ponto à superfície de uma carga (negativa = dentro). */
function aCarga(p: V3, c: ReturnType<typeof cargasDo>[number]): number {
  if (c.t === 'prisma') return aoSegmento(p, c.a, c.b) - c.ra;
  return dist(p, c.c) - c.r;
}
/** Quanto um ponto entra numa caixa (cm; negativo = fora). */
function dentroDaCaixa(p: V3, c: Extract<Prim, { t: 'caixa' }>): number {
  const l = paraRef(c.ref, p);
  return Math.min(c.meias[0] - Math.abs(l[0]), c.meias[1] - Math.abs(l[1]), c.meias[2] - Math.abs(l[2]));
}
/** A projeção de um ponto na linha do ombro (0) ao quadril (1) do lado direito. */
function naLinhaDoTronco(e: Esq, p: V3): number {
  const o = e.lado.R.ombro,
    h = e.lado.R.quadril;
  const d = sub(h, o);
  return dot(sub(p, o), d) / dot(d, d);
}

export const regrasDasRemadas: Record<string, Regra> = {
  'tronco-parado-na-remada': (q) => {
    const a = primeiro(q).esq;
    const anda = Math.max(...q.map((x) => Math.max(dist(x.esq.torax.o, a.torax.o), dist(x.esq.pelve.o, a.pelve.o))));
    const gira = Math.max(...q.map((x) => Math.max(angulo(x.esq.torax.x, a.torax.x), angulo(x.esq.torax.y, a.torax.y))));
    return { medido: `a base do pescoço e a bacia andam no máximo ${f1(anda)} cm e o tórax gira no máximo ${f1(gira)}°`, ok: anda <= 0.5 && gira <= 1 };
  },
  'costas-quase-paralelas-ao-chao': (q) => {
    const p = peito(primeiro(q).esq);
    return { medido: `o peito fica a ${f1(90 - p)}° da horizontal`, ok: p >= 65 && p <= 85 };
  },
  'tronco-bem-inclinado': (q) => {
    const p = peito(primeiro(q).esq);
    return { medido: `o peito fica a ${f1(p)}° da vertical (${f1(90 - p)}° da horizontal)`, ok: p >= 45 && p <= 85 };
  },
  'cotovelo-passa-as-costas': (q) => {
    // no tronco: o cotovelo fica atrás do plano das costas (a pele das costas, na altura do cotovelo)
    const e = ultimo(q).esq;
    const l = paraRef(e.torax, e.lado.R.cotovelo);
    const costas = -e.corpo.m('prof.peito') * 0.3;
    return { medido: `no fim, o centro do cotovelo fica ${f1(Math.abs(costas - l[2]))} cm ${l[2] <= costas ? 'além' : 'antes'} da linha das costas`, ok: l[2] <= costas };
  },
  'cotovelo-rente-na-remada': (q) => {
    const pior = Math.max(...q.map((x) => {
      const L = x.esq.lado.R;
      const b = norm(sub(L.cotovelo, L.ombro));
      return Math.asin(Math.min(1, Math.abs(dot(b, x.esq.torax.x)))) / rad;
    }));
    return { medido: `o braço se afasta no máximo ${f1(pior)}° do lado do tronco`, ok: pior <= 30 };
  },
  'carga-perto-do-quadril-no-fim': (q) => {
    const e = ultimo(q).esq;
    const t = naLinhaDoTronco(e, e.lado.R.pegada);
    return { medido: `no fim, a mão fica a ${f1(t * 100)}% do caminho do ombro ao quadril, ao longo do tronco`, ok: t >= 0.5 && t <= 1.2 };
  },
  'braco-estendido-no-comeco': (q) => {
    const c = primeiro(q).esq.lado.R.ang.cotovelo;
    return { medido: `no começo, o cotovelo dobra ${f1(c)}°`, ok: c <= 15 };
  },
  'carga-livre-do-corpo-e-do-banco': (q) => {
    // a carga contra a pele (fora as mãos, que seguram) e contra as caixas da cena (o banco); a cada 2 quadros
    let corpo = 1e9,
      banco = 1e9;
    for (const x of q.filter((_, i) => i % 2 === 0 || i === q.length - 1)) {
      const cargas = cargasDo(x);
      const P = pontosDoBoneco(x.esq).filter((p) => p.parte !== 'mao' && p.parte !== 'polegar');
      for (const c of cargas) {
        for (const { p } of P) corpo = Math.min(corpo, aCarga(p, c));
        for (const cx of x.prims) {
          if (cx.t !== 'caixa') continue;
          // os pontos da carga: o centro e as pontas (prisma) ou o centro (esfera), medidos com o raio
          const pts = c.t === 'prisma' ? [c.a, c.b] : [c.c];
          const r = c.t === 'prisma' ? c.ra : c.r;
          for (const p of pts) banco = Math.min(banco, -dentroDaCaixa(p, cx) - r);
        }
      }
    }
    const temBanco = banco < 1e8;
    return { medido: `a carga fica a no mínimo ${f1(corpo)} cm da pele${temBanco ? ` e ${f1(banco)} cm das peças da cena` : ''}`, ok: corpo >= 0 && (!temBanco || banco >= 0.3) };
  },
  'pe-da-carga-atras': (q) => {
    const e = primeiro(q).esq;
    const d = e.lado.L.tornozelo[2] - e.lado.R.tornozelo[2];
    return { medido: `o tornozelo do lado da carga (direito) fica ${f1(Math.abs(d))} cm ${d >= 0 ? 'atrás' : 'à frente'} do outro`, ok: d >= 25 };
  },
  'mao-de-apoio-na-coxa': (q) => {
    // a palma da mão esquerda contra a pele da coxa esquerda, e onde ela fica ao longo da coxa
    const e = primeiro(q).esq;
    const P = pontosDoBoneco(e);
    const mao = P.filter((x) => x.parte === 'mao' && dist(x.p, e.lado.L.pegada) < 12).map((x) => x.p);
    const coxa = P.filter((x) => x.parte === 'coxa' && x.p[0] > 0).map((x) => x.p);
    let min = 1e9;
    for (const a of mao) for (const b of coxa) min = Math.min(min, dist(a, b));
    const L = e.lado.L;
    const d = sub(L.joelho, L.quadril);
    const t = dot(sub(L.pegada, L.quadril), d) / dot(d, d);
    return { medido: `a mão fica a ${f1(min)} cm da pele da coxa da frente, a ${f1(t * 100)}% do caminho do quadril ao joelho`, ok: min <= 1.5 && t >= 0.4 && t <= 1 };
  },
  'mao-e-joelho-no-banco': (q) => {
    // a superfície da mão e a do joelho de apoio contra o tampo do banco; a mão na vertical do ombro
    const x = primeiro(q);
    const topo = x.marcas.topoDoBanco![1];
    let mao = 1e9,
      joelho = 1e9;
    for (const { p, parte } of pontosDoBoneco(x.esq)) {
      if (parte === 'mao' && dist(p, x.esq.lado.L.punho) < 25) mao = Math.min(mao, p[1]);
      if ((parte === 'coxa' || parte === 'canela') && dist(p, x.esq.lado.L.joelho) < 30 && p[0] > 0) joelho = Math.min(joelho, p[1]);
    }
    const L = x.esq.lado.L;
    const meioDaMao = L.pegada;
    const soOmbro = Math.hypot(meioDaMao[2] - L.ombro[2], meioDaMao[0] - L.ombro[0]);
    return { medido: `a mão fica de ${f1(mao - topo)} cm e o joelho ${f1(joelho - topo)} cm do tampo do banco; o meio da mão fica a ${f1(soOmbro)} cm da vertical do ombro`, ok: Math.abs(mao - topo) <= 1.5 && Math.abs(joelho - topo) <= 1.5 && soOmbro <= 8 };
  },
  'remada-sem-banco-carga-ao-lado-do-quadril': (q) => {
    // Correção de 19/11/2026 (o halter "puxando pra dentro do próprio corpo"): no fim da puxada, o centro da pegada (o
    // meio do halter, a alça do kettlebell) fica ao lado do quadril, e não embaixo da barriga. Medido contra o centro do
    // quadril do lado que puxa: de frente para trás no chão (até 5 cm, metade do raio da bacia de lado) e na altura (até
    // 10 cm). Até a correção, a mão terminava 9,9 cm à frente do quadril e 7,2 cm abaixo dele: de lado e de três
    // quartos, a carga ficava na frente da virilha e da coxa.
    const e = ultimo(q).esq;
    const R = e.lado.R;
    const dz = R.pegada[2] - R.quadril[2],
      dy = R.pegada[1] - R.quadril[1];
    return { medido: `no fim, o centro da pegada fica ${f1(Math.abs(dz))} cm ${dz >= 0 ? 'à frente' : 'atrás'} do centro do quadril e ${f1(Math.abs(dy))} cm ${dy >= 0 ? 'acima' : 'abaixo'} dele`, ok: Math.abs(dz) <= 5 && Math.abs(dy) <= 10 };
  },
  'remada-carga-pintada-no-lugar': (q, corpo, ex) => {
    // A carga das remadas (as cabeças e o cabo do halter; a bola, as hastes e a barra da alça do kettlebell) contra o
    // corpo, nos dois lados, em cada vista do guia (correção de 19/11/2026): de três quartos, na remada com kettlebell, a
    // bola fica na frente da coxa de trás, mas era pintada atrás dela (o item do corpo, pela média do tronco, vinha
    // depois), e parecia entrar na coxa. As mãos fecham no cabo ou na alça e não contam.
    if (!ex) return { medido: 'a regra precisa do exercício (a conferência o passa)', ok: false };
    return regraDePintura({ exercicio: () => ex, nome: 'a carga', fora: ['mao', 'polegar'], peca: pecasDaCarga })(q, corpo, ex);
  },
};

/** As cargas de um quadro das remadas, com as partes que a regra de pintura mede (na ordem em que a peça as desenha). */
export function pecasDaCarga(q: Quadro): { peca: Peca; partes: ParteDaPeca[] }[] {
  const out: { peca: Peca; partes: ParteDaPeca[] }[] = [];
  for (const p of q.pecas ?? []) {
    if (p.t === 'halter') out.push({ peca: p, partes: partesDoHalter(p) });
    else if (p.t === 'kettlebell') out.push({ peca: p, partes: partesDoKettlebell(p) });
  }
  return out;
}
/** As partes do kettlebell, na ordem em que o desenho realista as pinta: a bola, as duas hastes e a barra da alça. */
export function partesDoKettlebell(p: Extract<Peca, { t: 'kettlebell' }>): ParteDaPeca[] {
  const K = formaDoKettlebell();
  const u = norm(p.cima),
    l = norm(p.lado);
  const P = (h: number, x = 0): V3 => comb([1, p.base], [h, u], [x, l]);
  const alto = K.altura - K.rAlca,
    pe = K.centro + Math.sqrt(Math.max(0, K.R * K.R - K.meiaAlca * K.meiaAlca)) - 1;
  const haste = (s: number, i: number): ParteDaPeca => ({ eixo: [P(pe, s * K.meiaAlca), P(alto, s * K.meiaAlca)], raio: K.rAlca, itens: [i] });
  return [{ eixo: [P(K.centro)], raio: K.R, itens: [0] }, haste(-1, 1), haste(1, 2), { eixo: [P(alto, -K.meiaAlca - K.rAlca * 0.6), P(alto, K.meiaAlca + K.rAlca * 0.6)], raio: K.rAlca, itens: [3] }];
}
