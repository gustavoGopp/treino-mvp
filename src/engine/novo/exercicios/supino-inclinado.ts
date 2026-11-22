// Supino inclinado com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/supino-inclinado.json).
// Sentado no banco regulável com o encosto a 30° (../pecas-de-cena/banco-regulavel.ts), glúteo, costas e cabeça
// apoiados, pés no chão; os halteres descem com o antebraço na vertical até o lado do peito e sobem até ficar sobre os
// ombros. O que se resolve, em vez de receber pronto (como na rosca inclinada, ./rosca-inclinada.ts):
//  - o quadril: desce até a nádega e a coxa apoiarem no assento e vai para trás até o sacro apoiar no encosto; o tronco
//    inclina para trás em volta do quadril até as costas apoiarem no encosto (o estofado amassa `apoio.amassa` cm);
//  - o pescoço dobra para trás até a nuca apoiar no encosto, dentro de uma faixa confortável;
//  - o braço: embaixo, ele fica no plano a `cotovelos.doTronco` graus do tronco (medido no plano das costas) e um pouco
//    abaixo dele; no topo, quase na vertical sobre o ombro. Entre os dois, a direção gira pelo caminho mais curto. O
//    antebraço fica sempre na vertical (no mundo).
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/supino-inclinado.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import { bancoRegulavelNaCena, geometriaDoBanco } from '../pecas-de-cena/banco-regulavel';
import type { BancoRegulavel } from '../pecas-de-cena/banco-regulavel';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dist, dot, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** O halter de 25 lb (o da tabela): no quadro, o de 10 lb ficava pequeno demais para um supino. */
const HALTER = 'halter';

const COSTAS = new Set(['tronco', 'cintura']);
const SACRO = new Set(['pelve', 'emendaDaCintura']);
const ASSENTO = new Set(['pelve', 'coxa']);
const CABECA = new Set(['cabeca']);
const SEM_BRACO: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };

/** O banco: o meio do estofado em z0, de modo que a dobradiça fique em z = 0 (como na rosca inclinada). */
export const BANCO_DO_SUPINO: BancoRegulavel = {
  x0: 0,
  z0: -(obj('bancoRegulavel', 'estofadoComp') / 2 - obj('bancoRegulavel', 'assentoComp') - obj('bancoRegulavel', 'vao') / 2),
  encosto: f('encosto'),
  marcaDoAngulo: true,
};
const G = geometriaDoBanco(BANCO_DO_SUPINO);
const meiaLarg = obj('bancoRegulavel', 'larg') / 2;

/** Quanto um ponto entra no estofado do encosto (cm; positivo = dentro), ou −∞ se ele não fica sobre o encosto. */
function noEncosto(p: V3): number {
  const r = sub(p, G.baseEncosto);
  const ao = dot(r, G.d);
  if (ao < 0 || ao > G.compEncosto || Math.abs(p[0] - BANCO_DO_SUPINO.x0) > meiaLarg) return -Infinity;
  return G.est - dot(r, G.n);
}
/** Quanto um ponto entra no assento (cm), ou −∞ se ele não fica sobre o assento. */
function noAssento(p: V3): number {
  const z0 = G.baseAssento[2];
  if (p[2] < z0 || p[2] > z0 + G.compAssento || Math.abs(p[0] - BANCO_DO_SUPINO.x0) > meiaLarg) return -Infinity;
  return G.topoDoAssento - p[1];
}
/** `perto`: só os pontos a menos de tantos cm de um dos quadris (a nádega e o alto da coxa, e não o joelho). */
const maisFundo = (e: Esq, partes: Set<string>, no: (p: V3) => number, perto = Infinity) => {
  let m = -Infinity;
  for (const x of pontosDoBoneco(e)) if (partes.has(x.parte) && Math.min(dist(x.p, e.lado.R.quadril), dist(x.p, e.lado.L.quadril)) < perto) m = Math.max(m, no(x.p));
  return m;
};
/** O assento apoia a nádega e o alto da coxa (com as pernas curtas, a coxa desce para o joelho e passa da borda). */
const NADEGA = 18;

export interface Sentado {
  t: Tronco;
  pernas: Record<Lado, PosePerna>;
  pelve: V3;
  frente: number;
  cervical: number;
}
/** Os pés: no chão, à frente do assento (o ponto fica preso no chão; não acompanha o quadril no erro). */
function pernas(zPe: number): Record<Lado, PosePerna> {
  const pe = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * f('pes.meiaDistancia'), 0, zPe], dir: [sinal(k) * 0.2, 0, 1], calc: 0 }, polo: [sinal(k) * 0.3, 0.2, 1] });
  return { R: pe('R'), L: pe('L') };
}
const tronco = (corpo: Corpo, pelve: V3, frente: number, cervical: number, lombar = f('lombar')) =>
  resolverTronco(corpo, { pelve, frente, lombar, toracica: f('toracica'), cervical, cabeca: f('cabeca') });
const corpoTodo = (corpo: Corpo, pelve: V3, frente: number, cervical: number, zPe: number, lombar?: number) =>
  resolverMembros(tronco(corpo, pelve, frente, cervical, lombar), { R: SEM_BRACO, L: SEM_BRACO }, pernas(zPe));

/** Com a bacia inclinada `frente` graus: o quadril no canto do banco, com o sacro no encosto e a nádega no assento. */
function apoiar(corpo: Corpo, frente: number): V3 {
  const amassa = f('apoio.amassa');
  let pelve: V3 = [0, G.topoDoAssento + 10, 12];
  for (let i = 0; i < 5; i++) {
    const z = resolver1((zz) => maisFundo(corpoTodo(corpo, [0, pelve[1], zz], frente, 0, zz + f('pes.aFrente')), SACRO, noEncosto) - amassa, 40, -10, 22);
    pelve = [0, pelve[1], z];
    const y = resolver1((yy) => maisFundo(corpoTodo(corpo, [0, yy, z], frente, 0, z + f('pes.aFrente')), ASSENTO, noAssento, NADEGA) - amassa, 70, 40, 22);
    pelve = [0, y, z];
  }
  return pelve;
}
/**
 * O corpo sentado no banco a 30°, apoiado. Exportado para o crucifixo inclinado (./crucifixo-inclinado-halteres.ts),
 * que usa a mesma pessoa no mesmo banco: ele chama esta função (e não `sentado`, que guarda o resultado aqui), para a
 * calibração ser pedida também por este exercício e ficar no arquivo de preparo dele.
 */
export function sentar(corpo: Corpo): Sentado {
  const amassa = f('apoio.amassa');
  // a conta demorada (milhares de poses) vem guardada para o corpo do app: ../calibragens.ts
  const { pelve, frente, cervical } = calibragem(corpo, `${F.id}:sentado`, () => {
    const frente = resolver1((fr) => {
      const p = apoiar(corpo, fr);
      return maisFundo(corpoTodo(corpo, p, fr, 0, p[2] + f('pes.aFrente')), COSTAS, noEncosto) - amassa;
    }, -20, -85, 16);
    const pelve = apoiar(corpo, frente);
    const cervical = Math.max(f('cervical.min'), resolver1((c) => maisFundo(corpoTodo(corpo, pelve, frente, c, pelve[2] + f('pes.aFrente')), CABECA, noEncosto) - amassa, 20, -40, 24));
    return { pelve, frente, cervical };
  });
  const zPe = pelve[2] + f('pes.aFrente');
  return { t: tronco(corpo, pelve, frente, cervical), pernas: pernas(zPe), pelve, frente, cervical };
}
const CACHE = new WeakMap<Corpo, Sentado>();
function sentado(corpo: Corpo): Sentado {
  let c = CACHE.get(corpo);
  if (!c) CACHE.set(corpo, (c = sentar(corpo)));
  return c;
}

/**
 * Erro "quadril sai do banco": o quadril sobe `erro.quadril.sobe` cm e a lombar arqueia; o tronco gira em volta do
 * quadril até as costas voltarem a encostar no encosto (o alto das costas e a cabeça continuam apoiados).
 */
const ERRO_QUADRIL = new WeakMap<Corpo, Map<number, Tronco>>();
function troncoDoErroQuadril(corpo: Corpo, s0: Sentado, x: number): Tronco {
  let m = ERRO_QUADRIL.get(corpo);
  if (!m) ERRO_QUADRIL.set(corpo, (m = new Map()));
  const k = Math.round(x * 200);
  const ja = m.get(k);
  if (ja) return ja;
  const w = k / 200;
  const amassa = f('apoio.amassa');
  const zPe = s0.pelve[2] + f('pes.aFrente');
  const lombar = f('lombar') + f('erro.quadril.lombar') * w;
  // o quadril sobe e anda para os pés o quanto for preciso para o alto das costas (a base do pescoço) não escorregar
  // no encosto: o corpo gira em volta das costas apoiadas, e não em volta do quadril
  const encostar = (dz: number) => {
    const pelve: V3 = add(s0.pelve, [0, f('erro.quadril.sobe') * w, dz]);
    const frente = resolver1((fr) => maisFundo(corpoTodo(corpo, pelve, fr, s0.cervical, zPe, lombar), COSTAS, noEncosto) - amassa, s0.frente + 25, s0.frente - 25, 18);
    return tronco(corpo, pelve, frente, s0.cervical, lombar);
  };
  const dz = w === 0 ? 0 : resolver1((d) => dot(sub(encostar(d).torax.o, s0.t.torax.o), G.d), -10, 25, 16);
  const t = encostar(dz);
  m.set(k, t);
  return t;
}

/** O braço: o úmero a `doTronco` graus do eixo do tronco (para os pés), medido no plano das costas, `abaixo` graus fora dele. */
function umeroNoTronco(e: Tronco, s: number, doTronco: number, abaixo: number): V3 {
  const pes = mul(e.torax.y, -1),
    peito = e.torax.z;
  // o lado de fora do braço: perpendicular ao eixo do tronco e à frente do peito
  const fora = mul(norm(cross(e.torax.y, e.torax.z)), dot(cross(e.torax.y, e.torax.z), [s, 0, 0]) >= 0 ? 1 : -1);
  const a = doTronco * rad,
    b = abaixo * rad;
  return norm(add(mul(add(mul(fora, Math.sin(a)), mul(pes, Math.cos(a))), Math.cos(b)), mul(peito, Math.sin(b))));
}
/** Gira `a` até `b` pelo caminho mais curto (u de 0 a 1). */
function girar(a: V3, b: V3, u: number): V3 {
  const c = Math.max(-1, Math.min(1, dot(a, b)));
  const th = Math.acos(c);
  if (th < 1e-6) return b;
  const sa = Math.sin((1 - u) * th) / Math.sin(th),
    sb = Math.sin(u * th) / Math.sin(th);
  return norm(add(mul(a, sa), mul(b, sb)));
}

/**
 * No topo, quanto o braço abre para fora da vertical (graus): o mínimo da ficha, ou mais, até os dois halteres ficarem
 * `halteres.folgaNoTopo` cm um do outro (nos ombros mais estreitos, as cabeças de dentro se encostavam). Uma vez por corpo.
 */
const ABRE = new WeakMap<Corpo, number>();
function abreNoTopo(corpo: Corpo): number {
  const ja = ABRE.get(corpo);
  if (ja !== undefined) return ja;
  const folga = (abre: number) => {
    const e = montar(corpo, 0, undefined, abre);
    const L = e.lado.R;
    const meio = obj(HALTER, 'comp') / 2;
    const dentro = Math.min(Math.abs(add(L.pegada, mul(L.mao.x, meio))[0]), Math.abs(add(L.pegada, mul(L.mao.x, -meio))[0]));
    return 2 * dentro - obj(HALTER, 'cabecaLargura') - f('halteres.folgaNoTopo');
  };
  const min = f('braco.topo.abre');
  const a = folga(min) >= 0 ? min : resolver1(folga, min, 30, 24);
  ABRE.set(corpo, a);
  return a;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = montar(corpo, u, erro, abreNoTopo(corpo));
  return montarQuadro(e);
}
function montar(corpo: Corpo, u: number, erro: string | undefined, abre: number): Esq {
  const s0 = sentado(corpo);
  const x = Math.max(0, Math.min(1, u));
  const t = erro === 'quadril' ? troncoDoErroQuadril(corpo, s0, suave(x)) : s0.t;
  const giro = f('pegada.giro') * rad;
  const doTronco = erro === 'cot' ? mix(f('cotovelos.doTronco'), f('erro.cot.doTronco'), Math.min(1, x * 1.5)) : f('cotovelos.doTronco');
  const braco = (k: Lado, e?: Esq): PoseBraco => {
    const s = sinal(k);
    const topo = norm([s * Math.sin(abre * rad), Math.cos(abre * rad), 0]);
    const baixo = umeroNoTronco(t, s, doTronco, f('braco.baixo'));
    const umero = girar(topo, baixo, x);
    const polegar = norm([-s * Math.cos(giro), 0, -Math.sin(giro)]);
    const polo = norm(add(mul(umero, -0.3), [s, -0.3, 0.2]));
    const mao = { polegar, forma: 'pegada' as const, diam: obj(HALTER, 'caboDiam') };
    const esc = { prot: -f('escapula.retracao'), elev: -f('escapula.depressao') };
    if (erro === 'punho' && e) {
      // o punho dobra para trás: os dedos (e o halter) vão para trás da linha do antebraço, para o lado da cabeça
      const L = e.lado[k];
      const cot = add(L.ombro, mul(umero, corpo.m('braco.comp')));
      const punho = add(cot, [0, corpo.m('antebraco.comp'), 0]);
      const p = f('erro.punho') * rad * suave(x);
      const dorso: V3 = norm([0, 0, -1]);
      const dedos = norm(add(mul([0, 1, 0], Math.cos(p)), mul(dorso, Math.sin(p))));
      return { punho, polo, mao: { ...mao, dedos }, ...esc };
    }
    return { umero, antebraco: [0, 1, 0], polo, mao, ...esc };
  };
  let e = resolverMembros(t, { R: braco('R'), L: braco('L') }, s0.pernas);
  if (erro === 'punho') for (let i = 0; i < 3; i++) e = resolverMembros(t, { R: braco('R', e), L: braco('L', e) }, s0.pernas);
  return e;
}
function montarQuadro(e: Esq): Quadro {
  const B = bancoRegulavelNaCena(BANCO_DO_SUPINO);
  const prims = [chao(-80, 80, -110, 100), ...B.prims];
  const pecas: Peca[] = [B.peca];
  const cargas = [];
  for (const k of ['R', 'L'] as Lado[]) {
    const L = e.lado[k];
    prims.push(...halter(L.pegada, L.mao.x, 0.2, HALTER));
    pecas.push({ t: 'halter', centro: L.pegada, eixo: L.mao.x, objeto: HALTER });
    cargas.push({ massa: f('carga'), pos: L.pegada });
  }
  return { esq: e, prims, pecas, fios: [], cargas, marcas: { halter: e.lado.R.pegada, halterL: e.lado.L.pegada }, vies: { maoR: 1, maoL: 1 } };
}

export const supinoInclinado: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // o peito (principal; o desenho não separa a parte de cima, a clavicular); a frente do ombro e o tríceps
  // (secundários), como a ficha da técnica e a biblioteca
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

/** Para as regras (../regras/supino-inclinado.ts): a geometria do banco deste exercício. */
export const encostoDoSupino = { G, noEncosto, noAssento };
