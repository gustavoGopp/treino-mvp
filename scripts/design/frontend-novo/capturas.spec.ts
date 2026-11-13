import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { abrirExercicio, folhaPronta, maisOpcoes, marcarItem, minutosPorTreino, pronto, sobreOPrograma, terminarTreino, triagemNenhuma } from '../../../tests/e2e/jornada';

// Fotografa o app de hoje, tela por tela, com a persona fictícia Ana (tests/personas): iniciante, halteres fixos de 1 a
// 12 kg e banco reto, 3 x 45 min, prioridade pernas e glúteos. Cada projeto do playwright.config.ts é um tamanho e um
// tema; cada captura é só o que cabe na tela sem rolar (é o que a pessoa vê ao abrir), e as telas compridas ganham
// também a página inteira ("-inteira"), só em 390 px no tema claro. No fim, as imagens passam para 256 cores pelo
// ImageMagick (se ele existir na máquina), para a pasta caber no git; o texto e o Boneco continuam nítidos. Junto das imagens sai medidas-<projeto>.json: por tela, a altura da página, se
// a ação principal está à vista sem rolar e quantas palavras estão à vista.

const RAIZ = resolve(process.cwd(), process.env.CAPTURAS ?? 'docs/revisoes/frontend-novo/capturas/antes');

type Medida = { tela: string; esperaDasMiniaturasMs: number | null; alturaDaPagina: number; alturaDaTela: number; palavrasAVista: number; acaoPrincipal: string | null; acaoAVista: boolean | null };

test('o app de hoje, tela por tela, com a Ana', async ({ page }, info) => {
  const pasta = resolve(RAIZ, info.project.name);
  mkdirSync(pasta, { recursive: true });
  const medidas: Medida[] = [];
  const falhas: string[] = [];

  /** Fotografa o que está à vista e mede a tela. `acao` é o nome do botão ou link principal, se a tela tiver um. */
  async function foto(tela: string, { acao, inteira = false }: { acao?: string | RegExp; inteira?: boolean } = {}) {
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    // as miniaturas do Boneco chegam do Worker depois da tela: espera até 8 s e anota quanto demorou (null = não chegaram)
    const t0 = Date.now();
    const temMiniatura = (await page.locator('.miniatura:not(.vazia)').count()) > 0;
    const chegaram = await page
      .waitForFunction(() => Array.from(document.querySelectorAll('.miniatura:not(.vazia)')).every((e) => e.querySelector('svg')), undefined, { timeout: 8000 })
      .then(() => true, () => false);
    const esperaDasMiniaturasMs = !temMiniatura ? 0 : chegaram ? Date.now() - t0 : null;
    await page.screenshot({ path: resolve(pasta, `${tela}.png`), animations: 'disabled' });
    if (inteira && info.project.name === '390-claro') await page.screenshot({ path: resolve(pasta, `${tela}-inteira.png`), fullPage: true, animations: 'disabled' });
    const m = await page.evaluate(() => {
      const h = window.innerHeight;
      let palavras = 0;
      const anda = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let no = anda.nextNode(); no; no = anda.nextNode()) {
        const pai = no.parentElement;
        const texto = no.textContent?.trim();
        if (!pai || !texto || pai.closest('svg, [inert], [hidden], script, style')) continue;
        const r = pai.getBoundingClientRect();
        const s = getComputedStyle(pai);
        if (r.width === 0 || r.height === 0 || r.bottom <= 0 || r.top >= h || s.visibility === 'hidden') continue;
        palavras += texto.split(/\s+/).length;
      }
      return { alturaDaPagina: document.documentElement.scrollHeight, alturaDaTela: h, palavrasAVista: palavras };
    });
    let acaoAVista: boolean | null = null;
    if (acao) {
      const alvo = page.getByRole('button', { name: acao }).or(page.getByRole('link', { name: acao })).first();
      const caixa = (await alvo.count()) ? await alvo.boundingBox() : null;
      acaoAVista = !!caixa && caixa.y >= 0 && caixa.y + caixa.height <= m.alturaDaTela;
    }
    medidas.push({ tela, esperaDasMiniaturasMs, ...m, acaoPrincipal: acao ? String(acao) : null, acaoAVista });
  }

  /** Um passo que pode falhar sem derrubar as capturas seguintes; a falha fica anotada. */
  async function passo(nome: string, f: () => Promise<void>) {
    try {
      await f();
    } catch (e) {
      falhas.push(`${nome}: ${String(e).split('\n')[0]}`);
    }
  }
  const fecharFolha = async () => {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
  };
  const grupo = (nome: RegExp) => page.getByRole('group', { name: nome });

  // ---- cadastro ----
  await page.goto('/');
  await foto('01-boas-vindas', { acao: 'Começar', inteira: true });
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
  await foto('02-saude', { acao: 'Não, nenhuma', inteira: true });
  await passo('saúde, quais valem', async () => {
    await page.getByRole('button', { name: 'Sim, alguma (ou não tenho certeza)' }).click();
    await expect(page.getByRole('heading', { name: 'Quais valem para você?' })).toBeVisible();
    await foto('02b-saude-quais-valem', { acao: 'Continuar', inteira: true });
    await page.goto('/comecar/triagem');
  });
  await triagemNenhuma(page);

  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  await foto('03-nivel-vazio', { acao: 'Continuar', inteira: true });
  await grupo(/sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(/treinando agora/).getByLabel(/^Estou treinando/).check();
  await grupo(/confiança na técnica/).getByLabel(/^Sim/).check();
  await expect(page.getByRole('heading', { name: 'Seu nível: Iniciante' })).toBeVisible();
  await foto('03b-nivel-respondido', { acao: 'Continuar', inteira: true });
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  await foto('04-rotina-vazia', { acao: 'Continuar', inteira: true });
  await grupo(/Quantos dias/).getByLabel('3 dias').check();
  await minutosPorTreino(page, '45');
  await page.getByLabel('Pernas', { exact: true }).check();
  await page.getByLabel('Glúteos', { exact: true }).check();
  await foto('04b-rotina-respondida', { acao: 'Continuar', inteira: true });
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await foto('05-equipamento-lugar', { acao: 'Gerar meu programa', inteira: true });
  await passo('equipamento, pela foto', async () => {
    await page.getByRole('button', { name: 'Pela foto' }).click();
    await folhaPronta(page);
    await foto('05b-equipamento-foto');
    await fecharFolha();
  });
  const halteres = await marcarItem(page, 'Halteres fixos');
  await foto('05c-equipamento-folha-do-item');
  await halteres.getByRole('group', { name: 'O mais leve' }).getByLabel('1 kg', { exact: true }).check();
  await halteres.getByRole('group', { name: 'O mais pesado' }).getByLabel('12 kg', { exact: true }).check();
  await halteres.getByRole('group', { name: 'De quanto em quanto' }).getByLabel('1 kg', { exact: true }).check();
  await pronto(page);
  await marcarItem(page, 'Banco reto');
  await foto('05d-equipamento-item-por-item', { acao: 'Gerar meu programa', inteira: true });
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();

  // ---- início ----
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await foto('06-inicio', { acao: /^Começar o treino/, inteira: true });
  await passo('início, folha do exercício', async () => {
    const primeiro = page.getByRole('tabpanel').getByRole('button').first();
    await abrirExercicio(page, (await primeiro.getAttribute('aria-label')) ?? (await primeiro.innerText()).split('\n')[0]!);
    await foto('07-folha-do-exercicio');
    await fecharFolha();
  });
  await passo('início, sobre o programa', async () => {
    await sobreOPrograma(page);
    await foto('06b-inicio-sobre-o-programa');
    await fecharFolha();
  });

  // ---- treino ----
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await foto('08-treino-serie-vazia', { acao: /^Série feita/, inteira: true });
  await passo('treino, guia', async () => {
    await page.getByRole('link', { name: 'Ver como fazer' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.waitForTimeout(600);
    await foto('12-guia-tecnica', { inteira: true });
    for (const [arquivo, modo] of [['12b-guia-erros', 'Erros'], ['12c-guia-musculos', 'Músculos'], ['12d-guia-trajetoria', 'Trajetória']] as const) {
      await page.getByRole('button', { name: modo, exact: true }).click();
      await foto(arquivo);
    }
    await page.goBack();
    await expect(page).toHaveURL(/\/treino$/);
  });
  await page.getByLabel('Carga', { exact: true }).selectOption({ index: 3 });
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await foto('08b-treino-serie-preenchida', { acao: /^Série feita/ });
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
  await foto('09-treino-descanso', { acao: /^Série \d feita/, inteira: true });
  await passo('treino, senti algo', async () => {
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await page.waitForTimeout(300);
    await foto('10-treino-senti-algo');
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await page.waitForTimeout(300);
  });
  await passo('treino, mais opções', async () => {
    await maisOpcoes(page);
    await foto('11-treino-mais-opcoes');
    await fecharFolha();
  });
  // frontend novo: no descanso o registro sai da tela; "Mudar" volta aos números da série, com o descanso numa faixa
  await passo('treino, a série durante o descanso', async () => {
    await page.getByRole('button', { name: 'Mudar' }).click();
    await foto('09b-treino-serie-com-descanso', { acao: /^Série feita/ });
  });
  await passo('treino, por quê', async () => {
    await page.getByRole('button', { name: 'por quê?' }).first().click();
    await folhaPronta(page);
    await foto('11b-treino-por-que');
    await fecharFolha();
  });
  // os outros exercícios do dia, para pegar o cartão de texto (exercício sem animação) quando houver
  await passo('treino, os outros exercícios', async () => {
    for (let i = 2; i <= 7; i++) {
      const folha = await maisOpcoes(page);
      const proximo = folha.getByRole('button', { name: 'Próximo', exact: true });
      if (!(await proximo.count()) || !(await proximo.isEnabled())) {
        await fecharFolha();
        break;
      }
      await proximo.click();
      await page.waitForTimeout(400);
      await foto(`08c-treino-exercicio-${i}`, { acao: /^Série feita/ });
      if (i === 2) {
        // o fim do descanso: o relógio passa de zero e a tela inverte (os 2 min saem do relógio do navegador)
        const voltar = page.getByRole('button', { name: /^(Descanso|Hora da próxima série)/ });
        if (await voltar.count()) {
          await voltar.click();
          // no fim do descanso os ±15 s saem da tela: toca até o rótulo virar "Hora da próxima série"
          for (let k = 0; k < 12 && !(await page.locator('.descanso-topo').getByText('Hora da próxima série').isVisible()); k++) await page.getByRole('button', { name: '−15 s' }).click();
          await foto('09c-treino-hora-da-proxima-serie');
          await page.getByRole('button', { name: 'Ok' }).click();
        }
      }
    }
  });
  await passo('treino, terminar', async () => {
    await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
    await folhaPronta(page);
    await foto('11c-treino-terminar');
    await fecharFolha();
  });
  await terminarTreino(page);
  await expect(page).toHaveURL(/\/treino\/fim$/);
  await foto('13-fim-do-treino', { inteira: true });

  // ---- acompanhamento e o resto ----
  await page.goto('/semana');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await foto('14-semana', { inteira: true });
  await passo('evolução', async () => {
    await page.locator('a[href^="/evolucao/"]').first().click();
    await expect(page).toHaveURL(/\/evolucao\//);
    await foto('15-evolucao', { inteira: true });
  });
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await foto('06c-inicio-depois-do-1o-treino', { acao: /^Começar o treino/, inteira: true });
  await page.goto('/dados');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await foto('16-meus-dados', { inteira: true });
  await passo('meus dados, estilo do Boneco', async () => {
    await page.getByRole('button', { name: 'Estilo do Boneco' }).click();
    await page.waitForTimeout(2500);
    await foto('16b-meus-dados-estilo-do-boneco');
    await fecharFolha();
  });
  await page.goto('/locais');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await foto('17-locais', { inteira: true });
  await passo('locais, editar', async () => {
    await page.locator('a[href^="/locais/"]').first().click();
    await expect(page).toHaveURL(/\/locais\/.+/);
    await foto('17b-locais-editar', { inteira: true });
  });
  await page.goto('/termos');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await foto('18-termos', { inteira: true });

  writeFileSync(resolve(RAIZ, `medidas-${info.project.name}.json`), JSON.stringify({ medidas, falhas }, null, 2) + '\n');
  try {
    for (const f of readdirSync(pasta).filter((x) => x.endsWith('.png'))) execFileSync('convert', [resolve(pasta, f), '-strip', '-dither', 'None', '-colors', '256', `png8:${resolve(pasta, f)}`]);
  } catch {
    console.log(`[${info.project.name}] sem o ImageMagick: as capturas ficaram sem compressão`);
  }
  // passo que não achou o que procurava não derruba as capturas, mas fica à vista
  if (falhas.length) console.log(`[${info.project.name}] passos sem captura:\n  ${falhas.join('\n  ')}`);
});
