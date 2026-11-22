// Peça de cena: a barra hexagonal (trap bar) com anilhas e presilhas, para o levantamento terra com barra hexagonal.
// Medidas em ../dados/objetos/barra-hexagonal.json (Rogue TB-1 Trap Bar 2.0); as anilhas e a presilha são as da barra
// longa (../dados/objetos/barra-longa.json). Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs,
// `barra_hexagonal`): a moldura em hexágono, os dois cabos por dentro dela, as mangas nas pontas e as anilhas pretas.
// O cartão de hoje tinha o hexágono 34% mais estreito que a Rogue e os cabos a 24 cm um do outro, ao longo das mangas;
// aqui os cabos ficam a 63,5 cm (a medida da Rogue) e atravessam o hexágono da frente para trás, que é como a pessoa
// segura, de pegada neutra, de pé no meio da barra. A Rogue é toda preta (pintura epóxi): a moldura, os cabos e as
// mangas saem no metal grafite das máquinas, para não se confundirem com as anilhas.
//
// A barra é um objeto rígido: as duas mãos a seguram e ela se move inteira. Quem chama dá o centro da barra (o meio do
// hexágono, na altura dos cabos), a direção das mangas (de uma ponta à outra) e a direção dos cabos (da frente para trás
// da pessoa, perpendicular às mangas).
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import { obj } from '../tabelas';
import { add, cross, mul, norm, perp } from '../vec';
import type { V3 } from '../vec';
import type { IdAnilha } from './barra-longa';

const h = (id: string) => obj('barraHexagonal', id);

/** A massa total (barra + anilhas dos dois lados), em kg. */
export const massaDaBarraHexagonal = (anilhas: IdAnilha[]) => h('massa') + 2 * anilhas.reduce((s, a) => s + obj(a, 'massa'), 0);
/** O raio da maior anilha (a altura do centro da barra quando ela está no chão, apoiada nas anilhas). */
export const raioDaAnilhaMaiorNaHexagonal = (anilhas: IdAnilha[]) => Math.max(...anilhas.map((a) => obj(a, 'diam') / 2), h('mangaDiam') / 2);

/** A moldura no plano da barra: [ao longo das mangas, ao longo dos cabos] (cm) de cada canto, a meio do tubo. */
export function cantosDoHexagono(): [number, number][] {
  const ponta = h('hexComp') / 2,
    t = h('larg') / 2 - h('tubo') / 2;
  // cada lado inclinado faz metade do ângulo da ponta com a linha das mangas
  const s = ponta - t / Math.tan(((h('anguloDaPonta') / 2) * Math.PI) / 180);
  return [
    [ponta, 0],
    [s, t],
    [-s, t],
    [-ponta, 0],
    [-s, -t],
    [s, -t],
  ];
}

export interface BarraHexagonal {
  /** O meio do hexágono (na altura dos cabos), a direção das mangas e a direção dos cabos (da frente para trás da pessoa). */
  centro: V3;
  eixo: V3;
  cabos: V3;
  anilhas: IdAnilha[];
}

/** O centro de cada cabo (onde a mão fecha): s = −1 e +1 ao longo do eixo das mangas. */
export function centroDoCabo(p: Pick<BarraHexagonal, 'centro' | 'eixo'>, s: number): V3 {
  return add(p.centro, mul(norm(p.eixo), (s * h('caboEntre')) / 2));
}

/**
 * A barra hexagonal com as anilhas: os volumes para a conferência (a moldura, os cabos, as mangas e cada anilha) e a peça
 * desenhada. `semPresilha` tira as presilhas.
 */
export function barraHexagonal(p: BarraHexagonal, o: { semPresilha?: boolean } = {}): { prims: Prim[]; peca: PecaPropria } {
  const u = norm(p.eixo),
    c = norm(perp(p.cabos, u)),
    cima = norm(cross(c, u));
  const Q = ([s, t]: [number, number]): V3 => add(add(p.centro, mul(u, s)), mul(c, t));
  const P = (d: number) => add(p.centro, mul(u, d));
  const cantos = cantosDoHexagono();
  const ponta = h('hexComp') / 2,
    meia = h('comp') / 2,
    iniManga = meia - h('mangaComp'),
    iniBatente = iniManga - h('batenteEsp'),
    tb = h('tubo'),
    rc = h('caboDiam') / 2,
    rm = h('mangaDiam') / 2,
    zc = h('larg') / 2 - tb;
  const posAnilhas = (s: number) => {
    let d = iniManga;
    return p.anilhas.map((a) => {
      const e = obj(a, 'esp');
      const r = { a: P(s * d), b: P(s * (d + e)), raio: obj(a, 'diam') / 2 };
      d += e;
      return r;
    });
  };
  const fimDasAnilhas = iniManga + p.anilhas.reduce((s, a) => s + obj(a, 'esp'), 0);
  // os cabos atravessam o hexágono da frente para trás, de uma face de dentro da moldura à outra
  const cabo = (s: number): [V3, V3] => [Q([(s * h('caboEntre')) / 2, -zc]), Q([(s * h('caboEntre')) / 2, zc])];
  const prims: Prim[] = [];
  for (let i = 0; i < 6; i++) prims.push({ t: 'volume', vol: cilindro(Q(cantos[i]!), Q(cantos[(i + 1) % 6]!), tb / 2, tb / 2, cima), cls: 'aco', vies: -0.5 });
  for (const s of [-1, 1]) {
    const [a, b] = cabo(s);
    prims.push({ t: 'volume', vol: cilindro(a, b, rc, rc, cima), cls: 'aco', vies: -0.5 });
    prims.push({ t: 'volume', vol: cilindro(P(s * ponta), P(s * meia), rm, rm, cima), cls: 'aco', vies: -0.5 });
    for (const an of posAnilhas(s)) prims.push({ t: 'volume', vol: cilindro(an.a, an.b, an.raio, an.raio, cima), cls: 'ferro', vies: -0.5 });
  }
  // no enquadramento, só a moldura e o começo das anilhas contam: as mangas (2,26 m de ponta a ponta) e o resto das
  // anilhas podem ser cortados pela borda do quadro, para o corpo não ficar pequeno
  const noQuadro: V3[] = [...cantos.map(Q), ...[-1, 1].flatMap((s) => [-1, 1].map((v) => add(P(s * iniManga), mul(cima, (v * h('larg')) / 4))))];
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'barra hexagonal',
    noQuadro,
    desenhar(C, M, desenho) {
      const op = { lados: 14, up: cima };
      // a moldura em tubo quadrado (os cantos se sobrepõem meio tubo, para as juntas fecharem)
      for (let i = 0; i < 6; i++) {
        const a = Q(cantos[i]!),
          b = Q(cantos[(i + 1) % 6]!);
        const d = norm(add(b, mul(a, -1)));
        C.tubo(add(a, mul(d, -tb / 2)), add(b, mul(d, tb / 2)), tb, tb, M.metal, { up: cima });
      }
      // um bloco em cada canto, onde os tubos se encontram (a solda), para a junta não ficar com vão
      for (const k of cantos) {
        const q = Q(k);
        C.tubo(add(q, mul(cima, -tb / 2 - 0.05)), add(q, mul(cima, tb / 2 + 0.05)), tb * 1.12, tb * 1.12, M.metal, { up: u });
      }
      for (const s of [-1, 1]) {
        // o cabo, um pouco para trás na pintura (as mãos fecham por cima), com a recartilha no meio, onde a mão segura
        const [a, b] = cabo(s);
        C.cilindro(a, b, rc, M.metal, { ...op, lados: 12, dz: 6 });
        const m = Q([(s * h('caboEntre')) / 2, 0]);
        C.linha(add(add(m, mul(c, -6)), mul(cima, rc + 0.02)), add(add(m, mul(c, 6)), mul(cima, rc + 0.02)), '#8C939D', 0.8);
        // o pé da manga, o batente e a parte carregável
        C.cilindro(P(s * ponta), P(s * iniBatente), rm, M.metal, op);
        C.cilindro(P(s * iniBatente), P(s * iniManga), h('batenteDiam') / 2, M.metal, op);
        C.cilindro(P(s * iniManga), P(s * meia), rm, M.metal, op);
        for (const an of posAnilhas(s)) C.anilha(s < 0 ? an.b : an.a, s < 0 ? an.a : an.b, an.raio, M.anilha, { up: cima });
        if (!o.semPresilha) {
          const d0 = fimDasAnilhas + 0.3,
            larg = obj('presilha', 'larg');
          C.cilindro(P(s * d0), P(s * (d0 + larg)), rm + 0.7, M.metalClaro, { ...op, lados: 12 });
          const cc = P(s * (d0 + larg / 2));
          C.linha(add(cc, mul(cima, rm + 0.5)), add(cc, mul(cima, obj('presilha', 'diam'))), M.metalClaro[3], 0.9);
        }
      }
      // a sombra no chão, quando a barra está perto dele (apoiada nas anilhas)
      if (desenho.comSombra && p.centro[1] < 40) C.sombra(p.centro[0], p.centro[2], 30 + Math.abs(u[0]) * meia, 30 + Math.abs(u[2]) * meia, 0.2);
    },
  };
  return { prims, peca };
}
