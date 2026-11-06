import { defineConfig, devices } from '@playwright/test';

// Redesign (06/11/2026), agente 2 (cadastro): medições do caminho da abertura até o programa, por persona fictícia,
// num Pixel 7 e num celular pequeno (360 × 740). Ferramenta de documentação, fora do CI. Precisa do app servido
// em http://localhost:4173 (já no ar nesta sessão; sem bloco webServer de propósito).
// Uso: npx playwright test -c scripts/design/redesign/agente-2/playwright.config.ts
const rast = { args: ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'] };
export default defineConfig({
  testDir: '.',
  testMatch: /\.spec\.ts$/,
  outputDir: '../../../../test-results/redesign-agente-2',
  reporter: 'list',
  workers: 1,
  timeout: 300_000,
  use: { baseURL: 'http://localhost:4173', launchOptions: rast, timezoneId: 'America/Sao_Paulo', deviceScaleFactor: 1 },
  projects: [
    { name: 'pixel7', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, colorScheme: 'light' } },
    { name: 'pequeno', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, viewport: { width: 360, height: 740 }, colorScheme: 'light' } },
  ],
});
