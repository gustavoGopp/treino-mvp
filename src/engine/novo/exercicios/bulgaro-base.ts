// O búlgaro (agachamento com o pé de trás elevado): o que as variações têm em comum. O pé da frente fica inteiro no
// chão; o peito do pé de trás apoia no banco, com o cadarço para baixo, e não sai de lá; o quadril desce reto até o
// joelho de trás ficar a poucos centímetros do chão. Cada variação traz a sua ficha de movimento e diz o que as mãos
// fazem: um halter na mão do lado da perna da frente e a outra mão na coluna da estação, ou as duas na cintura.
import { pontosDoBoneco } from '../boneco';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { bancoReto, chao, halter, torre } from '../pecas';
import type { Peca, Torre } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { mix, norm, paraRef } from '../vec';
import type { V3 } from '../vec';
import { afundar } from './afundar';
import { FRENTE, TRAS, maosNaCintura } from './afundo-estatico';

/** O que as mãos fazem: um halter de um lado e a outra mão na coluna, ou as duas na cintura (peso do corpo). */
export type MaosDoBulgaro = 'halter-e-apoio' | 'cintura';
const rad = Math.PI / 180;
const macio = (x: number) => suave(Math.max(0, Math.min(1, x)));

interface Apoio {
  /** Quanto a ponta do pé de trás aponta para baixo com o peito do pé deitado no banco (graus). */
  inclina: number;
  /** A altura do tornozelo de trás acima do banco, nessa posição (cm). */
  tornozeloAcima: number;
}
const APOIOS = new WeakMap<Corpo, Apoio>();

export function criarBulgaro(fichaJson: unknown, maos: MaosDoBulgaro): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro; alturaDoApoio: number } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const CACHE = new WeakMap<Corpo, { cima: number; cimaPerto: number; baixo: number }>();
  const alturaDoApoio = obj('bancoReto', 'altura');
  const zTornozelo = -f('peDeTras.tornozeloAtrasDoQuadril');
  const zBorda = zTornozelo + f('peDeTras.tornozeloDaBorda');
  const sT = sinal(TRAS);

  /** A coluna da estação, ao lado da mão de apoio, virada para a pessoa. */
  const coluna = (): Torre => ({ base: [sT * (f('apoio.maoAoLado') + obj('torre', 'prof') * 0.08), 0, f('apoio.maoAFrenteDoQuadril')], frente: [-sT, 0, 0], alturaDaPolia: obj('torre', 'poliaMax') });

  function pose(corpo: Corpo, quadrilY: number, A: Apoio, o: { tronco?: number; valgo?: number; perto?: number; calcanhar?: number } = {}): Esq {
    const a = A.inclina * rad;
    return afundar(corpo, {
      frente: FRENTE,
      quadrilY,
      quadrilZ: 0,
      tronco: o.tronco ?? f('tronco'),
      pesMeiaDistancia: f('pes.meiaDistancia'),
      tornozeloDaFrente: f('peDaFrente.aFrenteDoQuadril') - (o.perto ?? 0),
      calcanharDaFrente: o.calcanhar ?? 0,
      bolaDeTras: 0,
      apoioDeTras: 0,
      calcanharDeTras: 0,
      // o peito do pé de trás deitado no banco: o tornozelo fica parado e os dedos apontam para trás
      pernaDeTras: { tornozelo: [sT * f('pes.meiaDistancia'), alturaDoApoio + A.tornozeloAcima, zTornozelo], peDir: [0, -Math.sin(a), -Math.cos(a)], polo: [0, -1, 0.4] },
      valgo: o.valgo ?? 0,
      bracos(t) {
        const braco = (k: Lado): PoseBraco => {
          const s = sinal(k);
          if (maos === 'cintura') return maosNaCintura(t, k, f('maos.naCintura.acima'));
          if (k === TRAS) {
            // a mão livre segura o trilho da coluna, só para equilibrar: fica parada enquanto o corpo sobe e desce
            return { pegada: [s * f('apoio.maoAoLado'), f('apoio.maoAltura'), f('apoio.maoAFrenteDoQuadril')], polo: [s * 0.25, -1, -0.5], mao: { polegar: [0, 1, 0], forma: 'pegada', diam: 5.5 } };
          }
          // o braço do halter pende ao lado do corpo, um pouco afastado para o halter não bater na coxa
          const fora = f('bracos.paraFora') * rad;
          const desce: V3 = norm([s * Math.sin(fora), -Math.cos(fora), 0]);
          return { umero: desce, antebraco: norm([s * Math.sin(fora), -Math.cos(fora), 0.03]), polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'pegada', diam: obj('halter', 'caboDiam') } };
        };
        return { R: braco('R'), L: braco('L') };
      },
    });
  }

  /**
   * Como o pé de trás deita no banco. O pé é uma cunha (alto no peito do pé, baixo nos dedos): com o cadarço para
   * baixo, ele descansa no peito do pé e nos dedos ao mesmo tempo. A inclinação e a altura do tornozelo saem da forma
   * do pé do Boneco, e não de um número escolhido.
   */
  function apoio(corpo: Corpo): Apoio {
    let A = APOIOS.get(corpo);
    if (A) return A;
    const e = pose(corpo, 70, { inclina: 20, tornozeloAcima: 8 });
    const L = e.lado[TRAS];
    const torn = paraRef(L.pe, L.tornozelo);
    // os pontos da superfície do pé de trás, no sistema do próprio pé, a partir do tornozelo
    const pts = pontosDoBoneco(e)
      .filter((x) => x.parte === 'pe')
      .map((x) => paraRef(L.pe, x.p))
      .filter((l) => Math.abs(l[0]) < 8 && l[1] > -2 && l[1] < 14)
      .map((l): [number, number] => [l[1] - torn[1], l[2] - torn[2]]);
    // a altura de cada ponto acima do tornozelo, com o pé de sola para cima e os dedos apontando `g` graus para baixo
    const maisBaixo = (g: number) => {
      let min = 1e9,
        z = 0;
      for (const [y, zz] of pts) {
        const h = -y * Math.cos(g * rad) - zz * Math.sin(g * rad);
        if (h < min) {
          min = h;
          z = zz;
        }
      }
      return { min, z };
    };
    const meio = (Math.min(...pts.map((p) => p[1])) + Math.max(...pts.map((p) => p[1]))) / 2;
    // com pouca inclinação o pé apoia no peito do pé (perto do tornozelo); com muita, nos dedos: o descanso é a virada
    const inclina = resolver1((g) => maisBaixo(g).z - meio, 0, 60);
    A = { inclina, tornozeloAcima: -maisBaixo(inclina).min };
    APOIOS.set(corpo, A);
    return A;
  }

  /** As alturas do quadril em cima (o joelho da frente quase estendido) e embaixo (o joelho de trás perto do chão). */
  function calibrar(corpo: Corpo) {
    let c = CACHE.get(corpo);
    if (c) return c;
    const A = apoio(corpo);
    const raioDoJoelho = corpo.secoes.coxa![corpo.secoes.coxa!.length - 1]!.b;
    const baixo = resolver1((y) => pose(corpo, y, A).lado[TRAS].joelho[1] - raioDoJoelho - f('joelhoDeTras.aoChao'), 25, 70);
    const cima = resolver1((y) => f('joelho.cima') - pose(corpo, y, A).lado[FRENTE].ang.joelho, 95, baixo);
    // no erro do pé perto do banco, a pessoa também começa com o joelho da frente quase estendido
    const cimaPerto = 'erro.perto.maisPerto' in F.param ? resolver1((y) => f('joelho.cima') - pose(corpo, y, A, { perto: f('erro.perto.maisPerto') }).lado[FRENTE].ang.joelho, 95, baixo) : cima;
    c = { cima, cimaPerto, baixo };
    CACHE.set(corpo, c);
    return c;
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const A = apoio(corpo);
    const c = calibrar(corpo);
    const fundo = erro === 'raso' ? f('erro.raso.fracao') : 1;
    const perto = erro === 'perto';
    const e = pose(corpo, mix(perto ? c.cimaPerto : c.cima, c.baixo, u * fundo), A, {
      valgo: erro === 'valgo' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0,
      perto: perto ? f('erro.perto.maisPerto') : 0,
      calcanhar: perto ? f('erro.perto.calcanhar') * macio(u) : 0,
    });
    const zBanco = zBorda - obj('bancoReto', 'comp') / 2;
    // do banco, o quadro precisa mostrar a ponta onde o pé apoia (62 cm, como a animação de hoje); o resto pode ser cortado
    const pecas: Peca[] = [{ t: 'bancoReto', x0: 0, z0: zBanco, pontaNoQuadro: 62 }];
    const q: Quadro = { esq: e, prims: [chao(-90, 90, -190, 90), ...bancoReto(0, zBanco)], pecas, fios: [], cargas: [], marcas: { apoioDoPe: [0, alturaDoApoio, zTornozelo] } };
    if (maos === 'halter-e-apoio') {
      const centro = e.lado[FRENTE].pegada,
        eixo: V3 = [0, 0, 1];
      const t = coluna();
      q.prims.push(...halter(centro, eixo, 0.4), ...torre(t, 0));
      pecas.push({ t: 'halter', centro, eixo }, { t: 'torre', torre: t, subida: 0, cenario: true });
      q.marcas.maoDeApoio = e.lado[TRAS].pegada;
      q.cargas.push({ massa: f('carga'), pos: centro });
      q.marcas.halter = centro;
    }
    return q;
  }
  return { ficha: F, quadro, alturaDoApoio };
}
