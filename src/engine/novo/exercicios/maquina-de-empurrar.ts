// O núcleo das máquinas de empurrar sentado (o supino na máquina e o desenvolvimento na máquina): sentado na máquina
// (../pecas-de-cena/maquina-de-empurrar.ts), o glúteo no assento, as costas no encosto, os pés no chão; as mãos presas
// nos pegadores o tempo todo. Os pegadores andam num arco em volta do eixo de cada braço da máquina, e as mãos vão com
// eles: o caminho das mãos sai do arco, e o braço de quem treina se resolve até a mão (o cotovelo para onde a técnica
// pede). As placas sobem o arco do came.
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts):
//  - onde fica a bacia e quanto o tronco deita: o glúteo e a coxa apoiam no assento (afundando `amassa` cm) e as costas
//    ficam paralelas ao encosto e encostadas nele, com o assento no meio do curso. Em outra altura do assento, o corpo
//    desliza junto do encosto (sobe e anda para trás na inclinação dele): as costas continuam encostadas, e o glúteo,
//    no assento;
//  - as regulagens da máquina para esse corpo, como quem treina faz antes da série: a altura do assento e a posição
//    inicial dos braços, para o pegador começar onde a técnica pede (`alvo`: no supino, na linha do meio do peito e na
//    frente dele; no desenvolvimento, na linha dos ombros e um pouco à frente deles);
//  - onde o movimento termina: o ângulo dos braços em que o cotovelo fica dobrado o quanto a ficha pede.
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Quadro } from '../movimento';
import { chao } from '../pecas';
import { bracoNoAngulo, faceDoEncostoDaMaquina, maquinaDeEmpurrar } from '../pecas-de-cena/maquina-de-empurrar';
import type { ModeloDeEmpurrar } from '../pecas-de-cena/maquina-de-empurrar';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dot, norm, sub } from '../vec';
import type { V3 } from '../vec';

const rad = Math.PI / 180;

export interface OpcoesDeEmpurrar {
  modelo: ModeloDeEmpurrar;
  /** Quanto o glúteo e as costas afundam no estofado (cm). */
  amassa: number;
  /** Sentado e encostado, a lombar fica menos curva que em pé (graus). */
  lombar: number;
  /** Quanto da inclinação do peito o pescoço devolve, para o olhar ficar quase na horizontal (fração). */
  pescoco: number;
  /** Meia distância entre os pés (do meio ao centro da bola do pé). */
  pesMeia: number;
  /** O ângulo do joelho com o pé chapado no chão. */
  joelho: number;
  /** A escápula (graus da clavícula): à frente (negativo = para trás) e para cima (negativo = para baixo). */
  prot: number;
  elev: number;
  /** Para onde o cotovelo aponta, no referencial do tórax (x para a esquerda, y para cima, z para a frente), do lado R. */
  polo: V3;
  /**
   * Onde o pegador começa, no corpo com as mãos nele: a altura (y) e a posição à frente (z) que o centro da mão direita
   * tem de ter. A altura do assento e a posição inicial dos braços saem daí.
   */
  alvo: (corpo: Corpo, e: Esq) => { y: number; z: number };
  /** Em cima, quanto o cotovelo ainda dobra (graus). */
  cotoveloEmCima: number;
  /** Se dado, a posição inicial sai daqui (o cotovelo dobrado esse tanto, embaixo), e não do `z` do alvo. */
  cotoveloEmbaixo?: number;
}

/** O que a calibração dá, para um corpo: a bacia e o tronco com o assento no meio do curso. */
interface Sentado {
  y: number;
  z: number;
  deita: number;
  /** A altura do assento em que isso foi medido. */
  h: number;
}

/** Quanto da frente do assento não conta para o apoio do glúteo e da coxa (cm): a coxa se dobra sobre a borda. */
const ASSENTO_FRENTE = 12;
const g_ = (o: OpcoesDeEmpurrar) => (id: string) => obj(o.modelo.objeto, id);

/** O tronco sentado, deitado `deita` graus para trás, com a lombar menos curva e o pescoço compensando. */
export function troncoNaMaquina(corpo: Corpo, o: OpcoesDeEmpurrar, pelve: V3, deita: number, a: { lombar?: number; toracica?: number; frente?: number } = {}): Tronco {
  // quanto o peito fica deitado para trás: o pescoço devolve uma parte, para o olhar ficar quase na horizontal
  const peito = deita - (a.frente ?? 0) - o.lombar - (a.lombar ?? 0) - (a.toracica ?? 0);
  return resolverTronco(corpo, { pelve, frente: -deita + (a.frente ?? 0), lombar: o.lombar + (a.lombar ?? 0), toracica: a.toracica ?? 0, cervical: peito * o.pescoco, cabeca: 0 });
}

/** Os braços pendurados (só para a calibração do assento e do encosto). */
const PENDURADO: PoseBraco = { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };

/** Os pés chapados no chão, `bolaZ` à frente, na largura pedida. */
export function pesNoChao(o: OpcoesDeEmpurrar, bolaZ: number): Record<Lado, PosePerna> {
  const p = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * o.pesMeia, 0, bolaZ], dir: [sinal(k) * 0.15, 0, 1] }, polo: [sinal(k) * 0.25, 0.2, 1] });
  return { R: p('R'), L: p('L') };
}

/** Onde ficam os pés para o joelho dobrar o ângulo pedido, com a bacia nesse lugar. */
function bolaDosPes(o: OpcoesDeEmpurrar, t: Tronco): number {
  return resolver1((z) => resolverMembros(t, { R: PENDURADO, L: PENDURADO }, pesNoChao(o, z)).lado.R.ang.joelho - o.joelho, t.pelve.o[2] + 10, t.pelve.o[2] + 90, 30);
}

/** A pele do glúteo e da coxa sobre o assento na altura `h`: a menor distância acima do topo dele (cm; negativo = afunda). */
export function apoioNoAssentoDaMaquina(e: Esq, o: OpcoesDeEmpurrar, h: number): number {
  const g = g_(o);
  const meia = g('assentoLarg') / 2,
    c = g('assentoComp');
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    // do fundo do assento até `assentoFrente` cm da borda: a parte da coxa perto do joelho pode descer além da borda
    if (!['pelve', 'coxa', 'cintura'].includes(parte) || Math.abs(p[0]) > meia || p[2] > -ASSENTO_FRENTE || p[2] < -c) continue;
    min = Math.min(min, p[1] - h);
  }
  return min;
}

/** A folga das costas no encosto, na metade de baixo e na de cima dele (cm; negativo = entra). */
export function folgasNoEncosto(e: Esq, o: OpcoesDeEmpurrar): { baixo: number; cima: number } {
  const F = faceDoEncostoDaMaquina(o.modelo);
  const meia = g_(o)('assentoLarg') / 2 - 2;
  let baixo = 1e9,
    cima = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!['tronco', 'cintura', 'pelve'].includes(parte) || Math.abs(p[0]) > meia) continue;
    const d = sub(p, F.base);
    const s = dot(d, F.sobe);
    if (s < 4 || s > F.comp - 4) continue;
    const gap = dot(d, F.frente);
    if (s < F.comp / 2) baixo = Math.min(baixo, gap);
    else cima = Math.min(cima, gap);
  }
  return { baixo, cima };
}

/** A calibração: a bacia e o tronco, com o assento no meio do curso (uma vez por corpo e por exercício). */
function sentar(corpo: Corpo, o: OpcoesDeEmpurrar, chave: string): Sentado {
  return calibragem(corpo, `${chave}:sentado`, () => {
    const g = g_(o);
    const F = faceDoEncostoDaMaquina(o.modelo);
    const h = (g('assentoMin') + g('assentoMax')) / 2;
    const montar = (y: number, z: number, deita: number) => {
      const t = troncoNaMaquina(corpo, o, [0, y, z], deita);
      return resolverMembros(t, { R: PENDURADO, L: PENDURADO }, pesNoChao(o, bolaDosPes(o, t)));
    };
    let y = h + 10,
      z = -g('assentoComp') / 2,
      deita = g('encostoInclina');
    for (let i = 0; i < 5; i++) {
      // o glúteo no assento
      const z0 = z,
        d0 = deita;
      y = resolver1((yy) => apoioNoAssentoDaMaquina(montar(yy, z0, d0), o, h) + o.amassa, h - 5, h + 25, 30);
      // as costas paralelas ao encosto: a folga de baixo igual à de cima
      const y0 = y;
      deita = resolver1((d) => {
        const f = folgasNoEncosto(montar(y0, z0, d), o);
        return f.cima - f.baixo;
      }, -5, 35, 24);
      // e encostadas nele
      const f = folgasNoEncosto(montar(y, z, deita), o);
      z -= (Math.min(f.baixo, f.cima) + o.amassa) / F.frente[2];
    }
    return { y, z, deita, h };
  });
}

/** A bacia com o assento na altura `h`: o corpo desliza junto do encosto (sobe e anda para trás na inclinação dele). */
function baciaNaAltura(o: OpcoesDeEmpurrar, S: Sentado, h: number): V3 {
  const tan = Math.tan(g_(o)('encostoInclina') * rad);
  return [0, S.y + (h - S.h), S.z - (h - S.h) * tan];
}

/** As mãos nos pegadores, com os braços da máquina no ângulo dado. */
export function maosNosPegadores(o: OpcoesDeEmpurrar, t: Tronco, braco: number, a: { prot?: number; elev?: number } = {}): Record<Lado, PoseBraco> {
  const b = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const B = bracoNoAngulo(o.modelo, k, braco);
    return {
      pegada: B.centro,
      polo: norm(dirRef(t.torax, [s * -o.polo[0], o.polo[1], o.polo[2]])),
      mao: { polegar: B.dirPegador, forma: 'pegada', diam: g_(o)('pegadorDiam') },
      prot: o.prot + (a.prot ?? 0),
      elev: o.elev + (a.elev ?? 0),
    };
  };
  return { R: b('R'), L: b('L') };
}

const PES = new WeakMap<Corpo, Map<string, number>>();

/** Um desvio do tronco (os erros): a lombar, a torácica, a bacia e o quanto o tronco deita a menos; a escápula. */
export interface DesvioDeEmpurrar {
  lombar?: number;
  toracica?: number;
  frente?: number;
  /** Graus a menos de deita (o tronco vai à frente, saindo do encosto). */
  aFrente?: number;
  prot?: number;
  elev?: number;
}

/** O corpo sentado com o assento em `h`, os braços da máquina em `braco` e as mãos neles. */
export function corpoNaMaquina(corpo: Corpo, o: OpcoesDeEmpurrar, chave: string, h: number, braco: number, dv: DesvioDeEmpurrar = {}): Esq {
  const S = sentar(corpo, o, chave);
  const pelve = baciaNaAltura(o, S, h);
  const t = troncoNaMaquina(corpo, o, pelve, S.deita - (dv.aFrente ?? 0), dv);
  // onde ficam os pés para essa altura do assento (uma conta pequena; guardada só na memória, por corpo e altura)
  let pes = PES.get(corpo);
  if (!pes) PES.set(corpo, (pes = new Map()));
  const k = `${chave}|${h}`;
  let bola = pes.get(k);
  if (bola === undefined) pes.set(k, (bola = bolaDosPes(o, troncoNaMaquina(corpo, o, pelve, S.deita))));
  return resolverMembros(t, maosNosPegadores(o, t, braco, dv), pesNoChao(o, bola));
}

/**
 * O ângulo dos braços (entre `a0` e `a1`, de 2 em 2 graus) em que o pegador passa mais perto do ombro (o cotovelo mais
 * dobrado): daí para cima, o cotovelo só estende, e a posição inicial pelo cotovelo fica no ramo certo do arco.
 */
function maisPerto(corpo: Corpo, o: OpcoesDeEmpurrar, chave: string, h: number, a0: number, a1: number): number {
  let melhor = a0,
    max = -1;
  for (let a = a0; a <= a1; a += 2) {
    const c = corpoNaMaquina(corpo, o, chave, h, a).lado.R.ang.cotovelo;
    if (c > max) {
      max = c;
      melhor = a;
    }
  }
  return melhor;
}

/** As regulagens para um corpo: a altura do assento, a posição inicial e a final dos braços. */
export interface Regulagem {
  h: number;
  inicio: number;
  fim: number;
}

/**
 * A regulagem: a altura do assento e a posição inicial dos braços para o pegador começar no alvo, e o ângulo dos braços
 * em cima, onde o cotovelo dobra `cotoveloEmCima` graus. `desce` baixa o assento (o erro da altura) sem mudar a posição
 * inicial dos braços.
 */
export function regular(corpo: Corpo, o: OpcoesDeEmpurrar, chave: string, desce = 0): Regulagem {
  return calibragem(corpo, `${chave}:regulagem:${desce}`, () => {
    let h: number, inicio: number;
    if (desce) {
      const R0 = regular(corpo, o, chave);
      h = R0.h - desce;
      inicio = R0.inicio;
    } else {
      const g = g_(o);
      h = (g('assentoMin') + g('assentoMax')) / 2;
      inicio = g('bracoMeio');
      // o ramo de baixo do arco: no desenvolvimento, o pegador começa abaixo da horizontal do eixo
      const [a0, a1] = o.modelo.eixo === 'atras' ? [inicio - 40, inicio + 10] : [inicio - 60, inicio + 60];
      for (let i = 0; i < 16; i++) {
        const h0 = h;
        // o alvo, no corpo com as mãos nos pegadores (a escápula acompanha o braço)
        const A = o.alvo(corpo, corpoNaMaquina(corpo, o, chave, h, inicio));
        // a posição inicial: o cotovelo dobrado o que a ficha pede (supino) ou o pegador na frente do alvo (z)
        const cot = o.cotoveloEmbaixo;
        inicio =
          cot === undefined
            ? resolver1((a) => bracoNoAngulo(o.modelo, 'R', a).centro[2] - A.z, a0, a1, 30)
            : resolver1((a) => cot - corpoNaMaquina(corpo, o, chave, h0, a).lado.R.ang.cotovelo, maisPerto(corpo, o, chave, h0, a0, a1), a1, 30);
        // a altura do assento: o corpo sobe ou desce até o alvo ficar na altura do pegador
        h += 0.7 * (bracoNoAngulo(o.modelo, 'R', inicio).centro[1] - A.y);
      }
    }
    const h1 = h;
    const fim = resolver1((a) => corpoNaMaquina(corpo, o, chave, h1, a).lado.R.ang.cotovelo - o.cotoveloEmCima, inicio, inicio + 120, 30);
    return { h, inicio, fim };
  });
}

/**
 * O ângulo dos braços em que o cotovelo dobra `cotovelo` graus, com o desvio dado (para os erros): o primeiro, subindo
 * do fim certo de 1 em 1 grau; se o cotovelo não chega a tanto no arco, o ângulo em que ele mais estende.
 */
export function anguloComCotovelo(corpo: Corpo, o: OpcoesDeEmpurrar, chave: string, R: Regulagem, cotovelo: number, dv: DesvioDeEmpurrar, nome: string): number {
  return calibragem(corpo, `${chave}:cotovelo:${nome}`, () => {
    // passar do alcance (o braço não chega ao pegador) conta como passar do ângulo
    const c = (a: number) => {
      const L = corpoNaMaquina(corpo, o, chave, R.h, a, dv).lado.R;
      return L.falta.braco > 0.01 ? -1 : L.ang.cotovelo - cotovelo;
    };
    let melhor = R.inicio,
      min = 1e9;
    for (let a = R.inicio; a <= R.fim + 40; a += 1) {
      const v = c(a);
      if (v <= 0) return resolver1(c, a - 1, a, 24);
      if (v < min) {
        min = v;
        melhor = a;
      }
    }
    return melhor;
  });
}

/**
 * O quadro: o corpo, a máquina regulada para ele (o assento, a posição inicial, de onde as placas começam a subir) e as
 * marcas que as regras leem (../regras/maquinas-de-empurrar.ts e ../regras/cadeiras.ts).
 */
export function quadroNaMaquina(corpo: Corpo, o: OpcoesDeEmpurrar, chave: string, R: Regulagem, braco: number, placas: number, dv: DesvioDeEmpurrar = {}, extra: (e: Esq) => Record<string, V3> = () => ({})): Quadro {
  const e = corpoNaMaquina(corpo, o, chave, R.h, braco, dv);
  const M = maquinaDeEmpurrar({ braco, inicio: R.inicio, assento: R.h, placas }, o.modelo, { bracoDePertoAtras: true });
  const f = folgasNoEncosto(e, o);
  const bR = bracoNoAngulo(o.modelo, 'R', braco);
  return {
    esq: e,
    prims: [chao(-90, 90, -100, 110), ...M.prims],
    pecas: [{ ...M.fixa, cenario: true }, M.bracos.R, M.bracos.L, M.pilha],
    fios: [],
    cargas: [],
    marcas: {
      pegadorR: M.pegadores.R,
      pegadorL: M.pegadores.L,
      eixoR: bR.eixo,
      eixoDirR: bR.dirEixo,
      alavanca: [braco, R.inicio, g_(o)('cameDiam') / 2],
      pilha: [M.subida, 0, 0],
      assento: [apoioNoAssentoDaMaquina(e, o, R.h), 0, 0],
      costas: [Math.min(f.baixo, f.cima), 0, 0],
      costasBaixo: [f.baixo, f.cima, 0],
      regulagem: [R.h, R.inicio, R.fim],
      ...extra(e),
    },
  };
}

/** A altura da linha do meio do peito (a dos mamilos: `altura.peito` da tabela, abaixo de C7 em pé), no eixo do tronco. */
export const linhaDoPeito = (corpo: Corpo, e: Esq): number => add(e.torax.o, dirRef(e.torax, [0, -(corpo.m('altura.cervical') - corpo.m('altura.peito')), 0]))[1];
