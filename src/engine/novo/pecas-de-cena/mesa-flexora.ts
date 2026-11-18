// Peça de cena: a mesa flexora (flexão de joelho deitado de bruços). Medidas em ../dados/objetos/mesa-flexora.json: o
// tamanho total vem das fichas da Life Fitness (SS-LC), da Hammer Strength (HS-LC), da Movement (Next) e da Precor
// (RSL0606); a espessura dos estofados, da Precor. A Life Fitness e a Precor dizem que o estofado do quadril e o do
// peito têm ângulos diferentes ("diverging hip and chest pad angle"; "the angled hip and chest pads [...] ensure proper
// alignment of the exerciser's knee with the pivot point"), sem dar os ângulos: a dobra no quadril é de desenho, como
// no cartão de hoje. As medidas que fazem a máquina funcionar (a altura do eixo, onde ele fica em relação ao estofado,
// a alavanca) não aparecem nas fichas e são de desenho, com o motivo. Parte do cartão de hoje
// (scripts/desenhos-equipamento/realista/itens.mjs, `mesa_flexora`): os dois estofados azuis com a dobra no quadril,
// os pegadores à frente, o came redondo no eixo, a alavanca com o rolo atrás dos tornozelos. O cartão de hoje não tem
// pilha (um pino de anilha na alavanca) e é 33% a 40% mais baixo que as fichas, que dão 148 cm de altura: a altura é a
// da torre da pilha; aqui a torre fica ao lado do estofado, como na cadeira flexora aprovada (a largura de 106 cm só
// fecha assim). O came, a alavanca, o rolo e a pilha são os da cadeira flexora (../pecas-de-cena/cadeira-flexora.ts),
// com as mesmas medidas, desenhados do mesmo jeito; aquele arquivo não muda.
//
// A máquina funciona: a alavanca gira no eixo, que fica ao lado do joelho de quem deita; o came gira com ela e enrola
// o cabo, e as placas escolhidas sobem o arco do came (raio × ângulo girado desde a posição inicial); o rolo corre na
// alavanca até ficar atrás dos tornozelos.
//
// Eixos: quem deita fica de bruços com a cabeça para +z; o eixo da alavanca fica em z = 0, no meio da largura (x = 0),
// na altura `eixoAltura`. O lado esquerdo de quem deita é +x (o direito, que a vista de lado mostra, é −x): o came, a
// alavanca e a torre ficam à esquerda, para não esconder o joelho e a perna de quem olha de lado.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('mesaFlexora', id);
const rad = Math.PI / 180;
const X: V3 = [1, 0, 0];

/** As regulagens e o instante da máquina. */
export interface MesaFlexora {
  /** O ângulo da alavanca, em graus: 0 = apontando para os pés, na horizontal; 90 = para cima. */
  alavanca: number;
  /** O ângulo da posição inicial: a pilha começa a subir daí. */
  inicio: number;
  /** A distância do eixo ao centro do rolo (cm). */
  rolo: number;
  /** Quantas placas estão no pino. */
  placas?: number;
  /**
   * Os pontos (cm, no mundo) que o enquadramento precisa mostrar; o resto da máquina (o alto da torre) é cortado pela
   * borda do quadro. Sem eles, a máquina inteira entra no enquadramento (como no cartão).
   */
  noQuadro?: V3[];
}

/** Um estofado: a ponta de onde ele sai, a direção em que ele vai (ao longo do topo) e a normal do topo. */
export interface PlanoDoEstofado {
  ponta: V3;
  ao: V3;
  normal: V3;
  comp: number;
}

/** A geometria fixa da máquina (não depende da regulagem). */
export function geometriaDaMesaFlexora() {
  const eixo: V3 = [0, g('eixoAltura'), 0];
  const ci = g('coxaInclina') * rad,
    pi = g('peitoInclina') * rad;
  // o estofado das coxas começa logo à frente do eixo, um pouco abaixo dele, e sobe para o quadril
  const coxa: PlanoDoEstofado = { ponta: [0, eixo[1] - g('eixoAcima'), g('eixoAtras')], ao: [0, Math.sin(ci), Math.cos(ci)], normal: [0, Math.cos(ci), -Math.sin(ci)], comp: g('coxaEstofadoComp') };
  const dobra = add(coxa.ponta, mul(coxa.ao, coxa.comp));
  // o do peito sai da dobra e desce para a cabeça
  const peito: PlanoDoEstofado = { ponta: dobra, ao: [0, -Math.sin(pi), Math.cos(pi)], normal: [0, Math.cos(pi), Math.sin(pi)], comp: g('peitoEstofadoComp') };
  const pontaDoPeito = add(dobra, mul(peito.ao, peito.comp));
  const meiaLarg = g('estofadoLarg') / 2;
  const xCame = meiaLarg + 7;
  // os pegadores: ao lado da ponta do estofado do peito, abaixo dela; a manopla sobe inclinada para a frente
  const pegadores = ([-1, 1] as const).map((s) => {
    const centro: V3 = [s * g('pegadorFora'), pontaDoPeito[1] - g('pegadorAbaixo'), pontaDoPeito[2] + g('pegadorFrente')];
    const dir: V3 = [0, Math.cos(25 * rad), Math.sin(25 * rad)];
    return { centro, dir };
  });
  return { eixo, coxa, peito, dobra, pontaDoPeito, meiaLarg, xCame, pegadores };
}

/** A direção da alavanca (do eixo para o rolo) no ângulo dado. */
export const direcaoDaAlavancaDaMesa = (graus: number): V3 => [0, Math.sin(graus * rad), -Math.cos(graus * rad)];

/** Quanto as placas sobem (cm) com a alavanca no ângulo dado. */
export const subidaDaPilhaDaMesa = (m: Pick<MesaFlexora, 'alavanca' | 'inicio'>) => Math.max(0, m.alavanca - m.inicio) * rad * (g('cameDiam') / 2);

/** O topo de um estofado: o centro, para a caixa da conferência e para o desenho. */
const meioDoTopo = (p: PlanoDoEstofado) => add(p.ponta, mul(p.ao, p.comp / 2));

/**
 * A mesa flexora: os volumes para a conferência (os dois estofados, onde o corpo deita e que ele não pode atravessar,
 * e o rolo), a estrutura parada e a parte que se mexe (alavanca, rolo, came, cabo e placas), e os pontos que o
 * exercício lê (o eixo, o centro do rolo, os estofados, os pegadores).
 */
export function mesaFlexora(m: MesaFlexora) {
  const G = geometriaDaMesaFlexora();
  const esp = g('estofadoEsp');
  const dAl = direcaoDaAlavancaDaMesa(m.alavanca);
  const centroRolo = add(G.eixo, mul(dAl, m.rolo));
  const rRolo = g('roloDiam') / 2;
  const meiaLarg = G.meiaLarg;

  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  const prims: Prim[] = [];
  for (const p of [G.coxa, G.peito]) prims.push(caixa(add(meioDoTopo(p), mul(p.normal, -esp / 2)), X, p.normal, p.ao, [meiaLarg, esp / 2, p.comp / 2], 'estofado'));
  prims.push({ t: 'volume', vol: cilindro(add(centroRolo, [-g('roloComp') / 2, 0, 0]), add(centroRolo, [g('roloComp') / 2, 0, 0]), rRolo), cls: 'estofado', vies: 0.5 });

  const xC = G.xCame,
    tubo = g('tubo');
  // a máquina vai de trás do rolo (com a alavanca toda estendida) até a frente dos pegadores
  const zTras = -g('alavancaMax') - rRolo - 4;
  const zFrente = zTras + g('comp');
  // a torre da pilha, ao lado do estofado do peito (à esquerda de quem deita), na ponta da frente, com a frente virada
  // para o estofado: de lado, ela fica atrás da cabeça e dos braços, e não atrás do quadril e das pernas
  const zTorre = zFrente - 13;
  const xT0 = g('larg') - meiaLarg - 8 - 34,
    xT1 = xT0 + 34;
  const zT0 = zTorre - 13,
    zT1 = zTorre + 13;
  const H = g('alturaTorre');
  const yPolia = 10;

  const fixa: PecaPropria = {
    t: 'propria',
    nome: 'mesa flexora',
    fixa: [],
    ...(m.noQuadro ? { noQuadro: m.noQuadro } : {}),
    desenhar(C, M, o) {
      const T = (a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
      // a base no chão: dois trilhos ao longo de z e as travessas
      for (const x of [-meiaLarg + 4, xC + 2]) T([x, tubo / 2, zTras], [x, tubo / 2, zFrente]);
      for (const z of [zTras + 4, zFrente - 4]) T([-meiaLarg + 4, tubo / 2, z], [xC + 2, tubo / 2, z]);
      T([xC + 2, tubo / 2, zT0 + 4], [xT1, tubo / 2, zT0 + 4]);
      T([xC + 2, tubo / 2, zT1 - 4], [xT1, tubo / 2, zT1 - 4]);
      // a viga sob os estofados, que segue a dobra, e os pés dela
      const sob = (p: V3, n: V3) => add(p, mul(n, -esp - 4));
      const a0 = sob(G.coxa.ponta, G.coxa.normal),
        a1 = sob(G.dobra, [0, 1, 0]),
        a2 = sob(G.pontaDoPeito, G.peito.normal);
      T(a0, a1, 6);
      T(a1, a2, 6);
      T([0, tubo, a0[2] + 6], add(a0, [0, 0, 6]));
      T([0, tubo, a1[2]], a1);
      T([0, tubo, a2[2] - 4], add(a2, [0, 0, -4]));
      for (const z of [a0[2] + 6, a1[2], a2[2] - 4]) T([-meiaLarg + 4, tubo / 2, z], [xC + 2, tubo / 2, z]);
      // os estofados (a face de baixo de cada um fica abaixo do plano onde o corpo deita)
      for (const p of [G.coxa, G.peito]) C.estofado(add(meioDoTopo(p), mul(p.normal, -esp)), p.ao, p.normal, X, p.comp, esp, g('estofadoLarg'));
      // os pegadores: um braço sai da viga, à frente, e a manopla sobe inclinada
      for (const { centro, dir } of G.pegadores) {
        const pe = add(centro, mul(dir, -g('pegadorComp') / 2 - 3));
        T(add(a2, [0, -2, -2]), [pe[0], pe[1], pe[2]], 4.5);
        C.cilindro(pe, add(centro, mul(dir, -g('pegadorComp') / 2)), 1.8, M.metal, { lados: 10 });
        C.cilindro(add(centro, mul(dir, -g('pegadorComp') / 2)), add(centro, mul(dir, g('pegadorComp') / 2)), 2, M.borracha, { lados: 12 });
      }
      // o pé do eixo
      T([xC + 2, tubo, 0], [xC + 2, G.eixo[1] - 6, 0]);
      T([xC + 2, G.eixo[1] - 6, 0], [xC + 2, a0[1], a0[2] + 6], 5);
      // a torre: quatro montantes, a tampa e as guias das placas
      for (const [x, z] of [
        [xT0, zT0],
        [xT1, zT0],
        [xT0, zT1],
        [xT1, zT1],
      ] as [number, number][])
        T([x, tubo, z], [x, H, z], 4.5);
      for (const z of [zT0, zT1]) T([xT0, H, z], [xT1, H, z], 4.5);
      for (const x of [xT0, xT1]) T([x, H, zT0], [x, H, zT1], 4.5);
      for (const dz of [-6, 6]) C.cilindro([(xT0 + xT1) / 2, tubo, zTorre + dz], [(xT0 + xT1) / 2, H - 6, zTorre + dz], 0.8, M.cromo, { lados: 8 });
      // as polias do cabo: uma sob o eixo e a do pé da torre
      C.cilindro([xC - 1.5, yPolia, 0], [xC + 1.5, yPolia, 0], 4.5, M.metalClaro, { lados: 16 });
      C.cilindro([(xT0 + xT1) / 2 - 1.5, yPolia, zT0 - 2], [(xT0 + xT1) / 2 + 1.5, yPolia, zT0 - 2], 4.5, M.metalClaro, { lados: 16 });
      if (o.comSombra) C.sombra((xT1 - meiaLarg) / 2, (zTras + zFrente) / 2, (xT1 + meiaLarg) / 2 + 6, g('comp') / 2, 0.18);
    },
  };

  const subida = subidaDaPilhaDaMesa(m);
  const n = g('pilhaPlacas'),
    k = Math.min(n, Math.max(1, m.placas ?? 5)),
    hp = g('pilhaAltura') / n;
  const movel: PecaPropria = {
    t: 'propria',
    nome: 'alavanca da mesa flexora',
    ...(m.noQuadro ? { noQuadro: m.noQuadro } : {}),
    desenhar(C, M) {
      // as placas: as que ficam embaixo e as do pino, que sobem; a haste que as atravessa
      const xP = (xT0 + xT1) / 2 - g('pilhaLarg') / 2,
        zP = zTorre - g('pilhaProf') / 2;
      if (n - k > 0) C.pilha([xP, tubo + 2, zP], X, [0, 0, 1], g('pilhaLarg'), hp * (n - k), g('pilhaProf'), n - k);
      const yDo = tubo + 2 + hp * (n - k) + subida;
      C.pilha([xP, yDo, zP], X, [0, 0, 1], g('pilhaLarg'), hp * k, g('pilhaProf'), k);
      C.cilindro([(xT0 + xT1) / 2, yDo + hp * k, zTorre], [(xT0 + xT1) / 2, yDo + hp * k + 10, zTorre], 1.2, M.cromo, { lados: 8 });
      // o cabo: do came, desce até a polia sob o eixo, corre no chão até o pé da torre e sobe por dentro dela
      const rC = g('cameDiam') / 2;
      const saida = add(G.eixo, [xC, -rC, 0]);
      C.linha(saida, [xC, yPolia - 4.5, 0], '#202327', 0.7);
      C.linha([xC, yPolia - 4.5, 0], [xC, yPolia - 4.5, zT0 - 2], '#202327', 0.7);
      C.linha([xC, yPolia - 4.5, zT0 - 2], [(xT0 + xT1) / 2, yPolia - 4.5, zT0 - 2], '#202327', 0.7);
      // o came e o eixo
      const cx = (x: number): V3 => [x, G.eixo[1], G.eixo[2]];
      C.cilindro(cx(xC - 3), cx(xC + 3), rC, M.metalClaro, { lados: 24 });
      C.cilindro(cx(xC + 3), cx(xC + 6), 3, M.cromo, { lados: 12 });
      // a alavanca: do came até a ponta, no lado esquerdo; o rolo passa por cima das duas pernas
      const pontaAl = add(G.eixo, mul(dAl, g('alavancaMax')));
      const lado = (v: V3, x: number): V3 => [x, v[1], v[2]];
      C.tubo(lado(G.eixo, xC), lado(pontaAl, xC), 5, 5, M.metal, { up: [1, 0, 0] });
      // a luva do rolo, que corre na alavanca, e a haste que leva o rolo para cima das pernas
      C.tubo(lado(add(centroRolo, mul(dAl, -4)), xC), lado(add(centroRolo, mul(dAl, 4)), xC), 7, 7, M.metalClaro, { up: [1, 0, 0] });
      C.cilindro(lado(centroRolo, xC - 3), lado(centroRolo, -g('roloComp') / 2), 1.6, M.cromo, { lados: 10 });
      C.cilindro(add(centroRolo, [-g('roloComp') / 2, 0, 0]), add(centroRolo, [g('roloComp') / 2 - 6, 0, 0]), rRolo, M.estofado, { lados: 18 });
    },
  };
  return { prims, fixa, movel, eixo: G.eixo, centroRolo, subida, coxa: G.coxa, peito: G.peito, pegadores: G.pegadores, extremos: { zTras, zFrente, xDireita: -meiaLarg - 6, xEsquerda: xT1 + 2 } };
}
