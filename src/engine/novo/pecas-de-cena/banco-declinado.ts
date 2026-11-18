// Peça de cena: o banco declinado do abdominal. Medidas em ../dados/objetos/banco-declinado.json: o tamanho total
// (185 × 73 × 104 cm) e os ângulos do encosto (de +10° a −30°) vêm da Life Fitness LBR-DB ("Adjustable Decline Bench",
// feito "for performing core and decline exercises", com o pivô perto do centro e os rolos das pernas na ponta); a
// largura do encosto (29,2 cm), da Hammer Strength FW-DB. O resto é de desenho, com o motivo.
//
// O banco regulável aprovado (./banco-regulavel.ts) não serve com uma opção nova: ele é o Rogue AB-3, que vai de 0° a
// 85° e não declina, e não tem onde prender as pernas. O desenho segue o dele (o estofado com costura, a estrutura em
// tubo de aço, os pés de borracha) e o do banco romano (os rolos).
//
// O banco funciona: o encosto gira no pivô, em cima da coluna do meio, e prende na escada de furos (o ângulo); na
// ponta de cima, o poste das pernas leva os rolos dos joelhos (atrás dos joelhos dobrados) e, num braço, os rolos dos
// tornozelos (na frente dos tornozelos): as pernas ficam presas e o corpo não escorrega para baixo.
//
// Eixos: x de lado a lado (o meio do banco em ponta[0]); o encosto desce para −z (a cabeça fica do lado de −z). `ponta`
// é o meio da borda de cima da face do encosto (do lado dos pés).
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('bancoDeclinado', id);
const rad = Math.PI / 180;
/** Quanto o encosto e o que fica debaixo dele vão para trás na pintura (cm): a pessoa deita por cima. */
const ATRAS = 40;

export interface BancoDeclinado {
  /** O meio da borda de cima da face do encosto (a ponta dos pés), no mundo (cm). */
  ponta: V3;
  /** A declinação do encosto (graus abaixo da horizontal, para o lado da cabeça). */
  declina: number;
  /** Os centros dos rolos dos joelhos e dos rolos dos tornozelos (no meio, x = ponta[0]). */
  joelho: V3;
  tornozelo: V3;
}

/** A face do encosto: a direção que desce por ela (para a cabeça, −z) e a normal (para cima). */
export function faceDoDeclinado(b: Pick<BancoDeclinado, 'declina'>): { d: V3; n: V3 } {
  const a = b.declina * rad;
  return { d: [0, -Math.sin(a), -Math.cos(a)], n: [0, Math.cos(a), -Math.sin(a)] };
}
/** Os rolos: cada par, as duas pontas de cada rolo e o raio. */
export function rolosDoDeclinado(b: BancoDeclinado): { a: V3; b: V3; r: number }[] {
  const out: { a: V3; b: V3; r: number }[] = [];
  for (const c of [b.joelho, b.tornozelo]) for (const s of [-1, 1]) out.push({ a: add(c, [s * 2, 0, 0]), b: add(c, [s * (2 + g('roloComp')), 0, 0]), r: g('roloDiam') / 2 });
  return out;
}

function estrutura(b: BancoDeclinado) {
  const { d, n } = faceDoDeclinado(b);
  const comp = g('encostoComp'),
    esp = g('encostoEsp');
  const baixo = (t: number): V3 => add(add(b.ponta, mul(d, t)), mul(n, -esp));
  // o pivô fica debaixo do meio do encosto; o pé da cabeça, perto da ponta de baixo; o poste das pernas, debaixo dos rolos dos joelhos
  const pivo = baixo(comp * 0.45);
  const cabeca = baixo(comp - 10);
  const zPoste = b.joelho[2];
  return { d, n, comp, esp, baixo, pivo, cabeca, zPoste };
}

export function bancoDeclinado(b: BancoDeclinado): { prims: Prim[]; peca: PecaPropria } {
  const E = estrutura(b);
  const tubo = g('tubo');
  const x0 = b.ponta[0];
  const prims: Prim[] = [];
  prims.push({ t: 'caixa', ref: { o: add(add(b.ponta, mul(E.d, E.comp / 2)), mul(E.n, -E.esp / 2)), x: [1, 0, 0], y: E.n, z: E.d }, meias: [g('encostoLarg') / 2, E.esp / 2, E.comp / 2], cls: 'estofado', vies: 0.5 });
  // o poste das pernas e o braço dos tornozelos (a conferência vê os dois como estrutura)
  const caixaY = (a: V3, c: V3, m: number): Prim => ({ t: 'caixa', ref: { o: mul(add(a, c), 0.5), x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] }, meias: [m, Math.abs(c[1] - a[1]) / 2 + m, Math.abs(c[2] - a[2]) / 2 + m], cls: 'esc', vies: -0.7 });
  prims.push(caixaY([x0, 0, E.zPoste], [x0, b.joelho[1], E.zPoste], tubo / 2));
  for (const r of rolosDoDeclinado(b)) prims.push({ t: 'volume', vol: cilindro(r.a, r.b, r.r, r.r, [0, 1, 0]), cls: 'estofado', vies: 0.3 });

  const peca: PecaPropria = {
    t: 'propria',
    nome: 'banco-declinado',
    fixa: b,
    desenhar(C, M, o) {
      const X: V3 = [1, 0, 0];
      const atras = { dz: ATRAS };
      const zCab = E.cabeca[2] - 6,
        zPes = E.zPoste + 10;
      const bl = g('larg') / 2 - 4;
      // o chão: a viga do meio e as travessas das duas pontas, com os pés de borracha
      C.tubo([x0, tubo / 2, zCab], [x0, tubo / 2, zPes], tubo, tubo, M.metal, atras);
      for (const z of [zCab, zPes]) {
        C.tubo([x0 - bl, tubo / 2, z], [x0 + bl, tubo / 2, z], tubo, tubo, M.metal, atras);
        for (const s of [-1, 1]) C.cilindro([x0 + s * (bl - 2), 0, z], [x0 + s * (bl - 2), 1.2, z], 3.4, M.borracha, { lados: 12, ...atras });
      }
      // a coluna do pivô, o pivô e a escada de furos (o ângulo); o pé da cabeça
      C.tubo([x0, tubo, E.pivo[2]], add(E.pivo, [0, -3, 0]), 7, 7, M.metal, atras);
      C.cilindro(add(E.pivo, [-6, -2, 0]), add(E.pivo, [6, -2, 0]), 2.4, M.cromo, { lados: 12, ...atras });
      const escadaA: V3 = [x0, tubo, E.pivo[2] - 22],
        escadaB = E.baixo(E.comp * 0.72);
      C.tubo(escadaA, escadaB, 5, 5, M.metal, { up: X, ...atras });
      C.tubo([x0, tubo, E.cabeca[2]], E.cabeca, 6, 6, M.metal, atras);
      // a viga debaixo do encosto, da ponta dos pés ao pé da cabeça
      C.tubo(E.baixo(4), E.baixo(E.comp - 6), tubo, tubo * 0.8, M.metal, { up: X, ...atras });
      // o encosto
      C.estofado(add(b.ponta, mul(E.d, E.comp / 2)), E.d, E.n, X, E.comp, E.esp, g('encostoLarg'), M.estofado, { dz: ATRAS });
      // o poste das pernas, o braço dos tornozelos, a ligação com a viga do encosto e os rolos
      // o poste sobe até os rolos dos joelhos (entre as pernas); os rolos dos tornozelos se prendem neles por duas
      // chapas de lado, por fora das pernas
      C.tubo([x0, tubo, E.zPoste], [x0, b.joelho[1], E.zPoste], 6, 6, M.metal);
      const fora = 2 + g('roloComp') + 1.5;
      for (const s of [-1, 1]) C.tubo(add(b.joelho, [s * fora, 0, 0]), add(b.tornozelo, [s * fora, 0, 0]), 1.5, 4, M.metal, { up: X });
      C.tubo(E.baixo(4), [x0, E.baixo(4)[1] - 4, E.zPoste], 5, 5, M.metal, { up: X, ...atras });
      for (const c of [b.joelho, b.tornozelo]) C.cilindro(add(c, [-(3 + g('roloComp')), 0, 0]), add(c, [3 + g('roloComp'), 0, 0]), 1.4, M.cromo, { lados: 10 });
      for (const r of rolosDoDeclinado(b)) C.cilindro(r.a, r.b, r.r, M.estofado, { lados: 22 });
      if (o.comSombra) C.sombra(x0, (zCab + zPes) / 2, bl + 4, (zPes - zCab) / 2 + 6, 0.18);
    },
  };
  return { prims, peca };
}

/** Os extremos do banco desenhado (cm): para a folha conferir o tamanho total contra a ficha. */
export function extremosDoDeclinado(b: BancoDeclinado) {
  const E = estrutura(b);
  const zCab = Math.min(E.cabeca[2] - 6, b.ponta[2] + E.d[2] * E.comp) - g('tubo') / 2;
  const zPes = Math.max(E.zPoste + 10, b.tornozelo[2] + g('roloDiam') / 2) + g('tubo') / 2;
  return { comp: zPes - zCab, larg: g('larg'), alto: Math.max(b.joelho[1], b.tornozelo[1]) + g('roloDiam') / 2 };
}
