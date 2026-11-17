// Regras medidas dos crucifixos com halteres deitado no banco (../exercicios/crucifixo-deitado.ts): o cotovelo fixo,
// o arco, os halteres acima do peito em cima, os cotovelos na altura do tronco embaixo e o corpo apoiado no banco reto.
// Os halteres que não se batem e o apoio no banco inclinado são medidos pelas regras do supino inclinado
// (./supino-inclinado.ts); a carga longe da pele e do banco, por ./remadas.ts.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { dist, dot, norm, sub } from '../vec';

const ultimo = <T>(q: T[]) => q[q.length - 1]!;

/** O banco reto do quadro, se houver. */
function bancoRetoDo(q: Quadro): { x0: number; z0: number } | undefined {
  const p = q.pecas?.find((x) => x.t === 'bancoReto');
  return p && p.t === 'bancoReto' ? { x0: p.x0, z0: p.z0 } : undefined;
}

export const REGRAS_CRUCIFIXOS: Record<string, Regra> = {
  'crucifixo-cotovelo-fixo': (q) => {
    const c = q.flatMap((x) => [x.esq.lado.R.ang.cotovelo, x.esq.lado.L.ang.cotovelo]);
    const [a, b] = faixa(c);
    return { medido: `o cotovelo dobra de ${f1(a)}° a ${f1(b)}° do topo ao fundo`, ok: b - a <= 2 && a >= 10 && b <= 35 };
  },
  'crucifixo-arco': (q) => {
    // a distância do centro do ombro ao centro da pegada: no arco ela não muda; num supino, encurta
    const d = q.map((x) => dist(x.esq.lado.R.ombro, x.esq.lado.R.pegada));
    const [a, b] = faixa(d);
    return { medido: `o halter fica de ${f1(a)} a ${f1(b)} cm do ombro`, ok: b - a <= 1.5 };
  },
  'crucifixo-halteres-acima-do-peito': (q) => {
    const e = q[0]!.esq,
      L = e.lado.R;
    const r = sub(L.pegada, L.ombro);
    // no mundo: quanto o halter fica acima do ombro (na vertical) e quanto para o lado dos pés (no chão, na direção do
    // tronco); deitado no banco plano ou inclinado, "acima do peito" é na vertical
    const pes = norm([-e.torax.y[0], 0, -e.torax.y[2]]);
    const paraOsPes = dot(r, pes),
      acima = r[1];
    // de dentro do ombro: o centro da pegada mais perto do meio do corpo que o centro do ombro
    const paraDentro = Math.abs(L.ombro[0] - e.torax.o[0]) - Math.abs(L.pegada[0] - e.torax.o[0]);
    // palmas uma para a outra: o halter ao comprido do corpo, no plano do meio do corpo (no banco inclinado, o
    // antebraço fica perto da vertical e o halter, perpendicular a ele, perto da horizontal)
    const halter = Math.asin(Math.min(1, Math.abs(dot(L.mao.x, e.torax.x)))) / (Math.PI / 180);
    return {
      medido: `em cima, o halter fica ${f1(acima)} cm acima do ombro (na vertical), ${f1(paraOsPes)} cm para o lado dos pés (no chão) e ${f1(paraDentro)} cm para dentro; o halter sai ${f1(halter)}° do plano do meio do corpo`,
      ok: acima >= 40 && paraOsPes >= 3 && paraOsPes <= 20 && paraDentro >= 0 && halter <= 20,
    };
  },
  'crucifixo-cotovelos-na-altura-do-tronco': (q) => {
    const e = ultimo(q).esq,
      L = e.lado.R;
    const cot = dot(sub(L.cotovelo, L.ombro), e.torax.z),
      mao = dot(sub(L.pegada, L.ombro), e.torax.z);
    return { medido: `embaixo, o centro do cotovelo fica ${f1(cot)} cm e o halter ${f1(mao)} cm em relação ao centro do ombro (na direção do peito)`, ok: cot >= -8 && cot <= 4 };
  },
  'crucifixo-deitado-no-banco-reto': (q) => {
    const b = bancoRetoDo(q[0]!);
    if (!b) return { medido: 'sem banco reto no quadro', ok: false };
    const topo = obj('bancoReto', 'altura'),
      meiaLarg = obj('bancoReto', 'larg') / 2,
      meioComp = obj('bancoReto', 'comp') / 2;
    // o ponto mais fundo de cada parte no estofado (positivo = amassa), só onde a parte fica sobre o banco
    const fundo = (x: Quadro, partes: Set<string>) => {
      let m = -Infinity;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (partes.has(parte) && Math.abs(p[0] - b.x0) <= meiaLarg && Math.abs(p[2] - b.z0) <= meioComp) m = Math.max(m, topo - p[1]);
      return m;
    };
    const amostra = q.filter((_, i) => i % 6 === 0 || i === q.length - 1);
    const [c0, c1] = faixa(amostra.map((x) => fundo(x, new Set(['tronco']))));
    const [h0, h1] = faixa(amostra.map((x) => fundo(x, new Set(['cabeca']))));
    const [g0, g1] = faixa(amostra.map((x) => fundo(x, new Set(['pelve']))));
    const encosta = (a: number, z: number) => a >= -0.5 && z <= 2.5;
    return { medido: `o ponto mais fundo de cada parte no estofado (positivo = amassa): costas de ${f1(c0)} a ${f1(c1)} cm, cabeça de ${f1(h0)} a ${f1(h1)} cm, glúteo de ${f1(g0)} a ${f1(g1)} cm`, ok: encosta(c0, c1) && encosta(h0, h1) && encosta(g0, g1) };
  },
};
