// Regras medidas da rosca concentrada sentado (../exercicios/rosca-concentrada.ts). As comuns dos exercícios sentado na
// ponta da cadeira (o glúteo no assento, os pés no chão) ficam em ./sentado-na-ponta.ts; as das roscas (embaixo quase
// estendido, palma para cima, carga fora do corpo, halter fora do banco) em ./roscas.ts; o tronco parado em
// ../conferir.ts. As daqui medem o braço apoiado por dentro da coxa (como a rosca Scott mede o braço no encosto,
// ./rosca-scott.ts), o halter no alto e a outra mão. O limite vem do que a ficha pede, não do que a pose deu.
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { bracoNaCoxa, roscaConcentrada } from '../exercicios/rosca-concentrada';
import { distanciaEntre } from '../exercicios/sentado-na-ponta';
import { dist } from '../vec';
import { partesDoHalter, regraDePintura } from './ordem-de-pintura';

export const REGRAS_ROSCA_CONCENTRADA: Record<string, Regra> = {
  // O halter (o cabo e as duas cabeças) contra o corpo, nos dois lados, em cada vista do guia (acréscimo de 19/11,
  // auditoria das fases A e B): de lado, embaixo, o halter, que pende entre as pernas, era pintado por cima da canela de
  // perto, que fica de 13 a 18 cm mais perto de quem olha. A mão fecha no cabo e não conta.
  'rosca-concentrada-halter-pintado-no-lugar': regraDePintura({
    exercicio: () => roscaConcentrada,
    nome: 'o halter',
    fora: ['mao', 'polegar'],
    peca: (q) => {
      const p = q.pecas?.find((x) => x.t === 'halter');
      return p && p.t === 'halter' ? [{ peca: p, partes: partesDoHalter(p) }] : [];
    },
  }),
  'rosca-concentrada-braco-na-coxa': (q) => {
    // a cada 3 quadros: a parte de trás do braço encosta por dentro da coxa direita (não descola mais de meio
    // centímetro) e não a atravessa (amassa até 2,5 cm, a tolerância da conferência para o corpo no estofado); o
    // cotovelo não sai do lugar; "perto do joelho": no terço da coxa junto do joelho
    const Q = q.filter((_, i) => i % 3 === 0 || i === q.length - 1);
    const [a, b] = faixa(Q.map((x) => bracoNaCoxa(x.esq)));
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.R.cotovelo, q[0]!.esq.lado.R.cotovelo)));
    const L = q[0]!.esq.lado.R;
    const coxa = q[0]!.esq.corpo.m('coxa.comp');
    const doJoelho = dist(L.cotovelo, L.joelho);
    const [c0, c1] = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    return {
      medido: `a parte de trás do braço fica de ${f1(a)} a ${f1(b)} cm da pele de dentro da coxa (positivo = amassa); o cotovelo anda ${f1(anda)} cm enquanto dobra de ${f1(c0)}° a ${f1(c1)}°, a ${f1(doJoelho)} cm do centro do joelho (a coxa tem ${f1(coxa)} cm)`,
      ok: a >= -0.5 && b <= 2.5 && anda <= 1 && doJoelho <= coxa / 3 && c1 - c0 >= 90,
    };
  },
  // "perto do ombro": o mesmo limite das roscas aprovadas (a pegada a até 30 cm do centro do ombro, ./roscas.ts)
  'rosca-concentrada-halter-perto-do-ombro': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const d = dist(L.pegada, L.ombro);
    return { medido: `em cima, o centro da pegada fica a ${f1(d)} cm do centro do ombro`, ok: d <= 30 };
  },
  'rosca-concentrada-mao-na-outra-coxa': (q) => {
    // a mão esquerda espalmada na coxa esquerda (a pele da mão a até 1 cm da pele da coxa), parada
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.L.punho, q[0]!.esq.lado.L.punho)));
    const folga = distanciaEntre(q[0]!.esq, (p, pt) => p === 'mao' && pt[0] > 0, (p, pt) => p === 'coxa' && pt[0] > 0);
    return { medido: `a mão esquerda fica a ${f1(folga)} cm da pele da coxa esquerda e anda ${f1(anda)} cm`, ok: folga <= 1 && anda <= 0.1 };
  },
};
