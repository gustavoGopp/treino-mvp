// Agachamento goblet com kettlebell, no motor novo. Os números vêm da ficha (../dados/movimentos/goblet-kettlebell.json).
// O movimento é o dos agachamentos aprovados (./agachar.ts): a posição do quadril sai da flexão do joelho pedida e do
// centro de massa (corpo + kettlebell) sobre o meio do pé. Os calcanhares ficam no chão (o cartão deste exercício não
// pede a anilha do goblet com halter). A pegada é a do afundo com kettlebell aprovado (./afundo-estatico.ts): cada mão
// segura uma haste da alça ("mãos nas laterais da alça"), a base para baixo e a bola encostada no peito, com os
// cotovelos apontando para baixo. Como no goblet aprovado, o kettlebell acompanha o tronco quando ele inclina (ele está
// apertado contra o peito, não pendurado): assim a bola fica encostada no peito embaixo também.
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/goblet-kettlebell.json';
import { formaDoKettlebell } from '../equipamento';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, noRef, paraRef } from '../vec';
import type { V3 } from '../vec';
import { agachar } from './agachar';
import { alturaDaPegadaDoKettlebell } from './dobrar-o-quadril';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

/**
 * Quanto o centro da bola (e o meio das mãos) fica à frente da base do pescoço, no referencial do tórax, para a bola
 * ficar à folga da ficha da pele do peito, medida na superfície do Boneco. O tórax não muda de forma no exercício (a
 * lombar fica neutra), então a conta é uma só, feita em pé, e fica guardada para o corpo do app (../calibragens.ts).
 */
function bolaNoPeito(corpo: Corpo): number {
  return calibragem(corpo, 'goblet-kettlebell:bola-no-peito', () => {
    const K = formaDoKettlebell();
    const solto = (k: Lado): PoseBraco => ({ polo: [0, 0, -1], mao: { polegar: [0, 0, 1] }, umero: [sinal(k) * 0.3, -0.95, 0], antebraco: [sinal(k) * 0.3, -0.95, 0] });
    const e = agachar(corpo, { joelho: f('joelho.cima'), tronco: f('tronco.cima'), lombar: 0, calcanhar: 0, apoio: 'meio', valgo: 0, pesMeiaDistancia: f('pes.meiaDistancia'), pesParaFora: f('pes.paraFora'), bracos: () => ({ R: solto('R'), L: solto('L') }) }).e;
    const pele = pontosDoBoneco(e)
      .filter((x) => x.parte === 'tronco' || x.parte === 'cintura' || x.parte === 'emendaDaCintura')
      .map((x) => paraRef(e.torax, x.p));
    const yBola = -f('maos.abaixoDeC7') - (alturaDaPegadaDoKettlebell() - K.centro);
    const folga = (z: number) => Math.min(...pele.map((p) => Math.hypot(p[0], p[1] - yBola, p[2] - z))) - K.R - f('kettlebell.folgaNoPeito');
    return resolver1(folga, 0, 60, 30);
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const K = formaDoKettlebell();
  const massa = obj('kettlebell', 'massa');
  // o calcanhar sai do chão conforme a pessoa desce e fica assim embaixo
  const calcanhar = erro === 'calcanhar' ? f('erro.calcanhar.sobe') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0;
  let base: V3 = [0, 0, 0],
    cima: V3 = [0, 1, 0],
    lado: V3 = [1, 0, 0];
  const r = agachar(corpo, {
    joelho: mix(f('joelho.cima'), f(erro === 'raso' ? 'erro.raso.joelho' : 'joelho.baixo'), u),
    tronco: mix(f('tronco.cima'), f(erro === 'tronco' ? 'erro.tronco.tronco' : 'tronco.baixo'), u),
    // no erro, o tronco só tomba se a lombar dobrar (o quadril já está quase no fim da flexão)
    lombar: erro === 'tronco' ? f('erro.tronco.lombar') * u : 0,
    calcanhar,
    apoio: calcanhar > 4 ? 'bola' : 'meio',
    valgo: 0,
    pesMeiaDistancia: f('pes.meiaDistancia'),
    pesParaFora: f('pes.paraFora'),
    bracos(t) {
      const T = t.torax;
      cima = T.y;
      lado = T.x;
      // o meio das mãos, na alça, abaixo da base do pescoço, e a bola encostada no peito (no referencial do tórax)
      const maos = noRef(T, [0, -f('maos.abaixoDeC7'), bolaNoPeito(corpo)]);
      base = add(maos, mul(cima, -alturaDaPegadaDoKettlebell()));
      const braco = (k: Lado): PoseBraco => {
        const s = sinal(k);
        // cada mão numa haste da alça, os cotovelos apontando para baixo, perto do corpo
        return { pegada: add(maos, mul(lado, s * K.meiaAlca)), polo: dirRef(T, [s * f('cotovelos.paraFora'), -1, 0.1]), mao: { polegar: dirRef(T, [0, 1, 0]), forma: 'pegada', diam: obj('kettlebell', 'alcaDiam') } };
      };
      return { R: braco('R'), L: braco('L'), carga: { massa, pos: add(base, mul(cima, K.centro)) } };
    },
  });
  const centro = add(base, mul(cima, K.centro));
  const meio: V3 = mul(add(r.e.lado.R.pegada, r.e.lado.L.pegada), 0.5);
  return {
    esq: r.e,
    prims: [chao(-70, 70, -70, 110), { t: 'esfera', c: centro, r: K.R, cls: 'ferro' }],
    pecas: [{ t: 'kettlebell', base, cima, lado }],
    fios: [],
    cargas: [{ massa, pos: centro }],
    marcas: { kettlebell: meio },
    // De lado, o kettlebell (no meio, entre os joelhos embaixo) e o tronco com as pernas de perto (um item só, pintado
    // pela média das partes) ficavam na mesma profundidade de pintura, e a bola e a haste de perto da alça saíam por
    // cima do joelho de perto, que está 17,6 cm mais perto de quem olha. O corpo vem um pouco para a frente na pintura,
    // ainda atrás do braço de perto (que segura a alça); a regra goblet-kettlebell-pintado-no-lugar mede, nos dois lados
    // e nas duas vistas.
    viesNaVista: { lateral: { corpo: VIES_DE_LADO } },
  };
}
/**
 * Quanto o corpo vem para a frente do kettlebell na pintura, de lado (cm de profundidade): a haste de perto da alça era
 * pintada 0,2 cm à frente do joelho de perto; com 4 cm, o joelho passa a ela com 3,8 cm de folga, e o braço de perto
 * continua 6,4 cm à frente do corpo.
 */
const VIES_DE_LADO = 4;

export const gobletKettlebell: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // os da biblioteca, os mesmos do goblet aprovado: quadríceps (principal); glúteos e adutores (secundários)
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho, kettlebell: (q) => q.marcas.kettlebell! },
};
