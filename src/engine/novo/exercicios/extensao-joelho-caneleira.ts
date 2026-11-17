// Extensão de joelho sentado, com caneleira, no motor novo. Os números vêm da ficha
// (../dados/movimentos/extensao-joelho-caneleira.json); a pose sentada, do núcleo ./quadril-sentado-na-cadeira.ts.
// Sentado na cadeira firme encostada na parede, costas retas, as mãos nas bordas do assento, as coxas apoiadas; o pé
// esquerdo chapado no chão; a perna direita, com a caneleira no tornozelo, pende com o joelho dobrado e o pé fora do
// chão. Só a canela direita gira em volta do joelho: a coxa fica parada no assento.
import ficha from '../dados/movimentos/extensao-joelho-caneleira.json';
import { resolverMembros } from '../esqueleto';
import type { Esq, Lado, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { cadeira, parede } from '../pecas-de-cena/cadeira';
import { caneleira, caneleiraNaPerna } from '../pecas-de-cena/caneleira';
import type { Corpo } from '../tabelas';
import { add, cross, girar, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { assento, calibrarSentado, maosNoAssento, peNoChao, troncoSentado } from './quadril-sentado-na-cadeira';
import type { OpcoesSentado } from './quadril-sentado-na-cadeira';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesSentado = { quadrilABorda: f('quadrilABorda'), pesMeiaDistancia: f('pes.meiaDistancia'), joelho: f('joelho'), amassa: f('assento.amassa'), maosAFrente: f('maos.aFrente') };

const plantados = (bolaZ: number): Record<Lado, PosePerna> => ({ R: peNoChao(O, 'R', bolaZ), L: peNoChao(O, 'L', bolaZ) });
const calib = (corpo: Corpo) => calibrarSentado(corpo, O, F.id, (_t, z) => plantados(z));

/**
 * A direção da coxa direita: a da coxa com o pé no chão, na horizontal. Sem o pé no chão, a coxa deita no assento até a
 * borda (o joelho na altura do quadril); é nela que a coxa fica parada.
 */
const COXA = new WeakMap<Corpo, V3>();
function coxaParada(corpo: Corpo): V3 {
  const ja = COXA.get(corpo);
  if (ja) return ja;
  const C = calib(corpo);
  const e = resolverMembros(troncoSentado(corpo, O, C.y), maosNoAssento(O), plantados(C.bolaZ));
  const d0 = sub(e.lado.R.joelho, e.lado.R.quadril);
  const d = norm([d0[0], 0, d0[2]]);
  COXA.set(corpo, d);
  return d;
}

/** A perna direita: a coxa na direção dada, a canela dobrada `joelho` graus para baixo e para trás, o pé relaxado. */
function pernaLivre(coxa: V3, joelho: number): PosePerna {
  // o eixo do joelho: perpendicular à coxa, na horizontal (para a esquerda da pessoa, +x)
  const eixo = norm(cross([0, 1, 0], coxa));
  const canela = norm(girar(coxa, eixo, joelho));
  const peDir = norm(girar(canela, eixo, -(90 - f('pe.flexaoPlantar'))));
  return { coxa, canela, peDir, polo: norm(add(mul([0, 1, 0], 0.4), coxa)) };
}

function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
  const C = calib(corpo);
  const n = f('erro.ritmo.expoente');
  const v = erro === 'tranco' ? 1 - (1 - u) ** n : erro === 'cai' ? u ** n : u;
  const q = erro === 'quadril' ? u : 0;
  const t = troncoSentado(corpo, O, C.y, q ? { lombar: f('erro.quadril.lombar') * q, toracica: f('erro.quadril.toracica') * q } : {});
  const c0 = coxaParada(corpo);
  // no erro, a coxa sobe do assento (gira para cima em volta do quadril)
  const coxa = q ? norm(girar(c0, norm(cross([0, 1, 0], c0)), -f('erro.quadril.coxa') * q)) : c0;
  const pernas = { R: pernaLivre(coxa, mix(f('joelho.embaixo'), f('joelho.emCima'), v)), L: peNoChao(O, 'L', C.bolaZ) };
  return resolverMembros(t, maosNoAssento(O), pernas);
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = esqueleto(corpo, u, erro);
  const c = caneleiraNaPerna(e, 'R', [-1, 0, 0]);
  const cn = caneleira(c);
  const A = assento();
  const cad = cadeira({ x0: 0, zBorda: A.zBorda });
  return {
    esq: e,
    prims: [chao(-70, 70, -60, 90), ...cad.prims, ...cn.prims],
    // a cadeira fica atrás do corpo na pintura (sentado nela, o corpo a cobre onde as duas se cruzam na tela)
    pecas: [{ ...cad.peca, cenario: true }, parede({ x0: 0, zBorda: A.zBorda }), cn.peca],
    fios: [],
    cargas: [{ massa: f('caneleira.massa'), pos: c.centro }],
    marcas: { caneleira: c.centro, caneleiraRaio: [c.raio, 0, 0], piso: [0, 0, 0], assento: [0, A.altura, A.zBorda] },
  };
}

export const extensaoJoelhoCaneleira: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // quadríceps da perna que estende, sem secundário (a ficha da técnica)
  papeis: { 'quadriceps:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};
