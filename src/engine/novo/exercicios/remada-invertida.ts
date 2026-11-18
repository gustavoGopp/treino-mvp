// Remada invertida no smith, no motor novo (primeira animação deste exercício: até aqui ele era só cartão de texto).
// Os números vêm da ficha (../dados/movimentos/remada-invertida.json). A ficha da técnica aceita a barra do suporte, a
// do smith ou uma barra baixa de praça; aqui é o smith aprovado (../pecas-de-cena/smith.ts), com a barra travada nos
// ganchos (a montagem segura do cartão), no pino mais perto da altura da cintura.
//
// O corpo é o da remada na suspensão aprovada (o núcleo ./na-fita.ts, sem mudar nada nele): reto como uma prancha, os
// calcanhares parados no chão com a ponta do pé para cima, girando no tornozelo. O que muda é o que as mãos seguram: a
// barra não anda, e as mãos ficam presas nela (a pegada pronada, um pouco mais aberta que os ombros). O que ele resolve,
// em vez de receber pronto:
//  - em cima: o ângulo do corpo em que o peito encosta na barra, e onde fica a barra (para a frente e para trás) para
//    ela encostar na linha do peito que a ficha pede;
//  - embaixo: o ângulo do corpo em que os braços estendem até o cotovelo da ficha;
//  - no caminho, o ângulo do corpo vai de um ao outro, e cada braço sai do ombro até a pegada, com o cotovelo para trás
//    (para o chão) e um pouco para fora.
import ficha from '../dados/movimentos/remada-invertida.json';
import { calibragem } from '../calibragens';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { cantosDoSmith, centroDaBarraDoSmith, raioDaBarraDoSmith, smith } from '../pecas-de-cena/smith';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, norm } from '../vec';
import type { V3 } from '../vec';
import { folgaDaBarraNaPele } from '../regras/smith';
import { criarNaFita } from './na-fita';
import type { Bracos, Inclinacao } from './na-fita';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const tan7 = Math.tan(obj('smith', 'guiaInclina') * (Math.PI / 180));
/** A guia sobe para +z (para os pés de quem está deitado embaixo dela). */
const SOBE = 1;
/** A altura do centro da barra travada no gancho. */
const Y_BARRA = f('barra.pino') + f('barra.sobreOPino');

const NF = criarNaFita({ sentido: 'de-frente', apoio: 'calcanhares', pesMeia: f('pes.meiaDistancia'), pe: f('pe.pontaSobe'), zPe: 0, joelho: f('joelho'), cervical: f('pescoco.flexao'), cabeca: 0 });

interface Calib {
  /** Onde fica a barra para a frente (z) e o ângulo do corpo embaixo e em cima (graus da vertical). */
  zBarra: number;
  th0: number;
  th1: number;
  /** No erro da descida solta: o ângulo em que o cotovelo trava, com as escápulas soltas. */
  thTrava: number;
}

const barraEm = (z: number): V3 => [0, Y_BARRA, z];
/** O centro de cada pegada, na barra. */
const pegadaNaBarra = (corpo: Corpo, z: number, k: Lado): V3 => [(sinal(k) * f('pegada.largura') * corpo.m('largura.biacromial')) / 2, Y_BARRA, z];

/** Os braços: cada mão fechada na barra, pronada (o polegar para dentro), o cotovelo para trás e um pouco para fora. */
function bracosNaBarra(corpo: Corpo, z: number, esc: { elev: number; prot: number }): Bracos {
  return (t) => {
    const lado = (k: Lado): PoseBraco => ({
      pegada: pegadaNaBarra(corpo, z, k),
      polo: norm(dirRef(t.torax, [sinal(k) * f('cotovelo.polo.fora'), 0, -1])),
      mao: { polegar: [-sinal(k), 0, 0], forma: 'pegada', diam: 2 * raioDaBarraDoSmith() },
      elev: esc.elev,
      prot: esc.prot,
    });
    return { R: lado('R'), L: lado('L') };
  };
}
/** Os braços soltos, para baixo (só para calibrar a linha do peito, que não depende deles). */
const SOLTOS: Bracos = () => {
  const b: PoseBraco = { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  return { R: b, L: b };
};

function calibrar(corpo: Corpo): Calib {
  return calibragem(corpo, 'remada-invertida:barra', () => {
    // em cima: para cada ângulo do corpo, o ponto da linha do peito (a `barra.noPeito` cm da sétima cervical, ao longo
    // do tronco, na frente dele) sobe e desce; o ângulo em que a barra, encostada nesse ponto, fica na altura dela
    const naLinha = (th: number) => {
      const e = NF.montar(corpo, { theta: th }, SOLTOS).e;
      // a barra no plano do meio do corpo, na linha do peito, a uma folga da pele: anda para fora do peito até a folga
      const T = e.torax;
      const base = add(T.o, dirRef(T, [0, -f('barra.noPeito'), 0]));
      const fora = norm(dirRef(T, [0, 0, 1]));
      const d = resolver1((s) => folgaDaBarraNaPele(e, add(base, [fora[0] * s, fora[1] * s, fora[2] * s])) - f('barra.folgaEmCima'), 5, 40, 24);
      return add(base, [fora[0] * d, fora[1] * d, fora[2] * d]);
    };
    const th1 = resolver1((th) => naLinha(th)[1] - Y_BARRA, 15, 88, 30);
    const zBarra = naLinha(th1)[2];
    // embaixo: o ângulo em que o cotovelo dobra o que a ficha pede, com as mãos na barra
    const esc0 = { elev: 0, prot: f('escapula.prot.inicio') };
    const th0 = resolver1((th) => NF.montar(corpo, { theta: th }, bracosNaBarra(corpo, zBarra, esc0)).e.lado.R.ang.cotovelo - f('cotovelo.embaixo'), th1, 89.5, 26);
    const escSolta = { elev: f('erro.solta.elev'), prot: f('erro.solta.prot') };
    const thTrava = resolver1((th) => NF.montar(corpo, { theta: th }, bracosNaBarra(corpo, zBarra, escSolta)).e.lado.R.ang.cotovelo - f('erro.solta.cotovelo'), th0, 89.9, 26);
    return { zBarra, th0, th1, thTrava };
  });
}

function montar(corpo: Corpo, u: number, erro?: string) {
  const c = calibrar(corpo);
  let uu = u;
  const inc: Omit<Inclinacao, 'theta'> = {};
  let esc = { elev: f('escapula.elev.fim') * u, prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u) };
  let cervical = 0,
    cabeca = 0;
  if (erro === 'quadril') {
    uu = u * f('erro.quadril.fracao');
    inc.dobra = f('erro.quadril.dobra') * u;
  }
  if (erro === 'queixo') {
    uu = u * f('erro.queixo.fracao');
    cervical = f('erro.queixo.cervical') * u;
    cabeca = f('erro.queixo.cabeca') * u;
    esc = { elev: f('escapula.elev.fim') * uu, prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), uu) };
  }
  let theta = mix(c.th0, c.th1, uu);
  if (erro === 'solta') {
    // embaixo, o corpo cai até o cotovelo travar e as escápulas se soltam (sobem e vão à frente)
    const s = 1 - u;
    esc = { elev: mix(f('escapula.elev.fim') * u, f('erro.solta.elev'), s), prot: mix(esc.prot, f('erro.solta.prot'), s) };
    theta = mix(theta, c.thTrava, s);
  }
  const NFa = cervical || cabeca ? criarNaFita({ sentido: 'de-frente', apoio: 'calcanhares', pesMeia: f('pes.meiaDistancia'), pe: f('pe.pontaSobe'), zPe: 0, joelho: f('joelho'), cervical: f('pescoco.flexao') + cervical, cabeca }) : NF;
  const m = NFa.montar(corpo, { ...inc, theta }, bracosNaBarra(corpo, c.zBarra, esc));
  return { e: m.e, c };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const { e, c } = montar(corpo, u, erro);
  const barra = barraEm(c.zBarra);
  // a linha da guia passa pelo centro da barra travada
  const base: V3 = [0, 0, c.zBarra - SOBE * Y_BARRA * tan7];
  const S = smith({
    base,
    sobePara: SOBE,
    barra: Y_BARRA,
    trava: Y_BARRA - f('trava.abaixo'),
    // travada: o gancho deitado para trás, preso no pino
    gancho: 0,
    anilhas: [],
    // de lado, a guia, o carro e o montante do lado de perto cobririam o corpo: vão para trás dele, como cenário
    atras: -1,
    // o quadro mostra a máquina de um montante ao outro, até `quadro.ate` cm, e só `quadro.fundo` cm para cada lado da
    // barra: o resto (o fundo e o alto da máquina) é cortado pela borda, para o corpo ocupar o quadro e os rótulos caberem
    noQuadro: cantosDoSmith({ base, sobePara: SOBE }, f('quadro.ate')).map((p): V3 => [p[0], p[1], c.zBarra + Math.sign(p[2] - c.zBarra) * f('quadro.fundo')]),
  });
  const r = raioDaBarraDoSmith();
  const meia = (obj('smith', 'guiasEntre') - obj('smith', 'carroLarg')) / 2;
  return {
    esq: e,
    prims: [chao(-90, 90, -110, 170), ...S.prims],
    pecas: S.pecas,
    fios: [],
    cargas: [],
    marcas: {
      barra,
      guia: centroDaBarraDoSmith({ base, sobePara: SOBE }, Y_BARRA),
      'barra.R': pegadaNaBarra(corpo, c.zBarra, 'R'),
      'barra.L': pegadaNaBarra(corpo, c.zBarra, 'L'),
      raio: [r, 0, 0],
      'eixo.a': [-meia, Y_BARRA, c.zBarra],
      'eixo.b': [meia, Y_BARRA, c.zBarra],
      pino: [0, f('barra.pino'), 0],
      // a linha do peito pedida (para a regra do peito na barra): a `barra.noPeito` cm da sétima cervical, no tronco
      linhaDoPeito: [f('barra.noPeito'), 0, 0],
    },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const remadaInvertida: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // a biblioteca: costas (principal: dorsal e meio das costas); bíceps e ombro de trás (secundários), como na remada
  // na suspensão aprovada
  papeis: { dorsal: 'p', trapMedInf: 'p', deltPost: 's', biceps: 's' },
  trajetorias: { ombro: (q) => q.esq.lado.R.ombro, quadril: (q) => q.esq.pelve.o },
};
