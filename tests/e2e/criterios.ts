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

/**
 * Quem entra na margem da página: a de 16 px dos lados ou, com uma folha aberta, a de 24 px dela (no cabeçalho da folha,
 * 16 px, porque o "Fechar" avança 8 px de propósito, para o toque). Devolve um item por elemento, com quanto ele passa,
 * em px. Ficam de fora as peças de borda a borda (as que começam na borda esquerda, a barra de baixo, o botão preso no pé,
 * o palco do Boneco), o que está numa faixa que rola de lado de propósito (os dias e os exercícios do guia) e o que está
 * dentro de um bloco de `conhecidos` (seletor → o máximo em px) sem passar do máximo. É a conferência `MARGEM=1` de
 * scripts/design/frontend-novo/olhar.mjs, como teste.
 */
export async function foraDaMargem(page: Page, conhecidos: Record<string, number> = {}): Promise<{ quem: string; passa: number }[]> {
  return page.evaluate((conhecidos) => {
    const w = document.documentElement.clientWidth;
    const folhas = Array.from(document.querySelectorAll<HTMLElement>('.folha')).filter((f) => !f.closest('[inert]'));
    const raiz: HTMLElement = folhas.at(-1) ?? document.body;
    const borda = folhas.length ? raiz.getBoundingClientRect().right : w;
    const limiteDe = (el: Element) => borda - (folhas.length && !el.closest('.folha-cab') ? 23.5 : 15.5);
    const rolaDeLado = (el: Element) => {
      for (let x = el.parentElement; x && x !== raiz; x = x.parentElement) {
        const o = getComputedStyle(x).overflowX;
        if (o === 'auto' || o === 'scroll') return true;
      }
      return false;
    };
    const out: { quem: string; passa: number }[] = [];
    for (const el of Array.from(raiz.querySelectorAll<HTMLElement>('*'))) {
      const r = el.getBoundingClientRect();
      const passa = Math.round((r.right - limiteDe(el)) * 10) / 10;
      if (r.left < 1 || !r.width || !r.height || passa <= 0 || !el.checkVisibility()) continue;
      if (el.closest('svg, [inert], .acao-fixa, .nav-inferior, .palco-treino, .stage, .veu > :not(.folha), .sr') || rolaDeLado(el)) continue;
      if (Object.entries(conhecidos).some(([sel, max]) => el.closest(sel) && passa <= max)) continue;
      const classe = typeof el.className === 'string' ? el.className.split(' ')[0] : '';
      out.push({ quem: `${el.tagName.toLowerCase()}${classe ? '.' + classe : ''} "${(el.textContent || '').trim().slice(0, 24)}"`, passa });
    }
    return out;
  }, conhecidos);
}

/**
 * Nada entra na margem da página, nem por poucos pixels (item 5 de docs/verificacao/lista.md). Vale no cenário de zoom
 * de 200% (206 px de largura), o mais apertado. A margem é a folga: em 13/11/2026 uma tela cabia aqui por 2,6 px e o
 * texto saiu cortado na verificação do GitHub, onde a letra sai um pouco mais larga; o que respeita a margem tem 16 px
 * de sobra.
 */
export async function semPassarDaMargem(page: Page, conhecidos: Record<string, number> = {}) {
  expect(await foraDaMargem(page, conhecidos), 'passa da margem da página').toEqual([]);
}

/** Os 4 critérios de uma tela: toque, contraste, texto cortado e foco coberto. */
export async function criterios(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await semToquePequeno(page);
  await semContrasteBaixo(page);
  await semTextoCortado(page);
  await semFocoCoberto(page);
}
