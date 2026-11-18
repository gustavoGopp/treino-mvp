// Utilidades dos exercícios com a barra longa encostada no corpo (nas costas, no peito, nos ombros): a folga entre a
// barra e a pele do Boneco, medida na superfície desenhada. A barra é um cilindro (o raio da pegada da tabela) ao longo
// do eixo dela; só conta a parte da barra entre as mãos (de fora das mãos em diante ela não encosta no tronco).
import { pontosDoBoneco } from '../boneco';
import type { Esq } from '../esqueleto';
import { resolver1 } from '../movimento';
import { obj } from '../tabelas';
import { cross, dot, len, norm, sub } from '../vec';
import type { V3 } from '../vec';

/**
 * Onde a barra encosta no corpo vindo de fora: anda de `de` (longe do corpo) para `ate` (dentro dele) em passos de
 * `passo` até a folga chegar a zero, e acha o ponto exato entre o último passo de fora e o primeiro de dentro. A folga
 * medida na pele não tem sinal (de dentro do corpo a pele também fica longe do eixo da barra): por isso a busca vem
 * sempre de fora.
 */
export function primeiroToque(folga: (x: number) => number, de: number, ate: number, passo = 0.5): number {
  const s = Math.sign(ate - de);
  let fora = de;
  for (let x = de; s * (ate - x) >= 0; x += s * passo) {
    if (folga(x) <= 0) return resolver1(folga, fora, x, 20);
    fora = x;
  }
  throw new Error('a barra não encosta no corpo no caminho pedido');
}

/** O raio da pegada da barra longa. */
export const raioDaBarra = () => obj('barraLonga', 'pegadaDiam') / 2;

/**
 * A menor folga (cm) entre a superfície da barra (centro `c`, eixo `eixo`) e a pele das partes pedidas, contando só a
 * barra até `meia` cm do meio para cada lado. Negativa = a barra entra no corpo.
 */
export function folgaDaBarra(e: Esq, c: V3, eixo: V3, partes: string[], meia: number): { folga: number; parte: string } {
  const u = norm(eixo);
  let min = 1e9,
    qual = '';
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!partes.includes(parte)) continue;
    const d = sub(p, c);
    if (Math.abs(dot(d, u)) > meia) continue;
    const r = len(cross(d, u)) - raioDaBarra();
    if (r < min) {
      min = r;
      qual = parte;
    }
  }
  return { folga: min, parte: qual };
}
