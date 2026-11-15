// Peça de cena: o triângulo de remada (pegada fechada e neutra) preso ao cabo da polia. As medidas são as da tabela
// (../dados/objetos/triangulo-remada.json): duas pegadas paralelas, a 15,2 cm uma da outra (de centro a centro), presas
// em cima e embaixo por duas chapas em triângulo; na ponta do triângulo, um pino curto onde o mosquetão do cabo prende.
// Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `acessorio_polia_triangulo`: o quadro em
// V de aço com as pegadas de borracha nos cantos), com as chapas no lugar da barra de baixo: com as mãos nas pegadas,
// nada passa entre os punhos.
//
// Como ele fica na mão: as chapas ficam deitadas, com a ponta virada para a polia; as pegadas ficam em pé (a pegada
// neutra, palmas uma para a outra, polegar para cima). O cabo puxa a ponta: ele sai reto da roldana até o pino, na
// linha que passa pelo meio das duas pegadas.
import type { Prim } from '../desenho';
import type { Materiais } from '../equipamento';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import type { CenaRealista } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, cross, mul, norm, perp } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('trianguloRemada', id);

export interface TrianguloMontado {
  /** O meio do pino da ponta (onde o cabo prende). */
  ponta: V3;
  /** O centro de cada pegada (a mão direita na de −x, a esquerda na de +x) e o eixo delas (de baixo para cima). */
  pegadas: [V3, V3];
  eixo: V3;
  /** Da linha das pegadas para a ponta (para a polia) e de uma pegada à outra. */
  frente: V3;
  lado: V3;
}

/**
 * O triângulo com o meio das pegadas em `meio`, a ponta na direção `paraACabo` (da mão para a roldana) e as pegadas
 * na direção `cima` (endireitada para ficar perpendicular ao cabo).
 */
export function montarTriangulo(meio: V3, paraOCabo: V3, cima: V3 = [0, 1, 0]): TrianguloMontado {
  const frente = norm(paraOCabo);
  const eixo = norm(perp(cima, frente));
  // o lado vai da pegada direita (−x) para a esquerda (+x)
  const lado = norm(cross(eixo, frente));
  const h = g('entrePegadas') / 2;
  return { ponta: add(meio, mul(frente, g('prof'))), pegadas: [add(meio, mul(lado, -h)), add(meio, mul(lado, h))], eixo, frente, lado };
}

/** Os volumes (para a conferência) e o desenho realista do triângulo. */
export function trianguloRemada(t: TrianguloMontado): { prims: Prim[]; peca: PecaPropria } {
  const L = g('pegadaComp') / 2,
    r = g('pegadaDiam') / 2,
    e = g('placaEsp'),
    rp = g('pinoDiam') / 2;
  const ponta = (s: number) => add(t.ponta, mul(t.eixo, s * (L - e / 2)));
  const pega = (p: V3, s: number) => add(p, mul(t.eixo, s * L));
  const prims: Prim[] = [];
  for (const p of t.pegadas) prims.push({ t: 'volume', vol: cilindro(pega(p, -1), pega(p, 1), r), cls: 'aco', vies: -0.5 });
  // as duas chapas: um fio em triângulo por cima e por baixo (só para a conferência ver onde elas passam)
  for (const s of [-1, 1]) prims.push({ t: 'fio', pts: [add(t.pegadas[0], mul(t.eixo, s * (L - e / 2))), ponta(s), add(t.pegadas[1], mul(t.eixo, s * (L - e / 2)))], larg: 2.4, cls: 'aco', vies: -0.5 });
  prims.push({ t: 'volume', vol: cilindro(ponta(-1), ponta(1), rp), cls: 'aco', vies: -0.5 });
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'triangulo-remada',
    desenhar(C: CenaRealista, M: Materiais) {
      // as pegadas: aço recartilhado (um pouco para trás na pintura: a mão fica por cima)
      for (const p of t.pegadas) C.cilindro(pega(p, -1), pega(p, 1), r, M.cromo, { lados: 12, dz: 6 });
      // as chapas em triângulo, de cima e de baixo, com os cantos arredondados (o raio da pegada)
      for (const s of [-1, 1]) {
        const base = add(t.ponta, mul(t.eixo, s * L - (s > 0 ? e : 0)));
        // o perfil no plano da chapa: e1 = lado, e2 = para trás (da ponta para as pegadas)
        const tras = mul(t.frente, -1);
        const h = g('entrePegadas') / 2,
          pr = g('prof');
        const perfil: [number, number][] = [];
        const canto = (cx: number, cy: number, a0: number, a1: number) => {
          for (let i = 0; i <= 4; i++) {
            const a = a0 + ((a1 - a0) * i) / 4;
            perfil.push([cx + r * 1.2 * Math.cos(a), cy + r * 1.2 * Math.sin(a)]);
          }
        };
        canto(0, 0, Math.PI * 1.05, Math.PI * 1.95);
        canto(h, pr, -Math.PI * 0.3, Math.PI * 0.5);
        canto(-h, pr, Math.PI * 0.5, Math.PI * 1.3);
        C.prisma(perfil, base, t.lado, tras, mul(t.eixo, e), M.metal, { contorno: true });
      }
      // o pino da ponta, onde o mosquetão prende
      C.cilindro(ponta(-1), ponta(1), rp, M.cromo, { lados: 10 });
    },
  };
  return { prims, peca };
}
