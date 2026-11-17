// O núcleo comum das elevações laterais do motor novo (com halteres e na polia): em pé, o braço sobe para o lado e um
// pouco à frente do corpo (o plano da escápula), com o cotovelo levemente dobrado e um pouco acima da mão, até a linha
// do ombro. A clavícula e a escápula acompanham o braço pelo ritmo do esqueleto (../esqueleto.ts); o erro "encolher"
// soma a elevação da clavícula além desse ritmo (é a parte de cima do trapézio que sobe o ombro).
//
// O corpo fica em pé com o núcleo dos stiffs (./dobrar-o-quadril.ts): joelhos destravados, a bacia inclinada o que a
// ficha pede e o centro de massa (corpo + carga) sobre o meio do pé. O braço é dado por direções, no referencial do
// tórax: o úmero gira no plano que a ficha dá (`plano`: graus à frente do plano do corpo) da elevação de baixo até a de
// cima; o antebraço dobra para a frente embaixo e, conforme o braço sobe, para baixo (o cotovelo conduz e fica acima
// da mão). Cada variação traz a sua ficha de movimento e diz o que as mãos seguram.
import { calibragem } from '../calibragens';
import { LADOS, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { cabo, centroDaRoldana, chao, estribo, halter, saidaDoCabo, torre } from '../pecas';
import type { Peca, Torre } from '../pecas';
import { caneleira, caneleiraNoAntebraco } from '../pecas-de-cena/caneleira';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, mix, mul, norm } from '../vec';
import type { V3 } from '../vec';
import { dobrarOQuadril, folgaDasPernas } from './dobrar-o-quadril';
import type { Carga, Esfera } from './dobrar-o-quadril';

const rad = Math.PI / 180;
/**
 * 'halteres': um halter em cada mão, os dois braços sobem. 'polia': o braço direito com o estribo da polia baixa, a mão
 * esquerda na coluna. 'elastico': um pegador do elástico em cada mão, os dois braços sobem, sem carga no equilíbrio; o
 * quadro sai só com o corpo e o chão (o elástico, que vai das mãos aos pés, é a variação que desenha). 'caneleira'
 * (acréscimo de 17/11, a elevação com caneleira): uma caneleira presa em cada antebraço, logo acima do punho, a mão
 * relaxada (não segura nada), os dois braços sobem; a carga fica no centro da caneleira.
 */
export type MaosDaElevacao = 'halteres' | 'polia' | 'elastico' | 'caneleira';

/** O braço no referencial do tórax (lado esquerdo; o direito espelha x): elevação `a` a partir do braço pendurado, no plano `p` graus à frente do lado. */
export function noPlano(a: number, p: number) {
  const A = a * rad,
    P = p * rad;
  const h: V3 = [Math.cos(P), 0, Math.sin(P)];
  const umero: V3 = [Math.sin(A) * h[0], -Math.cos(A), Math.sin(A) * h[2]];
  /** Para onde o braço anda quando sobe (o cotovelo conduz). */
  const sobe: V3 = [Math.cos(A) * h[0], Math.sin(A), Math.cos(A) * h[2]];
  /** A normal do plano, para a frente. */
  const frente: V3 = [-Math.sin(P), 0, Math.cos(P)];
  return { umero, sobe, frente };
}

/**
 * `opcoes.halter`: o id do halter na tabela de objetos (por omissão, o de 25 lb, `'halter'`; `'halterLeve'` é o de 10 lb).
 */
export function criarElevacao(fichaJson: unknown, maos: MaosDaElevacao, opcoes: { halter?: string } = {}): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const polia = maos === 'polia';
  const elastico = maos === 'elastico';
  const naCaneleira = maos === 'caneleira';
  /** O centro da caneleira no antebraço: do punho para o cotovelo, a borda de baixo a `caneleira.acimaDoPunho` cm. */
  const centroDaCaneleira = (punho: V3, paraOCotovelo: V3): V3 => add(punho, mul(paraOCotovelo, f('caneleira.acimaDoPunho') + obj('caneleira', 'larg') / 2));
  const H = opcoes.halter ?? 'halter';
  const LADOS_QUE_SOBEM: Lado[] = polia ? ['R'] : [...LADOS];
  const CACHE = new WeakMap<Corpo, { a0: number; rep: number; alfa: number }>();

  /** A torre da polia: à esquerda da pessoa, de lado para ela, com a polia no ponto mais baixo. */
  const aTorre = (): Torre => ({ base: [f('torre.maoAoLado') + obj('torre', 'prof') * 0.08, 0, f('torre.aFrente')], frente: [-1, 0, 0], alturaDaPolia: obj('torre', 'poliaMin') });

  /** As esferas que representam a carga na conta da folga até as pernas (o halter com o cabo na direção do polegar; na polia, a mão). */
  const esferas = (e: Esq, k: Lado): Esfera[] => {
    const L = e.lado[k];
    if (polia) return [{ c: L.pegada, r: f('mao.raio') }];
    if (naCaneleira) {
      // a mão relaxada e a caneleira em volta do antebraço (o raio do antebraço perto do punho mais a espessura da faixa)
      const c = centroDaCaneleira(L.punho, L.antebraco.y),
        ra = e.corpo.m('raio.punho') + obj('caneleira', 'esp'),
        m = obj('caneleira', 'larg') / 2 - ra / 2;
      return [{ c: L.pegada, r: f('mao.raio') }, ...[-1, 0, 1].map((s) => ({ c: add(c, mul(L.antebraco.y, s * m)), r: ra }))];
    }
    if (elastico) {
      // o pegador atravessado na mão (da frente para trás, com a palma para dentro)
      const ra = obj('elastico', 'pegadorDiam') / 2,
        m = obj('elastico', 'pegadorComp') / 2;
      return [-1, -0.5, 0, 0.5, 1].map((s) => ({ c: add(L.pegada, mul(L.mao.x, s * m)), r: ra }));
    }
    const eixo = mul(L.mao.x, sinal(k));
    const ra = obj(H, 'cabecaLargura') / 2,
      c0 = obj(H, 'caboComp') / 2,
      c1 = obj(H, 'comp') / 2;
    const out: Esfera[] = [];
    for (const s of [-1, 1]) for (const fr of [0.2, 0.5, 0.8]) out.push({ c: add(L.pegada, mul(eixo, s * (c0 + (c1 - c0) * fr))), r: ra });
    return out;
  };

  interface Pedido {
    a: number;
    plano: number;
    elev: number;
    tronco: number;
    lombar: number;
    joelho: number;
    /** O quadril parado neste ângulo (o do meio da subida); sem ele, o quadril sai do equilíbrio de cada quadro. */
    alfa?: number;
  }
  function pose(corpo: Corpo, o: Pedido): { e: Esq; cargas: Carga[]; alfa: number } {
    const cot = f('cotovelo') * rad;
    const r = dobrarOQuadril(corpo, {
      joelho: o.joelho,
      tronco: o.tronco,
      lombar: o.lombar,
      toracica: 0,
      cervical: f('cervical'),
      cabeca: f('cabeca'),
      pesMeiaDistancia: f('pes.meiaDistancia'),
      apoio: 'dois',
      alfa: o.alfa,
      bracos(e) {
        const T = e.torax;
        const pegadas = {} as Record<Lado, V3>;
        const braco = (k: Lado): PoseBraco => {
          const s = sinal(k);
          const n = noPlano(o.a, o.plano);
          const esp = (v: V3): V3 => dirRef(T, [s * v[0], v[1], v[2]]);
          const umero = esp(n.umero);
          // O cotovelo dobra para a frente (o lado do bíceps com o úmero sem girar). Conforme o braço sobe, o úmero gira
          // para dentro (o cotovelo conduz) e esse plano inclina para baixo: no alto, o cotovelo fica acima da mão.
          const giro = f('cotovelo.giro') * Math.sin(Math.max(0, o.a) * rad) * rad;
          const dobra = norm(add(mul(esp(n.frente), Math.cos(giro)), mul(esp(n.sobe), -Math.sin(giro))));
          const antebraco = norm(add(mul(umero, Math.cos(cot)), mul(dobra, Math.sin(cot))));
          // pegada neutra (o polegar para o lado em que o cotovelo dobra: palmas para dentro embaixo, para baixo no alto),
          // com o polegar um pouco para cima no alto
          const pg = giro - f('polegar.paraCima') * Math.sin(Math.max(0, o.a) * rad) * rad;
          const polegar = norm(add(mul(esp(n.frente), Math.cos(pg)), mul(esp(n.sobe), -Math.sin(pg))));
          pegadas[k] = add(e.lado[k].ombro, add(mul(umero, corpo.m('braco.comp')), mul(antebraco, corpo.m('antebraco.comp') + corpo.m('mao.punhoAoCentroDaPegada'))));
          if (naCaneleira) {
            // a mão relaxada (a caneleira não é segurada); a carga, no centro da caneleira
            const punho = add(e.lado[k].ombro, add(mul(umero, corpo.m('braco.comp')), mul(antebraco, corpo.m('antebraco.comp'))));
            pegadas[k] = centroDaCaneleira(punho, mul(antebraco, -1));
            return { umero, antebraco, polo: mul(dobra, -1), mao: { polegar, forma: 'relaxada' }, elev: o.elev };
          }
          return { umero, antebraco, polo: mul(dobra, -1), mao: { polegar, forma: 'pegada', diam: polia ? obj('estribo', 'pegadaDiam') : elastico ? obj('elastico', 'pegadorDiam') : obj(H, 'caboDiam') }, elev: o.elev };
        };
        if (polia) {
          // a mão de fora segura o estribo; a outra segura o trilho da coluna, parada
          const apoio: PoseBraco = { pegada: [f('torre.maoAoLado'), f('torre.maoAltura'), f('torre.aFrente')], polo: [0.3, -1, -0.6], mao: { polegar: [0, 1, 0], forma: 'pegada', diam: 5.5 } };
          return { R: braco('R'), L: apoio, cargas: [] };
        }
        const bR = braco('R'),
          bL = braco('L');
        return { R: bR, L: bL, cargas: elastico ? [] : LADOS.map((k) => ({ massa: f('carga'), pos: pegadas[k] })) };
      },
    });
    const cargas: Carga[] = naCaneleira
      ? LADOS.map((k) => ({ massa: f('carga'), pos: centroDaCaneleira(r.e.lado[k].punho, r.e.lado[k].antebraco.y) }))
      : polia || elastico
        ? []
        : LADOS.map((k) => ({ massa: f('carga'), pos: r.e.lado[k].pegada }));
    return { e: r.e, cargas, alfa: r.alfa };
  }

  /** Embaixo: a elevação em que a carga (ou a mão) fica à folga pedida da pele da coxa. */
  function calibrar(corpo: Corpo) {
    let c = CACHE.get(corpo);
    if (c) return c;
    // a conta demorada vem guardada para o corpo do app: ../calibragens.ts
    const { a0, alfa } = calibragem(corpo, `${F.id}:calibrar`, () => {
      const base = pedidoBase(0);
      const a0 = resolver1((a) => folgaDasPernas(pose(corpo, { ...base, a }).e, LADOS_QUE_SOBEM.flatMap((k) => esferas(pose(corpo, { ...base, a }).e, k))) - f('carga.folga'), 0, 45, 22);
      // o quadril fica parado no ângulo do equilíbrio do meio da subida (sem embalo): o centro de massa anda um pouco no pé
      return { a0, alfa: pose(corpo, { ...pedidoBase(0.5), a: mix(a0, f('braco.topo'), 0.5) }).alfa };
    });
    c = { a0, rep: 0, alfa };
    CACHE.set(corpo, c);
    if (polia) c.rep = montar(corpo, 0).comp;
    return c;
  }
  /** O braço passa do plano de baixo para o da subida logo no começo (até 40% do caminho), sem tranco. */
  const noPlanoDeSubida = (u: number) => suave(Math.min(1, u / f('plano.transicao')));
  function pedidoBase(u: number): Omit<Pedido, 'a'> {
    return { plano: mix(f('plano.baixo'), f('plano'), noPlanoDeSubida(u)), elev: 0, tronco: f('tronco'), lombar: 0, joelho: f('joelho') };
  }
  function pedido(corpo: Corpo, u: number, erro?: string): Pedido {
    const { a0, alfa } = calibrar(corpo);
    const p: Pedido = { ...pedidoBase(u), a: mix(a0, f('braco.topo'), u), alfa };
    if (erro === 'encolher') p.elev = f('erro.encolher.elev') * u;
    if (erro === 'frontal') p.plano = mix(f('plano.baixo'), f('erro.frontal.plano'), noPlanoDeSubida(u));
    if (erro === 'balanco') {
      // o tronco começa mais inclinado e é jogado para trás para dar o impulso: a lombar arqueia e os joelhos estendem
      p.tronco = mix(f('erro.balanco.frente'), f('erro.balanco.tras'), u);
      p.lombar = f('erro.balanco.lombar') * u;
      p.joelho = mix(f('erro.balanco.joelho'), f('joelho'), u);
      p.alfa = undefined;
    }
    return p;
  }

  function montar(corpo: Corpo, u: number, erro?: string) {
    const r = pose(corpo, pedido(corpo, u, erro));
    const e = r.e;
    const q: Quadro = { esq: e, prims: [chao(-90, 90, -70, 90)], pecas: [], fios: [], cargas: r.cargas, marcas: {} };
    let comp = 0;
    const t = polia ? aTorre() : undefined;
    if (t) {
      const L = e.lado.R;
      const es = estribo(L.pegada, L.mao.x, add(centroDaRoldana(t), mul(L.pegada, -1)));
      const saida = saidaDoCabo(t, es.elo);
      comp = dist(es.elo, saida);
      q.prims.push(...es.prims, cabo(es.elo, saida));
      q.marcas = { mao: L.pegada, maoDeApoio: e.lado.L.pegada, cabo0: saida, cabo1: es.elo };
      q.pecas = [{ t: 'estribo', pegada: L.pegada, eixo: L.mao.x, elo: es.elo }, { t: 'cabo', a: es.elo, b: saida }];
    } else if (elastico) {
      q.marcas = { mao: e.lado.R.pegada };
    } else if (naCaneleira) {
      // uma caneleira em cada antebraço, logo acima do punho, medida na pele do Boneco (o velcro do lado de fora)
      const pecas: Peca[] = [];
      for (const k of LADOS) {
        const c = caneleiraNoAntebraco(e, k, mul(e.torax.x, sinal(k)), f('caneleira.acimaDoPunho'));
        const p = caneleira(c);
        q.prims.push(...p.prims);
        pecas.push(p.peca);
        q.marcas[`caneleira${k}`] = c.centro;
        q.marcas[`caneleiraRaio${k}`] = [c.raio, 0, 0];
      }
      q.pecas = pecas;
    } else {
      const pecas: Peca[] = [];
      for (const k of LADOS) {
        const centro = e.lado[k].pegada,
          eixo = mul(e.lado[k].mao.x, sinal(k));
        q.prims.push(...halter(centro, eixo, 0.4, H));
        pecas.push(H === 'halter' ? { t: 'halter', centro, eixo } : { t: 'halter', centro, eixo, objeto: H });
      }
      q.pecas = pecas;
      q.marcas = { halter: e.lado.R.pegada };
    }
    return { q, comp, t };
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const { q, comp, t } = montar(corpo, u, erro);
    if (!t) return q;
    // a pilha parte do repouso com o cabo mais curto (embaixo) e sobe o curso do cabo dividido pela relação da máquina
    const { rep } = calibrar(corpo);
    const subida = Math.max(0, comp - rep) / obj('torre', 'relacao') + f('pilha.folga');
    q.prims.push(...torre(t, subida));
    q.pecas = [{ t: 'torre', torre: t, subida, cenario: true }, ...q.pecas!];
    q.fios = [{ id: 'cabo', comp, estica: true }];
    q.marcas.pilha = [0, subida, 0];
    q.vies = { maoR: 1 };
    return q;
  }
  return { ficha: F, quadro };
}
