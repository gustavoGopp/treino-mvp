// O que uma regra de escolha troca (sessão "treino para todos", etapa 2, pacote 2): entre dois geradores, quais exercícios
// saem e quais entram, em quantos programas, e quantos exercícios por dia ficam sem animação (cartão de texto). Uso:
//   npx vite-node scripts/auditoria/trocas.ts -- --antes <gerador.ts> --depois <gerador.ts> [--passo 29] [--nivel iniciante]
//     [--cenario academia] [--top 25]
// Amostra fixa (1 a cada N casos da população; sem sorteio). As contas são na grade e com os pesos da população.
import { resolve } from 'node:path';
import { POR_ID } from '../../src/domain/biblioteca';
import type { gerarPrograma as Gerar, Programa } from '../../src/domain/gerador';
import { populacao } from './populacao';

const args = process.argv.slice(2);
const arg = (k: string) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
const carregar = async (p: string) => ((await import(/* @vite-ignore */ resolve(p))) as { gerarPrograma: typeof Gerar }).gerarPrograma;
const [antes, depois] = [await carregar(arg('--antes') ?? 'src/domain/gerador/index.ts'), await carregar(arg('--depois') ?? 'src/domain/gerador/index.ts')];
const PASSO = Number(arg('--passo')) || 29;
const NIVEL = arg('--nivel');
const CENARIO = arg('--cenario');
const TOP = Number(arg('--top')) || 25;

const ids = (p: Programa) => new Set(p.dias.flatMap((d) => d.exercicios.map((x) => x.exId)));
const cartoes = (p: Programa) => p.dias.flatMap((d) => d.exercicios).filter((x) => !POR_ID[x.exId]!.animacaoId).length / p.dias.length;
const comTres = (p: Programa) => p.dias.some((d) => d.exercicios.filter((x) => !POR_ID[x.exId]!.animacaoId).length >= 3);

type Conta = { n: number; peso: number };
const sai = new Map<string, Conta>();
const entra = new Map<string, Conta>();
const soma = (m: Map<string, Conta>, k: string, peso: number) => {
  const c = m.get(k) ?? { n: 0, peso: 0 };
  c.n++;
  c.peso += peso;
  m.set(k, c);
};
let [medidos, pesoTotal, mudam, pesoMudam] = [0, 0, 0, 0];
const cart = { antes: 0, depois: 0, antesP: 0, depoisP: 0, tresAntes: 0, tresDepois: 0, tresAntesP: 0, tresDepoisP: 0 };
for (const caso of populacao()) {
  if (caso.indice % PASSO !== 0) continue;
  if (NIVEL && caso.pf.nivel !== NIVEL) continue;
  if (CENARIO && caso.cen.id !== CENARIO) continue;
  const [ra, rb] = [antes(caso.pf, caso.cen.inventario), depois(caso.pf, caso.cen.inventario)];
  if (ra.status !== 'ok' || rb.status !== 'ok') continue;
  medidos++;
  pesoTotal += caso.peso;
  const [a, b] = [ids(ra.programa), ids(rb.programa)];
  const saem = [...a].filter((x) => !b.has(x));
  const entram = [...b].filter((x) => !a.has(x));
  if (saem.length || entram.length) {
    mudam++;
    pesoMudam += caso.peso;
  }
  for (const x of saem) soma(sai, x, caso.peso);
  for (const x of entram) soma(entra, x, caso.peso);
  cart.antes += cartoes(ra.programa);
  cart.depois += cartoes(rb.programa);
  cart.antesP += cartoes(ra.programa) * caso.peso;
  cart.depoisP += cartoes(rb.programa) * caso.peso;
  if (comTres(ra.programa)) {
    cart.tresAntes++;
    cart.tresAntesP += caso.peso;
  }
  if (comTres(rb.programa)) {
    cart.tresDepois++;
    cart.tresDepoisP += caso.peso;
  }
}
const pc = (x: number, t: number) => `${((100 * x) / t).toFixed(1)}%`;
console.log(`${medidos} programas medidos (1 a cada ${PASSO}${NIVEL ? `, ${NIVEL}` : ''}${CENARIO ? `, ${CENARIO}` : ''}).`);
console.log(`Programas com algum exercício trocado: ${pc(mudam, medidos)} na grade, ${pc(pesoMudam, pesoTotal)} com os pesos.`);
console.log(`Cartões de texto por dia: ${(cart.antes / medidos).toFixed(2)} → ${(cart.depois / medidos).toFixed(2)} na grade, ${(cart.antesP / pesoTotal).toFixed(2)} → ${(cart.depoisP / pesoTotal).toFixed(2)} com os pesos.`);
console.log(`Programas com um dia de 3 cartões ou mais: ${pc(cart.tresAntes, medidos)} → ${pc(cart.tresDepois, medidos)} na grade, ${pc(cart.tresAntesP, pesoTotal)} → ${pc(cart.tresDepoisP, pesoTotal)} com os pesos.`);
const lista = (m: Map<string, Conta>) =>
  [...m.entries()]
    .sort((x, y) => y[1].peso - x[1].peso)
    .slice(0, TOP)
    .map(([k, c]) => `  ${k}${POR_ID[k]!.animacaoId ? '' : ' (cartão)'}: ${pc(c.peso, pesoTotal)} com os pesos, ${pc(c.n, medidos)} na grade`)
    .join('\n');
console.log(`\nSaem (em % dos programas):\n${lista(sai)}\n\nEntram:\n${lista(entra)}`);
