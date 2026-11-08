import { defineConfig, devices } from '@playwright/test';

// Redesign (06/11/2026): capturas e medidas do app de hoje ("antes"), nas 6 personas, claro e escuro, Pixel 7 e 360 px.
// Ferramenta de documentação, fora do CI. Precisa do app servido em 4173 (npm run build && npm run preview -- --port 4173).
// Uso: npx playwright test -c scripts/design/redesign/playwright.config.ts
const rast = { args: ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'] };
export default defineConfig({
  testDir: '.',
  testMatch: /antes\.spec\.ts/,
  outputDir: '../../../test-results/redesign',
  reporter: 'list',
  workers: 1,
  timeout: 240_000,
  use: { baseURL: 'http://localhost:4173', launchOptions: rast, timezoneId: 'America/Sao_Paulo', deviceScaleFactor: 1 },
  projects: [
    { name: 'claro', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, colorScheme: 'light' } },
    { name: 'escuro', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, colorScheme: 'dark' } },
    { name: 'pequeno', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, viewport: { width: 360, height: 740 }, colorScheme: 'light' } },
  ],
});
