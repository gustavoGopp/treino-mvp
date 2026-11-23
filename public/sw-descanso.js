// O pedaço do service worker que recebe o aviso de fim do descanso (lote M4, passo 2). O resto do service worker é
// gerado no build (vite.config.ts), que inclui este arquivo. O aviso chega do servidor do app (api/descanso.ts) e traz
// só o número do descanso, sorteado no aparelho.
const MARCA = '/__descanso-atual'; // a página guarda aqui o número do descanso que espera aviso (src/features/treino/aviso.ts)

self.addEventListener('push', (e) => {
  let dado = {};
  try {
    dado = e.data ? e.data.json() : {};
  } catch {
    /* aviso sem corpo legível: cai no "não é o descanso atual" */
  }
  e.waitUntil(
    (async () => {
      const guardado = await (await caches.open('treino-descanso')).match(MARCA);
      const atual = guardado ? await guardado.json().catch(() => null) : null;
      // A pessoa já voltou ao app, pulou ou mudou o descanso: este aviso é de um descanso que não vale mais.
      if (!atual || atual.id !== dado.id) return;
      await self.registration.showNotification('Hora da próxima série', {
        body: 'O descanso acabou.',
        tag: 'descanso',
        renotify: true,
        icon: '/icon-192.png',
        vibrate: [250, 120, 250, 120, 400],
      });
    })(),
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    (async () => {
      const janelas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      if (janelas[0]) return janelas[0].focus();
      return self.clients.openWindow('/treino');
    })(),
  );
});
