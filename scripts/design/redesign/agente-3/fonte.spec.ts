import { test } from '@playwright/test';
import { comEstado, comecar, gravarJson } from './apoio';

// Agente 3: a letra. (1) A Atkinson Hyperlegible Next tem algarismos de largura igual (tnum)? Compara a largura de
// "1111", "0000" e "8888" com e sem `font-variant-numeric: tabular-nums`. (2) Os tamanhos de letra dos textos do
// treino e a altura do "x" (para a conta do ângulo visual a 30, 60 e 80 cm).

test('algarismos tabulares e tamanhos de letra no treino', async ({ page }) => {
  test.skip(test.info().project.name !== 'p7');
  await comEstado(page, 'ana', 'comum');
  await comecar(page);
  await page.getByLabel('Carga', { exact: true }).selectOption({ index: 6 }).catch(() => {});
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await page.waitForTimeout(300);
  const r = await page.evaluate(async () => {
    await document.fonts.load('800 36px "Atkinson Hyperlegible Next"');
    await document.fonts.ready;
    const carregada = document.fonts.check('800 36px "Atkinson Hyperlegible Next"');
    const larg = (txt: string, variante: string, peso = '800') => {
      const s = document.createElement('span');
      s.style.cssText = `position:absolute;visibility:hidden;font:${peso} 72px "Atkinson Hyperlegible Next";font-variant-numeric:${variante};white-space:nowrap`;
      s.textContent = txt;
      document.body.append(s);
      const w = s.getBoundingClientRect().width;
      s.remove();
      return Math.round(w * 100) / 100;
    };
    const amostras = ['1111', '0000', '8888', '1:11', '0:00'];
    const normal = Object.fromEntries(amostras.map((a) => [a, larg(a, 'normal')]));
    const tabular = Object.fromEntries(amostras.map((a) => [a, larg(a, 'tabular-nums')]));
    // altura do x (em fração do tamanho da letra), medida no canvas
    const cv = document.createElement('canvas').getContext('2d')!;
    cv.font = '400 100px "Atkinson Hyperlegible Next"';
    const mx = cv.measureText('x');
    const xAltura = Math.round((mx.actualBoundingBoxAscent / 100) * 1000) / 1000;
    cv.font = '800 100px "Atkinson Hyperlegible Next"';
    const m8 = cv.measureText('8');
    const algarismoAltura = Math.round((m8.actualBoundingBoxAscent / 100) * 1000) / 1000;
    const alvos: [string, string][] = [
      ['relógio do descanso', '.tclock-mini'],
      ['número do stepper (repetições)', '.stepper output'],
      ['"Série N de M"', '.registro h2'],
      ['nome do exercício', '.ex-sessao .titulo'],
      ['meta (séries × reps · RIR)', '.meta'],
      ['rótulo "Carga"/"Repetições"', '.rotulo-curto'],
      ['botão RIR', '.chip-valor'],
      ['"Série feita"', '.registro .salvar'],
      ['pílula de série feita', '.series-feitas li'],
      ['sugestão (negrito)', '.sugestao b'],
      ['sugestão (texto)', '.sugestao span'],
      ['"Senti algo"', '.alerta-topo'],
      ['ajuda (RIR)', '.registro .ajuda'],
      ['selo de evidência', '.selo'],
      ['legenda do RIR', '.registro legend'],
      ['"Descanso" / "Hora da próxima série"', '.descanso-topo span:first-child'],
      ['botões do descanso', '.tctl button'],
      ['progresso (exercício N de M)', '.progresso span'],
      ['Trocar exercício', '.acoes-sessao button'],
    ];
    const tamanhos = alvos.map(([nome, sel]) => {
      const e = document.querySelector<HTMLElement>(sel);
      if (!e) return { nome, px: null };
      const s = getComputedStyle(e);
      return { nome, px: parseFloat(s.fontSize), peso: s.fontWeight, tabular: s.fontVariantNumeric, cor: s.color };
    });
    return { carregada, normal, tabular, xAltura, algarismoAltura, tamanhos };
  });
  gravarJson('fonte.json', r);
  console.log(JSON.stringify(r, null, 1));
});
