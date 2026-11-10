// Gera src/domain/regras/regras.json a partir de docs/pesquisa/regras.md (a fonte da verdade, com selo e fontes).
// O app usa o JSON para mostrar o "porquê" de cada decisão com o nível de evidência.
// Uso: node scripts/gerar-regras.mjs   (tests/repo/regras-sync.test.ts falha se o JSON estiver desatualizado)
import { readFileSync, writeFileSync } from 'node:fs';

export function lerRegras(md) {
  const linhas = md.split('\n').filter((l) => l.trim().startsWith('| `'));
  return linhas.map((l) => {
    const c = l.trim().slice(1, -1).split('|').map((x) => x.trim());
    const tira = (s) => s.replace(/`/g, '');
    return {
      id: tira(c[0]),
      regra: c[1],
      valores: { iniciante: c[2], intermediario: c[3], avancado: c[4] },
      selo: c[5],
      fontes: [...c[6].matchAll(/`([^`]+)`/g)].map((m) => m[1]),
    };
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const regras = lerRegras(readFileSync('docs/pesquisa/regras.md', 'utf8'));
  writeFileSync('src/domain/regras/regras.json', JSON.stringify(regras, null, 2) + '\n');
  // R5b: o pacote inicial do app leva só o selo de cada regra; o texto e as fontes vêm quando a folha do selo abre.
  writeFileSync('src/domain/regras/selos.json', JSON.stringify(Object.fromEntries(regras.map((r) => [r.id, r.selo])), null, 1) + '\n');
  console.log(`regras: ${regras.length} → src/domain/regras/regras.json`);
}
