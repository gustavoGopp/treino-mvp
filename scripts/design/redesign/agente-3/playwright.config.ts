import { defineConfig, devices } from '@playwright/test';

// Agente 3 do redesign (06/11/2026): medições do treino ao vivo e do guia, contra o app já servido em 4173.
// Uso: npx playwright test -c scripts/design/redesign/agente-3/playwright.config.ts
// Projetos: Pixel 7 (412 × 915), celular pequeno (360 × 740) e as alturas de 640 e 780 (alcance do polegar).
const rast = { args: ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'] };
export default defineConfig({
  testDir: '.',
  outputDir: '../../../../test-results/redesign-agente-3',
  reporter: 'list',
  workers: 1,
  timeout: 120_000,
  use: { baseURL: 'http://localhost:4173', actionTimeout: 10_000, launchOptions: rast, timezoneId: 'America/Sao_Paulo' },
  projects: [
    { name: 'p7', use: { ...devices['Pixel 7'], colorScheme: 'light' } },
    { name: 'pequeno', use: { ...devices['Pixel 7'], viewport: { width: 360, height: 740 }, colorScheme: 'light' } },
    { name: 'alt640', use: { ...devices['Pixel 7'], viewport: { width: 412, height: 640 }, colorScheme: 'light' } },
    { name: 'alt780', use: { ...devices['Pixel 7'], viewport: { width: 412, height: 780 }, colorScheme: 'light' } },
  ],
});
