import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { build } from 'esbuild';

// Linha de base do boneco padrão (estilo A, decisão do Gustavo em 02/11/2026): todos os exercícios, em cada
// vista e modo e em cada erro, a 24 tempos por ciclo. Ela só é gravada depois que o Gustavo aprova as folhas de
// contatos; depois disso, qualquer mudança no desenho do boneco falha aqui.
// Gravar depois de uma aprovação: ATUALIZAR_ESTILO_A=1 npx playwright test --project=motor estilo-a
// O estilo clássico continua comparado com o guia original em equivalencia.spec.ts e no guia-visual.spec.ts.
const CAMINHO = 'tests/visual/linha-de-base/estilo-a.json';
const N = 24;
const sha = (s: string) => createHash('sha256').update(s).digest('hex');
type Base = { nTempos: number; exercicios: { id: string; quadros: Record<string, string[]> }[] };

test('o boneco padrão (estilo A) continua igual ao aprovado', async ({ page }) => {
  const gerar = !!process.env.ATUALIZAR_ESTILO_A;
  test.skip(!gerar && !existsSync(CAMINHO), 'linha de base do estilo A ainda não aprovada');
  const bundle = await build({
    stdin: { contents: `export * from './src/engine/index.ts'; export * from './src/engine/estilo/index.ts';`, resolveDir: process.cwd(), loader: 'ts' },
    bundle: true,
    format: 'iife',
    globalName: 'MOTOR',
    write: false,
  });
  await page.setContent('<!doctype html><title>motor</title>');
  await page.addScriptTag({ content: bundle.outputFiles[0]!.text });
  const atual = await page.evaluate((n) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const M = (globalThis as any).MOTOR;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return M.EX.map((ex: any) => {
      const chaves = [
        ...ex.views.flatMap((v: string) => [`${v}|tec`, `${v}|mus`, `${v}|traj`]),
        ...ex.errors.map((e: { id: string; view: string }) => `${e.view}|err|${e.id}`),
      ];
      const quadros = Object.fromEntries(
        chaves.map((chave: string) => {
          const [view, mode, errId] = chave.split('|');
          const errIdx = errId ? ex.errors.findIndex((e: { id: string }) => e.id === errId) : 0;
          return [chave, Array.from({ length: n }, (_, i) => M.montarSvgEstilo(ex, view, mode, (i / n) * ex.T, errIdx, 360, 'a').html as string)];
        }),
      );
      return { id: ex.id, quadros };
    });
  }, N);
  const hashes: Base = {
    nTempos: N,
    exercicios: atual.map((e: { id: string; quadros: Record<string, string[]> }) => ({ id: e.id, quadros: Object.fromEntries(Object.entries(e.quadros).map(([k, qs]) => [k, qs.map(sha)])) })),
  };
  if (gerar) {
    writeFileSync(CAMINHO, JSON.stringify(hashes, null, 1) + '\n');
    return;
  }
  const base: Base = JSON.parse(readFileSync(CAMINHO, 'utf8'));
  expect(hashes.exercicios.map((e) => e.id), 'exercício sem linha de base do estilo A').toEqual(base.exercicios.map((e) => e.id));
  for (const [i, b] of base.exercicios.entries()) expect.soft(hashes.exercicios[i], b.id).toEqual(b);
});
