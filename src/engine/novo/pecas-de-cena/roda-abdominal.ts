// A roda abdominal (uma roda com um eixo que atravessa e um pegador de cada lado), peça de cena do motor novo. As
// medidas vêm da tabela de objetos (../dados/objetos/roda-abdominal.json); o desenho parte do cartão de hoje
// (scripts/desenhos-equipamento/realista/itens.mjs, `roda_abdominal`): a banda de borracha, o cubo na cor de ação dos
// dois lados, o eixo cromado e os pegadores de borracha. A roda rola no chão sem escorregar: quem chama dá o giro (o
// quanto ela andou dividido pelo raio), e três furos no cubo giram com ela, para o giro aparecer. Os pegadores ficam
// parados nas mãos (a roda gira no eixo).
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { circulo } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add } from '../vec';
import type { V3 } from '../vec';

const o = (id: string) => obj('rodaAbdominal', id);
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();

/** As medidas que as animações usam: o raio, onde fica o centro de cada pegador (a partir do meio da roda) e o diâmetro dele. */
export function formaDaRoda() {
  const R = o('diam') / 2;
  const meioDoPegador = o('larg') / 2 + o('eixoLivre') + o('pegadorComp') / 2;
  return { R, meioDoPegador, pegadorDiam: o('pegadorDiam') };
}

/**
 * A roda com o eixo paralelo a x, encostada no chão em z = `z` (o centro fica no raio), girada `giro` radianos em torno
 * do eixo (positivo = rolando para +z). Devolve os volumes para a conferência, a peça e o centro.
 */
export function rodaAbdominal(z: number, giro: number): { prims: Prim[]; peca: PecaPropria; centro: V3 } {
  const { R } = formaDaRoda();
  const centro: V3 = [0, R, z];
  const meia = o('larg') / 2,
    ponta = o('comp') / 2,
    pegIni = meia + o('eixoLivre');
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'rodaAbdominal',
    desenhar(C, M, op) {
      const c = (x: number): V3 => [x, R, z];
      // o eixo cromado de ponta a ponta (por baixo dos pegadores) e os dois pegadores de borracha
      C.cilindro(c(-pegIni - 0.5), c(pegIni + 0.5), o('eixoDiam') / 2, M.cromo, { lados: 10, up: [0, 0, 1] });
      for (const s of [-1, 1]) {
        C.cilindro(c(s * pegIni), c(s * ponta), o('pegadorDiam') / 2, M.borracha, { lados: 14, up: [0, 0, 1] });
      }
      // a roda: a banda de borracha e o cubo colorido, um pouco mais largo, dos dois lados
      C.cilindro(c(-meia), c(meia), R, M.borracha, { lados: 32, up: [0, 0, 1] });
      const cubo = o('cuboDiam') / 2;
      C.cilindro(c(-meia - 0.4), c(meia + 0.4), cubo, M.estofado, { lados: 26, up: [0, 0, 1], dz: -0.3 });
      // os três furos de cada lado do cubo, que giram com a roda: pintados na face virada para quem olha
      for (const s of [-1, 1]) {
        const x = s * (meia + 0.45);
        const face = C.P(c(x)),
          dentro = C.P(c(0));
        // a face só aparece se fica mais perto de quem olha que o meio da roda (de frente, ela é um traço e não aparece)
        const perto = dentro[2] - face[2] > meia * 0.3;
        if (!perto) continue;
        let svg = '';
        for (let i = 0; i < 3; i++) {
          const a = giro + (i * 2 * Math.PI) / 3;
          const pc = add(c(x), [0, Math.cos(a) * cubo * 0.55, Math.sin(a) * cubo * 0.55]);
          const Q = circulo(cubo * 0.17, 10).map(([u, v]) => C.P(add(pc, [0, u, v])));
          svg += `<polygon points="${Q.map((q) => `${f1(q[0])},${f1(q[1])}`).join(' ')}" fill="${M.estofado[3]}" stroke="${M.estofado[0]}" stroke-width="0.3"/>`;
        }
        // a tampa do eixo no meio
        const T = circulo(o('eixoDiam') * 0.7, 12).map(([u, v]) => C.P(add(c(x), [0, u, v])));
        svg += `<polygon points="${T.map((q) => `${f1(q[0])},${f1(q[1])}`).join(' ')}" fill="${M.cromo[1]}" stroke="${M.cromo[3]}" stroke-width="0.3"/>`;
        C.bruto(face[2] - 0.6, svg);
      }
      if (op.comSombra) C.sombra(0, z, ponta * 0.8, R * 0.7, 0.18);
    },
  };
  // para a conferência: a roda como uma caixa achatada em volta do cilindro (as mãos e o eixo ficam de fora)
  const prims: Prim[] = [{ t: 'caixa', ref: { o: centro, x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] }, meias: [meia, R * 0.9, R * 0.9], cls: 'esc' }];
  return { prims, peca, centro };
}
