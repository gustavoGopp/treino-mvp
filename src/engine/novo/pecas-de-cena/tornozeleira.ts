// Peça de cena: a tornozeleira de polia (medidas em ../dados/objetos/tornozeleira.json: a faixa de 10 × 4 pol com
// neoprene de 7 mm, da Gymreapers; a Power Systems confirma a faixa de nylon acolchoada com velcro e a argola em D). Parte
// do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `acessorio_polia_tornozeleira`): a braçadeira
// acolchoada grafite com a ponta de velcro na cor de ação, a argola em D e o mosquetão do cabo. Aqui ela está fechada em
// volta da canela, logo acima dos maléolos, como a caneleira aprovada (./caneleira.ts), e a argola fica do lado da
// faixa virado para a roldana, apontando para ela: é o que acontece de verdade (o cabo puxa a argola, que gira na
// costura e se alinha com ele). O mosquetão sai da ponta da argola, na linha do cabo, e o cabo começa nele.
//
// O pegador do elástico no tornozelo (./pegador-no-tornozelo.ts) não serve: é uma pegada rígida atravessada na frente do
// tornozelo, e a tornozeleira é uma faixa que envolve a canela inteira.
//
// A faixa envolve a perna: tudo o que se vê dela fica por cima da canela. Por isso as peças do desenho vão para a frente
// da perna na pintura, como na caneleira.
import { pontosDoBoneco } from '../boneco';
import type { Esq, Lado } from '../esqueleto';
import type { PecaPropria } from '../pecas';
import type { Material } from '../realista/base.mjs';
import { mix } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, cross, dist, dot, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('tornozeleira', id);
/** O grafite do tecido do cartão de hoje (sombra, meio, luz, traço) e a cor de ação (o velcro); clareados no tema escuro. */
const TECIDO: Material = ['#25282D', '#3E434A', '#686E77', '#121417'];
const ACAO: Material = ['#211D66', '#3F3AA8', '#7E7ADB', '#16124A'];
const doTema = (m: Material, tema: 'claro' | 'escuro'): Material => (tema === 'claro' ? m : m.map((t) => mix(t, '#aeb8c2', 0.3)));

export interface Tornozeleira {
  /** O centro da faixa, o eixo da canela (para o joelho) e o raio por fora da faixa. */
  centro: V3;
  eixo: V3;
  raio: number;
  /** O raio da canela (a pele) na altura da faixa. */
  pele: number;
  /** Onde a argola prende na faixa, a direção em que ela aponta (para a roldana) e a tangente da faixa ali. */
  raiz: V3;
  aponta: V3;
  tangente: V3;
  /** A ponta do arco da argola e a ponta do mosquetão, onde o cabo começa. */
  ponta: V3;
  cabo: V3;
}

/**
 * A tornozeleira na perna `k` de um esqueleto, com o cabo indo para `para` (o centro da roldana). O raio da canela é o
 * maior afastamento da pele ao eixo da canela na altura da faixa, medido na superfície do Boneco (como na caneleira).
 */
export function tornozeleiraNaPerna(e: Esq, k: Lado, para: V3): Tornozeleira {
  const X = e.lado[k];
  const eixo = norm(sub(X.joelho, X.tornozelo));
  const centro = add(X.tornozelo, mul(eixo, g('acimaDoTornozelo') + g('larg') / 2));
  const L = g('larg') / 2;
  const O = e.lado[k === 'R' ? 'L' : 'R'];
  // de que perna é cada ponto da canela: do eixo (joelho ao tornozelo) mais perto (a outra perna pode cruzar perto)
  const aoEixo = (p: V3, a: V3, b: V3) => {
    const ab = sub(b, a);
    const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / dot(ab, ab)));
    return dist(p, add(a, mul(ab, t)));
  };
  let pele = 0;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'canela' || dist(p, X.tornozelo) > 25) continue;
    if (aoEixo(p, X.joelho, X.tornozelo) > aoEixo(p, O.joelho, O.tornozelo)) continue;
    const v = sub(p, centro);
    const t = dot(v, eixo);
    if (Math.abs(t) > L) continue;
    const r = Math.hypot(...sub(v, mul(eixo, t)));
    if (r < 12) pele = Math.max(pele, r);
  }
  const raio = pele + g('esp');
  // a argola fica no lado da faixa virado para a roldana e aponta para ela
  let radial = perp(sub(para, centro), eixo);
  if (Math.hypot(...radial) < 1e-6) radial = perp([0, 0, 1], eixo);
  radial = norm(radial);
  const raiz = add(centro, mul(radial, raio));
  const aponta = norm(sub(para, raiz));
  const tangente = norm(cross(eixo, radial));
  const ponta = add(raiz, mul(aponta, g('argolaAlt')));
  const cabo = add(ponta, mul(aponta, g('mosquetaoComp')));
  return { centro, eixo, raio, pele, raiz, aponta, tangente, ponta, cabo };
}

/** O desenho: a faixa em volta da canela, a tira de velcro, a argola em D e o mosquetão até o começo do cabo. */
export function tornozeleira(t: Tornozeleira): PecaPropria {
  const L = g('larg') / 2;
  const a = add(t.centro, mul(t.eixo, -L)),
    b = add(t.centro, mul(t.eixo, L));
  return {
    t: 'propria',
    nome: 'tornozeleira',
    desenhar(C, M, o) {
      const n0 = C.itens.length;
      const tec = doTema(TECIDO, o.tema),
        acao = doTema(ACAO, o.tema);
      C.cilindro(a, b, t.raio, tec, { lados: 20 });
      // a ponta de velcro, na cor de ação, fechando por cima da faixa
      const v = g('velcroLarg') / 2;
      const n1 = C.itens.length;
      C.cilindro(add(t.centro, mul(t.eixo, -v)), add(t.centro, mul(t.eixo, v)), t.raio + 0.25, acao, { lados: 20 });
      // a argola em D: o lado reto na faixa (ao longo da volta dela) e o arco apontando para a roldana
      const n2 = C.itens.length;
      const w = g('argolaLarg') / 2,
        h = g('argolaAlt'),
        rf = g('argolaFio') / 2;
      const arco: V3[] = [];
      for (let i = 0; i <= 10; i++) {
        const fi = (Math.PI * i) / 10;
        arco.push(add(add(t.raiz, mul(t.tangente, w * Math.cos(fi))), mul(t.aponta, h * Math.sin(fi))));
      }
      for (let i = 0; i < arco.length - 1; i++) C.cilindro(arco[i]!, arco[i + 1]!, rf, M.cromo, { lados: 6, contorno: false });
      C.cilindro(arco[0]!, arco[arco.length - 1]!, rf, M.cromo, { lados: 6 });
      // o mosquetão: o laço de aço da ponta da argola até o cabo, e a trava
      const m = g('mosquetaoComp');
      const laco: V3[] = [];
      for (let i = 0; i < 14; i++) {
        const fi = (2 * Math.PI * i) / 14;
        laco.push(add(add(t.ponta, mul(t.aponta, (m * 0.62 * (1 - Math.cos(fi))) / 2)), mul(t.tangente, 1.6 * Math.sin(fi))));
      }
      for (let i = 0; i < laco.length; i++) C.cilindro(laco[i]!, laco[(i + 1) % laco.length]!, 0.4, M.cromo, { lados: 6, contorno: false });
      C.cilindro(add(t.ponta, mul(t.aponta, m * 0.62)), t.cabo, 0.9, M.cromo, { lados: 10 });
      // a faixa envolve a perna: por cima dela na pintura (o velcro por cima da faixa; a argola por cima dos dois)
      for (let i = n0; i < C.itens.length; i++) C.itens[i]!.z -= i >= n2 ? 42 : i >= n1 ? 41 : 40;
    },
  };
}
