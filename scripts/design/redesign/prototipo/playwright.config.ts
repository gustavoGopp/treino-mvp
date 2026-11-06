import { defineConfig, devices } from '@playwright/test';

// Redesign (06/11/2026): capturas e medidas do protótipo (docs/revisoes/redesign/prototipo/), sem servidor: o próprio
// teste serve os arquivos. Uso: npx playwright test -c scripts/design/redesign/prototipo/playwright.config.ts
const rast = { args: ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'] };
export default defineConfig({
  testDir: '.',
  testMatch: /capturas\.spec\.ts/,
  outputDir: '../../../../test-results/redesign-prototipo',
  reporter: 'list',
  workers: 1,
  timeout: 240_000,
  use: { launchOptions: rast, deviceScaleFactor: 1 },
  projects: [
    { name: 'claro', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, colorScheme: 'light' } },
    { name: 'escuro', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, colorScheme: 'dark' } },
    { name: 'pequeno', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, viewport: { width: 360, height: 740 }, colorScheme: 'light' } },
    { name: 'baixo', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, viewport: { width: 412, height: 640 }, colorScheme: 'light' } },
    // a partir da crítica (agente 6): 320 px (WCAG 1.4.10), o zoom de 200% no Pixel 7 e a letra do sistema em 125%
    { name: 'estreito', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, viewport: { width: 320, height: 640 }, colorScheme: 'light' } },
    { name: 'zoom200', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, viewport: { width: 206, height: 420 }, colorScheme: 'light' } },
    { name: 'letra125', use: { ...devices['Pixel 7'], deviceScaleFactor: 1, colorScheme: 'light' } },
  ],
});
