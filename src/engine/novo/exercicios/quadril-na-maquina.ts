// O núcleo da abdução e da adução na cadeira abdutora e adutora (../pecas-de-cena/cadeira-abdutora.ts). Sentado, as
// costas no encosto um pouco deitado, as mãos nos pegadores ao lado do assento, os pés nos apoios com os joelhos a 90°
// ("Sit down with feet on foot pegs so knees are bent 90 degrees", Life Fitness) e as almofadas por fora dos joelhos
// (abdução) ou por dentro (adução). As pernas abrem e fecham girando em volta de um eixo vertical que passa pelo centro
// de cada quadril: a coxa, a perna e o pé giram juntos, sem o joelho mudar de ângulo, e o braço da máquina gira no mesmo
// eixo (por isso a almofada não escorrega e o pé não sai do apoio).
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo e por opções, gravado em calibragem):
//  - a altura da bacia: o glúteo e a coxa apoiam no assento (amassando `amassa` cm), medido na superfície do Boneco;
//  - a inclinação da coxa: com o joelho a 90°, a sola fica no topo do apoio do pé.
import { calibragem } from '../calibragens';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Quadro } from '../movimento';
import { chao } from '../pecas';
import { cadeiraAbdutora, geometriaDaAbdutora } from '../pecas-de-cena/cadeira-abdutora';
import type { ModoDaAbdutora } from '../pecas-de-cena/cadeira-abdutora';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import type { V3 } from '../vec';

const rad = Math.PI / 180;

export interface OpcoesNaMaquina {
  /** A bacia deitada para trás junto com o encosto (graus; negativo = para trás). */
  bacia: number;
  /** O pescoço e a cabeça trazem o olhar de volta para a frente (graus). */
  cervical: number;
  cabeca: number;
  /** Quanto o glúteo e a coxa afundam no assento (cm). */
  amassa: number;
  /** O ângulo do joelho, com o pé no apoio. */
  joelho: number;
}

/** O tronco e a bacia neste instante (o erro de embalar mexe nele). */
export interface Tronco {
  bacia?: number;
  lombar?: number;
  toracica?: number;
  /** Somado ao pescoço das opções (o erro de embalar traz o olhar de volta para a frente). */
  cervical?: number;
}

interface Calib {
  y: number;
  /** A coxa desce `alfa` graus da horizontal (positivo = o joelho mais baixo que o quadril). */
  alfa: number;
}

/** As direções da coxa e da perna, e a dos dedos, com a perna aberta `graus` para fora (o lado s). */
function perna(o: OpcoesNaMaquina, k: Lado, alfa: number, graus: number): PosePerna {
  const s = sinal(k);
  const th = graus * rad,
    a = alfa * rad,
    b = (o.joelho - 90) * rad;
  const f: V3 = [s * Math.sin(th), 0, Math.cos(th)];
  const comb = (cf: number, cy: number): V3 => [f[0] * cf, cy, f[2] * cf];
  // a coxa desce `alfa` da horizontal; a perna, perpendicular a ela quando o joelho está a 90°
  const coxa = comb(Math.cos(a), -Math.sin(a));
  const canela = comb(-Math.sin(a + b), -Math.cos(a + b));
  return { coxa, canela, peDir: f, polo: comb(0.95, 0.3) };
}

/** As mãos nos pegadores ao lado do assento, com o polegar para a frente. */
export function maosNosPegadores(): Record<Lado, PoseBraco> {
  const G = geometriaDaAbdutora();
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return { pegada: [s * obj('cadeiraAbdutora', 'pegadorFora'), obj('cadeiraAbdutora', 'pegadorAltura'), G.zEixo - 1.5], polo: [s * 0.45, -0.2, -1], mao: { polegar: [0, 0, 1], forma: 'pegada', diam: 4 } };
  };
  return { R: braco('R'), L: braco('L') };
}

function troncoNaMaquina(corpo: Corpo, o: OpcoesNaMaquina, y: number, t: Tronco = {}) {
  const G = geometriaDaAbdutora();
  return resolverTronco(corpo, { pelve: [0, y, G.zEixo], frente: t.bacia ?? o.bacia, lombar: t.lombar, toracica: t.toracica, cervical: o.cervical + (t.cervical ?? 0), cabeca: o.cabeca });
}

/** O ponto mais baixo do glúteo e da coxa sobre o assento, acima do tampo (cm; negativo = afunda). */
export function apoioNoAssentoDaMaquina(e: Esq): number {
  const topo = obj('cadeiraAbdutora', 'assentoAltura'),
    meia = obj('cadeiraAbdutora', 'assentoLarg') / 2,
    comp = obj('cadeiraAbdutora', 'assentoComp');
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (['pelve', 'coxa', 'cintura'].includes(parte) && p[2] < 0 && p[2] > -comp && Math.abs(p[0]) < meia) min = Math.min(min, p[1]);
  return min - topo;
}

/** A calibração: a altura da bacia (o glúteo no assento) e a inclinação da coxa (a sola no apoio do pé). */
export function calibrarNaMaquina(corpo: Corpo, o: OpcoesNaMaquina): Calib {
  return calibragem(corpo, `quadril-na-maquina:${JSON.stringify(o)}`, () => {
    const topo = obj('cadeiraAbdutora', 'assentoAltura');
    let c: Calib = { y: topo + 10, alfa: 0 };
    for (let i = 0; i < 4; i++) {
      const y = c.y;
      const esq = (alfa: number) => resolverMembros(troncoNaMaquina(corpo, o, y), maosNosPegadores(), { R: perna(o, 'R', alfa, 0), L: perna(o, 'L', alfa, 0) });
      const alfa = resolver1((a) => esq(a).lado.R.bola[1] - obj('cadeiraAbdutora', 'apoioPeAltura'), -20, 20);
      const e = esq(alfa);
      c = { y: y - o.amassa - apoioNoAssentoDaMaquina(e), alfa };
    }
    return { y: Math.round(c.y * 1000) / 1000, alfa: Math.round(c.alfa * 1000) / 1000 };
  });
}

/** O esqueleto com as pernas abertas `graus` (cada uma, para fora), o tronco dado. */
export function sentadoNaMaquina(corpo: Corpo, o: OpcoesNaMaquina, graus: number, t: Tronco = {}): Esq {
  const C = calibrarNaMaquina(corpo, o);
  return resolverMembros(troncoNaMaquina(corpo, o, C.y, t), maosNosPegadores(), { R: perna(o, 'R', C.alfa, graus), L: perna(o, 'L', C.alfa, graus) });
}

/** O quadro: o corpo e a máquina com os braços na abertura das pernas. */
export function quadroNaMaquina(corpo: Corpo, o: OpcoesNaMaquina, modo: ModoDaAbdutora, graus: number, inicio: number, t: Tronco = {}, placas = 5): Quadro {
  const e = sentadoNaMaquina(corpo, o, graus, t);
  const M = cadeiraAbdutora({ modo, braco: graus, inicio, placas });
  return {
    esq: e,
    prims: [chao(-90, 90, -125, 60), ...M.prims],
    pecas: [M.fixa, M.movel],
    fios: [],
    cargas: [],
    marcas: {
      eixoR: M.eixo.R,
      eixoL: M.eixo.L,
      almofadaR: M.almofadas.R.centro,
      almofadaL: M.almofadas.L.centro,
      apoioR: M.apoios.R,
      apoioL: M.apoios.L,
      placas: M.placasDoPino,
      // o ângulo dos braços, a posição inicial e quanto as placas do pino estão acima das de baixo
      regulagem: [graus, inicio, M.placasDoPino[1] - M.topoDaPilha],
    },
    // de frente, o corpo e as pernas são pintados numa camada só, na profundidade do tronco (encostado, 38 cm atrás da
    // borda do assento): o eixo, as engrenagens e o pé do assento, que ficam atrás das canelas, eram pintados por cima
    // delas. O corpo vai para a frente deles (para perto da profundidade dos joelhos), e as almofadas, os montantes e
    // os apoios dos pés, que ficam na frente das pernas, continuam por cima. Os braços ficam entre os dois: na frente
    // dos pegadores e atrás das coxas, que escondem as mãos quando as pernas abrem (como na abdução com mini band)
    viesNaVista: { frontal: { corpo: 40, bracoR: 20, bracoL: 20 } },
  };
}
