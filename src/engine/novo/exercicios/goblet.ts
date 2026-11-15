// Agachamento goblet com calcanhar elevado, no motor novo. Os números vêm da ficha (../dados/movimentos/goblet.json).
// O que a animação resolve em cada quadro, em vez de receber pronto: a posição do quadril sai de duas condições,
// a flexão do joelho pedida e o centro de massa (corpo + halter) sobre o meio do pé. A dorsiflexão do tornozelo
// é consequência, e a conferência a compara com a amplitude normal.
import ficha from '../dados/movimentos/goblet.json';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { anilhaNoChao, chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, noRef, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { agachar } from './agachar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const m = (id: string) => corpo.m(id);
  // pés: a bola do pé no chão e o calcanhar sobre a anilha (o pé gira na bola até o calcanhar chegar à altura dela)
  const dBola = m('pe.calcanharABola');
  const calcanhar = Math.asin(obj('anilhaCalcanhar', 'esp') / dBola) / (Math.PI / 180);
  const rb = obj('halter', 'cabecaAltura') / 2,
    ra = obj('halter', 'cabecaLargura') / 2,
    comp = obj('halter', 'comp'),
    cabeca = (comp - obj('halter', 'caboComp')) / 2;
  const massa = f('carga');
  let centro: V3 = [0, 0, 0],
    eixo: V3 = [0, 1, 0];
  const r = agachar(corpo, {
    joelho: mix(f('joelho.cima'), f(erro === 'raso' ? 'erro.raso.joelho' : 'joelho.baixo'), u),
    tronco: mix(f('tronco.cima'), f(erro === 'lombar' ? 'erro.lombar.tronco' : 'tronco.baixo'), u),
    // no erro, a bacia gira para trás (o cóccix vai para baixo) e a lombar dobra
    lombar: erro === 'lombar' ? f('erro.lombar.lombar') * u : 0,
    // o joelho cai para dentro conforme a pessoa desce e fica assim embaixo (é onde o erro mais aparece)
    valgo: erro === 'valgo' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0,
    calcanhar,
    apoio: 'meio',
    pesMeiaDistancia: f('pes.meiaDistancia'),
    pesParaFora: f('pes.paraFora'),
    bracos(t) {
      // o halter fica na vertical do tronco, com a cabeça de cima encostada no alto do peito
      const T = t.torax;
      const frenteAlto = m('prof.peito') * 0.42,
        frenteBaixo = m('prof.peito') * 0.68;
      const topo = noRef(T, [0, -10, frenteAlto + rb + 0.8]),
        baixo = noRef(T, [0, -10 - (comp - cabeca), frenteBaixo + rb + 0.8]);
      eixo = norm(sub(topo, baixo));
      centro = mul(add(topo, baixo), 0.5);
      // As mãos em concha por baixo da cabeça de cima do halter (a ficha da técnica: "mãos em concha embaixo da anilha
      // de cima"): a base da mão fica debaixo da cabeça, perto do cabo, e a mão abre para fora num V, com a quina de
      // baixo da cabeça apoiada na palma; dos nós em diante, os dedos sobem pelo lado da cabeça. A mão fica um pouco
      // girada para a frente, com o polegar do lado do peito.
      const abre = (f('maos.aberturaDaConcha') * Math.PI) / 180,
        gira = (f('maos.giroParaFrente') * Math.PI) / 180;
      const frenteT = dirRef(T, [0, 0, 1]);
      const braco = (k: Lado): PoseBraco => {
        const s = sinal(k);
        const lat = dirRef(T, [s, 0, 0]);
        // "para fora" da mão: o lado do corpo, girado um pouco para a frente
        const fora = norm(add(mul(lat, Math.cos(gira)), mul(frenteT, Math.sin(gira))));
        const dedos = norm(add(mul(eixo, Math.cos(abre)), mul(fora, Math.sin(abre))));
        // a normal da palma aponta para dentro e para cima; a quina de baixo da cabeça encosta no meio da palma
        const normal = norm(add(mul(fora, -Math.cos(abre)), mul(eixo, Math.sin(abre))));
        const quina = add(add(topo, mul(fora, ra)), mul(eixo, -cabeca / 2));
        const palma = add(quina, mul(normal, -f('maos.meiaEspessuraDaPalma')));
        return { punho: add(palma, mul(dedos, -m('mao.punhoAoCentroDaPegada'))), polo: dirRef(T, [s * 0.45, -1, -0.15]), mao: { polegar: norm(add(mul(frenteT, -Math.cos(gira)), mul(lat, Math.sin(gira)))), dedos, forma: 'concha' } };
      };
      return { R: braco('R'), L: braco('L'), carga: { massa, pos: centro } };
    },
  });
  const prims = [chao(-70, 70, -70, 80), ...halter(centro, eixo, 0.4)];
  const pecas: Peca[] = [{ t: 'halter', centro, eixo }];
  for (const s of [-1, 1]) {
    const b = r.bola(s),
      d = r.dirPe(s);
    prims.push(...anilhaNoChao(b[0] - d[0] * (dBola - 3), b[2] - d[2] * (dBola - 3)));
    pecas.push({ t: 'anilha', x: b[0] - d[0] * (dBola - 3), z: b[2] - d[2] * (dBola - 3) });
  }
  return { esq: r.e, prims, pecas, fios: [], cargas: [{ massa, pos: centro }], marcas: { halter: centro } };
}

export const goblet: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho, halter: (q) => q.marcas.halter! },
};
