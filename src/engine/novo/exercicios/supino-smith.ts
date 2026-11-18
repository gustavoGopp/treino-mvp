// Supino reto no smith, no motor novo. Os números vêm da ficha (../dados/movimentos/supino-smith.json); a máquina, de
// ../pecas-de-cena/smith.ts (Life Fitness SSM: a guia inclina 7°); o corpo deita no banco reto como no supino com
// halteres aprovado (./supino-reto.ts: a bacia, a coluna, a cabeça apoiada, os pés no chão).
//
// A barra só anda na guia, então é o banco que fica no lugar certo embaixo dela: a máquina é posta de modo que a linha
// da guia passe pelo ponto onde a barra encosta no meio do peito (medido na pele do Boneco). A guia sobe 7° para o
// lado da cabeça: a barra sobe um pouco na direção dos ombros (a ficha da Life Fitness não diz para que lado; ver
// dados/objetos/smith.json). As mãos fecham na barra, à largura da ficha; o cotovelo aponta para onde a ficha pede
// (~50° do tronco) e o resto do braço sai do alcance. Em cima, a barra para onde o cotovelo ainda dobra 12°.
// No erro "Banco fora do lugar", o banco (e quem deita nele) fica mais para a cabeça e a barra desce na barriga.
import ficha from '../dados/movimentos/supino-smith.json';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { bancoReto, chao } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mix, noRef } from '../vec';
import type { V3 } from '../vec';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { cantosDoSmith, centroDaBarraDoSmith, massaDoSmith, smith } from '../pecas-de-cena/smith';
import { folgaDaBarraNaPele } from '../regras/smith';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const ANILHAS: IdAnilha[] = [`anilha${f('anilhas')}` as IdAnilha];
/** A guia sobe para o lado da cabeça (−z). */
const SOBE = -1 as const;

/** O tronco deitado no banco e as pernas com os pés no chão, como no supino com halteres aprovado. */
function deitado(corpo: Corpo) {
  const m = (id: string) => corpo.m(id);
  const zPelve = 24;
  const t = resolverTronco(corpo, { pelve: [0, obj('bancoReto', 'altura') + m('prof.nadega') * 0.47, zPelve], frente: -88, lombar: -4, cervical: 6, cabeca: 4 });
  const w = f('pes.meiaDistancia');
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, zPelve + m('coxa.comp') + 9], dir: [sinal(k) * 0.2, 0, 1] }, polo: [sinal(k) * 0.35, 1, 0.4] });
  return { t, pernas: { R: perna('R'), L: perna('L') } };
}

/**
 * A linha do meio do peito (a dos mamilos: `altura.peito` da tabela, abaixo de C7 em pé), no meio do tronco deitado,
 * mais `alem` cm para os pés.
 */
const linhaDoPeito = (corpo: Corpo, t: ReturnType<typeof resolverTronco>, alem = 0): V3 =>
  noRef(t.torax, [0, -(corpo.m('altura.cervical') - corpo.m('altura.peito')) - alem, 0]);

/** O corpo com as mãos na barra (centro em `barra`) e o plano do braço a `a` graus do tronco. */
function comBarra(corpo: Corpo, barra: V3, a: number): Esq {
  const { t, pernas } = deitado(corpo);
  const w = f('pegada.meia');
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return {
      pegada: add(barra, [s * w, 0, 0]),
      // o cotovelo aponta para fora e para os pés, a `a` graus do tronco (que aponta para +z, os pés), e um pouco para o chão
      polo: [s * Math.sin(a * rad), -0.2, Math.cos(a * rad)],
      mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: obj('smith', 'pegadaDiam') },
      prot: -f('escapula.retracao'),
      elev: -f('escapula.depressao'),
    };
  };
  return resolverMembros(t, { R: braco('R'), L: braco('L') }, pernas);
}

/**
 * Onde a barra fica embaixo: na linha `aFrente` cm além do meio do peito (0 no certo), na altura em que encosta de
 * leve na pele (afunda `barra.amassa`). Medido na superfície do Boneco, por tentativa (guardado para o corpo do app).
 */
function fundo(corpo: Corpo, aFrente: number): V3 {
  return calibragem(corpo, `supino-smith:fundo:${aFrente}`, () => {
    const { t } = deitado(corpo);
    const z = linhaDoPeito(corpo, t, f('barra.alemDaLinhaDoPeito'))[2] + aFrente;
    const e = comBarra(corpo, [0, 80, z], f('cotovelos.doTronco'));
    // desce de cima, de 1 em 1 cm, até a barra passar do ponto; depois acha o ponto entre os dois últimos passos
    const g = (yy: number) => folgaDaBarraNaPele(e, [0, yy, z], ['tronco', 'cintura']) + f('barra.amassa');
    let y0 = 100;
    while (g(y0 - 1) > 0 && y0 > 30) y0 -= 1;
    const y = resolver1(g, y0, y0 - 1, 30);
    return [0, y, z] as V3;
  });
}
/** Onde a linha da guia encontra o chão, com a barra passando por `p` (o ponto de baixo). */
const baseDaGuia = (p: V3): V3 => [p[0], 0, p[2] - SOBE * p[1] * Math.tan(obj('smith', 'guiaInclina') * rad)];

/** A altura da barra em cima: onde o cotovelo ainda dobra `cotovelo.cima` graus (guardada para o corpo do app). */
function alturaEmCima(corpo: Corpo, base: V3): number {
  return calibragem(corpo, 'supino-smith:cima', () =>
    resolver1((y) => comBarra(corpo, centroDaBarraDoSmith({ base, sobePara: SOBE }, y), f('cotovelos.doTronco')).lado.R.ang.cotovelo - f('cotovelo.cima'), fundo(corpo, 0)[1], 160, 30),
  );
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  // a máquina fica sempre no mesmo lugar em relação ao corpo certo; no erro do banco, o corpo e o banco ficam mais para a
  // cabeça, o que é o mesmo que a máquina mais para os pés
  const base = baseDaGuia(fundo(corpo, 0));
  const desloca = erro === 'banco' ? f('erro.banco.desloca') : 0;
  const baseAqui: V3 = [base[0], 0, base[2] + desloca];
  const yCima = alturaEmCima(corpo, base);
  const yFundo = erro === 'banco' ? fundo(corpo, desloca)[1] : fundo(corpo, 0)[1];
  const barra = centroDaBarraDoSmith({ base: baseAqui, sobePara: SOBE }, mix(yCima, yFundo, u));
  const a = mix(f('cotovelos.doTronco'), erro === 'T' ? f('erro.T.doTronco') : f('cotovelos.doTronco'), Math.min(1, u * 1.5));
  const e = comBarra(corpo, barra, a);
  const { t } = deitado(corpo);
  // o banco é posto pela cabeça, como no supino com halteres aprovado: o topo dela a `cabeca.folgaNoBanco` cm da ponta
  const zTopoDaCabeca = noRef(t.cabeca, [0, corpo.m('cabeca.tragionAoTopo'), 0])[2];
  const zBanco = zTopoDaCabeca - f('cabeca.folgaNoBanco') + obj('bancoReto', 'comp') / 2;
  const S = smith({
    base: baseAqui,
    sobePara: SOBE,
    barra: barra[1],
    trava: yFundo - f('trava.abaixo'),
    anilhas: ANILHAS,
    // o lado direito (o de perto, de lado) vai para trás do corpo: senão a guia, o carro e a anilha cobririam o peito e a mão
    atras: -1,
    // a máquina de frente para o fundo e de uma ponta da barra à outra (de cima, os rótulos ficam fora dela), cortada
    // acima da barra em cima e das anilhas
    noQuadro: cantosDoSmith({ base: baseAqui, sobePara: SOBE }, f('quadro.ate')),
  });
  const pecas: Peca[] = [{ t: 'bancoReto', x0: 0, z0: zBanco }, ...S.pecas];
  return {
    esq: e,
    prims: [chao(-90, 90, -90, 130), ...bancoReto(0, zBanco), ...S.prims],
    pecas,
    fios: [],
    cargas: [{ massa: massaDoSmith(ANILHAS), pos: barra }],
    marcas: { barra, guia: centroDaBarraDoSmith({ base: baseAqui, sobePara: SOBE }, barra[1]), trava: [0, yFundo - f('trava.abaixo'), 0], peito: linhaDoPeito(corpo, t) },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const supinoSmith: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // os da biblioteca, os mesmos do supino com halteres aprovado: peito (principal); ombro da frente e tríceps (secundários)
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's' },
  // só a barra: de lado, com o cotovelo junto, o nome do cotovelo não cabia e sumia (como no supino no chão)
  trajetorias: { barra: (q) => q.marcas.barra! },
};
