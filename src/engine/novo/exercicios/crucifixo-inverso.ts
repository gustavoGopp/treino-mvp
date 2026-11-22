// Crucifixo inverso com halteres, peito apoiado no banco inclinado, no motor novo. Os números vêm da ficha
// (../dados/movimentos/crucifixo-inverso.json). A cena e o corpo deitado são os da remada apoiada aprovada
// (./remada-apoiada.ts, `baseNoEncostoDaRemada`): o banco regulável girado meia volta, o encosto a 45°, a pessoa de
// bruços com o peito e a barriga no encosto, o queixo além da ponta e os pés na ponta, no chão, dos dois lados do
// banco. Só os braços se mexem. O que se resolve em cada quadro, em vez de receber pronto:
//  - a linha do ombro ao centro da mão, no mundo: de pendurada (quase na vertical) até perto da horizontal, para o
//    lado; ela gira em volta da direção para a frente, de modo que a mão sobe para o lado sem ir à frente nem para trás;
//  - o cotovelo dobrado sempre o mesmo tanto, apontando para fora (para onde o braço abre) e um pouco para trás;
//  - a mão com o polegar para a frente: embaixo, as palmas ficam uma para a outra; em cima, viradas para o chão;
//  - as escápulas: um pouco à frente no começo e só acompanhando o braço no fim (sem se juntar com força), com os
//    ombros baixos o tempo todo.
import ficha from '../dados/movimentos/crucifixo-inverso.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Lado, PoseBraco, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { lerp, mix, norm, perp } from '../vec';
import type { V3 } from '../vec';
import { halterNaMao } from './dobrar-o-cotovelo';
import { bracoNaLinha, dobrar } from './na-fita';
import { baseNoEncostoDaRemada } from './remada-apoiada';
import type { BaseDaRemada } from './remada';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const HALTER = 'halterLeve';

const BASES = new WeakMap<Corpo, BaseDaRemada>();
function base(corpo: Corpo): BaseDaRemada {
  let b = BASES.get(corpo);
  if (!b) BASES.set(corpo, (b = baseNoEncostoDaRemada(corpo)));
  return b;
}

/**
 * A linha do ombro à mão, no mundo, com `abre` graus a partir da vertical (0 = pendurada; 90 = na horizontal, para o
 * lado), e a direção para onde o braço abre (perpendicular a ela, para fora e para cima).
 */
function linha(k: Lado, abre: number): { dir: V3; sobe: V3 } {
  const s = sinal(k),
    a = abre * rad;
  return { dir: [s * Math.sin(a), -Math.cos(a), 0], sobe: [s * Math.cos(a), Math.sin(a), 0] };
}
/** Quanto o braço abre (graus da vertical), de u = 0 (pendurado) a 1 (perto da linha dos ombros). */
const abertura = (u: number) => mix(f('inicio.fora'), 90 - f('fim.abaixo'), u);

function braco(corpo: Corpo, k: Lado, u: number, erro?: string): PoseBraco {
  const { dir, sobe } = linha(k, abertura(u));
  const polo = norm([sobe[0], sobe[1], -f('cotovelo.paraTras')]);
  let umero: V3, antebraco: V3;
  if (erro === 'cotovelo') {
    // o braço (do ombro ao cotovelo) abre como o certo, mas o cotovelo dobra e o antebraço fica pendurado embaixo dele:
    // a mão não sai de baixo do cotovelo (uma remada com os cotovelos abertos)
    const x = suave(u);
    const certo = bracoNaLinha(corpo, dir, polo, f('cotovelo'));
    umero = norm(lerp(certo.umero, linha(k, mix(abertura(0), 90 - f('erro.cotovelo.abaixo'), u)).dir, x));
    // o antebraço dobra a partir da linha do braço em direção ao chão, até `erro.cotovelo.dobra` graus
    // (no começo, igual ao certo)
    antebraco = norm(lerp(certo.antebraco, dobrar(umero, [0, -1, 0], f('erro.cotovelo.dobra')), x));
  } else ({ umero, antebraco } = bracoNaLinha(corpo, dir, polo, f('cotovelo')));
  // o polegar para a frente (o cabo do halter de frente para trás)
  const polegar = norm(perp([0, 0, 1], antebraco));
  const elev = f('escapula.elev') + (erro === 'encolher' ? (f('erro.encolher.elev') - f('escapula.elev')) * suave(u) : 0);
  return { umero, antebraco, polo, mao: { polegar, forma: 'pegada', diam: obj(HALTER, 'caboDiam') }, elev, prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u) };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const b = base(corpo);
  const tr: PoseTronco = { ...b.tronco };
  if (erro === 'peito') {
    // o embalo: o tronco levanta do encosto em volta do quadril, com a lombar arqueando um pouco
    const x = suave(u);
    tr.frente = (tr.frente ?? 0) - f('erro.peito.tronco') * x;
    tr.lombar = (tr.lombar ?? 0) + f('erro.peito.lombar') * x;
  }
  const t = resolverTronco(corpo, tr);
  const e = resolverMembros(t, { R: braco(corpo, 'R', u, erro), L: braco(corpo, 'L', u, erro) }, b.pernas);
  const q: Quadro = { esq: e, prims: [...b.prims], pecas: [...b.pecas], fios: [], cargas: [], marcas: { ...b.marcas }, vies: { maoR: 1, maoL: 1 } };
  for (const k of ['R', 'L'] as Lado[]) {
    const H = halterNaMao(e, k, HALTER);
    q.prims.push(...H.prims);
    q.pecas!.push(H.peca);
    q.cargas.push({ massa: f('carga'), pos: H.centro });
  }
  q.marcas.halter = e.lado.R.pegada;
  return q;
}

export const crucifixoInverso: Exercicio = {
  ficha: F,
  vistas: ['posterior', 'quinaTras'],
  quadro,
  // só o ombro de trás, sem secundário (achado 5 da revisão de anatomia; a ficha da técnica)
  papeis: { deltPost: 'p' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
