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

// Auditoria de 12/11/2026: os termos mandavam a pessoa a "Exportar meus dados" e "Refazer a triagem e o perfil",
// botões que não existem em Meus dados.
describe('os termos citam só o que existe em Meus dados', () => {
  it('cada caminho "Meus dados → X" dos termos é um título ou botão da tela Meus dados', () => {
    const termos = readFileSync('src/features/termos/Termos.tsx', 'utf8');
    const dados = readFileSync('src/features/dados/Dados.tsx', 'utf8');
    const linhas = termos.split('\n').filter((l) => l.includes('“Meus dados” →'));
    expect(linhas.length).toBeGreaterThanOrEqual(4);
    for (const linha of linhas) {
      const citados = [...linha.slice(linha.indexOf('→')).matchAll(/“([^”]+)”/g)].map((m) => m[1]!);
      expect(citados.length, linha).toBeGreaterThan(0);
      for (const nome of citados) expect(dados.includes(`titulo="${nome}"`) || dados.includes(`>\n          ${nome}\n`) || new RegExp(`>\\s*${nome}\\s*<`).test(dados), `"${nome}" não existe em Meus dados`).toBe(true);
    }
  });
});

