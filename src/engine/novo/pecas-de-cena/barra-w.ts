// Peça de cena: a barra W (curvada, de 12 kg) com anilhas e presilhas, para a rosca com barra W e a rosca Scott.
// Medidas em ../dados/objetos/barra-w.json (Eleiko Curl Bar e Rogue Curl Bar); as anilhas e a presilha são as da barra
// longa (../dados/objetos/barra-longa.json). Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs,
// `barra_w`): a pegada cromada que dobra em W no meio, o rebordo, as mangas mais grossas e as anilhas pretas com aro. O
// cartão de hoje tinha 120 cm (a Eleiko tem 131,6) e a mesma pegada fina da barra longa; a forma da curva (os ângulos)
// continua a dele, porque nenhuma ficha de fabricante lida dá os ângulos.
//
// A barra é um objeto rígido: as duas mãos a seguram e ela se move inteira. Quem chama dá o centro da barra (o ponto da
// linha das mangas no meio dela), a direção dela (de uma ponta à outra) e a direção para onde a curva sai da linha
// (`frente`, perpendicular ao eixo: no plano da curva). Visto nessa direção, as partes inclinadas de fora vão para trás
// quando se anda da manga para o meio, e o trecho reto do meio fica para a frente.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import { obj } from '../tabelas';
import { add, mul, norm, perp } from '../vec';
import type { V3 } from '../vec';
import type { IdAnilha } from './barra-longa';

const w = (id: string) => obj('barraW', id);
const rad = Math.PI / 180;

/** A massa total (barra + anilhas dos dois lados), em kg. */
export const massaDaBarraW = (anilhas: IdAnilha[]) => w('massa') + 2 * anilhas.reduce((s, a) => s + obj(a, 'massa'), 0);

/**
 * A linha da pegada, de uma manga à outra, no plano da curva: cada ponto é [ao longo da barra, para fora da linha das
 * mangas] (cm), do lado de s = −1 ao de s = +1.
 */
export function linhaDaBarraW(): [number, number][] {
  const e = w('entreMangas') / 2,
    a = w('curvaFora'),
    m = w('curvaMeio'),
    d = w('curvaDentro');
  const fundo = -(a - m) * Math.tan(w('anguloFora') * rad);
  const meio = fundo + (m - d) * Math.tan(w('anguloDentro') * rad);
  const metade: [number, number][] = [
    [e, 0],
    [a, 0],
    [m, fundo],
    [d, meio],
  ];
  return [...metade.map(([s, o]) => [-s, o] as [number, number]), ...metade.reverse().map(([s, o]) => [s, o] as [number, number])];
}

/**
 * Onde as mãos seguram na rosca: o meio de cada parte inclinada de fora. `s` e `fora` no mesmo referencial de
 * `linhaDaBarraW` (a mão do lado s = +1; a outra espelha) e a direção da parte inclinada, da manga para o meio.
 */
export function pegadaNaBarraW(): { s: number; fora: number; dir: [number, number] } {
  const a = w('curvaFora'),
    m = w('curvaMeio');
  const fundo = -(a - m) * Math.tan(w('anguloFora') * rad);
  const t = w('anguloFora') * rad;
  return { s: (a + m) / 2, fora: fundo / 2, dir: [-Math.cos(t), -Math.sin(t)] };
}

export interface BarraW {
  /** O centro da barra (na linha das mangas), a direção de uma ponta à outra e a direção para onde a curva sai. */
  centro: V3;
  eixo: V3;
  frente: V3;
  anilhas: IdAnilha[];
}

/** Os pontos 3D da pegada (a linha em W, de uma manga à outra). */
export function pontosDaBarraW(p: BarraW): V3[] {
  const u = norm(p.eixo),
    f = norm(perp(p.frente, u));
  return linhaDaBarraW().map(([s, o]) => add(add(p.centro, mul(u, s)), mul(f, o)));
}

/**
 * A barra W com as anilhas: os volumes para a conferência (cada trecho da pegada, as mangas e cada anilha) e a peça
 * desenhada. `semPresilha` tira as presilhas.
 */
export function barraW(p: BarraW, o: { semPresilha?: boolean } = {}): { prims: Prim[]; peca: PecaPropria } {
  const u = norm(p.eixo),
    f = norm(perp(p.frente, u));
  const P = (d: number) => add(p.centro, mul(u, d));
  const meia = w('comp') / 2,
    entre = w('entreMangas') / 2,
    esp = w('rebordoEsp');
  const linha = pontosDaBarraW(p);
  const rp = w('pegadaDiam') / 2,
    rm = w('mangaDiam') / 2;
  // da face de fora do rebordo para fora: as anilhas, depois a presilha
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
  const prims: Prim[] = [];
  for (let i = 0; i < linha.length - 1; i++) prims.push({ t: 'volume', vol: cilindro(linha[i]!, linha[i + 1]!, rp, rp, f), cls: 'aco', vies: -0.5 });
  for (const s of [-1, 1]) {
    prims.push({ t: 'volume', vol: cilindro(P(s * entre), P(s * meia), rm, rm, f), cls: 'aco', vies: -0.5 });
    for (const an of posAnilhas(s)) prims.push({ t: 'volume', vol: cilindro(an.a, an.b, an.raio, an.raio, f), cls: 'ferro', vies: -0.5 });
  }
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'barra W',
    desenhar(C, M, desenho) {
      const op = { lados: 14, up: f };
      // a pegada em W, um pouco para trás na pintura (as mãos fecham por cima); as juntas arredondadas nas dobras
      // (cada trecho passa um pouco da dobra, para a junta fechar sem vão)
      for (let i = 0; i < linha.length - 1; i++) {
        const a = linha[i]!,
          b = linha[i + 1]!,
          d = norm(add(b, mul(a, -1)));
        const ea = i === 0 ? 0 : rp * 0.7,
          eb = i === linha.length - 2 ? 0 : rp * 0.7;
        C.cilindro(add(a, mul(d, -ea)), add(b, mul(d, eb)), rp, M.cromo, { ...op, lados: 12, dz: 6 });
      }
      // a recartilha: um traço escuro no meio de cada parte inclinada de fora, onde a mão segura (como no cartão da barra longa)
      const L = linhaDaBarraW();
      for (const [i, j] of [
        [1, 2],
        [L.length - 2, L.length - 3],
      ] as const) {
        const a = linha[i]!,
          b = linha[j]!;
        const ab = (t: number) => add(a, mul(add(b, mul(a, -1)), t));
        C.linha(add(ab(0.2), mul(f, rp + 0.02)), add(ab(0.8), mul(f, rp + 0.02)), '#7A818A', 0.8);
      }
      for (const s of [-1, 1]) {
        // o rebordo e a manga
        C.cilindro(P(s * entre), P(s * (entre + esp)), w('rebordoDiam') / 2, M.cromo, op);
        C.cilindro(P(s * (entre + esp)), P(s * meia), rm, M.cromo, op);
        for (const an of posAnilhas(s)) C.anilha(s < 0 ? an.b : an.a, s < 0 ? an.a : an.b, an.raio, M.anilha, { up: f });
        if (!o.semPresilha) {
          const d0 = fimDasAnilhas + 0.3,
            larg = obj('presilha', 'larg');
          C.cilindro(P(s * d0), P(s * (d0 + larg)), rm + 0.7, M.metalClaro, { ...op, lados: 12 });
          const c = P(s * (d0 + larg / 2));
          C.linha(add(c, mul(f, rm + 0.5)), add(c, mul(f, obj('presilha', 'diam'))), M.metalClaro[3], 0.9);
        }
      }
      // a sombra no chão, quando a barra está perto dele (apoiada nas anilhas)
      if (desenho.comSombra && p.centro[1] < 40) C.sombra(p.centro[0], p.centro[2], 16 + Math.abs(u[0]) * meia, 16 + Math.abs(u[2]) * meia, 0.2);
    },
  };
  return { prims, peca };
}
