// Agachamento com elástico, no motor novo. Os números vêm da ficha (../dados/movimentos/agachamento-elastico.json).
// É o agachamento do goblet com o elástico no lugar do halter: o tubo passa por baixo dos dois pés, no meio da sola,
// e cada mão segura um pegador na frente do ombro, com os cotovelos para baixo e um pouco à frente.
import ficha from '../dados/movimentos/agachamento-elastico.json';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, mix, mul, noRef, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { agachar } from './agachar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const m = (id: string) => corpo.m(id);
  const r = agachar(corpo, {
    joelho: mix(f('joelho.cima'), f(erro === 'raso' ? 'erro.raso.joelho' : 'joelho.baixo'), u),
    tronco: mix(f('tronco.cima'), f(erro === 'lombar' ? 'erro.lombar.tronco' : 'tronco.baixo'), u),
    lombar: erro === 'lombar' ? f('erro.lombar.lombar') * u : 0,
    valgo: erro === 'valgo' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0,
    calcanhar: 0,
    apoio: 'meio',
    pesMeiaDistancia: f('pes.meiaDistancia'),
    pesParaFora: f('pes.paraFora'),
    bracos(t) {
      // a pegada fica na frente do ombro (o centro do ombro em repouso, no referencial do tórax, vem da tabela do corpo)
      const T = t.torax;
      const braco = (k: Lado): PoseBraco => {
        const s = sinal(k);
        const ombro: V3 = [s * m('ombro.meiaDistancia'), m('altura.acromio') - m('ombro.centroAbaixoDoAcromio') - m('altura.cervical'), m('prof.peito') * 0.25];
        const pegada = noRef(T, [ombro[0], ombro[1] + f('maos.acimaDoOmbro'), ombro[2] + f('maos.aFrenteDoOmbro')]);
        // cotovelos para baixo e um pouco à frente; o pegador atravessado, com o polegar para dentro
        return { pegada, polo: dirRef(T, [s * 0.25, -1, 0.3]), mao: { polegar: dirRef(T, [-s, 0.15, 0]), forma: 'pegada', diam: obj('elastico', 'pegadorDiam') } };
      };
      return { R: braco('R'), L: braco('L') };
    },
  });
  // o tubo: da ponta presa a cada pegador até o meio da sola de cada pé, e por baixo dos dois pés
  const dBola = m('pe.calcanharABola');
  const sola = (s: number): V3 => add(r.bola(s), mul(r.dirPe(s), -dBola * 0.45));
  const ponta = (k: Lado): V3 => {
    const L = r.e.lado[k];
    return add(L.pegada, mul(norm(sub(sola(sinal(k)), L.pegada)), obj('elastico', 'fita')));
  };
  // Com o joelho dobrado, a perna fica no caminho entre o pé e a mão: o tubo passa por fora do joelho. Em pé ele
  // desce reto; conforme o joelho dobra, o ponto de passagem vai da linha reta para o lado de fora do joelho.
  const joelhoDobrado = Math.max(0, Math.min(1, (r.e.lado.R.ang.joelho - 20) / 60));
  const porFora = (k: Lado): V3 => {
    const s = sinal(k),
      L = r.e.lado[k],
      a = sola(s),
      b = ponta(k);
    const t = Math.max(0.1, Math.min(0.9, (L.joelho[1] - a[1]) / (b[1] - a[1] || 1)));
    const reto = add(a, mul(sub(b, a), t));
    const fora: V3 = [L.joelho[0] + s * (corpo.secoes.coxa![corpo.secoes.coxa!.length - 1]!.a + f('elastico.folgaNoJoelho')), L.joelho[1], L.joelho[2]];
    return add(reto, mul(sub(fora, reto), joelhoDobrado));
  };
  const pts: V3[] = [ponta('R'), porFora('R'), sola(-1), sola(1), porFora('L'), ponta('L')];
  let comp = 0;
  for (let i = 1; i < pts.length; i++) comp += dist(pts[i - 1]!, pts[i]!);
  const estica = comp / obj('elastico', 'comp');
  const pecas: Peca[] = [{ t: 'elastico', pts, estica }];
  for (const k of ['R', 'L'] as Lado[]) pecas.push({ t: 'pegador', pegada: r.e.lado[k].pegada, eixo: r.e.lado[k].mao.x, ponta: ponta(k) });
  return { esq: r.e, prims: [chao(-70, 70, -70, 90), { t: 'fio', pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }], pecas, fios: [{ id: 'elastico', comp, estica: true }], cargas: [], marcas: {} };
}

export const agachamentoElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho },
};
