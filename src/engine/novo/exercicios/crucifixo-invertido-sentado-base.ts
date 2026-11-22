// O núcleo dos dois crucifixos invertidos sentados com o peito nas coxas: com halteres (./crucifixo-invertido-sentado.ts)
// e com uma caneleira presa em cada antebraço (./crucifixo-invertido-caneleira.ts). Cada um traz a sua ficha de
// movimento; o corpo e o arco dos braços são os mesmos. A única diferença é a carga:
//  - halter: a mão fecha no cabo do halter leve, com o polegar para a frente, e o halter pende da mão;
//  - caneleira: a mão fica relaxada, aberta, e a caneleira é uma faixa fechada em volta do antebraço, logo acima do
//    punho (é o lugar do halter na mão que ela toma).
//
// A cena: a cadeira firme encostada na parede (../pecas-de-cena/cadeira.ts). A pessoa senta na ponta do assento, os pés
// juntos no chão, um pouco à frente dos joelhos, e inclina o tronco até o peito e a barriga encostarem nas coxas. O que
// se resolve, em vez de receber pronto (./sentado-na-ponta.ts):
//  - a altura da bacia (o glúteo no assento) e o lugar dos pés (o joelho no ângulo da ficha);
//  - quanto a bacia inclina à frente: até a pele do tronco encostar na pele das coxas (a metade de baixo delas, perto
//    dos joelhos), amassando `peito.amassa` cm. A coluna inclina o que a ficha pede, sem mais: o peito chega às coxas
//    pela dobra do quadril.
// Daí em diante, o tronco e as pernas ficam parados e só os braços se mexem, no arco do crucifixo invertido curvado
// aprovado (./crucifixo-invertido-curvado.ts): a linha do ombro à mão gira em volta da direção para a frente, de
// pendurada até perto da horizontal, para o lado; o cotovelo fica dobrado sempre o mesmo tanto, apontando para fora e
// um pouco para trás; as escápulas acompanham o braço sem se juntar e sem subir.
import { calibragem } from '../calibragens';
import { resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, resolver1, suave } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { chao } from '../pecas';
import { cadeira, parede } from '../pecas-de-cena/cadeira';
import { caneleira } from '../pecas-de-cena/caneleira';
import type { Caneleira } from '../pecas-de-cena/caneleira';
import { pontosDoBoneco } from '../boneco';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, dot, girar, lerp, mix, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { halterNaMao } from './dobrar-o-cotovelo';
import { bracoNaLinha, dobrar } from './na-fita';
import { assento } from './quadril-sentado-na-cadeira';
import { contatoEntre, ehTronco, entraNasPartes, pesNoChao, sentarNaPonta, troncoNaPonta } from './sentado-na-ponta';
import type { OpcoesNaPonta, TroncoNaPonta } from './sentado-na-ponta';

const rad = Math.PI / 180;
const HALTER = 'halterLeve';
export type CargaDoCrucifixo = 'halter' | 'caneleira';

/** A coxa longe da dobra do quadril (a pele da virilha e a da barriga baixa se juntam ali em qualquer pessoa sentada). */
const coxaLongeDoQuadril = (e: Esq) => (parte: string, p: V3) => parte === 'coxa' && Math.min(dist(p, e.lado.R.quadril), dist(p, e.lado.L.quadril)) > e.corpo.m('quadril.meiaDistancia') + 4;
/** O peito: a pele do tronco da metade de cima (mais perto da base do pescoço que da bacia). */
const ehPeito = (e: Esq) => (parte: string, p: V3) => parte === 'tronco' && dist(p, e.torax.o) < dist(p, e.pelve.o);

/** O peito nas coxas (cm; positivo = a pele do peito amassa a das coxas; negativo = a distância entre as duas). */
export const peitoNasCoxas = (e: Esq): number => contatoEntre(e, coxaLongeDoQuadril(e), ehPeito(e));
/** Quanto a barriga (a metade de baixo do tronco) entra nas coxas (cm; 0 ou menos = não entra). */
export const barrigaNasCoxas = (e: Esq): number => entraNasPartes(e, coxaLongeDoQuadril(e), (parte, p) => ehTronco(parte) && !ehPeito(e)(parte, p));

/** A caneleira em volta do antebraço `k`, logo acima do punho; o raio é o do antebraço ali, medido na pele do Boneco. */
export function caneleiraNoAntebraco(e: Esq, k: Lado, acimaDoPunho: number): Caneleira {
  const X = e.lado[k];
  const eixo = norm(sub(X.cotovelo, X.punho));
  const L = obj('caneleira', 'larg') / 2;
  const centro = add(X.punho, mul(eixo, acimaDoPunho + L));
  let r = 0;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'ante' || dist(p, X.punho) > 20) continue;
    const v = sub(p, centro);
    const t = dot(v, eixo);
    if (Math.abs(t) > L) continue;
    const radial = Math.hypot(...sub(v, mul(eixo, t)));
    if (radial < 8) r = Math.max(r, radial);
  }
  // o velcro fica do lado de fora do antebraço (o lado do polegar, virado para fora do corpo)
  return { centro, eixo, fora: norm(perp([sinal(k), 0, 0], eixo)), raio: r + obj('caneleira', 'esp') };
}

export function criarCrucifixoSentado(F: Ficha, carga: CargaDoCrucifixo) {
  const f = daFicha(F);
  const O: OpcoesNaPonta = { quadrilABorda: f('quadrilABorda'), pesMeiaDistancia: f('pes.meiaDistancia'), pesAbrem: 0, joelho: f('joelho'), amassa: f('assento.amassa') };
  const coluna = (frente: number): TroncoNaPonta => ({ frente, lombar: f('lombar'), toracica: f('toracica'), cervical: f('cervical'), cabeca: f('cabeca') });

  /**
   * A linha do ombro à mão, no mundo, com `abre` graus a partir da vertical (0 = pendurada; 90 = na horizontal, para o
   * lado), inclinada `tras` graus para trás (em volta do eixo dos lados), e a direção para onde o braço abre
   * (perpendicular a ela, para fora e para cima).
   */
  function linha(k: Lado, abre: number, tras = 0): { dir: V3; sobe: V3 } {
    const s = sinal(k),
      a = abre * rad;
    const X: V3 = [1, 0, 0];
    return { dir: girar([s * Math.sin(a), -Math.cos(a), 0], X, tras), sobe: girar([s * Math.cos(a), Math.sin(a), 0], X, tras) };
  }
  /** Quanto o braço vai para trás: no começo, os halteres atrás das panturrilhas; em cima, nada (abre para o lado). */
  const paraTras = (u: number) => f('inicio.paraTras') * (1 - u);

  function braco(corpo: Corpo, k: Lado, u: number, erro?: string, inicio = comeco(corpo)): PoseBraco {
    const abertura = (x: number) => mix(inicio, 90 - f('fim.abaixo'), x);
    const { dir, sobe } = linha(k, abertura(u), paraTras(u));
    const polo = norm([sobe[0], sobe[1], -f('cotovelo.paraTras')]);
    let umero: V3, antebraco: V3;
    if (erro === 'remada') {
      // o braço (do ombro ao cotovelo) abre como o certo, mas o cotovelo dobra e o antebraço fica pendurado embaixo
      // dele: a mão não sai de baixo do cotovelo (uma remada com os cotovelos abertos), como no curvado aprovado
      const x = suave(u);
      const certo = bracoNaLinha(corpo, dir, polo, f('cotovelo'));
      umero = norm(lerp(certo.umero, linha(k, mix(abertura(0), 90 - f('erro.remada.abaixo'), u), paraTras(u)).dir, x));
      antebraco = norm(lerp(certo.antebraco, dobrar(umero, [0, -1, 0], f('erro.remada.dobra')), x));
    } else ({ umero, antebraco } = bracoNaLinha(corpo, dir, polo, f('cotovelo')));
    // o polegar para a frente: embaixo, as palmas uma para a outra
    const polegar = norm(perp([0, 0, 1], antebraco));
    const elev = f('escapula.elev') + (erro === 'encolher' ? (f('erro.encolher.elev') - f('escapula.elev')) * suave(u) : 0);
    const mao: PoseBraco['mao'] = carga === 'halter' ? { polegar, forma: 'pegada', diam: obj(HALTER, 'caboDiam') } : { polegar, forma: 'relaxada' };
    return { umero, antebraco, polo, mao, elev, prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u) };
  }

  /** O corpo parado: a altura da bacia, o lugar dos pés e a inclinação da bacia que põe o peito nas coxas. */
  function parado(corpo: Corpo): { y: number; bolaZ: number; frente: number } {
    return calibragem(corpo, `${F.id}:parado`, () => {
      const montar = (frente: number) => {
        const s = sentarNaPonta(corpo, O, coluna(frente));
        // (os braços pendurados na vertical: eles não entram na medida do peito nas coxas)
        const e = resolverMembros(troncoNaPonta(corpo, O, s.y, coluna(frente)), { R: braco(corpo, 'R', 0, undefined, 0), L: braco(corpo, 'L', 0, undefined, 0) }, pesNoChao(O, s.bolaZ));
        return { ...s, e };
      };
      const frente = resolver1((x) => peitoNasCoxas(montar(x).e) - f('peito.amassa'), 0, 80, 24);
      const M = montar(frente);
      return { y: M.y, bolaZ: M.bolaZ, frente };
    });
  }

  /**
   * O começo: os braços pendurados, abertos para o lado o mínimo que deixa a carga (ou a ponta dos dedos, com a
   * caneleira) `inicio.folgaDoChao` cm acima do chão. Com o peito nas coxas, o ombro fica a uns 70 cm do chão e o braço
   * pendurado na vertical levaria o halter ao chão.
   */
  function comeco(corpo: Corpo): number {
    return calibragem(corpo, `${F.id}:comeco`, () => {
      const P = parado(corpo);
      const t = troncoNaPonta(corpo, O, P.y, coluna(P.frente));
      const maisBaixo = (a: number) => {
        const e = resolverMembros(t, { R: braco(corpo, 'R', 0, undefined, a), L: braco(corpo, 'L', 0, undefined, a) }, pesNoChao(O, P.bolaZ));
        return Math.min(...pontosDaCarga(e, 'R').map((p) => p[1]));
      };
      return resolver1((a) => maisBaixo(a) - f('inicio.folgaDoChao'), 0, 45, 24);
    });
  }

  /** Os pontos mais baixos possíveis da carga de um lado: as cabeças do halter (com o raio até o canto) ou a mão e a caneleira. */
  function pontosDaCarga(e: Esq, k: Lado): V3[] {
    if (carga === 'halter') return halterNaMao(e, k, HALTER).prims.flatMap((h) => (h.t === 'prisma' ? [add(h.a, [0, -h.ra, 0]), add(h.b, [0, -h.ra, 0])] : []));
    const c = caneleiraNoAntebraco(e, k, f('caneleira.acimaDoPunho'));
    const mao = pontosDoBoneco(e).filter((x) => (x.parte === 'mao' || x.parte === 'polegar') && dist(x.p, e.lado[k].punho) < 25).map((x) => x.p);
    return [...mao, add(c.centro, [0, -c.raio, 0])];
  }

  function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
    const P = parado(corpo);
    // o embalo: o tronco levanta das coxas em volta do quadril enquanto os braços abrem (a bacia e as pernas ficam)
    const frente = P.frente - (erro === 'tronco' ? f('erro.tronco.sobe') * suave(u) : 0);
    const t = troncoNaPonta(corpo, O, P.y, coluna(frente));
    return resolverMembros(t, { R: braco(corpo, 'R', u, erro), L: braco(corpo, 'L', u, erro) }, pesNoChao(O, P.bolaZ));
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const e = esqueleto(corpo, u, erro);
    const A = assento();
    const cad = cadeira({ x0: 0, zBorda: A.zBorda });
    const q: Quadro = {
      esq: e,
      prims: [chao(-90, 90, -60, 100), ...cad.prims],
      // a cadeira fica atrás do corpo na pintura (sentado nela, o corpo a cobre onde as duas se cruzam na tela)
      pecas: [{ ...cad.peca, cenario: true }, parede({ x0: 0, zBorda: A.zBorda })],
      fios: [],
      cargas: [],
      marcas: { piso: [0, 0, 0], assento: [0, A.altura, A.zBorda] },
      vies: { maoR: 1, maoL: 1 },
    };
    for (const k of ['R', 'L'] as Lado[]) {
      if (carga === 'halter') {
        // o halter pende da mão com o cabo de frente para trás
        const H = halterNaMao(e, k, HALTER);
        q.prims.push(...H.prims);
        q.pecas!.push(H.peca);
        q.cargas.push({ massa: f('carga'), pos: H.centro });
        if (k === 'R') q.marcas.halter = e.lado.R.pegada;
      } else {
        const c = caneleiraNoAntebraco(e, k, f('caneleira.acimaDoPunho'));
        const cn = caneleira(c);
        q.prims.push(...cn.prims);
        q.pecas!.push(cn.peca);
        q.cargas.push({ massa: f('carga'), pos: c.centro });
        q.marcas[`caneleira${k}`] = c.centro;
        q.marcas[`caneleiraRaio${k}`] = [c.raio, 0, 0];
        // meia largura da faixa ao longo do antebraço (a conferência mede a faixa como um cilindro)
        q.marcas[`caneleiraEixo${k}`] = mul(c.eixo, obj('caneleira', 'larg') / 2);
      }
    }
    return q;
  }

  return { quadro, esqueleto, parado, comeco, pontosDaCarga };
}
