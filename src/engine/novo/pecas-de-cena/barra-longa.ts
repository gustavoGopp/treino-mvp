// Peça de cena: a barra longa (olímpica, de 20 kg) com anilhas e presilhas, para os exercícios com barra (supino,
// agachamento, terra romeno, remada, desenvolvimento, hip thrust). Medidas em ../dados/objetos/barra-longa.json (IWF e
// IPF). Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `barra_longa`): a pegada cromada com
// as marcas da recartilha, o rebordo, as mangas mais grossas e as anilhas pretas com aro; o cartão de hoje tinha a
// pegada 7% a 10% mais fina e a seção entre as mangas 4% mais longa que a norma (diagnóstico de 14/11/2026).
//
// A barra é um objeto rígido: as duas mãos a seguram e ela se move inteira. Quem chama dá o centro da barra e a direção
// dela (de uma ponta à outra); as anilhas encostam no rebordo, a primeira (a mais pesada) por dentro.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import { obj } from '../tabelas';
import { add, mul, norm } from '../vec';
import type { V3 } from '../vec';

const b = (id: string) => obj('barraLonga', id);
/** Os ids das anilhas da tabela de objetos, da mais pesada à mais leve. */
export type IdAnilha = 'anilha20' | 'anilha10' | 'anilha5';

/** A massa total (barra + anilhas dos dois lados), em kg. */
export const massaDaBarra = (anilhas: IdAnilha[]) => b('massa') + 2 * anilhas.reduce((s, a) => s + obj(a, 'massa'), 0);
/** Raio da pegada (onde a mão fecha). */
export const raioDaPegada = () => b('pegadaDiam') / 2;
/** O raio da maior anilha (quanto a barra fica acima do chão quando apoiada nas anilhas). */
export const raioDaAnilhaMaior = (anilhas: IdAnilha[]) => Math.max(...anilhas.map((a) => obj(a, 'diam') / 2), b('mangaDiam') / 2);

export interface BarraLonga {
  /** O centro da barra e a direção de uma ponta à outra (do lado esquerdo ao direito, ou o contrário: tanto faz). */
  centro: V3;
  eixo: V3;
  anilhas: IdAnilha[];
}

/**
 * A barra com as anilhas: os volumes para a conferência (a pegada, as mangas e cada anilha, para medir se o corpo os
 * atravessa) e a peça desenhada. `semPresilha` tira as presilhas (no cartão de equipamento elas aparecem).
 */
export function barraLonga(p: BarraLonga, o: { semPresilha?: boolean; dica?: V3 } = {}): { prims: Prim[]; peca: PecaPropria } {
  const u = norm(p.eixo);
  const P = (d: number) => add(p.centro, mul(u, d));
  const meia = b('comp') / 2,
    entre = b('entreMangas') / 2,
    esp = b('rebordoEsp');
  // da face interna do rebordo para fora: rebordo, anilhas, presilha
  const posAnilhas = (s: number) => {
    let d = entre + esp;
    return p.anilhas.map((a) => {
      const e = obj(a, 'esp');
      const r = { id: a, a: P(s * d), b: P(s * (d + e)), raio: obj(a, 'diam') / 2 };
      d += e;
      return r;
    });
  };
  const fimDasAnilhas = entre + esp + p.anilhas.reduce((s, a) => s + obj(a, 'esp'), 0);
  const prims: Prim[] = [{ t: 'volume', vol: cilindro(P(-entre), P(entre), b('pegadaDiam') / 2, b('pegadaDiam') / 2, o.dica), cls: 'aco', vies: -0.5 }];
  for (const s of [-1, 1]) {
    prims.push({ t: 'volume', vol: cilindro(P(s * entre), P(s * meia), b('mangaDiam') / 2, b('mangaDiam') / 2, o.dica), cls: 'aco', vies: -0.5 });
    for (const an of posAnilhas(s)) prims.push({ t: 'volume', vol: cilindro(an.a, an.b, an.raio, an.raio, o.dica), cls: 'ferro', vies: -0.5 });
  }
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'barra longa',
    desenhar(C, M, desenho) {
      const op = { lados: 14, ...(o.dica ? { up: o.dica } : {}) };
      // a pegada, um pouco para trás na pintura (as mãos fecham por cima), com as marcas usinadas a 81 cm
      C.cilindro(P(-entre), P(entre), b('pegadaDiam') / 2, M.cromo, { ...op, dz: 6 });
      // a recartilha: um traço escuro em cima da pegada, das marcas usinadas (81 cm) até perto do rebordo, como no cartão
      const mm = b('marcasEntre') / 2,
        cima = o.dica ? norm(o.dica) : ([0, 1, 0] as V3);
      for (const s of [-1, 1]) C.linha(add(P(s * (mm - 18)), mul(cima, b('pegadaDiam') / 2 + 0.02)), add(P(s * (mm + 10)), mul(cima, b('pegadaDiam') / 2 + 0.02)), '#7A818A', 0.9);
      for (const s of [-1, 1]) {
        // o rebordo e a manga
        C.cilindro(P(s * entre), P(s * (entre + esp)), b('rebordoDiam') / 2, M.cromo, op);
        C.cilindro(P(s * (entre + esp)), P(s * meia), b('mangaDiam') / 2, M.cromo, op);
        for (const an of posAnilhas(s)) C.anilha(s < 0 ? an.b : an.a, s < 0 ? an.a : an.b, an.raio, M.anilha, o.dica ? { up: o.dica } : {});
        if (!o.semPresilha) {
          const d0 = fimDasAnilhas + 0.3,
            larg = obj('presilha', 'larg');
          C.cilindro(P(s * d0), P(s * (d0 + larg)), b('mangaDiam') / 2 + 0.7, M.metalClaro, { ...op, lados: 12 });
          // as duas alças da mola, para fora da barra
          const lado = o.dica ? norm(o.dica) : ([0, 1, 0] as V3);
          const c = P(s * (d0 + larg / 2));
          C.linha(add(c, mul(lado, b('mangaDiam') / 2 + 0.5)), add(c, mul(lado, obj('presilha', 'diam'))), M.metalClaro[3], 0.9);
        }
      }
      // a sombra no chão, quando a barra está perto dele (apoiada nas anilhas)
      if (desenho.comSombra && p.centro[1] < 40) C.sombra(p.centro[0], p.centro[2], 22 + Math.abs(u[0]) * meia, 22 + Math.abs(u[2]) * meia, 0.2);
    },
  };
  return { prims, peca };
}
