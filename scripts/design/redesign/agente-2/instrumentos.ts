import { mkdirSync } from 'node:fs';
import type { Locator, Page } from '@playwright/test';
import { medir, type Medida } from '../../medir';

// Instrumentos do agente 2: contam, dentro da página, cada toque (pointerdown), cada caractere digitado (beforeinput)
// e a rolagem máxima por tela; o teste marca em que tela está (marcarTela) e recolhe tudo no fim (coletar).
// A contagem de toques é a mesma de tests/e2e/onboarding.spec.ts (pointerdown), mas por tela e com o alvo tocado,
// para o modelo KLM (klm.mjs) saber o que foi botão, rádio, caixa ou texto.

export type Toque = {
  t: number;
  tela: string;
  rota: string;
  tag: string;
  /** 'botao' | 'radio' | 'checkbox' | 'text' | 'number' | 'file' | 'outro' */
  tipo: string;
  alvo: string;
  legenda: string;
  scrollY: number;
  scrollH: number;
  innerH: number;
};
export type Registro = { toques: Toque[]; chars: { t: number; tela: string; n: number }[]; rolagemMax: Record<string, number> };

export async function instrumentar(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __tela: string; __reg: Registro };
    w.__tela = '';
    w.__reg = { toques: [], chars: [], rolagemMax: {} };
    const base = () => ({
      t: Date.now(),
      tela: w.__tela,
      rota: location.pathname,
      scrollY: Math.round(scrollY),
      scrollH: document.documentElement.scrollHeight,
      innerH: innerHeight,
    });
    addEventListener(
      'pointerdown',
      (e) => {
        const el = e.target as HTMLElement;
        const ctl = (el.closest('button, a, label, summary, input, [role=button]') as HTMLElement | null) ?? el;
        const input = ctl.tagName === 'LABEL' ? ((ctl as HTMLLabelElement).control as HTMLInputElement | null) : ctl.tagName === 'INPUT' ? (ctl as HTMLInputElement) : null;
        const tipo = input ? input.type : ['BUTTON', 'A', 'SUMMARY'].includes(ctl.tagName) || ctl.getAttribute('role') === 'button' ? 'botao' : 'outro';
        const legenda = ctl.closest('fieldset')?.querySelector('legend')?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 70) ?? '';
        const alvo = (ctl.innerText || ctl.getAttribute('aria-label') || input?.labels?.[0]?.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 50);
        w.__reg.toques.push({ ...base(), tag: ctl.tagName.toLowerCase(), tipo, alvo, legenda });
      },
      true,
    );
    addEventListener(
      'beforeinput',
      (e) => {
        const n = ((e as InputEvent).data ?? '').length;
        if (n) w.__reg.chars.push({ ...base(), n });
      },
      true,
    );
    addEventListener(
      'scroll',
      () => {
        const k = w.__tela;
        w.__reg.rolagemMax[k] = Math.max(w.__reg.rolagemMax[k] ?? 0, Math.round(scrollY));
      },
      { capture: true, passive: true },
    );
  });
}

export const marcarTela = (page: Page, tela: string) =>
  page.evaluate((t) => {
    (window as unknown as { __tela: string }).__tela = t;
  }, tela);

/** Recolhe e zera o registro da página (a navegação com goto apaga o registro: recolha antes). */
export const coletar = (page: Page): Promise<Registro> =>
  page.evaluate(() => {
    const w = window as unknown as { __reg: Registro };
    const r = w.__reg;
    w.__reg = { toques: [], chars: [], rolagemMax: {} };
    return r;
  });

/** Palavras visíveis no <main> (para estimar o tempo de leitura; o KLM não modela leitura). */
export const palavras = (page: Page) =>
  page.evaluate(() => (document.querySelector('main')?.innerText ?? '').split(/\s+/).filter(Boolean).length);

export type Tela = {
  nome: string;
  /** Instante (ms) em que a tela abriu, pelo relógio do teste. */
  inicio: number;
  /** Medida de medir.ts no instante em que a tela abriu (botão principal visível?, alturas de tela). */
  aoAbrir: Medida;
  palavrasAoAbrir: number;
};

/** Contexto de um percurso: marca telas, digita contando caracteres e guarda as medidas. */
export class Percurso {
  telas: Tela[] = [];
  registros: Registro[] = [];
  charsDigitados = 0;
  fim = 0;
  constructor(
    public page: Page,
    public persona: string,
    public dirFotos?: string,
  ) {}

  /** Marca a tela que acabou de abrir, mede o que se vê e, se houver pasta, fotografa (relance e inteira). */
  async tela(nome: string, foto = true) {
    const { page } = this;
    await marcarTela(page, nome);
    const inicio = Date.now();
    const aoAbrir = await medir(page, `${this.persona}/${nome}`);
    const palavrasAoAbrir = await palavras(page);
    this.telas.push({ nome, inicio, aoAbrir, palavrasAoAbrir });
    if (foto && this.dirFotos) {
      mkdirSync(this.dirFotos, { recursive: true });
      const base = `${this.dirFotos}/${String(this.telas.length).padStart(2, '0')}-${nome}`;
      await page.screenshot({ path: `${base}-relance.png`, fullPage: false, animations: 'disabled' });
      await page.screenshot({ path: `${base}.png`, fullPage: true, animations: 'disabled' });
    }
  }

  /** Digita como uma pessoa (tecla a tecla) e conta os caracteres no lado do teste, por segurança. */
  async digitar(campo: Locator, texto: string) {
    await campo.click();
    await campo.pressSequentially(texto, { delay: 0 });
    this.charsDigitados += texto.length;
  }

  /** Recolhe o registro da página (chame antes de qualquer goto e no fim). */
  async recolher() {
    this.registros.push(await coletar(this.page));
  }

  terminar() {
    this.fim = Date.now();
  }
}

export const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });
