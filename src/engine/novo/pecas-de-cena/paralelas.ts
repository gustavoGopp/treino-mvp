// Peça de cena: as paralelas de chão (estação de paralelas), para a elevação de joelhos nas paralelas. Partes, como no
// cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `paralelas`): duas barras cromadas com as pontas
// emborrachadas, cada uma num montante de tubo, sobre uma base de tubo no chão. Medidas em
// ../dados/objetos/paralelas.json.
//
// As barras correm ao longo de z, em x = ±vão/2, com o centro na altura da tabela. A pessoa fica entre elas, olhando
// para +z, com as mãos em z = zMaos; os montantes ficam atrás das mãos e as barras passam à frente delas.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { REF0 } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('paralelas', id);
export const alturaDasParalelas = () => g('altura');
export const raioDasParalelas = () => g('diam') / 2;
export const meioVaoDasParalelas = () => g('vao') / 2;

const caixa = (o: V3, meias: V3, cls: string, vies: number): Prim => ({ t: 'caixa', ref: { ...REF0, o }, meias, cls, vies });

/** Onde ficam os montantes, atrás das mãos, e as pontas das barras, à frente (cm em z). */
function medidas(zMaos: number) {
  const zM = zMaos - 22;
  return { zM, zFim: zM + g('barraComp'), zBase: zM + 18 };
}

/** O eixo de cada barra (de onde ela sai do montante até a ponta), lado direito (x < 0) e esquerdo. */
export function eixosDasParalelas(zMaos: number): Record<'R' | 'L', [V3, V3]> {
  const { zM, zFim } = medidas(zMaos),
    H = g('altura'),
    m = g('vao') / 2;
  return { R: [[-m, H, zM], [-m, H, zFim]], L: [[m, H, zM], [m, H, zFim]] };
}

export function paralelas(zMaos: number): { prims: Prim[]; peca: PecaPropria; estrutura: PecaPropria } {
  const H = g('altura'),
    r = g('diam') / 2,
    m = g('vao') / 2,
    tl = g('tuboLarg'),
    tp = g('tuboProf');
  const { zM, zFim, zBase } = medidas(zMaos);
  const prims: Prim[] = [];
  for (const s of [-1, 1]) {
    prims.push(caixa([s * m, H, (zM + zFim) / 2], [r, r, (zFim - zM) / 2], 'barra', -1));
    prims.push(caixa([s * m, H / 2, zM], [tl / 2, H / 2, tp / 2], 'esc', -40));
  }
  // as barras e o alto dos montantes: o equipamento do exercício, que entra no enquadramento
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'paralelas',
    fixa: [zMaos],
    desenhar(C, M) {
      for (const s of [-1, 1]) {
        const x = s * m;
        C.tubo([x, H - r - 1, zM], [x, H - r - 12, zM], tl, tp, M.metal, { up: [0, 0, 1] });
        // a barra: o trecho do meio, emborrachado debaixo da mão (um pouco atrás na pintura: a mão fecha por cima), e o
        // resto cromado, com uma tampa de borracha na ponta
        C.cilindro([x, H, zM - 3], [x, H, zMaos - 8], r, M.cromo, { lados: 14 });
        C.cilindro([x, H, zMaos - 8], [x, H, zMaos + 8], r + 0.15, M.borracha, { lados: 14, dz: 6 });
        C.cilindro([x, H, zMaos + 8], [x, H, zFim - 1.5], r, M.cromo, { lados: 14 });
        C.cilindro([x, H, zFim - 1.5], [x, H, zFim], r + 0.3, M.borracha, { lados: 14 });
      }
    },
  };
  // o resto da estrutura (os montantes até o chão e a base): cenário, atrás do corpo e fora do enquadramento, para o
  // corpo não encolher no quadro (os pés ficam a meio metro do chão)
  const estrutura: PecaPropria = {
    t: 'propria',
    nome: 'estrutura das paralelas',
    cenario: true,
    fixa: [zMaos],
    desenhar(C, M, o) {
      const larg = g('larg') / 2,
        comp = g('comp') / 2;
      // a base: um quadro de tubo no chão, com pés de borracha nos cantos
      const base = (a: V3, b: V3) => C.tubo(a, b, tl, 4, M.metal, { up: [0, 1, 0] });
      for (const s of [-1, 1]) base([s * larg, 2, zBase - comp], [s * larg, 2, zBase + comp]);
      for (const z of [zBase - comp, zBase + comp]) base([-larg, 2, z], [larg, 2, z]);
      for (const sx of [-1, 1]) for (const z of [zBase - comp + 3, zBase + comp - 3]) C.cilindro([sx * (larg - 2), 0, z], [sx * (larg - 2), 1.2, z], 3, M.borracha, { lados: 10 });
      for (const s of [-1, 1]) {
        const x = s * m;
        // o montante, de debaixo da barra até um tubo que desce aberto para fora até a base, e o braço da frente
        C.tubo([x, H - r - 12, zM], [x, 30, zM], tl, tp, M.metal, { up: [0, 0, 1] });
        C.tubo([x, 30, zM], [s * larg, 3, zM], tl, tp * 0.8, M.metal, { up: [0, 0, 1] });
        C.tubo([x, 30, zM], [x, 30, zBase + comp], tl * 0.8, 4, M.metal, { up: [0, 1, 0] });
        C.tubo([x, 30, zBase + comp], [s * larg, 3, zBase + comp], tl * 0.8, 4, M.metal, { up: [0, 0, 1] });
      }
      if (o.comSombra) C.sombra(0, zBase, larg, comp, 0.16);
    },
  };
  return { prims, peca, estrutura };
}
