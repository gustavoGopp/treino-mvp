// Abdução de quadril em pé com elástico preso sob o outro pé, no motor novo. Os números vêm da ficha
// (../dados/movimentos/abducao-elastico.json). Em pé, de lado para a parede (ela fica à esquerda, +x), a mão esquerda
// espalmada nela, os dedos para cima, só para equilibrar; a mão direita na cintura. O peso fica todo no pé esquerdo (o de
// dentro), com o joelho quase estendido; a perna direita (a de fora) abre para o lado, estendida, com os dedos para a
// frente, e volta até o pé quase encostar no outro, sem tocar o chão. A bacia não sobe nem gira e o tronco fica reto:
// para o centro de massa continuar sobre o pé de apoio, o corpo inteiro anda um pouco para o lado dele enquanto a perna
// abre (calibrado no começo e no fim, e misturado no caminho).
//
// O elástico é o longo em laço (41 pol; ../dados/objetos/elastico-longo.json). O pé esquerdo pisa nele, inteiro, no meio
// da sola; as duas camadas saem pelo lado de dentro do pé, sobem até a perna direita e dão a volta nela logo acima do
// tornozelo, pelo lado de fora. O pé prende a faixa: só o trecho do pé ao tornozelo estica (o objeto
// ../dados/objetos/elastico-longo-pisado.json); o resto do laço passa sob a sola e fica deitado no chão, do lado da
// parede, sem esticar.
import ficha from '../dados/movimentos/abducao-elastico.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { faixaElastica } from '../pecas-de-cena/elastico-longo';
import { paredeAoLado } from '../pecas-de-cena/parede-ao-lado';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dirRef, dist, dot, girar, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { maosNaCintura } from './afundo-estatico';
import { comprimento } from './elastico-faixa';
import { bordasDaSolaEm } from './elastico-pisado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** O meio da sola, do calcanhar à ponta do pé (como nas remadas com elástico pisado). */
const MEIO_DA_SOLA = 0.4;
const ESP = obj('elasticoLongo', 'esp');

interface Pedido {
  /** Abertura da coxa direita na bacia (graus). */
  abre: number;
  /** Giro da perna direita para fora (graus). */
  giro: number;
  /** Quanto a bacia sobe do lado direito (graus) e quanto o tronco cai a mais para a esquerda (graus). */
  bacia: number;
  tronco: number;
  /** Onde fica a bacia (o centro dela, se não estiver inclinada): para o lado e para a frente, e a altura. */
  sx: number;
  sz: number;
  y: number;
}
interface Base {
  /** A altura da bacia, o centro dela para o lado e para a frente, embaixo (0) e em cima (1). */
  y0: number;
  y1: number;
  sx0: number;
  sz0: number;
  sx1: number;
  sz1: number;
  abre0: number;
  joelhoLivre: number;
  punho: V3;
  xParede: number;
}

const pernaDeApoio = (corpo: Corpo): PosePerna => ({
  pe: { bola: [corpo.m('quadril.meiaDistancia') + f('pe.apoio.paraFora'), 0, corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo')], dir: norm([0.12, 0, 1]) },
  polo: norm([0.1, 0, 1]),
});

/** A perna direita, livre: aberta `abre` graus na bacia, girada `giro` graus para fora, o joelho dobrado `joelho` graus. */
function pernaLivre(t: Tronco, abre: number, giro: number, joelho: number): PosePerna {
  const a = abre * rad;
  const dir = dirRef(t.pelve, [-Math.sin(a), -Math.cos(a), 0]);
  // o joelho aponta para a frente da bacia; no giro para fora (perna direita), vira para −x
  const polo0 = norm(sub(t.pelve.z, mul(dir, dot(t.pelve.z, dir))));
  const polo = norm(girar(polo0, dir, giro));
  const k = joelho * rad;
  const canela = norm(sub(mul(dir, Math.cos(k)), mul(polo, Math.sin(k))));
  const pf = f('pe.livre.flexaoPlantar') * rad;
  const peDir = norm(add(mul(polo, Math.cos(pf)), mul(canela, Math.sin(pf))));
  return { coxa: dir, canela, polo, peDir };
}

/** O tronco do pedido: a bacia parada, ou inclinada (o lado direito sobe) em volta do quadril esquerdo. */
function tronco(corpo: Corpo, p: Pedido): Tronco {
  const reto = { pelve: [p.sx, p.y, p.sz] as V3, cervical: f('cervical'), cabeca: f('cabeca') };
  if (!p.bacia && !p.tronco) return resolverTronco(corpo, reto);
  const t0 = resolverTronco(corpo, reto);
  const hq = corpo.m('quadril.meiaDistancia');
  const quadrilL = add(t0.pelve.o, mul(t0.pelve.x, hq));
  const pose = { ...reto, lado: p.bacia, lombarLado: p.tronco * 0.5, toracicaLado: p.tronco * 0.5 };
  const x = resolverTronco(corpo, { ...pose, pelve: [0, 0, 0] }).pelve.x;
  return resolverTronco(corpo, { ...pose, pelve: sub(quadrilL, mul(x, hq)) });
}

const MAO_NA_PAREDE = (punho: V3): PoseBraco => ({ punho, polo: norm([0.2, -1, -0.4]), mao: { polegar: [0, 0, 1], dedos: [0, 1, 0], forma: 'aberta' } });

function montar(corpo: Corpo, p: Pedido, joelhoLivre: number, punho: V3): Esq {
  const t = tronco(corpo, p);
  return resolverMembros(t, { R: maosNaCintura(t, 'R', f('maos.naCintura.acima')), L: MAO_NA_PAREDE(punho) }, { R: pernaLivre(t, p.abre, p.giro, joelhoLivre), L: pernaDeApoio(corpo) });
}

/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, add(a, mul(ab, t)));
}

/** O meio do pé de apoio, no chão. */
const meioDoApoio = (e: Esq): V3 => mul(add(e.lado.L.calcanhar, e.lado.L.bola), 0.5);

function calibrar(corpo: Corpo): Base {
  return calibragem(corpo, 'abducao-elastico:base', () => {
    const m = (id: string) => corpo.m(id);
    const hq = m('quadril.meiaDistancia');
    const b: Base = { y0: m('altura.trocanter') - 1, y1: m('altura.trocanter') - 1, sx0: hq, sz0: 0, sx1: hq, sz1: 0, abre0: 3, joelhoLivre: 4, punho: [45, 140, 0], xParede: 50 };
    const ped = (abre: number, sx: number, sz: number, y: number): Pedido => ({ abre, giro: 0, bacia: 0, tronco: 0, sx, sz, y });
    /** A altura da bacia que deixa o joelho de apoio no ângulo da ficha. */
    const altura = (abre: number, sx: number, sz: number) => resolver1((y) => montar(corpo, ped(abre, sx, sz, y), b.joelhoLivre, b.punho).lado.L.ang.joelho - f('joelho.apoio'), m('altura.trocanter') - 12, m('altura.trocanter') + 4, 24);
    /** O centro da bacia que põe o centro de massa sobre o meio do pé de apoio (e a altura que vai com ele). */
    const sobre = (abre: number, sx0: number, sz0: number, y0: number) => {
      let sx = sx0,
        sz = sz0,
        y = y0;
      const cm = (x: number, z: number) => {
        const e = montar(corpo, ped(abre, x, z, y), b.joelhoLivre, b.punho);
        return sub(centroDeMassa(e, 'homem'), meioDoApoio(e));
      };
      for (let i = 0; i < 3; i++) {
        sx = resolver1((x) => cm(x, sz)[0], 0, 25, 24);
        sz = resolver1((z) => cm(sx, z)[2], -15, 15, 24);
        y = altura(abre, sx, sz);
      }
      return [sx, sz, y] as const;
    };
    /** Embaixo, do lado de dentro do pé de fora ao do pé de apoio (cm), pelas bordas das solas. */
    const folga = (abre: number) => {
      const e = montar(corpo, ped(abre, b.sx0, b.sz0, b.y0), b.joelhoLivre, b.punho);
      const meia = m('pe.largura') / 2;
      return Math.min(e.lado.L.bola[0], e.lado.L.calcanhar[0]) - meia - (Math.max(e.lado.R.bola[0], e.lado.R.calcanhar[0]) + meia);
    };
    /** O ponto mais baixo do pé de fora, com o joelho dele dobrado `j` graus. */
    const baixo = (j: number) => {
      const e = montar(corpo, ped(b.abre0, b.sx0, b.sz0, b.y0), j, b.punho);
      // de que pé é cada ponto: do eixo (calcanhar à ponta) mais perto
      const doPe = (p: V3, k: 'R' | 'L') => aoSegmento(p, e.lado[k].calcanhar, e.lado[k].ponta);
      return Math.min(...pontosDoBoneco(e).filter((x) => x.parte === 'pe' && doPe(x.p, 'R') < doPe(x.p, 'L')).map((x) => x.p[1]));
    };
    for (let it = 0; it < 4; it++) {
      // a mão na parede: o punho acima e à frente do ombro, à distância que deixa o cotovelo no ângulo da ficha
      const o = montar(corpo, ped(b.abre0, b.sx0, b.sz0, b.y0), b.joelhoLivre, b.punho).lado.L.ombro;
      const a = m('braco.comp'),
        c = m('antebraco.comp'),
        k = f('parede.cotovelo') * rad;
      const r = Math.sqrt(a * a + c * c + 2 * a * c * Math.cos(k));
      const dy = f('parede.mao.acimaDoOmbro'),
        dz = f('parede.mao.aFrente');
      b.punho = [o[0] + Math.sqrt(Math.max(1, r * r - dy * dy - dz * dz)), o[1] + dy, o[2] + dz];
      b.xParede = b.punho[0] + m('raio.punho') * 0.85;
      [b.sx0, b.sz0, b.y0] = sobre(b.abre0, b.sx0, b.sz0, b.y0);
      [b.sx1, b.sz1, b.y1] = sobre(f('abducao.topo'), b.sx1, b.sz1, b.y1);
      b.abre0 = resolver1((x) => folga(x) - f('pes.folga'), -10, 20, 24);
      b.joelhoLivre = baixo(0) >= f('pe.livre.acimaDoChao') ? 0 : resolver1((j) => baixo(j) - f('pe.livre.acimaDoChao'), 0, 30, 24);
    }
    return b;
  });
}

function pedido(corpo: Corpo, u: number, erro?: string): Pedido {
  const b = calibrar(corpo);
  // o corpo anda para cima do pé de apoio junto com a perna que abre (calibrado embaixo e em cima)
  return {
    abre: mix(b.abre0, f('abducao.topo'), u),
    giro: erro === 'gira' ? f('erro.gira.giro') * u : 0,
    bacia: erro === 'inclina' ? f('erro.inclina.bacia') * u : 0,
    tronco: erro === 'inclina' ? (f('erro.inclina.tronco') - f('erro.inclina.bacia')) * u : 0,
    sx: mix(b.sx0, b.sx1, u),
    sz: mix(b.sz0, b.sz1, u),
    y: mix(b.y0, b.y1, u),
  };
}

/** O elástico: o trecho que estica (do pé de apoio à volta na perna de fora) e o resto do laço (sob a sola e no chão). */
function elastico(corpo: Corpo, e: Esq) {
  const d = f('elastico.entreOsTrechos') / 2;
  const a = bordasDaSolaEm(corpo, e, 'L', MEIO_DA_SOLA, d, ESP / 2),
    b = bordasDaSolaEm(corpo, e, 'L', MEIO_DA_SOLA, -d, ESP / 2);
  // a volta na perna de fora, logo acima do tornozelo: um círculo em volta da canela, assentado na pele
  const R = e.lado.R;
  const eixo = norm(sub(R.joelho, R.tornozelo));
  const C = add(R.tornozelo, mul(eixo, f('elastico.noTornozelo')));
  let pele = 0;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'canela' && parte !== 'pe') continue;
    const v = sub(p, C);
    const ao = dot(v, eixo);
    if (Math.abs(ao) > 1.5) continue;
    const r = dist(v, mul(eixo, ao));
    if (r < 9) pele = Math.max(pele, r);
  }
  const raio = pele + f('elastico.folga') + ESP / 2;
  const plano = (p: V3) => {
    const v = sub(p, C);
    return sub(v, mul(eixo, dot(v, eixo)));
  };
  const meio = mul(add(a.dentro, b.dentro), 0.5);
  const e1 = norm(plano(meio));
  let e2 = cross(eixo, e1);
  if (e2[2] < 0) e2 = mul(e2, -1);
  const angulo = (p: V3) => Math.atan2(dot(plano(p), e2), dot(plano(p), e1));
  const tangente = (p: V3) => Math.acos(Math.min(1, raio / Math.max(raio, Math.hypot(...plano(p)))));
  // da camada da frente (a), a volta passa pela frente, por fora e por trás da perna, e desce à camada de trás (b)
  const de = angulo(a.dentro) + tangente(a.dentro),
    ate = angulo(b.dentro) - tangente(b.dentro) + 2 * Math.PI;
  const volta: V3[] = [];
  const n = 24;
  for (let i = 0; i <= n; i++) {
    const g = mix(de, ate, i / n);
    volta.push(add(C, add(mul(e1, raio * Math.cos(g)), mul(e2, raio * Math.sin(g)))));
  }
  const estica = [a.dentro, ...volta, b.dentro];
  // o resto do laço: sob a sola, de dentro para fora, e deitado no chão, para fora e para a frente, sem esticar
  const comp = comprimento(estica);
  const sob = dist(a.dentro, a.fora) + dist(b.dentro, b.fora);
  const sobra = Math.max(4, (obj('elasticoLongo', 'comp') - obj('elasticoLongoPisado', 'comp') - sob) / 2);
  const g = f('elastico.sobra.direcao') * rad;
  const vai: V3 = [Math.cos(g), 0, Math.sin(g)];
  const solto: V3[] = [b.dentro, b.fora, add(b.fora, mul(vai, sobra)), add(a.fora, mul(vai, sobra)), a.fora, a.dentro];
  return { estica, comp, solto, a, b, C, raio, pele };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const b = calibrar(corpo);
  const e = montar(corpo, pedido(corpo, u, erro), b.joelhoLivre, b.punho);
  const l = elastico(corpo, e);
  const estica = l.comp / obj('elasticoLongoPisado', 'comp');
  const fx = faixaElastica(l.estica, estica, 'faixa'),
    fs = faixaElastica(l.solto, 1, 'faixaSolta');
  return {
    esq: e,
    prims: [chao(-70, 90, -60, 110), ...fx.prims, ...fs.prims],
    pecas: [paredeAoLado(b.xParede, 1, e.lado.L.ombro[2]), fx.peca, fs.peca],
    fios: [{ id: 'elastico', comp: l.comp, estica: true, objeto: 'elasticoLongoPisado' }],
    cargas: [],
    marcas: {
      solaLdentro: l.a.dentro,
      solaLfora: l.a.fora,
      solaLdentro2: l.b.dentro,
      solaLfora2: l.b.fora,
      laco: l.C,
      lacoRaio: [l.raio, l.pele, 0],
      parede: [b.xParede, 0, 0],
      maoNaParede: e.lado.L.punho,
    },
  };
}

export const abducaoElastico: Exercicio = {
  ficha: F,
  // de frente se vê a perna abrindo para o lado, o tronco reto e os dedos para a frente; de trás, o glúteo que trabalha
  vistas: ['frontal', 'posterior'],
  quadro,
  // glúteos (médio, mínimo e a parte de cima do máximo) do lado que abre: o desenho tem um glúteo só
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};
