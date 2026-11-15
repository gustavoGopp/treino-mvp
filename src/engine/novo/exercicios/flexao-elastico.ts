// Flexão de braço com elástico, no motor novo. Os números vêm da ficha (../dados/movimentos/flexao-elastico.json); o
// movimento é o da flexão (núcleo ./flexionar.ts). O elástico é o tubo da tabela de objetos: o meio dele passa pelas
// costas, na altura das escápulas, e cada ponta dá uma volta na mão e fica presa entre a palma e o chão. O tubo
// segue a pele das costas (medida na superfície do Boneco), desce pelo lado de fora do braço até o dorso da mão, e
// estica mais em cima, onde as costas ficam mais longe do chão. O pegador fica no chão, ao lado da mão.
import ficha from '../dados/movimentos/flexao-elastico.json';
import { pontosDoBoneco } from '../boneco';
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import { daFicha } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, lerp, noRef, paraRef } from '../vec';
import type { V3 } from '../vec';
import { criarFlexao } from './flexionar';

function cena(q: Quadro, corpo: Corpo, _u: number, erro?: string): void {
  const f = daFicha(A.ficha);
  const e = q.esq,
    T = e.torax;
  const nivel = -(erro === 'pescoco' ? f('erro.pescoco.abaixoDeC7') : f('elastico.abaixoDeC7'));
  // a pele das costas (e do pescoço) na altura do elástico, no referencial do tórax
  const pele = pontosDoBoneco(e)
    .filter((x) => x.parte === 'tronco' || x.parte === 'pescoco')
    .map((x) => paraRef(T, x.p))
    .filter((l) => Math.abs(l[1] - nivel) < 2.5);
  /** O ponto das costas mais para trás perto de x = xc (o tubo deita sobre a pele). */
  const costa = (xc: number): V3 => {
    let z = 1e9;
    for (const l of pele) if (Math.abs(l[0] - xc) < 2.5) z = Math.min(z, l[2]);
    return noRef(T, [xc, nivel, z - f('elastico.folgaNasCostas')]);
  };
  // até onde as costas vão para o lado, nessa altura
  const largura = Math.max(...pele.map((l) => Math.abs(l[0])));
  const meio = costa(0);
  /** Do lado k: o dorso da mão (onde o tubo sai da volta) e a quina das costas, perto da axila. */
  const dorso = (k: Lado): V3 => add(lerp(e.lado[k].punho, e.lado[k].pegada, 0.5), [0, corpo.m('raio.punho') * 0.9, 0]);
  const palma = (k: Lado): V3 => [e.lado[k].pegada[0], obj('elastico', 'tuboDiam') / 2, e.lado[k].pegada[2]];
  // por cima da parte de trás do ombro: o tubo sai das costas, passa por fora do deltoide e desce até o dorso da mão
  const ombroFora = (k: Lado): V3 => {
    const s = sinal(k),
      O = e.lado[k].ombro;
    const fora = corpo.m('largura.bideltoide') / 2 - corpo.m('ombro.meiaDistancia') + f('elastico.folgaNasCostas');
    return [O[0] + s * fora * Math.abs(T.x[0]), O[1] - T.z[1] * f('elastico.atrasDoOmbro'), O[2] - T.z[2] * f('elastico.atrasDoOmbro')];
  };
  const lado = (k: Lado): V3[] => {
    const s = sinal(k);
    return [dorso(k), ombroFora(k), costa(s * largura * 0.6)];
  };
  const R = lado('R'),
    L = lado('L');
  const pts: V3[] = [...R, meio, ...L.reverse()];
  let caminho = 0;
  for (let i = 1; i < pts.length; i++) caminho += dist(pts[i - 1]!, pts[i]!);
  // o tubo inteiro: o caminho entre as mãos e uma volta em cada mão
  const comp = caminho + 2 * f('elastico.voltaNaMao');
  const pecas: Peca[] = [{ t: 'elastico', pts, estica: comp / obj('elastico', 'comp') }];
  for (const k of ['R', 'L'] as Lado[]) {
    // o pegador no chão, logo atrás da mão (para o lado dos pés), preso à ponta do tubo que sai debaixo da palma
    const P = palma(k),
      saida: V3 = [P[0], P[1], e.lado[k].punho[2] - corpo.m('raio.punho')];
    const pegada: V3 = [P[0], obj('elastico', 'pegadorDiam') / 2, saida[2] - obj('elastico', 'fita')];
    pecas.push({ t: 'pegador', pegada, eixo: [1, 0, 0], ponta: saida });
  }
  q.pecas = [...(q.pecas ?? []), ...pecas];
  q.prims.push({ t: 'fio', pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' });
  q.fios.push({ id: 'elastico', comp, estica: true });
  q.marcas.elasticoNasCostas = meio;
  q.marcas.pontaDoElastico = palma('R');
}

const A = criarFlexao(ficha, { cena });

export const flexaoElastico: Exercicio = {
  ficha: A.ficha,
  vistas: ['lateral', 'cima'],
  quadro: A.quadro,
  // peito principal; tríceps e frente do ombro secundários; o abdômen "só ajuda" (como na flexão e na animação de hoje)
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's', abdomen: 'a' },
  trajetorias: { peito: (q) => q.esq.torax.o, cotovelo: (q) => q.esq.lado.R.cotovelo, elastico: (q) => q.marcas.elasticoNasCostas! },
};
