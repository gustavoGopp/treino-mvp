// Peça de cena: o desenvolvimento na máquina (shoulder press de pilha), o modelo da máquina de empurrar sentado
// (./maquina-de-empurrar.ts) com as medidas de ../dados/objetos/desenvolvimento-maquina.json: o tamanho total vem das
// fichas da Life Fitness (SS-SP), da Hammer Strength (HS-SP), da Movement (Next) e da Precor (RSL0515); a pilha, o
// estofado, o eixo alto ("overhead pivot") e o caminho que converge, da Precor; o encosto a 12° da vertical, do
// desenvolvimento com halteres aprovado; o eixo, o braço e as alturas do assento e do encosto são de desenho, com o
// motivo.
//
// O eixo dos braços fica atrás do encosto, alto, na meia altura do caminho dos pegadores; cada braço vai dele para a
// frente, passando ao lado da cabeça, e traz o pegador atravessado na altura dos ombros. Empurrando, o pegador anda num
// arco: sobe quase na vertical (um pouco à frente no meio, voltando para cima dos ombros no fim) e se aproxima do outro.
import { DESENVOLVIMENTO_NA_MAQUINA, maquinaDeEmpurrar, subidaDaPilhaDeEmpurrar } from './maquina-de-empurrar';
import type { MaquinaDeEmpurrar, OpcoesDaMaquinaDeEmpurrar } from './maquina-de-empurrar';

export { DESENVOLVIMENTO_NA_MAQUINA };
/** O desenvolvimento na máquina: os volumes, a estrutura, os dois braços e a pilha (./maquina-de-empurrar.ts). */
export const desenvolvimentoNaMaquina = (m: MaquinaDeEmpurrar, op: OpcoesDaMaquinaDeEmpurrar = {}) => maquinaDeEmpurrar(m, DESENVOLVIMENTO_NA_MAQUINA, op);
/** Quanto as placas sobem (cm) com os braços no ângulo dado. */
export const subidaDaPilhaDoDesenvolvimento = (m: Pick<MaquinaDeEmpurrar, 'braco' | 'inicio'>) => subidaDaPilhaDeEmpurrar(m, DESENVOLVIMENTO_NA_MAQUINA);
