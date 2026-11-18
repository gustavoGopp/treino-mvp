// Peça de cena: o suporte de agachamento (rack aberto), para os exercícios com a barra longa tirada dos ganchos
// (agachamento, supino reto, desenvolvimento em pé). Medidas em ../dados/objetos/suporte.json: a altura e o comprimento
// das fichas da Life Fitness (LBR-OS) e da Hammer Strength (OSR), a regulagem e os pinos de segurança da IPF. Parte do
// cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `rack_de_agachamento`): os montantes de grafite
// furados, o gancho em J com a borracha no berço, as barras de segurança cromadas e o quadro de tubo no chão. O cartão
// de hoje é uma gaiola de 4 colunas com 2,24 m de altura (sem fonte); as fichas lidas são de suportes abertos de 1,86 a
// 1,92 m, e é esse o desenho aqui: dois montantes presos a um quadro no chão, com os ganchos e os pinos virados para a
// pessoa.
//
// Quem chama dá o meio entre os montantes no chão, a direção do suporte para a pessoa e as duas regulagens: a altura do
// berço do gancho (onde a barra apoia) e a do topo do pino de segurança, cada uma num furo (passo de 2,5 cm).
//
// O desenho sai em duas peças: a estrutura (montantes, furos, quadro do chão, pinos) é cenário,
// pintada atrás do corpo e fora do enquadramento (de lado, o montante e o pino de perto cruzariam o corpo e o
// esconderiam; de perfil, o de perto e o de longe caem no mesmo lugar da tela); os ganchos são o equipamento do
// exercício, na ordem certa de profundidade e dentro do quadro, perto de onde a barra está.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { REF0, comb, cross, norm } from '../vec';
import type { V3 } from '../vec';

const s = (id: string) => obj('suporte', id);
const Y: V3 = [0, 1, 0];

export interface Suporte {
  /** O meio entre os centros dos dois montantes, no chão. */
  base: V3;
  /** A direção (horizontal) do suporte para a pessoa: é para lá que os ganchos e os pinos apontam. */
  paraAPessoa: V3;
  /** A altura do berço do gancho, do chão até onde a barra apoia (cm). */
  gancho: number;
  /** A altura do topo do pino de segurança (cm). */
  pino: number;
}

/** A altura de regulagem num furo (o passo da tabela): a mais perto de `alt`. */
export const furoMaisPerto = (alt: number) => Math.round(alt / s('passo')) * s('passo');
/** A altura de regulagem num furo: a primeira abaixo de `alt` (ou nela). */
export const furoAbaixo = (alt: number) => Math.floor(alt / s('passo') + 1e-9) * s('passo');
/** Meia distância entre os centros dos montantes. */
export const meioVaoDoSuporte = () => s('vaoInterno') / 2 + s('tubo') / 2;
/** Do centro do montante até o meio do berço do gancho, na direção da pessoa. */
export const bercoAFrente = () => s('tubo') / 2 + (s('ganchoProf') - 1.2) / 2;

function eixos(S: Suporte) {
  const f = norm([S.paraAPessoa[0], 0, S.paraAPessoa[2]]);
  const lado = norm(cross(Y, f));
  // um ponto: `l` de lado (do meio para um montante), `y` de altura e `d` na direção da pessoa
  const P = (l: number, y: number, d: number): V3 => comb([1, S.base], [l, lado], [y, Y], [d, f]);
  return { f, lado, P };
}
/** A direção da barra nos ganchos (de um montante ao outro). */
export const eixoDoSuporte = (S: Suporte): V3 => eixos(S).lado;
/** O centro da barra quando ela está nos ganchos (no meio dos dois berços), com o raio da pegada da barra. */
export function barraNosGanchos(S: Suporte): V3 {
  return eixos(S).P(0, S.gancho + obj('barraLonga', 'pegadaDiam') / 2, bercoAFrente());
}

const caixa = (o: V3, meias: V3, cls: string, vies: number): Prim => ({ t: 'caixa', ref: { ...REF0, o }, meias, cls, vies });

export function suporte(S: Suporte): { prims: Prim[]; estrutura: PecaPropria; ganchos: PecaPropria; extremos: { zFrente: number; zTras: number } } {
  const { f, lado, P } = eixos(S);
  const xm = meioVaoDoSuporte(),
    t = s('tubo'),
    H = s('altura'),
    meiaBase = s('baseComp') / 2,
    pl = s('pinoLarg'),
    pc = s('pinoComp');
  const dP = t / 2; // a face dos montantes virada para a pessoa
  // os volumes da conferência (só servem se a pessoa estiver de lado e reto ao suporte, como nos três exercícios)
  const prims: Prim[] = [];
  for (const sl of [-1, 1]) {
    prims.push(caixa(P(sl * xm, H / 2, 0), [t / 2, H / 2, t / 2], 'esc', -40));
    prims.push(caixa(P(sl * xm, S.pino - pl / 2, dP + pc / 2), [pl / 2, pl / 2, pc / 2], 'esc', -40));
  }
  const fixa = [S.base, S.paraAPessoa, S.gancho, S.pino];
  const estrutura: PecaPropria = {
    t: 'propria',
    nome: 'suporte',
    cenario: true,
    fixa,
    desenhar(C, M, o) {
      const tubo = (a: V3, b: V3, w: number, h: number, m = M.metal, up: V3 = f) => C.tubo(a, b, w, h, m, { up });
      const altBase = t * 0.66;
      // o quadro do chão: um trilho sob cada montante, na direção da pessoa, e uma travessa na ponta de trás
      for (const sl of [-1, 1]) tubo(P(sl * xm, altBase / 2, -meiaBase), P(sl * xm, altBase / 2, meiaBase), t, altBase, M.metal, Y);
      tubo(P(-xm, altBase / 2, -meiaBase + t / 2), P(xm, altBase / 2, -meiaBase + t / 2), t, altBase, M.metal, Y);
      for (const sl of [-1, 1]) for (const d of [-meiaBase + 3, meiaBase - 3]) C.cilindro(P(sl * xm, 0, d), P(sl * xm, 1.2, d), 3.2, M.borracha, { lados: 10 });
      // os montantes, com uma tampa em cima (sem travessa: a do cartão de hoje é a da gaiola; de cima, ela cobriria a cabeça
      // no supino)
      for (const sl of [-1, 1]) tubo(P(sl * xm, altBase, 0), P(sl * xm, H - 0.8, 0), t, t, M.metal, f);
      for (const sl of [-1, 1]) tubo(P(sl * xm, H - 0.8, 0), P(sl * xm, H, 0), t + 0.5, t + 0.5, M.borracha, f);
      // os furos de regulagem, na face virada para a pessoa, do pino mais baixo ao gancho mais alto
      const furos: V3[] = [];
      for (const sl of [-1, 1]) for (let y = s('pinoMin'); y <= s('ganchoMax') + 1e-6; y += s('passo')) furos.push(P(sl * xm, y, dP + 0.05));
      C.furos(furos, lado, Y, s('furoDiam') / 2);
      // os pinos de segurança: saem dos montantes na direção da pessoa, com uma tampa de borracha na ponta
      for (const sl of [-1, 1]) {
        const a = P(sl * xm, S.pino - pl / 2, dP),
          b = P(sl * xm, S.pino - pl / 2, dP + pc - 1);
        tubo(a, b, pl, pl, M.cromo, Y);
        tubo(b, P(sl * xm, S.pino - pl / 2, dP + pc), pl + 0.4, pl + 0.4, M.borracha, Y);
      }
      if (o.comSombra) C.sombra(S.base[0], S.base[2], xm + 12, meiaBase + 6, 0.16);
    },
  };
  // os ganchos em J: a chapa presa na face do montante, o berço com borracha onde a barra apoia e a borda da ponta
  const ga = s('ganchoAlt'),
    gp = s('ganchoProf'),
    gb = s('ganchoBorda'),
    gl = t - 1;
  const ganchos: PecaPropria = {
    t: 'propria',
    nome: 'ganchos do suporte',
    fixa,
    noQuadro: [-1, 1].flatMap((sl) => [P(sl * xm, S.gancho - ga + gb, dP), P(sl * xm, S.gancho + gb, dP + gp)]),
    desenhar(C, M) {
      for (const sl of [-1, 1]) {
        const x = sl * xm,
          y0 = S.gancho;
        // a chapa de trás, contra o montante, desce abaixo do berço (é ela que encaixa nos furos)
        C.tubo(P(x, y0 - ga + gb, dP + 0.8), P(x, y0 + gb, dP + 0.8), gl, 1.6, M.metalClaro, { up: f });
        // o berço: a chapa de baixo, com a borracha em cima (o topo da borracha fica na altura do gancho)
        C.tubo(P(x, y0 - 1.6, dP + 1.6), P(x, y0 - 1.6, dP + gp), gl, 1.2, M.metalClaro, { up: Y });
        C.tubo(P(x, y0 - 0.5, dP + 1.6), P(x, y0 - 0.5, dP + gp - 1.2), gl - 0.6, 1, M.borracha, { up: Y });
        // a borda do J, na ponta
        C.tubo(P(x, y0 - 2.2, dP + gp - 0.6), P(x, y0 + gb - 1, dP + gp - 0.6), gl, 1.2, M.metalClaro, { up: f });
      }
    },
  };
  // até onde o suporte vai na direção da pessoa e para longe dela (cm em z, para quem põe a cena)
  const zs = [P(0, 0, -meiaBase)[2], P(0, 0, meiaBase)[2]];
  return { prims, estrutura, ganchos, extremos: { zFrente: Math.max(...zs), zTras: Math.min(...zs) } };
}
