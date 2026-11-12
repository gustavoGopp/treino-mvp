import { readdirSync, readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { temExif } from '../../src/lib/imagem';
import { semContrasteBaixo } from './contraste';
import { ana, detalhesDo, folhaPronta } from './jornada';
import { semToquePequeno } from './toque';

// M4: foto do equipamento, com a API simulada (o teste não chama o Claude nem precisa de chave).

/** JPEG grande (2000 × 1500) gerado no navegador, com um segmento EXIF falso (como o de uma câmera com GPS). */
async function fotoComExif(page: Page): Promise<Buffer> {
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
  const conteudo = [...Buffer.from('Exif\0\0GPS-22.9,-43.2')];
  const app1 = [0xff, 0xe1, (conteudo.length + 2) >> 8, (conteudo.length + 2) & 0xff, ...conteudo];
  return Buffer.from([...bytes.slice(0, 2), ...app1, ...bytes.slice(2)]);
}

async function irParaEquipamento(page: Page) {
  await ana(page);
  await page.goto('/comecar/inventario');
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  // lote 3 do redesign: a foto abre numa folha, pelo botão "Pela foto"
  await page.getByRole('button', { name: 'Pela foto' }).click();
  await folhaPronta(page);
}

test('foto: tira o EXIF no aparelho, mostra as sugestões e só usa o que a pessoa confirma', async ({ page }) => {
  await irParaEquipamento(page);
  let recebido: { convite: string; fotos: string[] } | undefined;
  await page.route('**/api/vision', async (route) => {
    recebido = route.request().postDataJSON();
    await route.fulfill({
      json: {
        itens: [
          { itemId: 'barra_fixa', confianca: 'alta', evidencia: 'foto 1, no batente' },
          { itemId: 'banco_regulavel', confianca: 'media', evidencia: 'foto 1, ao fundo', atributos: { declina: false } },
          { itemId: 'step', confianca: 'baixa', evidencia: 'foto 1, canto' },
        ],
      },
    });
  });

  const original = await fotoComExif(page);
  expect(temExif(original)).toBe(true);
  await page.getByLabel(/^Autorizo enviar as minhas fotos/).check();
  await page.getByLabel('Código de convite').fill('beta1');
  await page.getByLabel('Escolher fotos').setInputFiles({ name: 'academia.jpg', mimeType: 'image/jpeg', buffer: original });

  const sugestoes = page.getByRole('region', { name: 'O que encontramos nas fotos' });
  await expect(sugestoes).toBeVisible();
  // O que saiu do aparelho: JPEG novo, menor e sem EXIF.
  const enviada = Buffer.from(recebido!.fotos[0]!, 'base64');
  expect(temExif(enviada)).toBe(false);
  expect(enviada.length).toBeLessThan(original.length);
  expect(recebido!.convite).toBe('beta1');

  // Alta já vem como "Tenho", baixa como "Não tenho", média pergunta.
  await expect(sugestoes.getByRole('group', { name: 'Você tem Barra fixa?' }).getByRole('button', { name: 'Tenho', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(sugestoes.getByRole('group', { name: 'Você tem Step?' }).getByRole('button', { name: 'Não tenho' })).toHaveAttribute('aria-pressed', 'true');
  const usar = sugestoes.getByRole('button', { name: 'Usar na lista' });
  await expect(usar).toBeDisabled();
  await sugestoes.getByRole('group', { name: 'Você tem Banco regulável?' }).getByRole('button', { name: 'Tenho', exact: true }).click();
  await usar.click();

  // a folha fecha e a lista abre com o que foi confirmado
  const marcados = page.getByRole('region', { name: /^Marcados/ });
  await expect(marcados).toContainText('Barra fixa');
  await expect(marcados).toContainText('Banco regulável');
  await expect(marcados).not.toContainText('Step');
  // O atributo da foto preencheu o detalhe ainda vazio.
  await expect((await detalhesDo(page, 'Banco regulável')).getByRole('group', { name: /também declina/ }).getByLabel('Não')).toBeChecked();
});

test('foto: convite inválido mostra o motivo e a lista continua funcionando', async ({ page }) => {
  await irParaEquipamento(page);
  await page.route('**/api/vision', (route) => route.fulfill({ status: 403, json: { codigo: 'convite', erro: 'Código de convite inválido.' } }));
  await page.getByLabel(/^Autorizo enviar as minhas fotos/).check();
  await page.getByLabel('Código de convite').fill('errado');
  await page.getByLabel('Escolher fotos').setInputFiles({ name: 'a.jpg', mimeType: 'image/jpeg', buffer: await fotoComExif(page) });
  await expect(page.getByRole('alert')).toHaveText('Código de convite inválido.');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
});

test('foto: a caixa de consentimento aparece antes do 1º envio e não depois (privacidade.foto)', async ({ page }) => {
  await irParaEquipamento(page);
  let envios = 0;
  await page.route('**/api/vision', async (route) => {
    envios++;
    await route.fulfill({ json: { itens: [{ itemId: 'barra_fixa', confianca: 'alta', evidencia: 'foto 1' }] } });
  });
  const caixa = page.getByRole('region', { name: 'Antes de enviar: para onde vai a foto' });
  await expect(caixa).toBeVisible();
  await expect(caixa).toContainText('Anthropic, empresa dos EUA');
  await expect(caixa).toContainText('em até 30 dias');
  await expect(caixa).toContainText('O servidor do app não guarda a foto');
  const autorizo = page.getByLabel(/^Autorizo enviar as minhas fotos/);
  await expect(autorizo).not.toBeChecked();
  // Sem a autorização, o botão das fotos fica desligado e nada é enviado.
  await expect(page.getByLabel('Escolher fotos')).toBeDisabled();
  for (const tema of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: tema });
    await semToquePequeno(page);
    await semContrasteBaixo(page);
  }
  await autorizo.check();
  await expect(page.getByLabel('Escolher fotos')).toBeEnabled();
  await page.getByLabel('Código de convite').fill('beta1');
  await page.getByLabel('Escolher fotos').setInputFiles({ name: 'a.jpg', mimeType: 'image/jpeg', buffer: await fotoComExif(page) });
  await expect(page.getByRole('region', { name: 'O que encontramos nas fotos' })).toBeVisible();
  expect(envios).toBe(1);
  const data = await page.evaluate(() => localStorage.getItem('treino-foto-consentimento'));
  expect(data).toMatch(/^\d{4}-\d{2}-\d{2}T/);

  // Depois do 1º envio, a caixa não volta: nem nesta tela nem ao recarregar.
  await page.getByRole('button', { name: 'Descartar e voltar' }).click();
  await expect(caixa).toHaveCount(0);
  await expect(page.getByText(/^Você autorizou o envio das fotos à Anthropic, nos EUA, em/)).toBeVisible();
  await page.reload();
  // lote 3 do redesign: a foto abre numa folha, pelo botão "Pela foto"
  await page.getByRole('button', { name: 'Pela foto' }).click();
  await folhaPronta(page);
  await expect(page.getByRole('heading', { name: 'Reconhecer pela foto' }).first()).toBeVisible();
  await expect(caixa).toHaveCount(0);
  await expect(page.getByLabel('Escolher fotos')).toBeEnabled();

  // Retirar a autorização (LGPD, art. 8º, § 5º): a caixa volta antes do próximo envio.
  await page.getByRole('button', { name: 'Retirar a autorização' }).click();
  await expect(caixa).toBeVisible();
  await expect(page.getByLabel('Escolher fotos')).toBeDisabled();
  expect(await page.evaluate(() => localStorage.getItem('treino-foto-consentimento'))).toBeNull();
});

test('a chave da API não aparece no código que vai para o navegador', async () => {
  const pasta = 'dist/assets';
  const conteudo = readdirSync(pasta)
    .filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(`${pasta}/${f}`, 'utf8'))
    .join('\n');
  for (const proibido of ['sk-ant-', 'ANTHROPIC_API_KEY', '@anthropic-ai/sdk', 'x-api-key']) expect(conteudo, proibido).not.toContain(proibido);
});

// Auditoria de 12/11/2026: qualquer erro de rede virava "Sem conexão", e a foto que o navegador não abre (HEIC)
// mostrava o texto do navegador, em inglês.
test('foto: cada tipo de erro tem a mensagem dele, em português', async ({ page }) => {
  await irParaEquipamento(page);
  const jpeg = await fotoComExif(page);
  await page.getByLabel(/^Autorizo enviar as minhas fotos/).check();
  await page.getByLabel('Código de convite').fill('beta1');
  const enviar = (arquivo: { name: string; mimeType: string; buffer: Buffer }) => page.getByLabel('Escolher fotos').setInputFiles(arquivo);
  const erro = page.locator('.foto-eq [role="alert"]');

  // a foto que o navegador não abre: nada é enviado
  let pedidos = 0;
  await page.route('**/api/vision', async (route) => {
    pedidos++;
    await route.abort();
  });
  await enviar({ name: 'foto.heic', mimeType: 'image/heic', buffer: Buffer.from('isto não é uma imagem') });
  await expect(erro).toHaveText(/Não foi possível abrir .* foto.* neste navegador/);
  await expect(erro).not.toHaveText(/source image|could not be decoded|InvalidStateError/i);
  expect(pedidos).toBe(0);

  // o servidor não respondeu, com o aparelho conectado: não é "Sem conexão"
  await enviar({ name: 'a.jpg', mimeType: 'image/jpeg', buffer: jpeg });
  await expect(erro).toHaveText(/Não foi possível falar com o servidor agora/);
  expect(pedidos).toBe(1);

  // sem rede no aparelho
  await page.context().setOffline(true);
  await enviar({ name: 'a.jpg', mimeType: 'image/jpeg', buffer: jpeg });
  await expect(erro).toHaveText(/^Sem conexão\./);
  await page.context().setOffline(false);

  // o servidor recusou sem dizer por quê (a Vercel, com o corpo grande demais, não responde em JSON)
  await page.unroute('**/api/vision');
  await page.route('**/api/vision', (route) => route.fulfill({ status: 413, contentType: 'text/plain', body: 'Request Entity Too Large' }));
  await enviar({ name: 'a.jpg', mimeType: 'image/jpeg', buffer: jpeg });
  await expect(erro).toHaveText(/As fotos ficaram grandes demais/);
  await page.unroute('**/api/vision');
  await page.route('**/api/vision', (route) => route.fulfill({ status: 500, contentType: 'text/html', body: '<h1>Internal Server Error</h1>' }));
  await enviar({ name: 'a.jpg', mimeType: 'image/jpeg', buffer: jpeg });
  await expect(erro).toHaveText(/Não foi possível analisar as fotos agora/);
  // a mensagem do servidor, quando ele manda uma, continua valendo
  await page.unroute('**/api/vision');
  await page.route('**/api/vision', (route) => route.fulfill({ status: 429, json: { codigo: 'limite', erro: 'Limite de fotos de hoje atingido. Use a lista ou tente amanhã.' } }));
  await enviar({ name: 'a.jpg', mimeType: 'image/jpeg', buffer: jpeg });
  await expect(erro).toHaveText(/Limite de fotos de hoje atingido/);
});
