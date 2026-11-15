// Flexão com o quadril alto (pike), no motor novo. Técnica: docs/pesquisa/animacoes/pike.md.
// Mãos espalmadas e pontas dos pés presas no chão, como na flexão aprovada; o quadril bem alto, o corpo num V de
// cabeça para baixo. O corpo é descrito por dois ângulos: o das pernas (do tornozelo ao quadril, acima do chão) e o do
// tronco (abaixo da horizontal). Em cima, os dois saem do cotovelo quase estendido e da flexão do quadril pedidos;
// embaixo, de onde a cabeça chega (perto do chão, na linha das mãos). Os braços alcançam as mãos paradas.
import ficha from '../dados/movimentos/pike.json';
import { angulosDoLado } from '../conferir-util';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, resolver2 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import type { V3 } from '../vec';
import { maisBaixoDa, maoEspalmada, pesNaPonta, quadrilAoTornozelo } from './apoio-no-chao';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
type Angs = [number, number];
const CACHE = new WeakMap<Corpo, { cima: Angs; baixo: Angs; quadril: Angs }>();

/** O corpo com as pernas `beta` graus acima do chão e o tronco `phi` graus abaixo da horizontal. */
function pose(corpo: Corpo, beta: number, phi: number, cot = f('cotovelos.doTronco'), zMao = f('maos.aFrenteDosPes')): Esq {
  const { pernas, tornozelo } = pesNaPonta(corpo, f('pes.meiaDistancia'), f('calcanhar.sobe'), [0, -0.6, 1]);
  const d = quadrilAoTornozelo(corpo, f('joelho'));
  const pelve: V3 = [0, tornozelo[1] + d * Math.sin(beta * rad), tornozelo[2] + d * Math.cos(beta * rad)];
  const t = resolverTronco(corpo, { pelve, frente: 90 + phi, cervical: f('pescoco.flexao'), cabeca: 0 });
  const x = corpo.m('ombro.meiaDistancia') + f('maos.alemDoOmbro'),
    a = cot * rad;
  // os cotovelos vão para trás (na direção dos pés) e um pouco para fora: `cot` graus do tronco
  const braco = (k: Lado) => maoEspalmada(corpo, k, x, 0, zMao, [sinal(k) * Math.sin(a), 0.25, -Math.cos(a)]);
  return resolverMembros(t, { R: braco('R'), L: braco('L') }, pernas);
}

function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const zMao = f('maos.aFrenteDosPes');
  // em cima: o V do quadril dá o tronco para cada ângulo das pernas, e o cotovelo quase estendido dá as pernas (em
  // dois passos, porque com o braço reto o cotovelo para de mudar e um passo só não acha a raiz)
  const phiDe = (b: number) => resolver1((p) => angulosDoLado(pose(corpo, b, p), 'R').quadril - f('quadril.cima'), 0, 90, 30);
  const bCima = resolver1((b) => pose(corpo, b, phiDe(b)).lado.R.ang.cotovelo - f('cotovelo.cima'), 40, 75, 30);
  const cima: Angs = [bCima, phiDe(bCima)];
  // embaixo: o ponto mais baixo da cabeça perto do chão e na linha das mãos
  const baixo = resolver2((b, p) => {
    const h = maisBaixoDa(pose(corpo, b, p), ['cabeca']);
    return [h[1] - f('cabeca.aoChao'), h[2] - zMao - f('cabeca.naLinhaDasMaos')];
  }, 50, 55, 30);
  // erro "quadril desce": os ombros passam à frente das mãos e o corpo desce até onde encosta perto do chão
  const quadril = resolver2((b, p) => {
    const e = pose(corpo, b, p);
    const h = maisBaixoDa(e, ['cabeca', 'tronco', 'pescoco']);
    return [e.lado.R.ombro[2] - zMao - f('erro.quadril.ombrosAFrente'), h[1] - f('cabeca.aoChao')];
  }, 30, 25, 30);
  c = { cima, baixo, quadril };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const fundo = erro === 'curta' ? f('erro.curta.fracao') : 1;
  const alvo = erro === 'quadril' ? c.quadril : c.baixo;
  const v = u * fundo;
  const cot = erro === 'cot' ? mix(f('cotovelos.doTronco'), f('erro.cot.doTronco'), Math.min(1, u * 1.6)) : undefined;
  const e = pose(corpo, mix(c.cima[0], alvo[0], v), mix(c.cima[1], alvo[1], v), cot);
  return { esq: e, prims: [chao(-80, 80, -60, 160)], fios: [], cargas: [], marcas: {} };
}

export const pike: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // a biblioteca: frente do ombro principal; lateral do ombro e tríceps secundários (revisão de anatomia, achado 4)
  papeis: { deltAnt: 'p', deltLat: 's', triceps: 's' },
  trajetorias: { cabeça: (q) => q.esq.cabeca.o, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
