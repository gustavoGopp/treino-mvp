import { expect, test } from '@playwright/test';
import { ana } from './jornada';

test('do início ao guia: troca de exercício, modo e vista', async ({ page }) => {
  // lote 3 do redesign: a boas-vindas não tem mais o atalho; o guia abre pelo endereço
  await page.goto('/guia');
  await expect(page).toHaveURL(/\/guia\/supino-inclinado$/);
  await expect(page.getByRole('heading', { name: 'Supino inclinado com halteres' })).toBeVisible();
  await expect(page.locator('.stage svg path').first()).toBeAttached();

  await page.getByRole('button', { name: 'Erros' }).click();
  await expect(page.locator('.errchip').first()).toHaveAttribute('aria-pressed', 'true');

  await page.getByRole('button', { name: 'Membros A' }).click();
  await expect(page).toHaveURL(/\/guia\/goblet$/);
  await page.getByRole('button', { name: 'Próximo exercício' }).click();
  await expect(page).toHaveURL(/\/guia\/stiff$/);
});

test('com movimento reduzido, a animação começa pausada', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/guia/barra-fixa');
  await expect(page.getByRole('button', { name: 'Reproduzir' })).toBeVisible();
});

test('rota direta funciona e id desconhecido volta para o primeiro exercício', async ({ page }) => {
  await page.goto('/guia/nao-existe');
  await expect(page).toHaveURL(/\/guia\/supino-inclinado$/);
});

test('o cinza é o padrão, o cor de pele fica em Meus dados e os desenhos de antes saíram do app', async ({ page }) => {
  await page.goto('/guia/goblet');
  // o desenho é o do motor novo, no cinza
  await expect(page.locator('.stage svg')).toHaveClass(/\bnovo\b.*\bcinza\b/);
  await expect(page.locator('.stage svg path.b-mp, .stage svg path.b-ms')).toHaveCount(0); // músculo só no modo Músculos
  await page.getByRole('button', { name: 'Músculos' }).click();
  await expect(page.locator('.stage svg path.b-mp').first()).toBeAttached();

  // lote 5 do redesign: o estilo fica numa folha de Meus dados, com a prévia de cada desenho
  await page.goto('/dados');
  await page.getByRole('button', { name: 'Estilo do Boneco' }).click();
  // sessão de textos (16/11/2026): a folha são os dois bonecos, cada um com um nome de uma palavra embaixo
  const folha = page.getByRole('dialog', { name: 'Estilo do Boneco' });
  const grupo = folha.getByRole('radiogroup', { name: 'Estilo do Boneco' });
  await expect(grupo.getByRole('radio', { name: 'Manequim', exact: true })).toBeChecked();
  await expect(grupo.getByRole('radio')).toHaveCount(2);
  // à vista, só o título, o "Fechar" e os dois nomes: nenhuma frase de explicação nem descrição
  await expect.poll(() => folha.evaluate((f) => {
    const anda = document.createTreeWalker(f, NodeFilter.SHOW_TEXT);
    let palavras = 0;
    for (let no = anda.nextNode(); no; no = anda.nextNode()) if (!no.parentElement!.closest('.sr, svg') && no.parentElement!.checkVisibility()) palavras += (no.textContent ?? '').trim().split(/\s+/).filter(Boolean).length;
    return palavras;
  })).toBe(6);
  await expect(grupo.getByRole('radio', { name: /Clássico|Silhueta|Boneco \(padrão\)/ })).toHaveCount(0);
  await expect(grupo.locator('svg.pele path.b-mp').first()).toBeAttached();
  await expect(grupo.locator('svg.cinza path.b-mp').first()).toBeAttached();
  // o Boneco enche o cartão (o quadro fecha em volta do corpo) e o escolhido tem a marca, não só a cor
  for (const desenho of await grupo.locator('label > svg').all()) {
    const parte = await desenho.evaluate((s) => {
      const corpo = Array.from(s.querySelectorAll('path')).map((p) => p.getBoundingClientRect());
      return (Math.max(...corpo.map((r) => r.bottom)) - Math.min(...corpo.map((r) => r.top))) / s.getBoundingClientRect().height;
    });
    expect(parte).toBeGreaterThan(0.6);
  }
  await expect(grupo.locator('label', { has: page.getByRole('radio', { name: 'Manequim', exact: true }) }).locator('.marca')).toBeVisible();
  await expect(grupo.locator('label', { has: page.getByRole('radio', { name: 'Pessoa', exact: true }) }).locator('.marca')).toBeHidden();

  // escolhido o cor de pele, o guia, a legenda e a miniatura do programa passam a ele
  await grupo.getByRole('radio', { name: 'Pessoa', exact: true }).check();
  await page.goto('/guia/goblet');
  await expect(page.locator('.stage svg')).toHaveClass(/\bnovo\b.*\bpele\b/);
  await page.getByRole('button', { name: 'Músculos' }).click();
  await expect(page.locator('.legend.pele')).toBeVisible();
});

// Quem tinha uma escolha de antes guardada (o clássico, o Boneco de antes ou a Silhueta) passa ao padrão.
for (const antigo of ['atual', 'a', 'b'])
  test(`quem tinha escolhido um desenho de antes ("${antigo}") passa ao cinza`, async ({ page }) => {
    await page.addInitScript((v) => localStorage.setItem('treino-mvp:estilo-boneco', v), antigo);
    await page.goto('/guia/goblet');
    await expect(page.locator('.stage svg')).toHaveClass(/\bnovo\b.*\bcinza\b/);
  });

test('o modo Músculos abre na vista em que o músculo principal aparece mais (afundo: de lado)', async ({ page }) => {
  await page.goto('/guia/afundo?vista=frontal');
  await page.getByRole('button', { name: 'Músculos' }).click();
  await expect(page.getByRole('group', { name: 'Visão' }).getByRole('button', { name: 'Lateral' })).toHaveAttribute('aria-pressed', 'true');
  // escolhida pela pessoa, a vista fica
  await page.getByRole('group', { name: 'Visão' }).getByRole('button', { name: 'Frontal' }).click();
  await page.getByRole('button', { name: 'Técnica' }).click();
  await page.getByRole('button', { name: 'Músculos' }).click();
  await expect(page.getByRole('group', { name: 'Visão' }).getByRole('button', { name: 'Frontal' })).toHaveAttribute('aria-pressed', 'true');
});

// Lote 2 do redesign: a nota de montagem segura fica à vista em todos os modos, com o negrito de verdade (antes, só no
// modo Técnica e com as marcas <b> escritas na tela).
test('a nota de montagem segura aparece em todos os modos, sem marca de HTML escrita', async ({ page }) => {
  await page.goto('/guia/bulgaro-suspensao');
  const nota = page.locator('.nota-guia');
  for (const modo of ['Técnica', 'Erros', 'Músculos', 'Trajetória']) {
    await page.getByRole('button', { name: modo, exact: true }).click();
    await expect(nota).toBeVisible();
    await expect(nota.locator('b').first()).toHaveText(/Montagem segura/);
    await expect(nota).not.toContainText('<b>');
  }
  // sessão de textos (16/11/2026): o selo da nota saiu do guia; a regra da montagem segura, com o nível e as fontes,
  // está em "Entenda o treino" (tests/e2e/entenda.spec.ts)
  await expect(nota.locator('button.selo')).toHaveCount(0);
});

test('o guia tem a página principal marcada e os exercícios do catálogo como botões (sem aba falsa)', async ({ page }) => {
  await page.goto('/guia/goblet');
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('tab')).toHaveCount(0);
  await expect(page.getByRole('group', { name: 'Exercícios' }).getByRole('button').first()).toHaveAttribute('aria-pressed');
  await expect(page.getByRole('button', { name: 'Lento' })).toBeVisible();
});

// Segurança: no guia aberto pelo treino, "Senti algo" fica no cabeçalho e volta ao treino com a folha aberta.
test('no guia aberto pelo treino, "Senti algo" volta ao treino com a folha de segurança aberta', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\//);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await expect(page.getByRole('dialog', { name: 'O que você sentiu?' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Senti algo' }).getByRole('button', { name: 'Dor, pressão ou aperto no peito' })).toBeVisible();
});
