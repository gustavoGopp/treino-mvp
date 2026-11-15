// Remada unilateral com halter apoiada no banco, no motor novo. Os números vêm da ficha
// (../dados/movimentos/remada-unilateral.json); o braço que puxa é o do núcleo ./remada.ts. O joelho e a mão esquerdos
// ficam no banco reto (a mão embaixo do ombro, o joelho embaixo do quadril, a canela deitada no estofado); o pé direito
// fica no chão, um pouco para o lado, com o joelho levemente dobrado; o braço direito (o de perto na vista de lado) puxa.
//
// A pose parada sai das medidas, e não de números postos à mão: a inclinação do peito é a da ficha; a altura do quadril
// sai do joelho no estofado; o ângulo da coxa de apoio é o único em que a mão chega ao banco, embaixo do ombro, com o
// cotovelo de apoio quase estendido (`resolver1`); o pé direito vai para a frente ou para trás até o joelho direito
// ficar no ângulo da ficha.
import { pontosDoBoneco } from '../boneco';
import ficha from '../dados/movimentos/remada-unilateral.json';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio } from '../movimento';
import { bancoReto, chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dist, norm } from '../vec';
import type { V3 } from '../vec';
import { criarRemada } from './remada';
import type { BaseDaRemada } from './remada';

const rad = Math.PI / 180;
const F = fichaSchema.parse(ficha);
const f = daFicha(F);

/** O ponto mais baixo da perna esquerda perto do joelho (a pele que encosta no estofado), em y. */
function apoioDoJoelho(e: Esq): number {
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'coxa' || parte === 'canela') && dist(p, e.lado.L.joelho) < 30 && p[0] > 0) min = Math.min(min, p[1]);
  return min;
}

function base(corpo: Corpo): BaseDaRemada {
  const m = (id: string) => corpo.m(id);
  const topo = obj('bancoReto', 'altura');
  const peito = f('tronco.inclinacao');
  const tronco = (pelve: V3): PoseTronco => ({ pelve, frente: peito, cervical: f('cervical'), cabeca: f('cabeca') });
  // a canela de apoio deitada no estofado, um pouco inclinada (o joelho é mais grosso que o tornozelo)
  const d = f('canela.desce') * rad;
  const canela: V3 = [0, -Math.sin(d), -Math.cos(d)];
  const pernaDeApoio = (th: number, pe = 30): PosePerna => ({ coxa: [0, -Math.cos(th * rad), -Math.sin(th * rad)], canela, peDir: [0, -Math.sin(pe * rad), -Math.cos(pe * rad)], polo: [0, -0.2, 1] });
  const maoNoBanco = (punho: V3): PoseBraco => ({ punho, polo: [0.25, 0, -1], mao: { polegar: [-1, 0, 0.25], dedos: [0.08, 0, 1], forma: 'aberta' } });
  const semBraco: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const livre: PosePerna = { coxa: [0, -1, 0], canela: [0, -1, 0], polo: [0, 0, 1] };
  /** O corpo com a coxa de apoio `th` graus atrás da vertical, o joelho apoiado no estofado e a mão no banco. */
  function apoiado(th: number, pe = pernaDeApoio(th)) {
    let pelve: V3 = [0, 90, 0];
    for (let i = 0; i < 2; i++) {
      const e = resolverMembros(resolverTronco(corpo, tronco(pelve)), { R: semBraco, L: semBraco }, { R: livre, L: pe });
      pelve = [0, pelve[1] + topo - f('joelho.afunda') - apoioDoJoelho(e), 0];
    }
    const t = resolverTronco(corpo, tronco(pelve));
    // a mão de apoio no banco, embaixo do ombro (o punho na altura da mão espalmada, como na flexão); o ombro sai do
    // braço já apoiado (a clavícula acompanha o braço), por isso a conta é repetida
    let punho: V3 = [0, 0, 0],
      e = resolverMembros(t, { R: semBraco, L: semBraco }, { R: livre, L: pe });
    for (let i = 0; i < 3; i++) {
      const o = e.lado.L.ombro;
      punho = [o[0] - f('apoio.maoParaDentro'), topo + m('raio.punho') * 0.85, o[2] + f('apoio.maoAFrente') - m('mao.palma') * 0.45];
      e = resolverMembros(t, { R: semBraco, L: maoNoBanco(punho) }, { R: livre, L: pe });
    }
    return { pelve, t, punho, e };
  }
  let th = resolver1((x) => apoiado(x).e.lado.L.ang.cotovelo - f('apoio.cotovelo'), -25, 35, 30);
  // num corpo de pernas curtas, o pé direito não chegaria ao chão com o joelho no ângulo da ficha: a coxa de apoio
  // inclina até o quadril baixar o bastante (o cotovelo de apoio dobra um pouco mais)
  {
    const a = (f('joelho.R') * Math.PI) / 180,
      th1 = m('coxa.comp'),
      sk = m('perna.comp');
    const d = Math.sqrt(th1 * th1 + sk * sk + 2 * th1 * sk * Math.cos(a));
    const alto = m('altura.maleolo') + Math.sqrt(d * d - f('pe.R.paraFora') ** 2) - f('joelho.R.folga');
    if (apoiado(th).pelve[1] > alto) th = resolver1((x) => apoiado(x).pelve[1] - alto, th, th + 50, 30);
  }
  // o pé de apoio solto, com o peito do pé deitado no estofado: ele gira no tornozelo até encostar
  const ladoDoPe = (e: Esq) => {
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pe' && p[0] > 0) min = Math.min(min, p[1]);
    return min;
  };
  const giroDoPe = resolver1((g) => ladoDoPe(resolverMembros(resolverTronco(corpo, tronco(apoiado(th).pelve)), { R: semBraco, L: semBraco }, { R: livre, L: pernaDeApoio(th, g) })) - (topo - f('joelho.afunda')), -40, 60, 24);
  const A = apoiado(th, pernaDeApoio(th, giroDoPe));
  const apoio = maoNoBanco(A.punho);
  // o pé direito no chão, um pouco para o lado; ele vai para a frente ou para trás até o joelho ficar no ângulo da ficha
  const xPe = -(m('quadril.meiaDistancia') + f('pe.R.paraFora'));
  const pernaR = (z: number): PosePerna => ({ pe: { bola: [xPe, 0, z], dir: norm([-0.15, 0, 1]), calc: 0 }, polo: norm([-0.15, 0, 1]) });
  const joelhoR = (z: number) => resolverMembros(A.t, { R: semBraco, L: apoio }, { R: pernaR(z), L: pernaDeApoio(th, giroDoPe) }).lado.R.ang.joelho;
  const zPe = resolver1((z) => joelhoR(z) - f('joelho.R'), A.pelve[2] + m('pe.calcanharABola') - m('pe.calcanharAoTornozelo'), A.pelve[2] + 40, 30);
  // o banco: a ponta da frente um pouco além da mão; ele fica entre a mão e o joelho, de lado
  const zFrente = A.punho[2] + m('mao.palma') + f('banco.alemDaMao');
  const z0 = zFrente - obj('bancoReto', 'comp') / 2,
    x0 = (A.punho[0] + A.e.lado.L.joelho[0]) / 2;
  return {
    tronco: tronco(A.pelve),
    pernas: { R: pernaR(zPe), L: pernaDeApoio(th, giroDoPe) },
    apoio,
    prims: [chao(-90, 90, -120, 110), ...bancoReto(x0, z0)],
    pecas: [{ t: 'bancoReto', x0, z0 }],
    marcas: { maoDeApoio: A.punho, topoDoBanco: [x0, topo, z0] },
  };
}

const R = criarRemada(ficha, { bracos: 'R', carga: 'halter', base, erros: { girar: 'girar', arredondar: 'arredondar', curta: 'curta' } });

export const remadaUnilateral: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro: R.quadro,
  // dorsal e meio das costas (principal) e ombro de trás e bíceps (secundários), do lado que puxa: a ficha da técnica e
  // a biblioteca (`costas`; `biceps`, `ombro_posterior`)
  papeis: { 'dorsal:R': 'p', 'trapMedInf:R': 'p', 'deltPost:R': 's', 'biceps:R': 's' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
