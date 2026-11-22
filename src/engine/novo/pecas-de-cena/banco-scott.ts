// Peça de cena: o banco Scott (a rosca Scott). Medidas em ../dados/objetos/banco-scott.json: o ângulo da almofada dos
// braços (45°), o tamanho dela (61 × 30,5 × 5 cm) e do assento (23 × 30,5 × 5 cm) e as faixas de regulagem da altura
// do assento (47 a 62 cm) e da almofada (84 a 109 cm) vêm da ficha da Deltech DF308; o tamanho total da Precor
// DBR0202, da Life Fitness LBR-BC e da Hammer Strength FW-AC fica ao lado, para comparar. O que nenhuma ficha lida dá
// (a distância do assento à almofada, onde fica o poste, o suporte da barra) é de desenho, com o motivo.
//
// Parte do cartão de hoje (scripts/desenhos-equipamento/realista/aparelhos.mjs, `bancoScott`): a base em tubo no chão,
// o assento num poste que regula (o tubo cromado com os furos e o pino), a almofada inclinada sobre um poste que sobe
// de viés da frente da base (as canelas ficam dos dois lados dele) e os dois ganchos do suporte da barra na frente.
//
// A máquina funciona: o assento sobe e desce no poste dele; a almofada sobe e desce num tubo em pé, preso no alto do
// poste de viés (o tubo cromado corre na luva); os ganchos seguram a barra W nos trechos retos, abaixo do caminho dela.
//
// Eixos: x de lado a lado (o meio do banco em x0); quem senta olha para +z; a almofada desce de costas para quem senta,
// para a frente (+z). `topo` é o meio da borda de cima da face da almofada (onde os braços deitam).
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('bancoScott', id);
const rad = Math.PI / 180;
/** Quanto o assento e o poste dele vão para trás na pintura (cm): a pessoa senta por cima. */
const ATRAS = 50;
/** Quanto o poste da almofada vai para trás na pintura (cm): ele fica entre as pernas de quem senta. */
const DENTRE = 14;

export interface BancoScott {
  /** O meio da borda de cima da face da almofada, no mundo (cm): x é o meio do banco. */
  topo: V3;
  /** A altura do tampo do assento (cm, do chão): uma regulagem do banco (47 a 62 cm). */
  assento: number;
}

/** A face da almofada: o meio da borda de cima, a direção que desce por ela (para +z), a normal (para cima e para +z). */
export function faceDaAlmofada(b: BancoScott): { topo: V3; d: V3; n: V3; comp: number; larg: number; esp: number } {
  const a = g('almofadaAngulo') * rad;
  return { topo: b.topo, d: [0, -Math.sin(a), Math.cos(a)], n: [0, Math.cos(a), Math.sin(a)], comp: g('almofadaComp'), larg: g('almofadaLarg'), esp: g('almofadaEsp') };
}
/**
 * O centro da almofada (o meio da caixa dela). É também o ponto pelo qual o gerador ordena a pintura da almofada: a
 * regra banco-scott-bracos-na-almofada compara com ele a profundidade dos braços, que têm de ser pintados por cima.
 */
export function centroDaAlmofada(b: BancoScott): V3 {
  const F = faceDaAlmofada(b);
  return add(add(F.topo, mul(F.d, F.comp / 2)), mul(F.n, -F.esp / 2));
}
/** A altura da almofada na regulagem (a borda de cima, cm do chão). */
export const alturaDaAlmofada = (b: BancoScott) => b.topo[1];
/** O meio do tampo do assento. */
export const centroDoAssento = (b: BancoScott): V3 => [b.topo[0], b.assento, b.topo[2] - g('assentoAteAlmofada')];
/** Onde o poste de viés da almofada encontra o chão (o meio da travessa da frente). */
const peDoPoste = (b: BancoScott): V3 => [b.topo[0], g('tubo') / 2, b.topo[2] + g('posteAFrente')];

/** Os pontos que montam a estrutura: o pé do poste de viés, o alto dele (a luva do tubo em pé) e o fim do tubo em pé. */
function postes(b: BancoScott) {
  const F = faceDaAlmofada(b);
  // o tubo em pé termina na face de baixo da almofada, perto da borda de baixo dela (mais para a frente, longe do colo
  // de quem senta); a luva fica logo abaixo, acima das coxas
  const baixoDaAlmofada = add(add(F.topo, mul(F.d, F.comp - 3)), mul(F.n, -F.esp));
  const luva: V3 = [b.topo[0], baixoDaAlmofada[1] - 12, baixoDaAlmofada[2]];
  return { baixoDaAlmofada, luva, pe: peDoPoste(b) };
}

/** Uma caixa da conferência entre dois pontos (o eixo y da caixa ao longo do segmento). */
function caixaEntre(a: V3, b: V3, meiaLarg: number, meiaProf: number, cls: string): Prim {
  const y = norm(sub(b, a));
  const x: V3 = [1, 0, 0];
  const z = norm([0, -y[2], y[1]]);
  const comp = Math.hypot(...sub(b, a));
  return { t: 'caixa', ref: { o: mul(add(a, b), 0.5), x, y, z }, meias: [meiaLarg, comp / 2, meiaProf], cls, vies: -0.7 };
}

/** Os ganchos do suporte da barra: o alto de cada um (x = ±suporteX), à frente, sobre a travessa da frente. */
export function ganchosDoSuporte(b: BancoScott): V3[] {
  const pe = peDoPoste(b);
  return [-1, 1].map((s) => [b.topo[0] + s * g('suporteX'), g('suporteAltura'), pe[2]] as V3);
}

export function bancoScott(b: BancoScott): { prims: Prim[]; peca: PecaPropria } {
  const F = faceDaAlmofada(b);
  const tubo = g('tubo');
  const S = centroDoAssento(b);
  const P = postes(b);
  const zTras = S[2] - g('assentoComp') / 2 - 4;
  const prims: Prim[] = [];
  // a almofada dos braços e o assento (a conferência vê os dois como estofado)
  prims.push({ t: 'caixa', ref: { o: add(add(F.topo, mul(F.d, F.comp / 2)), mul(F.n, -F.esp / 2)), x: [1, 0, 0], y: F.n, z: F.d }, meias: [F.larg / 2, F.esp / 2, F.comp / 2], cls: 'estofado', vies: 0.5 });
  prims.push({ t: 'caixa', ref: { o: [S[0], S[1] - g('assentoEsp') / 2, S[2]], x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] }, meias: [g('assentoLarg') / 2, g('assentoEsp') / 2, g('assentoComp') / 2], cls: 'estofado', vies: 0.5 });
  // a estrutura: a viga do chão, o poste do assento, o poste de viés e o tubo em pé da almofada, os ganchos
  prims.push(caixaEntre([S[0], tubo / 2, zTras], [S[0], tubo / 2, P.pe[2] + tubo / 2], tubo / 2, tubo / 2, 'esc'));
  prims.push(caixaEntre([S[0], tubo, S[2]], [S[0], S[1] - g('assentoEsp'), S[2]], tubo / 2, tubo / 2, 'esc'));
  prims.push(caixaEntre(P.pe, P.luva, tubo / 2, tubo / 2, 'esc'));
  prims.push(caixaEntre(P.luva, P.baixoDaAlmofada, tubo / 2.6, tubo / 2.6, 'esc'));
  for (const h of ganchosDoSuporte(b)) prims.push(caixaEntre([h[0], tubo, h[2]], h, 2, 2, 'esc'));

  const peca: PecaPropria = {
    t: 'propria',
    nome: 'banco-scott',
    fixa: b,
    desenhar(C, M, o) {
      const X: V3 = [1, 0, 0],
        Y: V3 = [0, 1, 0];
      const x0 = b.topo[0];
      const bl = g('baseLarg') / 2;
      const sx = g('suporteX');
      // o chão: a viga do meio, a travessa de trás (com os pés de borracha) e a da frente, que vai até os ganchos
      C.tubo([x0, tubo / 2, zTras], [x0, tubo / 2, P.pe[2]], tubo, tubo, M.metal, { dz: ATRAS });
      C.tubo([x0 - bl, tubo / 2, zTras], [x0 + bl, tubo / 2, zTras], tubo, tubo, M.metal, { dz: ATRAS });
      C.tubo([x0 - sx - 3, tubo / 2, P.pe[2]], [x0 + sx + 3, tubo / 2, P.pe[2]], tubo, tubo, M.metal);
      for (const [x, z] of [[x0 - bl + 3, zTras], [x0 + bl - 3, zTras], [x0 - sx, P.pe[2]], [x0 + sx, P.pe[2]]] as [number, number][])
        C.cilindro([x, 0, z], [x, 1.2, z], 3.4, M.borracha, { lados: 12 });
      // o poste do assento: a luva de aço, o tubo cromado com os furos e o pino
      const yLuvaA = Math.min(36, S[1] - g('assentoEsp') - 8);
      C.tubo([x0, tubo, S[2]], [x0, yLuvaA, S[2]], 6.5, 6.5, M.metal, { dz: ATRAS });
      C.tubo([x0, yLuvaA, S[2]], [x0, S[1] - g('assentoEsp'), S[2]], 5, 5, M.cromo, { dz: ATRAS });
      const furosA: V3[] = [];
      for (let y = yLuvaA + 4; y < S[1] - g('assentoEsp') - 2; y += 5) furosA.push([x0, y, S[2] - 2.6]);
      if (furosA.length) C.furos(furosA, X, Y, 0.8, { dz: ATRAS });
      C.cilindro([x0, yLuvaA - 3, S[2] - 3.3], [x0, yLuvaA - 3, S[2] - 7.5], 1.2, M.borracha, { lados: 10, dz: ATRAS });
      C.estofado([S[0], S[1] - g('assentoEsp'), S[2]], [0, 0, 1], Y, X, g('assentoComp'), g('assentoEsp'), g('assentoLarg'), M.estofado, { dz: ATRAS });
      // o poste de viés, da travessa da frente até a luva; o tubo cromado em pé que sobe da luva até a almofada
      // (entre as pernas: um pouco para trás na pintura, para a perna de perto ficar por cima dele)
      const entre = { dz: DENTRE };
      C.tubo(P.pe, P.luva, 7, 7, M.metal, { up: X, ...entre });
      C.tubo(add(P.luva, [0, -4, 0]), add(P.luva, [0, 6, 0]), 7.5, 7.5, M.metal, entre);
      C.tubo(add(P.luva, [0, 6, 0]), P.baixoDaAlmofada, 5, 5, M.cromo, entre);
      const furosB: V3[] = [];
      for (let y = P.luva[1] + 9; y < P.baixoDaAlmofada[1] - 2; y += 3.5) furosB.push([x0, y, P.luva[2] - 2.6]);
      if (furosB.length) C.furos(furosB, X, Y, 0.8, entre);
      C.cilindro([x0, P.luva[1] + 2, P.luva[2] - 3.8], [x0, P.luva[1] + 2, P.luva[2] - 8], 1.2, M.borracha, { lados: 10, ...entre });
      // a almofada dos braços
      C.estofado(add(centroDaAlmofada(b), mul(F.n, -F.esp / 2)), F.d, F.n, X, F.comp, F.esp, F.larg, M.estofado);
      // os ganchos do suporte da barra: em pé na travessa da frente, com a ponta virada para cima (em J)
      for (const h of ganchosDoSuporte(b)) {
        C.tubo([h[0], tubo, h[2]], h, 4, 4, M.metal);
        C.tubo(h, add(h, [0, 0, -6]), 3.5, 3.5, M.metal);
        C.tubo(add(h, [0, 0, -6]), add(h, [0, 4, -6]), 3, 3, M.metal);
      }
      if (o.comSombra) C.sombra(x0, (zTras + P.pe[2]) / 2, Math.max(bl, sx) + 4, (P.pe[2] - zTras) / 2 + 6, 0.18);
    },
  };
  return { prims, peca };
}

/** Os extremos do banco desenhado (cm): para a folha conferir o tamanho total contra a ficha. */
export function extremosDoBancoScott(b: BancoScott) {
  const S = centroDoAssento(b),
    P = postes(b);
  const zTras = S[2] - g('assentoComp') / 2 - 4 - g('tubo') / 2;
  return { comp: P.pe[2] + g('tubo') / 2 - zTras, larg: 2 * (g('suporteX') + 3), alto: b.topo[1] };
}
