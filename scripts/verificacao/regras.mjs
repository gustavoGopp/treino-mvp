// As regras puras da verificação (docs/verificacao/README.md): o que é "só texto", que comando regrava um gabarito e
// quais passos o `npm run verificar` roda. Sem git, sem disco: o resto de scripts/verificacao/ usa estas funções, e
// tests/repo/verificacao.test.ts as confere.

/**
 * Os passos do `npm run verificar`, na ordem: do mais barato ao mais caro, parando no primeiro que falha. São os mesmos
 * que a verificação automática do GitHub roda (.github/workflows/ci.yml chama `npm run verificar`), para que "passou
 * aqui" e "passou lá" queiram dizer a mesma coisa (a lição de 17/11/2026).
 */
export const PASSOS = [
  { nome: 'lint', comando: ['npm', 'run', 'lint'] },
  { nome: 'tipos', comando: ['npm', 'run', 'typecheck'] },
  { nome: 'unitários com cobertura', comando: ['npm', 'run', 'test:cobertura'] },
  { nome: 'telas (Playwright)', comando: ['npm', 'run', 'test:e2e'] },
];

/**
 * Um arquivo "livre" não muda o que os testes conferem: um texto em Markdown fora da pesquisa. A pesquisa fica de fora
 * porque os testes do repositório leem `docs/pesquisa/regras.md`, `fontes.md`, as fichas das animações e a
 * `docs/pesquisa-v2/` (tests/repo/pesquisa.test.ts, regras-sync, fontes-sync, tests/unit/anatomia.test.ts).
 * Imagens também ficam de fora: o teste de privacidade olha as fotos versionadas.
 */
export function ehLivre(caminho) {
  if (!caminho.endsWith('.md')) return false;
  return !caminho.startsWith('docs/pesquisa/') && !caminho.startsWith('docs/pesquisa-v2/');
}

/** Os arquivos que pedem verificação, numa lista de caminhos alterados. */
export function quePedemVerificacao(caminhos) {
  return caminhos.filter((c) => c && !ehLivre(c));
}

/**
 * Um comando que regrava um gabarito: os snapshots das personas (`vitest -u`, `--update`) ou as linhas de base do
 * motor (`--update-snapshots`, as variáveis `ATUALIZAR_*`). O gabarito é o que julga
 * a mudança; regravá-lo é decisão do Gustavo (CLAUDE.md, "Verificação").
 */
export function regravaGabarito(comando) {
  if (/\bATUALIZAR_[A-Z_]+=/.test(comando)) return true;
  if (/--update-snapshots\b/.test(comando)) return true;
  const rodaTeste = /\b(vitest|playwright|npm (run )?test|npx vitest|npx playwright)\b/.test(comando);
  return rodaTeste && /(^|\s)(-u|--update)(\s|$)/.test(comando);
}

/** Um caminho de gabarito: os snapshots das personas e as linhas de base do motor. */
export function ehGabarito(caminho) {
  return /(^|\/)tests\/unit\/__snapshots__\//.test(caminho) || /(^|\/)tests\/visual\/linha-de-base\//.test(caminho);
}
