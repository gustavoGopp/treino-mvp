// Regras medidas dos exercícios de quadril: abdução e adução deitado de lado (sem carga e com caneleira) e abdução
// sentado com mini band. Quem trabalha é sempre a perna direita (deitado: a de cima na abdução, a de baixo na adução).
// Marcas que os quadros dão: `piso` (y = o tampo onde o corpo deita), `pePeloChao` (o pé que fica no chão, na adução).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq, Lado } from '../esqueleto';
import type { Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { angulo, dist, dot, sub } from '../vec';
import type { V3 } from '../vec';

const piso = (q: Quadro) => q.marcas.piso?.[1] ?? 0;

/** Distância entre dois segmentos (amostrada; basta para comparar com os raios dos membros). */
function distSeg(a0: V3, a1: V3, b0: V3, b1: V3): number {
  let d = 1e9;
  const N = 16;
  for (let i = 0; i <= N; i++) {
    const p: V3 = [a0[0] + ((a1[0] - a0[0]) * i) / N, a0[1] + ((a1[1] - a0[1]) * i) / N, a0[2] + ((a1[2] - a0[2]) * i) / N];
    const u = sub(b1, b0),
      L2 = dot(u, u);
    const t = Math.max(0, Math.min(1, dot(sub(p, b0), u) / L2));
    d = Math.min(d, dist(p, [b0[0] + u[0] * t, b0[1] + u[1] * t, b0[2] + u[2] * t]));
  }
  return d;
}
/** A folga entre as duas pernas (cm): a menor distância entre os eixos menos os raios (coxa e perna, da tabela). */
export function folgaEntreAsPernas(e: Esq, c: Corpo): number {
  const R = e.lado.R,
    L = e.lado.L;
  // a coxa perto do joelho e a perna (a parte que pode encostar na outra perna); o alto das coxas fica de fora
  const meio = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const doLado = (X: Esq['lado'][Lado]) => [
    [meio(X.quadril, X.joelho, 0.45), X.joelho, c.m('raio.coxaBaixa')] as [V3, V3, number],
    [X.joelho, X.tornozelo, c.m('raio.panturrilha')] as [V3, V3, number],
  ];
  let min = 1e9;
  for (const a of doLado(R)) for (const b of doLado(L)) min = Math.min(min, distSeg(a[0], a[1], b[0], b[1]) - a[2] - b[2]);
  return min;
}

/** Os pontos mais baixos do tronco perto da bacia e perto do peito, e a folga entre a cabeça e o braço de baixo. */
function apoioDeLado(e: Esq, baixo: Lado) {
  const eixo = sub(e.torax.o, e.pelve.o),
    L2 = dot(eixo, eixo);
  const s = (p: V3) => dot(sub(p, e.pelve.o), eixo) / L2;
  let bacia = 1e9,
    peito = 1e9,
    todo = 1e9;
  const pts = pontosDoBoneco(e);
  const braco = pts.filter((x) => (x.parte === 'braco' || x.parte === 'ante') && dist(x.p, e.lado[baixo].cotovelo) < 40 && dist(x.p, e.lado[baixo].ombro) > 6);
  let cabeca = 1e9;
  for (const { p, parte } of pts) {
    todo = Math.min(todo, p[1]);
    if (['tronco', 'cintura', 'emendaDaCintura', 'pelve'].includes(parte)) {
      if (s(p) < 0.25) bacia = Math.min(bacia, p[1]);
      if (s(p) > 0.6) peito = Math.min(peito, p[1]);
    }
    if (parte === 'cabeca') for (const b of braco) if (Math.abs(b.p[2] - p[2]) < 2 && Math.abs(b.p[0] - p[0]) < 2.5) cabeca = Math.min(cabeca, p[1] - b.p[1]);
  }
  return { bacia, peito, todo, cabeca };
}

export const regrasDoQuadril: Record<string, Regra> = {
  'quadril-deitado-de-lado-no-chao': (q) => {
    const baixo: Lado = q[0]!.esq.pelve.x[1] < 0 ? 'L' : 'R';
    const ms = [q[0]!, q[q.length - 1]!].map((x) => ({ ...apoioDeLado(x.esq, baixo), y: piso(x) }));
    const bacia = faixa(ms.map((m) => m.bacia - m.y)),
      peito = faixa(ms.map((m) => m.peito - m.y)),
      cabeca = faixa(ms.map((m) => m.cabeca)),
      todo = Math.min(...ms.map((m) => m.todo - m.y));
    const deLado = q.every((x) => Math.abs(x.esq.pelve.x[1]) > 0.95);
    return {
      medido: `${deLado ? 'deitado de lado' : 'NÃO está de lado'}; a bacia fica de ${f1(bacia[0])} a ${f1(bacia[1])} cm do piso, o peito de ${f1(peito[0])} a ${f1(peito[1])} cm; a cabeça fica de ${f1(cabeca[0])} a ${f1(cabeca[1])} cm do braço de baixo; o ponto mais baixo do corpo, ${f1(todo)} cm`,
      ok: deLado && bacia[0] >= -1.5 && bacia[1] <= 1 && peito[0] >= -1.5 && peito[1] <= 2 && cabeca[0] >= -1.5 && cabeca[1] <= 1.5 && todo >= -1.5,
    };
  },
  'quadril-empilhado': (q) => {
    // a bacia de lado (o eixo dos quadris na vertical), parada; a coluna não dobra no ciclo
    const pior = Math.max(...q.map((x) => angulo(x.esq.pelve.x, [0, x.esq.pelve.x[1] > 0 ? 1 : -1, 0])));
    const anda = Math.max(...q.map((x) => dist(x.esq.pelve.o, q[0]!.esq.pelve.o)));
    const torax = Math.max(...q.map((x) => angulo(x.esq.torax.y, q[0]!.esq.torax.y)));
    return { medido: `o eixo dos quadris fica a no máximo ${f1(pior)}° da vertical; a bacia anda ${f1(anda)} cm e o peito gira ${f1(torax)}° no ciclo`, ok: pior <= 3 && anda <= 0.5 && torax <= 2 };
  },
  'quadril-perna-um-pouco-atras': (q) => {
    const [a, b] = faixa(q.map((x) => -angulosDoLado(x.esq, 'R').quadril));
    const joelho = Math.max(...q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    return { medido: `a perna de cima fica de ${f1(a)}° a ${f1(b)}° atrás da linha do corpo, com o joelho dobrado no máximo ${f1(joelho)}°`, ok: a >= 3 && b <= 20 && joelho <= 5 };
  },
  'quadril-dedos-para-a-frente': (q) => {
    // os dedos do pé que sobe contra a frente da bacia (para o teto seria 90°)
    const pior = Math.max(...q.map((x) => angulo(x.esq.lado.R.pe.z, x.esq.pelve.z)));
    return { medido: `os dedos do pé que sobe ficam a no máximo ${f1(pior)}° da direção da frente do corpo`, ok: pior <= 25 };
  },
  'quadril-abducao-sem-passar-de-45': (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').abducaoDoQuadril));
    return { medido: `a perna de cima abre de ${f1(a)}° a ${f1(b)}°`, ok: b >= 25 && b <= 45 && a <= 5 };
  },
  'quadril-pernas-sem-se-atravessar': (q, corpo) => {
    const f = Math.min(...q.map((x) => folgaEntreAsPernas(x.esq, corpo)));
    return { medido: `a menor folga entre as duas pernas (do meio da coxa ao tornozelo) é de ${f1(f)} cm`, ok: f >= -1 };
  },
  'quadril-aducao-curso-curto': (q) => {
    const [a, b] = faixa(q.map((x) => -angulosDoLado(x.esq, 'R').abducaoDoQuadril));
    const sobe = Math.max(...q.map((x) => x.esq.lado.R.tornozelo[1])) - Math.min(...q.map((x) => x.esq.lado.R.tornozelo[1]));
    const joelho = Math.max(...q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    return { medido: `a perna de baixo fecha de ${f1(a)}° a ${f1(b)}° (o tornozelo sobe ${f1(sobe)} cm), estendida (joelho dobrado no máximo ${f1(joelho)}°)`, ok: b - a >= 10 && b - a <= 30 && joelho <= 5 };
  },
  'quadril-perna-de-baixo-nao-descansa': (q) => {
    // embaixo, a perna de baixo fica a um dedo do piso, sem encostar
    const x = q[0]!;
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(x.esq))
      if ((parte === 'canela' || parte === 'pe' || parte === 'coxa') && dist(p, x.esq.lado.R.tornozelo) < dist(p, x.esq.lado.L.tornozelo) && dist(p, x.esq.lado.R.quadril) > 20) min = Math.min(min, p[1]);
    const folga = min - piso(x);
    return { medido: `embaixo, a perna de baixo fica a ${f1(folga)} cm do piso`, ok: folga >= 0.5 && folga <= 3 };
  },
  'quadril-pe-de-cima-no-chao-a-frente': (q) => {
    const x = q[0]!,
      L = x.esq.lado.L;
    const frente = dot(sub(L.bola, x.esq.lado.R.joelho), x.esq.pelve.z);
    const sola = Math.max(...q.map((y) => Math.max(y.esq.lado.L.calcanhar[1], y.esq.lado.L.bola[1]) - piso(y)));
    return { medido: `o pé de cima apoia no piso (calcanhar e bola a no máximo ${f1(sola)} cm dele), ${f1(frente)} cm à frente do joelho de baixo`, ok: sola <= 0.5 && frente >= 5 };
  },
  'quadril-tronco-parado': (q) => {
    const pts = q.map((x) => x.esq.torax.o);
    const anda = Math.max(...pts.map((p) => dist(p, pts[0]!)));
    return { medido: `a base do pescoço anda no máximo ${f1(anda)} cm no ciclo`, ok: anda <= 1 };
  },
};
