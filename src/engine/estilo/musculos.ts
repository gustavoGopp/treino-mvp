// @ts-nocheck
// R4: músculos com forma anatômica simplificada, presos aos ossos do esqueleto, para os estilos A e B.
// Cada forma segue a origem e a inserção do músculo (fonte em docs/pesquisa/animacoes/r4-estilo-do-boneco.md,
// seção 3). O contorno exato é simplificação de design: o objetivo é reconhecer o músculo, não um atlas.
// Um músculo só aparece se a face dele estiver virada para quem olha (o bíceps não aparece na vista de trás).
import { CTX } from '../contexto';
import { f1, isSide, push } from '../desenho';
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
  // Peitoral maior, parte clavicular: origem na metade medial da clavícula; inserção na crista do tubérculo maior do úmero.
  peitoralClav(sk, k) {
    const sd = sk.side[k],
      s = sd.s,
      { N, uT, fT, xT } = sk;
    const ins = comb(1, sd.S, 0.2, sub(sd.E, sd.S), 2.5, fT);
    return {
      host: 'tronco',
      n: norm(comb(1, fT, s * 0.3, xT)),
      p: [comb(1, N, s * 2, xT, -1.5, uT, 9, fT), comb(1, N, s * 11, xT, -1, uT, 8, fT), comb(1, ins, 1.5, uT), comb(1, ins, -1.5, uT), comb(1, N, s * 12, xT, -6, uT, 5, fT), comb(1, N, s * 3, xT, -7, uT, 10.5, fT)],
    };
  },
  // Peitoral maior, parte esternocostal: origem no esterno e nas cartilagens costais; inserção no úmero, com a clavicular.
  peitoralEst(sk, k) {
    const sd = sk.side[k],
      s = sd.s,
      { N, uT, fT, xT } = sk;
    const ins = comb(1, sd.S, 0.22, sub(sd.E, sd.S), 2, fT);
    return {
      host: 'tronco',
      n: norm(comb(1, fT, s * 0.3, xT)),
      p: [comb(1, N, s * 1.5, xT, -6.5, uT, 10.5, fT), comb(1, N, s * 10, xT, -6, uT, 10, fT), comb(1, ins, 1, uT), comb(1, ins, -2, uT), comb(1, N, s * 14, xT, -10, uT, 4, fT), comb(1, N, s * 11, xT, -18, uT, 8.5, fT), comb(1, N, s * 1.5, xT, -18.5, uT, 11, fT)],
    };
  },
  // Deltoide anterior: origem no terço lateral da clavícula; inserção na tuberosidade deltoidea do úmero.
  deltAnt(sk, k) {
    const { sd, an } = eixoBraco(sk, k);
    return { host: 'braco', n: norm(add(an, mul(sk.fT, 0.5))), q: fuso2(comb(1, sd.S, 1.5, sk.uT), lerp(sd.S, sd.E, 0.46), mul(an, 3), 3.6, 5, 0, 0.9) };
  },
  // Deltoide lateral: origem no acrômio; inserção na tuberosidade deltoidea do úmero.
  deltLat(sk, k) {
    const { sd } = eixoBraco(sk, k);
    let fora = mul(sk.xT, sd.s);
    fora = sub(fora, mul(sd.uad, dot(fora, sd.uad)));
    fora = len(fora) < 0.15 ? sk.uT : norm(fora);
    // a face do deltoide lateral olha para fora e para cima do ombro, com o braço em qualquer posição
    return { host: 'braco', n: norm(comb(sd.s, sk.xT, 0.6, sk.uT)), q: fuso2(comb(1, sd.S, 2, sk.uT), lerp(sd.S, sd.E, 0.46), mul(fora, 3), 3.8, 5, 0, 0.9) };
  },
  // Trapézio superior: origem no osso occipital, no ligamento da nuca e em C7; inserção no terço lateral da clavícula e no acrômio.
  trapSuperior(sk, k) {
    const sd = sk.side[k],
      s = sd.s,
      { N, Hc, uT, fT, xT, uN, fN, xN } = sk;
    return {
      host: 'tronco',
      n: norm(comb(1, uT, s * 0.5, xT, -0.2, fT)),
      p: [comb(1, Hc, -7.5, uN, -5, fN, s * 1.5, xN), comb(1, N, 1, uT, -6, fT, s * 1.5, xT), comb(1, N, -2, uT, -6.5, fT, s * 8, xT), comb(1, sd.S, 1.5, uT, -1.5, fT, s * -1.5, xT), comb(1, N, 4, uT, -2.5, fT, s * 5, xT)],
    };
  },
  // Tríceps braquial: origem no tubérculo infraglenoidal da escápula e na face posterior do úmero; inserção no olécrano.
  triceps(sk, k) {
    const { sd, an } = eixoBraco(sk, k);
    return { host: 'braco', n: mul(an, -1), q: fuso2(sd.S, sd.E, mul(an, -3), 3.3, 4.5, 0.12, 0.95) };
  },
  // Músculos do antebraço (flexores e extensores do punho e dos dedos): epicôndilos do úmero → ossos do carpo e dedos.
  antebraco(sk, k) {
    const sd = sk.side[k];
    return { host: 'braco', n: null, q: fuso2(sd.E, sd.W, [0, 0, 0], 2.8, 3.75, 0.05, 0.8) };
  },
  // Posteriores da coxa (bíceps femoral, semitendinoso, semimembranoso): origem na tuberosidade isquiática;
  // inserção na cabeça da fíbula e na tíbia, atrás do joelho.
  posteriores(sk, k) {
    const { sd, frente } = eixoCoxa(sk, k);
    return { host: 'perna', n: mul(frente, -1), q: fuso2(sd.Hp, sd.K, mul(frente, -4), 4.6, 7, 0.1, 0.95) };
  },
  // Tríceps sural (gastrocnêmio e sóleo): côndilos do fêmur e parte de trás da tíbia e da fíbula → calcâneo (tendão de Aquiles).
  panturrilha(sk, k) {
    const sd = sk.side[k];
    const sh = norm(sub(sd.A, sd.K)),
      fd = norm(sub(sd.toe, sd.A));
    let q = sub(fd, mul(sh, dot(fd, sh)));
    q = len(q) < 0.12 ? sk.fL : norm(q);
    return { host: 'perna', n: mul(q, -1), q: fuso2(sd.K, sd.A, mul(q, -3.5), 3.9, 5, 0.06, 0.7) };
  },
  // Eretores da espinha: do sacro e da crista ilíaca subindo ao lado da coluna até as costelas e as vértebras de cima.
  eretores(sk) {
    const { N, M, P, uT, fT, xT, uL, fL, xL } = sk;
    const lado = isSide();
    const fx = (base, h, uu, ff, xx, a, b) => comb(1, base, h, uu, a, xx, b, ff);
    const borda = lado
      ? [fx(P, 3, uL, fL, xL, 0, -11), fx(M, 0, uT, fT, xT, 0, -9.8), fx(N, -8, uT, fT, xT, 0, -9), fx(N, -8, uT, fT, xT, 0, -5.5), fx(M, 0, uT, fT, xT, 0, -6.3), fx(P, 3, uL, fL, xL, 0, -7.5)]
      : [fx(P, 3, uL, fL, xL, -4, -10), fx(M, 0, uT, fT, xT, -4.5, -9.5), fx(N, -8, uT, fT, xT, -3.5, -8.5), fx(N, -8, uT, fT, xT, 3.5, -8.5), fx(M, 0, uT, fT, xT, 4.5, -9.5), fx(P, 3, uL, fL, xL, 4, -10)];
    return { host: 'tronco', n: mul(fT, -1), p: borda };
  },
  // Reto do abdome: origem na crista e na sínfise púbica; inserção no processo xifoide e nas cartilagens das costelas 5 a 7.
  retoAbdominal(sk) {
    const { N, M, P, uT, fT, xT, uL, fL, xL } = sk;
    const fx = (base, h, uu, ff, xx, a, b) => comb(1, base, h, uu, a, xx, b, ff);
    const borda = isSide()
      ? [fx(N, -13, uT, fT, xT, 0, 11), fx(M, 2, uT, fT, xT, 0, 10), fx(P, 2, uL, fL, xL, 0, 9.3), fx(P, 2, uL, fL, xL, 0, 4.5), fx(M, 2, uT, fT, xT, 0, 4.5), fx(N, -13, uT, fT, xT, 0, 5.5)]
      : [fx(N, -13, uT, fT, xT, -5, 11), fx(M, 2, uT, fT, xT, -4.5, 10), fx(P, 2, uL, fL, xL, -3, 9.3), fx(P, 2, uL, fL, xL, 3, 9.3), fx(M, 2, uT, fT, xT, 4.5, 10), fx(N, -13, uT, fT, xT, 5, 11)];
    return { host: 'tronco', n: sk.fT, p: borda };
  },
  // Oblíquo externo: origem nas costelas 5 a 12; inserção na crista ilíaca e na linha alba. Lateral do abdome.
  obliquos(sk, k) {
    const s = sk.side[k].s,
      { M, P, uT, fT, xT, uL, fL, xL } = sk;
    return {
      host: 'tronco',
      n: norm(comb(s, xT, 0.5, fT)),
      p: [comb(1, M, s * 12.5, xT, 7, uT, 3, fT), comb(1, M, s * 13.5, xT, -1, uT, 0, fT), comb(1, P, s * 12, xL, 6, uL, 0, fL), comb(1, P, s * 7.5, xL, 5, uL, 7, fL), comb(1, M, s * 7, xT, 3, uT, 9, fT)],
    };
  },
};

// Os músculos de cada exercício vêm de ex.muscles (os mesmos do estilo clássico), trocando cada id pelas formas novas.
// Puxada unilateral e goblet têm a lista do R4 (decisão do Gustavo em 02/11/2026: todos os músculos na vista de trás
// da puxada; adutores no goblet, por kubo2019).
const MAPA = {
  lats: ['redondoMaior', 'dorsal'],
  midTrap: ['romboides', 'trapMedio', 'trapInferior'],
  upTrap: ['trapSuperior'],
  pecClav: ['peitoralClav'],
  pecStern: ['peitoralEst'],
  deltAnt: ['deltAnt'],
  deltLat: ['deltLat'],
  deltPost: ['deltPost'],
  biceps: ['biceps'],
  triceps: ['triceps'],
  forearm: ['antebraco'],
  quads: ['quadriceps'],
  hams: ['posteriores'],
  glutes: ['gluteos'],
  calf: ['panturrilha'],
  erect: ['eretores'],
  rectus: ['retoAbdominal'],
  obliq: ['obliquos'],
  adutores: ['adutores'],
};
// do mais profundo para o mais superficial (o trapézio cobre os romboides; o peitoral, as costelas)
const ORDEM = ['romboides', 'redondoMaior', 'dorsal', 'eretores', 'trapMedio', 'trapInferior', 'trapSuperior', 'obliquos', 'retoAbdominal', 'peitoralEst', 'peitoralClav', 'gluteos', 'adutores', 'posteriores', 'quadriceps', 'panturrilha', 'deltPost', 'deltLat', 'deltAnt', 'triceps', 'biceps', 'antebraco'];
const CENTRAIS = new Set(['eretores', 'retoAbdominal']);

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
  // Revisão de anatomia (docs/revisoes/anatomia.md, decisões do Gustavo em 02/11/2026): o desenho do boneco segue
  // os músculos da biblioteca. O estilo clássico continua igual ao guia original (teste de equivalência).
  // Achados 2 e 6: glúteo secundário (como a biblioteca conta) e adutores da perna da frente.
  afundo: [
    ['gluteos', 'R', 's'],
    ['adutores', 'R', 's'],
    ['quadriceps', 'L', 's'],
    ['quadriceps', 'R', 'p'],
  ],
  bulgaro: [
    ['gluteos', 'R', 's'],
    ['adutores', 'R', 's'],
    ['quadriceps', 'R', 'p'],
  ],
  // Equipamento mínimo (03/11/2026): as versões com o peso do corpo desenham os mesmos músculos das versões com
  // halteres, inclusive os adutores, que a biblioteca conta como secundários (achado 6 da revisão de anatomia).
  'agachamento-peso-corpo': [
    ['adutores', 'RL', 's'],
    ['gluteos', 'RL', 's'],
    ['quadriceps', 'RL', 'p'],
  ],
  'afundo-peso-corpo': [
    ['gluteos', 'R', 's'],
    ['adutores', 'R', 's'],
    ['quadriceps', 'L', 's'],
    ['quadriceps', 'R', 'p'],
  ],
  'afundo-kettlebell': [
    ['gluteos', 'R', 's'],
    ['adutores', 'R', 's'],
    ['quadriceps', 'L', 's'],
    ['quadriceps', 'R', 'p'],
  ],
  'bulgaro-peso-corpo': [
    ['gluteos', 'R', 's'],
    ['adutores', 'R', 's'],
    ['quadriceps', 'R', 'p'],
  ],
  // Catálogo completo (04/11/2026): o búlgaro na suspensão desenha os mesmos músculos do búlgaro com o peso do corpo.
  'bulgaro-suspensao': [
    ['gluteos', 'R', 's'],
    ['adutores', 'R', 's'],
    ['quadriceps', 'R', 'p'],
  ],
  // Achado 2: o glúteo da perna de apoio passa a secundário, como no stiff com os dois pés.
  'stiff-unilateral': [
    ['eretores', 'C', 's'],
    ['gluteos', 'R', 's'],
    ['gluteos', 'L', 's'],
    ['posteriores', 'L', 'p'],
  ],
  // Achado 4: a lateral do ombro é secundária (meia série na biblioteca); a frente é a principal.
  desenvolvimento: [
    ['trapSuperior', 'R', 's'],
    ['trapSuperior', 'L', 's'],
    ['deltLat', 'R', 's'],
    ['deltLat', 'L', 's'],
    ['deltAnt', 'R', 'p'],
    ['deltAnt', 'L', 'p'],
    ['triceps', 'R', 's'],
    ['triceps', 'L', 's'],
  ],
  // Achado 3: sem o trapézio superior, que o texto apresenta como sinal de erro ("o ombro está subindo").
  'elevacao-halteres': [
    ['deltAnt', 'R', 's'],
    ['deltAnt', 'L', 's'],
    ['deltLat', 'R', 'p'],
    ['deltLat', 'L', 'p'],
  ],
  // R4 (05/11/2026): as versões com elástico desenham os mesmos músculos das versões aprovadas em que se baseiam.
  'elevacao-lateral-elastico': [
    ['deltAnt', 'R', 's'],
    ['deltAnt', 'L', 's'],
    ['deltLat', 'R', 'p'],
    ['deltLat', 'L', 'p'],
  ],
  'desenvolvimento-elastico': [
    ['trapSuperior', 'R', 's'],
    ['trapSuperior', 'L', 's'],
    ['deltLat', 'R', 's'],
    ['deltLat', 'L', 's'],
    ['deltAnt', 'R', 'p'],
    ['deltAnt', 'L', 'p'],
    ['triceps', 'R', 's'],
    ['triceps', 'L', 's'],
  ],
  'elevacao-lateral': [
    ['deltAnt', 'R', 's'],
    ['deltLat', 'R', 'p'],
  ],
};

/** Lista de [forma, lado, tipo] do exercício, do mais profundo para o mais superficial. */
export function listaDe(ex) {
  if (LISTA[ex.id]) return LISTA[ex.id];
  const out = new Map();
  for (const [tipo, lista] of [['s', ex.muscles.s], ['p', ex.muscles.p]])
    for (const [id, lados] of lista)
      for (const f of MAPA[id] ?? []) {
        const ks = CENTRAIS.has(f) ? ['C'] : lados === 'RL' ? ['R', 'L'] : [lados];
        for (const k of ks) out.set(f + k, [f, k, tipo]); // o principal vence o secundário
      }
  // as 3 partes do deltoide são vizinhas (não se cobrem no corpo): entre elas, o principal fica por cima
  const pos = ([f, , tipo]) => (f.startsWith('delt') ? ORDEM.indexOf('deltPost') + (tipo === 'p' ? 0.5 : 0) : ORDEM.indexOf(f));
  return [...out.values()].sort((a, b) => pos(a) - pos(b));
}

/**
 * Músculos que só ajudam a firmar (desenhados, mas que a biblioteca não conta naquele exercício): ficam listrados de
 * laranja, para não se confundirem com o secundário que conta meia série (legenda A, decisão do Gustavo em
 * 03/11/2026; docs/revisoes/design.md, ponto 2). tests/unit/legenda.test.ts confere esta lista contra a biblioteca.
 */
export const SO_AJUDA: Record<string, string[]> = {
  'roda-abdominal': ['obliquos'],
  'elevacao-joelhos-paralelas': ['obliquos'],
  'ponte-pes-bola': ['posteriores'],
  'abdominal-bola': ['obliquos'],
  'abdominal-chao': ['obliquos'],
  'abdominal-polia': ['obliquos'],
  'barra-fixa': ['antebraco'],
  desenvolvimento: ['trapSuperior'],
  'elevacao-halteres': ['deltAnt'],
  'elevacao-joelhos': ['obliquos', 'antebraco'],
  'elevacao-lateral': ['deltAnt'],
  flexao: ['retoAbdominal'],
  'flexao-bola': ['panturrilha'],
  'rosca-alternada': ['antebraco'],
  'rosca-martelo': ['antebraco'],
  'rosca-kettlebell': ['antebraco'],
  'rosca-inclinada': ['antebraco'],
  'rosca-polia': ['antebraco'],
  'rosca-suspensao': ['antebraco'],
  stiff: ['eretores'],
  'stiff-unilateral': ['eretores'],
  'stiff-kettlebell': ['eretores'],
  'triceps-frances': ['retoAbdominal'],
  // R4 (05/11/2026): as versões com elástico, como as suas bases
  'rosca-elastico': ['antebraco'],
  'elevacao-lateral-elastico': ['deltAnt'],
  'stiff-elastico': ['eretores'],
  'desenvolvimento-elastico': ['trapSuperior'],
  'triceps-elastico-acima': ['retoAbdominal'],
  'flexao-elastico': ['retoAbdominal'],
};
// O padrão das listras (as cores vêm do CSS: .mh-fundo e .mh-listra).
const LISTRAS = `<defs><pattern id="mh-listras" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3.2" height="3.2" class="mh-fundo"/><rect width="1.6" height="3.2" class="mh-listra"/></pattern></defs>`;

/** Área na tela dos músculos principais do último desenho (para escolher a vista da miniatura do cartão). */
export const medida = { areaPrincipal: 0 };
const area = (Q) => Math.abs(Q.reduce((s, q, i) => { const r = Q[(i + 1) % Q.length]; return s + q[0] * r[1] - r[0] * q[1]; }, 0)) / 2;

export function musculosNovos(ex, sk, partes, estilo) {
  medida.areaPrincipal = 0;
  const soAjuda = SO_AJUDA[ex.id] ?? [];
  let listras = false;
  for (const [id, lados, tipo0] of listaDe(ex)) {
    const tipo = tipo0 === 's' && soAjuda.includes(id) ? 'h' : tipo0;
    for (const k of lados === 'RL' ? ['R', 'L'] : [lados]) {
      const m = FORMAS[id](sk, k === 'C' ? 'R' : k);
      if (m.n && CTX.PJ(m.n)[2] < -0.25) continue; // face virada para o outro lado
      const d = m.host === 'tronco' ? partes.tronco : partes[m.host][k === 'C' ? 'R' : k]; // por cima da parte, por baixo do que está na frente
      const Q = m.q ?? m.p.map(CTX.PJ);
      if (tipo === 'p') medida.areaPrincipal += area(Q);
      if (tipo === 'h' && !listras) {
        listras = true;
        push(0, -1e9, LISTRAS);
      }
      push(1, d, `<path d="${caminhoSuave(Q)}" class="e${estilo}-m${tipo}" stroke-width="${estilo === 'a' ? 0.9 : 0.8}"/>`);
    }
  }
}
