// Remada com halteres, peito apoiado no banco inclinado, no motor novo. Os números vêm da ficha
// (../dados/movimentos/remada-apoiada.json); os braços que puxam, os halteres e os erros são os do núcleo das remadas
// (./remada.ts). O banco regulável (../pecas-de-cena/banco-regulavel.ts) fica girado meia volta (o encosto sobe para
// +z, para onde a pessoa olha), com o encosto a 45°. A pessoa deita de bruços no encosto, com o peito e a barriga
// apoiados e o queixo além da ponta; o corpo segue a linha do encosto e os pés apoiam no chão atrás do banco, na ponta
// dos pés, com os joelhos levemente dobrados: as pernas passam por cima do assento, e não dos lados dele. O que se
// resolve, em vez de receber pronto:
//  - o tronco inclinado como o encosto (o peito a 45° da vertical), com a coluna neutra;
//  - ao longo do encosto, o alto do esterno a `peito.abaixoDaPonta` cm da ponta; para dentro dele, o ponto do peito ou
//    da barriga mais fundo afunda `apoio.amassa` cm;
//  - os pés: no chão, atrás, à distância que deixa o joelho dobrado `joelho` graus.
import ficha from '../dados/movimentos/remada-apoiada.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Prim } from '../desenho';
import { bancoRegulavelNaCena, geometriaDoBanco } from '../pecas-de-cena/banco-regulavel';
import type { BancoRegulavel } from '../pecas-de-cena/banco-regulavel';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dot, mul, noRef, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { criarRemada } from './remada';
import type { BaseDaRemada } from './remada';

const f = daFicha(fichaSchema.parse(ficha));

/** O banco: girado (o encosto sobe para +z), com o meio do estofado em z = 0. */
export const BANCO_DA_REMADA: BancoRegulavel = { x0: 0, z0: 0, encosto: f('encosto'), sobe: 1 };
const G = geometriaDoBanco(BANCO_DA_REMADA);
const meiaLarg = obj('bancoRegulavel', 'larg') / 2;
/** A face de cima do encosto: um ponto na dobradiça e a ponta de cima (no meio da largura). */
const faceNaBase = add(G.baseEncosto, mul(G.n, G.est));
export const PONTA_DO_ENCOSTO = add(faceNaBase, mul(G.d, G.compEncosto));
/** Quanto um ponto entra no estofado do encosto (cm; positivo = dentro), ou −∞ se ele não fica sobre o encosto. */
export function noEncostoDaRemada(p: V3): number {
  const r = sub(p, G.baseEncosto);
  const ao = dot(r, G.d);
  if (ao < 0 || ao > G.compEncosto || Math.abs(p[0]) > meiaLarg) return -Infinity;
  return G.est - dot(r, G.n);
}
const SOLTO = (_k: Lado): PoseBraco => ({ umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
const FRENTE = new Set(['tronco', 'cintura']);

function base(corpo: Corpo): BaseDaRemada {
  const m = (id: string) => corpo.m(id);
  const pose = (pelve: V3): PoseTronco => ({ pelve, frente: 90 - f('encosto') + f('tronco.maisDeitado'), lombar: 0, toracica: 0, cervical: f('cervical'), cabeca: f('cabeca') });
  let largura = f('pes.meiaDistancia');
  const perna = (zPe: number) => (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * largura, 0, zPe], dir: [0, 0, 1], calc: f('pes.calcanhar') }, polo: [sinal(k) * 0.15, -0.3, 1] });
  const pernas = (zPe: number) => ({ R: perna(zPe)('R'), L: perna(zPe)('L') });
  /** O alto do esterno, ao longo do encosto (cm a partir da dobradiça). */
  const esterno = (pelve: V3) => {
    const t = resolverTronco(corpo, pose(pelve));
    return dot(sub(noRef(t.torax, [0, m('altura.supraesternal') - m('altura.cervical'), m('prof.peito') * 0.5]), G.baseEncosto), G.d);
  };
  const fundo = (e: Esq) => {
    let x = -Infinity;
    for (const { p, parte } of pontosDoBoneco(e)) if (FRENTE.has(parte)) x = Math.max(x, noEncostoDaRemada(p));
    return x;
  };
  /**
   * O corpo com o alto do esterno `abaixo` cm antes da ponta do encosto: ele anda ao longo do encosto (d) e para dentro
   * dele (n); os pés vão para trás até o joelho dobrar só `joelho` graus. `alcanca`: o pé chega ao chão com o joelho
   * dobrado ao menos isso.
   */
  const montar = (abaixo: number) => {
    let pelve: V3 = add(add(faceNaBase, mul(G.d, G.compEncosto - 55)), mul(G.n, 15));
    let zPe = pelve[2] - 30,
      alcanca = true;
    for (let i = 0; i < 4; i++) {
      const s = resolver1((x) => esterno(add(pelve, mul(G.d, x))) - (G.compEncosto - abaixo), -40, 40, 26);
      pelve = add(pelve, mul(G.d, s));
      const h = resolver1((x) => fundo(resolverMembros(resolverTronco(corpo, pose(add(pelve, mul(G.n, x)))), { R: SOLTO('R'), L: SOLTO('L') }, pernas(zPe))) - f('apoio.amassa'), 25, -25, 26);
      pelve = add(pelve, mul(G.n, h));
      const t = resolverTronco(corpo, pose(pelve));
      // de centímetro em centímetro, para trás a partir de embaixo do quadril, até o joelho dobrar só `joelho` graus
      // (com o pé ao alcance); depois, o ponto exato entre os dois últimos
      const dobra = (z: number) => {
        const L = resolverMembros(t, { R: SOLTO('R'), L: SOLTO('L') }, pernas(z)).lado.R;
        return L.falta.perna > 0.05 ? -1e3 : L.ang.joelho - f('joelho');
      };
      let z0 = pelve[2] + 20;
      alcanca = dobra(z0) > 0;
      while (z0 > pelve[2] - 100 && dobra(z0 - 1) > 0) z0 -= 1;
      zPe = resolver1(dobra, z0, z0 - 1, 20);
    }
    return { pelve, zPe, alcanca };
  };
  // o peito o mais alto que a ficha pede; num corpo de pernas curtas, em que o pé não chegaria ao chão, o peito desce
  // no encosto de centímetro em centímetro até o pé alcançar (o queixo continua além da ponta: a conferência mede)
  let abaixo = f('peito.abaixoDaPonta'),
    r = montar(abaixo);
  while (!r.alcanca && abaixo < f('peito.abaixoDaPonta') + 25) r = montar((abaixo += 1));
  // os pés se afastam de centímetro em centímetro até as coxas e as canelas passarem dos lados do banco, sem encostar
  const B0 = bancoRegulavelNaCena(BANCO_DA_REMADA);
  const caixas = B0.prims.filter((c): c is Extract<Prim, { t: 'caixa' }> => c.t === 'caixa');
  const nasPecas = () => {
    const e = resolverMembros(resolverTronco(corpo, pose(r.pelve)), { R: SOLTO('R'), L: SOLTO('L') }, pernas(r.zPe));
    let pior = -1e9;
    for (const { p, parte } of pontosDoBoneco(e))
      if (parte === 'coxa' || parte === 'canela' || parte === 'pe')
        for (const c of caixas) {
          const l = paraRef(c.ref, p);
          pior = Math.max(pior, Math.min(c.meias[0] - Math.abs(l[0]), c.meias[1] - Math.abs(l[1]), c.meias[2] - Math.abs(l[2])));
        }
    return pior;
  };
  while (nasPecas() > -0.5 && largura < f('pes.meiaDistancia') + 12) {
    largura += 1;
    r = montar(abaixo);
    // com os pés mais abertos, a perna alcança menos: o peito desce mais, se for preciso
    while (!r.alcanca && abaixo < f('peito.abaixoDaPonta') + 25) r = montar((abaixo += 1));
  }
  const { pelve, zPe } = r;
  const B = bancoRegulavelNaCena(BANCO_DA_REMADA);
  return {
    tronco: pose(pelve),
    pernas: pernas(zPe),
    prims: [chao(-90, 90, -170, 120), ...B.prims],
    pecas: [B.peca],
    marcas: { pontaDoEncosto: PONTA_DO_ENCOSTO },
  };
}

/** A folga das cabeças do halter até as caixas do banco (cm; negativo = dentro), medida como a conferência mede. */
function folgaNoBanco(q: Quadro): number {
  let m = 1e9;
  for (const c of q.prims) {
    if (c.t !== 'prisma') continue;
    for (const cx of q.prims) {
      if (cx.t !== 'caixa' || cx.cls === 'tapete') continue;
      for (const p of [c.a, c.b]) {
        const l = paraRef(cx.ref, p);
        m = Math.min(m, -Math.min(cx.meias[0] - Math.abs(l[0]), cx.meias[1] - Math.abs(l[1]), cx.meias[2] - Math.abs(l[2])) - c.ra);
      }
    }
  }
  return m;
}

const R = criarRemada(ficha, { bracos: 'dois', carga: 'halter', base, erros: { peito: 'subir', encolher: 'encolher', curta: 'curta' }, folgaExtra: folgaNoBanco });

export const remadaApoiada: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro: R.quadro,
  // costas (dorsal e meio das costas) em vermelho; bíceps e ombro de trás em laranja, como a curvada (correção de 10/11)
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

/**
 * O corpo deitado de bruços no encosto, parado (sem os braços), e a cena: os mesmos da remada, para o crucifixo inverso
 * com halteres (./crucifixo-inverso.ts), que usa a mesma cena. Acréscimo de 17/11/2026; nada muda na remada.
 */
export { base as baseNoEncostoDaRemada };
