import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

// Apoio das medições do agente 3: gravar o estado de uma persona no aparelho, medir o que está na tela e fotografar.

export const PERSONAS = ['ana', 'bruno', 'carla', 'diego', 'elisa', 'fabio'] as const;
export type Persona = (typeof PERSONAS)[number];
export const BRUTO = 'reports/design/redesign/agente-3';

/**
 * Grava o estado no IndexedDB (idb-keyval: banco "keyval-store", loja "keyval", chave "estado").
 * `fonte`: "comum" = reports/design/redesign/estados (gerador real, com histórico: o treino vem com a sugestão de
 * carga); "sem-historico" = os estados deste agente (1ª vez em cada exercício: a calibração da 1ª série).
 */
export async function comEstado(page: Page, persona: Persona, fonte: 'comum' | 'sem-historico' = 'comum') {
  const caminho = fonte === 'comum' ? `reports/design/redesign/estados/${persona}.json` : `${BRUTO}/estados/${persona}.json`;
  const estado = JSON.parse(readFileSync(caminho, 'utf8'));
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Entendi, vamos começar' })).toBeVisible();
  await page.evaluate(async (e) => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onupgradeneeded = () => r.result.createObjectStore('keyval');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    await new Promise<void>((ok, erro) => {
      const r = db.transaction('keyval', 'readwrite').objectStore('keyval').put(e, 'estado');
      r.onsuccess = () => ok();
      r.onerror = () => erro(r.error);
    });
  }, estado);
}

/** Começa o treino do dia selecionado (o 1º, ou o de nome dado) e chega em /treino. */
export async function comecar(page: Page, dia?: string, local?: string) {
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  const abas = page.getByRole('tab');
  if (dia) await page.getByRole('tab', { name: dia, exact: true }).click();
  void abas;
  if (local) await page.getByRole('button', { name: local, exact: true }).click();
  // sem dia dado: o treino que o app sugere hoje (o próximo da rotação), seja qual for a aba
  await page.getByRole('button', { name: new RegExp(`^Começar o treino ${dia ?? ''}`) }).first().click();
  await expect(page).toHaveURL(/\/treino$/);
  await page.evaluate(() => document.fonts.ready);
}

/** Um elemento medido: onde está na tela (em px e em % da altura), se cabe sem rolar e em que zona do polegar fica. */
export type Elemento = {
  chave: string;
  texto: string;
  top: number;
  bottom: number;
  left: number;
  right: number;
  topPct: number;
  bottomPct: number;
  centroPct: number;
  altura: number;
  largura: number;
  visivel: 'inteiro' | 'parte' | 'fora';
  fontePx: number;
  zona: 'facil' | 'esticar' | 'fora';
  distMm: number;
  cobertoPeloDescanso: boolean;
};
export type Medicao = {
  projeto: string;
  persona: string;
  estado: string;
  viewport: { w: number; h: number };
  telas: number;
  rolaDeLado: boolean;
  elementos: Elemento[];
};

/**
 * Premissa do alcance do polegar (declarada no relatório): mão direita, uma mão só, com a base do polegar na borda
 * direita, 30 mm acima da borda de baixo da área útil. Zona fácil até 55 mm da base; esticar até 72 mm; fora acima
 * disso. Escala: 412 px ≈ 73,2 mm (Pixel 7); 360 px ≈ 65 mm (celular pequeno típico). Opinião apoiada no modelo de
 * Bergstrom-Lehtovirta e Oulasvirta (2014), que mostra a área funcional como um arco em volta da base do polegar.
 */
export const ALVOS: [string, string][] = [
  ['senti-algo', '.alerta-topo'],
  ['terminar-topo', '.brand-acoes .link-sec'],
  ['nome-exercicio', '.ex-sessao .titulo'],
  ['ver-como-fazer', '.link-guia'],
  ['serie-titulo', '.registro h2'],
  ['sugestao', '.registro .sugestao'],
  ['aquecimento', '.registro .fase:not(.calibracao)'],
  ['calibracao-linha', '.registro .fase.calibracao'],
  ['carga', '.registro > .linha-registro:first-of-type .stepper, .registro > label.campo select'],
  ['carga-linha', '.registro .linha-registro'],
  ['carga-menos', '.registro > .linha-registro:first-of-type .stepper button:first-child'],
  ['carga-mais', '.registro > .linha-registro:first-of-type .stepper button:last-child'],
  ['reps', '.stepper[aria-labelledby^="reps-"]'],
  ['rir', '.registro .campo .chips-valor'],
  ['rir-0', '.registro .campo .chips-valor .chip-valor:first-child'],
  ['rir-4', '.registro .campo .chips-valor .chip-valor:last-child'],
  ['quedas', '.quedas'],
  ['serie-feita', '.registro .salvar'],
  ['series-feitas', '.series-feitas'],
  ['desfazer', '.series-feitas .link-sec'],
  ['trocar', '.acoes-sessao button'],
  ['anterior', '.nav-sessao button:first-child'],
  ['proximo', '.nav-sessao button:last-child'],
  ['descanso', '.descanso'],
  ['relogio', '.tclock-mini'],
  ['descanso-menos15', '.tctl button:nth-child(1)'],
  ['descanso-mais15', '.tctl button:nth-child(2)'],
  ['descanso-pular', '.tctl button:nth-child(3)'],
  ['painel-trocar', 'section[aria-label="Trocar exercício"]'],
  ['trocar-opcao-1', 'section[aria-label="Trocar exercício"] .opcao-ajuste'],
  ['painel-sentir', '.sentir'],
  ['sentir-opcao-1', '.sentir .opcao-ajuste'],
  ['sentir-opcao-7', '.sentir .opcao-ajuste:nth-child(7)'],
  ['sentir-dor-0', '.sentir .chip-valor:first-child'],
  ['sentir-dor-10', '.sentir .chip-valor:last-child'],
  ['cartao-texto', '.cartao-texto > summary'],
  ['cartao-dicas', '.cartao-texto .dicas'],
  ['cartao-montagem', '.cartao-texto-corpo h4:nth-of-type(3)'],
  ['troca-local', '.troca-local'],
  ['aviso', '.warnbox'],
  // fim do treino
  ['fim-titulo', '.titulo'],
  ['fim-fichas', '.fichas'],
  ['fim-hoje-foi', '.hoje-foi'],
  ['fim-proxima', '#proxima'],
  ['fim-ver-semana', 'a.btn:not(.sec)'],
  ['fim-voltar', 'a.btn.sec'],
  // guia
  ['guia-topo', 'header.top'],
  ['guia-voltar', 'a.day'],
  ['guia-chips', '.chips'],
  ['guia-titulo', '.exhead h1'],
  ['guia-rx', '.exhead .rx'],
  ['guia-palco', '.stage'],
  ['guia-linha-tempo', '.timeline'],
  ['guia-controles', '.controls'],
  ['guia-play', '.controls .ctl:first-child'],
  ['guia-vistas', '.controls .seg'],
  ['guia-modos', '.modes'],
  ['guia-modo-info', '.modeinfo'],
  ['guia-legenda', '.modeinfo .legend'],
  ['guia-errchips', '.errchips'],
  ['guia-cues', '.cues'],
  ['guia-cue-1', '.cues li:first-child'],
  ['guia-checklist', '.check'],
  ['guia-seguranca', 'footer .box'],
  ['guia-fase', '.phase b'],
  ['guia-respira', '.breath'],
];

export async function medirTela(page: Page, persona: string, estado: string): Promise<Medicao> {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  const viewport = page.viewportSize()!;
  const m = await page.evaluate(
    ({ alvos, vw }) => {
      const H = window.innerHeight;
      const W = window.innerWidth;
      const pxPorMm = vw === 360 ? 360 / 65 : W / 73.2;
      const base = { x: W, y: H - 30 * pxPorMm };
      const desc = document.querySelector('.descanso')?.getBoundingClientRect();
      const vis = (e: Element) => {
        const r = e.getBoundingClientRect();
        const s = getComputedStyle(e);
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
      };
      const elementos = [] as Record<string, unknown>[];
      for (const [chave, sel] of alvos) {
        const e = Array.from(document.querySelectorAll<HTMLElement>(sel)).find(vis);
        if (!e) continue;
        const r = e.getBoundingClientRect();
        const cx = (r.left + r.right) / 2;
        const cy = (r.top + r.bottom) / 2;
        const distMm = Math.hypot(cx - base.x, cy - base.y) / pxPorMm;
        const zona = distMm <= 55 ? 'facil' : distMm <= 72 ? 'esticar' : 'fora';
        const visivel = r.top >= 0 && r.bottom <= H ? 'inteiro' : r.top < H && r.bottom > 0 ? 'parte' : 'fora';
        const coberto = !!desc && r.bottom > desc.top && r.top < desc.bottom && !e.closest('.descanso');
        elementos.push({
          chave,
          texto: (e.innerText || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          left: Math.round(r.left),
          right: Math.round(r.right),
          topPct: Math.round((r.top / H) * 100),
          bottomPct: Math.round((r.bottom / H) * 100),
          centroPct: Math.round((cy / H) * 100),
          altura: Math.round(r.height),
          largura: Math.round(r.width),
          visivel,
          fontePx: parseFloat(getComputedStyle(e).fontSize),
          zona,
          distMm: Math.round(distMm),
          cobertoPeloDescanso: coberto,
        });
      }
      const de = document.documentElement;
      return { telas: Math.round((de.scrollHeight / H) * 10) / 10, rolaDeLado: de.scrollWidth > de.clientWidth, elementos };
    },
    { alvos: ALVOS, vw: viewport.width },
  );
  return { projeto: test.info().project.name, persona, estado, viewport: { w: viewport.width, h: viewport.height }, ...(m as Pick<Medicao, 'telas' | 'rolaDeLado' | 'elementos'>) };
}

/** Fotografa o que se vê sem rolar, em px de CSS (1 px da imagem = 1 px da tela), para a prova de legibilidade a 50%. */
export async function foto(page: Page, persona: string, nome: string) {
  const dir = `${BRUTO}/${test.info().project.name}/${persona}`;
  mkdirSync(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${dir}/${nome}.png`, fullPage: false, animations: 'disabled', scale: 'css' });
}

export function gravarJson(nome: string, dados: unknown) {
  mkdirSync(BRUTO, { recursive: true });
  writeFileSync(`${BRUTO}/${nome}`, JSON.stringify(dados, null, 1) + '\n');
}

/** Preenche a carga (se faltar) e o RIR, sem salvar: o estado "durante a série" (botão habilitado). */
export async function preencherSerie(page: Page) {
  const registro = page.getByRole('region', { name: /^Série \d/ });
  const carga = page.getByLabel('Carga', { exact: true });
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT')) && !(await carga.inputValue())) await carga.selectOption({ index: 6 });
  for (const [rotulo, alvo] of [
    ['Mais carga', 20],
    ['Próxima placa', 8],
    ['Mais anilha de cada lado', 10],
    ['Mais contrapeso (mais fácil)', 3],
  ] as const) {
    const b = registro.getByRole('button', { name: rotulo });
    if (!(await b.count())) continue;
    const out = registro.locator('.stepper output').first();
    for (let i = 0; i < 30; i++) {
      const t = (await out.innerText()).trim();
      const n = parseFloat(t.replace(',', '.'));
      if (t !== '—' && !Number.isNaN(n) && n >= alvo) break;
      if (await b.isDisabled()) break;
      await b.click();
    }
  }
  const rir = registro.getByRole('radio', { name: '2', exact: true });
  if (!(await rir.isChecked())) await rir.check();
}

export async function salvarSerie(page: Page) {
  await preencherSerie(page);
  await page.getByRole('region', { name: /^Série \d/ }).getByRole('button', { name: /^Série feita/ }).click();
}

export async function pularDescanso(page: Page) {
  const pular = page.getByRole('button', { name: /^(Pular|Ok)$/ });
  if (await pular.isVisible()) await pular.click();
}

/** Acrescenta uma linha JSON (resiste a teste que falha: o worker reinicia e a lista em memória se perderia). */
export function anexarJsonl(nome: string, dados: unknown) {
  mkdirSync(BRUTO, { recursive: true });
  appendFileSync(`${BRUTO}/${nome}`, JSON.stringify(dados) + '\n');
}
