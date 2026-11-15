import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { build } from 'esbuild';

// Linha de base do motor novo (src/engine/novo): cada animação aprovada (src/engine/novo/aprovados.ts), como o app a
// mostra (pela ponte: corpo padrão, desenho cinza, tema claro), em cada vista e modo, em cada erro e na miniatura, a
// 8 tempos por ciclo. Ela só guarda animação aprovada; depois disso, qualquer mudança no desenho falha aqui.
// Gravar depois de uma aprovação: ATUALIZAR_MOTOR_NOVO=1 npx playwright test --project=motor motor-novo
const CAMINHO = 'tests/visual/linha-de-base/motor-novo.json';
const N = 8;
const sha = (s: string) => createHash('sha256').update(s).digest('hex');
type Base = {
  nTempos: number;
  exercicios: { id: string; quadros: Record<string, string[]> }[];
};

test('as animações aprovadas do motor novo continuam iguais às aprovadas', async ({ page }) => {
  test.setTimeout(600_000); // as animações aprovadas × vistas × modos × 8 tempos
  const gerar = !!process.env.ATUALIZAR_MOTOR_NOVO;
  test.skip(!gerar && !existsSync(CAMINHO), 'linha de base do motor novo ainda não gravada');
  const bundle = await build({
    stdin: {
      contents: `export { EXERCICIOS } from './src/engine/novo/app.ts'; export { APROVADOS } from './src/engine/novo/aprovados.ts'; export { fichaDoMotorNovo, miniaturaDoMotorNovo, quadroDoMotorNovo } from './src/engine/novo/ponte.ts';`,
      resolveDir: process.cwd(),
      loader: 'ts',
    },
    bundle: true,
    format: 'iife',
    globalName: 'MOTOR',
    write: false,
    loader: { '.json': 'json' },
  });
  await page.setContent('<!doctype html><title>motor novo</title>');
  await page.addScriptTag({ content: bundle.outputFiles[0]!.text });
  const ids = await page.evaluate(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const M = (globalThis as any).MOTOR;
    return Object.keys(M.APROVADOS).sort();
  });
  // um exercício por vez, para a página não ficar presa numa chamada só
  const atual: { id: string; quadros: Record<string, string[]> }[] = [];
  for (const id of ids) {
    atual.push(
      await page.evaluate(
        ({ id, n }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const M = (globalThis as any).MOTOR;
          const ex = M.EXERCICIOS[id];
          const F = M.fichaDoMotorNovo(ex);
          const titulos: string[] = ex.ficha.erros.map((e: { titulo: string }) => e.titulo);
          const junta = (q: { viewBox: string; classe: string; html: string }) => `${q.viewBox}|${q.classe}|${q.html}`;
          const chaves: string[] = [...F.views.flatMap((v: string) => [`${v}|tec`, `${v}|mus`, `${v}|traj`]), ...F.errors.map((e: { id: string; view: string }) => `${e.view}|err|${e.id}`)];
          const quadros: Record<string, string[]> = Object.fromEntries(
            chaves.map((chave) => {
              const [vista, modo, idErro] = chave.split('|');
              const i = idErro ? F.errors.findIndex((e: { id: string }) => e.id === idErro) : 0;
              return [chave, Array.from({ length: n }, (_, k) => junta(M.quadroDoMotorNovo(ex, vista, modo, (k / n) * F.T, i, idErro ? titulos[i] : '')))];
            }),
          );
          quadros.miniatura = [junta(M.miniaturaDoMotorNovo(ex))];
          return { id, quadros };
        },
        { id, n: N },
      ),
    );
  }
  const hashes: Base = {
    nTempos: N,
    exercicios: atual.map((e) => ({
      id: e.id,
      quadros: Object.fromEntries(Object.entries(e.quadros).map(([k, qs]) => [k, qs.map(sha)])),
    })),
  };
  if (gerar) {
    writeFileSync(CAMINHO, JSON.stringify(hashes, null, 1) + '\n');
    return;
  }
  const base: Base = JSON.parse(readFileSync(CAMINHO, 'utf8'));
  expect(
    hashes.exercicios.map((e) => e.id),
    'animação aprovada sem linha de base do motor novo',
  ).toEqual(base.exercicios.map((e) => e.id));
  for (const [i, b] of base.exercicios.entries()) expect.soft(hashes.exercicios[i], b.id).toEqual(b);
});
