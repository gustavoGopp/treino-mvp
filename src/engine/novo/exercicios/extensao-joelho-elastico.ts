// Extensão de joelho sentado com elástico, no motor novo. Os números vêm da ficha
// (../dados/movimentos/extensao-joelho-elastico.json). Sentado na ponta de um banco reto (o cartão aceita "uma cadeira
// firme, sem rodinhas, ou um banco"), costas retas, as mãos segurando as laterais do assento; o pé esquerdo no chão e a
// perna direita trabalhando. Um pegador do tubo com pegadores fica atravessado na frente do tornozelo direito (a "alça
// no tornozelo" do cartão, como na flexão de joelho com elástico), e o tubo sai de trás do tornozelo, passa debaixo do
// banco e vai até a alça de uma âncora de porta, no vão do lado da dobradiça, perto do chão, atrás do banco (o "ponto
// baixo e firme atrás" do cartão), onde o outro pegador fica preso. A coxa fica parada no assento e só a canela sobe,
// do joelho bem dobrado (o pé fora do chão) até quase estender. A porta fica longe o bastante para o tubo já estar um
// pouco esticado com o joelho dobrado. A porta, a âncora e o trecho do tubo perto delas são cenário.
// O que este arquivo resolve, em vez de receber pronto:
//  - a altura da pelve: a parte de baixo do glúteo e da coxa apoia no tampo do banco (amassando o estofado);
//  - onde fica o pé esquerdo: à distância em que o joelho esquerdo dobra o que a ficha pede;
//  - o joelho embaixo: o mais dobrado em que o pé direito ainda fica à folga pedida do chão;
//  - onde fica a porta: à distância em que o tubo estica o que a ficha pede embaixo.
import ficha from '../dados/movimentos/extensao-joelho-elastico.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { bancoReto, chao } from '../pecas';
import type { Peca, PecaPropria } from '../pecas';
import { portaComAncoraNoAlto } from '../pecas-de-cena/elastico-ancora-no-alto';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import { pegadorNoTornozelo } from '../pecas-de-cena/pegador-no-tornozelo';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const ALTO = obj('bancoReto', 'altura');

interface Pose {
  /** Flexão do joelho direito (graus; 0 = estendido). */
  joelho: number;
  /** A coxa direita sobe do assento (graus; só no erro "quadril"). */
  coxaSobe: number;
  /** O tronco vai para trás (graus de bacia; só nos erros). */
  tras: number;
  lombar: number;
}
interface Cal {
  pelveY: number;
  bolaZ: number;
  joelhoBaixo: number;
  zPorta: number;
}
const CAL = new WeakMap<Corpo, Cal>();
/** O x da perna direita (a linha do tubo e da âncora). */
const xPerna = () => sinal('R') * f('pes.meiaDistancia');
/** O banco: a ponta da frente fica `banco.frenteDoQuadril` cm à frente do quadril; o banco vai para trás. */
const zBanco = () => f('banco.frenteDoQuadril') - obj('bancoReto', 'comp') / 2;

function montar(corpo: Corpo, pelveY: number, bolaZ: number, p: Pose): Esq {
  const t = resolverTronco(corpo, { pelve: [0, pelveY, 0], frente: -p.tras, lombar: p.lombar, cervical: f('cervical'), cabeca: f('cabeca') });
  const a = (f('coxa.desce') - p.coxaSobe) * rad,
    k = p.joelho * rad;
  const coxa: V3 = [0, -Math.sin(a), Math.cos(a)];
  // a canela dobra para baixo a partir da coxa, no plano de lado
  const canela: V3 = [0, -Math.sin(a + k), Math.cos(a + k)];
  // o pé quase em ângulo reto com a canela, a ponta um pouco para baixo
  const pk = (90 - f('tornozelo.flexaoPlantar')) * rad;
  const peDir: V3 = [0, -Math.sin(a + k - pk), Math.cos(a + k - pk)];
  const R: PosePerna = { coxa, canela, peDir: norm(peDir), polo: [0, 0.3, 1] };
  const L: PosePerna = { pe: { bola: [sinal('L') * f('pes.meiaDistancia'), 0, bolaZ], dir: [0.1, 0, 1], calc: 0 }, polo: [0.1, 0.3, 1] };
  // as mãos seguram as laterais do assento, ao lado do quadril
  const mao = (s: number): PoseBraco => ({
    pegada: [s * (obj('bancoReto', 'larg') / 2 + f('maos.foraDaBorda')), ALTO - f('maos.abaixoDoTampo'), f('maos.aFrente')],
    polo: [s * 0.4, 0, -1],
    mao: { polegar: [0, 0, 1], dedos: [-s * 0.3, -1, 0], forma: 'pegada', diam: f('maos.diam') },
  });
  return resolverMembros(t, { R: mao(-1), L: mao(1) }, { R, L });
}

const base = (joelho: number): Pose => ({ joelho, coxaSobe: 0, tras: 0, lombar: 0 });

/** O pegador fica na frente do tornozelo; a ponta do tubo, atrás dele, logo acima do calcanhar. */
function ponta(corpo: Corpo, e: Esq): V3 {
  const L = e.lado.R;
  return add(add(L.tornozelo, mul(L.canela.y, f('elastico.acimaDoTornozelo'))), mul(L.canela.z, -(corpo.m('raio.tornozelo') + obj('elastico', 'fita') * 0.35)));
}
const portaEm = (z: number) => portaComAncoraNoAlto(z, f('ancora.altura'), false, xPerna(), true);
/** O tubo: da ponta atrás do tornozelo, reto, até a alça (onde o outro pegador fica preso). */
function tubo(corpo: Corpo, e: Esq, alca: V3) {
  // o outro pegador fica preso na alça: o tubo acaba a uma fita e meio pegador da ponta da alça
  const p = ponta(corpo, e);
  const fim = add(alca, mul(norm(sub(p, alca)), obj('elastico', 'fita') + obj('elastico', 'pegadorDiam') / 2));
  return { pts: [p, fim], comp: dist(p, fim), ponta: p, fim };
}

function calibrar(corpo: Corpo): Cal {
  let c = CAL.get(corpo);
  if (c) return c;
  let pelveY = 52,
    bolaZ = 40;
  const k0 = 80;
  for (let i = 0; i < 4; i++) {
    const y0 = pelveY;
    bolaZ = resolver1((z) => montar(corpo, y0, z, base(k0)).lado.L.ang.joelho - f('joelho.esquerdo'), 10, 80, 30);
    const e = montar(corpo, pelveY, bolaZ, base(k0));
    // o ponto mais baixo do glúteo e da coxa sobre o banco (entre o quadril e a ponta do banco)
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'pelve' || parte === 'coxa') && Math.abs(p[0]) < 16 && p[2] < f('banco.frenteDoQuadril') && p[2] > -25) min = Math.min(min, p[1]);
    pelveY += ALTO - f('assento.amassa') - min;
  }
  // embaixo: o joelho mais dobrado em que o ponto mais baixo do pé direito fica à folga pedida do chão
  const y = pelveY,
    z = bolaZ;
  const peBaixo = (k: number) => Math.min(...pontosDoBoneco(montar(corpo, y, z, base(k))).filter((x) => x.parte === 'pe' && x.p[0] < 0).map((x) => x.p[1]));
  const joelhoBaixo = resolver1((k) => peBaixo(k) - f('pe.folgaDoChao'), 60, 110, 30);
  const e0 = montar(corpo, y, z, base(joelhoBaixo));
  const zPorta = resolver1((zz) => tubo(corpo, e0, portaEm(zz).alca).comp - f('elastico.esticaEmbaixo') * obj('elastico', 'comp'), -40, -260, 40);
  c = { pelveY, bolaZ, joelhoBaixo, zPorta };
  CAL.set(corpo, c);
  return c;
}

function pose(c: Cal, u: number, erro?: string): Pose {
  const p = base(mix(c.joelhoBaixo, f('joelho.cima'), u));
  if (erro === 'tranco') {
    // chutar: o joelho trava estendido e o tronco vai para trás no embalo
    p.joelho = mix(c.joelhoBaixo, f('erro.tranco.joelho'), u);
    p.tras = f('erro.tranco.tronco') * suave(u);
    p.lombar = f('erro.tranco.lombar') * suave(u);
  }
  if (erro === 'quadril') {
    p.coxaSobe = f('erro.quadril.coxa') * suave(u);
    p.tras = f('erro.quadril.tronco') * suave(u);
    p.lombar = f('erro.quadril.lombar') * suave(u);
  }
  // deixar o elástico puxar a perna de volta: a perna cai solta, e no meio da descida já está quase embaixo
  if (erro === 'cai') p.joelho = mix(c.joelhoBaixo, f('joelho.cima'), Math.pow(u, f('erro.cai.expoente')));
  return p;
}

/** O trecho do tubo longe do corpo, até a alça, desenhado como cenário (atrás do corpo e fora do enquadramento). */
function tuboAteAPorta(pts: V3[], estica: number): PecaPropria {
  return {
    t: 'propria',
    nome: 'tubo-ate-a-porta',
    cenario: true,
    desenhar(C, M) {
      const d = obj('elastico', 'tuboDiam') / Math.sqrt(Math.max(1, estica));
      C.polilinha(pts, M.estofado[3]!, d + 0.5);
      C.polilinha(pts, M.estofado[1]!, d);
    },
  };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = montar(corpo, c.pelveY, c.bolaZ, pose(c, u, erro));
  const porta = portaEm(c.zPorta);
  const t = tubo(corpo, e, porta.alca);
  const estica = t.comp / obj('elastico', 'comp');
  // perto do corpo, o tubo é a peça do elástico (no enquadramento); dali até a alça, cenário
  const corte = add(t.ponta, mul(norm(sub(t.fim, t.ponta)), f('elastico.noQuadro')));
  const L = e.lado.R;
  const zB = zBanco();
  const pecas: Peca[] = [
    ...porta.pecas,
    { t: 'bancoReto', x0: 0, z0: zB, pontaNoQuadro: f('banco.noQuadro') },
    tuboAteAPorta([corte, t.fim], estica),
    pegadorNaMao(porta.alca, [1, 0, 0], t.fim, 'pegador-na-alca'),
    { t: 'elastico', pts: [t.ponta, corte], estica },
    pegadorNoTornozelo(L.canela, L.tornozelo, f('elastico.acimaDoTornozelo'), corpo.m('raio.tornozelo'), t.ponta),
  ];
  const pegador = add(add(L.tornozelo, mul(L.canela.y, f('elastico.acimaDoTornozelo'))), mul(L.canela.z, corpo.m('raio.tornozelo') + obj('elastico', 'pegadorDiam') / 2));
  return {
    esq: e,
    prims: [chao(-70, 70, c.zPorta - 20, 110), ...bancoReto(0, zB), ...porta.prims, { t: 'fio', pts: t.pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas,
    fios: [{ id: 'elastico', comp: t.comp, estica: true }],
    cargas: [],
    marcas: { ancora: porta.alca, pegadorNoTornozelo: pegador, assento: [0, ALTO, f('banco.frenteDoQuadril')] },
  };
}

export const extensaoJoelhoElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // o quadríceps direito (principal), sem secundário, como a ficha da técnica
  papeis: { 'quadriceps:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo, joelho: (q) => q.esq.lado.R.joelho },
};
