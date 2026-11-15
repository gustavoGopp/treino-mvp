// Agachamento com o peso do corpo, no motor novo. Os números vêm da ficha
// (../dados/movimentos/agachamento-peso-corpo.json). É o goblet sem o halter e sem a anilha: os calcanhares ficam no
// chão e os braços vão estendidos à frente, na altura dos ombros, como contrapeso (ficha da técnica).
import ficha from '../dados/movimentos/agachamento-peso-corpo.json';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { mix, norm } from '../vec';
import { agachar } from './agachar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  // o calcanhar sai do chão conforme a pessoa desce e fica assim embaixo
  const calcanhar = erro === 'calcanhar' ? f('erro.calcanhar.sobe') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0;
  const r = agachar(corpo, {
    joelho: mix(f('joelho.cima'), f(erro === 'raso' ? 'erro.raso.joelho' : 'joelho.baixo'), u),
    tronco: mix(f('tronco.cima'), f('tronco.baixo'), u),
    lombar: 0,
    valgo: erro === 'valgo' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0,
    calcanhar,
    apoio: calcanhar > 4 ? 'bola' : 'meio',
    pesMeiaDistancia: f('pes.meiaDistancia'),
    pesParaFora: f('pes.paraFora'),
    bracos() {
      // braços estendidos à frente, na horizontal (na altura dos ombros), com as mãos se aproximando; palmas para baixo
      const dentro = f('bracos.paraDentro') * rad,
        cot = f('cotovelo') * rad;
      const braco = (k: Lado): PoseBraco => {
        const s = sinal(k);
        return { umero: norm([-s * Math.sin(dentro), 0, Math.cos(dentro)]), antebraco: norm([-s * Math.sin(dentro + cot), 0, Math.cos(dentro + cot)]), polo: [s * 0.3, -1, 0], mao: { polegar: [-s, 0, 0], forma: 'relaxada' } };
      };
      return { R: braco('R'), L: braco('L') };
    },
  });
  return { esq: r.e, prims: [chao(-70, 70, -70, 110)], pecas: [], fios: [], cargas: [], marcas: {} };
}

export const agachamentoPesoCorpo: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // os mesmos do goblet: é o que a biblioteca conta (quadríceps; glúteos e adutores)
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho },
};
