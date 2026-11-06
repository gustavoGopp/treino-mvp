import { expect, type Page } from '@playwright/test';
import { semContrasteBaixo } from './contraste';
import { semToquePequeno } from './toque';

// Redesign (06/11/2026): os critérios que o protótipo mediu em todas as telas (docs/revisoes/redesign/proposta.md,
// seção 7) passam a valer no app. Além de toque e contraste: nenhum texto cortado e nenhum alvo com o foco coberto.

/**
 * Texto cortado: o texto sai da tela, ou sai de um ancestral que esconde o que passa da borda. Foi o defeito do "4 a 8,
 * 12 de cada lado" no início do protótipo (06/11). Fica de fora o que está dentro do palco do Boneco e das faixas que
 * rolam de lado de propósito (dias e chips, que mostram que há mais).
 */
export async function semTextoCortado(page: Page) {
  const cortados = await page.evaluate(() => {
    const nome = (e: HTMLElement) => `${e.tagName.toLowerCase()}${e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : ''} "${e.innerText.trim().slice(0, 40)}"`;
    const out: string[] = [];
    for (const e of Array.from(document.body.querySelectorAll<HTMLElement>('*'))) {
      if (e.closest('svg, .stage, .miniatura, [inert]') || !e.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })) continue;
      if (!Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim())) continue;
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      if (!r.width || !r.height || s.visibility === 'hidden') continue;
      // o texto só para o leitor de tela (a classe .sr: 1 px, recortado) não é texto cortado
      if ((r.width <= 1 && r.height <= 1) || (s.clip !== 'auto' && s.position === 'absolute')) continue;
      let limite = { left: 0, right: innerWidth };
      let rolavel = false;
      for (let x = e.parentElement; x; x = x.parentElement) {
        const sx = getComputedStyle(x);
        if (sx.overflowX === 'auto' || sx.overflowX === 'scroll') {
          rolavel = true;
          break;
        }
        if (sx.overflowX !== 'visible') {
          const q = x.getBoundingClientRect();
          limite = { left: Math.max(limite.left, q.left), right: Math.min(limite.right, q.right) };
        }
      }
      if (rolavel) continue;
      // texto que corta dentro do próprio elemento (reticências ou overflow escondido)
      const proprio = s.overflowX !== 'visible' && e.scrollWidth > e.clientWidth + 1;
      if (proprio || r.right > limite.right + 1 || r.left < limite.left - 1) out.push(nome(e));
    }
    return [...new Set(out)];
  });
  expect(cortados, 'texto cortado').toEqual([]);
}

/**
 * Foco coberto (WCAG 2.4.11): cada alvo recebe o foco pelo teclado e precisa ficar ao menos em parte à vista, sem
 * ficar inteiro atrás do cabeçalho, da barra de baixo ou de um botão preso no pé da tela.
 */
export async function semFocoCoberto(page: Page) {
  const cobertos = await page.evaluate(() => {
    const sel = 'a[href], button:not([disabled]), input:not([disabled]):not([type=hidden]), select:not([disabled]), summary, textarea';
    // fora: o que não pode receber foco por não estar à vista (dentro de um <details> fechado ou de algo inerte)
    const visivel = (e: HTMLElement) => e.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true });
    const alvos = Array.from(document.querySelectorAll<HTMLElement>(sel)).filter((e) => !e.closest('[inert]') && e.getClientRects().length && visivel(e));
    const out: string[] = [];
    const y0 = scrollY;
    for (const e of alvos) {
      e.focus();
      // o controle escondido de propósito (rádio, caixa, arquivo) mostra o foco no rótulo: mede-se o rótulo
      const b = e.getBoundingClientRect();
      const rotulo = (e as HTMLInputElement).labels?.[0];
      const escondido = (b.width <= 1 && b.height <= 1) || getComputedStyle(e).opacity === '0';
      const medido: Element = escondido && rotulo ? rotulo : e;
      const r = medido.getClientRects()[0] ?? medido.getBoundingClientRect();
      const pontos = [
        [r.left + r.width / 2, r.top + 2],
        [r.left + r.width / 2, r.bottom - 2],
        [r.left + 2, r.top + r.height / 2],
        [r.left + r.width / 2, r.top + r.height / 2],
      ];
      const visto = pontos.some(([x, y]) => {
        const t = document.elementFromPoint(x!, y!);
        return !!t && (t === e || e.contains(t) || !!rotulo?.contains(t) || !!(rotulo && t.contains(rotulo)));
      });
      if (!visto) {
        const t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) as HTMLElement | null;
        const quem = t ? `${t.tagName.toLowerCase()}.${String(t.className).split(' ')[0]}` : 'fora da tela';
        out.push(`${e.tagName.toLowerCase()} "${(e.innerText || e.getAttribute('aria-label') || rotulo?.innerText || e.id).trim().slice(0, 30)}" atrás de ${quem}`);
      }
    }
    (document.activeElement as HTMLElement | null)?.blur();
    scrollTo(0, y0);
    return [...new Set(out)];
  });
  expect(cobertos, 'alvo com o foco coberto').toEqual([]);
}

/** Os 4 critérios de uma tela: toque, contraste, texto cortado e foco coberto. */
export async function criterios(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await semToquePequeno(page);
  await semContrasteBaixo(page);
  await semTextoCortado(page);
  await semFocoCoberto(page);
}
