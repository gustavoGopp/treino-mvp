import { defineConfig, devices } from '@playwright/test';

// Agente 4 (redesign, 06/11/2026): cópia de scripts/design/playwright.config.ts, apontando para o app já servido em
// http://localhost:4173 (sem webServer). Uso: npx playwright test -c scripts/design/redesign/agente-4/playwright.config.ts
const rast = { args: ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'] };
export default defineConfig({
  testDir: '.',
  outputDir: '../../../../test-results/redesign-agente-4',
  reporter: 'list',
  workers: 1,
  timeout: 180_000,
  use: { baseURL: 'http://localhost:4173', launchOptions: rast, timezoneId: 'America/Sao_Paulo' },
  projects: [
    { name: 'pixel7', use: { ...devices['Pixel 7'], colorScheme: 'light' } },
    { name: 'pequeno', use: { ...devices['Pixel 7'], viewport: { width: 360, height: 740 }, colorScheme: 'light' } },
  ],
});
