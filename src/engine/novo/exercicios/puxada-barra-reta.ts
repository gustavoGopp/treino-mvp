// Puxada ajoelhado na polia alta com barra reta, no motor novo. Os números vêm da ficha
// (../dados/movimentos/puxada-barra-reta.json). Ajoelhado no colchonete, de frente para a coluna, a meio passo dela,
// como na puxada unilateral (./puxada-unilateral.ts); a barra reta curta da polia
// (../pecas-de-cena/polia-braco-barra-reta.ts, o mesmo acessório da rosca e do tríceps) nas duas mãos, por cima, um
// pouco mais aberta que os ombros. O que ele resolve, em vez de receber pronto:
//  - no começo, a barra fica na linha que vai do meio dos ombros à roldana, onde cada braço chega com o cotovelo quase
//    estendido (o cabo puxa a barra para a polia: os braços estendidos para cima e para a frente);
//  - no fim, a barra fica na altura da parte de cima do peito, à folga da ficha da pele dele (medida na superfície do
//    Boneco); no caminho ela desce em linha reta, à frente do rosto;
//  - cada mão fica presa à barra (as duas pegadas a uma distância fixa), e o cotovelo aponta para baixo, para trás e um
//    pouco para fora; o ombro sobe no alongado e desce no fim;
//  - o cabo vai reto da ponta do mosquetão à roldana de cima, e a pilha sobe o curso do cabo dividido pela relação.
import ficha from '../dados/movimentos/puxada-barra-reta.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { centroDaRoldana, chao, colchonete } from '../pecas';
import type { Peca } from '../pecas';
import { barraReta, montarBarra } from '../pecas-de-cena/polia-braco-barra-reta';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, mix, mul, noRef, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { alcanceDoBraco } from './dobrar-o-quadril';
import { colunasECabos, compDoCabo, menorNoCiclo } from './polia-bracos';
import type { CaboDaColuna } from './polia-bracos';
import { frenteParaOPeito } from './polia-puxar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** Até que altura o quadro mostra a coluna: a roldana de cima e o carrinho (o resto é cortado pela borda). */
const CORTADA_EM = 208;

const yJoelho = (corpo: Corpo) => obj('colchonete', 'esp') + corpo.secoes.perna![0]!.b;
const pelveDe = (corpo: Corpo): V3 => {
  const a = f('coxa.inclinacao') * rad;
  return [0, yJoelho(corpo) + corpo.m('coxa.comp') * Math.cos(a), -corpo.m('coxa.comp') * Math.sin(a)];
};
const solto = (): PoseBraco => ({ polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
/** Ajoelhado: cada coxa do quadril até o joelho dela, parado no colchonete; a canela para trás e o peito do pé no colchonete. */
function pernasPara(corpo: Corpo, t: Tronco): Record<Lado, PosePerna> {
  const base: PosePerna = { coxa: [0, -1, 0], canela: norm([0, -0.035, -1]), peDir: norm([0, -0.2, -1]), polo: [0, 0, 1] };
  const e = resolverMembros(t, { R: solto(), L: solto() }, { R: base, L: base });
  const perna = (k: Lado): PosePerna => ({ ...base, coxa: norm(sub([sinal(k) * f('joelhos.meiaDistancia'), yJoelho(corpo), 0], e.lado[k].quadril)) });
  return { R: perna('R'), L: perna('L') };
}

interface Calib {
  frente: number;
  /** O centro da barra no começo (no mundo) e no fim (no referencial do tórax). */
  ini: V3;
  fim: V3;
  /** No erro "nuca": o centro da barra no fim e o ponto de controle do caminho por cima da cabeça (no tórax). */
  nuca: V3;
  sobre: V3;
  cabos: CaboDaColuna[];
  repouso: number[];
}
const CAL = new WeakMap<Corpo, Calib>();

interface Pedido {
  peito: number;
  cervical: number;
  cabeca: number;
}
const pedidoCerto = (): Pedido => ({ peito: f('tronco'), cervical: f('cervical'), cabeca: f('cabeca') });
function tronco(corpo: Corpo, p: Pedido, frente?: number): Tronco {
  const pose: PoseTronco = { pelve: pelveDe(corpo), cervical: p.cervical, cabeca: p.cabeca };
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
    return { pegada, polo, mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: obj('barraRetaPolia', 'diam') }, elev };
  };
  return { R: braco('R'), L: braco('L') };
}

function montar(corpo: Corpo, c: Pick<Calib, 'frente' | 'ini' | 'fim' | 'nuca' | 'sobre'>, u: number, erro?: string): { e: Esq; B: V3 } {
  let p = pedidoCerto(),
    frente: number | undefined = c.frente;
  if (erro === 'tronco') {
    p = { ...p, peito: mix(f('tronco'), f('erro.tronco'), u) };
    frente = undefined;
  }
  if (erro === 'nuca') p = { ...p, cervical: mix(f('cervical'), f('erro.nuca.cervical'), u), cabeca: mix(f('cabeca'), f('erro.nuca.cabeca'), u) };
  const t = tronco(corpo, p, frente);
  const pe = pernasPara(corpo, t);
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

const barraDe = (e: Esq, cabos: CaboDaColuna[]) => montarBarra(mul(add(e.lado.R.pegada, e.lado.L.pegada), 0.5), sub(e.lado.L.pegada, e.lado.R.pegada), centroDaRoldana(cabos[0]!.torre));

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

function calibrar(corpo: Corpo): Calib {
  let c = CAL.get(corpo);
  if (c) return c;
  const pose0: PoseTronco = { pelve: pelveDe(corpo), cervical: f('cervical'), cabeca: f('cabeca') };
  const frente = frenteParaOPeito(corpo, pose0, f('tronco'));
  const t = tronco(corpo, pedidoCerto(), frente);
  const pe = pernasPara(corpo, t);
  const cabos: CaboDaColuna[] = [{ id: 'cabo', torre: { base: [0, 0, f('torre.distancia')], frente: [0, 0, -1], alturaDaPolia: obj('torre', 'poliaMax') } }];
  const roldana = centroDaRoldana(cabos[0]!.torre);
  // começo: a barra na linha do meio dos ombros à roldana, onde cada braço alcança com o cotovelo quase estendido (o
  // ombro anda com o braço: três passadas)
  const alcance = alcanceDoBraco(corpo, f('cotovelo.alongado'));
  let ini: V3 = add(t.torax.o, [0, 50, 30]);
  for (let i = 0; i < 3; i++) {
    const e = resolverMembros(t, bracos(t, ini, f('ombro.sobe'), f('cotovelo.polo'), f('cotovelo.poloAtras')), pe);
    const M = mul(add(e.lado.R.ombro, e.lado.L.ombro), 0.5);
    const dir = norm(sub(roldana, M));
    const off: V3 = [-f('maos.distancia') / 2, 0, 0];
    const s = resolver1((x) => dist(e.lado.R.ombro, add(add(M, mul(dir, x)), off)) - alcance, 10, 80, 30);
    ini = add(M, mul(dir, s));
  }
  // fim: a barra na altura da ficha, à folga da ficha da pele do peito (a frente da pele, na faixa da barra)
  const r = obj('barraRetaPolia', 'diam') / 2;
  // (a altura dos ombros é a do fim, com o ombro para baixo)
  const yDosOmbros = (e: Esq) => (paraRef(t.torax, e.lado.R.ombro)[1] + paraRef(t.torax, e.lado.L.ombro)[1]) / 2;
  let fim: V3 = [0, 0, 20];
  let y = 0;
  for (let i = 0; i < 4; i++) {
    const e = resolverMembros(t, bracos(t, noRef(t.torax, fim), f('ombro.desce'), f('cotovelo.polo'), f('cotovelo.poloAtras')), pe);
    y = yDosOmbros(e) - f('barra.abaixoDoOmbro');
    const frenteDoPeito = peleNaFaixa(e, ['tronco'], y - r - 2, y + r + 2, f('maos.distancia') / 2, 1);
    fim = [0, y, frenteDoPeito + r + f('barra.folga')];
  }
  // erro "nuca": a cabeça já à frente (o fim do erro); a barra atrás do pescoço, na altura da ficha, à folga da pele
  const tn = tronco(corpo, { peito: f('tronco'), cervical: f('erro.nuca.cervical'), cabeca: f('erro.nuca.cabeca') }, frente);
  const yn = y + f('barra.abaixoDoOmbro') + f('erro.nuca.acima');
  const atras = peleNaFaixa(resolverMembros(tn, { R: solto(), L: solto() }, pe), ['pescoco', 'cabeca', 'cabeloAtras', 'calota', 'tronco'], yn - r - 2, yn + r + 2, 12, -1);
  const nuca: V3 = [0, yn, atras - r - f('erro.nuca.folga')];
  // o controle da curva: acima do alto da cabeça (no começo do erro, com a cabeça ainda no lugar), na linha da nuca
  let topo = -1e9;
  for (const { p, parte } of pontosDoBoneco(resolverMembros(t, { R: solto(), L: solto() }, pe))) if (parte === 'cabeca' || parte === 'calota') topo = Math.max(topo, paraRef(t.torax, p)[1]);
  const sobre: V3 = [0, topo + r + f('erro.nuca.folga') + 6, nuca[2]];
  const parcial = { frente, ini, fim, nuca, sobre, cabos };
  const repouso = [menorNoCiclo((u) => compDoCabo(cabos[0]!.torre, barraDe(montar(corpo, parcial, u).e, cabos).ponta))];
  c = { ...parcial, repouso };
  CAL.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const { e } = montar(corpo, c, u, erro);
  const barra = barraDe(e, c.cabos);
  const pb = barraReta(barra);
  const col = colunasECabos(c.cabos, [barra.ponta], c.repouso, f('pilha.folga'), false, CORTADA_EM);
  const pecas: Peca[] = [{ t: 'colchonete', x0: 0, z0: -22 }, ...col.pecas!.filter((p) => p.t === 'torre'), pb.peca, ...col.pecas!.filter((p) => p.t !== 'torre')];
  const marcas: Record<string, V3> = { ...col.marcas, barra: barra.meio, 'barra.a': barra.a, 'barra.b': barra.b };
  return {
    esq: e,
    prims: [chao(-80, 80, -110, c.cabos[0]!.torre.base[2] + 50), ...colchonete(0, -22), ...pb.prims, ...col.prims],
    pecas,
    fios: col.fios,
    cargas: [],
    marcas,
    vies: { maoR: 1, maoL: 1 },
  };
}

export const puxadaBarraReta: Exercicio = {
  ficha: F,
  // como a puxada unilateral aprovada: de três quartos por trás (os dois braços puxando, as costas e a coluna) e de lado
  // (a barra à frente do rosto até o peito, o tronco reto)
  vistas: ['lateral', 'quinaTras'], // de lado o corpo fica maior e a barra desce até o peito; de três quartos por trás o corpo fica pequeno ao lado da torre
  quadro,
  // costas (principal: o grande dorsal e o trapézio do meio e de baixo, como nas remadas); bíceps e deltoide posterior,
  // secundários: o que a biblioteca conta
  papeis: { dorsal: 'p', trapMedInf: 'p', biceps: 's', deltPost: 's' },
  trajetorias: { barra: (q) => q.marcas.barra!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
