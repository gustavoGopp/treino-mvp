// Remada articulada, no motor novo. Os números vêm da ficha (../dados/movimentos/remada-articulada.json); a máquina, de
// ../pecas-de-cena/remada-articulada.ts (o modelo `REMADA_ARTICULADA` da máquina de empurrar: o eixo no alto e à frente,
// os braços que pendem dele com os pegadores de pé, o apoio do peito na frente); o corpo sentado, o tronco, os pés no
// chão e o glúteo no assento, do núcleo das máquinas de empurrar (./maquina-de-empurrar.ts); o braço que puxa, das
// remadas aprovadas (./remada-apoiada.ts, ./remada.ts): os cotovelos vão para trás, rentes ao corpo, até passarem a
// linha das costas, e as escápulas saem da frente e se juntam no fim.
//
// Sentado, o peito no apoio, os pés no chão. As mãos ficam presas nos pegadores o tempo todo, e os pegadores andam num
// arco em volta do eixo de cada braço da máquina (para trás, subindo um pouco e se afastando): o caminho das mãos sai
// do arco, e o braço de quem treina se resolve até a mão. As placas sobem o arco do came.
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts):
//  - o corpo sentado: o glúteo no assento (afundando `assento.amassa`), no meio dele; o tronco inclinado à frente o
//    quanto deixa o peito paralelo ao apoio (que inclina 10°); o apoio, que corre para a frente e para trás, vem até o
//    peito e afunda `peito.amassa`. Em outra altura do assento, o corpo sobe ou desce e o apoio anda junto na
//    inclinação dele, para o peito continuar apoiado;
//  - as regulagens da máquina para esse corpo, como quem treina faz antes da série: a altura do assento e a posição
//    inicial dos braços, para o pegador começar na linha do peito com os braços estendidos (a ficha);
//  - onde o movimento termina: o ângulo dos braços em que o braço de quem treina passa a linha do tronco o quanto a
//    ficha pede.
import ficha from '../dados/movimentos/remada-articulada.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { REMADA_ARTICULADA, bracoNoAngulo, faceDoApoioDoPeito } from '../pecas-de-cena/maquina-de-empurrar';
import { remadaArticulada as maquina } from '../pecas-de-cena/remada-articulada';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dot, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { apoioNoAssentoDaMaquina, linhaDoPeito, pesNoChao, troncoNaMaquina } from './maquina-de-empurrar';
import type { OpcoesDeEmpurrar } from './maquina-de-empurrar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const g = (id: string) => obj(REMADA_ARTICULADA.objeto, id);
const MOD = REMADA_ARTICULADA;
/** As opções do núcleo das máquinas sentadas que valem aqui (o tronco, os pés, o glúteo no assento). */
const O: OpcoesDeEmpurrar = {
  modelo: MOD,
  amassa: f('assento.amassa'),
  lombar: f('lombar.sentado'),
  pescoco: f('pescoco.compensa'),
  pesMeia: f('pes.meiaDistancia'),
  joelho: f('joelho'),
  prot: 0,
  elev: 0,
  polo: [0, 0, 0],
  alvo: (corpo, e) => ({ y: linhaDoPeito(corpo, e) + f('pegador.naLinhaDoPeito'), z: 0 }),
  cotoveloEmCima: f('cotovelo.inicio'),
};
const CHAVE = F.id;

/** Os braços pendurados (só para a calibração do assento e do apoio). */
const PENDURADO: PoseBraco = { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };

/** A folga do peito no apoio, na metade de baixo e na de cima dele (cm; negativo = entra). */
export function folgasNoApoio(e: Esq, zApoio: number): { baixo: number; cima: number } {
  const A = faceDoApoioDoPeito(MOD, zApoio);
  let baixo = 1e9,
    cima = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!['tronco', 'cintura'].includes(parte) || Math.abs(p[0]) > A.larg / 2 - 1) continue;
    const d = sub(p, A.base);
    const s = dot(d, A.sobe);
    if (s < 2 || s > A.comp - 2) continue;
    const gap = dot(d, A.tras);
    if (s < A.comp / 2) baixo = Math.min(baixo, gap);
    else cima = Math.min(cima, gap);
  }
  return { baixo, cima };
}

/** Onde ficam os pés para o joelho dobrar o ângulo pedido, com a bacia nesse lugar. */
function bolaDosPes(t: Tronco): number {
  return resolver1((z) => resolverMembros(t, { R: PENDURADO, L: PENDURADO }, pesNoChao(O, z)).lado.R.ang.joelho - O.joelho, t.pelve.o[2] + 10, t.pelve.o[2] + 90, 30);
}

/** O que a calibração dá, para um corpo: a bacia, a inclinação do tronco e o apoio, com o assento no meio do curso. */
interface Sentado {
  y: number;
  z: number;
  deita: number;
  apoio: number;
  h: number;
}

function sentar(corpo: Corpo): Sentado {
  return calibragem(corpo, `${CHAVE}:sentado`, () => {
    const h = (g('assentoMin') + g('assentoMax')) / 2;
    const A0 = faceDoApoioDoPeito(MOD, 0);
    const montar = (y: number, z: number, deita: number) => {
      const t = troncoNaMaquina(corpo, O, [0, y, z], deita);
      return resolverMembros(t, { R: PENDURADO, L: PENDURADO }, pesNoChao(O, bolaDosPes(t)));
    };
    // o glúteo no meio do assento: o ponto mais baixo da bacia fica `bacia.noAssento` à frente do meio dele
    const t0 = troncoNaMaquina(corpo, O, [0, 100, 0], 0);
    let baixo: V3 = [0, 1e9, 0];
    for (const { p, parte } of pontosDoBoneco(resolverMembros(t0, { R: PENDURADO, L: PENDURADO }, pesNoChao(O, 40)))) if (parte === 'pelve' && p[1] < baixo[1]) baixo = p;
    const z = -g('assentoComp') / 2 + f('bacia.noAssento') - baixo[2];
    let y = h + 10,
      deita = -10,
      apoio = 10;
    for (let i = 0; i < 5; i++) {
      const d0 = deita;
      y = resolver1((yy) => apoioNoAssentoDaMaquina(montar(yy, z, d0), O, h) + O.amassa, h - 5, h + 25, 30);
      const y0 = y;
      // o tronco inclinado à frente o quanto a ficha pede (o peito, visto de lado)
      deita = resolver1((d) => {
        const t = troncoNaMaquina(corpo, O, [0, y0, z], d);
        return Math.atan2(t.torax.y[2], t.torax.y[1]) / rad - f('tronco.aFrente');
      }, 20, -40, 30);
      // e o apoio encostado nele (afundando `peito.amassa`)
      const fo = folgasNoApoio(montar(y, z, deita), apoio);
      apoio += (-f('peito.amassa') - Math.min(fo.baixo, fo.cima)) / -A0.tras[2];
    }
    return { y, z, deita, apoio, h };
  });
}

/** A bacia e o apoio com o assento na altura `h`: o corpo sobe ou desce, e o apoio anda para a frente ou para trás o que a inclinação dele pede para o peito continuar encostado. */
function naAltura(S: Sentado, h: number): { pelve: V3; apoio: number } {
  return { pelve: [0, S.y + (h - S.h), S.z], apoio: S.apoio - (h - S.h) * Math.tan(g('apoioInclina') * rad) };
}

/** Um desvio (os erros): o tronco que vai para trás (graus) e a escápula. */
interface Desvio {
  paraTras?: number;
  elev?: number;
}

/** As escápulas no instante `u` da puxada (de à frente, no começo, a juntas, no fim). */
const escapulas = (u: number) => ({ prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u), elev: mix(f('escapula.elev.inicio'), f('escapula.elev.fim'), u) });

/** As mãos nos pegadores de pé, com os braços da máquina no ângulo dado. */
function maosNosPegadores(t: Tronco, braco: number, u: number, esc: { prot: number; elev: number }): Record<Lado, PoseBraco> {
  // para onde o cotovelo aponta: para baixo com o braço estendido à frente; para trás no fim da puxada
  const polo: V3 = [-f('cotovelo.fora'), -mix(f('cotovelo.desce'), f('cotovelo.pouco'), u), -mix(f('cotovelo.pouco'), f('cotovelo.atras'), u)];
  const b = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const B = bracoNoAngulo(MOD, k, braco);
    return {
      pegada: B.centro,
      polo: norm(dirRef(t.torax, [s * -polo[0], polo[1], polo[2]])),
      // a pegada neutra: o polegar para cima, ao longo do pegador
      mao: { polegar: B.dirBorracha, forma: 'pegada', diam: g('pegadorDiam') },
      prot: esc.prot,
      elev: esc.elev,
    };
  };
  return { R: b('R'), L: b('L') };
}

const PES = new Map<string, number>();

/** O corpo sentado com o assento em `h`, os braços da máquina em `braco`, as escápulas do instante `u` e as mãos nos pegadores. */
function corpoNaRemada(corpo: Corpo, h: number, braco: number, u: number, dv: Desvio = {}): Esq {
  const S = sentar(corpo);
  const { pelve } = naAltura(S, h);
  const t = troncoNaMaquina(corpo, O, pelve, S.deita + (dv.paraTras ?? 0));
  // onde ficam os pés para essa altura do assento (uma conta pequena; guardada só na memória, por corpo e altura)
  const k = `${corpo.id}|${h}`;
  let bola = PES.get(k);
  if (bola === undefined) PES.set(k, (bola = bolaDosPes(troncoNaMaquina(corpo, O, pelve, S.deita))));
  const esc = escapulas(u);
  return resolverMembros(t, maosNosPegadores(t, braco, u, { prot: esc.prot, elev: esc.elev + (dv.elev ?? 0) }), pesNoChao(O, bola));
}

/** Quanto o braço de quem treina passa a linha do tronco, visto de lado (graus; positivo = atrás). */
function bracoAtras(e: Esq): number {
  const L = e.lado.R;
  const u = norm(sub(L.cotovelo, L.ombro));
  return Math.atan2(-dot(u, e.torax.z), -dot(u, e.torax.y)) / rad;
}

/** As regulagens para um corpo: a altura do assento, o ângulo inicial e o final dos braços da máquina. */
interface Regulagem {
  h: number;
  inicio: number;
  fim: number;
}

function regular(corpo: Corpo): Regulagem {
  return calibragem(corpo, `${CHAVE}:regulagem`, () => {
    let h = (g('assentoMin') + g('assentoMax')) / 2,
      inicio = g('bracoMeio') - 20;
    for (let i = 0; i < 16; i++) {
      const h0 = h;
      // a posição inicial: o braço estendido (o cotovelo dobra `cotovelo.inicio`), com as escápulas à frente; passar do
      // alcance conta como estender demais
      const c = (a: number) => {
        const L = corpoNaRemada(corpo, h0, a, 0).lado.R;
        return L.falta.braco > 0.01 ? -1 : L.ang.cotovelo - f('cotovelo.inicio');
      };
      inicio = resolver1(c, g('bracoMeio') + 50, g('bracoMeio') - 60, 30);
      // a altura do assento: o corpo sobe ou desce até a linha do peito ficar na altura do pegador
      const A = O.alvo(corpo, corpoNaRemada(corpo, h, inicio, 0));
      h += 0.7 * (bracoNoAngulo(MOD, 'R', inicio).centro[1] - A.y);
    }
    const h1 = h,
      i1 = inicio;
    const fim = resolver1((a) => bracoAtras(corpoNaRemada(corpo, h1, a, 1)) - f('braco.fim.alemDasCostas'), i1 + 5, i1 + 110, 30);
    return { h, inicio, fim };
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const R = regular(corpo);
  const S = sentar(corpo);
  // o instante da escápula e dos braços: no erro da volta curta, o começo fica no meio do caminho
  const uu = erro === 'curta' ? mix(f('erro.curta.fracao'), 1, u) : u;
  const braco = mix(R.inicio, R.fim, uu);
  const dv: Desvio = {};
  if (erro === 'peito') dv.paraTras = f('erro.peito.inclina') * u;
  if (erro === 'encolher') dv.elev = f('erro.encolher.elev') * u;
  const e = corpoNaRemada(corpo, R.h, braco, uu, dv);
  const { apoio } = naAltura(S, R.h);
  const M = maquina({ braco, inicio: R.inicio, assento: R.h, placas: f('placas'), apoio }, { bracoDePertoAtras: true });
  const fo = folgasNoApoio(e, apoio);
  const bR = bracoNoAngulo(MOD, 'R', braco);
  // a face do apoio do peito (a que o peito toca): o meio dela, a direção que sobe por ela e a que vai para o corpo
  const A = faceDoApoioDoPeito(MOD, apoio);
  return {
    esq: e,
    prims: [chao(-90, 100, -100, 110), ...M.prims],
    // a estrutura fica como cenário (atrás do corpo: o apoio do peito não pinta por cima dele); a coluna da frente fica
    // no enquadramento, para os nomes do modo Trajetória não caírem em cima dela
    pecas: [{ ...M.fixa, cenario: true }, M.coluna, M.bracos.R, M.bracos.L, M.pilha],
    fios: [],
    cargas: [],
    marcas: {
      pegadorR: M.pegadores.R,
      pegadorL: M.pegadores.L,
      eixoR: bR.eixo,
      eixoDirR: bR.dirEixo,
      alavanca: [braco, R.inicio, g('cameDiam') / 2],
      pilha: [M.subida, 0, 0],
      assento: [apoioNoAssentoDaMaquina(e, O, R.h), 0, 0],
      peitoNoApoio: [Math.min(fo.baixo, fo.cima), fo.baixo, fo.cima],
      regulagem: [R.h, R.inicio, R.fim],
      peito: [linhaDoPeito(corpo, e), 0, 0],
      // onde o peito encosta no apoio: o meio da face dele, no meio do corpo (o ponto do rótulo "peito na almofada")
      peitoNaAlmofada: add(A.base, mul(A.sobe, A.comp / 2)),
      apoioSobe: A.sobe,
      apoioTras: A.tras,
      apoioMedidas: [A.comp, A.larg, 0],
    },
  };
}

export const remadaArticulada: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // a ficha da técnica: costas (dorsal e meio das costas) em vermelho; bíceps e ombro de trás em laranja, como a
  // remada apoiada aprovada
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { 'mão': (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
