import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { build } from 'esbuild';
import { describe, expect, it } from 'vitest';

// Cada função de api/ tem de carregar no Node puro, como a Vercel a carrega. O Vitest não serve para isto: ele adapta
// as importações por conta própria. Em 22/11/2026, `import webpush from 'web-push'` (módulo ES sem exportação padrão)
// passava nos tipos e nos testes e quebrava ao iniciar na Vercel ("FUNCTION_INVOCATION_FAILED").
// Aqui o arquivo é empacotado sem as bibliotecas (ficam como importações, do jeito que a Vercel as resolve) e importado
// por um processo do Node.
const funcoes = readdirSync('api').filter((f) => f.endsWith('.ts'));

describe('as funções de api/ carregam no Node', () => {
  it.each(funcoes)('api/%s', async (arquivo) => {
    const pasta = 'node_modules/.tmp/api-carrega';
    mkdirSync(pasta, { recursive: true });
    const saida = `${pasta}/${arquivo.replace(/\.ts$/, '.mjs')}`;
    await build({ entryPoints: [`api/${arquivo}`], outfile: saida, bundle: true, packages: 'external', format: 'esm', platform: 'node', logLevel: 'silent' });
    const tipo = execFileSync(process.execPath, ['--input-type=module', '-e', `const m = await import(${JSON.stringify(`./${saida}`)}); console.log(typeof m.POST)`], {
      encoding: 'utf8',
      env: { ...process.env, ANTHROPIC_API_KEY: '', VITE_AVISO_CHAVE: '' },
    });
    expect(tipo.trim().split('\n').pop()).toBe('function'); // a função pode registrar uma linha ao iniciar; vale a última
  });
});
