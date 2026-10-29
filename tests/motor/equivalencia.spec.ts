import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { build } from 'esbuild';

// O motor portado (src/engine) tem que gerar exatamente o mesmo SVG que o guia original, quadro a quadro.
// Roda dentro do Chromium, o mesmo motor JS que gerou a linha de base: o Node usa outra versão do V8,
// e algumas funções matemáticas diferem no último bit.
type Base = {
  nTempos: number;
  check: string[];
  exercicios: {
    id: string;
    T: number;
    L0: unknown;
    lift: unknown;
    fits: Record<string, number[]>;
    frames: Record<string, string[]>;
  }[];
};
const base: Base = JSON.parse(readFileSync('tests/visual/linha-de-base/motor.json', 'utf8'));
const sha = (s: string) => createHash('sha256').update(s).digest('hex');

test('motor portado gera os mesmos quadros que o guia original', async ({ page }) => {
  const bundle = await build({
    entryPoints: ['src/engine/index.ts'],
    bundle: true,
    format: 'iife',
    globalName: 'MOTOR',
    write: false,
  });
  await page.setContent('<!doctype html><title>motor</title>');
  await page.addScriptTag({ content: bundle.outputFiles[0]!.text });

  const atual = await page.evaluate((b) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const M = (globalThis as any).MOTOR;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quadro = (ex: any, view: string, mode: string, t: number, err: number) => {
      M.CTX.KS = 1;
      M.scene(ex, view, mode, t, err);
      return M.CTX.prims
        .slice()
        .sort((x: { l: number; d: number }, y: { l: number; d: number }) => x.l - y.l || x.d - y.d)
        .map((p: { s: string }) => p.s)
        .join('');
    };
    return {
      ids: M.EX.map((e: { id: string }) => e.id),
      check: M.check(),
      exercicios: b.exercicios.map((be) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ex = M.EX.find((e: any) => e.id === be.id);
        const fits = Object.fromEntries(Object.keys(be.fits).map((v) => [v, M.fit(ex, v)]));
        const frames = Object.fromEntries(
          Object.entries(be.frames).map(([chave, hashes]) => {
            const [view, mode, errId] = chave.split('|');
            const errIdx = errId ? ex.errors.findIndex((e: { id: string }) => e.id === errId) : 0;
            return [chave, hashes.map((_, i) => quadro(ex, view!, mode!, (i / b.nTempos) * ex.T, errIdx))];
          }),
        );
        return { id: be.id, T: ex.T, L0: ex.L0, lift: ex._liftRange ?? null, fits, frames };
      }),
    };
  }, base);

  expect(atual.ids).toEqual(base.exercicios.map((e) => e.id));
  expect(atual.check).toEqual(base.check);
  for (const linha of atual.check) expect(linha).toMatch(/ik=0 /);
  let n = 0;
  for (const [i, b] of base.exercicios.entries()) {
    const a = atual.exercicios[i]!;
    expect.soft({ T: a.T, L0: a.L0, lift: a.lift, fits: a.fits }, b.id).toEqual({ T: b.T, L0: b.L0, lift: b.lift, fits: b.fits });
    for (const [chave, hashes] of Object.entries(b.frames)) {
      hashes.forEach((h, q) => {
        expect.soft(sha(a.frames[chave]![q]!), `${b.id} ${chave} quadro ${q}`).toBe(h);
        n++;
      });
    }
  }
  expect(n).toBe(4968);
});
