// O núcleo comum das remadas com peso livre do motor novo (a unilateral no banco, a sem banco, a com kettlebell, a
// curvada com dois halteres e a apoiada no banco inclinado): o tronco fica parado, inclinado à frente com a coluna
// neutra, e o braço que puxa leva o cotovelo para trás, rente ao corpo, até ele passar a linha das costas; no fim a
// escápula se junta à coluna. O antebraço fica na vertical o tempo todo (a carga pende embaixo da mão), e o braço gira
// no ombro, no tronco, de pendurado (embaixo do ombro) até o fim.
//
// Cada variação diz onde o corpo fica (a pose parada do tronco e das pernas, o braço de apoio e a cena) e o que a mão
// segura; o núcleo põe os braços que puxam, aplica os erros e monta o quadro.
import { pontosDoBoneco } from '../boneco';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, dot, mix, mul, norm, perp, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { kettlebellNaMao } from './dobrar-o-cotovelo';

const rad = Math.PI / 180;

/** Onde o corpo fica, parado: o tronco, as pernas, o braço de apoio (a mão no banco ou na coxa) e a cena. */
export interface BaseDaRemada {
  tronco: PoseTronco;
  pernas: Record<Lado, PosePerna>;
  /** O braço esquerdo, quando ele apoia (as remadas de um braço só). */
  apoio?: PoseBraco;
  prims: Quadro['prims'];
  pecas: Peca[];
  marcas: Quadro['marcas'];
}
/**
 * O que cada erro faz, pelo id do erro na ficha (os ids vêm do texto do app e mudam de um exercício para outro):
 * 'girar' abre o peito para o lado do braço que puxa; 'arredondar' curva a lombar e as costas; 'subir' levanta o tronco
 * (dobrando menos o quadril); 'encolher' sobe os ombros; 'curta' para a volta no meio; 'soBracos' deixa o cotovelo
 * embaixo do ombro e só dobra o cotovelo, como numa rosca.
 */
export type ErroDaRemada = 'girar' | 'arredondar' | 'subir' | 'encolher' | 'curta' | 'soBracos';
export interface OpcoesDaRemada {
  /** Quem puxa: só o braço direito (o de perto na vista de lado) ou os dois. */
  bracos: 'R' | 'dois';
  carga: 'halter' | 'kettlebell';
  base(corpo: Corpo): BaseDaRemada;
  erros: Record<string, ErroDaRemada>;
  /**
   * Opcional (remada apoiada): mais uma folga da carga (cm) que os braços que puxam respeitam, além da das pernas e do
   * tronco (`folgaDaCarga`): por exemplo, a da carga até o encosto do banco. Sem o campo, nada muda.
   */
  folgaExtra?: (q: Quadro) => number;
}
export interface Remada {
  ficha: Ficha;
  quadro(corpo: Corpo, u: number, erro?: string): Quadro;
}

/** A direção do braço (do ombro ao cotovelo) no tronco: `atras` graus atrás da vertical, `fora` graus para fora. */
function direcaoDoBraco(atras: number, fora: number, s: number): V3 {
  const a = atras * rad,
    b = fora * rad;
  return norm([s * Math.sin(b), -Math.cos(b) * Math.cos(a), -Math.cos(b) * Math.sin(a)]);
}
/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, add(a, mul(ab, t)));
}
const PARTES_LONGE_DA_CARGA = new Set(['coxa', 'canela', 'pelve', 'tronco', 'cintura', 'emendaDaCintura']);
/** A menor distância (cm) entre a carga (cabeças do halter, bola do kettlebell) e a pele das pernas e do tronco. */
export function folgaDaCarga(q: Quadro): number {
  let min = 1e9;
  const cargas = q.prims.filter((p) => p.t === 'prisma' || p.t === 'esfera');
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if (!PARTES_LONGE_DA_CARGA.has(parte)) continue;
    for (const c of cargas) {
      if (c.t === 'prisma') min = Math.min(min, aoSegmento(p, c.a, c.b) - c.ra);
      else if (c.t === 'esfera') min = Math.min(min, dist(p, c.c) - c.r);
    }
  }
  return min;
}
/** Inclinação do peito à frente da vertical (graus), na pose parada. */
export const peitoDaBase = (t: Tronco) => Math.atan2(t.torax.y[2], t.torax.y[1]) / rad;

export function criarRemada(fichaJson: unknown, op: OpcoesDaRemada): Remada {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const BASES = new WeakMap<Corpo, { b: BaseDaRemada; T0: Ref; peito: number }>();
  function base(corpo: Corpo) {
    let x = BASES.get(corpo);
    if (x) return x;
    const b = op.base(corpo);
    const t = resolverTronco(corpo, b.tronco);
    x = { b, T0: t.torax, peito: peitoDaBase(t) };
    BASES.set(corpo, x);
    return x;
  }

  /**
   * O braço que puxa. O ângulo para trás é medido no mundo, na pose parada (0 = pendurado na vertical), e o fim é dado
   * em relação à linha das costas: `braco.fim.alemDasCostas` graus além da inclinação do peito. O braço é escrito no
   * referencial do tronco parado; nos erros que movem o tronco (girar, arredondar, subir), ele vai junto. `maisFora`
   * afasta o braço e o antebraço do corpo (graus), quando a carga encostaria nele (ver `quadro`).
   */
  function bracoQuePuxa(t: Tronco, T0: Ref, peito: number, k: Lado, u: number, tipo?: ErroDaRemada, maisFora = 0): PoseBraco {
    const s = sinal(k);
    const fim = peito + f('braco.fim.alemDasCostas');
    let atras = mix(f('braco.inicio.atras'), fim, u),
      fora = mix(f('braco.inicio.fora'), f('braco.fim.fora'), u);
    // o antebraço: pende embaixo do cotovelo (a carga pende embaixo da mão). No começo ele fica na linha do braço, visto
    // de trás (o braço todo pende um pouco para fora e o cotovelo dobra só para trás); no fim, na vertical. No erro "só
    // com os braços", ele dobra para a frente
    const af = (fora * (1 - u) + maisFora) * rad;
    fora += maisFora;
    let ante: V3 = [s * Math.sin(af), -Math.cos(af), 0];
    if (tipo === 'soBracos') {
      atras = mix(f('braco.inicio.atras'), f('erro.soBracos.atras'), u);
      fora = f('braco.inicio.fora') + maisFora;
      const g = f('erro.soBracos.cotovelo') * u * rad;
      ante = norm([s * Math.sin(fora * rad), -Math.cos(g), Math.sin(g)]);
    }
    // do mundo (pose parada) para o tronco de agora
    const noMundo = direcaoDoBraco(atras, fora, s);
    const local: V3 = [noMundo[0] * T0.x[0] + noMundo[1] * T0.x[1] + noMundo[2] * T0.x[2], noMundo[0] * T0.y[0] + noMundo[1] * T0.y[1] + noMundo[2] * T0.y[2], noMundo[0] * T0.z[0] + noMundo[1] * T0.z[1] + noMundo[2] * T0.z[2]];
    const umero = dirRef(t.torax, local);
    const encolhe = tipo === 'encolher' ? f('erro.encolher.elev') * u : 0;
    const uu = tipo === 'soBracos' ? 0 : u;
    // pegada neutra: o cabo (ou a alça) atravessa a palma de frente para trás; o polegar aponta para a frente
    const polegar = norm(perp([0, 0, 1], ante));
    const diam = op.carga === 'kettlebell' ? obj('kettlebell', 'alcaDiam') : obj('halter', 'caboDiam');
    return {
      umero,
      antebraco: ante,
      polo: norm([s * 0.3, 0.2, -1]),
      mao: { polegar, forma: 'pegada', diam },
      elev: mix(f('escapula.elev.inicio'), f('escapula.elev.fim'), uu) + encolhe,
      prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), uu),
    };
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const { b, T0, peito } = base(corpo);
    const tipo = erro ? op.erros[erro] : undefined;
    // o tronco: parado, a não ser nos erros que o movem
    const tr: PoseTronco = { ...b.tronco };
    if (tipo === 'girar') {
      // o peito abre para o lado do braço que puxa: a coluna gira em torno do próprio eixo (metade na lombar, metade
      // na torácica)
      const g = f('erro.girar.giro') * u;
      tr.lombarGiro = (tr.lombarGiro ?? 0) - g * f('erro.girar.lombar');
      tr.toracicaGiro = (tr.toracicaGiro ?? 0) - g * (1 - f('erro.girar.lombar'));
    }
    if (tipo === 'arredondar') {
      // a coluna curva para cima: a bacia vira para trás e a lombar e a parte de cima das costas dobram, com o peito
      // quase na mesma inclinação (os ombros não caem: as costas fazem uma corcunda)
      const lo = f('erro.arredondar.lombar') * u,
        to = f('erro.arredondar.toracica') * u;
      tr.lombar = (tr.lombar ?? 0) + lo;
      tr.toracica = (tr.toracica ?? 0) + to;
      tr.cervical = (tr.cervical ?? 0) - f('erro.arredondar.cervical') * u;
      // quanto a bacia vira para trás: o bastante para os ombros não subirem nem caírem. Com a mão de apoio, o ombro dela
      // fica à mesma distância da mão (o braço de apoio não muda); sem apoio, a base do pescoço fica na mesma altura
      const medida = (p: PoseTronco) => {
        const t = resolverTronco(corpo, p);
        if (!b.apoio?.punho) return t.torax.o[1];
        const e = resolverMembros(t, { R: b.apoio, L: b.apoio }, b.pernas);
        return dist(e.lado.L.ombro, b.apoio.punho);
      };
      const alvo = medida(b.tronco);
      const f0 = b.tronco.frente ?? 0;
      tr.frente = resolver1((x) => medida({ ...tr, frente: x }) - alvo, f0 - lo - to - 20, f0 + 10, 30);
    }
    if (tipo === 'subir') tr.frente = (tr.frente ?? 0) - f('erro.subir.tronco') * u;
    const t = resolverTronco(corpo, tr);
    // na volta curta, o braço não passa da metade do caminho
    const uu = tipo === 'curta' ? mix(f('erro.curta.fracao'), 1, u) : u;
    /** O quadro com os braços que puxam afastados `maisFora` graus. */
    function montar(maisFora: number): Quadro {
      const puxa = (k: Lado) => bracoQuePuxa(t, T0, peito, k, uu, tipo, maisFora);
      let R = puxa('R');
      let L = op.bracos === 'dois' ? puxa('L') : b.apoio!;
      let e: Esq = resolverMembros(t, { R, L }, b.pernas);
      // pegada neutra de verdade: o polegar aponta para a frente do antebraço (nem pronado nem supinado), qualquer que
      // seja o giro do braço no ombro; a segunda passada só gira a mão
      const neutra = (p: PoseBraco, k: Lado): PoseBraco => ({ ...p, mao: { ...p.mao, polegar: e.lado[k].antebraco.z } });
      R = neutra(R, 'R');
      if (op.bracos === 'dois') L = neutra(L, 'L');
      e = resolverMembros(t, { R, L }, b.pernas);
      const quem: Lado[] = op.bracos === 'dois' ? [...LADOS] : ['R'];
      const q: Quadro = { esq: e, prims: [...b.prims], pecas: [...b.pecas], fios: [], cargas: [], marcas: { ...b.marcas } };
      for (const k of quem) {
        const Lk = e.lado[k];
        if (op.carga === 'halter') {
          // o halter pende na vertical, com o cabo de frente para trás (pegada neutra)
          const centro = Lk.pegada,
            eixo = norm(perp(Lk.mao.x, [0, 1, 0]));
          q.prims.push(...halter(centro, eixo, 0.4));
          q.pecas!.push({ t: 'halter', centro, eixo });
          q.cargas.push({ massa: f('carga'), pos: centro });
          if (k === 'R') q.marcas.halter = centro;
        } else {
          const K = kettlebellNaMao(e, k, f('kettlebell.folga'));
          q.prims.push(...K.prims);
          q.pecas!.push(K.peca);
          q.cargas.push({ massa: obj('kettlebell', 'massa'), pos: K.centro });
          if (k === 'R') {
            q.marcas.kettlebell = Lk.pegada;
            q.marcas.bola = K.centro;
          }
        }
      }
      return q;
    }
    // a carga não atravessa as pernas nem o tronco: se ela chegaria a menos de `carga.folgaMinima` da pele (num corpo
    // menor, ou num erro que move o tronco), os braços se afastam do corpo só o necessário (`resolver1`; contínuo, sem
    // tranco: o afastamento é zero enquanto a folga basta)
    const minima = 0.5;
    const folga = (q: Quadro) => (op.folgaExtra ? Math.min(folgaDaCarga(q), op.folgaExtra(q)) : folgaDaCarga(q));
    const q0 = montar(0);
    if (folga(q0) >= minima) return q0;
    return montar(resolver1((x) => folga(montar(x)) - minima, 0, 30, 16));
  }
  return { ficha: F, quadro };
}
