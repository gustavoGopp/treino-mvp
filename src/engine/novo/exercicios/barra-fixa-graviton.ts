// Barra fixa assistida no graviton, no motor novo. Os números vêm da ficha (../dados/movimentos/barra-fixa-graviton.json);
// o corpo ajoelhado na almofada, do núcleo ./graviton.ts; a máquina, de ../pecas-de-cena/graviton.ts.
//
// Os braços e o tronco fazem a subida da barra fixa aprovada (./barra-fixa-base.ts), com os mesmos números: pendurado
// com os braços estendidos; as escápulas descem primeiro; os braços puxam até o queixo passar da alça, o tronco vai um
// pouco para trás e o cotovelo desce para o lado das costelas. A diferença: os joelhos ficam na almofada, as coxas quase
// na vertical e as canelas deitadas nela, e a almofada sobe com o corpo (a pilha desce); embaixo, com os braços
// estendidos, a almofada está no ponto mais baixo e a pilha, no mais alto.
import ficha from '../dados/movimentos/barra-fixa-graviton.json';
import { calibragem } from '../calibragens';
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { cameNoQuadro, eixosDasAlcas, graviton, normalDaAlavancaDoGraviton, direcaoDaAlavancaDoGraviton } from '../pecas-de-cena/graviton';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { lerp, noRef, norm } from '../vec';
import type { V3 } from '../vec';
import { queixo } from './abdominal';
import { naAlmofada } from './graviton';
import type { PernasAjoelhadas } from './graviton';
import { maosNaBarra, mix, trecho } from './pendurado';
import type { Apoio, Forma } from './pendurado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const alturaDaAlca = () => obj('graviton', 'alcaAltura');
const raioDaAlca = () => obj('graviton', 'alcaDiam') / 2;

const apoio = (corpo: Corpo): Apoio => ({ maos: maosNaBarra(f('pegada.largura') * corpo.m('largura.biacromial'), alturaDaAlca(), 0), diam: obj('graviton', 'alcaDiam') });
const vetor = (nome: string, k: Lado): V3 => norm([sinal(k) * f(`${nome}.fora`), f(`${nome}.cima`), f(`${nome}.frente`)]);

/** A forma do tronco e dos braços no ponto u da subida (0 = braços estendidos, 1 = topo): a da barra fixa aprovada. */
function forma(u: number, erro?: string): { f: Omit<Forma, 'pernas'>; p: PernasAjoelhadas } {
  const esc = trecho(u, 0, f('escapulas.fim')),
    pux = trecho(u, f('puxada.inicio'), 1),
    tras = trecho(u, f('puxada.inicio'), f('inclina.fim'));
  const elev = mix(f('escapula.pendurado'), f('escapula.encaixada'), esc) + (f('escapula.topo') - f('escapula.encaixada')) * pux;
  let quadril = mix(f('quadril'), f('quadril.topo'), tras),
    lombar = f('lombar.topo') * tras,
    frente = f('bacia.topo') * tras;
  if (erro === 'e2') {
    // o balanço: a lombar arqueia no começo e o quadril dobra no meio da subida (a bacia vai para trás e volta), em
    // volta dos joelhos, que ficam na almofada
    const chute = Math.sin(Math.PI * u);
    quadril = mix(quadril, f('erro.balanco.quadril'), chute);
    frente += f('erro.balanco.bacia') * chute;
    lombar += f('erro.balanco.lombar') * (1 - u) * (1 - u);
  }
  return {
    f: {
      frente,
      lombar,
      toracica: f('toracica.topo') * tras,
      cervical: f('pescoco.topo') * tras,
      bracos: (k) => ({ polo: norm(lerp(vetor('polo.pendurado', k), vetor('polo.topo', k), pux)), polegar: [-sinal(k), 0, 0], elev, prot: f('escapula.prot.topo') * pux }),
    },
    p: { quadril, plantar: f('pe.plantar'), juntas: f('pernas.juntas'), canela: f('canela.desce') },
  };
}

const corpoCom = (corpo: Corpo, u: number, cot: number, erro?: string) => {
  const fm = forma(u, erro);
  return naAlmofada(corpo, apoio(corpo), fm.f, fm.p, cot, true);
};

/**
 * A dobra do cotovelo no topo: a do corpo em que o queixo fica `queixo.acima` cm acima do alto da alça. Como na barra
 * fixa aprovada, a subida anda pela dobra do cotovelo, e não pela altura.
 */
function cotoveloNoTopo(corpo: Corpo, erro?: string): number {
  const de = erro === 'e2' ? 'e2' : undefined;
  return calibragem(corpo, `barra-fixa-graviton:cotovelo-no-topo:${de ?? ''}`, () => {
    const alvo = alturaDaAlca() + raioDaAlca() + f('queixo.acima');
    return resolver1((c) => queixo(corpoCom(corpo, 1, c, de).e)[1] - alvo, 70, 160, 30);
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const a = apoio(corpo);
  const pux = trecho(u, f('puxada.inicio'), 1);
  const embaixo = erro === 'e1' ? f('erro.curta.cotovelo') : f('cotovelo.embaixo');
  const r = corpoCom(corpo, u, mix(embaixo, cotoveloNoTopo(corpo, erro), pux), erro);
  const e = r.e;
  const M = graviton({
    alavanca: r.alavanca,
    cenario: { paralela: true },
    noQuadro: {
      barra: eixosDasAlcas().barra.R.concat(eixosDasAlcas().barra.L),
      // os joelhos e o came (o eixo da alavanca): a máquina fica de um lado do corpo, e os rótulos vão para o outro
      almofada: [r.e.lado.R.joelho, r.e.lado.L.joelho, ...cameNoQuadro()],
    },
  });
  const eixos = eixosDasAlcas().barra;
  return {
    esq: e,
    prims: M.prims,
    pecas: [M.pecas.estrutura, M.pecas.paralela, M.pecas.alavanca, M.pecas.barra],
    fios: [],
    cargas: [],
    marcas: {
      'barra.R': a.maos.R,
      'barra.L': a.maos.L,
      'eixo.R.a': eixos.R[0],
      'eixo.R.b': eixos.R[1],
      'eixo.L.a': eixos.L[0],
      'eixo.L.b': eixos.L[1],
      raio: [raioDaAlca(), 0, 0],
      queixo: queixo(e),
      peito: noRef(e.torax, [0, -8, 0]),
      almofada: M.almofada,
      almofadaAo: direcaoDaAlavancaDoGraviton(r.alavanca),
      almofadaNormal: normalDaAlavancaDoGraviton(r.alavanca),
      alavanca: [r.alavanca, obj('graviton', 'alavancaTopo'), obj('graviton', 'cameDiam') / 2],
      pilha: [M.subida, 0, 0],
    },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const barraFixaGraviton: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // costas (o dorsal, principal, e o meio das costas); bíceps e ombro de trás, secundários; o antebraço só ajuda
  // (segura o corpo): a ficha da técnica (costas; bíceps e ombro posterior), como na barra fixa aprovada
  papeis: { dorsal: 'p', trapMedInf: 's', biceps: 's', deltPost: 's', antebraco: 'a' },
  trajetorias: { queixo: (q) => q.marcas.queixo!, joelho: (q) => q.esq.lado.R.joelho },
};
