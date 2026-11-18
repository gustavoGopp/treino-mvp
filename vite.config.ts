/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { availableParallelism } from 'node:os';

// Versão mostrada em "Meus dados" (R3): o commit publicado e a data do build, para a pessoa ver se o app atualizou.
// Na Vercel vem de VERCEL_GIT_COMMIT_SHA; localmente, do git; sem os dois, "local".
const commit = () => {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA;
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
};

// Rota de laboratório do boneco (R4): só em `npm run dev` e nas prévias da Vercel (nunca na produção).
const lab = (mode: string) => mode === 'development' || process.env.VERCEL_ENV === 'preview';

// A prévia local (`npm run preview`, usada pelo e2e) responde com os mesmos cabeçalhos da produção (vercel.json):
// assim a Content-Security-Policy é exercitada por toda a suíte, com o service worker e os desenhos do guia.
const cabecalhosDaVercel = (): Record<string, string> => {
  const v = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8')) as { headers: { source: string; headers: { key: string; value: string }[] }[] };
  return Object.fromEntries(v.headers.filter((h) => h.source === '/(.*)').flatMap((h) => h.headers.map((c) => [c.key, c.value])));
};

// O pacote do app leva só o número de cada medida dos objetos do motor novo (src/engine/novo/dados/objetos.json e
// dados/objetos/*.json): os textos de fonte, de onde a medida saiu e o nome do objeto ficam nos arquivos, para a
// conferência, as folhas e os testes (que rodam sem este passo), mas não vão para o celular, onde só `obj()` lê a
// tabela e só o valor importa. Cada máquina nova trazia de 2 a 3 kB comprimidos de texto ao pacote de quem volta
// (orçamento de 285 kB, tests/e2e/orcamento.spec.ts). As chaves continuam (a tabela confere que cada fonte existe).
const OBJETOS_DO_MOTOR = /src\/engine\/novo\/dados\/(objetos\.json|objetos\/[^/]+\.json)$/;
const enxugarObjetos = (): Plugin => ({
  name: 'enxugar-objetos-do-motor',
  apply: 'build',
  enforce: 'pre',
  transform(code, id) {
    if (!OBJETOS_DO_MOTOR.test(id.split('?')[0]!)) return null;
    const t = JSON.parse(code) as { fontes: Record<string, string>; objetos: Record<string, { nome: string; medidas: Record<string, Record<string, unknown>> }> };
    for (const k of Object.keys(t.fontes)) t.fontes[k] = '-';
    for (const ob of Object.values(t.objetos)) {
      ob.nome = '-';
      for (const m of Object.values(ob.medidas)) {
        m.onde = '-';
        delete m.nota;
      }
    }
    return { code: JSON.stringify(t), map: null };
  },
});

export default defineConfig(({ mode }) => ({
  preview: { headers: cabecalhosDaVercel() },
  // O Worker do Boneco carrega cada exercício do motor novo só quando ele é pedido (um arquivo por exercício): para
  // isso o pacote do Worker precisa ser um módulo, que aceita ser dividido em partes.
  worker: { format: 'es', plugins: () => [enxugarObjetos()] },
  define: {
    __LAB__: JSON.stringify(lab(mode)),
    __VERSAO__: JSON.stringify(commit().slice(0, 7) || 'local'),
    __DATA_BUILD__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [
    enxugarObjetos(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png', 'fonts/OFL.txt', 'licencas/lucide-ISC.txt'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // lote 5: os 49 desenhos do equipamento (cerca de 860 kB) ficam fora da instalação; são guardados quando aparecem
        globIgnores: ['equipamento/**'],
        runtimeCaching: [{ urlPattern: /\/equipamento\/[a-z_]+\.svg$/, handler: 'CacheFirst', options: { cacheName: 'equipamento' } }],
      },
      manifest: {
        name: 'treino-mvp',
        short_name: 'Treino',
        description: 'Treino de hipertrofia com o equipamento que você tem.',
        lang: 'pt-BR',
        start_url: '/',
        display: 'standalone',
        background_color: '#F6F6F4',
        theme_color: '#F6F6F4',
        // lote 5 do redesign: o halter inclinado em Giz e grafite (scripts/icones-app.mjs); "any" e
        // "maskable" em arquivos separados, como o Chrome pede
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
    }),
  ],
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/repo/**/*.test.ts'],
    // Um núcleo fica livre para o processo principal: com todos ocupados pelos testes pesados do gerador, ele demorava a
    // responder e o Vitest acusava "Timeout calling onTaskUpdate" (2 de 3 rodadas na main de 09/11; 0 de 3 assim).
    maxWorkers: Math.max(1, availableParallelism() - 1),
    coverage: {
      include: ['src/domain/**'],
      thresholds: { lines: 90, statements: 90, functions: 90, branches: 90 },
    },
  },
}));
