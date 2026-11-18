// Levantamento terra romeno com barra, no motor novo. Os números vêm da ficha (../dados/movimentos/terra-romeno-barra.json).
// A ficha da técnica diz que ele segue o stiff com halteres: o corpo é o do núcleo dos stiffs (./dobrar-o-quadril.ts),
// com o quadril para trás, os joelhos um pouco dobrados e o centro de massa (corpo + barra) sobre o meio do pé. O que
// muda é o que as mãos seguram: a barra longa com anilhas (../pecas-de-cena/barra-longa.ts), rígida, com as duas mãos na
// largura dos ombros, por fora das coxas, em pegada pronada. O braço gira no ombro até a pegada da barra ficar à folga
// pedida da pele das coxas e das canelas (a barra desliza rente às pernas), como a carga no stiff aprovado.
import ficha from '../dados/movimentos/terra-romeno-barra.json';
import { calibragem } from '../calibragens';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { barraLonga, massaDaBarra, raioDaPegada } from '../pecas-de-cena/barra-longa';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import type { Corpo } from '../tabelas';
import { dirRef, mix, norm } from '../vec';
import type { V3 } from '../vec';
import { alcanceDoBraco, anguloDoBraco, bracoAte, dobrarOQuadril, maoNoAngulo, pegadaRente } from './dobrar-o-quadril';
import type { Dobrado, Esfera } from './dobrar-o-quadril';
import { PERNAS, folgaDaBarraNaPele } from './com-barra-longa';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
/** As anilhas de cada lado: a ficha dá o peso (kg por lado). */
const ANILHAS: IdAnilha[] = f('anilhas') === 20 ? ['anilha20'] : f('anilhas') === 10 ? ['anilha10'] : ['anilha5'];
const MASSA = massaDaBarra(ANILHAS);

/** A barra entre as duas mãos (é o trecho que passa na frente das pernas), como esferas de 2 em 2 cm. */
const esferasDaBarra = (pegada: V3): Esfera[] => {
  const x = Math.abs(pegada[0]);
  const out: Esfera[] = [];
  for (let i = 0; i <= 22; i++) out.push({ c: [mix(-x, x, i / 22), pegada[1], pegada[2]], r: raioDaPegada() });
  return out;
};

interface Pedido {
  joelho: number;
  tronco: number;
  lombar: number;
  toracica: number;
  folga: number;
  braco?: number;
  /** O ângulo do quadril para trás (graus), quando dado em vez de sair do equilíbrio (ver `perfil`). */
  alfa?: number;
}
function pose(corpo: Corpo, o: Pedido): Dobrado {
  const alcance = alcanceDoBraco(corpo, f('cotovelo'));
  return dobrarOQuadril(corpo, {
    joelho: o.joelho,
    tronco: o.tronco,
    lombar: o.lombar,
    toracica: o.toracica,
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    pesMeiaDistancia: f('pes.meiaDistancia'),
    apoio: 'dois',
    ...(o.alfa !== undefined ? { alfa: o.alfa } : {}),
    bracos(e) {
      const x = f('maos.meiaDistancia');
      const pR = o.braco !== undefined ? maoNoAngulo(e, 'R', -x, alcance, o.braco) : pegadaRente(e, 'R', -x, alcance, esferasDaBarra, o.folga);
      // a barra é rígida: a mão esquerda espelha a direita (mesma altura, mesma distância à frente)
      const pL: V3 = [-pR[0], pR[1], pR[2]];
      const braco = (k: Lado, p: V3): PoseBraco => {
        // os cotovelos apontam para trás e para fora; pegada pronada: a palma para as pernas, o polegar por dentro
        const polo = norm(dirRef(e.torax, [sinal(k) * f('cotovelo.paraFora'), 0, -1]));
        return { ...bracoAte(e, k, p, polo), polo, mao: { polegar: [-sinal(k), 0, 0], forma: 'pegada', diam: 2 * raioDaPegada() } };
      };
      return { R: braco('R', pR), L: braco('L', pL), cargas: [{ massa: MASSA, pos: [0, pR[1], pR[2]] }] };
    },
  });
}

const TRONCOS = new Map<string, { corpo: Corpo; v: number }>();
/**
 * A inclinação do tronco embaixo: a que leva a barra à altura que a ficha dá (o meio da canela), com a barra à folga
 * pedida das pernas. No erro da barra longe das pernas, a barra desce à mesma altura do certo e é o tronco que inclina
 * menos (com o mesmo tronco, a barra longe desceria 12 cm mais e as anilhas chegariam perto do chão).
 */
function troncoEmbaixo(corpo: Corpo, folga: number): number {
  const chave = `${folga}`;
  const ja = TRONCOS.get(chave);
  if (ja?.corpo === corpo) return ja.v;
  const alvo = corpo.m('altura.maleolo') + f('maos.embaixo') * (corpo.m('altura.joelho') - corpo.m('altura.maleolo'));
  const v = calibragem(corpo, `${F.id}:tronco-embaixo:${folga}`, () =>
    resolver1((x) => {
      const p: Pedido = { joelho: f('joelho.baixo'), tronco: x, lombar: 0, toracica: 0, folga };
      return pose(corpo, { ...p, braco: bracoRente(corpo, p) }).e.lado.R.pegada[1] - alvo;
    }, 40, 100, 16),
  );
  TRONCOS.set(chave, { corpo, v });
  return v;
}
/** O pedido de cada instante (sem o ângulo do braço). Os erros são os do stiff aprovado. */
function pedido(corpo: Corpo, u: number, erro?: string): Pedido {
  const baixo = troncoEmbaixo(corpo, f('barra.folga'));
  const arred = erro === 'e1',
    agach = erro === 'e2';
  const lombar = arred ? f('erro.arred.lombar') * u : 0;
  return {
    joelho: mix(f('joelho.cima'), f(agach ? 'erro.agachar.joelho' : 'joelho.baixo'), u),
    // na lombar arredondada, a bacia para de inclinar antes e quem dobra é a lombar (e um pouco a torácica)
    tronco: mix(f('tronco.cima'), agach ? f('erro.agachar.tronco') : arred ? baixo - f('erro.arred.bacia') : erro === 'e3' ? troncoEmbaixo(corpo, f('erro.longe.folga')) : baixo, u) + lombar,
    lombar,
    toracica: arred ? f('erro.arred.toracica') * u : 0,
    folga: erro === 'e3' ? mix(f('barra.folga'), f('erro.longe.folga'), u) : f('barra.folga'),
  };
}
/**
 * O ângulo do braço que deixa a barra à folga pedida da pele desenhada das coxas e das canelas. Parte do ângulo que o
 * núcleo dos stiffs acha com o tubo oval dele (mais grosso que a coxa desenhada: a barra fica 3 a 4 cm longe) e leva o
 * braço para trás, de meio em meio grau, até a barra passar da folga; daí acha o ponto exato entre os dois últimos. A
 * pele só é medida por fora, por isso a busca anda em passos curtos a partir de fora, e nunca de dentro da perna.
 */
function bracoRente(corpo: Corpo, p: Pedido): number {
  const folga = (b: number) => {
    const e = pose(corpo, { ...p, braco: b }).e;
    return folgaDaBarraNaPele(e, e.lado.R.pegada, e.lado.L.pegada, PERNAS) - p.folga;
  };
  let fora = anguloDoBraco(pose(corpo, p).e, 'R');
  // se o tubo já deixou a barra perto demais da pele desenhada, o braço vai para a frente primeiro
  while (folga(fora) < 0) fora += 1;
  for (let i = 0; i < 60; i++) {
    const dentro = fora - 0.5;
    if (folga(dentro) < 0) return resolver1(folga, dentro, fora, 12);
    fora = dentro;
  }
  return fora;
}
/**
 * O ângulo do braço e o do quadril para trás ao longo da descida, em 49 pontos. Rente às pernas, a barra passa na frente
 * do joelho e volta para a canela; o braço segue esse contorno (`bracoRente`) e é alisado como no stiff aprovado
 * (primeiro o maior dos vizinhos, para a barra não entrar na perna, depois a média com os vizinhos, aqui 24 vezes, com as
 * pontas paradas): com a barra de 30 kg, o equilíbrio leva o quadril junto com ela, e um contorno pouco alisado fazia o
 * joelho tremer. O quadril para trás (`alfa`) é o do equilíbrio, em cada ponto, com o braço já alisado; os dois são
 * guardados para o corpo do app (../calibragens.ts).
 */
const N = 48;
const PASSES = 24;
interface Perfil {
  b: number[];
  alfa: number[];
}
const PERFIS = new Map<string, { corpo: Corpo; p: Perfil }>();
function perfil(corpo: Corpo, erro?: string): Perfil {
  const ja = PERFIS.get(erro ?? '');
  if (ja?.corpo === corpo) return ja.p;
  const p = calibragem(corpo, `${F.id}:perfil:${erro ?? ''}`, (): Perfil => {
    const viz = (v: number[], i: number) => v[Math.max(0, Math.min(N, i))]!;
    // as pontas ficam onde estão: em cima e embaixo a barra para (o ritmo chega a zero) e encosta na perna
    const media = (v: number[]) => v.map((x, i) => (i === 0 || i === N ? x : (viz(v, i - 1) + 2 * viz(v, i) + viz(v, i + 1)) / 4));
    const peds = Array.from({ length: N + 1 }, (_, i) => pedido(corpo, i / N, erro));
    const cru = peds.map((ped) => bracoRente(corpo, ped));
    let b: number[] = cru.map((_, i) => Math.max(viz(cru, i - 1), viz(cru, i), viz(cru, i + 1)));
    for (let k = 0; k < PASSES; k++) b = media(b);
    const alfa = peds.map((ped, i) => pose(corpo, { ...ped, braco: b[i]! }).alfa);
    return { b, alfa };
  });
  PERFIS.set(erro ?? '', { corpo, p });
  return p;
}
/** Catmull-Rom pelos pontos do perfil. */
function noPerfil(b: number[], u: number): number {
  const x = Math.max(0, Math.min(1, u)) * N,
    i = Math.min(N - 1, Math.floor(x)),
    t = x - i;
  const p = (j: number) => b[Math.max(0, Math.min(N, j))]!;
  const p0 = p(i - 1),
    p1 = p(i),
    p2 = p(i + 1),
    p3 = p(i + 2);
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const P = perfil(corpo, erro);
  const r = pose(corpo, { ...pedido(corpo, u, erro), braco: noPerfil(P.b, u), alfa: noPerfil(P.alfa, u) });
  const e = r.e;
  // a barra passa pelo centro das duas pegadas, na horizontal, de um lado ao outro
  const centro: V3 = [0, e.lado.R.pegada[1], e.lado.R.pegada[2]];
  const B = barraLonga({ centro, eixo: [1, 0, 0], anilhas: ANILHAS });
  return {
    esq: e,
    prims: [chao(-70, 70, -110, 90), ...B.prims],
    pecas: [B.peca],
    fios: [],
    cargas: r.cargas,
    marcas: { barra: centro, pegaR: e.lado.R.pegada, pegaL: e.lado.L.pegada },
  };
}

export const terraRomenoBarra: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // posteriores da coxa (principal) e glúteos (secundário): é o que a biblioteca conta, como no stiff aprovado. O desenho
  // não tem os eretores da coluna.
  papeis: { posteriores: 'p', gluteo: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, barra: (q) => q.marcas.barra! },
};
