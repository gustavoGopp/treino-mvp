// Agachamento no smith, no motor novo. Os números vêm da ficha (../dados/movimentos/agachamento-smith.json); a máquina,
// de ../pecas-de-cena/smith.ts (Life Fitness SSM: a guia inclina 7°).
//
// A barra só anda na guia: o quadril se ajusta a ela. Os pés ficam parados no chão, um pouco à frente da linha da
// barra; em cada quadro, a flexão do joelho e a inclinação da bacia são as da ficha, e o lugar do quadril no arco em
// volta do tornozelo sai de uma condição: o centro da barra, apoiada no alto das costas, cai na linha da guia. Com os
// pés à frente, quem agacha senta para trás encostado na barra (a guia a segura para a frente e para trás): o centro de
// massa fica atrás do meio do pé, ainda sobre o calcanhar (a conferência mede).
// No erro "Pés embaixo da barra", não há como encostar nela: o quadril e o tronco saem de duas condições, a barra na
// guia e o centro de massa sobre o meio do pé (como nos agachamentos aprovados, ./agachar.ts); o tronco já sai
// inclinado em pé e, embaixo, o joelho passa da ponta do pé.
//
// A guia sobe 7° para a frente de quem agacha: a barra desce um pouco para trás, para o lado dos calcanhares (a ficha
// da Life Fitness não diz para que lado; ver dados/objetos/smith.json).
import ficha from '../dados/movimentos/agachamento-smith.json';
import { calibragem } from '../calibragens';
import { formaDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1, resolver2 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, comb, mix, mul, noRef, paraRef } from '../vec';
import type { V3 } from '../vec';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { cantosDoSmith, centroDaBarraDoSmith, massaDoSmith, raioDaBarraDoSmith, smith } from '../pecas-de-cena/smith';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const ANILHAS: IdAnilha[] = [(`anilha${f('anilhas')}` as IdAnilha)];
const TAN = Math.tan(obj('smith', 'guiaInclina') * rad);

/**
 * Onde fica a pele das costas na altura da barra, no referencial do tórax (o z, para trás é negativo): o ponto mais
 * de trás dos anéis do tronco, do pescoço e do trapézio na altura `barra.abaixoDeC7`, com o corpo em pé. A forma do
 * tronco no referencial do tórax não muda com a inclinação (só a curva da coluna muda, e ela fica a de repouso).
 */
export function costasNaBarra(corpo: Corpo): number {
  return calibragem(corpo, 'agachamento-smith:costas', () => {
    const t = resolverTronco(corpo, { pelve: [0, 100, 0] });
    const solto = (k: Lado): PoseBraco => ({ umero: [sinal(k) * 0.2, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
    const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * 10, 0, 15], dir: [0, 0, 1] }, polo: [0, 0, 1] });
    const e = resolverMembros(t, { R: solto('R'), L: solto('L') }, { R: perna('R'), L: perna('L') });
    const y = -f('barra.abaixoDeC7');
    // os pontos de cada anel, de 5 em 5 graus; entre dois anéis seguidos, a altura da barra cai por interpolação
    let min = 0;
    for (const g of formaDoBoneco(e).grupos)
      for (const v of g.volumes) {
        if (!['tronco', 'pescoco', 'cintura'].includes(v.nome ?? g.id)) continue;
        const an = v.vol.aneis;
        for (let i = 0; i + 1 < an.length; i++)
          for (let k = 0; k < 72; k++) {
            const th = (k * Math.PI) / 36,
              sn = Math.sin(th);
            const pt = (a: (typeof an)[number]) => paraRef(t.torax, comb([1, a.c], [a.a * Math.cos(th), a.x], [(sn >= 0 ? a.f : a.b) * sn, a.z]));
            const p = pt(an[i]!),
              q = pt(an[i + 1]!);
            if ((p[1] - y) * (q[1] - y) > 0 || p[1] === q[1]) continue;
            const s = (y - p[1]) / (q[1] - p[1]);
            const x = p[0] + (q[0] - p[0]) * s,
              z = p[2] + (q[2] - p[2]) * s;
            if (Math.abs(x) < 20) min = Math.min(min, z);
          }
      }
    return min;
  });
}

/** O centro da barra no referencial do tórax: no alto das costas, encostada na pele. */
const barraNoTorax = (corpo: Corpo): V3 => [0, -f('barra.abaixoDeC7'), costasNaBarra(corpo) - raioDaBarraDoSmith() + f('barra.amassa')];

/** O ponto do chão sob a bola de cada pé e a direção dos dedos (s = −1 direita, +1 esquerda), como em ./agachar.ts. */
function pes(corpo: Corpo) {
  const fora = f('pes.paraFora') * rad;
  const dirPe = (s: number): V3 => [s * Math.sin(fora), 0, Math.cos(fora)];
  const bola = (s: number): V3 => add([s * f('pes.meiaDistancia'), 0, 0], mul(dirPe(s), corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo')));
  // o meio do pé, de frente para trás (o mesmo ponto que a regra do peso no meio do pé mede)
  const meio = bola(1)[2] - (corpo.m('pe.calcanharABola') / 2) * Math.cos(fora);
  return { dirPe, bola, meio };
}

/** Onde a linha da guia (o caminho do centro da barra) encontra o chão, com os pés `aFrente` cm à frente da barra. */
function baseDaGuia(corpo: Corpo, aFrente: number): V3 {
  // a referência é a altura de C7 em pé: lá, a linha da barra fica `aFrente` cm atrás do meio do pé
  const yRef = corpo.m('altura.cervical') - f('barra.abaixoDeC7');
  return [0, 0, pes(corpo).meio - aFrente - yRef * TAN];
}

interface Agachado {
  e: Esq;
  barra: V3;
  massa: number;
}
/** O agachamento com o joelho dobrado `joelho` graus e a barra na guia; o tronco, dado ou pelo equilíbrio. */
function agachadoNoSmith(corpo: Corpo, joelho: number, tronco: number | 'equilibrio', base: V3): Agachado {
  const m = (id: string) => corpo.m(id);
  const P = pes(corpo);
  const fora = f('pes.paraFora') * rad;
  const perna = (k: Lado): PosePerna => {
    const s = sinal(k);
    return { pe: { bola: P.bola(s), dir: P.dirPe(s) }, polo: [s * Math.sin(fora), 0, Math.cos(fora)] };
  };
  const pernas = { R: perna('R'), L: perna('L') };
  const th = m('coxa.comp'),
    sk = m('perna.comp'),
    a = joelho * rad;
  const d = Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos(a));
  const semBracos = { polo: [0, 0, -1] as V3, mao: { polegar: [0, 0, 1] as V3 } };
  const torn = resolverMembros(resolverTronco(corpo, { pelve: [0, 200, 0] }), { R: semBracos, L: semBracos }, pernas).lado.L.tornozelo;
  const plano = Math.sqrt(Math.max(1, d * d - (m('quadril.meiaDistancia') - torn[0]) ** 2));
  const massa = massaDoSmith(ANILHAS);
  const naCostas = barraNoTorax(corpo);
  const w = f('pegada.meia');
  const montar = (alfa: number, tronco: number): Agachado => {
    const pelve: V3 = [0, torn[1] + plano * Math.cos(alfa * rad), torn[2] - plano * Math.sin(alfa * rad)];
    const t = resolverTronco(corpo, { pelve, frente: tronco, cervical: -tronco * 0.25, cabeca: -tronco * 0.2 });
    const barra = noRef(t.torax, naCostas);
    // as mãos fecham na barra, um pouco por fora dos ombros; os cotovelos apontam para baixo e para trás
    const braco = (k: Lado): PoseBraco => {
      const s = sinal(k);
      return { pegada: add(barra, [s * w, 0, 0]), polo: [s * 0.35, -1, -0.45], mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: obj('smith', 'pegadaDiam') } };
    };
    return { e: resolverMembros(t, { R: braco('R'), L: braco('L') }, pernas), barra, massa };
  };
  const foraDaGuia = (r: Agachado) => r.barra[2] - (base[2] + r.barra[1] * TAN);
  if (tronco === 'equilibrio') {
    // sem como encostar na barra (ela fica em cima do meio do pé): o quadril e o tronco saem de duas condições, a barra
    // na linha da guia e o centro de massa sobre o meio do pé
    const [al, tr] = resolver2((x, y) => {
      const r = montar(x, y);
      return [foraDaGuia(r), centroDeMassa(r.e, 'homem', [{ massa, pos: r.barra }])[2] - P.meio];
    }, 10, 10, 30);
    return montar(al, tr);
  }
  // o quadril anda no arco em volta do tornozelo até a barra cair na linha da guia
  const alfa = resolver1((al) => foraDaGuia(montar(al, tronco)), -40, 80);
  return montar(alfa, tronco);
}

/** A altura da barra embaixo, no movimento certo (para pôr as travas logo abaixo dela). */
const barraNoFundo = (corpo: Corpo) => calibragem(corpo, 'agachamento-smith:fundo', () => agachadoNoSmith(corpo, f('joelho.baixo'), f('tronco.baixo'), baseDaGuia(corpo, f('pes.aFrente'))).barra[1]);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const joelho = mix(f('joelho.cima'), erro === 'pouco' ? f('erro.pouco.joelho') : f('joelho.baixo'), u);
  // no erro dos pés, os pés ficam onde estão e a máquina fica mais para a frente: a linha da barra cai no meio do pé
  const base = baseDaGuia(corpo, erro === 'pes' ? f('erro.pes.aFrente') : f('pes.aFrente'));
  const tronco = erro === 'pes' ? 'equilibrio' : mix(f('tronco.cima'), f('tronco.baixo'), u);
  const r = agachadoNoSmith(corpo, joelho, tronco, base);
  const S = smith({
    base,
    sobePara: 1,
    barra: r.barra[1],
    trava: barraNoFundo(corpo) - f('trava.abaixo'),
    // o lado direito (o de perto, de lado e de três quartos) vai para trás do corpo: senão a guia, o carro e a anilha
    // cobririam as costas, a mão e a cabeça
    atras: -1,
    anilhas: ANILHAS,
    // o quadro mostra a máquina inteira de frente para o fundo e de um lado ao outro, cortada um pouco acima da cabeça
    noQuadro: cantosDoSmith({ base, sobePara: 1 }, f('quadro.ate')),
  });
  return {
    esq: r.e,
    prims: [chao(-80, 80, -70, 90), ...S.prims],
    pecas: S.pecas,
    fios: [],
    cargas: [{ massa: r.massa, pos: r.barra }],
    marcas: { barra: r.barra, guia: centroDaBarraDoSmith({ base, sobePara: 1 }, r.barra[1]), trava: [0, barraNoFundo(corpo) - f('trava.abaixo'), 0] },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const agachamentoSmith: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // os da biblioteca, os mesmos dos agachamentos aprovados: quadríceps (principal); glúteos e adutores (secundários)
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { barra: (q) => q.marcas.barra!, quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho },
};
