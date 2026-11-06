import { mkdirSync, writeFileSync } from 'node:fs';
import { test } from '@playwright/test';

// Agente 5: a letra Atkinson Hyperlegible Next medida no navegador. Algarismos tabulares: largura de "1111" e "0000"
// com e sem font-variant-numeric: tabular-nums, em cada peso que o app usa; largura de cada algarismo; e o mesmo
// com a letra do sistema (o que a pessoa vê se a letra não carregar). Saída: reports/design/redesign/agente-5/letra.json e letra.png.
const DIR = 'reports/design/redesign/agente-5';

test('algarismos tabulares e largura por peso', async ({ page }) => {
  test.skip(test.info().project.name !== 'claro', 'uma vez basta');
  mkdirSync(DIR, { recursive: true });
  await page.setViewportSize({ width: 760, height: 900 });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;600;700;800&family=Atkinson+Hyperlegible+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>body{margin:16px;font-family:'Atkinson Hyperlegible Next',sans-serif;color:#15171C;background:#F5F4F0}
  .m{position:absolute;visibility:hidden;white-space:nowrap;font-size:100px}
  h1{font-size:18px;margin:0 0 8px}h2{font-size:14px;margin:14px 0 4px;color:#4B505B}
  .demo{display:flex;gap:28px;align-items:flex-start}
  .col{background:#fff;border-radius:14px;padding:12px 14px;flex:1}
  .clock{font-weight:800;font-size:56px;line-height:1.05}
  .tn{font-variant-numeric:tabular-nums}
  .ruler{border-left:2px solid #B3261E;margin-left:0;padding-left:6px}
  small{color:#4B505B;font-size:13px}
  .mono{font-family:'Atkinson Hyperlegible Mono',monospace}
  </style></head><body>
  <h1>Atkinson Hyperlegible Next: algarismos de largura igual?</h1>
  <div class="demo">
   <div class="col"><h2>sem tabular-nums (padrão)</h2><div class="clock ruler">1:11<br>0:00<br>7:47</div><small>se a largura muda entre as linhas, o relógio "pula" ao contar</small></div>
   <div class="col"><h2>com font-variant-numeric: tabular-nums</h2><div class="clock ruler tn">1:11<br>0:00<br>7:47</div><small>o app já pede tabular-nums nos números grandes</small></div>
   <div class="col"><h2>Atkinson Hyperlegible Mono (da mesma família)</h2><div class="clock ruler mono">1:11<br>0:00<br>7:47</div><small>alternativa só para números, se a Next não tiver tnum</small></div>
  </div>
  <h2>I l 1 · O 0 · B 8 · 6 9 · rn m (os pares que a letra separa)</h2>
  <div style="font-size:40px;font-weight:700">Il1 O0 B8 69 rn m · 12 kg × 10 · RIR 2 · 1:30</div>
  <div id="m"></div>
  </body></html>`);
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  await page.evaluate(() => document.fonts.load("800 100px 'Atkinson Hyperlegible Next'"));
  await page.evaluate(() => document.fonts.load("700 100px 'Atkinson Hyperlegible Mono'"));
  await page.waitForTimeout(500);
  const dados = await page.evaluate(() => {
    const m = document.getElementById('m')!;
    const largura = (texto: string, familia: string, peso: number, tnum: boolean, feature = false) => {
      const s = document.createElement('span');
      s.className = 'm';
      s.style.fontFamily = familia;
      s.style.fontWeight = String(peso);
      if (tnum) s.style.fontVariantNumeric = 'tabular-nums';
      if (feature) s.style.fontFeatureSettings = '"tnum"';
      s.textContent = texto;
      m.appendChild(s);
      const w = s.getBoundingClientRect().width;
      s.remove();
      return Math.round(w * 100) / 100;
    };
    const out: Record<string, unknown> = { fontesCarregadas: Array.from(document.fonts).filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`) };
    for (const familia of ["'Atkinson Hyperlegible Next'", "'Atkinson Hyperlegible Mono'", 'system-ui', 'sans-serif']) {
      const linhas: Record<string, unknown>[] = [];
      for (const peso of familia.includes('Next') ? [400, 600, 700, 800] : [400, 700]) {
        const digitos = '0123456789'.split('').map((d) => largura(d, familia, peso, false));
        linhas.push({
          peso,
          '1111': largura('1111', familia, peso, false),
          '0000': largura('0000', familia, peso, false),
          '1111 tnum': largura('1111', familia, peso, true),
          '0000 tnum': largura('0000', familia, peso, true),
          '1111 feature': largura('1111', familia, peso, false, true),
          '0000 feature': largura('0000', familia, peso, false, true),
          digitos,
          digitosIguais: Math.max(...digitos) - Math.min(...digitos) < 0.5,
          relogio: { '1:11': largura('1:11', familia, peso, true), '0:00': largura('0:00', familia, peso, true) },
        });
      }
      out[familia] = linhas;
    }
    return out;
  });
  writeFileSync(`${DIR}/letra.json`, JSON.stringify(dados, null, 1) + '\n');
  console.log(JSON.stringify(dados, null, 1));
  await page.screenshot({ path: `${DIR}/letra.png`, fullPage: true });
});
