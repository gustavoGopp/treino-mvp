// Remada baixa sentada com o triângulo, no motor novo. Os números vêm da ficha (../dados/movimentos/remada-baixa.json).
// Sentado na ponta do banco reto, de frente para a coluna de polia, um pé de cada lado do banco, os joelhos dobrados;
// o triângulo nas duas mãos (pegada neutra), o cabo quase horizontal, na altura das mãos. Os dois braços puxam o
// triângulo até o abdômen, os cotovelos passam rentes ao corpo para trás e as escápulas se juntam; o tronco sai de
// ~12° à frente e volta à vertical (a ficha), sem passar dela.
// O que este arquivo resolve, em vez de receber pronto:
//  - a altura do quadril: o ponto mais baixo do glúteo e das coxas apoia no tampo do banco (amassando 1 cm);
//  - onde ficam os pés: à distância em que o joelho dobra o ângulo da ficha;
//  - o caminho das mãos: uma linha reta e horizontal, a da linha do cabo (o triângulo vai e volta na direção da roldana);
//    no fim as mãos ficam a 1 cm da barriga; no começo, onde os cotovelos dobram só o ângulo da ficha;
//  - a coluna: a roldana na altura das mãos (o cabo horizontal), longe do triângulo o que a ficha pede.
import ficha from '../dados/movimentos/remada-baixa.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { bancoReto, centroDaRoldana, chao } from '../pecas';
import type { Peca, Torre } from '../pecas';
import { montarTriangulo, trianguloRemada } from '../pecas-de-cena/triangulo-remada';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dirRef, mix, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { cenaDaPolia, folgaDaBarriga, frenteParaOPeito, torreComARoldana } from './polia-puxar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const LARG_BANCO = obj('bancoReto', 'larg') / 2;
const TOPO = obj('bancoReto', 'altura') - f('banco.amassa');
const MEIA = obj('trianguloRemada', 'entrePegadas') / 2;

interface Calib {
  pelveY: number;
  bolaZ: number;
  /** A altura das mãos (e do cabo), a ponta do banco e a coluna. */
  yMaos: number;
  zPonta: number;
  torre: Torre;
  repouso: number;
}
const CAL = new WeakMap<Corpo, Calib>();
/** O z das mãos no começo e no fim, para cada tronco (o certo e os dos erros). */
const ZS = new WeakMap<Corpo, Map<string, { ini: number; fim: number }>>();

const tronco = (y: number, extra: Partial<PoseTronco> = {}): PoseTronco => ({ pelve: [0, y, 0], cervical: f('cervical'), cabeca: f('cabeca'), ...extra });
const perna = (k: Lado, bolaZ: number): PosePerna => {
  const s = sinal(k);
  return { pe: { bola: [s * f('pes.meiaDistancia'), 0, bolaZ], dir: norm([s * 0.18, 0, 1]), calc: 0 }, polo: norm([s * 0.35, 0.1, 1]) };
};
const solto = (): PoseBraco => ({ polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });

/** Os braços com as mãos nas pegadas do triângulo, o meio delas em (0, y, z). */
function bracos(t: ReturnType<typeof resolverTronco>, y: number, z: number, elev: number, prot: number, u = 1): Record<Lado, PoseBraco> {
  const T = t.torax;
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // para onde o cotovelo aponta: para baixo e um pouco para fora com o braço estendido (o polegar fica para cima);
    // para trás e para fora no fim (o antebraço passa ao lado da cintura)
    const ini: V3 = [s * f('cotovelo.paraFora.inicio'), -1, 0],
      fim: V3 = [s * f('cotovelo.paraFora'), -0.35, -1];
    const polo = norm(dirRef(T, norm([mix(ini[0], fim[0], u), mix(ini[1], fim[1], u), mix(ini[2], fim[2], u)])));
    return { pegada: [s * MEIA, y, z], polo, mao: { polegar: [0, 1, 0], forma: 'pegada', diam: obj('trianguloRemada', 'pegadaDiam') }, elev, prot };
  };
  return { R: braco('R'), L: braco('L') };
}

function calibrar(corpo: Corpo): Calib {
  let c = CAL.get(corpo);
  if (c) return c;
  let pelveY = 52,
    bolaZ = 45;
  const p0 = f('tronco.fim');
  for (let i = 0; i < 4; i++) {
    const y0 = pelveY;
    const pose = tronco(y0);
    const frente = frenteParaOPeito(corpo, pose, p0);
    const t = resolverTronco(corpo, { ...pose, frente });
    bolaZ = resolver1((z) => resolverMembros(t, { R: solto(), L: solto() }, { R: perna('R', z), L: perna('L', z) }).lado.R.ang.joelho - f('joelho'), 80, 10, 30);
    const e = resolverMembros(t, { R: solto(), L: solto() }, { R: perna('R', bolaZ), L: perna('L', bolaZ) });
    // o ponto mais baixo do glúteo e das coxas em cima do tampo (dentro da largura do banco e atrás da ponta)
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'pelve' || parte === 'coxa' || parte === 'cintura') && Math.abs(p[0]) < LARG_BANCO && p[2] < f('banco.atrasDaPonta')) min = Math.min(min, p[1]);
    pelveY = y0 + TOPO - min;
  }
  const yMaos = pelveY + f('maos.acimaDoQuadril');
  c = { pelveY, bolaZ, yMaos, zPonta: f('banco.atrasDaPonta'), torre: { base: [0, 0, 0], frente: [0, 0, -1], alturaDaPolia: 0 }, repouso: 0 };
  CAL.set(corpo, c);
  // a coluna: a roldana com o alto dela na altura das mãos (o cabo sai pelo alto, horizontal), a `cabo.livreNoComeco`
  // da ponta do triângulo no alongado
  const z0 = zsDasMaos(corpo, c, 'certo', f('tronco.inicio'), f('tronco.fim'), {}).ini;
  const r = obj('torre', 'roldanaDiam') / 2;
  const roldana: V3 = [0, yMaos - r, z0 + obj('trianguloRemada', 'prof') + f('cabo.livreNoComeco')];
  c.torre = torreComARoldana(roldana, [0, 0, -1]);
  const tri0 = montarTriangulo([0, yMaos, z0], [0, 0, 1]);
  c.repouso = cenaDaPolia(c.torre, tri0.ponta, 0).comp;
  return c;
}

/**
 * Onde ficam as mãos (o z do meio delas) no começo e no fim, para um tronco que vai do peito `pIni` ao `pFim`: no fim,
 * a 1 cm da barriga; no começo, onde os cotovelos dobram só `cotovelo.inicio`.
 */
function zsDasMaos(corpo: Corpo, c: Calib, chave: string, pIni: number, pFim: number, extraIni: Partial<PoseTronco>): { ini: number; fim: number } {
  let mapa = ZS.get(corpo);
  if (!mapa) ZS.set(corpo, (mapa = new Map()));
  const ja = mapa.get(chave);
  if (ja) return ja;
  const pernas = { R: perna('R', c.bolaZ), L: perna('L', c.bolaZ) };
  const tFim = resolverTronco(corpo, { ...tronco(c.pelveY), frente: frenteParaOPeito(corpo, tronco(c.pelveY), pFim) });
  const fim = resolver1((z) => folgaDaBarriga(resolverMembros(tFim, bracos(tFim, c.yMaos, z, 0, 0), pernas)) - f('maos.folgaNoFim'), 0, 40, 22);
  const pi = { ...tronco(c.pelveY), ...extraIni };
  const tIni = resolverTronco(corpo, { ...pi, frente: frenteParaOPeito(corpo, pi, pIni) });
  const ini = resolver1((z) => f('cotovelo.inicio') - resolverMembros(tIni, bracos(tIni, c.yMaos, z, 0, f('escapula.prot.inicio'), 0), pernas).lado.R.ang.cotovelo, fim + 10, fim + 80, 26);
  const r = { ini, fim };
  mapa.set(chave, r);
  return r;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  let pIni = f('tronco.inicio'),
    pFim = f('tronco.fim');
  let extra: Partial<PoseTronco> = {};
  let extraIni: Partial<PoseTronco> = {};
  if (erro === 'balanco') {
    pIni = f('erro.balanco.inicio');
    pFim = f('erro.balanco.fim');
  }
  if (erro === 'arred') {
    // a coluna curva no alongado (e desfaz a curva na puxada); a bacia fica como na pose certa
    extraIni = { lombar: f('erro.arred.lombar'), toracica: f('erro.arred.toracica'), cervical: f('cervical') - f('erro.arred.cervical') };
    extra = { lombar: extraIni.lombar! * (1 - u), toracica: extraIni.toracica! * (1 - u), cervical: mix(extraIni.cervical!, f('cervical'), u) };
  }
  const zs = zsDasMaos(corpo, c, erro === 'balanco' || erro === 'arred' ? erro : 'certo', pIni, pFim, extraIni);
  const peito = mix(pIni, pFim, u);
  // a bacia: a da pose certa (no erro "arredondar" quem inclina é a coluna)
  const frente = frenteParaOPeito(corpo, tronco(c.pelveY), peito);
  const t = resolverTronco(corpo, { ...tronco(c.pelveY), ...extra, frente });
  const z = mix(zs.ini, zs.fim, u);
  const elev = mix(f('escapula.elev.inicio'), f('escapula.elev.fim'), u) + (erro === 'encolher' ? f('erro.encolher.elev') * u : 0);
  const prot = mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u);
  const pernas = { R: perna('R', c.bolaZ), L: perna('L', c.bolaZ) };
  const e: Esq = resolverMembros(t, bracos(t, c.yMaos, z, elev, prot, u), pernas);
  // o triângulo: o meio das pegadas no meio das mãos, a ponta para a roldana
  const meio: V3 = [(e.lado.R.pegada[0] + e.lado.L.pegada[0]) / 2, c.yMaos, z];
  const roldana = centroDaRoldana(c.torre);
  const tri = montarTriangulo(meio, sub([roldana[0], c.yMaos, roldana[2]], meio));
  const pc = trianguloRemada(tri);
  const polia = cenaDaPolia(c.torre, tri.ponta, c.repouso, true);
  const zBanco = c.zPonta - obj('bancoReto', 'comp') / 2;
  const prims: Quadro['prims'] = [chao(-80, 80, -90, c.torre.base[2] + 50), ...bancoReto(0, zBanco), ...polia.prims, ...pc.prims];
  const pecas: Peca[] = [{ t: 'bancoReto', x0: 0, z0: zBanco, pontaNoQuadro: 45 }, ...polia.pecas, pc.peca];
  return {
    esq: e,
    prims,
    pecas,
    fios: [{ id: 'cabo', comp: polia.comp, estica: true }],
    cargas: [],
    marcas: { maos: meio, ponta: tri.ponta, saida: polia.saida, pilha: [0, polia.subida, 0], topoDoBanco: [0, obj('bancoReto', 'altura'), c.zPonta] },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const remadaBaixa: Exercicio = {
  ficha: F,
  vistas: ['quina', 'posterior'],
  quadro,
  // costas (dorsal e meio das costas) dos dois lados; bíceps e ombro de trás ajudam (a ficha e a biblioteca)
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { cotovelo: (q) => q.esq.lado.R.cotovelo },
};
