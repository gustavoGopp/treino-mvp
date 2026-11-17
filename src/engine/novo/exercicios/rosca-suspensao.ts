// Rosca na suspensão, no motor novo. Os números vêm da ficha (../dados/movimentos/rosca-suspensao.json); o corpo e a
// fita, do núcleo ./na-fita.ts, na mesma posição da remada na suspensão. De frente para a âncora, palmas para cima,
// braços estendidos na linha da fita; os cotovelos ficam altos e parados (o braço não se move no tronco) e só o
// antebraço dobra, trazendo as mãos para perto da testa. A fita não estica: o corpo sobe enquanto as mãos vêm à testa.
import ficha from '../dados/movimentos/rosca-suspensao.json';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { dirRef, mix, norm, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { bracosDeRemada, criarNaFita, dobrar, maoNoPegador, naRef } from './na-fita';
import type { Bracos } from './na-fita';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const NF = criarNaFita({ sentido: 'de-frente', apoio: 'calcanhares', pesMeia: f('pes.meiaDistancia'), pe: f('pe.pontaSobe'), zPe: f('pes.alemDaAncora'), joelho: f('joelho'), cervical: f('pescoco.flexao'), cabeca: 0 });

/** Palmas para cima: o polegar aponta para fora (e um pouco para cima, sem forçar a supinação). */
const POLEGAR = (T: Ref, k: Lado): V3 => dirRef(T, [sinal(k), f('maos.polegarParaCima'), 0]);
const POLO = (T: Ref, k: Lado): V3 => dirRef(T, [sinal(k) * 0.2, -1, 0]);

const CAL = new WeakMap<Corpo, { d0: V3; comp: number }>();
/** O começo (igual ao da remada): braços estendidos na linha da fita, corpo no ângulo da ficha. */
function calibrar(corpo: Corpo) {
  let c = CAL.get(corpo);
  if (c) return c;
  const m = NF.montar(corpo, { theta: f('corpo.inicio') }, NF.bracosNaFita(corpo, 0, POLO, POLEGAR));
  const L = m.e.lado.L;
  c = { d0: naRef(m.e.torax, norm(sub(L.cotovelo, L.ombro))), comp: NF.compMedio(m) };
  CAL.set(corpo, c);
  return c;
}

/** Os braços da rosca: o braço parado no tronco, na direção do começo; o antebraço dobra `dobra` graus em direção à cabeça. */
function bracosDaRosca(d0: V3, dobra: number, escapula: { elev: number }): Bracos {
  return (t) => {
    const T = t.torax;
    const lado = (k: Lado): PoseBraco => {
      const s = sinal(k);
      const umero = dirRef(T, [s * d0[0], d0[1], d0[2]]);
      return { umero, antebraco: dobrar(umero, T.y, dobra), polo: POLO(T, k), mao: maoNoPegador(POLEGAR(T, k)), elev: escapula.elev };
    };
    return { R: lado('R'), L: lado('L') };
  };
}

/** O braço no fim do erro "cotovelos descem": o mesmo da remada, para trás e para baixo, rente ao tronco. */
const D_REMADA: V3 = norm([Math.sin(f('erro.cotovelo.fora') * rad), -Math.cos(f('erro.cotovelo.atras') * rad), -Math.sin(f('erro.cotovelo.atras') * rad)]);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const uu = erro === 'curta' ? mix(f('erro.curta.fracao'), 1, u) : u;
  const dobra = erro === 'quadril' ? f('erro.quadril.dobra') * u : 0;
  // no erro, os cotovelos descem e as mãos vão ao peito: vira a remada
  const br = erro === 'cotovelo' ? bracosDeRemada(corpo, c.d0, D_REMADA, u, { elev: 0, prot: 0 }, POLEGAR) : bracosDaRosca(c.d0, f('cotovelo.fim') * uu, { elev: 0 });
  const theta = NF.inclinacaoPelaFita(corpo, c.comp, { dobra }, br, 5, f('corpo.inicio') + 20);
  return NF.quadro(NF.montar(corpo, { theta, dobra }, br));
}

export const roscaSuspensao: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // bíceps em vermelho; o antebraço "só ajuda" a segurar (correção de 04/11; a biblioteca não o conta)
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
