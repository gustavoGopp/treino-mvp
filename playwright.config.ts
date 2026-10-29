import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4173' },
  projects: [
    // Equivalência do motor: roda o código direto no Chromium, sem servidor.
    { name: 'motor', testDir: 'tests/motor', use: { ...devices['Desktop Chrome'] } },
    { name: 'celular', testDir: 'tests/e2e', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
