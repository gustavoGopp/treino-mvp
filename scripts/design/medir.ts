import type { Page } from '@playwright/test';

// Medições da revisão de design, numa tela já aberta. Registram (não reprovam): viram números do relatório.
// - toque: alvos menores que 44 px (mesma regra de tests/e2e/toque.ts: links no meio da frase ficam de fora, WCAG 2.5.8);
// - contraste: texto com razão abaixo de 4,5:1 (3:1 se grande: 24 px, ou 18,66 px em negrito), WCAG 1.4.3;
//   a cor de fundo é a do primeiro ancestral opaco (fundos com transparência entram misturados ao de baixo);
// - polegar: onde fica o botão principal (o de classe .btn mais destacado) na altura da tela, em % (0 = topo);
// - telas: quantas alturas de tela a página tem (quanto é preciso rolar).
export type Medida = {
  tela: string;
  toquePequeno: { texto: string; largura: number; altura: number }[];
  contrasteBaixo: { texto: string; razao: number; cor: string; fundo: string; px: number }[];
  botaoPrincipal: { texto: string; topoPct: number; visivelSemRolar: boolean } | null;
  telas: number;
  rolaDeLado: boolean;
};

export async function medir(page: Page, tela: string): Promise<Medida> {
  return page.evaluate((tela) => {
    const parse = (c: string) => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return [0, 0, 0, 0];
      const p = m[1]!.split(/[ ,/]+/).filter(Boolean).map(Number);
      return [p[0]!, p[1]!, p[2]!, p[3] ?? 1];
    };
    const lum = ([r, g, b]: number[]) => {
      const f = (v: number) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * f(r!) + 0.7152 * f(g!) + 0.0722 * f(b!);
    };
    const mistura = (cima: number[], baixo: number[]) => {
      const a = cima[3]!;
      return [0, 1, 2].map((i) => cima[i]! * a + baixo[i]! * (1 - a)).concat(1);
    };
    const fundoDe = (e: Element | null): number[] => {
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
    const visivel = (e: Element) => {
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.opacity !== '0';
    };
    const hex = (c: number[]) => '#' + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

    // toque
    const alvos = Array.from(document.querySelectorAll<HTMLElement>('a[href], button, select, textarea, summary, [role=button], [role=tab], input')).filter(
      (e) => !(e instanceof HTMLInputElement && ['hidden', 'radio', 'checkbox', 'file'].includes(e.type)),
    );
    const rotulos = Array.from(document.querySelectorAll<HTMLInputElement>('input[type=radio], input[type=checkbox]')).flatMap((i) => Array.from(i.labels ?? []));
    const toquePequeno = [...alvos, ...rotulos]
      .filter(visivel)
      .filter((e) => !(e.tagName === 'A' && e.closest('p, li') && getComputedStyle(e).display === 'inline'))
      .map((e) => {
        const r = e.getBoundingClientRect();
        return { texto: (e.innerText || e.getAttribute('aria-label') || e.tagName).trim().replace(/\s+/g, ' ').slice(0, 40), largura: Math.round(r.width), altura: Math.round(r.height) };
      })
      .filter((x) => x.altura < 44 || x.largura < 44);

    // contraste (elementos com texto próprio)
    const contrasteBaixo: Medida['contrasteBaixo'] = [];
    const vistos = new Set<string>();
    for (const e of Array.from(document.body.querySelectorAll<HTMLElement>('*'))) {
      if (e.closest('svg')) continue;
      const proprio = Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim().length > 0);
      if (!proprio || !visivel(e)) continue;
      const s = getComputedStyle(e);
      const cor = parse(s.color);
      const fundo = fundoDe(e);
      const c = mistura(cor, fundo);
      const L1 = lum(c),
        L2 = lum(fundo);
      const razao = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const px = parseFloat(s.fontSize);
      const grande = px >= 24 || (px >= 18.66 && Number(s.fontWeight) >= 700);
      const limite = grande ? 3 : 4.5;
      // texto de botão desabilitado fica de fora (WCAG 1.4.3, componentes inativos)
      if ((e as HTMLButtonElement).disabled || e.closest('button:disabled')) continue;
      if (razao < limite) {
        const texto = e.innerText.trim().replace(/\s+/g, ' ').slice(0, 40);
        const k = texto + hex(c) + hex(fundo);
        if (vistos.has(k)) continue;
        vistos.add(k);
        contrasteBaixo.push({ texto, razao: Math.round(razao * 100) / 100, cor: hex(c), fundo: hex(fundo), px });
      }
    }

    // botão principal: o primeiro .btn visível que não é secundário
    const H = window.innerHeight;
    const b = Array.from(document.querySelectorAll<HTMLElement>('.btn:not(.sec), button.primario')).find(visivel);
    let botaoPrincipal = null;
    if (b) {
      const r = b.getBoundingClientRect();
      const topo = r.top + window.scrollY;
      botaoPrincipal = { texto: b.innerText.trim().replace(/\s+/g, ' ').slice(0, 40), topoPct: Math.round((topo / H) * 100), visivelSemRolar: topo + r.height <= H };
    }
    const de = document.documentElement;
    return { tela, toquePequeno, contrasteBaixo, botaoPrincipal, telas: Math.round((de.scrollHeight / H) * 10) / 10, rolaDeLado: de.scrollWidth > de.clientWidth };
  }, tela);
}
