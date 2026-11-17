// Regras medidas da remada com o peito apoiado no banco inclinado (../exercicios/remada-apoiada.ts). As outras regras
// da remada (tronco parado, cotovelo atrás das costas, carga livre do corpo e do banco...) estão em ./remadas.ts e
// ../conferir.ts. As daqui medem o apoio no encosto: o peito nele, o queixo além da ponta, as pernas fora do banco e o
// halter longe do chão.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Prim } from '../desenho';
import type { Quadro } from '../movimento';
import { noEncostoDaRemada } from '../exercicios/remada-apoiada';
import { geometriaDoBanco } from '../pecas-de-cena/banco-regulavel';
import type { BancoRegulavel } from '../pecas-de-cena/banco-regulavel';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { dot, noRef, paraRef, sub } from '../vec';

/** O ponto mais fundo de algumas partes no encosto (cm; positivo = amassa). */
function fundoNoEncosto(q: Quadro, partes: Set<string>): number {
  let m = -Infinity;
  for (const { p, parte } of pontosDoBoneco(q.esq)) if (partes.has(parte)) m = Math.max(m, noEncostoDaRemada(p));
  return m;
}
const bancoDo = (q: Quadro) => (q.pecas?.find((x): x is PecaPropria => x.t === 'propria' && x.nome === 'banco-regulavel')?.fixa as BancoRegulavel | undefined);
/** Quanto um ponto entra numa caixa (cm; negativo = fora). */
function dentroDaCaixa(p: [number, number, number], c: Extract<Prim, { t: 'caixa' }>): number {
  const l = paraRef(c.ref, p);
  return Math.min(c.meias[0] - Math.abs(l[0]), c.meias[1] - Math.abs(l[1]), c.meias[2] - Math.abs(l[2]));
}

export const REGRAS_REMADA_APOIADA: Record<string, Regra> = {
  'remada-apoiada-peito-no-encosto': (q) => {
    const d = q.filter((_, i) => i % 4 === 0 || i === q.length - 1).map((x) => fundoNoEncosto(x, new Set(['tronco', 'cintura'])));
    const [a, b] = faixa(d);
    return { medido: `o ponto mais fundo do peito e da barriga no encosto fica de ${f1(a)} a ${f1(b)} cm (positivo = amassa)`, ok: a >= -0.5 && b <= 2.5 };
  },
  'remada-apoiada-queixo-alem-da-ponta': (q) => {
    // o queixo (a ponta de baixo da mandíbula) e o alto do esterno, ao longo do encosto, contra a ponta dele
    const e = q[0]!.esq,
      c = e.corpo;
    const b = bancoDo(q[0]!)!;
    const G = geometriaDoBanco(b);
    const ao = (p: [number, number, number]) => dot(sub(p, G.baseEncosto), G.d) - G.compEncosto;
    const queixo = ao(noRef(e.cabeca, [0, c.m('cabeca.tragionAoTopo') - c.m('cabeca.altura') + 3, 2]));
    const esterno = ao(noRef(e.torax, [0, c.m('altura.supraesternal') - c.m('altura.cervical'), c.m('prof.peito') * 0.5]));
    return { medido: `ao longo do encosto, o queixo fica ${f1(queixo)} cm além da ponta e o alto do esterno ${f1(-esterno)} cm antes dela`, ok: queixo > 0 && esterno <= 0 };
  },
  'remada-apoiada-pernas-fora-do-banco': (q) => {
    // as pernas e a bacia contra as caixas do banco (estofado e estrutura), e os pés atrás do assento, no chão
    let pior = -1e9;
    for (const x of q.filter((_, i) => i % 6 === 0 || i === q.length - 1))
      for (const { p, parte } of pontosDoBoneco(x.esq)) {
        if (parte !== 'coxa' && parte !== 'canela' && parte !== 'pe' && parte !== 'pelve') continue;
        for (const c of x.prims) if (c.t === 'caixa' && c.cls !== 'tapete') pior = Math.max(pior, dentroDaCaixa(p, c));
      }
    // os pés no chão atrás do assento ou dos lados do banco (fora da largura do estofado)
    const e = q[0]!.esq;
    const b = bancoDo(q[0]!)!;
    const G = geometriaDoBanco(b);
    const atras = G.baseAssento[2] - G.compAssento - Math.max(e.lado.R.ponta[2], e.lado.R.bola[2]);
    let dentro = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pe') dentro = Math.min(dentro, Math.abs(p[0] - b.x0));
    const fora = dentro - obj('bancoRegulavel', 'larg') / 2;
    return {
      medido: `as pernas ${pior > 0 ? `entram até ${f1(pior)} cm` : `ficam a no mínimo ${f1(-pior)} cm`} das peças do banco; os pés ficam ${atras >= 0 ? `${f1(atras)} cm atrás do fim do assento` : `${f1(fora)} cm para fora da lateral do estofado`}`,
      ok: pior <= 0.5 && (atras >= 0 || fora >= 1),
    };
  },
  'remada-apoiada-halter-longe-do-chao': (q) => {
    // a cabeça mais baixa do halter, no começo (o braço estendido)
    const x = q[0]!;
    let m = 1e9;
    for (const p of x.prims) if (p.t === 'prisma') m = Math.min(m, p.a[1] - p.ra, p.b[1] - p.ra);
    return { medido: `com o braço estendido, o halter fica a ${f1(m)} cm do chão`, ok: m >= 3 };
  },
};
