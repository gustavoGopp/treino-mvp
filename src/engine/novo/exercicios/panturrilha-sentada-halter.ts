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
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { bancoReto, chao, halter } from '../pecas';
import type { Peca, PecaPropria } from '../pecas';
import { step } from '../pecas-de-cena/degrau';
import { retArred } from '../realista/base.mjs';
import type { Material } from '../realista/base.mjs';
import type { Corpo } from '../tabelas';
import { pesoNoCorpo } from '../regras/peso-fora-do-corpo';
import { obj } from '../tabelas';
import { add, cross, dot, mix, mul, norm, sub } from '../vec';
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

function montar(corpo: Corpo, C: Calib, p: Pose): { e: Esq; H: ReturnType<typeof halterNaCoxa> } {
  const m = (id: string) => corpo.m(id);
  const t = resolverTronco(corpo, { pelve: [0, C.pelveY, 0], lombar: p.lombar, toracica: p.toracica });
  const pernas = { R: perna(-1, C.bolaZ, p.calc), L: perna(1, C.bolaZ, p.calc) };
  const solto: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const H = halterNaCoxa(resolverMembros(t, { R: solto, L: solto }, pernas), p.doJoelho);
  // as palmas em cima das duas cabeças do halter (a direita na de fora, a esquerda na de dentro), os dedos para o joelho
  const cab = (obj('halter', 'caboComp') + obj('halter', 'comp')) / 4;
  const mao = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // o eixo do cabo aponta para a esquerda da pessoa: a mão direita fica do lado de fora (−), a esquerda do de dentro
    const palma = add(add(H.centro, mul(H.eixo, s * cab)), mul(H.cima, obj('halter', 'cabecaAltura') / 2));
    return {
      punho: add(add(palma, mul(H.cima, m('raio.punho') * 0.85)), mul(H.coxa, -m('mao.palma') * 0.45)),
      polo: [s, -0.6, -0.2],
      // os dedos para o joelho; a mão esquerda, que vem do outro lado do corpo, com os dedos um pouco para dentro
      mao: { polegar: norm(add(mul(H.eixo, -s), mul(H.coxa, 0.25))), dedos: k === 'L' ? norm(add(H.coxa, mul(H.eixo, -f('maoL.paraDentro')))) : H.coxa, forma: 'aberta' },
    };
  };
  const e = resolverMembros(t, { R: mao('R'), L: mao('L') }, pernas);
  return { e, H };
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
function toalhaNaCoxa(H: ReturnType<typeof halterNaCoxa>): PecaPropria {
  const esp = f('toalha.esp');
  const lado = norm(cross(H.cima, H.eixo));
  const base = sub(H.centro, mul(H.cima, obj('halter', 'cabecaAltura') / 2 + esp));
  return {
    t: 'propria',
    nome: 'toalha-na-coxa',
    desenhar(C) {
      C.prisma(retArred(15, obj('halter', 'comp') + 4, 2, 3), base, lado, H.eixo, mul(H.cima, esp), FELPA);
    },
  };
}

/**
 * Erro "Halter escorregando" (correção de 19/11/2026): até onde o halter escorrega para o quadril. Ele desce pela coxa
 * (que fica inclinada para o quadril) até a cabeça de dentro, que passa por cima da outra coxa, encostar na barriga
 * (no máximo `erro.halter.encosto` cm na pele), e não mais que `erro.halter.doJoelho`. Antes ele ia sempre a 22 cm do joelho e a
 * cabeça de dentro entrava 10,3 cm na barriga. Calibrado no fim da subida (u = 1), onde a coxa mais inclina.
 */
function escorregaAte(corpo: Corpo): number {
  return calibragem(corpo, 'panturrilha-sentada-halter:halter-escorregado', () => {
    const entra = (d: number) => {
      const { e, H } = montar(corpo, calibrar(corpo), { ...poseDoCalcanhar(corpo, 1, undefined), lombar: 0, toracica: 0, doJoelho: d });
      return pesoNoCorpo({ esq: e, prims: halter(H.centro, H.eixo, 0.6), pecas: [], fios: [], cargas: [], marcas: {} }).cm;
    };
    // o maior escorregão em que a cabeça entra no máximo `erro.halter.encosto` cm (busca pela metade; a medida pula de
    // 0 para uns 0,6 cm no primeiro toque, e por isso fica a ponta de baixo do intervalo, a que ainda não entra)
    let a = f('halter.doJoelho'),
      b = f('erro.halter.doJoelho');
    if (entra(b) <= f('erro.halter.encosto')) return b;
    for (let i = 0; i < 24; i++) {
      const c = (a + b) / 2;
      if (entra(c) <= f('erro.halter.encosto')) a = c;
      else b = c;
    }
    // e para meio centímetro antes (`erro.halter.recuo`): o halter desenhado, medido pela conferência da pintura, já
    // entrava 1,1 cm na barriga no primeiro toque do prisma da regra
    return a - f('erro.halter.recuo');
  });
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

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const C = calibrar(corpo);
  const { calc } = poseDoCalcanhar(corpo, u, erro);
  const tronco = erro === 'tronco';
  const { e, H } = montar(corpo, C, {
    calc,
    lombar: tronco ? f('erro.tronco.lombar') * u : 0,
    toracica: tronco ? f('erro.tronco.toracica') * u : 0,
    doJoelho: erro === 'halter' ? mix(f('halter.doJoelho'), escorregaAte(corpo), u) : f('halter.doJoelho'),
  });
  const zBanco = f('banco.frenteDoQuadril') - obj('bancoReto', 'comp') / 2;
  const S = step(C.bolaZ - f('bola.daBeirada'));
  const pecas: Peca[] = [{ t: 'bancoReto', x0: 0, z0: zBanco, pontaNoQuadro: 25 }, S.peca, toalhaNaCoxa(H), { t: 'halter', centro: H.centro, eixo: H.eixo }];
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
