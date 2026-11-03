// Revisão de design (03/11/2026), ponto 2: em quais animações o laranja do desenho mistura o "secundário que conta"
// (meia série na biblioteca) com o músculo que "só ajuda" (desenhado, mas não contado para aquele exercício).
// Uso: npx vite-node scripts/design/ajudantes.ts  → docs/revisoes/design/ajudantes.json
import { writeFileSync } from 'node:fs';
import { BIBLIOTECA } from '../../src/domain/biblioteca';
import { EX } from '../../src/engine';
import { listaDe } from '../../src/engine/estilo/musculos';
import { FORMA } from '../auditoria/anatomia-regras';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
const linhas = EX.map((ex: Animacao) => {
  const exs = BIBLIOTECA.filter((e) => e.animacaoId === ex.id);
  const conta = new Set<string>(exs.flatMap((e) => [...e.musculos.primarios, ...e.musculos.secundarios]));
  const s = new Set<string>(),
    ajuda = new Set<string>();
  for (const [forma, , tipo] of listaDe(ex) as [string, string, 'p' | 's'][]) {
    if (tipo !== 's') continue;
    (conta.has(FORMA[forma]!) ? s : ajuda).add(FORMA[forma]!);
  }
  return { animacao: ex.id, exercicios: exs.map((e) => e.id), secundarioQueConta: [...s], soAjuda: [...ajuda] };
});
writeFileSync('docs/revisoes/design/ajudantes.json', JSON.stringify(linhas, null, 1) + '\n');
const com = linhas.filter((l: { soAjuda: string[] }) => l.soAjuda.length);
console.log(`${com.length} de ${linhas.length} animações têm laranja que só ajuda`);
for (const l of com) console.log(l.animacao, '| conta:', l.secundarioQueConta.join(', ') || '—', '| só ajuda:', l.soAjuda.join(', '));
