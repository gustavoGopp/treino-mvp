// As regras medidas das pontes de glúteo (com o peso do corpo, com halter e com kettlebell). Medem a superfície do
// Boneco; as que já existem (ombros no chão, em linha no fim, lombar neutra) ficam em ./flexao-joelho.ts e ../conferir.ts.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import { alturaDoHalter, alturaDoKettlebell, canelaDaVertical, pontosOndeACargaApoia } from '../exercicios/ponte';
import { add, dist, mul } from '../vec';

/** O ponto mais baixo (y) de uma parte do Boneco (do lado direito, quando `direito`). */
function maisBaixo(e: Esq, parte: string, direito = false): number {
  let m = 1e9;
  for (const x of pontosDoBoneco(e)) if (x.parte === parte && (!direito || x.p[0] < 0)) m = Math.min(m, x.p[1]);
  return m;
}
/** O ponto do glúteo mais perto dos pés (o maior z) entre os que estão a menos de 8 cm do chão, e o mais de trás do calcanhar. */
function calcanharAoGluteo(e: Esq): number {
  let gl = -1e9,
    ca = 1e9;
  for (const x of pontosDoBoneco(e)) {
    if (x.p[0] > 0) continue;
    if (x.parte === 'pelve' && x.p[1] < 8) gl = Math.max(gl, x.p[2]);
    if (x.parte === 'pe') ca = Math.min(ca, x.p[2]);
  }
  return ca - gl;
}

export const REGRAS_PONTES: Record<string, Regra> = {
  'ponte-quadril-quase-no-chao': (q) => {
    const folga = maisBaixo(q[0]!.esq, 'pelve');
    return { medido: `embaixo, a pele do glúteo fica a ${f1(folga)} cm do chão`, ok: folga >= 0.5 && folga <= 3 };
  },
  'ponte-calcanhares-no-chao': (q) => {
    const pe = q.map((x) => maisBaixo(x.esq, 'pe', true));
    const calc = q.map((x) => x.esq.lado.R.calcanhar[1]);
    const [a, b] = faixa(pe),
      [c, d] = faixa(calc);
    return { medido: `o ponto mais baixo do pé fica de ${f1(a)} a ${f1(b)} cm do chão e o calcanhar (o ponto do osso) de ${f1(c)} a ${f1(d)} cm`, ok: a >= -1.5 && b <= 0.5 && d - c <= 0.3 };
  },
  'ponte-pes-a-um-palmo': (q, corpo) => {
    const ini = q[0]!.esq,
      fim = q[q.length - 1]!.esq;
    const palmo = calcanharAoGluteo(ini);
    const canela = canelaDaVertical(fim);
    const larg = Math.abs(ini.lado.R.tornozelo[0] - ini.lado.L.tornozelo[0]);
    return {
      medido: `embaixo, o calcanhar fica a ${f1(palmo)} cm da pele do glúteo; no topo, a canela fica a ${f1(canela)}° da vertical; os tornozelos a ${f1(larg)} cm um do outro (quadris a ${f1(2 * corpo.m('quadril.meiaDistancia'))} cm)`,
      ok: palmo >= 12 && palmo <= 30 && canela <= 5,
    };
  },
  'ponte-carga-nas-duas-maos': (q) => {
    const d = q.map((x) => Math.max(dist(x.esq.lado.R.pegada, x.marcas.pegaR!), dist(x.esq.lado.L.pegada, x.marcas.pegaL!)));
    const [, b] = faixa(d);
    const entre = dist(q[0]!.marcas.pegaR!, q[0]!.marcas.pegaL!);
    return { medido: `o centro de cada mão fica a no máximo ${f1(b)} cm do ponto da carga que ela segura; as duas pegadas a ${f1(entre)} cm uma da outra`, ok: b <= 0.5 };
  },
  'ponte-carga-no-quadril': (q) => {
    // quanto a carga fica acima (positivo) ou dentro (negativo) do corpo, medida na superfície do Boneco
    const folgas = q.map((x) => {
      const pts = pontosOndeACargaApoia(x.esq);
      if (x.marcas.halter) return x.marcas.halter[1] - alturaDoHalter(pts, x.marcas.halter[2], x.marcas.halter[0]);
      const c = x.marcas.bola!;
      return c[1] - alturaDoKettlebell(pts, c[2], x.marcas.cima!, [1, 0, 0]);
    });
    const [a, b] = faixa(folgas);
    // a carga anda com o quadril: a distância do centro dela ao meio dos dois quadris quase não muda
    const anda = q.map((x) => dist(x.marcas.halter ?? x.marcas.bola!, mul(add(x.esq.lado.R.quadril, x.esq.lado.L.quadril), 0.5)));
    const [c, d] = faixa(anda);
    return { medido: `a carga fica de ${f1(a)} a ${f1(b)} cm acima da barriga, do quadril e das coxas (negativo = dentro); o centro dela fica de ${f1(c)} a ${f1(d)} cm do meio dos dois quadris`, ok: a >= -0.3 && b <= 0.3 && d - c <= 3 };
  },
};
