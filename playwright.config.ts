import { defineConfig, devices } from '@playwright/test';

// Rasterização num fio só: o mesmo SVG pintado em duas abas às vezes sai com bordas ligeiramente
// diferentes (pintura em ladrilhos, vários fios). Com estas flags a regressão visual fica determinística
// (docs/revisoes/2026-10-30-revisao-m2.md, ponto 3). Sem novas tentativas: falha visual é sempre real.
const rasterDeterministico = ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'];

export default defineConfig({
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4173', trace: 'retain-on-failure' },
  projects: [
    // Equivalência do motor: roda o código direto no Chromium, sem servidor.
    {
      name: 'motor',
      testDir: 'tests/motor',
      use: { ...devices['Desktop Chrome'], launchOptions: { args: rasterDeterministico } },
    },
    {
      name: 'celular',
      testDir: 'tests/e2e',
      use: { ...devices['Pixel 7'], launchOptions: { args: rasterDeterministico } },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
