// Mergulho nas paralelas, no motor novo. Os números vêm da ficha (../dados/movimentos/mergulho.json); o corpo
// sustentado pelas mãos, do núcleo ./pendurado.ts (as mãos abaixo dos ombros, como na elevação de joelhos nas
// paralelas), e as paralelas, de ../pecas-de-cena/paralelas.ts.
//
// Em cima, os braços estendidos (sem travar) e os ombros longe das orelhas; na descida, o cotovelo dobra para trás e o
// tronco inclina um pouco à frente, até o braço ficar quase paralelo ao chão. O fim da descida não é um ângulo de
// cotovelo escolhido: é o cotovelo em que o braço (do ombro ao cotovelo) chega ao ângulo da ficha, com o corpo parado
// (o centro de massa na vertical das mãos). As pernas ficam paradas, dobradas, com os pés para trás.
import { sinal } from '../esqueleto';
import type { Esq, Lado } from '../esqueleto';
import { calibragem } from '../calibragens';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import ficha from '../dados/movimentos/mergulho.json';
import { alturaDasParalelas, eixosDasParalelas, meioVaoDasParalelas, paralelas, raioDasParalelas } from '../pecas-de-cena/paralelas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { norm } from '../vec';
import type { V3 } from '../vec';
import { maosNaBarra, mix, noPrumo, pernasSoltas, trecho } from './pendurado';
import type { Apoio, Forma } from './pendurado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

const apoio = (): Apoio => ({ maos: maosNaBarra(2 * meioVaoDasParalelas(), alturaDasParalelas(), 0), diam: obj('paralelas', 'diam') });

/** Quanto o braço (do ombro ao cotovelo, lado direito) desce abaixo da horizontal, em graus (negativo: o cotovelo acima do ombro). */
export const bracoAbaixoDaHorizontal = (e: Esq) => {
  const L = e.lado.R;
  const d = [L.cotovelo[0] - L.ombro[0], L.cotovelo[1] - L.ombro[1], L.cotovelo[2] - L.ombro[2]];
  return Math.asin(-d[1]! / Math.hypot(...d)) / rad;
};

/** A forma do corpo no ponto u da descida (0 = em cima, 1 = embaixo), certa ou com um erro. */
function forma(u: number, erro?: string): Forma {
  let quadril = f('quadril'),
    joelho = f('joelho'),
    elev = f('escapula.ativa'),
    prot = 0,
    cervical = f('pescoco');
  if (erro === 'e1') {
    // no fundo, o ombro rola para a frente e sobe, e a cabeça vai junto (só no último trecho da descida)
    const w = trecho(u, 0.55, 1);
    elev = mix(f('escapula.ativa'), f('erro.fundo.elev'), w);
    prot = f('erro.fundo.prot') * w;
    cervical = mix(f('pescoco'), f('erro.fundo.pescoco'), w);
  }
  if (erro === 'e2') {
    // o chute: as pernas vão à frente e esticam no meio do caminho
    const chute = Math.sin(Math.PI * u);
    quadril = mix(quadril, f('erro.balanco.quadril'), chute);
    joelho = mix(joelho, f('erro.balanco.joelho'), chute);
  }
  const polo = (k: Lado): V3 => norm([sinal(k) * f('polo.fora'), f('polo.cima'), f('polo.frente')]);
  return {
    frente: mix(f('tronco.cima'), f('tronco.embaixo'), u),
    cervical,
    pernas: pernasSoltas({ quadril, joelho, plantar: f('pe.plantar'), juntas: f('pernas.juntas') }),
    bracos: (k) => ({ polo: polo(k), polegar: [0, 0, 1], elev, prot }),
  };
}

/** O corpo parado (no prumo das mãos) com o cotovelo dobrado `cot` graus, no ponto u da forma. */
const corpoCom = (corpo: Corpo, u: number, cot: number, erro?: string, balanco = 0) => noPrumo(corpo, apoio(), forma(u, erro), { cotovelo: cot, balanco }, false).e;

/** A dobra do cotovelo embaixo: a do corpo em que o braço desce `alvo` graus abaixo da horizontal (o erro muda o alvo). */
function cotoveloEmbaixo(corpo: Corpo, erro?: string): number {
  const alvo = erro === 'e1' ? f('erro.fundo.braco') : erro === 'e3' ? f('erro.curta.braco') : f('braco.embaixo');
  const deErro = erro === 'e1' ? 'e1' : undefined;
  return calibragem(corpo, `mergulho:cotovelo-embaixo:${alvo}:${deErro ?? ''}`, () => resolver1((c) => alvo - bracoAbaixoDaHorizontal(corpoCom(corpo, 1, c, deErro)), 30, 128, 30));
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const a = apoio();
  const embaixo = cotoveloEmbaixo(corpo, erro);
  // o cotovelo vai da dobra de cima à de baixo, sem tranco; a altura do corpo sai dele, com o corpo no prumo
  const balanco = erro === 'e2' ? f('erro.balanco.z') * Math.sin(Math.PI * u) ** 2 : 0;
  const e = corpoCom(corpo, u, mix(f('cotovelo.cima'), embaixo, u), erro, balanco);
  // a estrutura das paralelas no lugar dela na pintura: de lado, o montante da paralela de perto fica na frente das
  // pernas (19 cm mais perto de quem olha), e não atrás delas (a regra mergulho-paralelas-pintadas-no-lugar mede)
  const par = paralelas(0, { estruturaNoLugar: true });
  const eixo = eixosDasParalelas(0);
  return {
    esq: e,
    prims: par.prims,
    pecas: [par.estrutura, par.peca],
    fios: [],
    cargas: [],
    marcas: { 'barra.R': a.maos.R, 'barra.L': a.maos.L, 'eixo.R.a': eixo.R[0], 'eixo.R.b': eixo.R[1], 'eixo.L.a': eixo.L[0], 'eixo.L.b': eixo.L[1], raio: [raioDasParalelas(), 0, 0] },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const mergulho: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // peito e tríceps, principais; a frente do ombro, secundária (a biblioteca e a ficha da técnica; correção 12 de
  // 02/11: mantém os dois principais)
  papeis: { peitoral: 'p', triceps: 'p', deltAnt: 's' },
  trajetorias: { cotovelo: (q) => q.esq.lado.R.cotovelo, ombro: (q) => q.esq.lado.R.ombro },
};
