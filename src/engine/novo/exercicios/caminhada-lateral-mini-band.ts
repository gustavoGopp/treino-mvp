// Caminhada lateral com mini band, no motor novo. Os números vêm da ficha
// (../dados/movimentos/caminhada-lateral-mini-band.json). Em pé, meio agachado, o tronco reto um pouco inclinado à
// frente, as mãos na cintura; a mini band em volta das duas coxas, logo acima dos joelhos (../pecas-de-cena/mini-band.ts,
// `lacoNasCoxas`, como na abdução com mini band aprovada). É o primeiro exercício em que os pés saem do lugar: o pé
// direito dá um passo para o lado (sai do chão, anda no ar e apoia), e o esquerdo acompanha devagar, até a largura do
// quadril, sem juntar; dois passos para um lado, dois de volta, e o corpo volta ao lugar do começo (o ciclo fecha). Cada pé
// fica preso no chão só enquanto apoia (`pe.R:noChao` nos contatos).
//
// O ciclo, em u (0 a 1), tem oito trechos de 1/8: dois passos para a direita (o pé direito abre, o esquerdo
// acompanha, duas vezes) e dois de volta para a esquerda (o esquerdo abre, o direito acompanha); o último quadro é o
// primeiro. O quadril fica no meio dos dois pés, na altura em que, com os pés na largura do quadril, o joelho dobra o
// que a ficha pede; para a frente e para trás, onde o centro de massa fica sobre o meio dos pés.
import ficha from '../dados/movimentos/caminhada-lateral-mini-band.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PosePerna } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { lacoNasCoxas, miniBand } from '../pecas-de-cena/mini-band';
import type { Corpo } from '../tabelas';
import { mix, norm } from '../vec';
import { maosNaCintura } from './afundo-estatico';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const entre = (x: number) => Math.max(0, Math.min(1, x));

/** Onde fica cada pé (x do meio do pé) e quanto ele está no ar (cm), em u. */
interface Pes {
  x: Record<Lado, number>;
  y: Record<Lado, number>;
}
/** Os oito trechos do ciclo: quem anda e se é o passo para fora (o pé que abre) ou o outro pé que acompanha. */
const TRECHOS: { quem: Lado; abre: boolean }[] = [
  { quem: 'R', abre: true },
  { quem: 'L', abre: false },
  { quem: 'R', abre: true },
  { quem: 'L', abre: false },
  { quem: 'L', abre: true },
  { quem: 'R', abre: false },
  { quem: 'L', abre: true },
  { quem: 'R', abre: false },
];
/** Onde ficam os pés no fim de cada trecho (o começo é o fim do anterior; o primeiro começa na largura do quadril). */
function marcos(erro?: string): Record<Lado, number>[] {
  const w = f('pes.meiaDistancia'),
    d = f('passo');
  const m: Record<Lado, number>[] = [{ R: -w, L: w }];
  TRECHOS.forEach((t, i) => {
    const a = m[i]!;
    const b = { ...a };
    // para a direita (−x) nos quatro primeiros trechos, de volta para a esquerda nos outros
    const sentido = i < 4 ? -1 : 1;
    if (t.abre) b[t.quem] = a[t.quem] + sentido * d;
    else {
      // o pé que acompanha para na largura do quadril; no erro, no primeiro passo, vem até quase encostar no outro
      const vao = erro === 'frouxa' && i === 1 ? f('erro.frouxa.vao') : 2 * w;
      const outro: Lado = t.quem === 'R' ? 'L' : 'R';
      b[t.quem] = a[outro] + (t.quem === 'R' ? -vao : vao);
    }
    m.push(b);
  });
  return m;
}
/** O trecho em que u cai e quanto dele já andou (0 a 1). */
function trecho(u: number): { k: number; s: number } {
  const n = TRECHOS.length;
  const k = Math.min(n - 1, Math.floor(u * n));
  return { k, s: entre(u * n - k) };
}
function pes(u: number, erro?: string): Pes {
  const M = marcos(erro);
  const { k, s } = trecho(u);
  const a = M[k]!,
    b = M[k + 1]!;
  // o pé sobe antes de andar para o lado e só apoia depois de chegar: no chão, ele não arrasta
  const r = entre((s - 0.1) / 0.8);
  const lado = r * r * (3 - 2 * r);
  const x = { R: mix(a.R, b.R, lado), L: mix(a.L, b.L, lado) };
  const y = { R: 0, L: 0 };
  y[TRECHOS[k]!.quem] = f('passo.altura') * Math.sin(Math.PI * s) ** 2;
  return { x, y };
}

const CAL = new WeakMap<Corpo, { y: number; z: number }>();
/** A altura e o lugar à frente do quadril: o joelho dobrado o que a ficha pede, e o centro de massa sobre o meio dos pés. */
function calibrar(corpo: Corpo) {
  let c = CAL.get(corpo);
  if (c) return c;
  const p0 = pes(0);
  let y = 85,
    z = 0;
  const alvo = corpo.m('pe.calcanharABola') / 2 - corpo.m('pe.calcanharAoTornozelo');
  for (let i = 0; i < 4; i++) {
    const z0 = z;
    y = resolver1((yy) => montar(corpo, p0, 0, yy, z0).lado.R.ang.joelho - f('joelho'), 100, 60);
    const y0 = y;
    z = resolver1((zz) => centroDeMassa(montar(corpo, p0, 0, y0, zz), 'homem')[2] - alvo, -25, 25);
  }
  c = { y, z };
  CAL.set(corpo, c);
  return c;
}

/** O corpo com os pés em `p`, o quadril no meio deles; `giro`: os joelhos para dentro (graus); `balanca`: o tronco para o lado. */
function montar(corpo: Corpo, p: Pes, giro: number, y: number, z: number, balanca = 0): Esq {
  const dBola = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo');
  const tr = f('tronco');
  const t = resolverTronco(corpo, { pelve: [(p.x.R + p.x.L) / 2, y, z], frente: tr, lombar: 0, lombarLado: balanca, cervical: -tr * 0.25, cabeca: -tr * 0.2 });
  const perna = (k: Lado): PosePerna => {
    const s = sinal(k);
    // o joelho aponta para a frente, um pouco para fora (na linha do pé); no erro, gira para dentro
    const a = (4 - giro) * rad;
    return { pe: { bola: [p.x[k], p.y[k], dBola], dir: [0, 0, 1] }, polo: norm([s * Math.sin(a), 0, Math.cos(a)]) };
  };
  const acima = f('maos.naCintura.acima');
  return resolverMembros(t, { R: maosNaCintura(t, 'R', acima), L: maosNaCintura(t, 'L', acima) }, { R: perna('R'), L: perna('L') });
}

function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
  const c = calibrar(corpo);
  const p = pes(u, erro);
  // os joelhos caem para dentro mais quando a faixa está mais esticada: com os pés mais afastados
  const w = f('pes.meiaDistancia');
  const abertos = entre((Math.abs(p.x.L - p.x.R) - 2 * w) / f('passo'));
  const giro = erro === 'joelhos' ? f('erro.joelhos.giro') * abertos : 0;
  // o tronco joga para o lado do passo enquanto o pé abre, e volta enquanto o outro acompanha
  const { k, s } = trecho(u);
  const r = s * s * (3 - 2 * s);
  const balanca = erro === 'balanca' ? (k < 4 ? -1 : 1) * f('erro.balanca.graus') * (TRECHOS[k]!.abre ? r : 1 - r) : 0;
  return montar(corpo, p, giro, c.y, c.z, balanca);
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = esqueleto(corpo, u, erro);
  const laco = lacoNasCoxas(e, f('faixa.acimaDoJoelho'));
  const mb = miniBand(laco);
  return {
    esq: e,
    prims: [chao(-100, 100, -60, 70), ...mb.prims],
    pecas: [mb.peca],
    fios: [{ id: 'elastico', comp: laco.comp, estica: true, objeto: 'miniBand' }],
    cargas: [],
    marcas: { faixaR: laco.centros.R, faixaL: laco.centros.L },
  };
}

export const caminhadaLateralMiniBand: Exercicio = {
  ficha: F,
  // de três quartos pela frente: o meio agachado e o passo, lidos de relance; de frente: a largura do passo e a faixa;
  // de três quartos por trás: o glúteo (o modo Músculos, por medida)
  vistas: ['quina', 'frontal', 'quinaTras'],
  quadro,
  // glúteos (médio e parte de cima), dos dois lados: o desenho tem um glúteo só, que não separa o médio
  papeis: { gluteo: 'p' },
  trajetorias: { 'pé direito': (q) => q.esq.lado.R.tornozelo, quadril: (q) => q.esq.pelve.o },
};
