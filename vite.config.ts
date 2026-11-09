/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { execSync } from 'node:child_process';
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

export default defineConfig(({ mode }) => ({
  define: {
    __LAB__: JSON.stringify(lab(mode)),
    __VERSAO__: JSON.stringify(commit().slice(0, 7) || 'local'),
    __DATA_BUILD__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png', 'fonts/OFL.txt'],
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
        background_color: '#F5F3EF',
        theme_color: '#F5F3EF',
        // lote 5 do redesign: o halter inclinado em Giz e grafite (scripts/design/redesign/icones-app.mjs); "any" e
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
