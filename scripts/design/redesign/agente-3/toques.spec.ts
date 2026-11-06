import { expect, test, type Page } from '@playwright/test';
import { anexarJsonl, comEstado, comecar, gravarJson, PERSONAS } from './apoio';

// Agente 3: toques por série e por treino, nas 6 personas, pelo caminho mínimo (aceitando o que vem preenchido):
// escolher a carga quando falta, escolher o RIR, "Série feita", pular o descanso, "Próximo", "Terminar".
// Duas situações: a 1ª sessão (nenhum histórico: a carga começa vazia) e a 2ª (com histórico: a carga vem sugerida).
// Cargas-alvo na 1ª vez: halter = a opção do meio da lista (2 toques: abrir e escolher); placa 5; 10 kg por lado nas
// anilhas; contrapeso 3; barra 40 kg; degrau: o que vem (0). Só no projeto p7 (a contagem não depende da tela).

type Contagem = { carga: number; rir: number; feita: number; pular: number; proximo: number; outros: number; series: number; exercicios: number; abrirGuia: number };

async function treinoInteiro(page: Page): Promise<Contagem> {
  const c: Contagem = { carga: 0, rir: 0, feita: 0, pular: 0, proximo: 0, outros: 1, series: 0, exercicios: 0, abrirGuia: 0 }; // 1 = "Começar"
  for (let ex = 0; ex < 20; ex++) {
    c.exercicios++;
    // abrir o guia e voltar custa 2 toques por exercício com animação (contado à parte, não somado)
    if (await page.getByRole('link', { name: 'Ver como fazer' }).count()) c.abrirGuia += 2;
    const registro = page.getByRole('region', { name: /^Série \d/ });
    while (await registro.isVisible()) {
      c.series++;
      // carga: só quando vem vazia ("Escolha" ou "—"); o que vem preenchido é aceito (0 toque)
      const sel = registro.locator('.linha-registro select, label.campo select').first();
      const out = registro.locator('.linha-registro .stepper output').first();
      const temSelect = (await sel.count()) > 0 && (await sel.evaluate((e) => !(e.closest('label.campo') && e.closest('label.campo')!.textContent!.includes('Dificuldade'))));
      if (temSelect && !(await sel.inputValue())) {
        const n = await sel.locator('option:not([disabled])').count();
        await sel.selectOption({ index: Math.max(1, Math.floor(n / 2)) });
        c.carga += 2;
      } else if (!temSelect && (await out.count()) && (await out.innerText()).trim() === '—') {
        for (const [rotulo, alvo] of [
          ['Mais carga', 40],
          ['Próxima placa', 5],
          ['Mais anilha de cada lado', 10],
          ['Mais contrapeso (mais fácil)', 3],
        ] as const) {
          const b = registro.getByRole('button', { name: rotulo }).first();
          if (!(await b.count())) continue;
          for (let i = 0; i < 40; i++) {
            const t = (await out.innerText()).trim();
            const n = parseFloat(t.replace(',', '.'));
            if (t !== '—' && !Number.isNaN(n) && n >= alvo) break;
            if (await b.isDisabled()) break;
            await b.click();
            c.carga++;
          }
        }
      }
      const rir = registro.getByRole('radio', { name: '2', exact: true });
      if (!(await rir.isChecked())) {
        await rir.check();
        c.rir++;
      }
      await registro.getByRole('button', { name: /^Série feita/ }).click();
      c.feita++;
      const pular = page.getByRole('button', { name: 'Pular' });
      if (await pular.isVisible()) {
        await pular.click();
        c.pular++;
      }
    }
    const prox = page.getByRole('button', { name: 'Próximo ›' });
    if (!(await prox.count())) break;
    await prox.click();
    c.proximo++;
  }
  await page.getByRole('main').getByRole('button', { name: 'Terminar treino' }).click();
  c.outros++;
  await expect(page).toHaveURL(/\/treino\/fim$/);
  return c;
}

const resultados: Record<string, unknown>[] = [];
test.afterAll(() => gravarJson('toques.json', resultados));

for (const persona of PERSONAS) {
  for (const fonte of ['sem-historico', 'comum'] as const) {
    test(`toques: ${persona}, ${fonte === 'comum' ? '2ª sessão' : '1ª sessão'}`, async ({ page }) => {
      test.skip(test.info().project.name !== 'p7', 'a contagem não depende do tamanho da tela');
      await comEstado(page, persona, fonte);
      await comecar(page);
      const dia = (await page.locator('.progresso span').innerText()).split('·')[0]!.trim();
      const c = await treinoInteiro(page);
      const total = c.carga + c.rir + c.feita + c.pular + c.proximo + c.outros;
      anexarJsonl('toques.jsonl', { persona, sessao: fonte === 'comum' ? 2 : 1, dia, ...c, total, porSerie: Math.round((total / c.series) * 10) / 10 });
      resultados.push({ persona, sessao: fonte === 'comum' ? 2 : 1, dia, ...c, total, porSerie: Math.round((total / c.series) * 10) / 10 });
    });
  }
}
