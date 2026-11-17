// T na suspensão (o Y fica no texto, como pede a ficha), no motor novo. Os números vêm da ficha
// (../dados/movimentos/yt-suspensao.json); o corpo e a fita, do núcleo ./na-fita.ts. De frente para a âncora, palmas
// para baixo, corpo reto inclinado para trás, braços estendidos na linha da fita; abre os braços quase retos até as
// mãos chegarem à linha dos ombros, juntando as escápulas. A fita não estica: com os braços retos, o corpo sobe muito.
import ficha from '../dados/movimentos/yt-suspensao.json';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { dirRef, mix, norm, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { bracoNaLinha, bracosDeRemada, criarNaFita, maoNoPegador, naRef } from './na-fita';
import type { Bracos } from './na-fita';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const NF = criarNaFita({ sentido: 'de-frente', apoio: 'calcanhares', pesMeia: f('pes.meiaDistancia'), pe: f('pe.pontaSobe'), zPe: f('pes.alemDaAncora'), joelho: f('joelho'), cervical: f('pescoco.flexao'), cabeca: 0 });

/**
 * No tronco, com o braço aberto `psi` graus a partir da frente (0 = à frente, 90 = para o lado): a direção do ombro à
 * pegada (com a altura `el` do começo), para onde o cotovelo aponta (para fora no começo, para trás no T) e o polegar
 * (palmas para baixo: para dentro no começo, para a frente no T). Lado esquerdo; o direito espelha x.
 */
function noTronco(psi: number, el: number) {
  const p = psi * rad,
    e = el * rad;
  return { dir: [Math.sin(p) * Math.cos(e), Math.sin(e), Math.cos(p) * Math.cos(e)] as V3, polo: [Math.cos(p), 0, -Math.sin(p)] as V3, polegar: [-Math.cos(p), f('maos.polegarParaCima'), Math.sin(p)] as V3 };
}
const esp = (T: Ref, k: Lado, v: V3): V3 => dirRef(T, [sinal(k) * v[0], v[1], v[2]]);

/** Os braços do T: quase retos (`braco.dobra`), girando no tronco de `psi0` (à frente, na linha da fita) a `psi`. */
function bracosDoT(corpo: Corpo, psi: number, el: number, escapula: { elev: number; prot: number }): Bracos {
  return (t) => {
    const T = t.torax;
    const n = noTronco(psi, el);
    const lado = (k: Lado): PoseBraco => {
      const polo = esp(T, k, n.polo);
      return { ...bracoNaLinha(corpo, esp(T, k, n.dir), polo, f('braco.dobra')), polo, mao: maoNoPegador(esp(T, k, n.polegar)), ...escapula };
    };
    return { R: lado('R'), L: lado('L') };
  };
}

const CAL = new WeakMap<Corpo, { psi0: number; el: number; umero: V3; comp: number }>();
/** O começo: braços quase retos na linha da fita, corpo no ângulo da ficha. Daí saem a direção do braço e o comprimento da fita. */
function calibrar(corpo: Corpo) {
  let c = CAL.get(corpo);
  if (c) return c;
  const br = NF.bracosNaFita(corpo, f('braco.dobra'), (T, k) => esp(T, k, [1, 0, 0]), (T, k) => esp(T, k, [-1, f('maos.polegarParaCima'), 0]), { elev: 0, prot: f('escapula.prot.inicio') });
  const m = NF.montar(corpo, { theta: f('corpo.inicio') }, br);
  const L = m.e.lado.L;
  const d = naRef(m.e.torax, norm(sub(L.pegada, L.ombro)));
  c = { psi0: Math.atan2(d[0], d[2]) / rad, el: Math.asin(d[1]) / rad, umero: naRef(m.e.torax, norm(sub(L.cotovelo, L.ombro))), comp: NF.compMedio(m) };
  CAL.set(corpo, c);
  return c;
}

/** No erro dos cotovelos, os braços dobram e as mãos vêm ao peito: vira uma remada (o braço para trás e para baixo). */
const D_REMADA: V3 = norm([Math.sin(f('erro.cotovelo.fora') * rad), -Math.cos(f('erro.cotovelo.atras') * rad), -Math.sin(f('erro.cotovelo.atras') * rad)]);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const esc = { elev: erro === 'encolher' ? f('erro.encolher.elev') * u : f('escapula.elev.fim') * u, prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u) };
  const dobra = erro === 'quadril' ? f('erro.quadril.dobra') * u : 0;
  const br = erro === 'cotovelo' ? bracosDeRemada(corpo, c.umero, D_REMADA, u, esc, (T, k) => esp(T, k, [-1, f('maos.polegarParaCima'), 0])) : bracosDoT(corpo, mix(c.psi0, f('T.abertura'), u), mix(c.el, f('T.altura'), u), esc);
  const theta = NF.inclinacaoPelaFita(corpo, c.comp, { dobra }, br, 0, f('corpo.inicio') + 15);
  return NF.quadro(NF.montar(corpo, { theta, dobra }, br));
}

export const ytSuspensao: Exercicio = {
  ficha: F,
  vistas: ['posterior', 'lateral'],
  quadro,
  // só o ombro de trás (a biblioteca não conta costas aqui: achado 5 da anatomia, correção de 04/11)
  papeis: { deltPost: 'p' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, quadril: (q) => q.esq.pelve.o },
};
