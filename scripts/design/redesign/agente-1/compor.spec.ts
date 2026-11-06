import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from '@playwright/test';

// Agente 1: monta as folhas do relatório (até 8 PNG, ≤ 300 kB) a partir das capturas brutas de momentos.spec.ts.
// Cada folha põe 2 a 4 capturas lado a lado, com um rótulo, para o Gustavo ver "a mesma tela em vários momentos".
// Uso: npx playwright test -c scripts/design/redesign/agente-1/playwright.config.ts compor --project=pixel7

const BRUTAS = resolve('reports/design/redesign/agente-1');
const SAIDA = resolve('docs/revisoes/redesign/img');

const FOLHAS: { nome: string; titulo: string; itens: { proj: string; arq: string; rotulo: string }[] }[] = [
  {
    nome: 'agente-1-inicio-4-momentos',
    titulo: 'A tela de início (Seu treino) em 4 momentos: o "Começar" só aparece sem rolar nos 2 primeiros',
    itens: [
      { proj: 'pixel7', arq: '01-inicio-primeira-abertura', rotulo: '1ª abertura (sem treino)' },
      { proj: 'pixel7', arq: '02-inicio-depois-do-1o-treino', rotulo: 'Depois do 1º treino' },
      { proj: 'pixel7', arq: '05-inicio-volta-22-dias', rotulo: 'Volta depois de 22 dias' },
      { proj: 'pixel7', arq: '07-inicio-4a-semana', rotulo: '4ª semana (2 de 3)' },
    ],
  },
  {
    nome: 'agente-1-inicio-empilhado',
    titulo: 'Quando duas ofertas aparecem juntas (semana leve e tempo), o treino do dia some da tela',
    itens: [
      { proj: 'pixel7', arq: '12b-inicio-semana-leve-sugerida', rotulo: 'Pixel 7: semana leve sugerida' },
      { proj: 'pequeno', arq: '12b-inicio-semana-leve-sugerida', rotulo: 'Celular pequeno (360 × 740)' },
      { proj: 'pixel7', arq: '10-inicio-semanas-com-menos-treino', rotulo: 'Pixel 7: 3 semanas com 1 de 3' },
    ],
  },
  {
    nome: 'agente-1-fim-do-treino',
    titulo: 'Fim do treino: hoje; com a semana leve sugerida no meio, "Ver a sua semana" sai da tela (117% no Pixel 7, 140% no pequeno)',
    itens: [
      { proj: 'pixel7', arq: '13-fim-do-treino', rotulo: 'Pixel 7: fim do treino' },
      { proj: 'pixel7', arq: '13c-fim-do-treino-semana-leve', rotulo: 'Pixel 7: com a semana leve sugerida' },
      { proj: 'pequeno', arq: '13c-fim-do-treino-semana-leve', rotulo: 'Pequeno: com a semana leve sugerida' },
    ],
  },
  {
    nome: 'agente-1-semana-e-evolucao',
    titulo: 'A sua semana (4ª semana e revisão da meta) e a evolução de um exercício',
    itens: [
      { proj: 'pixel7', arq: '08-semana-4a-semana', rotulo: 'Semana, 4ª semana' },
      { proj: 'pixel7', arq: '11-semana-revisao-da-meta', rotulo: 'Semana, revisão da meta' },
      { proj: 'pixel7', arq: '12-evolucao-recorde', rotulo: 'Evolução: recorde e carga' },
    ],
  },
  {
    nome: 'agente-1-semana-inteira',
    titulo: 'A sua semana, página inteira (4ª semana): o que fica abaixo da dobra',
    itens: [
      { proj: 'pixel7', arq: '08-semana-4a-semana-inteira', rotulo: 'Pixel 7, página inteira' },
      { proj: 'pixel7', arq: '03-semana-depois-do-1o-treino-inteira', rotulo: 'Depois do 1º treino, inteira' },
    ],
  },
];

test('folhas do relatório', async ({ page }) => {
  mkdirSync(SAIDA, { recursive: true });
  for (const f of FOLHAS) {
    const itens = f.itens.filter((i) => existsSync(`${BRUTAS}/${i.proj}/${i.arq}.png`));
    if (!itens.length) continue;
    const inteira = f.nome.endsWith('inteira');
    const largura = inteira ? 300 : 272;
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
      body{margin:0;background:#fff;font-family:system-ui,sans-serif;color:#15171c}
      h1{font-size:15px;font-weight:600;margin:12px 16px 8px;max-width:${itens.length * (largura + 12)}px}
      .f{display:flex;gap:12px;padding:0 16px 16px;align-items:flex-start}
      figure{margin:0;width:${largura}px}
      figcaption{font-size:12px;font-weight:600;margin:0 0 6px}
      img{width:${largura}px;display:block;border:1px solid #d9d8d3;border-radius:6px}
    </style></head><body><h1>${f.titulo}</h1><div class="f">${itens
      .map((i) => `<figure><figcaption>${i.rotulo}</figcaption><img src="file://${BRUTAS}/${i.proj}/${i.arq}.png"></figure>`)
      .join('')}</div></body></html>`;
    const tmp = `${BRUTAS}/_${f.nome}.html`;
    writeFileSync(tmp, html);
    await page.setViewportSize({ width: itens.length * (largura + 12) + 32, height: 400 });
    await page.goto(`file://${tmp}`);
    await page.waitForTimeout(200);
    const destino = `${SAIDA}/${f.nome}.png`;
    await page.screenshot({ path: destino, fullPage: true, scale: 'css' });
    const kb = Math.round(statSync(destino).size / 1024);
    console.log(`${f.nome}.png: ${kb} kB`);
  }
});
