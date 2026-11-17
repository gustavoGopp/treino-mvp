// Flexão nórdica (nórdico), no motor novo. Os números vêm da ficha (../dados/movimentos/nordico.json). Ajoelhado no
// colchonete, com os calcanhares presos sob a estrutura de um sofá (../pecas-de-cena/sofa.ts); o corpo inteiro gira
// para a frente em torno dos joelhos, reto do joelho à cabeça, devagar; as mãos esperam na frente do peito, vão ao
// chão quando a descida passa do ponto que se controla e amortecem dobrando os cotovelos, como numa flexão. A volta é
// o mesmo caminho, empurrando o chão. O que se resolve, em vez de receber pronto:
//  - a perna de baixo (uma vez por corpo): a altura do joelho e a inclinação da canela até o joelho e a canela perto
//    do tornozelo encostarem no colchonete; o pé estica até o alto do calcanhar apertar a parte de baixo do sofá, que
//    é posto sobre o calcanhar (a altura livre debaixo dele é a da ficha do fabricante);
//  - o giro em que as mãos tocam o chão: o braço, a 93% do alcance e 18° à frente da vertical, chega ao chão; ali fica
//    o ponto de apoio de cada mão;
//  - em cada quadro: o quadril no arco em volta dos joelhos, a bacia e a coxa na mesma linha (o corpo reto).
import ficha from '../dados/movimentos/nordico.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, resolver2, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca, PecaPropria } from '../pecas';
import type { Prim } from '../desenho';
import { retArred } from '../realista/base.mjs';
import { debaixoDoSofa, sofa } from '../pecas-de-cena/sofa';
import type { Sofa } from '../pecas-de-cena/sofa';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, lerp, mix, mul, noRef, norm, REF0, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** Direção no plano de lado (y, z), pelo ângulo em graus a partir de +z, girando para +y. */
const noPlano = (a: number): V3 => [0, Math.sin(a * rad), Math.cos(a * rad)];
/** Onde fica o colchonete dobrado (o meio dele, em z): debaixo dos joelhos e das canelas. */
const Z_COLCHONETE = -14;
/** A espessura do colchonete dobrado ao meio (a ficha: "almofada ou colchonete dobrado sob os joelhos"). */
const DOBRADO = () => 2 * obj('colchonete', 'esp');
/**
 * O colchonete da tabela dobrado ao meio: metade do comprimento, o dobro da espessura, desenhado como o colchonete
 * (../equipamento.ts), em duas camadas.
 */
function colchoneteDobrado(z0: number): { prims: Prim[]; peca: PecaPropria } {
  const comp = obj('colchonete', 'comp') / 2,
    larg = obj('colchonete', 'larg'),
    esp = obj('colchonete', 'esp');
  return {
    prims: [{ t: 'caixa', ref: { ...REF0, o: [0, esp, z0] }, meias: [larg / 2, esp, comp / 2], cls: 'tapete', vies: -50 }],
    peca: {
      t: 'propria',
      nome: 'colchonete-dobrado',
      fixa: z0,
      desenhar(C, M) {
        for (const y of [0, esp]) C.prisma(retArred(larg, comp, 3, 3), [0, y, z0], [1, 0, 0], [0, 0, 1], [0, esp, 0], M.plataforma);
      },
    },
  };
}

interface Base {
  /** O centro do joelho (o meio dos dois), a direção da canela e a do pé (fixas no ciclo). */
  yJoelho: number;
  canela: V3;
  pe: V3;
  sofa: Sofa;
  /** O giro do corpo (graus à frente da vertical) em que as mãos tocam o chão, e onde elas tocam. */
  toque: number;
  maoNoChao: Record<Lado, V3>;
}
const BASES = new WeakMap<Corpo, Base>();

/** O tronco com a bacia `tronco` graus à frente e a coxa `coxa` graus à frente da vertical, com o joelho em (0, yJ, 0). */
function troncoEm(corpo: Corpo, yJ: number, coxa: number, tronco: number): Tronco {
  const L = corpo.m('coxa.comp');
  const pelve: V3 = [0, yJ + L * Math.cos(coxa * rad), L * Math.sin(coxa * rad)];
  return resolverTronco(corpo, { pelve, frente: tronco, lombar: 0, toracica: 0, cervical: f('pescoco'), cabeca: 0 });
}
const pernas = (coxa: number, canela: V3, pe: V3): Record<Lado, PosePerna> => {
  const p: PosePerna = { coxa: [0, -Math.cos(coxa * rad), -Math.sin(coxa * rad)], canela, peDir: pe, polo: [0, 0, 1] };
  return { R: p, L: p };
};
const SOLTO = (k: Lado): PoseBraco => ({ umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [-sinal(k), 0, 0] } });

function base(corpo: Corpo): Base {
  const ja = BASES.get(corpo);
  if (ja) return ja;
  const tampo = DOBRADO() - f('almofada.amassa');
  const corpoEm = (yJ: number, canela: V3, pe: V3, coxa = 0) => resolverMembros(troncoEm(corpo, yJ, coxa, coxa), { R: SOLTO('R'), L: SOLTO('L') }, pernas(coxa, canela, pe));
  const peSolto = noPlano(200);
  // 1) o joelho e a canela no colchonete: o ponto mais baixo perto do joelho e o perto do tornozelo, no tampo
  const baixoPerto = (e: Esq, perto: V3, r: number) => {
    let m = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'canela' || parte === 'coxa') && p[0] < 0 && dist(p, perto) < r) m = Math.min(m, p[1]);
    return m;
  };
  const [yJoelho, phi] = resolver2((yJ, ph) => {
    const e = corpoEm(yJ, noPlano(180 + ph), peSolto);
    return [baixoPerto(e, e.lado.R.joelho, 9) - tampo, baixoPerto(e, e.lado.R.tornozelo, 10) - tampo];
  }, 8, 2, 14);
  const canela = noPlano(180 + phi);
  // 2) o pé estica até o alto do calcanhar apertar a parte de baixo do sofá
  const debaixo = obj('sofa', 'alturaDebaixo') + f('calcanhar.aperta');
  const altoDoCalcanhar = (e: Esq) => {
    let m = -1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pe' && p[0] < 0 && dist(p, e.lado.R.calcanhar) < 7) m = Math.max(m, p[1]);
    return m;
  };
  // (de grau em grau, do pé quase em ângulo reto ao pé esticado, sem a ponta do pé passar do tampo do colchonete; se o
  // calcanhar não alcança, fica o mais alto possível: a conferência mede e diz)
  let aPe = 200,
    melhor = 1e9;
  for (let a = 182; a <= 262; a += 1) {
    const e = corpoEm(yJoelho, canela, noPlano(a));
    let pePiso = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pe' && p[0] < 0) pePiso = Math.min(pePiso, p[1]);
    if (pePiso < tampo - 1) continue;
    const d = Math.abs(altoDoCalcanhar(e) - debaixo);
    if (d < melhor) {
      melhor = d;
      aPe = a;
    }
  }
  aPe = resolver1((a) => altoDoCalcanhar(corpoEm(yJoelho, canela, noPlano(a))) - debaixo, aPe - 1, aPe + 1, 16);
  const pe = noPlano(aPe);
  const e0 = corpoEm(yJoelho, canela, pe);
  const sofaPosto: Sofa = { x0: 0, zFrente: e0.lado.R.calcanhar[2] + f('calcanhar.sobOSofa') };
  // 3) o toque das mãos: o giro em que o braço, `maos.alcance` do comprimento e `maos.aFrente` à frente da vertical,
  //    leva o punho ao chão
  const alcance = (corpo.m('braco.comp') + corpo.m('antebraco.comp')) * f('maos.alcance'),
    a = f('maos.aFrente') * rad,
    yPunho = corpo.m('raio.punho') * 0.85;
  const ombroEm = (th: number) => corpoEm(yJoelho, canela, pe, th).lado.R.ombro;
  const toque = resolver1((th) => ombroEm(th)[1] - alcance * Math.cos(a) - yPunho, 10, 85, 30);
  const o = ombroEm(toque);
  const maoNoChao = { R: [o[0], yPunho, o[2] + alcance * Math.sin(a)] as V3, L: [-o[0], yPunho, o[2] + alcance * Math.sin(a)] as V3 };
  const b = { yJoelho, canela, pe, sofa: sofaPosto, toque, maoNoChao };
  BASES.set(corpo, b);
  return b;
}

/** Os braços: o punho no alvo dado; a mão gira da frente do peito (w = 0) ao chão (w = 1). */
function bracos(t: Tronco, w: number, apoio: Record<Lado, V3>): Record<Lado, PoseBraco> {
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const punho = apoio[k];
    const dedos = norm(lerp(t.torax.y, [0, 0, 1], w));
    const polo = norm(lerp([s * 0.5, -1, 0.1], [s * 0.6, 0.4, -1], w));
    return { punho, polo, mao: { polegar: [-s, 0, 0], dedos, forma: 'aberta' } };
  };
  return { R: braco('R'), L: braco('L') };
}

/**
 * O giro do corpo (graus à frente da vertical) no ponto u: o toque em 0,8 e, depois, um quarto a mais com as mãos no
 * chão. O giro é linear em u nos dois trechos (a mesma inclinação), para não haver tranco no toque, na volta.
 */
function giro(B: Base, u: number): number {
  return (B.toque * u) / 0.8;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const B = base(corpo);
  let th = giro(B, u),
    coxa = th,
    tronco = th;
  if (erro === 'desaba') {
    // perde o controle: o corpo chega às mãos com `erro.desaba.ate` do tempo da descida
    const ate = 0.8 * f('erro.desaba.ate');
    th = u <= ate ? B.toque * suave(u / ate) : giro(B, u);
    coxa = tronco = th;
  }
  if (erro === 'quadril') {
    // o quadril dobra: a coxa gira menos e o tronco cai à frente dela
    const w = suave(Math.min(1, u / 0.8));
    coxa = th * mix(1, f('erro.quadril.coxa'), w);
    tronco = coxa + f('erro.quadril.tronco') * w;
  }
  const t = troncoEm(corpo, B.yJoelho, coxa, tronco);
  // as mãos vão ao chão a partir de `maos.aparam` do giro até o toque; no erro, elas descem até onde o braço alcança
  // a mão não passa do alcance do braço: no caminho do peito ao chão (e no erro do quadril, com o ombro mais alto),
  // o alvo fica na reta do ombro até ele, a no máximo `maos.alcance` do comprimento do braço
  const o = resolverMembros(t, { R: SOLTO('R'), L: SOLTO('L') }, pernas(coxa, B.canela, B.pe)).lado;
  const alcance = (corpo.m('braco.comp') + corpo.m('antebraco.comp')) * f('maos.alcance');
  // a mão sai da frente do peito a partir de `maos.aparam` do giro até o toque e chega à reta do ombro ao ponto de
  // apoio a 90% dele; dali ela desce por essa reta, com o braço no alcance (`maos.alcance`), até tocar o chão. O
  // toque é o fim de uma fase (velocidade zero), na ida e na volta: o cotovelo, que começa a dobrar ali, não dá tranco
  const fr = tronco / B.toque;
  const w = suave(Math.max(0, Math.min(1, (fr - f('maos.aparam')) / (0.9 - f('maos.aparam')))));
  const ate = (k: Lado): V3 => {
    const peito = noRef(t.torax, [sinal(k) * 13, -24, f('maos.peito')]);
    const ombro = o[k].ombro;
    if (fr >= 1 && erro !== 'quadril') return B.maoNoChao[k];
    const dP = sub(peito, ombro),
      dC = sub(B.maoNoChao[k], ombro);
    const D = Math.hypot(...dC);
    const naReta = Math.min(D, alcance);
    const dir = norm(lerp(norm(dP), norm(dC), w));
    const comp = mix(Math.hypot(...dP), naReta, w);
    return add(ombro, mul(dir, comp));
  };
  const apoio = { R: ate('R'), L: ate('L') };
  const e = resolverMembros(t, bracos(t, w, apoio), pernas(coxa, B.canela, B.pe));
  const S = sofa(B.sofa);
  const A = colchoneteDobrado(Z_COLCHONETE);
  const prims = [chao(-150, 120, -160, 150), ...A.prims, ...S.prims];
  const d = debaixoDoSofa(B.sofa);
  // Do sofá, o quadro só precisa mostrar o trecho onde os calcanhares prendem (45 cm para cada lado e 45 cm de fundo,
  // até a altura do assento); o resto é cortado pela borda. Com o sofá inteiro (mais de 2 m), o corpo ficava pequeno.
  const trecho: V3[] = [];
  for (const x of [-45, 45]) for (const y of [0, obj('sofa', 'assentoAltura')]) for (const z of [B.sofa.zFrente - 45, B.sofa.zFrente]) trecho.push([B.sofa.x0 + x, y, z]);
  const pecas: Peca[] = [A.peca, { ...S.peca, noQuadro: trecho }];
  return { esq: e, prims, pecas, fios: [], cargas: [], marcas: { debaixoDoSofa: [0, d.y, d.zFrente], maoR: B.maoNoChao.R, maoL: B.maoNoChao.L }, vies: { maoR: 1, maoL: 1 } };
}

export const nordico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // só os posteriores da coxa, principal, sem secundário (biblioteca; ficha da técnica)
  papeis: { posteriores: 'p' },
  trajetorias: { cabeça: (q) => q.esq.cabeca.o, quadril: (q) => q.esq.pelve.o },
};
