import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';

// CLAUDE.md: a mesma entrada gera a mesma saída. Dentro de src/domain/ não entram sorteio, relógio, nem nada que
// dependa do idioma ou da versão do navegador (auditoria de 12/11/2026: sobravam `toLocaleString` em dois formatadores
// de carga e um `localeCompare` sem idioma). Para número em texto, src/domain/numero.ts; para desempate, ordem.ts.
const PROIBIDOS = [/\bMath\.random\b/, /\bDate\.now\b/, /\bnew Date\(\s*\)/, /\.toLocaleString\b/, /\.toLocaleDateString\b/, /\.toLocaleTimeString\b/, /\.localeCompare\b/, /\bIntl\./];

function arquivos(pasta: string): string[] {
  return readdirSync(pasta).flatMap((n) => {
    const c = join(pasta, n);
    return statSync(c).isDirectory() ? arquivos(c) : c.endsWith('.ts') ? [c] : [];
  });
}
/** O código sem os comentários de linha e de bloco (os comentários podem citar o que é proibido). */
const semComentarios = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

it('src/domain não usa sorteio, relógio nem funções que dependem do idioma do aparelho', () => {
  const achados = arquivos('src/domain').flatMap((arq) => {
    const codigo = semComentarios(readFileSync(arq, 'utf8'));
    return PROIBIDOS.filter((p) => p.test(codigo)).map((p) => `${arq}: ${p.source}`);
  });
  expect(achados).toEqual([]);
});
