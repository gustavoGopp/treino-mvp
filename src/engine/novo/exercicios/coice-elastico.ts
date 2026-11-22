// Coice de glúteo em quatro apoios com elástico, no motor novo. Os números vêm da ficha
// (../dados/movimentos/coice-elastico.json); o corpo em quatro apoios, do núcleo ./quatro-apoios.ts. Mãos sob os
// ombros e joelhos sob o quadril, no colchonete, as costas retas. A perna direita (perto de quem olha na vista de lado)
// trabalha: com o joelho dobrado o tempo todo, a coxa vai de sob o quadril até a linha do tronco, empurrando o pé para
// trás e para cima. O elástico é o longo em laço (../dados/objetos/elastico-longo.json; o tubo de 48 pol da tabela é
// curto demais para ir das mãos ao pé e voltar): uma ponta do laço passa pela sola do pé direito; a outra fica presa no
// colchonete sob as duas mãos, de uma palma à outra. Os dois trechos vão de cada mão até a sola, por baixo do corpo, e
// contornam a coxa, o joelho e a canela pelo lado de baixo (o caminho mais curto: ./elastico-faixa.ts).
import { formaDoBoneco } from '../boneco';
import type { Anel } from '../corpo3d';
import ficha from '../dados/movimentos/coice-elastico.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, colchonete, medidasDoColchonete } from '../pecas';
import { faixaElastica, larguraDaFaixa } from '../pecas-de-cena/elastico-longo';
import type { ProfundidadeDaFaixa } from '../pecas-de-cena/elastico-longo';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, dot, girar, lerp, mix, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { comprimento, fioPorFora } from './elastico-faixa';
import { calibrarQuatroApoios, emQuatroApoios } from './quatro-apoios';
import type { OpcoesQuatroApoios } from './quatro-apoios';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
// o colchonete comprido, o medido (acréscimo de 19/11: o da tabela, de 100 cm, deixava o pé de apoio fora)
const COLCHONETE = medidasDoColchonete({ comprido: true });
const O: OpcoesQuatroApoios = { piso: COLCHONETE.esp, maosMeia: f('maos.meiaDistancia'), cotovelo: f('cotovelo'), lombar: f('lombar'), cervical: f('cervical') };
/** As partes que o elástico contorna, de cada mão até a sola: tudo menos as mãos e os pés. */
const PARTES = ['coxa', 'canela', 'pelve', 'cintura', 'emendaDaCintura', 'tronco', 'braco', 'ante'];

/** Uma direção no plano de lado do corpo: 0° = para baixo, 90° = para trás (para os pés), 180° = para cima. */
const dir = (graus: number): V3 => [0, -Math.cos(graus * rad), -Math.sin(graus * rad)];

/** O quanto a coxa direita fica atrás da vertical em u (graus), e o quanto ela abre para fora (no erro de girar). */
function coxaEm(corpo: Corpo, u: number, erro?: string): { atras: number; abre: number } {
  const c = calibrarQuatroApoios(corpo, O);
  // em cima, a coxa na linha do tronco: a linha da base do pescoço ao quadril desce para trás, e a coxa a continua
  const naLinha = 90 - c.linha;
  const topo = erro === 'lombar' ? naLinha + f('erro.lombar.acima') : naLinha;
  return { atras: mix(f('coxa.inicio'), topo, u), abre: erro === 'gira' ? f('erro.gira.abre') * u : 0 };
}

/** A perna que trabalha: a coxa `atras` graus atrás da vertical (e `abre` para fora), o joelho dobrado, o pé em ângulo reto. */
function pernaQueTrabalha(atras: number, abre: number, pf: number): PosePerna {
  // a perna inteira gira `abre` graus em volta da vertical, para fora (para −x, o lado de fora da perna direita): o
  // joelho continua dobrado o mesmo tanto
  const fora = (d: V3): V3 => norm(girar(d, [0, 1, 0], abre));
  const fi = atras + f('joelho');
  return { coxa: fora(dir(atras)), canela: fora(dir(fi)), peDir: fora(dir(fi - 90 + pf)), polo: fora(dir(atras - 90)) };
}

function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
  const { atras, abre } = coxaEm(corpo, u, erro);
  const d = { bacia: erro === 'lombar' ? f('erro.lombar.bacia') * u : 0, rola: erro === 'gira' ? f('erro.gira.rola') * u : 0 };
  // o pé: solto no começo (a ponta não entra no colchonete) e em ângulo reto com a canela no alto (acréscimo de 19/11)
  const pf = mix(f('pe.flexaoPlantar.inicio'), f('pe.flexaoPlantar'), u);
  return emQuatroApoios(corpo, O, (_t: Tronco) => pernaQueTrabalha(atras, abre, pf), d);
}

/** O laço: da mão direita, por baixo do corpo, pela sola do pé direito, de volta à mão esquerda e, no colchonete, à direita. */
function laco(corpo: Corpo, e: Esq): { pts: V3[]; comp: number; sola: V3 } {
  const c = calibrarQuatroApoios(corpo, O);
  const esp = obj('elasticoLongo', 'esp');
  const palma = (k: Lado): V3 => [sinal(k) * O.maosMeia, O.piso + esp / 2, c.zMao];
  // o meio da sola do pé direito, de uma borda à outra (o laço passa por ela, achatado)
  const pe = e.lado.R;
  const meio = mul(add(pe.bola, pe.calcanhar), 0.5);
  // a sola fica do lado oposto ao tornozelo
  const paraASola = norm(perp(sub(meio, pe.tornozelo), norm(sub(pe.bola, pe.calcanhar))));
  const sola = add(meio, mul(paraASola, esp / 2));
  // de lado a lado do pé (perpendicular aos dedos, para +x)
  const lado = norm(perp([1, 0, 0], pe.pe.z));
  const larg = corpo.m('pe.largura') / 2 + esp;
  // a borda do lado de fora do pé direito (−x) recebe o trecho da mão direita
  const bR = add(sola, mul(lado, -larg)),
    bL = add(sola, mul(lado, larg));
  // a perna de apoio fica de fora: o elástico passa por cima e por dentro dela, e contorna só a perna que trabalha
  const R0 = e.lado.R,
    L0 = e.lado.L;
  const daPernaDeApoio = (p: V3) => Math.min(dist(p, L0.joelho), dist(p, L0.tornozelo), dist(p, L0.quadril) + 6) < Math.min(dist(p, R0.joelho), dist(p, R0.tornozelo), dist(p, R0.quadril) + 6);
  const op = { lado: [0, -1, 0] as V3, partes: PARTES, folga: f('elastico.folga'), fatia: 2.5, livreNasPontas: 3, aceita: (p: V3) => !daPernaDeApoio(p) };
  // correção de 20/11/2026: cada trecho sai de baixo da mão pela beira de dentro do calcanhar dela, rente ao colchonete
  // (`elastico.saida.*`). Saindo do meio da palma, o trecho subia rumo ao pé por dentro do punho (até 2,3 cm, no erro de
  // arquear a lombar): o punho fica a 1 ou 2 cm do colchonete, e não há por onde o elástico passar embaixo dele
  const saida = (k: Lado): V3 => add(palma(k), [-sinal(k) * f('elastico.saida.dentro'), 0, -f('elastico.saida.atras')]);
  const R = [palma('R'), ...fioPorFora(e, saida('R'), bR, op)];
  // o trecho da mão esquerda cruza por baixo do corpo, entre as coxas: ele contorna também a coxa de apoio, pelo lado
  // de dentro dela (a virilha), em vez de atravessá-la
  const L = [palma('L'), ...fioPorFora(e, saida('L'), bL, { ...op, lado: norm([-f('elastico.paraDentro'), -1, 0]), aceita: undefined })];
  // no colchonete, o laço não desce abaixo do tampo
  const noTampo = (p: V3): V3 => [p[0], Math.max(p[1], O.piso + esp / 2), p[2]];
  const pts = [...R, ...L.reverse(), palma('R')].map(noTampo);
  return { pts, comp: comprimento(pts), sola };
}

/**
 * As partes do Boneco que não contam para a pintura da faixa (nem aqui nem na regra de pintura dela): a palma fica em
 * cima das pontas do laço, no colchonete, e o laço dá a volta na sola do pé, encostado nela. Nas duas, a faixa fica
 * na frente e atrás da mesma parte ao mesmo tempo.
 */
export const FORA_DA_PINTURA = ['mao', 'polegar', 'pe'];

/**
 * Em que profundidade cada pedaço da faixa é pintado (acréscimo de 19/11, colchonete). A faixa é pintada pedaço a
 * pedaço, cada um na profundidade do meio dele; o Boneco, por partes, e o tronco, a bacia, a cabeça e as pernas de perto
 * num item só, na profundidade do tronco. O trecho que passa entre as pernas fica atrás da perna de perto, mas, de três
 * quartos por trás, o meio dele fica mais perto de quem olha que o tronco, e ele era pintado por cima da canela de
 * perto; por trás, no erro de girar o quadril, a faixa que corre por baixo da perna levantada saía por cima dela.
 * Aqui, para cada parte do Boneco (os dois lados), conta-se em quantos pontos do pedaço (de centímetro em centímetro)
 * ela fica na frente dele (o raio do ponto até quem olha a atravessa) e em quantos ela fica atrás (o raio para o outro
 * lado a atravessa); vale o lado com mais pontos, como na regra de pintura (../regras/quatro-apoios.ts). O pedaço vai
 * para trás do item que pinta cada parte que o esconde e para a frente do item de cada parte que ele esconde, com meio
 * centímetro de folga, nas profundidades em que o app pinta esses itens (../boneco.ts: o membro de longe a no mínimo
 * 5 cm atrás do tronco; o braço de perto, a no mínimo 1 cm à frente; o resto, com o tronco). Fora isso, ele fica na
 * profundidade dele. O desenho de cor de pele põe o cabelo no item do tronco, e o tronco muda de profundidade: vale o
 * que serve aos dois desenhos e, se nada serve, o que serve ao cinza (o dos erros e o que a regra mede). As partes em
 * `FORA_DA_PINTURA` não contam.
 */
function pinturaDaFaixa(e: Esq, raio: number): ProfundidadeDaFaixa {
  const formas = [formaDoBoneco(e), formaDoBoneco(e, { roupa: true })];
  return (pedaco, d, rot) => {
    const prof = (p: V3) => -rot(p)[2];
    // a direção de quem olha (o giro é linear: a profundidade de cada eixo)
    const para: V3 = [prof([1, 0, 0]), prof([0, 1, 0]), prof([0, 0, 1])],
      contra = mul(para, -1);
    const a = pedaco[0]!,
      b = pedaco[pedaco.length - 1]!;
    const n = Math.max(1, Math.round(dist(a, b)));
    const pts = Array.from({ length: n + 1 }, (_, i) => lerp(a, b, i / n));
    // a janela de cada desenho: [atrás de, à frente de]
    const janelas = formas.map((forma) => {
      const media = (vols: { vol: { aneis: Anel[] } }[]) => vols.reduce((s, v) => s + v.vol.aneis.reduce((t, an) => t + prof(an.c), 0) / v.vol.aneis.length, 0) / vols.length;
      const dCorpo = media(forma.grupos.find((g) => g.id === 'corpo')!.volumes);
      const lado = (k: Lado) => prof(e.lado[k].ombro) + prof(e.lado[k].quadril);
      const longe: Lado | null = Math.abs(lado('R') - lado('L')) < 6 ? null : lado('R') < lado('L') ? 'R' : 'L';
      let lo = -Infinity,
        hi = Infinity;
      for (const g of forma.grupos) {
        const dg = media(g.volumes);
        const item = g.lado && g.lado === longe ? Math.min(dg, dCorpo - 5) : g.id.startsWith('braco') ? (dg >= dCorpo - 4 ? Math.max(dg, dCorpo + 1) : dg) : dCorpo;
        const vols = g.volumes.filter((v) => !FORA_DA_PINTURA.includes(v.nome ?? ''));
        const na = (dir: V3) => pts.filter((p) => vols.some((v) => raioAtravessa(v.vol.aneis, p, dir, raio))).length;
        const frente = na(para),
          atras = na(contra);
        if (frente >= Math.min(4, Math.ceil(pts.length * 0.75)) && frente >= atras) hi = Math.min(hi, item - 0.5);
        else if (atras > 0) lo = Math.max(lo, item + 0.5);
      }
      return [lo, hi] as const;
    });
    const lo = Math.max(...janelas.map((j) => j[0])),
      hi = Math.min(...janelas.map((j) => j[1]));
    const [l, h] = lo < hi ? [lo, hi] : janelas[0]!;
    return l < h ? Math.max(l, Math.min(h, d)) : Math.min(h, d);
  };
}

/**
 * O raio que sai de `p` na direção `para` atravessa o volume (encolhido a 85%, para não contar a borda), a mais de `t0`
 * cm de `p` (a meia largura da faixa)? Anda de meio em meio centímetro só onde ele passa pela esfera de cada trecho,
 * como a regra de pintura (../regras/ordem-de-pintura.ts).
 */
function raioAtravessa(aneis: Anel[], p: V3, para: V3, t0: number): boolean {
  for (let i = 1; i < aneis.length; i++) {
    const A = aneis[i - 1]!,
      B = aneis[i]!;
    const c = lerp(A.c, B.c, 0.5),
      R = dist(A.c, B.c) / 2 + Math.max(A.a, A.f, A.b, B.a, B.f, B.b);
    const w = sub(c, p),
      tc = dot(w, para),
      d2 = dot(w, w) - tc * tc;
    if (d2 > R * R || tc + R < t0) continue;
    const meia = Math.sqrt(R * R - d2);
    const eixo = sub(B.c, A.c),
      L2 = dot(eixo, eixo);
    if (L2 < 1e-6) continue;
    for (let t = Math.max(t0, tc - meia); t <= tc + meia; t += 0.5) {
      const q = add(p, mul(para, t));
      const s = dot(sub(q, A.c), eixo) / L2;
      if (s < 0 || s > 1) continue;
      const r = sub(q, add(A.c, mul(eixo, s))),
        x = dot(r, A.x),
        z = dot(r, A.z);
      const a = (A.a + (B.a - A.a) * s) * 0.85,
        f = (A.f + (B.f - A.f) * s) * 0.85,
        b = (A.b + (B.b - A.b) * s) * 0.85;
      if ((x / a) ** 2 + (z / (z >= 0 ? f : b)) ** 2 < 1) return true;
    }
  }
  return false;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = esqueleto(corpo, u, erro);
  const c = calibrarQuatroApoios(corpo, O);
  const l = laco(corpo, e);
  const estica = l.comp / obj('elasticoLongo', 'comp');
  const fx = faixaElastica(l.pts, estica, 'faixa', false, pinturaDaFaixa(e, larguraDaFaixa(estica) / 2));
  const zCol = c.zMao / 2 + f('colchonete.recua');
  return {
    esq: e,
    prims: [chao(-70, 70, zCol - COLCHONETE.comp / 2 - 10, zCol + COLCHONETE.comp / 2 + 10), ...colchonete(0, zCol, true), ...fx.prims],
    pecas: [{ t: 'colchonete', x0: 0, z0: zCol, noFundo: true, comprido: true, noQuadro: f('colchonete.noQuadro') }, fx.peca],
    fios: [{ id: 'elastico', comp: l.comp, estica: true, objeto: 'elasticoLongo' }],
    cargas: [],
    marcas: { sola: l.sola, piso: [0, O.piso, 0] },
  };
}

export const coiceElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // glúteos da perna que trabalha, sem secundário (com o joelho dobrado, os posteriores não contam: a ficha da técnica)
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho, 'pé': (q) => q.esq.lado.R.tornozelo },
};
