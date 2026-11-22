// Remada baixa na estação, com o triângulo, no motor novo. Os números vêm da ficha
// (../dados/movimentos/remada-baixa-estacao.json); a máquina, de ../pecas-de-cena/estacao-remada.ts; o triângulo, o
// aprovado (../pecas-de-cena/triangulo-remada.ts).
// Sentado no banco comprido, de frente para a torre, os pés nas chapas da plataforma, os joelhos levemente dobrados, o
// tronco quase vertical e parado; o triângulo nas duas mãos (pegada neutra), o cabo quase horizontal. Os dois braços
// puxam o triângulo até o abdômen, os cotovelos passam rentes ao corpo para trás e as escápulas voltam; na volta, os
// braços estendem e as escápulas vão à frente, sem dobrar a lombar.
//
// Os braços, o caminho das mãos e os erros de balançar e de arredondar seguem a remada baixa aprovada
// (./remada-baixa.ts). O que este arquivo resolve, em vez de receber pronto (uma vez por corpo, guardado em
// ../calibragens.ts):
//  - a altura do quadril: o ponto mais baixo do glúteo e das coxas apoia no banco, afundando 1 cm;
//  - onde fica a plataforma: à distância em que, com a sola inteira na chapa inclinada, o joelho dobra o ângulo da ficha;
//  - o caminho das mãos: uma linha reta e horizontal, a do cabo; no fim as mãos ficam a 1 cm da barriga; no começo,
//    onde os cotovelos dobram só o ângulo da ficha;
//  - a polia baixa, à frente das chapas, com o alto dela na altura das mãos (o cabo horizontal); as placas sobem o que o
//    cabo anda (a relação 1:1 da estação).
import ficha from '../dados/movimentos/remada-baixa-estacao.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { cabo, chao } from '../pecas';
import type { Peca } from '../pecas';
import { chapaDosPes, estacaoRemada, poliaBaixa, saidaDeBaixo, volumeDaPolia } from '../pecas-de-cena/estacao-remada';
import { montarTriangulo, trianguloRemada } from '../pecas-de-cena/triangulo-remada';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { folgaDaBarriga, frenteParaOPeito } from './polia-puxar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const g = (id: string) => obj('estacaoRemada', id);
const ZQ = f('assento.quadril');
const MEIA = obj('trianguloRemada', 'entrePegadas') / 2;

/** O que a calibração dá, para um corpo (só números, para ficar gravado em ../calibragens.ts). */
interface Calib {
  pelveY: number;
  /** O z da face das chapas dos pés. */
  zPlataforma: number;
  /** A altura das mãos (e do cabo) e a da polia baixa. */
  yMaos: number;
  yPolia: number;
  /** O z do meio das mãos no começo e no fim, para o certo e para cada erro. */
  zs: Record<string, [number, number]>;
  /** O comprimento do cabo com os braços estendidos (a pilha parte dele). */
  repouso: number;
}

const solto = (): PoseBraco => ({ polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
const tronco = (y: number, extra: Partial<PoseTronco> = {}): PoseTronco => ({ pelve: [0, y, ZQ], cervical: f('cervical'), cabeca: f('cabeca'), ...extra });
/** O pé na chapa: a bola do pé `pes.bolaAo` acima do centro da chapa, ao longo dela; a sola inteira na chapa. */
function perna(k: Lado, zPlataforma: number): PosePerna {
  const s = sinal(k);
  const C = chapaDosPes({ zPlataforma, xPlataforma: f('pes.meiaDistancia') }, s);
  const bola = add(C.centro, mul(C.sobe, f('pes.bolaAo')));
  const dir = norm(add(C.sobe, [s * f('pes.paraFora'), 0, 0]));
  return { pe: { bola, dir, calc: 0, normal: C.normal }, polo: norm([s * 0.25, 0.3, 1]) };
}
const pernas = (z: number) => ({ R: perna('R', z), L: perna('L', z) });

/** Os braços com as mãos nas pegadas do triângulo, o meio delas em (0, y, z). */
function bracos(t: Tronco, y: number, z: number, elev: number, prot: number, u: number, paraFora: number): Record<Lado, PoseBraco> {
  const T = t.torax;
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // para onde o cotovelo aponta: para baixo e um pouco para fora com o braço estendido (o polegar para cima); para
    // trás e para fora no fim (o antebraço passa ao lado da cintura)
    const ini: V3 = [s * f('cotovelo.paraFora.inicio'), -1, 0],
      fim: V3 = [s * paraFora, -0.35, -1];
    const polo = norm(dirRef(T, norm([mix(ini[0], fim[0], u), mix(ini[1], fim[1], u), mix(ini[2], fim[2], u)])));
    return { pegada: [s * MEIA, y, z], polo, mao: { polegar: [0, 1, 0], forma: 'pegada', diam: obj('trianguloRemada', 'pegadaDiam') }, elev, prot };
  };
  return { R: braco('R'), L: braco('L') };
}

/** O tronco do quadro: o peito na inclinação pedida, com a coluna (lombar, torácica, cervical) que o erro pedir. */
function troncoDe(corpo: Corpo, pelveY: number, peito: number, extra: Partial<PoseTronco> = {}): Tronco {
  const pose = tronco(pelveY, extra);
  return resolverTronco(corpo, { ...pose, frente: frenteParaOPeito(corpo, pose, peito) });
}

/** O que muda em cada erro: o peito no começo e no fim, a coluna no começo e para onde os cotovelos apontam no fim. */
function pedido(erro?: string) {
  let pIni = f('tronco'),
    pFim = f('tronco');
  let colunaIni: Partial<PoseTronco> = {};
  let paraFora = f('cotovelo.paraFora');
  if (erro === 'balanco') {
    pIni = f('erro.balanco.inicio');
    pFim = f('erro.balanco.fim');
  }
  if (erro === 'arred') colunaIni = { lombar: f('erro.arred.lombar'), toracica: f('erro.arred.toracica'), cervical: f('cervical') - f('erro.arred.cervical') };
  if (erro === 'abertos') paraFora = f('erro.abertos.paraFora');
  return { pIni, pFim, colunaIni, paraFora };
}

/** O z das mãos no começo e no fim: no fim, a 1 cm da barriga; no começo, onde os cotovelos dobram só `cotovelo.inicio`. */
function zsDasMaos(corpo: Corpo, pelveY: number, zP: number, yMaos: number, erro?: string): [number, number] {
  const p = pedido(erro);
  const pe = pernas(zP);
  const tFim = troncoDe(corpo, pelveY, p.pFim);
  const fim = resolver1((z) => folgaDaBarriga(resolverMembros(tFim, bracos(tFim, yMaos, z, 0, 0, 1, p.paraFora), pe)) - f('maos.folgaNoFim'), ZQ, ZQ + 40, 22);
  const tIni = troncoDe(corpo, pelveY, p.pIni, p.colunaIni);
  const ini = resolver1((z) => f('cotovelo.inicio') - resolverMembros(tIni, bracos(tIni, yMaos, z, 0, f('escapula.prot.inicio'), 0, p.paraFora), pe).lado.R.ang.cotovelo, fim + 10, fim + 80, 26);
  return [ini, fim];
}

function montar(corpo: Corpo, c: Omit<Calib, 'repouso'>, u: number, erro?: string): Esq {
  const p = pedido(erro);
  const [zi, zf] = c.zs[erro === 'balanco' || erro === 'arred' || erro === 'abertos' ? erro : 'certo']!;
  // a coluna curva no começo do erro "arredondar" e desfaz a curva na puxada; a bacia segue o peito pedido
  const coluna: Partial<PoseTronco> =
    erro === 'arred' ? { lombar: p.colunaIni.lombar! * (1 - u), toracica: p.colunaIni.toracica! * (1 - u), cervical: mix(p.colunaIni.cervical!, f('cervical'), u) } : {};
  const t = troncoDe(corpo, c.pelveY, mix(p.pIni, p.pFim, u), coluna);
  const elev = mix(f('escapula.elev.inicio'), f('escapula.elev.fim'), u);
  const prot = mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u);
  return resolverMembros(t, bracos(t, c.yMaos, mix(zi, zf, u), elev, prot, u, p.paraFora), pernas(c.zPlataforma));
}

const meioDasMaos = (e: Esq, y: number): V3 => [(e.lado.R.pegada[0] + e.lado.L.pegada[0]) / 2, y, (e.lado.R.pegada[2] + e.lado.L.pegada[2]) / 2];
/** O triângulo: o meio das pegadas no meio das mãos, a ponta para a polia baixa. */
function trianguloDe(e: Esq, c: Pick<Calib, 'yMaos' | 'yPolia' | 'zPlataforma'>) {
  const meio = meioDasMaos(e, c.yMaos);
  const P = poliaBaixa({ zPlataforma: c.zPlataforma, yPolia: c.yPolia });
  return montarTriangulo(meio, sub([0, c.yMaos, P[2]], meio));
}

function calibrar(corpo: Corpo): Calib {
  return calibragem(corpo, 'remada-baixa-estacao:sentado', () => {
    // sentado: a plataforma vai para a frente até o joelho dobrar o ângulo da ficha; o glúteo e as coxas apoiam no banco
    let pelveY = 52,
      zP = 80;
    const topo = g('assentoAltura') - f('assento.amassa');
    for (let i = 0; i < 5; i++) {
      const t = troncoDe(corpo, pelveY, f('tronco'));
      zP = resolver1((z) => resolverMembros(t, { R: solto(), L: solto() }, pernas(z)).lado.R.ang.joelho - f('joelho'), 40, 130, 32);
      const e = resolverMembros(t, { R: solto(), L: solto() }, pernas(zP));
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'pelve' || parte === 'coxa' || parte === 'cintura') && Math.abs(p[0]) < g('assentoLarg') / 2 && Math.abs(p[2]) < g('assentoComp') / 2) min = Math.min(min, p[1]);
      pelveY += topo - min;
    }
    const yMaos = pelveY + f('maos.acimaDoQuadril');
    // a polia baixa com o alto na altura das mãos: o cabo sai dela na horizontal
    const yPolia = yMaos - g('roldanaDiam') / 2;
    const zs: Record<string, [number, number]> = {};
    for (const k of ['certo', 'balanco', 'arred', 'abertos']) zs[k] = zsDasMaos(corpo, pelveY, zP, yMaos, k === 'certo' ? undefined : k);
    const parcial = { pelveY, zPlataforma: zP, yMaos, yPolia, zs };
    // o cabo mais curto do ciclo certo (os braços estendidos): dali as placas começam a subir
    let repouso = 1e9;
    for (let i = 0; i <= 20; i++) {
      const tri = trianguloDe(montar(corpo, parcial, i / 20), parcial);
      repouso = Math.min(repouso, dist(tri.ponta, saidaDeBaixo(parcial, tri.ponta)));
    }
    return { ...parcial, repouso };
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = montar(corpo, c, u, erro);
  const tri = trianguloDe(e, c);
  const pc = trianguloRemada(tri);
  const saida = saidaDeBaixo(c, tri.ponta);
  const comp = dist(tri.ponta, saida);
  const subida = Math.max(0, comp - c.repouso) / g('relacao') + f('pilha.folga');
  const E = estacaoRemada({ zPlataforma: c.zPlataforma, xPlataforma: f('pes.meiaDistancia'), yPolia: c.yPolia, subida, placas: f('placas') });
  const chapa = E.chapas[0]!;
  const pecas: Peca[] = [E.banco, E.plataforma, E.torre, pc.peca, { t: 'cabo', a: tri.ponta, b: saida }];
  return {
    esq: e,
    prims: [chao(-80, 80, E.extremos.zTras - 20, E.extremos.zFundo + 20), ...E.prims, volumeDaPolia(E.polia), ...pc.prims, cabo(tri.ponta, saida)],
    pecas,
    fios: [{ id: 'cabo', comp, estica: true, objeto: 'estacaoRemada' }],
    cargas: [],
    marcas: {
      maos: meioDasMaos(e, c.yMaos),
      ponta: tri.ponta,
      saida,
      'cabo.ponta': tri.ponta,
      'cabo.saida': saida,
      'cabo.roldana': E.polia,
      pilha: [0, subida, 0],
      chapa: chapa.centro,
      'chapa.normal': chapa.normal,
    },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const remadaBaixaEstacao: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'posterior'],
  quadro,
  // costas (o grande dorsal e o trapézio do meio e de baixo, como na remada aprovada); bíceps e deltoide posterior,
  // secundários (a ficha da técnica)
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { cotovelo: (q) => q.esq.lado.R.cotovelo },
};
