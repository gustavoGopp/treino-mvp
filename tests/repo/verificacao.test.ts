import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ehGabarito, ehLivre, PASSOS, quePedemVerificacao, regravaGabarito } from '../../scripts/verificacao/regras.mjs';

// A verificação do projeto (docs/verificacao/README.md): o comando local e o do GitHub são o mesmo, e as regras que os
// ganchos do Claude Code usam (o que é só texto, o que regrava um gabarito) fazem o que dizem.

describe('o comando local e o do GitHub são o mesmo', () => {
  const ci = readFileSync('.github/workflows/ci.yml', 'utf8');
  const pacote = JSON.parse(readFileSync('package.json', 'utf8')) as { scripts: Record<string, string> };

  it('o CI roda `npm run verificar` e nenhum passo de teste por fora dele (a lição de 17/11/2026)', () => {
    const passos = [...ci.matchAll(/^\s*- run: (.+)$/gm)].map((m) => m[1]!.trim());
    expect(passos).toContain('npm run verificar');
    expect(passos.filter((p) => /lint|typecheck|vitest|test|playwright test/.test(p) && p !== 'npm run verificar')).toEqual([]);
  });

  it('o verificar roda lint, tipos, unitários com cobertura e telas, do mais barato ao mais caro', () => {
    expect(pacote.scripts.verificar).toBe('node scripts/verificacao/verificar.mjs');
    expect(PASSOS.map((p) => p.comando.join(' '))).toEqual(['npm run lint', 'npm run typecheck', 'npm run test:cobertura', 'npm run test:e2e']);
    for (const p of PASSOS) expect(pacote.scripts[p.comando[2]!], p.comando[2]).toBeDefined();
  });

  it('os ganchos do Claude Code apontam para scripts que existem', () => {
    const config = readFileSync('.claude/settings.json', 'utf8');
    const scripts = [...config.matchAll(/node (scripts\/verificacao\/[a-z-]+\.mjs)/g)].map((m) => m[1]!);
    expect(new Set(scripts)).toEqual(new Set(['scripts/verificacao/ao-iniciar.mjs', 'scripts/verificacao/ao-parar.mjs', 'scripts/verificacao/portao-envio.mjs', 'scripts/verificacao/guarda-gabarito.mjs']));
    for (const s of scripts) expect(() => readFileSync(s)).not.toThrow();
  });
});

describe('o que é só texto livre', () => {
  it('Markdown fora da pesquisa é livre', () => {
    for (const c of ['docs/devlog.md', 'docs/backlog.md', 'CLAUDE.md', 'docs/revisoes/x/y.md', '.claude/skills/verificar/SKILL.md']) expect(ehLivre(c), c).toBe(true);
  });

  it('a pesquisa, o código, os dados e as imagens pedem verificação (os testes do repositório leem a pesquisa)', () => {
    for (const c of ['docs/pesquisa/regras.md', 'docs/pesquisa/fontes.md', 'docs/pesquisa/animacoes/bulgaro.md', 'docs/pesquisa-v2/17-biblioteca-ampliada.md', 'src/domain/gerador/index.ts', 'docs/img/m1-guia.gif', 'package.json', '.github/workflows/ci.yml'])
      expect(ehLivre(c), c).toBe(false);
    expect(quePedemVerificacao(['docs/devlog.md', 'src/App.tsx', ''])).toEqual(['src/App.tsx']);
  });
});

describe('o que regrava um gabarito', () => {
  it('reconhece os comandos que regravam snapshots e linhas de base', () => {
    for (const c of [
      'npx vitest run -u',
      'npm run test -- -u',
      'npx vitest run tests/unit/gerador.test.ts --update',
      'npx playwright test --update-snapshots',
      'ATUALIZAR_ESTILO_A=1 npx playwright test tests/motor/estilo-a.spec.ts',
      'node scripts/linha-de-base-motor.mjs',
    ])
      expect(regravaGabarito(c), c).toBe(true);
  });

  it('não confunde com comandos comuns', () => {
    for (const c of ['npm run check', 'npx vitest run tests/unit/gerador.test.ts', 'git push -u origin ramo', 'npm run test:e2e -- --trace off', 'sort -u lista.txt', 'npm run verificar'])
      expect(regravaGabarito(c), c).toBe(false);
  });

  it('reconhece os arquivos de gabarito', () => {
    expect(ehGabarito('tests/unit/__snapshots__/gerador.test.ts.snap')).toBe(true);
    expect(ehGabarito('tests/visual/linha-de-base/motor.json')).toBe(true);
    expect(ehGabarito('tests/unit/gerador.test.ts')).toBe(false);
  });
});

describe('os ganchos, rodados de verdade', () => {
  const rodar = (script: string, entrada: object) =>
    execFileSync('node', [`scripts/verificacao/${script}`], { input: JSON.stringify(entrada), encoding: 'utf8' });

  it('a guarda pede confirmação ao regravar um gabarito, e fica calada no resto', () => {
    const pede = JSON.parse(rodar('guarda-gabarito.mjs', { tool_name: 'Bash', tool_input: { command: 'npx vitest run -u' } }));
    expect(pede.hookSpecificOutput.permissionDecision).toBe('ask');
    const edita = JSON.parse(rodar('guarda-gabarito.mjs', { tool_name: 'Write', tool_input: { file_path: join(process.cwd(), 'tests/visual/linha-de-base/motor.json') } }));
    expect(edita.hookSpecificOutput.permissionDecision).toBe('ask');
    expect(rodar('guarda-gabarito.mjs', { tool_name: 'Bash', tool_input: { command: 'npm run check' } })).toBe('');
    expect(rodar('guarda-gabarito.mjs', { tool_name: 'Edit', tool_input: { file_path: join(process.cwd(), 'src/App.tsx') } })).toBe('');
  });

  it('o retrato da árvore não mexe no índice real do git', () => {
    const antes = execFileSync('git', ['diff', '--cached', '--name-only'], { encoding: 'utf8' });
    const arvore = execFileSync('node', ['-e', "import('./scripts/verificacao/estado.mjs').then((m) => console.log(m.arvoreAtual()))"], { encoding: 'utf8' });
    expect(arvore.trim()).toMatch(/^[0-9a-f]{40}$/);
    expect(execFileSync('git', ['diff', '--cached', '--name-only'], { encoding: 'utf8' })).toBe(antes);
  });
});
