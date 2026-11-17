// Peça de cena: a barra reta curta da polia (20 pol), com a aba giratória no meio e o mosquetão onde o cabo prende.
// As medidas são as da tabela (../dados/objetos/polia-braco-barra-reta.json, Rogue Stainless Straight Lat Bar). As duas
// mãos fecham na barra; a aba e o mosquetão saem do meio da barra para o lado do cabo, na linha dele. O desenho é o do
// gerador realista: a barra de aço em cilindro com luz, a aba de aço e o mosquetão preto.
import type { Prim } from '../desenho';
import type { Materiais } from '../equipamento';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import type { CenaRealista } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('barraRetaPolia', id);

export interface BarraMontada {
  /** As duas pontas da barra, o meio, a ponta da aba e o ponto em que o cabo prende (a ponta do mosquetão). */
  a: V3;
  b: V3;
  meio: V3;
  aba: V3;
  ponta: V3;
}

/**
 * A barra com o meio em `meio`, ao longo de `eixo`, e a aba apontada para `polia` (perpendicular à barra): o cabo puxa
 * o mosquetão na linha dele.
 */
export function montarBarra(meio: V3, eixo: V3, polia: V3): BarraMontada {
  const u = norm(eixo),
    L = g('comp') / 2;
  const d = norm(perp(sub(polia, meio), u));
  const aba = add(meio, mul(d, g('abaAltura')));
  return { a: add(meio, mul(u, -L)), b: add(meio, mul(u, L)), meio, aba, ponta: add(aba, mul(d, g('mosquetao'))) };
}

export function barraReta(m: BarraMontada): { prims: Prim[]; peca: PecaPropria } {
  const r = g('diam') / 2;
  const prims: Prim[] = [
    { t: 'volume', vol: cilindro(m.a, m.b, r), cls: 'aco', vies: 0 },
    { t: 'fio', pts: [m.meio, m.aba, m.ponta], larg: 1.2, cls: 'fita', vies: -0.5 },
  ];
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'barra-reta-polia',
    desenhar(C: CenaRealista, M: Materiais) {
      // a barra (as mãos ficam por cima na pintura), a aba de aço e o mosquetão preto
      C.cilindro(m.a, m.b, r, M.cromo, { lados: 12, dz: 6 });
      C.cilindro(m.meio, m.aba, g('abaEsp') * 1.4, M.cromo, { lados: 8 });
      C.cilindro(m.aba, m.ponta, 0.55, M.borracha, { lados: 8 });
    },
  };
  return { prims, peca };
}
