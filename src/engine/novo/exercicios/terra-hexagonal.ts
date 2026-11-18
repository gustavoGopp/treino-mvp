// Levantamento terra com barra hexagonal, no motor novo. Os números vêm da ficha
// (../dados/movimentos/terra-hexagonal.json); a barra, da peça ../pecas-de-cena/barra-hexagonal.ts. Fica entre o
// agachamento e o terra: o quadril e o joelho dobram juntos, os braços estendidos ao lado do corpo seguram os cabos. O
// que ele resolve em cada quadro, em vez de receber pronto:
//  - o corpo é o dos agachamentos aprovados (./agachar.ts): a posição do quadril sai da flexão do joelho e do centro de
//    massa (corpo + barra com as anilhas) sobre o meio do pé;
//  - joelho e peito andam no mesmo passo, do embaixo ao em cima ("estende joelhos e quadril juntos"); a inclinação do
//    peito embaixo não é escolhida: é a que leva as mãos aos cabos com as anilhas tocando o chão (`resolver1`, guardado
//    para o corpo do app);
//  - os braços pendem na vertical, quase estendidos, abertos para o lado só o que leva cada mão ao seu cabo (os cabos
//    ficam a 63,5 cm um do outro, e a barra é rígida: a distância entre as mãos não muda);
//  - a barra sai das mãos: o meio dela fica entre as duas pegadas, as mangas na linha das mãos e os cabos da frente
//    para trás.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/terra-hexagonal.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { barraHexagonal, cantosDoHexagono, centroDoCabo, massaDaBarraHexagonal, raioDaAnilhaMaiorNaHexagonal } from '../pecas-de-cena/barra-hexagonal';
import type { BarraHexagonal } from '../pecas-de-cena/barra-hexagonal';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { agachar } from './agachar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const ANILHAS: IdAnilha[] = [`anilha${f('anilhas')}` as IdAnilha];
const MASSA = massaDaBarraHexagonal(ANILHAS);
/** A altura do centro da barra quando ela está no chão, apoiada nas anilhas. */
const NO_CHAO = raioDaAnilhaMaiorNaHexagonal(ANILHAS);
const MEIO_CABOS = obj('barraHexagonal', 'caboEntre') / 2;

/** As direções do braço e do antebraço: pendendo na vertical, aberto `abre` graus para o lado; o cotovelo dobra um pouco para a frente. */
function direcoes(k: Lado, abre: number): { umero: V3; antebraco: V3 } {
  const s = sinal(k),
    a = abre * rad,
    c = f('cotovelo') * rad;
  const desce: V3 = [s * Math.sin(a), -Math.cos(a), 0];
  return { umero: desce, antebraco: norm(add(mul(desce, Math.cos(c)), [0, 0, Math.sin(c)])) };
}
/** Quanto o braço abre para o centro da mão chegar ao cabo (x = ±31,75 cm), dado o ombro. */
function aberturaAteOCabo(corpo: Corpo, ombro: V3): number {
  const c = f('cotovelo') * rad;
  const L = corpo.m('braco.comp') + (corpo.m('antebraco.comp') + corpo.m('mao.punhoAoCentroDaPegada')) * Math.cos(c);
  return Math.asin(Math.max(-1, Math.min(1, (MEIO_CABOS - Math.abs(ombro[0])) / L))) / rad;
}

interface Pedido {
  joelho: number;
  tronco: number;
  lombar: number;
}
/**
 * O corpo com o joelho, o peito e a lombar pedidos, os braços pendendo até os cabos e a barra nas mãos (a carga entra
 * no equilíbrio pelo meio das duas pegadas). Três passadas: a abertura do braço sai do ombro da passada anterior.
 */
function corpoDe(corpo: Corpo, p: Pedido): Esq {
  let abre = 12;
  let e: Esq | null = null;
  for (let i = 0; i < 3; i++) {
    const a = abre;
    const r = agachar(corpo, {
      joelho: p.joelho,
      tronco: p.tronco,
      lombar: p.lombar,
      valgo: 0,
      calcanhar: 0,
      apoio: 'meio',
      pesMeiaDistancia: f('pes.meiaDistancia'),
      pesParaFora: f('pes.paraFora'),
      bracos(t) {
        const braco = (k: Lado): PoseBraco => ({ ...direcoes(k, a), polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'pegada', diam: obj('barraHexagonal', 'caboDiam') } });
        // a barra conta no equilíbrio pelo meio das mãos. Na busca do quadril, o tronco só anda (não gira) e os braços
        // pendem na vertical: o meio das mãos anda junto com a base do pescoço, no mesmo afastamento da passada anterior
        const L = corpo.m('braco.comp') + corpo.m('antebraco.comp') + corpo.m('mao.punhoAoCentroDaPegada');
        const pos: V3 = add(t.torax.o, e ? sub(mul(add(e.lado.R.pegada, e.lado.L.pegada), 0.5), e.torax.o) : [0, -L, 0]);
        return { R: braco('R'), L: braco('L'), carga: { massa: MASSA, pos } };
      },
    });
    e = r.e;
    abre = aberturaAteOCabo(corpo, e.lado.R.ombro);
  }
  return e!;
}

/** A inclinação do peito embaixo que leva as mãos aos cabos com as anilhas no chão (com a lombar pedida). */
function troncoEmbaixo(corpo: Corpo, lombar: number): number {
  return calibragem(corpo, `terra-hexagonal:tronco-embaixo:${lombar}`, () => resolver1((x) => corpoDe(corpo, { joelho: f('joelho.baixo'), tronco: x, lombar }).lado.R.pegada[1] - NO_CHAO, 10, 85, 26));
}

/** O pedido de cada instante: u = 0 embaixo, 1 em cima. */
function pedido(corpo: Corpo, u: number, erro?: string): Pedido {
  if (erro === 'arred') {
    const L = f('erro.arred.lombar');
    return { joelho: mix(f('joelho.baixo'), f('joelho.cima'), u), tronco: mix(troncoEmbaixo(corpo, L), f('tronco.cima'), u), lombar: L * (1 - u) };
  }
  const baixo = troncoEmbaixo(corpo, 0);
  if (erro === 'quadril') {
    // os joelhos estendem primeiro; o peito só começa a subir quando eles já estão quase retos
    const a = f('erro.quadril.joelho');
    const t = suave(Math.max(0, (u - a) / (1 - a)));
    const joelho = u <= a ? mix(f('joelho.baixo'), f('erro.quadril.joelhoNoMeio'), suave(u / a)) : mix(f('erro.quadril.joelhoNoMeio'), f('joelho.cima'), t);
    return { joelho, tronco: mix(baixo, f('tronco.cima'), t), lombar: 0 };
  }
  return { joelho: mix(f('joelho.baixo'), f('joelho.cima'), u), tronco: mix(baixo, f('tronco.cima'), u), lombar: 0 };
}

/** A barra que as mãos seguram: o meio entre as pegadas, as mangas na linha das mãos, os cabos da frente para trás. */
function barraDe(e: Esq): BarraHexagonal {
  const pR = e.lado.R.pegada,
    pL = e.lado.L.pegada;
  return { centro: mul(add(pR, pL), 0.5), eixo: norm(sub(pL, pR)), cabos: [0, 0, 1], anilhas: ANILHAS };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  let e = corpoDe(corpo, pedido(corpo, u, erro));
  let B = barraDe(e);
  let cargas: Quadro['cargas'] = [{ massa: MASSA, pos: B.centro }];
  if (erro === 'soltar') {
    // a barra cai na frente das mãos: a altura dela acima do chão fica a das mãos vezes u elevado à queda; as mãos abrem
    const y = NO_CHAO + (B.centro[1] - NO_CHAO) * Math.pow(u, f('erro.soltar.queda'));
    const solta = B.centro[1] - y > 2;
    B = { ...B, centro: [B.centro[0], y, B.centro[2]] };
    if (solta) {
      // o mesmo corpo, com as mãos abertas (a pose do certo, para a comparação), e a barra fora do equilíbrio
      e = { ...e, lado: { R: { ...e.lado.R, formaMao: 'aberta' }, L: { ...e.lado.L, formaMao: 'aberta' } } };
      cargas = [];
    }
  }
  const pb = barraHexagonal(B);
  const r = obj(ANILHAS[0]!, 'diam') / 2;
  const marcas: Record<string, V3> = { barra: B.centro, 'anilhas.baixo': [B.centro[0], B.centro[1] - r, B.centro[2]] };
  const u0 = norm(B.eixo);
  for (const k of ['R', 'L'] as Lado[]) {
    const c = centroDoCabo(B, sinal(k));
    const meia = obj('barraHexagonal', 'larg') / 2 - obj('barraHexagonal', 'tubo');
    marcas[`cabo.${k}.a`] = add(c, [0, 0, -meia]);
    marcas[`cabo.${k}.b`] = add(c, [0, 0, meia]);
  }
  cantosDoHexagono().forEach(([s, t], i) => (marcas[`hexagono.${i}`] = add(add(B.centro, mul(u0, s)), [0, 0, t])));
  return { esq: e, prims: [chao(-130, 130, -80, 80), ...pb.prims], pecas: [pb.peca], fios: [], cargas, marcas, vies: { maoR: 1, maoL: 1 } };
}

export const terraHexagonal: Exercicio = {
  ficha: F,
  vistas: ['quina', 'lateral'],
  quadro,
  // os da biblioteca: quadríceps e glúteos (principais); posteriores da coxa e adutores (secundários)
  papeis: { quadriceps: 'p', gluteo: 'p', posteriores: 's', adutores: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, barra: (q) => q.marcas.barra! },
};
