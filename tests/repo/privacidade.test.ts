import { execSync } from 'node:child_process';
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
});
