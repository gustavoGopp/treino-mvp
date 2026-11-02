// @ts-nocheck
// R4 (experimento do boneco): o corpo nos estilos novos, A (boneco aprimorado) e B (silhueta limpa).
// Opção paralela do motor: não muda nada do estilo atual (body() em ../desenho.ts). Usa o mesmo esqueleto
// (skel), as mesmas poses aprovadas e as mesmas primitivas de saída (push), só com outro desenho.
// As medidas da forma do tronco e a espessura dos membros são escolha de design (proporções aproximadas
// de um adulto, em cm, coerentes com B em ../esqueleto.ts), não dado anatômico medido.
import { CTX } from '../contexto';
import { f1, hull, isSide, push } from '../desenho';
import { B } from '../esqueleto';
import { add, comb, mul, sub } from '../math';

export type EstiloNovo = 'a' | 'b';

const pts = (Q) => Q.map((q) => f1(q[0]) + ',' + f1(q[1])).join(' ');
const zMedio = (V) => V.reduce((s, v) => s + CTX.PJ(v)[2], 0) / V.length;

/** Seção elíptica do tronco: centro c, eixos x (largura) e f (profundidade), semieixos a e b. */
function anel(c, x, f, a, b, n = 18) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const th = (2 * Math.PI * i) / n;
    out.push(comb(1, c, a * Math.cos(th), x, b * Math.sin(th), f));
  }
  return out;
}

// Seções do tronco, de baixo para cima: [altura no eixo, semilargura, semiprofundidade, desvio para a frente].
// Abaixo da cintura seguem a pelve (P, uL/fL/xL); acima, o tórax (M, uT/fT/xT).
const PELVE = [
  [-4, 12, 8.5, -1],
  [2, 16, 10.5, -1.5],
  [12, 13.5, 9, 0],
];
const TORAX = [
  [3, 14, 9.5, 0.5],
  [15, 16.5, 11, 1],
  [24, 17.5, 9.5, 0],
  [29.5, 10.5, 7, -1],
];

export function aneisTronco(sk) {
  const r = [];
  for (const [h, a, b, d] of PELVE) r.push(anel(comb(1, sk.P, h, sk.uL, d, sk.fL), sk.xL, sk.fL, a, b));
  for (const [h, a, b, d] of TORAX) r.push(anel(comb(1, sk.M, h, sk.uT, d, sk.fT), sk.xT, sk.fT, a, b));
  return r;
}

// Espessuras (diâmetro, cm): braço, antebraço, mão, coxa, perna, pé, pescoço.
const ESP = { ua: 9, fa: 7.5, mao: 5.5, th: 14, sk: 10, pe: 5, pesc: 8 };

/**
 * Desenha o corpo e devolve a profundidade de cada parte (para os músculos ficarem por cima da parte certa
 * e por baixo do que estiver na frente dela).
 */
export function corpoNovo(sk, estilo: EstiloNovo, erro = false) {
  const A = estilo === 'a';
  const ow = A ? 1.3 : 0; // espessura do contorno (só no A)
  // no modo Erros, a figura que erra ganha as mesmas classes com o sufixo -e (tons da cor de erro)
  const c = (n) => (erro ? n + '-e' : n);
  const cls = (base, longe) => c(`e${estilo}-${base}${longe ? '-longe' : ''}`);
  const partes = { tronco: 0, cabeca: 0, braco: {}, perna: {} };

  // tronco: a casca das seções, pedaço a pedaço (pelve → cintura → tórax → base do pescoço)
  const aneis = aneisTronco(sk);
  const dT = zMedio([sk.P, sk.M, sk.N]);
  partes.tronco = dT;
  const cascas = [];
  for (let i = 0; i < aneis.length - 1; i++) cascas.push(hull([...aneis[i], ...aneis[i + 1]].map(CTX.PJ)));
  // pescoço junto do tronco
  const nTopo = add(sk.N, mul(sub(sk.Hc, sk.N), 0.62));
  const qN = [CTX.PJ(sk.N), CTX.PJ(nTopo)];
  if (A) {
    for (const h of cascas) push(1, dT, `<polygon points="${pts(h)}" class="${c('ea-cont')}" stroke-width="${f1(ow * 2)}"/>`);
    push(1, dT, `<line x1="${f1(qN[0][0])}" y1="${f1(qN[0][1])}" x2="${f1(qN[1][0])}" y2="${f1(qN[1][1])}" class="${c('ea-cont')}" stroke-width="${f1(ESP.pesc + ow * 2)}"/>`);
  }
  push(1, dT, `<line x1="${f1(qN[0][0])}" y1="${f1(qN[0][1])}" x2="${f1(qN[1][0])}" y2="${f1(qN[1][1])}" class="${cls('pele-l')}" stroke-width="${f1(ESP.pesc)}"/>`);
  for (const h of cascas) push(1, dT, `<polygon points="${pts(h)}" class="${cls('pele-t')}"/>`);

  // coluna: linha discreta só no A, nas vistas de lado e de trás (orienta a postura sem pontilhado)
  if (A && !erro && (isSide() || CTX.VIEW === 'posterior')) {
    const back = isSide() ? -5 : -8.5;
    const sp = [comb(1, sk.P, back, sk.fL), comb(1, sk.M, back - 1, sk.fT), comb(1, sk.N, back + 1, sk.fT)].map(CTX.PJ);
    push(1, dT + 0.001, `<polyline points="${pts(sp)}" class="ea-sp" stroke-width="1.1" fill="none"/>`);
  }

  // cabeça preenchida (e, no A, com contorno); nariz curto nas vistas de lado e de cima, como no atual
  const H = CTX.PJ(sk.Hc);
  partes.cabeca = H[2] + 0.6;
  push(1, H[2] + 0.6, `<circle cx="${f1(H[0])}" cy="${f1(H[1])}" r="${f1(B.head)}" class="${cls('pele')}"${A ? ` stroke-width="${f1(ow * 1.6)}"` : ''}/>`);
  if (isSide() || CTX.VIEW === 'top') {
    const a = CTX.PJ(comb(1, sk.Hc, B.head - 1, sk.fN, -0.5, sk.uN)),
      b = CTX.PJ(comb(1, sk.Hc, B.head + 2.5, sk.fN, -1.5, sk.uN));
    push(1, H[2] + 0.61, `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" class="${c(A ? 'ea-cont' : 'eb-pele-l')}" stroke-width="${f1(A ? 2.6 : 3.4)}"/>`);
  }

  // membros: cada um vira uma "cápsula" grossa (A: contorno escuro por baixo, recheio por cima; B: só recheio)
  const dN = CTX.PJ(sk.N)[2],
    dP = CTX.PJ(sk.P)[2];
  for (const k of ['L', 'R']) {
    const sd = sk.side[k];
    const side = isSide();
    const longeA = side && CTX.PJ(sd.S)[2] < dN - 1,
      longeL = side && CTX.PJ(sd.Hp)[2] < dP - 1;
    const perna = [
      [sd.Hp, sd.K, ESP.th],
      [sd.K, sd.A, ESP.sk],
      [sd.heel, sd.A, ESP.pe],
      [sd.A, sd.toe, ESP.pe],
    ];
    const braco = [
      [sd.S, sd.E, ESP.ua],
      [sd.E, sd.W, ESP.fa],
      [sd.W, sd.G, ESP.mao],
    ];
    partes.perna[k] = membro(perna, longeL, [sd.Hp, sd.K, sd.A], A, ow, cls, c, erro);
    partes.braco[k] = membro(braco, longeA, [sd.S, sd.E], A, ow, cls, c, erro);
  }
  return partes;
}

function membro(segs, longe, juntas, A, ow, cls, c, erro) {
  const d = zMedio(segs.flatMap((s) => [s[0], s[1]])) + 0.05;
  const Q = segs.map(([a, b, w]) => [CTX.PJ(a), CTX.PJ(b), w]);
  const linha = ([a, b, w], c, extra) =>
    `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" class="${c}" stroke-width="${f1(w + extra)}"/>`;
  if (A) for (const s of Q) push(1, d, linha(s, c(longe ? 'ea-cont-longe' : 'ea-cont'), ow * 2));
  // B: sem contorno, mas o membro de perto ganha uma folga da cor do fundo, para não sumir na frente do tronco
  else if (!longe) for (const s of Q) push(1, d, linha(s, 'eb-folga', 1.8));
  for (const s of Q) push(1, d, linha(s, cls('pele-l', longe), 0));
  // articulações marcadas (só no A, só no lado de perto)
  if (A && !longe && !erro) {
    let ant = null;
    for (const j of juntas) {
      const p = CTX.PJ(j);
      // junta escondida atrás da anterior (osso apontando para quem olha): uma marca só
      if (!ant || Math.hypot(p[0] - ant[0], p[1] - ant[1]) > 5) push(1, d, `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="1.9" class="ea-jt" stroke-width="1.1"/>`);
      ant = p;
    }
  }
  return d;
}
