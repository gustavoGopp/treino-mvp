import { defineConfig } from '@playwright/test';

// Inventário dos textos do app (docs/revisoes/textos/inventario/): percorre o app tela por tela, folha por folha, e
// grava todo texto visível de cada uma, com a mesma régua de contagem de 13/11/2026
// (scripts/design/frontend-novo/capturas.spec.ts). Não é teste: só colhe e fotografa. Roda com
//   npx playwright test -c scripts/textos/playwright.config.ts --trace off
// O projeto "claro" colhe o texto e fotografa; o "escuro" só fotografa. Cada teste grava a sua parte em
// test-results/textos/ (fora do git); no fim, montar.ts junta tudo em colheita.json, capturas/ e cobertura.md.
// Para refazer só uma parte: acrescente -g "<nome do teste>"; a montagem usa as outras partes que já estão guardadas.
// A porta é a 4174 (a 4173 é a dos testes e das capturas do frontend novo).

const PORTA = 4174;

export default defineConfig({
  testDir: '.',
  testMatch: '*.spec.ts',
  reporter: 'list',
  workers: 4,
  fullyParallel: true,
  timeout: 600_000,
  globalTeardown: './montar.ts',
  // um toque que não acha o alvo falha em 8 s (e o passo fica anotado), em vez de segurar a colheita inteira
  use: { baseURL: `http://localhost:${PORTA}`, trace: 'off', actionTimeout: 8000 },
  projects: [
    { nome: 'claro', colorScheme: 'light', escala: 2 } as const,
    { nome: 'escuro', colorScheme: 'dark', escala: 1 } as const,
  ].map((p) => ({
    name: p.nome,
    use: { viewport: { width: 390, height: 844 }, colorScheme: p.colorScheme, deviceScaleFactor: p.escala, isMobile: true, hasTouch: true, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo' },
  })),
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORTA} --strictPort`,
    url: `http://localhost:${PORTA}`,
    reuseExistingServer: true,
    cwd: '../..',
    timeout: 600_000,
    env: { VITE_FOTO: 'ligada' },
  },
});
