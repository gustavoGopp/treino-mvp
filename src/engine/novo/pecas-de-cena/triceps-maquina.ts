// Peça de cena: a máquina de tríceps com o braço apoiado à frente (extensão do cotovelo sentado), a irmã da máquina de
// rosca (./rosca-maquina.ts). O desenho é o mesmo (o assento num pé só, o apoio dos braços inclinado e partido no meio,
// o came de um lado só no eixo dos cotovelos, a alavanca, a torre com a pilha ao lado do assento), com as medidas dela
// (../dados/objetos/triceps-maquina.json): o tamanho total vem da ficha da Precor (RSL0208, a mesma estrutura da
// rosca, 122 x 110 x 148 cm), com a Hammer Strength (HS-TE) e a Movement (Next) ao lado; o ajuste, do manual da
// Hammer Strength.
//
// O que muda da rosca: os pegadores são dois, em pé, um para cada mão (a pegada neutra, a palma virada para dentro),
// presos por baixo numa barra atravessada na ponta da alavanca (como no desenho do manual da HS-TE); atrás do assento
// fica o apoio da lombar, que sobe e desce com ele ("hips in contact with the lower back pad"); e as placas sobem quando
// a alavanca desce (o cotovelo estica). O cartão de hoje (`triceps_maquina`) é outra máquina, a de mergulho sentado,
// com os pegadores ao lado do quadril; a ficha da técnica do app é a do braço apoiado à frente, e a peça segue a ficha.
//
// Eixos: os da rosca (quem senta olha para +z, o assento centrado em x = 0 com a borda da frente em z = 0, o came e a
// torre à esquerda de quem senta, em +x). A alavanca: 0° = o centro da mão para baixo do eixo, 90° = para a frente.
import { maquinaDeBraco, pegadorNoAngulo, subidaDaPilhaDeBraco } from './rosca-maquina';
import type { MaquinaDeBraco, ModeloDeBraco, OpcoesDaMaquinaDeBraco } from './rosca-maquina';

/** O tríceps: os pegadores em pé, o apoio da lombar, a pilha sobe com a alavanca descendo. */
export const TRICEPS_NA_MAQUINA: ModeloDeBraco = { objeto: 'tricepsMaquina', nome: 'máquina de tríceps', sobe: -1, pegador: 'neutro', lombar: true };

/** Quanto as placas sobem (cm) com a alavanca no ângulo dado: o arco do came desde a posição inicial, para baixo. */
export const subidaDaPilhaDoTriceps = (m: Pick<MaquinaDeBraco, 'alavanca' | 'inicio'>) => subidaDaPilhaDeBraco(m, TRICEPS_NA_MAQUINA);

/** Os pegadores no ângulo dado: o centro de cada mão e a direção do pegador em pé (para o lado do polegar). */
export const pegadoresDoTriceps = (m: Pick<MaquinaDeBraco, 'alavanca' | 'pegador' | 'pegadaMeia'>) => pegadorNoAngulo(m, TRICEPS_NA_MAQUINA);

/** A máquina de tríceps: os volumes, a estrutura, a alavanca com os pegadores, a pilha e os pontos, como na rosca. */
export const maquinaDeTriceps = (m: MaquinaDeBraco, op: OpcoesDaMaquinaDeBraco = {}) => maquinaDeBraco(m, TRICEPS_NA_MAQUINA, op);
