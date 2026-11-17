// Rosca concentrada sentado, com halter, no motor novo (primeira animação deste exercício: até aqui ele era só cartão
// de texto). Os números vêm da ficha (../dados/movimentos/rosca-concentrada.json). A cena é a cadeira firme encostada
// na parede (../pecas-de-cena/cadeira.ts); a pose sentada na ponta, do núcleo ./sentado-na-ponta.ts: pernas afastadas,
// pés no chão com as pontas um pouco para fora, o tronco inclinado à frente. O braço direito trabalha: a parte de trás
// dele (o tríceps, junto do cotovelo) apoia por dentro da coxa direita, perto do joelho; a mão esquerda fica espalmada
// na coxa esquerda. Só o antebraço direito se mexe: o cotovelo é uma dobradiça encostada na coxa. O que se resolve, em
// vez de receber pronto:
//  - o ponto de apoio: a pele de dentro da coxa direita a `apoio.naCoxa` do quadril ao joelho; o centro do cotovelo fica
//    fora dela o raio do braço ali, menos o que a pele amassa (`apoio.amassa`), medido na superfície do Boneco;
//  - quanto a bacia inclina à frente: o que deixa o ombro direito a um braço (do ombro ao cotovelo) desse ponto. O braço
//    pende do ombro até a coxa; o tronco não balança;
//  - o plano da rosca: o lado do bíceps fica virado para dentro (para a outra perna), o do tríceps para a coxa; o
//    antebraço sobe nesse plano, do braço quase estendido (o halter entre os pés) até perto do ombro.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/rosca-concentrada.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { cadeira, parede } from '../pecas-de-cena/cadeira';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dirRef, dist, dot, girar, mix, mul, norm, paraRef, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { halterNaMao } from './dobrar-o-cotovelo';
import { assento } from './quadril-sentado-na-cadeira';
import { contatoEntre, pesNoChao, sentarNaPonta, troncoNaPonta } from './sentado-na-ponta';
import type { OpcoesNaPonta, TroncoNaPonta } from './sentado-na-ponta';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const HALTER = 'halterLeve';
const O: OpcoesNaPonta = { quadrilABorda: f('quadrilABorda'), pesMeiaDistancia: f('pes.meiaDistancia'), pesAbrem: f('pes.abrem'), joelho: f('joelho'), amassa: f('assento.amassa') };
const coluna = (frente: number): TroncoNaPonta => ({ frente, lombar: f('lombar'), toracica: f('toracica'), cervical: f('cervical'), cabeca: f('cabeca') });

/**
 * A parte de trás do braço direito na pele de dentro da coxa direita (cm; positivo = amassa; negativo = a distância
 * entre as duas). Só a coxa longe da virilha e o braço da metade de baixo (perto do cotovelo) contam.
 */
export function bracoNaCoxa(e: Esq): number {
  const L = e.lado.R;
  return contatoEntre(
    e,
    (parte, p) => parte === 'coxa' && p[0] < 0 && dist(p, L.quadril) > e.corpo.m('coxa.comp') * 0.4,
    (parte, p) => parte === 'braco' && dist(p, L.cotovelo) < dist(p, L.ombro),
  );
}

/** A pele de dentro da coxa direita a `t` do quadril ao joelho (0 a 1), na direção `n` (para dentro e um pouco para cima). */
function peleDeDentro(e: Esq, t: number): { p: V3; n: V3 } {
  const L = e.lado.R;
  const eixo = sub(L.joelho, L.quadril),
    comp = Math.hypot(...eixo),
    u = mul(eixo, 1 / comp);
  const c = add(L.quadril, mul(eixo, t));
  // para dentro (para a outra perna), girado `apoio.acima` graus para cima, perpendicular à coxa
  const dentro = norm(perp([-sinal('R'), 0, 0], u));
  const n = norm(girar(dentro, norm(cross(dentro, [0, 1, 0])), -f('apoio.acima')));
  let r = 0;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'coxa' || p[0] > 0) continue;
    const d = sub(p, c);
    if (Math.abs(dot(d, u)) > 2.5) continue;
    r = Math.max(r, dot(d, n));
  }
  return { p: add(c, mul(n, r)), n };
}

/**
 * O braço direito: o úmero na direção dada; o lado do bíceps virado para dentro (girado `rosca.plano` graus para a
 * frente); o antebraço dobrado `cotovelo` graus nesse plano; a mão supinada (palma para cima, em direção ao ombro).
 */
function bracoQueTrabalha(umero: V3, cotovelo: number): PoseBraco {
  const dentro: V3 = [-sinal('R'), 0, 0];
  const plano = norm(girar(dentro, [0, 1, 0], -f('rosca.plano')));
  const frente = norm(perp(plano, umero));
  const c = cotovelo * rad;
  const antebraco = norm(add(mul(umero, Math.cos(c)), mul(frente, Math.sin(c))));
  const frenteAnte = norm(add(mul(frente, Math.cos(c)), mul(umero, -Math.sin(c))));
  // o lado do polegar com a mão supinada: com o bíceps virado para dentro, o polegar aponta para a frente
  const fora = norm(perp(cross(umero, frente), antebraco));
  const sup = f('maos.supinacao') * rad;
  const polegar = norm(add(mul(frenteAnte, Math.cos(sup)), mul(fora, Math.sin(sup))));
  return { umero, antebraco, polo: mul(frente, -1), mao: { polegar, forma: 'pegada', diam: obj(HALTER, 'caboDiam') } };
}

const SEM_BRACO: PoseBraco = { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'relaxada' } };

/** Para onde aponta o cotovelo esquerdo: para fora, para baixo e um pouco para trás (o braço descansa ao lado da coxa). */
const POLO_L = (): V3 => norm([1, -f('maoL.poloDesce'), -0.3]);

/**
 * A mão esquerda espalmada em cima da coxa esquerda, perto do joelho: o meio da palma na pele. Os dedos seguem o
 * antebraço o quanto a pele deixa (a direção do antebraço deitada na coxa): assim o punho dobra só o que a inclinação do
 * antebraço pede. Três passadas, porque o antebraço depende de onde o punho fica.
 */
function maoNaCoxa(t: Tronco, R: PoseBraco, pes: Record<Lado, PosePerna>): PoseBraco {
  let e = resolverMembros(t, { R, L: SEM_BRACO }, pes);
  const L = e.lado.L;
  const eixo = sub(L.joelho, L.quadril),
    u = norm(eixo);
  const c = add(L.quadril, mul(eixo, f('maoL.naCoxa')));
  // a pele de cima da coxa (a direção mais para cima, perpendicular à coxa), girada `maoL.paraDentro` graus em volta
  // da coxa para o lado de dentro: a palma apoia em cima e um pouco por dentro, e o antebraço não precisa girar tanto
  const n = norm(girar(norm(perp([0, 1, 0], u)), u, f('maoL.paraDentro')));
  let r = 0;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'coxa' || p[0] < 0) continue;
    const d = sub(p, c);
    if (Math.abs(dot(d, u)) > 2.5) continue;
    r = Math.max(r, dot(d, n));
  }
  const pele = add(c, mul(n, r));
  let dedos = u;
  let pose: PoseBraco = SEM_BRACO;
  for (let i = 0; i < 4; i++) {
    const punho = sub(add(pele, mul(n, e.corpo.m('raio.punho') * 0.85)), mul(dedos, e.corpo.m('mao.palma') * 0.45));
    pose = { punho, polo: POLO_L(), mao: { polegar: norm(cross(dedos, n)), dedos, forma: 'aberta' } };
    e = resolverMembros(t, { R, L: pose }, pes);
    const ante = norm(sub(e.lado.L.punho, e.lado.L.cotovelo));
    const deitado = perp(ante, n);
    if (Math.hypot(...deitado) > 1e-6) dedos = norm(deitado);
  }
  return pose;
}

interface Parado {
  y: number;
  bolaZ: number;
  frente: number;
  /** O úmero direito no referencial do tórax (para o erro do tronco, em que ele acompanha o tronco). */
  umeroNoTorax: V3;
  umero: V3;
  maoL: { punho: V3; dedos: V3; polegar: V3 };
}

function parado(corpo: Corpo): Parado {
  return calibragem(corpo, `${F.id}:parado`, () => {
    // a perna e a bacia de cada inclinação
    const sentar = (frente: number) => sentarNaPonta(corpo, O, coluna(frente));
    const pernas = (frente: number) => {
      const s = sentar(frente);
      const t = troncoNaPonta(corpo, O, s.y, coluna(frente));
      return { s, t, e: resolverMembros(t, { R: SEM_BRACO, L: SEM_BRACO }, pesNoChao(O, s.bolaZ)) };
    };
    /** Com a bacia a `frente`, o cotovelo no ponto de apoio afastado `fora` cm da pele: o braço e o quanto falta. */
    const montar = (frente: number, fora: number) => {
      const P = pernas(frente);
      const A = peleDeDentro(P.e, f('apoio.naCoxa'));
      const cot = add(A.p, mul(A.n, fora));
      // o ombro acompanha o braço (o ritmo da escápula): três passadas
      let umero = norm(sub(cot, P.e.lado.R.ombro)),
        ombro = P.e.lado.R.ombro;
      for (let i = 0; i < 3; i++) {
        ombro = resolverMembros(P.t, { R: bracoQueTrabalha(umero, f('cotovelo.baixo')), L: SEM_BRACO }, pesNoChao(O, P.s.bolaZ)).lado.R.ombro;
        umero = norm(sub(cot, ombro));
      }
      return { ...P, umero, falta: dist(cot, ombro) - corpo.m('braco.comp') };
    };
    // o cotovelo fica fora da pele o raio do braço junto dele, menos o que a pele amassa (duas correções medidas)
    let fora = corpo.m('raio.bracoFletido') - f('apoio.amassa'),
      frente = 0;
    for (let i = 0; i < 3; i++) {
      const fo = fora;
      frente = resolver1((x) => montar(x, fo).falta, -10, 80, 26);
      const M = montar(frente, fo);
      const e = resolverMembros(M.t, { R: bracoQueTrabalha(M.umero, f('cotovelo.baixo')), L: SEM_BRACO }, pesNoChao(O, M.s.bolaZ));
      fora += bracoNaCoxa(e) - f('apoio.amassa');
    }
    const M = montar(frente, fora);
    const mL = maoNaCoxa(M.t, bracoQueTrabalha(M.umero, f('cotovelo.baixo')), pesNoChao(O, M.s.bolaZ));
    return { y: M.s.y, bolaZ: M.s.bolaZ, frente, umeroNoTorax: paraRef({ ...M.t.torax, o: [0, 0, 0] }, M.umero), umero: M.umero, maoL: { punho: mL.punho!, dedos: mL.mao.dedos!, polegar: mL.mao.polegar } };
  });
}

function maoEsquerda(P: Parado): PoseBraco {
  return { punho: P.maoL.punho, polo: POLO_L(), mao: { polegar: P.maoL.polegar, dedos: P.maoL.dedos, forma: 'aberta' } };
}

function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
  const P = parado(corpo);
  const x = Math.max(0, Math.min(1, u));
  const baixo = erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.baixo');
  const cima = erro === 'tira' ? f('erro.tira.cotovelo') : f('cotovelo.cima');
  // balançar o tronco: a bacia endireita enquanto o braço sobe; o braço acompanha o tronco e sai da coxa
  const frente = P.frente - (erro === 'tronco' ? f('erro.tronco.sobe') * suave(x) : 0);
  const t: Tronco = troncoNaPonta(corpo, O, P.y, coluna(frente));
  let umero = erro === 'tronco' ? norm(dirRef(t.torax, P.umeroNoTorax)) : P.umero;
  // tirar o braço da coxa: o braço gira no ombro para a frente e para cima, e o cotovelo descola da coxa
  if (erro === 'tira') umero = norm(girar(umero, norm(cross(umero, [0, 0, 1])), f('erro.tira.braco') * suave(x)));
  return resolverMembros(t, { R: bracoQueTrabalha(umero, mix(baixo, cima, x)), L: maoEsquerda(P) }, pesNoChao(O, P.bolaZ));
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = esqueleto(corpo, u, erro);
  const A = assento();
  const cad = cadeira({ x0: 0, zBorda: A.zBorda });
  const H = halterNaMao(e, 'R', HALTER);
  return {
    esq: e,
    prims: [chao(-90, 90, -60, 100), ...cad.prims, ...H.prims],
    // a cadeira fica atrás do corpo na pintura (sentado nela, o corpo a cobre onde as duas se cruzam na tela)
    pecas: [{ ...cad.peca, cenario: true }, parede({ x0: 0, zBorda: A.zBorda }), H.peca],
    fios: [],
    cargas: [{ massa: f('carga'), pos: H.centro }],
    marcas: { halter: e.lado.R.pegada, piso: [0, 0, 0], assento: [0, A.altura, A.zBorda] },
    vies: { maoR: 1 },
    // de lado, o braço que trabalha fica por dentro da coxa direita, que está mais perto de quem olha: a perna direita é
    // pintada por cima do braço (senão o braço parecia apoiado por fora da coxa)
    viesNaVista: { lateral: { pernaR: 30 } },
  };
}

export const roscaConcentrada: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'lateral'],
  quadro,
  // bíceps do braço que trabalha (principal; a ficha não dá secundário); o antebraço "só ajuda", como nas outras roscas
  papeis: { 'biceps:R': 'p', 'antebraco:R': 'a' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
