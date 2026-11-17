// O núcleo comum dos exercícios de braço e ombro em pé na polia (crucifixo, crucifixo invertido, face pull e rosca na
// polia baixa). O que eles têm em comum:
//  - o corpo em pé, parado: os pés onde a ficha pede (lado a lado ou um à frente do outro), o peito inclinado o que a
//    ficha pede e a pelve na altura que dá a flexão do joelho da ficha; o quadril fica parado no ponto em que o centro
//    de massa (com os braços no meio do caminho) cai onde a ficha pede, e só os braços se mexem;
//  - o braço pela linha do ombro ao centro da pegada (`bracoNaLinha`, de ./na-fita.ts), com o cotovelo dobrado o que a
//    ficha pede: no crucifixo, o cotovelo fica no mesmo ângulo a série toda e a mão anda em arco;
//  - cada mão (ou a peça que as mãos seguram) presa a um cabo reto que vai até a roldana da sua coluna; cada coluna tem
//    a sua pilha, que sobe o curso do seu cabo dividido pela relação da máquina (tabela de objetos).
// Cada exercício traz a sua ficha de movimento e diz onde ficam as colunas e o que as mãos seguram.
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import type { Prim } from '../desenho';
import { centroDeMassa, resolver1 } from '../movimento';
import type { Quadro } from '../movimento';
import { cabo, centroDaRoldana, estribo, saidaDoCabo, torre } from '../pecas';
import type { Peca, Torre } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dirRef, dist, dot, len, mul, norm, perp, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { bracoNaLinha } from './na-fita';

const rad = Math.PI / 180;

/* ============================== o corpo em pé ============================== */
export interface PeNoChao {
  /** O ponto do chão sob a bola do pé. */
  bola: V3;
  /** Quanto o calcanhar sobe (graus; o pé de trás, num pé à frente do outro). */
  calc?: number;
}
export interface PedidoEmPe {
  pes: Record<Lado, PeNoChao>;
  /** Flexão do joelho direito (graus): dá a altura da pelve. */
  joelho: number;
  /** Inclinação do peito à frente da vertical (graus; negativo = para trás). */
  tronco: number;
  lombar?: number;
  toracica?: number;
  cervical?: number;
  cabeca?: number;
  /** Os braços, dado o tronco e o esqueleto da passada anterior (o ombro de verdade, que anda com o braço). */
  bracos(t: Tronco, ant: Esq): Record<Lado, PoseBraco>;
}
/** A pelve parada: a altura e a posição para a frente do meio dos dois quadris (cm). */
export interface PelveParada {
  y: number;
  z: number;
}

/** A inclinação do peito à frente da vertical (graus): o eixo do tórax visto de lado. */
export const inclinacaoDoPeito = (t: Tronco) => Math.atan2(t.torax.y[2], t.torax.y[1]) / rad;

/** A inclinação da pelve (`frente` de resolverTronco) que deixa o peito `tronco` graus à frente da vertical. */
function pelvePara(corpo: Corpo, p: PedidoEmPe): number {
  return resolver1((x) => inclinacaoDoPeito(resolverTronco(corpo, { pelve: [0, 95, 0], frente: x, lombar: p.lombar ?? 0, toracica: p.toracica ?? 0, cervical: p.cervical ?? 0, cabeca: p.cabeca ?? 0 })) - p.tronco, -40, 70, 30);
}

const PENDURADO: PoseBraco = { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };

/** O corpo com a pelve parada em `pelve`: o tronco, as pernas presas pelos pés e os braços (três passadas). */
export function montarEmPe(corpo: Corpo, p: PedidoEmPe, pelve: PelveParada): Esq {
  const t = resolverTronco(corpo, { pelve: [0, pelve.y, pelve.z], frente: pelvePara(corpo, p), lombar: p.lombar ?? 0, toracica: p.toracica ?? 0, cervical: p.cervical ?? 0, cabeca: p.cabeca ?? 0 });
  const perna = (k: Lado): PosePerna => ({ pe: { bola: p.pes[k].bola, dir: [sinal(k) * 0.1, 0, 1], calc: p.pes[k].calc ?? 0 }, polo: [sinal(k) * 0.1, 0, 1] });
  const pernas = { R: perna('R'), L: perna('L') };
  let e = resolverMembros(t, { R: PENDURADO, L: PENDURADO }, pernas);
  for (let i = 0; i < 3; i++) e = resolverMembros(t, p.bracos(t, e), pernas);
  return e;
}

/**
 * Onde a pelve fica parada: na altura que dá a flexão do joelho direito pedida e na posição para a frente em que o
 * centro de massa do corpo (com os braços do pedido) cai em `zDoPeso`.
 */
export function equilibrar(corpo: Corpo, p: PedidoEmPe, zDoPeso: number): PelveParada {
  let z = zDoPeso,
    y = corpo.m('altura.trocanter');
  for (let i = 0; i < 6; i++) {
    y = resolver1((yy) => montarEmPe(corpo, p, { y: yy, z }).lado.R.ang.joelho - p.joelho, 60, corpo.m('altura.trocanter') + 4, 26);
    z -= centroDeMassa(montarEmPe(corpo, p, { y, z }), 'homem')[2] - zDoPeso;
  }
  return { y, z };
}

/* ============================== o braço ============================== */
/**
 * O braço no tórax `T`, pela linha do ombro ao centro da pegada: `psi` graus a partir da frente (0 = à frente, 90 = para
 * o lado, mais de 90 = para trás) e `el` graus acima do plano do tórax (negativo = para baixo), com o cotovelo dobrado
 * `dobra` graus para o lado de `polo` (lado esquerdo; o direito espelha x). A mão: `supinacao` graus a partir da pegada
 * neutra (0 = o polegar para a frente do antebraço, o lado para onde ele dobra; 90 = o polegar para fora, palma
 * supinada; negativo = pronada).
 */
export function bracoNoArco(corpo: Corpo, T: Ref, k: Lado, o: { psi: number; el: number; dobra: number; polo: V3; supinacao: number; diam: number; elev?: number; prot?: number }): PoseBraco {
  const s = sinal(k),
    P = o.psi * rad,
    E = o.el * rad;
  const esp = (v: V3): V3 => dirRef(T, [s * v[0], v[1], v[2]]);
  const dir = esp([Math.sin(P) * Math.cos(E), Math.sin(E), Math.cos(P) * Math.cos(E)]);
  const polo = esp(o.polo);
  const b = bracoNaLinha(corpo, dir, polo, o.dobra);
  return { ...b, polo, mao: { polegar: polegarDaPegada(b.umero, b.antebraco, polo, s, o.supinacao), forma: 'pegada', diam: o.diam }, elev: o.elev, prot: o.prot };
}
/**
 * O polegar de uma pegada com `supinacao` graus a partir da neutra, dados o braço, o antebraço e o polo do cotovelo:
 * a frente do antebraço (o lado do bíceps) e o lado de fora dele, como em `bracoDaRosca` (./dobrar-o-cotovelo.ts).
 */
export function polegarDaPegada(umero: V3, antebraco: V3, polo: V3, s: number, supinacao: number): V3 {
  const u = norm(umero),
    d = norm(antebraco);
  // a frente do braço: para onde o antebraço dobra (o contrário do polo, com o cotovelo quase reto)
  let frente = perp(sub(d, u), u);
  if (len(frente) < 1e-3) frente = mul(polo, -1);
  frente = norm(perp(frente, u));
  const c = Math.acos(Math.max(-1, Math.min(1, dot(u, d))));
  const frenteAnte = norm(perp(sub(mul(frente, Math.cos(c)), mul(u, Math.sin(c))), d));
  const foraAnte = norm(perp(mul(cross(frente, u), s), d));
  const a = supinacao * rad;
  return norm(add(mul(frenteAnte, Math.cos(a)), mul(foraAnte, Math.sin(a))));
}

/* ============================== as colunas e os cabos ============================== */
/** Uma coluna com o seu cabo: o id do fio (para a conferência), a torre e o ponto em que o cabo prende (o elo do estribo, a bucha da corda, o meio da barra). */
export interface CaboDaColuna {
  id: string;
  torre: Torre;
}
/** A coluna com a roldana no ponto pedido: a base fica atrás da roldana, do lado oposto a `frente`. */
export function torreComRoldanaEm(roldana: V3, frente: V3): Torre {
  const f = norm(frente);
  const t0: Torre = { base: [0, 0, 0], frente: f, alturaDaPolia: roldana[1] };
  const c0 = centroDaRoldana(t0);
  return { ...t0, base: [roldana[0] - c0[0], 0, roldana[2] - c0[2]] };
}
/** O estribo na mão `k`, com o elo para o lado da roldana da coluna. */
export function estriboNaMao(e: Esq, k: Lado, t: Torre): { prims: Prim[]; peca: Peca; elo: V3 } {
  const L = e.lado[k];
  const es = estribo(L.pegada, L.mao.x, sub(centroDaRoldana(t), L.pegada));
  return { prims: es.prims, peca: { t: 'estribo', pegada: L.pegada, eixo: L.mao.x, elo: es.elo }, elo: es.elo };
}
/** O comprimento do cabo, do ponto em que prende até a saída da roldana. */
export const compDoCabo = (t: Torre, ponta: V3) => dist(ponta, saidaDoCabo(t, ponta));

/**
 * Os cabos e as colunas de um quadro. `pontas`: onde cada cabo prende, na ordem de `cabos`; `repouso`: o comprimento de
 * cada cabo com a pilha em repouso (o mais curto do ciclo). Cada pilha sobe o curso do seu cabo dividido pela relação da
 * máquina, mais a folga (o cabo já tenso no começo). As marcas `pilha`, `pilha2`... guardam a subida de cada uma.
 * `cortadaEmCima`: até que altura o quadro precisa mostrar a coluna (polia baixa: o resto é cortado pela borda).
 */
export function colunasECabos(cabos: CaboDaColuna[], pontas: V3[], repouso: number[], folga: number, cenario: boolean, cortadaEmCima?: number): Pick<Quadro, 'prims' | 'pecas' | 'fios' | 'marcas'> {
  const prims: Prim[] = [],
    pecas: Peca[] = [],
    fios: Quadro['fios'] = [],
    marcas: Record<string, V3> = {};
  cabos.forEach((c, i) => {
    const ponta = pontas[i]!;
    const saida = saidaDoCabo(c.torre, ponta);
    const comp = dist(ponta, saida);
    const subida = Math.max(0, (comp - repouso[i]!) / obj('torre', 'relacao') + folga);
    prims.push(...torre(c.torre, subida), cabo(ponta, saida));
    pecas.unshift({ t: 'torre', torre: c.torre, subida, ...(cenario ? { cenario: true } : {}), ...(cortadaEmCima !== undefined ? { cortadaEmCima } : {}) });
    pecas.push({ t: 'cabo', a: ponta, b: saida });
    fios.push({ id: c.id, comp, estica: true });
    marcas[i === 0 ? 'pilha' : `pilha${i + 1}`] = [0, subida, 0];
    marcas[`${c.id}.ponta`] = ponta;
    marcas[`${c.id}.saida`] = saida;
    marcas[`${c.id}.roldana`] = centroDaRoldana(c.torre);
  });
  return { prims, pecas, fios, marcas };
}

/** O menor valor de `fn` em `n + 1` pontos de 0 a 1 (o comprimento de repouso de um cabo no ciclo). */
export function menorNoCiclo(fn: (u: number) => number, n = 40): number {
  let m = 1e9;
  for (let i = 0; i <= n; i++) m = Math.min(m, fn(i / n));
  return m;
}
