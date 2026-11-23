import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'dev-dist', 'referencia', 'privado', 'coverage', 'playwright-report', 'test-results', 'research_notes', 'reports', '.claude', '.verificacao'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2022, globals: { ...globals.browser, ...globals.node } },
    plugins: { 'react-hooks': reactHooks },
    rules: { ...reactHooks.configs.recommended.rules },
  },
  {
    // Os scripts de apoio em JavaScript (geradores, QA do motor, auditoria) rodam no Node; alguns levam código para
    // dentro do navegador do Playwright, daí os globais do navegador também.
    extends: [js.configs.recommended],
    files: ['scripts/**/*.{mjs,cjs,js}', 'tests/**/*.{mjs,cjs,js}', '*.{mjs,cjs,js}'],
    languageOptions: { ecmaVersion: 2023, sourceType: 'module', globals: { ...globals.browser, ...globals.node } },
  },
  {
    // O motor do Boneco: um parâmetro que a função recebe e não usa leva o nome começado por "_" (3 casos em
    // exercicios/). A exceção de antes, mais larga, era do port do guia original, apagado no pacote D4 (23/11/2026).
    files: ['src/engine/**/*.ts'],
    rules: { '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }] },
  },
);
