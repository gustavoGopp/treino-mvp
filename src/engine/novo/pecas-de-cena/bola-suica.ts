// A bola suíça (bola de exercício), peça de cena do motor novo. As medidas vêm da tabela de objetos
// (../dados/objetos/bola-suica.json). A bola é uma esfera achatada embaixo, onde encosta no chão (ela amassa um pouco
// com o peso das pernas), e rola: uma costura (um meridiano) gira com ela, para o giro aparecer.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { mix } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

/** Um cinza azulado que tira a força da cor de ação: a bola é grande no quadro e não pode roubar a atenção do corpo. */
const CINZA = '#aab0c4';
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();

/** As medidas da bola: o raio, quanto ela amassa e a altura do centro (cm). */
export function formaDaBola() {
  const R = obj('bolaSuica', 'diam') / 2,
    amassa = obj('bolaSuica', 'amassa');
  return { R, amassa, alturaDoCentro: R - amassa };
}

/**
 * A bola com o centro em (x, z) no chão, girada `giro` radianos em torno do eixo x (o quanto rolou). Devolve a esfera
 * para a conferência e a peça para o desenho.
 */
export function bolaSuica(x: number, z: number, giro: number): { prims: Prim[]; peca: PecaPropria; centro: V3 } {
  const B = formaDaBola();
  const centro: V3 = [x, B.alturaDoCentro, z];
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'bolaSuica',
    desenhar(C, M, o) {
      const c = C.P(centro),
        chao = C.P([x, 0, z]);
      // as pontas da bola nos três eixos: é por elas que o quadro sabe o tamanho da peça (o enquadramento)
      for (const d of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, -1]] as V3[]) C.P(add(centro, mul(d, B.R)));
      // A bola, como o kettlebell dos cartões (equipamento.ts): uma esfera vista de qualquer lado é um círculo, liso,
      // com a luz de cima e da esquerda (gradiente radial na tela, igual em todas as vistas) e um brilho. De lado, o chão
      // corta a parte de baixo numa corda reta (onde ela amassa); de cima, o chão fica atrás dela e o círculo é inteiro.
      const dx = chao[0] - c[0],
        dy = chao[1] - c[1],
        ate = Math.hypot(dx, dy);
      const corta = ate < B.R - 0.05 && ate > B.R * 0.5;
      const g = C.uid('bola');
      // a cor de ação do app, a do estofado do banco ([3] é o traço, [2] o tom mais claro), clareada para não dominar
      const tons = M.estofado;
      C.defs.push(`<radialGradient id="${g}" cx="${f1(c[0] - B.R * 0.38)}" cy="${f1(c[1] - B.R * 0.42)}" r="${f1(B.R * 1.45)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${mix(mix(tons[2]!, '#ffffff', 0.45), CINZA, 0.3)}"/><stop offset="0.45" stop-color="${mix(mix(tons[2]!, '#ffffff', 0.08), CINZA, 0.3)}"/><stop offset="1" stop-color="${mix(tons[1]!, CINZA, 0.3)}"/></radialGradient>`);
      let forma: string;
      if (corta) {
        // a corda do chão, nos pontos da tela (sem grupo girado: o gradiente fica nas coordenadas da tela)
        const ux = dx / ate,
          uy = dy / ate,
          meiaCorda = Math.sqrt(B.R * B.R - ate * ate);
        const p1 = [c[0] + ux * ate - uy * meiaCorda, c[1] + uy * ate + ux * meiaCorda],
          p2 = [c[0] + ux * ate + uy * meiaCorda, c[1] + uy * ate - ux * meiaCorda];
        forma = `<path d="M${f1(p1[0]!)} ${f1(p1[1]!)}A${f1(B.R)} ${f1(B.R)} 0 1 1 ${f1(p2[0]!)} ${f1(p2[1]!)}Z" fill="url(#${g})" stroke="${tons[3]}" stroke-width="0.5"/>`;
      } else forma = `<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(B.R)}" fill="url(#${g})" stroke="${tons[3]}" stroke-width="0.5"/>`;
      // a costura: o meridiano que passa pelo eixo x, girado com a bola; só a metade virada para quem olha
      const pts: string[] = [];
      for (let i = 0; i <= 48; i++) {
        const th = (i / 48) * 2 * Math.PI;
        const d: V3 = [Math.cos(th), Math.sin(th) * Math.cos(giro), Math.sin(th) * Math.sin(giro)];
        const p = add(centro, mul(d, B.R * 0.995));
        if (p[1] < 0.2) continue;
        const q = C.P(p);
        if (q[2] <= c[2] + 0.01) pts.push(`${f1(q[0])},${f1(q[1])}`);
        else if (pts.length && pts[pts.length - 1] !== '|') pts.push('|');
      }
      const trechos = pts.join(' ').split('|').map((s) => s.trim()).filter((s) => s.split(' ').length > 1);
      const costura = trechos.map((s) => `<polyline points="${s}" fill="none" stroke="${tons[0]}" stroke-width="0.5" opacity="0.28"/>`).join('');
      // o brilho, parado (a luz não gira com a bola)
      const brilho = `<ellipse cx="${f1(c[0] - B.R * 0.4)}" cy="${f1(c[1] - B.R * 0.42)}" rx="${f1(B.R * 0.2)}" ry="${f1(B.R * 0.12)}" transform="rotate(-35 ${f1(c[0] - B.R * 0.4)} ${f1(c[1] - B.R * 0.42)})" fill="#fff" opacity="0.35"/>`;
      // pintada na profundidade da parte de trás da bola: o que apoia nela (os pés, as pernas) fica por cima
      C.bruto(c[2] + B.R * 0.9, forma + costura + brilho);
      // a esfera, para a conferência da pintura (não muda o desenho)
      C.geo({ esfera: centro, r: B.R });
      if (o.comSombra) C.sombra(x, z, B.R * 0.8, B.R * 0.8, 0.18);
    },
  };
  return { prims: [{ t: 'esfera', c: centro, r: B.R, cls: 'esc' }], peca, centro };
}
