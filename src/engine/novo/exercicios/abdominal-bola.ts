// Abdominal na bola suíça (crunch), no motor novo. Os números vêm da ficha (../dados/movimentos/abdominal-bola.json).
// A técnica do tronco, do pescoço e das mãos é a do abdominal no chão (./abdominal.ts); muda o apoio: a bola suíça
// (../pecas-de-cena/bola-suica.ts), parada, sob a parte de baixo das costas, e os pés no chão.
//
// A bacia fica parada, inclinada para trás (o glúteo na frente da bola, as coxas quase na horizontal): ela é posta para
// o meio da lombar ficar sobre o centro da bola e a pele da lombar entrar na bola o que ela amassa. Embaixo, a torácica
// estende até a parte de cima das costas encostar na bola (as costas acompanham a curva dela); daí a coluna enrola, e
// as escápulas saem da bola. A bola não rola e não muda de forma no desenho: a pele entra nela o que ela amassa.
import ficha from '../dados/movimentos/abdominal-bola.json';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { bolaSuica, formaDaBola } from '../pecas-de-cena/bola-suica';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import type { V3 } from '../vec';
import { bracosCruzados, entraNaBola, pernasDobradas, regioesDasCostas } from './abdominal';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

const maos = () => ({ x: f('maos.x'), y: f('maos.y'), abaixo: f('maos.abaixo'), acima: f('maos.acima'), poloFora: f('maos.poloFora'), poloPes: f('maos.poloPes'), poloTras: f('maos.poloTras') });
const montar = (corpo: Corpo, p: PoseTronco, zPe: number): Esq => {
  const t = resolverTronco(corpo, p);
  return resolverMembros(t, bracosCruzados(corpo, t, maos()), pernasDobradas(corpo, zPe));
};
/** O centro da bola, parada (z = 0) ou rolada `anda` cm para o lado da cabeça. */
const centroDaBola = (anda = 0): V3 => [0, formaDaBola().alturaDoCentro, -anda];

/** A altura da bacia em que a pele das costas (da lombar às escápulas) entra na bola o que ela amassa. */
function alturaNaBola(corpo: Corpo, p: PoseTronco, zPe: number, c: V3): number {
  const r = regioesDasCostas(montar(corpo, p, zPe));
  const costas = [...r.lombar, ...r.escapulas];
  const R = formaDaBola().R;
  const dy = resolver1((d) => f('bola.amassa') - entraNaBola(costas.map((q): V3 => [q[0], q[1] + d, q[2]]), c, R), -60, 60, 40);
  return p.pelve[1] + dy;
}

const CACHE = new WeakMap<Corpo, { pose: PoseTronco; zPe: number }>();
/**
 * A bacia, com a inclinação da ficha, fica em z onde o meio da lombar (L3) cai sobre o ponto da ficha em relação ao
 * centro da bola, e em y onde as costas encostam na bola (a pele entra o que ela amassa); o pé, onde a canela fica em pé
 * (o tornozelo sob o joelho).
 */
function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const B = centroDaBola();
  const p0: PoseTronco = { pelve: [0, 50, 0], frente: f('pelve.frente'), lombar: f('lombar.base'), toracica: f('toracica.base'), cervical: f('cervical.base') };
  const meio = resolverTronco(corpo, p0).nos[2]!.ref.o;
  let pose: PoseTronco = { ...p0, pelve: [0, 50, B[2] + f('bola.lombar') - meio[2]] };
  let zPe = pose.pelve[2] + 45;
  for (let i = 0; i < 2; i++) {
    pose = { ...pose, pelve: [0, alturaNaBola(corpo, pose, zPe, B), pose.pelve[2]] };
    zPe = resolver1((z) => {
      const L = montar(corpo, pose, z).lado.R;
      return L.tornozelo[2] - L.joelho[2] - f('canela.aFrente');
    }, pose.pelve[2] + 5, pose.pelve[2] + 70, 30);
  }
  c = { pose, zPe };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  let tor = f('toracica.base') + f('toracica.topo') * u,
    lomb = f('lombar.base') + f('lombar.topo') * u,
    cerv = mix(f('cervical.base'), f('cervical.topo'), u),
    cab = f('cabeca.topo') * u,
    pose = c.pose,
    anda = 0;
  if (erro === 'pescoco') {
    tor = f('toracica.base') + f('toracica.topo') * f('erro.pescoco.toracica') * u;
    lomb = f('lombar.base') + f('lombar.topo') * f('erro.pescoco.toracica') * u;
    cerv = mix(f('cervical.base'), f('erro.pescoco.cervical'), u);
    cab = f('erro.pescoco.cabeca') * u;
  }
  if (erro === 'senta') {
    // o quadril dobra: a bacia gira em volta do centro do quadril, e a coluna vai junto
    pose = { ...pose, frente: (pose.frente ?? 0) + f('erro.senta.quadril') * u };
  }
  if (erro === 'rola') {
    // as pernas empurram: a bola rola para a cabeça, o tronco sobe em bloco (sem enrolar) e assenta na bola de novo
    anda = f('erro.rola.anda') * u;
    tor = f('toracica.base');
    lomb = f('lombar.base');
    cerv = f('cervical.base');
    cab = 0;
    const p1: PoseTronco = { ...pose, frente: (pose.frente ?? 0) + f('erro.rola.tronco') * u, pelve: [0, pose.pelve[1], pose.pelve[2] - anda], toracica: tor };
    pose = { ...p1, pelve: [0, alturaNaBola(corpo, p1, c.zPe, centroDaBola(anda)), p1.pelve[2]] };
  }
  const e = montar(corpo, { ...pose, toracica: tor, lombar: lomb, cervical: cerv, cabeca: cab }, c.zPe);
  const bola = bolaSuica(0, centroDaBola(anda)[2], anda / formaDaBola().R);
  return { esq: e, prims: [chao(-60, 60, -80, 70), ...bola.prims], pecas: [bola.peca], fios: [], cargas: [], marcas: { bola: bola.centro } };
}

export const abdominalBola: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // só o abdômen, principal, sem secundário (B.3.2; a ficha da técnica)
  papeis: { abdomen: 'p' },
  trajetorias: { ombros: (q) => q.esq.lado.R.ombro },
};
