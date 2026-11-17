// Abertura em T deitado de bruços, sem carga, no motor novo. Os números vêm da ficha
// (../dados/movimentos/abertura-t-deitado.json). O corpo de bruços é o do núcleo das flexões de joelho deitado
// (./flexao-joelho.ts, `deitadoDeBrucos`): o peito, a bacia e as coxas no chão, as pernas estendidas e a testa numa
// toalha dobrada (a toalha dos calcanhares da flexão deslizante, ../pecas-de-cena/toalha.ts), no lugar das mãos. Os
// braços abertos em T, cotovelos estendidos e polegares para cima, sobem e descem no plano dos ombros: das mãos quase
// no chão até um pouco acima da linha dos ombros.
import { pontosDoBoneco } from '../boneco';
import ficha from '../dados/movimentos/abertura-t-deitado.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { alturaDaToalha, toalha } from '../pecas-de-cena/toalha';
import type { Corpo } from '../tabelas';
import { add, cross, girar, mix, mul, norm } from '../vec';
import type { V3 } from '../vec';
import { deitadoDeBrucos } from './flexao-joelho';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

/** Os braços em T, `el` graus acima da horizontal (negativo = abaixo), com o ombro subindo `elev` graus além do ritmo. */
function bracosEmT(el: number, elev = 0): (t: Tronco) => Record<Lado, PoseBraco> {
  return () => {
    const braco = (k: Lado): PoseBraco => {
      const s = sinal(k),
        ab = f('bracos.abertura') * rad;
      const horiz: V3 = [s * Math.sin(ab), 0, Math.cos(ab)];
      const dir = norm(add(mul(horiz, Math.cos(el * rad)), [0, Math.sin(el * rad), 0]));
      // o polegar para cima (para o teto, perpendicular ao braço); a palma para a cabeça; o cotovelo dobra o pouco que a
      // ficha deixa, para o lado da palma
      const polegar = norm(add(mul(horiz, -Math.sin(el * rad)), [0, Math.cos(el * rad), 0]));
      const antebraco = girar(dir, norm(cross(dir, [0, 0, 1])), f('cotovelo'));
      return { umero: dir, antebraco, polo: [0, -1, 0], mao: { polegar, forma: 'aberta' }, elev };
    };
    return { R: braco('R'), L: braco('L') };
  };
}
interface Pernas {
  joelho: number;
  plantar: number;
}
const pose = (corpo: Corpo, el: number, p: Pernas, o: { elev?: number; cabeca?: number } = {}): Esq =>
  deitadoDeBrucos(corpo, { apoio: 0, testa: alturaDaToalha(), punhosMeiaDistancia: 0, joelho: p.joelho, flexaoPlantar: p.plantar, lombar: f('lombar'), bracos: bracosEmT(el, o.elev ?? 0), cabeca: o.cabeca ?? 0 });

/** O ponto mais baixo de uma parte do corpo (cm). */
const maisBaixo = (e: Esq, partes: string[]) => Math.min(...pontosDoBoneco(e).filter((x) => partes.includes(x.parte)).map((x) => x.p[1]));

const CACHE = new WeakMap<Corpo, { ini: number; zTesta: number; pernas: Pernas }>();
/**
 * As pernas estendidas deitadas, com o pé esticado o que a ficha pede: o joelho dobra o pouco que deixa o peito do pé
 * à folga da ficha do chão (a coxa desce do quadril ao joelho, e com o joelho reto o pé entraria no chão). Embaixo, os braços descem até a mão ficar à folga da ficha do
 * chão; a toalha fica sob a testa.
 */
function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const plantar = f('pe.plantar');
  const joelho = resolver1((j) => maisBaixo(pose(corpo, 0, { joelho: j, plantar }), ['pe']) - f('pe.folga'), 0, 20, 24);
  const pernas = { joelho, plantar };
  const ini = resolver1((el) => maisBaixo(pose(corpo, el, pernas), ['mao', 'polegar']) - f('maos.folgaEmbaixo'), -40, 0, 26);
  const cab = pontosDoBoneco(pose(corpo, ini, pernas)).filter((x) => x.parte === 'cabeca').map((x) => x.p);
  const testa = cab.reduce((a, p) => (p[1] < a[1] ? p : a));
  c = { ini, zTesta: testa[2], pernas };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const topo = erro === 'embalo' ? f('erro.embalo.topo') : f('bracos.topo');
  const e = pose(corpo, mix(c.ini, topo, u), c.pernas, { elev: erro === 'encolher' ? f('erro.encolher.elev') * u : 0, cabeca: erro === 'cabeca' ? -f('erro.cabeca.graus') * u : 0 });
  const t = toalha(0, c.zTesta);
  return { esq: e, prims: [chao(-90, 90, -110, 70), ...t.prims], pecas: [t.peca], fios: [], cargas: [], marcas: { toalha: [0, alturaDaToalha(), c.zTesta] } };
}

export const aberturaTDeitado: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'quinaTras'],
  quadro,
  // o ombro de trás, principal, sem secundário (a ficha: o trapézio médio e o inferior trabalham, mas não contam)
  papeis: { deltPost: 'p' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada },
};
