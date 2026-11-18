// Regras medidas da remada alta na suspensão, com os cotovelos abertos (../exercicios/face-pull-suspensao.ts). Recebem
// os quadros do começo até o fim da puxada. Como o corpo fica inclinado para trás, "na altura" e "ao lado" se medem no
// tronco (no referencial do tórax), e não na vertical do mundo. As regras da fita e dos pés são as de ./suspensao.ts.
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import { paraRef } from '../vec';

const ultimo = <T>(q: T[]) => q[q.length - 1]!;
/** O cotovelo direito em relação ao ombro, no tórax: para o lado (para fora), para cima (ao longo do tronco) e para a frente. */
function cotoveloNoTronco(e: Esq) {
  const c = paraRef(e.torax, e.lado.R.cotovelo),
    o = paraRef(e.torax, e.lado.R.ombro);
  return { fora: Math.abs(c[0]) - Math.abs(o[0]), cima: c[1] - o[1], frente: c[2] - o[2] };
}

export const REGRAS_FACE_PULL_SUSPENSAO: Record<string, Regra> = {
  'face-pull-suspensao-maos-ao-lado-das-orelhas': (q) => {
    // ao lado: fora da largura da cabeça; das orelhas: perto da altura do trágio e, para a frente, até 12 cm (ainda ao
    // lado da cabeça, antes do rosto), tudo no tronco
    const e = ultimo(q).esq;
    const tr = paraRef(e.torax, e.cabeca.o);
    const m = paraRef(e.torax, e.lado.R.pegada),
      mL = paraRef(e.torax, e.lado.L.pegada);
    const meiaCabeca = e.corpo.m('cabeca.largura') / 2;
    const larg = Math.abs(m[0] - mL[0]),
      alt = m[1] - tr[1],
      frente = m[2] - tr[2];
    return { medido: `no fim, os centros das mãos ficam a ${f1(larg)} cm um do outro (a cabeça tem ${f1(2 * meiaCabeca)} cm de largura), ${f1(Math.abs(alt))} cm ${alt >= 0 ? 'acima' : 'abaixo'} do trágio e ${f1(frente)} cm à frente dele, no tronco`, ok: larg / 2 >= meiaCabeca + 3 && Math.abs(alt) <= 8 && frente >= -6 && frente <= 12 };
  },
  'face-pull-suspensao-cotovelos-altos-e-abertos': (q) => {
    // no fim, o cotovelo na altura do ombro ou acima (até 3 cm abaixo), bem para fora dele e na linha dos ombros; da
    // metade da puxada em diante, ele não desce muito abaixo do ombro
    const c = cotoveloNoTronco(ultimo(q).esq);
    const minimo = Math.min(...q.filter((_, i) => i > q.length / 2).map((x) => cotoveloNoTronco(x.esq).cima));
    return { medido: `no fim, no tronco, o cotovelo fica ${f1(Math.abs(c.cima))} cm ${c.cima >= 0 ? 'acima' : 'abaixo'} do centro do ombro, ${f1(c.fora)} cm para fora dele e ${f1(Math.abs(c.frente))} cm ${c.frente >= 0 ? 'à frente' : 'atrás'}; da metade da puxada em diante, no mínimo ${f1(minimo)} cm`, ok: c.cima >= -3 && c.fora >= 15 && Math.abs(c.frente) <= 10 && minimo >= -8 };
  },
};
