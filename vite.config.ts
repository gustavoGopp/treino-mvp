/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'treino-mvp',
        short_name: 'Treino',
        description: 'Treino de hipertrofia com o equipamento que você tem.',
        lang: 'pt-BR',
        start_url: '/',
        display: 'standalone',
        background_color: '#eaeef1',
        theme_color: '#0a7c72',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
      },
    }),
  ],
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/repo/**/*.test.ts'],
  },
});
