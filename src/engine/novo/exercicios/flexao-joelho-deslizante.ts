// Flexão de joelho deslizando os pés no chão, no motor novo. Os números vêm da ficha
// (../dados/movimentos/flexao-joelho-deslizante.json); a ponte de costas é a do núcleo ./flexao-joelho.ts.
// Deitado de costas, braços no chão ao lado do corpo; os calcanhares, sobre uma toalha dobrada, deslizam até perto do
// glúteo e voltam, com o quadril fora do chão o tempo todo. A bacia inclina do início (quadril um pouco elevado) ao
// fim (ombros, quadril e joelhos em linha); a coxa sai da conta, para o calcanhar ficar na toalha.
import ficha from '../dados/movimentos/flexao-joelho-deslizante.json';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { alturaDaToalha, toalha } from '../pecas-de-cena/toalha';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { folgaDaPelve, ponteDeCostas } from './flexao-joelho';
import type { OpcoesDaPonte } from './flexao-joelho';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const CACHE = new WeakMap<Corpo, { ini: number; fim: number; caido: number }>();

const opcoes = (frente: number, joelho: number, lombar = 0): OpcoesDaPonte => ({
  frente,
  lombar,
  joelho,
  apoio: alturaDaToalha(),
  zOmbro: f('ombro.z'),
  pe: f('pe.angulo'),
  maoAbaixoDoOmbro: f('maos.abaixoDoOmbro'),
  maoParaFora: f('maos.paraFora'),
});
/** A inclinação da bacia no início (pela folga do glúteo ao chão), no fim (em linha) e no erro do quadril caído. */
function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const ini = resolver1((fr) => folgaDaPelve(corpo, fr, 0) - f('quadril.folgaNoInicio'), -88, -125, 30);
  const fim = resolver1((fr) => ponteDeCostas(corpo, opcoes(fr, f('joelho.fim'))).quadril - f('quadril.fim'), -100, -135, 30);
  const caido = resolver1((fr) => folgaDaPelve(corpo, fr, 0) - f('erro.quadril.folga'), -85, -110, 30);
  c = { ini, fim, caido };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const v = erro === 'curta' ? u * f('erro.curta.fracao') : u;
  // no erro da lombar, as costas ficam como no certo e a bacia gira o que a lombar arqueia: a barriga sobe
  const lombar = erro === 'lombar' ? f('erro.lombar.lombar') * u : 0;
  const frente = (erro === 'quadril' ? mix(c.ini, c.caido, u) : mix(c.ini, c.fim, v)) - lombar * 0.5;
  const p = ponteDeCostas(corpo, opcoes(frente, mix(f('joelho.inicio'), f('joelho.fim'), v), lombar));
  const t = toalha(0, p.calcanhares[2]);
  return {
    esq: p.e,
    prims: [chao(-70, 70, -100, 110), ...t.prims],
    pecas: [t.peca],
    fios: [],
    cargas: [],
    marcas: { calcanhar: p.e.lado.R.calcanhar, apoio: [0, alturaDaToalha(), p.calcanhares[2]] },
  };
}

export const flexaoJoelhoDeslizante: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // posteriores da coxa (principal) e glúteo (secundário), como a biblioteca; a panturrilha fica fora (ficha da técnica)
  papeis: { posteriores: 'p', gluteo: 's' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, quadril: (q) => q.esq.pelve.o },
};
