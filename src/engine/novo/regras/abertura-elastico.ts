// Regras medidas da abertura com o elástico entre as mãos: onde os braços começam e terminam, os braços quase retos,
// as palmas para baixo, a faixa perto do peito e abaixo do rosto no fim, e quanto a faixa estica entre as mãos. Os
// ombros baixos e o corpo parado usam as regras comuns (./ombros.ts e ../conferir.ts); a faixa nas mãos e fora do
// corpo, as do elástico (./elasticos.ts).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS, sinal } from '../esqueleto';
import { obj } from '../tabelas';
import { add, dist, dot, mul, paraRef, sub } from '../vec';

const grau = Math.PI / 180;

export const REGRAS_ABERTURA_ELASTICO: Record<string, Regra> = {
  'abertura-elastico-comeca-a-frente-no-peito': (q, corpo) => {
    // no começo: as mãos à frente (o braço a menos de 30° da frente, visto de cima) e na altura do peito do corpo em pé
    // (entre a 10ª costela e o acrômio, medida a partir do C7 no tórax)
    const e = q[0]!.esq,
      L = e.lado.R;
    const b = sub(L.pegada, L.ombro);
    const abre = Math.atan2(Math.abs(b[0]), b[2]) / grau;
    const y = paraRef(e.torax, L.pegada)[1] + corpo.m('altura.cervical');
    return { medido: `no começo, o braço fica ${f1(abre)}° aberto a partir da frente (visto de cima) e o centro da mão na altura de ${f1(y)} cm do corpo em pé (peito: ${f1(corpo.m('altura.peito'))} cm; 10ª costela: ${f1(corpo.m('altura.costela10'))} cm; acrômio: ${f1(corpo.m('altura.acromio'))} cm)`, ok: abre <= 30 && y >= corpo.m('altura.costela10') && y <= corpo.m('altura.acromio') };
  },
  'abertura-elastico-abre-em-diagonal': (q) => {
    // do começo ao fim, o braço abre (visto de cima) e a mão sobe um pouco
    const a = q[0]!.esq.lado.R,
      b = q[q.length - 1]!.esq.lado.R;
    const abre = (L: typeof a) => Math.atan2(Math.abs(L.pegada[0] - L.ombro[0]), L.pegada[2] - L.ombro[2]) / grau;
    const sobe = b.pegada[1] - a.pegada[1];
    return { medido: `o braço abre de ${f1(abre(a))}° a ${f1(abre(b))}° a partir da frente (visto de cima) e a mão sobe ${f1(sobe)} cm`, ok: abre(b) - abre(a) >= 45 && sobe >= 5 && sobe <= 25 };
  },
  'abertura-elastico-bracos-quase-retos': (q) => {
    const [a, b] = faixa(q.flatMap((x) => LADOS.map((k) => angulosDoLado(x.esq, k).cotovelo)));
    return { medido: `o cotovelo dobra de ${f1(a)}° a ${f1(b)}° no ciclo`, ok: b <= 20 };
  },
  'abertura-elastico-palmas-para-baixo': (q) => {
    // o polegar (o eixo x da mão vezes o sinal do lado) deitado e virado para a outra mão: com a palma para baixo, ele
    // aponta para o meio, e não para cima nem para baixo
    const v = q.flatMap((x) =>
      LADOS.map((k) => {
        const t = mul(x.esq.lado[k].mao.x, sinal(k));
        return { inclina: Math.asin(Math.max(-1, Math.min(1, t[1]))) / grau, paraDentro: dot(t, sub(x.esq.lado[k === 'R' ? 'L' : 'R'].pegada, x.esq.lado[k].pegada)) > 0 };
      }),
    );
    const [a, b] = faixa(v.map((x) => x.inclina));
    return { medido: `o polegar fica de ${f1(a)}° a ${f1(b)}° da horizontal, ${v.every((x) => x.paraDentro) ? 'sempre virado para o meio' : 'NEM SEMPRE virado para o meio'}`, ok: Math.max(Math.abs(a), Math.abs(b)) <= 30 && v.every((x) => x.paraDentro) };
  },
  'abertura-elastico-perto-do-peito-abaixo-do-rosto': (q) => {
    // no fim: a faixa reta entre as mãos a até 6 cm da pele do tronco e do pescoço (sem entrar) e abaixo do queixo (o
    // alto da cabeça menos a altura da cabeça)
    const e = q[q.length - 1]!.esq;
    const a = e.lado.R.pegada,
      b = e.lado.L.pegada;
    const ab = sub(b, a);
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) {
      if (parte !== 'tronco' && parte !== 'pescoco') continue;
      const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / dot(ab, ab)));
      min = Math.min(min, dist(p, add(a, mul(ab, t))) - obj('elasticoLongo', 'esp'));
    }
    const queixo = e.cabeca.o[1] - (e.corpo.m('cabeca.altura') - e.corpo.m('cabeca.tragionAoTopo'));
    const y = (a[1] + b[1]) / 2;
    return { medido: `no fim, a faixa fica a ${f1(min)} cm da pele do peito, na altura de ${f1(y)} cm, ${f1(queixo - y)} cm abaixo do queixo`, ok: min >= 0 && min <= 6 && y < queixo };
  },
  'abertura-elastico-esticado-entre-as-maos': (q) => {
    // a marca `trechoLivre` = [a distância entre as mãos, o comprimento em repouso da faixa entre elas, 0]
    const e = q.map((x) => x.marcas.trechoLivre![0] / x.marcas.trechoLivre![1]);
    const a = e[0]!,
      b = Math.max(...e);
    const max = obj('elasticoLongo', 'esticaAte');
    return { medido: `a faixa entre as mãos estica ${f1(a)} vez no começo e até ${f1(b)} vezes no fim (em repouso, ${f1(q[0]!.marcas.trechoLivre![1])} cm); o máximo do fabricante é ${f1(max)}`, ok: a >= 1 && a <= 1.2 && b > a + 0.3 && b <= max };
  },
};
