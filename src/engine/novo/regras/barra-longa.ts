// Regras medidas dos exercícios com a barra longa com anilhas (../pecas-de-cena/barra-longa.ts): o terra romeno, a
// remada curvada e o hip thrust. A barra é rígida e se move inteira; os quadros marcam o centro dela (`barra`) e, quando
// as mãos a seguram, o ponto da barra em que cada mão fecha (`pegaR`, `pegaL`). O limite vem do que a ficha da técnica
// pede, não do que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { PERNAS, folgaDaBarraNaPele, folgaDaBarraNosPontos, peleDensa } from '../exercicios/com-barra-longa';
import { raioDaPegada } from '../pecas-de-cena/barra-longa';
import { obj } from '../tabelas';
import { add, angulo, dist, dot, mul, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
/** A menor distância (cm) da superfície da barra, entre as duas mãos, à pele das partes pedidas. */
const folgaDaBarra = (q: Quadro, partes: ReadonlySet<string>) => folgaDaBarraNaPele(q.esq, q.marcas.pegaR!, q.marcas.pegaL!, partes);
/** Onde a almofada do hip thrust encosta: a barriga, a bacia e as coxas. */
const APOIO_DA_BARRA: ReadonlySet<string> = new Set(['tronco', 'cintura', 'emendaDaCintura', 'pelve', 'coxa']);

export const REGRAS_BARRA_LONGA: Record<string, Regra> = {
  'barra-firme-nas-duas-maos': (q) => {
    // cada mão no ponto da barra que segura; as duas pegadas sempre à mesma distância (as mãos não deslizam) e na mesma
    // altura e profundidade (a barra fica na horizontal, de um lado ao outro)
    const naMao = Math.max(...q.map((x) => Math.max(dist(x.esq.lado.R.pegada, x.marcas.pegaR!), dist(x.esq.lado.L.pegada, x.marcas.pegaL!))));
    const [a, b] = faixa(q.map((x) => dist(x.marcas.pegaR!, x.marcas.pegaL!)));
    const torta = Math.max(...q.map((x) => Math.hypot(x.marcas.pegaR![1] - x.marcas.pegaL![1], x.marcas.pegaR![2] - x.marcas.pegaL![2])));
    return { medido: `o centro de cada mão fica a no máximo ${f1(naMao)} cm da barra; as pegadas ficam de ${f1(a)} a ${f1(b)} cm uma da outra; a barra sai da horizontal no máximo ${f1(torta)} cm de uma mão à outra`, ok: naMao <= 0.1 && b - a <= 0.2 && torta <= 0.2 };
  },
  'barra-rente-as-pernas': (q) => {
    const fol = q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map((x) => folgaDaBarra(x, PERNAS));
    const [a, b] = faixa(fol);
    return { medido: `da barra à pele da coxa ou da canela, de ${f1(a)} a ${f1(b)} cm na descida`, ok: a >= -0.5 && b <= 3 };
  },
  'pegada-na-largura-dos-ombros': (q) => {
    const e = primeiro(q).esq;
    const maos = Math.abs(e.lado.R.pegada[0] - e.lado.L.pegada[0]),
      ombros = Math.abs(e.lado.R.ombro[0] - e.lado.L.ombro[0]);
    // as mãos por fora das coxas: o lado de dentro da mão direita contra o lado de fora da coxa direita
    let coxa = 0,
      dentro = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) {
      if (parte === 'coxa' && p[0] < 0) coxa = Math.min(coxa, p[0]);
      if (parte === 'mao' && p[0] < 0) dentro = Math.min(dentro, -p[0]);
    }
    return { medido: `as pegadas ficam a ${f1(maos)} cm uma da outra (os centros dos ombros a ${f1(ombros)} cm); o lado de dentro da mão fica a ${f1(dentro)} cm do meio, e a coxa vai até ${f1(-coxa)} cm`, ok: maos >= ombros && maos <= ombros + 12 && dentro >= -coxa - 1 };
  },
  // ----- a remada curvada -----
  'pegada-um-pouco-mais-aberta-que-os-ombros': (q) => {
    const e = primeiro(q).esq;
    const maos = Math.abs(e.lado.R.pegada[0] - e.lado.L.pegada[0]),
      ombros = Math.abs(e.lado.R.ombro[0] - e.lado.L.ombro[0]);
    return { medido: `as pegadas ficam a ${f1(maos)} cm uma da outra; os centros dos ombros a ${f1(ombros)} cm`, ok: maos >= ombros + 4 && maos <= ombros + 20 };
  },
  'barra-na-barriga-no-fim': (q) => {
    // no fim, a barra encosta na barriga: a pele do tronco (abaixo do peito) a até 1 cm da barra, e onde ela fica ao
    // longo do tronco, do ombro (0) ao quadril (1)
    const x = ultimo(q);
    const fol = folgaDaBarra(x, new Set(['tronco', 'cintura', 'emendaDaCintura', 'pelve']));
    const e = x.esq;
    const o = mul(add(e.lado.R.ombro, e.lado.L.ombro), 0.5),
      h = mul(add(e.lado.R.quadril, e.lado.L.quadril), 0.5);
    const d = sub(h, o);
    const t = dot(sub(x.marcas.barra!, o), d) / dot(d, d);
    return { medido: `no fim, a barra fica a ${f1(fol)} cm da pele da barriga, a ${f1(t * 100)}% do caminho do ombro ao quadril, ao longo do tronco`, ok: fol >= -1 && fol <= 1.5 && t >= 0.55 && t <= 0.95 };
  },
  'barra-livre-das-pernas': (q) => {
    const fol = q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map((x) => folgaDaBarra(x, PERNAS));
    return { medido: `a barra fica a no mínimo ${f1(Math.min(...fol))} cm da pele das coxas e dos joelhos`, ok: Math.min(...fol) >= 0.5 };
  },
  // ----- o hip thrust -----
  'barra-na-dobra-do-quadril': (q) => {
    // a almofada (em volta do meio da barra) encosta no corpo, e a barra fica sobre a dobra do quadril: entre o meio dos
    // quadris e 12 cm à frente dele, para o lado dos pés (de lado), sem ir para a barriga nem rolar para os joelhos
    const r = obj('almofadaDaBarra', 'diam') / 2,
      m = obj('almofadaDaBarra', 'comp') / 2;
    const fol = q.map((x) => {
      const c = x.marcas.barra!;
      return folgaDaBarraNosPontos(peleDensa(x.esq, APOIO_DA_BARRA), add(c, [-m, 0, 0]), add(c, [m, 0, 0])) - (r - raioDaPegada());
    });
    const [a, b] = faixa(fol);
    const [c, d] = faixa(q.map((x) => x.marcas.barra![2] - (x.esq.lado.R.quadril[2] + x.esq.lado.L.quadril[2]) / 2));
    return { medido: `a almofada fica de ${f1(a)} a ${f1(b)} cm da pele (negativo = afunda); a barra fica de ${f1(c)} a ${f1(d)} cm à frente do meio dos quadris, para o lado dos pés`, ok: a >= -1 && b <= 0.5 && c >= 0 && d <= 12 };
  },
  'anilhas-fora-do-chao': (q) => {
    // embaixo, a pele do glúteo perto do chão, e a borda de baixo das anilhas (marca `anilhaEmbaixo`) acima dele
    const gluteo = Math.min(...peleDensa(primeiro(q).esq, new Set(['pelve'])).map((p) => p[1]));
    const min = Math.min(...q.map((x) => x.marcas.anilhaEmbaixo![1]));
    return { medido: `embaixo, a pele do glúteo fica a ${f1(gluteo)} cm do chão e a borda das anilhas a ${f1(min)} cm`, ok: min >= 0 && gluteo >= 0 && gluteo <= 15 };
  },
  'borda-do-banco-abaixo-das-escapulas': (q) => {
    // a borda do banco (marca `borda`) contra as costas: a pele das costas a até 1,5 cm dela, e a borda logo abaixo da
    // ponta de baixo da escápula (medida ao longo do tronco)
    const piores = q.map((x) => {
      const borda = x.marcas.borda!;
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'tronco') min = Math.min(min, dist(p, borda));
      const abaixo = paraRef(x.esq.torax, x.esq.lado.R.escapula.anguloInferior)[1] - paraRef(x.esq.torax, borda)[1];
      return { min, abaixo };
    });
    const [a, b] = faixa(piores.map((p) => p.min));
    const [c, d] = faixa(piores.map((p) => p.abaixo));
    return { medido: `a pele das costas fica de ${f1(a)} a ${f1(b)} cm da borda do banco; a borda fica de ${f1(c)} a ${f1(d)} cm abaixo da ponta de baixo da escápula, ao longo do tronco`, ok: b <= 1.5 && c >= 0 && d <= 8 };
  },
  'quadril-alinha-no-topo': (q) => {
    // no topo, ombro, quadril e joelho em linha (de lado)
    const e = ultimo(q).esq;
    const lado = (v: V3): V3 => [0, v[1], v[2]];
    const a = angulo(lado(sub(e.lado.R.ombro, e.lado.R.quadril)), lado(sub(e.lado.R.joelho, e.lado.R.quadril)));
    return { medido: `no topo, ombro, quadril e joelho fazem ${f1(a)}° (180° = em linha)`, ok: a >= 172 };
  },
  'canela-quase-vertical-no-topo': (q) => {
    const L = ultimo(q).esq.lado.R;
    const a = angulo([0, L.joelho[1] - L.tornozelo[1], L.joelho[2] - L.tornozelo[2]], [0, 1, 0]);
    return { medido: `no topo, a canela fica a ${f1(a)}° da vertical`, ok: a <= 10 };
  },
};
