// Rosca Scott com barra W, no banco Scott, no motor novo. Os números vêm da ficha (../dados/movimentos/rosca-scott.json);
// o banco, da peça ../pecas-de-cena/banco-scott.ts; a barra, de ../pecas-de-cena/barra-w.ts. Segue a rosca Scott no
// banco inclinado aprovada (./rosca-scott-banco-inclinado.ts): o braço deitado na face da almofada, paralelo a ela, com
// o centro do ombro além da borda de cima (a axila na borda) e o tríceps amassando a almofada; só o antebraço gira, o
// cotovelo é uma dobradiça sobre a almofada. Aqui são os dois braços, com a barra W nas duas mãos (a pegada nas partes
// inclinadas, como na rosca com barra W aprovada, ./rosca-barra-w.ts), e a pessoa está sentada no assento do banco.
//
// O que se resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts):
//  - os pés: à distância em que o joelho dobra o que a ficha pede, com o pé inteiro no chão;
//  - a altura da bacia: o glúteo e a coxa apoiam no assento (na altura da ficha), amassando o que a ficha pede;
//  - a almofada: a borda de cima fica onde o ombro cai `ombro.alemDaPonta` cm além dela, na linha do braço, e a face na
//    altura em que o tríceps amassa `apoio.amassa` cm. É a regulagem da altura da almofada (a regra confere que ela fica
//    dentro da faixa do banco); a distância do assento à almofada é a da tabela do banco;
//  - o quanto o antebraço abre para fora para o centro da mão cair no meio da parte inclinada da barra.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/rosca-scott.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Prim } from '../desenho';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { barraW, massaDaBarraW, pegadaNaBarraW, pontosDaBarraW } from '../pecas-de-cena/barra-w';
import type { BarraW } from '../pecas-de-cena/barra-w';
import { bancoScott, centroDoAssento, faceDaAlmofada } from '../pecas-de-cena/banco-scott';
import type { BancoScott } from '../pecas-de-cena/banco-scott';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dot, mix, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const ANILHAS: IdAnilha[] = [`anilha${f('anilhas')}` as IdAnilha];
const MASSA = massaDaBarraW(ANILHAS);
/** O polegar a partir da posição neutra: a palma para cima menos a inclinação da parte da barra que a mão segura. */
const SUPINACAO = 90 - obj('barraW', 'anguloFora');
/** A face da almofada (a direção que desce por ela e a normal) não depende de onde o banco fica. */
const FACE = faceDaAlmofada({ topo: [0, 0, 0], assento: 0 });
/**
 * Quanto o braço de longe vem para a frente na pintura, de três quartos (cm de profundidade): o bastante para passar o
 * tronco (5 cm à frente de onde o Boneco pinta o braço de longe) e a almofada (o centro dela, 7,1 cm à frente), com
 * folga de 4,9 cm, sem chegar ao braço de perto (pelo menos 33 cm à frente). A regra banco-scott-bracos-na-almofada mede.
 */
const VIES_DO_BRACO_DE_LONGE = 12;

/**
 * Um braço deitado na almofada: para baixo, ao longo dela, com o ombro `inclina` graus mais alto que o cotovelo em
 * relação à face; o braço gira `sobe` graus no ombro para fora da face (erro). O antebraço dobra `cotovelo` graus para
 * o lado do bíceps e abre `abre` graus para fora (a mão vai ao meio da parte inclinada da barra W).
 */
function bracoNaAlmofada(k: Lado, cotovelo: number, abre: number, sobe = 0): PoseBraco {
  const s = sinal(k);
  const a = (sobe - f('braco.inclina')) * rad;
  const umero = norm(add(mul(FACE.d, Math.cos(a)), mul(FACE.n, Math.sin(a))));
  const frente = norm(add(mul(FACE.n, Math.cos(a)), mul(FACE.d, -Math.sin(a))));
  const fora: V3 = [s, 0, 0];
  const c = cotovelo * rad,
    be = abre * rad;
  const noPlano = norm(add(mul(umero, Math.cos(c)), mul(frente, Math.sin(c))));
  const antebraco = norm(add(mul(noPlano, Math.cos(be)), mul(fora, Math.sin(be))));
  // o polegar no referencial da dobradiça (como na rosca com barra W aprovada): a frente do antebraço e o lado de fora
  const frenteAnte = norm(perp(sub(mul(frente, Math.cos(c)), mul(umero, Math.sin(c))), antebraco)),
    foraAnte = norm(perp(fora, antebraco)),
    sp = SUPINACAO * rad;
  const polegar = norm(add(mul(frenteAnte, Math.cos(sp)), mul(foraAnte, Math.sin(sp))));
  return { umero, antebraco, polo: mul(frente, -1), mao: { polegar, forma: 'pegada', diam: obj('barraW', 'pegadaDiam') } };
}

/** Os pontos da pele de um braço (do ombro ao cotovelo), separados pela distância ao eixo dele. */
export function peleDoBraco(e: Esq, k: Lado): V3[] {
  const L = e.lado[k];
  const eixo = sub(L.cotovelo, L.ombro),
    comp = Math.hypot(...eixo);
  return pontosDoBoneco(e)
    .filter(({ p, parte }) => {
      if (parte !== 'braco') return false;
      const t = dot(sub(p, L.ombro), eixo) / (comp * comp);
      const perto = add(L.ombro, mul(eixo, Math.max(0, Math.min(1, t))));
      return Math.hypot(...sub(p, perto)) < 9 && Math.sign(p[0] - e.pelve.o[0]) === sinal(k);
    })
    .map((x) => x.p);
}

/** O ponto mais baixo do glúteo e da coxa sobre o assento, acima do tampo (cm; negativo = afunda). */
export function apoioNoAssentoDaScott(e: Esq, b: BancoScott): number {
  const S = centroDoAssento(b);
  const meiaL = obj('bancoScott', 'assentoLarg') / 2,
    meiaC = obj('bancoScott', 'assentoComp') / 2;
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (['pelve', 'coxa', 'cintura'].includes(parte) && Math.abs(p[2] - S[2]) < meiaC && Math.abs(p[0] - S[0]) < meiaL) min = Math.min(min, p[1]);
  return min - S[1];
}

interface Parado {
  pelve: V3;
  bolaZ: number;
  abre: number;
  topo: V3;
}
const CACHE = new WeakMap<Corpo, Parado>();

const poseDoTronco = (pelve: V3): PoseTronco => ({ pelve, frente: f('tronco.frente'), lombar: 0, toracica: 0, cervical: f('cervical'), cabeca: f('cabeca') });
function pernas(pelve: V3, bolaZ: number): Record<Lado, PosePerna> {
  const pe = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * f('pes.meiaDistancia'), 0, bolaZ], dir: [sinal(k) * 0.12, 0, 1], calc: 0 }, polo: norm([sinal(k) * 0.15, 0.2, 1]) });
  void pelve;
  return { R: pe('R'), L: pe('L') };
}
function montar(corpo: Corpo, pelve: V3, bolaZ: number, cotovelo: number, abre: number, sobe = 0): Esq {
  return resolverMembros(resolverTronco(corpo, poseDoTronco(pelve)), { R: bracoNaAlmofada('R', cotovelo, abre, sobe), L: bracoNaAlmofada('L', cotovelo, abre, sobe) }, pernas(pelve, bolaZ));
}
/**
 * A borda de cima da almofada para um corpo montado: o ombro além dela e o tríceps amassando a face. O ponto que amassa
 * é o mais fundo do braço sobre a almofada (da borda de cima à de baixo); até 18/11 a conta usava o braço inteiro, e o
 * ponto mais fundo era o alto do braço, além da borda de cima: sobre a almofada, o tríceps amassava só 0,4 cm.
 */
function topoPara(e: Esq): V3 {
  const S = e.lado.R.ombro;
  const a = dot(S, FACE.d) + f('ombro.alemDaPonta');
  const sobre = peleDoBraco(e, 'R').filter((p) => dot(p, FACE.d) >= a && dot(p, FACE.d) <= a + FACE.comp);
  const b = Math.min(...sobre.map((p) => dot(p, FACE.n))) + f('apoio.amassa');
  return add(mul(FACE.d, a), mul(FACE.n, b));
}

function parado(corpo: Corpo): Parado {
  let c = CACHE.get(corpo);
  if (c) return c;
  c = calibragem(corpo, `${F.id}:parado`, () => {
    const meio = mix(f('cotovelo.baixo'), f('cotovelo.cima'), 0.5);
    let pelve: V3 = [0, f('assento') + 9, 0],
      bolaZ = 40,
      abre = 0,
      topo: V3 = [0, 100, 20];
    for (let i = 0; i < 5; i++) {
      const pv = pelve,
        ab = abre;
      bolaZ = resolver1((z) => montar(corpo, pv, z, meio, ab).lado.R.ang.joelho - f('joelho'), 10, 70, 30);
      let e = montar(corpo, pelve, bolaZ, meio, abre);
      topo = topoPara(e);
      const b: BancoScott = { topo, assento: f('assento') };
      pelve = [pelve[0], pelve[1] - apoioNoAssentoDaScott(e, b) - f('apoio.amassa'), pelve[2]];
      e = montar(corpo, pelve, bolaZ, meio, abre);
      topo = topoPara(e);
      // o antebraço abre o que leva o centro da mão ao meio da parte inclinada da barra
      const pv2 = pelve,
        bz = bolaZ;
      abre = resolver1((x) => -montar(corpo, pv2, bz, meio, x).lado.R.pegada[0] - pegadaNaBarraW().s, -20, 30, 26);
    }
    return { pelve, bolaZ, abre, topo };
  });
  CACHE.set(corpo, c);
  return c;
}
/** O banco na regulagem do corpo. */
export function bancoDaScott(corpo: Corpo): BancoScott {
  return { topo: parado(corpo).topo, assento: f('assento') };
}

/**
 * A barra que as mãos seguram (como na rosca com barra W aprovada): a linha entre os dois centros de pegada é paralela à
 * das mangas; o plano da curva contém a linha da palma direita.
 */
function barraDe(e: Esq): BarraW {
  const pR = e.lado.R.pegada,
    pL = e.lado.L.pegada;
  const eixo = norm(sub(pL, pR));
  const polegarR = mul(e.lado.R.mao.x, -1);
  const frente = norm(perp(polegarR, eixo));
  const P = pegadaNaBarraW();
  return { centro: add(mul(add(pR, pL), 0.5), mul(frente, -P.fora)), eixo, frente, anilhas: ANILHAS };
}

/** Quanto um ponto entra na caixa da almofada (cm; negativo = fora). */
export function naAlmofada(b: BancoScott, p: V3): number {
  const F2 = faceDaAlmofada(b);
  const r = sub(p, F2.topo);
  const ao = dot(r, F2.d),
    fundo = -dot(r, F2.n);
  return Math.min(ao, F2.comp - ao, fundo, F2.esp - fundo, F2.larg / 2 - Math.abs(p[0] - F2.topo[0]));
}
/** A menor folga (cm) entre a barra (a linha em W com o raio da pegada, as mangas e as anilhas) e a almofada. */
export function folgaDaBarraNaAlmofada(prims: Prim[], b: BancoScott): number {
  let m = 1e9;
  for (const p of prims) {
    if (p.t !== 'volume') continue;
    for (const an of p.vol.aneis) {
      const raio = Math.max(an.a, an.f, an.b);
      for (let i = 0; i < 8; i++) {
        const t = (i / 8) * 2 * Math.PI;
        const q = add(an.c, add(mul(an.x, Math.cos(t) * raio), mul(an.z, Math.sin(t) * raio)));
        m = Math.min(m, -naAlmofada(b, q));
      }
    }
  }
  return m;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const p = parado(corpo);
  const x = Math.max(0, Math.min(1, u));
  const baixo = erro === 'trava' ? f('erro.trava.cotovelo') : erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.baixo');
  const cima = erro === 'tira' ? f('erro.tira.cotovelo') : f('cotovelo.cima');
  const sobe = erro === 'tira' ? f('erro.tira.braco') * suave(x) : 0;
  const e = montar(corpo, p.pelve, p.bolaZ, mix(baixo, cima, x), p.abre, sobe);
  const B = bancoScott(bancoDaScott(corpo));
  const W = barraDe(e);
  const pb = barraW(W);
  const marcas: Record<string, V3> = { barra: W.centro };
  pontosDaBarraW(W).forEach((pt, i) => (marcas[`barraW.${i}`] = pt));
  return {
    esq: e,
    prims: [chao(-80, 80, -90, 110), ...B.prims, ...pb.prims],
    pecas: [B.peca, pb.peca],
    fios: [],
    cargas: [{ massa: MASSA, pos: W.centro }],
    marcas,
    vies: { maoR: 1, maoL: 1 },
    // De três quartos, o braço de longe (o esquerdo) é pintado atrás do corpo (o Boneco o põe 5 cm atrás do tronco),
    // e a almofada, que fica na frente do tronco, era pintada por cima dele: o braço parecia passar por fora da borda
    // de longe da almofada, em vez de deitado em cima dela. Ele está deitado na face, na frente do tronco e da almofada:
    // vai para a frente dos dois na pintura (a regra banco-scott-bracos-na-almofada confere, nas vistas que veem a face)
    viesNaVista: { quina: { bracoL: VIES_DO_BRACO_DE_LONGE } },
  };
}

export const roscaScott: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // bíceps (principal, é o que a biblioteca conta, sem secundário); o antebraço "só ajuda", como nas outras roscas
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { barra: (q) => q.marcas.barra!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
