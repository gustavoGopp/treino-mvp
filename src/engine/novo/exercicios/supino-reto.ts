// Supino reto com halteres, no motor novo. O corpo deita no banco da tabela de objetos; os pés ficam presos no chão;
// o braço gira num plano a tantos graus do tronco quanto a ficha pede, e o antebraço fica sempre na vertical.
import ficha from '../dados/movimentos/supino-reto.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { bancoReto, chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { mix, norm } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const m = (id: string) => corpo.m(id);
  const alt = obj('bancoReto', 'altura');
  // deitado: o tronco aponta para −z (a cabeça), a frente do corpo para cima; a nádega apoia no banco
  const zPelve = 24;
  const pelve: V3 = [0, alt + m('prof.nadega') * 0.47, zPelve];
  const escapErro = erro === 'escap' ? (1 - u) * (1 - u) : 0;
  const t = resolverTronco(corpo, { pelve, frente: -88, lombar: -4, cervical: 6, cabeca: 4 });
  const a = mix(f('cotovelos.doTronco'), erro === 'cot' ? f('erro.cot.doTronco') : f('cotovelos.doTronco'), Math.min(1, u * 1.5)) * rad;
  const eps = mix(f('braco.cima'), erro === 'curta' ? f('erro.curta.braco') : f('braco.baixo'), u) * rad;
  const giro = f('pegada.giro') * rad;
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // direção do braço: no plano vertical que faz o ângulo `a` com o tronco (que aponta para os pés, +z)
    const umero: V3 = [s * Math.cos(eps) * Math.sin(a), Math.sin(eps), Math.cos(eps) * Math.cos(a)];
    return { umero, antebraco: [0, 1, 0], polo: [s * Math.sin(a), -0.2, Math.cos(a)], mao: { polegar: norm([-s * Math.cos(giro), 0, -Math.sin(giro)]), forma: 'pegada', diam: obj('halter', 'caboDiam') }, prot: -f('escapula.retracao') + escapErro * f('erro.escap.protracao'), elev: -f('escapula.depressao') + escapErro * 5 };
  };
  const w = f('pes.meiaDistancia');
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, zPelve + m('coxa.comp') + 9], dir: [sinal(k) * 0.2, 0, 1] }, polo: [sinal(k) * 0.35, 1, 0.4] });
  const e = resolverMembros(t, { R: braco('R'), L: braco('L') }, { R: perna('R'), L: perna('L') });
  const prims = [chao(-90, 90, -90, 130), ...bancoReto(0, zPelve - obj('bancoReto', 'comp') / 2 + 22)];
  const pecas: Peca[] = [{ t: 'bancoReto', x0: 0, z0: zPelve - obj('bancoReto', 'comp') / 2 + 22 }];
  const cargas = [];
  for (const k of ['R', 'L'] as Lado[]) {
    const L = e.lado[k];
    prims.push(...halter(L.pegada, L.mao.x, 0.2));
    pecas.push({ t: 'halter', centro: L.pegada, eixo: L.mao.x });
    cargas.push({ massa: f('carga'), pos: L.pegada });
  }
  return { esq: e, prims, pecas, fios: [], cargas, marcas: { halter: e.lado.R.pegada }, vies: { maoR: 1, maoL: 1 } };
}

export const supinoReto: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  papeis: { peitoral: 'p', deltoide: 's', triceps: 's' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
