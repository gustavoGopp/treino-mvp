import { mkdirSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { carla } from '../../../../tests/personas/index';
import { coletar, grupo, instrumentar, marcarTela, Percurso } from './instrumentos';
import { DEFINICOES, marcarInventario } from './percursos';

// Agente 2: a tela de equipamento em separado: o lugar (os 4 atalhos), a lista (os cartões item a item) e a foto
// (com a API simulada: ela não roda localmente). Saída: reports/design/redesign/agente-2/equipamento-<projeto>.json
// e as capturas em reports/design/redesign/agente-2/<projeto>/equipamento/.
// Uso: npx playwright test -c scripts/design/redesign/agente-2/playwright.config.ts equipamento

const AGORA = new Date('2026-11-05T15:00:00.000Z');
const SAIDA = 'reports/design/redesign/agente-2';
const resultado: Record<string, unknown> = {};

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(AGORA);
  await instrumentar(page);
});
// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}, info) => {
  mkdirSync(SAIDA, { recursive: true });
  writeFileSync(`${SAIDA}/equipamento-${info.project.name}.json`, JSON.stringify(resultado, null, 1) + '\n');
});

/** Vai da abertura até a tela de equipamento com as respostas da Ana (sem condição, iniciante, 3 × 45). */
async function ateEquipamento(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await page.getByRole('button', { name: 'Nenhuma vale para mim' }).click();
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await grupo(page, /confiança na técnica/).getByLabel(/^Sim/).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await grupo(page, /Quantos minutos/).getByLabel('45 min', { exact: true }).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
}

const alturas = (page: Page) =>
  page.evaluate(() => ({
    telas: Math.round((document.documentElement.scrollHeight / innerHeight) * 10) / 10,
    marcados: document.querySelectorAll('.cartao-eq input:checked').length,
    cartoes: document.querySelectorAll('.cartao-eq').length,
    semDesenho: document.querySelectorAll('.cartao-eq:not(:has(svg))').length,
    detalhes: Array.from(document.querySelectorAll('.detalhes-eq h2')).map((h) => h.textContent?.trim()),
  }));

async function foto(page: Page, nome: string) {
  const dir = `${SAIDA}/${test.info().project.name}/equipamento`;
  mkdirSync(dir, { recursive: true });
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${dir}/${nome}-relance.png`, fullPage: false, animations: 'disabled' });
  await page.screenshot({ path: `${dir}/${nome}.png`, fullPage: true, animations: 'disabled' });
}

/**
 * Depois do atalho, completa o que a tela ainda pede com a 1ª opção de cada campo com erro, até passar.
 * Conta os toques: é o custo mínimo de "sair" da tela depois do atalho.
 */
async function completarMinimo(page: Page): Promise<{ erros: string[]; toquesParaCompletar: number }> {
  const errosVistos: string[] = [];
  for (let volta = 0; volta < 8; volta++) {
    await page.getByRole('button', { name: 'Continuar' }).click();
    if (await page.getByRole('heading', { name: 'Tudo certo?' }).isVisible().catch(() => false)) break;
    const campos = page.locator('fieldset.com-erro');
    const n = await campos.count();
    if (!n) break;
    for (let i = 0; i < n; i++) {
      const f = campos.nth(i);
      errosVistos.push((await f.locator('.erro').first().innerText()).trim());
      const opcao = f.locator('input[type=radio], input[type=checkbox]').first();
      if (await opcao.count()) await opcao.check();
      else {
        const mais = f.locator('button[aria-label^="Mais"]').first();
        if (await mais.count()) await mais.click();
      }
    }
  }
  const reg = await coletar(page);
  // tira o "Continuar" final (ele é contado no percurso inteiro, não aqui)
  const toques = reg.toques.filter((t) => t.tela === 'completar').length - 1;
  return { erros: [...new Set(errosVistos)], toquesParaCompletar: Math.max(0, toques) };
}

// Um teste por atalho (cada um num navegador limpo: o inventário salvo pré-marcaria o formulário do seguinte).
const ATALHOS_NOMES = ['Academia completa', 'Condomínio com multifuncional', 'Casa com halteres e elásticos', 'Corpo livre'];
for (const nome of ATALHOS_NOMES) {
  test(`lugar: atalho "${nome}": o que marca, o que ainda pergunta e quanto custa sair da tela`, async ({ page }) => {
    await ateEquipamento(page);
    const chave = nome.split(' ')[0]!.toLowerCase();
    if (chave === 'academia') {
      resultado.telaVazia = await alturas(page);
      await foto(page, '00-vazia');
    }
    await marcarTela(page, 'atalho');
    const t0 = Date.now();
    await page.getByRole('button', { name: nome, exact: true }).click();
    const depois = await alturas(page);
    const asVezes = await grupo(page, /Às vezes tem/).getByRole('checkbox').count().catch(() => 0);
    await foto(page, `01-atalho-${chave}`);
    await coletar(page);
    await marcarTela(page, 'completar');
    const { erros, toquesParaCompletar } = await completarMinimo(page);
    const ms = Date.now() - t0;
    resultado[`atalho:${nome}`] = { ...depois, asVezes, errosAoContinuar: erros, toquesParaCompletar, toquesAteSair: 1 + toquesParaCompletar + 1, tempoRoboMs: ms };
  });
}

test('lista: os cartões, as categorias e o custo de marcar a Carla item a item', async ({ page }) => {
  await ateEquipamento(page);
  const lista = await page.evaluate(() => {
    const H = innerHeight;
    const cats = Array.from(document.querySelectorAll('fieldset.categoria')).map((f) => {
      const r = f.getBoundingClientRect();
      return { titulo: f.querySelector('legend')?.textContent?.trim(), itens: f.querAll ? 0 : f.querySelectorAll('.cartao-eq').length, topoEmTelas: Math.round(((r.top + scrollY) / H) * 10) / 10 };
    });
    const foto = document.querySelector('.foto-eq')?.getBoundingClientRect();
    return { cartoes: document.querySelectorAll('.cartao-eq').length, semDesenho: document.querySelectorAll('.cartao-eq:not(:has(svg))').length, categorias: cats, fotoTopoEmTelas: foto ? Math.round(((foto.top + scrollY) / H) * 10) / 10 : null, telas: Math.round((document.documentElement.scrollHeight / H) * 10) / 10 };
  });
  // Carla item a item (sem o atalho): o pior caso da lista.
  const c = new Percurso(page, 'carla-lista');
  await marcarTela(page, 'lista');
  const t0 = Date.now();
  await marcarInventario(c, carla.inventario);
  const ms = Date.now() - t0;
  const depois = await alturas(page);
  await foto(page, '02-lista-carla-completa');
  const reg = await coletar(page);
  resultado.lista = { ...lista, carlaItemAItem: { toques: reg.toques.length, caracteres: c.charsDigitados, tempoRoboMs: ms, alturaFinal: depois.telas, rolagemMax: Math.round(((reg.rolagemMax.lista ?? 0) / 915) * 10) / 10 } };
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
});

test('foto: até o envio, a espera e a confirmação (API simulada com 3 s de resposta)', async ({ page }) => {
  await ateEquipamento(page);
  const ESPERA = 3000;
  let pedidoEm = 0;
  let tamanhoKb = 0;
  await page.route('**/api/vision', async (route) => {
    pedidoEm = Date.now();
    tamanhoKb = Math.round((route.request().postData()?.length ?? 0) / 1024);
    await new Promise((ok) => setTimeout(ok, ESPERA));
    await route.fulfill({
      json: {
        itens: [
          { itemId: 'halteres_fixos', confianca: 'alta', evidencia: 'no suporte à esquerda', atributos: { minKg: 1, maxKg: 12, passoKg: 1 } },
          { itemId: 'banco_reto', confianca: 'media', evidencia: 'ao fundo' },
          { itemId: 'esteira', confianca: 'alta', evidencia: 'à direita' },
          { itemId: 'step', confianca: 'baixa', evidencia: 'no canto' },
        ],
      },
    });
  });
  // uma foto grande, como a de um celular (2000 × 1500), gerada no navegador
  const bytes = await page.evaluate(async () => {
    const c = document.createElement('canvas');
    c.width = 2000;
    c.height = 1500;
    const g = c.getContext('2d')!;
    g.fillStyle = '#8899aa';
    g.fillRect(0, 0, 2000, 1500);
    const b = await new Promise<Blob>((ok) => c.toBlob((x) => ok(x!), 'image/jpeg', 0.9));
    return [...new Uint8Array(await b.arrayBuffer())];
  });
  const fotoRegiao = page.locator('.foto-eq');
  const posicao = await fotoRegiao.evaluate((e) => Math.round(((e.getBoundingClientRect().top + scrollY) / innerHeight) * 10) / 10);
  const c = new Percurso(page, 'foto');
  await marcarTela(page, 'foto');
  // o código de convite é obrigatório: caracteres digitados
  await c.digitar(page.getByLabel('Código de convite'), 'BETA1');
  const t0 = Date.now();
  await page.getByLabel('Escolher fotos').setInputFiles({ name: 'academia.jpg', mimeType: 'image/jpeg', buffer: Buffer.from(bytes) });
  // o que a tela mostra enquanto espera
  await page.waitForTimeout(900);
  const esperando = await page.evaluate(() => ({
    status: document.querElement ? '' : (document.querySelector('[role=status]')?.textContent ?? '').trim(),
    botao: (document.querySelector('label[for][class*=btn]') as HTMLElement | null)?.innerText.trim(),
    progressbar: document.querySelectorAll('[role=progressbar], progress').length,
    desabilitado: (document.querySelector('.arquivo-campo input') as HTMLInputElement | null)?.disabled ?? null,
  }));
  await foto(page, '03-foto-esperando');
  await expect(page.getByRole('region', { name: 'O que encontramos nas fotos' })).toBeVisible({ timeout: 15_000 });
  const respondeuEm = Date.now();
  await foto(page, '04-foto-sugestoes');
  const estadoInicial = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.sugestao-foto')).map((li) => ({
      item: li.querySelector('b')?.textContent,
      tenho: li.querySelector('button[aria-pressed="true"]')?.textContent ?? null,
      soFoto: !!li.querySelector('p.ajuda'),
    })),
  );
  const usar = page.getByRole('button', { name: 'Usar na lista' });
  const desabilitadoAntes = await usar.isDisabled();
  await page.getByRole('group', { name: /Você tem Banco reto/ }).getByRole('button', { name: 'Tenho' }).click();
  await usar.click();
  await expect(page.getByLabel('Halteres fixos', { exact: true })).toBeChecked();
  const halteresPreenchidos = await grupo(page, 'O mais pesado').getByLabel('12 kg', { exact: true }).isChecked();
  await foto(page, '05-foto-aplicada');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  const reg = await coletar(page);
  resultado.foto = {
    posicaoNaTelaEmTelas: posicao,
    caracteresConvite: c.charsDigitados,
    preparoNoAparelhoMs: pedidoEm - t0,
    tamanhoPedidoKb: tamanhoKb,
    esperaSimuladaMs: ESPERA,
    respostaTotalMs: respondeuEm - t0,
    enquantoEspera: esperando,
    sugestoesComoAbrem: estadoInicial,
    usarDesabilitadoAteResponderTudo: desabilitadoAntes,
    halteresPreenchidosPelaFoto: halteresPreenchidos,
    toquesDepoisDaFoto: reg.toques.filter((t) => t.tela === 'foto' && t.tipo === 'botao').map((t) => t.alvo),
    toquesTotalNaTela: reg.toques.filter((t) => t.tela === 'foto').length,
  };
});

// O que "Academia completa" supõe × o inventário da Carla (os 49 itens): o que o atalho deixa de fora.
test('academia completa × Carla: o que o atalho não marca', async ({ page }) => {
  await ateEquipamento(page);
  await page.getByRole('button', { name: 'Academia completa', exact: true }).click();
  const marcados = await page.evaluate(() => Array.from(document.querySelectorAll<HTMLInputElement>('.cartao-eq input:checked')).map((i) => i.closest('label')?.querySelector('span')?.textContent?.trim()));
  const faltam = Object.keys(carla.inventario).filter((id) => !marcados.includes(DEF_NOME(id)));
  resultado.academiaVsCarla = { marcados: marcados.length, itensDaCarla: Object.keys(carla.inventario).length, faltam };
  function DEF_NOME(id: string) {
    return (DEFINICOES.carla!.persona.inventario as Record<string, unknown>)[id] !== undefined ? NOMES[id] ?? id : id;
  }
});

import { NOME_CURTO as NOMES } from '../../../../src/features/onboarding/inventarioForm';
