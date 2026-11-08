import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { instrumentar, Percurso, type Tela } from './instrumentos';
import { cadastro, DEFINICOES, segundoLocalDoBruno, triagemBloqueio, triagemOmbro } from './percursos';

// Agente 2 (cadastro): mede, por persona fictícia, o caminho da abertura até o programa: toques, caracteres, telas,
// rolagem, tempo do robô (pausa 0) e os dados para o KLM (klm.mjs). Saída: reports/design/redesign/agente-2/
// cadastro-<projeto>.json e as capturas em reports/design/redesign/agente-2/<projeto>/<persona>/.
// Uso: npx playwright test -c scripts/design/redesign/agente-2/playwright.config.ts cadastro

const AGORA = new Date('2026-11-05T15:00:00.000Z'); // quinta-feira, 12:00 em Brasília
const SAIDA = 'reports/design/redesign/agente-2';

export type ResumoTela = {
  tela: string;
  toques: number;
  toquesPorTipo: Record<string, number>;
  /** Grupos de pergunta distintos tocados (legendas) + botões: a base da contagem de M do KLM. */
  decisoes: number;
  caracteres: number;
  /** Altura da página ao sair, em alturas de tela. */
  alturaFinal: number;
  /** Altura da página ao abrir, em alturas de tela. */
  alturaAoAbrir: number;
  /** Quanto o robô precisou rolar, em alturas de tela (0 = tudo ao alcance sem rolar). */
  rolagem: number;
  botaoPrincipalVisivelAoAbrir: boolean | null;
  palavrasAoAbrir: number;
  /** Tempo do robô nesta tela, ms (da abertura até a abertura da seguinte). */
  tempoRoboMs: number;
  alvos: string[];
};
export type ResumoPersona = { persona: string; projeto: string; totalMs: number; telas: ResumoTela[] };

const resultados: ResumoPersona[] = [];

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(AGORA);
  await instrumentar(page);
});

// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}, info) => {
  mkdirSync(SAIDA, { recursive: true });
  const arquivo = `${SAIDA}/cadastro-${info.project.name}.json`;
  const antigos: ResumoPersona[] = existsSync(arquivo) ? JSON.parse(readFileSync(arquivo, 'utf8')) : [];
  const novos = resultados.filter((r) => r.projeto === info.project.name);
  const nomes = new Set(novos.map((r) => r.persona));
  writeFileSync(arquivo, JSON.stringify([...antigos.filter((r) => !nomes.has(r.persona)), ...novos], null, 1) + '\n');
});

/** Junta os registros da página com as marcas de tela do teste. */
function resumir(c: Percurso, projeto: string): ResumoPersona {
  const toques = c.registros.flatMap((r) => r.toques);
  const chars = c.registros.flatMap((r) => r.chars);
  const rolagemMax: Record<string, number> = Object.assign({}, ...c.registros.map((r) => r.rolagemMax));
  const telas: ResumoTela[] = c.telas.map((t: Tela, i) => {
    const prox = c.telas[i + 1];
    const meus = toques.filter((x) => x.tela === t.nome);
    const porTipo: Record<string, number> = {};
    for (const x of meus) porTipo[x.tipo] = (porTipo[x.tipo] ?? 0) + 1;
    const legendas = new Set(meus.filter((x) => x.tipo !== 'botao' && x.legenda).map((x) => x.legenda));
    const botoes = meus.filter((x) => x.tipo === 'botao').length;
    const semLegenda = meus.filter((x) => x.tipo !== 'botao' && !x.legenda).length;
    const ultimo = meus[meus.length - 1];
    const innerH = ultimo?.innerH ?? t.aoAbrir.telas;
    return {
      tela: t.nome,
      toques: meus.length,
      toquesPorTipo: porTipo,
      decisoes: legendas.size + botoes + semLegenda,
      caracteres: chars.filter((x) => x.tela === t.nome).reduce((s, x) => s + x.n, 0),
      alturaFinal: ultimo ? Math.round((ultimo.scrollH / ultimo.innerH) * 10) / 10 : t.aoAbrir.telas,
      alturaAoAbrir: t.aoAbrir.telas,
      rolagem: ultimo ? Math.round(((rolagemMax[t.nome] ?? 0) / innerH) * 10) / 10 : 0,
      botaoPrincipalVisivelAoAbrir: t.aoAbrir.botaoPrincipal?.visivelSemRolar ?? null,
      palavrasAoAbrir: t.palavrasAoAbrir,
      tempoRoboMs: prox ? prox.inicio - t.inicio : 0,
      alvos: meus.map((x) => `${x.tipo}:${x.alvo || x.legenda}`),
    };
  });
  const totalMs = (c.fim || c.telas[c.telas.length - 1]!.inicio) - c.telas[0]!.inicio;
  return { persona: c.persona, projeto, totalMs, telas };
}

for (const [nome, def] of Object.entries(DEFINICOES)) {
  test(`cadastro: ${nome}`, async ({ page }, info) => {
    const c = new Percurso(page, nome, `${SAIDA}/${info.project.name}/${nome}`);
    await cadastro(c, def);
    if (nome === 'bruno') {
      // O 2º local (R1b): o tempo e os toques dele ficam em telas próprias ("local-2").
      await segundoLocalDoBruno(c);
    }
    await c.recolher();
    expect(c.charsDigitados).toBe(c.registros.flatMap((r) => r.chars).reduce((s, x) => s + x.n, 0));
    resultados.push(resumir(c, info.project.name));
  });
}

// O caminho de quem tem alguma condição (fictício: o Bruno com dor 4 no ombro, e o Bruno bloqueado pelo coração).
test('cadastro: bruno-ombro (triagem com "sim" só no osteoarticular)', async ({ page }, info) => {
  const c = new Percurso(page, 'bruno-ombro', `${SAIDA}/${info.project.name}/bruno-ombro`);
  await cadastro(c, { ...DEFINICOES.bruno!, triagem: triagemOmbro });
  await c.recolher();
  resultados.push(resumir(c, info.project.name));
});

test('cadastro: bruno-bloqueio (triagem com "sim" no coração e liberação confirmada)', async ({ page }, info) => {
  const c = new Percurso(page, 'bruno-bloqueio', `${SAIDA}/${info.project.name}/bruno-bloqueio`);
  await cadastro(c, { ...DEFINICOES.bruno!, triagem: triagemBloqueio });
  await c.recolher();
  resultados.push(resumir(c, info.project.name));
});

// A resposta do sistema (R do KLM): quanto demora a troca de tela e a geração do programa, sem o robô no meio.
test('resposta do sistema: troca de tela e geração do programa (Carla, academia completa)', async ({ page }, info) => {
  const c = new Percurso(page, 'resposta-carla');
  const d = { ...DEFINICOES.carla!, equipamento: async (x: Percurso) => void (await x.page.getByRole('button', { name: /^(✓ )?Academia completa$/ }).click()) };
  await cadastro(c, d);
  // mede de novo só o último passo: voltar ao "Tudo certo?" e cronometrar o toque até "Seu treino"
  await page.goto('/comecar/restricoes');
  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  const medidas: number[] = [];
  for (let i = 0; i < 3; i++) {
    const t0 = Date.now();
    await page.getByRole('button', { name: 'Gerar meu programa' }).click();
    await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
    medidas.push(Date.now() - t0);
    await page.goto('/comecar/restricoes');
    await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  }
  // troca de tela comum: rotina → equipamento
  await page.goto('/comecar/rotina');
  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  const t1 = Date.now();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  const troca = Date.now() - t1;
  mkdirSync(SAIDA, { recursive: true });
  writeFileSync(`${SAIDA}/resposta-${info.project.name}.json`, JSON.stringify({ gerarProgramaMs: medidas, trocaDeTelaMs: troca }, null, 1) + '\n');
});
