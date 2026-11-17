// Rolamento com a roda abdominal, de joelhos, no motor novo. Os números vêm da ficha
// (../dados/movimentos/roda-abdominal.json); a roda é peça nova (../pecas-de-cena/roda-abdominal.ts, medidas da
// Rogue). Ajoelhado no colchonete (os joelhos e as canelas parados, o peito do pé no colchonete, como na puxada
// unilateral ajoelhada), as mãos fechadas nos pegadores, os braços estendidos. O corpo é descrito por dois ângulos: o
// da coxa (o quanto o quadril vai à frente do joelho) e o da dobra do quadril (o quanto o tronco fica dobrado sobre a
// coxa). A roda não é posta: ela fica onde o braço estendido alcança o chão à frente do ombro. Assim:
//  - no começo, a dobra do quadril é a que deixa os ombros em cima da roda, com a coxa quase na vertical;
//  - no ponto mais longe, o quadril fica estendido (o corpo reto dos joelhos aos ombros) e a coxa, onde a linha dos
//    joelhos aos ombros fica no ângulo da ficha;
//  - no meio, o quadril vai à frente e se abre ao mesmo tempo (o quadril acompanha), e a roda rola sem escorregar: ela
//    gira o quanto andou dividido pelo raio.
// A lombar fica um pouco menos curvada que em pé (costelas para baixo, pelve um pouco enrolada) o caminho todo.
import ficha from '../dados/movimentos/roda-abdominal.json';
import { angulosDoLado } from '../conferir-util';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, colchonete } from '../pecas';
import type { Peca } from '../pecas';
import { formaDaRoda, rodaAbdominal as pecaDaRoda } from '../pecas-de-cena/roda-abdominal';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { mix, norm } from '../vec';
import type { V3 } from '../vec';
import { alcanceDoBraco } from './dobrar-o-quadril';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

/** A pose: o ângulo da coxa à frente da vertical, a dobra do quadril e a lombar (graus). */
interface Pose {
  coxa: number;
  quadril: number;
  lombar: number;
}
interface Montado {
  e: Esq;
  /** Onde a roda encosta no chão (z). */
  zRoda: number;
}
interface Cal {
  inicio: Pose;
  fim: Pose;
  zRoda0: number;
  zRoda1: number;
}
const CAL = new WeakMap<Corpo, Cal>();

/** A altura do centro do joelho: no colchonete, o raio da perna no joelho acima dele. */
const alturaDoJoelho = (corpo: Corpo) => obj('colchonete', 'esp') + corpo.secoes.perna![0]!.b;

function pernas(): Record<Lado, PosePerna> {
  // a canela deitada no colchonete, para trás; o peito do pé no colchonete
  const perna: PosePerna = { coxa: [0, -1, 0], canela: norm([0, -0.035, -1]), peDir: norm([0, -0.2, -1]), polo: [0, 0, 1] };
  return { R: perna, L: perna };
}

/**
 * O corpo na pose `p`, com as mãos nos pegadores. Com `zRoda`, a roda fica ali (o cotovelo dobra o que a distância
 * pedir); sem, a roda fica onde o braço estendido (o cotovelo da ficha) alcança o chão à frente do ombro.
 */
function montar(corpo: Corpo, p: Pose, zRoda?: number): Montado {
  const m = (id: string) => corpo.m(id);
  const L = m('coxa.comp'),
    yK = alturaDoJoelho(corpo);
  const c = p.coxa * rad;
  // o joelho parado em z = 0: o quadril fica ao longo da coxa, à frente e acima dele
  const pelve: V3 = [0, yK + L * Math.cos(c), L * Math.sin(c)];
  const t = resolverTronco(corpo, { pelve, frente: p.coxa + p.quadril, lombar: p.lombar, cervical: f('cervical'), cabeca: 0 });
  const P = pernas();
  const coxa: V3 = [0, -Math.cos(c), -Math.sin(c)];
  const pern = { R: { ...P.R, coxa }, L: { ...P.L, coxa } };
  const { R: raio, meioDoPegador, pegadorDiam } = formaDaRoda();
  const alc = alcanceDoBraco(corpo, f('cotovelo'));
  const braco = (k: Lado, z: number): PoseBraco => {
    const s = sinal(k);
    return { pegada: [s * meioDoPegador, raio, z], polo: [s * 0.35, 0, -1], mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: pegadorDiam } };
  };
  // a roda à frente do ombro, onde o braço estendido (o cotovelo da ficha) alcança o centro dos pegadores; o ombro anda
  // com o braço, por isso a conta se repete com o ombro de verdade
  let z = zRoda ?? pelve[2] + 40;
  let e = resolverMembros(t, { R: braco('R', z), L: braco('L', z) }, pern);
  if (zRoda !== undefined) return { e, zRoda };
  for (let i = 0; i < 4; i++) {
    const o = e.lado.R.ombro;
    const dy = o[1] - raio,
      dx = o[0] + meioDoPegador;
    z = o[2] + Math.sqrt(Math.max(0, alc * alc - dy * dy - dx * dx));
    e = resolverMembros(t, { R: braco('R', z), L: braco('L', z) }, pern);
  }
  return { e, zRoda: z };
}

/** A inclinação da linha do joelho ao ombro acima do chão (graus). */
function anguloDoCorpo(e: Esq): number {
  const o = e.lado.R.ombro,
    j = e.lado.R.joelho;
  return Math.atan2(o[1] - j[1], o[2] - j[2]) / rad;
}

function calibrar(corpo: Corpo): Cal {
  let c = CAL.get(corpo);
  if (c) return c;
  const lombar = f('lombar');
  const alc = alcanceDoBraco(corpo, f('cotovelo'));
  const { R: raio, meioDoPegador } = formaDaRoda();
  // no começo: a dobra do quadril que põe os ombros em cima da roda (o braço estendido na vertical)
  const quadril0 = resolver1((h) => {
    const o = montar(corpo, { coxa: f('inicio.coxa'), quadril: h, lombar }).e.lado.R.ombro;
    return (o[1] - raio) ** 2 + (o[0] + meioDoPegador) ** 2 - alc * alc;
  }, 20, 110, 40);
  const inicio: Pose = { coxa: f('inicio.coxa'), quadril: quadril0, lombar };
  // no ponto mais longe: o quadril estendido e a coxa onde a linha dos joelhos aos ombros fica no ângulo da ficha
  const coxa1 = resolver1((x) => anguloDoCorpo(montar(corpo, { coxa: x, quadril: f('fim.quadril'), lombar }).e) - f('fim.corpo'), 20, 80, 40);
  const fim: Pose = { coxa: coxa1, quadril: f('fim.quadril'), lombar };
  c = { inicio, fim, zRoda0: montar(corpo, inicio).zRoda, zRoda1: montar(corpo, fim).zRoda };
  CAL.set(corpo, c);
  return c;
}

/**
 * O corpo com a roda em `zRoda`, a dobra do quadril e a lombar dadas: a coxa vai à frente até o cotovelo dobrar o que a
 * ficha pede (o braço estendido alcança os pegadores).
 */
function naRoda(corpo: Corpo, c: Cal, zRoda: number, quadril: number, lombar: number): Montado {
  const coxa = resolver1((x) => angulosDoLado(montar(corpo, { coxa: x, quadril, lombar }, zRoda).e, 'R').cotovelo - f('cotovelo'), c.inicio.coxa - 15, c.fim.coxa + 20, 30);
  return montar(corpo, { coxa, quadril, lombar }, zRoda);
}

/**
 * O quadro: a roda anda do começo ao ponto mais longe e o quadril se abre junto; a coxa sai do braço estendido. No erro
 * "deixar o quadril para trás", a coxa fica parada e o tronco deita: a roda vai até onde o braço alcança.
 */
function montarNoInstante(corpo: Corpo, c: Cal, u: number, erro?: string): Montado {
  if (erro === 'quadril') return montar(corpo, { coxa: c.inicio.coxa, quadril: c.inicio.quadril + f('erro.quadril.dobra') * u, lombar: c.inicio.lombar });
  const v = erro === 'rapido' ? suave(Math.min(1, u / f('erro.rapido.fracao'))) : u;
  let quadril = mix(c.inicio.quadril, c.fim.quadril, v),
    lombar = c.inicio.lombar;
  if (erro === 'lombar') {
    // a barriga cai no fim da ida: a lombar afunda e o quadril passa da linha
    const x = suave(u);
    lombar += f('erro.lombar.lombar') * x;
    quadril += f('erro.lombar.quadril') * x;
  }
  return naRoda(corpo, c, mix(c.zRoda0, c.zRoda1, v), quadril, lombar);
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const { e, zRoda } = montarNoInstante(corpo, c, u, erro);
  const { R } = formaDaRoda();
  // a roda rola sem escorregar: gira o quanto andou dividido pelo raio
  const giro = (zRoda - c.zRoda0) / R;
  const roda = pecaDaRoda(zRoda, giro);
  const zCol = f('colchonete.z');
  const pecas: Peca[] = [{ t: 'colchonete', x0: 0, z0: zCol }, roda.peca];
  return {
    esq: e,
    prims: [chao(-70, 70, -80, 150), ...colchonete(0, zCol), ...roda.prims],
    pecas,
    fios: [],
    cargas: [],
    marcas: { roda: roda.centro, rodaGiro: [giro, 0, 0], rodaInicio: [0, R, c.zRoda0], ...Object.fromEntries(LADOS.map((k) => [`pegador${k}`, [sinal(k) * formaDaRoda().meioDoPegador, R, zRoda] as V3])) },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const rodaAbdominal: Exercicio = {
  ficha: F,
  // de lado: o corpo grande, a linha dos joelhos aos ombros e a lombar; de três quartos pela frente: a roda com os dois
  // pegadores e o abdômen (de cima, o abdômen fica escondido sob o corpo: 0 cm²)
  vistas: ['lateral', 'quina'],
  quadro,
  // o abdômen (principal); os oblíquos só ajudam a firmar (listrados: correção de 03/11)
  papeis: { abdomen: 'p', obliquos: 'a' },
  trajetorias: { roda: (q) => q.marcas.roda!, quadril: (q) => q.esq.pelve.o },
};
