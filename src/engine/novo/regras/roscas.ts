// Regras medidas das roscas (dobrar o cotovelo): alternada, martelo, com kettlebell e no banco inclinado.
// O tronco parado usa a regra comum "tronco-quase-parado" (../conferir.ts).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { dist, dot, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/**
 * A menor folga (cm) entre a carga (as cabeças do halter, medidas até o canto, ou a bola do kettlebell) e a pele do
 * corpo, fora a mão que segura. Negativa = a carga entra no corpo. Devolve também a parte mais perto.
 */
export function folgaDaCargaNoCorpo(q: Quadro): { folga: number; parte: string } {
  const P = pontosDoBoneco(q.esq).filter((x) => x.parte !== 'mao' && x.parte !== 'polegar');
  let folga = 1e9,
    parte = '';
  for (const c of q.prims) {
    if (c.t !== 'prisma' && c.t !== 'esfera') continue;
    for (const { p, parte: nome } of P) {
      const d = c.t === 'prisma' ? aoSegmento(p, c.a, c.b) - c.ra : dist(p, c.c) - c.r;
      if (d < folga) {
        folga = d;
        parte = nome;
      }
    }
  }
  return { folga, parte };
}
/**
 * O braço direito (do ombro ao cotovelo) no tronco (graus): quanto vai à frente da linha do tronco, visto de lado, e
 * quanto abre para o lado, visto de frente. "Cotovelo ao lado do tronco": à frente até 10°, aberto até 20°.
 */
function bracoNoTronco(q: Quadro): { frente: number; fora: number } {
  const T = q.esq.torax,
    b = sub(q.esq.lado.R.cotovelo, q.esq.lado.R.ombro);
  const baixo = -dot(b, T.y);
  return { frente: Math.atan2(dot(b, T.z), baixo) / (Math.PI / 180), fora: Math.atan2(-dot(b, T.x), baixo) / (Math.PI / 180) };
}
const aoLadoDoTronco = (b: { frente: number; fora: number }) => Math.abs(b.frente) <= 10 && b.fora <= 20;

export const regrasDasRoscas: Record<string, Regra> = {
  'cotovelo-parado-na-rosca': (q) => {
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.R.cotovelo, q[0]!.esq.lado.R.cotovelo)));
    const B = q.map(bracoNoTronco);
    const [a, b] = faixa(B.map((x) => x.frente));
    const [c0, c1] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').cotovelo));
    return { medido: `o cotovelo anda ${f1(anda)} cm enquanto dobra de ${f1(c0)}° a ${f1(c1)}°; o braço fica de ${f1(a)}° a ${f1(b)}° à frente da linha do tronco e ${f1(B[0]!.fora)}° aberto para o lado`, ok: anda <= 1 && B.every(aoLadoDoTronco) && c1 - c0 >= 90 };
  },
  'braco-estendido-embaixo-na-rosca': (q) => {
    const c = angulosDoLado(q[0]!.esq, 'R').cotovelo;
    return { medido: `embaixo, o cotovelo dobra ${f1(c)}°`, ok: c <= 15 };
  },
  // "perto do ombro": a pegada fica mais perto do ombro do que o comprimento do antebraço com a mão (~33 cm), ou seja,
  // o antebraço passou bem da horizontal e a mão chegou à frente do ombro (até 30 cm do centro dele)
  'carga-perto-do-ombro-no-topo': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const d = dist(L.pegada, L.ombro);
    const b = bracoNoTronco(q[q.length - 1]!);
    return { medido: `em cima, o centro da pegada fica a ${f1(d)} cm do centro do ombro (${f1(L.ombro[1] - L.pegada[1])} cm abaixo dele), com o braço ${f1(b.frente)}° à frente da linha do tronco`, ok: d <= 30 && aoLadoDoTronco(b) };
  },
  'palma-para-a-frente-na-rosca': (q) => {
    // angulosDoLado: 0 = polegar para a frente do antebraço (neutra); negativo = supinação
    const [a, b] = faixa(q.map((x) => -angulosDoLado(x.esq, 'R').pronacao));
    return { medido: `o antebraço fica supinado de ${f1(a)}° a ${f1(b)}° (90° = palma toda para a frente)`, ok: a >= 60 };
  },
  'palmas-uma-para-a-outra-na-rosca': (q) => {
    const v = q.flatMap((x) => [angulosDoLado(x.esq, 'R').pronacao, angulosDoLado(x.esq, 'L').pronacao]);
    const [a, b] = faixa(v);
    return { medido: `o polegar fica de ${f1(a)}° a ${f1(b)}° da posição neutra (0° = polegar para a frente do antebraço), sem girar`, ok: Math.max(Math.abs(a), Math.abs(b)) <= 15 };
  },
  'carga-fora-do-corpo-na-rosca': (q) => {
    let pior = 1e9,
      onde = '';
    for (const x of q) {
      const r = folgaDaCargaNoCorpo(x);
      if (r.folga < pior) {
        pior = r.folga;
        onde = r.parte;
      }
    }
    return { medido: `a menor folga entre a carga e a pele (fora a mão que segura) é ${f1(pior)} cm (${onde})`, ok: pior >= -0.5 };
  },
  'bola-pendurada-na-rosca': (q) => {
    // a bola só gira em volta da barra da alça (que atravessa a palma): pendurada, ela fica no ponto mais baixo que
    // esse giro deixa; quando o antebraço sobe, encosta nele e gira com ele. Mede o quanto ela sai do ponto mais baixo
    // enquanto o antebraço está abaixo de 60° de flexão, e a inclinação da alça
    let pendendo = 0,
      alca = 0,
      encostada = 0;
    for (const x of q) {
      const L = x.esq.lado.R,
        d = sub(x.marcas.bola!, L.pegada);
      const eixo = L.mao.x;
      const e = Math.hypot(...eixo);
      const k = dot([0, -1, 0], eixo) / (e * e);
      const baixo: V3 = [eixo[0] * -k, -1 - eixo[1] * k, eixo[2] * -k];
      const desvio = Math.acos(Math.max(-1, Math.min(1, dot(d, baixo) / (Math.hypot(...d) * Math.hypot(...baixo))))) / (Math.PI / 180);
      if (L.ang.cotovelo < 60) {
        pendendo = Math.max(pendendo, desvio);
        alca = Math.max(alca, Math.abs(Math.asin(eixo[1] / e)) / (Math.PI / 180));
      } else encostada = Math.max(encostada, desvio);
    }
    return { medido: `com o antebraço abaixo de 60° de flexão, a bola fica no máximo ${f1(pendendo)}° fora do ponto mais baixo (a alça inclina até ${f1(alca)}°); acima, ela encosta no antebraço e gira até ${f1(encostada)}°`, ok: pendendo <= 3 && alca <= 15 };
  },
  // ----- rosca inclinada (sentado no banco regulável) -----
  'braco-na-vertical-na-inclinada': (q) => {
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.R.cotovelo, q[0]!.esq.lado.R.cotovelo)));
    // o braço visto de lado (para a frente ou para trás da vertical) e visto de frente (aberto)
    const lados = q.map((x) => {
      const b = sub(x.esq.lado.R.cotovelo, x.esq.lado.R.ombro);
      return { frente: Math.atan2(b[2], -b[1]) / (Math.PI / 180), fora: Math.atan2(-b[0], -b[1]) / (Math.PI / 180) };
    });
    const [a, b] = faixa(lados.map((x) => x.frente));
    const [c0, c1] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').cotovelo));
    // atrás da linha do tronco: o cotovelo fica atrás da linha que vai do quadril ao ombro
    const L = q[0]!.esq.lado.R,
      T = q[0]!.esq.torax;
    const atras = dot(sub(L.cotovelo, L.ombro), T.z);
    return { medido: `o cotovelo anda ${f1(anda)} cm enquanto dobra de ${f1(c0)}° a ${f1(c1)}°; visto de lado, o braço fica de ${f1(a)}° a ${f1(b)}° da vertical (aberto ${f1(lados[0]!.fora)}°); o cotovelo fica ${f1(-atras)} cm atrás da linha do tronco`, ok: anda <= 1 && Math.max(Math.abs(a), Math.abs(b)) <= 5 && atras < 0 && c1 - c0 >= 90 };
  },
  // o mesmo "perto do ombro" das roscas em pé (a pegada a até 30 cm do centro do ombro), mas com o braço na vertical do
  // mundo (no banco inclinado ele fica atrás da linha do tronco, e não ao lado dela)
  'halter-perto-do-ombro-na-inclinada': (q) => {
    const x = q[q.length - 1]!,
      L = x.esq.lado.R;
    const d = dist(L.pegada, L.ombro);
    const b = sub(L.cotovelo, L.ombro);
    const frente = Math.atan2(b[2], -b[1]) / (Math.PI / 180);
    return { medido: `em cima, o centro da pegada fica a ${f1(d)} cm do centro do ombro (${f1(L.ombro[1] - L.pegada[1])} cm abaixo dele), com o braço ${f1(frente)}° à frente da vertical`, ok: d <= 30 && Math.abs(frente) <= 5 };
  },
  'costas-e-cabeca-no-encosto-na-inclinada': (q) => {
    const x = q[0]!;
    const P = pontosDoBoneco(x.esq);
    const estofados = x.prims.filter((p) => p.t === 'caixa' && p.cls === 'estofado');
    // quanto as partes entram em cada estofado (cm; 0 = encostado, negativo = longe), só nos pontos sobre ele
    const entra = (partes: string[], inclinado: boolean) => {
      let m = -Infinity;
      for (const p of estofados) {
        if (p.t !== 'caixa' || (Math.abs(p.ref.y[1]) < 0.99) !== inclinado) continue;
        for (const { p: pt, parte } of P) {
          if (!partes.includes(parte)) continue;
          const l = paraRef(p.ref, pt);
          if (Math.abs(l[0]) > p.meias[0] || Math.abs(l[2]) > p.meias[2] || l[1] < -p.meias[1]) continue;
          m = Math.max(m, p.meias[1] - l[1]);
        }
      }
      return m;
    };
    const costas = entra(['tronco', 'cintura'], true),
      cabeca = entra(['cabeca'], true),
      assento = entra(['pelve', 'coxa'], false);
    const apoia = (v: number) => v >= -0.5 && v <= 2.5;
    return { medido: `o estofado amassa ${f1(costas)} cm sob as costas, ${f1(cabeca)} cm sob a nuca e ${f1(assento)} cm sob a nádega e a coxa (0 = só encosta)`, ok: apoia(costas) && apoia(cabeca) && apoia(assento) };
  },
  'halter-fora-do-banco': (q) => {
    let pior = 1e9,
      qual = '';
    for (const x of q) {
      for (const h of x.prims) {
        if (h.t !== 'prisma') continue;
        for (let i = 0; i <= 6; i++) {
          const c: V3 = [h.a[0] + ((h.b[0] - h.a[0]) * i) / 6, h.a[1] + ((h.b[1] - h.a[1]) * i) / 6, h.a[2] + ((h.b[2] - h.a[2]) * i) / 6];
          if (c[1] - h.ra < pior) {
            pior = c[1] - h.ra;
            qual = 'chão';
          }
          for (const p of x.prims) {
            if (p.t !== 'caixa') continue;
            const l = paraRef(p.ref, c);
            const d = l.map((v, j) => Math.abs(v) - p.meias[j]!);
            const fora = Math.hypot(...d.map((v) => Math.max(v, 0))) + Math.min(Math.max(...d), 0);
            if (fora - h.ra < pior) {
              pior = fora - h.ra;
              qual = p.cls;
            }
          }
        }
      }
    }
    return { medido: `a menor folga entre as cabeças do halter e o banco ou o chão é ${f1(pior)} cm (${qual})`, ok: pior >= -0.5 };
  },
  'um-braco-de-cada-vez': (q) => {
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.L.pegada, q[0]!.esq.lado.L.pegada)));
    return { medido: `enquanto o braço direito sobe, a mão esquerda anda ${f1(anda)} cm`, ok: anda <= 0.1 };
  },
};
