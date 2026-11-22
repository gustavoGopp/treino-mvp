// Agachamento com 2 halteres ao lado do corpo, no motor novo. Os números vêm da ficha
// (../dados/movimentos/agachamento-halteres.json). O movimento é o dos agachamentos aprovados (./agachar.ts): a posição
// do quadril sai da flexão do joelho pedida e do centro de massa (corpo + halteres) sobre o meio do pé. Os braços
// pendem estendidos e cada halter pende na vertical, com o cabo para a frente; o braço abre, no plano de frente, só o
// que precisa para o halter passar por fora da perna (a folga da ficha até a pele da coxa ou da canela). Abrir o braço
// de lado não muda o centro de massa para a frente nem para trás: o quadril fica onde o equilíbrio o põe.
import ficha from '../dados/movimentos/agachamento-halteres.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mix, mul, noRef, norm, paraRef } from '../vec';
import type { V3 } from '../vec';
import { agachar } from './agachar';
import { folgaDasPernas } from './dobrar-o-quadril';
import type { Esfera } from './dobrar-o-quadril';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

/** As direções do braço e do antebraço com o braço aberto `abre` graus para o lado; o cotovelo dobra um pouco para a frente. */
function direcoes(k: Lado, abre: number): { umero: V3; antebraco: V3 } {
  const s = sinal(k),
    a = abre * rad,
    c = f('cotovelo') * rad;
  const desce: V3 = [s * Math.sin(a), -Math.cos(a), 0];
  return { umero: desce, antebraco: norm(add(mul(desce, Math.cos(c)), [0, 0, Math.sin(c)])) };
}
/** O centro da pegada para um ombro e uma abertura do braço. */
function pegadaEm(corpo: Corpo, ombro: V3, k: Lado, abre: number): V3 {
  const d = direcoes(k, abre);
  return add(add(ombro, mul(d.umero, corpo.m('braco.comp'))), mul(d.antebraco, corpo.m('antebraco.comp') + corpo.m('mao.punhoAoCentroDaPegada')));
}
/** As duas cabeças do halter (cabo para a frente), cada uma como três esferas, para a conta da folga até as pernas. */
function esferasDoHalter(centro: V3): Esfera[] {
  const ra = obj('halter', 'cabecaLargura') / 2,
    c0 = obj('halter', 'caboComp') / 2,
    c1 = obj('halter', 'comp') / 2;
  const out: Esfera[] = [];
  for (const lado of [-1, 1]) for (const fr of [0.2, 0.5, 0.8]) out.push({ c: add(centro, [0, 0, lado * (c0 + (c1 - c0) * fr)]), r: ra });
  return out;
}
/** Quanto o braço abre para o halter ficar à folga pedida da perna, com o tronco e as pernas já no lugar. */
function aberturaRente(e: Esq, k: Lado): number {
  const g = (a: number) => folgaDasPernas(e, esferasDoHalter(pegadaEm(e.corpo, e.lado[k].ombro, k, a))) - f('carga.folga');
  return resolver1(g, -5, 45, 30);
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  // o calcanhar sai do chão conforme a pessoa desce e fica assim embaixo
  const calcanhar = erro === 'calcanhar' ? f('erro.calcanhar.sobe') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0;
  const massa = f('carga');
  /**
   * O agachamento com os braços abertos `abre` graus e o meio dos dois halteres em `meio` (no referencial do tórax:
   * no mesmo quadro, a inclinação do tronco é dada, e só o quadril anda de uma passada para a outra).
   */
  const agachado = (abre: Record<Lado, number>, meio: V3 | null) =>
    agachar(corpo, {
      joelho: mix(f('joelho.cima'), f('joelho.baixo'), u),
      tronco: mix(f('tronco.cima'), f(erro === 'tronco' ? 'erro.tronco.tronco' : 'tronco.baixo'), u),
      // no erro, a coluna dobra para o tronco alcançar o fundo
      lombar: erro === 'tronco' ? f('erro.tronco.lombar') * u : 0,
      valgo: erro === 'valgo' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0,
      calcanhar,
      apoio: calcanhar > 4 ? 'bola' : 'meio',
      pesMeiaDistancia: f('pes.meiaDistancia'),
      pesParaFora: f('pes.paraFora'),
      bracos(t) {
        const braco = (k: Lado): PoseBraco => ({ ...direcoes(k, abre[k]), polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'pegada', diam: obj('halter', 'caboDiam') } });
        // os dois halteres contam no equilíbrio pelo meio deles (na primeira passada, embaixo da base do pescoço)
        const pos = meio ? noRef(t.torax, meio) : add(t.torax.o, [0, -(corpo.m('braco.comp') + corpo.m('antebraco.comp')), 0]);
        return { R: braco('R'), L: braco('L'), carga: { massa: 2 * massa, pos } };
      },
    });
  // primeiro com os braços pendendo retos, para achar os ombros e as pernas; depois o braço abre o que precisa para o
  // halter passar por fora da perna (duas passadas bastam: a clavícula acompanha o braço e o ombro anda um pouco)
  let r = agachado({ R: 0, L: 0 }, null);
  for (let i = 0; i < 2; i++) {
    const meio = paraRef(r.e.torax, mul(add(r.e.lado.R.pegada, r.e.lado.L.pegada), 0.5));
    r = agachado({ R: aberturaRente(r.e, 'R'), L: aberturaRente(r.e, 'L') }, meio);
  }
  const e = r.e;
  const q: Quadro = { esq: e, prims: [chao(-70, 70, -70, 110)], pecas: [], fios: [], cargas: [], marcas: {} };
  const pecas: Peca[] = [];
  for (const k of ['R', 'L'] as Lado[]) {
    // o halter pende na vertical, com o cabo apontando para a frente (pegada neutra)
    const centro = e.lado[k].pegada,
      eixo: V3 = [0, 0, 1];
    q.prims.push(...halter(centro, eixo, 0.4));
    pecas.push({ t: 'halter', centro, eixo });
    q.cargas.push({ massa, pos: centro });
  }
  q.pecas = pecas;
  q.marcas = { halter: e.lado.R.pegada };
  return q;
}

export const agachamentoHalteres: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // os da biblioteca, os mesmos dos agachamentos aprovados: quadríceps (principal); glúteos e adutores (secundários)
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho, halter: (q) => q.marcas.halter! },
};
