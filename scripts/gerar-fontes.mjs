// Gera src/conteudo/fontes.json a partir de docs/pesquisa/fontes.md (pedido ao domínio 1 do redesign, aprovado em 06/11/2026):
// a citação por extenso, o link e o quanto foi lido de cada fonte que as regras citam, para o selo de evidência abrir a
// referência no celular. Só entram as fontes usadas em src/domain/regras/regras.json.
// Uso: node scripts/gerar-fontes.mjs   (tests/repo/fontes-sync.test.ts falha se o JSON estiver desatualizado)
import { readFileSync, writeFileSync } from 'node:fs';

const LEITURA = { 'texto-completo': 'texto-completo', 'resumo-PubMed': 'resumo', 'verificado-busca': 'busca', 'NÃO VERIFICADO': 'nao-verificado' };

/** Lê as linhas "- `chave` — citação. PMID: … | DOI: … | link — **status:** … — conferido em …" das chaves pedidas. */
export function lerFontes(md, chaves) {
  const fontes = {};
  for (const linha of md.split('\n')) {
    const m = linha.match(/^- `([^`]+)` — (.*?)\s*PMID: ([^|]*)\|\s*DOI: ([^|]*)\|(.*?)— \*\*status:\*\* (NÃO VERIFICADO|[\w-]+)/);
    if (!m || !chaves.has(m[1])) continue;
    // com PMID, o link é o do PubMed (o registro oficial); sem ele, o primeiro endereço da linha
    const pmid = m[3].trim().match(/^\d+$/)?.[0];
    const link = pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : (m[5].match(/https?:\/\/[^\s;]+/)?.[0] ?? '');
    fontes[m[1]] = { citacao: m[2].trim(), link, leitura: LEITURA[m[6]] ?? 'nao-verificado' };
  }
  return Object.fromEntries(Object.entries(fontes).sort(([a], [b]) => a.localeCompare(b)));
}

export function chavesDasRegras(regras) {
  return new Set(regras.flatMap((r) => r.fontes));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const regras = JSON.parse(readFileSync('src/domain/regras/regras.json', 'utf8'));
  const chaves = chavesDasRegras(regras);
  const fontes = lerFontes(readFileSync('docs/pesquisa/fontes.md', 'utf8'), chaves);
  const faltam = [...chaves].filter((c) => !fontes[c]);
  if (faltam.length) console.warn(`sem linha em fontes.md: ${faltam.join(', ')}`);
  writeFileSync('src/conteudo/fontes.json', JSON.stringify(fontes, null, 1) + '\n');
  console.log(`fontes: ${Object.keys(fontes).length} de ${chaves.size} → src/conteudo/fontes.json`);
}
