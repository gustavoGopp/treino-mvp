import { defineConfig, devices } from '@playwright/test';

// Revisão de design: capturas de cada tela no celular, nos temas claro e escuro, com as personas fictícias, e as
// medições automáticas (toque, contraste, zona do polegar). Ferramenta de documentação, fora do CI.
// Uso: npx playwright test -c scripts/design   (saída em docs/revisoes/design/)
const rast = { args: ['--num-raster-threads=1', '--disable-partial-raster', '--disable-gpu-rasterization'] };
export default defineConfig({
  testDir: '.',
  outputDir: '../../test-results/design',
  reporter: 'list',
  workers: 1,
  timeout: 120_000,
  use: { baseURL: 'http://localhost:4173', launchOptions: rast, timezoneId: 'America/Sao_Paulo' },
  projects: [
    { name: 'claro', use: { ...devices['Pixel 7'], colorScheme: 'light' } },
    { name: 'escuro', use: { ...devices['Pixel 7'], colorScheme: 'dark' } },
    { name: 'pequeno', use: { ...devices['Pixel 7'], viewport: { width: 360, height: 740 }, colorScheme: 'light' } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    cwd: '../..',
  },
});
