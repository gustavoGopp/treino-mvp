// As regras medidas das flexões de joelho deitado (deslizante, com elástico e, depois, na suspensão). Cada uma mede a
// superfície do Boneco (e não a aproximação que o núcleo usa para pôr o corpo no chão).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import { obj } from '../tabelas';
import { angulo, dist, dot, sub } from '../vec';
import type { V3 } from '../vec';

/** O ponto mais baixo (y) de cada parte do Boneco. */
function maisBaixos(e: Esq): Record<string, number> {
  const out: Record<string, number> = {};
  for (const { p, parte } of pontosDoBoneco(e)) out[parte] = Math.min(out[parte] ?? 1e9, p[1]);
  return out;
}
const lado = (v: V3): V3 => [0, v[1], v[2]];
/** De lado, o ângulo no quadril entre o ombro e o joelho (180 = em linha). */
const linhaOmbroJoelho = (e: Esq) => angulo(lado(sub(e.lado.R.ombro, e.lado.R.quadril)), lado(sub(e.lado.R.joelho, e.lado.R.quadril)));
/** O ponto mais baixo do pé direito, em cm. */
function peMaisBaixo(e: Esq): number {
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pe' && p[0] < 0) m = Math.min(m, p[1]);
  return m;
}

export const REGRAS_FLEXAO_JOELHO: Record<string, Regra> = {
  'quadril-fora-do-chao': (q) => {
    const [a, b] = faixa(q.map((x) => maisBaixos(x.esq).pelve!));
    return { medido: `a pele do glúteo fica de ${f1(a)} a ${f1(b)} cm do chão`, ok: a >= 1 };
  },
  'ombros-e-cabeca-no-chao': (q) => {
    // com um colchonete sob os ombros (marca `piso`), mede-se a partir do tampo dele
    const m = q.map((x) => maisBaixos(x.esq));
    const piso = q[0]!.marcas.piso?.[1] ?? 0;
    const [ta, tb] = faixa(m.map((x) => x.tronco! - piso)),
      [ca, cb] = faixa(m.map((x) => x.cabeca! - piso));
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.R.ombro, q[0]!.esq.lado.R.ombro)));
    return {
      medido: `o ponto mais baixo das costas fica de ${f1(ta)} a ${f1(tb)} cm do chão e o da cabeça de ${f1(ca)} a ${f1(cb)} cm; o centro do ombro anda ${f1(anda)} cm`,
      ok: ta >= -1.5 && tb <= 1 && ca >= -1.5 && cb <= 1 && anda <= 2,
    };
  },
  'em-linha-no-fim': (q) => {
    const fim = q[q.length - 1]!.esq;
    return { medido: `no fim, de lado, ombro, quadril e joelho fazem ${f1(linhaOmbroJoelho(fim))}° (180° = em linha); o joelho dobra ${f1(angulosDoLado(fim, 'R').joelho)}°`, ok: linhaOmbroJoelho(fim) >= 170 };
  },
  'calcanhar-desliza-no-apoio': (q) => {
    // o pé fica apoiado no tampo da toalha (que anda com ele), e o calcanhar só anda na direção do corpo
    const folgas = q.map((x) => peMaisBaixo(x.esq) - x.marcas.apoio![1]);
    const [a, b] = faixa(folgas);
    const c = q.map((x) => x.marcas.calcanhar!);
    const [z0, z1] = faixa(c.map((p) => p[2])),
      [x0, x1] = faixa(c.map((p) => p[0]));
    const fim = q[q.length - 1]!.esq;
    const aoQuadril = c[c.length - 1]![2] - fim.lado.R.quadril[2];
    return {
      medido: `o pé fica de ${f1(a)} a ${f1(b)} cm do tampo da toalha; o calcanhar desliza ${f1(z1 - z0)} cm na direção do corpo (${f1(x1 - x0)} cm para o lado) e termina ${f1(aoQuadril)} cm à frente do centro do quadril`,
      ok: a >= -1 && b <= 1 && x1 - x0 <= 0.5 && z1 - z0 >= 20,
    };
  },
  // ----- na fita de suspensão -----
  'flexao-joelho-ombros-no-colchonete': (q) => {
    // com os pés no alto, o quadril sobe muito e o tronco gira em volta da parte de cima das costas: o centro do ombro
    // sobe junto (a escápula rola no colchonete). O que a ficha pede é que os ombros não saiam do lugar: aqui se mede
    // que as costas e a cabeça ficam no tampo e que o ombro não escorrega (para os lados e ao longo do corpo); a
    // subida do centro do ombro é informada
    const m = q.map((x) => maisBaixos(x.esq));
    const piso = q[0]!.marcas.piso?.[1] ?? 0;
    // as costas: o tronco ou a base da nuca, que encosta junto quando a bacia sobe muito (o núcleo põe as duas no chão)
    const [ta, tb] = faixa(m.map((x) => Math.min(x.tronco!, x.pescoco!) - piso)),
      [ca, cb] = faixa(m.map((x) => x.cabeca! - piso));
    const o0 = q[0]!.esq.lado.R.ombro;
    const escorrega = Math.max(...q.map((x) => Math.hypot(x.esq.lado.R.ombro[0] - o0[0], x.esq.lado.R.ombro[2] - o0[2])));
    const sobe = Math.max(...q.map((x) => x.esq.lado.R.ombro[1] - o0[1]));
    return {
      medido: `o ponto mais baixo das costas (ou da base da nuca) fica de ${f1(ta)} a ${f1(tb)} cm do tampo do colchonete e o da cabeça de ${f1(ca)} a ${f1(cb)} cm; o centro do ombro escorrega ${f1(escorrega)} cm e sobe ${f1(sobe)} cm (a escápula rola)`,
      ok: ta >= -1.5 && tb <= 1 && ca >= -1.5 && cb <= 1 && escorrega <= 1,
    };
  },
  'flexao-joelho-calcanhar-no-berco': (q) => {
    // o fundo do berço (marca) contra a superfície do pé: nenhum ponto do pé passa do fundo do berço, para longe da
    // âncora, e o mais longe encosta nele; no início, os pés embaixo da âncora (a fita a menos de 12° do prumo); o
    // calcanhar anda num arco em volta da âncora
    const folgas = q.map((x) => {
      const A = x.marcas.ancora!,
        b = x.marcas.bercoR!;
      const rb = dist(A, b);
      let mais = -1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'pe' && p[0] < 0) mais = Math.max(mais, dist(A, p) - rb);
      return mais;
    });
    const [a, b] = faixa(folgas);
    const ini = q[0]!.marcas,
      fim = q[q.length - 1]!.marcas;
    const prumo = (Math.atan2(Math.abs(ini.bercoR![2] - ini.ancora![2]), ini.ancora![1] - ini.bercoR![1]) * 180) / Math.PI;
    const anda = ini.bercoR![2] - fim.bercoR![2],
      sobe = fim.bercoR![1] - ini.bercoR![1];
    const dA = q.map((x) => dist(x.marcas.ancora!, x.marcas.bercoR!));
    const [d0, d1] = faixa(dA);
    const fimEsq = q[q.length - 1]!.esq;
    const aoQuadril = fim.bercoR![2] - fimEsq.lado.R.quadril[2];
    return {
      medido: `o pé passa do fundo do berço de ${f1(a)} a ${f1(b)} cm (positivo = o pé sai do berço, para longe da âncora); no início a fita fica a ${f1(prumo)}° do prumo da âncora e o berço a ${f1(ini.bercoR![1])} cm do chão; o calcanhar anda ${f1(anda)} cm na direção do corpo e sobe ${f1(sobe)} cm, sempre de ${f1(d0)} a ${f1(d1)} cm da âncora (em linha reta), e termina ${f1(aoQuadril)} cm à frente do centro do quadril`,
      ok: a >= -1 && b <= 1 && prumo <= 12 && anda >= 20 && sobe > 0,
    };
  },
  // ----- de bruços, com elástico -----
  'de-brucos-no-colchonete': (q) => {
    // o colchonete é o tampo de 1,5 cm; a testa apoia no dorso das mãos
    const tampo = obj('colchonete', 'esp');
    const m = q.map((x) => maisBaixos(x.esq));
    const [pa, pb] = faixa(m.map((x) => x.pelve! - tampo)),
      [ta, tb] = faixa(m.map((x) => x.tronco! - tampo));
    const testa = q.map((x) => {
      let maoTopo = -1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'mao') maoTopo = Math.max(maoTopo, p[1]);
      return maisBaixos(x.esq).cabeca! - maoTopo;
    });
    const [ca, cb] = faixa(testa);
    const debrucos = q.every((x) => x.esq.torax.z[1] < -0.8);
    return {
      medido: `${debrucos ? 'de bruços' : 'NÃO está de bruços'}; a bacia fica de ${f1(pa)} a ${f1(pb)} cm do tampo do colchonete e o peito de ${f1(ta)} a ${f1(tb)} cm; a testa fica de ${f1(ca)} a ${f1(cb)} cm do alto das mãos`,
      ok: debrucos && pa >= -1.5 && pb <= 1 && ta >= -1.5 && tb <= 1 && ca >= -1.5 && cb <= 1,
    };
  },
  'joelhos-bem-dobrados-no-fim': (q) => {
    const fim = q[q.length - 1]!.esq;
    const j = angulosDoLado(fim, 'R').joelho;
    return { medido: `no fim, o joelho dobra ${f1(j)}° e o calcanhar fica ${f1(fim.lado.R.calcanhar[1])} cm acima do chão`, ok: j >= 90 };
  },
  'elastico-estica-mais-no-fim': (q) => {
    const repouso = obj('elastico', 'comp');
    const c = q.map((x) => x.fios.find((y) => y.id === 'elastico')!.comp / repouso);
    const [a, b] = faixa(c);
    const ini = c[0]!,
      fim = c[c.length - 1]!;
    return { medido: `o elástico estica ${f1(ini)} vez com as pernas estendidas e ${f1(fim)} vezes no fim (de ${f1(a)} a ${f1(b)} no caminho)`, ok: ini >= 1.05 && fim > ini && Math.abs(b - fim) < 0.01 };
  },
  'elastico-atras-dos-tornozelos': (q) => {
    // o pé fica dentro do pegador e o tubo sai de trás da canela, perto do calcanhar, e não sai dali
    const d = q.map((x) => {
      const L = x.esq.lado.R,
        g = x.marcas.pegadaR!;
      const atras = -dot(sub(g, L.tornozelo), L.canela.z);
      return { atras, acima: dot(sub(g, L.tornozelo), L.canela.y) };
    });
    const [a, b] = faixa(d.map((x) => x.atras)),
      [c, e] = faixa(d.map((x) => x.acima));
    return { medido: `o tubo sai da fita do pegador de ${f1(a)} a ${f1(b)} cm atrás do centro do tornozelo e de ${f1(c)} a ${f1(e)} cm acima dele, ao longo da canela`, ok: a > 0 && e <= 8 };
  },
};
