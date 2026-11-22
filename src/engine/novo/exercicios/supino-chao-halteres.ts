// Supino no chão com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/supino-chao-halteres.json);
// a postura é a do núcleo dos exercícios deitado no chão com halteres (./deitado-no-chao-halteres.ts): deitado de
// costas no colchonete, joelhos dobrados, pés no chão. Os braços seguem o supino reto aprovado (./supino-reto.ts): o
// braço gira num plano a `cotovelos.doTronco` graus do tronco, e o antebraço fica sempre na vertical. O que muda é onde
// a descida para: o chão. O braço desce até a pele da parte de trás dele encostar no chão (`braco.encosta`, a folga da
// pele ao chão), achado pela superfície do Boneco, e não por um ângulo escolhido.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/supino-chao-halteres.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { norm } from '../vec';
import type { V3 } from '../vec';
import { colchoneteNaCena, deitadoNoColchonete, folgaDoBracoAoChao, pernasNoChao, piso, zDaBola, zDoColchonete } from './deitado-no-chao-halteres';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

interface Cal {
  /** A pose do tronco deitado (parado no movimento certo). */
  pose: PoseTronco;
  zBola: number;
  zCol: number;
  /** A elevação do braço embaixo (graus acima da horizontal): onde a parte de trás do braço encosta no chão. */
  baixo: number;
  /** O mesmo, no erro de quicar o cotovelo (o braço bate e amassa no chão). */
  quique: number;
  /** O mesmo, com os cotovelos em "T" (o braço também para no chão). */
  emT: number;
}
const CACHE = new WeakMap<Corpo, Cal>();

const opcoes = (sobe = 0) => ({ lombar: f('lombar.base'), zOmbro: f('ombro.z'), sobe });

/**
 * Os braços: o braço no plano a `a` graus do tronco (visto de cima), `eps` graus acima da horizontal; o antebraço na
 * vertical, inclinado `cai` graus para fora (o erro de quicar) e `cabeca` graus para o lado da cabeça (o erro de
 * perder o controle em cima).
 */
function bracos(a: number, eps: number, cai = 0, cabeca = 0): Record<Lado, PoseBraco> {
  const giro = f('pegada.giro') * rad;
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const A = a * rad,
      E = eps * rad;
    const umero: V3 = [s * Math.cos(E) * Math.sin(A), Math.sin(E), Math.cos(E) * Math.cos(A)];
    const antebraco = norm([s * Math.sin(cai * rad), Math.cos(cai * rad) * Math.cos(cabeca * rad), -Math.sin(cabeca * rad)]);
    return { umero, antebraco, polo: [s * Math.sin(A), -0.2, Math.cos(A)], mao: { polegar: norm([-s * Math.cos(giro), 0, -Math.sin(giro)]), forma: 'pegada', diam: obj('halter', 'caboDiam') } };
  };
  return { R: braco('R'), L: braco('L') };
}

function calibrar(corpo: Corpo): Cal {
  let c = CACHE.get(corpo);
  if (c) return c;
  // a conta demorada vem guardada para o corpo do app: ../calibragens.ts
  c = calibragem(corpo, `${F.id}:calibrar`, () => {
    const t = deitadoNoColchonete(corpo, opcoes());
    const zBola = zDaBola(corpo, t, f('joelho'));
    const zCol = zDoColchonete(corpo, t, f('colchonete.alemDaCabeca'));
    const pernas = pernasNoChao(corpo, zBola);
    const ate = (folga: number, a = f('cotovelos.doTronco')) => resolver1((eps) => folgaDoBracoAoChao(resolverMembros(t, bracos(a, eps), pernas), 'R', zCol) - folga, 40, -40, 30);
    return { pose: { ...t.pose }, zBola, zCol, baixo: ate(f('braco.encosta')), quique: ate(f('erro.quique.amassa')), emT: ate(f('braco.encosta'), f('erro.cotovelos.doTronco')) };
  });
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const t = erro === 'quadril' ? deitadoNoColchonete(corpo, opcoes(f('erro.quadril.sobe') * u)) : resolverTronco(corpo, c.pose);
  const a = erro === 'cotovelos' ? f('erro.cotovelos.doTronco') : f('cotovelos.doTronco');
  const eps = u * (erro === 'quique' ? c.quique : erro === 'cotovelos' ? c.emT : c.baixo) + (1 - u) * f('braco.cima');
  // o quique: no fim da descida o braço bate no chão e o halter tomba para fora (a carga sai do controle)
  const cai = erro === 'quique' ? f('erro.quique.antebraco') * u * u : 0;
  // perder o controle em cima: os halteres balançam para o lado do rosto
  const cabeca = erro === 'controle' ? f('erro.controle.antebraco') * (1 - u) : 0;
  const e: Esq = resolverMembros(t, bracos(a, eps, cai, cabeca), pernasNoChao(corpo, c.zBola));
  const cena = colchoneteNaCena(c.zCol, [-80, 80, -110, 95]);
  const prims = cena.prims;
  const pecas: Peca[] = [...cena.pecas];
  const cargas = [];
  for (const k of ['R', 'L'] as Lado[]) {
    const L = e.lado[k];
    prims.push(...halter(L.pegada, L.mao.x, 0.2));
    pecas.push({ t: 'halter', centro: L.pegada, eixo: L.mao.x });
    cargas.push({ massa: f('carga'), pos: L.pegada });
  }
  return { esq: e, prims, pecas, fios: [], cargas, marcas: { halter: e.lado.R.pegada, colchonete: [0, piso(), c.zCol] }, vies: { maoR: 1, maoL: 1 } };
}

export const supinoChaoHalteres: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // peito (principal), frente do ombro e tríceps (secundários), como a ficha da técnica e a biblioteca
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's' },
  // só o halter: de lado, os nomes das duas linhas (halter e cotovelo) ficavam um em cima do outro, com o fio de um
  // cortando o outro (a cena deitada ocupa a largura do quadro e não sobra lado para os nomes)
  trajetorias: { halter: (q) => q.marcas.halter! },
};
