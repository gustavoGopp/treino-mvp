import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

// Regressão visual do guia: o palco do app tem que sair idêntico, pixel a pixel, ao do guia original
// (referencia/guia-execucao-fase1.html, que é o oráculo). Vista principal × 4 modos × 2 tempos, nos 26 exercícios.
// As fontes externas são bloqueadas nos dois lados para a comparação não depender da rede.
const original = readFileSync('referencia/guia-execucao-fase1.html', 'utf8').replace(
  'window.__guia={',
  'window.__guia={state,setEx,DAYS,',
);
const ids: string[] = JSON.parse(readFileSync('tests/visual/linha-de-base/motor.json', 'utf8')).exercicios.map(
  (e: { id: string }) => e.id,
);

test.use({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 2, isMobile: false, hasTouch: false });

async function bloquearFontes(page: Page) {
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
}
// Espera a renderização assentar: duas capturas seguidas iguais.
async function palcoEstavel(page: Page) {
  let anterior = await page.locator('.stage').screenshot();
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(150);
    const atual = await page.locator('.stage').screenshot();
    if (atual.equals(anterior)) return atual;
    anterior = atual;
  }
  throw new Error('o palco não estabilizou');
}

for (const id of ids) {
  test(`guia ${id}: palco idêntico ao original`, async ({ page, browser }) => {
    const ref = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 2 });
    await bloquearFontes(ref);
    await bloquearFontes(page);
    await ref.route('**/guia-original.html', (r) => r.fulfill({ contentType: 'text/html', body: original }));
    await ref.goto('http://localhost/guia-original.html');
    const { T, vistaPrincipal, vistaErro } = await ref.evaluate((id) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const g = (globalThis as any).__guia;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d = g.DAYS.findIndex((d: any) => d.ex.some((e: any) => e.id === id));
      g.state.day = d;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      g.setEx(g.DAYS[d].ex.findIndex((e: any) => e.id === id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ex = g.DAYS[d].ex.find((e: any) => e.id === id);
      return { T: ex.T as number, vistaPrincipal: ex.views[0] as string, vistaErro: ex.errors[0].view as string };
    }, id);

    for (const modo of ['tec', 'err', 'mus', 'traj']) {
      const vista = modo === 'err' ? vistaErro : vistaPrincipal;
      for (const t of [0, Math.round((T / 2) * 100) / 100]) {
        await ref.evaluate(
          ([modo, vista, t]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Object.assign((globalThis as any).__guia.state, { mode: modo, view: vista, t, err: 0, playing: false });
          },
          [modo, vista, t] as const,
        );
        await page.goto(`/guia/${id}?modo=${modo}&vista=${vista}&t=${t}&erro=0&pausado=1`);
        const [esperado, obtido] = await Promise.all([palcoEstavel(ref), palcoEstavel(page)]);
        expect(obtido.equals(esperado), `${id} ${modo} ${vista} t=${t}`).toBe(true);
      }
    }
    await ref.close();
  });
}
