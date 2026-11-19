// Tríceps testa com halteres, deitado, no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-testa-halteres.json); a postura é a do núcleo dos exercícios deitado no chão com
// halteres (./deitado-no-chao-halteres.ts): deitado de costas no colchonete, joelhos dobrados, pés no chão. O cartão
// aceita o chão (com colchonete) ou um banco; aqui é o chão, como o supino no chão.
//
// Como nos tríceps franceses (./triceps-frances-base.ts), o braço fica parado e só o cotovelo dobra: o braço aponta
// para o teto, `braco.paraTras` graus para o lado da cabeça, na largura dos ombros; o antebraço gira em volta do
// cotovelo, no plano de lado, e leva o halter para o lado da cabeça. A pegada é neutra (palmas uma para a outra): o
// cabo do halter fica no plano de lado, de través ao antebraço. Embaixo, o cotovelo dobra até o halter chegar a
// `halter.folgaEmbaixo` cm do colchonete (é o chão que limita a descida, como no supino no chão): o ângulo sai daí,
// medido na casca do halter, e não de um número escolhido.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/triceps-testa-halteres.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { halter } from '../pecas';
import type { Peca } from '../pecas';
import { pesoNoCorpo } from '../regras/peso-fora-do-corpo';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, girar, mul, norm, perp, sub } from '../vec';
import { colchoneteNaCena, deitadoNoColchonete, folgaDoHalterAoChao, pernasNoChao, piso, zDaBola, zDoColchonete } from './deitado-no-chao-halteres';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
/** O halter sextavado de 10 lb ("halteres leves", no cartão e na ficha da técnica). */
const HALTER = 'halterLeve';

/** O que muda de um quadro para o outro (e nos erros). */
interface Pedido {
  /** Flexão do cotovelo (graus). */
  cotovelo: number;
  /** O braço: graus para o lado da cabeça a partir da vertical (negativo = para os pés) e para fora (abrir os cotovelos). */
  paraTras: number;
  fora: number;
  /** O plano em que o antebraço dobra, girado em volta do braço para o meio (graus): o erro de ir até a falha. */
  paraDentro: number;
}

/** O braço e o antebraço de um lado, e o eixo do halter (o polegar), para um pedido. */
function braco(k: Lado, p: Pedido): PoseBraco {
  const s = sinal(k);
  // o braço: da vertical, para o lado da cabeça (−z) e para fora (o lado k)
  const u = norm(girar(girar([0, 1, 0], [1, 0, 0], -p.paraTras), [0, 0, 1], -s * p.fora));
  // o antebraço dobra para o lado da cabeça (−z), no plano do braço com essa direção, girado para o meio na falha
  const w0 = norm(perp([0, 0, -1], u));
  const w = norm(girar(w0, u, s * p.paraDentro));
  const c = p.cotovelo * (Math.PI / 180);
  const antebraco = norm(add(mul(u, Math.cos(c)), mul(w, Math.sin(c))));
  // pegada neutra: o polegar aponta para a cabeça com o braço esticado e gira junto com o antebraço
  const polegar = norm(add(mul(w, Math.cos(c)), mul(u, -Math.sin(c))));
  return { umero: u, antebraco, polo: u, mao: { polegar, forma: 'pegada', diam: obj(HALTER, 'caboDiam') } };
}
const bracos = (p: Pedido): Record<Lado, PoseBraco> => ({ R: braco('R', p), L: braco('L', p) });

interface Cal {
  pose: PoseTronco;
  zBola: number;
  zCol: number;
  /** Flexão do cotovelo embaixo: o halter a `halter.folgaEmbaixo` cm do colchonete. */
  baixo: number;
  /** O giro do antebraço para o meio na falha (com o cotovelo em `erro.falha.cotovelo`): o halter a `erro.falha.folga` cm da testa. */
  falha: number;
}
const CACHE = new WeakMap<Corpo, Cal>();
const certo = (cotovelo: number): Pedido => ({ cotovelo, paraTras: f('braco.paraTras'), fora: 0, paraDentro: 0 });

/**
 * Quanto os dois halteres, engordados de `folga` cm para todos os lados (as cabeças mais largas e mais compridas), entram
 * no corpo (cm; 0 = ficam a `folga` cm ou mais da pele), pela regra peso-fora-do-corpo, fora as mãos que seguram.
 */
function halterComFolgaNoCorpo(e: Esq, folga: number): number {
  const prims = (['R', 'L'] as Lado[]).flatMap((k) =>
    halter(e.lado[k].pegada, e.lado[k].mao.x, 0.2, HALTER)
      .filter((p) => p.t === 'prisma')
      .map((p) => {
        if (p.t !== 'prisma') return p;
        const ax = norm(sub(p.b, p.a));
        return { ...p, a: add(p.a, mul(ax, -folga)), b: add(p.b, mul(ax, folga)), ra: p.ra + folga, rb: p.rb + folga };
      }),
  );
  return pesoNoCorpo({ esq: e, prims, pecas: [], fios: [], cargas: [], marcas: {} }).cm;
}

function calibrar(corpo: Corpo): Cal {
  let c = CACHE.get(corpo);
  if (c) return c;
  // a conta demorada vem guardada para o corpo do app: ../calibragens.ts
  c = calibragem(corpo, `${F.id}:calibrar`, () => {
    const t = deitadoNoColchonete(corpo, { lombar: f('lombar.base'), zOmbro: f('ombro.z') });
    const zBola = zDaBola(corpo, t, f('joelho'));
    const zCol = zDoColchonete(corpo, t, f('colchonete.alemDaCabeca'));
    const pernas = pernasNoChao(corpo, zBola);
    const pose = (p: Pedido) => resolverMembros(t, bracos(p), pernas);
    const baixo = resolver1((x) => {
      const L = pose(certo(x)).lado.R;
      return folgaDoHalterAoChao(L.pegada, L.mao.x, HALTER, zCol) - f('halter.folgaEmbaixo');
    }, 60, 170, 30);
    // Correção de 19/11/2026: a folga era medida entre os pontos do halter e os 12 pontos de cada anel da cabeça, e o
    // halter passava entre eles e entrava 2,8 cm na cabeça. Agora ela é medida na superfície: o maior giro em que o
    // halter, engordado de `erro.falha.folga` cm para todos os lados, ainda não entra no corpo (a cabeça, os braços).
    let a = 0,
      b = 30;
    for (let i = 0; i < 24; i++) {
      const x = (a + b) / 2;
      const e = pose({ ...certo(f('erro.falha.cotovelo')), paraDentro: x });
      if (halterComFolgaNoCorpo(e, f('erro.falha.folga')) <= 0) a = x;
      else b = x;
    }
    const falha = a;
    return { pose: { ...t.pose }, zBola, zCol, baixo, falha };
  });
  CACHE.set(corpo, c);
  return c;
}

function pedido(c: Cal, u: number, erro?: string): Pedido {
  const p = certo(u * c.baixo + (1 - u) * f('cotovelo.estendido'));
  // abrir os cotovelos: o braço vai para fora enquanto o cotovelo dobra
  if (erro === 'cotovelos') p.fora = f('erro.cotovelos.fora') * u;
  // mexer os ombros: o braço desce para o lado dos pés, como num supino
  if (erro === 'ombro') p.paraTras = f('braco.paraTras') + (f('erro.ombro.braco') - f('braco.paraTras')) * u;
  // ir até a falha: na repetição em que a forma cede, os antebraços tombam para o meio e os halteres descem sobre a
  // testa, em vez de irem para os lados da cabeça
  if (erro === 'falha') {
    p.cotovelo = u * f('erro.falha.cotovelo') + (1 - u) * f('cotovelo.estendido');
    p.paraDentro = c.falha * u * u;
  }
  return p;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const t = resolverTronco(corpo, c.pose);
  const e: Esq = resolverMembros(t, bracos(pedido(c, u, erro)), pernasNoChao(corpo, c.zBola));
  const cena = colchoneteNaCena(c.zCol, [-80, 80, -120, 95]);
  const prims = cena.prims;
  const pecas: Peca[] = [...cena.pecas];
  const cargas = [];
  for (const k of ['R', 'L'] as Lado[]) {
    const L = e.lado[k];
    prims.push(...halter(L.pegada, L.mao.x, 0.2, HALTER));
    pecas.push({ t: 'halter', centro: L.pegada, eixo: L.mao.x, objeto: HALTER });
    cargas.push({ massa: obj(HALTER, 'massa'), pos: L.pegada });
  }
  return { esq: e, prims, pecas, fios: [], cargas, marcas: { halter: e.lado.R.pegada, colchonete: [0, piso(), c.zCol] }, vies: { maoR: 1, maoL: 1 } };
}

export const tricepsTestaHalteres: Exercicio = {
  ficha: F,
  // de lado (o cotovelo dobra no plano de lado) e de três quartos (o tríceps e o halter ao lado da cabeça); de cima o
  // braço aponta para quem olha e o tríceps não aparece (medido: 0 cm²); de frente as coxas tapam a cabeça e os braços
  vistas: ['quina', 'lateral'], // de três quartos primeiro: de lado, no fim da descida, o halter parece estar no rosto (fica 6 cm ao lado)
  quadro,
  // só o tríceps (principal), como a ficha da técnica e a biblioteca
  papeis: { triceps: 'p' },
  // só o halter: o cotovelo fica parado (é o que a ficha pede)
  trajetorias: { halter: (q) => q.marcas.halter! },
};
