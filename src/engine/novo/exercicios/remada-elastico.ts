// Remada sentada com elástico, no motor novo. Os números vêm da ficha (../dados/movimentos/remada-elastico.json).
// Sentado no colchonete, pernas estendidas com os joelhos um pouco dobrados, os pés quase em pé; o meio do tubo passa
// pela sola dos dois pés e cada mão segura um pegador, com as palmas uma para a outra. No alongado, os braços ficam
// estendidos para os pés, o tronco ~12° à frente e as escápulas abertas; na puxada, o tronco volta à vertical, as
// escápulas se juntam e os cotovelos vão para trás, rentes ao corpo, até as mãos ficarem ao lado do abdômen.
// O tubo de 48 pol, das mãos estendidas aos pés, ficaria frouxo: ele dá duas voltas em cada mão, por cima do pegador
// ("segure curto", como no stiff com elástico). As duas pontas vão das mãos à sola em linha reta
// (./elastico-faixa.ts contorna o corpo, se precisar).
import ficha from '../dados/movimentos/remada-elastico.json';
import { pontosDoBoneco } from '../boneco';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, colchonete } from '../pecas';
import type { Peca } from '../pecas';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dirRef, mix, mul, noRef, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { comprimento, fioPorFora } from './elastico-faixa';

const rad = Math.PI / 180;
const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const ESP = obj('colchonete', 'esp');
const CAL = new WeakMap<Corpo, { pelveY: number; frente: (peito: number, lombar: number, toracica: number) => number; tornozeloY: number; zTornozelo: number }>();

interface Pedido {
  /** Inclinação do peito à frente da vertical (graus). */
  peito: number;
  lombar: number;
  toracica: number;
  /** De 0 (braços estendidos) a 1 (mãos ao lado do abdômen). */
  bracos: number;
  elev: number;
  prot: number;
}

/** As pernas: o tornozelo à frente, na altura em que o calcanhar encosta no colchonete, com o joelho dobrado o pedido. */
function pernas(tornozeloY: number, zTornozelo: number): Record<Lado, PosePerna> {
  const a = f('pe.paraFrente') * rad;
  const perna = (k: Lado): PosePerna => ({ tornozelo: [sinal(k) * f('pes.meiaDistancia'), tornozeloY, zTornozelo], peDir: [sinal(k) * 0.08, Math.cos(a), Math.sin(a)], polo: [sinal(k) * 0.15, 1, 0] });
  return { R: perna('R'), L: perna('L') };
}
const BRACOS_SOLTOS = { R: { polo: [0, 0, -1] as V3, mao: { polegar: [0, 0, 1] as V3 } }, L: { polo: [0, 0, -1] as V3, mao: { polegar: [0, 0, 1] as V3 } } };

function calibrar(corpo: Corpo) {
  let c = CAL.get(corpo);
  if (c) return c;
  const m = (id: string) => corpo.m(id);
  // a inclinação da pelve que dá o peito pedido (a lombar e a torácica do pedido entram)
  const frente = (peito: number, lombar: number, toracica: number) =>
    resolver1((x) => {
      const t = resolverTronco(corpo, { pelve: [0, 50, 0], frente: x, lombar, toracica, cervical: f('cervical') });
      return Math.atan2(t.torax.y[2], t.torax.y[1]) / rad - peito;
    }, -120, 40, 40);
  const fr0 = frente(f('tronco.inicio'), 0, 0);
  // a altura da pelve: a nádega (o ponto mais baixo da pelve e das coxas, perto da pelve) afunda no colchonete
  const zJoelho = () => {
    // o tornozelo à frente do quadril, com o joelho dobrado `joelho` graus: lei dos cossenos no plano da perna
    const cx = m('coxa.comp'),
      cn = m('perna.comp');
    return Math.sqrt(cx * cx + cn * cn + 2 * cx * cn * Math.cos(f('joelho') * rad));
  };
  let tornozeloY = 8,
    zTornozelo = 90;
  const montar = (y: number) => {
    const t = resolverTronco(corpo, { pelve: [0, y, 0], frente: fr0, cervical: f('cervical') });
    const d = zJoelho();
    const q = noRef(t.pelve, [0, 0, 0]);
    zTornozelo = q[2] + Math.sqrt(Math.max(0, d * d - (q[1] - tornozeloY) ** 2));
    return resolverMembros(t, BRACOS_SOLTOS, pernas(tornozeloY, zTornozelo));
  };
  let pelveY = 12;
  for (let i = 0; i < 3; i++) {
    pelveY = resolver1((y) => {
      const e = montar(y);
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'pelve' || parte === 'coxa') && p[2] < 15) min = Math.min(min, p[1]);
      return min - (ESP - f('nadega.afunda'));
    }, 0, 40, 30);
    // o tornozelo sobe até o ponto mais baixo do pé encostar no colchonete
    const e = montar(pelveY);
    let minPe = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pe') minPe = Math.min(minPe, p[1]);
    tornozeloY += ESP - minPe;
  }
  montar(pelveY);
  c = { pelveY, frente, tornozeloY, zTornozelo };
  CAL.set(corpo, c);
  return c;
}

/** Os braços: do alongado (estendidos para os pés) às mãos ao lado do abdômen, com a escápula do pedido. */
function bracos(corpo: Corpo, t: Tronco, pe: Record<Lado, PosePerna>, p: Pedido): Record<Lado, PoseBraco> {
  const m = (id: string) => corpo.m(id);
  const T = t.torax;
  const k0 = f('maos.polegarParaDentro');
  const polegar = (k: Lado) => dirRef(T, [-sinal(k) * k0, 1, 0.15]);
  const mao = { forma: 'pegada' as const, diam: obj('elastico', 'pegadorDiam') };
  // uma passada para achar o ombro (ele anda com a escápula e com o braço)
  const ombroDe = (k: Lado, alvo: V3) => resolverMembros(t, { R: { pegada: alvo, polo: dirRef(T, [-0.3, -1, -0.3]), mao: { ...mao, polegar: polegar('R') }, elev: p.elev, prot: p.prot }, L: { pegada: alvo, polo: dirRef(T, [0.3, -1, -0.3]), mao: { ...mao, polegar: polegar('L') }, elev: p.elev, prot: p.prot } }, pe).lado[k].ombro;
  const alcance = Math.sqrt(m('braco.comp') ** 2 + (m('antebraco.comp') + m('mao.punhoAoCentroDaPegada')) ** 2 + 2 * m('braco.comp') * (m('antebraco.comp') + m('mao.punhoAoCentroDaPegada')) * Math.cos(f('cotovelo.inicio') * rad));
  const lado = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // o fim: ao lado do abdômen, no referencial da pelve
    const fim = noRef(t.pelve, [s * (m('largura.cintura') / 2 + f('maos.fim.fora')), m('altura.cintura') - m('altura.trocanter') + f('maos.fim.acima'), f('maos.fim.frente')]);
    // o começo: no alcance do braço, a partir do ombro, `braco.inicio.abaixo` graus abaixo da horizontal, para a frente
    let ini: V3 = add(fim, [0, 0, 40]);
    for (let i = 0; i < 3; i++) {
      const o = ombroDe(k, ini);
      const a = f('braco.inicio.abaixo') * rad;
      ini = add(o, mul([s * 0.05, -Math.sin(a), Math.cos(a)], alcance));
    }
    const pegada: V3 = [mix(ini[0], fim[0], p.bracos), mix(ini[1], fim[1], p.bracos), mix(ini[2], fim[2], p.bracos)];
    return { pegada, polo: dirRef(T, [s * 0.35, -0.6, -1]), mao: { ...mao, polegar: polegar(k) }, elev: p.elev, prot: p.prot };
  };
  return { R: lado('R'), L: lado('L') };
}

function pose(corpo: Corpo, p: Pedido): Esq {
  const c = calibrar(corpo);
  const t = resolverTronco(corpo, { pelve: [0, c.pelveY, 0], frente: c.frente(p.peito, p.lombar, p.toracica), lombar: p.lombar, toracica: p.toracica, cervical: f('cervical') });
  const pe = pernas(c.tornozeloY, c.zTornozelo);
  return resolverMembros(t, bracos(corpo, t, pe, p), pe);
}

/** As bordas da sola de um pé, no meio dela (do calcanhar à bola), um raio de tubo para fora da sola. */
function bordasDaSola(corpo: Corpo, e: Esq, k: Lado): { fora: V3; dentro: V3 } {
  const L = e.lado[k];
  const r = obj('elastico', 'tuboDiam') / 2;
  const meio = mul(add(L.bola, L.calcanhar), 0.5);
  const sola = mul(norm(L.pe.y), -r);
  const ao = norm(sub(L.bola, L.calcanhar));
  let lado = norm(cross(ao, L.pe.y));
  if (lado[0] * sinal(k) < 0) lado = mul(lado, -1);
  const larg = corpo.m('pe.largura') / 2 + r;
  return { fora: add(add(meio, sola), mul(lado, larg)), dentro: add(add(meio, sola), mul(lado, -larg)) };
}

/** A volta do tubo numa mão: `n` giros em torno do pegador (o eixo da mão), começando e terminando embaixo. */
function voltaNaMao(e: Esq, k: Lado, para: V3): V3[] {
  const L = e.lado[k];
  const r = f('elastico.voltaNaMao');
  const eixo = norm(L.mao.x);
  // "embaixo" = para o lado do pé, perpendicular ao pegador
  const b = norm(sub(sub(para, L.pegada), mul(eixo, (para[0] - L.pegada[0]) * eixo[0] + (para[1] - L.pegada[1]) * eixo[1] + (para[2] - L.pegada[2]) * eixo[2])));
  const c2 = cross(eixo, b);
  const n = 16 * f('elastico.voltas');
  const out: V3[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (2 * Math.PI * i) / 16;
    out.push(add(add(L.pegada, mul(eixo, sinal(k) * mix(-1.6, 1.6, i / n))), add(mul(b, r * Math.cos(a)), mul(c2, r * Math.sin(a)))));
  }
  return out;
}

export function tuboDaRemada(corpo: Corpo, e: Esq) {
  const lado = (k: Lado) => {
    const sola = bordasDaSola(corpo, e, k);
    const volta = voltaNaMao(e, k, sola.fora);
    const de = volta[volta.length - 1]!;
    const via = fioPorFora(e, de, sola.fora, { lado: [sinal(k), 0.3, 0], partes: ['coxa', 'canela', 'pe'], folga: obj('elastico', 'tuboDiam') / 2 + 0.3, fatia: 2.5, livreNasPontas: 4 });
    return { pts: [...volta, ...via.slice(1), sola.dentro], ponta: volta[0]!, sola };
  };
  const R = lado('R'),
    L = lado('L');
  const pts = [...R.pts, ...L.pts.slice().reverse()];
  return { pts, comp: comprimento(pts), R, L };
}

function pedido(u: number, erro?: string): Pedido {
  const ini = erro === 'balanco' ? f('erro.balanco.inicio') : f('tronco.inicio');
  const fim = erro === 'balanco' ? f('erro.balanco.tronco') : f('tronco.fim');
  const arred = erro === 'arred' ? 1 - u : 0;
  return {
    peito: mix(ini, fim, u),
    lombar: arred * f('erro.arred.lombar'),
    toracica: arred * f('erro.arred.toracica'),
    // perto do braço estendido, o cotovelo dobra rápido para pouco que a mão ande: a mão sai devagar (suave), e o
    // cotovelo começa a dobrar sem tranco
    bracos: suave(u),
    elev: erro === 'encolher' ? f('erro.encolher.elev') * u : f('escapula.elev.fim') * u,
    prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u),
  };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = pose(corpo, pedido(u, erro));
  const t = tuboDaRemada(corpo, e);
  const estica = t.comp / obj('elastico', 'comp');
  const zCol = f('colchonete.z');
  const pecas: Peca[] = [{ t: 'colchonete', x0: 0, z0: zCol }, { t: 'elastico', pts: t.pts, estica }];
  for (const k of LADOS) pecas.push(pegadorNaMao(e.lado[k].pegada, e.lado[k].mao.x, (k === 'R' ? t.R : t.L).ponta, `pegador${k}`));
  return {
    esq: e,
    prims: [chao(-70, 70, zCol - 60, zCol + 70), ...colchonete(0, zCol), { t: 'fio', pts: t.pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas,
    fios: [{ id: 'elastico', comp: t.comp, estica: true }],
    cargas: [],
    marcas: { solaRfora: t.R.sola.fora, solaRdentro: t.R.sola.dentro, solaLfora: t.L.sola.fora, solaLdentro: t.L.sola.dentro, pegadorR: e.lado.R.pegada, pegadorL: e.lado.L.pegada },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const remadaElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'posterior'],
  quadro,
  // costas (dorsal e meio das costas) em vermelho; ombro de trás e bíceps em laranja, como a remada na suspensão
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { cotovelo: (q) => q.esq.lado.R.cotovelo },
};
