// Panturrilha sentada com halter no joelho, no motor novo. Os números vêm da ficha
// (../dados/movimentos/panturrilha-sentada-halter.json). Sentado na ponta do banco reto, o tronco reto; a bola dos pés
// na beirada de um degrau baixo (o step, na altura mais baixa), os calcanhares no ar; o halter deitado ao longo da coxa
// direita, perto do joelho, sobre uma toalha dobrada, com as duas mãos em cima dele. O pé gira na bola (o mesmo pé
// apoiado das panturrilhas em pé); o quadril fica parado no banco e o joelho sobe e desce com o calcanhar.
// O que este arquivo resolve, em vez de receber pronto:
//  - a altura do quadril: a parte de baixo do glúteo e da coxa apoia no tampo do banco (amassando 1 cm);
//  - onde fica o degrau: à distância em que o joelho fica a 90° com o calcanhar na altura do apoio;
//  - a altura do halter: as cabeças ficam à espessura da toalha da pele da coxa (medida na superfície do Boneco).
import ficha from '../dados/movimentos/panturrilha-sentada-halter.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { bancoReto, chao, halter } from '../pecas';
import type { Peca, PecaPropria } from '../pecas';
import { step } from '../pecas-de-cena/degrau';
import { retArred } from '../realista/base.mjs';
import type { Material } from '../realista/base.mjs';
import type { Corpo } from '../tabelas';
import { pesoNoCorpo, pontosDoPeso } from '../regras/peso-fora-do-corpo';
import { obj } from '../tabelas';
import { add, clamp, cross, dot, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const deg = 180 / Math.PI;
const APOIO = obj('step', 'altura');

interface Pose {
  calc: number;
  lombar: number;
  toracica: number;
  doJoelho: number;
}
interface Calib {
  pelveY: number;
  bolaZ: number;
}
const CACHE = new WeakMap<Corpo, Calib>();

const perna = (s: number, bolaZ: number, calc: number): PosePerna => ({ pe: { bola: [s * f('pes.meiaDistancia'), APOIO, bolaZ], dir: [0, 0, 1], calc }, polo: [s * 0.05, 0.3, 1] });

/**
 * O halter deitado atravessado sobre a coxa direita, perto do joelho (o cabo de um lado ao outro, como na animação de
 * hoje). Devolve o centro, o eixo do cabo, a direção da coxa (do quadril para o joelho) e a direção "para cima" da coxa.
 */
function halterNaCoxa(e: Esq, doJoelho: number): { centro: V3; eixo: V3; coxa: V3; cima: V3 } {
  const L = e.lado.R;
  const coxa = norm(sub(L.joelho, L.quadril));
  const cima = L.coxa.z;
  const eixo = norm(cross(cima, coxa));
  const base = sub(L.joelho, mul(coxa, doJoelho));
  // a altura do cabo acima do eixo da coxa: o ponto mais alto da superfície das coxas do Boneco debaixo do halter (com
  // os pés na largura do quadril, a cabeça de dentro passa por cima da outra coxa), mais a toalha, mais meia cabeça
  // do halter (de face a face: ele deita numa face)
  const c1 = obj('halter', 'comp') / 2,
    meia = obj('halter', 'cabecaLargura') / 2;
  let r = 0;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'coxa') continue;
    const v = sub(p, base);
    if (Math.abs(dot(v, eixo)) <= c1 && Math.abs(dot(v, coxa)) <= meia) r = Math.max(r, dot(v, cima));
  }
  const h = r + f('toalha.esp') + obj('halter', 'cabecaAltura') / 2;
  return { centro: add(base, mul(cima, h)), eixo, coxa, cima };
}

type HalterNaCoxa = ReturnType<typeof halterNaCoxa>;

/** O tronco, as pernas e o halter no lugar certo (na coxa, perto do joelho), com os braços ainda soltos. */
function base(corpo: Corpo, C: Calib, p: Pose) {
  const t = resolverTronco(corpo, { pelve: [0, C.pelveY, 0], lombar: p.lombar, toracica: p.toracica });
  const pernas = { R: perna(-1, C.bolaZ, p.calc), L: perna(1, C.bolaZ, p.calc) };
  const solto: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const eSolto = resolverMembros(t, { R: solto, L: solto }, pernas);
  return { t, pernas, eSolto, H: halterNaCoxa(eSolto, p.doJoelho) };
}

/**
 * A mão do lado `k` espalmada em cima da cabeça do halter H (a direita na de fora, a esquerda na de dentro), os dedos
 * para o joelho.
 */
function maoNoHalter(corpo: Corpo, H: HalterNaCoxa, k: Lado): PoseBraco {
  const m = (id: string) => corpo.m(id);
  const s = sinal(k);
  const cab = (obj('halter', 'caboComp') + obj('halter', 'comp')) / 4;
  // o eixo do cabo aponta para a esquerda da pessoa: a mão direita fica do lado de fora (−), a esquerda do de dentro
  const palma = add(add(H.centro, mul(H.eixo, s * cab)), mul(H.cima, obj('halter', 'cabecaAltura') / 2));
  return {
    punho: add(add(palma, mul(H.cima, m('raio.punho') * 0.85)), mul(H.coxa, -m('mao.palma') * 0.45)),
    polo: [s, -0.6, -0.2],
    // os dedos para o joelho; a mão esquerda, que vem do outro lado do corpo, com os dedos um pouco para dentro
    mao: { polegar: norm(add(mul(H.eixo, -s), mul(H.coxa, 0.25))), dedos: k === 'L' ? norm(add(H.coxa, mul(H.eixo, -f('maoL.paraDentro')))) : H.coxa, forma: 'aberta' },
  };
}

/** Quanto do erro "Halter escorregando" já aconteceu, no instante s do erro (0 a 1 cada um): a mão que solta, o deslize de lado e o giro. */
function passoDoErro(s: number): { desliza: number; gira: number; solta: number } {
  const g0 = f('erro.halter.giroComeca');
  return {
    desliza: suave(clamp(s / f('erro.halter.deslizeAcaba'), 0, 1)),
    gira: suave(clamp((s - g0) / (1 - g0), 0, 1)),
    solta: suave(clamp(s / f('erro.halter.maoSoltaAte'), 0, 1)),
  };
}

/**
 * Erro "Halter escorregando" (o halter desliza da coxa, como diz o cartão; decisão do Gustavo de 19/11/2026): a mão
 * esquerda solta a cabeça de dentro, e o halter desliza para fora, ao longo do cabo (`erro.halter.saiDeLado`), e gira em
 * volta do eixo da coxa, a cabeça de fora descendo pela lateral da coxa (`erro.halter.gira`); `h` é quanto ele desce
 * (ao longo do "para cima" da coxa) até apoiar na toalha ou na coxa.
 */
function halterDeLado(Hn: HalterNaCoxa, s: number, h: number): HalterNaCoxa {
  const P = passoDoErro(s);
  const th = (f('erro.halter.gira') * P.gira) / deg;
  const eixo = norm(add(mul(Hn.eixo, Math.cos(th)), mul(Hn.cima, Math.sin(th))));
  const cima = norm(sub(mul(Hn.cima, Math.cos(th)), mul(Hn.eixo, Math.sin(th))));
  const centro = add(sub(Hn.centro, mul(Hn.eixo, f('erro.halter.saiDeLado') * P.desliza)), mul(Hn.cima, h));
  return { centro, eixo, coxa: Hn.coxa, cima };
}

/** A toalha dobrada debaixo do halter no lugar certo: o centro da face de baixo e os três eixos (lado, cabo, para cima). */
function toalhaDe(H: HalterNaCoxa): { base: V3; lado: V3; larg: number; comp: number; esp: number } {
  const esp = f('toalha.esp');
  return { base: sub(H.centro, mul(H.cima, obj('halter', 'cabecaAltura') / 2 + esp)), lado: norm(cross(H.cima, H.eixo)), larg: 15, comp: obj('halter', 'comp') + 4, esp };
}

/** Quanto o halter (as cabeças e o cabo, pela superfície) entra na toalha que ficou na coxa (cm; 0 = não entra). */
export function halterNaToalha(Hn: HalterNaCoxa, prims: ReturnType<typeof halter>): number {
  const T = toalhaDe(Hn);
  let pior = 0;
  for (const prim of prims)
    if (prim.t === 'prisma' || prim.t === 'volume')
      for (const q of pontosDoPeso(prim)) {
        const v = sub(q, T.base);
        const a = T.larg / 2 - Math.abs(dot(v, T.lado)),
          b = T.comp / 2 - Math.abs(dot(v, Hn.eixo)),
          y = dot(v, Hn.cima),
          c = Math.min(y, T.esp - y);
        if (a > 0 && b > 0 && c > 0) pior = Math.max(pior, Math.min(a, b, c));
      }
  return pior;
}

/**
 * Quanto o halter desce no erro (`h` de `halterDeLado`), no instante s: ele desce até apoiar na toalha ou nas coxas, e
 * fica `erro.halter.folga` acima do primeiro toque. Calculado de cima para baixo (de centímetro em centímetro, e depois
 * pela metade), em 9 instantes do erro, e guardado no preparo; entre eles, a reta.
 */
function descidaDoErro(corpo: Corpo): number[] {
  return calibragem(corpo, 'panturrilha-sentada-halter:halter-de-lado', () => {
    const C = calibrar(corpo);
    const out: number[] = [];
    for (let i = 0; i <= 8; i++) {
      const s = i / 8;
      const B = base(corpo, C, { ...poseDoCalcanhar(corpo, s), lombar: 0, toracica: 0, doJoelho: f('halter.doJoelho') });
      const toalha0 = halterNaToalha(B.H, halter(B.H.centro, B.H.eixo, 0.6));
      const entra = (h: number) => {
        const H = halterDeLado(B.H, s, h);
        const prims = halter(H.centro, H.eixo, 0.6);
        const noCorpo = pesoNoCorpo({ esq: B.eSolto, prims, pecas: [], fios: [], cargas: [], marcas: {} }, { partes: (p) => !/^(braco|ante|mao|polegar)/.test(p) }).cm;
        return Math.max(noCorpo, halterNaToalha(B.H, prims) - toalha0);
      };
      let alto = 6;
      while (entra(alto) > 0) alto += 2;
      let baixo = alto - 1;
      while (baixo > -40 && entra(baixo) <= 0) {
        alto = baixo;
        baixo -= 1;
      }
      for (let k = 0; k < 12; k++) {
        const c = (alto + baixo) / 2;
        if (entra(c) <= 0) alto = c;
        else baixo = c;
      }
      out.push(alto + f('erro.halter.folga'));
    }
    return out;
  });
}

function montar(corpo: Corpo, C: Calib, p: Pose, erro?: { s: number; h: number }): { e: Esq; H: HalterNaCoxa; Hn: HalterNaCoxa } {
  const { t, pernas, H: Hn } = base(corpo, C, p);
  const H = erro ? halterDeLado(Hn, erro.s, erro.h) : Hn;
  let L = maoNoHalter(corpo, Hn, 'L');
  if (erro) {
    // a mão esquerda solta: sobe da cabeça de dentro, aberta, e vai só uma parte do caminho atrás dela (`erro.halter.maoSegue`),
    // sem tocá-la
    const k = passoDoErro(erro.s).solta;
    const cab = (obj('halter', 'caboComp') + obj('halter', 'comp')) / 4;
    const anda = sub(add(H.centro, mul(H.eixo, cab)), add(Hn.centro, mul(Hn.eixo, cab)));
    L = { ...L, punho: add(add(L.punho!, mul(anda, f('erro.halter.maoSegue'))), mul([0, 1, 0], f('erro.halter.maoSobe') * k)) };
  }
  const e = resolverMembros(t, { R: maoNoHalter(corpo, H, 'R'), L }, pernas);
  return { e, H, Hn };
}

function calibrar(corpo: Corpo): Calib {
  let c = CACHE.get(corpo);
  if (c) return c;
  const assento = obj('bancoReto', 'altura') - f('assento.amassa');
  c = { pelveY: 52, bolaZ: 45 };
  for (let i = 0; i < 4; i++) {
    const cc: Calib = c;
    // o degrau à distância que deixa o joelho a 90° com o calcanhar na altura do apoio
    const bolaZ = resolver1((z) => montar(corpo, { ...cc, bolaZ: z }, { calc: 0, lombar: 0, toracica: 0, doJoelho: f('halter.doJoelho') }).e.lado.R.ang.joelho - f('joelho'), 20, 80);
    // o ponto mais baixo do glúteo e da coxa em cima do banco
    const e = montar(corpo, { ...cc, bolaZ }, { calc: 0, lombar: 0, toracica: 0, doJoelho: f('halter.doJoelho') }).e;
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (!['pe', 'mao', 'polegar'].includes(parte) && Math.abs(p[0]) < 20 && p[2] < f('banco.frenteDoQuadril') && p[2] > -25) min = Math.min(min, p[1]);
    c = { pelveY: cc.pelveY + assento - min, bolaZ };
  }
  CACHE.set(corpo, c);
  return c;
}

/** A toalha dobrada entre o halter e a coxa: uma faixa fina deitada na coxa, debaixo do halter. */
const FELPA: Material = ['#1F5B6B', '#3C8BA0', '#7CC0D2', '#123C47'];
function toalhaNaCoxa(H: HalterNaCoxa): PecaPropria {
  const T = toalhaDe(H);
  return {
    t: 'propria',
    nome: 'toalha-na-coxa',
    desenhar(C) {
      C.prisma(retArred(T.larg, T.comp, 2, 3), T.base, T.lado, H.eixo, mul(H.cima, T.esp), FELPA);
    },
  };
}

/** O giro do pé na bola (graus) no instante u. */
function poseDoCalcanhar(corpo: Corpo, u: number, erro?: string): { calc: number } {
  const dB = corpo.m('pe.calcanharABola');
  const giro = (h: number) => Math.asin(h / dB) * deg;
  const fr = erro === 'curta' ? f('erro.curta.fracao') : 1;
  // na amplitude curta o calcanhar faz só uma parte do caminho, em volta do meio
  const meio = (giro(-f('calcanhar.embaixo')) + giro(f('calcanhar.topo'))) / 2;
  return { calc: meio + (mix(giro(-f('calcanhar.embaixo')), giro(f('calcanhar.topo')), u) - meio) * fr };
}

/**
 * O erro "Halter escorregando" medido no instante u (para a regra `panturrilha-sentada-halter-sai-de-lado`): quanto o
 * halter entra na toalha que ficou na coxa (além do que o halter no lugar certo já amassa), quanto o centro dele fica
 * por fora da lateral da coxa direita (cm; negativo = em cima da coxa), quanto a cabeça de fora desceu e quanto o halter
 * girou (graus).
 */
export function medirErroDoHalter(corpo: Corpo, u: number): { naToalha: number; foraDaCoxa: number; desce: number; gira: number } {
  const q = quadro(corpo, u, 'halter');
  const B = base(corpo, calibrar(corpo), { ...poseDoCalcanhar(corpo, u), lombar: 0, toracica: 0, doJoelho: f('halter.doJoelho') });
  const H = { centro: q.marcas.halter!, eixo: norm(sub(q.marcas.cabecaDentro!, q.marcas.cabecaFora!)) };
  const naToalha = Math.max(0, halterNaToalha(B.H, halter(H.centro, H.eixo, 0.6)) - halterNaToalha(B.H, halter(B.H.centro, B.H.eixo, 0.6)));
  // a lateral da coxa direita (o ponto da pele mais para fora, perto do joelho, na altura do halter)
  const L = q.esq.lado.R;
  const coxa = norm(sub(L.joelho, L.quadril));
  const sec = sub(L.joelho, mul(coxa, f('halter.doJoelho')));
  let lateral = 0;
  for (const { p, parte } of pontosDoBoneco(q.esq)) if (parte === 'coxa' && p[0] < 0 && Math.abs(dot(sub(p, sec), coxa)) <= 4) lateral = Math.min(lateral, p[0]);
  const cab = (obj('halter', 'caboComp') + obj('halter', 'comp')) / 4;
  const foraAntes = add(B.H.centro, mul(B.H.eixo, -cab));
  return {
    naToalha,
    foraDaCoxa: lateral - H.centro[0],
    desce: foraAntes[1] - q.marcas.cabecaFora![1],
    gira: Math.acos(clamp(dot(H.eixo, B.H.eixo), -1, 1)) * deg,
  };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const C = calibrar(corpo);
  const { calc } = poseDoCalcanhar(corpo, u, erro);
  const tronco = erro === 'tronco';
  const pose = {
    calc,
    lombar: tronco ? f('erro.tronco.lombar') * u : 0,
    toracica: tronco ? f('erro.tronco.toracica') * u : 0,
    doJoelho: f('halter.doJoelho'),
  };
  // no erro "Halter escorregando", a descida do halter entre os 9 instantes calculados: a reta
  const D = erro === 'halter' ? descidaDoErro(corpo) : [];
  const i = Math.min(7, Math.floor(u * 8));
  const { e, H, Hn } = montar(corpo, C, pose, erro === 'halter' ? { s: u, h: mix(D[i]!, D[i + 1]!, u * 8 - i) } : undefined);
  const zBanco = f('banco.frenteDoQuadril') - obj('bancoReto', 'comp') / 2;
  const S = step(C.bolaZ - f('bola.daBeirada'));
  const pecas: Peca[] = [{ t: 'bancoReto', x0: 0, z0: zBanco, pontaNoQuadro: 25 }, S.peca, toalhaNaCoxa(Hn), { t: 'halter', centro: H.centro, eixo: H.eixo }];
  return {
    esq: e,
    prims: [chao(-70, 70, -60, 110), ...bancoReto(0, zBanco), ...S.prims, ...halter(H.centro, H.eixo, 0.6)],
    pecas,
    fios: [],
    cargas: [],
    marcas: {
      apoioDosPes: [0, APOIO, C.bolaZ],
      calcanharEmCima: [0, APOIO + f('calcanhar.topo'), 0],
      calcanharEmbaixo: [0, APOIO - f('calcanhar.embaixo'), 0],
      halter: H.centro,
      // as duas cabeças do halter (a de fora, onde fica a mão direita, e a de dentro) e o halter no lugar certo
      cabecaFora: add(H.centro, mul(H.eixo, -(obj('halter', 'caboComp') + obj('halter', 'comp')) / 4)),
      cabecaDentro: add(H.centro, mul(H.eixo, (obj('halter', 'caboComp') + obj('halter', 'comp')) / 4)),
      halterNoLugar: Hn.centro,
    },
  };
}

export const panturrilhaSentadaHalter: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // panturrilha (o sóleo, sentado), sem secundário: é o que a biblioteca conta
  papeis: { panturrilha: 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, joelho: (q) => q.esq.lado.R.joelho },
};
