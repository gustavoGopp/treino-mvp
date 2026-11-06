import { defineConfig, devices } from '@playwright/test';

// Redesign, agente 5 (cor, tema e identidade), 06/11/2026: capturas da tela de treino e do programa com as paletas
// candidatas aplicadas por cima dos tokens, nos temas claro e escuro, e as medições da letra. Ferramenta de documentação,
// fora do CI. Copiado de scripts/design/playwright.config.ts, sem o bloco webServer: o app já está servido em 4173.
// Uso: npx playwright test -c scripts/design/redesign/agente-5/playwright.config.ts
const rast = { args: ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'] };
export default defineConfig({
  testDir: '.',
  outputDir: '../../../../test-results/redesign-agente-5',
  reporter: 'list',
  workers: 1,
  timeout: 180_000,
  use: { baseURL: 'http://localhost:4173', launchOptions: rast, timezoneId: 'America/Sao_Paulo' },
  projects: [
    { name: 'claro', use: { ...devices['Pixel 7'], colorScheme: 'light' } },
    { name: 'escuro', use: { ...devices['Pixel 7'], colorScheme: 'dark' } },
  ],
});
