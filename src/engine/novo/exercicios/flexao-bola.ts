// Flexão de joelho na bola suíça, no motor novo. Os números vêm da ficha (../dados/movimentos/flexao-bola.json).
// Deitado de costas, braços no chão abertos ~30° do corpo, calcanhares em cima da bola. Ombros, quadril e calcanhares
// em linha no começo; os calcanhares puxam a bola em direção ao glúteo, o quadril sobe mais, e no fim os joelhos
// dobram ~90° com os pés em cima da bola, e ombros, quadril e joelhos em linha.
// Como o corpo é montado: a parte de cima das costas fica no chão, no mesmo lugar; o tronco gira sobre ela e a coxa
// segue a linha do ombro ao quadril (o quadril não dobra). Para cada flexão do joelho, a inclinação do tronco é a que
// põe o ponto de apoio do pé (o calcanhar no começo, o meio da sola no fim) no alto da bola; a bola fica debaixo desse
// ponto e rola junto. As mãos ficam paradas no chão; o pescoço dobra o bastante para a cabeça só encostar no chão.
import ficha from '../dados/movimentos/flexao-bola.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { add, dist, dot, lerp, mul, noRef, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { bolaSuica, formaDaBola } from '../pecas-de-cena/bola-suica';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const LADOS: Lado[] = ['R', 'L'];

interface Molde {
  /** Pontos da parte de cima das costas, no referencial do tórax; e da cabeça, no da cabeça. */
  costas: V3[];
  cabeca: V3[];
  pelve: V3[];
  /** A superfície do pé direito, no referencial do pé. */
  pe: V3[];
  /** O meio dos ombros e o meio dos quadris, no referencial da pelve. */
  ombros: V3;
  quadris: V3;
  /** As mãos no chão (fixas) e a pelve no começo do movimento certo. */
  maos: Record<Lado, V3>;
  zOmbros: number;
}
const MOLDES = new WeakMap<Corpo, Molde>();
const CACHE = new WeakMap<Corpo, Map<string, number>>();

const bracosSoltos = (): Record<Lado, PoseBraco> => {
  const b = (k: Lado): PoseBraco => ({ umero: [sinal(k) * 0.5, 0, 0.86], antebraco: [sinal(k) * 0.5, 0, 0.86], polo: [0, -1, 0], mao: { polegar: [-sinal(k), 0, 0], forma: 'relaxada' } });
  return { R: b('R'), L: b('L') };
};

function molde(corpo: Corpo): Molde {
  let M = MOLDES.get(corpo);
  if (M) return M;
  const t = resolverTronco(corpo, { pelve: [0, 50, 0], frente: -110, lombar: 0, toracica: f('toracica.flexao'), cervical: 0, cabeca: 0 });
  const pernaReta: PosePerna = { coxa: [0, -0.4, 0.92], canela: [0, -0.4, 0.92], peDir: [0, 1, 0], polo: [0, 1, 0] };
  const e = resolverMembros(t, bracosSoltos(), { R: pernaReta, L: pernaReta });
  const P = pontosDoBoneco(e);
  const costas = P.filter((x) => x.parte === 'tronco').map((x) => paraRef(e.torax, x.p)).filter((l) => l[1] > -26);
  const cabeca = P.filter((x) => x.parte === 'cabeca').map((x) => paraRef(e.cabeca, x.p));
  const pelve = P.filter((x) => x.parte === 'pelve').map((x) => paraRef(e.pelve, x.p));
  const pe = P.filter((x) => x.parte === 'pe' && x.p[0] < 0).map((x) => paraRef(e.lado.R.pe, x.p));
  const meio = (a: V3, b: V3) => lerp(a, b, 0.5);
  M = { costas, cabeca, pelve, pe, ombros: paraRef(e.pelve, meio(e.lado.R.ombro, e.lado.L.ombro)), quadris: paraRef(e.pelve, meio(e.lado.R.quadril, e.lado.L.quadril)), maos: { R: [0, 0, 0], L: [0, 0, 0] }, zOmbros: 0 };
  MOLDES.set(corpo, M);
  return M;
}

interface Pedido {
  joelho: number;
  /** Flexão do quadril além da linha (erros), graus. */
  quadril: number;
  /** De 0 (calcanhar na bola) a 1 (meio da sola em cima da bola). */
  apoio: number;
}

/** O corpo, com a pelve na origem, para uma inclinação `fr` do tronco. Devolve o esqueleto e o ponto de apoio do pé. */
function montar(corpo: Corpo, fr: number, p: Pedido, pelve: V3, cerv: number, bracos?: Record<Lado, PoseBraco>) {
  const M = molde(corpo);
  const t = resolverTronco(corpo, { pelve, frente: fr, lombar: 0, toracica: f('toracica.flexao'), cervical: cerv, cabeca: cerv * f('cabeca.fracaoDoPescoco') });
  const ombros = noRef(t.pelve, M.ombros),
    quadris = noRef(t.pelve, M.quadris);
  // a coxa segue a linha do ombro ao quadril; nos erros, o quadril dobra (a coxa vai para a frente do corpo)
  const linha = norm(sub(quadris, ombros));
  const frenteDoCorpo = norm(sub(t.pelve.z, mul(linha, dot(t.pelve.z, linha))));
  const q = p.quadril * rad;
  const coxa = norm(add(mul(linha, Math.cos(q)), mul(frenteDoCorpo, Math.sin(q))));
  const n = norm(sub(t.pelve.z, mul(coxa, dot(t.pelve.z, coxa))));
  // o joelho dobra para trás do corpo; o pé sai do neutro (dedos para a frente do corpo) para deitado em cima da bola
  const k = p.joelho * rad;
  const canela = norm(add(mul(coxa, Math.cos(k)), mul(n, -Math.sin(k))));
  const nPe = norm(sub(n, mul(canela, dot(n, canela))));
  const peDir = norm(lerp(nPe, [0, 0, 1], p.apoio));
  // as duas pernas fazem o mesmo (a direção é a mesma; o quadril de cada lado põe cada uma no seu lugar)
  const perna: PosePerna = { coxa, canela, peDir, polo: n };
  const e = resolverMembros(t, bracos ?? bracosSoltos(), { R: perna, L: perna });
  const L = e.lado.R;
  const contato = lerp(L.calcanhar, lerp(L.calcanhar, L.bola, 0.5), p.apoio);
  return { e, contato };
}

/**
 * O menor valor de uma lista, sem quinas: o mínimo comum pula de um ponto da superfície para o vizinho conforme o corpo
 * gira, e a animação ganhava trancos. A média exponencial (com 0,4 cm de escala) acompanha o mínimo a menos de 1 cm e
 * muda sem saltos.
 */
function minSuave(v: number[]): number {
  const k = 0.4,
    m = Math.min(...v);
  let s = 0;
  for (const x of v) s += Math.exp(-(x - m) / k);
  return m - k * Math.log(s);
}
const baixoDe = (pts: V3[], ref: Esq['torax']) => minSuave(pts.map((l) => noRef(ref, l)[1]));
/**
 * Quanto o pé entra na bola (cm), com o corpo subido `sobe` cm: a bola fica debaixo do ponto de apoio do pé, e o
 * pé (a superfície do Boneco) afunda nela um pouco, como num pé que apoia numa bola cheia.
 */
function afunda(corpo: Corpo, e: Esq, contato: V3, sobe: number): number {
  const M = molde(corpo),
    B = formaDaBola();
  const c: V3 = [0, B.alturaDoCentro - sobe, contato[2]];
  return -minSuave(M.pe.map((l) => dist(noRef(e.lado.R.pe, l), c) - B.R));
}

/** A pose inteira: a inclinação que põe o pé no alto da bola, as costas no chão e a cabeça encostada. */
function pose(corpo: Corpo, p: Pedido, cervDe?: (fr: number) => number) {
  const M = molde(corpo);
  // com a pelve na origem: quanto o corpo sobe para as costas encostarem no chão, e onde o pé fica
  const medir = (fr: number) => {
    const r = montar(corpo, fr, p, [0, 0, 0], 0);
    const sobe = -baixoDe(M.costas, r.e.torax);
    return { ...r, sobe };
  };
  const fr = resolver1((x) => {
    const r = medir(x);
    return afunda(corpo, r.e, r.contato, r.sobe) - f('pe.afundaNaBola');
  }, -175, -95, 30);
  const r0 = medir(fr);
  const ombrosZ = noRef(r0.e.pelve, M.ombros)[2];
  const pelve: V3 = [0, r0.sobe, M.zOmbros - ombrosZ];
  // o pescoço dobra até a cabeça ficar a `cabeca.aoChao` cm do chão
  // (a altura da cabeça não cresce sempre com a flexão do pescoço: procura a primeira flexão, de 5 em 5°, em que a
  // cabeça sai do chão, e afina entre ela e a anterior)
  const folgaDaCabeca = (c: number) => baixoDe(M.cabeca, resolverTronco(corpo, { pelve, frente: fr, lombar: 0, toracica: f('toracica.flexao'), cervical: c, cabeca: c * f('cabeca.fracaoDoPescoco') }).cabeca) - f('cabeca.aoChao');
  // No ciclo, o pescoço segue a inclinação do tronco em linha reta entre o começo e o fim (o ponto mais baixo da cabeça
  // pula de um lugar para outro da superfície, e a busca quadro a quadro dava trancos).
  let cerv: number;
  if (cervDe) cerv = cervDe(fr);
  else {
    let ate = -30;
    while (ate < 100 && folgaDaCabeca(ate) < 0) ate += 5;
    cerv = ate === -30 ? -30 : resolver1(folgaDaCabeca, ate - 5, ate, 20);
  }
  const bracos = maosNoChao(corpo);
  const r = montar(corpo, fr, p, pelve, cerv, bracos);
  return { ...r, fr, cerv };
}

/** As mãos no chão, paradas: palmas para baixo, braços abertos ~30° do corpo. */
function maosNoChao(corpo: Corpo): Record<Lado, PoseBraco> {
  const M = molde(corpo);
  const a = f('bracos.abertura') * rad;
  const b = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // o cotovelo, quase estendido, aponta para fora, rente ao chão (não afunda nele nem sobe)
    return { punho: M.maos[k], polo: [s * Math.cos(a), 0, -Math.sin(a)], mao: { polegar: [-s, 0, 0], dedos: [s * Math.sin(a), 0, Math.cos(a)], forma: 'aberta' } };
  };
  return { R: b('R'), L: b('L') };
}

/** Na primeira vez: onde ficam os ombros e as mãos (pela posição de começo do movimento certo). */
function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const M = molde(corpo);
  // a pose do começo sem as mãos: o ombro de referência e, a partir dele, as mãos no chão a `bracos.alcance` do braço
  M.zOmbros = 0;
  const p0: Pedido = { joelho: f('joelho.inicio'), quadril: 0, apoio: 0 };
  const medirSemMaos = () => {
    const fr = resolver1((x) => {
      const r = montar(corpo, x, p0, [0, 0, 0], 0);
      return afunda(corpo, r.e, r.contato, -baixoDe(M.costas, r.e.torax)) - f('pe.afundaNaBola');
    }, -175, -95, 30);
    const r = montar(corpo, fr, p0, [0, 0, 0], 0);
    const sobe = -baixoDe(M.costas, r.e.torax);
    const ombrosZ = noRef(r.e.pelve, M.ombros)[2];
    return montar(corpo, fr, p0, [0, sobe, -ombrosZ], 0).e;
  };
  const e0 = medirSemMaos();
  const a = f('bracos.abertura') * rad;
  const alcance = (corpo.m('braco.comp') + corpo.m('antebraco.comp')) * f('bracos.alcance');
  for (const k of LADOS) {
    const O = e0.lado[k].ombro,
      s = sinal(k);
    const y = corpo.m('raio.punho') * 0.85;
    const horiz = Math.sqrt(Math.max(0, alcance * alcance - (O[1] - y) ** 2));
    M.maos[k] = [O[0] + s * horiz * Math.sin(a), y, O[2] + horiz * Math.cos(a)];
  }
  c = new Map();
  // o pescoço no começo e no fim do movimento certo, para o meio seguir em linha reta
  const ini = pose(corpo, p0),
    fim = pose(corpo, { joelho: f('joelho.fim'), quadril: 0, apoio: 1 });
  c.set('fr0', ini.fr).set('c0', ini.cerv).set('fr1', fim.fr).set('c1', fim.cerv);
  const liso = pescocoLiso(c);
  // o erro "quadril encosta na volta": quanto o quadril dobra para a pelve chegar a `erro.volta.folga` cm do chão
  const pelveNoChao = (qq: number) => {
    const r = pose(corpo, { joelho: f('joelho.inicio'), quadril: qq, apoio: 0 }, liso);
    return baixoDe(M.pelve, r.e.pelve) - f('erro.volta.folga');
  };
  c.set('volta', resolver1(pelveNoChao, 0, 80, 24));
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const fundo = erro === 'curta' ? f('erro.curta.fracao') : 1;
  const uu = u * fundo;
  let quadril = 0;
  if (erro === 'quadril') quadril = f('erro.quadril.flexao') * uu;
  if (erro === 'volta') quadril = c.get('volta')! * (1 - u) * (1 - u);
  const r = pose(corpo, { joelho: mix(f('joelho.inicio'), f('joelho.fim'), uu), quadril, apoio: uu }, pescocoLiso(c));
  // a bola fica debaixo do ponto de apoio do pé e rola: o giro é o caminho andado dividido pelo raio
  const B = formaDaBola();
  const z0 = calibrarBola(corpo);
  const zb = r.contato[2];
  const bola = bolaSuica(0, zb, (z0 - zb) / B.R);
  return {
    esq: r.e,
    prims: [chao(-80, 80, -90, 180), ...bola.prims],
    pecas: [bola.peca],
    fios: [],
    cargas: [],
    marcas: { bola: bola.centro, contato: r.contato, calcanhar: r.e.lado.R.calcanhar },
  };
}
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** A flexão do pescoço em linha reta com a inclinação do tronco, entre o começo e o fim do movimento certo. */
const pescocoLiso = (c: Map<string, number>) => (fr: number) => mix(c.get('c0')!, c.get('c1')!, (fr - c.get('fr0')!) / (c.get('fr1')! - c.get('fr0')!));
const BOLA0 = new WeakMap<Corpo, number>();
/** Onde a bola fica no começo do movimento certo (para medir quanto ela rolou). */
function calibrarBola(corpo: Corpo): number {
  let z = BOLA0.get(corpo);
  if (z !== undefined) return z;
  calibrar(corpo);
  z = pose(corpo, { joelho: f('joelho.inicio'), quadril: 0, apoio: 0 }, pescocoLiso(calibrar(corpo))).contato[2];
  BOLA0.set(corpo, z);
  return z;
}

export const flexaoBola: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // biblioteca: posteriores da coxa (principal) e glúteos (secundário), decidido na revisão de anatomia de 02/11/2026
  papeis: { posteriores: 'p', gluteo: 's' },
  trajetorias: { calcanhar: (q) => q.marcas.calcanhar!, quadril: (q) => q.esq.pelve.o },
};
