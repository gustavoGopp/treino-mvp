import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Garante o princípio de privacidade: nada de privado/ nem segredos no repositório.
const tracked = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter(Boolean);

describe('repositório', () => {
  it('não versiona nada de privado/', () => {
    expect(tracked.filter((f) => f.startsWith('privado/'))).toEqual([]);
  });

  it('não versiona arquivos .env (exceto .env.example)', () => {
    expect(tracked.filter((f) => /(^|\/)\.env(\.|$)/.test(f) && !f.endsWith('.env.example'))).toEqual([]);
  });

  it('não versiona uma cópia exportada pelo app (R5a: o script scripts/export/ler-export.ts lê um export real só localmente)', () => {
    expect(tracked.filter((f) => /(^|\/)treino-mvp-\d{4}-\d{2}-\d{2}\.json$/.test(f))).toEqual([]);
  });

  it('não versiona fotos fora de public/', () => {
    expect(tracked.filter((f) => /\.(jpe?g|heic)$/i.test(f) && !f.startsWith('public/'))).toEqual([]);
  });

  it('não versiona e-mail pessoal em nenhum arquivo de texto (CLAUDE.md: nenhum dado pessoal vai para o repositório)', () => {
    // Endereços públicos de terceiros que os documentos citam de propósito, e os de exemplo dos testes.
    const PERMITIDOS = [/^eparmedx@gmail\.com$/, /@example\.(com|org)$/, /^noreply@anthropic\.com$/, /@exemplo\./];
    const TEXTO = /\.(md|ts|tsx|mjs|cjs|js|json|html|css|yml|yaml|txt|py|sh|svg)$|(^|\/)\.env\.example$/;
    const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
    const achados: string[] = [];
    for (const f of tracked.filter((x) => TEXTO.test(x) && x !== 'package-lock.json')) {
      let texto: string;
      try {
        texto = readFileSync(f, 'utf8');
      } catch {
        continue; // apagado na árvore de trabalho, ainda no índice
      }
      for (const e of texto.match(EMAIL) ?? []) if (!PERMITIDOS.some((p) => p.test(e))) achados.push(`${f}: ${e}`);
    }
    expect(achados).toEqual([]);
  });
});
