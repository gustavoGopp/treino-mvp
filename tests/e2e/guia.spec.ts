import { expect, test } from "@playwright/test";

test("do início ao guia: troca de exercício, modo e vista", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByText("Como funciona").click();
  await page.getByRole("link", { name: "Ver o guia de exercícios" }).click();
  await expect(page).toHaveURL(/\/guia\/supino-inclinado$/);
  await expect(
    page.getByRole("heading", { name: "Supino inclinado com halteres" }),
  ).toBeVisible();
  await expect(page.locator(".stage svg line").first()).toBeAttached();

  await page.getByRole("button", { name: "Erros" }).click();
  await expect(page.locator(".errchip").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await page.getByRole("button", { name: "Membros A" }).click();
  await expect(page).toHaveURL(/\/guia\/goblet$/);
  await page.getByRole("button", { name: "Próximo exercício" }).click();
  await expect(page).toHaveURL(/\/guia\/stiff$/);
});

test("com movimento reduzido, a animação começa pausada", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/guia/barra-fixa");
  await expect(page.getByRole("button", { name: "Reproduzir" })).toBeVisible();
});

test("rota direta funciona e id desconhecido volta para o primeiro exercício", async ({
  page,
}) => {
  await page.goto("/guia/nao-existe");
  await expect(page).toHaveURL(/\/guia\/supino-inclinado$/);
});

test("o boneco novo é o padrão, a silhueta fica em Meus dados e o clássico saiu do app", async ({
  page,
}) => {
  await page.goto("/guia/goblet");
  await expect(page.locator(".stage svg")).toHaveClass(/estilo-a/);
  await expect(
    page.locator(".stage svg path.ea-mp, .stage svg path.ea-ms"),
  ).toHaveCount(0); // músculo só no modo Músculos
  await page.getByRole("button", { name: "Músculos" }).click();
  await expect(page.locator(".stage svg path.ea-mp").first()).toBeAttached();

  await page.goto("/dados");
  const grupo = page.getByRole("radiogroup", { name: "Estilo do boneco" });
  await expect(
    grupo.getByRole("radio", { name: /Boneco \(padrão\)/ }),
  ).toBeChecked();
  await expect(grupo.getByRole("radio", { name: /Clássico/ })).toHaveCount(0);

  await page.goto("/dados");
  await page
    .getByRole("radiogroup", { name: "Estilo do boneco" })
    .getByRole("radio", { name: /Silhueta/ })
    .check();
  await page.goto("/guia/goblet");
  await expect(page.locator(".stage svg")).toHaveClass(/estilo-b/);
});

test("quem tinha escolhido o clássico passa ao Boneco", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("treino-mvp:estilo-boneco", "atual"),
  );
  await page.goto("/guia/goblet");
  await expect(page.locator(".stage svg")).toHaveClass(/estilo-a/);
});

test("o modo Músculos abre na vista em que o músculo principal aparece mais (afundo: de lado)", async ({
  page,
}) => {
  await page.goto("/guia/afundo?vista=frontal");
  await page.getByRole("button", { name: "Músculos" }).click();
  await expect(
    page
      .getByRole("group", { name: "Visão" })
      .getByRole("button", { name: "Lateral" }),
  ).toHaveAttribute("aria-pressed", "true");
  // escolhida pela pessoa, a vista fica
  await page
    .getByRole("group", { name: "Visão" })
    .getByRole("button", { name: "Frontal" })
    .click();
  await page.getByRole("button", { name: "Técnica" }).click();
  await page.getByRole("button", { name: "Músculos" }).click();
  await expect(
    page
      .getByRole("group", { name: "Visão" })
      .getByRole("button", { name: "Frontal" }),
  ).toHaveAttribute("aria-pressed", "true");
});
