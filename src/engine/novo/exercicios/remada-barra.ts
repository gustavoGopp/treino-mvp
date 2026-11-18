// Remada curvada com barra, no motor novo. Os números vêm da ficha (../dados/movimentos/remada-barra.json).
// O corpo parado é o do stiff (./dobrar-o-quadril.ts), como na remada curvada com halteres aprovada: pés na largura do
// quadril, joelhos um pouco dobrados, o quadril para trás e o tronco inclinado com a coluna reta, com o centro de massa
// (corpo + barra a meio caminho da puxada) sobre o meio do pé. Daí em diante o quadril e o tronco ficam parados e as
// duas mãos levam a barra longa com anilhas (../pecas-de-cena/barra-longa.ts), rígida e na horizontal, de pendurada
// embaixo dos ombros até encostar na barriga; os braços se resolvem até ela, com os cotovelos para trás, rente ao corpo.
import ficha from '../dados/movimentos/remada-barra.json';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { barraLonga, massaDaBarra, raioDaPegada } from '../pecas-de-cena/barra-longa';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import type { Corpo } from '../tabelas';
import { add, dirRef, mix, mul, noRef, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { PERNAS, folgaDaBarraNosPontos, peleDensa } from './com-barra-longa';
import { alcanceDoBraco, dobrarOQuadril } from './dobrar-o-quadril';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const ANILHAS: IdAnilha[] = f('anilhas') === 20 ? ['anilha20'] : f('anilhas') === 10 ? ['anilha10'] : ['anilha5'];
const MASSA = massaDaBarra(ANILHAS);
const BARRIGA: ReadonlySet<string> = new Set(['tronco', 'cintura', 'emendaDaCintura', 'pelve']);
const X = () => f('maos.meiaDistancia');

/** As duas mãos na barra (o centro dela em `c`), com os cotovelos para o lado do `polo` (no tronco). */
function bracosNaBarra(t: Tronco, c: V3, u: number, fora: number, quadril: number): Record<Lado, PoseBraco> {
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // no tronco: −z é para trás (para o teto, com o tronco inclinado) e −y é para o lado do quadril
    const polo = norm(dirRef(t.torax, [s * fora, -quadril, -1]));
    return {
      pegada: [s * X(), c[1], c[2]],
      polo,
      // pegada pronada: a palma para as pernas, o polegar por dentro
      mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: 2 * raioDaPegada() },
      elev: mix(f('escapula.elev.inicio'), f('escapula.elev.fim'), u),
      prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u),
    };
  };
  return { R: braco('R'), L: braco('L') };
}

/** O meio dos dois ombros e o dos dois quadris. */
const meio = (e: Esq, p: 'ombro' | 'quadril'): V3 => mul(add(e.lado.R[p], e.lado.L[p]), 0.5);
/**
 * Onde a barra fica pendurada, com os braços estendidos (o cotovelo dobra o que a ficha dá): embaixo do meio dos ombros,
 * com as mãos na largura da pegada. Se ela chegaria a menos de `barra.livre` da pele das coxas e dos joelhos, os braços
 * vão à frente só o necessário.
 */
function pendurada(e: Esq): V3 {
  const o = meio(e, 'ombro');
  const a = alcanceDoBraco(e.corpo, f('cotovelo.inicio'));
  const dx = X() - Math.abs(e.lado.R.ombro[0]);
  const r = Math.sqrt(a * a - dx * dx);
  const naFrente = (g: number): V3 => [0, o[1] - r * Math.cos(g), o[2] + r * Math.sin(g)];
  const pele = peleDensa(e, PERNAS);
  const livre = (g: number) => {
    const c = naFrente(g);
    return folgaDaBarraNosPontos(pele, [-X(), c[1], c[2]], [X(), c[1], c[2]]) - f('barra.livre');
  };
  if (livre(0) >= 0) return naFrente(0);
  let g = 0;
  while (livre(g) < 0 && g < 0.6) g += 0.02;
  return naFrente(resolver1(livre, g - 0.02, g, 12));
}
/**
 * Onde a barra encosta no tronco: na linha que sai do ponto a `t` do caminho do meio dos ombros ao meio dos quadris e
 * vai para a frente do tronco (para baixo, com ele inclinado), a barra chega até ficar a `folga` da pele da barriga.
 * Vem de longe, em passos de meio centímetro, porque a pele só é medida por fora.
 */
function encostada(e: Esq, t: number, folga: number): V3 {
  const o = meio(e, 'ombro'),
    h = meio(e, 'quadril');
  const base = add(o, mul(sub(h, o), t));
  const frente = e.torax.z;
  const P = (d: number): V3 => add(base, mul(frente, d));
  const pele = peleDensa(e, BARRIGA);
  const fol = (d: number) => {
    const c = P(d);
    return folgaDaBarraNosPontos(pele, [-X(), c[1], c[2]], [X(), c[1], c[2]]) - folga;
  };
  let d = 40;
  while (d > 0 && fol(d - 0.5) >= 0) d -= 0.5;
  return P(resolver1(fol, d - 0.5, d, 12));
}

interface Base {
  tronco: PoseTronco;
  pernas: Record<Lado, PosePerna>;
  /** O caminho da barra no tronco parado (no referencial do tórax): pendurada, na barriga e, no erro, no peito. */
  ini: V3;
  fim: V3;
  peito: V3;
}
/** Os braços na barra com o centro em `c`, resolvidos no tronco `t`. */
const comBarra = (t: Tronco, pernas: Record<Lado, PosePerna>, c: V3, u: number, fora = f('cotovelo.polo.fora'), quadril = f('cotovelo.polo.quadril')) => resolverMembros(t, bracosNaBarra(t, c, u, fora, quadril), pernas);
const BASES = new Map<Corpo, Base>();
/**
 * A pose parada: o stiff com o tronco inclinado o que a ficha pede. O equilíbrio é feito com a barra a meio caminho da
 * puxada (30 kg andando uns 30 cm: a pessoa se acerta para o meio), em duas passadas (o caminho depende da pose). O
 * caminho da barra vem junto, guardado para o corpo do app (../calibragens.ts).
 */
function base(corpo: Corpo): Base {
  const ja = BASES.get(corpo);
  if (ja) return ja;
  const pe = (b: V3): PosePerna => ({ pe: { bola: b, dir: [0, 0, 1], calc: 0 }, polo: [0, 0, 1] });
  const r = calibragem(corpo, `${F.id}:base`, () => {
    let c: V3 | undefined;
    let D: ReturnType<typeof dobrarOQuadril> | undefined;
    let ini: V3 = [0, 0, 0],
      fim: V3 = [0, 0, 0],
      peito: V3 = [0, 0, 0];
    for (let i = 0; i < 2; i++) {
      D = dobrarOQuadril(corpo, {
        joelho: f('joelho'),
        tronco: f('tronco.inclinacao'),
        lombar: 0,
        toracica: 0,
        cervical: f('cervical'),
        cabeca: f('cabeca'),
        pesMeiaDistancia: f('pes.meiaDistancia'),
        apoio: 'dois',
        bracos(e) {
          const p = c ?? pendurada(e);
          return { ...bracosNaBarra(e, p, 0, f('cotovelo.polo.fora'), f('cotovelo.polo.quadril')), cargas: [{ massa: MASSA, pos: p }] };
        },
      });
      // o caminho nessa pose: cada ponta com os braços já nela (o braço move a clavícula e o ombro)
      const t = resolverTronco(corpo, D.e.pose);
      const pernas = { R: pe(D.bola(-1)), L: pe(D.bola(1)) };
      ini = pendurada(D.e);
      ini = pendurada(comBarra(t, pernas, ini, 0));
      fim = encostada(D.e, f('barra.fim.noTronco'), f('barra.fim.folga'));
      fim = encostada(comBarra(t, pernas, fim, 1), f('barra.fim.noTronco'), f('barra.fim.folga'));
      peito = encostada(comBarra(t, pernas, fim, 1, f('erro.peito.fora'), 0), f('erro.peito.noTronco'), f('barra.fim.folga'));
      c = mul(add(ini, fim), 0.5);
    }
    const T = resolverTronco(corpo, D!.e.pose).torax;
    return { tronco: D!.e.pose, bola: [D!.bola(-1), D!.bola(1)], ini: paraRef(T, ini), fim: paraRef(T, fim), peito: paraRef(T, peito) };
  });
  const b: Base = { tronco: r.tronco, pernas: { R: pe(r.bola[0]!), L: pe(r.bola[1]!) }, ini: r.ini, fim: r.fim, peito: r.peito };
  BASES.set(corpo, b);
  return b;
}

/** O tronco do instante: parado, a não ser nos erros que o movem. */
function troncoDoInstante(corpo: Corpo, b: Base, u: number, erro?: string): Tronco {
  const tr: PoseTronco = { ...b.tronco };
  if (erro === 'e1') {
    // a coluna curva: a lombar e a parte de cima das costas dobram e a bacia vira para trás o bastante para a base do
    // pescoço ficar na mesma altura (os ombros não sobem nem caem: as costas fazem uma corcunda)
    const lo = f('erro.arredondar.lombar') * u,
      to = f('erro.arredondar.toracica') * u;
    tr.lombar = (tr.lombar ?? 0) + lo;
    tr.toracica = (tr.toracica ?? 0) + to;
    tr.cervical = (tr.cervical ?? 0) - f('erro.arredondar.cervical') * u;
    const alvo = resolverTronco(corpo, b.tronco).torax.o[1];
    const f0 = b.tronco.frente ?? 0;
    tr.frente = resolver1((x) => resolverTronco(corpo, { ...tr, frente: x }).torax.o[1] - alvo, f0 - lo - to - 20, f0 + 10, 30);
  }
  if (erro === 'e2') tr.frente = (tr.frente ?? 0) - f('erro.subir.tronco') * u;
  return resolverTronco(corpo, tr);
}
/**
 * Na lombar arredondada, a barriga muda de forma e chega perto das coxas: o fim do caminho é achado de novo, encostado
 * nela, com as costas já curvadas; se no caminho até lá a barra encostaria nas coxas, ela para ali (guardado para o
 * corpo do app). Nos outros erros, o caminho anda junto com o tórax.
 */
const FIM_E1 = new Map<Corpo, V3>();
function fimDoArredondado(corpo: Corpo, b: Base): V3 {
  const ja = FIM_E1.get(corpo);
  if (ja) return ja;
  const v = calibragem(corpo, `${F.id}:fim-e1`, () => {
    const t = troncoDoInstante(corpo, b, 1, 'e1');
    const ini = noRef(t.torax, b.ini);
    const fimCom = (noTronco: number) => {
      let fim = noRef(t.torax, b.fim);
      for (let i = 0; i < 2; i++) fim = encostada(comBarra(t, b.pernas, fim, 1), noTronco, f('barra.fim.folga'));
      return fim;
    };
    // o ponto da barriga mais perto do quadril em que o caminho não entra nas coxas (medido na metade, em três quartos e
    // no fim): com as costas curvadas, a barriga e as coxas se aproximam
    const livre = (noTronco: number) => {
      const fim = fimCom(noTronco);
      return Math.min(
        ...[0.5, 0.75, 1].map((x) => {
          const c = mix3(ini, fim, x);
          return folgaDaBarraNosPontos(peleDensa(comBarra(t, b.pernas, c, 1), PERNAS), [-X(), c[1], c[2]], [X(), c[1], c[2]]);
        }),
      );
    };
    let noTronco = f('barra.fim.noTronco');
    while (livre(noTronco) < 0 && noTronco > 0.3) noTronco -= 0.02;
    return paraRef(t.torax, fimCom(noTronco));
  });
  FIM_E1.set(corpo, v);
  return v;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const b = base(corpo);
  const t = troncoDoInstante(corpo, b, u, erro);
  const peito = erro === 'e3';
  // o caminho da barra, no tórax: da pendurada à barriga (no erro, ao peito); nos erros que movem o tronco, vai junto
  const fim = peito ? mix3(b.fim, b.peito, u) : erro === 'e1' ? mix3(b.fim, fimDoArredondado(corpo, b), u) : b.fim;
  const c = noRef(t.torax, mix3(b.ini, fim, u));
  const fora = peito ? mix(f('cotovelo.polo.fora'), f('erro.peito.fora'), u) : f('cotovelo.polo.fora');
  const quadril = peito ? mix(f('cotovelo.polo.quadril'), 0, u) : f('cotovelo.polo.quadril');
  const e = comBarra(t, b.pernas, c, u, fora, quadril);
  const B = barraLonga({ centro: c, eixo: [1, 0, 0], anilhas: ANILHAS });
  return {
    esq: e,
    prims: [chao(-70, 70, -100, 100), ...B.prims],
    pecas: [B.peca],
    fios: [],
    cargas: [{ massa: MASSA, pos: c }],
    marcas: { barra: c, pegaR: [-X(), c[1], c[2]], pegaL: [X(), c[1], c[2]] },
  };
}
const mix3 = (a: V3, b: V3, u: number): V3 => [mix(a[0], b[0], u), mix(a[1], b[1], u), mix(a[2], b[2], u)];

export const remadaBarra: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // costas (dorsal e meio das costas) em vermelho; bíceps e ombro de trás em laranja, como na remada curvada com halteres
  // aprovada (a biblioteca: primário costas; secundários bíceps e ombro de trás)
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { barra: (q) => q.marcas.barra!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
