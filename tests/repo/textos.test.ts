import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// R1: nada no app contradiz os fatos. A foto do equipamento é enviada (sem localização, sem ficar guardada),
// então "Nada é enviado para servidor" é falso; e "(em breve)" anunciava o que já existe.
const arquivos = execSync('git ls-files src README.md index.html', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && !/\.(png|jpe?g|gif|webp|ico)$/i.test(f));

describe('textos do app', () => {
  it.each(['Nada é enviado para servidor', '(em breve)', 'última registrada'])('nenhum arquivo do app diz "%s"', (frase) => {
    expect(arquivos.filter((f) => readFileSync(f, 'utf8').includes(frase))).toEqual([]);
  });
});
