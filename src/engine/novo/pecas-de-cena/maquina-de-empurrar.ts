// Peça de cena: as máquinas de empurrar sentado, com braços que giram num eixo e pegadores (o supino na máquina e o
// desenvolvimento na máquina). As duas são a mesma máquina com outro modelo (`ModeloDeEmpurrar`), como a cadeira
// extensora sai da flexora: o assento que sobe e desce (a regulagem), o encosto parado, dois braços independentes que
// giram cada um no seu eixo, com o pegador atravessado na ponta, e a torre com a pilha de placas ao lado do assento.
// Medidas em ../dados/objetos/supino-maquina.json e ../dados/objetos/desenvolvimento-maquina.json: o tamanho total vem
// das fichas da Life Fitness, da Hammer Strength, da Movement e da Precor; a pilha, o estofado e o caminho que converge,
// da Precor; as medidas que fazem a máquina funcionar (o eixo, o braço, a altura do assento e do encosto) não aparecem
// em nenhuma ficha lida e são de desenho, com o motivo.
//
// Parte dos cartões de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `supino_maquina` e
// `desenvolvimento_maquina`): o assento e o encosto azuis num pé só, os braços de metal que vêm do alto e de trás com os
// pegadores na ponta. O que muda, e por quê: os cartões são de anilhas (os pinos com uma anilha de cada lado); as
// fichas lidas são todas de pilha e o texto do app conta a carga pela "placa da torre", então aqui a carga é a pilha.
// No supino, o eixo do cartão fica atrás e acima do encosto: dali o pegador não anda os ~50 cm do empurrão (o braço do
// cartão tem 88 cm e já começa 68 cm à frente do eixo). Aqui o eixo fica acima da cabeça, um pouco à frente do peito, e
// o braço pende dele: o pegador anda para a frente subindo pouco. No desenvolvimento, o eixo fica atrás do encosto, como
// no cartão, mas alto (a Precor: "overhead pivot"), na meia altura do caminho: o pegador sobe quase na vertical.
//
// A máquina funciona: cada braço gira no seu eixo, e o pegador (preso na ponta) anda num arco em volta dele; o eixo de
// cada braço é inclinado para dentro (`converge`), e os pegadores se aproximam enquanto empurram (a Precor: "converging
// motion path"). O came gira com o braço da esquerda e enrola o cabo, e as placas escolhidas sobem o arco do came (raio
// × ângulo girado desde a posição inicial). O assento sobe e desce para o pegador cair na altura que a técnica pede.
//
// Eixos: quem senta olha para +z; o assento fica centrado em x = 0, com a borda da frente em z = 0. O lado esquerdo de
// quem senta é +x (o direito, que a vista de lado mostra, é −x): o came e a torre ficam à esquerda. O ângulo do braço:
// 0 = pendurado, para baixo; 90 = para a frente, na horizontal; 180 = para cima.
import type { Prim } from '../desenho';
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, cross, girar, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

/** Qual das duas máquinas: de onde vêm as medidas e o nome. */
export interface ModeloDeEmpurrar {
  objeto: string;
  nome: string;
  /**
   * O eixo fica acima da cabeça (supino, o braço pende) ou atrás do encosto (desenvolvimento, o braço vai à frente).
   * 'frente' (acréscimo de 18/11/2026, a remada articulada): no alto, à frente de quem senta, numa coluna inclinada
   * que sobe da frente da base; o braço pende dele para trás, na direção de quem puxa.
   */
  eixo: 'acima' | 'atras' | 'frente';
  /**
   * Opcional (a remada articulada): o braço gira para trás, na direção de quem senta (0 = pendurado, 90 = para trás, na
   * horizontal), e o ângulo cresce enquanto a pessoa puxa. Sem o campo, ele gira para a frente, como no supino.
   */
  puxa?: boolean;
  /**
   * Opcional (a remada articulada): o pegador de pé, na linha do braço, preso por um toco que sai da ponta do braço
   * para dentro (a pegada neutra, as palmas uma para a outra). Sem o campo, o pegador é atravessado.
   */
  pegador?: 'atravessado' | 'vertical';
  /** Opcional (a remada articulada): no lugar do encosto atrás, o apoio do peito na frente, que corre para a frente e para trás. */
  apoio?: 'encosto' | 'peito';
}
export const SUPINO_NA_MAQUINA: ModeloDeEmpurrar = { objeto: 'supinoMaquina', nome: 'supino na máquina', eixo: 'acima' };
export const DESENVOLVIMENTO_NA_MAQUINA: ModeloDeEmpurrar = { objeto: 'desenvolvimentoMaquina', nome: 'desenvolvimento na máquina', eixo: 'atras' };
/** A remada articulada (acréscimo de 18/11/2026): a mesma máquina, com o apoio do peito na frente e os braços que se puxam. */
export const REMADA_ARTICULADA: ModeloDeEmpurrar = { objeto: 'remadaArticulada', nome: 'remada articulada', eixo: 'frente', puxa: true, pegador: 'vertical', apoio: 'peito' };

const rad = Math.PI / 180;
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0],
  Z: V3 = [0, 0, 1];
const medidas = (mod: ModeloDeEmpurrar) => (id: string) => obj(mod.objeto, id);

/** As regulagens e o instante da máquina. */
export interface MaquinaDeEmpurrar {
  /** O ângulo dos braços, em graus (0 = pendurado, 90 = para a frente, 180 = para cima). */
  braco: number;
  /** O ângulo da posição inicial: a pilha começa a subir daí. */
  inicio: number;
  /** A altura do topo do assento (cm, do chão): a regulagem. */
  assento: number;
  /** Quantas placas estão no pino. */
  placas?: number;
  /** Só com o apoio do peito (a remada): onde fica a face do apoio, na borda de baixo (z, cm): a outra regulagem. */
  apoio?: number;
}

/** A face do encosto (onde as costas encostam): o ponto da borda de baixo, a direção para cima e a normal (para a frente). */
export function faceDoEncostoDaMaquina(mod: ModeloDeEmpurrar) {
  const g = medidas(mod);
  const inc = g('encostoInclina') * rad;
  const sobe: V3 = [0, Math.cos(inc), -Math.sin(inc)];
  const frente: V3 = [0, Math.sin(inc), Math.cos(inc)];
  const base: V3 = [0, g('encostoBaixo'), -g('encostoAtras')];
  return { base, sobe, frente, comp: g('encostoComp') };
}

/**
 * A face do apoio do peito (a remada articulada), com a borda de baixo em `z`: o ponto do meio da borda de baixo, a
 * direção para cima (o alto vai à frente, `apoioInclina` graus) e a normal (para trás, para quem senta).
 */
export function faceDoApoioDoPeito(mod: ModeloDeEmpurrar, z: number) {
  const g = medidas(mod);
  const inc = g('apoioInclina') * rad;
  const sobe: V3 = [0, Math.cos(inc), Math.sin(inc)];
  const tras: V3 = [0, Math.sin(inc), -Math.cos(inc)];
  const base: V3 = [0, g('apoioBaixo'), z];
  return { base, sobe, tras, comp: g('apoioComp'), larg: g('apoioLarg') };
}

/** O eixo do braço de um lado: o ponto (no plano do braço) e a direção, inclinada para o pegador convergir. */
export function eixoDoBraco(mod: ModeloDeEmpurrar, k: Lado): { ponto: V3; dir: V3 } {
  const g = medidas(mod);
  const s = sinal(k);
  const meio = g('bracoMeio') * rad;
  // o braço gira em volta de −x (o ângulo cresce do pendurado para a frente); no ângulo do meio ele aponta para `r`.
  // Na remada (`puxa`), em volta de +x: o ângulo cresce do pendurado para trás
  const b: V3 = mod.puxa ? [1, 0, 0] : [-1, 0, 0];
  const r: V3 = [0, -Math.cos(meio), (mod.puxa ? -1 : 1) * Math.sin(meio)];
  // a direção em que o pegador anda no meio; inclinar o eixo para ela leva o pegador para dentro (−s em x) ao girar
  const anda = norm(cross(b, r));
  const dir = norm(add(b, mul(anda, -s * Math.tan(g('converge') * rad))));
  return { ponto: [s * bracoX(mod), g('eixoAltura'), g('eixoAFrente')], dir };
}

/** Onde fica o plano do braço (a distância do meio da máquina, em x). */
export const bracoX = (mod: ModeloDeEmpurrar) => {
  const g = medidas(mod);
  // o pegador de pé fica na ponta do toco que sai do braço para dentro
  if (mod.pegador === 'vertical') return g('pegadaMeia') + g('bracoFora');
  return g('pegadaMeia') + g('pegadorComp') / 2 + g('bracoFora');
};

/**
 * O braço de um lado no ângulo dado: o eixo, a ponta do braço (onde o pegador começa), o centro da borracha do pegador
 * (onde fica o centro da mão) e a direção do pegador, da ponta do braço para dentro.
 */
export function bracoNoAngulo(mod: ModeloDeEmpurrar, k: Lado, graus: number) {
  const g = medidas(mod);
  const s = sinal(k);
  const E = eixoDoBraco(mod, k);
  const meio = g('bracoMeio');
  const r0: V3 = mul([0, -Math.cos(meio * rad), (mod.puxa ? -1 : 1) * Math.sin(meio * rad)], g('bracoComp'));
  const ponta = add(E.ponto, girar(r0, E.dir, graus - meio));
  const dirPegador = norm(girar([-s, 0, 0], E.dir, graus - meio));
  if (mod.pegador === 'vertical') {
    // o pegador de pé: na ponta do toco, ao longo do braço (`dirBorracha`, de baixo para cima), com o alto inclinado
    // `pegadorInclina` graus para dentro (para o punho ficar alinhado)
    const centro = add(ponta, mul(dirPegador, g('bracoFora')));
    const k = g('pegadorInclina') * rad;
    const dirBorracha = norm(add(mul(norm(sub(E.ponto, ponta)), Math.cos(k)), mul(dirPegador, Math.sin(k))));
    return { eixo: E.ponto, dirEixo: E.dir, ponta, centro, dirPegador, dirBorracha };
  }
  const centro = add(ponta, mul(dirPegador, g('bracoFora') + g('pegadorComp') / 2));
  return { eixo: E.ponto, dirEixo: E.dir, ponta, centro, dirPegador, dirBorracha: dirPegador };
}

/** Quanto as placas sobem (cm) com os braços no ângulo dado: o arco do came desde a posição inicial. */
export const subidaDaPilhaDeEmpurrar = (m: Pick<MaquinaDeEmpurrar, 'braco' | 'inicio'>, mod: ModeloDeEmpurrar) =>
  Math.max(0, m.braco - m.inicio) * rad * (medidas(mod)('cameDiam') / 2);

/**
 * Opções das animações (desligadas, a peça é a da folha): `bracoDePertoAtras`: de lado (a câmera ao longo de x), o
 * braço do lado direito (o de perto) é pintado atrás do corpo: de lado, o tubo dele cobriria a mão e o braço de quem
 * treina. É um corte de ilustração, como o do smith; o braço continua no lugar, e nas outras vistas fica na ordem certa.
 */
export interface OpcoesDaMaquinaDeEmpurrar {
  bracoDePertoAtras?: boolean;
}

/**
 * A máquina: os volumes para a conferência (o assento, o encosto, a travessa do eixo e os braços, onde o corpo encosta
 * e que ele não pode atravessar), a estrutura parada (com o assento na altura regulada), os dois braços e a parte que
 * se mexe com eles (o came, o cabo e as placas), e os pontos que o exercício lê.
 */
export function maquinaDeEmpurrar(m: MaquinaDeEmpurrar, mod: ModeloDeEmpurrar, op: OpcoesDaMaquinaDeEmpurrar = {}) {
  const g = medidas(mod);
  const esp = g('estofadoEsp'),
    tubo = g('tubo');
  const meiaLarg = g('assentoLarg') / 2,
    cA = g('assentoComp');
  const F = faceDoEncostoDaMaquina(mod);
  const xB = bracoX(mod);
  const yE = g('eixoAltura'),
    zE = g('eixoAFrente');
  const bracos = { R: bracoNoAngulo(mod, 'R', m.braco), L: bracoNoAngulo(mod, 'L', m.braco) };

  // a coluna de trás: atrás do encosto (supino) ou no eixo (desenvolvimento)
  const zTopoEncosto = add(F.base, mul(F.sobe, F.comp))[2];
  const zColuna = mod.eixo === 'atras' ? zE : Math.min(F.base[2], zTopoEncosto) - esp - 8;
  const yTopo = mod.eixo === 'atras' ? yE + 10 : yE + 4;
  // a torre da pilha, à esquerda de quem senta, atrás do assento
  const xT0 = xB + 16,
    xT1 = xT0 + 34;
  const zTorre = mod.eixo === 'atras' ? -70 : -60;
  const zT0 = zTorre - 16,
    zT1 = zTorre + 16;
  const H = g('alturaTorre');
  const zTras = Math.min(zColuna, zT0) - 6,
    zFrente = zTras + g('comp');

  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  // com os cantos redondos do estofado (raio de 45% da espessura): duas caixas em cruz
  const rC = Math.min(esp * 0.45, 4);
  const estofado = (o: V3, x: V3, y: V3, z: V3, meias: V3): Prim[] => [caixa(o, x, y, z, [meias[0], meias[1], meias[2] - rC], 'estofado'), caixa(o, x, y, z, [meias[0], meias[1] - rC, meias[2]], 'estofado')];
  const meioAssento: V3 = [0, m.assento - esp / 2, -cA / 2];
  const prims: Prim[] = [
    ...estofado(meioAssento, X, Y, Z, [meiaLarg, esp / 2, cA / 2]),
    ...estofado(add(add(F.base, mul(F.sobe, F.comp / 2)), mul(F.frente, -esp / 2)), X, F.frente, F.sobe, [meiaLarg - 2, esp / 2, F.comp / 2]),
  ];
  // a travessa do eixo, acima da cabeça (supino)
  if (mod.eixo === 'acima') prims.push(caixa([0, yE, zE], X, Y, Z, [xB - 6, 3.5, 3.5], 'aco'));
  // os braços: do eixo à ponta, onde o pegador começa
  for (const k of ['R', 'L'] as Lado[]) {
    const b = bracos[k];
    const d = sub(b.ponta, b.eixo);
    const z = norm(d),
      x = norm(cross(Y, z)),
      y = cross(z, x);
    prims.push(caixa(add(b.eixo, mul(d, 0.5)), x, y, z, [3, 3, Math.hypot(...d) / 2], 'aco'));
  }

  const T = (C: Parameters<PecaPropria['desenhar']>[0], M: Parameters<PecaPropria['desenhar']>[1], a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
  const fixa: PecaPropria = {
    t: 'propria',
    nome: mod.nome,
    fixa: [mod.objeto, m.assento],
    desenhar(C, M, o) {
      // a base no chão: dois trilhos ao longo de z, as travessas e o pé da torre
      const zB1 = Math.max(4, F.base[2] + cA * 0.25);
      for (const x of [-meiaLarg + 2, xT1]) T(C, M, [x, tubo / 2, zTras], [x, tubo / 2, zB1]);
      for (const z of [zTras + 4, zB1]) T(C, M, [-meiaLarg + 2, tubo / 2, z], [xT1, tubo / 2, z]);
      T(C, M, [xT0, tubo / 2, zT0], [xT0, tubo / 2, zT1]);
      // o pé do assento: a luva parada e o tubo que sobe e desce dentro dela, com o pino de regular
      const zP = -cA / 2;
      T(C, M, [0, tubo, zP], [0, g('assentoMin') - esp - 6, zP], tubo + 2);
      T(C, M, [0, g('assentoMin') - esp - 12, zP], [0, m.assento - esp - 1, zP], tubo - 1.5);
      C.cilindro([0, g('assentoMin') - esp - 12, zP + (tubo + 2) / 2], [0, g('assentoMin') - esp - 12, zP + (tubo + 2) / 2 + 5], 1.6, M.cromo, { lados: 10 });
      C.cilindro([0, g('assentoMin') - esp - 12, zP + (tubo + 2) / 2 + 5], [0, g('assentoMin') - esp - 12, zP + (tubo + 2) / 2 + 7], 2.6, M.borracha, { lados: 12 });
      // a placa do assento e o estofado
      C.tubo([0, m.assento - esp - 1.5, zP - cA / 2 + 4], [0, m.assento - esp - 1.5, zP + cA / 2 - 4], meiaLarg * 1.2, 2, M.metal);
      C.estofado([0, m.assento - esp, zP], Z, Y, X, cA, esp, g('assentoLarg'));
      // a coluna de trás e o encosto, preso nela
      T(C, M, [0, tubo, zColuna], [0, yTopo, zColuna], tubo + 1);
      const meioEncosto = add(F.base, mul(F.sobe, F.comp / 2));
      C.estofado(add(meioEncosto, mul(F.frente, -esp)), F.sobe, F.frente, X, F.comp, esp, g('assentoLarg') - 4);
      const atrasDoEncosto = add(meioEncosto, mul(F.frente, -esp - 2));
      C.tubo(add(atrasDoEncosto, mul(F.sobe, -F.comp * 0.35)), add(atrasDoEncosto, mul(F.sobe, F.comp * 0.35)), 12, 2, M.metal, { up: F.frente });
      for (const t of [-0.25, 0.25]) T(C, M, add(atrasDoEncosto, mul(F.sobe, F.comp * t)), [0, add(atrasDoEncosto, mul(F.sobe, F.comp * t))[1], zColuna], 5);
      // o alto da máquina: a travessa do eixo, com os mancais de cada braço
      if (mod.eixo === 'acima') {
        T(C, M, [0, yTopo, zColuna], [0, yTopo, zE], tubo);
        T(C, M, [-(xB - 6), yE, zE], [xB - 6, yE, zE], tubo);
        T(C, M, [0, yTopo, zE], [0, yE, zE], tubo);
      } else {
        T(C, M, [-(xB - 6), yE, zE], [xB - 6, yE, zE], tubo);
        // o braço de trás que sustenta a travessa, da coluna
        T(C, M, [0, yE, zE], [0, yTopo, zE], tubo);
      }
      // a torre: quatro montantes, a tampa e as guias das placas, ligada à coluna por cima
      for (const [x, z] of [
        [xT0, zT0],
        [xT1, zT0],
        [xT0, zT1],
        [xT1, zT1],
      ] as [number, number][])
        T(C, M, [x, tubo, z], [x, H, z], 4.5);
      for (const z of [zT0, zT1]) T(C, M, [xT0, H, z], [xT1, H, z], 4.5);
      for (const x of [xT0, xT1]) T(C, M, [x, H, zT0], [x, H, zT1], 4.5);
      for (const dz of [-6, 6]) C.cilindro([(xT0 + xT1) / 2, tubo, zTorre + dz], [(xT0 + xT1) / 2, H - 6, zTorre + dz], 0.8, M.cromo, { lados: 8 });
      // a polia do pé da torre e a do alto do came, por onde o cabo passa
      C.cilindro([(xT0 + xT1) / 2 - 1.5, 10, zT1 + 2], [(xT0 + xT1) / 2 + 1.5, 10, zT1 + 2], 4.5, M.metalClaro, { lados: 16 });
      if (o.comSombra) C.sombra((xT1 - xB) / 2, (zTras + zFrente) / 2, (xT1 + xB) / 2 + 6, g('comp') / 2, 0.18);
    },
  };

  // de lado (a câmera ao longo de x), o braço de perto pode ir para trás do corpo (`bracoDePertoAtras`)
  const dePerfil = (C: Parameters<PecaPropria['desenhar']>[0]) => Math.abs((C as unknown as { rot(v: V3): V3 }).rot([1, 0, 0])[2]) > 0.9;
  const desenharBraco = (k: Lado) => (C: Parameters<PecaPropria['desenhar']>[0], M: Parameters<PecaPropria['desenhar']>[1]) => {
    const b = bracos[k];
    const s = sinal(k);
    const dz = op.bracoDePertoAtras && k === 'R' && dePerfil(C) ? { dz: 1000 } : {};
    // o mancal no eixo, o tubo do braço e o pegador atravessado na ponta, com a borracha
    C.cilindro(add(b.eixo, mul(b.dirEixo, -s * 4)), add(b.eixo, mul(b.dirEixo, s * 4)), 5.5, M.metalClaro, { lados: 20, ...dz });
    C.cilindro(add(b.eixo, mul(b.dirEixo, s * 4)), add(b.eixo, mul(b.dirEixo, s * 6)), 2.5, M.cromo, { lados: 12, ...dz });
    C.tubo(b.eixo, b.ponta, 6, 6, M.metal, { up: b.dirEixo, ...dz });
    C.cilindro(add(b.ponta, mul(b.dirPegador, -2)), add(b.ponta, mul(b.dirPegador, g('bracoFora'))), 2, M.cromo, { lados: 12, ...dz });
    const ini = add(b.ponta, mul(b.dirPegador, g('bracoFora')));
    C.cilindro(ini, add(ini, mul(b.dirPegador, g('pegadorComp'))), g('pegadorDiam') / 2, M.borracha, { lados: 14, ...dz });
    C.cilindro(add(ini, mul(b.dirPegador, g('pegadorComp'))), add(ini, mul(b.dirPegador, g('pegadorComp') + 1.2)), g('pegadorDiam') / 2 + 0.5, M.borracha, { lados: 14, ...dz });
  };
  const bracoR: PecaPropria = { t: 'propria', nome: `braço direito do ${mod.nome}`, desenhar: desenharBraco('R') };
  const bracoL: PecaPropria = { t: 'propria', nome: `braço esquerdo do ${mod.nome}`, desenhar: desenharBraco('L') };

  const subida = subidaDaPilhaDeEmpurrar(m, mod);
  const n = g('pilhaPlacas'),
    kP = Math.min(n, Math.max(1, m.placas ?? 5)),
    hp = g('pilhaAltura') / n;
  const rCame = g('cameDiam') / 2;
  const xCame = xB + 9;
  const pilha: PecaPropria = {
    t: 'propria',
    nome: `pilha do ${mod.nome}`,
    desenhar(C, M) {
      const xP = (xT0 + xT1) / 2 - g('pilhaLarg') / 2,
        zP = zTorre + g('pilhaProf') / 2;
      if (n - kP > 0) C.pilha([xP, tubo + 2, zP], X, [0, 0, -1], g('pilhaLarg'), hp * (n - kP), g('pilhaProf'), n - kP);
      const yDo = tubo + 2 + hp * (n - kP) + subida;
      C.pilha([xP, yDo, zP], X, [0, 0, -1], g('pilhaLarg'), hp * kP, g('pilhaProf'), kP);
      C.cilindro([(xT0 + xT1) / 2, yDo + hp * kP, zTorre], [(xT0 + xT1) / 2, yDo + hp * kP + 10, zTorre], 1.2, M.cromo, { lados: 8 });
      // o came no eixo do braço da esquerda, e o cabo: desce do came até o pé da torre e entra nela
      const cE: V3 = [xCame, yE, zE];
      C.cilindro(add(cE, [-2.5, 0, 0]), add(cE, [2.5, 0, 0]), rCame, M.metalClaro, { lados: 24 });
      C.cilindro(add(cE, [-4, 0, 0]), add(cE, [4, 0, 0]), 2.5, M.cromo, { lados: 12 });
      const xc = (xT0 + xT1) / 2;
      if (mod.eixo === 'acima') {
        // o eixo no alto: o cabo sai por cima do came, vai até a roldana do alto da torre e desce até o pino das placas
        const saida: V3 = [xCame, yE + rCame, zE];
        const roldana: V3 = [xc, H + 6, zTorre];
        C.linha(saida, [xc, H + 6 + 4.5, zTorre], '#202327', 0.7);
        C.linha([xc, H + 6 - 4.5, zTorre], [xc, yDo + hp * kP + 10, zTorre], '#202327', 0.7);
        C.cilindro(add(roldana, [0, 0, -1.5]), add(roldana, [0, 0, 1.5]), 4.5, M.metalClaro, { lados: 16 });
        T(C, M, [xT0, H, zTorre], [xT0, H + 6, zTorre], 4);
        T(C, M, [xT0, H + 6, zTorre], [xc - 3, H + 6, zTorre], 3);
      } else {
        // o eixo atrás: o cabo desce do came até o chão e entra pela roldana do pé da torre
        const saida: V3 = [xCame, yE - rCame, zE];
        const pe: V3 = [xCame, 10 - 4.5, zE];
        const polia: V3 = [xc, 10 - 4.5, zT1 + 2];
        C.linha(saida, pe, '#202327', 0.7);
        C.linha(pe, polia, '#202327', 0.7);
        C.cilindro([xCame - 1.5, 10, zE], [xCame + 1.5, 10, zE], 4.5, M.metalClaro, { lados: 16 });
        T(C, M, [xCame, tubo / 2, zE], [xT0, tubo / 2, zE], 5);
      }
    },
  };
  return {
    prims,
    fixa,
    bracos: { R: bracoR, L: bracoL },
    pilha,
    pegadores: { R: bracos.R.centro, L: bracos.L.centro },
    eixos: { R: bracos.R.eixo, L: bracos.L.eixo },
    subida,
    encosto: F,
    extremos: { zTras, zFrente, xDireita: -xB - 6, xEsquerda: xT1 + 2 },
  };
}
