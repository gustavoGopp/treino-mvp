// Abdominal invertido no chão, no motor novo. Os números vêm da ficha (../dados/movimentos/abdominal-invertido.json).
// Deitado de costas, braços no chão ao lado do corpo com as palmas para baixo, joelhos a ~90° e coxas na vertical. A
// pelve enrola em direção ao peito: a bacia gira para trás e a lombar dobra o mesmo tanto, e o tórax fica deitado; o
// corpo assenta com a parte de cima das costas e a cabeça no chão e os ombros no lugar (`troncoDeCostas`, do núcleo
// das flexões de joelho deitado). O quadril sai do chão sozinho, pela curva da coluna. As pernas andam presas à bacia
// (o quadril e o joelho não mudam de ângulo): os joelhos vêm para perto do peito.
import ficha from '../dados/movimentos/abdominal-invertido.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { dirRef, mix, norm, paraRef } from '../vec';
import type { V3 } from '../vec';
import { bracosNoChao, folgaDaPelve, troncoDeCostas } from './flexao-joelho';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** Direção no plano de lado (y, z), pelo ângulo em graus a partir de +z, girando para +y. */
const noPlano = (a: number): V3 => [0, Math.sin(a * rad), Math.cos(a * rad)];
const anguloNoPlano = (v: V3) => Math.atan2(v[1], v[2]) / rad;

const CACHE = new WeakMap<Corpo, { frente: number; coxa: V3; arqueia: number }>();
/** A bacia da base (o glúteo e as costas no chão) e a direção da coxa (na vertical) no referencial dela. */
function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const L0 = f('lombar.base');
  const frente = resolver1((fr) => folgaDaPelve(corpo, fr, L0), -80, -130, 30);
  const t0 = resolverTronco(corpo, { pelve: [0, 0, 0], frente, lombar: L0 });
  const coxa = paraRef({ ...t0.pelve, o: [0, 0, 0] }, noPlano(90 + f('coxa.vertical')));
  // no erro da lombar, a bacia que deixa o glúteo no chão com a lombar arqueada
  const arqueia = resolver1((fr) => folgaDaPelve(corpo, fr, L0 + f('erro.lombar.lombar')), -70, -130, 30);
  c = { frente, coxa, arqueia };
  CACHE.set(corpo, c);
  return c;
}

const alcance = (corpo: Corpo, k: number) => k * (corpo.m('braco.comp') + corpo.m('antebraco.comp'));

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const L0 = f('lombar.base');
  let enrola = f('pelve.enrola') * u,
    quadril = 0,
    arco = 0,
    frente0 = c.frente;
  if (erro === 'embalo') {
    enrola *= mix(1, f('erro.embalo.pelve'), u);
    quadril = f('erro.embalo.quadril') * u;
  }
  if (erro === 'lombar') {
    // embaixo (u = 0) as coxas passam da vertical e a lombar arqueia; o erro some ao subir
    const w = 1 - u;
    arco = f('erro.lombar.lombar') * w;
    quadril = -f('erro.lombar.quadril') * w;
    frente0 = mix(c.frente, c.arqueia, w);
  }
  // a pelve enrola: a bacia gira para trás e a lombar dobra o mesmo tanto (o tórax fica deitado)
  const { t } = troncoDeCostas(corpo, frente0 - enrola, L0 + enrola + arco, f('ombro.z'));
  // as pernas presas à bacia: a coxa na direção da base, girada `quadril` graus para a cabeça
  const aCoxa = anguloNoPlano(norm(dirRef(t.pelve, c.coxa))) + quadril,
    aCanela = aCoxa - f('joelho');
  const perna: PosePerna = { coxa: noPlano(aCoxa), canela: noPlano(aCanela), peDir: noPlano(aCanela + 90 - f('pe.plantar')), polo: noPlano(aCoxa + 90) };
  let bracos = bracosNoChao(corpo, f('ombro.z'), alcance(corpo, f('maos.alcance')), f('maos.paraFora'));
  if (erro === 'maos') {
    // as mãos apertam o chão perto do quadril, com os cotovelos dobrados e para cima: o braço armado para empurrar
    const braco = (k: Lado): PoseBraco => ({ ...bracos[k], punho: [sinal(k) * (corpo.m('ombro.meiaDistancia') + f('maos.paraFora')), corpo.m('raio.punho') * 0.85, f('ombro.z') + alcance(corpo, f('erro.maos.alcance'))], polo: [sinal(k) * 0.3, 1, 0] });
    bracos = { R: braco('R'), L: braco('L') };
  }
  const e = resolverMembros(t, bracos, { R: perna, L: perna });
  return { esq: e, prims: [chao(-70, 70, -100, 90)], pecas: [], fios: [], cargas: [], marcas: {} };
}

export const abdominalInvertido: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // só o abdômen, principal; os flexores do quadril não são músculo do app (ficha da técnica)
  papeis: { abdomen: 'p' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho },
};
