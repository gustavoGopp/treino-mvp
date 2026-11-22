// Extensão de joelho sentado, com mini band nos tornozelos, no motor novo. Os números vêm da ficha
// (../dados/movimentos/extensao-joelho-mini-band.json); a pose sentada, do núcleo ./quadril-sentado-na-cadeira.ts (o
// mesmo da extensão com caneleira e da abdução com mini band aprovadas). Sentado no fundo do assento da cadeira firme
// (sem a parede atrás: o cartão não a pede, e com as costas deitadas a cabeça chegava nela),
// as costas apoiadas no encosto, as mãos nas bordas do assento; o pé esquerdo chapado no chão, segurando a faixa; a
// mini band em volta dos dois tornozelos (../pecas-de-cena/mini-band.ts, `lacoNasCanelas`). Só a canela direita gira
// em volta do joelho, do pé perto do outro até a perna reta, e a faixa estica entre os dois tornozelos.
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts):
//  - quanto o tronco deita para trás: até a pele das costas, na altura da tábua do encosto, encostar nela;
//  - a altura da bacia (o glúteo e a coxa no assento) e a distância do pé parado (o joelho dele a 90°), com o tronco
//    já deitado.
import ficha from '../dados/movimentos/extensao-joelho-mini-band.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, Lado, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { cadeira } from '../pecas-de-cena/cadeira';
import { lacoNasCanelas, miniBand } from '../pecas-de-cena/mini-band';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, girar, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { assento, maosNoAssento, peNoChao } from './quadril-sentado-na-cadeira';
import type { OpcoesSentado } from './quadril-sentado-na-cadeira';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesSentado = { quadrilABorda: f('quadrilABorda'), pesMeiaDistancia: f('pes.meiaDistancia'), joelho: f('joelho'), amassa: f('assento.amassa'), maosAFrente: f('maos.aFrente') };

/**
 * A tábua do encosto (as medidas da cadeira, como ../pecas-de-cena/cadeira.ts a desenha): de 22 a 6 cm abaixo do alto
 * do encosto, inclinada para trás junto com as hastes. Devolve a altura de baixo e de cima dela e o z da face da
 * frente numa altura y.
 */
export function tabuaDoEncosto() {
  const g = (id: string) => obj('cadeira', id);
  const alt = g('assentoAltura'),
    topo = g('altura'),
    pe = g('peLado');
  const zEncosto = -g('assentoProf') - pe / 2,
    zTopo = -g('prof') + pe / 2;
  // a tábua tem 2 cm de espessura (o desenho da cadeira): a face da frente fica 1 cm à frente da linha das hastes
  const zFrente = (y: number) => zEncosto + ((zTopo - zEncosto) * (y - alt)) / (topo - alt) + 1;
  return { baixo: topo - 22, cima: topo - 6, zFrente, meiaLarg: g('assentoLarg') / 2 - pe };
}

/** A folga entre as costas e a tábua do encosto (cm; negativo = as costas entram nela): o ponto das costas mais para trás. */
export function folgaDasCostas(e: Esq): number {
  const T = tabuaDoEncosto();
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'tronco' && p[1] > T.baixo + 1 && p[1] < T.cima - 1 && Math.abs(p[0]) < T.meiaLarg) min = Math.min(min, p[2] - T.zFrente(p[1]));
  return min;
}

const plantados = (bolaZ: number): Record<Lado, PosePerna> => ({ R: peNoChao(O, 'R', bolaZ), L: peNoChao(O, 'L', bolaZ) });
interface Calib {
  y: number;
  bolaZ: number;
  /** A inclinação do tronco para trás (graus). */
  deita: number;
  /** A direção da coxa direita, parada. */
  coxa: V3;
}
/**
 * O tronco sentado e deitado `deita` graus para trás (a bacia a `recua` cm da borda), com a lombar menos curva; o
 * pescoço compensa parte da inclinação, para o olhar ficar quase na horizontal.
 */
function tronco(corpo: Corpo, y: number, deita: number, recua = O.quadrilABorda): Tronco {
  const peito = deita - f('lombar.sentado');
  return resolverTronco(corpo, { pelve: [0, y, -recua], frente: -deita, lombar: f('lombar.sentado'), cervical: peito * f('pescoco.compensa'), cabeca: 0 });
}
const base = (corpo: Corpo, c: Pick<Calib, 'y' | 'bolaZ' | 'deita'>) => resolverMembros(tronco(corpo, c.y, c.deita), maosNoAssento(O), plantados(c.bolaZ));

function calibrar(corpo: Corpo): Calib {
  return calibragem(corpo, `${F.id}:sentado`, () => {
    const A = assento();
    let c = { y: A.altura + 10, bolaZ: 15, deita: 0 };
    for (let i = 0; i < 5; i++) {
      const c0 = c;
      const bolaZ = resolver1((z) => base(corpo, { ...c0, bolaZ: z }).lado.L.ang.joelho - O.joelho, -10, 60);
      // o glúteo e a coxa no assento
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(base(corpo, { ...c0, bolaZ }))) if (['pelve', 'coxa', 'cintura'].includes(parte) && p[2] < A.zBorda && Math.abs(p[0]) < A.larg / 2) min = Math.min(min, p[1]);
      const y = c0.y + (A.altura - O.amassa) - min;
      // o tronco deita até as costas encostarem na tábua
      const deita = resolver1((d) => folgaDasCostas(base(corpo, { y, bolaZ, deita: d })) - f('costas.noEncosto'), -5, 35, 24);
      c = { y, bolaZ, deita };
    }
    // a coxa direita: a da coxa com o pé no chão, na horizontal (sem o pé no chão, ela deita no assento)
    const e = base(corpo, c);
    const d0 = sub(e.lado.R.joelho, e.lado.R.quadril);
    return { ...c, coxa: norm([d0[0], 0, d0[2]]) };
  });
}

/** A perna direita: a coxa na direção dada, a canela dobrada `joelho` graus para baixo e para trás, o pé em ângulo reto. */
function pernaLivre(coxa: V3, joelho: number): PosePerna {
  const eixo = norm(cross([0, 1, 0], coxa));
  const canela = norm(girar(coxa, eixo, joelho));
  const peDir = norm(girar(canela, eixo, -(90 - f('pe.flexaoPlantar'))));
  return { coxa, canela, peDir, polo: norm(add(mul([0, 1, 0], 0.4), coxa)) };
}

function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
  const C = calibrar(corpo);
  const q = erro === 'quadril' ? u : 0;
  // no erro, a bacia sobe e vai para a frente, e o tronco deita mais
  const t = tronco(corpo, C.y + f('erro.quadril.sobe') * q, C.deita + f('erro.quadril.inclina') * q, O.quadrilABorda - f('erro.quadril.aFrente') * q);
  const emCima = erro === 'curta' ? f('erro.curta.joelho') : f('joelho.emCima');
  const pernas = { R: pernaLivre(C.coxa, mix(f('joelho.embaixo'), emCima, u)), L: peNoChao(O, 'L', C.bolaZ) };
  return resolverMembros(t, maosNoAssento(O), pernas);
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = esqueleto(corpo, u, erro);
  const laco = lacoNasCanelas(e, f('faixa.acimaDoTornozelo'));
  const mb = miniBand(laco);
  const A = assento();
  const cad = cadeira({ x0: 0, zBorda: A.zBorda });
  return {
    esq: e,
    prims: [chao(-70, 70, -60, 90), ...cad.prims, ...mb.prims],
    // a cadeira fica atrás do corpo na pintura (sentado nela, o corpo a cobre onde as duas se cruzam na tela)
    pecas: [{ ...cad.peca, cenario: true }, mb.peca],
    fios: [{ id: 'elastico', comp: laco.comp, estica: true, objeto: 'miniBand' }],
    cargas: [],
    marcas: { faixaR: laco.centros.R, faixaL: laco.centros.L, piso: [0, 0, 0], assento: [0, A.altura, A.zBorda] },
  };
}

export const extensaoJoelhoMiniBand: Exercicio = {
  ficha: F,
  // de três quartos: a perna que estende, a faixa entre os tornozelos e o encosto atrás das costas (de lado, o tronco
  // esconde o encosto e as costas parecem deitadas no ar); de lado, o ângulo do joelho e os erros
  vistas: ['quina', 'lateral'],
  quadro,
  // quadríceps da perna que estende, sem secundário (a ficha da técnica)
  papeis: { 'quadriceps:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};
