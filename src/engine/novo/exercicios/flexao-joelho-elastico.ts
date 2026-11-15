// Flexão de joelho com elástico, no motor novo. Os números vêm da ficha (../dados/movimentos/flexao-joelho-elastico.json);
// a pose de bruços é a do núcleo ./flexao-joelho.ts. Deitado de bruços num colchonete, a testa no dorso das mãos, o
// meio do elástico em tubo preso na alça de uma âncora de porta, embaixo de uma porta fechada atrás dos pés, e os
// pés enfiados nos pegadores, que dão a volta nos tornozelos, com o tubo saindo de trás. Os joelhos dobram trazendo os calcanhares ao glúteo, com o quadril
// no colchonete. A porta fica longe o bastante para o elástico já estar um pouco esticado com as pernas estendidas.
// A porta, a âncora e a parte do tubo perto delas são cenário: o quadro mostra o corpo e o tubo sai pela borda.
import ficha from '../dados/movimentos/flexao-joelho-elastico.json';
import type { Esq, Lado } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, colchonete } from '../pecas';
import type { Peca } from '../pecas';
import type { PecaPropria } from '../pecas';
import { pegadorNoTornozelo } from '../pecas-de-cena/pegador-no-tornozelo';
import { portaComAncora } from '../pecas-de-cena/porta-com-ancora';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { deitadoDeBrucos } from './flexao-joelho';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const CACHE = new WeakMap<Corpo, { zPorta: number }>();

function pose(corpo: Corpo, u: number, sobe = 0, alem = 0): Esq {
  return deitadoDeBrucos(corpo, {
    apoio: obj('colchonete', 'esp'),
    testa: f('testa.altura'),
    punhosMeiaDistancia: f('maos.meiaDistancia'),
    joelho: mix(f('joelho.inicio'), f('joelho.fim'), u) + alem,
    flexaoPlantar: f('tornozelo.flexaoPlantar'),
    quadrilSobe: sobe,
    lombar: f('lombar.deitado'),
    prot: f('escapulas.protracao'),
  });
}
/** Onde a fita do pegador se junta, atrás do tornozelo e logo acima do calcanhar: é a ponta do tubo. */
function ponta(corpo: Corpo, e: Esq, k: Lado): V3 {
  const L = e.lado[k];
  return add(add(L.tornozelo, mul(L.canela.y, f('elastico.acimaDoTornozelo'))), mul(L.canela.z, -(corpo.m('raio.tornozelo') + obj('elastico', 'fita') * 0.35)));
}
/** O caminho do tubo: da ponta de um pegador à alça da âncora e dela à ponta do outro. */
function tubo(corpo: Corpo, e: Esq, alca: V3) {
  // o tubo dá a volta na alça: os dois trechos chegam a ela a 1 cm um do outro
  const pts: V3[] = [ponta(corpo, e, 'R'), add(alca, [-0.5, 0, 0]), add(alca, [0.5, 0, 0]), ponta(corpo, e, 'L')];
  let comp = 0;
  for (let i = 1; i < pts.length; i++) comp += dist(pts[i - 1]!, pts[i]!);
  return { pts, comp };
}
/** O trecho do tubo longe do corpo, até a alça, desenhado como cenário (atrás do corpo e fora do enquadramento). */
function tuboAteAPorta(pts: V3[], estica: number): PecaPropria {
  return {
    t: 'propria',
    nome: 'tubo-ate-a-porta',
    cenario: true,
    desenhar(C, M) {
      const d = obj('elastico', 'tuboDiam') / Math.sqrt(Math.max(1, estica));
      C.polilinha(pts, M.estofado[3]!, d + 0.5);
      C.polilinha(pts, M.estofado[1]!, d);
    },
  };
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
  if (erro === 'curta') v = mix(f('erro.curta.volta'), f('erro.curta.ida'), u);
  // tranco: no embalo, os calcanhares passam do fim e o quadril descola um pouco do colchonete
  const sobe = erro === 'quadril' ? f('erro.quadril.sobe') * u : erro === 'tranco' ? f('erro.tranco.quadril') * u : 0;
  const e = pose(corpo, v, sobe, erro === 'tranco' ? f('erro.tranco.alem') * u : 0);
  const porta = portaComAncora(c.zPorta, f('ancora.altura'));
  const t = tubo(corpo, e, porta.alca);
  const estica = t.comp / obj('elastico', 'comp');
  const zCol = f('colchonete.z');
  // perto do corpo, o tubo é a peça do elástico (no enquadramento); dali até a alça, cenário
  const [pR, , , pL] = t.pts as [V3, V3, V3, V3];
  const corte = (p: V3) => add(p, mul(norm(sub(porta.alca, p)), f('elastico.noQuadro')));
  const cR = corte(pR),
    cL = corte(pL);
  const pecas: Peca[] = [{ t: 'colchonete', x0: 0, z0: zCol }, ...porta.pecas, tuboAteAPorta([cR, t.pts[1]!, t.pts[2]!, cL], estica), { t: 'elastico', pts: [pR, cR], estica }, { t: 'elastico', pts: [pL, cL], estica }];
  for (const k of ['R', 'L'] as Lado[]) {
    const L = e.lado[k];
    pecas.push(pegadorNoTornozelo(L.canela, L.tornozelo, f('elastico.acimaDoTornozelo'), corpo.m('raio.tornozelo'), k === 'R' ? pR : pL));
  }
  return {
    esq: e,
    prims: [chao(-90, 90, c.zPorta - 20, 110), ...colchonete(0, zCol), ...porta.prims, { t: 'fio', pts: t.pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas,
    fios: [{ id: 'elastico', comp: t.comp, estica: true }],
    cargas: [],
    marcas: { pegadaR: pR, alca: porta.alca },
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
