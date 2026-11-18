// Regras medidas da barra fixa só na descida (../exercicios/barra-fixa-negativa.ts). Recebem os quadros do começo até
// o fim da descida (em cima → braços estendidos), a 60 quadros por segundo. O limite vem do que a ficha da técnica e o
// cartão pedem, não do que a pose deu. As regras do corpo pendurado (as mãos na barra, o corpo sem atravessá-la, sem
// balanço) e a da pegada pronada são as de ./pendurado.ts.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS, poseEmPe, resolver } from '../esqueleto';
import type { Esq } from '../esqueleto';
import type { Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { dist, dot, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a),
    ap = sub(p, a);
  const t = Math.max(0, Math.min(1, dot(ap, ab) / dot(ab, ab)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** A distância (cm), ao longo do tronco, do alto do ombro (a ponta da clavícula) à base do crânio: pequena = ombro na orelha. */
const ombroAOrelha = (e: Esq) => Math.min(...LADOS.map((k) => paraRef(e.torax, e.cabeca.o)[1] - paraRef(e.torax, e.lado[k].acromioclavicular)[1]));
const EM_PE = new WeakMap<Corpo, number>();
function ombroAOrelhaEmPe(corpo: Corpo): number {
  let d = EM_PE.get(corpo);
  if (d === undefined) {
    d = ombroAOrelha(resolver(corpo, poseEmPe(corpo)));
    EM_PE.set(corpo, d);
  }
  return d;
}
/** Quanto um ponto fica fora da caixa (cm; zero ou negativo = encosta ou entra nela). */
function foraDaCaixa(p: V3, q: Quadro): number {
  const a = q.marcas['caixa.min']!,
    b = q.marcas['caixa.max']!;
  const d = [0, 1, 2].map((i) => Math.max(a[i]! - p[i]!, 0, p[i]! - b[i]!));
  const fora = Math.hypot(...d);
  if (fora > 0) return fora;
  return -Math.min(...[0, 1, 2].map((i) => Math.min(p[i]! - a[i]!, b[i]! - p[i]!)));
}

export const REGRAS_BARRA_FIXA_NEGATIVA: Record<string, Regra> = {
  'barra-negativa-comeca-em-cima': (q) => {
    const x = primeiro(q);
    const r = x.marcas.raio![0];
    const qx = x.marcas.queixo![1] - (x.marcas['barra.R']![1] + r);
    const c = x.esq.lado.R.ang.cotovelo;
    // o peito perto da barra: a menor distância da pele do tronco ao eixo da barra, menos o raio
    let peito = 1e9;
    for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'tronco') peito = Math.min(peito, aoSegmento(p, x.marcas['eixo.a']!, x.marcas['eixo.b']!) - r);
    return { medido: `em cima, o queixo fica ${f1(Math.abs(qx))} cm ${qx >= 0 ? 'acima' : 'abaixo'} do alto da barra, o cotovelo dobra ${f1(c)}° e o peito fica a ${f1(peito)} cm da barra`, ok: qx >= 0 && c >= 90 && peito <= 12 };
  },
  'barra-negativa-desce-devagar': (q) => {
    // o tempo em que o queixo desce (os quadros em que ele se move), a 60 quadros por segundo
    let n = 0;
    for (let i = 1; i < q.length; i++) if (Math.abs(q[i]!.marcas.queixo![1] - q[i - 1]!.marcas.queixo![1]) > 1e-6) n++;
    const desce = primeiro(q).marcas.queixo![1] - ultimo(q).marcas.queixo![1];
    return { medido: `o queixo desce ${f1(desce)} cm em ${f1(n / 60)} s`, ok: n / 60 >= 3 && n / 60 <= 5 };
  },
  'barra-negativa-ate-os-bracos-estenderem': (q) => {
    const c = ultimo(q).esq.lado.R.ang.cotovelo;
    return { medido: `no fim da descida, o cotovelo dobra ${f1(c)}°`, ok: c <= 15 };
  },
  'barra-negativa-ombros-longe-das-orelhas': (q, corpo) => {
    const pe = ombroAOrelhaEmPe(corpo);
    const [a] = faixa(q.map((x) => ombroAOrelha(x.esq)));
    const [e0, e1] = faixa(q.map((x) => x.esq.lado.R.ang.claviculaElev));
    return { medido: `do alto do ombro à base do crânio, ao longo do tronco: no mínimo ${f1(a)} cm na descida (em pé, parado: ${f1(pe)} cm); a clavícula fica de ${f1(e0)}° a ${f1(e1)}° de elevação`, ok: a >= pe - 1 };
  },
  'barra-negativa-pes-fora-da-caixa': (q) => {
    // nenhum ponto das pernas encosta na caixa na descida (os pés saem dela em cima e só voltam na volta)
    let min = 1e9,
      parte = '';
    q.forEach((x, i) => {
      if (i % 3 && i !== q.length - 1) return;
      for (const { p, parte: pt } of pontosDoBoneco(x.esq)) {
        if (pt !== 'pe' && pt !== 'canela' && pt !== 'coxa') continue;
        const d = foraDaCaixa(p, x);
        if (d < min) {
          min = d;
          parte = pt;
        }
      }
    });
    return { medido: `na descida, as pernas ficam a no mínimo ${f1(min)} cm da caixa (${parte})`, ok: min >= 2 };
  },
};
