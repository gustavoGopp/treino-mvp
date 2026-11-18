// O núcleo comum dos exercícios de quadril em pé na polia baixa com a tornozeleira (o coice e a abdução): a coluna de
// polia aprovada (a mesma das animações de polia: ./polia-bracos.ts, ../pecas.ts) com a roldana no ponto mais baixo, a
// tornozeleira (../pecas-de-cena/tornozeleira.ts) na perna direita, que trabalha, e o cabo reto da ponta do mosquetão
// à roldana o tempo todo; a pilha sobe o que o cabo anda dividido pela relação da máquina. A perna que apoia, a mão na
// torre e o movimento ficam com cada exercício.
//
// O que se pede ao corpo nos dois: em pé num pé só (o esquerdo), com a pelve parada no ponto em que o centro de massa
// cai sobre o meio do pé de apoio; a perna direita livre, estendida, que gira no quadril.
import type { Prim } from '../desenho';
import type { Esq, PosePerna, Tronco } from '../esqueleto';
import type { Quadro } from '../movimento';
import { centroDaRoldana } from '../pecas';
import type { Peca, Torre } from '../pecas';
import { tornozeleira, tornozeleiraNaPerna } from '../pecas-de-cena/tornozeleira';
import { obj } from '../tabelas';
import { add, dirRef, girar, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { colunasECabos, compDoCabo } from './polia-bracos';

const rad = Math.PI / 180;

/**
 * A perna direita, livre: a coxa sai do quadril aberta `abre` graus para o lado e `flexao` graus para a frente (negativo
 * = para trás), no referencial da bacia; gira `giro` graus para fora; o joelho dobra `joelho` graus e o pé faz
 * `flexaoPlantar` graus com a canela (0 = em ângulo reto; positivo = a ponta para baixo).
 */
export function pernaLivreDireita(t: Tronco, o: { abre: number; flexao: number; giro: number; joelho: number; flexaoPlantar: number }): PosePerna {
  const a = o.abre * rad,
    fl = o.flexao * rad;
  // para baixo, aberta para −x (a perna direita) e para a frente da bacia
  const dir = norm(dirRef(t.pelve, [-Math.sin(a) * Math.cos(fl), -Math.cos(a) * Math.cos(fl), Math.sin(fl)]));
  // o joelho aponta para a frente da bacia; no giro para fora (perna direita), vira para −x
  const polo0 = norm(sub(t.pelve.z, mul(dir, t.pelve.z[0] * dir[0] + t.pelve.z[1] * dir[1] + t.pelve.z[2] * dir[2])));
  const polo = norm(girar(polo0, dir, o.giro));
  const k = o.joelho * rad;
  const canela = norm(sub(mul(dir, Math.cos(k)), mul(polo, Math.sin(k))));
  // o pé em relação à canela (a frente dela, e não a do joelho: com o joelho dobrado, as duas se separam)
  const pf = o.flexaoPlantar * rad;
  const frenteDaCanela = norm(perp(polo, canela));
  const peDir = norm(add(mul(frenteDaCanela, Math.cos(pf)), mul(canela, Math.sin(pf))));
  return { coxa: dir, canela, polo, peDir };
}

/** A coluna de polia com a roldana no ponto mais baixo do carrinho, no lugar pedido, virada para `frente`. */
export function torreBaixa(roldanaXZ: [number, number], frente: V3): Torre {
  const f = norm(frente);
  const t0: Torre = { base: [0, 0, 0], frente: f, alturaDaPolia: obj('torre', 'poliaMin') };
  const c0 = centroDaRoldana(t0);
  return { ...t0, base: [roldanaXZ[0] - c0[0], 0, roldanaXZ[1] - c0[2]] };
}

/** Onde o cabo começa (a ponta do mosquetão da tornozeleira na perna direita) e o comprimento dele até a roldana. */
export function caboNoTornozelo(e: Esq, t: Torre) {
  const tz = tornozeleiraNaPerna(e, 'R', centroDaRoldana(t));
  return { tz, comp: compDoCabo(t, tz.cabo) };
}

/**
 * A cena: a coluna (cortada em cima, como nas polias baixas aprovadas), a tornozeleira, o cabo e a pilha, que sobe o
 * curso do cabo desde `repouso` dividido pela relação da máquina, mais a folga. As marcas: as da coluna (`pilha`,
 * `cabo.ponta`, `cabo.saida`, `cabo.roldana`) e as da tornozeleira (`tornozeleira`: o centro da faixa; `tornozeleiraRaio`:
 * x = o raio por fora da faixa, y = o da pele; `argola`: onde a argola prende na faixa).
 */
export function cenaNoTornozelo(e: Esq, t: Torre, repouso: number, folga: number, cortadaEmCima: number): Pick<Quadro, 'prims' | 'pecas' | 'fios' | 'marcas'> {
  const { tz } = caboNoTornozelo(e, t);
  const col = colunasECabos([{ id: 'cabo', torre: t }], [tz.cabo], [repouso], folga, false, cortadaEmCima);
  const prims: Prim[] = col.prims!;
  const pecas: Peca[] = [...col.pecas!.filter((p) => p.t === 'torre'), tornozeleira(tz), ...col.pecas!.filter((p) => p.t !== 'torre')];
  return {
    prims,
    pecas,
    fios: col.fios,
    marcas: { ...col.marcas, tornozeleira: tz.centro, tornozeleiraRaio: [tz.raio, tz.pele, 0], argola: tz.raiz },
  };
}
