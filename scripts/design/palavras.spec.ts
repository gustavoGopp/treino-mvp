import { mkdirSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

// Design v3 (03/11/2026), fase 1: quanto se lê e quanto se toca no cadastro, tela a tela, com a persona fictícia Ana.
// Dois caminhos: "monto a lista" (halteres de 1 a 12 kg e banco reto, como em tests/e2e/jornada.ts) e "academia completa".
// Por tela: palavras no conteúdo (sem o topo), palavras à vista sem rolar, controles tocáveis, altura em telas e o
// tempo estimado de leitura a 200 palavras por minuto (aproximação para leitura silenciosa no celular, [opinião]:
// Brysbaert 2019 achou ~238/min em inglês, no papel e na tela do computador).
// Saída: docs/revisoes/design-v3/medidas-depois-<projeto>.json e as imagens em reports/design/v3-depois/<projeto>/.
// O "antes" (03/11/2026, antes da implementação) ficou em medidas-<projeto>.json, medido por este script no fluxo antigo.
// Uso: npx playwright test -c scripts/design palavras

const AGORA = new Date('2026-11-05T15:00:00.000Z');
const PPM = 200;

type Tela = {
  caminho: string;
  ordem: number;
  tela: string;
  palavras: number;
  palavrasSemRolar: number;
  segundosLeitura: number;
  tocaveis: number;
  alturaTelas: number;
  toquesAteAqui: number;
};
const telas: Tela[] = [];

test.use({ deviceScaleFactor: 1 });
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(AGORA);
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
});
// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}, info) => {
  mkdirSync('docs/revisoes/design-v3', { recursive: true });
  const minhas = telas.filter((t) => t.caminho.startsWith(info.project.name + '/'));
  writeFileSync(`docs/revisoes/design-v3/medidas-depois-${info.project.name}.json`, JSON.stringify(minhas, null, 1) + '\n');
});

function contador(page: Page, caminho: string) {
  let toques = 0;
  let ordem = 0;
  const proj = test.info().project.name;
  return {
    toque: async (acao: Promise<void>) => {
      await acao;
      toques++;
    },
    medir: async (nome: string) => {
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);
      const m = await page.evaluate(() => {
        const raiz = document.querySelector('main') ?? document.body;
        const conta = (s: string) => s.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length;
        // Só o que a pessoa vê: fora o texto só para leitor de tela (.sr, desde o selo da design v3) e o conteúdo
        // recolhido (details fechado). Palavras à vista = nós de texto cujo topo está dentro da 1ª tela.
        let palavras = 0;
        let semRolar = 0;
        const andar = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
        for (let n = andar.nextNode(); n; n = andar.nextNode()) {
          const el = n.parentElement;
          if (!el || !n.textContent?.trim() || el.closest('.sr')) continue;
          if (!el.checkVisibility({ visibilityProperty: true })) continue;
          const r = document.createRange();
          r.selectNodeContents(n);
          const caixa = r.getBoundingClientRect();
          if (caixa.height === 0) continue;
          palavras += conta(n.textContent);
          if (caixa.top < innerHeight) semRolar += conta(n.textContent);
        }
        // controles que a pessoa vê (o rádio escondido conta pelo rótulo: um toque por opção)
        const tocaveis = [...raiz.querySelectorAll('button, a[href], input, select, textarea, [role=button]')].filter((e) => {
          const alvo = e instanceof HTMLInputElement && e.labels?.[0] ? e.labels[0] : e;
          return alvo.checkVisibility({ visibilityProperty: true }) && alvo.getBoundingClientRect().height > 0;
        }).length;
        return {
          palavras,
          semRolar,
          tocaveis,
          altura: document.documentElement.scrollHeight / innerHeight,
        };
      });
      ordem++;
      telas.push({
        caminho: `${proj}/${caminho}`,
        ordem,
        tela: nome,
        palavras: m.palavras,
        palavrasSemRolar: m.semRolar,
        segundosLeitura: Math.round((m.palavras / PPM) * 60),
        tocaveis: m.tocaveis,
        alturaTelas: Math.round(m.altura * 100) / 100,
        toquesAteAqui: toques,
      });
      const dir = `reports/design/v3-depois/${proj}`;
      mkdirSync(dir, { recursive: true });
      await page.screenshot({
        path: `${dir}/${caminho}-${String(ordem).padStart(2, '0')}.png`,
        fullPage: true,
        animations: 'disabled',
      });
    },
    total: () => toques,
  };
}

const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });

async function inicio(page: Page, c: ReturnType<typeof contador>) {
  await page.goto('/');
  await c.medir('boas-vindas');
  await c.toque(page.getByRole('button', { name: 'Entendi, vamos começar' }).click());
  await expect(
    page.getByRole('heading', {
      name: 'Alguma destas vale para você?',
    }),
  ).toBeVisible();
  await c.medir('triagem');
  await c.toque(page.getByRole('button', { name: 'Não tenho nenhuma destas' }).click());
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  await c.medir('nível, 1ª pergunta');
  // Design v3: o toque responde e segue; com menos de 6 meses, a técnica não é perguntada.
  await c.toque(grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check());
  await expect(grupo(page, /treinando agora/)).toBeVisible();
  await c.medir('nível, 2ª pergunta');
  await c.toque(grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check());
  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  await c.medir('rotina, dias');
  await c.toque(grupo(page, /Quantos dias/).getByLabel('3 dias').check());
  await expect(grupo(page, /Quantos minutos/)).toBeVisible();
  await c.medir('rotina, minutos');
  await c.toque(grupo(page, /Quantos minutos/).getByLabel('45 min', { exact: true }).check());
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await c.medir('equipamento');
}

async function fim(page: Page, c: ReturnType<typeof contador>) {
  await c.toque(page.getByRole('button', { name: 'Continuar' }).click());
  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  await c.medir('tudo certo?');
  // A mesma prioridade do "antes" (pernas), agora pela linha opcional do "Tudo certo?".
  await c.toque(page.getByRole('link', { name: /Prioridade \(opcional\)/ }).click());
  await c.medir('prioridade');
  await c.toque(page.getByLabel('Pernas', { exact: true }).check());
  await c.toque(page.getByRole('button', { name: 'Salvar' }).click());
  await c.toque(page.getByRole('button', { name: 'Montar meu treino' }).click());
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await c.medir('seu treino');
}

test('cadastro, monto a lista (halteres)', async ({ page }) => {
  const c = contador(page, 'lista');
  await inicio(page, c);
  await c.toque(page.getByRole('button', { name: 'Monto a lista item por item' }).click());
  await c.toque(page.getByLabel('Halteres fixos', { exact: true }).check());
  await c.toque(grupo(page, 'O mais leve').getByLabel('1 kg', { exact: true }).check());
  await c.toque(grupo(page, 'O mais pesado').getByLabel('12 kg', { exact: true }).check());
  await c.toque(grupo(page, 'De quanto em quanto').getByLabel('1 kg', { exact: true }).check());
  await c.toque(page.getByLabel('Banco reto', { exact: true }).check());
  await c.medir('equipamento, marcado');
  await fim(page, c);
});

test('cadastro, academia completa', async ({ page }) => {
  const c = contador(page, 'academia');
  await inicio(page, c);
  await c.toque(page.getByRole('button', { name: 'Academia completa' }).click());
  await c.medir('equipamento, marcado');
  await fim(page, c);
});
