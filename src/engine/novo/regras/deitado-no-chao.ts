// As regras medidas dos exercícios deitado de costas no colchonete com halteres (o supino no chão e o tríceps testa).
// Medem a superfície do Boneco. O colchonete vem na marca `colchonete` do quadro (o meio do tampo).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { folgaDoBracoAoChao, folgaDoHalterACabeca, folgaDoHalterAoChao, piso } from '../exercicios/deitado-no-chao-halteres';
import type { Quadro } from '../movimento';
import { angulo, dist, sub } from '../vec';

const zCol = (q: Quadro) => q.marcas.colchonete?.[2] ?? 0;

export const regrasDoDeitadoNoChao: Record<string, Regra> = {
  'braco-encosta-de-leve-no-chao': (q) => {
    const fim = q[q.length - 1]!;
    const embaixo = folgaDoBracoAoChao(fim.esq, 'R', zCol(fim));
    // no caminho todo, o braço não entra no chão (a pele amassa no máximo meio centímetro)
    const pior = Math.min(...q.filter((_, i) => i % 6 === 0 || i === q.length - 1).map((x) => folgaDoBracoAoChao(x.esq, 'R', zCol(x))));
    return { medido: `embaixo, a pele da parte de trás do braço fica a ${f1(embaixo)} cm do chão; no caminho, no mínimo a ${f1(pior)} cm`, ok: embaixo >= -0.5 && embaixo <= 0.5 && pior >= -0.5 };
  },
  'costas-e-quadril-no-colchonete': (q) => {
    const P = piso();
    let pior = 0;
    const partes: Record<string, number> = {};
    for (const x of q.filter((_, i) => i % 10 === 0)) {
      const m: Record<string, number> = { tronco: 1e9, pelve: 1e9, cabeca: 1e9 };
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte in m) m[parte] = Math.min(m[parte]!, p[1] - P);
      for (const [k, v] of Object.entries(m)) {
        partes[k] = Math.max(partes[k] ?? -1e9, Math.abs(v));
        pior = Math.max(pior, Math.abs(v));
      }
    }
    return { medido: `costas, glúteo e cabeça ficam a até ${f1(pior)} cm do tampo do colchonete (costas ${f1(partes.tronco!)}, glúteo ${f1(partes.pelve!)}, cabeça ${f1(partes.cabeca!)})`, ok: pior <= 1 };
  },
  /* ---------------- tríceps testa ---------------- */
  'so-o-cotovelo-dobra-no-testa': (q) => {
    const c0 = q[0]!.esq.lado.R.cotovelo;
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.R.cotovelo, c0)));
    const vert = Math.max(...q.map((x) => angulo(sub(x.esq.lado.R.cotovelo, x.esq.lado.R.ombro), [0, 1, 0])));
    const flex = q.map((x) => angulosDoLado(x.esq, 'R').cotovelo);
    return { medido: `o cotovelo anda no máximo ${f1(anda)} cm; o braço fica a ${f1(vert)}° da vertical; o cotovelo dobra de ${f1(Math.min(...flex))}° a ${f1(Math.max(...flex))}°`, ok: anda <= 0.5 && vert <= 20 };
  },
  'pegada-neutra-no-testa': (q) => {
    const pior = Math.max(...q.map((x) => Math.abs(angulosDoLado(x.esq, 'R').pronacao)));
    return { medido: `o antebraço fica no máximo ${f1(pior)}° fora da posição neutra (polegar para a cabeça, palmas uma para a outra)`, ok: pior <= 5 };
  },
  'halteres-ao-lado-da-cabeca': (q) => {
    const fim = q[q.length - 1]!.esq;
    const R = fim.lado.R;
    let z0 = 1e9,
      z1 = -1e9;
    for (const { p, parte } of pontosDoBoneco(fim)) {
      if (parte !== 'cabeca') continue;
      z0 = Math.min(z0, p[2]);
      z1 = Math.max(z1, p[2]);
    }
    const ladoDaCabeca = R.pegada[2] >= z0 && R.pegada[2] <= z1;
    const amostra = q.filter((_, i) => i % 8 === 0 || i === q.length - 1);
    const rosto = Math.min(...amostra.map((x) => folgaDoHalterACabeca(x.esq, x.esq.lado.R.pegada, x.esq.lado.R.mao.x, 'halterLeve')));
    const chao = Math.min(...amostra.map((x) => folgaDoHalterAoChao(x.esq.lado.R.pegada, x.esq.lado.R.mao.x, 'halterLeve', zCol(x))));
    return {
      medido: `embaixo, o meio do halter fica ${ladoDaCabeca ? 'ao lado da cabeça' : 'fora da cabeça'} (z ${f1(R.pegada[2])}; a cabeça vai de ${f1(z0)} a ${f1(z1)}); no ciclo, o halter passa no mínimo a ${f1(rosto)} cm da cabeça e a ${f1(chao)} cm do colchonete`,
      ok: ladoDaCabeca && rosto >= 3 && chao >= 1,
    };
  },
};
