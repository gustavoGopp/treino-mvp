// Flexão de joelho com elástico, no motor novo. Os números vêm da ficha (../dados/movimentos/flexao-joelho-elastico.json);
// a pose de bruços é a do núcleo ./flexao-joelho.ts. Deitado de bruços num colchonete, a testa no dorso das mãos, o
// meio do elástico em tubo preso na alça de uma âncora de porta, embaixo de uma porta fechada atrás dos pés, e os
// pegadores em volta dos dois tornozelos, por trás. Os joelhos dobram trazendo os calcanhares ao glúteo, com o quadril
// no colchonete. A porta fica longe o bastante para o elástico já estar um pouco esticado com as pernas estendidas.
import ficha from '../dados/movimentos/flexao-joelho-elastico.json';
import type { Esq, Lado } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, colchonete } from '../pecas';
import type { Peca } from '../pecas';
import { portaComAncora } from '../pecas-de-cena/porta-com-ancora';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { deitadoDeBrucos } from './flexao-joelho';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const CACHE = new WeakMap<Corpo, { zPorta: number }>();

function pose(corpo: Corpo, u: number, sobe = 0): Esq {
  return deitadoDeBrucos(corpo, {
    apoio: obj('colchonete', 'esp'),
    testa: f('testa.altura'),
    punhosMeiaDistancia: f('maos.meiaDistancia'),
    joelho: mix(f('joelho.inicio'), f('joelho.fim'), u),
    flexaoPlantar: f('tornozelo.flexaoPlantar'),
    quadrilSobe: sobe,
  });
}
/** O centro do pegador, atrás do tornozelo e logo acima do calcanhar. */
function pegada(corpo: Corpo, e: Esq, k: Lado): V3 {
  const L = e.lado[k];
  const tras = mul(L.canela.z, -1);
  return add(add(L.tornozelo, mul(L.canela.y, f('elastico.acimaDoTornozelo'))), mul(tras, corpo.m('raio.tornozelo') + obj('elastico', 'pegadorDiam') / 2));
}
/** O caminho do tubo: da ponta de um pegador à alça da âncora e dela à ponta do outro. */
function tubo(corpo: Corpo, e: Esq, alca: V3) {
  const ponta = (k: Lado) => {
    const g = pegada(corpo, e, k);
    return add(g, mul(norm(sub(alca, g)), obj('elastico', 'fita')));
  };
  // o tubo dá a volta na alça: os dois trechos chegam a ela a 1 cm um do outro
  const pts: V3[] = [ponta('R'), add(alca, [-0.5, 0, 0]), add(alca, [0.5, 0, 0]), ponta('L')];
  let comp = 0;
  for (let i = 1; i < pts.length; i++) comp += dist(pts[i - 1]!, pts[i]!);
  return { pts, comp };
}
/** A porta fica onde o elástico estica o que a ficha pede com as pernas quase estendidas. */
function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const e = pose(corpo, 0);
  const alvo = f('elastico.esticaNoInicio') * obj('elastico', 'comp');
  const zPorta = resolver1((z) => tubo(corpo, e, portaComAncora(z, f('ancora.altura')).alca).comp - alvo, -100, -260, 40);
  c = { zPorta };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  let v = u;
  if (erro === 'tranco') v = 1 - (1 - u) ** 3;
  if (erro === 'curta') v = mix(f('erro.curta.volta'), f('erro.curta.ida'), u);
  const e = pose(corpo, v, erro === 'quadril' ? f('erro.quadril.sobe') * u : 0);
  const porta = portaComAncora(c.zPorta, f('ancora.altura'));
  const t = tubo(corpo, e, porta.alca);
  const estica = t.comp / obj('elastico', 'comp');
  const zCol = f('colchonete.z');
  const pecas: Peca[] = [{ t: 'colchonete', x0: 0, z0: zCol }, ...porta.pecas, { t: 'elastico', pts: t.pts, estica }];
  for (const k of ['R', 'L'] as Lado[]) {
    const g = pegada(corpo, e, k);
    pecas.push({ t: 'pegador', pegada: g, eixo: e.lado[k].canela.x, ponta: k === 'R' ? t.pts[0]! : t.pts[t.pts.length - 1]! });
  }
  return {
    esq: e,
    prims: [chao(-90, 90, c.zPorta - 20, 110), ...colchonete(0, zCol), ...porta.prims, { t: 'fio', pts: t.pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas,
    fios: [{ id: 'elastico', comp: t.comp, estica: true }],
    cargas: [],
    marcas: { pegadaR: pegada(corpo, e, 'R'), alca: porta.alca },
  };
}

export const flexaoJoelhoElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // posteriores da coxa, sem secundário (biblioteca)
  papeis: { posteriores: 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, joelho: (q) => q.esq.lado.R.joelho },
};
