// Peça de cena: a caneleira de peso presa no tornozelo (medidas em ../dados/objetos/caneleira.json). Parte do cartão de
// hoje (scripts/desenhos-equipamento/realista/itens.mjs, `caneleiras`): uma faixa acolchoada cinza-grafite com os
// bolsos de peso costurados e a ponta de velcro na cor de ação. Aqui ela está fechada em volta da canela, logo acima
// dos maléolos, e acompanha a canela: é um anel acolchoado (um cilindro curto, da largura da faixa, com a espessura
// dela por fora da pele) e a tira de velcro que a fecha, na cor de ação, dando a volta no meio dela. As costuras dos
// bolsos ficaram de fora: vistas de lado, saíam do contorno da faixa.
//
// A faixa envolve a perna: tudo o que se vê dela fica por cima da canela. Por isso as peças do desenho vão para a frente
// da perna na pintura (a profundidade de cada uma é a do ponto da faixa mais perto de quem olha).
import { pontosDoBoneco } from '../boneco';
import type { Prim } from '../desenho';
import type { Esq, Lado } from '../esqueleto';
import type { PecaPropria } from '../pecas';
import type { Material } from '../realista/base.mjs';
import { mix } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, dist, dot, mul, norm, sub } from '../vec';
import type { Ref, V3 } from '../vec';

const g = (id: string) => obj('caneleira', id);
/** O grafite da faixa (quatro tons: traço, sombra, meio, luz), como no cartão de hoje; clareado no tema escuro. */
const GRAFITE: Material = ['#121417', '#25282D', '#3E434A', '#686E77'];
/** A cor de ação do cartão (o velcro). */
const ACAO: Material = ['#16124A', '#211D66', '#3F3AA8', '#7E7ADB'];
const doTema = (m: Material, tema: 'claro' | 'escuro'): Material => (tema === 'claro' ? m : m.map((t) => mix(t, '#aeb8c2', 0.3)));

export interface Caneleira {
  /** O centro da faixa, o eixo da canela (para o joelho) e o lado de fora da perna. */
  centro: V3;
  eixo: V3;
  fora: V3;
  /** Raio por fora da faixa. */
  raio: number;
}

/**
 * A caneleira em volta da canela: `canela` é o referencial da canela (y sobe para o joelho), `tornozelo` o centro do
 * tornozelo, `raioPerna` o raio da canela na altura da faixa e `fora` o lado de fora da perna (onde fica o velcro).
 */
export function posicaoDaCaneleira(canela: Ref, tornozelo: V3, raioPerna: number, fora: V3): Caneleira {
  const eixo = norm(canela.y);
  const centro = add(tornozelo, mul(eixo, g('acimaDoTornozelo') + g('larg') / 2));
  return { centro, eixo, fora: norm(fora), raio: raioPerna + g('esp') };
}

/**
 * A caneleira na perna `k` de um esqueleto, medida na superfície do Boneco: o raio da canela é o maior afastamento da
 * pele ao eixo da canela na altura da faixa. `fora` é o lado de fora da perna.
 */
export function caneleiraNaPerna(e: Esq, k: Lado, fora: V3): Caneleira {
  const X = e.lado[k];
  const p0 = posicaoDaCaneleira(X.canela, X.tornozelo, 0, fora);
  const L = g('larg') / 2;
  let r = 0;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'canela' || dist(p, X.tornozelo) > 25) continue;
    const v = sub(p, p0.centro);
    const t = dot(v, p0.eixo);
    if (Math.abs(t) > L) continue;
    const radial = Math.hypot(...sub(v, mul(p0.eixo, t)));
    if (radial < 12) r = Math.max(r, radial);
  }
  return { ...p0, raio: r + g('esp') };
}

export function caneleira(c: Caneleira): { prims: Prim[]; peca: PecaPropria } {
  const L = g('larg') / 2;
  const a = add(c.centro, mul(c.eixo, -L)),
    b = add(c.centro, mul(c.eixo, L));
  return {
    prims: [],
    peca: {
      t: 'propria',
      nome: 'caneleira',
      desenhar(C, _M, o) {
        const n0 = C.itens.length;
        const cinza = doTema(GRAFITE, o.tema),
          acao = doTema(ACAO, o.tema);
        C.cilindro(a, b, c.raio, cinza, { lados: 20 });
        // a tira de velcro que fecha a faixa, na cor de ação, dando a volta por cima dela no meio
        const v = g('velcroLarg') / 2;
        C.cilindro(add(c.centro, mul(c.eixo, -v)), add(c.centro, mul(c.eixo, v)), c.raio + 0.25, acao, { lados: 20 });
        // a faixa envolve a perna: por cima dela na pintura
        for (let i = n0; i < C.itens.length; i++) C.itens[i]!.z -= 40;
      },
    },
  };
}
