// O núcleo comum dos supinos na polia com o banco no meio das duas torres (o banco plano e o banco inclinado), no motor
// novo. Cada exercício traz a sua ficha de movimento; o que eles têm em comum:
//  - o corpo no banco, como nos supinos com halteres aprovados: deitado no banco plano (o corpo, o banco posto pela
//    cabeça e os pés de ./supino-reto.ts) ou sentado no banco regulável a 30° (o assento calibrado de
//    ./supino-inclinado.ts, exportado de lá sem mudar nada);
//  - o braço: embaixo, o braço no plano a `cotovelos.doTronco` graus do tronco e um pouco abaixo dele, com o antebraço
//    na vertical (como nos supinos aprovados); no topo, o braço na vertical sobre o ombro e o antebraço inclinado
//    `topo.dentro` graus para dentro: o cotovelo quase estendido e as mãos um pouco mais juntas que os ombros ("empurra
//    para cima e um pouco para dentro"). Entre os dois, cada direção gira pelo caminho mais curto;
//  - um estribo em cada mão e duas colunas, uma de cada lado, com as roldanas embaixo (no chão, ao lado do banco): cada
//    cabo vai reto do elo do estribo à roldana da coluna do seu lado, por fora do banco; cada pilha sobe o curso do seu
//    cabo dividido pela relação da máquina (o núcleo ./polia-bracos.ts);
//  - o banco no meio das duas torres. O erro "banco fora do meio" desloca o banco (e o corpo) para um lado: um cabo fica
//    mais comprido que o outro e uma pilha sobe mais que a outra.
// O ciclo começa embaixo (u = 0: as mãos ao lado do peito, o peito alongado) e termina no topo (u = 1).
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { bancoReto, chao } from '../pecas';
import type { Peca, Torre } from '../pecas';
import { bancoRegulavelNaCena } from '../pecas-de-cena/banco-regulavel';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dot, mul, norm, noRef } from '../vec';
import type { V3 } from '../vec';
import { colunasECabos, compDoCabo, estriboNaMao, menorNoCiclo, torreComRoldanaEm } from './polia-bracos';
import type { CaboDaColuna } from './polia-bracos';
import { BANCO_DO_SUPINO, sentar } from './supino-inclinado';

const rad = Math.PI / 180;
const SEM_BRACO: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
export type BancoDoSupino = 'reto' | 'inclinado';

/** Gira `a` até `b` pelo caminho mais curto (u de 0 a 1). */
function girar(a: V3, b: V3, u: number): V3 {
  const c = Math.max(-1, Math.min(1, dot(a, b)));
  const th = Math.acos(c);
  if (th < 1e-6) return b;
  const sa = Math.sin((1 - u) * th) / Math.sin(th),
    sb = Math.sin(u * th) / Math.sin(th);
  return norm(add(mul(a, sa), mul(b, sb)));
}
/** As direções do tronco: para os pés, para fora do lado `s` e para a frente do peito. */
function eixos(t: Tronco, s: number) {
  const pes = mul(t.torax.y, -1),
    peito = t.torax.z;
  const c = cross(t.torax.y, t.torax.z);
  const fora = mul(norm(c), dot(c, [s, 0, 0]) >= 0 ? 1 : -1);
  return { pes, peito, fora };
}
/** O braço embaixo: a `doTronco` graus do eixo do tronco (para os pés), medido no plano das costas, `abaixo` graus fora dele. */
function umeroEmbaixo(t: Tronco, s: number, doTronco: number, abaixo: number): V3 {
  const { pes, peito, fora } = eixos(t, s);
  const a = doTronco * rad,
    b = abaixo * rad;
  return norm(add(mul(add(mul(fora, Math.sin(a)), mul(pes, Math.cos(a))), Math.cos(b)), mul(peito, Math.sin(b))));
}

export interface SupinoNaPolia {
  ficha: Ficha;
  quadro(corpo: Corpo, u: number, erro?: string): Quadro;
}

export function criarSupinoNaPolia(fichaJson: unknown, banco: BancoDoSupino): SupinoNaPolia {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);

  /* ------------------------------ o corpo no banco ------------------------------ */
  interface NoBanco {
    t: Tronco;
    pernas: Record<Lado, PosePerna>;
    /** O banco: deitado, o meio do banco reto (x0, z0); sentado, o deslocamento do banco regulável para o lado. */
    x0: number;
    z0: number;
  }
  /**
   * Deitado no banco reto, como no supino reto aprovado: a nádega no banco, o banco posto pela cabeça, os pés no chão.
   * As costas e a cabeça apoiadas: a pelve gira para trás até o ponto mais fundo das costas amassar o estofado
   * `apoio.amassa` cm, e o pescoço dobra até a nuca apoiar do mesmo jeito (uma vez por corpo).
   */
  function deitado(corpo: Corpo, dx: number): NoBanco {
    const m = (id: string) => corpo.m(id);
    const zPelve = f('reto.pelve.z');
    const pelve: V3 = [dx, obj('bancoReto', 'altura') + m('prof.nadega') * f('reto.pelve.altura'), zPelve];
    const w = f('pes.meiaDistancia');
    const perna = (k: Lado): PosePerna => ({ pe: { bola: [dx + sinal(k) * w, 0, zPelve + m('coxa.comp') + f('reto.pes.alemDoJoelho')], dir: [sinal(k) * 0.2, 0, 1] }, polo: [sinal(k) * 0.35, 1, 0.4] });
    const pernas = { R: perna('R'), L: perna('L') };
    const tronco = (frente: number, cervical: number) => resolverTronco(corpo, { pelve, frente, lombar: f('reto.lombar'), cervical, cabeca: f('reto.cabeca') });
    // o ponto mais fundo de uma parte no estofado (cm; positivo = amassa)
    const fundo = (t: Tronco, parte: string) => {
      let mx = -Infinity;
      for (const x of pontosDoBoneco(resolverMembros(t, { R: SEM_BRACO, L: SEM_BRACO }, pernas))) if (x.parte === parte && Math.abs(x.p[0] - dx) <= obj('bancoReto', 'larg') / 2) mx = Math.max(mx, obj('bancoReto', 'altura') - x.p[1]);
      return mx;
    };
    const { frente, cervical } = calibragem(corpo, `${F.id}:deitado`, () => {
      const frente = resolver1((fr) => fundo(tronco(fr, f('reto.cervical')), 'tronco') - f('apoio.amassa'), -80, -100, 24);
      const cervical = resolver1((c) => fundo(tronco(frente, c), 'cabeca') - f('apoio.amassa'), 40, -20, 24);
      return { frente, cervical };
    });
    const t = tronco(frente, cervical);
    const zTopoDaCabeca = noRef(t.cabeca, [0, m('cabeca.tragionAoTopo'), 0])[2];
    return { t, pernas, x0: dx, z0: zTopoDaCabeca - f('reto.cabeca.folgaNoBanco') + obj('bancoReto', 'comp') / 2 };
  }
  /**
   * Sentado no banco regulável a 30°, como no supino inclinado aprovado (o assento calibrado de lá). `costas`, de 0 a 1:
   * o erro "tirar as costas do encosto" (a pelve fica no assento; a lombar e a torácica arqueiam e o tronco sai do encosto).
   */
  function sentadoNoBanco(corpo: Corpo, dx: number, costas: number): NoBanco {
    const s0 = sentar(corpo);
    const p = s0.t.pose;
    const t = resolverTronco(corpo, {
      ...p,
      pelve: add(p.pelve, [dx, 0, 0]),
      frente: (p.frente ?? 0) + f('erro.costas.frente') * costas,
      lombar: (p.lombar ?? 0) + f('erro.costas.lombar') * costas,
      toracica: (p.toracica ?? 0) + f('erro.costas.toracica') * costas,
      cervical: (p.cervical ?? 0) + f('erro.costas.cervical') * costas,
    });
    const pernas = Object.fromEntries((['R', 'L'] as Lado[]).map((k) => {
      const pe = s0.pernas[k].pe!;
      return [k, { ...s0.pernas[k], pe: { ...pe, bola: add(pe.bola, [dx, 0, 0]) } }];
    })) as Record<Lado, PosePerna>;
    return { t, pernas, x0: dx, z0: BANCO_DO_SUPINO.z0 };
  }

  /* ------------------------------ o braço ------------------------------ */
  function braco(t: Tronco, k: Lado, u: number, doTronco: number): PoseBraco {
    const s = sinal(k);
    const baixo = umeroEmbaixo(t, s, doTronco, f('braco.baixo'));
    const topo = norm([s * Math.sin(f('topo.abre') * rad), Math.cos(f('topo.abre') * rad), 0]);
    const umero = girar(baixo, topo, u);
    const d = f('topo.dentro') * rad;
    const antebraco = girar([0, 1, 0], norm([-s * Math.sin(d), Math.cos(d), 0]), u);
    const { pes, peito, fora } = eixos(t, s);
    const a = doTronco * rad;
    // o cotovelo aponta para fora e para os pés, um pouco para baixo do plano do peito
    const polo = norm(add(add(mul(fora, Math.sin(a)), mul(pes, Math.cos(a))), mul(peito, -0.2)));
    const giro = f('pegada.giro') * rad;
    const polegar = norm([-s * Math.cos(giro), 0, -Math.sin(giro)]);
    return { umero, antebraco, polo, mao: { polegar, forma: 'pegada', diam: obj('estribo', 'pegadaDiam') }, prot: -f('escapula.retracao'), elev: -f('escapula.depressao') };
  }

  function montar(corpo: Corpo, u: number, erro?: string): { e: Esq; b: NoBanco } {
    const x = Math.max(0, Math.min(1, u));
    const dx = erro === 'banco' ? f('erro.banco.desvio') : 0;
    // as costas saem do encosto enquanto a carga sobe (e voltam na descida)
    const b = banco === 'reto' ? deitado(corpo, dx) : sentadoNoBanco(corpo, dx, erro === 'costas' ? suave(x) : 0);
    const doTronco = erro === 'cot' ? f('erro.cot.doTronco') : f('cotovelos.doTronco');
    const e = resolverMembros(b.t, { R: braco(b.t, 'R', x, doTronco), L: braco(b.t, 'L', x, doTronco) }, b.pernas);
    return { e, b };
  }

  /* ------------------------------ as colunas ------------------------------ */
  interface Calibrado {
    cabos: CaboDaColuna[];
    repouso: number[];
  }
  const CAL = new WeakMap<Corpo, Calibrado>();
  function calibrar(corpo: Corpo): Calibrado {
    let c = CAL.get(corpo);
    if (c) return c;
    // as roldanas embaixo, uma de cada lado do banco (no meio), na linha do meio do caminho das mãos
    const e0 = montar(corpo, 0).e,
      e1 = montar(corpo, 1).e;
    const z = (e0.lado.R.pegada[2] + e1.lado.R.pegada[2]) / 2;
    const torreDo = (k: Lado): Torre => torreComRoldanaEm([sinal(k) * f('polia.meiaDistancia'), f('polia.altura'), z], [-sinal(k), 0, 0]);
    const cabos: CaboDaColuna[] = [
      { id: 'cabo', torre: torreDo('R') },
      { id: 'cabo2', torre: torreDo('L') },
    ];
    // o repouso de cada pilha: o cabo mais curto do ciclo (embaixo)
    const repouso = (['R', 'L'] as Lado[]).map((k, i) => menorNoCiclo((u) => compDoCabo(cabos[i]!.torre, estriboNaMao(montar(corpo, u).e, k, cabos[i]!.torre).elo)));
    c = { cabos, repouso };
    CAL.set(corpo, c);
    return c;
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const c = calibrar(corpo);
    const { e, b } = montar(corpo, u, erro);
    const es = (['R', 'L'] as Lado[]).map((k, i) => estriboNaMao(e, k, c.cabos[i]!.torre));
    const col = colunasECabos(c.cabos, es.map((x) => x.elo), c.repouso, f('pilha.folga'), true);
    const prims: Quadro['prims'] = [chao(-130, 130, -110, 130)];
    const pecas: Peca[] = [...col.pecas!.filter((p) => p.t === 'torre')];
    const marcas: Record<string, V3> = { ...col.marcas, 'mao.R': e.lado.R.pegada, 'mao.L': e.lado.L.pegada };
    if (banco === 'reto') {
      prims.push(...bancoReto(b.x0, b.z0));
      pecas.push({ t: 'bancoReto', x0: b.x0, z0: b.z0 });
      marcas.banco = [b.x0, obj('bancoReto', 'altura'), b.z0];
    } else {
      const B = bancoRegulavelNaCena({ ...BANCO_DO_SUPINO, x0: b.x0 });
      prims.push(...B.prims);
      pecas.push(B.peca);
      marcas.banco = [b.x0, obj('bancoRegulavel', 'altura'), b.z0];
    }
    prims.push(...es.flatMap((x) => x.prims), ...col.prims);
    pecas.push(...es.map((x) => x.peca), ...col.pecas!.filter((p) => p.t !== 'torre'));
    return { esq: e, prims, pecas, fios: col.fios, cargas: [], marcas, vies: { maoR: 1, maoL: 1 } };
  }
  return { ficha: F, quadro };
}
