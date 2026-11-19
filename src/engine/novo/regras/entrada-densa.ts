// O que as regras de entrada densa de alguns exercícios medem (acréscimo de 19/11/2026, a auditoria da fase C: o braço
// no encosto do hack, do supino e do desenvolvimento na máquina). Não é uma regra: cada família diz de qual exercício.
//
// A pergunta é a da conferência automática ("o corpo atravessa uma peça", ../conferir.ts): quanto a pele entra numa
// caixa, a menor distância do ponto às faces dela, com a mesma tolerância (2,5 cm, o corpo amassa o estofado) e as
// mesmas partes (todas menos as mãos e os pés, que encostam nas peças de propósito). O que muda: a pele densa
// (../pele-densa.ts, 36 pontos por anel e 3 anéis entre dois vizinhos, e não 12 pontos por anel) e os quadros (a
// técnica toda e os erros, e não 6 quadros da técnica).
import { f1 } from '../conferir-util';
import type { Exercicio, Quadro } from '../movimento';
import { maiorEntrada, peleDensa } from '../pele-densa';
import type { Corpo } from '../tabelas';

/** A tolerância da conferência automática: o corpo amassa o estofado (cm). */
export const TOLERANCIA_DE_ENTRADA = 2.5;

/** O pior quadro de uma peça (a classe da caixa) e de uma parte do corpo. */
export interface PiorEntrada {
  peca: string;
  parte: string;
  d: number;
  onde: string;
}

/**
 * A entrada da pele densa nas caixas do quadro (menos o tapete), na técnica (os quadros dados, um a cada três, e o
 * último) e em cada erro (u de 0 a 1, de 1/8 em 1/8). Devolve o pior de cada peça e parte, do maior para o menor.
 */
export function entradaDensa(ex: Exercicio, q: Quadro[], corpo: Corpo): PiorEntrada[] {
  const quadros: [Quadro, string][] = [];
  q.forEach((x, i) => {
    if (i % 3 === 0 || i === q.length - 1) quadros.push([x, `técnica, quadro ${i + 1} de ${q.length}`]);
  });
  for (const e of ex.ficha.erros) for (let i = 0; i <= 8; i++) quadros.push([ex.quadro(corpo, i / 8, e.id), `erro "${e.titulo}", u = ${f1(i / 8)}`]);
  const pior = new Map<string, PiorEntrada>();
  for (const [x, onde] of quadros) {
    const pele = peleDensa(x.esq);
    const partes = [...new Set(pele.map((p) => p.parte))];
    for (const p of x.prims) {
      if (p.t !== 'caixa' || p.cls === 'tapete') continue;
      for (const parte of partes) {
        const r = maiorEntrada(
          pele.filter((y) => y.parte === parte),
          [p],
        );
        if (r.d <= 0) continue;
        const k = `${p.cls}|${parte}`;
        if (!pior.has(k) || r.d > pior.get(k)!.d) pior.set(k, { peca: p.cls, parte, d: r.d, onde });
      }
    }
  }
  return [...pior.values()].sort((a, b) => b.d - a.d);
}

const NOMES: Record<string, string> = { braco: 'braço', ante: 'antebraço', coxa: 'coxa', canela: 'canela', tronco: 'tronco', cintura: 'ombro (cintura escapular)', emendaDaCintura: 'cintura', pelve: 'bacia', pescoco: 'pescoço', cabeca: 'cabeça' };
const nome = (parte: string) => {
  const base = parte.replace(/[RL]$/, '');
  const a = ['coxa', 'canela'].includes(base) ? 'a' : 'o';
  const lado = parte.endsWith('R') ? ` direit${a}` : parte.endsWith('L') ? ` esquerd${a}` : '';
  return `${NOMES[base] ?? base}${lado}`;
};
/** O que foi medido, em texto: as que passam de 1 cm (as outras só encostam), com o quadro das que passam da tolerância. */
export function textoDaEntrada(r: PiorEntrada[]): string {
  const mostra = r.filter((x) => x.d > 1);
  if (!mostra.length) return `nenhuma parte entra mais que 1 cm${r.length ? ` (no máximo ${f1(r[0]!.d)} cm: ${nome(r[0]!.parte)})` : ''}`;
  return mostra.map((x) => `${nome(x.parte)} no ${x.peca} ${f1(x.d)} cm${x.d > TOLERANCIA_DE_ENTRADA ? ` (${x.onde})` : ''}`).join('; ');
}
/** Nenhuma parte além da tolerância. */
export const dentroDaTolerancia = (r: PiorEntrada[]) => r.every((x) => x.d <= TOLERANCIA_DE_ENTRADA);
