// Remada alta na suspensão, com os cotovelos abertos (o face pull na fita), no motor novo. Os números vêm da ficha
// (../dados/movimentos/face-pull-suspensao.json); o corpo e a fita, do núcleo ./na-fita.ts. De frente para a âncora,
// os calcanhares no chão e o corpo reto inclinado para trás; começa com os braços estendidos na linha da fita, palmas
// para baixo e cotovelos para fora (como o T na suspensão), e puxa com os cotovelos altos e abertos até as mãos ficarem
// ao lado das orelhas (como o face pull com corda). O que ele resolve em cada quadro, em vez de receber pronto:
//  - onde ficam as mãos: no começo, na linha da fita (a calibração); no fim, ao lado das orelhas. Os dois pontos ficam
//    no referencial do tórax (o corpo gira inteiro, e as mãos vão junto); a mão vai de um ao outro e abre para os lados
//    no fim do caminho, e o braço chega a ela pelo cotovelo apontado para fora (para fora e um pouco para cima no fim);
//  - o ângulo do corpo: a fita não estica, e o corpo sobe enquanto as mãos vêm à cabeça (`inclinacaoPelaFita`).
import ficha from '../dados/movimentos/face-pull-suspensao.json';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { dirRef, mix, noRef, norm, paraRef, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { bracosDeRemada, criarNaFita, maoNoPegador, naRef } from './na-fita';
import type { Bracos } from './na-fita';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const NF = criarNaFita({ sentido: 'de-frente', apoio: 'calcanhares', pesMeia: f('pes.meiaDistancia'), pe: f('pe.pontaSobe'), zPe: f('pes.alemDaAncora'), joelho: f('joelho'), cervical: f('pescoco.flexao'), cabeca: 0 });

/** Uma direção do lado esquerdo no tronco, espelhada para o lado `k`, no mundo. */
const esp = (T: Ref, k: Lado, v: V3): V3 => dirRef(T, [sinal(k) * v[0], v[1], v[2]]);
/** Palmas para baixo: o polegar aponta para dentro e um pouco para cima, no tronco. */
const POLEGAR = (T: Ref, k: Lado): V3 => esp(T, k, [-1, f('maos.polegarParaCima'), 0]);

interface Calibrado {
  /** O centro da mão esquerda no tórax: no começo (na linha da fita) e no fim (ao lado da orelha). */
  inicio: V3;
  fim: V3;
  /** O braço esquerdo no começo, no tórax (para o erro que vira remada). */
  umero: V3;
  comp: number;
}
const CAL = new WeakMap<Corpo, Calibrado>();
/** O começo: braços estendidos na linha da fita, corpo no ângulo da ficha. Daí saem as mãos no tórax e o comprimento da fita. */
function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  const br = NF.bracosNaFita(corpo, f('braco.dobra'), (T, k) => esp(T, k, [1, 0, 0]), POLEGAR, { elev: f('escapula.elev'), prot: f('escapula.prot.inicio') });
  const m = NF.montar(corpo, { theta: f('corpo.inicio') }, br);
  const T = m.e.torax,
    L = m.e.lado.L;
  // o trágio no tórax (a cabeça não se move no tórax: o pescoço fica parado)
  const tr = paraRef(T, m.e.cabeca.o);
  c = { inicio: paraRef(T, L.pegada), fim: [f('fim.maos'), tr[1] + f('fim.altura'), tr[2] + f('fim.aFrente')], umero: naRef(T, norm(sub(L.cotovelo, L.ombro))), comp: NF.compMedio(m) };
  CAL.set(corpo, c);
  return c;
}

/** Os braços do face pull no ponto u: a mão vai do começo ao fim, no tórax, e o cotovelo aponta para fora e sobe. */
function bracosDoFacePull(c: Calibrado, u: number, escapula: { elev: number; prot: number }): Bracos {
  // a mão anda do começo ao fim; para os lados, ela abre mais no fim do caminho (como no face pull com corda)
  const local: V3 = [mix(c.inicio[0], c.fim[0], u * u), mix(c.inicio[1], c.fim[1], u), mix(c.inicio[2], c.fim[2], u)];
  const polo: V3 = [1, f('fim.polo.alto') * u, f('fim.polo.tras') * u];
  return (t) => {
    const T = t.torax;
    const lado = (k: Lado): PoseBraco => ({ pegada: noRef(T, [sinal(k) * local[0], local[1], local[2]]), polo: esp(T, k, norm(polo)), mao: maoNoPegador(POLEGAR(T, k)), ...escapula });
    return { R: lado('R'), L: lado('L') };
  };
}

/** No erro dos cotovelos baixos, o braço desce para junto do tronco: vira uma remada (para trás e para baixo). */
const D_REMADA: V3 = norm([Math.sin(f('erro.cotovelos.fora') * rad), -Math.cos(f('erro.cotovelos.atras') * rad), -Math.sin(f('erro.cotovelos.atras') * rad)]);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const esc = { elev: f('escapula.elev'), prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u) };
  let dobra = 0,
    lombar = 0;
  if (erro === 'quadril') dobra = f('erro.quadril.dobra') * u;
  if (erro === 'embalo') {
    // o impulso: o tronco é jogado para trás no meio da puxada (o quadril passa da linha reta e a lombar arqueia)
    const w = Math.sin(Math.PI * u);
    dobra = -f('erro.embalo.dobra') * w;
    lombar = f('erro.embalo.lombar') * w;
  }
  const br = erro === 'cotovelos' ? bracosDeRemada(corpo, c.umero, D_REMADA, u, esc, POLEGAR) : bracosDoFacePull(c, u, esc);
  const theta = NF.inclinacaoPelaFita(corpo, c.comp, { dobra, lombar }, br, 0, f('corpo.inicio') + 20);
  return NF.quadro(NF.montar(corpo, { theta, dobra, lombar }, br));
}

export const facePullSuspensao: Exercicio = {
  ficha: F,
  vistas: ['quinaTras', 'lateral'],
  quadro,
  // o ombro de trás (principal) e as costas, a parte do meio do trapézio (secundário): a biblioteca, como no face pull
  // com corda (a técnica junta as escápulas; achado 5 da anatomia)
  papeis: { deltPost: 'p', trapMedInf: 's' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
