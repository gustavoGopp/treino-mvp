import { defineConfig, devices } from '@playwright/test';

// Grava a jornada da persona fictícia Ana para o GIF do devlog (npm run gif:jornada).
// Fica fora do CI: é uma ferramenta de documentação, não um teste.
export default defineConfig({
  testDir: '.',
  outputDir: '../../test-results/gif',
  reporter: 'list',
  use: {
    ...devices['Pixel 7'],
    baseURL: 'http://localhost:4173',
    video: { mode: 'on', size: { width: 412, height: 839 } },
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    cwd: '../..',
  },
});
