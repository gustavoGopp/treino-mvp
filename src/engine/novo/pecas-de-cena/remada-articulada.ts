// Peça de cena: a remada articulada (seated row de pilha), o modelo `REMADA_ARTICULADA` da máquina de empurrar sentado
// (./maquina-de-empurrar.ts): o mesmo assento que sobe e desce, os mesmos dois braços independentes que giram cada um no
// seu eixo, o mesmo came e a mesma torre com a pilha. O que muda: no lugar do encosto atrás, o apoio do peito na frente,
// que corre para a frente e para trás (a outra regulagem); o eixo no alto e à frente, numa coluna inclinada que sobe da
// frente da base (a Hammer Strength: "overhead pivot"); os braços pendem dele para trás e se puxam (o ângulo cresce de
// pendurado para trás); os pegadores são de pé (a pegada neutra) e o caminho se abre enquanto eles vêm para trás (a
// Precor e a Life Fitness: "diverge as they draw back").
//
// Medidas em ../dados/objetos/remada-articulada.json: o tamanho total vem das fichas da Life Fitness (SS-RW), da Hammer
// Strength (HS-RW), da Movement e da Technogym; o assento, o apoio do peito e o pegador, da lista de peças pública da
// Life Fitness SS-RW; a pilha, a espessura dos estofados e o caminho que se abre, da Precor (RSL0310); o eixo, o braço e
// as alturas do assento e do apoio são de desenho, com o motivo.
//
// Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `remada_articulada`): o assento baixo num pé
// só, o apoio do peito na frente dele, a coluna inclinada que sobe da frente da base até o eixo no alto, os braços que
// pendem do eixo com os pegadores na ponta. O que muda, e por quê: o cartão é de anilhas (um pino de cada lado); as
// fichas lidas são de pilha e o texto do app conta a carga pela "placa da torre", então aqui a carga é a pilha, numa
// torre à esquerda de quem senta, depois da coluna da frente (de lado, atrás das costas fica só o vão, onde cabem os
// rótulos).
// No cartão, o apoio do peito fica num poste que sobe da base; aqui ele corre num tubo que sai da coluna, com o botão de
// regular (a lista de peças da Life Fitness: "KNOB, ADJ"), e o poste não passa entre os joelhos.
//
// Eixos: os da máquina de empurrar (quem senta olha para +z; o assento centrado em x = 0, com a borda da frente em
// z = 0; o lado esquerdo de quem senta é +x). O ângulo do braço: 0 = pendurado; 90 = para trás, na horizontal.
import type { Prim } from '../desenho';
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, cross, girar, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { REMADA_ARTICULADA, bracoNoAngulo, bracoX, faceDoApoioDoPeito, subidaDaPilhaDeEmpurrar } from './maquina-de-empurrar';
import type { MaquinaDeEmpurrar, OpcoesDaMaquinaDeEmpurrar } from './maquina-de-empurrar';

export { REMADA_ARTICULADA };
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0],
  Z: V3 = [0, 0, 1];
const g = (id: string) => obj(REMADA_ARTICULADA.objeto, id);

/** Quanto as placas sobem (cm) com os braços no ângulo dado (o arco do came desde a posição inicial). */
export const subidaDaPilhaDaRemada = (m: Pick<MaquinaDeEmpurrar, 'braco' | 'inicio'>) => subidaDaPilhaDeEmpurrar(m, REMADA_ARTICULADA);

/**
 * A coluna da frente: sobe do pé, na frente da base, até o alto, e uma viga volta dela até em cima do eixo (`viga`). Ela
 * fica à frente dos pegadores no começo da puxada: de lado, não passa atrás das mãos.
 */
export function colunaDaRemada() {
  const tubo = g('tubo');
  const zE = g('eixoAFrente'),
    yE = g('eixoAltura');
  const pe: V3 = [0, tubo / 2, zE + g('colunaAvanca')];
  const topo: V3 = [0, yE + 10, zE + g('colunaAvanca')];
  const viga: V3 = [0, yE + 10, zE];
  return { pe, topo, viga };
}

/**
 * A remada articulada: os volumes para a conferência (o assento e o apoio do peito, onde o corpo apoia, e os braços, que
 * ele não pode atravessar), a estrutura parada (com o assento e o apoio nas regulagens; a coluna da frente à parte), os
 * dois braços e a parte que se
 * mexe com eles (o came, o cabo e as placas), e os pontos que o exercício lê. `m.apoio`: a face do apoio, na borda de
 * baixo (z). `bracoDePertoAtras`: de lado, o braço do lado direito vai para trás do corpo (como no supino na máquina).
 */
export function remadaArticulada(m: MaquinaDeEmpurrar, op: OpcoesDaMaquinaDeEmpurrar = {}) {
  const mod = REMADA_ARTICULADA;
  const esp = g('estofadoEsp'),
    tubo = g('tubo');
  const meiaLarg = g('assentoLarg') / 2,
    cA = g('assentoComp');
  const A = faceDoApoioDoPeito(mod, m.apoio ?? (g('apoioMin') + g('apoioMax')) / 2);
  const zP = -cA / 2;
  const xB = bracoX(mod);
  const yE = g('eixoAltura'),
    zE = g('eixoAFrente');
  const col = colunaDaRemada();
  const bracos = { R: bracoNoAngulo(mod, 'R', m.braco), L: bracoNoAngulo(mod, 'L', m.braco) };
  // a torre da pilha, à esquerda de quem senta (`lt`: o lado da torre, em x; o came fica no braço do mesmo lado), na
  // frente, depois da coluna: de lado, atrás do assento fica só o vão, e os nomes dos rótulos cabem ali sem cair em cima
  // dela. À direita, ela ficava embaixo dos rótulos de três quartos por trás e de trás
  const lt = 1;
  const xT0 = lt * (xB + 16),
    xT1 = xT0 + lt * 34;
  const zTorre = col.pe[2] + 24;
  const zT0 = zTorre - 16,
    zT1 = zTorre + 16;
  const H = g('alturaTorre');
  const zTras = zP - cA / 2 - 8,
    zFrente = zT1 + 6;

  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  const rC = Math.min(esp * 0.45, 4);
  const estofado = (o: V3, x: V3, y: V3, z: V3, meias: V3): Prim[] => [caixa(o, x, y, z, [meias[0], meias[1], meias[2] - rC], 'estofado'), caixa(o, x, y, z, [meias[0], meias[1] - rC, meias[2]], 'estofado')];
  const meioApoio = add(A.base, mul(A.sobe, A.comp / 2));
  const prims: Prim[] = [
    ...estofado([0, m.assento - esp / 2, zP], X, Y, Z, [meiaLarg, esp / 2, cA / 2]),
    ...estofado(add(meioApoio, mul(A.tras, -esp / 2)), X, A.tras, A.sobe, [A.larg / 2, esp / 2, A.comp / 2]),
  ];
  // o tubo de cada braço é dobrado: do eixo, desce `bracoDobra` graus à frente da linha até a ponta, por
  // `bracoDobraEm` cm, e daí vai até a ponta (o arco do pegador não muda). Reto, de lado, ele passaria rente ao rosto no
  // fim da puxada
  const dobra = (k: Lado): V3 => {
    const b = bracos[k];
    return add(b.eixo, mul(girar(norm(sub(b.ponta, b.eixo)), b.dirEixo, -g('bracoDobra')), g('bracoDobraEm')));
  };
  for (const k of ['R', 'L'] as Lado[]) {
    const b = bracos[k];
    for (const [a0, a1] of [
      [b.eixo, dobra(k)],
      [dobra(k), b.ponta],
    ] as [V3, V3][]) {
      const d = sub(a1, a0);
      const z = norm(d),
        x = norm(cross(Y, z)),
        y = cross(z, x);
      prims.push(caixa(add(a0, mul(d, 0.5)), x, y, z, [3, 3, Math.hypot(...d) / 2], 'aco'));
    }
  }

  type C_ = Parameters<PecaPropria['desenhar']>[0];
  type M_ = Parameters<PecaPropria['desenhar']>[1];
  const T = (C: C_, M: M_, a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
  // o apoio do peito: o tubo que o leva corre dentro da luva presa na coluna, na altura do meio do apoio
  const yA = meioApoio[1];
  const zLuva = col.pe[2] - tubo / 2 - 1;
  const fixa: PecaPropria = {
    t: 'propria',
    nome: mod.nome,
    fixa: [mod.objeto, m.assento, A.base[2]],
    desenhar(C, M, o) {
      // a base no chão: a espinha ao longo de z (entre os pés de quem senta), a travessa de trás do assento, a do pé da
      // coluna e as da torre
      T(C, M, [0, tubo / 2, zTras + 4], [0, tubo / 2, zT1]);
      T(C, M, [-meiaLarg + 4, tubo / 2, zTras + 4], [meiaLarg - 4, tubo / 2, zTras + 4]);
      T(C, M, [-lt * (xB + 6), tubo / 2, col.pe[2]], [xT1, tubo / 2, col.pe[2]]);
      for (const z of [zT0 + 4, zT1 - 4]) T(C, M, [0, tubo / 2, z], [xT1, tubo / 2, z]);
      // o pé do assento: a luva parada e o tubo que sobe e desce dentro dela, com o pino de regular
      T(C, M, [0, tubo, zP], [0, g('assentoMin') - esp - 6, zP], tubo + 2);
      T(C, M, [0, g('assentoMin') - esp - 12, zP], [0, m.assento - esp - 1, zP], tubo - 1.5);
      C.cilindro([0, g('assentoMin') - esp - 12, zP - (tubo + 2) / 2], [0, g('assentoMin') - esp - 12, zP - (tubo + 2) / 2 - 5], 1.6, M.cromo, { lados: 10 });
      C.cilindro([0, g('assentoMin') - esp - 12, zP - (tubo + 2) / 2 - 5], [0, g('assentoMin') - esp - 12, zP - (tubo + 2) / 2 - 7], 2.6, M.borracha, { lados: 12 });
      // a placa do assento e o estofado
      C.tubo([0, m.assento - esp - 1.5, zP - cA / 2 + 3], [0, m.assento - esp - 1.5, zP + cA / 2 - 3], meiaLarg * 1.2, 2, M.metal);
      C.estofado([0, m.assento - esp, zP], Z, Y, X, cA, esp, g('assentoLarg'));
      // a viga que volta do alto da coluna até em cima do eixo, e a travessa do eixo (presa embaixo da viga) com o came à
      // esquerda (a coluna, que sobe do pé até o alto, é a peça `coluna`)
      T(C, M, add(col.topo, [0, 0, tubo / 2]), add(col.viga, [0, 0, -tubo / 2]), tubo);
      T(C, M, col.viga, [0, yE, zE], tubo);
      T(C, M, [-lt * (xB - 6), yE, zE], [lt * (xB + 13), yE, zE], tubo);
      // o apoio do peito: o estofado, a chapa de trás, o tubo que corre na luva da coluna e o botão de regular
      C.estofado(add(meioApoio, mul(A.tras, -esp)), A.sobe, A.tras, X, A.comp, esp, A.larg);
      const atrasDoApoio = add(meioApoio, mul(A.tras, -esp - 1.5));
      C.tubo(add(atrasDoApoio, mul(A.sobe, -A.comp * 0.32)), add(atrasDoApoio, mul(A.sobe, A.comp * 0.32)), 10, 2, M.metal, { up: mul(A.tras, -1) });
      T(C, M, [0, yA, atrasDoApoio[2]], [0, yA, zLuva + 6], 4.5);
      T(C, M, [0, yA, zLuva - 9], [0, yA, zLuva + 2], 6.5);
      C.cilindro([0, yA + 3.2, zLuva - 6], [0, yA + 7, zLuva - 6], 1.4, M.cromo, { lados: 10 });
      C.cilindro([0, yA + 7, zLuva - 6], [0, yA + 9.5, zLuva - 6], 2.6, M.borracha, { lados: 12 });
      // a torre: quatro montantes, a tampa e as guias das placas
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
      if (o.comSombra) C.sombra((xT1 - lt * xB) / 2, (zTras + zFrente) / 2, Math.abs(xT1 + lt * xB) / 2 + 6, (zFrente - zTras) / 2, 0.18);
    },
  };

  // a coluna da frente, do pé até o alto: uma peça à parte, que o exercício pode deixar no enquadramento (os nomes do
  // modo Trajetória ficam fora dela) enquanto o resto da estrutura fica como cenário
  const coluna: PecaPropria = {
    t: 'propria',
    nome: `coluna da ${mod.nome}`,
    fixa: [mod.objeto, 'coluna'],
    desenhar(C, M) {
      T(C, M, col.pe, add(col.topo, [0, tubo / 2, 0]), tubo + 1);
    },
  };

  // de lado (a câmera ao longo de x), o braço de perto pode ir para trás do corpo (`bracoDePertoAtras`)
  const dePerfil = (C: C_) => Math.abs((C as unknown as { rot(v: V3): V3 }).rot([1, 0, 0])[2]) > 0.9;
  const desenharBraco = (k: Lado) => (C: C_, M: M_) => {
    const b = bracos[k];
    const s = sinal(k);
    const dz = op.bracoDePertoAtras && dePerfil(C) ? { dz: 1e6 } : {};
    // o mancal no eixo, o tubo do braço, o toco para dentro e o pegador de pé na ponta dele, com a borracha
    C.cilindro(add(b.eixo, mul(b.dirEixo, -s * 4)), add(b.eixo, mul(b.dirEixo, s * 4)), 5.5, M.metalClaro, { lados: 20, ...dz });
    C.cilindro(add(b.eixo, mul(b.dirEixo, s * 4)), add(b.eixo, mul(b.dirEixo, s * 6)), 2.5, M.cromo, { lados: 12, ...dz });
    const K = dobra(k);
    C.tubo(b.eixo, K, 6, 6, M.metal, { up: b.dirEixo, ...dz });
    C.cilindro(add(K, mul(b.dirEixo, -3)), add(K, mul(b.dirEixo, 3)), 3, M.metal, { lados: 14, ...dz });
    C.tubo(K, add(b.ponta, mul(b.dirBorracha, -3)), 6, 6, M.metal, { up: b.dirEixo, ...dz });
    C.cilindro(add(b.ponta, mul(b.dirPegador, -2)), b.centro, 2, M.cromo, { lados: 12, ...dz });
    const meia = g('pegadorComp') / 2;
    const r = g('pegadorDiam') / 2;
    C.cilindro(add(b.centro, mul(b.dirBorracha, -meia)), add(b.centro, mul(b.dirBorracha, meia)), r, M.borracha, { lados: 14, ...dz });
    C.cilindro(add(b.centro, mul(b.dirBorracha, -meia - 1.2)), add(b.centro, mul(b.dirBorracha, -meia)), r + 0.5, M.borracha, { lados: 14, ...dz });
    C.cilindro(add(b.centro, mul(b.dirBorracha, meia)), add(b.centro, mul(b.dirBorracha, meia + 1.2)), r + 0.5, M.borracha, { lados: 14, ...dz });
  };
  const bracoR: PecaPropria = { t: 'propria', nome: `braço direito da ${mod.nome}`, desenhar: desenharBraco('R') };
  const bracoL: PecaPropria = { t: 'propria', nome: `braço esquerdo da ${mod.nome}`, desenhar: desenharBraco('L') };

  const subida = subidaDaPilhaDaRemada(m);
  const n = g('pilhaPlacas'),
    kP = Math.min(n, Math.max(1, m.placas ?? 5)),
    hp = g('pilhaAltura') / n;
  const rCame = g('cameDiam') / 2;
  const xCame = lt * (xB + 9);
  const pilha: PecaPropria = {
    t: 'propria',
    nome: `pilha da ${mod.nome}`,
    desenhar(C, M) {
      const xP = (xT0 + xT1) / 2 - g('pilhaLarg') / 2,
        zPl = zTorre + g('pilhaProf') / 2;
      if (n - kP > 0) C.pilha([xP, tubo + 2, zPl], X, [0, 0, -1], g('pilhaLarg'), hp * (n - kP), g('pilhaProf'), n - kP);
      const yDo = tubo + 2 + hp * (n - kP) + subida;
      C.pilha([xP, yDo, zPl], X, [0, 0, -1], g('pilhaLarg'), hp * kP, g('pilhaProf'), kP);
      const xc = (xT0 + xT1) / 2;
      C.cilindro([xc, yDo + hp * kP, zTorre], [xc, yDo + hp * kP + 10, zTorre], 1.2, M.cromo, { lados: 8 });
      // o came no eixo do braço da esquerda (o lado da torre); o cabo sai por cima dele, vai até a roldana do alto da torre
      // e desce até o pino das placas
      const cE: V3 = [xCame, yE, zE];
      C.cilindro(add(cE, [-2.5, 0, 0]), add(cE, [2.5, 0, 0]), rCame, M.metalClaro, { lados: 24 });
      C.cilindro(add(cE, [-4, 0, 0]), add(cE, [4, 0, 0]), 2.5, M.cromo, { lados: 12 });
      const roldana: V3 = [xc, H + 6, zTorre];
      C.linha([xCame, yE + rCame, zE], [xc, H + 6 + 4.5, zTorre], '#202327', 0.7);
      C.linha([xc, H + 6 - 4.5, zTorre], [xc, yDo + hp * kP + 10, zTorre], '#202327', 0.7);
      C.cilindro(add(roldana, [0, 0, -1.5]), add(roldana, [0, 0, 1.5]), 4.5, M.metalClaro, { lados: 16 });
      T(C, M, [xT0, H, zTorre], [xT0, H + 6, zTorre], 4);
      T(C, M, [xT0, H + 6, zTorre], [xc - lt * 3, H + 6, zTorre], 3);
    },
  };
  return {
    prims,
    fixa,
    coluna,
    bracos: { R: bracoR, L: bracoL },
    pilha,
    pegadores: { R: bracos.R.centro, L: bracos.L.centro },
    eixos: { R: bracos.R.eixo, L: bracos.L.eixo },
    subida,
    apoio: A,
    extremos: { zTras, zFrente, xDireita: Math.min(-xB - 6, xT1 - 2), xEsquerda: Math.max(xB + 6, xT1 + 2) },
  };
}
