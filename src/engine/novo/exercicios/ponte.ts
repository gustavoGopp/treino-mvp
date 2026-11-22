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
import { calibragem } from '../calibragens';
import { formaDoBoneco, pontosDoBoneco } from '../boneco';
import type { Anel } from '../corpo3d';
import { formaDoKettlebell } from '../equipamento';
import { resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, angulo, comb, dist, lerp, mix, mul, noRef, norm, paraRef, sub } from '../vec';
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
/**
 * `densa` (acréscimo de 19/11/2026, desligado por padrão): a superfície inteira, e não só os 12 pontos de cada anel do
 * Boneco: conta também a emenda da cintura (o volume que junta o tronco à bacia, ../boneco.ts) e põe pontos entre os
 * anéis (a cada ~1 cm) e em volta deles (36 por anel). Com os pontos de cada anel só, o halter da ponte assentava entre
 * eles e entrava 2,1 cm na emenda da cintura (3,3 cm no erro do halter rolando).
 */
export function pontosOndeACargaApoia(e: Esq, densa = false): V3[] {
  if (!densa) return pontosDoBoneco(e).filter((x) => ENCOSTA.has(x.parte)).map((x) => x.p);
  const out: V3[] = [];
  const naElipse = (a: Anel, th: number): V3 => comb([1, a.c], [a.a * Math.cos(th), a.x], [(Math.sin(th) >= 0 ? a.f : a.b) * Math.sin(th), a.z]);
  const anelEm = (a0: Anel, a1: Anel, w: number): Anel => ({ c: lerp(a0.c, a1.c, w), x: norm(lerp(a0.x, a1.x, w)), z: norm(lerp(a0.z, a1.z, w)), a: mix(a0.a, a1.a, w), f: mix(a0.f, a1.f, w), b: mix(a0.b, a1.b, w) });
  for (const g of formaDoBoneco(e).grupos)
    for (const v of g.volumes) {
      const nome = v.nome ?? g.id;
      if (!ENCOSTA.has(nome) && nome !== 'emendaDaCintura') continue;
      const A = v.vol.aneis;
      for (let i = 0; i + 1 < A.length; i++) {
        const n = Math.max(1, Math.ceil(dist(A[i]!.c, A[i + 1]!.c)));
        for (let k = 0; k < n || (i + 2 === A.length && k === n); k++) {
          const a = anelEm(A[i]!, A[i + 1]!, k / n);
          for (let j = 0; j < 36; j++) out.push(naElipse(a, (j * Math.PI) / 18));
        }
      }
    }
  return out;
}
/** Opções das pontes (acréscimos, desligados por padrão). */
export interface OpcoesDaPonte {
  /** A carga assenta sobre a superfície inteira do corpo, emenda da cintura inclusive (ver `pontosOndeACargaApoia`). Sem o campo, nada muda. */
  superficieDensa?: boolean;
}

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
  // de meio em meio centímetro: a superfície do Boneco tem os pontos espaçados, e a alça é fina
  const n = Math.ceil((alto - pe) / 0.5),
    nb = Math.ceil((2 * K.meiaAlca) / 0.5);
  for (const s of [-1, 1]) for (let i = 0; i <= n; i++) out.push(add(mul(cima, mix(pe, alto, i / n)), mul(l, s * K.meiaAlca)));
  for (let i = 1; i < nb; i++) out.push(add(mul(cima, alto), mul(l, mix(-K.meiaAlca, K.meiaAlca, i / nb))));
  return out;
}
/** A menor altura do centro da bola, em (0, ?, z), em que nem a bola nem a alça entram no corpo. */
export function alturaDoKettlebell(pts: V3[], z: number, cima: V3, l: V3, so?: 'bola' | 'alca'): number {
  const K = formaDoKettlebell();
  const alca = alcaDoKettlebell(cima, l);
  let y = -1e9;
  for (const p of pts) {
    const h = Math.hypot(p[0], p[2] - z);
    if (so !== 'alca' && h < K.R) y = Math.max(y, p[1] + Math.sqrt(K.R * K.R - h * h));
    if (so !== 'bola')
      for (const a of alca) {
        // a alça ocupa, vista de cima, o raio dela mais 1 cm (os pontos da superfície ficam a uns 2 cm uns dos outros)
        const r = K.rAlca + 1;
        const ha = Math.hypot(p[0] - a[0], p[2] - z - a[2]);
        if (ha < r) y = Math.max(y, p[1] + Math.sqrt(r * r - ha * ha) - a[1]);
      }
  }
  return y;
}
/** A direção da base à alça, deitado de lado com a alça para a cabeça, inclinada `graus` abaixo da horizontal. */
export const cimaInclinado = (graus: number): V3 => [0, -Math.sin((graus * Math.PI) / 180), -Math.cos((graus * Math.PI) / 180)];
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
export function criarPonte(fichaJson: unknown, carga: CargaDaPonte, opcoes: OpcoesDaPonte = {}): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const tem = (id: string) => id in F.param;
  /** Os ids dos erros na ficha (o halter usa os do app: e1, e2...): o erro de cada tipo, pelo título. */
  const erroDo = (titulo: RegExp) => F.erros.find((x) => titulo.test(x.titulo))?.id;
  const ERRO = { lombar: erroDo(/lombar/i), calcanhar: erroDo(/ponta dos pés/i), raso: erroDo(/subir pouco/i), rola: erroDo(/rolando/i) };
  const CACHE = new WeakMap<Corpo, { ini: number; fim: number; zBola: number; dobra: V3; kb: { c: V3; t: V3 }; fora: number }>();

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
    // a conta demorada vem guardada para o corpo do app: ../calibragens.ts
    c = calibragem(corpo, `${F.id}:calibrar`, () => {
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
      const pts = pontosOndeACargaApoia(e0, opcoes.superficieDensa);
      let melhor: V3 = [0, 1e9, zQ];
      if (carga !== 'nenhuma')
        for (let z = zQ - 20; z <= zQ + 6; z += 0.5) {
          const y = carga === 'halter' ? alturaDoHalter(pts, z) : alturaDoKettlebell(pts, z, [0, 0, -1], [1, 0, 0], 'bola');
          if (y < melhor[1]) melhor = [0, y, z];
        }
      const fim = fimPara(zBola);
      const dobra = paraRef(e0.pelve, add(melhor, [0, 0, carga === 'nenhuma' ? 0 : f('carga.aFrenteDoQuadril')]));
      // o kettlebell: embaixo, a bola assenta na dobra, deitado de lado com a alça para a cabeça, inclinada o que a ficha
      // pede (sem a alça entrar na barriga); daí em diante as mãos o seguram preso à bacia (sobe e gira com ela). Achado
      // quadro a quadro, ele tremeria com os pontos da superfície, e as mãos tremeriam junto.
      let kb = { c: [0, 0, 0] as V3, t: [0, 0, 0] as V3 };
      if (carga === 'kettlebell') {
        const zD = noRef(e0.pelve, dobra)[2];
        const cima0 = cimaInclinado(f('kettlebell.tomba'));
        const c0: V3 = [0, alturaDoKettlebell(pts, zD, cima0, [1, 0, 0]), zD];
        kb = { c: paraRef(e0.pelve, c0), t: paraRef(e0.pelve, add(c0, cima0)) };
      }
      // para onde o cotovelo aponta (para fora): da ficha ou, sem ela, o que deixa o braço deitado no chão embaixo, sem
      // atravessá-lo (o ponto mais baixo do braço e do antebraço a 0,3 cm do chão)
      let fora = tem('maos.poloFora') ? f('maos.poloFora') : 0;
      if (carga !== 'nenhuma' && !tem('maos.poloFora')) {
        const C0 = comCarga(e0, dobra, 0, kb);
        const braco = (x: number) => {
          const e = pose(corpo, zBola, ini, { bracos: () => bracosNaCarga(C0, x) });
          return Math.min(...pontosDoBoneco(e).filter((p) => p.parte === 'braco' || p.parte === 'ante').map((p) => p.p[1]));
        };
        fora = resolver1((x) => braco(x) - f('maos.cotoveloNoChao'), 0.1, 4, 24);
      }
      return { ini, fim, zBola, dobra, kb, fora };
    });
    CACHE.set(corpo, c);
    return c;
  }

  /** Onde a carga fica (na dobra do quadril, presa à bacia em z, e descida na vertical até encostar) e as mãos nela. */
  function comCarga(e0: Esq, dobra: V3, rola: number, kb: { c: V3; t: V3 }, comErro = false) {
    const zDobra = noRef(e0.pelve, dobra)[2];
    const pts = pontosOndeACargaApoia(e0, opcoes.superficieDensa);
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
    const l: V3 = [1, 0, 0];
    const preso = noRef(e0.pelve, kb.c);
    const cima = norm(sub(noRef(e0.pelve, kb.t), preso));
    // preso à bacia; num erro (a lombar dobra e a barriga sobe), se o corpo subir debaixo dele, ele sobe junto
    const centro: V3 = [0, comErro ? Math.max(preso[1], alturaDoKettlebell(pts, preso[2], cima, l)) : preso[1], preso[2]];
    const base = add(centro, mul(cima, -K.centro));
    const alturaDaPegada = (K.topoDaBola + K.altura - K.rAlca) / 2;
    const naCabeca = (k: Lado): V3 => add(add(base, mul(cima, alturaDaPegada)), mul(l, sinal(k) * K.meiaAlca));
    return { centro, naCabeca, base, cima };
  }

  /** As mãos na carga, com o cotovelo apontando para fora (`fora`), para baixo e um pouco para o lado da cabeça. */
  function bracosNaCarga(C: ReturnType<typeof comCarga>, fora: number): Record<Lado, PoseBraco> {
    const braco = (k: Lado): PoseBraco => {
      const polo: V3 = [sinal(k) * fora, -1, -f('maos.poloCabeca')];
      if (carga === 'halter') return { pegada: C.naCabeca(k), polo, mao: { polegar: [0, 0, -1], forma: 'pegada', diam: f('maos.naCabeca.diam') } };
      return { pegada: C.naCabeca(k), polo, mao: { polegar: C.cima, forma: 'pegada', diam: obj('kettlebell', 'alcaDiam') } };
    };
    return { R: braco('R'), L: braco('L') };
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
    const C = comCarga(e0, c.dobra, rola, c.kb, !!erro);
    const bracos = (): Record<Lado, PoseBraco> => {
      const B = bracosNaCarga(C, c.fora);
      // no erro do halter rolando, a mão esquerda solta e cai no chão ao lado do corpo
      if (rola > 0) B.L = bracosNoChao(corpo, f('ombro.z'), f('maos.alcance') * (corpo.m('braco.comp') + corpo.m('antebraco.comp')), f('maos.paraFora')).L;
      return B;
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
