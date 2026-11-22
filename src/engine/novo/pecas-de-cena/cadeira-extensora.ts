// Peça de cena: a cadeira extensora (extensão de joelho sentado), a irmã da cadeira flexora aprovada
// (./cadeira-flexora.ts). O desenho é o mesmo (o assento e o encosto azuis, o came redondo no eixo, a alavanca com o
// rolo, a torre com a pilha ao lado do assento), com as medidas dela (../dados/objetos/cadeira-extensora.json): o
// tamanho total vem das fichas da Life Fitness (SS-LE), da Hammer Strength (HS-LE), da Movement (Next) e da Precor
// (RSL0605); a espessura dos estofados, da Precor; as medidas que fazem a máquina funcionar (a altura do assento, onde
// fica o eixo, o comprimento da alavanca) não aparecem nas fichas e são de desenho, com o motivo.
//
// O que muda da flexora: não há trava das coxas (o cartão de hoje não tem; quem segura o quadril no banco são as mãos
// nas alças, que ficam ao lado do quadril); o assento é reto (como no cartão de hoje) e mais alto (com o joelho bem
// dobrado, o pé fica fora do chão); o rolo fica embaixo, na frente da canela, e a alavanca começa apontando para baixo; as placas sobem quando a
// alavanca vai para a frente e para cima (a perna estica). O cartão de hoje é 37% a 54% mais estreito que as fichas
// (a pilha encostada atrás do assento); aqui a pilha fica ao lado do assento, como nas fichas e na flexora.
//
// Eixos: os da flexora (quem senta olha para +z, o assento centrado em x = 0 com a borda da frente em z = 0, o came e
// a torre à esquerda de quem senta, em +x). A alavanca: 0° = apontando para baixo, 90° = para a frente, na horizontal.
import { cadeiraFlexora, geometriaDaCadeiraFlexora, subidaDaPilha } from './cadeira-flexora';
import type { CadeiraFlexora, ModeloDaCadeira } from './cadeira-flexora';
import { obj } from '../tabelas';

/** A extensora: sem a trava das coxas, a pilha sobe com a alavanca para a frente, as alças ao lado do quadril. */
export const EXTENSORA: ModeloDaCadeira = { objeto: 'cadeiraExtensora', nome: 'cadeira extensora', trava: false, sobe: 1, alcaAFrente: obj('cadeiraExtensora', 'alcaAFrente') };

/** As regulagens e o instante da máquina: as da flexora, sem a trava das coxas. */
export type CadeiraExtensora = Omit<CadeiraFlexora, 'trava'>;

/** A geometria fixa da extensora (não depende da regulagem): o assento, o eixo, o lado do came. */
export const geometriaDaCadeiraExtensora = () => geometriaDaCadeiraFlexora(EXTENSORA);

/** Quanto as placas sobem (cm) com a alavanca no ângulo dado: o arco do came desde a posição inicial, para a frente. */
export const subidaDaPilhaDaExtensora = (m: Pick<CadeiraExtensora, 'alavanca' | 'inicio'>) => subidaDaPilha(m, EXTENSORA);

/**
 * A cadeira extensora: os volumes para a conferência (o assento, o encosto e o rolo), a estrutura parada, a parte que
 * se mexe (alavanca, rolo, came, cabo e placas) e os pontos que o exercício lê (o eixo, o centro do rolo, a frente do
 * encosto), como na flexora.
 */
export const cadeiraExtensora = (m: CadeiraExtensora) => cadeiraFlexora({ ...m, trava: 0 }, EXTENSORA);
