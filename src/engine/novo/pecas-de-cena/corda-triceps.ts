// Peça de cena: a corda de tríceps presa ao cabo da polia (dois ramos de corda de náilon que saem de uma bucha no
// meio, cada um com uma ponta de borracha). As medidas são as da tabela (../dados/objetos/corda-triceps.json). Cada
// mão fecha em volta de um ramo, perto da ponta: a ponta de borracha fica do lado do dedo mínimo e a corda sai pelo
// lado do polegar, para a bucha. Os ramos ficam esticados (o cabo puxa a bucha para a polia), retos da
// mão até a bucha. O desenho é o do gerador realista: a corda em cilindros com luz, a ponta e a bucha em volume.
import type { Prim } from '../desenho';
import type { Materiais } from '../equipamento';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import { mix } from '../realista/base.mjs';
import type { CenaRealista, Material } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, dist, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('cordaTriceps', id);
/** O náilon da corda: preto fosco (sombra, meio, luz, traço), clareado no tema escuro como o grafite. */
const NAILON: Material = ['#16181B', '#2C3036', '#59606A', '#0A0B0D'];
const nailon = (tema: 'claro' | 'escuro'): Material => (tema === 'claro' ? NAILON : NAILON.map((t) => mix(t, '#aeb8c2', 0.38)));

export interface CordaMontada {
  /** A bucha do meio (onde o cabo prende). */
  bucha: V3;
  /**
   * Para cada mão: a ponta de borracha (de junto da mão para fora), o ponto em que a corda entra no punho (do lado do
   * dedo mínimo, junto da ponta) e o ponto em que ela sai (do lado do polegar, para a bucha).
   */
  ramos: { ponta: [V3, V3]; entra: V3; sai: V3 }[];
}

/**
 * A corda para as duas pegadas (centros das mãos fechadas). Cada ramo vai reto do centro da mão até a bucha, esticado
 * (o cabo puxa a bucha para a polia): a bucha fica a `ramo − ponta − meia mão` cm de cada pegada, no plano do meio entre
 * as mãos, do lado da `polia`. A corda atravessa o punho nessa mesma linha, e a ponta de borracha fica do lado de fora
 * do dedo mínimo.
 */
export function montarCorda(pegadas: V3[], larguraDaMao: number, polia: V3): CordaMontada {
  const pc = g('pontaComp');
  const livre = g('ramo') - pc - larguraDaMao / 2;
  const [a, b] = pegadas as [V3, V3];
  const meio = mul(add(a, b), 0.5),
    meia = dist(a, b) / 2;
  const eixo = norm(sub(b, a));
  const para = norm(perp(sub(polia, meio), eixo));
  const bucha = add(meio, mul(para, Math.sqrt(Math.max(0, livre * livre - meia * meia))));
  const ramos = pegadas.map((p) => {
    const u = norm(sub(bucha, p));
    const entra = add(p, mul(u, -larguraDaMao / 2)),
      sai = add(p, mul(u, larguraDaMao / 2));
    return { ponta: [entra, add(entra, mul(u, -pc))] as [V3, V3], entra, sai };
  });
  return { bucha, ramos };
}

export function cordaTriceps(c: CordaMontada): { prims: Prim[]; peca: PecaPropria } {
  const r = g('diam') / 2,
    rp = g('pontaDiam') / 2;
  const prims: Prim[] = [];
  for (const ramo of c.ramos) {
    prims.push({ t: 'volume', vol: cilindro(ramo.sai, c.bucha, r), cls: 'esc', vies: -0.5 });
    prims.push({ t: 'volume', vol: cilindro(ramo.ponta[0], ramo.ponta[1], rp), cls: 'esc', vies: -0.5 });
  }
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'corda-triceps',
    desenhar(C: CenaRealista, M: Materiais, o) {
      const N = nailon(o.tema);
      for (const ramo of c.ramos) {
        // o trecho dentro da mão vai para trás na pintura (a mão fica por cima); o resto, da mão até a bucha
        C.cilindro(ramo.entra, ramo.sai, r, N, { lados: 10, dz: 6 });
        C.cilindro(ramo.sai, c.bucha, r, N, { lados: 10 });
        C.cilindro(ramo.ponta[0], ramo.ponta[1], rp, M.borracha, { lados: 12 });
      }
      // a bucha do meio, de metal, atravessada pelos dois ramos
      const a = c.ramos[0]!.sai,
        b = c.ramos[1]!.sai;
      const eixo = norm(sub(b, a));
      C.cilindro(add(c.bucha, mul(eixo, -g('anelDiam') / 2)), add(c.bucha, mul(eixo, g('anelDiam') / 2)), g('anelDiam') / 2, M.cromo, { lados: 12 });
    },
  };
  return { prims, peca };
}
