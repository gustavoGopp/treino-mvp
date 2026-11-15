// O núcleo comum dos desenvolvimentos do motor novo (sentado com halteres e em pé com kettlebell): empurrar a carga
// de perto do ombro até acima da cabeça, com o antebraço na vertical o movimento todo. O que ele resolve em cada quadro:
//  - o braço: o úmero sai do ombro numa direção dada pela elevação (graus acima da horizontal) e por quanto o cotovelo
//    fica à frente do plano do corpo (visto de cima); o antebraço aponta para cima, na vertical; a mão fica onde isso
//    leva. Com o antebraço na vertical, o cotovelo dobra o que falta ao úmero para chegar à vertical. A clavícula e a
//    escápula acompanham pelo ritmo do esqueleto (../esqueleto.ts);
//  - o corpo sentado (halteres): o banco regulável com o encosto erguido; a bacia apoia no assento e as costas e a
//    cabeça, no encosto: a posição da bacia e a extensão do pescoço saem do contato, e não de números escolhidos;
//  - o corpo em pé (kettlebell): o núcleo dos stiffs (./dobrar-o-quadril.ts), com o quadril parado no ângulo do
//    equilíbrio do meio da subida (o tronco não se mexe) e a outra mão na cintura;
//  - o kettlebell em posição de rack: a mão segura a alça, e a bola apoia no dorso do antebraço, do lado de fora; o
//    ângulo da bola sai do encosto no antebraço (`resolver1`).
import { pontosDoBoneco } from '../boneco';
import { formaDoKettlebell } from '../equipamento';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import { bancoRegulavelNaCena, faceDoEncosto } from '../pecas-de-cena/banco-regulavel';
import type { BancoRegulavel } from '../pecas-de-cena/banco-regulavel';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dirRef, dist, dot, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { maosNaCintura } from './afundo-estatico';
import { dobrarOQuadril } from './dobrar-o-quadril';
import type { Carga } from './dobrar-o-quadril';

const rad = Math.PI / 180;
export type CargaDoDesenvolvimento = 'halteres-sentado' | 'kettlebell';

/** A direção do úmero (s = −1 direita, +1 esquerda): `el` graus acima da horizontal, o cotovelo `frente` graus à frente do plano do corpo. */
export function umeroNa(el: number, frente: number, s: number): V3 {
  const e = el * rad,
    f = frente * rad;
  return [s * Math.cos(e) * Math.cos(f), Math.sin(e), Math.cos(e) * Math.sin(f)];
}

export function criarDesenvolvimento(fichaJson: unknown, carga: CargaDoDesenvolvimento): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const sentado = carga === 'halteres-sentado';

  /* ------------------------------ o braço ------------------------------ */
  interface Braco {
    el: number;
    frente: number;
    punho: number;
    /** Kettlebell: o giro da mão, de 0 (palma para dentro, polegar para trás) a 90 (palma para a frente, polegar para dentro). */
    giro: number;
  }
  /** O braço que empurra: úmero na direção pedida, antebraço na vertical, mão alinhada (ou dobrada para trás `punho` graus). */
  function braco(corpo: Corpo, e: Esq, k: Lado, b: Braco): PoseBraco {
    const s = sinal(k);
    const umero = umeroNa(b.el, b.frente, s);
    const ombro = e.lado[k].ombro;
    const cot = add(ombro, mul(umero, corpo.m('braco.comp')));
    const punho = add(cot, [0, corpo.m('antebraco.comp'), 0]);
    // para onde o cotovelo aponta: para fora da linha do ombro ao punho (do lado em que o cotovelo está)
    const op = norm(sub(punho, ombro));
    const polo = norm(sub(sub(cot, ombro), mul(op, dot(sub(cot, ombro), op))));
    if (sentado) {
      // halteres: palmas para a frente, o cabo atravessado (o polegar para dentro)
      return { umero, antebraco: [0, 1, 0], polo, mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: obj('halter', 'caboDiam') } };
    }
    // kettlebell: a mão gira de palma para dentro (embaixo) a palma para a frente (no topo); o punho reto, ou dobrado
    // para trás (para o dorso da mão) no erro
    const g = b.giro * rad;
    const polegar = norm(dirRef(e.torax, [-s * Math.sin(g), 0, -Math.cos(g)]));
    const dorso = norm(cross([0, 1, 0], polegar));
    const p = b.punho * rad;
    const dedos = norm(add(mul([0, 1, 0], Math.cos(p)), mul(dorso, Math.sin(p))));
    return { punho, polo, mao: { polegar, dedos, forma: 'pegada', diam: obj('kettlebell', 'alcaDiam') } };
  }

  /* ------------------------------ o kettlebell ------------------------------ */
  const K = formaDoKettlebell();
  /** Da alça (onde a mão segura) ao centro da bola. */
  const alcaABola = () => K.altura - K.rAlca - K.centro;
  /** A bola, dada a mão: ela fica do lado do dorso da mão (e um pouco para fora), `beta` graus fora da linha do antebraço. */
  function bolaDoKettlebell(e: Esq, beta: number): { centro: V3; cima: V3 } {
    const L = e.lado.R;
    const desce = norm(sub(L.cotovelo, L.punho));
    const dorso = norm(cross(mul(L.mao.y, -1), mul(L.mao.x, sinal('R'))));
    const lado = norm(add(dorso, dirRef(e.torax, [-f('kettlebell.bolaParaFora'), 0, 0])));
    const fora = norm(sub(lado, mul(desce, dot(lado, desce))));
    const dir = norm(add(mul(desce, Math.cos(beta * rad)), mul(fora, Math.sin(beta * rad))));
    return { centro: add(L.pegada, mul(dir, alcaABola())), cima: mul(dir, -1) };
  }
  /** O quanto a bola fica longe da pele do antebraço e da mão (cm; negativo = entra). */
  function folgaNoAntebraco(e: Esq, beta: number): number {
    const b = bolaDoKettlebell(e, beta);
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'ante' || parte === 'mao') min = Math.min(min, dist(p, b.centro) - K.R);
    return min;
  }
  const BETA = new WeakMap<Corpo, number>();
  const ALFA = new WeakMap<Corpo, number>();

  /* ------------------------------ sentado no banco ------------------------------ */
  const banco = (): BancoRegulavel => ({ x0: 0, z0: -(obj('bancoRegulavel', 'estofadoComp') / 2 - obj('bancoRegulavel', 'assentoComp') - obj('bancoRegulavel', 'vao') / 2), encosto: f('encosto') });
  const PENDURADO: PoseBraco = { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  function pernasSentado(): Record<Lado, PosePerna> {
    const p = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * f('pes.meiaDistancia'), 0, f('pes.aFrente')], dir: [sinal(k) * 0.15, 0, 1] }, polo: [sinal(k) * 0.25, 0.2, 1] });
    return { R: p('R'), L: p('L') };
  }
  /**
   * A bacia no assento e as costas no encosto: a bacia sobe ou desce até o ponto mais baixo das nádegas ficar no
   * tampo (afundando `estofado.afunda` cm) e anda na direção da normal do encosto até o ponto das costas mais fundo
   * afundar o mesmo. Depois o pescoço estende até a nuca encostar.
   */
  const ASSENTO = new Map<string, { pelve: V3; cervical: number }>();
  function sentar(corpo: Corpo, pose: Omit<PoseTronco, 'pelve' | 'cervical'>): Tronco {
    const B = banco(),
      E = faceDoEncosto(B);
    const alto = obj('bancoRegulavel', 'altura'),
      afunda = f('estofado.afunda');
    const fundo = (e: Esq, partes: string[]) => {
      let m = -1e9;
      for (const { p, parte } of pontosDoBoneco(e)) if (partes.includes(parte)) m = Math.max(m, afunda - dot(sub(p, E.ponto), E.normal));
      return m;
    };
    const montarT = (pelve: V3, cervical: number) => {
      const t = resolverTronco(corpo, { ...pose, pelve, cervical });
      return { t, e: resolverMembros(t, { R: PENDURADO, L: PENDURADO }, pernasSentado()) };
    };
    const chave = `${corpo.id}|${JSON.stringify(pose)}`;
    const ja = ASSENTO.get(chave);
    if (ja) return montarT(ja.pelve, ja.cervical).t;
    let pelve: V3 = [0, alto + 10, 10];
    let cervical = 0;
    for (let i = 0; i < 8; i++) {
      const { e } = montarT(pelve, cervical);
      let baixo = 1e9;
      for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pelve' || (parte === 'coxa' && Math.min(dist(p, e.lado.R.quadril), dist(p, e.lado.L.quadril)) < 16)) baixo = Math.min(baixo, p[1]);
      pelve = [0, pelve[1] + alto - afunda - baixo, pelve[2]];
      const tras = fundo(montarT(pelve, cervical).e, ['tronco', 'cintura', 'emendaDaCintura', 'pelve']);
      pelve = add(pelve, mul(E.normal, tras - afunda));
      // a nuca no encosto: o pescoço estende (negativo) até encostar
      const pv = pelve;
      cervical = resolver1((c) => fundo(montarT(pv, c).e, ['cabeca']) - afunda, 25, -30, 24);
    }
    ASSENTO.set(chave, { pelve, cervical });
    return montarT(pelve, cervical).t;
  }

  /* ------------------------------ o pedido de cada instante ------------------------------ */
  interface Pedido {
    braco: Braco;
    lombar: number;
    toracica: number;
    frente: number;
    joelho: number;
    alfa?: number;
  }
  function pedido(u: number, erro?: string): Pedido {
    const de = erro === 'curta' ? f('erro.curta.elevacao') : f('braco.baixo.elevacao');
    const p: Pedido = {
      braco: { el: mix(de, f('braco.topo.elevacao'), u), frente: mix(f('braco.baixo.frente'), f('braco.topo.frente'), u), punho: 0, giro: sentado ? 0 : mix(f('mao.giro.baixo'), f('mao.giro.topo'), u) },
      lombar: 0,
      toracica: 0,
      frente: f('bacia'),
      joelho: sentado ? 0 : f('joelho'),
    };
    if (erro === 'cotovelo') p.braco.frente = mix(f('erro.cotovelo.frente'), f('braco.topo.frente'), u);
    if (erro === 'arco') {
      // a lombar arqueia e o peito vai para trás
      p.lombar = f('erro.arco.lombar') * u;
      p.toracica = f('erro.arco.toracica') * u;
      p.frente = f('bacia') + f('erro.arco.bacia') * u;
    }
    if (erro === 'jogar') {
      // os joelhos dobram e estendem para dar o impulso: embaixo eles estão dobrados
      p.joelho = mix(f('erro.jogar.joelho'), f('joelho'), u);
      p.frente = f('bacia') + mix(f('erro.jogar.bacia'), 0, u);
    }
    if (erro === 'punho') p.braco.punho = f('erro.punho') * (1 - u);
    return p;
  }

  /* ------------------------------ em pé ------------------------------ */
  function emPe(corpo: Corpo, o: Pedido): { e: Esq; cargas: Carga[]; alfa: number } {
    const r = dobrarOQuadril(corpo, {
      joelho: o.joelho,
      tronco: o.frente + o.lombar,
      lombar: o.lombar,
      toracica: o.toracica,
      cervical: f('cervical'),
      cabeca: f('cabeca'),
      pesMeiaDistancia: f('pes.meiaDistancia'),
      apoio: 'dois',
      alfa: o.alfa,
      bracos(e) {
        const R = braco(corpo, e, 'R', o.braco);
        // a carga no equilíbrio: a bola do kettlebell, com o braço da passada anterior (na calibração, antes de se saber
        // o ângulo da bola, a carga fica na mão)
        const beta = BETA.get(corpo);
        const pos = beta === undefined ? e.lado.R.pegada : bolaDoKettlebell(e, beta).centro;
        return { R, L: maosNaCintura(e, 'L', f('maoLivre.acima')), cargas: [{ massa: obj('kettlebell', 'massa'), pos }] };
      },
    });
    return { e: r.e, cargas: r.cargas, alfa: r.alfa };
  }
  /**
   * Em pé, uma vez por corpo e sempre na mesma ordem: um primeiro ângulo do quadril (o equilíbrio do meio da subida,
   * com a carga na mão), o ângulo da bola no antebraço (embaixo, com esse quadril) e o ângulo do quadril de novo, com a
   * carga na bola (a média do equilíbrio ao longo da subida).
   */
  function calibrarEmPe(corpo: Corpo): number {
    const ja = ALFA.get(corpo);
    if (ja !== undefined) return ja;
    const alfa0 = emPe(corpo, pedido(0.5)).alfa;
    const e0 = emPe(corpo, { ...pedido(0), alfa: alfa0 }).e;
    BETA.set(corpo, resolver1((b) => folgaNoAntebraco(e0, b) - f('kettlebell.folga'), 20, 89, 24));
    // de novo o equilíbrio, agora com a carga na bola: a média dos ângulos de equilíbrio em cinco pontos da subida, para
    // o centro de massa andar o mesmo para a frente e para trás do meio do pé
    const us = [0, 0.25, 0.5, 0.75, 1];
    const alfa = us.reduce((a, u) => a + emPe(corpo, pedido(u)).alfa, 0) / us.length;
    ALFA.set(corpo, alfa);
    return alfa;
  }

  function montar(corpo: Corpo, u: number, erro?: string): { e: Esq; cargas: Carga[] } {
    const o = pedido(u, erro);
    if (!sentado) {
      const alfa = calibrarEmPe(corpo);
      // o tronco fica parado (o quadril no ângulo do meio da subida), menos quando o erro mexe nele
      if (erro !== 'arco' && erro !== 'jogar') o.alfa = alfa;
      return emPe(corpo, o);
    }
    const t = sentar(corpo, { frente: o.frente, lombar: o.lombar, toracica: o.toracica, cabeca: f('cabeca') });
    let e = resolverMembros(t, { R: PENDURADO, L: PENDURADO }, pernasSentado());
    // algumas passadas: o ombro anda com a elevação do braço
    for (let i = 0; i < 3; i++) e = resolverMembros(t, { R: braco(corpo, e, 'R', o.braco), L: braco(corpo, e, 'L', o.braco) }, pernasSentado());
    return { e, cargas: LADOS.map((k) => ({ massa: f('carga'), pos: e.lado[k].pegada })) };
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const { e, cargas } = montar(corpo, u, erro);
    const q: Quadro = { esq: e, prims: [chao(-80, 80, -90, 90)], pecas: [], fios: [], cargas, marcas: {} };
    if (sentado) {
      const B = bancoRegulavelNaCena(banco());
      q.prims.push(...B.prims);
      const pecas: Peca[] = [B.peca];
      for (const k of LADOS) {
        const centro = e.lado[k].pegada,
          eixo: V3 = [1, 0, 0];
        q.prims.push(...halter(centro, eixo, 0.4));
        pecas.push({ t: 'halter', centro, eixo });
      }
      q.pecas = pecas;
      const E = faceDoEncosto(banco());
      q.marcas = { halter: e.lado.R.pegada, encosto: E.ponto, encostoNormal: E.normal };
      return q;
    }
    // o kettlebell: a bola encosta no antebraço (o ângulo sai do encosto, uma vez por corpo, na posição de baixo)
    const b = bolaDoKettlebell(e, BETA.get(corpo)!);
    const base = add(b.centro, mul(b.cima, -K.centro));
    const L = e.lado.R;
    q.prims.push({ t: 'esfera', c: b.centro, r: K.R, cls: 'ferro' });
    q.pecas = [{ t: 'kettlebell', base, cima: b.cima, lado: norm(sub(L.mao.x, mul(b.cima, dot(L.mao.x, b.cima)))) }];
    q.cargas = [{ massa: obj('kettlebell', 'massa'), pos: b.centro }];
    q.marcas = { kettlebell: L.pegada, bola: b.centro, maoDeApoio: e.lado.L.pegada };
    return q;
  }
  return { ficha: F, quadro };
}
