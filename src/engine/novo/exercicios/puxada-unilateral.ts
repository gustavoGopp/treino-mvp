// Puxada unilateral ajoelhado na polia alta, no motor novo. O braço direito gira do alto até o lado das costelas;
// o antebraço aponta sempre para a polia, de modo que o cabo sai reto da roldana até o estribo. A pilha de pesos
// sobe o curso do cabo dividido pela relação da máquina (tabela de objetos).
import ficha from '../dados/movimentos/puxada-unilateral.json';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { cabo, centroDaRoldana, chao, colchonete, estribo, saidaDoCabo, torre } from '../pecas';
import type { Torre } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, dirRef, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const REPOUSO = new WeakMap<Corpo, number>();

function montar(corpo: Corpo, u: number, erro?: string): { e: Esq; elo: V3; saida: V3; t: Torre; prims: ReturnType<typeof estribo>['prims'] } {
  const m = (id: string) => corpo.m(id);
  const esp = obj('colchonete', 'esp');
  const hq = f('joelhos.meiaDistancia');
  // ajoelhado: o joelho no colchonete, a coxa na vertical, a canela para trás, o peito do pé no colchonete
  const yJoelho = esp + corpo.secoes.perna![0]!.b;
  const inclina = erro === 'tronco' ? mix(f('tronco'), f('erro.tronco'), u) : f('tronco');
  const pelve: V3 = [0, yJoelho + m('coxa.comp') * Math.cos(2 * rad), -m('coxa.comp') * Math.sin(2 * rad)];
  const tr = resolverTronco(corpo, { pelve, frente: inclina, cervical: -6 - (1 - u) * 6, cabeca: -4 });
  const perna = (k: Lado): PosePerna => {
    void k;
    return { coxa: [0, -Math.cos(2 * rad), Math.sin(2 * rad)], canela: norm([0, -0.035, -1]), peDir: norm([0, -0.2, -1]), polo: [0, 0, 1] };
  };
  const torreDaPolia: Torre = { base: [-m('ombro.meiaDistancia') - 3, 0, f('torre.distancia')], frente: [0, 0, -1], alturaDaPolia: obj('torre', 'poliaMax') };
  const roldana = centroDaRoldana(torreDaPolia);
  // braço que puxa: do alto (apontando para a polia) até o lado das costelas, um pouco atrás
  const fundo = erro === 'curta' ? 1 - (1 - u) * f('erro.curta') : u;
  const T = tr.torax;
  const pernas = { R: perna('R'), L: perna('L') };
  // o outro braço: a mão apoiada na coxa
  const apoio: PoseBraco = { pegada: add(pelve, [hq + 3, -m('coxa.comp') * 0.3, corpo.secoes.coxa![2]!.f + 2]), polo: [0.6, 0, -1], mao: { polegar: [-1, 0, 0.3], forma: 'relaxada' } };
  const elevErro = erro === 'encolher' ? f('erro.encolher') : f('ombro.desce');
  const elev = mix(f('ombro.sobe'), elevErro, u);
  const fim = dirRef(T, norm([-Math.sin(f('braco.fim.fora') * rad), -1, -Math.sin(f('braco.fim.atras') * rad)]));
  const flexIni = f('cotovelo.alongado') * rad;
  const polegar = norm(add(mul(dirRef(T, [1, 0, 0]), 1 - fundo), mul(dirRef(T, [0.2, 0.6, -0.8]), fundo)));
  const com = (umero: V3, antebraco: V3) => resolverMembros(tr, { R: { umero, antebraco, polo: dirRef(T, [-0.5, -0.2, -1]), mao: { polegar, forma: 'pegada', diam: obj('estribo', 'pegadaDiam') }, elev }, L: apoio }, pernas);
  // O ombro sobe e desce com o braço (ritmo da escápula), então a direção do braço e a do antebraço são achadas em
  // passadas: a cada uma, o ombro e o cotovelo de verdade corrigem a mira para a polia.
  let umero = fim,
    antebraco = fim,
    e = com(umero, antebraco);
  for (let i = 0; i < 4; i++) {
    const paraPolia = norm(sub(roldana, e.lado.R.ombro));
    const ang = Math.acos(Math.max(-1, Math.min(1, paraPolia[0] * fim[0] + paraPolia[1] * fim[1] + paraPolia[2] * fim[2])));
    const a = Math.sin((1 - fundo) * ang) / Math.sin(ang),
      b = Math.sin(fundo * ang) / Math.sin(ang);
    umero = norm(add(mul(paraPolia, a), mul(fim, b)));
    e = com(umero, antebraco);
    // antebraço na linha do cabo; no início, com o cotovelo quase estendido, ele quase coincide com o braço
    const noCabo = norm(sub(roldana, e.lado.R.cotovelo));
    const quase = norm(add(mul(umero, Math.cos(flexIni)), mul(dirRef(T, [0, 0, 1]), Math.sin(flexIni))));
    const w = (1 - fundo) ** 3;
    antebraco = norm(add(mul(quase, w), mul(noCabo, 1 - w)));
    e = com(umero, antebraco);
  }
  const L = e.lado.R;
  const { prims, elo } = estribo(L.pegada, L.mao.x, sub(roldana, L.pegada));
  return { e, elo, saida: saidaDoCabo(torreDaPolia, elo), t: torreDaPolia, prims };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const r = montar(corpo, u, erro);
  // a pilha parte do repouso no ponto mais alto da mão (cabo mais curto) e sobe conforme o cabo é puxado
  let rep = REPOUSO.get(corpo);
  if (rep === undefined) {
    const r0 = montar(corpo, 0);
    rep = dist(r0.elo, r0.saida);
    REPOUSO.set(corpo, rep);
  }
  const comp = dist(r.elo, r.saida);
  const subida = Math.max(0, comp - rep) / obj('torre', 'relacao') + 2;
  const prims = [chao(-110, 80, -110, 110), ...colchonete(0, -22), ...torre(r.t, subida), ...r.prims, cabo(r.elo, r.saida)];
  return { esq: r.e, prims, fios: [{ id: 'cabo', comp, estica: true }], cargas: [], marcas: { mao: r.e.lado.R.pegada, pilha: [0, subida, 0] }, vies: { maoR: 1 } };
}

export const puxadaUnilateral: Exercicio = {
  ficha: F,
  vistas: ['posterior', 'lateral'],
  quadro,
  papeis: { 'dorsal:R': 'p', 'biceps:R': 's', 'deltoide:R': 's', trapezio: 's' },
  trajetorias: { mão: (q) => q.marcas.mao!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
