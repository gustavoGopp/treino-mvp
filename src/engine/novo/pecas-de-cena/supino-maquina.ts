// Peça de cena: o supino na máquina (chest press de pilha), o modelo da máquina de empurrar sentado
// (./maquina-de-empurrar.ts) com as medidas de ../dados/objetos/supino-maquina.json: o tamanho total vem das fichas da
// Life Fitness (SS-CP), da Hammer Strength (HS-CP), da Movement (Next), da Technogym (MK70) e da Precor (RSL0414); a
// pilha, o estofado e o caminho que converge, da Precor; o eixo, o braço e as alturas do assento e do encosto são de
// desenho, com o motivo.
//
// O eixo dos braços fica acima da cabeça de quem senta, um pouco à frente do peito; cada braço pende dele e traz o
// pegador atravessado na frente do peito. Empurrando, o pegador anda num arco: para a frente, subindo um pouco (da linha
// do meio do peito até a altura dos ombros) e se aproximando do outro. O que o separa do desenvolvimento na máquina (o
// cuidado 12): o eixo no alto e à frente, e os braços que pendem dele; no desenvolvimento, o eixo fica atrás do encosto
// e os braços vão para a frente, com os pegadores na altura dos ombros.
import { SUPINO_NA_MAQUINA, maquinaDeEmpurrar, subidaDaPilhaDeEmpurrar } from './maquina-de-empurrar';
import type { MaquinaDeEmpurrar, OpcoesDaMaquinaDeEmpurrar } from './maquina-de-empurrar';

export { SUPINO_NA_MAQUINA };
/** O supino na máquina: os volumes, a estrutura, os dois braços e a pilha (./maquina-de-empurrar.ts). */
export const supinoNaMaquina = (m: MaquinaDeEmpurrar, op: OpcoesDaMaquinaDeEmpurrar = {}) => maquinaDeEmpurrar(m, SUPINO_NA_MAQUINA, op);
/** Quanto as placas sobem (cm) com os braços no ângulo dado. */
export const subidaDaPilhaDoSupino = (m: Pick<MaquinaDeEmpurrar, 'braco' | 'inicio'>) => subidaDaPilhaDeEmpurrar(m, SUPINO_NA_MAQUINA);
