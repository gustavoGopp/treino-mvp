// Motor novo: o esqueleto. Recebe a tabela do corpo e uma pose e devolve os referenciais de cada osso e os centros
// das articulações, em cm. Funções puras: a mesma entrada dá o mesmo esqueleto.
//
// O que muda em relação ao esqueleto de hoje (../esqueleto.ts):
//  - as medidas vêm da tabela (../novo/dados/corpo-*.json), não de constantes;
//  - a coluna tem três regiões com a curva de repouso (lordose, cifose) e dobra em vários pontos;
//  - a cintura escapular é uma clavícula que gira no esterno, e acompanha o braço (ritmo escapuloumeral);
//  - o antebraço gira (pronação e supinação) e a mão tem referencial próprio (dedos, palma, polegar);
//  - o pé apoia pela bola do pé e dobra nela quando o calcanhar sobe.
import type { Corpo } from './tabelas';
import { REF0, add, angulo, anguloEm, clamp, comb, cross, dirRef, dot, girar, girarRef, ik2, len, mul, noRef, norm, paraRef, perp, sub } from './vec';
import type { Ref, V3 } from './vec';

export type Lado = 'R' | 'L';
export const LADOS: readonly Lado[] = ['R', 'L'];
/** -1 no lado direito (x < 0), +1 no esquerdo. */
export const sinal = (k: Lado) => (k === 'R' ? -1 : 1);

/* ============================== pose ============================== */
export interface PoseTronco {
  /** Ponto médio entre os dois centros do quadril, no mundo (cm). */
  pelve: V3;
  /** Inclinação da pelve à frente (graus; negativo = para trás). */
  frente?: number;
  /** Inclinação da pelve para a esquerda. */
  lado?: number;
  /** Giro da pelve para a esquerda, em torno da vertical. */
  giro?: number;
  /** Flexão de cada região da coluna, somada à curva de repouso (positivo = à frente). */
  lombar?: number;
  toracica?: number;
  cervical?: number;
  /** Flexão da cabeça sobre o pescoço (positivo = queixo para o peito). */
  cabeca?: number;
  lombarLado?: number;
  toracicaLado?: number;
  lombarGiro?: number;
  toracicaGiro?: number;
  cervicalGiro?: number;
}
export type FormaMao = 'pegada' | 'aberta' | 'relaxada';
export interface PoseMao {
  /** Para onde aponta o polegar (o eixo do cabo, numa pegada). */
  polegar: V3;
  /** Direção dos dedos e normal da palma, quando a mão está fixa (apoiada no chão, por exemplo). */
  dedos?: V3;
  forma?: FormaMao;
  /** Diâmetro do que a mão segura (cm). */
  diam?: number;
}
export interface PoseBraco {
  /** Centro da pegada (com o punho alinhado ao antebraço). */
  pegada?: V3;
  /** Centro do punho, com a mão fixa por `mao.dedos`. */
  punho?: V3;
  /** Sem alvo: direções do braço e do antebraço (unitárias, no mundo). */
  umero?: V3;
  antebraco?: V3;
  /** Para onde o cotovelo aponta. */
  polo: V3;
  mao: PoseMao;
  /** Somados ao ritmo automático da cintura escapular (graus da clavícula): subir e ir à frente. */
  elev?: number;
  prot?: number;
}
export interface PosePerna {
  /** Pé apoiado: o ponto do chão sob a bola do pé, a direção dos dedos e quanto o calcanhar sobe (graus). */
  pe?: { bola: V3; dir: V3; calc?: number };
  /** Pé livre: o tornozelo e a direção dos dedos. */
  tornozelo?: V3;
  peDir?: V3;
  /** Sem alvo: direções da coxa e da canela (unitárias, no mundo). */
  coxa?: V3;
  canela?: V3;
  /** Para onde o joelho aponta. */
  polo: V3;
}
export interface Pose {
  tronco: PoseTronco;
  braco: Record<Lado, PoseBraco>;
  perna: Record<Lado, PosePerna>;
}

/* ============================== saída ============================== */
export interface Tronco {
  corpo: Corpo;
  pose: PoseTronco;
  pelve: Ref;
  /** Nós da coluna, de L5–S1 até a base do crânio; `s` é a distância ao longo da coluna desde L5–S1. */
  nos: { ref: Ref; s: number }[];
  /** Índices dos nós: fim da lombar (T12–L1), fim da torácica (C7–T1) e base do crânio. */
  iT12: number;
  iC7: number;
  iCranio: number;
  torax: Ref;
  cabeca: Ref;
}
export interface LadoDoEsqueleto {
  s: number;
  quadril: V3;
  joelho: V3;
  tornozelo: V3;
  /** Parte de trás do pé (calcanhar ao peito do pé) e dedos: os dedos ficam no chão quando o calcanhar sobe. */
  pe: Ref;
  dedos: Ref;
  bola: V3;
  calcanhar: V3;
  ponta: V3;
  coxa: Ref;
  canela: Ref;
  esternoclavicular: V3;
  acromioclavicular: V3;
  ombro: V3;
  cotovelo: V3;
  punho: V3;
  pegada: V3;
  braco: Ref;
  antebraco: Ref;
  mao: Ref;
  formaMao: FormaMao;
  diamMao: number;
  /** Escápula: raiz da espinha, ângulo inferior e ponta do acrômio. */
  escapula: { raiz: V3; anguloInferior: V3; acromio: V3 };
  /** Ângulos medidos no esqueleto resolvido (graus), para o desenho e para a conferência. */
  ang: {
    joelho: number;
    cotovelo: number;
    /** 0 = palma para a frente (supinado), 90 = polegar para cima (neutro), 180 = pronado. */
    pronacao: number;
    elevacaoDoBraco: number;
    claviculaElev: number;
    claviculaRetr: number;
    escapulaRot: number;
  };
  /** Quanto faltou para o alvo (cm): maior que 0 = o membro não alcança. */
  falta: { braco: number; perna: number };
}
export interface Esq extends Tronco {
  lado: Record<Lado, LadoDoEsqueleto>;
}

/* ============================== calibração (uma vez por corpo) ============================== */
const N_LOMBAR = 5,
  N_TORACICA = 6,
  N_CERVICAL = 4;
interface Calib {
  /** Comprimento de cada trecho da coluna (cm) e inclinação inicial em L5–S1 (graus). */
  dL: number;
  dT: number;
  dC: number;
  phi0: number;
  /** Giro que deixa a cabeça nivelada em pé. */
  cabeca0: number;
  /** Em coordenadas do tórax, lado esquerdo (o direito espelha x). */
  sc: V3;
  /** Ponta da clavícula em repouso. */
  acRepouso: V3;
  acAoOmbro: V3;
  escRaiz: V3;
  escAnguloInf: V3;
  escAcromio: V3;
  /** Fatores aplicados aos comprimentos do Gray para a coluna caber nas alturas medidas. */
  fatorTL: number;
  fatorC: number;
}
const CALIB = new WeakMap<Corpo, Calib>();

function refDaPelve(p: PoseTronco): Ref {
  let r: Ref = { ...REF0, o: p.pelve };
  if (p.giro) r = girarRef(r, [0, 1, 0], p.giro);
  if (p.frente) r = girarRef(r, r.x, p.frente);
  if (p.lado) r = girarRef(r, r.z, -p.lado);
  return r;
}
function cadeia(c: Corpo, cal: Pick<Calib, 'dL' | 'dT' | 'dC' | 'phi0' | 'cabeca0'>, pelve: Ref, p: PoseTronco) {
  const m = (id: string) => c.m(id);
  let r: Ref = { ...pelve, o: noRef(pelve, [0, m('l5s1.acima'), -m('l5s1.atras')]) };
  r = girarRef(r, r.x, cal.phi0);
  const nos: { ref: Ref; s: number }[] = [];
  let s = 0;
  const regiao = (n: number, d: number, flex: number, lado: number, giro: number) => {
    for (let i = 0; i < n; i++) {
      r = girarRef(r, r.x, flex / n);
      if (lado) r = girarRef(r, r.z, -lado / n);
      if (giro) r = girarRef(r, r.y, giro / n);
      if (nos.length === 0) nos.push({ ref: r, s: 0 });
      r = { ...r, o: add(r.o, mul(r.y, d)) };
      s += d;
      nos.push({ ref: r, s });
    }
  };
  regiao(N_LOMBAR, cal.dL, -m('coluna.lordoseLombar') + (p.lombar ?? 0), p.lombarLado ?? 0, p.lombarGiro ?? 0);
  regiao(N_TORACICA, cal.dT, m('coluna.cifoseToracica') + (p.toracica ?? 0), p.toracicaLado ?? 0, p.toracicaGiro ?? 0);
  regiao(N_CERVICAL, cal.dC, -m('coluna.lordoseCervical') + (p.cervical ?? 0), 0, p.cervicalGiro ?? 0);
  const iT12 = N_LOMBAR,
    iC7 = N_LOMBAR + N_TORACICA,
    iCranio = iC7 + N_CERVICAL;
  const nT = nos[iT12]!.ref,
    nC = nos[iC7]!.ref;
  // tórax: o eixo vai de T12–L1 a C7–T1; a origem fica em C7–T1
  const y = norm(sub(nC.o, nT.o));
  const x = norm(perp(norm(add(nT.x, nC.x)), y));
  const torax: Ref = { o: nC.o, x, y, z: cross(x, y) };
  const topo = nos[iCranio]!.ref;
  const cabeca = girarRef(topo, topo.x, cal.cabeca0 + (p.cabeca ?? 0));
  return { nos, iT12, iC7, iCranio, torax, cabeca };
}

export function calibrar(c: Corpo): Calib {
  const ja = CALIB.get(c);
  if (ja) return ja;
  const m = (id: string) => c.m(id);
  const pe: PoseTronco = { pelve: [0, m('altura.trocanter'), 0] };
  const pelve = refDaPelve(pe);
  // 1) coluna: escala os comprimentos do Gray e acha a inclinação inicial para C7–T1 ficar na altura medida
  //    (altura.cervical) e na vertical de L5–S1 (o prumo de C7 cai sobre o sacro, em pé).
  let fatorTL = 1,
    fatorC = 1,
    phi0 = 25,
    cabeca0 = 0;
  const monta = () => cadeia(c, { dL: (m('coluna.lombarGray') * fatorTL) / N_LOMBAR, dT: (m('coluna.toracicaGray') * fatorTL) / N_TORACICA, dC: (m('coluna.cervicalGray') * fatorC) / N_CERVICAL, phi0, cabeca0 }, pelve, pe);
  for (let i = 0; i < 60; i++) {
    const k = monta();
    const base = k.nos[0]!.ref.o,
      c7 = k.nos[k.iC7]!.ref.o,
      topo = k.nos[k.iCranio]!.ref.o;
    fatorTL *= (m('altura.cervical') - base[1]) / (c7[1] - base[1]);
    phi0 -= Math.atan2(c7[2] - base[2], c7[1] - base[1]) / (Math.PI / 180);
    fatorC *= (m('altura.baseDoCranio') - c7[1]) / (topo[1] - c7[1]);
  }
  let k = monta();
  const topo = k.nos[k.iCranio]!.ref;
  cabeca0 = -anguloEm([0, 1, 0], topo.y, [1, 0, 0]);
  k = monta();
  // 2) ombro: os alvos em pé (mundo) viram coordenadas do tórax
  const ombro: V3 = [m('ombro.meiaDistancia'), m('altura.acromio') - m('ombro.centroAbaixoDoAcromio'), m('ombro.centroAFrente')];
  const L = m('clavicula.comp'),
    e = m('clavicula.elevacaoRepouso'),
    rt = m('clavicula.retracaoRepouso');
  const clav = dirClavicula(e, rt, 1);
  const scX = m('esterno.meiaDistanciaDasClaviculas');
  const ombroT = paraRef(k.torax, ombro);
  // a clavícula sai do esterno e chega acima do centro do ombro, um pouco para dentro
  const ac: V3 = [scX + L * clav[0], paraRef(k.torax, [0, m('altura.acromio') + 0.5, 0])[1], ombroT[2] - 1];
  const sc: V3 = [scX, ac[1] - L * clav[1], ac[2] - L * clav[2]];
  const costas = -(m('prof.peito') * 0.3); // pele das costas atrás da linha da coluna (a mesma fração dos anéis do tronco)
  const cal: Calib = {
    dL: (m('coluna.lombarGray') * fatorTL) / N_LOMBAR,
    dT: (m('coluna.toracicaGray') * fatorTL) / N_TORACICA,
    dC: (m('coluna.cervicalGray') * fatorC) / N_CERVICAL,
    phi0,
    cabeca0,
    sc,
    acRepouso: ac,
    acAoOmbro: sub(ombroT, ac),
    escRaiz: [ac[0] - m('escapula.largura'), ac[1] - 2.5, costas + 1.5],
    escAnguloInf: [ac[0] - m('escapula.largura') + 1.5, ac[1] - 2.5 - m('escapula.altura') * 0.82, costas + 1],
    escAcromio: [m('largura.biacromial') / 2, paraRef(k.torax, [0, m('altura.acromio'), 0])[1], ombroT[2] - 0.5],
    fatorTL,
    fatorC,
  };
  CALIB.set(c, cal);
  return cal;
}
/** Direção da clavícula no referencial do tórax (lado esquerdo: s = +1): elevação e retração em graus. */
function dirClavicula(elev: number, retr: number, s: number): V3 {
  const e = (elev * Math.PI) / 180,
    r = (retr * Math.PI) / 180;
  return [s * Math.cos(e) * Math.cos(r), Math.sin(e), -Math.cos(e) * Math.sin(r)];
}

/* ============================== tronco ============================== */
export function resolverTronco(corpo: Corpo, pose: PoseTronco): Tronco {
  const cal = calibrar(corpo);
  const pelve = refDaPelve(pose);
  return { corpo, pose, pelve, ...cadeia(corpo, cal, pelve, pose) };
}
/** Um ponto ao longo da coluna (s em cm desde L5–S1), com o referencial interpolado. */
export function naColuna(t: Tronco, s: number): Ref {
  const nos = t.nos;
  if (s <= 0) return { ...nos[0]!.ref, o: add(nos[0]!.ref.o, mul(nos[0]!.ref.y, s)) };
  for (let i = 0; i < nos.length - 1; i++) {
    const a = nos[i]!,
      b = nos[i + 1]!;
    if (s <= b.s) {
      const u = (s - a.s) / (b.s - a.s);
      // o trecho entre dois nós é reto e tem a orientação do nó de cima; o referencial muda suavemente
      const o = add(a.ref.o, mul(sub(b.ref.o, a.ref.o), u));
      const y = norm(comb([1 - u, a.ref.y], [u, b.ref.y]));
      const x = norm(perp(comb([1 - u, a.ref.x], [u, b.ref.x]), y));
      return { o, x, y, z: cross(x, y) };
    }
  }
  const f = nos[nos.length - 1]!;
  return { ...f.ref, o: add(f.ref.o, mul(f.ref.y, s - f.s)) };
}

/* ============================== membros ============================== */
function resolverBraco(t: Tronco, k: Lado, p: PoseBraco, frac: number): Omit<LadoDoEsqueleto, 'quadril' | 'joelho' | 'tornozelo' | 'pe' | 'dedos' | 'bola' | 'calcanhar' | 'ponta' | 'coxa' | 'canela'> {
  const c = t.corpo,
    m = (id: string) => c.m(id),
    cal = calibrar(c),
    s = sinal(k),
    T = t.torax;
  const esp = (q: V3): V3 => [s * q[0], q[1], q[2]];
  const elev = m('clavicula.elevacaoRepouso') + m('clavicula.elevacaoNaElevacao') * frac + (p.elev ?? 0);
  const retr = m('clavicula.retracaoRepouso') + m('clavicula.retracaoNaElevacao') * frac - (p.prot ?? 0);
  const dRot = m('escapula.rotacaoParaCimaNaElevacao') * frac;
  const sc = noRef(T, esp(cal.sc));
  const ac = add(sc, mul(dirRef(T, dirClavicula(elev, retr, s)), m('clavicula.comp')));
  const gira = (q: V3) => girar(dirRef(T, esp(q)), T.z, s * dRot);
  const ombro = add(ac, gira(cal.acAoOmbro));
  // a escápula acompanha a ponta da clavícula e gira em torno dela
  const acLocal = cal.acRepouso;
  const daEsc = (q: V3) => add(ac, gira(sub(q, acLocal)));
  const escapula = { raiz: daEsc(cal.escRaiz), anguloInferior: daEsc(cal.escAnguloInf), acromio: daEsc(cal.escAcromio) };

  const ua = m('braco.comp'),
    fa = m('antebraco.comp'),
    g = m('mao.punhoAoCentroDaPegada');
  let cotovelo: V3, punho: V3, falta = 0;
  if (p.umero && p.antebraco) {
    cotovelo = add(ombro, mul(norm(p.umero), ua));
    punho = add(cotovelo, mul(norm(p.antebraco), fa));
  } else if (p.punho) {
    const r = ik2(ombro, p.punho, ua, fa, p.polo);
    cotovelo = r.meio;
    punho = r.ponta;
    falta = r.falta;
  } else {
    const r = ik2(ombro, p.pegada ?? add(ombro, [0, -(ua + fa + g), 0]), ua, fa + g, p.polo);
    cotovelo = r.meio;
    punho = add(cotovelo, mul(norm(sub(r.ponta, cotovelo)), fa));
    falta = r.falta;
  }
  const uUa = norm(sub(cotovelo, ombro)),
    uFa = norm(sub(punho, cotovelo));
  // frente do braço (lado do bíceps): para onde o antebraço dobra; com o cotovelo reto, o oposto do polo
  const zb = norm(add(perp(uFa, uUa), mul(norm(perp(mul(p.polo, -1), uUa)), 0.03)));
  const braco: Ref = { o: ombro, y: mul(uUa, -1), z: zb, x: cross(mul(uUa, -1), zb) };
  const flex = angulo(uUa, uFa);
  const eixo = len(cross(uUa, zb)) > 1e-6 ? norm(cross(uUa, zb)) : braco.x;
  const zf = norm(perp(girar(zb, eixo, flex), uFa));
  const antebraco: Ref = { o: cotovelo, y: mul(uFa, -1), z: zf, x: cross(mul(uFa, -1), zf) };
  // mão
  const dedos = p.mao.dedos && p.punho ? norm(p.mao.dedos) : uFa;
  let tp = perp(p.mao.polegar, dedos);
  if (len(tp) < 1e-6) tp = perp(antebraco.z, dedos);
  tp = norm(tp);
  const xm = mul(tp, s),
    ym = mul(dedos, -1);
  const mao: Ref = { o: punho, x: xm, y: ym, z: cross(xm, ym) };
  const pegada = add(punho, mul(dedos, g));
  // pronação: 0 = polegar para fora (supinado), 90 = polegar para a frente do antebraço, 180 = polegar para dentro
  const fora = mul(antebraco.x, s);
  let pron = Math.atan2(dot(tp, antebraco.z), dot(tp, fora)) / (Math.PI / 180);
  if (pron < -90) pron += 360;
  return {
    s,
    esternoclavicular: sc,
    acromioclavicular: ac,
    ombro,
    cotovelo,
    punho,
    pegada,
    braco,
    antebraco,
    mao,
    formaMao: p.mao.forma ?? 'relaxada',
    diamMao: p.mao.diam ?? 3,
    escapula,
    ang: { joelho: 0, cotovelo: flex, pronacao: pron, elevacaoDoBraco: angulo(uUa, mul(T.y, -1)), claviculaElev: elev, claviculaRetr: retr, escapulaRot: m('escapula.rotacaoParaCimaRepouso') + dRot },
    falta: { braco: falta, perna: 0 },
  };
}

function resolverPerna(t: Tronco, k: Lado, p: PosePerna) {
  const c = t.corpo,
    m = (id: string) => c.m(id),
    s = sinal(k);
  const quadril = noRef(t.pelve, [s * m('quadril.meiaDistancia'), 0, 0]);
  const th = m('coxa.comp'),
    sk = m('perna.comp');
  const hMaleolo = m('altura.maleolo'),
    dBola = m('pe.calcanharABola'),
    dTorn = m('pe.calcanharAoTornozelo'),
    comp = m('pe.comp');
  let joelho: V3, tornozelo: V3, falta = 0;
  let pe: Ref, dedos: Ref, bola: V3;
  if (p.pe) {
    // pé apoiado: os dedos ficam no chão; o resto do pé gira na bola do pé quando o calcanhar sobe
    const z = norm(perp(p.pe.dir, [0, 1, 0]));
    dedos = { o: p.pe.bola, x: cross([0, 1, 0], z), y: [0, 1, 0], z };
    bola = p.pe.bola;
    pe = girarRef(dedos, dedos.x, p.pe.calc ?? 0);
    tornozelo = noRef(pe, [0, hMaleolo, -(dBola - dTorn)]);
    const r = ik2(quadril, tornozelo, th, sk, p.polo);
    joelho = r.meio;
    falta = r.falta;
  } else {
    if (p.coxa && p.canela) {
      joelho = add(quadril, mul(norm(p.coxa), th));
      tornozelo = add(joelho, mul(norm(p.canela), sk));
    } else {
      const r = ik2(quadril, p.tornozelo ?? add(quadril, [0, -(th + sk), 0]), th, sk, p.polo);
      joelho = r.meio;
      tornozelo = r.ponta;
      falta = r.falta;
    }
    const canelaAcima = norm(sub(joelho, tornozelo));
    const z = norm(p.peDir ?? p.polo);
    // pé livre: o eixo do tornozelo é perpendicular à canela e à direção dos dedos
    const x = len(cross(canelaAcima, z)) > 1e-6 ? norm(cross(canelaAcima, z)) : ([1, 0, 0] as V3);
    const y = cross(z, x);
    pe = { o: add(tornozelo, add(mul(y, -hMaleolo), mul(z, dBola - dTorn))), x, y, z };
    dedos = pe;
    bola = pe.o;
  }
  const uTh = norm(sub(joelho, quadril)),
    uSk = norm(sub(tornozelo, joelho));
  // frente da coxa: o oposto de para onde a canela dobra; com o joelho reto, o polo
  const zc = norm(add(mul(perp(uSk, uTh), -1), mul(norm(perp(p.polo, uTh)), 0.03)));
  const coxa: Ref = { o: quadril, y: mul(uTh, -1), z: zc, x: cross(mul(uTh, -1), zc) };
  const flex = angulo(uTh, uSk);
  const eixo = len(cross(uTh, mul(zc, -1))) > 1e-6 ? norm(cross(uTh, mul(zc, -1))) : coxa.x;
  const zk = norm(perp(girar(zc, eixo, flex), uSk));
  const canela: Ref = { o: joelho, y: mul(uSk, -1), z: zk, x: cross(mul(uSk, -1), zk) };
  return {
    quadril,
    joelho,
    tornozelo,
    pe,
    dedos,
    bola,
    calcanhar: noRef(pe, [0, 0, -dBola]),
    ponta: noRef(dedos, [0, 0, comp - dBola]),
    coxa,
    canela,
    flex,
    falta,
  };
}

/** Fração do ritmo escapuloumeral: 0 com o braço ao lado do corpo, 1 na elevação máxima (linear acima de ~20°: McClure 2001). */
const fracRitmo = (elevacao: number) => clamp((elevacao - 20) / 130, 0, 1);

export function resolverMembros(t: Tronco, braco: Record<Lado, PoseBraco>, perna: Record<Lado, PosePerna>): Esq {
  const lado = {} as Record<Lado, LadoDoEsqueleto>;
  for (const k of LADOS) {
    // duas passadas: a elevação do braço decide quanto a clavícula e a escápula acompanham, e isso move o ombro
    let b = resolverBraco(t, k, braco[k], 0);
    for (let i = 0; i < 2; i++) b = resolverBraco(t, k, braco[k], fracRitmo(b.ang.elevacaoDoBraco));
    const p = resolverPerna(t, k, perna[k]);
    lado[k] = { ...b, quadril: p.quadril, joelho: p.joelho, tornozelo: p.tornozelo, pe: p.pe, dedos: p.dedos, bola: p.bola, calcanhar: p.calcanhar, ponta: p.ponta, coxa: p.coxa, canela: p.canela, ang: { ...b.ang, joelho: p.flex }, falta: { braco: b.falta.braco, perna: p.falta } };
  }
  return { ...t, lado };
}
export const resolver = (corpo: Corpo, pose: Pose): Esq => resolverMembros(resolverTronco(corpo, pose.tronco), pose.braco, pose.perna);

/** A pose em pé, braços ao lado do corpo e palmas para as coxas (para a calibração, os testes e a folha do corpo). */
/**
 * Em pé, parado. `abrir` afasta os braços do corpo, em graus, girando em torno do ombro (0 = pendurados na vertical).
 * No desenho aprovado do Boneco, os braços pendurados aparecem 6° afastados (scripts/boneco-desenho/figura.mjs).
 */
export function poseEmPe(corpo: Corpo, abrir = 0): Pose {
  const m = (id: string) => corpo.m(id);
  const h = m('quadril.meiaDistancia');
  const braco = (s: number): PoseBraco => ({ pegada: [s * (m('ombro.meiaDistancia') + 3.5), m('altura.punho') - m('mao.punhoAoCentroDaPegada'), 1], polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'relaxada' } });
  const perna = (s: number): PosePerna => ({ pe: { bola: [s * (h + 1), 0, m('pe.calcanharABola') - m('pe.calcanharAoTornozelo')], dir: [s * 0.12, 0, 1] }, polo: [s * 0.1, 0, 1] });
  const pose: Pose = { tronco: { pelve: [0, m('altura.trocanter'), 0] }, braco: { R: braco(-1), L: braco(1) }, perna: { R: perna(-1), L: perna(1) } };
  if (!abrir) return pose;
  const e = resolver(corpo, pose);
  for (const k of LADOS) {
    const o = e.lado[k].ombro,
      p = pose.braco[k].pegada as V3,
      a = (sinal(k) * abrir * Math.PI) / 180;
    const dx = p[0] - o[0],
      dy = p[1] - o[1];
    pose.braco[k] = { ...pose.braco[k], pegada: [o[0] + dx * Math.cos(a) - dy * Math.sin(a), o[1] + dx * Math.sin(a) + dy * Math.cos(a), p[2]] };
  }
  return pose;
}
