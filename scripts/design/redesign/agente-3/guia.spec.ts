import { expect, test } from '@playwright/test';
import { anexarJsonl, comEstado, comecar, foto, gravarJson, medirTela, type Medicao } from './apoio';

// Agente 3: o guia aberto pelo treino (Ana: búlgaro; Carla: puxada na polia, corpo pequeno no palco), em cada modo.
// Mede o palco, os controles em volta, o que fica visível sem rolar e os toques para trocar de vista e de modo.

const medidas: (Medicao & { controles?: { texto: string; altura: number; largura: number }[]; palco?: Record<string, number> })[] = [];
// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}, info) => gravarJson(`medidas-guia-${info.project.name}.json`, medidas));

for (const [persona, dia] of [
  ['ana', undefined],
  ['carla', 'Superior'],
] as const) {
  test(`guia aberto pelo treino: ${persona}`, async ({ page }) => {
    await comEstado(page, persona, 'comum');
    await comecar(page, dia);
    if (persona === 'carla') await page.getByRole('button', { name: 'Próximo ›' }).click(); // puxada unilateral na polia
    await page.getByRole('link', { name: 'Ver como fazer' }).click();
    await expect(page).toHaveURL(/\/guia\/.*de=treino/);
    await expect(page.locator('.stage svg line, .stage svg path').first()).toBeAttached();
    await page.evaluate(() => document.fonts.ready);
    const extra = await page.evaluate(() => {
      const H = window.innerHeight;
      const W = window.innerWidth;
      const r = document.querySelector('.stage')!.getBoundingClientRect();
      const topo = document.querySelector('header.top')!.getBoundingClientRect();
      const controles = Array.from(document.querySelectorAll<HTMLElement>('.controls button, .modes button, .exhead .iconbtn, .chips .chip, a.day')).map((b) => {
        const q = b.getBoundingClientRect();
        return { texto: (b.innerText || b.getAttribute('aria-label') || '').trim().slice(0, 24), altura: Math.round(q.height), largura: Math.round(q.width) };
      });
      const corpo = document.querySelector('.stage svg')!.getBoundingClientRect();
      return {
        palco: {
          largura: Math.round(r.width),
          altura: Math.round(r.height),
          pctLargura: Math.round((r.width / W) * 100),
          pctAlturaTela: Math.round((r.height / H) * 100),
          topPct: Math.round((r.top / H) * 100),
          bottomPct: Math.round((r.bottom / H) * 100),
          topoFixoPx: Math.round(topo.height),
          svgAltura: Math.round(corpo.height),
          controlesAltura: Math.round(document.querySelector('.controls')!.getBoundingClientRect().height),
          modosAltura: Math.round(document.querySelector('.modes')!.getBoundingClientRect().height),
          linhaTempoAltura: Math.round(document.querySelector('.timeline')!.getBoundingClientRect().height),
        },
        controles,
      };
    });
    for (const modo of ['Técnica', 'Erros', 'Músculos', 'Trajetória']) {
      await page.getByRole('button', { name: modo, exact: true }).click();
      await page.waitForTimeout(250);
      const m = await medirTela(page, persona, `guia-${modo.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')}`);
      medidas.push(modo === 'Técnica' ? { ...m, ...extra } : m);
      anexarJsonl(`medidas-guia-${test.info().project.name}.jsonl`, modo === 'Técnica' ? { ...m, ...extra } : m);
      await foto(page, persona, `20-guia-${modo.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')}`);
    }
    // vista: 1 toque, se o grupo estiver à vista
    const vistas = page.getByRole('group', { name: 'Visão' }).getByRole('button');
    const n = await vistas.count();
    if (n > 1) await vistas.nth(1).click();
    // rolar até as 3 dicas e a segurança: quantas telas
    await page.getByRole('link', { name: /Voltar ao treino/ }).click();
    await expect(page).toHaveURL(/\/treino$/);
  });
}
