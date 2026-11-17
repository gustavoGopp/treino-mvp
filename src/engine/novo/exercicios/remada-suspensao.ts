// Remada na suspensão, no motor novo. Os números vêm da ficha (../dados/movimentos/remada-suspensao.json); o corpo e a
// fita, do núcleo ./na-fita.ts. De frente para a âncora, os calcanhares no chão e o corpo reto inclinado para trás;
// começa com os braços estendidos na linha da fita e puxa até as mãos ao lado do peito, com os cotovelos rentes e o
// antebraço sempre na linha da fita (a fita puxa a mão). A fita não estica: o corpo sobe enquanto as mãos vêm ao corpo.
import ficha from '../dados/movimentos/remada-suspensao.json';
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { dirRef, mix, norm, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { bracosDeRemada, criarNaFita, naRef } from './na-fita';

const rad = Math.PI / 180;

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const NF = criarNaFita({ sentido: 'de-frente', apoio: 'calcanhares', pesMeia: f('pes.meiaDistancia'), pe: f('pe.pontaSobe'), zPe: f('pes.alemDaAncora'), joelho: f('joelho'), cervical: f('pescoco.flexao'), cabeca: 0 });

/** Palmas viradas uma para a outra: o polegar para cima, um pouco para dentro (o pegador fica atravessado à fita). */
const POLEGAR = (T: Ref, k: Lado): V3 => dirRef(T, [-sinal(k) * f('maos.polegarParaDentro'), 1, 0]);

const CAL = new WeakMap<Corpo, { d0: V3; comp: number }>();
/**
 * O começo: braços estendidos na linha da fita, com o corpo no ângulo da ficha. Daí saem onde fica a pegada no tronco
 * e o comprimento da fita.
 */
function calibrar(corpo: Corpo) {
  let c = CAL.get(corpo);
  if (c) return c;
  const br = NF.bracosNaFita(corpo, 0, (T, k) => dirRef(T, [sinal(k) * 0.35, -0.45, -1]), POLEGAR, { elev: 0, prot: f('escapula.prot.inicio') });
  const m = NF.montar(corpo, { theta: f('corpo.inicio') }, br);
  const L = m.e.lado.L;
  c = { d0: naRef(m.e.torax, norm(sub(L.cotovelo, L.ombro))), comp: NF.compMedio(m) };
  CAL.set(corpo, c);
  return c;
}
/** O braço no fim, no tronco (lado esquerdo): para trás e para baixo, rente ao lado do corpo. */
const D1: V3 = norm([Math.sin(f('braco.fim.fora') * rad), -Math.cos(f('braco.fim.atras') * rad) * Math.cos(f('braco.fim.fora') * rad), -Math.sin(f('braco.fim.atras') * rad) * Math.cos(f('braco.fim.fora') * rad)]);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  // na volta curta, os braços não passam da metade do caminho
  const uu = erro === 'curta' ? mix(f('erro.curta.fracao'), 1, u) : u;
  const esc = { elev: erro === 'encolher' ? f('erro.encolher.elev') * u : f('escapula.elev.fim') * uu, prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), uu) };
  const dobra = erro === 'quadril' ? f('erro.quadril.dobra') * u : 0;
  const br = bracosDeRemada(corpo, c.d0, D1, uu, esc, POLEGAR);
  const theta = NF.inclinacaoPelaFita(corpo, c.comp, { dobra }, br, 10, f('corpo.inicio') + 20);
  return NF.quadro(NF.montar(corpo, { theta, dobra }, br));
}

export const remadaSuspensao: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'posterior'],
  quadro,
  // costas (dorsal e meio das costas) em vermelho; ombro de trás e bíceps em laranja (a biblioteca e a correção de 04/11)
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, quadril: (q) => q.esq.pelve.o },
};
