// Puxada com elástico ancorado no alto, no motor novo. Os números vêm da ficha (../dados/movimentos/puxada-elastico.json).
// Ajoelhado no colchonete, de frente para uma porta fechada, com o meio do tubo com pegadores preso no topo dela (a
// âncora de porta do lado de lá); uma ponta em cada mão. O corpo ajoelhado e o caminho do braço são os da puxada
// unilateral aprovada (./puxada-unilateral.ts), com os dois braços: o braço gira do alto até o lado das costelas, e o
// antebraço aponta sempre para a âncora (o elástico puxa a mão em linha reta até ela). No alongado, os ombros sobem; na
// puxada, primeiro descem. A distância até a porta sai do quanto o tubo já está esticado com os braços estendidos.
// A porta, a âncora e o trecho do tubo perto delas são cenário: o quadro mostra o corpo e o tubo sai pela borda.
import ficha from '../dados/movimentos/puxada-elastico.json';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, colchonete } from '../pecas';
import type { Peca, PecaPropria } from '../pecas';
import { portaComAncoraNoAlto } from '../pecas-de-cena/elastico-ancora-no-alto';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const CAL = new WeakMap<Corpo, { zPorta: number }>();
/** A alça da âncora: o topo da porta menos o comprimento da alça. */
const ALTURA_DA_ALCA = obj('porta', 'vao') + obj('porta', 'altura') - obj('porta', 'alcaComp');

/** O corpo ajoelhado com os dois braços puxando em direção a `alca`. */
function montar(corpo: Corpo, alca: V3, u: number, erro?: string): Esq {
  const m = (id: string) => corpo.m(id);
  const esp = obj('colchonete', 'esp');
  // ajoelhado: o joelho no colchonete, a coxa quase na vertical, a canela para trás, o peito do pé no colchonete
  const yJoelho = esp + corpo.secoes.perna![0]!.b;
  const inclina = erro === 'tronco' ? mix(f('tronco'), f('erro.tronco'), u) : f('tronco');
  const pelve: V3 = [0, yJoelho + m('coxa.comp') * Math.cos(2 * rad), -m('coxa.comp') * Math.sin(2 * rad)];
  const tr = resolverTronco(corpo, { pelve, frente: inclina, cervical: -4, cabeca: -4 });
  const perna = (k: Lado): PosePerna => ({ coxa: [sinal(k) * 0.0, -Math.cos(2 * rad), Math.sin(2 * rad)], canela: norm([0, -0.035, -1]), peDir: norm([0, -0.2, -1]), polo: [0, 0, 1] });
  const pernas = { R: perna('R'), L: perna('L') };
  const fundo = erro === 'curta' ? 1 - (1 - u) * f('erro.curta') : u;
  const T = tr.torax;
  const elev = mix(f('ombro.sobe'), erro === 'encolher' ? f('erro.encolher') : f('ombro.desce'), u);
  const fimDe = (k: Lado) => dirRef(T, norm([sinal(k) * Math.sin(f('braco.fim.fora') * rad), -1, -Math.sin(f('braco.fim.atras') * rad)]));
  const flexIni = f('cotovelo.alongado') * rad;
  // a pegada vai da neutra-pronada em cima (polegar para o meio) à neutra embaixo (polegar para trás e para cima)
  const polegarDe = (k: Lado) => norm(add(mul(dirRef(T, [-sinal(k), 0, 0]), 1 - fundo), mul(dirRef(T, [-sinal(k) * 0.2, 0.6, -0.8]), fundo)));
  const umeros: Record<Lado, V3> = { R: fimDe('R'), L: fimDe('L') };
  const antes: Record<Lado, V3> = { R: fimDe('R'), L: fimDe('L') };
  const com = () =>
    resolverMembros(
      tr,
      Object.fromEntries(LADOS.map((k) => [k, { umero: umeros[k], antebraco: antes[k], polo: dirRef(T, [sinal(k) * 0.5, -0.2, -1]), mao: { polegar: polegarDe(k), forma: 'pegada', diam: obj('elastico', 'pegadorDiam') }, elev } as PoseBraco])) as Record<Lado, PoseBraco>,
      pernas,
    );
  // como na puxada unilateral: só o braço é dirigido, do rumo da âncora até o lado das costelas; o antebraço aponta
  // do cotovelo para a âncora. O ombro anda com o braço; por isso a conta se repete com o ombro de verdade.
  let e = com();
  for (let i = 0; i < 4; i++) {
    for (const k of LADOS) {
      const fim = fimDe(k);
      const ombro = e.lado[k].ombro;
      const paraAlca = norm(sub(alca, ombro));
      const ang = Math.acos(Math.max(-1, Math.min(1, paraAlca[0] * fim[0] + paraAlca[1] * fim[1] + paraAlca[2] * fim[2])));
      const partida = flexIni - Math.asin(Math.min(1, (m('braco.comp') * Math.sin(flexIni)) / dist(alca, ombro)));
      const alfa = mix(partida, ang, fundo);
      umeros[k] = norm(add(mul(paraAlca, Math.sin(ang - alfa) / Math.sin(ang)), mul(fim, Math.sin(alfa) / Math.sin(ang))));
    }
    e = com();
    for (const k of LADOS) antes[k] = norm(sub(alca, e.lado[k].cotovelo));
    e = com();
  }
  return e;
}

/** Onde a fita do pegador se junta ao tubo (a ponta do tubo), na linha da mão à âncora. */
const ponta = (e: Esq, k: Lado, alca: V3): V3 => add(e.lado[k].pegada, mul(norm(sub(alca, e.lado[k].pegada)), obj('elastico', 'fita')));
function tubo(e: Esq, alca: V3) {
  // o tubo dá a volta na alça: os dois trechos chegam a ela a 1 cm um do outro
  const pts: V3[] = [ponta(e, 'R', alca), add(alca, [-0.5, 0, 0]), add(alca, [0.5, 0, 0]), ponta(e, 'L', alca)];
  let comp = 0;
  for (let i = 1; i < pts.length; i++) comp += dist(pts[i - 1]!, pts[i]!);
  return { pts, comp };
}

/** A porta fica onde o tubo estica o que a ficha pede com os braços estendidos. */
function calibrar(corpo: Corpo) {
  let c = CAL.get(corpo);
  if (c) return c;
  const alvo = f('elastico.esticaNoInicio') * obj('elastico', 'comp');
  const zPorta = resolver1((z) => {
    const alca: V3 = [0, ALTURA_DA_ALCA, z - 1.2];
    return tubo(montar(corpo, alca, 0), alca).comp - alvo;
  }, 20, 160, 40);
  c = { zPorta };
  CAL.set(corpo, c);
  return c;
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

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const porta = portaComAncoraNoAlto(c.zPorta, ALTURA_DA_ALCA, true);
  const e = montar(corpo, porta.alca, u, erro);
  const t = tubo(e, porta.alca);
  const estica = t.comp / obj('elastico', 'comp');
  const [pR, , , pL] = t.pts as [V3, V3, V3, V3];
  const corte = (p: V3) => add(p, mul(norm(sub(porta.alca, p)), f('elastico.noQuadro')));
  const cR = corte(pR),
    cL = corte(pL);
  const zCol = f('colchonete.z');
  const pecas: Peca[] = [{ t: 'colchonete', x0: 0, z0: zCol }, ...porta.pecas, tuboAteAPorta([cR, t.pts[1]!, t.pts[2]!, cL], estica), { t: 'elastico', pts: [pR, cR], estica }, { t: 'elastico', pts: [pL, cL], estica }];
  for (const k of LADOS) pecas.push(pegadorNaMao(e.lado[k].pegada, e.lado[k].mao.x, k === 'R' ? pR : pL, `pegador${k}`));
  return {
    esq: e,
    prims: [chao(-90, 90, -70, c.zPorta + 10), ...colchonete(0, zCol), ...porta.prims, { t: 'fio', pts: t.pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas,
    fios: [{ id: 'elastico', comp: t.comp, estica: true }],
    cargas: [],
    marcas: { ancora: porta.alca, mao: e.lado.R.pegada, pegadorR: e.lado.R.pegada, pegadorL: e.lado.L.pegada },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const puxadaElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'posterior'],
  quadro,
  // dorsal (principal); bíceps e ombro de trás (secundários): a biblioteca e a decisão de 06/11 (ombro de trás)
  papeis: { dorsal: 'p', biceps: 's', deltPost: 's' },
  trajetorias: { cotovelo: (q) => q.esq.lado.R.cotovelo },
};
