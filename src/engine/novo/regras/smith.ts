// Regras medidas dos exercícios no smith (agachamento e supino). As marcas que o quadro dá: `barra` (o centro da
// barra), `guia` (o ponto da linha da guia na altura da barra) e `trava` (a altura em que o carro para na trava).
import { formaDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { angulo, comb, dist, sub } from '../vec';
import type { V3 } from '../vec';

/**
 * A distância (cm) da superfície da barra (um cilindro ao longo de x) até a pele do tronco, do pescoço e do trapézio,
 * entre um anel e o seguinte (de 5 em 5 graus em volta de cada anel): negativa quando a barra afunda na pele.
 */
export function folgaDaBarraNaPele(e: Esq, barra: V3, partes = ['tronco', 'pescoco', 'cintura']): number {
  const r = obj('smith', 'pegadaDiam') / 2;
  let min = 1e9;
  for (const g of formaDoBoneco(e).grupos)
    for (const v of g.volumes) {
      if (!partes.includes(v.nome ?? g.id)) continue;
      const an = v.vol.aneis;
      for (let i = 0; i + 1 < an.length; i++)
        for (let k = 0; k < 72; k++) {
          const th = (k * Math.PI) / 36,
            sn = Math.sin(th);
          const pt = (a: (typeof an)[number]) => comb([1, a.c], [a.a * Math.cos(th), a.x], [(sn >= 0 ? a.f : a.b) * sn, a.z]);
          const p = pt(an[i]!),
            q = pt(an[i + 1]!);
          if (Math.abs(p[0] - barra[0]) > 22) continue;
          // do eixo da barra ao segmento p–q, no plano de lado (y, z)
          const dy = q[1] - p[1],
            dz = q[2] - p[2];
          const L2 = dy * dy + dz * dz || 1e-9;
          const s = Math.max(0, Math.min(1, ((barra[1] - p[1]) * dy + (barra[2] - p[2]) * dz) / L2));
          min = Math.min(min, Math.hypot(p[1] + dy * s - barra[1], p[2] + dz * s - barra[2]) - r);
        }
    }
  return min;
}

const amostra = (q: Quadro[], cada = 6) => q.filter((_, i) => i % cada === 0 || i === q.length - 1);

export const regrasDoSmith: Record<string, Regra> = {
  'barra-so-anda-na-guia': (q) => {
    const fora = Math.max(...q.map((x) => dist(x.marcas.barra!, x.marcas.guia!)));
    const a = q[0]!.marcas.barra!,
      b = q[q.length - 1]!.marcas.barra!;
    const inc = angulo(sub(a, b), [0, 1, 0]);
    const lado = Math.max(...q.map((x) => Math.abs(x.marcas.barra![0])));
    return {
      medido: `o centro da barra fica a no máximo ${f1(fora)} cm da linha da guia; de cima até embaixo ela anda ${f1(dist(a, b))} cm, a ${f1(inc)}° da vertical, sem andar de lado (${f1(lado)} cm)`,
      ok: fora <= 0.1 && Math.abs(inc - obj('smith', 'guiaInclina')) <= 0.3 && lado <= 0.1,
    };
  },
  'barra-no-alto-das-costas': (q) => {
    const fol = faixa(amostra(q).map((x) => folgaDaBarraNaPele(x.esq, x.marcas.barra!)));
    // a altura da barra contra C7–T1, ao longo do tronco (para baixo é negativo)
    const alt = faixa(q.map((x) => {
      const d = sub(x.marcas.barra!, x.esq.torax.o);
      return d[0] * x.esq.torax.y[0] + d[1] * x.esq.torax.y[1] + d[2] * x.esq.torax.y[2];
    }));
    return { medido: `a barra fica de ${f1(-alt[1])} a ${f1(-alt[0])} cm abaixo de C7–T1, com a superfície dela de ${f1(fol[0])} a ${f1(fol[1])} cm da pele das costas (negativo: afunda)`, ok: alt[1] <= -2 && alt[0] >= -8 && fol[0] >= -1.2 && fol[1] <= 0.3 };
  },
  'pes-a-frente-da-barra': (q) => {
    const meio = (x: Quadro) => (x.esq.lado.L.bola[2] + x.esq.lado.L.calcanhar[2]) / 2;
    const cima = meio(q[0]!) - q[0]!.marcas.barra![2],
      baixo = meio(q[q.length - 1]!) - q[q.length - 1]!.marcas.barra![2];
    return { medido: `o meio do pé fica ${f1(cima)} cm à frente da barra em cima e ${f1(baixo)} cm embaixo (a barra desce para trás, na guia)`, ok: cima >= 4 && cima <= 20 };
  },
  'barra-no-meio-do-peito': (q) => {
    // embaixo: a barra contra a linha do meio do peito (a marca `peito`) e a folga dela até a pele do peito
    const x = q[q.length - 1]!;
    const d = x.marcas.barra![2] - x.marcas.peito![2];
    const fol = folgaDaBarraNaPele(x.esq, x.marcas.barra!, ['tronco', 'cintura']);
    const meio = faixa(q.slice(0, -1).filter((_, i) => i % 6 === 0).map((y) => folgaDaBarraNaPele(y.esq, y.marcas.barra!, ['tronco', 'cintura'])));
    return { medido: `embaixo, o centro da barra fica ${f1(Math.abs(d))} cm ${d >= 0 ? 'para os pés' : 'para a cabeça'} da linha do meio do peito, com a superfície dela a ${f1(fol)} cm da pele (negativo: afunda); antes de chegar embaixo, de ${f1(meio[0])} a ${f1(meio[1])} cm`, ok: Math.abs(d) <= 3 && fol >= -1.2 && fol <= 0.3 && meio[0] >= fol - 0.05 };
  },
  'antebracos-quase-verticais-embaixo': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const a = angulo(sub(L.punho, L.cotovelo), [0, 1, 0]);
    // 'quase vertical': até 20°, o mesmo limite do braço 'na vertical' do supino no chão (regras/deitado-no-chao.ts)
    return { medido: `embaixo, o antebraço fica a ${f1(a)}° da vertical`, ok: a <= 20 };
  },
  'pegada-ate-1-5-ombro': (q, corpo) => {
    const e = q[0]!.esq;
    const r = dist(e.lado.R.pegada, e.lado.L.pegada) / corpo.m('largura.biacromial');
    return { medido: `de uma mão à outra, ${f1(dist(e.lado.R.pegada, e.lado.L.pegada))} cm: ${f1(r)} vez a largura dos ombros (${f1(corpo.m('largura.biacromial'))} cm)`, ok: r > 1 && r <= 1.55 };
  },
  'cotovelos-sem-travar-em-cima': (q) => {
    const c = q[0]!.esq.lado.R.ang.cotovelo;
    return { medido: `em cima, o cotovelo dobra ${f1(c)}°`, ok: c >= 5 && c <= 20 };
  },
  'travas-logo-abaixo-do-fundo': (q) => {
    const fundo = Math.min(...q.map((x) => x.marcas.barra![1]));
    const d = fundo - q[0]!.marcas.trava![1];
    return { medido: `as travas param a barra ${f1(d)} cm abaixo do ponto mais baixo dela`, ok: d > 0 && d <= 5 };
  },
};
