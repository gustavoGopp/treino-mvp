// Hiperextensão no banco romano a 45°, no motor novo. Os números vêm da ficha (../dados/movimentos/hiperextensao.json);
// o banco, da peça ../pecas-de-cena/banco-romano.ts. De bruços no banco, o corpo na linha da viga (45°): as solas na
// chapa dos pés, os rolos atrás dos tornozelos, a frente das coxas nas almofadas e as mãos cruzadas no peito (como no
// abdominal no chão aprovado, ./abdominal.ts). O tronco desce dobrando o quadril, com a coluna neutra, e sobe até a
// linha reta. As pernas e o centro do quadril ficam parados; a bacia e o tronco giram juntos em volta do quadril.
//
// O que se resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts):
//  - o corpo na linha da viga: as solas na chapa (a pele mais baixa do pé na face dela) e a frente das coxas nas
//    almofadas, amassando o que a ficha pede (medido na superfície do Boneco);
//  - a regulagem do banco: o alto das almofadas na altura do quadril que a ficha pede (a regra confere a faixa do
//    banco) e os rolos encostados atrás dos tornozelos.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/hiperextensao.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, Lado, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { bancoRomano, eixosDoBancoRomano, faceDasAlmofadas } from '../pecas-de-cena/banco-romano';
import type { BancoRomano } from '../pecas-de-cena/banco-romano';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dot, mul, sub } from '../vec';
import type { V3 } from '../vec';
import { bracosCruzados } from './abdominal';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const { u: U, n: N } = eixosDoBancoRomano();
/** A frente do corpo deitado na linha da viga (para as almofadas). */
const FRENTE = mul(N, -1);
/** O ponto da viga na face da chapa dos pés (o banco fica no meio da cena, em x = 0). */
const PLACA: V3 = [0, obj('bancoRomano', 'placaAltura'), 0];
const ANGULO = obj('bancoRomano', 'angulo');

const maos = () => ({ x: f('maos.x'), y: f('maos.y'), abaixo: f('maos.abaixo'), acima: f('maos.acima'), poloFora: f('maos.poloFora'), poloPes: f('maos.poloPes'), poloTras: f('maos.poloTras') });
/** As pernas paradas, estendidas na linha da viga, os dedos para a chapa, os joelhos para as almofadas. */
function pernas(): Record<Lado, PosePerna> {
  const p = (): PosePerna => ({ coxa: mul(U, -1), canela: mul(U, -1), peDir: FRENTE, polo: FRENTE });
  return { R: p(), L: p() };
}
interface Dobra {
  quadril: number;
  lombar: number;
  toracica: number;
  cervical: number;
}
function troncoEm(corpo: Corpo, pelve: V3, d: Dobra): Tronco {
  return resolverTronco(corpo, { pelve, frente: ANGULO + d.quadril, lombar: d.lombar, toracica: d.toracica, cervical: d.cervical, cabeca: f('cabeca') });
}
function montar(corpo: Corpo, pelve: V3, d: Dobra): Esq {
  const t = troncoEm(corpo, pelve, d);
  // as pernas saem de cada centro do quadril, que fica parado: a perna é dada por direção (os pés na largura do quadril)
  return resolverMembros(t, bracosCruzados(corpo, t, maos()), pernas());
}
const RETO: Dobra = { quadril: 0, lombar: 0, toracica: 0, cervical: 0 };

/** s (ao longo da viga, a partir da chapa) e k (acima da linha da viga) de um ponto. */
const sk = (p: V3): [number, number] => [dot(sub(p, PLACA), U), dot(sub(p, PLACA), N)];

/**
 * O quanto a pele das coxas entra nas almofadas (cm; positivo = amassa; negativo = a folga), só sobre elas: a pele que
 * fica acima da face conta a folga, e a que entra conta até a espessura do estofado.
 */
export function coxasNasAlmofadas(e: Esq, b: BancoRomano): number {
  const A = faceDasAlmofadas(b);
  const esp = obj('bancoRomano', 'almofadaEsp');
  let m = -1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'coxa') continue;
    const [s, k] = sk(p);
    if (s < A.s0 || s > A.s1 || Math.abs(p[0] - b.placa[0]) > A.meiaLarg || A.k - k > esp) continue;
    m = Math.max(m, A.k - k);
  }
  return m;
}
/** A sola mais perto da chapa: o menor s da pele dos pés (cm; negativo = entra na chapa). */
export function solaNaChapa(e: Esq): number {
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pe') m = Math.min(m, sk(p)[0]);
  return m;
}

interface Parado {
  pelve: V3;
  almofada: number;
  rolo: { s: number; k: number };
}
const CACHE = new WeakMap<Corpo, Parado>();
function parado(corpo: Corpo): Parado {
  let c = CACHE.get(corpo);
  if (c) return c;
  c = calibragem(corpo, `${F.id}:parado`, () => {
    let pelve: V3 = add(add(PLACA, mul(U, 90)), mul(N, 25));
    let almofada = 92;
    for (let i = 0; i < 5; i++) {
      let e = montar(corpo, pelve, RETO);
      // as solas na chapa
      pelve = add(pelve, mul(U, -solaNaChapa(e)));
      almofada = sk(pelve)[0] + f('almofada.acimaDoQuadril');
      e = montar(corpo, pelve, RETO);
      // a frente das coxas nas almofadas
      const b: BancoRomano = { placa: PLACA, almofada, rolo: { s: 10, k: 20 } };
      pelve = add(pelve, mul(N, coxasNasAlmofadas(e, b) - f('apoio.amassa')));
    }
    const e = montar(corpo, pelve, RETO);
    // os rolos atrás dos tornozelos: o eixo acima do centro do tornozelo, encostado na pele de trás da perna
    const sR = sk(e.lado.R.tornozelo)[0] + f('rolo.acimaDoTornozelo');
    let kPele = -1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'canela' || parte === 'pe') {
      const [s, k] = sk(p);
      if (Math.abs(s - sR) < 2) kPele = Math.max(kPele, k);
    }
    const rolo = { s: sR, k: kPele + obj('bancoRomano', 'roloDiam') / 2 - f('apoio.amassa') };
    return { pelve, almofada, rolo };
  });
  CACHE.set(corpo, c);
  return c;
}
/** O banco na regulagem do corpo. */
export function bancoDaHiperextensao(corpo: Corpo): BancoRomano {
  const p = parado(corpo);
  return { placa: PLACA, almofada: p.almofada, rolo: p.rolo };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const p = parado(corpo);
  const x = Math.max(0, Math.min(1, u));
  let d: Dobra = { quadril: f('quadril.baixo') * x, lombar: 0, toracica: 0, cervical: f('cervical') };
  if (erro === 'arqueia') {
    // em cima (u = 0), o corpo passa da linha: o quadril e a lombar estendem demais; a diferença some na descida
    const w = 1 - suave(x);
    d = { quadril: d.quadril + f('erro.arqueia.quadril') * w, lombar: f('erro.arqueia.lombar') * w, toracica: 0, cervical: f('cervical') + f('erro.arqueia.cervical') * w };
  }
  if (erro === 'arred') {
    // embaixo, quem dobra são as costas: o quadril dobra menos e a lombar e a torácica curvam
    const w = suave(x);
    d = { quadril: f('erro.arred.quadril') * x, lombar: f('erro.arred.lombar') * w, toracica: f('erro.arred.toracica') * w, cervical: f('cervical') };
  }
  const e = montar(corpo, p.pelve, d);
  const B = bancoRomano(bancoDaHiperextensao(corpo));
  return {
    esq: e,
    prims: [chao(-70, 70, -60, 160), ...B.prims],
    pecas: [B.peca],
    fios: [],
    cargas: [],
    marcas: {},
  };
}

export const hiperextensao: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // glúteos e posteriores (os dois principais na biblioteca); os eretores da coluna não estão no desenho
  papeis: { gluteo: 'p', posteriores: 'p' },
  trajetorias: { 'cabeça': (q) => q.esq.cabeca.o, ombros: (q) => q.esq.lado.R.ombro },
};
