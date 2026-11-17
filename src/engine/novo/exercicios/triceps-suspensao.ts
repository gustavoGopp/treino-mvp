// Tríceps na suspensão (mãos à testa), no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-suspensao.json); o corpo e a fita, do núcleo ./na-fita.ts. De costas para a âncora, na
// ponta dos pés, corpo reto inclinado à frente, braços estendidos à frente na altura dos ombros, a fita passando por
// cima da cabeça. Os cotovelos ficam parados (o braço não se move no tronco), apontando para a frente, e só o antebraço
// dobra, levando as mãos à testa. A fita não estica: o corpo vai à frente enquanto as mãos vêm à testa.
import ficha from '../dados/movimentos/triceps-suspensao.json';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { dirRef, girar, mix, norm } from '../vec';
import type { Ref, V3 } from '../vec';
import { criarNaFita, dobrar, maoNoPegador } from './na-fita';
import type { Bracos } from './na-fita';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const NF = criarNaFita({ sentido: 'de-costas', apoio: 'ponta', pesMeia: f('pes.meiaDistancia'), pe: f('calcanhar.sobe'), zPe: -f('pes.atrasDaAncora'), joelho: f('joelho'), cervical: f('pescoco.flexao'), cabeca: 0 });

/**
 * Palmas para baixo: o polegar aponta para dentro, girado `maos.polegarGira` graus em volta do antebraço (para o
 * antebraço não passar da pronação comum). Girar em volta do antebraço mantém a mesma pronação o movimento inteiro.
 */
const POLEGAR = (T: Ref, k: Lado, antebraco: V3): V3 => girar(dirRef(T, [-sinal(k), 0, 0]), antebraco, -sinal(k) * f('maos.polegarGira'));

/** O braço no tronco (lado esquerdo): para a frente e para cima, `ombro.flexao` graus a partir do braço pendurado, na linha do ombro. */
const D0: V3 = [0, -Math.cos(f('ombro.flexao') * rad), Math.sin(f('ombro.flexao') * rad)];
/** No erro, o cotovelo abre para o lado e desce: o braço vai para baixo e para fora, como numa flexão de braço. */
const D_ERRO: V3 = norm([Math.sin(f('erro.cotovelo.abre') * rad) * Math.sin(f('erro.cotovelo.flexao') * rad), -Math.cos(f('erro.cotovelo.flexao') * rad), Math.cos(f('erro.cotovelo.abre') * rad) * Math.sin(f('erro.cotovelo.flexao') * rad)]);

/** Os braços: o braço numa direção do tronco (parado no certo); o antebraço dobra `dobra` graus em direção à cabeça. */
function bracos(d: V3, dobra: number): Bracos {
  return (t) => {
    const T = t.torax;
    const lado = (k: Lado): PoseBraco => {
      const s = sinal(k);
      const umero = dirRef(T, norm([s * d[0], d[1], d[2]]));
      const antebraco = dobrar(umero, T.y, dobra);
      return { umero, antebraco, polo: dirRef(T, [0, -1, 0]), mao: maoNoPegador(POLEGAR(T, k, antebraco)) };
    };
    return { R: lado('R'), L: lado('L') };
  };
}

const CAL = new WeakMap<Corpo, number>();
/** O começo: braços estendidos à frente, corpo no ângulo da ficha. Daí sai o comprimento da fita. */
function comprimento(corpo: Corpo): number {
  let c = CAL.get(corpo);
  if (c !== undefined) return c;
  c = NF.compMedio(NF.montar(corpo, { theta: f('corpo.inicio') }, bracos(D0, 0)));
  CAL.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const comp = comprimento(corpo);
  const uu = erro === 'curta' ? u * f('erro.curta.fracao') : u;
  const dobra = erro === 'quadril' ? f('erro.quadril.dobra') * u : 0;
  const lombar = erro === 'quadril' ? -f('erro.quadril.lombar') * u : 0;
  const d = erro === 'cotovelo' ? norm([mix(D0[0], D_ERRO[0], u), mix(D0[1], D_ERRO[1], u), mix(D0[2], D_ERRO[2], u)]) : D0;
  const br = bracos(d, f('cotovelo.fim') * uu);
  const theta = NF.inclinacaoPelaFita(corpo, comp, { dobra, lombar }, br, 0, 70);
  return NF.quadro(NF.montar(corpo, { theta, dobra, lombar }, br));
}

export const tricepsSuspensao: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // a biblioteca: tríceps principal, sem secundário
  papeis: { triceps: 'p' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
