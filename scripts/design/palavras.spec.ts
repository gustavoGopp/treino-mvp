import { mkdirSync, writeFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";

// Design v3 (03/11/2026), fase 1: quanto se lê e quanto se toca no cadastro, tela a tela, com a persona fictícia Ana.
// Dois caminhos: "monto a lista" (halteres de 1 a 12 kg e banco reto, como em tests/e2e/jornada.ts) e "academia completa".
// Por tela: palavras no conteúdo (sem o topo), palavras à vista sem rolar, controles tocáveis, altura em telas e o
// tempo estimado de leitura a 200 palavras por minuto (aproximação para leitura silenciosa no celular, [opinião]:
// Brysbaert 2019 achou ~238/min em inglês, no papel e na tela do computador).
// Saída: docs/revisoes/design-v3/medidas-<projeto>.json e as imagens em reports/design/v3-antes/<projeto>/.
// Uso: npx playwright test -c scripts/design palavras

const AGORA = new Date("2026-11-05T15:00:00.000Z");
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
  mkdirSync("docs/revisoes/design-v3", { recursive: true });
  const minhas = telas.filter((t) =>
    t.caminho.startsWith(info.project.name + "/"),
  );
  writeFileSync(
    `docs/revisoes/design-v3/medidas-${info.project.name}.json`,
    JSON.stringify(minhas, null, 1) + "\n",
  );
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
        const raiz = document.querySelector("main") ?? document.body;
        const conta = (s: string) =>
          s.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length;
        const palavras = conta((raiz as HTMLElement).innerText);
        // palavras dos nós de texto cujo topo está dentro da 1ª tela
        let semRolar = 0;
        const andar = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
        for (let n = andar.nextNode(); n; n = andar.nextNode()) {
          const el = n.parentElement;
          if (!el || !n.textContent?.trim()) continue;
          if (!el.checkVisibility({ visibilityProperty: true })) continue;
          const r = document.createRange();
          r.selectNodeContents(n);
          const caixa = r.getBoundingClientRect();
          if (caixa.height > 0 && caixa.top < innerHeight)
            semRolar += conta(n.textContent);
        }
        // controles que a pessoa vê (o rádio escondido conta pelo rótulo: um toque por opção)
        const tocaveis = [
          ...raiz.querySelectorAll(
            "button, a[href], input, select, textarea, [role=button]",
          ),
        ].filter((e) => {
          const alvo =
            e instanceof HTMLInputElement && e.labels?.[0] ? e.labels[0] : e;
          return (
            alvo.checkVisibility({ visibilityProperty: true }) &&
            alvo.getBoundingClientRect().height > 0
          );
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
      const dir = `reports/design/v3-antes/${proj}`;
      mkdirSync(dir, { recursive: true });
      await page.screenshot({
        path: `${dir}/${caminho}-${String(ordem).padStart(2, "0")}.png`,
        fullPage: true,
        animations: "disabled",
      });
    },
    total: () => toques,
  };
}

const grupo = (page: Page, nome: string | RegExp) =>
  page.getByRole("group", { name: nome });

async function inicio(page: Page, c: ReturnType<typeof contador>) {
  await page.goto("/");
  await c.medir("boas-vindas");
  await c.toque(
    page.getByRole("button", { name: "Entendi, vamos começar" }).click(),
  );
  await expect(
    page.getByRole("heading", {
      name: "Antes de começar, 9 perguntas rápidas",
    }),
  ).toBeVisible();
  await c.medir("triagem");
  await c.toque(
    page.getByRole("button", { name: "Nenhuma vale para mim" }).click(),
  );
  await expect(
    page.getByRole("heading", { name: "Sua experiência com musculação" }),
  ).toBeVisible();
  await c.medir("nível, 1ª pergunta");
  await c.toque(
    grupo(page, /sem parar/)
      .getByLabel("Menos de 6 meses")
      .check(),
  );
  await c.toque(
    grupo(page, /treinando agora/)
      .getByLabel(/^Estou treinando/)
      .check(),
  );
  await c.toque(
    grupo(page, /confiança na técnica/)
      .getByLabel(/^Sim/)
      .check(),
  );
  await c.medir("nível, respondido");
  await c.toque(page.getByRole("button", { name: "Continuar" }).click());
  await expect(
    page.getByRole("heading", { name: "Sua rotina de treino" }),
  ).toBeVisible();
  await c.medir("rotina");
  await c.toque(
    grupo(page, /Quantos dias/)
      .getByLabel("3 dias")
      .check(),
  );
  await c.toque(
    grupo(page, /Quantos minutos/)
      .getByLabel("45 min", { exact: true })
      .check(),
  );
  await c.toque(page.getByLabel("Pernas", { exact: true }).check());
  await c.medir("rotina, respondida");
  await c.toque(page.getByRole("button", { name: "Continuar" }).click());
  await expect(
    page.getByRole("heading", { name: "Que equipamento você tem?" }),
  ).toBeVisible();
  await c.medir("equipamento");
}

async function fim(page: Page, c: ReturnType<typeof contador>) {
  await c.toque(page.getByRole("button", { name: "Continuar" }).click());
  await expect(
    page.getByRole("heading", { name: "Tudo certo?" }),
  ).toBeVisible();
  await c.medir("tudo certo?");
  await c.toque(
    page.getByRole("button", { name: "Gerar meu programa" }).click(),
  );
  await expect(
    page.getByRole("heading", { name: "Seu treino", exact: true }),
  ).toBeVisible();
  await c.medir("seu treino");
}

test("cadastro, monto a lista (halteres)", async ({ page }) => {
  const c = contador(page, "lista");
  await inicio(page, c);
  await c.toque(page.getByLabel("Halteres fixos", { exact: true }).check());
  await c.toque(
    grupo(page, "O mais leve").getByLabel("1 kg", { exact: true }).check(),
  );
  await c.toque(
    grupo(page, "O mais pesado").getByLabel("12 kg", { exact: true }).check(),
  );
  await c.toque(
    grupo(page, "De quanto em quanto")
      .getByLabel("1 kg", { exact: true })
      .check(),
  );
  await c.toque(page.getByLabel("Banco reto", { exact: true }).check());
  await c.medir("equipamento, marcado");
  await fim(page, c);
});

test("cadastro, academia completa", async ({ page }) => {
  const c = contador(page, "academia");
  await inicio(page, c);
  await c.toque(
    page.getByRole("button", { name: "Academia completa" }).click(),
  );
  await c.medir("equipamento, marcado");
  await fim(page, c);
});
