// Remada unilateral com elástico sob o pé da frente, no motor novo. Os números vêm da ficha
// (../dados/movimentos/remada-unilateral-elastico.json). O corpo parado é o da remada unilateral sem banco aprovada
// (./remada-sem-banco.ts: o pé esquerdo à frente, o direito atrás, a mão esquerda na coxa da frente, o tronco inclinado)
// e o braço direito puxa como lá (núcleo ./remada.ts). O pé da frente pisa no meio do tubo da tabela (48 pol), inteiro,
// sob o meio da sola; o tubo, dobrado ao meio, passa sob a sola em dois trechos lado a lado (a dobra fica embaixo do
// lado de fora do pé) e os dois sobem juntos, pelo lado de dentro da perna da frente, até a mão direita, que segura os
// dois pegadores juntos ("a ponta do elástico na mão do lado de trás"). O elástico, pisado e seguro pelo mesmo corpo,
// não pesa no equilíbrio. O erro "pisar só com a ponta do pé" é pose: o calcanhar da frente sobe, o corpo sobe e vai
// junto com o tornozelo, e o tubo fica sob a ponta dos dedos.
import ficha from '../dados/movimentos/remada-unilateral-elastico.json';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Peca } from '../pecas';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { comprimento } from './elastico-faixa';
import { bordasDaSolaEm, trechoAteOPe } from './elastico-pisado';
import { criarRemada } from './remada';
import type { BaseDaRemada } from './remada';
import { baseSemBanco, peleDaCoxa } from './remada-sem-banco';

const f = daFicha(fichaSchema.parse(ficha));
/** O meio da sola, do calcanhar à ponta do pé (como na curvada com elástico e na rosca com elástico aprovada). */
const MEIO_DA_SOLA = 0.4;

/**
 * O erro do pé: a mesma base, com o calcanhar da frente levantado. O quadril fica onde estava (a perna de trás, quase
 * estendida, não deixa o corpo subir), o joelho da frente dobra mais, e a mão de apoio vai junto com a coxa: fica no
 * mesmo ponto dela, assentada na pele como em ./remada-sem-banco.ts.
 */
function naPonta(b: BaseDaRemada, corpo: Corpo): BaseDaRemada {
  const m = (id: string) => corpo.m(id);
  const solto: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const t = resolverTronco(corpo, b.tronco);
  const antes = resolverMembros(t, { R: solto, L: b.apoio! }, b.pernas);
  const L0 = antes.lado.L;
  // em que ponto da coxa (0 = quadril, 1 = joelho) o meio da mão apoia
  const eixo0 = sub(L0.joelho, L0.quadril);
  const naCoxa = dot(sub(L0.pegada, L0.quadril), eixo0) / dot(eixo0, eixo0);
  const pernas = { R: b.pernas.R, L: { ...b.pernas.L, pe: { ...b.pernas.L.pe!, calc: f('erro.pe.calcanhar') } } };
  let e = resolverMembros(t, { R: solto, L: b.apoio! }, pernas);
  let apoio = b.apoio!;
  for (let i = 0; i < 3; i++) {
    const P = peleDaCoxa(e, naCoxa);
    const dedos = norm(sub(e.lado.L.joelho, e.lado.L.quadril));
    const punho = sub(add(P.p, mul(P.n, m('raio.punho') * 0.85)), mul(dedos, m('mao.palma') * 0.45));
    apoio = { ...b.apoio!, punho, mao: { ...b.apoio!.mao, dedos } };
    e = resolverMembros(t, { R: solto, L: apoio }, pernas);
  }
  return { ...b, pernas, apoio, marcas: { ...b.marcas, maoDeApoio: apoio.punho! } };
}

const ERROS = { gira: 'girar', costas: 'arredondar' } as const;
const R = criarRemada(ficha, { bracos: 'R', carga: 'elastico', base: (c) => baseSemBanco(c, f), erros: ERROS });
const NA_PONTA = criarRemada(ficha, { bracos: 'R', carga: 'elastico', base: (c) => naPonta(baseSemBanco(c, f), c), erros: ERROS });

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const q = erro === 'pe' ? NA_PONTA.quadro(corpo, u) : R.quadro(corpo, u, erro);
  const e = q.esq;
  const t = erro === 'pe' ? f('erro.pe.sola') : MEIO_DA_SOLA;
  const d = f('elastico.entreOsTrechos') / 2;
  // os dois trechos sob a sola do pé da frente (o esquerdo), lado a lado; a dobra na borda de fora
  const a = bordasDaSolaEm(corpo, e, 'L', t, d),
    b = bordasDaSolaEm(corpo, e, 'L', t, -d);
  // da borda de dentro, cada trecho sobe até a mão direita, contornando a perna da frente por dentro (para −x)
  const dentro: V3 = [-1, 0, 0];
  const A = trechoAteOPe(e, 'R', a.dentro, dentro, f('elastico.folgaNaPerna'));
  const B = trechoAteOPe(e, 'R', b.dentro, dentro, f('elastico.folgaNaPerna'));
  const pts = [...A.pts, a.fora, b.fora, ...B.pts.slice().reverse()];
  const comp = comprimento(pts);
  const L = e.lado.R;
  // os dois pegadores juntos na mão fechada, um ao lado do outro ao longo da pegada
  const pegs: Peca[] = [pegadorNaMao(add(L.pegada, mul(norm(L.mao.x), 0.9)), L.mao.x, A.ponta, 'pegadorA'), pegadorNaMao(add(L.pegada, mul(norm(L.mao.x), -0.9)), L.mao.x, B.ponta, 'pegadorB')];
  return {
    ...q,
    prims: [...q.prims, { t: 'fio', pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas: [...(q.pecas ?? []), { t: 'elastico', pts, estica: comp / obj('elastico', 'comp') }, ...pegs],
    fios: [{ id: 'elastico', comp, estica: true }],
    marcas: { ...q.marcas, mao: L.pegada, solaLfora: a.fora, solaLdentro: a.dentro, solaLfora2: b.fora, solaLdentro2: b.dentro, pegadorR: L.pegada },
    vies: { ...q.vies, maoR: 1 },
  };
}

export const remadaUnilateralElastico: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'quina'],
  quadro,
  // costas (dorsal e meio das costas) do lado que puxa; bíceps e ombro de trás ajudam (a ficha e a biblioteca)
  papeis: { 'dorsal:R': 'p', 'trapMedInf:R': 'p', 'deltPost:R': 's', 'biceps:R': 's' },
  trajetorias: { mão: (q) => q.marcas.mao!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
