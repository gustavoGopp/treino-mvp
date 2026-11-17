import { defineConfig } from '@playwright/test';

// Capturas do frontend novo (docs/revisoes/frontend-novo/): o app de hoje, com a persona Ana, em 390 e 320 px,
// nos temas claro e escuro. Não é teste: só fotografa. Roda com
//   npx playwright test -c scripts/design/frontend-novo/playwright.config.ts --trace off
// A pasta de saída vem de CAPTURAS (padrão: docs/revisoes/frontend-novo/capturas/antes).

const tamanhos = [
  // 390 em dobro (é a que o Gustavo olha); 320 em tamanho simples, para a pasta não pesar
  { nome: '390', viewport: { width: 390, height: 844 }, escala: 2 },
  { nome: '320', viewport: { width: 320, height: 640 }, escala: 1 },
] as const;
const temas = [
  { nome: 'claro', colorScheme: 'light' },
  { nome: 'escuro', colorScheme: 'dark' },
] as const;

export default defineConfig({
  testDir: '.',
  // COLHER=1 troca as capturas pela colheita dos textos do protótipo (prototipo/colher.spec.ts), num formato só
  testMatch: process.env.COLHER ? 'prototipo/colher.spec.ts' : 'capturas.spec.ts',
  reporter: 'list',
  workers: 4,
  timeout: 180_000,
  // um toque que não acha o alvo falha em 8 s (e o passo fica anotado), em vez de segurar a captura inteira
  use: { baseURL: 'http://localhost:4173', trace: 'off', actionTimeout: 8000 },
  projects: tamanhos
    .flatMap((t) =>
      temas.map((m) => ({
        name: `${t.nome}-${m.nome}`,
        use: { viewport: t.viewport, colorScheme: m.colorScheme, deviceScaleFactor: t.escala, isMobile: true, hasTouch: true, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo' },
      })),
    )
    .slice(0, process.env.COLHER ? 1 : undefined),
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    cwd: '../../..',
    env: { VITE_FOTO: 'ligada' },
  },
});
