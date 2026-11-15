// Flexão de joelho na fita de suspensão, no motor novo. Os números vêm da ficha
// (../dados/movimentos/flexao-joelho-suspensao.json); a ponte de costas é a do núcleo ./flexao-joelho.ts, a fita é a
// peça ../pecas-de-cena/suspensao.ts. Deitado de costas, ombros num colchonete, braços no chão; os calcanhares nos
// berços da fita, presa no alto sobre os pés. O quadril fica fora do chão; os calcanhares vêm para perto do glúteo
// e voltam. A fita não estica: o fundo de cada berço fica sempre à mesma distância (pelo caminho da fita) da âncora,
// e os calcanhares andam num arco em volta dela.
import ficha from '../dados/movimentos/flexao-joelho-suspensao.json';
import type { Esq } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, colchonete } from '../pecas';
import type { Peca } from '../pecas';
import { comprimentoDaFita, fitaDeSuspensao } from '../pecas-de-cena/suspensao';
import type { FitaDeSuspensao } from '../pecas-de-cena/suspensao';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dot, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { folgaDaPelve, peMaisLongeDe, ponteDeCostas } from './flexao-joelho';
import type { OpcoesDaPonte } from './flexao-joelho';
import { faltaParaALinha } from './ponte';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

interface Fita {
  ancora: V3;
  /** O comprimento da fita, da âncora ao fundo de cada berço (cm). */
  comp: number;
  /** Quanto o fundo do berço fica atrás do centro do calcanhar (o "raio" do calcanhar, cm). */
  raio: number;
  ini: number;
  fim: number;
  caido: number;
}
const CACHE = new WeakMap<Corpo, Fita>();

const piso = () => obj('colchonete', 'esp');
const opcoes = (corpo: Corpo, frente: number, joelho: number, lombar: number, alvoDoPe?: (e: Esq) => number): OpcoesDaPonte => ({
  frente,
  lombar,
  joelho,
  apoio: f('fita.alcaDoChao'),
  zOmbro: f('ombro.z'),
  pe: f('pe.angulo'),
  maoAbaixoDoOmbro: f('maos.alcance') * (corpo.m('braco.comp') + corpo.m('antebraco.comp')),
  maoParaFora: f('maos.paraFora'),
  piso: piso(),
  alvoDoPe,
});
/** O fundo do berço de cada pé: o calcanhar empurrado, para longe do ponto onde a fita se divide, pelo raio do calcanhar. */
function berco(e: Esq, k: 'R' | 'L', divide: V3, raio: number): V3 {
  const c = e.lado[k].calcanhar;
  return add(c, mul(norm(sub(c, divide)), raio));
}
const fitaCom = (ancora: V3, e: Esq, raio: number): FitaDeSuspensao => {
  // o ponto onde a fita se divide fica na reta da âncora ao meio dos dois calcanhares (a fita é simétrica)
  const meio = mul(add(e.lado.R.calcanhar, e.lado.L.calcanhar), 0.5);
  const divide = add(ancora, mul(norm(sub(meio, ancora)), f('fita.tronco')));
  return { ancora, tronco: f('fita.tronco'), pegadores: (['R', 'L'] as const).map((k) => ({ tipo: 'pe' as const, ponto: berco(e, k, divide, raio), lado: [1, 0, 0] as V3 })) };
};

/**
 * A fita: pendurada, sem a pessoa, o fundo do berço fica à altura da ficha (um palmo e meio do chão). No início, a
 * fita fica a prumo (os pés embaixo da âncora) com o calcanhar nessa altura: é dali que sai onde fica a âncora, em z.
 */
function calibrar(corpo: Corpo): Fita {
  let c = CACHE.get(corpo);
  if (c) return c;
  const ini = resolver1((fr) => folgaDaPelve(corpo, fr, 0) - f('quadril.folgaNoInicio'), -88, -125, 30);
  // no início, o ponto mais baixo do pé na altura da alça pendurada
  const p0 = ponteDeCostas(corpo, opcoes(corpo, ini, f('joelho.inicio'), 0));
  const e0 = p0.e;
  // o comprimento da fita sai dela pendurada a prumo, com o fundo do berço na altura da ficha; a âncora fica, em z,
  // sobre os pés (um pouco para o lado da cabeça, o que a ficha diz: o arco dos calcanhares fica mais raso)
  const prumo: V3 = [0, obj('suspensao', 'ancoraAltura'), e0.lado.R.calcanhar[2]];
  const ancora: V3 = [0, prumo[1], prumo[2] - f('fita.ancoraParaACabeca')];
  /** O "raio" do calcanhar na direção da fita: do centro do calcanhar ao ponto do pé mais longe de onde a fita se divide. */
  const raioEm = (e: Esq, divide: V3) => {
    const cR = e.lado.R.calcanhar;
    const fundo = peMaisLongeDe(corpo, e, [cR[0], divide[1], divide[2]]);
    return Math.max(0, dot(sub(fundo, cR), norm(sub(cR, [cR[0], divide[1], divide[2]]))));
  };
  const montar = (raio: number) => {
    const comp = comprimentoDaFita(fitaCom(prumo, e0, raio))[0]!;
    const pose = (fr: number, joelho: number, lombar = 0) => ponteDeCostas(corpo, opcoes(corpo, fr, joelho, lombar, (e) => comp - comprimentoDaFita(fitaCom(ancora, e, raio))[0]!));
    // em linha medido nos centros do ombro, do quadril e do joelho (o `quadril` da ponte mede contra o ombro antes de
    // o corpo andar em z, e aqui o corpo anda muito)
    const fim = resolver1((fr) => faltaParaALinha(pose(fr, f('joelho.fim')).e) - f('quadril.fim'), -100, -155, 26);
    return { comp, fim, pose };
  };
  // o calcanhar é redondo e gira no berço: o raio é o meio do que ele mede em cinco pontos do caminho (o pé fica a
  // menos de 1 cm do fundo do berço, para dentro ou para fora, em todo o ciclo)
  const r0 = raioEm(e0, add(prumo, [0, -f('fita.tronco'), 0]));
  const m0 = montar(r0);
  const rs = [0, 0.25, 0.5, 0.75, 1].map((u) => {
    const e = m0.pose(mix(ini, m0.fim, u), mix(f('joelho.inicio'), f('joelho.fim'), u)).e;
    const meio = mul(add(e.lado.R.calcanhar, e.lado.L.calcanhar), 0.5);
    return raioEm(e, add(ancora, mul(norm(sub(meio, ancora)), f('fita.tronco'))));
  });
  const raio = (Math.min(...rs) + Math.max(...rs)) / 2;
  const { comp, fim } = montar(raio);
  const sem: Omit<Fita, 'fim' | 'caido'> = { ancora, comp, raio, ini };
  const caido = resolver1((fr) => folgaDaPelve(corpo, fr, 0) - f('erro.quadril.folga'), -85, -110, 30);
  c = { ...sem, fim, caido };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const v = erro === 'curta' ? u * f('erro.curta.fracao') : u;
  // no erro da lombar, as costas ficam como no certo e a bacia gira o que a lombar arqueia: a barriga sobe
  const lombar = erro === 'lombar' ? f('erro.lombar.lombar') * u : 0;
  const frente = (erro === 'quadril' ? mix(c.ini, c.caido, u) : mix(c.ini, c.fim, v)) - lombar * 0.5;
  // no erro do quadril, ele cai e os joelhos dobram menos (com o quadril no chão e os calcanhares presos no alto, não dá para
  // dobrar tanto)
  const joelhoFim = erro === 'quadril' ? f('erro.quadril.joelho') : f('joelho.fim');
  const p = ponteDeCostas(corpo, opcoes(corpo, frente, mix(f('joelho.inicio'), joelhoFim, v), lombar, (e) => c.comp - comprimentoDaFita(fitaCom(c.ancora, e, c.raio))[0]!));
  const S = fitaDeSuspensao(fitaCom(c.ancora, p.e, c.raio));
  // a fita é cenário: a âncora fica a 1,8 m do chão e, no quadro, encolheria o corpo deitado; o quadro a corta em cima
  S.peca.cenario = true;
  const zCol = f('colchonete.z');
  const pecas: Peca[] = [{ t: 'colchonete', x0: 0, z0: zCol }, S.peca];
  const pts = fitaCom(c.ancora, p.e, c.raio).pegadores;
  return {
    esq: p.e,
    prims: [chao(-70, 70, -150, 110), ...colchonete(0, zCol), ...S.prims],
    pecas,
    fios: [{ id: 'fita', comp: S.comp[0]!, estica: false }],
    cargas: [],
    marcas: { bercoR: pts[0]!.ponto, bercoL: pts[1]!.ponto, ancora: c.ancora, piso: [0, piso(), zCol] },
  };
}

export const flexaoJoelhoSuspensao: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // posteriores da coxa (principal) e glúteo (secundário), como a biblioteca conta para a flexão na bola
  papeis: { posteriores: 'p', gluteo: 's' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, quadril: (q) => q.esq.pelve.o },
};
