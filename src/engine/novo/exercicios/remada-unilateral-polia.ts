// Remada unilateral na polia baixa, em pé, com estribo, no motor novo. Os números vêm da ficha
// (../dados/movimentos/remada-unilateral-polia.json). O corpo parado é o da remada unilateral sem banco
// (./remada-sem-banco.ts: base escalonada com o pé esquerdo à frente, o tronco inclinado com as costas retas, a mão
// esquerda espalmada na coxa da frente). O braço direito puxa o estribo, que vem da polia baixa à frente: o antebraço
// fica na linha do cabo (núcleo ./polia-puxar.ts, `bracoPeloCabo`) e o braço gira de estendido para a polia até o fim
// da remada (o mesmo fim da remada sem banco: 26° além da linha das costas, 14° para fora).
// O que este arquivo resolve, em vez de receber pronto:
//  - a coluna: a roldana na altura mais baixa, a `polia.aFrente` cm à frente do ombro direito;
//  - a pilha: parada (2 cm levantada) com o braço estendido, e sobe o curso do cabo dividido pela relação da máquina.
import ficha from '../dados/movimentos/remada-unilateral-polia.json';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { centroDaRoldana, estribo, saidaDoCabo } from '../pecas';
import type { Peca, Torre } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dirRef, dist, mix, norm, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { bracoPeloCabo, cenaDaPolia, inclinacaoDoPeito } from './polia-puxar';
import type { BaseDaRemada } from './remada';
import { baseSemBanco } from './remada-sem-banco';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

interface Calib {
  b: BaseDaRemada;
  T0: Ref;
  torre: Torre;
  repouso: number;
}
const CAL = new WeakMap<Corpo, Calib>();

/** A direção do braço (do ombro ao cotovelo) no mundo: `atras` graus atrás da vertical, `fora` graus para fora (lado direito). */
function direcaoDoBraco(atras: number, fora: number): V3 {
  const a = atras * rad,
    b = fora * rad;
  return norm([-Math.sin(b), -Math.cos(b) * Math.cos(a), -Math.cos(b) * Math.sin(a)]);
}

/** O tronco de cada quadro: parado, a não ser nos erros "girar" e "arredondar" (os mesmos do núcleo ./remada.ts). */
function troncoDoQuadro(corpo: Corpo, b: BaseDaRemada, u: number, erro?: string): PoseTronco {
  const tr: PoseTronco = { ...b.tronco };
  if (erro === 'gira') {
    const g = f('erro.girar.giro') * u;
    tr.lombarGiro = (tr.lombarGiro ?? 0) - g * f('erro.girar.lombar');
    tr.toracicaGiro = (tr.toracicaGiro ?? 0) - g * (1 - f('erro.girar.lombar'));
  }
  if (erro === 'arred') {
    // a coluna curva para cima e a bacia vira para trás o bastante para o ombro de apoio ficar à mesma distância da mão
    // (a mão livre não sai da coxa)
    const lo = f('erro.arredondar.lombar') * u,
      to = f('erro.arredondar.toracica') * u;
    tr.lombar = (tr.lombar ?? 0) + lo;
    tr.toracica = (tr.toracica ?? 0) + to;
    tr.cervical = (tr.cervical ?? 0) - f('erro.arredondar.cervical') * u;
    const medida = (p: PoseTronco) => {
      const t = resolverTronco(corpo, p);
      return dist(resolverMembros(t, { R: b.apoio!, L: b.apoio! }, b.pernas).lado.L.ombro, b.apoio!.punho!);
    };
    const alvo = medida(b.tronco);
    const f0 = b.tronco.frente ?? 0;
    tr.frente = resolver1((x) => medida({ ...tr, frente: x }) - alvo, f0 - lo - to - 20, f0 + 10, 30);
  }
  return tr;
}

/** O braço direito, o estribo e o ponto em que o cabo prende, num tronco. */
function montar(corpo: Corpo, c: Pick<Calib, 'b' | 'T0' | 'torre'>, t: Tronco, u: number) {
  const { b, T0 } = c;
  const fim0 = direcaoDoBraco(inclinacaoDoPeito(resolverTronco(corpo, b.tronco)) + f('braco.fim.alemDasCostas'), f('braco.fim.fora'));
  // do mundo (pose parada) para o tronco de agora: nos erros que movem o tronco, o fim do braço vai junto
  const local: V3 = [fim0[0] * T0.x[0] + fim0[1] * T0.x[1] + fim0[2] * T0.x[2], fim0[0] * T0.y[0] + fim0[1] * T0.y[1] + fim0[2] * T0.y[2], fim0[0] * T0.z[0] + fim0[1] * T0.z[1] + fim0[2] * T0.z[2]];
  const fim = dirRef(t.torax, local);
  // pegada neutra: o polegar para a frente do antebraço, no plano do braço (a palma virada para o corpo). O antebraço
  // aponta para o ponto em que o cabo sai da roldana (e não para o centro dela): a primeira passada acha esse ponto
  const braco = (alvo: V3) => bracoPeloCabo(corpo, {
    tronco: t,
    pernas: b.pernas,
    outro: b.apoio!,
    roldana: alvo,
    fim,
    fundo: u,
    flexIni: f('cotovelo.inicio'),
    polo: norm(dirRef(t.torax, [-0.3, 0.2, -1])),
    polegar: dirRef(t.torax, [0, 0.6, 1]),
    diam: obj('estribo', 'pegadaDiam'),
    elev: mix(f('escapula.elev.inicio'), f('escapula.elev.fim'), u),
    prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u),
  });
  let e = braco(centroDaRoldana(c.torre));
  for (let i = 0; i < 2; i++) e = braco(saidaDoCabo(c.torre, e.lado.R.pegada));
  const L = e.lado.R;
  const est = estribo(L.pegada, L.mao.x, sub(saidaDoCabo(c.torre, L.pegada), L.pegada));
  return { e, est, pegada: L.pegada, eixo: L.mao.x };
}

function calibrar(corpo: Corpo): Calib {
  let c = CAL.get(corpo);
  if (c) return c;
  const b = baseSemBanco(corpo, f);
  const t = resolverTronco(corpo, b.tronco);
  const T0 = t.torax;
  // o ombro direito na pose parada (com o braço solto): a roldana fica à frente dele, na altura mais baixa
  const ombro = resolverMembros(t, { R: b.apoio!, L: b.apoio! }, b.pernas).lado.R.ombro;
  const torre0: Torre = { base: [0, 0, 0], frente: [0, 0, -1], alturaDaPolia: obj('torre', 'poliaMin') };
  const c0 = centroDaRoldana(torre0);
  const roldana: V3 = [ombro[0] - f('polia.paraFora'), c0[1], ombro[2] + f('polia.aFrente')];
  const torre: Torre = { ...torre0, base: [roldana[0] - c0[0], 0, roldana[2] - c0[2]] };
  const r0 = montar(corpo, { b, T0, torre }, t, 0);
  const repouso = cenaDaPolia(torre, r0.est.elo, 0).comp;
  c = { b, T0, torre, repouso };
  CAL.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const t = resolverTronco(corpo, troncoDoQuadro(corpo, c.b, u, erro));
  // na volta curta, o braço não volta além da metade do caminho
  const uu = erro === 'curta' ? mix(f('erro.curta.fracao'), 1, u) : u;
  const r = montar(corpo, c, t, uu);
  const polia = cenaDaPolia(c.torre, r.est.elo, c.repouso, false, 150);
  return {
    esq: r.e,
    prims: [...c.b.prims, ...polia.prims, ...r.est.prims],
    pecas: [...c.b.pecas, ...polia.pecas, { t: 'estribo', pegada: r.pegada, eixo: r.eixo, elo: r.est.elo }] as Peca[],
    fios: [{ id: 'cabo', comp: polia.comp, estica: true }],
    cargas: [],
    marcas: { ...c.b.marcas, mao: r.pegada, ponta: r.est.elo, elo: r.est.elo, saida: polia.saida, pilha: [0, polia.subida, 0] },
    vies: { maoR: 1 },
  };
}

export const remadaUnilateralPolia: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // costas (dorsal e meio das costas) do lado que puxa; bíceps e ombro de trás ajudam (a ficha e a biblioteca)
  papeis: { 'dorsal:R': 'p', 'trapMedInf:R': 'p', 'deltPost:R': 's', 'biceps:R': 's' },
  trajetorias: { mão: (q) => q.marcas.mao!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
