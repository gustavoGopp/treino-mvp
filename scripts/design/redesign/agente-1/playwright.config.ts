import { defineConfig, devices } from '@playwright/test';

// Redesign, agente 1 (retenção e motivação): capturas e medidas das telas de início, fim do treino, semana e
// evolução, em vários momentos da jornada (1ª abertura, depois do 1º treino, volta de pausa, 4ª semana…).
// Ferramenta de documentação, fora do CI. O app já está servido em http://localhost:4173 (sem webServer).
// Uso: npx playwright test -c scripts/design/redesign/agente-1/playwright.config.ts
const rast = { args: ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'] };
export default defineConfig({
  testDir: '.',
  outputDir: '../../../../test-results/redesign-agente-1',
  reporter: 'list',
  workers: 1,
  timeout: 180_000,
  use: { baseURL: 'http://localhost:4173', launchOptions: rast, timezoneId: 'America/Sao_Paulo' },
  projects: [
    { name: 'pixel7', use: { ...devices['Pixel 7'], colorScheme: 'light' } },
    { name: 'pequeno', use: { ...devices['Pixel 7'], viewport: { width: 360, height: 740 }, colorScheme: 'light' } },
  ],
});
