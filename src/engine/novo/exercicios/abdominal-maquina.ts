// Abdominal na máquina, no motor novo (primeira animação deste exercício: até aqui ele era só cartão de texto). Os
// números vêm da ficha (../dados/movimentos/abdominal-maquina.json); a máquina, de ../pecas-de-cena/abdominal-maquina.ts.
//
// Sentado, a bacia parada no assento, os pés no chão presos pelos rolos, a lombar no apoio; as almofadas do braço da
// máquina sobre o peito e as mãos nos pegadores, ao lado da cabeça. Como no abdominal na polia aprovado
// (./abdominal-polia.ts), quem enrola é a coluna (a lombar e a parte de cima das costas dobram, o pescoço acompanha), com
// a bacia parada: as costelas vão em direção à pelve, e o quadril quase não dobra. O braço da máquina gira junto,
// empurrado pelo peito, e as mãos vão com ele (os braços só seguram).
//
// O que ele resolve, em vez de receber pronto:
//  - a altura da bacia e o lugar dos pés: sentado com a coxa na horizontal, os pés no chão, o joelho no ângulo da ficha;
//    daí sai a altura do assento (a regulagem);
//  - o apoio da lombar, encostado na pele das costas, na altura da lombar (é assim que a Life Fitness manda regular o
//    assento);
//  - o eixo do braço da máquina: o ponto em volta do qual o tórax gira do começo ao fim do movimento (o polo da rotação,
//    de lado). Com o eixo ali, as almofadas ficam no mesmo lugar do peito no começo e no fim, e quase no mesmo no meio;
//  - o ângulo do braço em cada quadro: o que deixa a face das almofadas encostada na pele do peito (medido em 17
//    pontos do caminho e ajustado por uma cúbica, gravada pelo preparo);
//  - os rolos dos pés, encostados no peito do pé.
import ficha from '../dados/movimentos/abdominal-maquina.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { abdominalMaquina, bracoDoAbdominal } from '../pecas-de-cena/abdominal-maquina';
import type { AbdominalMaquina, AlmofadaDoPeito } from '../pecas-de-cena/abdominal-maquina';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, anguloEm, cross, dirRef, dot, mix, mul, noRef, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { frenteParaOPeito } from './polia-puxar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const X: V3 = [1, 0, 0];
const LADOS: Lado[] = ['R', 'L'];

interface Calib {
  /** A bacia (y, z), a inclinação dela e o lugar da bola dos pés. */
  y: number;
  z: number;
  frente: number;
  bolaZ: number;
  /** As regulagens e a geometria da máquina na posição inicial (só números: vão para a calibração gravada). */
  assento: number;
  lombar: V3;
  eixo: V3;
  xBraco: number;
  arco: [number, number];
  /** O ponto de cada almofada e de cada pegador no referencial do tórax, no começo. */
  almofada: V3;
  pegador: V3;
  rolos: V3;
}

const SOLTOS: Record<Lado, PoseBraco> = { R: { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'relaxada' } }, L: { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'relaxada' } } };
const pernas = (bolaZ: number): Record<Lado, PosePerna> => {
  const pe = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * f('pes.meiaDistancia'), 0, bolaZ], dir: [0, 0, 1] }, polo: norm([sinal(k) * 0.05, 0.3, 1]) });
  return { R: pe('R'), L: pe('L') };
};
/** A coluna no instante `e` (0 = reta, 1 = toda enrolada) e o erro. */
function coluna(e: number, erro?: string): Omit<PoseTronco, 'pelve' | 'frente'> {
  return { lombar: f('lombar.fim') * e, toracica: f('toracica.fim') * e, cervical: mix(f('cervical.inicio'), f('cervical.fim'), erro === 'quadril' ? 0 : e), cabeca: 0 };
}
const tronco = (corpo: Corpo, c: Pick<Calib, 'y' | 'z' | 'frente'>, e: number, erro?: string, bacia = 0): Tronco => resolverTronco(corpo, { pelve: [0, c.y, c.z], frente: c.frente + bacia, ...coluna(e, erro) });

/**
 * Onde a almofada encosta no peito: no referencial do tórax, o centro dela fica em (x, y) e a face, no ponto da pele do
 * tronco que mais avança sobre a área dela (o peito é curvo, a almofada é plana).
 */
function peleDaFrente(e: Esq, x: number, y: number): V3 {
  const meiaL = obj('abdominalMaquina', 'almofadaLarg') / 2,
    meiaC = obj('abdominalMaquina', 'almofadaComp') / 2 - 3;
  let z = -1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'tronco') continue;
    const l = paraRef(e.torax, p);
    if (Math.abs(l[0] - x) > meiaL || Math.abs(l[1] - y) > meiaC) continue;
    z = Math.max(z, l[2]);
  }
  return [x, y, z];
}

function calibrar(corpo: Corpo): Calib {
  return calibragem(corpo, 'abdominal-maquina:base', () => {
    const m = (id: string) => corpo.m(id);
    const zP = -f('quadril.aBorda');
    // o tronco reto: a bacia inclinada para o peito ficar na vertical, com a coluna neutra
    const frente = frenteParaOPeito(corpo, { pelve: [0, 60, zP], ...coluna(0) }, f('tronco.inicio'));
    // a altura da bacia: com os pés no chão e o joelho no ângulo da ficha, a coxa na horizontal (o joelho na altura do
    // quadril); daí o lugar dos pés
    const esq = (y: number, bolaZ: number) => resolverMembros(tronco(corpo, { y, z: zP, frente }, 0), SOLTOS, pernas(bolaZ));
    const pes = (y: number) => resolver1((z) => esq(y, z).lado.R.ang.joelho - f('joelho'), 0, 80, 26);
    const y = resolver1((yy) => {
      const e = esq(yy, pes(yy));
      return e.lado.R.joelho[1] - e.lado.R.quadril[1];
    }, m('altura.joelho') - 15, m('altura.joelho') + 25, 26);
    const bolaZ = pes(y);
    const e0 = esq(y, bolaZ);
    // o assento: o ponto mais baixo do glúteo e da coxa sobre ele, menos o que eles afundam
    let baixo = 1e9;
    for (const { p, parte } of pontosDoBoneco(e0)) if (['pelve', 'coxa', 'cintura'].includes(parte) && p[2] < 0 && p[2] > -obj('abdominalMaquina', 'assentoComp') && Math.abs(p[0]) < obj('abdominalMaquina', 'assentoLarg') / 2) baixo = Math.min(baixo, p[1]);
    const assento = baixo + f('assento.amassa');
    // o apoio da lombar: atrás da lombar (no meio do caminho da bacia à T12), encostado na pele
    const yL = mix(e0.pelve.o[1], e0.nos[e0.iT12]!.ref.o[1], f('lombar.apoio.altura'));
    let zL = 1e9;
    // (a pele mais de trás sobre a área do apoio: a lombar é curva, o apoio é plano)
    for (const { p, parte } of pontosDoBoneco(e0)) if (['tronco', 'cintura', 'emendaDaCintura', 'pelve'].includes(parte) && Math.abs(p[0]) < obj('abdominalMaquina', 'lombarLarg') / 2 && Math.abs(p[1] - yL) < obj('abdominalMaquina', 'lombarAlt') / 2 && p[2] < e0.pelve.o[2] + 15) zL = Math.min(zL, p[2]);
    const lombar: V3 = [0, yL, zL - f('lombar.apoio.folga')];
    // o eixo: o polo da rotação do tórax do começo ao fim, de lado
    const t0 = tronco(corpo, { y, z: zP, frente }, 0),
      t1 = tronco(corpo, { y, z: zP, frente }, 1);
    const d = anguloEm(t0.torax.y, t1.torax.y, X) * (Math.PI / 180);
    // R(d) gira (y, z) no plano de lado: z' = z cos d + y sin d ... resolvido como C = (I − R)⁻¹ (P1 − R P0), com P em (y, z)
    const c = Math.cos(d),
      s = Math.sin(d);
    const rot = (v: [number, number]): [number, number] => [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
    const P0: [number, number] = [t0.torax.o[1], t0.torax.o[2]],
      P1: [number, number] = [t1.torax.o[1], t1.torax.o[2]];
    const rp = rot(P0);
    const b: [number, number] = [P1[0] - rp[0], P1[1] - rp[1]];
    // (I − R) = [[1 − c, s], [−s, 1 − c]]
    const a11 = 1 - c,
      a12 = s,
      a21 = -s,
      a22 = 1 - c;
    const det = a11 * a22 - a12 * a21;
    const C: [number, number] = [(b[0] * a22 - a12 * b[1]) / det, (a11 * b[1] - a21 * b[0]) / det];
    const eixo: V3 = [0, C[0], C[1]];
    // as almofadas: na frente do peito, logo abaixo das clavículas, uma de cada lado (no referencial do tórax)
    const xA = obj('abdominalMaquina', 'almofadasEntre') / 2;
    const yA = -f('almofada.abaixoDoC7');
    const almofada = add(peleDaFrente(e0, -xA, yA), [0, 0, f('almofada.folga')]);
    // os pegadores: à frente dos ombros, logo acima das almofadas (no referencial do tórax), apontando para a frente
    const pegador: V3 = [-f('maos.meiaDistancia'), f('maos.acimaDoC7'), f('maos.aFrente')];
    // o braço sobe pelos lados, por fora dos ombros, e passa por cima deles
    const xBraco = m('largura.bideltoide') / 2 + obj('abdominalMaquina', 'bracoFora');
    const arco: [number, number] = [e0.lado.R.acromioclavicular[1] + f('arco.acimaDoOmbro'), e0.lado.R.ombro[2] - 4];
    // os rolos dos pés: sobre o peito do pé, `rolos.aFrente` cm à frente do tornozelo
    const zr = e0.lado.R.tornozelo[2] + f('rolos.aFrente');
    let topo = -1e9;
    for (const { p, parte } of pontosDoBoneco(e0)) if (parte === 'pe' && Math.abs(p[2] - zr) < 1.5) topo = Math.max(topo, p[1]);
    const rolos: V3 = [0, topo + obj('abdominalMaquina', 'roloDiam') / 2 + f('rolos.folga'), zr];
    return { y, z: zP, frente, bolaZ, assento, lombar, eixo, xBraco, arco, almofada, pegador, rolos };
  });
}

/** A máquina com o braço girado `alavanca` graus (as almofadas e os pegadores definidos pelo tórax do começo). */
function maquina(corpo: Corpo, c: Calib, alavanca: number): AbdominalMaquina {
  const t0 = tronco(corpo, c, 0);
  const T = t0.torax;
  const almofadas = {} as Record<Lado, AlmofadaDoPeito>,
    pegadores = {} as Record<Lado, { centro: V3; eixo: V3 }>;
  for (const k of LADOS) {
    const esp = (v: V3): V3 => [k === 'R' ? v[0] : -v[0], v[1], v[2]];
    almofadas[k] = { centro: noRef(T, esp(c.almofada)), normal: T.z, ao: T.y };
    pegadores[k] = { centro: noRef(T, esp(c.pegador)), eixo: norm(dirRef(T, [0, f('maos.pegadorSobe'), 1])) };
  }
  return { assento: c.assento, lombar: { centro: c.lombar, normal: [0, 0, 1] }, eixo: c.eixo, xBraco: c.xBraco, arco: { y: c.arco[0], z: c.arco[1] }, almofadas, pegadores, alavanca, rolos: c.rolos, zTras: c.eixo[2] - f('maquina.atrasDoEixo'), pertoAtras: 'R' };
}

/** O quanto a pele do peito avança além da face da almofada direita (cm; negativo = longe), só sobre ela. */
function peitoAlemDaAlmofada(e: Esq, A: AlmofadaDoPeito): number {
  const lado = norm(cross(A.ao, A.normal));
  let max = -1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'tronco' || p[0] > 0) continue;
    const v = sub(p, A.centro);
    if (Math.abs(dot(v, A.ao)) > obj('abdominalMaquina', 'almofadaComp') / 2 - 3 || Math.abs(dot(v, lado)) > obj('abdominalMaquina', 'almofadaLarg') / 2 || dot(v, A.normal) < -12) continue;
    max = Math.max(max, dot(v, A.normal));
  }
  return max;
}
/**
 * O ângulo do braço em que a almofada encosta no peito: primeiro pelo ponto do peito em que ela encostava no começo
 * (rápido) e depois, a partir dele, até a pele que mais avança ficar à folga da face (medido na superfície do Boneco).
 */
function anguloNoPeito(corpo: Corpo, c: Calib, t: Tronco): number {
  const m0 = maquina(corpo, c, 0);
  const alvo = noRef(t.torax, c.almofada);
  const a0 = resolver1((a) => {
    const A = bracoDoAbdominal({ ...m0, alavanca: a }).almofadas.R;
    return dot(sub(alvo, A.centro), A.normal);
  }, -20, 100, 30);
  const e = resolverMembros(t, SOLTOS, pernas(c.bolaZ));
  const g = (a: number) => peitoAlemDaAlmofada(e, bracoDoAbdominal({ ...m0, alavanca: a }).almofadas.R) + f('almofada.folga');
  // a almofada vai para a frente quando o ângulo cresce: o peito avança cada vez menos além dela; procura, em passos de
  // meio grau a partir do ângulo rápido, onde a conta troca de sinal e acerta ali
  let a = a0 - 10,
    ga = g(a);
  for (let b = a + 0.5; b <= a0 + 10; b += 0.5) {
    const gb = g(b);
    if (ga >= 0 && gb < 0) return resolver1(g, a, b, 14);
    a = b;
    ga = gb;
  }
  return a0;
}
/** Quantos pontos medidos tem a curva do ângulo do braço (de u = 0 a 1). */
const N_TABELA = 16;
/**
 * O ângulo do braço em `u`: medido em `N_TABELA` + 1 pontos e ajustado por uma cúbica (mínimos quadrados), gravada pelo
 * preparo. A pele é feita de pontos: medido um a um, o contato treme alguns décimos de grau, e o braço daria trancos.
 */
function anguloDaCurva(corpo: Corpo, c: Calib, chave: string, troncoEm: (u: number) => Tronco, u: number): number {
  const k = calibragem(corpo, `abdominal-maquina:braco:${chave}`, () => {
    const us = Array.from({ length: N_TABELA + 1 }, (_, i) => i / N_TABELA);
    const ys = us.map((x) => anguloNoPeito(corpo, c, troncoEm(x)));
    // as equações normais de y = k0 + k1 u + k2 u² + k3 u³
    const A = [0, 1, 2, 3].map((i) => [0, 1, 2, 3].map((j) => us.reduce((s2, x) => s2 + x ** (i + j), 0)));
    const B = [0, 1, 2, 3].map((i) => us.reduce((s2, x, n) => s2 + ys[n]! * x ** i, 0));
    for (let i = 0; i < 4; i++)
      for (let j = i + 1; j < 4; j++) {
        const r = A[j]![i]! / A[i]![i]!;
        for (let l = i; l < 4; l++) A[j]![l]! -= r * A[i]![l]!;
        B[j]! -= r * B[i]!;
      }
    const kk = [0, 0, 0, 0];
    for (let i = 3; i >= 0; i--) kk[i] = (B[i]! - [0, 1, 2, 3].slice(i + 1).reduce((s2, l) => s2 + A[i]![l]! * kk[l]!, 0)) / A[i]![i]!;
    return kk;
  });
  const x = Math.max(0, Math.min(1, u));
  return k[0]! + k[1]! * x + k[2]! * x * x + k[3]! * x * x * x;
}

function montar(corpo: Corpo, u: number, erro?: string) {
  const c = calibrar(corpo);
  let enrola = u,
    bacia = 0;
  if (erro === 'quadril') {
    enrola = 0;
    bacia = f('erro.quadril.bacia') * u;
  }
  if (erro === 'bracos') enrola = f('erro.bracos.coluna') * u;
  const t = tronco(corpo, c, enrola, erro, bacia);
  // o braço da máquina: encostado no peito; no erro dos braços, ele vai o caminho todo (puxado pelas mãos) e o peito fica
  const alavanca =
    erro === 'quadril'
      ? anguloDaCurva(corpo, c, 'quadril', (x) => tronco(corpo, c, 0, 'quadril', f('erro.quadril.bacia') * x), u)
      : anguloDaCurva(corpo, c, 'certo', (x) => tronco(corpo, c, x), u);
  const M = maquina(corpo, c, alavanca);
  const B = bracoDoAbdominal(M);
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return { pegada: B.pegadores[k].centro, polo: norm(dirRef(t.torax, [s * 0.45, -1, 0.7])), mao: { polegar: mul(B.pegadores[k].eixo, -1), forma: 'pegada', diam: obj('abdominalMaquina', 'pegadorDiam') } };
  };
  const e = resolverMembros(t, { R: braco('R'), L: braco('L') }, pernas(c.bolaZ));
  return { e, M, c };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const { e, M } = montar(corpo, u, erro);
  const A = abdominalMaquina(M);
  const B = A.braco;
  const marcas: Record<string, V3> = {
    eixo: M.eixo,
    alavanca: [M.alavanca, 0, 0],
    pilha: [0, A.subida, 0],
    assento: [0, M.assento, 0],
    lombar: M.lombar.centro,
    rolos: M.rolos,
  };
  for (const k of LADOS) {
    marcas[`almofada.${k}`] = B.almofadas[k].centro;
    marcas[`almofadaNormal.${k}`] = B.almofadas[k].normal;
    marcas[`almofadaAo.${k}`] = B.almofadas[k].ao;
    marcas[`pegador.${k}`] = B.pegadores[k].centro;
  }
  return {
    esq: e,
    prims: [chao(-80, 80, M.zTras - 10, M.rolos[2] + 40), ...A.prims],
    pecas: [...(A.perto ? [A.perto] : []), A.fixa, A.movel],
    fios: [],
    cargas: [],
    marcas,
    vies: { maoR: 1, maoL: 1 },
  };
}

export const abdominalNaMaquina: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // reto do abdômen, principal; a biblioteca não conta secundário (como no abdominal na polia aprovado)
  papeis: { abdomen: 'p' },
  trajetorias: { peito: (q) => q.esq.torax.o },
};
