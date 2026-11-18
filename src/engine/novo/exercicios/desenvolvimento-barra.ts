// Desenvolvimento em pé com barra, no motor novo. Os números vêm da ficha (../dados/movimentos/desenvolvimento-barra.json).
// O corpo em pé é o dos desenvolvimentos em pé aprovados (o núcleo dos stiffs, ./dobrar-o-quadril.ts: pés na largura do
// quadril, joelhos soltos, o quadril parado no ângulo do equilíbrio médio da subida). O que muda aqui:
//  - as duas mãos seguram a mesma barra, rígida, que anda inteira num caminho reto preso ao tórax: embaixo, apoiada na
//    parte de cima do peito (encostada na pele, a folga sai da superfície do Boneco); em cima, sobre o centro dos
//    ombros, na altura em que os cotovelos dobram só o que a ficha pede;
//  - a barra sobe "rente ao rosto": quando o caminho reto passaria mais perto do queixo e do nariz do que a ficha pede,
//    a cabeça vai para trás (o pescoço estende) só o que precisa. Isso é calculado numa tabela do caminho (uma vez por
//    corpo) e lido com uma curva suave entre os pontos;
//  - embaixo, os cotovelos apontam para a frente e para baixo (ficam à frente da barra); em cima, para os lados;
//  - o suporte fica à frente, com os ganchos na altura do peito; a pessoa está dois passos atrás dos ganchos.
import ficha from '../dados/movimentos/desenvolvimento-barra.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca } from '../pecas';
import { barraLonga, massaDaBarra } from '../pecas-de-cena/barra-longa';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { bercoAFrente, furoMaisPerto, suporte } from '../pecas-de-cena/suporte';
import type { Suporte } from '../pecas-de-cena/suporte';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, noRef, norm, paraRef } from '../vec';
import type { V3 } from '../vec';
import { folgaDaBarra, primeiroToque } from './barra-nas-costas';
import { dobrarOQuadril } from './dobrar-o-quadril';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const ANILHAS: IdAnilha[] = ['anilha5'];
if (obj('anilha5', 'massa') !== f('carga.anilhas')) throw new Error('desenvolvimento-barra: a anilha da ficha não é a da tabela');
const massa = () => massaDaBarra(ANILHAS);
const ROSTO = ['cabeca', 'pescoco'];
const rad = Math.PI / 180;

interface Pedido {
  joelho: number;
  frente: number;
  lombar: number;
  toracica: number;
  cervical: number;
  /** O ângulo do quadril (dado), ou o do equilíbrio deste quadro (ausente). */
  alfa?: number;
}
interface Caminho {
  baixo: V3;
  cima: V3;
  /** O caminho da frente do rosto: pontos [y, z] no tórax, do peito até em cima (a altura sobe sempre). */
  pts: [number, number][];
  /** A altura do queixo e a do alto da cabeça (neutra), no tórax. */
  rosto: [number, number];
}
/** A altura da barra em u (0 = no peito, 1 = em cima), no tórax: ela sobe por igual. */
const alturaEm = (c: Caminho, u: number) => mix(c.baixo[1], c.cima[1], u);
/** O ponto do caminho da barra (no referencial do tórax) em u. */
function noCaminho(c: Caminho, u: number): V3 {
  const y = alturaEm(c, u);
  const P = c.pts;
  let i = 0;
  while (i < P.length - 2 && P[i + 1]![0] < y) i++;
  const [y0, z0] = P[i]!,
    [y1, z1] = P[i + 1]!;
  return [0, y, z0 + ((z1 - z0) * (y - y0)) / (y1 - y0 || 1)];
}

/** Em pé, com a barra no ponto `local` do tórax; `u` decide para onde os cotovelos apontam. */
function emPe(corpo: Corpo, p: Pedido, local: V3, u: number): { e: Esq; alfa: number; centro: V3 } {
  let centro: V3 = [0, 0, 0];
  const r = dobrarOQuadril(corpo, {
    joelho: p.joelho,
    tronco: p.frente + p.lombar,
    lombar: p.lombar,
    toracica: p.toracica,
    cervical: p.cervical,
    cabeca: 0,
    pesMeiaDistancia: f('pes.meiaDistancia'),
    apoio: 'dois',
    ...(p.alfa === undefined ? {} : { alfa: p.alfa }),
    bracos(e) {
      const T = e.torax;
      centro = noRef(T, local);
      const braco = (k: Lado): PoseBraco => {
        const s = sinal(k);
        // embaixo o cotovelo aponta para a frente e para baixo; em cima, para fora
        const polo = norm(add(mul(dirRef(T, [s * 0.35, -0.55, 1]), 1 - u), mul(dirRef(T, [s, 0.1, 0.25]), u)));
        // a mão: a barra no meio da palma; embaixo o punho dobra para trás (a barra apoia na base da mão) e, em cima, fica
        // reto
        const b = f('punho.extensao') * (1 - u) * rad;
        const dedos = dirRef(T, [0, Math.cos(b), -Math.sin(b)]);
        const pegada = noRef(T, [s * f('pegada.meia'), local[1], local[2]]);
        return { punho: add(pegada, mul(dedos, -corpo.m('mao.punhoAoCentroDaPegada'))), polo, mao: { polegar: dirRef(T, [-s, 0, 0]), dedos, forma: 'pegada', diam: obj('barraLonga', 'pegadaDiam') } };
      };
      return { R: braco('R'), L: braco('L'), cargas: [{ massa: massa(), pos: centro }] };
    },
  });
  return { e: r.e, alfa: r.alfa, centro };
}
const certo = (cervical = 0, alfa?: number): Pedido => ({ joelho: f('joelho'), frente: f('bacia'), lombar: 0, toracica: 0, cervical, ...(alfa === undefined ? {} : { alfa }) });

/**
 * As pontas do caminho da barra no tórax (uma vez por corpo): embaixo, na altura do alto do esterno, encostada na pele;
 * em cima, sobre o centro dos ombros, na altura em que o cotovelo dobra `cotovelo.cima` graus.
 */
function pontas(corpo: Corpo): { baixo: V3; cima: V3 } {
  return calibragem(corpo, 'desenvolvimento-barra:pontas', () => {
    const y = -f('barra.peito');
    let zb = 14;
    for (let i = 0; i < 2; i++) {
      const e = emPe(corpo, certo(), [0, y, zb], 0).e;
      zb = primeiroToque((z) => folgaDaBarra(e, noRef(e.torax, [0, y, z]), e.torax.x, ['tronco', 'pescoco'], f('pegada.meia') - 4).folga, 30, 0);
    }
    let cima: V3 = [0, 50, 0];
    for (let i = 0; i < 3; i++) {
      const e0 = emPe(corpo, certo(), cima, 1).e;
      const zo = (paraRef(e0.torax, e0.lado.R.ombro)[2] + paraRef(e0.torax, e0.lado.L.ombro)[2]) / 2;
      const yc = resolver1((yy) => emPe(corpo, certo(), [0, yy, zo], 1).e.lado.R.ang.cotovelo - f('cotovelo.cima'), 20, 80, 30);
      cima = [0, yc, zo];
    }
    return { baixo: [0, y, zb] as V3, cima };
  });
}
/**
 * O ângulo do quadril: a média do equilíbrio em cinco pontos da subida, com a barra na linha reta entre as pontas (o
 * quadril fica parado, como nos desenvolvimentos em pé aprovados).
 */
function alfaMedio(corpo: Corpo): number {
  return calibragem(corpo, 'desenvolvimento-barra:alfa', () => {
    const c = pontas(corpo);
    const us = [0, 0.25, 0.5, 0.75, 1];
    return us.reduce((a, u) => a + emPe(corpo, certo(), [0, mix(c.baixo[1], c.cima[1], u), mix(c.baixo[2], c.cima[2], u)], u).alfa, 0) / us.length;
  });
}
/**
 * Quanto o pescoço estende com a barra na altura `y` do tórax: a cabeça vai para trás enquanto a barra passa pelo rosto
 * (do queixo à testa), entrando e saindo sem tranco. `rosto` = a altura do queixo e a do alto da cabeça, no tórax.
 */
function pescocoNaAltura(y: number, rosto: [number, number]): number {
  const r = f('cabeca.entra'),
    r2 = f('cabeca.sai');
  const entra = suave(Math.max(0, Math.min(1, (y - (rosto[0] - r)) / r)));
  const sai = 1 - suave(Math.max(0, Math.min(1, (y - rosto[1]) / r2)));
  return -f('cabeca.paraTras') * Math.min(entra, sai);
}
/**
 * O caminho da barra (uma vez por corpo): o fio esticado do peito até em cima que passa pela frente do rosto à folga
 * pedida. Em cada altura, a frente do rosto (com a cabeça para trás o que `pescocoNaAltura` pede) dá o ponto mais para
 * trás onde a barra pode passar; o caminho é o contorno de fora desses pontos (o fecho convexo do lado da frente), que
 * só toca o rosto onde precisa e segue reto no resto.
 */
function caminho(corpo: Corpo): Caminho {
  return calibragem(corpo, 'desenvolvimento-barra:caminho', () => {
    const c = pontas(corpo),
      alfa = alfaMedio(corpo);
    const m = (id: string) => corpo.m(id);
    const e0 = emPe(corpo, certo(0, alfa), c.baixo, 0).e;
    const rosto: [number, number] = [paraRef(e0.torax, noRef(e0.cabeca, [0, m('cabeca.tragionAoTopo') - m('cabeca.altura'), 0]))[1], paraRef(e0.torax, noRef(e0.cabeca, [0, m('cabeca.tragionAoTopo'), 0]))[1]];
    const R = obj('barraLonga', 'pegadaDiam') / 2 + f('barra.folgaDoRosto');
    const pts: [number, number][] = [[c.baixo[1], c.baixo[2]]];
    const passo = f('caminho.passo');
    for (let y = c.baixo[1] + passo; y < c.cima[1] - passo / 2; y += passo) {
      const e = emPe(corpo, certo(pescocoNaAltura(y, rosto), alfa), [0, y, c.baixo[2]], 0).e;
      let z = -1e9;
      for (const { p, parte } of pontosDoBoneco(e)) {
        if (!ROSTO.includes(parte)) continue;
        const l = paraRef(e.torax, p);
        if (Math.abs(l[0]) > f('pegada.meia') - 4 || Math.abs(l[1] - y) >= R) continue;
        z = Math.max(z, l[2] + Math.sqrt(R * R - (l[1] - y) ** 2));
      }
      if (z > -1e8) pts.push([y, z]);
    }
    pts.push([c.cima[1], c.cima[2]]);
    // o fecho convexo do lado da frente (z maior), da ponta de baixo à de cima
    const fecho: [number, number][] = [];
    for (const q of pts) {
      while (fecho.length >= 2) {
        const [a, b] = [fecho[fecho.length - 2]!, fecho[fecho.length - 1]!];
        // b fica para dentro da reta de a até q: sai
        if ((b[0] - a[0]) * (q[1] - a[1]) - (b[1] - a[1]) * (q[0] - a[0]) >= 0) fecho.pop();
        else break;
      }
      fecho.push(q);
    }
    return { ...c, pts: fecho, rosto };
  });
}
/** A extensão do pescoço em u. */
const pescocoEm = (corpo: Corpo, u: number) => {
  const c = caminho(corpo);
  return pescocoNaAltura(alturaEm(c, u), c.rosto);
};
/** No erro da descida curta, de onde o caminho começa: a barra na altura da testa. */
function inicioDaDescidaCurta(corpo: Corpo): number {
  return calibragem(corpo, 'desenvolvimento-barra:testa', () => {
    const c = caminho(corpo),
      alfa = alfaMedio(corpo);
    const m = (id: string) => corpo.m(id);
    const yOlhos = (m('cabeca.orelhaAltura') / 2) * 0.25;
    const yTesta = mix(yOlhos, m('cabeca.tragionAoTopo'), f('erro.curta.testa'));
    return resolver1((u) => {
      const r = emPe(corpo, certo(pescocoEm(corpo, u), alfa), noCaminho(c, u), u);
      return r.centro[1] - noRef(r.e.cabeca, [0, yTesta, 0])[1];
    }, 0, 1, 30);
  });
}

/** O suporte à frente: os ganchos na altura do peito; os pinos no furo mais baixo (o cartão não pede pinos). */
function oSuporte(corpo: Corpo): Suporte {
  return calibragem(corpo, 'desenvolvimento-barra:suporte', () => {
    const r = emPe(corpo, certo(0, alfaMedio(corpo)), noCaminho(caminho(corpo), 0), 0);
    return { base: [0, 0, r.centro[2] + f('suporte.passos')] as V3, paraAPessoa: [0, 0, -1] as V3, gancho: furoMaisPerto(corpo.m('altura.peito')), pino: obj('suporte', 'pinoMin') };
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = caminho(corpo);
  // na descida curta, a barra anda só da testa para cima
  const uc = erro === 'e3' ? mix(inicioDaDescidaCurta(corpo), 1, u) : u;
  const p = certo(pescocoEm(corpo, uc), alfaMedio(corpo));
  if (erro === 'e1') {
    // a lombar arqueia e o peito vai para trás; o quadril sai do equilíbrio de cada quadro
    p.lombar = f('erro.arco.lombar') * u;
    p.toracica = f('erro.arco.toracica') * u;
    p.frente = f('bacia') + f('erro.arco.bacia') * u;
    delete p.alfa;
  }
  if (erro === 'e2') {
    // os joelhos dobram embaixo e estendem para empurrar a barra
    p.joelho = mix(f('erro.jogar.joelho'), f('joelho'), u);
    p.frente = f('bacia') + mix(f('erro.jogar.bacia'), 0, u);
    delete p.alfa;
  }
  const r = emPe(corpo, p, noCaminho(c, uc), uc);
  const e = r.e;
  const S = oSuporte(corpo);
  const su = suporte(S);
  const barra = barraLonga({ centro: r.centro, eixo: e.torax.x, anilhas: ANILHAS }, { pontasAtras: 200 });
  const pecas: Peca[] = [su.estrutura, su.ganchos, barra.peca];
  const cargas = [{ massa: massa(), pos: r.centro }];
  return {
    esq: e,
    prims: [chao(-80, 80, -80, 110), ...su.prims, ...barra.prims],
    pecas,
    fios: [],
    cargas,
    marcas: { barra: r.centro, gancho: [0, S.gancho, S.base[2] - bercoAFrente()], pino: [0, S.pino, S.base[2]], centroDeMassa: centroDeMassa(e, 'homem', cargas) },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const desenvolvimentoBarra: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'lateral'], // abre de frente: de lado o corpo fica pequeno e a anilha cobre o rosto no começo; a de lado mostra a barra rente ao rosto
  quadro,
  // a biblioteca: frente do ombro (principal); lateral do ombro e tríceps (secundários)
  papeis: { deltAnt: 'p', deltLat: 's', triceps: 's' },
  trajetorias: { barra: (q) => q.marcas.barra!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
