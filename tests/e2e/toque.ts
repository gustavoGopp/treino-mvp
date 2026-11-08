import { expect, type Page } from '@playwright/test';

// Uso no celular (critério 8): toda área de toque visível tem 44 px ou mais de altura e de largura, e a tela não rola
// de lado. Ficam de fora, como na WCAG 2.5.8, os links no meio de uma frase. Nos rádios e caixas de marcar, o alvo é
// o rótulo (o próprio controle fica escondido). Medido no R3 nas telas do R2. Quando o controle amplia a área de toque
// por fora com um ::after posicionado (o selo de evidência, redesign de 06/11/2026), mede-se a área ampliada.
export async function semToquePequeno(page: Page) {
  const pequenos = await page.evaluate(() => {
    const visivel = (e: Element) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden';
    };
    const alvos = Array.from(document.querySelectorAll<HTMLElement>('a[href], button, select, textarea, summary, [role=button], [role=tab], input')).filter((e) => !(e instanceof HTMLInputElement && ['hidden', 'radio', 'checkbox', 'file'].includes(e.type)));
    const rotulos = Array.from(document.querySelectorAll<HTMLInputElement>('input[type=radio], input[type=checkbox]')).flatMap((i) => Array.from(i.labels ?? []));
    return [...alvos, ...rotulos]
      .filter(visivel)
      .filter((e) => !(e.tagName === 'A' && e.closest('p, li') && getComputedStyle(e).display === 'inline'))
      .map((e) => {
        const r = e.getBoundingClientRect();
        let [largura, altura] = [r.width, r.height];
        const d = getComputedStyle(e, '::after');
        if (d.content !== 'none' && d.position === 'absolute' && getComputedStyle(e).position !== 'static') {
          const px = (v: string) => parseFloat(v) || 0;
          largura = Math.max(largura, r.width - px(d.left) - px(d.right));
          altura = Math.max(altura, r.height - px(d.top) - px(d.bottom));
        }
        return { texto: (e.innerText || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 40), largura: Math.round(largura), altura: Math.round(altura) };
      })
      .filter((x) => x.altura < 44 || x.largura < 44);
  });
  expect(pequenos, 'áreas de toque menores que 44 px').toEqual([]);
  const rolaDeLado = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(rolaDeLado, 'a tela rola de lado').toBe(false);
}
