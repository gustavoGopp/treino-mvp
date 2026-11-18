// Regras medidas do mergulho nas paralelas (../exercicios/mergulho.ts). Recebem os quadros do começo até o fim da
// descida (em cima → embaixo). O limite vem do que a ficha da técnica pede, não do que a pose deu. As regras do corpo
// sustentado pelas mãos (as mãos nas barras, o corpo entre elas, sem balanço) são as de ./pendurado.ts.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS, poseEmPe, resolver } from '../esqueleto';
import type { Esq } from '../esqueleto';
import { bracoAbaixoDaHorizontal } from '../exercicios/mergulho';
import type { Corpo } from '../tabelas';
import { angulo, mul, paraRef, sub } from '../vec';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
/** A inclinação do tórax à frente da vertical, de lado (graus). */
const toraxAFrente = (e: Esq) => angulo([0, 1, 0], [0, e.torax.y[1], e.torax.y[2]]) * (e.torax.y[2] >= 0 ? 1 : -1);
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
/** A coxa e a canela no referencial da bacia (graus, de lado): quanto o quadril e o joelho dobram. */
const pernas = (e: Esq) => ({ quadril: angulo(sub(e.lado.R.joelho, e.lado.R.quadril), mul(e.pelve.y, -1)), joelho: e.lado.R.ang.joelho });

export const REGRAS_MERGULHO: Record<string, Regra> = {
  'mergulho-bracos-estendidos-em-cima': (q) => {
    const c = primeiro(q).esq.lado.R.ang.cotovelo;
    return { medido: `em cima, o cotovelo dobra ${f1(c)}°`, ok: c >= 3 && c <= 15 };
  },
  'mergulho-braco-quase-paralelo-embaixo': (q) => {
    // quase paralelo: o cotovelo chega perto da altura do ombro (até 25° abaixo dela) e não passa dela (o ombro não
    // desce abaixo do cotovelo: "Descer demais")
    const b = bracoAbaixoDaHorizontal(ultimo(q).esq);
    const menor = Math.min(...q.map((x) => bracoAbaixoDaHorizontal(x.esq)));
    const c = ultimo(q).esq.lado.R.ang.cotovelo;
    return { medido: `embaixo, o braço fica ${f1(b)}° abaixo da horizontal (do ombro ao cotovelo; no caminho, no mínimo ${f1(menor)}°) e o cotovelo dobra ${f1(c)}°`, ok: b >= 0 && b <= 25 && menor >= 0 };
  },
  'mergulho-tronco-um-pouco-a-frente': (q) => {
    const a = toraxAFrente(primeiro(q).esq),
      b = toraxAFrente(ultimo(q).esq);
    // levemente: à frente, mas longe de deitar (até 35°)
    return { medido: `o tórax inclina ${f1(a)}° à frente da vertical em cima e ${f1(b)}° embaixo`, ok: b >= 8 && b <= 35 && b >= a };
  },
  'mergulho-ombros-longe-das-orelhas': (q, corpo) => {
    const pe = ombroAOrelhaEmPe(corpo);
    const d = q.map((x) => ombroAOrelha(x.esq));
    const [a] = faixa(d);
    return { medido: `do alto do ombro à base do crânio, ao longo do tronco: no mínimo ${f1(a)} cm no caminho (em pé, parado: ${f1(pe)} cm)`, ok: a >= pe - 1 };
  },
  'mergulho-pernas-paradas': (q) => {
    const p = q.map((x) => pernas(x.esq));
    const [qa, qb] = faixa(p.map((x) => x.quadril)),
      [ja, jb] = faixa(p.map((x) => x.joelho));
    // e os pés não chegam ao chão
    let chao = 1e9;
    for (const x of [primeiro(q), ultimo(q)]) for (const { p: pt, parte } of pontosDoBoneco(x.esq)) if (parte === 'pe') chao = Math.min(chao, pt[1]);
    return { medido: `o quadril fica de ${f1(qa)}° a ${f1(qb)}° e o joelho de ${f1(ja)}° a ${f1(jb)}° (em relação à bacia); o pé fica a no mínimo ${f1(chao)} cm do chão`, ok: qb - qa <= 2 && jb - ja <= 2 && chao >= 3 };
  },
};
