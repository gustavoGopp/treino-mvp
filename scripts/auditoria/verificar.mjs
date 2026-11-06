// Confere que a auditoria é determinística: roda o comando duas vezes e compara os hashes dos arquivos gerados.
// Uso: node scripts/auditoria/verificar.mjs                    (npm run auditoria, duas vezes)
//      node scripts/auditoria/verificar.mjs "npm run auditoria:qualidade"
// Sai com código 1 e lista os arquivos que mudaram entre as rodadas. Sessão de qualidade dos treinos (05/11/2026).
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const comando = process.argv[2] ?? 'npm run auditoria';
const PASTAS = ['docs/revisoes/auditoria', 'docs/revisoes/anatomia', 'docs/revisoes/equipamento-minimo', 'docs/revisoes/catalogo', 'docs/revisoes/qualidade'];

function arquivos(pasta) {
  const out = [];
  for (const nome of readdirSync(pasta).sort()) {
    const p = join(pasta, nome);
    if (statSync(p).isDirectory()) out.push(...arquivos(p));
    else if (/\.(md|json)$/.test(nome)) out.push(p);
  }
  return out;
}
const hashes = () => Object.fromEntries(PASTAS.flatMap((p) => arquivos(p)).map((f) => [f, createHash('sha256').update(readFileSync(f)).digest('hex')]));

const rodar = (n) => {
  console.log(`rodada ${n}: ${comando}`);
  execSync(comando, { stdio: 'inherit' });
  return hashes();
};
const a = rodar(1);
const b = rodar(2);
const todos = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
const diferentes = todos.filter((f) => a[f] !== b[f]);
if (diferentes.length) {
  console.error(`\n${diferentes.length} arquivo(s) mudaram entre as duas rodadas:\n${diferentes.map((f) => `  ${f}`).join('\n')}`);
  process.exit(1);
}
console.log(`\n${todos.length} arquivos idênticos nas duas rodadas.`);
