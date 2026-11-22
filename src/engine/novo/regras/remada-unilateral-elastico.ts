// Regras medidas da remada unilateral com elástico (../exercicios/remada-unilateral-elastico.ts) que as remadas sem banco
// (./remadas.ts) não medem: a mão de apoio pousada na pele da coxa da frente, sem entrar nela, no ciclo e nos erros
// (auditoria de 18/11/2026, M4: o centro da mão ficava a 2,3 cm do eixo da coxa e o antebraço entrava 6,3 cm nela).
import { formaDoBoneco } from '../boneco';
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import { distanciaEntre, entraNasPartes } from '../exercicios/sentado-na-ponta';
import type { Quadro } from '../movimento';
import { dot, norm, sub } from '../vec';

/**
 * A mão de apoio (a esquerda) contra a coxa esquerda, num quadro:
 *  - `t`: onde o centro da mão fica ao longo da coxa (0 = quadril, 1 = joelho);
 *  - `fora`: quanto o centro da mão fica fora da pele da coxa, na direção dele a partir do eixo (cm; negativo = dentro),
 *    medido na elipse do anel da coxa interpolado naquele ponto;
 *  - `borda`: a folga do centro da mão até a borda lateral da coxa (a meia largura do anel menos o desvio para o lado;
 *    positivo = sobre a coxa, e não ao lado dela);
 *  - `mao`, `ante`: quanto a pele da mão e a do antebraço entram na pele da coxa (cm; 0 ou menos = não entram);
 *  - `encosta`: a menor distância entre a pele da mão e a da coxa (cm).
 */
export function maoNaCoxa(e: Esq): { t: number; fora: number; borda: number; mao: number; ante: number; encosta: number } {
  const L = e.lado.L;
  const eixo = sub(L.joelho, L.quadril);
  const t = dot(sub(L.pegada, L.quadril), eixo) / dot(eixo, eixo);
  const aneis = formaDoBoneco(e).grupos.find((g) => g.id === 'pernaL')!.volumes.find((v) => v.nome === 'coxa')!.vol.aneis;
  // o anel mais perto do centro da mão, ao longo da coxa
  const u = norm(eixo);
  let a = aneis[0]!;
  for (const x of aneis) if (Math.abs(dot(sub(x.c, L.pegada), u)) < Math.abs(dot(sub(a.c, L.pegada), u))) a = x;
  const d = sub(L.pegada, a.c);
  const dx = dot(d, a.x),
    dz = dot(d, a.z);
  const h = Math.hypot(dx, dz) || 1;
  const rho = 1 / Math.hypot(dx / h / a.a, dz / h / (dz >= 0 ? a.f : a.b));
  const esquerdo = (_: string, p: number[]) => p[0]! > 0;
  const mao = entraNasPartes(e, (parte, p) => parte === 'coxa' && esquerdo(parte, p), (parte, p) => (parte === 'mao' || parte === 'polegar') && esquerdo(parte, p));
  const ante = entraNasPartes(e, (parte, p) => parte === 'coxa' && esquerdo(parte, p), (parte, p) => parte === 'ante' && esquerdo(parte, p));
  const encosta = distanciaEntre(e, (parte, p) => parte === 'mao' && esquerdo(parte, p), (parte, p) => parte === 'coxa' && esquerdo(parte, p));
  return { t, fora: h - rho, borda: a.a - Math.abs(dx), mao, ante, encosta };
}

export const REGRAS_REMADA_UNILATERAL_ELASTICO: Record<string, Regra> = {
  'remada-elastico-mao-de-apoio-sobre-a-coxa': (_q, corpo, ex) => {
    // No ciclo (5 instantes) e em cada erro (no começo, no meio, no fim e no instante dele): o centro da mão de apoio
    // fica fora da pele da coxa da frente (a palma pousa nela), entre o quadril e o joelho e sobre a coxa (dentro da
    // largura dela); a mão e o antebraço não entram na coxa mais que o amassado da pele (1,5 e 1 cm), e a mão encosta
    // (a até 1,5 cm). A remada é de um braço só: a outra mão segura o elástico e não apoia.
    if (!ex) return { medido: 'a regra precisa do exercício (a conferência o passa)', ok: false };
    const casos: { onde: string; q: Quadro }[] = [];
    for (const u of [0, 0.25, 0.5, 0.75, 1]) casos.push({ onde: 'ciclo', q: ex.quadro(corpo, u) });
    for (const er of ex.ficha.erros) for (const u of [...new Set([0, 0.5, 1, er.instante])]) casos.push({ onde: er.titulo, q: ex.quadro(corpo, u, er.id) });
    const pior = { t0: 1e9, t1: -1e9, fora: 1e9, borda: 1e9, mao: -1e9, ante: -1e9, encosta: -1e9 };
    const onde = { fora: '', mao: '', ante: '' };
    for (const { onde: o, q } of casos) {
      const m = maoNaCoxa(q.esq);
      pior.t0 = Math.min(pior.t0, m.t);
      pior.t1 = Math.max(pior.t1, m.t);
      if (m.fora < pior.fora) [pior.fora, onde.fora] = [m.fora, o];
      pior.borda = Math.min(pior.borda, m.borda);
      if (m.mao > pior.mao) [pior.mao, onde.mao] = [m.mao, o];
      if (m.ante > pior.ante) [pior.ante, onde.ante] = [m.ante, o];
      pior.encosta = Math.max(pior.encosta, m.encosta);
    }
    return {
      medido:
        `o centro da mão de apoio fica de ${f1(pior.t0 * 100)}% a ${f1(pior.t1 * 100)}% do caminho do quadril ao joelho, no mínimo ${f1(pior.fora)} cm fora da pele da coxa (${onde.fora}; negativo = dentro) e ${f1(pior.borda)} cm para dentro da borda lateral dela; ` +
        `a pele da mão entra até ${f1(Math.max(0, pior.mao))} cm na coxa (${onde.mao}) e a do antebraço até ${f1(Math.max(0, pior.ante))} cm (${onde.ante}); a mão fica a até ${f1(pior.encosta)} cm da pele da coxa`,
      ok: pior.t0 >= 0.4 && pior.t1 <= 1 && pior.fora >= 0 && pior.borda >= 0 && pior.mao <= 1.5 && pior.ante <= 1 && pior.encosta <= 1.5,
    };
  },
};
