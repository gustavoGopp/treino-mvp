// Regras medidas do coice na máquina de glúteo (../exercicios/coice-maquina.ts, a máquina em
// ../pecas-de-cena/gluteo-maquina.ts). O caminho da coxa e o quadril que não gira são medidos pelas regras dos coices em
// quatro apoios (./quatro-apoios.ts), com os mesmos ids. Marcas que os quadros dão: `eixo` (o centro do eixo da
// alavanca), `plataforma`, `plataformaNormal` e `plataformaAo` (o centro da face da plataforma, a direção dela para o
// pé e a direção ao longo dela), `pilha` (quanto as placas subiram, em y), `alavanca` (o ângulo da alavanca agora, o do
// começo e a distância do eixo à plataforma), `joelheira` (o topo da almofada dos joelhos, em y) e `apoio` (o meio dos
// apoios dos antebraços para o lado, em x, e o topo deles, em y).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { dist, dot, sub } from '../vec';

const rad = Math.PI / 180;
const g = (id: string) => obj('gluteoMaquina', id);

/** A pele do pé direito contra a face da plataforma: a mais funda (negativo = dentro) e a mais longe, só sobre ela. */
function solaNaPlataforma(q: Quadro) {
  const c = q.marcas.plataforma!,
    n = q.marcas.plataformaNormal!,
    ao = q.marcas.plataformaAo!;
  let fundo = 1e9;
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if (parte !== 'pe' || p[0] > 0) continue;
    const v = sub(p, c);
    if (Math.abs(dot(v, ao)) > g('plataformaComp') / 2 || Math.abs(v[0]) > g('plataformaLarg') / 2) continue;
    fundo = Math.min(fundo, dot(v, n));
  }
  return fundo;
}

export const REGRAS_COICE_MAQUINA: Record<string, Regra> = {
  'coice-maquina-apoios': (q) => {
    const x0 = q[0]!;
    // o joelho de apoio na almofada: o ponto mais baixo da perna esquerda perto do joelho
    const joelho = faixa(
      q.map((x) => {
        let m = 1e9;
        for (const { p, parte } of pontosDoBoneco(x.esq)) if ((parte === 'canela' || parte === 'coxa') && p[0] > 0 && dist(p, x.esq.lado.L.joelho) < 8) m = Math.min(m, p[1]);
        return m - x.marcas.joelheira![1];
      }),
    );
    // os antebraços nos apoios: o ponto mais baixo de cada antebraço sobre o apoio dele
    const ante = faixa(
      q.map((x) => {
        const [fora, topo] = x.marcas.apoio!;
        let m = 1e9;
        for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'ante' && Math.abs(Math.abs(p[0]) - fora) <= g('antebracoLarg') / 2) m = Math.min(m, p[1] - topo);
        return m;
      }),
    );
    const cot = Math.max(...(['R', 'L'] as const).map((k) => Math.hypot(x0.esq.lado[k].cotovelo[0] - x0.esq.lado[k].ombro[0], x0.esq.lado[k].cotovelo[2] - x0.esq.lado[k].ombro[2])));
    const maos = Math.max(...q.map((x) => Math.max(dist(x.esq.lado.R.pegada, x0.esq.lado.R.pegada), dist(x.esq.lado.L.pegada, x0.esq.lado.L.pegada))));
    const eixo = Math.max(...q.map((x) => Math.hypot(x.esq.lado.R.quadril[1] - x.marcas.eixo![1], x.esq.lado.R.quadril[2] - x.marcas.eixo![2])));
    const costas = Math.asin((x0.esq.torax.o[1] - x0.esq.pelve.o[1]) / dist(x0.esq.torax.o, x0.esq.pelve.o)) / rad;
    return {
      medido: `o joelho de apoio fica de ${f1(joelho[0])} a ${f1(joelho[1])} cm do topo da almofada; os antebraços, de ${f1(ante[0])} a ${f1(ante[1])} cm do topo dos apoios (negativo = afunda no estofado), com o cotovelo a ${f1(cot)} cm da vertical do ombro; as mãos andam ${f1(maos)} cm (nos pegadores); o centro do quadril direito fica a no máximo ${f1(eixo)} cm da linha do eixo; a linha dos ombros ao quadril sobe ${f1(costas)}° à frente`,
      ok: joelho[0] >= -2.5 && joelho[1] <= 1 && ante[0] >= -2.5 && ante[1] <= 1 && cot <= 6 && maos <= 0.1 && eixo <= 0.5,
    };
  },
  'coice-maquina-sola-na-plataforma': (q) => {
    const [a, b] = faixa(q.map(solaNaPlataforma));
    const [r0, r1] = faixa(q.map((x) => Math.hypot(x.marcas.plataforma![1] - x.marcas.eixo![1], x.marcas.plataforma![2] - x.marcas.eixo![2])));
    return {
      medido: `a pele da sola fica de ${f1(a)} a ${f1(b)} cm da face da plataforma (negativo = afunda na borracha); a plataforma fica de ${f1(r0)} a ${f1(r1)} cm do eixo (a alavanca não estica)`,
      ok: a >= -1 && b <= 0.5 && r1 - r0 <= 0.1,
    };
  },
  'coice-maquina-pilha-sobe-com-a-alavanca': (q) => {
    const rC = g('cameDiam') / 2;
    const coxa = (x: Quadro) => {
      const d = sub(x.esq.lado.R.joelho, x.esq.lado.R.quadril);
      return Math.atan2(-d[2], -d[1]) / rad;
    };
    const c0 = coxa(q[0]!);
    let gira = 0,
      pilha = 0,
      sobe = 0;
    for (const x of q) {
      const [a, a0] = x.marcas.alavanca!;
      gira = Math.max(gira, Math.abs(a - a0 - (coxa(x) - c0)));
      pilha = Math.max(pilha, Math.abs(x.marcas.pilha![1] - Math.max(0, a - a0) * rad * rC));
      sobe = Math.max(sobe, x.marcas.pilha![1]);
    }
    return {
      medido: `a alavanca gira com a coxa (diferença máxima de ${f1(gira)}°); as placas sobem até ${f1(sobe)} cm, a no máximo ${f1(pilha)} cm do arco do came (raio de ${f1(rC)} cm × ângulo)`,
      ok: gira <= 0.5 && pilha <= 0.1 && sobe > 5,
    };
  },
};
