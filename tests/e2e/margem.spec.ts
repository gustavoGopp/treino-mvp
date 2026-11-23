import { expect, test } from './base';
import { foraDaMargem, semPassarDaMargem } from './criterios';

// Pacote D4 (23/11/2026): a margem da página como teste (item 5 de docs/verificacao/lista.md). A conferência roda nos
// cenários de zoom de 200% (cenarios.spec.ts); aqui, a prova de que ela acusa o que deve: uma tela de verdade apertada
// de propósito em 4 px, e páginas mínimas com cada caso que ela deixa de fora.

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 206, height: 420 });
});

test('a margem acusa uma tela de verdade apertada de propósito em 4 px, e a mesma tela sem o aperto passa', async ({ page }) => {
  await page.goto('/');
  const titulo = page.getByRole('heading', { level: 1 });
  await expect(titulo).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await semPassarDaMargem(page);
  // o título avança 4 px na margem de 16 px (pelo estilo do elemento: a política de segurança barra estilo embutido)
  await titulo.evaluate((h) => (h.style.marginRight = '-4px'));
  const fora = await foraDaMargem(page);
  expect(fora.map((x) => x.quem)).toContainEqual(expect.stringMatching(/^h1/));
  expect(Math.max(...fora.map((x) => x.passa))).toBeCloseTo(3.5, 0);
  await expect(semPassarDaMargem(page)).rejects.toThrow(/passa da margem/);
});

const PAGINA = (corpo: string) =>
  `<!doctype html><meta name="viewport" content="width=device-width"><style>
    body { margin: 0; font: 16px sans-serif }
    main { padding: 0 16px }
    .folha { position: fixed; inset: auto 0 0 0; padding: 24px; overflow: auto }
    .folha-cab { display: flex; justify-content: space-between; margin: -24px -24px 0; padding: 24px 24px 8px }
    .folha-cab button { margin-right: -8px }
    .days { display: flex; gap: 8px; overflow-x: auto }
    .days button { flex: none; width: 120px }
  </style>${corpo}`;

test('a margem: cabe, passa por 2,5 px, a faixa que rola de lado e o bloco já conhecido', async ({ page }) => {
  await page.setContent(PAGINA('<main><p>Cabe na margem</p></main>'));
  expect(await foraDaMargem(page)).toEqual([]);

  await page.setContent(PAGINA('<main><p style="width: calc(100% + 3px)">Passa 3 px</p></main>'));
  expect(await foraDaMargem(page)).toEqual([{ quem: 'p "Passa 3 px"', passa: 2.5 }]);

  // a faixa dos dias rola de lado de propósito: o que passa dela não conta
  await page.setContent(PAGINA('<main><nav class="days"><button>Um</button><button>Dois</button><button>Três</button></nav></main>'));
  expect(await foraDaMargem(page)).toEqual([]);

  // o que já passava quando o teste nasceu fica de fora até o máximo medido, e falha se passar mais
  await page.setContent(PAGINA('<main><div class="largo" style="width: calc(100% + 10px)">Largo</div></main>'));
  expect(await foraDaMargem(page, { '.largo': 10 })).toEqual([]);
  expect(await foraDaMargem(page, { '.largo': 5 })).toEqual([{ quem: 'div.largo "Largo"', passa: 9.5 }]);
});

test('a margem da folha aberta é a dela: 24 px, e 16 px no cabeçalho, onde o "Fechar" avança 8 px para o toque', async ({ page }) => {
  await page.setContent(
    PAGINA(`<main inert><p style="width: calc(100% + 40px)">Atrás da folha</p></main>
      <div class="folha"><div class="folha-cab"><h2>Título</h2><button>Fechar</button></div><p>Cabe</p></div>`),
  );
  expect(await foraDaMargem(page)).toEqual([]);
  await page.locator('.folha > p').evaluate((p) => (p.style.width = 'calc(100% + 2px)'));
  expect(await foraDaMargem(page)).toEqual([{ quem: 'p "Cabe"', passa: 1.5 }]);
  await page.locator('.folha-cab button').evaluate((b) => (b.style.marginRight = '-12px'));
  expect((await foraDaMargem(page)).map((x) => x.quem)).toContain('button "Fechar"');
});
