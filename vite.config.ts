/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { execSync } from 'node:child_process';

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
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'treino-mvp',
        short_name: 'Treino',
        description: 'Treino de hipertrofia com o equipamento que você tem.',
        lang: 'pt-BR',
        start_url: '/',
        display: 'standalone',
        background_color: '#F5F4F0',
        theme_color: '#F5F4F0',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
      },
    }),
  ],
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/repo/**/*.test.ts'],
    coverage: {
      include: ['src/domain/**'],
      thresholds: { lines: 90, statements: 90, functions: 90, branches: 90 },
    },
  },
}));
