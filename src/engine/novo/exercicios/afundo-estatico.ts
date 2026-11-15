// O afundo estático (com o peso do corpo, com halteres e os próximos): o que as variações têm em comum. Passo largo,
// o pé da frente inteiro no chão e o de trás na ponta; o quadril desce reto até o joelho de trás ficar a poucos
// centímetros do chão. Cada variação traz a sua ficha de movimento e diz o que as mãos fazem.
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, noRef, norm } from '../vec';
import type { V3 } from '../vec';
import { formaDoKettlebell } from '../equipamento';
import { resolverTronco } from '../esqueleto';
import { afundar } from './afundar';

type Tronco = ReturnType<typeof resolverTronco>;

export const FRENTE: Lado = 'R',
  TRAS: Lado = 'L';
/** O que as mãos fazem: na cintura (peso do corpo) ou segurando um halter de cada lado, com os braços pendendo. */
export type MaosDoAfundo = 'cintura' | 'halteres' | 'kettlebell';

export function criarAfundoEstatico(fichaJson: unknown, maos: MaosDoAfundo): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const tem = (id: string) => id in F.param;
  const rad = Math.PI / 180;
  const CACHE = new WeakMap<Corpo, { cima: number; baixo: number }>();

  /** A altura do meio das hastes da alça acima da base do kettlebell: é onde as mãos seguram. */
  const alturaDaPegada = () => {
    const K = formaDoKettlebell();
    return (K.topoDaBola + K.altura - K.rAlca) / 2;
  };
  /** O centro da base do kettlebell: a bola encosta no peito, com as mãos na altura que a ficha dá. */
  const baseDoKettlebell = (t: Tronco): V3 => {
    const K = formaDoKettlebell();
    const maoNoPeito = noRef(t.torax, [0, -f('maos.abaixoDeC7'), t.corpo.m('prof.peito') * 0.68 + K.R + f('kettlebell.folgaNoPeito')]);
    return [maoNoPeito[0], maoNoPeito[1] - alturaDaPegada(), maoNoPeito[2]];
  };
  function pose(corpo: Corpo, quadrilY: number, u: number, o: { tronco?: number; valgo?: number } = {}): Esq {
    const m = (id: string) => corpo.m(id);
    return afundar(corpo, {
      frente: FRENTE,
      quadrilY,
      quadrilZ: 0,
      tronco: o.tronco ?? f('tronco'),
      pesMeiaDistancia: f('pes.meiaDistancia'),
      tornozeloDaFrente: f('peDaFrente.aFrenteDoQuadril'),
      bolaDeTras: -f('peDeTras.atrasDoQuadril'),
      apoioDeTras: 0,
      // o calcanhar de trás sobe mais conforme o joelho desce, quando a ficha dá os dois valores
      calcanharDeTras: tem('peDeTras.calcanhar.cima') ? mix(f('peDeTras.calcanhar.cima'), f('peDeTras.calcanhar'), u) : f('peDeTras.calcanhar'),
      valgo: o.valgo ?? 0,
      bracos(t) {
        const braco = (k: Lado): PoseBraco => {
          const s = sinal(k);
          if (maos === 'cintura')
            // mãos na cintura, cotovelos para fora (ficam livres para apoiar numa parede, diz a ficha)
            return { pegada: noRef(t.pelve, [s * (m('largura.quadril') / 2 + 1.5), f('maos.naCintura.acima'), 1]), polo: dirRef(t.pelve, [s, -0.2, -0.5]), mao: { polegar: dirRef(t.pelve, [0, 0.6, -0.8]), forma: 'relaxada' } };
          if (maos === 'kettlebell') {
            // Kettlebell junto ao peito, com a base para baixo: cada mão segura uma haste da alça ("mãos nos lados
            // da alça"), os cotovelos perto do corpo. O kettlebell pende na vertical e a bola encosta no peito.
            const K = formaDoKettlebell();
            const pegada = add(baseDoKettlebell(t), [s * K.meiaAlca, alturaDaPegada(), 0]);
            return { pegada, polo: dirRef(t.torax, [s * 0.25, -1, 0.1]), mao: { polegar: [0, 1, 0], forma: 'pegada', diam: obj('kettlebell', 'alcaDiam') } };
          }
          // braços pendendo ao lado do corpo, um pouco afastados para o halter não bater na coxa; o halter pende na
          // vertical, com o cabo apontando para a frente (pegada neutra)
          const fora = f('bracos.paraFora') * rad;
          const desce: V3 = norm([s * Math.sin(fora), -Math.cos(fora), 0]);
          return { umero: desce, antebraco: norm([s * Math.sin(fora), -Math.cos(fora), 0.03]), polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'pegada', diam: obj('halter', 'caboDiam') } };
        };
        return { R: braco('R'), L: braco('L') };
      },
    });
  }
  /** As alturas do quadril em cima (o joelho da frente quase estendido) e embaixo (o joelho de trás perto do chão). */
  function calibrar(corpo: Corpo) {
    let c = CACHE.get(corpo);
    if (c) return c;
    const raioDoJoelho = corpo.secoes.coxa![corpo.secoes.coxa!.length - 1]!.b;
    const baixo = resolver1((y) => pose(corpo, y, 1).lado[TRAS].joelho[1] - raioDoJoelho - f('joelhoDeTras.aoChao'), 35, 75);
    const cima = resolver1((y) => f('joelho.cima') - pose(corpo, y, 0).lado[FRENTE].ang.joelho, 100, baixo);
    c = { cima, baixo };
    CACHE.set(corpo, c);
    return c;
  }
  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const c = calibrar(corpo);
    const fundo = erro === 'raso' ? f('erro.raso.fracao') : 1;
    const e = pose(corpo, mix(c.cima, c.baixo, u * fundo), u * fundo, {
      tronco: erro === 'tronco' ? mix(f('tronco'), f('erro.tronco'), u) : undefined,
      valgo: erro === 'valgo' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0,
    });
    const q: Quadro = { esq: e, prims: [chao(-70, 70, -90, 90)], pecas: [], fios: [], cargas: [], marcas: {} };
    if (maos === 'kettlebell') {
      const K = formaDoKettlebell();
      // a base fica debaixo do meio das duas mãos (a alça passa pelas duas mãos; a bola fica embaixo do meio)
      const meio: V3 = [(e.lado.R.pegada[0] + e.lado.L.pegada[0]) / 2, (e.lado.R.pegada[1] + e.lado.L.pegada[1]) / 2, (e.lado.R.pegada[2] + e.lado.L.pegada[2]) / 2];
      const base: V3 = [meio[0], meio[1] - alturaDaPegada(), meio[2]];
      const centro: V3 = [base[0], base[1] + K.centro, base[2]];
      q.prims.push({ t: 'esfera', c: centro, r: K.R, cls: 'ferro' });
      q.pecas = [{ t: 'kettlebell', base, cima: [0, 1, 0], lado: [1, 0, 0] }];
      q.cargas.push({ massa: obj('kettlebell', 'massa'), pos: centro });
      q.marcas = { kettlebell: meio };
    }
    if (maos === 'halteres') {
      const pecas: Peca[] = [];
      for (const k of ['R', 'L'] as Lado[]) {
        const centro = e.lado[k].pegada,
          eixo: V3 = [0, 0, 1];
        q.prims.push(...halter(centro, eixo, 0.4));
        pecas.push({ t: 'halter', centro, eixo });
        q.cargas.push({ massa: f('carga'), pos: centro });
      }
      q.pecas = pecas;
      q.marcas = { halter: e.lado[FRENTE].pegada };
    }
    return q;
  }
  return { ficha: F, quadro };
}
