// Regras medidas do rolamento com a roda abdominal (../exercicios/roda-abdominal.ts). A roda é lida das marcas do
// quadro: `roda` (o centro), `rodaGiro` (o giro, em radianos, no x) e `pegadorR`/`pegadorL` (o centro de cada pegador).
// As regras recebem os quadros da ida (do começo ao ponto mais longe).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS } from '../esqueleto';
import type { Esq } from '../esqueleto';
import { obj } from '../tabelas';
import { dist, dot, norm } from '../vec';

/** O ponto mais baixo (y) de umas partes do Boneco. */
function maisBaixo(e: Esq, partes: string[]): number {
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (partes.includes(parte)) m = Math.min(m, p[1]);
  return m;
}
/** A distância (com sinal: positivo = acima) do meio do quadril à linha do joelho ao ombro, vista de lado. */
function quadrilForaDaLinha(e: Esq): number {
  const j = e.lado.R.joelho,
    o = e.lado.R.ombro,
    q = e.lado.R.quadril;
  const d = norm([0, o[1] - j[1], o[2] - j[2]]);
  const r = [0, q[1] - j[1], q[2] - j[2]] as [number, number, number];
  // a normal "para cima" da linha, no plano de lado
  const n: [number, number, number] = [0, d[2], -d[1]];
  return dot(r, n);
}

export const REGRAS_RODA_ABDOMINAL: Record<string, Regra> = {
  'roda-abdominal-roda-embaixo-dos-ombros': (q) => {
    const x = q[0]!;
    const dz = x.esq.lado.R.ombro[2] - x.marcas.roda![2];
    const cot = Math.max(...LADOS.map((k) => angulosDoLado(x.esq, k).cotovelo));
    return { medido: `no começo, o centro do ombro fica ${f1(Math.abs(dz))} cm ${dz >= 0 ? 'à frente' : 'atrás'} do eixo da roda e o cotovelo dobra ${f1(cot)}°`, ok: Math.abs(dz) <= 4 && cot <= 15 };
  },
  'roda-abdominal-bracos-quase-retos': (q) => {
    const [a, b] = faixa(q.flatMap((x) => LADOS.map((k) => angulosDoLado(x.esq, k).cotovelo)));
    return { medido: `o cotovelo dobra de ${f1(a)}° a ${f1(b)}° na ida`, ok: b <= 15 && b - a <= 3 };
  },
  'roda-abdominal-maos-nos-pegadores': (q) => {
    // o centro de cada mão no eixo do pegador do seu lado, dentro do comprimento dele, e a mão fechada em volta
    const d = q.flatMap((x) => LADOS.map((k) => dist(x.esq.lado[k].pegada, x.marcas[`pegador${k}`]!)));
    const [, b] = faixa(d);
    return { medido: `o centro de cada mão fica a no máximo ${f1(b)} cm do meio do pegador (comprimento do pegador: ${f1(obj('rodaAbdominal', 'pegadorComp'))} cm)`, ok: b <= 0.3 };
  },
  'roda-abdominal-rola-sem-escorregar': (q) => {
    // o giro (marca `rodaGiro`) vezes o raio contra o quanto o centro andou, em cada quadro; o centro fica na altura do raio
    const R = obj('rodaAbdominal', 'diam') / 2;
    const z0 = q[0]!.marcas.roda![2],
      g0 = q[0]!.marcas.rodaGiro![0];
    const erro = Math.max(...q.map((x) => Math.abs((x.marcas.rodaGiro![0] - g0) * R - (x.marcas.roda![2] - z0))));
    const alt = Math.max(...q.map((x) => Math.abs(x.marcas.roda![1] - R)));
    const anda = q[q.length - 1]!.marcas.roda![2] - z0;
    return { medido: `a roda anda ${f1(anda)} cm e gira ${f1(((q[q.length - 1]!.marcas.rodaGiro![0] - g0) * 180) / Math.PI)}°; o arco girado difere do caminho em no máximo ${f1(erro)} cm; o centro fica a ${f1(alt)} cm da altura do raio`, ok: erro <= 0.1 && alt <= 0.1 && anda > 20 };
  },
  'roda-abdominal-quadril-acompanha': (q) => {
    // o quadril vai à frente o caminho todo junto com a roda (nunca para nem volta), e anda uma boa parte do que ela anda
    const zq = q.map((x) => x.esq.pelve.o[2]),
      zr = q.map((x) => x.marcas.roda![2]);
    let sempre = true;
    for (let i = 1; i < q.length; i++) if (zr[i]! > zr[i - 1]! + 0.01 && zq[i]! < zq[i - 1]! + 0.001) sempre = false;
    const parte = (zq[zq.length - 1]! - zq[0]!) / (zr[zr.length - 1]! - zr[0]!);
    return { medido: `o quadril anda ${f1(zq[zq.length - 1]! - zq[0]!)} cm à frente enquanto a roda anda ${f1(zr[zr.length - 1]! - zr[0]!)} cm (${f1(parte * 100)}%); ${sempre ? 'vai à frente o caminho todo' : 'para ou volta em algum trecho'}`, ok: sempre && parte >= 0.3 };
  },
  'roda-abdominal-lombar-nao-afunda': (q) => {
    // a lombar nunca mais curvada que em pé (a pose a soma à curva de quem está em pé; negativo = afunda)
    const [a, b] = faixa(q.map((x) => x.esq.pose.lombar ?? 0));
    return { medido: `a lombar fica de ${f1(a)}° a ${f1(b)}° em relação à curva de quem está em pé (negativo = afunda)`, ok: a >= 0 };
  },
  'roda-abdominal-corpo-reto-no-fim': (q) => {
    const e = q[q.length - 1]!.esq;
    const o = e.lado.R.ombro,
      j = e.lado.R.joelho;
    const ang = (Math.atan2(o[1] - j[1], o[2] - j[2]) * 180) / Math.PI;
    const fora = quadrilForaDaLinha(e);
    return { medido: `no ponto mais longe, a linha dos joelhos aos ombros fica a ${f1(ang)}° do chão e o quadril, ${f1(Math.abs(fora))} cm ${fora >= 0 ? 'acima' : 'abaixo'} dela; o quadril dobra ${f1(angulosDoLado(e, 'R').quadril)}°`, ok: Math.abs(ang - 37) <= 3 && Math.abs(fora) <= 4 };
  },
  'roda-abdominal-rosto-e-peito-longe-do-chao': (q) => {
    const cab = Math.min(...q.map((x) => maisBaixo(x.esq, ['cabeca'])));
    const tronco = Math.min(...q.map((x) => maisBaixo(x.esq, ['tronco', 'pescoco'])));
    return { medido: `o ponto mais baixo da cabeça fica a ${f1(cab)} cm do chão; o do peito e da barriga, a ${f1(tronco)} cm`, ok: cab >= 5 && tronco >= 5 };
  },
};
