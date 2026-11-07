import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// R1: nada no app contradiz os fatos. A foto do equipamento é enviada (sem localização, sem ficar guardada),
// então "Nada é enviado para servidor" é falso; e "(em breve)" anunciava o que já existe.
const arquivos = execSync('git ls-files src README.md index.html', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && !/\.(png|jpe?g|gif|webp|ico)$/i.test(f));

describe('textos do app', () => {
  // R5c: "não fica guardada no servidor" escondia para onde a foto vai (a Anthropic, nos EUA, que guarda até 30 dias).
  it.each(['Nada é enviado para servidor', '(em breve)', 'última registrada', 'não fica guardada no servidor', 'nada fica guardado no servidor'])('nenhum arquivo do app diz "%s"', (frase) => {
    expect(arquivos.filter((f) => readFileSync(f, 'utf8').includes(frase))).toEqual([]);
  });

  // privacidade.foto: as 3 telas que falam da foto dizem para onde ela vai, com o mesmo texto (src/features/app/privacidade.tsx).
  it.each(['src/features/onboarding/BoasVindas.tsx', 'src/features/onboarding/FotoEquipamento.tsx', 'src/features/dados/Dados.tsx'])(
    '%s usa o texto da foto que diz para onde ela vai',
    (f) => {
      expect(readFileSync(f, 'utf8')).toMatch(/<(TextoFotoCurto|ParaOndeVaiAFoto) \/>/);
    },
  );
  it('o texto da foto diz quem recebe, onde, por quanto tempo e que o servidor do app não guarda', () => {
    const t = readFileSync('src/features/app/privacidade.tsx', 'utf8').replace(/\s+/g, ' ');
    for (const trecho of ['Anthropic', 'EUA', '30 dias', 'O servidor do app não guarda a foto', 'privacidade.foto']) expect(t).toContain(trecho);
  });
});
