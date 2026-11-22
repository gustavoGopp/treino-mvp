// Hip thrust, no motor novo. Os números vêm da ficha (../dados/movimentos/hip-thrust.json).
//
// A parte de cima das costas apoia na borda comprida de um banco reto atravessado (../pecas-de-cena/banco-atravessado.ts),
// os pés ficam no chão e a barra longa com anilhas (../pecas-de-cena/barra-longa.ts), com a almofada de espuma, fica
// sobre a dobra do quadril, segura pelas duas mãos. A cada quadro: (1) a bacia inclina o que o instante pede, do quadril
// perto do chão (embaixo) ao quadril alinhado com o tronco e as coxas (em cima); (2) o corpo é posto de modo que o ponto
// das costas logo abaixo das escápulas fique na borda do banco (o corpo gira em volta dela, sem deslizar); (3) as pernas
// vão aos pés, presos no chão; (4) a barra fica presa à bacia ao longo do corpo e desce na vertical até a almofada
// encostar no corpo, como a carga nas pontes aprovadas (./ponte.ts); (5) as mãos vão até ela.
//
// O pé fica onde, no topo, a canela fica quase vertical; embaixo, o quadril desce até as anilhas ficarem perto do chão.
import ficha from '../dados/movimentos/hip-thrust.json';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { PecaPropria } from '../pecas';
import { bancoAtravessado, bordaDoBanco } from '../pecas-de-cena/banco-atravessado';
import { barraLonga, massaDaBarra, raioDaAnilhaMaior, raioDaPegada } from '../pecas-de-cena/barra-longa';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mix, noRef, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { peleDensa } from './com-barra-longa';
import { canelaDaVertical, faltaParaALinha } from './ponte';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const ANILHAS: IdAnilha[] = f('anilhas') === 20 ? ['anilha20'] : f('anilhas') === 10 ? ['anilha10'] : ['anilha5'];
const MASSA = massaDaBarra(ANILHAS);
const rAlmofada = () => obj('almofadaDaBarra', 'diam') / 2;
const meiaAlmofada = () => obj('almofadaDaBarra', 'comp') / 2;
/** Onde a almofada pode encostar: a barriga, a bacia e as coxas (as mãos e os braços ficam de fora: são eles que seguram). */
const ONDE_APOIA: ReadonlySet<string> = new Set(['tronco', 'cintura', 'emendaDaCintura', 'pelve', 'coxa']);
const GLUTEO: ReadonlySet<string> = new Set(['pelve']);
const BANCO = () => ({ x0: 0, z0: f('banco.z') });

/* ============================== o ponto das costas que apoia na borda ============================== */
const APOIOS = new Map<Corpo, V3>();
/**
 * O ponto da pele das costas, no referencial do tórax, que encosta na borda do banco: no meio das costas, a
 * `banco.abaixoDaEscapula` cm abaixo da ponta de baixo da escápula (ao longo do tronco), o mais para trás que a pele
 * vai nessa altura.
 */
function pontoDeApoio(corpo: Corpo): V3 {
  const ja = APOIOS.get(corpo);
  if (ja) return ja;
  const t = resolverTronco(corpo, { pelve: [0, 100, 0] });
  const solto = (k: Lado): PoseBraco => ({ pegada: add(t.torax.o, [sinal(k) * 22, -70, 0]), polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
  const perna: PosePerna = { coxa: [0, -1, 0], canela: [0, -1, 0], polo: [0, 0, 1], peDir: [0, 0, 1] };
  const e = resolverMembros(t, { R: solto('R'), L: solto('L') }, { R: perna, L: perna });
  const y = paraRef(e.torax, e.lado.R.escapula.anguloInferior)[1] - f('banco.abaixoDaEscapula');
  let melhor: V3 = [0, y, 0];
  for (const p of peleDensa(e, new Set(['tronco']))) {
    const l = paraRef(e.torax, p);
    if (Math.abs(l[0]) < 2 && Math.abs(l[1] - y) < 0.8 && l[2] < melhor[2]) melhor = [0, y, l[2]];
  }
  APOIOS.set(corpo, melhor);
  return melhor;
}

/* ============================== a pose ============================== */
interface Pedido {
  frente: number;
  lombar: number;
  calc: number;
  /** Quanto o banco desliza para trás (cm; só no erro). */
  desliza: number;
}
/** O tronco com o ponto de apoio na borda do banco (deslizado `desliza` cm para trás). */
function troncoNoBanco(corpo: Corpo, p: Pedido): Tronco {
  const pose = { frente: p.frente, lombar: p.lombar, cervical: f('cervical'), cabeca: f('cabeca') };
  const t0 = resolverTronco(corpo, { pelve: [0, 0, 0], ...pose });
  const borda = add(bordaDoBanco(BANCO()), [0, 0, -p.desliza]);
  return resolverTronco(corpo, { pelve: sub(borda, noRef(t0.torax, pontoDeApoio(corpo))), ...pose });
}
const pernas = (zBola: number, calc: number): Record<Lado, PosePerna> => {
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * f('pes.meiaDistancia'), 0, zBola], dir: [0, 0, 1], calc }, polo: [0, 1, 0.15] });
  return { R: perna('R'), L: perna('L') };
};
const pendurados = (t: Tronco): Record<Lado, PoseBraco> => {
  const b = (k: Lado): PoseBraco => ({ pegada: add(t.torax.o, [sinal(k) * 30, -10, 30]), polo: [sinal(k), -1, 0], mao: { polegar: [0, 0, -1] } });
  return { R: b('R'), L: b('L') };
};
/** O esqueleto sem a barra (os braços de lado), para achar a barra. */
const semBarra = (corpo: Corpo, zBola: number, p: Pedido): Esq => {
  const t = troncoNoBanco(corpo, p);
  return resolverMembros(t, pendurados(t), pernas(zBola, p.calc));
};

/**
 * A menor altura do centro da barra, em (0, ?, z), em que a almofada (um cilindro ao longo de x) não entra na pele da
 * barriga, da bacia e das coxas.
 */
function alturaDaAlmofada(pele: V3[], z: number): number {
  const r = rAlmofada(),
    m = meiaAlmofada();
  let y = -1e9;
  for (const p of pele) {
    if (Math.abs(p[0]) > m) continue;
    const dz = Math.abs(p[2] - z);
    if (dz < r) y = Math.max(y, p[1] + Math.sqrt(r * r - dz * dz));
  }
  return y;
}
/**
 * A barra sobre o quadril: a almofada assenta, por gravidade, no vale entre a barriga e as coxas (a dobra do quadril),
 * e as mãos a seguram ali. Em cada quadro, a altura em que a almofada encosta no corpo é medida de meio em meio
 * centímetro ao longo do corpo, de 15 cm para o lado da cabeça a 25 cm para o lado dos pés do meio dos quadris, e a
 * barra fica no ponto mais baixo. No alto o corpo fica quase reto e o vale some (a barra rolaria para os joelhos): as
 * mãos a seguram perto da dobra, o que a conta faz somando à altura uma penalidade que cresce com a distância a
 * `barra.dobra` cm à frente dos quadris (o ponto escolhido é o mais baixo dessa soma, com a parábola pelos três pontos
 * em volta dele, para não pular de meio em meio centímetro).
 */
function barraNoQuadril(e: Esq): V3 {
  const pele = peleDensa(e, ONDE_APOIA);
  const zQ = (e.lado.R.quadril[2] + e.lado.L.quadril[2]) / 2;
  const passo = 0.5;
  const zs: number[] = [],
    ys: number[] = [];
  const zc = zQ + f('barra.dobra'),
    k = f('barra.segura');
  for (let z = zQ - 15; z <= zQ + 25; z += passo) {
    zs.push(z);
    const y = alturaDaAlmofada(pele, z);
    ys.push(y > -1e8 ? y + k * (z - zc) ** 2 : 1e9);
  }
  let i = 1;
  for (let j = 1; j < ys.length - 1; j++) if (ys[j]! < ys[i]!) i = j;
  const a = ys[i - 1]!,
    b = ys[i]!,
    c = ys[i + 1]!;
  const den = a - 2 * b + c;
  const t = den > 1e-9 ? Math.max(-0.5, Math.min(0.5, (a - c) / (2 * den))) : 0;
  const z = zs[i]! + t * passo;
  return [0, alturaDaAlmofada(pele, z), z];
}

/* ============================== a calibração ============================== */
interface Calibracao {
  zBola: number;
  /** A inclinação da bacia embaixo e em cima. */
  ini: number;
  fim: number;
}
const CAL = new Map<Corpo, Calibracao>();
function calibrar(corpo: Corpo): Calibracao {
  const ja = CAL.get(corpo);
  if (ja) return ja;
  const c = calibragem(corpo, `${F.id}:calibrar`, (): Calibracao => {
    const ped = (frente: number): Pedido => ({ frente, lombar: 0, calc: 0, desliza: 0 });
    // em cima: a bacia inclina até ombro, quadril e joelho ficarem em linha; o pé fica onde a canela fica quase vertical
    const fimPara = (zBola: number) => resolver1((fr) => faltaParaALinha(semBarra(corpo, zBola, ped(fr))) - f('quadril.topo'), -60, -120, 26);
    const canela = (zBola: number) => {
      const e = semBarra(corpo, zBola, ped(fimPara(zBola)));
      return Math.sign(e.lado.R.tornozelo[2] - e.lado.R.joelho[2]) * canelaDaVertical(e) - f('canela.topo');
    };
    const zBola = resolver1(canela, 45, 90, 24);
    const fim = fimPara(zBola);
    // embaixo: a bacia inclina até o glúteo ficar à folga da ficha do chão
    const gluteo = (fr: number) => Math.min(...peleDensa(semBarra(corpo, zBola, ped(fr)), GLUTEO).map((p) => p[1]));
    const ini = resolver1((fr) => gluteo(fr) - f('quadril.folgaEmbaixo'), fim, -5, 26);
    return { zBola, ini, fim };
  });
  CAL.set(corpo, c);
  return c;
}

/* ============================== a animação ============================== */
/** O pedido de cada instante: a subida vai de 0 (embaixo) a 1 (em cima); `v` é quanto do caminho o quadril faz. */
function pedido(c: Calibracao, u: number, erro?: string): { p: Pedido; v: number } {
  const v = erro === 'e3' ? u * f('erro.raso.fracao') : u;
  const lombar = erro === 'e1' ? f('erro.lombar.lombar') * u : 0;
  return {
    v,
    p: {
      frente: mix(c.ini, c.fim, v) - lombar * f('erro.lombar.bacia'),
      lombar,
      calc: erro === 'e2' ? f('erro.calcanhar.calc') * u : 0,
      desliza: erro === 'e4' ? f('erro.banco.desliza') * u : 0,
    },
  };
}
/**
 * Onde a barra fica na bacia ao longo da subida, em 25 pontos (no referencial da bacia), alisado (média com os
 * vizinhos, cinco vezes; as pontas ficam): achado quadro a quadro, o fundo do vale andaria aos saltos com os pontos da
 * pele, e a barra e as mãos tremeriam. Só a lombar arqueada muda a forma da barriga: ela tem a sua tabela; nos outros
 * erros a barra fica onde fica no certo, para a mesma inclinação da bacia.
 */
const N = 24;
const TABELAS = new Map<string, { corpo: Corpo; t: V3[] }>();
function tabelaDaBarra(corpo: Corpo, c: Calibracao, chave: '' | 'e1'): V3[] {
  const ja = TABELAS.get(chave);
  if (ja?.corpo === corpo) return ja.t;
  const t = calibragem(corpo, `${F.id}:barra:${chave}`, () => {
    let pts: V3[] = [];
    for (let i = 0; i <= N; i++) {
      const e0 = semBarra(corpo, c.zBola, pedido(c, i / N, chave || undefined).p);
      pts.push(paraRef(e0.pelve, barraNoQuadril(e0)));
    }
    const viz = (v: V3[], i: number) => v[Math.max(0, Math.min(N, i))]!;
    for (let k = 0; k < 5; k++) {
      const v = pts;
      pts = v.map((x, i) => (i === 0 || i === N ? x : ([0, 1, 2].map((j) => (viz(v, i - 1)[j]! + 2 * x[j]! + viz(v, i + 1)[j]!) / 4) as V3)));
    }
    return pts;
  });
  TABELAS.set(chave, { corpo, t });
  return t;
}
/** Catmull-Rom pelos pontos da tabela. */
function naTabela(b: V3[], u: number): V3 {
  const x = Math.max(0, Math.min(1, u)) * N,
    i = Math.min(N - 1, Math.floor(x)),
    t = x - i;
  const p = (j: number) => b[Math.max(0, Math.min(N, j))]!;
  return [0, 1, 2].map((k) => {
    const p0 = p(i - 1)[k]!,
      p1 = p(i)[k]!,
      p2 = p(i + 1)[k]!,
      p3 = p(i + 2)[k]!;
    return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }) as V3;
}
function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const { p, v } = pedido(c, u, erro);
  const e0 = semBarra(corpo, c.zBola, p);
  const local = erro === 'e1' ? naTabela(tabelaDaBarra(corpo, c, 'e1'), u) : naTabela(tabelaDaBarra(corpo, c, ''), v);
  const noMundo = noRef(e0.pelve, local);
  const centro: V3 = [0, noMundo[1], noMundo[2]];
  const x = f('maos.meiaDistancia');
  const bracos = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return {
      pegada: [s * x, centro[1], centro[2]],
      polo: [s * f('maos.poloFora'), -1, -f('maos.poloCabeca')],
      // as mãos por cima da barra, o polegar por dentro
      mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: 2 * raioDaPegada() },
    };
  };
  const e = resolverMembros(e0, { R: bracos('R'), L: bracos('L') }, pernas(c.zBola, p.calc));
  const B = barraLonga({ centro, eixo: [1, 0, 0], anilhas: ANILHAS });
  const banco = { ...BANCO(), z0: BANCO().z0 - p.desliza };
  const Banco = bancoAtravessado(banco);
  return {
    esq: e,
    prims: [chao(-70, 70, -90, 90), ...Banco.prims, ...B.prims],
    pecas: [Banco.peca, B.peca, almofada(centro)],
    fios: [],
    cargas: [{ massa: MASSA, pos: centro }],
    marcas: { barra: centro, pegaR: [-x, centro[1], centro[2]], pegaL: [x, centro[1], centro[2]], borda: bordaDoBanco(banco), anilhaEmbaixo: [0, centro[1] - raioDaAnilhaMaior(ANILHAS), centro[2]] },
  };
}
/** A almofada de espuma em volta do meio da barra. */
function almofada(centro: V3): PecaPropria {
  return {
    t: 'propria',
    nome: 'almofada da barra',
    desenhar(C, M) {
      C.cilindro(add(centro, [-meiaAlmofada(), 0, 0]), add(centro, [meiaAlmofada(), 0, 0]), rAlmofada(), M.borracha, { lados: 18 });
    },
  };
}

export const hipThrust: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // só o glúteo, principal, sem secundário: é o que a biblioteca conta (a ficha da técnica propõe os posteriores como
  // secundário, e a biblioteca não os tem)
  papeis: { gluteo: 'p' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, barra: (q) => q.marcas.barra! },
};
