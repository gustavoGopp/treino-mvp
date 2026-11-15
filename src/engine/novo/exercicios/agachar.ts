// O núcleo comum dos agachamentos do motor novo (goblet, peso do corpo e os próximos do lote 1).
// O que ele resolve em cada quadro, em vez de receber pronto: a posição do quadril sai de duas condições, a flexão
// do joelho pedida e o centro de massa (corpo + carga) sobre o apoio dos pés. A dorsiflexão do tornozelo é
// consequência, e a conferência a compara com a amplitude normal.
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { centroDeMassa, resolver1 } from '../movimento';
import type { Corpo } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

type Tronco = ReturnType<typeof resolverTronco>;
export interface PedidoDeAgachamento {
  /** Flexão do joelho (graus), inclinação do peito (graus) e flexão da lombar além da curva de repouso (graus). */
  joelho: number;
  tronco: number;
  lombar: number;
  /** Quanto cada joelho cai para dentro da linha do pé (cm): o erro do valgo. */
  valgo: number;
  /** Quanto o pé gira na bola, com o calcanhar subindo (graus): a anilha sob o calcanhar, ou o erro do calcanhar. */
  calcanhar: number;
  /** Onde o centro de massa fica: no meio do pé (o certo) ou na bola do pé (o calcanhar saiu do chão). */
  apoio: 'meio' | 'bola';
  /** Meia distância entre os pés (cm) e quanto as pontas abrem (graus). */
  pesMeiaDistancia: number;
  pesParaFora: number;
  /** Os braços (e a carga que eles seguram) para um tronco dado. */
  bracos(t: Tronco): { R: PoseBraco; L: PoseBraco; carga?: { massa: number; pos: V3 } };
}
export interface Agachado {
  e: Esq;
  carga?: { massa: number; pos: V3 };
  /** O ponto do chão sob a bola de cada pé e a direção dos dedos (s = −1 direita, +1 esquerda). */
  bola(s: number): V3;
  dirPe(s: number): V3;
}

export function agachar(corpo: Corpo, p: PedidoDeAgachamento): Agachado {
  const m = (id: string) => corpo.m(id);
  const rad = Math.PI / 180;
  const dBola = m('pe.calcanharABola');
  const fora = p.pesParaFora * rad;
  const dirPe = (s: number): V3 => [s * Math.sin(fora), 0, Math.cos(fora)];
  const bola = (s: number): V3 => add([s * p.pesMeiaDistancia, 0, 0], mul(dirPe(s), dBola - m('pe.calcanharAoTornozelo')));
  const th = m('coxa.comp'),
    sk = m('perna.comp'),
    a = p.joelho * rad;
  const perna = (k: Lado): PosePerna => {
    const s = sinal(k);
    // o joelho fica a uma distância da linha quadril–tornozelo que depende de quanto ele dobra; girar o plano da
    // perna para dentro pelo ângulo certo leva o joelho `valgo` cm para dentro da linha do pé
    const afastado = (th * sk * Math.sin(a)) / Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos(a));
    const gira = p.valgo ? Math.asin(Math.min(0.6, p.valgo / Math.max(afastado, 1))) : 0;
    return { pe: { bola: bola(s), dir: dirPe(s), calc: p.calcanhar }, polo: [s * Math.sin(fora - gira), 0, Math.cos(fora - gira)] };
  };
  const pernas = { R: perna('R'), L: perna('L') };
  const montar = (y: number, z: number) => {
    // `tronco` é a inclinação do peito; a da bacia é o que sobra (tronco − lombar)
    const t = resolverTronco(corpo, { pelve: [0, y, z], frente: p.tronco - p.lombar, lombar: p.lombar, cervical: -p.tronco * 0.25, cabeca: -p.tronco * 0.2 });
    const b = p.bracos(t);
    return { e: resolverMembros(t, { R: b.R, L: b.L }, pernas), carga: b.carga };
  };
  // O quadril fica a uma distância do tornozelo que só depende da flexão do joelho (lei dos cossenos). Sobra uma
  // incógnita, o quanto ele vai para trás; ela sai da condição de equilíbrio: o centro de massa sobre o apoio.
  const hq = m('quadril.meiaDistancia');
  const d = Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos(a));
  const semBracos = { polo: [0, 0, -1] as V3, mao: { polegar: [0, 0, 1] as V3 } };
  const torn = resolverMembros(resolverTronco(corpo, { pelve: [0, 200, 0] }), { R: semBracos, L: semBracos }, pernas).lado.L.tornozelo;
  const plano = Math.sqrt(Math.max(1, d * d - (hq - torn[0]) ** 2));
  const quadrilEm = (alfa: number): [number, number] => [torn[1] + plano * Math.cos(alfa * rad), torn[2] - plano * Math.sin(alfa * rad)];
  const alvo = p.apoio === 'bola' ? bola(1)[2] - 1 : bola(1)[2] - dBola / 2;
  const alfa = resolver1((x) => {
    const [y, z] = quadrilEm(x);
    const r = montar(y, z);
    return centroDeMassa(r.e, 'homem', r.carga ? [r.carga] : [])[2] - alvo;
  }, -25, 80);
  const [y, z] = quadrilEm(alfa);
  return { ...montar(y, z), bola, dirPe };
}
