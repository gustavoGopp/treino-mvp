// Coice na máquina de glúteo (de quatro apoios), no motor novo (primeira animação deste exercício: até aqui ele era só
// cartão de texto). Os números vêm da ficha (../dados/movimentos/coice-maquina.json); a máquina, de
// ../pecas-de-cena/gluteo-maquina.ts.
//
// A ficha da técnica pede a máquina de quatro apoios: "tronco apoiado (peito ou antebraços na almofada), um pé na
// plataforma ou na alavanca; o outro joelho apoiado". O corpo é o dos coices em quatro apoios aprovados (o núcleo
// ./quatro-apoios.ts, sem mudar nada nele): a perna de apoio (a esquerda) com a coxa na vertical e a canela deitada na
// almofada dos joelhos, e o tronco com a mesma bacia, a mesma lombar e os mesmos erros. O que muda é a frente: os
// antebraços deitam nos apoios, com os cotovelos sob os ombros, e as mãos fecham nos pegadores em pé. A inclinação das
// costas sai daí (o cotovelo encosta no apoio). A perna direita trabalha como no coice com caneleira: com o joelho a
// 90° e o pé em ângulo reto, a coxa vai de sob o quadril até a linha do tronco, e a sola empurra a plataforma para trás
// e para cima. O eixo da alavanca fica na linha do quadril (a almofada dos joelhos regula na altura para isso): a
// perna gira inteira em volta dele, e a plataforma gira junto, encostada na sola. A pilha sobe o arco do came.
import ficha from '../dados/movimentos/coice-maquina.json';
import { calibragem } from '../calibragens';
import { resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { anguloNoGluteo, direcaoNoGluteo, eixoDoGluteo, gluteoMaquina } from '../pecas-de-cena/gluteo-maquina';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dot, girar, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { pernaDeApoio, troncoEmQuatroApoios } from './quatro-apoios';
import type { DesvioDaBacia, OpcoesQuatroApoios } from './quatro-apoios';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const dir = direcaoNoGluteo;
// do núcleo, o tronco só lê a lombar e o pescoço (as mãos não vão ao chão: os antebraços ficam nos apoios)
const O: OpcoesQuatroApoios = { piso: 0, maosMeia: 0, cotovelo: 0, lombar: f('lombar'), cervical: f('cervical') };

/** Os braços: o úmero na vertical, sob o ombro; o antebraço deitado para a frente; a mão fecha no pegador em pé. */
function bracos(): Record<Lado, PoseBraco> {
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return { umero: norm([0, -1, f('umero.aFrente')]), antebraco: norm([-s * f('antebraco.paraDentro'), 0, 1]), polo: [0, 0, -1], mao: { polegar: [0, 1, 0], forma: 'pegada', diam: 4 } };
  };
  return { R: braco('R'), L: braco('L') };
}

/** O que não muda no ciclo, uma vez por corpo: a inclinação das costas e a linha do tronco. */
interface Base {
  beta: number;
  /** A linha da base do pescoço ao quadril: quantos graus ela desce da horizontal, para trás. */
  linha: number;
}
/** O centro do quadril: na linha do eixo da alavanca, sobre o joelho de apoio. */
const pelveNoEixo = (): V3 => [0, eixoDoGluteo()[1], 0];

function base(corpo: Corpo): Base {
  return calibragem(corpo, 'coice-maquina:corpo', () => {
    const pelve = pelveNoEixo();
    const montar = (beta: number) => resolverMembros(troncoEmQuatroApoios(corpo, O, { beta, pelve }), bracos(), { R: pernaDeApoio(), L: pernaDeApoio() });
    // as costas inclinam até a parte de baixo do cotovelo encostar no topo do apoio
    const beta = resolver1((b) => montar(b).lado.R.cotovelo[1] - corpo.m('raio.antebraco') - obj('gluteoMaquina', 'antebracoAltura') + f('apoio.amassa'), -10, 50, 30);
    const e = montar(beta);
    const linha = Math.atan2(e.torax.o[1] - e.pelve.o[1], e.torax.o[2] - e.pelve.o[2]) / rad;
    return { beta, linha };
  });
}

/** O quanto a coxa direita fica atrás da vertical em u (graus), e o quanto ela abre para fora (no erro de girar). */
function coxaEm(corpo: Corpo, u: number, erro?: string): { atras: number; abre: number } {
  const naLinha = 90 - base(corpo).linha;
  const topo = erro === 'lombar' ? naLinha + f('erro.lombar.acima') : naLinha;
  return { atras: mix(f('coxa.inicio'), topo, u), abre: erro === 'gira' ? f('erro.gira.abre') * u : 0 };
}

/** A perna que trabalha: a coxa `atras` graus atrás da vertical (e `abre` para fora), o joelho dobrado, o pé em ângulo reto. */
function pernaQueTrabalha(atras: number, abre: number): PosePerna {
  const fora = (d: V3): V3 => norm(girar(d, [0, 1, 0], abre));
  const fi = atras + f('joelho');
  return { coxa: fora(dir(atras)), canela: fora(dir(fi)), peDir: fora(dir(fi - 90 + f('pe.flexaoPlantar'))), polo: fora(dir(atras - 90)) };
}

function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
  const b = base(corpo);
  const { atras, abre } = coxaEm(corpo, u, erro);
  const d: DesvioDaBacia = { bacia: erro === 'lombar' ? f('erro.lombar.bacia') * u : 0, rola: erro === 'gira' ? f('erro.gira.rola') * u : 0 };
  const t = troncoEmQuatroApoios(corpo, O, { beta: b.beta, pelve: pelveNoEixo() }, d);
  return resolverMembros(t, bracos(), { R: pernaQueTrabalha(atras, abre), L: pernaDeApoio() });
}

/** A sola do pé direito: o meio dela e a direção, perpendicular a ela, que vai da sola para o tornozelo. */
function sola(e: Esq) {
  const R = e.lado.R;
  const meio = mul(add(R.bola, R.calcanhar), 0.5);
  const ao = norm(sub(R.bola, R.calcanhar));
  const t = sub(R.tornozelo, meio);
  return { meio, paraOPe: norm(sub(t, mul(ao, dot(t, ao)))) };
}

/** A alavanca no começo: a distância do eixo à plataforma e o giro da plataforma em relação a ela. */
function regulagem(corpo: Corpo) {
  return calibragem(corpo, 'coice-maquina:alavanca', () => {
    const e = esqueleto(corpo, 0);
    const S = sola(e);
    const E = eixoDoGluteo();
    const face = add(S.meio, mul(S.paraOPe, f('plataforma.amassa')));
    const v: V3 = [0, face[1] - E[1], face[2] - E[2]];
    const alavanca = anguloNoGluteo(v);
    const R = e.lado.R,
      L = e.lado.L;
    return {
      inicio: alavanca,
      raio: Math.hypot(v[1], v[2]),
      giro: anguloNoGluteo(S.paraOPe) - alavanca,
      xPe: S.meio[0],
      joelheira: L.joelho[1] - corpo.secoes.perna![0]!.b,
      apoioFora: (Math.abs(R.cotovelo[0]) + Math.abs(L.cotovelo[0])) / 2,
      pegadores: [R.pegada, L.pegada] as [V3, V3],
    };
  });
}

/** O que o quadro mostra da máquina: o comprimento e a largura inteiros, do chão até `quadro.ate` (a torre é cortada). */
function noQuadro(r: ReturnType<typeof regulagem>): V3[] {
  const M = gluteoMaquina({ joelheira: r.joelheira, apoio: r.pegadores[0][2] - obj('gluteoMaquina', 'antebracoComp') - 2, apoioFora: r.apoioFora, alavanca: r.inicio, inicio: r.inicio, raio: r.raio, giroDaPlataforma: r.giro, xPe: r.xPe });
  const { zTras, zFrente, xDireita, xEsquerda } = M.extremos;
  const y = f('quadro.ate');
  return [
    [xDireita, 0, zTras],
    [xEsquerda, 0, zFrente],
    [xDireita, y, zTras],
    [xEsquerda, y, zFrente],
  ];
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = esqueleto(corpo, u, erro);
  const r = regulagem(corpo);
  const E = eixoDoGluteo();
  // a alavanca vai para onde a sola está (no movimento certo, a perna gira inteira em volta do eixo e a sola fica na
  // plataforma; nos erros, a plataforma segue a sola na alavanca, que só gira)
  const S = sola(e);
  const face = add(S.meio, mul(S.paraOPe, f('plataforma.amassa')));
  const alavanca = anguloNoGluteo([0, face[1] - E[1], face[2] - E[2]]);
  const zMao = r.pegadores[0][2];
  const M = gluteoMaquina({
    joelheira: r.joelheira,
    apoio: zMao - obj('gluteoMaquina', 'antebracoComp') - 2,
    apoioFora: r.apoioFora,
    pegadores: r.pegadores,
    alavanca,
    inicio: r.inicio,
    raio: r.raio,
    giroDaPlataforma: r.giro,
    xPe: r.xPe,
    placas: f('placas'),
    noQuadro: noQuadro(r),
  });
  return {
    esq: e,
    prims: [chao(-90, 130, M.extremos.zTras - 10, M.extremos.zFrente + 10), ...M.prims],
    pecas: M.pecas,
    fios: [],
    cargas: [],
    marcas: {
      eixo: M.eixo,
      plataforma: M.plataformaFace.face,
      plataformaNormal: M.plataformaFace.paraOPe,
      plataformaAo: M.plataformaFace.ao,
      pilha: [0, M.subida, 0],
      alavanca: [alavanca, r.inicio, r.raio],
      joelheira: [0, r.joelheira, 0],
      apoio: [r.apoioFora, obj('gluteoMaquina', 'antebracoAltura'), 0],
    },
  };
}

export const coiceMaquina: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // glúteos da perna que trabalha, sem secundário (a biblioteca; a ficha da técnica propõe os posteriores como
  // secundários, mas a biblioteca não os tem)
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho, 'pé': (q) => q.esq.lado.R.tornozelo },
};
