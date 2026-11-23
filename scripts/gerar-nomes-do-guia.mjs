// Gera src/conteudo/nomes-curtos.json a partir de src/conteudo/exercicios/*.json: o nome curto (`short`) de cada texto
// do guia, pelo id. O guia mostra esses nomes nos botões do dia; com eles num arquivo pequeno, a tela baixa só o texto
// do exercício aberto, e não os 171 (pacote D4, 23/11/2026).
// Uso: node scripts/gerar-nomes-do-guia.mjs   (tests/unit/conteudo.test.ts falha se o JSON estiver desatualizado)
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const PASTA = 'src/conteudo/exercicios';

/** O nome curto de cada texto do guia (os que têm "onde sentir"; o cartão de texto não entra), em ordem de id. */
export function nomesCurtos() {
  const nomes = {};
  for (const arquivo of readdirSync(PASTA).filter((a) => a.endsWith('.json')).sort()) {
    const t = JSON.parse(readFileSync(`${PASTA}/${arquivo}`, 'utf8'));
    if ('feel' in t) nomes[t.id] = t.short;
  }
  return nomes;
}

if (process.argv[1]?.endsWith('gerar-nomes-do-guia.mjs')) {
  const nomes = nomesCurtos();
  writeFileSync('src/conteudo/nomes-curtos.json', JSON.stringify(nomes, null, 1) + '\n');
  console.log(`src/conteudo/nomes-curtos.json: ${Object.keys(nomes).length} nomes`);
}
