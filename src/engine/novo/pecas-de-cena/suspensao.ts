// Peça de cena: a fita de suspensão (tipo TRX), para todos os exercícios que a usam (búlgaro, remada, rosca, tríceps,
// flexão de joelho...). Partes, como no cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `suspensao`):
// a ponta da fita de ancoragem, o mosquetão, a fita (uma só até o ponto onde se divide, e uma até cada pegador), a
// fivela de ajuste em cada fita, o pegador de mão e, logo abaixo dele, o berço do pé. Medidas em
// ../dados/objetos/suspensao.json.
//
// A fita não estica: quem usa a peça põe o pegador num ponto que respeita o comprimento (o pé ou a mão pendem da
// âncora num arco) e declara o comprimento em `fios`, com `estica: false`; a conferência mede que ele não muda.
import type { Prim } from '../desenho';
import type { Materiais } from '../equipamento';
import type { PecaPropria } from '../pecas';
import type { CenaRealista } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, cross, dist, len, lerp, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('suspensao', id);

/**
 * Um pegador da fita. `ponto`: para a mão, o centro da pegada; para o pé, o fundo do berço, onde o peito do pé apoia.
 * `lado`: a direção em que o pegador (e o berço) atravessa a fita (para a mão, o eixo da pegada; para o pé, de um lado
 * ao outro do pé).
 */
export interface PegadorDaFita {
  tipo: 'mao' | 'pe';
  ponto: V3;
  lado: V3;
  /**
   * Só no pé, opcionais (acrescentados na correção do búlgaro na suspensão; sem eles, nada muda): o berço em volta do
   * pé. `largura`: a distância entre as duas tiras laterais no fundo do berço (elas passam uma de cada lado do pé);
   * `juntaAcima`: quanto acima do fundo do berço as duas tiras se juntam no pegador (acima do pé e do tornozelo).
   */
  largura?: number;
  juntaAcima?: number;
}
export interface FitaDeSuspensao {
  /** Onde a fita se prende: a ponta de baixo da fita de ancoragem (o mosquetão fica pendurado aí). */
  ancora: V3;
  pegadores: PegadorDaFita[];
  /** Com dois pegadores, quanto a fita desce inteira antes de se dividir (cm, ao longo do caminho). */
  tronco?: number;
  /**
   * A viga do alto e a ponta da fita de ancoragem como cenário (`cenario`, numa peça à parte): pintadas atrás do corpo e
   * fora do enquadramento, para o corpo não encolher no quadro (acrescentado no lote 4; sem ele, nada muda).
   */
  vigaComoCenario?: boolean;
  /**
   * Quanto a fita gira em volta do próprio comprimento (graus; opcional, acrescentado na correção do búlgaro na
   * suspensão; sem ele, nada muda). Com 0, a face larga fica de frente para quem olha de frente e, de lado, a fita é só
   * a espessura; a 45°, as duas vistas a mostram (a fita real torce um pouco).
   */
  fitaGirada?: number;
}

/** Quanto o berço do pé desce abaixo do pegador: o do pegador, se ele disser, ou o da tabela. */
const alturaDoBerco = (p: PegadorDaFita) => p.juntaAcima ?? g('bercoAlt');

/** O caminho da fita até cada pegador: âncora → (ponto onde se divide) → onde a fita chega ao pegador. */
function caminhos(f: FitaDeSuspensao): { divide: V3; pontas: { chega: V3; p: PegadorDaFita }[] } {
  const ps = f.pegadores;
  const meio = ps.length > 1 ? mul(ps.reduce<V3>((s, p) => add(s, p.ponto), [0, 0, 0]), 1 / ps.length) : ps[0]!.ponto;
  const u = norm(sub(meio, f.ancora));
  const tronco = ps.length > 1 ? Math.min(f.tronco ?? 30, dist(meio, f.ancora) * 0.6) : 0;
  const divide = add(f.ancora, mul(u, tronco));
  // a fita chega ao pegador por cima: na mão, no centro da pegada; no pé, no alto do berço (o berço desce abaixo dele)
  const pontas = ps.map((p) => {
    if (p.tipo === 'mao') return { chega: p.ponto, p };
    const d = norm(sub(p.ponto, divide));
    return { chega: add(p.ponto, mul(d, -alturaDoBerco(p))), p };
  });
  return { divide, pontas };
}

/**
 * Onde a fita se divide (com dois pegadores; com um, é o próprio pegador): para quem precisa saber para onde cada fita
 * puxa a mão (a fita sai do pegador em direção a este ponto). Acrescentado no lote 4 (remada, rosca, tríceps, T).
 */
export function pontoDeDivisao(f: FitaDeSuspensao): V3 {
  return caminhos(f).divide;
}

/**
 * O comprimento da fita da âncora até cada pegador (cm), ao longo do caminho: é o número que vai em `fios`. Para o
 * pé, conta até o fundo do berço, onde o pé apoia.
 */
export function comprimentoDaFita(f: FitaDeSuspensao): number[] {
  const c = caminhos(f);
  return c.pontas.map(({ chega, p }) => dist(f.ancora, c.divide) + dist(c.divide, chega) + (p.tipo === 'pe' ? alturaDoBerco(p) : 0));
}

/**
 * Onde fica o ponto de um pegador pendurado: a âncora, o comprimento da fita até ele e onde ele está no chão (x, z).
 * Devolve a altura que respeita o comprimento (a fita esticada pelo peso; não estica além disso).
 */
export function alturaNaFita(ancora: V3, comp: number, x: number, z: number): number {
  const h = Math.hypot(x - ancora[0], z - ancora[2]);
  return ancora[1] - Math.sqrt(Math.max(0, comp * comp - h * h));
}

/** A viga (o ponto firme da montagem segura; o tamanho é só de desenho) e a ponta da fita de ancoragem que desce dela. */
function vigaEAncoragem(C: CenaRealista, M: Materiais, ancora: V3, trecho: (a: V3, b: V3, larg: number, lado: V3) => void, giro = 0) {
  const topo = add(ancora, [0, 22, 0]);
  C.tubo(add(topo, [-25, 3, 0]), add(topo, [25, 3, 0]), 6, 6, M.metal, { up: [0, 1, 0] });
  trecho(add(topo, [0, 3, 0]), add(ancora, [0, 2, 0]), g('ancoraLarg'), giro ? girarEmVolta([1, 0, 0], [0, -1, 0], giro) : [1, 0, 0]);
}
/** Gira a direção `l` em volta do eixo `d` (perpendicular a ela), em graus. */
function girarEmVolta(l: V3, d: V3, graus: number): V3 {
  const a = (graus * Math.PI) / 180;
  return norm(add(mul(l, Math.cos(a)), mul(cross(d, l), Math.sin(a))));
}
/** Um trecho de fita chata, de `a` a `b`, com a largura atravessada na direção `lado`. */
const trechoDeFita = (C: CenaRealista, M: Materiais) => (a: V3, b: V3, larg: number, lado: V3, esp = 0.35) => {
  const d = norm(sub(b, a));
  let up = cross(lado, d);
  if (len(up) < 1e-4) up = cross([0, 0, 1], d);
  C.tubo(a, b, larg, esp, M.borracha, { up: norm(up) });
};

export function fitaDeSuspensao(f: FitaDeSuspensao): { prims: Prim[]; peca: PecaPropria; comp: number[]; cenario?: PecaPropria } {
  const c = caminhos(f);
  const prims: Prim[] = [];
  if (c.divide !== f.ancora) prims.push({ t: 'fio', pts: [f.ancora, c.divide], larg: g('fitaLarg') * 0.6, cls: 'fita', vies: -1 });
  for (const { chega, p } of c.pontas) prims.push({ t: 'fio', pts: [c.divide, chega, ...(p.tipo === 'pe' ? [p.ponto] : [])], larg: g('fitaLarg') * 0.5, cls: 'fita', vies: -1 });

  const peca: PecaPropria = {
    t: 'propria',
    nome: 'fita de suspensão',
    desenhar(C: CenaRealista, M: Materiais) {
      const fita = M.borracha,
        acao = M.estofado;
      /** Um trecho de fita chata, de `a` a `b`, com a largura atravessada na direção `lado`. */
      const trecho = (a: V3, b: V3, larg: number, lado: V3, esp = 0.35) => {
        const d = norm(sub(b, a));
        let up = cross(lado, d);
        if (len(up) < 1e-4) up = cross([0, 0, 1], d);
        C.tubo(a, b, larg, esp, fita, { up: norm(up) });
      };
      /**
       * O berço em volta do pé: o pegador atravessado no alto (onde as tiras se juntam), as duas tiras laterais, uma de
       * cada lado do pé, e a almofada do fundo, por baixo do peito do pé. As tiras mostram a face de lado.
       */
      const bercoEmVolta = (junta: V3, fundo: V3, d: V3, l: V3, largura: number) => {
        const meia = g('pegadorComp') / 2;
        C.cilindro(add(junta, mul(l, -meia)), add(junta, mul(l, meia)), g('pegadorDiam') / 2, fita, { lados: 12 });
        const face = norm(cross(l, d));
        const esp = 1.2;
        // a almofada do fundo fica logo abaixo do ponto de apoio (o pé apoia em cima dela)
        const centro = add(fundo, mul(d, esp / 2));
        for (const s of [-1, 1]) trecho(add(junta, mul(l, s * (meia - 1.5))), add(centro, mul(l, s * (largura / 2))), 2.5, face, 0.5);
        C.tubo(add(centro, mul(l, -largura / 2 - 0.6)), add(centro, mul(l, largura / 2 + 0.6)), g('bercoLarg'), esp, fita, { up: d });
      };
      const ladoDe = (d: V3): V3 => {
        const l = perp([1, 0, 0], d);
        return len(l) < 1e-4 ? [0, 0, 1] : norm(l);
      };
      // o ponto firme (uma viga ou barra, como pede a montagem segura; o tamanho é só de desenho), a ponta da fita de
      // ancoragem que desce dele e o mosquetão
      if (!f.vigaComoCenario) vigaEAncoragem(C, M, f.ancora, trecho, f.fitaGirada ?? 0);
      const gira = (l: V3, d: V3) => (f.fitaGirada ? girarEmVolta(l, d, f.fitaGirada) : l);
      const mosq = g('mosquetaoComp');
      const dA = norm(sub(c.divide === f.ancora ? c.pontas[0]!.chega : c.divide, f.ancora));
      const fimMosq = add(f.ancora, mul(dA, mosq));
      // o anel do mosquetão fica a 45° entre os eixos, para aparecer tanto de lado quanto de frente
      const lA = norm(perp([1, 0, 1], dA));
      const voltas = 12;
      const anel: V3[] = [];
      for (let i = 0; i <= voltas; i++) {
        const t = (2 * Math.PI * i) / voltas;
        anel.push(add(lerp(f.ancora, fimMosq, 0.5), add(mul(dA, (mosq / 2) * Math.cos(t)), mul(lA, mosq * 0.28 * Math.sin(t)))));
      }
      for (let i = 0; i < voltas; i++) C.cilindro(anel[i]!, anel[i + 1]!, 0.7, M.cromo, { lados: 8 });
      // a fita inteira até onde se divide (com dois pegadores) e uma fita até cada pegador, com a fivela de ajuste
      if (c.divide !== f.ancora) trecho(fimMosq, c.divide, g('fitaLarg'), gira(ladoDe(norm(sub(c.divide, f.ancora))), norm(sub(c.divide, f.ancora))));
      for (const { chega, p } of c.pontas) {
        const de = c.divide === f.ancora ? fimMosq : c.divide;
        const d = norm(sub(chega, de));
        const l = norm(perp(p.lado, d));
        const lf = gira(l, d);
        trecho(de, chega, g('fitaLarg'), lf);
        const fivela = lerp(de, chega, 0.42);
        C.tubo(add(fivela, mul(d, -3)), add(fivela, mul(d, 3)), g('fitaLarg') + 1.2, 1.4, acao, { up: norm(cross(lf, d)) });
        if (p.tipo === 'pe' && p.largura !== undefined) {
          bercoEmVolta(chega, p.ponto, d, l, p.largura);
          continue;
        }
        // o pegador de mão: atravessado à fita; para o pé, ele fica logo acima do berço
        const pega = p.tipo === 'mao' ? p.ponto : chega;
        const meia = g('pegadorComp') / 2;
        C.cilindro(add(pega, mul(l, -meia)), add(pega, mul(l, meia)), g('pegadorDiam') / 2, fita, { lados: 12, dz: p.tipo === 'mao' ? 6 : 0 });
        // o berço do pé: uma alça que desce do pegador e passa por baixo do peito do pé
        const fundo = p.tipo === 'pe' ? p.ponto : add(pega, mul(d, g('bercoAlt')));
        const mb = g('bercoLarg') / 2;
        const lados = [-1, 1].map((s) => add(pega, mul(l, s * mb)));
        const baixo = [-1, 1].map((s) => add(fundo, mul(l, s * mb)));
        for (const s of [0, 1]) trecho(lados[s]!, baixo[s]!, 2.2, d, 0.5);
        trecho(baixo[0]!, baixo[1]!, 4, d, 0.8);
      }
    },
  };
  if (!f.vigaComoCenario) return { prims, peca, comp: comprimentoDaFita(f) };
  const cenario: PecaPropria = {
    t: 'propria',
    nome: 'viga da fita de suspensão',
    cenario: true,
    desenhar(C, M) {
      // vista de cima: a viga ficaria por cima da pessoa (e, como cenário, pintada atrás dela, pareceria um degrau sob os
      // pés); nessa vista ela não aparece
      const a = C.P([0, 0, 0]),
        b = C.P([0, 1, 0]);
      if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 0.3) return;
      vigaEAncoragem(C, M, f.ancora, trechoDeFita(C, M));
    },
  };
  return { prims, peca, comp: comprimentoDaFita(f), cenario };
}
