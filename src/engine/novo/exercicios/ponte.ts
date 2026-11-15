// As pontes de glúteo (com o peso do corpo, com halter e com kettlebell no quadril): o que elas têm em comum.
//
// Deitado de costas, joelhos dobrados, pés no chão na largura do quadril; o quadril sobe até ombros, quadril e
// joelhos ficarem em linha. A parte de cima das costas e a cabeça ficam no chão e os ombros não saem do lugar: é o
// tronco de costas do núcleo das flexões de joelho deitado (./flexao-joelho.ts, `troncoDeCostas`). Aqui os pés ficam
// presos no chão (a bola e a ponta do pé não saem do lugar) e as pernas se resolvem até eles.
//
// A cada quadro: (1) a bacia inclina o que a ficha pede, do quadril quase no chão (embaixo) ao corpo em linha (em
// cima); (2) o corpo desce até as costas e a cabeça encostarem no chão; (3) as pernas vão aos pés. Com carga, (4) a
// carga desce, na vertical, sobre a dobra do quadril até encostar no corpo (nem atravessa a barriga e a coxa, nem
// fica no ar), e (5) as mãos vão até ela.
//
// O pé fica onde, no topo, a canela fica em pé (a animação aprovada de hoje: "canela na vertical"); a conferência
// mede, embaixo, a distância do calcanhar ao glúteo ("cerca de um palmo", na ficha).
import { pontosDoBoneco } from '../boneco';
import { formaDoKettlebell } from '../equipamento';
import { resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, angulo, mix, mul, noRef, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { bracosNoChao, folgaDaPelve, troncoDeCostas } from './flexao-joelho';

export type CargaDaPonte = 'nenhuma' | 'halter' | 'kettlebell';

/* ============================== medidas que as regras também usam ============================== */
const lado = (v: V3): V3 => [0, v[1], v[2]];
/** De lado, o ângulo no quadril entre o ombro e o joelho (180 = em linha). */
export const linhaOmbroQuadrilJoelho = (e: Esq) => angulo(lado(sub(e.lado.R.ombro, e.lado.R.quadril)), lado(sub(e.lado.R.joelho, e.lado.R.quadril)));
/**
 * Quanto falta para ombro, quadril e joelho ficarem em linha (graus): positivo com o quadril abaixo da linha do ombro
 * ao joelho, negativo com ele acima (o quadril passou da linha).
 */
export function faltaParaALinha(e: Esq): number {
  const R = e.lado.R;
  const t = (R.quadril[2] - R.ombro[2]) / (R.joelho[2] - R.ombro[2]);
  const yLinha = R.ombro[1] + t * (R.joelho[1] - R.ombro[1]);
  const d = 180 - linhaOmbroQuadrilJoelho(e);
  return R.quadril[1] < yLinha ? d : -d;
}
/** De lado, quanto a canela se afasta da vertical (graus). */
export const canelaDaVertical = (e: Esq) => angulo(lado(sub(e.lado.R.joelho, e.lado.R.tornozelo)), [0, 1, 0]);

/** As partes do corpo em que a carga pode encostar (os braços e as mãos ficam de fora: são eles que seguram). */
const ENCOSTA = new Set(['tronco', 'cintura', 'pelve', 'coxa']);
export const pontosOndeACargaApoia = (e: Esq): V3[] => pontosDoBoneco(e).filter((x) => ENCOSTA.has(x.parte)).map((x) => x.p);

/**
 * O halter de través (o cabo ao longo de x), com o centro em (0, ?, z): a menor altura do centro em que nenhum ponto do
 * corpo fica dentro dele. As cabeças sextavadas ficam com uma quina para cima e outra para baixo (como `halter` em
 * ../pecas.ts): de lado, uma elipse com a meia largura entre quinas na vertical e a meia altura entre faces ao longo
 * do corpo.
 */
export function alturaDoHalter(pts: V3[], z: number, x = 0): number {
  const meia = obj('halter', 'comp') / 2,
    meioCabo = obj('halter', 'caboComp') / 2,
    rc = obj('halter', 'caboDiam') / 2,
    ra = obj('halter', 'cabecaLargura') / 2,
    rb = obj('halter', 'cabecaAltura') / 2;
  let y = -1e9;
  for (const p of pts) {
    const dx = Math.abs(p[0] - x);
    if (dx > meia) continue;
    const dz = Math.abs(p[2] - z);
    const [a, b] = dx <= meioCabo ? [rc, rc] : [ra, rb];
    if (dz >= b) continue;
    y = Math.max(y, p[1] + a * Math.sqrt(1 - (dz / b) ** 2));
  }
  return y;
}
/** Quanto o corpo entra no halter (positivo) ou quanto falta para encostar (negativo), em cm, com o centro em c. */
export function folgaDoHalter(pts: V3[], c: V3): number {
  return c[1] - alturaDoHalter(pts, c[2], c[0]);
}

/** Pontos da alça (o eixo do ferro), em relação ao centro da bola. */
function alcaDoKettlebell(cima: V3, l: V3): V3[] {
  const K = formaDoKettlebell();
  const alto = K.altura - K.rAlca - K.centro;
  const pe = Math.sqrt(Math.max(0, K.R * K.R - K.meiaAlca * K.meiaAlca)) - 1;
  const out: V3[] = [];
  for (const s of [-1, 1]) for (let i = 0; i <= 4; i++) out.push(add(mul(cima, mix(pe, alto, i / 4)), mul(l, s * K.meiaAlca)));
  for (let i = 1; i < 6; i++) out.push(add(mul(cima, alto), mul(l, mix(-K.meiaAlca, K.meiaAlca, i / 6))));
  return out;
}
/** A menor altura do centro da bola, em (0, ?, z), em que nem a bola nem a alça entram no corpo. */
export function alturaDoKettlebell(pts: V3[], z: number, cima: V3, l: V3): number {
  const K = formaDoKettlebell();
  const alca = alcaDoKettlebell(cima, l);
  let y = -1e9;
  for (const p of pts) {
    const h = Math.hypot(p[0], p[2] - z);
    if (h < K.R) y = Math.max(y, p[1] + Math.sqrt(K.R * K.R - h * h));
    for (const a of alca) {
      const ha = Math.hypot(p[0] - a[0], p[2] - z - a[2]);
      if (ha < K.rAlca) y = Math.max(y, p[1] + Math.sqrt(K.rAlca * K.rAlca - ha * ha) - a[1]);
    }
  }
  return y;
}

/* ============================== a pose ============================== */
export interface OpcoesDaPonteNoChao {
  /** Inclinação da bacia (graus, como em resolverTronco: −90 = deitado reto). */
  frente: number;
  /** Flexão da lombar além da curva de repouso (negativo = arqueia). */
  lombar?: number;
  /** Onde fica o centro do ombro direito em z (os ombros não saem do lugar). */
  zOmbro: number;
  /** A bola do pé no chão: em z e a meia distância entre os pés. */
  zBola: number;
  pesMeiaDistancia: number;
  /** Quanto o calcanhar sobe do chão (graus; 0 = o pé inteiro no chão). */
  calcanhar?: number;
  /** Os braços: recebem o tronco já posto e o esqueleto com os braços no chão (para achar a carga). */
  bracos?: (t: Tronco, e: Esq) => Record<Lado, PoseBraco>;
  /** Os braços no chão: a mão a tantos cm do ombro na direção dos pés e tantos cm para fora dele. */
  maoAbaixoDoOmbro: number;
  maoParaFora: number;
}
export function ponteDePesNoChao(corpo: Corpo, o: OpcoesDaPonteNoChao): Esq {
  const { t } = troncoDeCostas(corpo, o.frente, o.lombar ?? 0, o.zOmbro);
  // os pés paralelos, com os dedos para longe da cabeça; os joelhos apontam para cima
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * o.pesMeiaDistancia, 0, o.zBola], dir: [0, 0, 1], calc: o.calcanhar ?? 0 }, polo: [0, 1, 0.15] });
  const pernas = { R: perna('R'), L: perna('L') };
  const e = resolverMembros(t, bracosNoChao(corpo, o.zOmbro, o.maoAbaixoDoOmbro, o.maoParaFora), pernas);
  return o.bracos ? resolverMembros(t, o.bracos(t, e), pernas) : e;
}

/* ============================== a animação ============================== */
export function criarPonte(fichaJson: unknown, carga: CargaDaPonte): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const tem = (id: string) => id in F.param;
  /** Os ids dos erros na ficha (o halter usa os do app: e1, e2...): o erro de cada tipo, pelo título. */
  const erroDo = (titulo: RegExp) => F.erros.find((x) => titulo.test(x.titulo))?.id;
  const ERRO = { lombar: erroDo(/lombar/i), calcanhar: erroDo(/ponta dos pés/i), raso: erroDo(/subir pouco/i), rola: erroDo(/rolando/i) };
  const CACHE = new WeakMap<Corpo, { ini: number; fim: number; zBola: number; dobra: V3 }>();

  const pose = (corpo: Corpo, zBola: number, frente: number, o: { lombar?: number; calcanhar?: number; bracos?: OpcoesDaPonteNoChao['bracos'] } = {}) =>
    ponteDePesNoChao(corpo, {
      frente,
      lombar: o.lombar ?? 0,
      zOmbro: f('ombro.z'),
      zBola,
      pesMeiaDistancia: corpo.m('quadril.meiaDistancia'),
      calcanhar: o.calcanhar ?? 0,
      bracos: o.bracos,
      maoAbaixoDoOmbro: f('maos.alcance') * (corpo.m('braco.comp') + corpo.m('antebraco.comp')),
      maoParaFora: f('maos.paraFora'),
    });
  /**
   * Embaixo, a bacia inclina até o glúteo ficar à folga da ficha do chão. Em cima, até ombro, quadril e joelho ficarem
   * em linha; o pé fica onde, nessa linha, a canela fica na vertical.
   */
  function calibrar(corpo: Corpo) {
    let c = CACHE.get(corpo);
    if (c) return c;
    const ini = resolver1((fr) => folgaDaPelve(corpo, fr, 0) - f('quadril.folgaEmbaixo'), -86, -110, 30);
    const fimPara = (zBola: number) => resolver1((fr) => faltaParaALinha(pose(corpo, zBola, fr)) - f('quadril.topo'), -95, -140, 26);
    const canela = (zBola: number) => {
      const e = pose(corpo, zBola, fimPara(zBola));
      // positivo quando o joelho fica à frente do tornozelo (para o lado da cabeça)
      return Math.sign(e.lado.R.tornozelo[2] - e.lado.R.joelho[2]) * canelaDaVertical(e) - f('canela.topo');
    };
    const zBola = resolver1(canela, 30, 60, 24);
    // a dobra do quadril: embaixo, a carga assenta onde fica mais baixa, entre a barriga e as coxas (procurada de 20 cm
    // para o lado da cabeça a 6 cm para o lado dos pés do meio dos quadris); daí em diante ela anda presa à bacia
    const e0 = pose(corpo, zBola, ini);
    const zQ = (e0.lado.R.quadril[2] + e0.lado.L.quadril[2]) / 2;
    const pts = pontosOndeACargaApoia(e0);
    let melhor: V3 = [0, 1e9, zQ];
    if (carga !== 'nenhuma')
      for (let z = zQ - 20; z <= zQ + 6; z += 0.5) {
        const y = carga === 'halter' ? alturaDoHalter(pts, z) : alturaDoKettlebell(pts, z, cimaDoKettlebell(e0, z), [1, 0, 0]);
        if (y < melhor[1]) melhor = [0, y, z];
      }
    c = { ini, fim: fimPara(zBola), zBola, dobra: paraRef(e0.pelve, add(melhor, [0, 0, carga === 'nenhuma' ? 0 : f('carga.aFrenteDoQuadril')])) };
    CACHE.set(corpo, c);
    return c;
  }

  /** O kettlebell deitado de lado: a base para os pés, a alça para a cabeça, ao longo da linha do quadril ao ombro (de lado). */
  function cimaDoKettlebell(e0: Esq, z: number): V3 {
    const meioOmbro: V3 = [0, (e0.lado.R.ombro[1] + e0.lado.L.ombro[1]) / 2, (e0.lado.R.ombro[2] + e0.lado.L.ombro[2]) / 2];
    const meioQuadril: V3 = [0, (e0.lado.R.quadril[1] + e0.lado.L.quadril[1]) / 2, z];
    return norm(sub(meioOmbro, meioQuadril));
  }
  /** Onde a carga fica (na dobra do quadril, presa à bacia em z, e descida na vertical até encostar) e as mãos nela. */
  function comCarga(e0: Esq, dobra: V3, rola: number) {
    const zDobra = noRef(e0.pelve, dobra)[2];
    const pts = pontosOndeACargaApoia(e0);
    if (carga === 'halter') {
      const comp = obj('halter', 'comp');
      // no erro do halter rolando, ele escorrega para o lado direito e assenta de novo no corpo, fora do meio
      const x = -f('erro.rola.lado') * rola;
      const centro: V3 = [x, alturaDoHalter(pts, zDobra, x), zDobra];
      // cada mão segura a ponta de fora de uma cabeça ("as mãos seguram as anilhas pelos lados", como hoje): a pegada fica na
      // aresta de cima da face de fora, com os dedos por cima da cabeça e a palma na face de fora
      const naCabeca = (k: Lado): V3 => add(centro, [sinal(k) * (comp / 2), f('maos.naCabeca.acima'), 0]);
      return { centro, naCabeca, base: centro, cima: [0, 1, 0] as V3 };
    }
    const K = formaDoKettlebell();
    const cima = cimaDoKettlebell(e0, zDobra);
    const l: V3 = [1, 0, 0];
    const centro: V3 = [0, alturaDoKettlebell(pts, zDobra, cima, l), zDobra];
    const base = add(centro, mul(cima, -K.centro));
    const alturaDaPegada = (K.topoDaBola + K.altura - K.rAlca) / 2;
    const naCabeca = (k: Lado): V3 => add(add(base, mul(cima, alturaDaPegada)), mul(l, sinal(k) * K.meiaAlca));
    return { centro, naCabeca, base, cima };
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const c = calibrar(corpo);
    const v = erro && erro === ERRO.raso ? u * f('erro.raso.fracao') : u;
    const lombar = erro && erro === ERRO.lombar ? f('erro.lombar.lombar') * u : 0;
    const frente = mix(c.ini, c.fim, v) - lombar * (tem('erro.lombar.bacia') ? f('erro.lombar.bacia') : 0);
    const calcanhar = erro && erro === ERRO.calcanhar ? f('erro.calcanhar.calc') * u : 0;
    const rola = erro && erro === ERRO.rola ? u : 0;
    const e0 = pose(corpo, c.zBola, frente, { lombar, calcanhar });
    const q: Quadro = { esq: e0, prims: [chao(-70, 70, -100, 90)], pecas: [], fios: [], cargas: [], marcas: {} };
    if (carga === 'nenhuma') return q;
    const C = comCarga(e0, c.dobra, rola);
    const polo = (k: Lado): V3 => [sinal(k) * f('maos.poloFora'), -1, -f('maos.poloCabeca')];
    const bracos = (): Record<Lado, PoseBraco> => {
      const braco = (k: Lado): PoseBraco => {
        // no erro do halter rolando, a mão esquerda solta e cai no chão ao lado do corpo
        if (k === 'L' && rola > 0) return bracosNoChao(corpo, f('ombro.z'), f('maos.alcance') * (corpo.m('braco.comp') + corpo.m('antebraco.comp')), f('maos.paraFora')).L;
        if (carga === 'halter') return { pegada: C.naCabeca(k), polo: polo(k), mao: { polegar: [0, 0, -1], forma: 'pegada', diam: f('maos.naCabeca.diam') } };
        return { pegada: C.naCabeca(k), polo: polo(k), mao: { polegar: C.cima, forma: 'pegada', diam: obj('kettlebell', 'alcaDiam') } };
      };
      return { R: braco('R'), L: braco('L') };
    };
    const e = pose(corpo, c.zBola, frente, { lombar, calcanhar, bracos });
    q.esq = e;
    if (carga === 'halter') {
      const eixo: V3 = [1, 0, 0];
      q.prims.push(...halter(C.centro, eixo, 0.4));
      q.pecas = [{ t: 'halter', centro: C.centro, eixo } as Peca];
      q.cargas.push({ massa: obj('halter', 'massa'), pos: C.centro });
      q.marcas = { halter: C.centro, pegaR: C.naCabeca('R'), pegaL: C.naCabeca('L') };
      q.vies = { maoR: 1, maoL: 1 };
    } else {
      const K = formaDoKettlebell();
      q.prims.push({ t: 'esfera', c: C.centro, r: K.R, cls: 'ferro' });
      q.pecas = [{ t: 'kettlebell', base: C.base, cima: C.cima, lado: [1, 0, 0] }];
      q.cargas.push({ massa: obj('kettlebell', 'massa'), pos: C.centro });
      const meio = mul(add(C.naCabeca('R'), C.naCabeca('L')), 0.5);
      q.marcas = { kettlebell: meio, bola: C.centro, cima: C.cima, pegaR: C.naCabeca('R'), pegaL: C.naCabeca('L') };
    }
    return q;
  }
  return { ficha: F, quadro };
}
