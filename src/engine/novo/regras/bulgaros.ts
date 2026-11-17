// Regras medidas dos búlgaros com o pé de trás na fita de suspensão (o pé fica no berço da alça e anda com a fita).
// As do búlgaro no banco e na cadeira estão em ../conferir.ts (`peito-do-pe-no-banco` e as dos afundos).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { obj } from '../tabelas';
import { dist } from '../vec';

export const regrasDosBulgaros: Record<string, Regra> = {
  'peito-do-pe-na-alca': (q) => {
    // o ponto da superfície do pé de trás mais perto do fundo do berço tem de estar nele, com a sola para cima
    const longe = q.map((x) => {
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'pe' && dist(p, x.esq.lado.L.tornozelo) < 24) min = Math.min(min, dist(p, x.marcas.alca!));
      return min;
    });
    const [, pior] = faixa(longe);
    const solaParaCima = q.every((x) => x.esq.lado.L.pe.y[1] < -0.7);
    return { medido: `o peito do pé de trás fica a no máximo ${f1(pior)} cm do fundo do berço, ${solaParaCima ? 'com a sola para cima' : 'SEM a sola para cima'}`, ok: pior <= 1 && solaParaCima };
  },
  'alca-no-meio-da-canela': (q, corpo) => {
    // a faixa do fabricante (do fundo do berço ao chão, com a fita pendurada) e o meio da canela do corpo
    const [a, b] = faixa(q.map((x) => x.marcas.alca![1]));
    const meio = (corpo.m('altura.maleolo') + corpo.m('altura.joelho')) / 2;
    const min = obj('suspensao', 'alcaAlturaMin'),
      max = obj('suspensao', 'alcaAlturaMax');
    return { medido: `o fundo do berço fica de ${f1(a)} a ${f1(b)} cm do chão (o meio da canela do corpo: ${f1(meio)} cm; o fabricante: ${f1(min)} a ${f1(max)} cm)`, ok: a >= min && b <= max };
  },
  'pe-de-tras-vai-com-a-fita': (q) => {
    const ini = q[0]!,
      fim = q[q.length - 1]!;
    const tras = ini.esq.lado.L.tornozelo[2] - fim.esq.lado.L.tornozelo[2],
      sobe = fim.esq.lado.L.tornozelo[1] - ini.esq.lado.L.tornozelo[1];
    const [a, b] = faixa(q.map((x) => dist(x.marcas.alca!, x.marcas.ancora!)));
    return { medido: `na descida, o pé de trás anda ${f1(tras)} cm para trás e ${f1(sobe)} cm para cima; da âncora ao fundo do berço, de ${f1(a)} a ${f1(b)} cm`, ok: tras >= 3 && b - a <= 0.3 };
  },
};
