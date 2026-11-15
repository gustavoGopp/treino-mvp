// Regras medidas da família do apoio no chão (pike e extensão de tríceps com o peso do corpo). Cada uma recebe os
// quadros do começo até o fim da primeira fase com movimento e devolve o que mediu e se confere com o que a ficha da
// técnica pede. O limite vem da ficha, não da pose.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import { angulo, cross, norm, sub } from '../vec';
import type { V3 } from '../vec';

/** O ponto mais baixo da cabeça (superfície do Boneco). */
function baixoDaCabeca(e: Esq): V3 {
  let m: V3 = [0, 1e9, 0];
  for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'cabeca' && p[1] < m[1]) m = p;
  return m;
}
/** Centro da palma: o meio entre o punho e a pegada. */
const palma = (e: Esq, k: 'R' | 'L'): V3 => {
  const L = e.lado[k];
  return [(L.punho[0] + L.pegada[0]) / 2, (L.punho[1] + L.pegada[1]) / 2, (L.punho[2] + L.pegada[2]) / 2];
};
/**
 * Quanto o cotovelo abre para o lado: o ângulo entre o plano do braço (ombro, cotovelo, punho) e o plano do meio do
 * corpo. 0° = o cotovelo vai reto para trás (ou para a frente); 90° = vai todo para o lado.
 */
function aberturaDoCotovelo(e: Esq): number {
  const L = e.lado.R;
  const n = norm(cross(sub(L.cotovelo, L.ombro), sub(L.punho, L.cotovelo)));
  const a = angulo(n, e.torax.x);
  return Math.min(a, 180 - a);
}

export const apoioNoChao: Record<string, Regra> = {
  'quadril-continua-alto': (q) => {
    // o quadril acima dos ombros e os ombros sem passar à frente das mãos (o erro "vira flexão")
    const acima = Math.min(...q.map((x) => x.esq.pelve.o[1] - x.esq.lado.R.ombro[1]));
    const frente = Math.max(...q.map((x) => x.esq.lado.R.ombro[2] - palma(x.esq, 'R')[2]));
    const quad = faixa(q.map((x) => angulosDoLado(x.esq, 'R').quadril));
    return { medido: `o quadril fica no mínimo ${f1(acima)} cm acima dos ombros; os ombros ficam no mínimo ${f1(Math.abs(frente))} cm ${frente <= 0 ? 'atrás' : 'à frente'} do centro das palmas; a flexão do quadril vai de ${f1(quad[1])}° a ${f1(quad[0])}°`, ok: acima > 0 && frente <= 0 };
  },
  'cabeca-desce-entre-as-maos': (q, corpo) => {
    // embaixo: a cabeça perto do chão, entre as mãos e na linha delas (entre o punho e a ponta dos dedos)
    const e = q[q.length - 1]!.esq;
    const h = baixoDaCabeca(e);
    const zPunho = (e.lado.R.punho[2] + e.lado.L.punho[2]) / 2,
      zDedos = zPunho + corpo.m('mao.comp');
    const entre = Math.abs(h[0]) < Math.abs(e.lado.R.punho[0]);
    // nenhum quadro antes: a cabeça não passa para baixo do chão no caminho
    const min = Math.min(...q.map((x) => baixoDaCabeca(x.esq)[1]));
    return { medido: `embaixo, o ponto mais baixo da cabeça fica a ${f1(h[1])} cm do chão, ${f1(h[2] - zPunho)} cm à frente da linha dos punhos (a ponta dos dedos fica a ${f1(zDedos - zPunho)}), ${entre ? 'entre as mãos' : 'FORA do espaço entre as mãos'}; no caminho, nunca abaixo de ${f1(min)} cm`, ok: h[1] >= 3 && h[1] <= 9 && h[2] >= zPunho && h[2] <= zDedos && entre && min >= 3 };
  },
  'pernas-estendidas': (q) => {
    const j = faixa(q.map((x) => Math.max(angulosDoLado(x.esq, 'R').joelho, angulosDoLado(x.esq, 'L').joelho)));
    return { medido: `os joelhos dobram de ${f1(j[0])}° a ${f1(j[1])}°`, ok: j[1] <= 15 };
  },
  'cotovelos-para-tras-a-meio-caminho': (q) => {
    const e = q[q.length - 1]!.esq;
    const a = aberturaDoCotovelo(e);
    // para trás: o cotovelo fica do lado dos pés em relação à linha do ombro ao punho
    const L = e.lado.R;
    const tras = L.cotovelo[2] < L.punho[2];
    return { medido: `embaixo, o plano do braço abre ${f1(a)}° do plano do meio do corpo; o cotovelo aponta ${tras ? 'para trás (para os pés)' : 'para a frente'}`, ok: a >= 30 && a <= 60 && tras };
  },
  // ----- extensão de tríceps -----
  'so-o-cotovelo-dobra': (q) => {
    // corpo reto: ombro, quadril e tornozelo em linha; o que muda no ciclo é o cotovelo
    const lado = (v: V3): V3 => [0, v[1], v[2]];
    const pior = Math.min(...q.map(({ esq }) => angulo(lado(sub(esq.lado.R.ombro, esq.lado.R.quadril)), lado(sub(esq.lado.R.tornozelo, esq.lado.R.quadril)))));
    const cot = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `ombro, quadril e tornozelo fazem no mínimo ${f1(pior)}° (180° = linha reta); o cotovelo dobra de ${f1(cot[0])}° a ${f1(cot[1])}°`, ok: pior >= 170 && cot[1] - cot[0] >= 60 };
  },
  'cotovelos-para-a-frente': (q) => {
    const e = q[q.length - 1]!.esq;
    const a = aberturaDoCotovelo(e);
    return { medido: `embaixo, o plano do braço abre ${f1(a)}° do plano do meio do corpo (0° = cotovelo reto para a frente)`, ok: a <= 20 };
  },
  'testa-perto-do-apoio': (q) => {
    // a menor distância (de lado) da cabeça à bancada embaixo: acima do tampo, a altura sobre ele; antes da beirada, a
    // distância à quina; abaixo do tampo, a distância à frente. `quina` = (0, altura do tampo, beirada)
    const [, yT, zB] = q[0]!.marcas.quina!;
    const d = (e: Esq) => {
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'cabeca') min = Math.min(min, p[2] >= zB ? p[1] - yT : p[1] >= yT ? Math.hypot(p[1] - yT, zB - p[2]) : zB - p[2]);
      return min;
    };
    const fim = d(q[q.length - 1]!.esq);
    const pior = Math.min(...q.map((x) => d(x.esq)));
    return { medido: `embaixo, a cabeça fica a ${f1(fim)} cm da bancada; no caminho, nunca a menos de ${f1(pior)} cm`, ok: fim >= 1 && fim <= 10 && pior >= 1 };
  },
  'braco-acima-da-cabeca': (q) => {
    const e = q[q.length - 1]!.esq;
    const el = angulosDoLado(e, 'R').ombro;
    return { medido: `embaixo, o braço fica elevado ${f1(el)}° em relação ao tronco (180° = na linha do tronco, acima da cabeça)`, ok: el >= 150 };
  },
};
