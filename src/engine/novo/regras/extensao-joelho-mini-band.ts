// Regras medidas da extensão de joelho sentado, com mini band nos tornozelos (a perna que estende é a direita; a
// esquerda fica com o pé no chão, segurando a faixa). Os ids levam o nome do exercício.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { folgaDasCostas } from '../exercicios/extensao-joelho-mini-band';
import { apoioNoAssento } from '../exercicios/quadril-sentado-na-cadeira';
import { angulo, dist } from '../vec';

export const REGRAS_EXTENSAO_MINI_BAND: Record<string, Regra> = {
  'extensao-mini-band-costas-no-encosto': (q) => {
    const ms = [q[0]!, q[q.length - 1]!];
    const [a0, a1] = faixa(ms.map((x) => apoioNoAssento(x.esq)));
    const [c0, c1] = faixa(ms.map((x) => folgaDasCostas(x.esq)));
    const inclina = angulo(q[0]!.esq.torax.y, [0, 1, 0]);
    const anda = Math.max(...q.map((x) => dist(x.esq.torax.o, q[0]!.esq.torax.o)));
    return {
      medido: `o glúteo e a coxa ficam de ${f1(a0)} a ${f1(a1)} cm do tampo do assento; as costas, de ${f1(c0)} a ${f1(c1)} cm da tábua do encosto; o peito deita ${f1(inclina)}° para trás e a base do pescoço anda ${f1(anda)} cm no ciclo`,
      ok: a0 >= -1.5 && a1 <= 0.5 && c0 >= -1.5 && c1 <= 1 && anda <= 1,
    };
  },
  'extensao-mini-band-ate-reta': (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    const ini = q[0]!.esq;
    const perto = dist(ini.lado.R.tornozelo, ini.lado.L.tornozelo);
    // embaixo: o ponto mais baixo do pé e da canela direitos acima do chão
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(ini)) if ((parte === 'pe' || parte === 'canela') && dist(p, ini.lado.R.tornozelo) < dist(p, ini.lado.L.tornozelo)) min = Math.min(min, p[1]);
    return { medido: `o joelho vai de ${f1(b)}° (começo) a ${f1(a)}° (em cima); no começo, os tornozelos ficam a ${f1(perto)} cm um do outro e o pé que sobe a ${f1(min)} cm do chão`, ok: a <= 5 && b >= 80 && perto <= 25 && min >= 0.5 };
  },
  'extensao-mini-band-pe-parado-segura': (q) => {
    const L = q.map((x) => x.esq.lado.L);
    const anda = Math.max(...L.map((x) => Math.max(dist(x.bola, L[0]!.bola), dist(x.calcanhar, L[0]!.calcanhar))));
    const sola = Math.max(...L.map((x) => Math.max(x.bola[1], x.calcanhar[1])));
    return { medido: `o pé esquerdo fica chapado no chão (bola e calcanhar a no máximo ${f1(sola)} cm) e anda ${f1(anda)} cm no ciclo`, ok: anda <= 0.1 && sola <= 0.5 };
  },
};
