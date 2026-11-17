// Abdominal no chão (crunch), no motor novo. Os números vêm da ficha (../dados/movimentos/abdominal-chao.json); a
// pose é a do núcleo dos abdominais (./abdominal.ts): deitado de costas, joelhos dobrados, pés no chão, mãos cruzadas
// no peito. A bacia fica parada no chão; a parte de cima da coluna enrola até as escápulas saírem do chão, e o pescoço
// acompanha o tronco. Os erros: puxar o pescoço (o queixo vai ao peito e as escápulas mal saem) e subir a lombar (o
// quadril dobra e a bacia gira: vira um abdominal completo).
import ficha from '../dados/movimentos/abdominal-chao.json';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { baseDeCostas, bracosCruzados, pernasDobradas, troncoEnrolado } from './abdominal';
import type { BaseDeCostas, Enrolar } from './abdominal';
import { pelveAoChao } from './flexao-joelho';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const CACHE = new WeakMap<Corpo, { b: BaseDeCostas; zBola: number }>();

const maos = () => ({ x: f('maos.x'), y: f('maos.y'), abaixo: f('maos.abaixo'), acima: f('maos.acima'), poloFora: f('maos.poloFora'), poloPes: f('maos.poloPes'), poloTras: f('maos.poloTras') });
const montar = (corpo: Corpo, t: Tronco, zBola: number): Esq => resolverMembros(t, bracosCruzados(corpo, t, maos()), pernasDobradas(corpo, zBola));

/** A base deitada e onde fica o pé (o joelho dobra o que a ficha pede, com o corpo deitado). */
function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const b = baseDeCostas(corpo, f('lombar.base'), f('ombro.z'));
  const t0 = resolverTronco(corpo, b.pose);
  const zBola = resolver1((z) => montar(corpo, t0, z).lado.R.ang.joelho - f('joelho'), 25, 75, 30);
  c = { b, zBola };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const o: Enrolar = { toracica: f('toracica.topo') * u, lombar: f('lombar.topo') * u, cervical: f('cervical.topo'), cabeca: f('cabeca.topo') };
  let b = c.b;
  if (erro === 'pescoco') {
    // as escápulas mal saem do chão e o pescoço dobra até o queixo ir ao peito
    o.toracica *= f('erro.pescoco.toracica');
    o.lombar *= f('erro.pescoco.toracica');
    o.cervical = f('erro.pescoco.cervical');
    o.cabeca = f('erro.pescoco.cabeca');
  }
  if (erro === 'lombar') {
    // o quadril dobra: a bacia gira em volta do centro do quadril (a coluna vai junto) e assenta de novo no chão
    const frente = (b.pose.frente ?? 0) + f('erro.lombar.quadril') * u;
    const t0 = resolverTronco(corpo, { ...b.pose, frente });
    b = { pose: { ...b.pose, frente, pelve: [b.pose.pelve[0], b.pose.pelve[1] - pelveAoChao(corpo, t0), b.pose.pelve[2]] } };
  }
  const t = troncoEnrolado(corpo, b, o, u);
  return {
    esq: montar(corpo, t, c.zBola),
    prims: [chao(-70, 70, -100, 90)],
    pecas: [],
    fios: [],
    cargas: [],
    marcas: {},
  };
}

export const abdominalChao: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // reto do abdômen (principal) e oblíquos (secundário), como a ficha da técnica e o guia de hoje
  papeis: { abdomen: 'p', obliquos: 's' },
  trajetorias: { ombros: (q) => q.esq.lado.R.ombro },
};
