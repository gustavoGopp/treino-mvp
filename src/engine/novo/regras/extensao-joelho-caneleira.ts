// Regras medidas da extensão de joelho sentado, com caneleira (a perna que estende é a direita). Os ids levam o nome
// do exercício: a extensão com elástico é de outra família e pode ter regras parecidas.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { angulo, dist, sub } from '../vec';

export const regrasDaExtensaoComCaneleira: Record<string, Regra> = {
  'extensao-joelho-caneleira-coxa-parada': (q) => {
    // a coxa direita não muda de direção e o quadril não sai do lugar: só a canela gira
    const d0 = sub(q[0]!.esq.lado.R.joelho, q[0]!.esq.lado.R.quadril);
    const gira = Math.max(...q.map((x) => angulo(sub(x.esq.lado.R.joelho, x.esq.lado.R.quadril), d0)));
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.R.joelho, q[0]!.esq.lado.R.joelho)));
    return { medido: `a coxa gira no máximo ${f1(gira)}° e o joelho anda ${f1(anda)} cm no ciclo`, ok: gira <= 1 && anda <= 0.5 };
  },
  'extensao-joelho-caneleira-quase-esticado': (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    // embaixo: o ponto mais baixo do pé e da canela direitos (e da caneleira) acima do chão
    const ini = q[0]!;
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(ini.esq)) if ((parte === 'pe' || parte === 'canela') && dist(p, ini.esq.lado.R.tornozelo) < dist(p, ini.esq.lado.L.tornozelo)) min = Math.min(min, p[1]);
    const can = ini.marcas.caneleira![1] - (ini.marcas.caneleiraRaio?.[0] ?? 0);
    const pe = Math.min(min, can);
    return { medido: `o joelho vai de ${f1(b)}° (embaixo) a ${f1(a)}° (em cima); embaixo, o pé fica a ${f1(pe)} cm do chão`, ok: a >= 5 && a <= 20 && b >= 80 && pe >= 1 };
  },
};
