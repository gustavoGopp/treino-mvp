// Peça de cena: o banco romano a 45° (a hiperextensão). Medidas em ../dados/objetos/banco-romano.json: o ângulo (45°),
// o tamanho total (130 × 73 × 91 cm), a espessura das almofadas (3 pol) e a faixa da regulagem (da chapa dos pés ao alto
// das almofadas, de 89 a 112 cm) vêm da ficha da Body-Solid GHYP345; a viga de 75 mm, da Bench Fitness REVOLVE. O que
// nenhuma ficha lida dá (o tamanho das almofadas e da chapa, os rolos, onde fica a viga) é de desenho, como no cartão.
//
// Parte do cartão de hoje (scripts/desenhos-equipamento/realista/aparelhos.mjs, `bancoRomano`): a base em retângulo no
// chão, a viga a 45° com os furos da regulagem, a chapa dos pés com as ranhuras, a haste com os dois rolos dos
// tornozelos e o apoio duplo das coxas (duas almofadas lado a lado, uma por coxa) num suporte que corre na viga.
//
// O banco funciona: o apoio das coxas corre na viga e prende num furo (a regulagem: a distância da chapa ao alto das
// almofadas); a haste dos rolos também corre na viga, até os rolos encostarem atrás dos tornozelos.
//
// Eixos: x de lado a lado (o meio do banco em x = placa[0]); a viga sobe para +z, a 45°. `u` é a direção da viga (para
// cima); `n` é a normal do lado de cima (para cima e para −z): a pessoa fica do lado de +n, de bruços sobre as
// almofadas, com a cabeça para +z. Um ponto do banco é placa + s·u + k·n + x·X (s ao longo da viga, a partir da face da
// chapa dos pés; k a partir da linha do meio da viga).
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import type { CenaRealista } from '../realista/base.mjs';
import { retArred } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, mul, sub } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('bancoRomano', id);
const rad = Math.PI / 180;
/** Quanto as almofadas vão para trás na pintura (cm): a pessoa deita por cima delas. */
const ATRAS = 30;
/** O raio das bordas das almofadas (cm), no desenho e na conferência. */
const RAIO = 3.5;

export interface BancoRomano {
  /** O ponto da linha do meio da viga na face da chapa dos pés, no mundo (cm). */
  placa: V3;
  /** A regulagem: da face da chapa dos pés ao alto das almofadas, ao longo da viga (cm; de 89 a 112). */
  almofada: number;
  /** Onde fica o eixo dos rolos dos tornozelos: s ao longo da viga a partir da chapa, k acima da linha da viga (cm). */
  rolo: { s: number; k: number };
}

/** As direções do banco: ao longo da viga (para cima) e a normal do lado de cima. */
export function eixosDoBancoRomano(): { u: V3; n: V3 } {
  const a = g('angulo') * rad;
  return { u: [0, Math.sin(a), Math.cos(a)], n: [0, Math.cos(a), -Math.sin(a)] };
}
/** Um ponto do banco: s ao longo da viga a partir da chapa, k acima da linha da viga, x de lado. */
export function noBancoRomano(b: BancoRomano, s: number, k: number, x = 0): V3 {
  const { u, n } = eixosDoBancoRomano();
  return add(add(add(b.placa, mul(u, s)), mul(n, k)), [x, 0, 0]);
}
/** A face das almofadas (k acima da linha da viga) e onde elas vão ao longo dela (s de baixo, s de cima). */
export function faceDasAlmofadas(b: BancoRomano): { k: number; s0: number; s1: number; meiaLarg: number } {
  return { k: g('almofadaAcimaDaViga'), s0: b.almofada - g('almofadaComp'), s1: b.almofada, meiaLarg: g('almofadaLarg') + g('almofadaVao') / 2 };
}
/** Os centros dos dois rolos (as pontas de fora) e o raio. */
export function rolosDoBancoRomano(b: BancoRomano): { a: V3; b: V3; r: number }[] {
  const x0 = g('almofadaVao') / 2 + 1;
  return [-1, 1].map((sx) => ({ a: noBancoRomano(b, b.rolo.s, b.rolo.k, sx * x0), b: noBancoRomano(b, b.rolo.s, b.rolo.k, sx * (x0 + g('roloComp'))), r: g('roloDiam') / 2 }));
}

/** Uma caixa da conferência no referencial do banco (centro em s, k; meias-medidas ao longo de x, n e u). */
function caixa(b: BancoRomano, s: number, k: number, x: number, meias: V3, cls: string, vies = -0.7): Prim {
  const { u, n } = eixosDoBancoRomano();
  return { t: 'caixa', ref: { o: noBancoRomano(b, s, k, x), x: [1, 0, 0], y: n, z: u }, meias, cls, vies };
}

/** Onde a viga começa e termina (s) e onde ficam os dois pés da estrutura (o de trás e o da frente, no chão). */
function estrutura(b: BancoRomano) {
  // a viga termina debaixo das almofadas: na descida, o tronco passa à frente da ponta dela
  const s0 = -16,
    s1 = b.almofada - 6;
  const baixo = noBancoRomano(b, s0, 0);
  const frente = noBancoRomano(b, b.almofada - g('almofadaComp') - 6, 0);
  // o pé da frente desce da viga até o chão, para a frente (como no cartão de hoje), por baixo do caminho do tronco
  const pisoFrente: V3 = [b.placa[0], g('tubo') / 2, frente[2] + frente[1] * 0.35];
  const pisoTras: V3 = [b.placa[0], g('tubo') / 2, baixo[2] - 6];
  return { s0, s1, baixo, frente, pisoFrente, pisoTras };
}

export function bancoRomano(b: BancoRomano): { prims: Prim[]; peca: PecaPropria } {
  const { u, n } = eixosDoBancoRomano();
  const A = faceDasAlmofadas(b);
  const E = estrutura(b);
  const esp = g('almofadaEsp'),
    viga = g('viga');
  const prims: Prim[] = [];
  // as almofadas (estofado), a chapa dos pés, a viga, a haste dos rolos
  // cada almofada tem as bordas arredondadas (raio RAIO, como no desenho): na conferência, duas caixas em cruz (o
  // retângulo sem os quatro cantos)
  for (const sx of [-1, 1]) {
    const xc = sx * (g('almofadaVao') / 2 + g('almofadaLarg') / 2),
      ml = g('almofadaLarg') / 2,
      mc = g('almofadaComp') / 2;
    prims.push(caixa(b, (A.s0 + A.s1) / 2, A.k - esp / 2, xc, [ml, esp / 2, mc - RAIO], 'estofado', 0.5));
    prims.push(caixa(b, (A.s0 + A.s1) / 2, A.k - esp / 2, xc, [ml, esp / 2 - RAIO, mc], 'estofado', 0.5));
  }
  prims.push(caixa(b, -1, g('placaComp') / 2 - viga / 2, 0, [g('placaLarg') / 2, g('placaComp') / 2, 1], 'esc'));
  prims.push(caixa(b, (E.s0 + E.s1) / 2, 0, 0, [viga / 2, viga / 2, (E.s1 - E.s0) / 2], 'esc'));

  const peca: PecaPropria = {
    t: 'propria',
    nome: 'banco-romano',
    fixa: b,
    desenhar(C: CenaRealista, M, o) {
      const X: V3 = [1, 0, 0];
      const x0 = b.placa[0];
      const tubo = g('tubo');
      const B = (s: number, k: number, x = 0) => noBancoRomano(b, s, k, x0 + x - b.placa[0]);
      // a base no chão: dois trilhos de lado e as travessas da frente e de trás
      const lx = g('larg') / 2 - tubo / 2;
      // a base tem o comprimento da ficha: começa logo atrás do pé de trás e vai para a frente, debaixo do tronco
      const zT = E.pisoTras[2] - 4,
        zF = zT + g('comp');
      for (const sx of [-1, 1]) C.tubo([x0 + sx * lx, tubo / 2, zT], [x0 + sx * lx, tubo / 2, zF], tubo, tubo, M.metal);
      for (const z of [zT + tubo / 2, zF - tubo / 2]) C.tubo([x0 - lx, tubo / 2, z], [x0 + lx, tubo / 2, z], tubo, tubo, M.metal);
      for (const sx of [-1, 1]) for (const z of [zT + 2, zF - 2]) C.cilindro([x0 + sx * (lx - 2), 0, z], [x0 + sx * (lx - 2), 1.2, z], 3.4, M.borracha, { lados: 12 });
      // os pés da viga: o de trás (curto, em pé) e o da frente (de viés, até a travessa da frente)
      C.tubo([x0, tubo, E.pisoTras[2]], add(E.baixo, mul(n, -viga / 2)), 7, 7, M.metal, { up: X });
      C.tubo([x0, tubo, E.pisoFrente[2]], add(E.frente, mul(n, -viga / 2)), 7, 7, M.metal, { up: X });
      C.tubo([x0 - lx, tubo / 2, E.pisoFrente[2]], [x0 + lx, tubo / 2, E.pisoFrente[2]], tubo, tubo, M.metal);
      // a viga a 45°, com os furos da regulagem do apoio das coxas
      C.tubo(B(E.s0, 0), B(E.s1, 0), viga, viga, M.metal, { up: X });
      const furos: V3[] = [];
      for (let s = E.s1 - 3; s >= Math.max(E.s1 - 40, 30); s -= 5.6) furos.push(B(s, 0, -viga / 2 - 0.05));
      C.furos(furos, u, n, 0.9);
      // a chapa dos pés, com as ranhuras
      const ranh = (P: (p: V3) => V3) => {
        let d = '';
        for (let i = 0; i < 6; i++) {
          const k = 4 + i * 5.6;
          const a = P(B(0.05, k, -g('placaLarg') / 2 + 3)),
            c = P(B(0.05, k, g('placaLarg') / 2 - 3));
          d += `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
        }
        return `<path d="${d}" stroke="#5E646C" stroke-width="0.45"/>`;
      };
      C.prisma(retArred(2, g('placaComp'), 1), B(-1, g('placaComp') / 2 - viga / 2, -g('placaLarg') / 2), u, n, [g('placaLarg'), 0, 0], M.plataforma, { decalSempre: ranh } as never);
      // a haste dos rolos (corre na viga) e os dois rolos
      C.tubo(B(b.rolo.s, viga / 2), B(b.rolo.s, b.rolo.k), 4.5, 4.5, M.metal, { up: X });
      const R = rolosDoBancoRomano(b);
      C.cilindro(add(R[0]!.b, [-1, 0, 0]), add(R[1]!.b, [1, 0, 0]), 1.4, M.cromo, { lados: 10 });
      for (const r of R) C.cilindro(r.a, r.b, r.r, M.estofado, { lados: 22 });
      // o apoio das coxas: o suporte que corre na viga, a chapa e as duas almofadas (para trás na pintura)
      const sm = (A.s0 + A.s1) / 2;
      const atras = { dz: ATRAS };
      C.tubo(B(sm, viga / 2), B(sm, A.k - esp - 1.5), 5, 5, M.metal, { up: X, ...atras });
      C.prisma(retArred(g('almofadaComp') - 2, 3, 1), B(sm, A.k - esp - 1.5, -A.meiaLarg + 1), u, n, [2 * A.meiaLarg - 2, 0, 0], M.metal, atras);
      for (const sx of [-1, 1]) {
        const xc = sx * (g('almofadaVao') / 2 + g('almofadaLarg') / 2);
        C.prisma(retArred(g('almofadaComp'), esp, RAIO, 6), B(sm, A.k - esp / 2, xc - g('almofadaLarg') / 2), u, n, [g('almofadaLarg'), 0, 0], M.estofado, atras);
      }
      if (o.comSombra) C.sombra(x0, (zT + zF) / 2, lx + 4, (zF - zT) / 2 + 4, 0.18);
    },
  };
  return { prims, peca };
}

/** Os extremos do banco desenhado (cm): para a folha conferir o tamanho total contra a ficha. */
export function extremosDoBancoRomano(b: BancoRomano) {
  const topo = noBancoRomano(b, b.almofada, g('almofadaAcimaDaViga'));
  return { comp: g('comp'), larg: g('larg'), alto: topo[1] };
}
/** A distância (cm) de um ponto à linha dos rolos, menos o raio (negativo = dentro do rolo). */
export function foraDoRolo(b: BancoRomano, p: V3): number {
  let m = 1e9;
  for (const r of rolosDoBancoRomano(b)) {
    const ab = sub(r.b, r.a);
    const t = Math.max(0, Math.min(1, ((p[0] - r.a[0]) * ab[0] + (p[1] - r.a[1]) * ab[1] + (p[2] - r.a[2]) * ab[2]) / (ab[0] ** 2 + ab[1] ** 2 + ab[2] ** 2)));
    const q = add(r.a, mul(ab, t));
    m = Math.min(m, Math.hypot(...sub(p, q)) - r.r);
  }
  return m;
}
