// Ponte de glúteo com os pés na bola, no motor novo. Os números vêm da ficha (../dados/movimentos/ponte-pes-bola.json);
// a ponte de costas é a do núcleo das flexões de joelho deitado (./flexao-joelho.ts, `ponteDeCostas`), com os
// calcanhares no alto da bola suíça (../pecas-de-cena/bola-suica.ts), como na flexão de joelho na bola. Deitado de
// costas, braços abertos no chão; o quadril sobe até ombros, quadril e joelhos ficarem em linha e desce até quase
// encostar no chão. A bola fica parada: o calcanhar não sai do lugar, e o joelho dobra o que for preciso para isso (a
// distância do ombro ao calcanhar muda quando o quadril sobe). O que se resolve, em vez de receber pronto:
//  - embaixo: a bacia desce até a pele do glúteo ficar a `quadril.folgaEmbaixo` cm do chão, com o joelho quase
//    estendido (`joelho.baixo`); ali fica o calcanhar, e a bola é posta debaixo dele;
//  - em cada quadro: a coxa e o joelho que deixam o pé assentado na bola, com o calcanhar no mesmo lugar e o pé na
//    mesma direção (o tornozelo dobra o que a canela gira);
//  - no topo: a bacia sobe até ombro, quadril e joelho ficarem em linha.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/ponte-pes-bola.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, resolver2, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { bolaSuica, formaDaBola } from '../pecas-de-cena/bola-suica';
import type { Corpo } from '../tabelas';
import { dist, mix, noRef, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { bracosNoChao, folgaDaPelve, peAoChao, troncoDeCostas } from './flexao-joelho';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

/**
 * Onde o pé encosta na bola, embaixo: na linha dos pés (os pés na largura do quadril, fora do meio da bola),
 * `bola.alemDoCalcanhar` cm antes do alto dela (do lado do corpo), menos o que ela cede.
 */
function apoioNaBola(corpo: Corpo): number {
  const B = formaDaBola(),
    x = corpo.m('quadril.meiaDistancia'),
    dz = f('bola.alemDoCalcanhar');
  return B.alturaDoCentro + Math.sqrt(B.R * B.R - x * x - dz * dz) - f('pe.afundaNaBola');
}
/** A superfície do pé direito, no referencial do pé, uma vez por corpo (para medir o pé contra a bola sem refazer o Boneco). */
const PE = new WeakMap<Corpo, V3[]>();
function superficieDoPe(corpo: Corpo, e: Esq): V3[] {
  let s = PE.get(corpo);
  // a primeira pose que passa por aqui é uma da calibração; com a calibração guardada, a superfície vem guardada junto,
  // para o pé ser medido sempre com os mesmos pontos (../calibragens.ts)
  if (!s)
    PE.set(
      corpo,
      (s = calibragem(corpo, `${F.id}:superficie-do-pe`, () =>
        pontosDoBoneco(e)
          .filter((x) => x.parte === 'pe' && x.p[0] < 0)
          .map((x) => paraRef(e.lado.R.pe, x.p)),
      )),
    );
  return s;
}
/** Quanto o pé direito fica fora da bola (cm; negativo = afunda nela). */
function peNaBola(corpo: Corpo, e: Esq, centro: V3): number {
  const R = formaDaBola().R;
  let m = 1e9;
  for (const p of superficieDoPe(corpo, e)) m = Math.min(m, dist(noRef(e.lado.R.pe, p), centro) - R);
  return m;
}
/** O ponto do pé que apoia na bola (o mais baixo da sola, como média pesada pela altura). */
function apoioDoPe(e: Esq): number {
  const pts = pontosDoBoneco(e).filter((x) => x.parte === 'pe' && x.p[0] < 0).map((x) => x.p);
  const min = Math.min(...pts.map((p) => p[1]));
  let s = 0,
    z = 0;
  for (const p of pts) {
    const w = Math.exp(-(p[1] - min) / 0.4);
    s += w;
    z += w * p[2];
  }
  return z / s;
}

/** Direção no plano de lado (y, z), pelo ângulo em graus a partir de +z, girando para +y. */
const noPlano = (a: number): V3 => [0, Math.sin(a * rad), Math.cos(a * rad)];
const anguloNoPlano = (v: V3) => Math.atan2(v[1], v[2]) / rad;

/**
 * A ponte com a bacia em `frente`: o tronco de costas (ombros, costas e cabeça no chão) e os braços no chão, do núcleo
 * (./flexao-joelho.ts); as pernas paralelas, na largura do quadril, com a coxa a `aCoxa` graus e o joelho dobrado `j`.
 * O pé aponta `aPe` graus (no plano de lado), ou, sem ele, `pe.angulo` além do ângulo reto com a canela.
 */
function ponte(corpo: Corpo, frente: number, lombar: number, aCoxa: number, j: number, aPe?: number, cervical?: number, alturaDaBacia?: number): Esq {
  const t = cervical === undefined ? troncoDeCostas(corpo, frente, lombar, f('ombro.z')).t : troncoComOPescoco(corpo, frente, lombar, cervical, alturaDaBacia);
  const a = f('bracos.abertura') * rad,
    L = (corpo.m('braco.comp') + corpo.m('antebraco.comp')) * f('bracos.alcance');
  const bracos = bracosNoChao(corpo, f('ombro.z'), L * Math.cos(a), L * Math.sin(a));
  const aCanela = aCoxa - j;
  const perna: PosePerna = { coxa: noPlano(aCoxa), canela: noPlano(aCanela), peDir: noPlano(aPe ?? aCanela + 90 + f('pe.angulo')), polo: noPlano(aCoxa + 90) };
  return resolverMembros(t, bracos, { R: perna, L: perna });
}
/**
 * O tronco de costas do núcleo, mas com o pescoço dado: o núcleo acha a dobra do pescoço pelo ponto mais baixo da
 * cabeça, que pula de um ponto da superfície para o vizinho, e a cabeça andava aos trancos (até 30% de salto de
 * velocidade). Aqui a dobra do pescoço é a do núcleo embaixo e no topo, e vai de uma à outra junto com a bacia.
 */
function troncoComOPescoco(corpo: Corpo, frente: number, lombar: number, cervical: number, alturaDaBacia?: number): Tronco {
  // a posição da bacia não depende do pescoço (as costas apoiam no chão e o ombro fica em `ombro.z`)
  const ref = troncoDeCostas(corpo, frente, lombar, f('ombro.z')).t;
  const pelve: V3 = [ref.pose.pelve[0], alturaDaBacia ?? ref.pose.pelve[1], ref.pose.pelve[2]];
  return resolverTronco(corpo, { ...ref.pose, pelve, cervical });
}
/**
 * A altura da bacia, como uma parábola na inclinação dela (mínimos quadrados em 13 pontos do caminho): o núcleo põe as
 * costas no chão pelo ponto mais baixo delas, que também pula de um ponto para o vizinho (a cabeça andava aos trancos).
 */
function parabolaDaBacia(corpo: Corpo, baixo: number, topo: number): [number, number, number] {
  const S: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    b = [0, 0, 0];
  for (let i = 0; i <= 12; i++) {
    const s = i / 12,
      y = troncoDeCostas(corpo, mix(baixo, topo, s), 0, f('ombro.z')).t.pose.pelve[1];
    const v = [1, s, s * s];
    for (let r = 0; r < 3; r++) {
      b[r]! += v[r]! * y;
      for (let k = 0; k < 3; k++) S[r]![k]! += v[r]! * v[k]!;
    }
  }
  // Cramer
  const det = (M: number[][]) => M[0]![0]! * (M[1]![1]! * M[2]![2]! - M[1]![2]! * M[2]![1]!) - M[0]![1]! * (M[1]![0]! * M[2]![2]! - M[1]![2]! * M[2]![0]!) + M[0]![2]! * (M[1]![0]! * M[2]![1]! - M[1]![1]! * M[2]![0]!);
  const D = det(S);
  const col = (k: number) => S.map((row, r) => row.map((x, j) => (j === k ? b[r]! : x)));
  return [det(col(0)) / D, det(col(1)) / D, det(col(2)) / D];
}
/** O pescoço que o núcleo acha para a cabeça encostar no chão. */
const pescocoDoNucleo = (corpo: Corpo, frente: number, lombar = 0) => troncoDeCostas(corpo, frente, lombar, f('ombro.z')).t.pose.cervical ?? 0;
/** De lado, quanto a coxa sai da linha do ombro ao quadril (graus; 0 = ombro, quadril e joelho em linha). */
const foraDaLinha = (e: Esq) => anguloNoPlano(sub(e.lado.R.quadril, e.lado.R.ombro)) - anguloNoPlano(sub(e.lado.R.joelho, e.lado.R.quadril));

interface Calibrado {
  topo: number;
  baixo: number;
  /** Embaixo: o ângulo da coxa; a direção do pé (que não muda: o calcanhar fica assentado na bola); onde fica o
   * calcanhar (o centro do osso, em z) e o centro da bola. */
  aCoxa: number;
  aPe: number;
  /** O pescoço do núcleo embaixo e no topo. */
  cervBaixo: number;
  cervTopo: number;
  /** A altura da bacia (parábola na fração do caminho de baixo ao topo), sem os trancos do ponto mais baixo das costas. */
  bacia?: [number, number, number];
  zCalcanhar: number;
  zBola: number;
}
const CACHE = new WeakMap<Corpo, Calibrado>();
/** A calibração demorada (centenas de poses) vem guardada para o corpo do app: ../calibragens.ts. */
function calibrar(corpo: Corpo): Calibrado {
  return calibragem(corpo, `${F.id}:calibrar`, () => calibrarDoZero(corpo));
}
function calibrarDoZero(corpo: Corpo): Calibrado {
  const ja = CACHE.get(corpo);
  if (ja) return ja;
  const apoio = apoioNaBola(corpo);
  // embaixo: a bacia desce até a pele do glúteo ficar a `quadril.folgaEmbaixo` cm do chão; o joelho quase estendido
  // (`joelho.baixo`); a coxa gira até o pé chegar à altura do apoio na bola. Ali fica o calcanhar, e a bola é posta
  // debaixo dele
  const baixo = resolver1((fr) => folgaDaPelve(corpo, fr, 0) - f('quadril.folgaEmbaixo'), -85, -130, 30);
  const aCoxa = resolver1((a) => peAoChao(corpo, ponte(corpo, baixo, 0, a, f('joelho.baixo'))) - apoio, -10, 80, 30);
  const e0 = ponte(corpo, baixo, 0, aCoxa, f('joelho.baixo'));
  superficieDoPe(corpo, e0);
  const zBola = apoioDoPe(e0) + f('bola.alemDoCalcanhar');
  // de novo, contra a bola de verdade (a esfera, e não o plano do alto dela): a coxa gira até o pé encostar nela
  const B0 = formaDaBola();
  const centro0: V3 = [0, B0.alturaDoCentro, zBola];
  const aCoxa1 = resolver1((a) => peNaBola(corpo, ponte(corpo, baixo, 0, a, f('joelho.baixo')), centro0) + f('pe.afundaNaBola'), -10, 80, 30);
  const e = ponte(corpo, baixo, 0, aCoxa1, f('joelho.baixo'));
  const aPe = anguloNoPlano(e.lado.R.pe.z);
  const parcial = { baixo, aCoxa: aCoxa1, aPe, cervBaixo: 0, cervTopo: 0, zCalcanhar: e.lado.R.calcanhar[2], zBola, topo: baixo };
  // no topo: a bacia sobe até ombro, quadril e joelho ficarem em linha (o joelho sai da conta que segura o calcanhar)
  const topo = resolver1((fr) => foraDaLinha(ponteNoCalcanhar(corpo, parcial, fr, parcial.zCalcanhar, centro0)), parcial.baixo - 5, -175, 26);
  const c = { ...parcial, topo, cervBaixo: pescocoDoNucleo(corpo, baixo), cervTopo: pescocoDoNucleo(corpo, topo), bacia: parabolaDaBacia(corpo, baixo, topo) };
  CACHE.set(corpo, c);
  return c;
}
/** A ponte com a bacia em `frente`: a coxa e o joelho que põem o pé na bola com o calcanhar em `zCalc`. */
/** O pescoço numa inclinação da bacia: o do núcleo embaixo e no topo, e entre os dois, junto com a bacia. */
/**
 * A direção do pé: embaixo, a da ficha; depois o pé acompanha só uma parte (`pe.acompanha`) do giro da canela. O
 * calcanhar fica assentado na bola, e o tornozelo dobra o resto (com o pé parado no mundo, a dorsiflexão passava do
 * máximo observado).
 */
const direcaoDoPe = (c: Calibrado, aCoxa: number, j: number) => c.aPe + f('pe.acompanha') * (aCoxa - j - (c.aCoxa - f('joelho.baixo')));
const pescoco = (c: Calibrado, frente: number) => mix(c.cervBaixo, c.cervTopo, (frente - c.baixo) / (c.topo - c.baixo));
function ponteNoCalcanhar(corpo: Corpo, c: Calibrado, frente: number, zCalc: number, centro: V3, lombar = 0): Esq {
  // só no movimento certo (sem a lombar arqueada); na calibração, o tronco do núcleo
  const suaviza = c.bacia !== undefined && lombar === 0;
  const cerv = suaviza ? pescoco(c, frente) : undefined;
  const s = (frente - c.baixo) / (c.topo - c.baixo);
  const yB = suaviza ? c.bacia![0] + c.bacia![1] * s + c.bacia![2] * s * s : undefined;
  const [aCoxa, j] = resolver2((a, j) => {
    const e = ponte(corpo, frente, lombar, a, j, direcaoDoPe(c, a, j), cerv, yB);
    return [peNaBola(corpo, e, centro) + f('pe.afundaNaBola'), e.lado.R.calcanhar[2] - zCalc];
  }, c.aCoxa, f('joelho.baixo'), 20);
  return ponte(corpo, frente, lombar, aCoxa, j, direcaoDoPe(c, aCoxa, j), cerv, yB);
}
/** Erro "bola foge": a perna estica (o joelho em `j`) e a bacia desce o que for preciso para o pé seguir na bola. */
function ponteComAPernaEsticada(corpo: Corpo, c: Calibrado, j: number, zCalc: number, centro: V3): Esq {
  const [fr, aCoxa] = resolver2((fr, a) => {
    const e = ponte(corpo, fr, 0, a, j, direcaoDoPe(c, a, j));
    return [peNaBola(corpo, e, centro) + f('pe.afundaNaBola'), e.lado.R.calcanhar[2] - zCalc];
  }, c.baixo, c.aCoxa, 20);
  return ponte(corpo, fr, 0, aCoxa, j, direcaoDoPe(c, aCoxa, j));
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const B = formaDaBola();
  let frente = mix(c.baixo, c.topo, u),
    lombar = 0;
  if (erro === 'raso') frente = mix(c.baixo, c.topo, u * f('erro.raso.fracao'));
  if (erro === 'lombar') {
    // no topo, a lombar arqueia: a bacia fica como no certo e o tórax gira para trás com a lombar; as costas seguem no
    // chão, e o quadril sobe com a barriga para cima
    const w = suave(Math.max(0, (u - 0.4) / 0.6));
    lombar = f('erro.lombar.lombar') * w;
  }
  let e: Esq, bola: ReturnType<typeof bolaSuica>;
  if (erro === 'bola') {
    // a bola rola para longe com os pés, a perna estica e o quadril cai
    const anda = f('erro.bola.anda') * u;
    bola = bolaSuica(0, c.zBola + anda, -anda / B.R);
    e = ponteComAPernaEsticada(corpo, c, mix(f('joelho.baixo'), f('erro.bola.joelho'), u), c.zCalcanhar + anda, bola.centro);
  } else {
    // a bola fica parada
    bola = bolaSuica(0, c.zBola, 0);
    e = ponteNoCalcanhar(corpo, c, frente, c.zCalcanhar, bola.centro, lombar);
  }
  return {
    esq: e,
    prims: [chao(-80, 80, -110, 130), ...bola.prims],
    pecas: [bola.peca],
    fios: [],
    cargas: [],
    marcas: { bola: bola.centro, calcanhar: e.lado.R.calcanhar },
  };
}

export const pontePesBola: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // o glúteo (principal); os posteriores listrados, "só ajudam" (correção de 03–04/11, SO_AJUDA): seguram a bola, mas
  // a biblioteca não conta série para eles aqui (revisão de anatomia, achado 1)
  papeis: { gluteo: 'p', posteriores: 'a' },
  trajetorias: { quadril: (q) => q.esq.pelve.o },
};
