// Regras medidas dos exercícios pendurados pelas mãos (barra fixa pronada e supinada, elevação de joelhos na barra e
// nas paralelas: núcleo ../exercicios/pendurado.ts). Cada uma recebe os quadros do começo até o fim da primeira fase
// com movimento. O limite vem do que a ficha da técnica pede, não do que a pose deu.
//
// As mãos não entram em `contatos` (lá, `mao.X` mede o punho, que gira em volta da barra quando o braço dobra): o que
// fica parado é o centro da pegada, no eixo da barra, e é isso que `pendurado-maos-na-barra` mede. As marcas que o
// quadro precisa dar: `barra.R`, `barra.L` (o centro de cada pegada), `raio` (x = raio da barra) e os eixos das barras
// (`eixo.a`–`eixo.b`, ou `eixo.R.a`–`eixo.R.b` e `eixo.L.a`–`eixo.L.b` nas paralelas).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS, poseEmPe, resolver, sinal } from '../esqueleto';
import type { Esq } from '../esqueleto';
import { centroDeMassa } from '../movimento';
import type { Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { angulo, dist, dot, mul, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a),
    ap = sub(p, a);
  const t = Math.max(0, Math.min(1, dot(ap, ab) / dot(ab, ab)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** Os eixos das barras do quadro (uma barra fixa, ou as duas paralelas). */
function eixos(q: Quadro): [V3, V3][] {
  const m = q.marcas;
  if (m['eixo.a'] && m['eixo.b']) return [[m['eixo.a'], m['eixo.b']]];
  return LADOS.map((k) => [m[`eixo.${k}.a`]!, m[`eixo.${k}.b`]!] as [V3, V3]);
}
/** A menor folga (cm) entre a pele das partes escolhidas e a superfície das barras (negativa = entra na barra). */
function folgaDaBarra(q: Quadro, quais: (parte: string) => boolean): { folga: number; parte: string } {
  const r = q.marcas.raio![0];
  let folga = 1e9,
    qual = '';
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if (!quais(parte)) continue;
    for (const [a, b] of eixos(q)) {
      const d = aoSegmento(p, a, b) - r;
      if (d < folga) {
        folga = d;
        qual = parte;
      }
    }
  }
  return { folga, parte: qual };
}
/** A distância (cm), ao longo do tronco, do alto do ombro (a ponta da clavícula) à base do crânio: pequena = ombro na orelha. */
const ombroAOrelha = (e: Esq) => Math.min(...LADOS.map((k) => paraRef(e.torax, e.cabeca.o)[1] - paraRef(e.torax, e.lado[k].acromioclavicular)[1]));
const EM_PE = new WeakMap<Corpo, number>();
function ombroAOrelhaEmPe(corpo: Corpo): number {
  let d = EM_PE.get(corpo);
  if (d === undefined) {
    d = ombroAOrelha(resolver(corpo, poseEmPe(corpo)));
    EM_PE.set(corpo, d);
  }
  return d;
}
/** O polegar no mundo (o eixo da pegada) e quanto ele aponta para o meio do corpo (1 = todo para dentro). */
const polegarParaDentro = (e: Esq, k: 'R' | 'L') => dot(mul(e.lado[k].mao.x, sinal(k)), [-sinal(k), 0, 0]);
const larguraDaPegada = (e: Esq, corpo: Corpo) => dist(e.lado.R.pegada, e.lado.L.pegada) / corpo.m('largura.biacromial');
/** A inclinação da bacia para trás em relação ao tórax (graus, de lado): cresce quando a pelve enrola. */
const pelveParaTras = (e: Esq) => angulo([0, e.pelve.y[1], e.pelve.y[2]], [0, e.torax.y[1], e.torax.y[2]]) * (e.pelve.y[2] - e.torax.y[2] < 0 ? 1 : -1);
const bracoDoChao = (e: Esq) => angulo(sub(e.lado.R.cotovelo, e.lado.R.ombro), mul(e.torax.y, -1));
/** O cotovelo direito no referencial do tórax (origem em C7–T1, na coluna): quanto fica abaixo do ombro, para o lado e à frente. */
function cotoveloNoTronco(e: Esq) {
  const l = paraRef(e.torax, e.lado.R.cotovelo),
    o = paraRef(e.torax, e.lado.R.ombro);
  const peito = e.corpo.m('prof.peito');
  const abaixo = o[1] - l[1];
  return { l, abaixo, peito, texto: `o cotovelo fica ${f1(abaixo)} cm abaixo do ombro, ${f1(Math.abs(l[0]))} cm do meio do corpo e ${f1(Math.abs(l[2]))} cm ${l[2] >= 0 ? 'à frente' : 'atrás'} da linha da coluna (o peito tem ${f1(peito)} cm de fundo); o braço fica a ${f1(bracoDoChao(e))}° da linha do tronco` };
}
const pegadaDe = (pronada: boolean): Regra => (q, corpo) => {
  const dentro = Math.min(...q.flatMap((x) => LADOS.map((k) => (pronada ? 1 : -1) * polegarParaDentro(x.esq, k))));
  const larg = larguraDaPegada(primeiro(q).esq, corpo);
  const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.pronacao));
  const [lo, hi] = pronada ? [1, 1.5] : [0.9, 1.2];
  return {
    medido: `o polegar aponta para ${pronada ? 'dentro (palmas para a frente)' : 'fora (palmas para você)'} com no mínimo ${f1(dentro * 100)}% do comprimento; as mãos ficam a ${f1(larg)} vez a largura dos ombros (${f1(dist(primeiro(q).esq.lado.R.pegada, primeiro(q).esq.lado.L.pegada))} cm de centro a centro); o antebraço fica de ${f1(a)}° a ${f1(b)}° (0° = supinado, 180° = pronado)`,
    ok: dentro >= 0.8 && larg >= lo - 0.01 && larg <= hi + 0.01,
  };
};

export const regrasDoPendurado: Record<string, Regra> = {
  'pendurado-maos-na-barra': (q) => {
    const d = q.flatMap((x) => LADOS.map((k) => dist(x.esq.lado[k].pegada, x.marcas[`barra.${k}`]!)));
    const fecha = q.every((x) => LADOS.every((k) => x.esq.lado[k].formaMao === 'pegada' && Math.abs(x.esq.lado[k].diamMao - 2 * x.marcas.raio![0]) < 0.05));
    const anda = Math.max(...q.flatMap((x) => LADOS.map((k) => dist(x.marcas[`barra.${k}`]!, primeiro(q).marcas[`barra.${k}`]!))));
    const [, pior] = faixa(d);
    return { medido: `o centro da pegada fica a no máximo ${f1(pior)} cm do eixo da barra, ${fecha ? 'com a mão fechada no diâmetro dela' : 'SEM a mão fechada no diâmetro da barra'}; a pegada anda ${f1(anda)} cm no ciclo`, ok: pior <= 0.5 && fecha && anda <= 0.1 };
  },
  'pendurado-nao-atravessa-a-barra': (q) => {
    let pior = { folga: 1e9, parte: '' };
    q.forEach((x, i) => {
      if (i % 3 && i !== q.length - 1) return;
      const r = folgaDaBarra(x, (p) => p !== 'mao' && p !== 'polegar');
      if (r.folga < pior.folga) pior = r;
    });
    return { medido: `fora as mãos, a pele fica a no mínimo ${f1(pior.folga)} cm da superfície da barra (${pior.parte})`, ok: pior.folga >= 0 };
  },
  'pendurado-sem-balanco': (q) => {
    const d = q.map((x) => centroDeMassa(x.esq, 'homem', x.cargas)[2] - x.marcas['barra.R']![2]);
    const [a, b] = faixa(d);
    return { medido: `o centro de massa fica de ${f1(a)} a ${f1(b)} cm da vertical das mãos (para a frente ou para trás)`, ok: Math.max(-a, b) <= 1.5 };
  },
  'pendurado-bracos-estendidos': (q) => {
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `o cotovelo dobra de ${f1(a)}° a ${f1(b)}° o ciclo inteiro`, ok: b <= 15 };
  },
  'pendurado-ombros-firmes': (q, corpo) => {
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.claviculaElev));
    const d = Math.min(...q.map((x) => ombroAOrelha(x.esq)));
    const pe = ombroAOrelhaEmPe(corpo);
    return { medido: `a clavícula fica de ${f1(a)}° a ${f1(b)}° de elevação; o alto do ombro fica a no mínimo ${f1(d)} cm da base do crânio, ao longo do tronco (em pé, parado: ${f1(pe)} cm)`, ok: b - a <= 2 && d >= pe - 1 };
  },
  'pendurado-joelhos-acima-do-quadril': (q) => {
    const L = ultimo(q).esq.lado.R;
    const d = L.joelho[1] - L.quadril[1];
    return { medido: `no topo, o centro do joelho fica ${f1(Math.abs(d))} cm ${d >= 0 ? 'acima' : 'abaixo'} do centro do quadril`, ok: d >= 0 };
  },
  'pendurado-pelve-enrola': (q) => {
    const a = pelveParaTras(primeiro(q).esq),
      b = pelveParaTras(ultimo(q).esq);
    const l0 = primeiro(q).esq.pose.lombar ?? 0,
      l1 = ultimo(q).esq.pose.lombar ?? 0;
    return { medido: `do começo ao topo, a bacia gira ${f1(b - a)}° para trás em relação ao tórax, e a lombar dobra ${f1(l1 - l0)}° (a pelve enrola)`, ok: b - a >= 15 && l1 - l0 >= 15 };
  },
  'pendurado-pernas-estendidas-embaixo': (q) => {
    const j = primeiro(q).esq.lado.R.ang.joelho;
    return { medido: `embaixo, o joelho dobra ${f1(j)}°`, ok: j <= 20 };
  },
  // ----- barra fixa -----
  'barra-fixa-pegada-pronada': pegadaDe(true),
  'barra-fixa-pegada-supinada': pegadaDe(false),
  'barra-fixa-bracos-estendidos-embaixo': (q) => {
    const c = primeiro(q).esq.lado.R.ang.cotovelo;
    return { medido: `embaixo, o cotovelo dobra ${f1(c)}°`, ok: c <= 15 };
  },
  'barra-fixa-escapulas-descem-primeiro': (q) => {
    const c0 = primeiro(q).esq.lado.R.ang.cotovelo,
      e0 = ombroAOrelha(primeiro(q).esq);
    const i = q.findIndex((x) => x.esq.lado.R.ang.cotovelo > c0 + 10);
    const x = q[i < 0 ? q.length - 1 : i]!;
    const desce = ombroAOrelha(x.esq) - e0,
      total = Math.max(...q.map((y) => ombroAOrelha(y.esq))) - e0;
    const sobe = x.esq.pelve.o[1] - primeiro(q).esq.pelve.o[1];
    return { medido: `quando o cotovelo começa a dobrar (10° além do de baixo), o ombro já desceu ${f1(desce)} cm de ${f1(total)} cm (longe da orelha, ao longo do tronco) e o corpo já subiu ${f1(sobe)} cm`, ok: desce >= 2 && sobe >= 2 };
  },
  'barra-fixa-queixo-acima-da-barra': (q) => {
    const x = ultimo(q);
    const r = x.marcas.raio![0];
    const topoDaBarra = x.marcas['barra.R']![1] + r;
    const qx = x.marcas.queixo![1] - topoDaBarra;
    const peito = folgaDaBarra(x, (p) => p === 'tronco').folga;
    return { medido: `no topo, o queixo fica ${f1(Math.abs(qx))} cm ${qx >= 0 ? 'acima' : 'abaixo'} do alto da barra e o peito a ${f1(peito)} cm dela`, ok: qx >= 0 && peito <= 12 };
  },
  'barra-fixa-ombros-longe-das-orelhas': (q, corpo) => {
    const pe = ombroAOrelhaEmPe(corpo);
    const a = ombroAOrelha(primeiro(q).esq),
      b = ombroAOrelha(ultimo(q).esq);
    return { medido: `do alto do ombro à base do crânio, ao longo do tronco: ${f1(a)} cm pendurado e ${f1(b)} cm no topo (em pé, parado: ${f1(pe)} cm)`, ok: b >= pe - 1 && a >= 0.5 * pe };
  },
  'barra-fixa-cotovelos-ao-lado-das-costelas': (q) => {
    // para baixo (abaixo do ombro) e para os lados das costelas (entre as costas e a frente do peito, no tronco)
    const e = ultimo(q).esq;
    const c = cotoveloNoTronco(e);
    return { medido: `no topo, ${c.texto}`, ok: c.abaixo >= 8 && c.l[2] >= -3 && c.l[2] <= c.peito };
  },
  'barra-fixa-cotovelos-a-frente': (q) => {
    // supinada: para baixo e à frente do corpo, rentes às costelas (mais à frente e mais perto do meio que na pronada)
    const e = ultimo(q).esq;
    const c = cotoveloNoTronco(e);
    const ombro = Math.abs(paraRef(e.torax, e.lado.R.ombro)[0]);
    return { medido: `no topo, ${c.texto} (o centro do ombro fica a ${f1(ombro)} cm do meio do corpo)`, ok: c.abaixo >= 8 && c.l[2] >= c.peito * 0.5 && Math.abs(c.l[0]) <= ombro + 12 };
  },
};
