// Peça de cena: o banco reto atravessado (o estofado ao longo de x, de um lado ao outro do corpo), para o hip thrust: a
// parte de cima das costas apoia na borda comprida dele. É o banco reto da tabela de objetos (`bancoReto` em
// ../dados/objetos.json) com o mesmo desenho de ../equipamento.ts (estofado com costura, viga e pés em T de tubo de
// aço, pés de borracha), girado um quarto de volta em torno da vertical. O banco reto de ../pecas.ts fica ao longo de z.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import type { V3 } from '../vec';

const g = (id: string) => obj('bancoReto', id);
const caixa = (o: V3, meias: V3, cls: string, vies: number): Prim => ({ t: 'caixa', ref: { o, x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] }, meias, cls, vies });

/** Onde fica o banco: o meio do estofado em x e em z. */
export interface BancoAtravessado {
  x0: number;
  z0: number;
}
/** A borda de cima do estofado do lado de +z (para onde ficam os pés no hip thrust), no meio do banco. */
export const bordaDoBanco = (b: BancoAtravessado): V3 => [b.x0, g('altura'), b.z0 + g('larg') / 2];

export function bancoAtravessado(b: BancoAtravessado): { prims: Prim[]; peca: PecaPropria } {
  const comp = g('comp'),
    larg = g('larg'),
    alt = g('altura'),
    est = g('estofado'),
    tubo = g('tubo'),
    baseL = g('baseLarg') / 2;
  const yBaixo = alt - est;
  const pe = (s: number) => b.x0 + s * (comp / 2 - 16);
  const prims: Prim[] = [caixa([b.x0, alt - est / 2, b.z0], [comp / 2, est / 2, larg / 2], 'estofado', 0.5), caixa([b.x0, yBaixo - tubo / 2, b.z0], [comp / 2 - 6, tubo / 2, tubo / 2], 'esc', -0.5)];
  for (const s of [-1, 1]) {
    prims.push(caixa([pe(s), (yBaixo - tubo) / 2, b.z0], [tubo / 2, (yBaixo - tubo) / 2, tubo / 2], 'esc', -0.6));
    prims.push(caixa([pe(s), tubo / 2, b.z0], [tubo / 2, tubo / 2, baseL], 'esc', -0.7));
  }
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'banco reto atravessado',
    fixa: [b.x0, b.z0],
    desenhar(C, M, o) {
      C.estofado([b.x0, yBaixo, b.z0], [1, 0, 0], [0, 1, 0], [0, 0, 1], comp, est, larg);
      C.tubo([b.x0 - comp / 2 + 6, yBaixo - tubo / 2, b.z0], [b.x0 + comp / 2 - 6, yBaixo - tubo / 2, b.z0], tubo, tubo, M.metal);
      for (const s of [-1, 1]) {
        const x = pe(s);
        C.tubo([x, tubo, b.z0], [x, yBaixo - tubo, b.z0], tubo, tubo, M.metal);
        C.tubo([x, tubo / 2, b.z0 - baseL], [x, tubo / 2, b.z0 + baseL], tubo, tubo, M.metal);
        for (const sz of [-1, 1]) C.cilindro([x, 0, b.z0 + sz * (baseL - 2)], [x, 1.2, b.z0 + sz * (baseL - 2)], 3.2, M.borracha, { lados: 10 });
      }
      if (o.comSombra) C.sombra(b.x0, b.z0, comp / 2 + 8, baseL, 0.18);
    },
  };
  return { prims, peca };
}
