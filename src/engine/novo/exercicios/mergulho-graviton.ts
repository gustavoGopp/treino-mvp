// Mergulho assistido no graviton, no motor novo. Os números vêm da ficha (../dados/movimentos/mergulho-graviton.json);
// o corpo ajoelhado na almofada, do núcleo ./graviton.ts; a máquina, de ../pecas-de-cena/graviton.ts.
//
// Os braços e o tronco fazem a descida do mergulho aprovado (./mergulho.ts), com os mesmos números: em cima, os braços
// estendidos sem travar e os ombros longe das orelhas; na descida, o cotovelo dobra para trás e o tronco inclina um
// pouco à frente, até o braço ficar quase paralelo ao chão. O fim da descida é o cotovelo em que o braço chega ao
// ângulo da ficha. A diferença: os joelhos ficam na almofada, que desce com o corpo (a pilha sobe), as coxas quase na
// vertical (o quadril dobra o que o tronco inclina) e as canelas deitadas nela.
import ficha from '../dados/movimentos/mergulho-graviton.json';
import { calibragem } from '../calibragens';
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { cameNoQuadro, direcaoDaAlavancaDoGraviton, eixosDasAlcas, graviton, meioDaPegaDaParalela, normalDaAlavancaDoGraviton } from '../pecas-de-cena/graviton';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { norm } from '../vec';
import type { V3 } from '../vec';
import { naAlmofada } from './graviton';
import type { PernasAjoelhadas } from './graviton';
import { bracoAbaixoDaHorizontal } from './mergulho';
import { maosNaBarra, mix, trecho } from './pendurado';
import type { Apoio, Forma } from './pendurado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

/**
 * Quanto a perna de longe vem para a frente na pintura, de três quartos de trás (cm de profundidade): o Boneco a pinta
 * 5 cm atrás do corpo; com 3, ela fica 2 cm atrás dele (a perna de perto e o tronco continuam por cima dela) e, no
 * pior quadro (o fim da descida), 1,1 cm à frente da almofada.
 */
const VIES_DA_PERNA_DE_LONGE = 3;

const apoio = (): Apoio => ({ maos: maosNaBarra(obj('graviton', 'paralelaVao'), obj('graviton', 'paralelaAltura'), meioDaPegaDaParalela()), diam: obj('graviton', 'alcaDiam') });

/** A forma do tronco e dos braços no ponto u da descida (0 = em cima, 1 = embaixo): a do mergulho aprovado. */
function forma(u: number, erro?: string): { f: Omit<Forma, 'pernas'>; p: PernasAjoelhadas } {
  let elev = f('escapula.ativa'),
    prot = 0,
    cervical = f('pescoco');
  if (erro === 'e1') {
    // no fundo, o ombro rola para a frente e sobe, e a cabeça vai junto (só no último trecho da descida), como no
    // mergulho aprovado
    const w = trecho(u, 0.55, 1);
    elev = mix(f('escapula.ativa'), f('erro.fundo.elev'), w);
    prot = f('erro.fundo.prot') * w;
    cervical = mix(f('pescoco'), f('erro.fundo.pescoco'), w);
  }
  if (erro === 'e2') {
    // os ombros sobem perto das orelhas: a escápula sobe na descida e fica alta embaixo
    elev = mix(f('escapula.ativa'), f('erro.encolhe.elev'), trecho(u, 0, 0.6));
    cervical = mix(f('pescoco'), f('erro.encolhe.pescoco'), trecho(u, 0, 0.6));
  }
  const polo = (k: Lado): V3 => norm([sinal(k) * f('polo.fora'), f('polo.cima'), f('polo.frente')]);
  return {
    f: { frente: mix(f('tronco.cima'), f('tronco.embaixo'), u), cervical, bracos: (k) => ({ polo: polo(k), polegar: [0, 0, 1], elev, prot }) },
    p: { quadril: mix(f('quadril.cima'), f('quadril.embaixo'), u), plantar: f('pe.plantar'), juntas: f('pernas.juntas'), canela: f('canela.desce') },
  };
}

const corpoCom = (corpo: Corpo, u: number, cot: number, erro?: string) => {
  const fm = forma(u, erro);
  return naAlmofada(corpo, apoio(), fm.f, fm.p, cot, false);
};

/** A dobra do cotovelo embaixo: a do corpo em que o braço desce `alvo` graus abaixo da horizontal (o erro muda o alvo). */
function cotoveloEmbaixo(corpo: Corpo, erro?: string): number {
  const alvo = erro === 'e1' ? f('erro.fundo.braco') : f('braco.embaixo');
  const de = erro === 'e1' || erro === 'e2' ? erro : undefined;
  return calibragem(corpo, `mergulho-graviton:cotovelo-embaixo:${alvo}:${de ?? ''}`, () => resolver1((c) => alvo - bracoAbaixoDaHorizontal(corpoCom(corpo, 1, c, de).e), 30, 110, 30));
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const a = apoio();
  const r = corpoCom(corpo, u, mix(f('cotovelo.cima'), cotoveloEmbaixo(corpo, erro), u), erro);
  const e = r.e;
  const eixos = eixosDasAlcas().paralela;
  const M = graviton({
    alavanca: r.alavanca,
    cenario: { barra: true },
    noQuadro: { paralela: [a.maos.R, a.maos.L, eixos.R[1], eixos.L[1]], almofada: [e.lado.R.joelho, e.lado.L.joelho, ...cameNoQuadro()] },
  });
  return {
    esq: e,
    prims: M.prims,
    pecas: [M.pecas.estrutura, M.pecas.barra, M.pecas.alavanca, M.pecas.paralela],
    fios: [],
    cargas: [],
    marcas: {
      'barra.R': a.maos.R,
      'barra.L': a.maos.L,
      'eixo.R.a': eixos.R[0],
      'eixo.R.b': eixos.R[1],
      'eixo.L.a': eixos.L[0],
      'eixo.L.b': eixos.L[1],
      raio: [obj('graviton', 'alcaDiam') / 2, 0, 0],
      almofada: M.almofada,
      almofadaAo: direcaoDaAlavancaDoGraviton(r.alavanca),
      almofadaNormal: normalDaAlavancaDoGraviton(r.alavanca),
      alavanca: [r.alavanca, obj('graviton', 'alavancaTopo'), obj('graviton', 'cameDiam') / 2],
      pilha: [M.subida, 0, 0],
    },
    vies: { maoR: 1, maoL: 1 },
    // De três quartos de trás, a perna de longe (a esquerda) é pintada 5 cm atrás do corpo, e a almofada, que fica na
    // frente dela (o centro da almofada, 4 cm atrás na pintura, chega a 1,9 cm à frente da perna embaixo), era pintada
    // por cima: a canela e o pé de longe, deitados na almofada, sumiam embaixo da ponta dela. Ela vem para a frente da
    // almofada na pintura, ainda atrás do corpo (a regra mergulho-graviton-pernas-por-cima-da-almofada confere)
    viesNaVista: { quinaTras: { pernaL: VIES_DA_PERNA_DE_LONGE } },
  };
}

export const mergulhoGraviton: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // peito e tríceps, principais; a frente do ombro, secundária (a ficha da técnica; o mesmo do mergulho aprovado)
  papeis: { peitoral: 'p', triceps: 'p', deltAnt: 's' },
  trajetorias: { cotovelo: (q) => q.esq.lado.R.cotovelo, joelho: (q) => q.esq.lado.R.joelho },
};
