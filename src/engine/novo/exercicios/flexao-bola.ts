// Flexão de joelho na bola suíça, no motor novo. Os números vêm da ficha (../dados/movimentos/flexao-bola.json); a
// ponte de costas é a do núcleo das flexões de joelho deitado (./flexao-joelho.ts), com os calcanhares no alto da bola
// em vez da toalha. Deitado de costas, braços no chão abertos ~30° do corpo; no começo, pernas estendidas e ombros,
// quadril e calcanhares em linha; os calcanhares puxam a bola em direção ao glúteo, o quadril sobe mais, e no fim os
// joelhos dobram ~90°, com os pés em cima da bola e ombros, quadril e joelhos em linha. A bola rola debaixo do pé.
import ficha from '../dados/movimentos/flexao-bola.json';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { bolaSuica, formaDaBola } from '../pecas-de-cena/bola-suica';
import type { Corpo } from '../tabelas';
import { mix, sub } from '../vec';
import { pontosDoBoneco } from '../boneco';
import type { Esq } from '../esqueleto';
import { folgaDaPelve, ponteDeCostas } from './flexao-joelho';
import type { OpcoesDaPonte } from './flexao-joelho';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const CACHE = new WeakMap<Corpo, { ini: number; fim: number; caido: number; peFim: number; z0: number }>();

/** O alto da bola na linha dos pés (os pés ficam na largura do quadril, fora do meio da bola). */
function apoioNaBola(corpo: Corpo, dz = 0): number {
  const B = formaDaBola(),
    x = corpo.m('quadril.meiaDistancia');
  return B.alturaDoCentro + Math.sqrt(B.R * B.R - x * x - dz * dz) - f('pe.afundaNaBola');
}
/**
 * Com as pernas estendidas, o calcanhar apoia um pouco atrás do alto da bola (do lado do corpo): a bola fica
 * `bola.alemDoCalcanhar` cm adiante do ponto de apoio, e a panturrilha passa por cima dela. No fim (pé deitado em
 * cima da bola), o apoio é o alto da bola.
 */
const alemDoPe = (v: number) => f('bola.alemDoCalcanhar') * (1 - v);
const opcoes = (corpo: Corpo, frente: number, joelho: number, pe: number, dz = 0): OpcoesDaPonte => {
  const a = f('bracos.abertura') * rad,
    L = (corpo.m('braco.comp') + corpo.m('antebraco.comp')) * f('bracos.alcance');
  return {
    frente,
    joelho,
    apoio: apoioNaBola(corpo, dz),
    zOmbro: f('ombro.z'),
    pe,
    // os braços no chão abertos ~30° do corpo: a mão fica na direção dos pés e para fora do ombro
    maoAbaixoDoOmbro: L * Math.cos(a),
    maoParaFora: L * Math.sin(a),
  };
};
/**
 * De lado, quanto o calcanhar fica acima (positivo) ou abaixo da linha do ombro ao quadril, em graus, visto do quadril.
 * 0 = ombro, quadril e calcanhar em linha.
 */
function foraDaLinha(e: Esq): number {
  const L = e.lado.R;
  const a = sub(L.quadril, L.ombro),
    b = sub(L.calcanhar, L.quadril);
  return Math.atan2(a[2] * b[1] - a[1] * b[2], a[1] * b[1] + a[2] * b[2]) / rad;
}
/**
 * Onde o pé encosta na bola: o ponto mais baixo da sola (o calcanhar no começo, o meio da sola no fim), como uma média
 * pesada pela altura, para a bola andar sem saltos de um ponto da superfície para o vizinho.
 */
function apoioDoPe(e: Esq): number {
  const pts = pontosDoBoneco(e).filter((x) => x.parte === 'pe' && x.p[0] < 0).map((x) => x.p);
  const min = Math.min(...pts.map((p) => p[1]));
  let s = 0,
    z = 0;
  for (const p of pts) {
    const w = Math.exp(-(p[1] - min) / 0.4);
    s += w;
    z += w * p[2];
  }
  return z / s;
}

function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  // fim: joelhos a 90°, ombros, quadril e joelhos em linha; o pé deita em cima da bola (a sola na horizontal)
  const fimCom = (pe: number) => resolver1((fr) => ponteDeCostas(corpo, opcoes(corpo, fr, f('joelho.fim'), pe)).quadril, -100, -175, 30);
  let peFim = 0,
    fim = fimCom(0);
  for (let i = 0; i < 3; i++) {
    const L = ponteDeCostas(corpo, opcoes(corpo, fim, f('joelho.fim'), peFim)).e.lado.R;
    // quanto falta para a sola ficar na horizontal (o pé aponta para +z)
    const inclina = Math.atan2(L.ponta[1] - L.calcanhar[1], L.ponta[2] - L.calcanhar[2]) / rad;
    peFim -= inclina;
    fim = fimCom(peFim);
  }
  // começo: pernas estendidas, ombros, quadril e calcanhares em linha (o calcanhar no alto da bola)
  const ini = resolver1((fr) => foraDaLinha(ponteDeCostas(corpo, opcoes(corpo, fr, f('joelho.inicio'), 0, alemDoPe(0))).e), -95, -150, 30);
  // erro "quadril encosta": a bacia desce até a pele do glúteo ficar a `erro.volta.folga` cm do chão
  const caido = resolver1((fr) => folgaDaPelve(corpo, fr, 0) - f('erro.volta.folga'), -85, -125, 30);
  const z0 = apoioDoPe(ponteDeCostas(corpo, opcoes(corpo, ini, f('joelho.inicio'), 0, alemDoPe(0))).e) + alemDoPe(0);
  c = { ini, fim, caido, peFim, z0 };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const v = erro === 'curta' ? u * f('erro.curta.fracao') : u;
  let frente = mix(c.ini, c.fim, v);
  // quadril cai ao puxar: a bacia não sobe (fica na inclinação do começo) e o quadril dobra para o pé chegar à bola
  if (erro === 'quadril') frente = mix(c.ini, mix(c.ini, c.fim, f('erro.quadril.sobe')), u);
  // quadril encosta na volta: no começo (u = 0), a bacia está no chão
  if (erro === 'volta') frente = mix(c.caido, c.fim, u);
  const p = ponteDeCostas(corpo, opcoes(corpo, frente, mix(f('joelho.inicio'), f('joelho.fim'), v), mix(0, c.peFim, v), alemDoPe(v)));
  // a bola fica debaixo do ponto do pé que apoia, e rola: o giro é o caminho andado dividido pelo raio
  const B = formaDaBola();
  const zb = apoioDoPe(p.e) + alemDoPe(v);
  const bola = bolaSuica(0, zb, (c.z0 - zb) / B.R);
  return {
    esq: p.e,
    prims: [chao(-80, 80, -110, 120), ...bola.prims],
    pecas: [bola.peca],
    fios: [],
    cargas: [],
    marcas: { bola: bola.centro, calcanhar: p.e.lado.R.calcanhar },
  };
}

export const flexaoBola: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // biblioteca: posteriores da coxa (principal) e glúteos (secundário), decidido na revisão de anatomia de 02/11/2026
  papeis: { posteriores: 'p', gluteo: 's' },
  trajetorias: { calcanhar: (q) => q.marcas.calcanhar!, quadril: (q) => q.esq.pelve.o },
};
