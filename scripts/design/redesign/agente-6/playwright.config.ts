import { defineConfig, devices } from '@playwright/test';

// Redesign (06/11/2026), agente 6 (crítica, acessibilidade e medição). Sem servidor: o protótipo é servido pelo
// próprio teste (como em ../prototipo/capturas.spec.ts) e o app de hoje já está em http://localhost:4173.
// Uso: npx playwright test -c scripts/design/redesign/agente-6/playwright.config.ts
const rast = { args: ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'] };
export default defineConfig({
  testDir: '.',
  testMatch: /(critica|zoom-detalhe)\.spec\.ts/,
  outputDir: '../../../../test-results/redesign-agente-6',
  reporter: 'list',
  workers: 1,
  timeout: 600_000,
  use: { baseURL: 'http://localhost:4173', launchOptions: rast, timezoneId: 'America/Sao_Paulo' },
  projects: [{ name: 'pixel', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, colorScheme: 'light' } }],
});
