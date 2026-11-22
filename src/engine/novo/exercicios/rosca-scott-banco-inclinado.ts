// Rosca Scott com halter, o braço apoiado no encosto do banco inclinado, no motor novo. Os números vêm da ficha
// (../dados/movimentos/rosca-scott-banco-inclinado.json). O banco regulável (../pecas-de-cena/banco-regulavel.ts) fica
// na posição de sempre, com o encosto a 60° e o meio do estofado em x = 0; a pessoa fica de pé atrás do encosto, olhando
// para o assento, debruçada sobre o alto dele. O braço direito passa por cima da ponta e deita no estofado, com o tríceps
// encostado e a axila no topo; o braço esquerdo pende solto, fora do banco. Só o antebraço direito se mexe: o cotovelo
// é uma dobradiça sobre o estofado. O que se resolve, em vez de receber pronto:
//  - o braço deitado no encosto, paralelo à face, `braco.x` cm do meio dele para o lado do corpo (assim a axila e o lado
//    do peito passam além da borda), com o centro do ombro `ombro.alemDaPonta` cm além da ponta: a altura do ombro sobre
//    a face é a que faz a pele do tríceps afundar `apoio.amassa` cm no estofado;
//  - o corpo: o tronco inclinado como a ficha pede, com a pelve onde o ombro direito cai nesse ponto; os pés no chão,
//    embaixo do quadril (o joelho dobra o que a altura da pelve pedir).
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/rosca-scott-banco-inclinado.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Prim } from '../desenho';
import { bancoRegulavelNaCena, geometriaDoBanco } from '../pecas-de-cena/banco-regulavel';
import type { BancoRegulavel } from '../pecas-de-cena/banco-regulavel';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dot, mix, mul, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { halterNaMao } from './dobrar-o-cotovelo';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

/** O banco: o meio do estofado em x = 0, z = 0, o encosto subindo para −z. */
export const BANCO_DA_SCOTT: BancoRegulavel = { x0: 0, z0: 0, encosto: f('encosto') };
const G = geometriaDoBanco(BANCO_DA_SCOTT);
const meiaLarg = obj('bancoRegulavel', 'larg') / 2;
/** A caixa do encosto (o estofado inclinado), como a conferência a vê. */
const ENCOSTO = bancoRegulavelNaCena(BANCO_DA_SCOTT).prims.find((p): p is Extract<Prim, { t: 'caixa' }> => p.t === 'caixa' && p.cls === 'estofado' && Math.abs(p.ref.y[1]) < 0.99)!;

/** Um ponto no referencial do encosto: `ao` cm ao longo dele (da dobradiça para cima), `acima` cm acima da face. */
export const noEncostoDaScott = (ao: number, acima: number, x = 0): V3 => add(add(add(G.baseEncosto, mul(G.d, ao)), mul(G.n, G.est + acima)), [x, 0, 0]);
/** O comprimento do encosto e a posição de um ponto ao longo dele (cm a partir da dobradiça). */
export const COMP_DO_ENCOSTO = G.compEncosto;
export const aoLongoDoEncosto = (p: V3) => dot(sub(p, G.baseEncosto), G.d);
/** Quanto um ponto entra pela face do encosto (cm; positivo = dentro), ou −∞ se ele não fica sobre a face. */
export function pelaFaceDoEncosto(p: V3): number {
  const r = sub(p, G.baseEncosto);
  const ao = dot(r, G.d);
  if (ao < 0 || ao > G.compEncosto || Math.abs(p[0] - BANCO_DA_SCOTT.x0) > meiaLarg) return -Infinity;
  return G.est - dot(r, G.n);
}
/** Quanto um ponto entra na caixa do encosto (cm; negativo = fora). */
export function naCaixaDoEncosto(p: V3): number {
  const l = paraRef(ENCOSTO.ref, p);
  return Math.min(ENCOSTO.meias[0] - Math.abs(l[0]), ENCOSTO.meias[1] - Math.abs(l[1]), ENCOSTO.meias[2] - Math.abs(l[2]));
}
/** Os pontos da pele do braço direito (do ombro ao cotovelo), separados pela distância ao eixo dele. */
export function peleDoBracoDireito(e: Esq): V3[] {
  const L = e.lado.R;
  const eixo = sub(L.cotovelo, L.ombro),
    comp = Math.hypot(...eixo);
  return pontosDoBoneco(e)
    .filter(({ p, parte }) => {
      if (parte !== 'braco') return false;
      const t = dot(sub(p, L.ombro), eixo) / (comp * comp);
      const perto = add(L.ombro, mul(eixo, Math.max(0, Math.min(1, t))));
      return Math.hypot(...sub(p, perto)) < 9;
    })
    .map((x) => x.p);
}

/**
 * O braço que trabalha deitado no encosto: para baixo, ao longo dele, com o ombro `braco.inclina` graus mais alto que o
 * cotovelo em relação à face (o braço passa por cima da ponta e desce até o estofado); o lado do bíceps virado para fora
 * da face.
 */
const UMERO = mul(G.d, -1);
export function bracoQueTrabalha(cotovelo: number, sobe = 0, inclina = f('braco.inclina')): PoseBraco {
  // o braço gira no ombro `sobe` graus para fora da face (erro); o antebraço dobra para o lado do bíceps
  const s = sinal('R');
  const a = (sobe - inclina) * rad;
  const umero = norm(add(mul(UMERO, Math.cos(a)), mul(G.n, Math.sin(a))));
  const frente = norm(add(mul(G.n, Math.cos(a)), mul(UMERO, -Math.sin(a))));
  const c = cotovelo * rad;
  const antebraco = norm(add(mul(umero, Math.cos(c)), mul(frente, Math.sin(c))));
  const frenteAnte = norm(add(mul(frente, Math.cos(c)), mul(umero, -Math.sin(c))));
  const fora: V3 = [s, 0, 0];
  const sup = f('maos.supinacao') * rad;
  const polegar = norm(add(mul(frenteAnte, Math.cos(sup)), mul(fora, Math.sin(sup))));
  return { umero, antebraco, polo: mul(frente, -1), mao: { polegar, forma: 'pegada', diam: obj('halter', 'caboDiam') } };
}
/** O braço esquerdo, livre: pende solto ao lado do corpo, fora do banco. */
export function bracoLivre(): PoseBraco {
  return { umero: norm([0.12, -1, 0]), antebraco: norm([0.1, -1, 0.25]), polo: [0.3, 0, -1], mao: { polegar: [0, 0, 1], forma: 'relaxada' } };
}

interface Parado {
  tronco: PoseTronco;
  pernas: Record<Lado, PosePerna>;
}
const CACHE = new WeakMap<Corpo, Parado>();

function parado(corpo: Corpo): Parado {
  let c = CACHE.get(corpo);
  if (c) return c;
  const amassa = f('apoio.amassa');
  const pose = (pelve: V3): PoseTronco => ({ pelve, frente: f('tronco.frente'), lombar: 0, toracica: 0, cervical: f('cervical'), cabeca: f('cabeca') });
  const pernas = (pelve: V3): Record<Lado, PosePerna> => {
    const pe = (k: Lado): PosePerna => ({ pe: { bola: [pelve[0] + sinal(k) * f('pes.meiaDistancia'), 0, pelve[2] + f('pes.aFrente')], dir: [sinal(k) * 0.12, 0, 1], calc: 0 }, polo: [sinal(k) * 0.15, 0, 1] });
    return { R: pe('R'), L: pe('L') };
  };
  const bracosParados = { R: bracoQueTrabalha(f('cotovelo.baixo')), L: bracoLivre() };
  const montar = (pelve: V3) => resolverMembros(resolverTronco(corpo, pose(pelve)), bracosParados, pernas(pelve));
  /** A pelve com o ombro direito no ponto pedido (o ombro depende do braço: três passadas). */
  const pelveCom = (ombro: V3): V3 => {
    let pelve: V3 = add(ombro, [corpo.m('ombro.meiaDistancia'), -45, -15]);
    for (let i = 0; i < 4; i++) pelve = add(pelve, sub(ombro, montar(pelve).lado.R.ombro));
    return pelve;
  };
  const fundo = (pts: V3[], no: (p: V3) => number) => Math.max(...pts.map(no), -1e3);
  // a conta demorada (algumas centenas de poses) vem guardada para o corpo do app: ../calibragens.ts
  const { pelve } = calibragem(corpo, `${F.id}:parado`, () => {
    // o ombro `ombro.alemDaPonta` cm além da ponta do encosto, na linha do braço; a altura dele sobre a face é a que faz
    // o tríceps amassar o estofado o que a ficha pede
    const ao = G.compEncosto + f('ombro.alemDaPonta');
    const h = resolver1((x) => fundo(peleDoBracoDireito(montar(pelveCom(noEncostoDaScott(ao, x, f('braco.x'))))), pelaFaceDoEncosto) - amassa, 0, 14, 18);
    return { pelve: pelveCom(noEncostoDaScott(ao, h, f('braco.x'))) };
  });
  c = { tronco: pose(pelve), pernas: pernas(pelve) };
  CACHE.set(corpo, c);
  return c;
}

/** A menor folga (cm) entre as cabeças do halter e a caixa do encosto, medida com o raio de cada cabeça. */
function folgaDoHalterNoEncosto(prims: Prim[]): number {
  let m = 1e9;
  for (const h of prims) {
    if (h.t !== 'prisma') continue;
    for (let i = 0; i <= 6; i++) m = Math.min(m, -naCaixaDoEncosto(add(h.a, mul(sub(h.b, h.a), i / 6))) - h.ra);
  }
  return m;
}
/**
 * O erro "travar o cotovelo": o cotovelo estica de vez até `erro.trava.cotovelo`; se antes disso o halter encostar no
 * estofado (é o peso solto, apoiado nele), ele para ali.
 */
function travado(corpo: Corpo): number {
  return calibragem(corpo, `${F.id}:travado`, () => {
    const p = parado(corpo);
    const folga = (c: number) => {
      const e = resolverMembros(resolverTronco(corpo, p.tronco), { R: bracoQueTrabalha(c), L: bracoLivre() }, p.pernas);
      return folgaDoHalterNoEncosto(halterNaMao(e, 'R').prims);
    };
    if (folga(f('erro.trava.cotovelo')) >= 0) return f('erro.trava.cotovelo');
    return resolver1(folga, f('erro.trava.cotovelo'), f('cotovelo.baixo'), 24);
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const p = parado(corpo);
  const x = Math.max(0, Math.min(1, u));
  const baixo = erro === 'trava' ? travado(corpo) : erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.baixo');
  const sobe = erro === 'tira' ? f('erro.tira.braco') * suave(x) : 0;
  const e = resolverMembros(resolverTronco(corpo, p.tronco), { R: bracoQueTrabalha(mix(baixo, erro === 'tira' ? f('erro.tira.cotovelo') : f('cotovelo.cima'), x), sobe), L: bracoLivre() }, p.pernas);
  const B = bancoRegulavelNaCena(BANCO_DA_SCOTT);
  const H = halterNaMao(e, 'R');
  return {
    esq: e,
    prims: [chao(-80, 80, -130, 90), ...B.prims, ...H.prims],
    pecas: [B.peca, H.peca],
    fios: [],
    cargas: [{ massa: f('carga'), pos: H.centro }],
    marcas: { halter: e.lado.R.pegada },
    vies: { maoR: 1 },
  };
}

export const roscaScottBancoInclinado: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // bíceps (principal, é o que a biblioteca conta, sem secundário); o antebraço "só ajuda", como nas outras roscas
  papeis: { 'biceps:R': 'p', 'antebraco:R': 'a' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
