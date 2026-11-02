// @ts-nocheck
// R4: músculos com forma anatômica simplificada, presos aos ossos do esqueleto, para os estilos A e B.
// Cada forma segue a origem e a inserção do músculo (fonte em docs/pesquisa/animacoes/r4-estilo-do-boneco.md,
// seção 3). O contorno exato é simplificação de design: o objetivo é reconhecer o músculo, não um atlas.
// Um músculo só aparece se a face dele estiver virada para quem olha (o bíceps não aparece na vista de trás).
import { CTX } from '../contexto';
import { f1, push } from '../desenho';
import { scapPts } from '../esqueleto';
import { add, comb, dot, len, mul, norm, sub } from '../math';

const lerp = (a, b, t) => add(a, mul(sub(b, a), t));

/** Caminho fechado suave (Catmull-Rom) pelos pontos já projetados. */
export function caminhoSuave(Q) {
  const n = Q.length;
  let d = `M${f1(Q[0][0])},${f1(Q[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = Q[(i - 1 + n) % n],
      p1 = Q[i],
      p2 = Q[(i + 1) % n],
      p3 = Q[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
      c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f1(c1[0])},${f1(c1[1])} ${f1(c2[0])},${f1(c2[1])} ${f1(p2[0])},${f1(p2[1])}`;
  }
  return d + 'Z';
}

/**
 * Fuso ao longo de um osso (a → b), desenhado já na tela: a largura é medida na tela, para o músculo não sumir
 * quando o membro aponta para quem olha. `fora` puxa o fuso para a face do músculo, sem passar da borda do membro
 * (raio r). Meia-largura máxima w.
 */
function fuso2(a, b, fora, w, r, t0 = 0.08, t1 = 0.92, n = 8) {
  const A = CTX.PJ(lerp(a, b, t0)),
    Bp = CTX.PJ(lerp(a, b, t1));
  const dx = Bp[0] - A[0],
    dy = Bp[1] - A[1],
    l = Math.hypot(dx, dy) || 1;
  const px = -dy / l,
    py = dx / l;
  const F = CTX.PJ(fora);
  let fx = F[0],
    fy = F[1];
  const fl = Math.hypot(fx, fy),
    lim = Math.max(0, r - w); // a borda do fuso encosta na borda do membro, sem sair dele
  if (fl > lim) {
    fx *= lim / fl;
    fy *= lim / fl;
  }
  const ida = [],
    volta = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n,
      u = Math.pow(Math.sin(Math.PI * t), 0.7);
    const cx = A[0] + dx * t + fx,
      cy = A[1] + dy * t + fy;
    ida.push([cx + px * w * u, cy + py * w * u]);
    volta.unshift([cx - px * w * u, cy - py * w * u]);
  }
  return [...ida, ...volta.slice(1, -1)];
}

// eixos do braço e da coxa (os mesmos critérios de MUS.biceps e MUS.quads em ../desenho.ts)
function eixoBraco(sk, k) {
  const sd = sk.side[k];
  let an = sub(sd.fa, mul(sd.uad, dot(sd.fa, sd.uad)));
  an = len(an) < 0.15 ? sk.fT : norm(an);
  return { sd, an };
}
function eixoCoxa(sk, k) {
  const sd = sk.side[k];
  const t = norm(sub(sd.K, sd.Hp)),
    sh = norm(sub(sd.A, sd.K));
  // frente da coxa: oposta à perna (canela) quando o joelho dobra; com o joelho quase reto, a frente do quadril
  const p = sub(sh, mul(t, dot(sh, t)));
  const dobra = Math.min(1, len(p) / 0.5);
  let fq = sub(sk.fL, mul(t, dot(sk.fL, t)));
  fq = len(fq) < 0.1 ? sk.uL : norm(fq);
  const frente = norm(add(mul(len(p) < 1e-6 ? fq : norm(p), -dobra), mul(fq, 1 - dobra)));
  let med = mul(sk.xL, -sd.s);
  med = norm(sub(med, mul(t, dot(med, t))));
  return { sd, t, frente, med };
}

// Cada músculo devolve { p: pontos 3D do contorno, n: normal da face visível, host: parte do corpo }.
export const FORMAS = {
  // Grande dorsal: origem nos processos espinhosos de T7 a L5, fáscia toracolombar, crista ilíaca e últimas costelas;
  // inserção no sulco intertubercular do úmero. Leque do quadril/lombar até a axila.
  dorsal(sk, k) {
    const sd = sk.side[k],
      s = sd.s,
      { N, M, P, uT, fT, xT, uL, fL, xL } = sk;
    const sc = scapPts(sk, k);
    return {
      host: 'tronco',
      n: norm(comb(1, mul(fT, -1), s * 0.35, xT)),
      p: [
        comb(1, sd.S, 0.2, sub(sd.E, sd.S), -1, fT, s * -1.5, xT),
        comb(1, sd.S, 0.14, sub(sd.E, sd.S), -3.5, fT, s * -2.5, xT),
        comb(1, sc[2], s * 2.5, xT, -1, uT),
        comb(1, N, s * 2, xT, -15, uT, -8, fT),
        comb(1, M, s * 2, xT, -2, uT, -8.5, fT),
        comb(1, P, s * 2, xL, 3, uL, -8.5, fL),
        comb(1, P, s * 11, xL, 9, uL, -4, fL),
        comb(1, M, s * 14.5, xT, 2, uT, 0, fT),
        comb(1, N, s * 15.5, xT, -10, uT, 0, fT),
      ],
    };
  },
  // Redondo maior: origem no ângulo inferior da escápula; inserção na crista do tubérculo menor do úmero.
  redondoMaior(sk, k) {
    const sd = sk.side[k],
      { uT, fT, xT } = sk,
      s = sd.s;
    const sc = scapPts(sk, k);
    const ins = comb(1, sd.S, 0.17, sub(sd.E, sd.S), -1.5, fT);
    const borda = lerp(sc[2], sc[1], 0.3); // borda lateral da escápula, perto do ângulo inferior
    return {
      host: 'tronco',
      n: norm(comb(1, mul(fT, -1), s * 0.35, xT)),
      p: [comb(1, sc[2], -0.8, uT, -0.4, fT), comb(1, borda, s * 0.5, xT, -0.4, fT), comb(1, ins, 2, uT), comb(1, ins, -1.8, uT)],
    };
  },

  // Romboides (maior e menor): origem nos processos espinhosos de C7 a T5; inserção na borda medial da escápula.
  romboides(sk, k) {
    const s = sk.side[k].s,
      { N, uT, fT, xT } = sk;
    const sc = scapPts(sk, k);
    return {
      host: 'tronco',
      n: mul(fT, -1),
      p: [comb(1, N, s * 1.5, xT, -2, uT, -7.6, fT), comb(1, sc[0], 0.5, uT), comb(1, sc[2], s * 1, xT), comb(1, N, s * 1.5, xT, -17, uT, -7.6, fT)],
    };
  },
  // Trapézio médio: origem nos processos espinhosos de C7 a T4 (as fontes divergem em uma vértebra); inserção no acrômio e na espinha da escápula.
  trapMedio(sk, k) {
    const sd = sk.side[k],
      s = sd.s,
      { N, uT, fT, xT } = sk;
    const sc = scapPts(sk, k);
    const acr = comb(1, sd.S, 1.5, uT, -3, fT, s * -2, xT); // acrômio
    return {
      host: 'tronco',
      n: mul(fT, -1),
      p: [comb(1, N, s * 1, xT, 1, uT, -7.5, fT), acr, comb(1, acr, -3, uT, s * -1, xT), comb(1, sc[0], -1, uT), comb(1, N, s * 1, xT, -8, uT, -7.7, fT)],
    };
  },

  // Trapézio inferior: origem nos processos espinhosos de T4/T6 a T12 (as fontes divergem); inserção na parte medial da espinha da escápula.
  trapInferior(sk, k) {
    const s = sk.side[k].s,
      { N, M, uT, fT, xT } = sk;
    const sc = scapPts(sk, k);
    return {
      host: 'tronco',
      n: mul(fT, -1),
      p: [comb(1, sc[0], -1, uT, s * 1, xT, -0.4, fT), comb(1, sc[0], -4.5, uT, s * -0.5, xT, -0.4, fT), comb(1, M, s * 1, xT, 2, uT, -8, fT), comb(1, N, s * 1, xT, -9, uT, -7.8, fT)],
    };
  },

  // Deltoide posterior: origem na espinha da escápula; inserção na tuberosidade deltoidea do úmero.
  deltPost(sk, k) {
    const { sd, an } = eixoBraco(sk, k);
    const tras = mul(an, -1);
    const a = comb(1, sd.S, 1.5, sk.uT, -2, sk.fT, sd.s * -3, sk.xT),
      b = lerp(sd.S, sd.E, 0.48);
    return { host: 'braco', n: norm(add(tras, mul(sk.fT, -0.6))), q: fuso2(a, b, mul(tras, 3), 3.6, 5, 0, 0.9) };
  },
  // Bíceps braquial: origem no processo coracoide e no tubérculo supraglenoidal; inserção na tuberosidade do rádio.
  biceps(sk, k) {
    const { sd, an } = eixoBraco(sk, k);
    return { host: 'braco', n: an, q: fuso2(sd.S, sd.E, mul(an, 3), 3.2, 4.5, 0.14, 0.9) };
  },
  // Quadríceps: reto femoral na espinha ilíaca anteroinferior e vastos no fêmur; inserção comum na patela e na tíbia.
  quadriceps(sk, k) {
    const { sd, frente, med } = eixoCoxa(sk, k);
    const lat = mul(med, -1); // a normal pende um pouco para fora: a coxa de longe fica escondida na vista de lado
    return { host: 'perna', n: norm(add(frente, mul(lat, 0.35))), q: fuso2(sd.Hp, sd.K, mul(frente, 4), 4.8, 7, 0.06, 0.95) };
  },
  // Adutores (longo, curto e magno): origem no púbis e no ísquio; inserção na linha áspera do fêmur (o magno até o
  // tubérculo adutor). Face interna da coxa.
  adutores(sk, k) {
    const { sd, med, frente } = eixoCoxa(sk, k);
    const pub = comb(1, sk.P, sd.s * 3, sk.xL, -5, sk.uL, 1, sk.fL);
    const f = mul(med, 5.6);
    return {
      host: 'perna',
      n: norm(add(med, mul(frente, 0.25))),
      p: [pub, add(lerp(sd.Hp, sd.K, 0.25), add(f, mul(frente, 3))), add(lerp(sd.Hp, sd.K, 0.85), add(mul(med, 4.5), mul(frente, 1))), add(lerp(sd.Hp, sd.K, 0.55), add(f, mul(frente, -3.5))), comb(1, sk.P, sd.s * 3, sk.xL, -6, sk.uL, -4, sk.fL)],
    };
  },
  // Glúteo máximo: origem no ílio posterior, sacro e cóccix; inserção na tuberosidade glútea do fêmur e no trato iliotibial.
  gluteos(sk, k) {
    const sd = sk.side[k],
      s = sd.s,
      { P, uL, fL, xL } = sk;
    const fe = lerp(sd.Hp, sd.K, 0.28);
    return {
      host: 'perna',
      n: norm(comb(1, mul(fL, -1), s * 0.55, xL)),
      p: [comb(1, P, s * 1.5, xL, 5, uL, -9.5, fL), comb(1, P, s * 11.5, xL, 7, uL, -6.5, fL), comb(1, P, s * 15.5, xL, -1, uL, -4, fL), add(fe, comb(s * 6, xL, -3, fL)), add(fe, comb(s * 1, xL, -6.5, fL)), comb(1, P, s * 1.5, xL, -6, uL, -10, fL)],
    };
  },
};

// Os músculos de cada exercício do experimento (decisão do Gustavo em 02/11/2026: todos, na vista de trás da puxada).
// Principal em vermelho, secundários em laranja. A ordem é do mais profundo para o mais superficial.
export const LISTA = {
  'puxada-unilateral': [
    ['romboides', 'R', 's'],
    ['redondoMaior', 'R', 'p'],
    ['dorsal', 'R', 'p'],
    ['trapMedio', 'R', 's'],
    ['trapInferior', 'R', 's'],
    ['deltPost', 'R', 's'],
    ['biceps', 'R', 's'],
  ],
  goblet: [
    ['adutores', 'RL', 's'],
    ['gluteos', 'RL', 's'],
    ['quadriceps', 'RL', 'p'],
  ],
};

export function musculosNovos(ex, sk, partes, estilo) {
  const lista = LISTA[ex.id];
  if (!lista) return false;
  for (const [id, lados, tipo] of lista) {
    for (const k of lados === 'RL' ? ['R', 'L'] : [lados]) {
      const m = FORMAS[id](sk, k);
      if (CTX.PJ(m.n)[2] < -0.25) continue; // face virada para o outro lado
      const d = m.host === 'tronco' ? partes.tronco : partes[m.host][k]; // por cima da parte, por baixo do que está na frente
      push(1, d, `<path d="${caminhoSuave(m.q ?? m.p.map(CTX.PJ))}" class="e${estilo}-m${tipo}" stroke-width="${estilo === 'a' ? 0.9 : 0.8}"/>`);
    }
  }
  return true;
}
