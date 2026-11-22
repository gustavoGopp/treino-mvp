// Regras medidas da barra e do mergulho assistidos no graviton (../exercicios/barra-fixa-graviton.ts e
// ../exercicios/mergulho-graviton.ts; o corpo ajoelhado, ../exercicios/graviton.ts; a máquina,
// ../pecas-de-cena/graviton.ts). Recebem os quadros do começo até o fim da primeira fase com movimento. O limite vem do
// que a ficha da técnica e o cartão pedem, não do que a pose deu. As mãos nas alças, o corpo sem atravessá-las e o
// movimento dos braços são medidos pelas regras da barra fixa e do mergulho aprovados (./pendurado.ts, ./mergulho.ts).
//
// Marcas que os quadros dão: `almofada` (o ponto do topo da almofada debaixo do centro do joelho), `almofadaAo` (a
// direção da almofada, para trás) e `almofadaNormal` (para cima, perpendicular a ela), `alavanca` (o ângulo da alavanca
// agora, o do batente de cima e o raio do came), `pilha` (x: quanto as placas subiram), `barra.R` e `raio` (as alças).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS } from '../esqueleto';
import { barraFixaGraviton } from '../exercicios/barra-fixa-graviton';
import { mergulhoGraviton } from '../exercicios/mergulho-graviton';
import type { Exercicio, Quadro } from '../movimento';
import { obj } from '../tabelas';
import { dot, sub } from '../vec';
import { estofadoEmCaixa, nadaPorBaixo, pinturaNasVistas, textoDaPintura } from './pintura-sobre-o-estofado';
import type { EstofadoMedido, ParteMedida } from './pintura-sobre-o-estofado';

const rad = Math.PI / 180;
const g = (id: string) => obj('graviton', id);
const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;

/** A pele de cada perna contra o topo da almofada, só sobre ela: a folga menor (negativa = para dentro do estofado). */
function canelasNaAlmofada(q: Quadro): Record<'R' | 'L', number> {
  const P = q.marcas.almofada!,
    ao = q.marcas.almofadaAo!,
    n = q.marcas.almofadaNormal!;
  const out = { R: 1e9, L: 1e9 };
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if (parte !== 'canela' && parte !== 'coxa' && parte !== 'pe') continue;
    const v = sub(p, P);
    const ao1 = dot(v, ao);
    if (ao1 < -g('almofadaAFrente') || ao1 > g('almofadaComp') - g('almofadaAFrente') || Math.abs(p[0]) > g('almofadaLarg') / 2) continue;
    const k = p[0] < 0 ? 'R' : 'L';
    out[k] = Math.min(out[k], dot(v, n));
  }
  return out;
}

/** A almofada dos joelhos no quadro (a caixa de estofado da conferência). */
function almofadaDoQuadro(x: Quadro): EstofadoMedido {
  const c = x.prims.find((p) => p.t === 'caixa' && p.cls === 'estofado');
  if (!c || c.t !== 'caixa') throw new Error('graviton: o quadro não tem a almofada');
  return estofadoEmCaixa(c);
}
const PERNAS: ParteMedida[] = (['pernaR', 'pernaL'] as const).flatMap((grupo) => ['coxa', 'canela', 'pe'].map((volume) => ({ grupo, volume })));
/**
 * As duas pernas, deitadas na almofada, pintadas por cima dela (acréscimo de 18/11, a auditoria da fase C): em cada vista
 * do exercício e na de cada erro, os anéis da coxa, da canela e do pé de cada lado que ficam na frente da almofada e por
 * cima dela na tela não podem ficar por baixo dela na pintura (de três quartos de trás, a canela e o pé de longe sumiam
 * embaixo da ponta da almofada no mergulho).
 */
const pernasPorCimaDaAlmofada =
  (ex: () => Exercicio): Regra =>
  (q, corpo) => {
    const r = pinturaNasVistas(ex(), q, corpo, almofadaDoQuadro, PERNAS);
    return { medido: `anéis das pernas pintados por baixo da almofada, de quantos ficam na frente dela e por cima dela na tela (o pior quadro), ${textoDaPintura(r)}`, ok: nadaPorBaixo(r) };
  };

export const REGRAS_GRAVITON: Record<string, Regra> = {
  'mergulho-graviton-pernas-por-cima-da-almofada': pernasPorCimaDaAlmofada(() => mergulhoGraviton),
  'barra-fixa-graviton-pernas-por-cima-da-almofada': pernasPorCimaDaAlmofada(() => barraFixaGraviton),
  'graviton-joelhos-na-almofada': (q) => {
    const folgas: number[] = [];
    let anda = 0;
    const d0 = LADOS.map((k) => dot(sub(primeiro(q).esq.lado[k].joelho, primeiro(q).marcas.almofada!), primeiro(q).marcas.almofadaAo!));
    q.forEach((x, i) => {
      LADOS.forEach((k, j) => (anda = Math.max(anda, Math.abs(dot(sub(x.esq.lado[k].joelho, x.marcas.almofada!), x.marcas.almofadaAo!) - d0[j]!))));
      if (i % 3 && i !== q.length - 1) return;
      const c = canelasNaAlmofada(x);
      folgas.push(c.R, c.L);
    });
    const [a, b] = faixa(folgas);
    return {
      medido: `a frente das canelas fica de ${f1(a)} a ${f1(b)} cm do topo da almofada (negativo: amassa o estofado), nas duas pernas e em todos os quadros; o joelho anda ${f1(anda)} cm ao longo da almofada`,
      ok: a >= -2.5 && b <= 1 && anda <= 0.5,
    };
  },
  'graviton-pilha-sobe-quando-a-almofada-desce': (q) => {
    // a pilha sobe o arco do came (o raio vezes o quanto a alavanca desceu desde o batente de cima)
    const erro = Math.max(...q.map((x) => Math.abs(x.marcas.pilha![0] - Math.max(0, x.marcas.alavanca![1] - x.marcas.alavanca![0]) * rad * x.marcas.alavanca![2])));
    const folgaDoBatente = Math.min(...q.map((x) => x.marcas.alavanca![1] - x.marcas.alavanca![0]));
    const y = q.map((x) => x.marcas.almofada![1]),
      p = q.map((x) => x.marcas.pilha![0]);
    const iBaixo = y.indexOf(Math.min(...y)),
      iAlto = y.indexOf(Math.max(...y));
    const ok = erro <= 0.1 && folgaDoBatente >= 1 && p[iBaixo]! >= p[iAlto]! + 2;
    return {
      medido: `com a almofada no ponto mais baixo (${f1(y[iBaixo]!)} cm do chão), as placas ficam ${f1(p[iBaixo]!)} cm acima do repouso; no mais alto (${f1(y[iAlto]!)} cm), ${f1(p[iAlto]!)} cm. A alavanca fica no mínimo ${f1(folgaDoBatente)}° abaixo do batente de cima; a subida difere do arco do came em até ${f1(erro)} cm`,
      ok,
    };
  },
  'graviton-corpo-parado': (q) => {
    // parado: a bacia anda quase só na vertical (o caminho para a frente e para trás é pouco perto do que ela sobe)
    const [za, zb] = faixa(q.map((x) => x.esq.pelve.o[2])),
      [ya, yb] = faixa(q.map((x) => x.esq.pelve.o[1]));
    return { medido: `a bacia anda ${f1(yb - ya)} cm na vertical e ${f1(zb - za)} cm para a frente e para trás`, ok: zb - za <= 0.2 * (yb - ya) };
  },
  'graviton-queixo-acima-da-alca': (q) => {
    const x = ultimo(q);
    const r = x.marcas.raio![0];
    const topo = x.marcas['barra.R']![1] + r;
    const qx = x.marcas.queixo![1] - topo;
    // o peito: a pele do tronco mais à frente, entre 25 cm abaixo das alças e a altura delas, contra a linha delas (as
    // alças são duas, uma de cada lado: o peito pode passar da linha entre elas)
    let frente = -1e9;
    for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'tronco' && p[1] >= topo - 25 && p[1] <= topo) frente = Math.max(frente, p[2]);
    const d = frente - x.marcas['barra.R']![2];
    return { medido: `no topo, o queixo fica ${f1(Math.abs(qx))} cm ${qx >= 0 ? 'acima' : 'abaixo'} do alto das alças e a frente do peito fica ${f1(Math.abs(d))} cm ${d >= 0 ? 'à frente da linha delas (entre as duas alças)' : 'atrás da linha delas'}`, ok: qx >= 0 && d >= -12 };
  },
};
