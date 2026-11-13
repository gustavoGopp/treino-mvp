// Agachamento goblet com calcanhar elevado, no motor novo. Os números vêm da ficha (../dados/movimentos/goblet.json).
// O que a animação resolve em cada quadro, em vez de receber pronto: a posição do quadril sai de duas condições,
// a flexão do joelho pedida e o centro de massa (corpo + halter) sobre o meio do pé. A dorsiflexão do tornozelo
// é consequência, e a conferência a compara com a amplitude normal.
import ficha from '../dados/movimentos/goblet.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { anilhaNoChao, chao, halter } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, noRef, norm, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const m = (id: string) => corpo.m(id);
  const joelho = mix(f('joelho.cima'), f(erro === 'raso' ? 'erro.raso.joelho' : 'joelho.baixo'), u);
  const tronco = mix(f('tronco.cima'), f(erro === 'lombar' ? 'erro.lombar.tronco' : 'tronco.baixo'), u);
  const lombar = erro === 'lombar' ? f('erro.lombar.lombar') * u : 0;
  // pés: a bola do pé no chão e o calcanhar sobre a anilha (o pé gira na bola até o calcanhar chegar à altura dela)
  const esp = obj('anilhaCalcanhar', 'esp'),
    dBola = m('pe.calcanharABola');
  const calc = Math.asin(esp / dBola) / (Math.PI / 180);
  const w = f('pes.meiaDistancia'),
    fora = (f('pes.paraFora') * Math.PI) / 180;
  const dirPe = (s: number): V3 => [s * Math.sin(fora), 0, Math.cos(fora)];
  const bola = (s: number): V3 => add([s * w, 0, 0], mul(dirPe(s), dBola - m('pe.calcanharAoTornozelo')));
  // o joelho cai para dentro conforme a pessoa desce e fica assim embaixo (é onde o erro mais aparece)
  const valgo = erro === 'valgo' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0;
  const perna = (k: Lado): PosePerna => {
    const s = sinal(k);
    // o joelho fica a uma distância da linha quadril–tornozelo que depende de quanto ele dobra; girar o plano da
    // perna para dentro pelo ângulo certo leva o joelho `valgo` cm para dentro da linha do pé
    const th = m('coxa.comp'),
      sk = m('perna.comp'),
      a = (joelho * Math.PI) / 180;
    const afastado = (th * sk * Math.sin(a)) / Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos(a));
    const gira = valgo ? Math.asin(Math.min(0.6, valgo / Math.max(afastado, 1))) : 0;
    return { pe: { bola: bola(s), dir: dirPe(s), calc }, polo: [s * Math.sin(fora - gira), 0, Math.cos(fora - gira)] };
  };
  const pernas = { R: perna('R'), L: perna('L') };
  const rb = obj('halter', 'cabecaAltura') / 2,
    ra = obj('halter', 'cabecaLargura') / 2,
    comp = obj('halter', 'comp'),
    cabeca = (comp - obj('halter', 'caboComp')) / 2;
  // o halter fica na vertical do tronco, com a cabeça de cima encostada no alto do peito
  const montar = (y: number, z: number): { e: Esq; centro: V3; eixo: V3 } => {
    const t = resolverTronco(corpo, { pelve: [0, y, z], frente: tronco - lombar * 0.45, lombar, cervical: -tronco * 0.25, cabeca: -tronco * 0.2 });
    const T = t.torax;
    const frenteAlto = m('prof.peito') * 0.42,
      frenteBaixo = m('prof.peito') * 0.68;
    const topo = noRef(T, [0, -10, frenteAlto + rb + 0.8]),
      baixo = noRef(T, [0, -10 - (comp - cabeca), frenteBaixo + rb + 0.8]);
    const eixo = norm(sub(topo, baixo));
    const centro = mul(add(topo, baixo), 0.5);
    // as mãos em concha: a palma encostada no lado da cabeça de cima do halter, os dedos para cima e um pouco para a
    // frente, o polegar para o peito (a ficha da técnica: "mãos em concha embaixo da anilha de cima")
    const braco = (k: Lado): PoseBraco => {
      const s = sinal(k);
      const dedos = norm(add(mul(eixo, 0.9), mul(dirRef(T, [0, 0, 1]), 0.35)));
      const palma = add(add(topo, mul(dirRef(T, [s, 0, 0]), ra + 2.6)), mul(eixo, -cabeca * 0.35));
      return { punho: add(palma, mul(dedos, -m('mao.punhoAoCentroDaPegada'))), polo: dirRef(T, [s * 0.45, -1, -0.15]), mao: { polegar: dirRef(T, [0, 0.3, -1]), dedos, forma: 'concha' } };
    };
    return { e: resolverMembros(t, { R: braco('R'), L: braco('L') }, pernas), centro, eixo };
  };
  const massa = f('carga');
  // O quadril fica a uma distância do tornozelo que só depende da flexão do joelho (lei dos cossenos). Sobra uma
  // incógnita, o quanto ele vai para trás; ela sai da condição de equilíbrio: o centro de massa sobre o meio do pé.
  const th = m('coxa.comp'),
    sk = m('perna.comp'),
    hq = m('quadril.meiaDistancia');
  const d = Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos((joelho * Math.PI) / 180));
  const torn = resolverMembros(resolverTronco(corpo, { pelve: [0, 200, 0] }), { R: { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } }, L: { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } } }, pernas).lado.L.tornozelo;
  const plano = Math.sqrt(Math.max(1, d * d - (hq - torn[0]) ** 2));
  const quadrilEm = (alfa: number): [number, number] => [torn[1] + plano * Math.cos((alfa * Math.PI) / 180), torn[2] - plano * Math.sin((alfa * Math.PI) / 180)];
  const meioDoPe = bola(1)[2] - dBola / 2;
  const alfa = resolver1((x) => {
    const [y, z] = quadrilEm(x);
    const r = montar(y, z);
    return centroDeMassa(r.e, 'homem', [{ massa, pos: r.centro }])[2] - meioDoPe;
  }, -25, 80);
  const [y, z] = quadrilEm(alfa);
  const r = montar(y, z);
  const prims = [chao(-70, 70, -70, 80), ...halter(r.centro, r.eixo, 0.4)];
  for (const s of [-1, 1]) {
    const b = bola(s),
      d = dirPe(s);
    prims.push(...anilhaNoChao(b[0] - d[0] * (dBola - 3), b[2] - d[2] * (dBola - 3)));
  }
  return { esq: r.e, prims, fios: [], cargas: [{ massa, pos: r.centro }], marcas: { halter: r.centro }, };
}

export const goblet: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho, halter: (q) => q.marcas.halter! },
};
