// Peça de cena: a parede ao lado da pessoa, onde a mão de dentro apoia (a abdução em pé com elástico). É a mesma parede
// lisa e clara da panturrilha em pé no chão e da cadeira do búlgaro (./degrau.ts, `paredeEmFrente`), girada: a face fica
// em x = xFace, virada para a pessoa, e a parede vai para o lado de lá (+x ou −x, conforme `lado`). Cenário: pintada
// atrás do corpo e fora do enquadramento; `larg` (de frente para trás) e `alt` são só o trecho que pode caber no quadro.
import type { PecaPropria } from '../pecas';
import type { Material } from '../realista/base.mjs';

/** As cores de ./degrau.ts (a parede da panturrilha em pé no chão), nos dois temas. */
const PAREDE: Material = ['#C9CED4', '#D9DDE2', '#E6E9EC', '#A9B0B8'];
const PAREDE_ESCURA: Material = ['#3A4048', '#424952', '#4B535D', '#5C6570'];

export function paredeAoLado(xFace: number, lado: 1 | -1, zMeio = 0, larg = 150, alt = 230, esp = 10): PecaPropria {
  const x = xFace + (lado * esp) / 2;
  return {
    t: 'propria',
    nome: 'parede-ao-lado',
    fixa: { xFace, lado, zMeio, larg, alt, esp },
    cenario: true,
    desenhar(C, _M, o) {
      C.tubo([x, 0, zMeio], [x, alt, zMeio], larg, esp, o.tema === 'claro' ? PAREDE : PAREDE_ESCURA, { up: [1, 0, 0] });
    },
  };
}
