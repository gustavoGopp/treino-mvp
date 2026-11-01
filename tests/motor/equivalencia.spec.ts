import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
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
// Animações novas (criadas depois do guia original): a linha de base é a versão aprovada pelo Gustavo.
// Gerar ou atualizar depois de uma aprovação: ATUALIZAR_NOVAS=1 npx playwright test --project=motor
const CAMINHO_NOVAS = 'tests/visual/linha-de-base/novas.json';
const novas: Base = existsSync(CAMINHO_NOVAS)
  ? JSON.parse(readFileSync(CAMINHO_NOVAS, 'utf8'))
  : { nTempos: 24, check: [], exercicios: [] };
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

  const atual = await page.evaluate(({ b, n, gerar }) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      novas: M.EX.slice(b.exercicios.length).map((ex: any) => {
        const chaves = gerar
          ? [
              ...ex.views.flatMap((v: string) => [`${v}|tec`, `${v}|mus`, `${v}|traj`]),
              ...ex.errors.map((e: { id: string; view: string }) => `${e.view}|err|${e.id}`),
            ]
          : Object.keys(n.exercicios.find((x) => x.id === ex.id)?.frames ?? {});
        const fits = Object.fromEntries(ex.views.map((v: string) => [v, M.fit(ex, v)]));
        const frames = Object.fromEntries(
          chaves.map((chave: string) => {
            const [view, mode, errId] = chave.split('|');
            const errIdx = errId ? ex.errors.findIndex((e: { id: string }) => e.id === errId) : 0;
            return [chave, Array.from({ length: n.nTempos }, (_, i) => quadro(ex, view!, mode!, (i / n.nTempos) * ex.T, errIdx))];
          }),
        );
        return { id: ex.id, T: ex.T, L0: ex.L0, lift: ex._liftRange ?? null, fits, frames };
      }),
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
  }, { b: base, n: novas, gerar: !!process.env.ATUALIZAR_NOVAS });

  const nOrig = base.exercicios.length;
  expect(atual.ids.slice(0, nOrig)).toEqual(base.exercicios.map((e) => e.id));
  expect(atual.check.slice(0, nOrig)).toEqual(base.check);
  for (const linha of atual.check) expect(linha).toMatch(/ik=0 /);

  // Animações novas: toda animação no motor além das originais precisa de linha de base aprovada.
  const novasAtuais = (atual.novas as Base['exercicios']).map((a) => ({ ...a, frames: Object.fromEntries(Object.entries(a.frames).map(([k, qs]) => [k, qs.map(sha)])) }));
  if (process.env.ATUALIZAR_NOVAS) {
    writeFileSync(CAMINHO_NOVAS, JSON.stringify({ nTempos: novas.nTempos, check: atual.check.slice(nOrig), exercicios: novasAtuais }, null, 1) + '\n');
  } else {
    expect(novasAtuais.map((a) => a.id), 'animação nova sem linha de base aprovada').toEqual(novas.exercicios.map((e) => e.id));
    expect(atual.check.slice(nOrig)).toEqual(novas.check);
    for (const [i, b] of novas.exercicios.entries()) expect.soft(novasAtuais[i], b.id).toEqual(b);
  }
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
