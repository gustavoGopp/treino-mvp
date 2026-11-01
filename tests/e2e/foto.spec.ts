import { readdirSync, readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { temExif } from '../../src/lib/imagem';
import { ana } from './jornada';

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

  await expect(page.getByLabel('Barra fixa', { exact: true })).toBeChecked();
  await expect(page.getByLabel('Banco regulável', { exact: true })).toBeChecked();
  await expect(page.getByLabel('Step', { exact: true })).not.toBeChecked();
  // O atributo da foto preencheu o detalhe ainda vazio.
  await expect(page.getByRole('group', { name: /também declina/ }).getByLabel('Não')).toBeChecked();
});

test('foto: convite inválido mostra o motivo e a lista continua funcionando', async ({ page }) => {
  await irParaEquipamento(page);
  await page.route('**/api/vision', (route) => route.fulfill({ status: 403, json: { codigo: 'convite', erro: 'Código de convite inválido.' } }));
  await page.getByLabel('Código de convite').fill('errado');
  await page.getByLabel('Escolher fotos').setInputFiles({ name: 'a.jpg', mimeType: 'image/jpeg', buffer: await fotoComExif(page) });
  await expect(page.getByRole('alert')).toHaveText('Código de convite inválido.');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'O que evitar (opcional)' })).toBeVisible();
});

test('a chave da API não aparece no código que vai para o navegador', async () => {
  const pasta = 'dist/assets';
  const conteudo = readdirSync(pasta)
    .filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(`${pasta}/${f}`, 'utf8'))
    .join('\n');
  for (const proibido of ['sk-ant-', 'ANTHROPIC_API_KEY', '@anthropic-ai/sdk', 'x-api-key']) expect(conteudo, proibido).not.toContain(proibido);
});
