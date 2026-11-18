// O núcleo dos exercícios no leg press 45° (o leg press e a panturrilha no leg press). Sentado no assento, as costas
// no encosto (pecas-de-cena/leg-press.ts), as mãos nos pegadores ao lado do assento, os pés na chapa do carro. A bacia
// fica parada; o carro anda na guia até onde as pernas o levam.
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo):
//  - como o corpo deita no encosto: a inclinação da bacia em que as costas encostam no encosto em cima (as escápulas) e
//    embaixo (a bacia) ao mesmo tempo, com a lombar achatada como a ficha pede;
//  - onde a bacia fica: o glúteo no assento e as costas no encosto, os dois amassando `amassa` cm (medido na
//    superfície do Boneco).
// Em cada quadro: o pé fica preso à chapa (na mesma posição dela) e o carro anda na guia até o joelho ficar no ângulo
// pedido (a distância do quadril ao tornozelo dá o ângulo do joelho; a posição do carro sai de uma conta de segundo
// grau, sem tentativa e erro).
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import { geometriaDoLegPress, centroDaChapa, pegador } from '../pecas-de-cena/leg-press';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dot, girar, mul, noRef, norm, sub } from '../vec';
import type { V3 } from '../vec';

export interface OpcoesDoAssento {
  /** Quanto a lombar achata além da curva de repouso (graus), com as costas no encosto. */
  lombar: number;
  cervical: number;
  cabeca: number;
  /** Quanto o glúteo e as costas afundam nos estofados (cm). */
  amassa: number;
}

/** Os pontos do Boneco que encostam: as costas (o tórax), a cintura e a bacia, dentro da largura do estofado. */
function pontosDasCostas(e: Esq) {
  const meia = obj('legPress', 'estofadoLarg') / 2 - 4;
  return pontosDoBoneco(e).filter(({ p, parte }) => ['tronco', 'cintura', 'pelve'].includes(parte) && Math.abs(p[0]) < meia);
}

/** Pernas e braços de referência para medir as costas (não encostam nos estofados). */
function membrosDeReferencia(t: ReturnType<typeof resolverTronco>): Esq {
  const solto = (k: Lado): PoseBraco => ({ umero: [sinal(k) * 0.3, -0.6, 0.5], antebraco: [0, -0.2, 1], polo: [sinal(k), 0, -1], mao: { polegar: [0, 0, 1] } });
  const perna = (k: Lado): PosePerna => ({ coxa: norm([sinal(k) * 0.05, 0.9, 1]), canela: norm([0, 1, -0.2]), polo: [0, 1, 0] });
  return resolverMembros(t, { R: solto('R'), L: solto('L') }, { R: perna('R'), L: perna('L') });
}

/**
 * Onde a bacia fica no leg press e quanto ela inclina: as costas tocam o encosto em cima e embaixo, o glúteo toca o
 * assento. Calibrado uma vez por corpo e por opções.
 */
export function assentoNoLegPress(corpo: Corpo, o: OpcoesDoAssento): { frente: number; pelve: V3 } {
  return calibragem(corpo, `leg-press:assento:${o.lombar}:${o.cervical}:${o.cabeca}:${o.amassa}`, () => {
    const G = geometriaDoLegPress();
    const tronco = (frente: number) => resolverTronco(corpo, { pelve: [0, 0, 0], frente, lombar: o.lombar, cervical: o.cervical, cabeca: o.cabeca });
    const encostos = (frente: number) => {
      const P = pontosDasCostas(membrosDeReferencia(tronco(frente)));
      const em = (partes: string[]) => Math.min(...P.filter((x) => partes.includes(x.parte)).map((x) => dot(x.p, G.normalEncosto)));
      return { cima: em(['tronco']), baixo: em(['pelve', 'cintura']), assento: Math.min(...P.filter((x) => x.parte === 'pelve').map((x) => dot(x.p, G.normalAssento))) };
    };
    // a inclinação em que as costas tocam o encosto em cima e embaixo ao mesmo tempo
    const frente = resolver1((f) => {
      const c = encostos(f);
      return c.cima - c.baixo;
    }, -75, -20);
    const c = encostos(frente);
    // a bacia: dot(P, n) = dot(vinco, n) − amassa − (o mínimo medido com a bacia na origem), nos dois planos
    const b1 = dot(G.vinco, G.normalEncosto) - o.amassa - Math.min(c.cima, c.baixo),
      b2 = dot(G.vinco, G.normalAssento) - o.amassa - c.assento;
    const [n1, n2] = [G.normalEncosto, G.normalAssento];
    const det = n1[1] * n2[2] - n1[2] * n2[1];
    const y = (b1 * n2[2] - n1[2] * b2) / det,
      z = (n1[1] * b2 - b1 * n2[1]) / det;
    return { frente, pelve: [0, y, z] as V3 };
  });
}

/** O tronco no leg press; `rola` gira a bacia para trás (graus) com a lombar dobrando o mesmo tanto (o erro do quadril que descola). */
export function troncoNoLegPress(corpo: Corpo, o: OpcoesDoAssento, rola = 0) {
  const A = assentoNoLegPress(corpo, o);
  const pose = (pelve: V3, r: number): PoseTronco => ({ pelve, frente: A.frente - r, lombar: o.lombar + r, cervical: o.cervical, cabeca: o.cabeca });
  const certo = resolverTronco(corpo, pose(A.pelve, 0));
  if (!rola) return certo;
  // as escápulas ficam onde estavam, no encosto: a bacia sai do lugar (sobe do assento) para o tórax não andar
  const t0 = resolverTronco(corpo, pose([0, 0, 0], rola));
  return resolverTronco(corpo, pose(sub(certo.torax.o, t0.torax.o), rola));
}

/** As mãos fechadas nos pegadores ao lado do assento, o polegar para a frente, os cotovelos para fora e para trás. */
export function maosNosPegadores(): Record<Lado, PoseBraco> {
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return { pegada: pegador(s).meio, polo: [s * 0.8, 0.1, -0.6], mao: { polegar: [0, 0, 1], forma: 'pegada', diam: obj('legPress', 'pegadorDiam') } };
  };
  return { R: braco('R'), L: braco('L') };
}

export interface PeNaChapa {
  /** Meia distância entre os pés (do meio ao meio de cada pé, cm). */
  meia: number;
  /** As pontas dos pés para fora (graus, girando na chapa). */
  paraFora: number;
  /** Onde fica a bola do pé, ao longo da chapa, a partir do centro dela (cm; negativo = para baixo). */
  bolaAo: number;
  /** Quanto o calcanhar sobe (graus): 0 = o pé chapado na chapa; negativo = desce além dela. */
  calc: number;
}
/** A direção dos dedos de cada pé, na chapa. */
export function dirDoPe(k: Lado, paraFora: number): V3 {
  const G = geometriaDoLegPress();
  return girar(G.sobeChapa, G.normalChapa, -sinal(k) * paraFora);
}
/** A pose do pé apoiado na chapa (com o carro em `s`). */
export function peNaChapa(k: Lado, p: PeNaChapa, s: number, polo: V3): PosePerna {
  const G = geometriaDoLegPress();
  const dir = dirDoPe(k, p.paraFora);
  const bola = add(add(centroDaChapa(s), mul(G.sobeChapa, p.bolaAo)), [sinal(k) * p.meia, 0, 0]);
  return { pe: { bola, dir, calc: p.calc, normal: G.normalChapa }, polo };
}
/** O tornozelo de um pé apoiado na chapa (o mesmo cálculo do esqueleto, para achar o carro sem tentativa e erro). */
function tornozeloNaChapa(corpo: Corpo, k: Lado, p: PeNaChapa, s: number): V3 {
  const G = geometriaDoLegPress();
  const dir = dirDoPe(k, p.paraFora);
  const n = G.normalChapa;
  const z = norm(sub(dir, mul(n, dot(dir, n))));
  const x = cross(n, z);
  const bola = add(add(centroDaChapa(s), mul(G.sobeChapa, p.bolaAo)), [sinal(k) * p.meia, 0, 0]);
  // o pé gira na bola do pé em volta de x (o mesmo que girarRef(dedos, x, calc))
  const y2 = girar(n, x, p.calc),
    z2 = girar(z, x, p.calc);
  return noRef({ o: bola, x, y: y2, z: z2 }, [0, corpo.m('altura.maleolo'), -(corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo'))]);
}
/**
 * A posição do carro em que o joelho direito dobra `joelho` graus, com o pé preso à chapa: o tornozelo anda com o
 * carro (em linha reta, na direção da guia) e a distância do quadril a ele dá o ângulo do joelho.
 */
export function carroParaOJoelho(corpo: Corpo, quadril: V3, p: PeNaChapa, joelho: number): number {
  const G = geometriaDoLegPress();
  const th = corpo.m('coxa.comp'),
    sk = corpo.m('perna.comp');
  const d = Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos((joelho * Math.PI) / 180));
  const a0 = sub(tornozeloNaChapa(corpo, 'R', p, 0), quadril);
  const b = dot(a0, G.guia),
    c = dot(a0, a0) - d * d;
  return -b + Math.sqrt(Math.max(0, b * b - c));
}
