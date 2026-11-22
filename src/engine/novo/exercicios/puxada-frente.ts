// Puxada pela frente na estação de puxada (o puxador alto), no motor novo. Os números vêm da ficha
// (../dados/movimentos/puxada-frente.json); a máquina e a barra longa, de ../pecas-de-cena/estacao-puxada.ts.
// Sentado de frente para a torre, os pés no chão, as coxas presas sob os rolos; a barra longa nas duas mãos, por cima,
// a ~1,4 vez a largura dos ombros. Os braços puxam a barra da roldana de cima até a parte de cima do peito, à frente do
// rosto, e a devolvem até estenderem por completo; o tronco fica quase parado, um pouco atrás da vertical.
//
// O braço, a barra e os erros seguem a puxada ajoelhado com a barra reta aprovada (./puxada-barra-reta.ts). O que este
// arquivo resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts):
//  - a altura do quadril: o ponto mais baixo do glúteo e das coxas apoia no assento, afundando 1 cm; os pés vão para a
//    frente até o joelho dobrar o ângulo da ficha;
//  - os rolos das coxas: descem na coluna deles até afundar 0,5 cm no alto das coxas, logo atrás dos joelhos;
//  - em cima, a barra fica na linha que vai do meio dos ombros à roldana de cima, onde o cotovelo dobra só 8°; no fim,
//    no alto do peito, à folga da ficha da pele; no caminho, ela desce em linha reta, à frente do rosto;
//  - o cabo vai reto do mosquetão à roldana de cima, e as placas sobem o que o cabo anda (a relação 1:1 da estação).
import ficha from '../dados/movimentos/puxada-frente.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { cabo, chao } from '../pecas';
import type { Peca } from '../pecas';
import { barraPuxada, estacaoPuxada, montarBarraPuxada, roldanaDeCima, saidaDeCima } from '../pecas-de-cena/estacao-puxada';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, mix, mul, noRef, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { alcanceDoBraco } from './dobrar-o-quadril';
import { frenteParaOPeito } from './polia-puxar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const g = (id: string) => obj('estacaoPuxada', id);
const ZQ = f('assento.quadril');

const solto = (): PoseBraco => ({ polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
const perna = (k: Lado, bolaZ: number): PosePerna => {
  const s = sinal(k);
  return { pe: { bola: [s * f('pes.meiaDistancia'), 0, bolaZ], dir: norm([s * 0.12, 0, 1]), calc: 0 }, polo: norm([s * 0.2, 0.1, 1]) };
};

interface Pedido {
  peito: number;
  cervical: number;
  cabeca: number;
}
const pedidoCerto = (): Pedido => ({ peito: f('tronco'), cervical: f('cervical'), cabeca: f('cabeca') });

/** O que a calibração dá, para um corpo (só números, para ficar gravado em ../calibragens.ts). */
interface Calib {
  pelveY: number;
  bolaZ: number;
  frente: number;
  /** A altura do eixo dos rolos (a regulagem). */
  rolo: number;
  /** O centro da barra em cima (no mundo) e no fim (no tórax). */
  ini: V3;
  fim: V3;
  /** No erro "nuca": o centro da barra no fim e o controle da curva por cima da cabeça (no tórax). */
  nuca: V3;
  sobre: V3;
  /** O comprimento do cabo com a barra em cima (a pilha parte dele). */
  repouso: number;
}

function troncoDe(corpo: Corpo, pelveY: number, p: Pedido, frente?: number): Tronco {
  const pose: PoseTronco = { pelve: [0, pelveY, ZQ], cervical: p.cervical, cabeca: p.cabeca };
  return resolverTronco(corpo, { ...pose, frente: frente ?? frenteParaOPeito(corpo, pose, p.peito) });
}

/** Os braços com a barra em `B` (o centro dela): cada mão a meia distância, para um lado, ao longo da barra. */
function bracos(t: Tronco, B: V3, elev: number, poloFora: number, poloAtras: number): Record<Lado, PoseBraco> {
  const T = t.torax;
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const pegada = add(B, [(s * f('maos.distancia')) / 2, 0, 0]);
    const polo = norm(dirRef(T, [s * poloFora, -1, -poloAtras]));
    // por cima: o polegar para o meio, ao longo da barra
    return { pegada, polo, mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: obj('barraPuxada', 'diam') }, elev };
  };
  return { R: braco('R'), L: braco('L') };
}

/** O ponto mais à frente (ou mais atrás) da pele das partes `quais`, numa faixa de altura do tórax, no tórax. */
function peleNaFaixa(e: Esq, quais: string[], y0: number, y1: number, larg: number, sentido: 1 | -1): number {
  let m = -1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!quais.includes(parte)) continue;
    const l = paraRef(e.torax, p);
    if (l[1] >= y0 && l[1] <= y1 && Math.abs(l[0]) <= larg) m = Math.max(m, sentido * l[2]);
  }
  return sentido * m;
}

function montar(corpo: Corpo, c: Omit<Calib, 'repouso'>, u: number, erro?: string): { e: Esq; B: V3 } {
  let p = pedidoCerto(),
    frente: number | undefined = c.frente;
  if (erro === 'tronco') {
    p = { ...p, peito: mix(f('tronco'), f('erro.tronco'), u) };
    frente = undefined;
  }
  if (erro === 'nuca') p = { ...p, cervical: mix(f('cervical'), f('erro.nuca.cervical'), u), cabeca: mix(f('cabeca'), f('erro.nuca.cabeca'), u) };
  const t = troncoDe(corpo, c.pelveY, p, frente);
  const pe = { R: perna('R', c.bolaZ), L: perna('L', c.bolaZ) };
  const fundo = erro === 'curta' ? 1 - (1 - u) * f('erro.curta') : u;
  let B = add(c.ini, mul(sub(noRef(t.torax, c.fim), c.ini), fundo));
  let poloFora = f('cotovelo.polo'),
    poloAtras = f('cotovelo.poloAtras');
  if (erro === 'nuca') {
    // a barra desce por cima da cabeça e atrás dela, até a nuca (uma curva de Bézier com o controle acima da cabeça);
    // os cotovelos vão para os lados
    const a = c.ini,
      b = noRef(t.torax, c.sobre),
      d = noRef(t.torax, c.nuca);
    B = add(add(mul(a, (1 - u) * (1 - u)), mul(b, 2 * u * (1 - u))), mul(d, u * u));
    poloFora = mix(poloFora, 2.5, u);
    poloAtras = mix(poloAtras, 0.2, u);
  }
  const elev = mix(f('ombro.sobe'), f('ombro.desce'), fundo);
  return { e: resolverMembros(t, bracos(t, B, elev, poloFora, poloAtras), pe), B };
}

const barraDe = (e: Esq) => montarBarraPuxada(mul(add(e.lado.R.pegada, e.lado.L.pegada), 0.5), sub(e.lado.L.pegada, e.lado.R.pegada), roldanaDeCima());

function calibrar(corpo: Corpo): Calib {
  return calibragem(corpo, 'puxada-frente:sentado', () => {
    // sentado: os pés vão para a frente até o joelho dobrar o ângulo da ficha; o glúteo e as coxas apoiam no assento
    let pelveY = 55,
      bolaZ = 40;
    const topo = g('assentoAltura') - f('assento.amassa');
    for (let i = 0; i < 4; i++) {
      const t = troncoDe(corpo, pelveY, pedidoCerto());
      bolaZ = resolver1((z) => resolverMembros(t, { R: solto(), L: solto() }, { R: perna('R', z), L: perna('L', z) }).lado.R.ang.joelho - f('joelho'), 80, 10, 30);
      const e = resolverMembros(t, { R: solto(), L: solto() }, { R: perna('R', bolaZ), L: perna('L', bolaZ) });
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'pelve' || parte === 'coxa' || parte === 'cintura') && Math.abs(p[0]) < g('assentoLarg') / 2 && Math.abs(p[2]) < g('assentoComp') / 2) min = Math.min(min, p[1]);
      pelveY += topo - min;
    }
    const pose0: PoseTronco = { pelve: [0, pelveY, ZQ], cervical: f('cervical'), cabeca: f('cabeca') };
    const frente = frenteParaOPeito(corpo, pose0, f('tronco'));
    const t = troncoDe(corpo, pelveY, pedidoCerto(), frente);
    const pe = { R: perna('R', bolaZ), L: perna('L', bolaZ) };
    // os rolos: o mais alto da pele das coxas embaixo de cada rolo, menos o que ele afunda
    const e0 = resolverMembros(t, { R: solto(), L: solto() }, pe);
    const rR = g('roloDiam') / 2,
      lR = g('roloComp'),
      xR = lR / 2 + 3;
    let alto = -1e9;
    for (const { p, parte } of pontosDoBoneco(e0)) if (parte === 'coxa' && Math.abs(Math.abs(p[0]) - xR) <= lR / 2 && Math.abs(p[2] - g('roloFrente')) <= rR * 0.6) alto = Math.max(alto, p[1]);
    const rolo = alto - f('rolo.amassa') + rR;
    const roldana = roldanaDeCima();
    // em cima: a barra na linha do meio dos ombros à roldana, onde cada braço alcança com o cotovelo quase estendido
    // (o ombro anda com o braço: três passadas)
    const alcance = alcanceDoBraco(corpo, f('cotovelo.alongado'));
    let ini: V3 = add(t.torax.o, [0, 50, 10]);
    for (let i = 0; i < 3; i++) {
      const e = resolverMembros(t, bracos(t, ini, f('ombro.sobe'), f('cotovelo.polo'), f('cotovelo.poloAtras')), pe);
      const M = mul(add(e.lado.R.ombro, e.lado.L.ombro), 0.5);
      const dir = norm(sub(roldana, M));
      const off: V3 = [-f('maos.distancia') / 2, 0, 0];
      const s = resolver1((x) => dist(e.lado.R.ombro, add(add(M, mul(dir, x)), off)) - alcance, 10, 80, 30);
      ini = add(M, mul(dir, s));
    }
    // no fim: a barra na altura da ficha, à folga da ficha da pele do peito (a frente da pele, na faixa da barra)
    const r = obj('barraPuxada', 'diam') / 2;
    const yDosOmbros = (e: Esq) => (paraRef(t.torax, e.lado.R.ombro)[1] + paraRef(t.torax, e.lado.L.ombro)[1]) / 2;
    let fim: V3 = [0, 0, 20];
    let y = 0;
    for (let i = 0; i < 4; i++) {
      const e = resolverMembros(t, bracos(t, noRef(t.torax, fim), f('ombro.desce'), f('cotovelo.polo'), f('cotovelo.poloAtras')), pe);
      y = yDosOmbros(e) - f('barra.abaixoDoOmbro');
      const frenteDoPeito = peleNaFaixa(e, ['tronco'], y - r - 2, y + r + 2, f('maos.distancia') / 2, 1);
      fim = [0, y, frenteDoPeito + r + f('barra.folga')];
    }
    // erro "nuca": a cabeça já à frente; a barra atrás do pescoço, na altura da ficha, à folga da pele
    const tn = troncoDe(corpo, pelveY, { peito: f('tronco'), cervical: f('erro.nuca.cervical'), cabeca: f('erro.nuca.cabeca') }, frente);
    const yn = y + f('barra.abaixoDoOmbro') + f('erro.nuca.acima');
    const atras = peleNaFaixa(resolverMembros(tn, { R: solto(), L: solto() }, pe), ['pescoco', 'cabeca', 'cabeloAtras', 'calota', 'tronco'], yn - r - 2, yn + r + 2, 12, -1);
    const nuca: V3 = [0, yn, atras - r - f('erro.nuca.folga')];
    let topoCab = -1e9;
    for (const { p, parte } of pontosDoBoneco(resolverMembros(t, { R: solto(), L: solto() }, pe))) if (parte === 'cabeca' || parte === 'calota') topoCab = Math.max(topoCab, paraRef(t.torax, p)[1]);
    const sobre: V3 = [0, topoCab + r + f('erro.nuca.folga') + 6, nuca[2]];
    const parcial = { pelveY, bolaZ, frente, rolo, ini, fim, nuca, sobre };
    // o cabo mais curto do ciclo certo (a barra em cima): dali as placas começam a subir
    let repouso = 1e9;
    for (let i = 0; i <= 20; i++) {
      const bar = barraDe(montar(corpo, parcial, i / 20).e);
      repouso = Math.min(repouso, dist(bar.ponta, saidaDeCima(bar.ponta)));
    }
    return { ...parcial, repouso };
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const { e } = montar(corpo, c, u, erro);
  const barra = barraDe(e);
  const pb = barraPuxada(barra);
  const saida = saidaDeCima(barra.ponta);
  const comp = dist(barra.ponta, saida);
  const subida = Math.max(0, comp - c.repouso) / g('relacao') + f('pilha.folga');
  const E = estacaoPuxada({ rolo: c.rolo, subida, placas: f('placas') });
  const pecas: Peca[] = [E.assento, E.torre, E.rolos, pb.peca, { t: 'cabo', a: barra.ponta, b: saida }];
  return {
    esq: e,
    prims: [chao(-80, 80, E.extremos.zTras - 20, E.extremos.zFundo + 20), ...E.prims, ...pb.prims, cabo(barra.ponta, saida)],
    pecas,
    fios: [{ id: 'cabo', comp, estica: true, objeto: 'estacaoPuxada' }],
    cargas: [],
    marcas: {
      barra: barra.meio,
      'barra.a': barra.a,
      'barra.b': barra.b,
      'barra.pa': barra.pa,
      'barra.pb': barra.pb,
      'cabo.ponta': barra.ponta,
      'cabo.saida': saida,
      'cabo.roldana': E.polia,
      pilha: [0, subida, 0],
      rolo: [c.rolo, g('roloFrente'), g('roloDiam') / 2],
      assento: [0, g('assentoAltura'), 0],
    },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const puxadaFrente: Exercicio = {
  ficha: F,
  // como a puxada aprovada: de lado (a barra desce à frente do rosto até o peito, o tronco quase parado) e de três
  // quartos por trás (as costas, os dois braços puxando)
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // costas (o grande dorsal e o trapézio do meio e de baixo, como na puxada aprovada); bíceps e deltoide posterior,
  // secundários (a ficha da técnica)
  papeis: { dorsal: 'p', trapMedInf: 'p', biceps: 's', deltPost: 's' },
  trajetorias: { barra: (q) => q.marcas.barra!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
