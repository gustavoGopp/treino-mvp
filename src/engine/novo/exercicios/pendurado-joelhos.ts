// A elevação de joelhos pendurado (na barra fixa) e sustentado nas paralelas, no motor novo: o que as duas têm em
// comum. O corpo pende das mãos (núcleo ./pendurado.ts), com os braços estendidos e os ombros firmes; o que se move é a
// parte de baixo do corpo:
//  - o quadril dobra e os joelhos sobem (`quadril.fim`, `joelho.fim`: em que ponto da subida cada um chega ao topo);
//  - no fim (a partir de `pelve.inicio`), a pelve enrola: a bacia gira para trás e a lombar dobra o mesmo tanto (como
//    no abdominal invertido, ./abdominal-invertido.ts), e o tórax não muda. É o abdômen trabalhando, e não só o quadril;
//  - o corpo fica parado: em cada quadro, o centro de massa fica na vertical das mãos (as pernas sobem à frente, e o
//    corpo vai um pouco para trás, com os braços inclinados).
// Na barra, as mãos ficam acima dos ombros (pegada pronada); nas paralelas, abaixo, com o polegar para a frente.
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import { daFicha } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { alturaDaBarra, estacaoDeBarra, raioDaBarra } from '../pecas-de-cena/barra-fixa';
import { alturaDasParalelas, eixosDasParalelas, meioVaoDasParalelas, paralelas, raioDasParalelas } from '../pecas-de-cena/paralelas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { norm } from '../vec';
import type { V3 } from '../vec';
import { maosNaBarra, mix, noPrumo, pernasSoltas, trecho } from './pendurado';
import type { Apoio, Forma } from './pendurado';

export type ApoioDasMaos = 'barra' | 'paralelas';

export function criarElevacaoDeJoelhos(F: Ficha, onde: ApoioDasMaos) {
  const f = daFicha(F);
  const acima = onde === 'barra';
  const apoio = (corpo: Corpo): Apoio =>
    acima
      ? { maos: maosNaBarra(f('pegada.largura') * corpo.m('largura.biacromial'), alturaDaBarra(), 0), diam: obj('barraFixa', 'diam') }
      : { maos: maosNaBarra(2 * meioVaoDasParalelas(), alturaDasParalelas(), 0), diam: obj('paralelas', 'diam') };

  function forma(u: number, erro?: string): Forma {
    const q = trecho(u, 0, f('quadril.fim')),
      j = trecho(u, 0, f('joelho.fim')),
      p = trecho(u, f('pelve.inicio'), 1);
    const joelho = mix(f('joelho'), f('joelho.topo'), j);
    let quadril = mix(f('quadril'), f('quadril.topo'), q),
      enrola = f('pelve.enrola') * p,
      lombar = 0,
      elev = f('escapula.ativa'),
      cervical = 0;
    if (erro === 'pelve') enrola = 0;
    if (erro === 'balanco') {
      // o embalo: as pernas vão para trás e a lombar arqueia no começo, e a pelve quase não enrola
      const w = (1 - u) * (1 - u);
      quadril += f('erro.balanco.quadril') * w;
      lombar += f('erro.balanco.lombar') * w;
      enrola *= f('erro.balanco.pelve');
    }
    if (erro === 'ombros') {
      // os ombros sobem até as orelhas e o corpo afunda entre as barras
      elev = mix(f('escapula.ativa'), f('erro.ombros.elev'), trecho(u, 0, 0.5));
      cervical = f('erro.ombros.pescoco') * trecho(u, 0, 0.5);
    }
    const polo = (k: Lado): V3 => norm([sinal(k) * f('polo.fora'), f('polo.cima'), f('polo.frente')]);
    const polegar = (k: Lado): V3 => (acima ? [-sinal(k), 0, 0] : [0, 0, 1]);
    return {
      frente: f('tronco') * q - enrola,
      lombar: enrola + lombar,
      cervical: f('pescoco') + cervical,
      pernas: pernasSoltas({ quadril, joelho, plantar: f('pe.plantar'), juntas: f('pernas.juntas') }),
      bracos: (k) => ({ polo: polo(k), polegar: polegar(k), elev }),
    };
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const a = apoio(corpo);
    const balanco = erro === 'balanco' ? f('erro.balanco.z') * Math.sin(Math.PI * u) : 0;
    const e = noPrumo(corpo, a, forma(u, erro), { cotovelo: f('cotovelo'), balanco }, acima).e;
    if (acima) {
      const est = estacaoDeBarra(0, [a.maos.R[0], a.maos.L[0]]);
      const xM = obj('barraFixa', 'larg') / 2;
      return {
        esq: e,
        prims: est.prims,
        pecas: [est.estrutura, est.barra],
        fios: [],
        cargas: [],
        marcas: { 'barra.R': a.maos.R, 'barra.L': a.maos.L, 'eixo.a': [-xM, alturaDaBarra(), 0], 'eixo.b': [xM, alturaDaBarra(), 0], raio: [raioDaBarra(), 0, 0] },
        vies: { maoR: 1, maoL: 1 },
      };
    }
    const par = paralelas(0);
    const eixo = eixosDasParalelas(0);
    return {
      esq: e,
      prims: par.prims,
      pecas: [par.peca],
      fios: [],
      cargas: [],
      marcas: { 'barra.R': a.maos.R, 'barra.L': a.maos.L, 'eixo.R.a': eixo.R[0], 'eixo.R.b': eixo.R[1], 'eixo.L.a': eixo.L[0], 'eixo.L.b': eixo.L[1], raio: [raioDasParalelas(), 0, 0] },
      vies: { maoR: 1, maoL: 1 },
    };
  }
  return { quadro };
}
