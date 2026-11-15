// A base das remadas de um braço sem banco (com halter e com kettlebell): pés afastados, um à frente do outro (o pé
// esquerdo à frente; o direito, do lado da carga, atrás), o tronco inclinado à frente com a coluna neutra e a mão
// esquerda espalmada na coxa da frente. O braço direito puxa (núcleo ./remada.ts).
//
// A pose parada sai das medidas: a inclinação do peito é a da ficha; cada pé anda para a frente ou para trás até o
// joelho dele ficar no ângulo da ficha; a altura do quadril é a que dá o passo da ficha (de um tornozelo ao outro); a
// mão encosta na pele da coxa da frente no ponto em que o cotovelo de apoio fica no ângulo da ficha (`resolver1`).
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Corpo } from '../tabelas';
import { chao } from '../pecas';
import { add, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import type { BaseDaRemada } from './remada';

/** O ponto da superfície da frente da coxa esquerda a `t` do quadril ao joelho (0 a 1) e a normal da pele ali. */
export function peleDaCoxa(e: Esq, t: number): { p: V3; n: V3 } {
  const L = e.lado.L;
  const eixo = sub(L.joelho, L.quadril),
    comp = Math.hypot(...eixo);
  const u = mul(eixo, 1 / comp);
  const c = add(L.quadril, mul(eixo, t));
  // a frente da coxa (o lado do quadríceps), virada um pouco para fora: é onde a mão apoia
  const n = norm(add(L.coxa.z, mul(L.coxa.x, 0.15)));
  let r = 0;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'coxa' || p[0] < 0) continue;
    const d = sub(p, c);
    if (Math.abs(dot(d, u)) > 2.5) continue;
    r = Math.max(r, dot(d, n));
  }
  return { p: add(c, mul(n, r)), n };
}

export function baseSemBanco(corpo: Corpo, f: (id: string) => number): BaseDaRemada {
  const m = (id: string) => corpo.m(id);
  const peito = f('tronco.inclinacao');
  const tronco = (y: number): PoseTronco => ({ pelve: [0, y, 0], frente: peito, cervical: f('cervical'), cabeca: f('cabeca') });
  const semBraco: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const xPe = m('quadril.meiaDistancia') + f('pes.paraFora');
  // o pé de trás com o calcanhar um pouco levantado (a bola do pé no chão)
  const calc = (s: number) => (s < 0 ? f('pe.tras.calcanhar') : 0);
  const perna = (s: number, z: number): PosePerna => ({ pe: { bola: [s * xPe, 0, z], dir: norm([s * 0.15, 0, 1]), calc: calc(s) }, polo: norm([s * 0.12, 0, 1]) });
  const hM = m('altura.maleolo'),
    dBola = m('pe.calcanharABola') - m('pe.calcanharAoTornozelo');
  /** Do tornozelo à bola do pé, em altura e para a frente, com o calcanhar levantado `c` graus. */
  const tornozeloNoPe = (c: number) => {
    const a = (c * Math.PI) / 180;
    return { alto: hM * Math.cos(a) + dBola * Math.sin(a), frente: dBola * Math.cos(a) - hM * Math.sin(a) };
  };
  /** O corpo com o quadril a `y` cm (cada pé no lugar em que o joelho dele fica no ângulo da ficha) e a mão a `naCoxa`. */
  function montar(y: number, naCoxa = 0.7) {
    const t = resolverTronco(corpo, tronco(y));
    // o tornozelo fica à distância do quadril que o ângulo do joelho dá (lei dos cossenos); o pé, apoiado, à frente
    // dele (à frente, o pé vai para a frente; atrás, para trás)
    const hor = (joelho: number, c: number) => {
      const th = m('coxa.comp'),
        sk = m('perna.comp'),
        a = (joelho * Math.PI) / 180;
      const d = Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos(a));
      return Math.sqrt(Math.max(0, d * d - (y - tornozeloNoPe(c).alto) ** 2 - (xPe - m('quadril.meiaDistancia')) ** 2));
    };
    const zL = hor(f('joelho.frente'), 0) + tornozeloNoPe(0).frente,
      zR = -hor(f('joelho.tras'), calc(-1)) + tornozeloNoPe(calc(-1)).frente;
    const pernas = { R: perna(-1, zR), L: perna(1, zL) };
    let e = resolverMembros(t, { R: semBraco, L: semBraco }, pernas);
    // a mão espalmada na coxa da frente: o meio da palma na pele, os dedos para o joelho, o polegar para dentro
    let apoio: PoseBraco = semBraco;
    for (let i = 0; i < 3; i++) {
      const P = peleDaCoxa(e, naCoxa);
      const dedos = norm(sub(e.lado.L.joelho, e.lado.L.quadril));
      const punho = sub(add(P.p, mul(P.n, m('raio.punho') * 0.85)), mul(dedos, m('mao.palma') * 0.45));
      apoio = { punho, polo: norm([1, 0.2, -0.6]), mao: { polegar: [-1, 0, 0], dedos, forma: 'aberta' } };
      e = resolverMembros(t, { R: semBraco, L: apoio }, pernas);
    }
    return { e, pernas, apoio, passo: e.lado.L.tornozelo[2] - e.lado.R.tornozelo[2] };
  }
  // a altura do quadril sai do passo (a distância de um tornozelo ao outro, com os joelhos nos ângulos da ficha); o
  // ponto da coxa em que a mão apoia, do cotovelo de apoio quase estendido
  const teto = Math.min(...[f('joelho.frente'), f('joelho.tras')].map((j) => Math.sqrt(m('coxa.comp') ** 2 + m('perna.comp') ** 2 + 2 * m('coxa.comp') * m('perna.comp') * Math.cos((j * Math.PI) / 180)))) + hM - 0.5;
  const y = resolver1((x) => montar(x).passo - f('pes.passo'), 50, teto, 26);
  // (quando a mão não alcança, a falta conta como cotovelo "negativo": a função continua a crescer de um lado ao outro)
  const naCoxa = resolver1((t) => {
    const L = montar(y, t).e.lado.L;
    return L.ang.cotovelo - 10 * L.falta.braco - f('apoio.cotovelo');
  }, 0.3, 1, 20);
  const M = montar(y, naCoxa);
  return { tronco: tronco(y), pernas: M.pernas, apoio: M.apoio, prims: [chao(-80, 80, -110, 110)], pecas: [], marcas: { maoDeApoio: M.apoio.punho! } };
}
