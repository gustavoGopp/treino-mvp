// Motor novo: o Boneco aprovado (docs/revisoes/boneco-desenho/decisao.md), em qualquer vista.
// As pranchas aprovadas eram formas 2D, uma para cada vista. Aqui cada parte do corpo vira uma fileira de seções
// ovais: o perfil desenhado de lado dá o raio para a frente e para trás, e o perfil desenhado de frente dá a largura.
// De lado e de frente, o contorno calculado coincide com o desenho aprovado; nas outras vistas, sai da mesma forma.
// Os grupos musculares, o cabelo e as linhas dos dedos são desenhos presos à superfície de cada parte.
import dados from './dados/boneco.json';
import type { Anel, Volume } from './corpo3d';
import { contorno } from './desenho';
import type { Camera, Item, P2 } from './desenho';
import { LADOS, naColuna, resolverTronco, sinal } from './esqueleto';
import type { Esq, Lado } from './esqueleto';
import type { Corpo } from './tabelas';
import { add, comb, dot, mul, noRef } from './vec';
import type { Ref, V3 } from './vec';

type Tabela = number[][];
const PERFIS = dados.perfis as Record<string, Tabela>;
const FORMAS = dados.formas as Record<string, Tabela>;
type PontoMus = [number, number | string];
interface MusculoDesenhado {
  id: string;
  em: string;
  pts: PontoMus[];
  div?: PontoMus[][];
  unico?: boolean;
}
const MUSCULOS = dados.musculos as unknown as Record<'lado' | 'frente' | 'costas', MusculoDesenhado[]>;
export type IdEstilo = 'cinza' | 'pele';
export type Papel = 'p' | 's' | 'a';

/* ============================== leitura das tabelas ============================== */
/** Valor de uma coluna de um perfil [t, a, b] num t qualquer (linear entre as estações desenhadas). */
function noPerfil(p: Tabela, t: number, col: number): number {
  const u = Math.max(p[0]![0]!, Math.min(p[p.length - 1]![0]!, t));
  for (let k = 1; k < p.length; k++) if (u <= p[k]![0]!) return p[k - 1]![col]! + ((p[k]![col]! - p[k - 1]![col]!) * (u - p[k - 1]![0]!)) / (p[k]![0]! - p[k - 1]![0]! || 1);
  return p[p.length - 1]![col]!;
}
/** Onde uma reta (horizontal ou vertical) corta um polígono fechado: o menor e o maior valor da outra coordenada. */
function corte(pol: Tabela, eixo: 0 | 1, v: number): [number, number] | null {
  const o = eixo === 0 ? 1 : 0;
  let min = 1e9,
    max = -1e9;
  for (let i = 0; i < pol.length; i++) {
    const a = pol[i]!,
      b = pol[(i + 1) % pol.length]!;
    if (a[eixo]! - v === 0 || (a[eixo]! - v) * (b[eixo]! - v) < 0) {
      const u = (v - a[eixo]!) / (b[eixo]! - a[eixo]! || 1);
      const w = a[o]! + (b[o]! - a[o]!) * u;
      min = Math.min(min, w);
      max = Math.max(max, w);
    }
  }
  return max >= min ? [min, max] : null;
}
/**
 * A forma como foi aprovada: as pranchas ligam os pontos por uma curva suave (Catmull-Rom, com canto vivo onde o ponto
 * tem um terceiro valor). Aqui a mesma curva vira um polígono fino, para os cortes baterem com o desenho.
 */
function curvar(pol: Tabela): Tabela {
  const n = pol.length,
    out: Tabela = [];
  const P = (i: number) => pol[((i % n) + n) % n]!;
  for (let i = 0; i < n; i++) {
    const p0 = P(i - 1),
      p1 = P(i),
      p2 = P(i + 1),
      p3 = P(i + 2);
    const c1 = p1[2] ? p1 : [p1[0]! + (p2[0]! - p0[0]!) / 6, p1[1]! + (p2[1]! - p0[1]!) / 6];
    const c2 = p2[2] ? p2 : [p2[0]! - (p3[0]! - p1[0]!) / 6, p2[1]! - (p3[1]! - p1[1]!) / 6];
    for (let k = 0; k < 8; k++) {
      const t = k / 8,
        u = 1 - t;
      out.push([0, 1].map((j) => u * u * u * p1[j]! + 3 * u * u * t * c1[j]! + 3 * u * t * t * c2[j]! + t * t * t * p2[j]!));
    }
  }
  return out;
}
/** Uma metade desenhada de frente vira a forma inteira (espelhada), como nas pranchas. */
function inteiro(metade: Tabela): Tabela {
  const esp = metade.map((q) => (q[2] ? [-q[0]!, q[1]!, 1] : [-q[0]!, q[1]!])).reverse();
  return [...metade, ...esp.slice(metade[metade.length - 1]![0] === 0 ? 1 : 0, metade[0]![0] === 0 ? -1 : undefined)];
}
const CURVAS = new Map<string, Tabela>();
/** A forma `nome` das tabelas, já em curva (as terminadas em _F são metades e viram a forma inteira). */
function forma(nome: string): Tabela {
  let c = CURVAS.get(nome);
  if (!c) {
    const t = FORMAS[nome]!;
    c = curvar(nome.endsWith('_F') && nome !== 'MAO_F' && nome !== 'POLEGAR_F' ? inteiro(t) : t);
    CURVAS.set(nome, c);
  }
  return c;
}
/** Meia-largura de uma forma desenhada de frente ([x, y] em pé), numa altura y. */
function meiaLargura(nome: string, y: number): number {
  const f = forma(nome);
  const k = corte(f, 1, y);
  if (k) return Math.max(Math.abs(k[0]), Math.abs(k[1]));
  // fora da faixa desenhada: a ponta mais próxima
  const perto = f.reduce((m, q) => (Math.abs(q[1]! - y) < Math.abs(m[1]! - y) ? q : m));
  return Math.abs(perto[0]!);
}

/* ============================== a superfície de cada parte ============================== */
/** Uma seção da superfície: ponto do eixo, direção "de fora" (ou esquerda, no tronco), frente, meia-largura, desvio do centro e raios. */
interface Secao {
  o: V3;
  fora: V3;
  z: V3;
  a: number;
  des: number;
  f: number;
  b: number;
}
interface Superficie {
  em(t: number): Secao;
}
const anelDe = (s: Secao, k = 1): Anel => ({ c: add(s.o, mul(s.fora, s.des)), x: s.fora, z: s.z, a: s.a * k, f: s.f * k, b: s.b * k });
/** Volume de uma superfície entre t0 e t1, com as pontas arredondadas (como as pontas dos membros no desenho). */
function volumeDe(sup: Superficie, ts: number[], _comp: number, redonda0 = true, redonda1 = true): Volume {
  const aneis: Anel[] = [];
  // ponta arredondada: dois anéis menores além do fim, na direção do eixo
  const ponta = (t: number, sentido: number): Anel[] => {
    const s = sup.em(t);
    const r = Math.min(s.a, (s.f + s.b) / 2);
    const eixo = mul(norm3(sub3(sup.em(t + 0.02 * sentido).o, s.o)), 1);
    // a mesma calota das pranchas: 72% da largura a 68% do raio, e a ponta a 98% do raio
    return [[0.92, 0.36], [0.72, 0.68], [0.42, 0.9], [0.14, 0.98]].map(([k, d]) => {
      const an = anelDe(s, k);
      return { ...an, c: add(an.c, mul(eixo, r * d!)) };
    });
  };
  if (redonda0) aneis.push(...ponta(ts[0]!, -1).reverse());
  for (const t of ts) aneis.push(anelDe(sup.em(t)));
  if (redonda1) aneis.push(...ponta(ts[ts.length - 1]!, 1));
  return { aneis };
}
const sub3 = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const norm3 = (a: V3): V3 => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const passos = (n: number, de = 0, ate = 1) => Array.from({ length: n + 1 }, (_, i) => de + ((ate - de) * i) / n);

/** Membro reto: do referencial `r` (origem na junta de cima, y para cima, z para a frente) por `comp` cm. */
function supMembro(r: Ref, comp: number, lado: number, L: Tabela, F: Tabela, k = 1, torcer?: (t: number) => { x: V3; z: V3 }): Superficie {
  return {
    em(t) {
      const eixos = torcer ? torcer(t) : { x: r.x, z: r.z };
      const den = noPerfil(F, t, 1) * k,
        fo = noPerfil(F, t, 2) * k;
      return { o: add(r.o, mul(r.y, -t * comp)), fora: mul(eixos.x, lado), z: eixos.z, a: (den + fo) / 2, des: (fo - den) / 2, f: noPerfil(L, t, 1) * k, b: noPerfil(L, t, 2) * k };
    },
  };
}

/** Alturas em pé de cada ponto da coluna, por corpo (para casar o desenho de frente, feito em pé, com a coluna). */
const EM_PE = new WeakMap<Corpo, { yDoTronco: (t: number) => number; tDoTronco: (y: number) => number; tDaSuperficie: (y: number, x: number, tras: boolean) => number; yQuadril: number }>();
function emPe(c: Corpo) {
  let r = EM_PE.get(c);
  if (r) return r;
  const t0 = resolverTronco(c, { pelve: [0, c.m('altura.trocanter'), 0] });
  const sC7 = t0.nos[t0.iC7]!.s;
  const yDoTronco = (t: number) => naColuna(t0, sC7 * (1 - t)).o[1];
  const tDoTronco = (y: number) => {
    let a = 0,
      b = 1;
    for (let i = 0; i < 24; i++) {
      const m = (a + b) / 2;
      if (yDoTronco(m) > y) a = m;
      else b = m;
    }
    return (a + b) / 2;
  };
  /** Em que ponto do tronco (t) a superfície da frente (ou de trás), a `x` cm do meio, fica na altura y em pé. */
  const tDaSuperficie = (y: number, x: number, tras: boolean) => {
    const alt = (t: number) => {
      const s = naColuna(t0, sC7 * (1 - t));
      const a = meiaLargura('TRONCO_F', s.o[1]) || 1;
      const w = (tras ? -noPerfil(PERFIS.TRONCO_L!, t, 2) : noPerfil(PERFIS.TRONCO_L!, t, 1)) * Math.sqrt(Math.max(0, 1 - Math.min(1, (x / a) ** 2)));
      return s.o[1] + w * s.z[1];
    };
    let a = 0,
      b = 1;
    for (let i = 0; i < 22; i++) {
      const m = (a + b) / 2;
      if (alt(m) > y) a = m;
      else b = m;
    }
    return (a + b) / 2;
  };
  r = { yDoTronco, tDoTronco, tDaSuperficie, yQuadril: c.m('altura.trocanter') };
  EM_PE.set(c, r);
  return r;
}

export interface FormaDoBoneco {
  /** Grupos pintados com um contorno só, na ordem de dentro para fora de cada um. */
  grupos: { id: string; lado?: Lado; volumes: { vol: Volume; mat: string; nome?: string }[] }[];
  sup: Record<string, Superficie>;
  /** Para os desenhos em coordenadas "em pé" (de frente e de costas): o ponto da superfície do tronco ou da bacia. */
  noCorpo(x: number, y: number, tras: boolean): V3;
}

/** Monta as partes do corpo aprovado para um esqueleto resolvido. `roupa` = short e tênis (o desenho de cor de pele). */
export function formaDoBoneco(e: Esq, o: { roupa?: boolean; cabeloAtrasPrimeiro?: boolean } = {}): FormaDoBoneco {
  const c = e.corpo,
    m = (id: string) => c.m(id),
    P = emPe(c);
  const sup: Record<string, Superficie> = {};
  const grupos: FormaDoBoneco['grupos'] = [];
  // ---------- tronco: ao longo da coluna, de C7 (t = 0) ao fim da lombar (t = 1) ----------
  const sC7 = e.nos[e.iC7]!.s,
    sCr = e.nos[e.iCranio]!.s;
  // A seção do tronco e a do pescoço ficam atravessadas à coluna, com a direção medida entre os pontos vizinhos (como
  // a faixa das pranchas). Nas pontas a direção é a do próprio trecho: em C7, o tronco segue a torácica e o pescoço
  // segue a cervical, e por isso sobra entre os dois a dobra do pescoço que o desenho aprovado mostra de lado.
  const atravessada = (s0: number, s1: number, t: number, passo: number): { o: V3; x: V3; z: V3 } => {
    const em = (u: number) => naColuna(e, s0 + (s1 - s0) * Math.max(0, Math.min(1, u)));
    const r = em(t);
    const desce = norm3(sub3(em(t + passo).o, em(t - passo).o));
    // para a frente: perpendicular à coluna e ao eixo dos lados (z = desce × x)
    const z = norm3([desce[1] * r.x[2] - desce[2] * r.x[1], desce[2] * r.x[0] - desce[0] * r.x[2], desce[0] * r.x[1] - desce[1] * r.x[0]]);
    return { o: r.o, x: r.x, z };
  };
  const tronco: Superficie = {
    em(t) {
      const r = atravessada(sC7, 0, t, 0.09);
      return { o: r.o, fora: r.x, z: r.z, a: meiaLargura('TRONCO_F', P.yDoTronco(t)), des: 0, f: noPerfil(PERFIS.TRONCO_L!, t, 1), b: noPerfil(PERFIS.TRONCO_L!, t, 2) };
    },
  };
  sup.tronco = tronco;
  // ---------- bacia: ao longo da vertical da pelve; t = altura em cm acima do centro do quadril ----------
  const pelve: Superficie = {
    em(y) {
      const k = corte(forma('PELVE_L'), 1, Math.max(-9.7, Math.min(12.8, y))) ?? [-6, 12];
      return { o: noRef(e.pelve, [0, y, (k[0] + k[1]) / 2]), fora: e.pelve.x, z: e.pelve.z, a: meiaLargura('PELVE_F', P.yQuadril + y), des: 0, f: (k[1] - k[0]) / 2, b: (k[1] - k[0]) / 2 };
    },
  };
  sup.pelve = pelve;
  // ---------- pescoço: da base do crânio (t = 0) a C7 (t = 1) ----------
  const pescoco: Superficie = {
    em(t) {
      const r = atravessada(sCr, sC7, t, 0.25);
      // a parte de trás pode ficar à frente da linha da coluna (valor negativo no perfil): o centro da seção desloca
      const f = noPerfil(PERFIS.PESCOCO_L!, t, 1),
        b = noPerfil(PERFIS.PESCOCO_L!, t, 2);
      return { o: add(r.o, mul(r.z, (f - b) / 2)), fora: r.x, z: r.z, a: 5.4 + 0.25 * Math.max(0, Math.min(1, t)), des: 0, f: (f + b) / 2, b: (f + b) / 2 };
    },
  };
  // ---------- cabeça: ao longo da vertical da cabeça; t = altura em cm acima da base do crânio ----------
  const cabeca: Superficie = {
    em(y) {
      const k = corte(forma('CABECA_L'), 1, y) ?? [8, 10];
      return { o: noRef(e.cabeca, [0, y, (k[0] + k[1]) / 2]), fora: e.cabeca.x, z: e.cabeca.z, a: Math.max(0.6, meiaLargura('CABECA_F', y)), des: 0, f: Math.max(0.5, (k[1] - k[0]) / 2), b: Math.max(0.5, (k[1] - k[0]) / 2) };
    },
  };
  sup.cabeca = cabeca;
  const corpoVols: FormaDoBoneco['grupos'][number]['volumes'] = [
    { vol: volumeDe(pescoco, [0, 0.25, 0.5, 0.75, 1], 0, false, false), mat: 'pele', nome: 'pescoco' },
    { vol: volumeDe(tronco, passos(16), 0, false, false), mat: 'pele', nome: 'tronco' },
    { vol: { aneis: [12.7, 11.5, 9.5, 7, 4.5, 2, -0.5, -3, -5.2, -7, -8.4, -9.3, -9.7].map((y) => anelDe(pelve.em(y))) }, mat: o.roupa ? 'short' : 'pele', nome: 'pelve' },
    { vol: { aneis: [13.05, 12.8, 12.2, 11.2, 9.8, 8, 6, 4, 2, 0, -2, -4, -5.8, -7.4, -8.6, -9.5, -9.95].map((y) => anelDe(cabeca.em(y))) }, mat: 'pele', nome: 'cabeca' },
  ];
  if (o.roupa) {
    // cabelo curto (só no desenho de cor de pele): uma calota em cima e a parte de trás, que desce até a nuca.
    // Em cada altura, o cabelo vai da nuca até onde o desenho de lado manda (CABELO_L).
    const fio = (y: number, folga: number): Anel | null => {
      const cab = corte(forma('CABECA_L'), 1, Math.min(12.9, y)),
        cabelo = corte(forma('CABELO_L'), 1, y);
      if (!cab || !cabelo) return null;
      const zf = Math.min(cab[1] + folga, cabelo[1]),
        zb = cab[0] - folga;
      if (zf - zb < 1) return null;
      return { c: noRef(e.cabeca, [0, y, (zf + zb) / 2]), x: e.cabeca.x, z: e.cabeca.z, a: Math.max(0.6, meiaLargura('CABECA_F', Math.min(12.9, y)) + folga) * (zf >= cab[1] ? 1 : 0.98), f: (zf - zb) / 2, b: (zf - zb) / 2 };
    };
    const calota = [13.3, 12.6, 11.4, 10, 8.8].map((y) => fio(y, 0.55)).filter((a): a is Anel => !!a);
    const atras = [9.8, 8.8, 7, 5, 3, 1, -1, -2.6].map((y) => fio(y, 0.55)).filter((a): a is Anel => !!a);
    const cabeloAtras = { vol: { aneis: atras }, mat: 'cabelo', nome: 'cabeloAtras' };
    if (o.cabeloAtrasPrimeiro) corpoVols.unshift(cabeloAtras);
    else corpoVols.push(cabeloAtras);
    corpoVols.push({ vol: { aneis: calota }, mat: 'cabelo', nome: 'calota' });
  }
  grupos.push({ id: 'corpo', volumes: corpoVols });
  // ---------- membros ----------
  const kPe = o.roupa ? 1 : dados.peDescalco;
  for (const k of LADOS) {
    const L = e.lado[k],
      s = sinal(k);
    const coxa = supMembro(L.coxa, m('coxa.comp'), s, PERFIS.COXA_L!, PERFIS.COXA_F!);
    const canela = supMembro(L.canela, m('perna.comp'), s, PERFIS.CANELA_L!, PERFIS.CANELA_F!);
    const braco = supMembro(L.braco, m('braco.comp'), s, PERFIS.BRACO_L!, PERFIS.BRACO_F!);
    // antebraço: a seção gira com a pronação, do cotovelo ao punho (como em ./corpo3d.ts)
    const uFa = mul(L.antebraco.y, -1);
    const ante = supMembro(L.antebraco, m('antebraco.comp'), s, PERFIS.ANTE_L!, PERFIS.ANTE_F!, 1, (t) => {
      const g = (s * (L.ang.pronacao - 90) * t * Math.PI) / 180;
      const gira = (v: V3): V3 => comb([Math.cos(g), v], [Math.sin(g), [uFa[1] * v[2] - uFa[2] * v[1], uFa[2] * v[0] - uFa[0] * v[2], uFa[0] * v[1] - uFa[1] * v[0]]]);
      return { x: gira(L.antebraco.x), z: gira(L.antebraco.z) };
    });
    sup[`coxa${k}`] = coxa;
    sup[`canela${k}`] = canela;
    sup[`braco${k}`] = braco;
    sup[`ante${k}`] = ante;
    // pé: seções ao longo do pé (do calcanhar à ponta), com a altura tirada do desenho de lado; a ponta dobra na bola
    const dBola = m('pe.calcanharABola'),
      comp = 26.6 * kPe,
      // o tênis é mais largo que o pé: 0,7 cm de cada lado (provisório; o desenho aprovado do tênis de frente tem 12,7 cm com a abertura do pé)
      larg = m('pe.largura') / 2 + (o.roupa ? 0.7 : 0),
      calc = m('pe.larguraCalcanhar') / 2 + (o.roupa ? 0.6 : 0);
    const peVol: Anel[] = [];
    for (const u of [-1.38, -1.2, -0.8, -0.2, 0.8, 2.2, 4, 6, 8, 10.2, 12, 13.8, 16, 18.5, 21, 23.5, 25.2, 26.4, 27.1, 27.4]) {
      const k2 = corte(forma('TENIS_L'), 0, u);
      if (!k2) continue;
      const x = u * kPe;
      const r = x <= dBola ? L.pe : L.dedos;
      const z = x - dBola;
      const w = x < 4 ? calc * Math.max(0.3, 0.55 + 0.45 * (x / 4)) : x < dBola ? calc + ((larg - calc) * (x - 4)) / (dBola - 4) : larg * (1 - 0.55 * ((x - dBola) / (comp - dBola)) ** 2);
      const y0 = Math.max(0, k2[0]) * kPe,
        h = Math.max(0.3, k2[1] * kPe - y0);
      // perto da ponta e do calcanhar a seção afina também de lado, para o pé fechar redondo visto de cima e de frente
      const fecha = Math.min(1, h / 2.2);
      // seção de base chata: o pé apoia a largura inteira no chão (meia oval para cima, quase reta embaixo)
      const base = Math.min(0.7, h * 0.3);
      peVol.push({ c: noRef(r, [0, y0 + base, z]), x: r.x, z: r.y, a: Math.max(0.3, w * (0.45 + 0.55 * fecha)), f: h - base, b: base });
    }
    grupos.push({
      id: `perna${k}`,
      lado: k,
      volumes: [
        { vol: volumeDe(coxa, passos(10), 0), mat: 'pele', nome: 'coxa' },
        { vol: volumeDe(canela, passos(10), 0), mat: 'pele', nome: 'canela' },
        { vol: { aneis: peVol }, mat: o.roupa ? 'calcado' : 'pele', nome: 'pe' },
        ...(o.roupa ? [{ vol: volumeDe(supMembro(L.coxa, m('coxa.comp'), s, PERFIS.COXA_L!, PERFIS.COXA_F!, dados.short.folga), passos(5, 0, dados.short.ate), 0, true, false), mat: 'short' }] : []),
      ],
    });
    // mão: luva, com a forma conforme o que faz (segura, solta ou espalmada). De lado vale o desenho de lado
    // (MAO_PEGADA, MAO_SOLTA); a espessura, vista de frente, vem de MAO_F (palma para o lado de +z da mão).
    const nomeMao = L.formaMao === 'pegada' ? 'MAO_PEGADA' : 'MAO_SOLTA';
    const chao = L.formaMao === 'aberta';
    const dedos = mul(L.mao.y, -1),
      polegar = mul(L.mao.x, s);
    const maoAneis: Anel[] = [];
    const fim = nomeMao === 'MAO_PEGADA' ? 10.3 : 18.4;
    for (const q of [0, 0.015, 0.06, 0.14, 0.24, 0.34, 0.44, 0.54, 0.64, 0.74, 0.83, 0.9, 0.95, 0.985, 1]) {
      const u = q * fim;
      const lg = corte(forma(nomeMao), 0, Math.max(0.02, Math.min(fim - 0.02, u))) ?? [-2, 2];
      // a luva sem o polegar (ele é um volume à parte): na mão solta, o lado do polegar segue a linha dos dedos
      if (nomeMao === 'MAO_SOLTA' && u > 1 && u < 10.7) lg[1] = Math.min(lg[1], u < 3.5 ? 2.5 + 0.4 * u : 3.9 - ((u - 3.5) * 0.7) / 7.2);
      let f: number, b: number;
      if (chao) {
        const esp = corte(forma('MAO_CHAO'), 0, Math.max(-1.5, Math.min(18.5, u))) ?? [-2.3, 0];
        f = 2.3;
        b = Math.max(0.3, esp[1]);
      } else if (nomeMao === 'MAO_PEGADA') {
        // punho fechado: mais grosso do lado da palma (os dedos dobrados), arredondado nas pontas
        const k3 = u > 7.6 ? Math.sqrt(Math.max(0.08, 1 - ((u - 7.6) / 2.9) ** 2)) : u < 1.5 ? 0.75 + (0.25 * u) / 1.5 : 1;
        f = 3.4 * k3;
        b = 2.3 * k3;
      } else {
        const esp = corte(forma('MAO_F'), 0, Math.max(0.02, Math.min(16.18, (u * 16.2) / 18.4))) ?? [-2, 2];
        f = Math.max(0.3, esp[1]);
        b = Math.max(0.3, -esp[0]);
      }
      // mão em concha: dos nós dos dedos em diante, os dedos dobram para o lado da palma (abraçam o que seguram)
      const dobra = L.formaMao === 'concha' && u > 8.5 ? (u - 8.5) * 0.62 : 0;
      maoAneis.push({ c: comb([1, L.punho], [u - dobra * 0.25, dedos], [(lg[0] + lg[1]) / 2, polegar], [dobra, L.mao.z]), x: polegar, z: L.mao.z, a: Math.max(0.3, (lg[1] - lg[0]) / 2), f, b });
    }
    // polegar: três pontos [ao longo dos dedos, para o lado do polegar, para o lado da palma, raio], tirados do
    // polegar desenhado de lado (POLEGAR_L, e a saliência de MAO_SOLTA) e de frente (POLEGAR_F)
    const pol: [number, number, number, number][] =
      nomeMao === 'MAO_PEGADA'
        ? [[2.4, 2.6, 1.0, 1.25], [5.8, 5.0, 1.7, 1.2], [8.8, 5.8, 2.3, 0.95]]
        : chao
          ? [[3.2, 3.9, 0, 1.2], [6.6, 6.0, 0, 1.1], [9.4, 7.2, 0, 0.9]]
          : [[2.6, 3.0, 1.1, 1.15], [5.6, 4.0, 2.4, 1.1], [8.8, 4.6, 3.3, 0.9]];
    const polAneis: Anel[] = [-0.12, 0, 0.25, 0.5, 0.75, 1, 1.1].map((q) => {
      const t = Math.max(0, Math.min(1, q)) * 2,
        i = Math.min(1, Math.floor(t)),
        w = t - i;
      const a = pol[i]!,
        b = pol[i + 1]!;
      const v = [0, 1, 2, 3].map((j) => a[j]! + (b[j]! - a[j]!) * w);
      // as pontas fecham redondas: um anel menor um pouco além de cada ponta
      const fora = q < 0 || q > 1,
        r = v[3]! * (fora ? 0.55 : 1),
        du = q < 0 ? -0.75 * v[3]! : q > 1 ? 0.75 * v[3]! : 0;
      const eixo = [b[0]! - a[0]!, b[1]! - a[1]!, b[2]! - a[2]!],
        le = Math.hypot(eixo[0]!, eixo[1]!, eixo[2]!) || 1;
      return { c: comb([1, L.punho], [v[0]! + (du * eixo[0]!) / le, dedos], [v[1]! + (du * eixo[1]!) / le, polegar], [v[2]! + (du * eixo[2]!) / le, L.mao.z]), x: L.mao.z, z: polegar, a: r, f: r, b: r };
    });
    sup[`mao${k}`] = { em: (t) => ({ o: add(L.punho, mul(dedos, t)), fora: polegar, z: L.mao.z, a: 4, des: 0, f: 3.4, b: 2.3 }) };
    grupos.push({ id: `braco${k}`, lado: k, volumes: [{ vol: volumeDe(braco, passos(8), 0), mat: 'pele', nome: 'braco' }, { vol: volumeDe(ante, passos(8), 0), mat: 'pele', nome: 'ante' }, { vol: { aneis: maoAneis }, mat: 'pele', nome: 'mao' }, { vol: { aneis: polAneis }, mat: 'pele', nome: 'polegar' }] });
  }
  const noCorpo = (x: number, y: number, tras: boolean): V3 => {
    const yBase = P.yDoTronco(1);
    const s = y >= yBase ? tronco.em(P.tDaSuperficie(y, x, tras)) : pelve.em(y - P.yQuadril);
    const rel = Math.max(-1, Math.min(1, x / (s.a || 1)));
    const w = (tras ? -s.b : s.f) * Math.sqrt(Math.max(0, 1 - rel * rel));
    return comb([1, s.o], [x, s.fora], [w, s.z]);
  };
  return { grupos, sup, noCorpo };
}

/**
 * Pontos da superfície do Boneco (12 por seção), com o nome da parte: é com eles que a conferência mede se o corpo
 * atravessa o chão ou uma peça, e que a flexão mede a folga do peito ao chão.
 */
export function pontosDoBoneco(e: Esq): { p: V3; parte: string }[] {
  const out: { p: V3; parte: string }[] = [];
  for (const g of formaDoBoneco(e).grupos)
    for (const v of g.volumes)
      for (const an of v.vol.aneis)
        for (let k = 0; k < 12; k++) {
          const th = (k * Math.PI) / 6,
            sn = Math.sin(th);
          out.push({ p: comb([1, an.c], [an.a * Math.cos(th), an.x], [(sn >= 0 ? an.f : an.b) * sn, an.z]), parte: v.nome ?? g.id });
        }
  return out;
}

/* ============================== desenhos presos à superfície (músculos, rótula) ============================== */
type Face = 'fora' | 'frente' | 'tras';
/** Ponto [t, d] de um desenho de músculo → ponto 3D na superfície da parte, na face que o desenho mostra. */
function naSuperficie(sup: Superficie, comp: (t: number) => number, face: Face, pt: PontoMus, ladoVisivel = 1): V3 {
  const s = sup.em(comp(pt[0]));
  let d: number;
  if (typeof pt[1] === 'number') d = pt[1];
  else {
    const lado = pt[1][0]!,
      folga = parseFloat(pt[1].slice(1));
    const dentro = s.a - s.des,
      fora = s.a + s.des;
    d = lado === 'f' ? s.f + folga : lado === 't' ? -(s.b + folga) : lado === 'd' ? dentro + folga : -(fora + folga);
  }
  if (face === 'fora') {
    // desenho de lado: d é para a frente (+) ou para trás (−); o ponto fica na metade de fora da parte
    const r = d >= 0 ? s.f : s.b;
    const u = s.des + s.a * Math.sqrt(Math.max(0, 1 - Math.min(1, (d / (r || 1)) ** 2)));
    return comb([1, s.o], [u * ladoVisivel, s.fora], [d, s.z]);
  }
  // desenho de frente ou de costas: d é para dentro (+) ou para fora (−)
  const u = -d;
  const rel = Math.max(-1, Math.min(1, (u - s.des) / (s.a || 1)));
  const w = (face === 'frente' ? s.f : -s.b) * Math.sqrt(Math.max(0, 1 - rel * rel));
  return comb([1, s.o], [u, s.fora], [w, s.z]);
}
export interface DesenhoNaSuperficie {
  id: string;
  /** Em qual grupo de pintura fica (para a ordem). */
  grupo: string;
  /** De que lado do corpo é (ausente nos músculos do meio, como o abdômen). */
  lado?: Lado;
  pts: V3[];
  div: V3[][];
}
/** Os grupos musculares e a rótula que se veem numa câmera: cada parte usa o desenho da face que está virada para quem olha. */
export function musculosVisiveis(e: Esq, forma: FormaDoBoneco, cam: Camera): DesenhoNaSuperficie[] {
  const out: DesenhoNaSuperficie[] = [];
  const faceDe = (fora: V3, z: V3): Face | null => {
    const lx = dot(cam.para, fora),
      lz = dot(cam.para, z);
    // a face mais virada para quem olha (de fora, da frente ou de trás); a de dentro (entre as pernas, ou contra o
    // tronco) não tem desenho. Numa parte que aponta para quem olha (a coxa no fundo do agachamento, de frente),
    // todas ficam de viés: vale a que ainda aparece.
    const melhor = Math.max(lx, lz, -lz);
    if (melhor < 0.06) return null;
    return melhor === lx ? 'fora' : lz >= 0 ? 'frente' : 'tras';
  };
  const lista = (f: Face) => (f === 'fora' ? MUSCULOS.lado : f === 'frente' ? MUSCULOS.frente : MUSCULOS.costas);
  const nomeDaParte: Record<string, string> = { coxa: 'coxa', canela: 'canela', braco: 'braco', ante: 'ante' };
  // membros: cada um escolhe a própria face
  for (const k of LADOS) {
    for (const parte of ['coxa', 'canela', 'braco', 'ante']) {
      const sup = forma.sup[`${parte}${k}`]!;
      const meio = sup.em(0.5);
      const face = faceDe(meio.fora, meio.z);
      if (!face) continue;
      for (const mu of lista(face)) {
        if (nomeDaParte[mu.em] !== parte) continue;
        const f = (q: PontoMus) => naSuperficie(sup, (t) => t, face, q);
        out.push({ id: mu.id, lado: k, grupo: parte === 'coxa' || parte === 'canela' ? `perna${k}` : `braco${k}`, pts: mu.pts.map(f), div: (mu.div ?? []).map((l) => l.map(f)) });
      }
    }
  }
  // linhas dos dedos na mão que segura, na face da mão virada para quem olha
  const DEDOS = (dados.linhas as Record<string, number[][][]>).DEDOS_L!;
  for (const k of LADOS) {
    const L = e.lado[k];
    if (L.formaMao !== 'pegada') continue;
    const face = dot(cam.para, L.mao.z);
    if (Math.abs(face) < 0.3) continue;
    const dedos = mul(L.mao.y, -1),
      polegar = mul(L.mao.x, sinal(k));
    const linha = DEDOS.map((l) => l.map(([u, ac]) => comb([1, L.punho], [u!, dedos], [ac!, polegar], [face > 0 ? 3.4 : -2.3, L.mao.z])));
    out.push({ id: 'dedos', grupo: `braco${k}`, pts: [], div: linha });
  }
  // tronco e bacia
  const tr = forma.sup.tronco!.em(0.5);
  const lx = dot(cam.para, tr.fora),
    lz = dot(cam.para, tr.z);
  if (Math.abs(lx) >= Math.abs(lz)) {
    // de lado: o desenho vale para o lado que está virado para quem olha
    const ladoVisivel = lx > 0 ? 1 : -1;
    const lado: Lado = lx > 0 ? 'L' : 'R';
    for (const mu of MUSCULOS.lado) {
      if (mu.em === 'tronco') {
        const f = (q: PontoMus) => naSuperficie(forma.sup.tronco!, (t) => t, 'fora', q, ladoVisivel);
        out.push({ id: mu.id, lado, grupo: 'corpo', pts: mu.pts.map(f), div: (mu.div ?? []).map((l) => l.map(f)) });
      } else if (mu.em === 'pelve') {
        // pontos [para a frente, para cima] a partir do centro do quadril
        const f = (q: PontoMus): V3 => {
          const s = forma.sup.pelve!.em(q[1] as number);
          const w = (q[0] as number) - dot(sub3(s.o, e.pelve.o), e.pelve.z);
          const u = s.a * Math.sqrt(Math.max(0, 1 - Math.min(1, (w / (s.f || 1)) ** 2)));
          return comb([1, s.o], [u * ladoVisivel, s.fora], [w, s.z]);
        };
        out.push({ id: mu.id, lado, grupo: 'bacia', pts: mu.pts.map(f), div: [] });
      }
    }
  } else {
    const tras = lz < 0;
    for (const mu of tras ? MUSCULOS.costas : MUSCULOS.frente) {
      if (mu.em !== 'abs') continue;
      for (const esp of mu.unico ? [1] : [1, -1]) {
        const f = (q: PontoMus) => forma.noCorpo((q[0] as number) * esp, q[1] as number, tras);
        const meio = mu.pts.reduce((t, q) => t + (q[0] as number) * esp, 0);
        out.push({ id: mu.id, lado: mu.unico ? undefined : meio < 0 ? 'R' : 'L', grupo: mu.id === 'gluteo' ? 'bacia' : 'corpo', pts: mu.pts.map(f), div: (mu.div ?? []).map((l) => l.map(f)) });
      }
    }
  }
  return out;
}

/* ============================== pintura ============================== */
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
/** Curva fechada (ou aberta) suave pelos pontos, como a `suave` das pranchas. */
function suave(P: P2[], fechado = true): string {
  const n = P.length;
  if (n < 2) return '';
  const p = (i: number) => (fechado ? P[((i % n) + n) % n]! : P[Math.max(0, Math.min(n - 1, i))]!);
  let d = `M${f1(P[0]![0])} ${f1(P[0]![1])}`;
  for (let i = 0; i < (fechado ? n : n - 1); i++) {
    const p0 = p(i - 1),
      p1 = p(i),
      p2 = p(i + 1),
      p3 = p(i + 2);
    d += `C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d + (fechado ? 'Z' : '');
}
const naTela = (cam: Camera, p: V3): P2 => [dot(p, cam.dir), -dot(p, cam.cima)];

export interface OpcoesDoBoneco {
  estilo: IdEstilo;
  /**
   * Quem trabalha: id do grupo muscular → principal, secundário ou só ajuda. `dorsal:R` vale só para o lado direito
   * (exercício unilateral). Sem isso, só as linhas do corpo.
   */
  papeis?: Record<string, Papel>;
  /** Miniatura: somem as linhas do corpo e as divisões do músculo. */
  mini?: boolean;
  /** Sufixo das classes: '-e' (figura do erro) ou '-f' (fantasma do movimento certo). */
  suf?: string;
  /** Grupos (corpo, pernaR, pernaL, bracoR, bracoL) pintados na cor de erro: a parte do corpo que erra. */
  erroEm?: string[];
  /** Ajuste de profundidade por grupo (ex.: o braço por cima do halter). */
  vies?: Record<string, number>;
}
const hash = (t: string) => {
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) {
    h ^= t.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
};
/**
 * O Boneco pronto para pintar: uma lista de itens em ordem de profundidade.
 * Como nas pranchas aprovadas: o tronco, a bacia, o pescoço, a cabeça e as pernas de perto têm um contorno só (a coxa
 * sai do quadril sem emenda); a perna ganha linha onde passa na frente do tronco; cada braço tem o seu contorno; o
 * braço e a perna do lado de longe vêm antes, no tom de longe. Os músculos ficam logo por cima da parte em que estão.
 */
export function desenharBoneco(e: Esq, cam: Camera, o: OpcoesDoBoneco): Item[] {
  // de frente, o cabelo de trás fica atrás da cabeça; de lado e de costas, por cima dela
  const forma = formaDoBoneco(e, { roupa: o.estilo === 'pele', cabeloAtrasPrimeiro: dot(cam.para, e.cabeca.z) > 0.45 });
  const suf = o.suf ?? '';
  const itens: Item[] = [];
  const prof = (k: Lado) => dot(e.lado[k].ombro, cam.para) + dot(e.lado[k].quadril, cam.para);
  const longe: Lado | null = Math.abs(prof('R') - prof('L')) < 6 ? null : prof('R') < prof('L') ? 'R' : 'L';
  const G = forma.grupos.map((g) => {
    const cs = g.volumes.map((v) => ({ c: contorno(cam, v.vol, null), mat: v.mat, nome: v.nome }));
    const d = cs.reduce((s, x) => s + x.c.d, 0) / cs.length;
    const cx = cs.reduce<[number, number, number, number]>((a, x) => [Math.min(a[0], x.c.cx[0]), Math.min(a[1], x.c.cx[1]), Math.max(a[2], x.c.cx[2]), Math.max(a[3], x.c.cx[3])], [1e9, 1e9, -1e9, -1e9]);
    return { g, cs, d, cx, longe: !!g.lado && g.lado === longe };
  });
  type Gr = (typeof G)[number];
  // a roupa (short): opaca, esconde as linhas do corpo; quando há músculo que trabalha debaixo dela, vira véu (fica
  // clara, as linhas aparecem e o músculo aparece misturado com o tecido), como na ficha aprovada
  const DEBAIXO_DO_SHORT = ['gluteo', 'quadriceps', 'adutores', 'posteriores'];
  const papelDe = (id: string, lado?: Lado): Papel | undefined => (lado ? o.papeis?.[`${id}:${lado}`] : undefined) ?? o.papeis?.[id];
  const veu = o.estilo === 'pele' && !suf && Object.keys(o.papeis ?? {}).some((id) => DEBAIXO_DO_SHORT.includes(id.split(':')[0]!));
  const mat = (m: string) => (m === 'short' && veu ? 'veu' : m);
  const eRoupa = (m: string) => m === 'short';
  // a parte que erra usa as classes de erro (contorno vermelho e pele rosada); o resto do corpo fica como é
  const sufDe = (x: Gr) => (o.erroEm?.includes(x.g.id) ? '-e' : suf);
  const traco = (x: Gr) => x.cs.map((v) => `<path class="b-c${sufDe(x)} m-${mat(v.mat)}${x.longe ? ' lg' : ''}" d="${v.c.fill}"/>`).join('');
  const cheioDe = (x: Gr, quais: (m: string) => boolean) => x.cs.filter((v) => quais(v.mat)).map((v) => `<path class="b-p${sufDe(x)} m-${mat(v.mat)}${x.longe ? ' lg' : ''}" d="${v.c.fill}"/>`).join('');
  const shorts = G.flatMap((x) => x.cs.filter((v) => eRoupa(v.mat)).map((v) => v.c.fill));
  const idShort = `bs${hash(shorts.join(''))}`;
  let recorteDoShort = veu && shorts.length ? `<clipPath id="${idShort}">${shorts.map((d) => `<path d="${d}"/>`).join('')}</clipPath>` : '';
  // músculos e rótula de um grupo: linhas do corpo (sempre) e os que trabalham (preenchidos)
  const todos = suf === '-f' ? [] : musculosVisiveis(e, forma, cam);
  const musculos = (id: string) => {
    let linhas = '',
      ativos = '',
      sobOVeu = '';
    for (const mu of todos) {
      if (mu.grupo !== id) continue;
      const papel = papelDe(mu.id, mu.lado);
      if ((!papel && o.mini) || (suf && !papel)) continue;
      const d = mu.pts.length ? suave(mu.pts.map((p) => naTela(cam, p))) : '';
      if (papel) {
        ativos += `<path class="b-m${papel}${suf}" d="${d}"/>`;
        if (papel === 'p' && !o.mini) ativos += mu.div.map((l) => `<path class="b-md${suf}" d="${suave(l.map((p) => naTela(cam, p)), false)}"/>`).join('');
        if (veu && DEBAIXO_DO_SHORT.includes(mu.id)) sobOVeu += `<path class="b-mv" d="${d}"/>`;
      } else linhas += (d ? `<path class="b-l${suf}" d="${d}"/>` : '') + mu.div.map((l) => `<path class="b-l${suf}" d="${suave(l.map((p) => naTela(cam, p)), false)}"/>`).join('');
    }
    // debaixo do véu, o músculo aparece misturado com o tecido
    if (sobOVeu) {
      ativos += `${recorteDoShort}<g clip-path="url(#${idShort})">${sobOVeu}</g>`;
      recorteDoShort = '';
    }
    return { linhas, ativos };
  };
  /** Um grupo pintado: pele, linhas do corpo e roupa (a roupa opaca cobre as linhas; o véu fica debaixo delas). */
  const pintado = (x: Gr, ids: string[], comAtivos = true) => {
    const m = ids.map(musculos);
    const linhas = m.map((y) => y.linhas).join(''),
      roupa = cheioDe(x, eRoupa);
    return cheioDe(x, (v) => !eRoupa(v)) + (veu ? roupa + linhas : linhas + roupa) + (comAtivos ? m.map((y) => y.ativos).join('') : '');
  };
  // o polegar ganha o seu contorno por cima da mão quando está do lado de quem olha (como nas pranchas)
  const polegarPorCima = (x: Gr) => {
    const mao = x.cs.find((v) => v.nome === 'mao'),
      pol = x.cs.find((v) => v.nome === 'polegar');
    if (!mao || !pol || o.mini || pol.c.d < mao.c.d + 0.4) return '';
    const cl = x.longe ? ' lg' : '';
    return `<path class="b-c${suf} m-pele${cl}" d="${pol.c.fill}"/><path class="b-p${suf} m-pele${cl}" d="${pol.c.fill}"/>`;
  };
  const corpo = G.find((x) => x.g.id === 'corpo')!;
  const vies = (id: string) => o.vies?.[id] ?? 0;
  // 1) membros do lado de longe: cada um com o seu contorno, antes de tudo
  for (const x of G) if (x.longe) itens.push({ d: Math.min(x.d, corpo.d - 5) + vies(x.g.id), camada: 1, s: traco(x) + pintado(x, []) + polegarPorCima(x), cx: x.cx });
  // 2) o corpo e as pernas de perto, num contorno só
  const pernas = G.filter((x) => x.g.id.startsWith('perna') && !x.longe);
  const atras = pernas.filter((x) => x.d < corpo.d - 1.5),
    frente = pernas.filter((x) => !atras.includes(x));
  let s = traco(corpo) + pernas.map(traco).join('');
  for (const x of atras) s += pintado(x, [x.g.id]);
  s += pintado(corpo, ['corpo']);
  const doCorpo = (nome: string) => corpo.cs.find((v) => v.nome === nome)!.c;
  const troncoD = doCorpo('pescoco').fill + doCorpo('tronco').fill;
  const tc = doCorpo('tronco').cx;
  for (const x of frente) {
    // onde a perna passa na frente do tronco, ela ganha a linha de contorno (só ali)
    const sobrepoe = suf !== '-f' && x.cx[0] < tc[2] && x.cx[2] > tc[0] && x.cx[1] < tc[3] && x.cx[3] > tc[1];
    if (sobrepoe) {
      const id = `bt${hash(troncoD + x.g.id)}`;
      s += `<clipPath id="${id}"><path d="${troncoD}"/></clipPath><g clip-path="url(#${id})">${traco(x)}</g>`;
    }
    s += pintado(x, [x.g.id], false);
  }
  // os músculos da bacia (glúteo) ficam por cima da coxa, e os da perna por cima deles; com o short opaco, as linhas
  // do glúteo ficam escondidas debaixo dele
  const bacia = musculos('bacia');
  s += (o.estilo === 'pele' && !veu ? '' : bacia.linhas) + bacia.ativos;
  for (const x of frente) s += musculos(x.g.id).ativos;
  const cxCorpo = [corpo, ...pernas].reduce<[number, number, number, number]>((a, x) => [Math.min(a[0], x.cx[0]), Math.min(a[1], x.cx[1]), Math.max(a[2], x.cx[2]), Math.max(a[3], x.cx[3])], [1e9, 1e9, -1e9, -1e9]);
  itens.push({ d: corpo.d + vies('corpo'), camada: 1, s, cx: cxCorpo });
  // 3) os braços de perto, cada um com o seu contorno, na frente ou atrás do corpo conforme a profundidade
  for (const x of G) {
    if (!x.g.id.startsWith('braco') || x.longe) continue;
    const m = musculos(x.g.id);
    itens.push({ d: (x.d >= corpo.d - 4 ? Math.max(x.d, corpo.d + 1) : x.d) + vies(x.g.id), camada: 1, s: traco(x) + cheioDe(x, () => true) + polegarPorCima(x) + m.linhas + m.ativos, cx: x.cx });
  }
  return itens;
}

/** As listras do músculo que só ajuda: vão uma vez dentro de cada <svg class="boneco"> (a cor vem do estilo). */
export const DEFS_DO_BONECO = '<defs><pattern id="b-listras" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect class="b-lis" width="1.1" height="2.4"/></pattern></defs>';

/** As cores e os traços dos dois desenhos, nos dois temas, como CSS (uma fonte só: a ficha dos estilos). */
export function cssDoBoneco(): string {
  const T = dados.traco;
  let css = `.boneco .b-c,.boneco .b-c-e{fill:var(--b-cont);stroke:var(--b-cont);stroke-width:${T.palcoPx * 2}px;vector-effect:non-scaling-stroke;stroke-linejoin:round}
.boneco.mini .b-c,.boneco.mini .b-c-e{stroke-width:${T.miniPx * 2}px}
.boneco .b-p{fill:var(--b-pele)}.boneco .b-p.lg{fill:var(--b-longe)}
.boneco .b-p.m-short{fill:var(--b-short)}.boneco .b-p.m-calcado{fill:var(--b-calcado)}.boneco .b-p.m-cabelo{fill:var(--b-cabelo)}.boneco .b-p.m-veu{fill:var(--b-veu)}.boneco .b-c.m-veu{fill:var(--b-cont-veu);stroke:var(--b-cont-veu)}
.boneco .b-mv{fill:var(--b-veu);stroke:var(--b-veu);fill-opacity:.38;stroke-opacity:.38;stroke-width:1px;vector-effect:non-scaling-stroke}
.boneco .b-c.m-short{fill:var(--b-cont-short);stroke:var(--b-cont-short)}.boneco .b-c.m-calcado{fill:var(--b-cont-calcado);stroke:var(--b-cont-calcado)}.boneco .b-c.m-cabelo{fill:var(--b-cont-cabelo);stroke:var(--b-cont-cabelo)}
.boneco .b-l{fill:none;stroke:var(--b-linha);stroke-width:${T.dentroPx}px;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}
.boneco .b-mp,.boneco .b-ms,.boneco .b-ma{stroke-width:1px;vector-effect:non-scaling-stroke;stroke-linejoin:round}
.boneco .b-mp{fill:var(--b-musP);stroke:var(--b-musPb)}.boneco .b-ms{fill:var(--b-musS);stroke:var(--b-musSb)}
.boneco .b-ma{fill:url(#b-listras);stroke:var(--b-musSb);stroke-dasharray:3 2}.boneco .b-lis{fill:var(--b-musA)}
.boneco .b-md{fill:none;stroke:var(--b-musPb);stroke-width:${T.dentroPx}px;vector-effect:non-scaling-stroke;stroke-linecap:round}
.boneco .b-c-e{fill:var(--b-erro);stroke:var(--b-erro)}.boneco .b-p-e{fill:var(--b-peleErro)}
.boneco .b-c-f{fill:none;stroke:var(--b-fantasma);stroke-width:1px;vector-effect:non-scaling-stroke;stroke-dasharray:3 3}.boneco .b-p-f{fill:var(--b-fundo);fill-opacity:.82}
.boneco .b-l-e,.boneco .b-l-f{display:none}
`;
  for (const [id, est] of Object.entries(dados.estilos)) {
    for (const tema of ['claro', 'escuro'] as const) {
      const C = est.cores[tema] as Record<string, string>;
      const fundo = tema === 'claro' ? '#f7f9fa' : '#10171b';
      // contorno: escuro (cinza) ou um tom 42% mais escuro da cor de cada parte (cor de pele)
      const escurecer = (h: string) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(h.slice(i, i + 2), 16) * 0.58 + [0x16, 0x20, 0x2a][(i - 1) / 2]! * 0.42).toString(16).padStart(2, '0')).join('');
      const cont = C.contorno ?? escurecer(C.pele!);
      const contDe = (cor?: string) => (C.contorno || !cor ? cont : escurecer(cor));
      // o short em véu: meio caminho entre a pele e um cinza do tecido (figura.mjs)
      const mis = (a: string, b: string, t: number) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - t) + parseInt(b.slice(i, i + 2), 16) * t).toString(16).padStart(2, '0')).join('');
      const veu = mis(C.pele!, tema === 'claro' ? '#6a7682' : '#3d4954', 0.5);
      css += `.boneco.${id}${tema === 'escuro' ? '.escuro' : ''}{--b-fundo:${fundo};--b-pele:${C.pele};--b-longe:${C.peleLonge};--b-cont:${cont};--b-linha:${C.linhaMus};--b-musP:${C.musP};--b-musPb:${C.musPb};--b-musS:${C.musS};--b-musA:${C.musA};--b-musSb:${C.musSb};--b-short:${C.short ?? C.pele};--b-calcado:${C.calcado ?? C.pele};--b-cabelo:${C.cabelo ?? C.pele};--b-cont-short:${contDe(C.short)};--b-cont-calcado:${contDe(C.calcado)};--b-cont-cabelo:${contDe(C.cabelo)};--b-veu:${veu};--b-cont-veu:${contDe(veu)};--b-erro:${tema === 'claro' ? '#d1342b' : '#f2564c'};--b-peleErro:${tema === 'claro' ? '#f1c9c5' : '#6b3a37'};--b-fantasma:${tema === 'claro' ? '#8796a1' : '#6f7d88'};background:${fundo}}\n`;
    }
  }
  return css;
}
