import { expect, type Page } from '@playwright/test';

// Contraste de texto (WCAG 1.4.3): 4,5:1, ou 3:1 em texto grande (24 px, ou 18,66 px em negrito). O fundo é o do
// primeiro ancestral opaco, com os fundos semitransparentes misturados por cima. Ficam de fora o texto dentro do
// palco do Boneco (o desenho tem os seus próprios tons) e o de botão desabilitado (1.4.3 não se aplica a ele).
export async function semContrasteBaixo(page: Page) {
  const baixos = await page.evaluate(() => {
    const parse = (c: string) => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return [0, 0, 0, 0];
      const p = m[1]!.split(/[ ,/]+/).filter(Boolean).map(Number);
      return [p[0]!, p[1]!, p[2]!, p[3] ?? 1];
    };
    const lum = ([r, g, b]: number[]) => {
      const f = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      return 0.2126 * f(r!) + 0.7152 * f(g!) + 0.0722 * f(b!);
    };
    const mistura = (cima: number[], baixo: number[]) => [0, 1, 2].map((i) => cima[i]! * cima[3]! + baixo[i]! * (1 - cima[3]!)).concat(1);
    const fundoDe = (e: Element | null) => {
      const pilha: number[][] = [];
      for (let x = e; x; x = x.parentElement) {
        const c = parse(getComputedStyle(x).backgroundColor);
        if (c[3]! > 0) {
          pilha.push(c);
          if (c[3]! >= 1) break;
        }
      }
      let cor = parse(getComputedStyle(document.body).backgroundColor);
      if (cor[3]! < 1) cor = [255, 255, 255, 1];
      for (let i = pilha.length - 1; i >= 0; i--) cor = mistura(pilha[i]!, cor);
      return cor;
    };
    const out: string[] = [];
    for (const e of Array.from(document.body.querySelectorAll<HTMLElement>('*'))) {
      if (e.closest('svg, .stage, .miniatura, button:disabled')) continue;
      if (!Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim())) continue;
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      if (!r.width || !r.height || s.visibility === 'hidden' || s.opacity === '0') continue;
      const fundo = fundoDe(e);
      const cor = mistura(parse(s.color), fundo);
      const [a, b] = [lum(cor), lum(fundo)];
      const razao = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      const px = parseFloat(s.fontSize);
      const limite = px >= 24 || (px >= 18.66 && Number(s.fontWeight) >= 700) ? 3 : 4.5;
      if (razao < limite) out.push(`${e.innerText.trim().slice(0, 40)} (${razao.toFixed(2)}:1)`);
    }
    return [...new Set(out)];
  });
  expect(baixos, 'texto com contraste abaixo do mínimo').toEqual([]);
}
