import { expect, test, type Page } from './base';
import { criterios } from './criterios';
import { ana } from './jornada';

// Lote M4, passo 2: o aviso de fim do descanso com a tela bloqueada. O pedido aparece no descanso, até a pessoa
// responder. Recusar não muda nada no resto do app; aceitar só manda algo ao servidor quando a pessoa sai do app.

async function primeiroDescanso(page: Page) {
  await ana(page);
  await page.getByRole('tab', { name: 'Corpo todo A', exact: true }).click();
  await page.getByRole('button', { name: 'Começar o treino Corpo todo A' }).click();
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
}

/** Conta e guarda o que o app manda a /api/descanso. */
function escutarServidor(page: Page) {
  const pedidos: Record<string, unknown>[] = [];
  void page.route('**/api/descanso', async (route) => {
    pedidos.push(route.request().postDataJSON() as Record<string, unknown>);
    await route.fulfill({ json: { mensagem: 'msg_teste_0001' } });
  });
  return pedidos;
}

/**
 * O navegador de teste responde sempre "negada" e não deixa mudar (medido em 22/11/2026: Notification.permission é
 * "denied" mesmo com a permissão dada pelo teste). Aqui a permissão começa sem resposta, como num celular, e o pedido
 * do navegador responde o que o teste mandar.
 */
const permissao = (page: Page, resposta: 'granted' | 'denied') =>
  page.addInitScript((r) => {
    const chave = 'teste-permissao';
    Object.defineProperty(Notification, 'permission', { configurable: true, get: () => sessionStorage.getItem(chave) ?? 'default' });
    Notification.requestPermission = () => {
      sessionStorage.setItem(chave, r);
      return Promise.resolve(r);
    };
  }, resposta);

const pedido = (page: Page) => page.getByRole('group', { name: 'Aviso do descanso' });

test('permissão recusada: o pedido some, o treino segue igual e nada vai para o servidor', async ({ page }) => {
  const pedidos = escutarServidor(page);
  await permissao(page, 'denied');
  await primeiroDescanso(page);
  await expect(pedido(page)).toContainText('Quer um aviso quando o descanso acabar, mesmo com a tela bloqueada?');
  await pedido(page).getByRole('button', { name: 'Avisar' }).click();
  await expect(pedido(page)).toHaveCount(0);

  // o descanso e o registro continuam como sempre
  const descanso = page.getByRole('region', { name: 'Descanso' });
  await expect(descanso.getByRole('timer')).toHaveText(/^\d:\d\d$/);
  await descanso.getByRole('button', { name: 'Série 2 feita' }).click();
  await expect(descanso).toContainText(/A seguir · série 3 de/);
  // a pergunta não volta, nem no descanso seguinte nem depois de recarregar
  await expect(pedido(page)).toHaveCount(0);
  await page.reload();
  await expect(descanso).toBeVisible();
  await expect(pedido(page)).toHaveCount(0);
  // sair do app no meio do descanso não manda nada
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.goto('/dados');
  await expect(page.getByText('Aviso do descanso')).toHaveCount(0);
  expect(pedidos).toEqual([]);
});

test('"Agora não": o pedido some e não volta', async ({ page }) => {
  const pedidos = escutarServidor(page);
  await permissao(page, 'granted');
  await primeiroDescanso(page);
  await expect(pedido(page)).toBeVisible();
  await criterios(page); // toque de 44 px, contraste, texto cortado, zoom: a tela do descanso com o pedido
  await pedido(page).getByRole('button', { name: 'Agora não' }).click();
  await expect(pedido(page)).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
  await expect(pedido(page)).toHaveCount(0);
  expect(pedidos).toEqual([]);
  // quem disse "Agora não" ainda pode ligar depois, em Meus dados
  await page.goto('/dados');
  await page.getByRole('button', { name: /Aviso do descanso.*Desligado/ }).click();
  await expect(page.getByRole('button', { name: 'Ligar o aviso' })).toBeVisible();
});

// O pedido fica depois da ação principal: acima dela, empurrava o "Série N feita" para fora da tela em celular baixo.
for (const [largura, altura] of [[320, 568], [360, 640], [412, 839]] as const)
  test.describe(`a ${largura} × ${altura}`, () => {
    test.use({ viewport: { width: largura, height: altura } });
    test('o pedido de aviso não tira o "Série 2 feita" do lugar', async ({ page }) => {
      await permissao(page, 'granted');
      await primeiroDescanso(page);
      await expect(pedido(page)).toBeVisible();
      const botao = page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: 'Série 2 feita' });
      // a linha "Série 1 salva · Desfazer" fica 5 s e muda a altura da tela: as duas medidas são tiradas depois que ela some
      await expect(page.getByRole('button', { name: 'Desfazer' })).toHaveCount(0, { timeout: 8000 });
      // o toque em "Agora não" rola a página em tela baixa: as duas medidas são tiradas com a página no topo
      const noTopo = async () => {
        await page.evaluate(() => window.scrollTo(0, 0));
        return (await botao.boundingBox())!;
      };
      const com = await noTopo();
      await pedido(page).getByRole('button', { name: 'Agora não' }).click();
      await expect(pedido(page)).toHaveCount(0);
      const sem = await noTopo();
      // medido em 22/11/2026 (fundo do botão com e sem o pedido): 626 e 626 a 320 × 568; 612 e 624 a 360 × 640; 704 e 823 a 412 × 839
      // em tela alta o botão sobe para dar lugar ao pedido, mas continua inteiro na tela; em tela baixa, não sai de onde estava
      if (sem.y + sem.height <= altura) expect(com.y + com.height).toBeLessThanOrEqual(altura);
      else expect(Math.abs(com.y - sem.y)).toBeLessThanOrEqual(1);
    });
  });

test.describe('com a permissão dada', () => {
  test('só ao sair do app vão o endereço de aviso, o tempo que falta e um número; ao voltar, o pedido é desfeito', async ({ page }) => {
    const pedidos = escutarServidor(page);
    await permissao(page, 'granted');
    // O navegador de teste não tem serviço de avisos: o endereço é simulado.
    await page.addInitScript(() => {
      const falsa = {
        toJSON: () => ({ endpoint: 'https://fcm.googleapis.com/fcm/send/teste', expirationTime: null, keys: { p256dh: 'B'.repeat(87), auth: 'a'.repeat(22) } }),
        unsubscribe: () => Promise.resolve(true),
      };
      PushManager.prototype.subscribe = () => Promise.resolve(falsa as unknown as PushSubscription);
      PushManager.prototype.getSubscription = () => Promise.resolve(falsa as unknown as PushSubscription);
    });
    await primeiroDescanso(page);
    await page.evaluate(() => navigator.serviceWorker.ready);
    await pedido(page).getByRole('button', { name: 'Avisar' }).click();
    await expect(pedido(page)).toHaveCount(0);
    expect(pedidos).toEqual([]); // com o app aberto, nada sai

    const visibilidade = (v: string) =>
      page.evaluate((estado) => {
        Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => estado });
        document.dispatchEvent(new Event('visibilitychange'));
      }, v);
    await visibilidade('hidden');
    await expect.poll(() => pedidos.length).toBe(1);
    const marcar = pedidos[0]!;
    expect(Object.keys(marcar).sort()).toEqual(['acao', 'assinatura', 'falta', 'id']);
    expect(marcar.acao).toBe('marcar');
    expect(marcar.assinatura).toEqual({ endpoint: 'https://fcm.googleapis.com/fcm/send/teste', keys: { p256dh: 'B'.repeat(87), auth: 'a'.repeat(22) } });
    expect(marcar.falta).toBeGreaterThan(60_000);
    expect(marcar.falta).toBeLessThanOrEqual(105_000);

    await visibilidade('visible');
    await expect.poll(() => pedidos.length).toBe(2);
    expect(pedidos[1]).toEqual({ acao: 'desmarcar', mensagem: 'msg_teste_0001' });

    // Meus dados mostra o aviso ligado e deixa desligar
    await page.goto('/dados');
    await page.getByRole('button', { name: /Aviso do descanso.*Ligado/ }).click();
    await page.getByRole('button', { name: 'Desligar o aviso' }).click();
    await expect(page.getByRole('button', { name: /Aviso do descanso.*Desligado/ })).toBeVisible();
  });

  test('o service worker mostra o aviso do descanso atual, e não o de um descanso que já não vale', async ({ page, context }) => {
    await ana(page);
    await page.evaluate(() => navigator.serviceWorker.ready);
    const sw = context.serviceWorkers()[0] ?? (await context.waitForEvent('serviceworker'));
    const avisar = (id: string) =>
      sw.evaluate(async (numero) => {
        // os tipos do service worker não estão na configuração dos testes de tela: o mínimo, à mão
        type Evento = Event & { waitUntil(p: Promise<unknown>): void };
        const s = self as unknown as {
          PushEvent: new (tipo: string, dado: { data: string }) => Evento;
          dispatchEvent(e: Event): boolean;
          registration: { showNotification(titulo: string, o: { body: string }): Promise<void> };
        };
        // o navegador de teste não mostra avisos (permissão sempre negada): anota o que seria mostrado
        const mostrados: string[] = [];
        s.registration.showNotification = (titulo, o) => {
          mostrados.push(`${titulo} · ${o.body}`);
          return Promise.resolve();
        };
        const fim: Promise<unknown>[] = [];
        const e = new s.PushEvent('push', { data: JSON.stringify({ id: numero }) });
        const esperar = e.waitUntil.bind(e);
        e.waitUntil = (p: Promise<unknown>) => {
          fim.push(p);
          esperar(p);
        };
        s.dispatchEvent(e);
        await Promise.all(fim);
        return mostrados;
      }, id);
    // sem descanso marcado, nenhum aviso aparece
    expect(await avisar('descanso-velho')).toEqual([]);
    await page.evaluate(async () => (await caches.open('treino-descanso')).put('/__descanso-atual', new Response(JSON.stringify({ id: 'descanso-atual' }))));
    expect(await avisar('descanso-velho')).toEqual([]);
    expect(await avisar('descanso-atual')).toEqual(['Hora da próxima série · O descanso acabou.']);
  });
});

test.describe('iPhone pelo Safari, sem instalar', () => {
  test.use({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1' });

  test('a tela diz que o aviso só funciona com o app na tela de início, uma vez', async ({ page }) => {
    await page.addInitScript(() => {
      delete (window as unknown as { PushManager?: unknown }).PushManager;
    });
    await primeiroDescanso(page);
    await expect(pedido(page)).toContainText('No iPhone, o aviso com a tela bloqueada só funciona com o app na tela de início.');
    await expect(pedido(page).getByRole('button', { name: 'Avisar' })).toHaveCount(0);
    await pedido(page).getByRole('button', { name: 'Entendi' }).click();
    await expect(pedido(page)).toHaveCount(0);
    await page.reload();
    await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
    await expect(pedido(page)).toHaveCount(0);
  });
});
