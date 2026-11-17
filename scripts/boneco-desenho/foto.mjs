// Tira a foto (PNG) de uma página HTML montada pelos scripts das pranchas. Usa o Chromium já instalado.
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

/** html → PNG em `saida`. `largura` em px de CSS; a altura acompanha o conteúdo. `escala` 2 = imagem para gente ver. */
export async function fotografar(html, saida, { largura = 1080, escala = 2 } = {}) {
  const caminho = '/opt/pw-browsers/chromium';
  const nav = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
  const pag = await nav.newPage({ viewport: { width: largura, height: 800 }, deviceScaleFactor: escala });
  await pag.setContent(html);
  await pag.screenshot({ path: saida, fullPage: true });
  await nav.close();
}

/** Um palco: o desenho (em cm, y para cima) dentro de uma caixa [x0, y0, largura, altura] em cm, com `px` de largura. */
export function palco(conteudo, [x0, y0, w, h], px, { fundo = '#f7f9fa', raio = 10, chao = null } = {}) {
  const linha = chao ? `<line x1="${x0}" y1="0" x2="${x0 + w}" y2="0" stroke="${chao}" stroke-width="${(w / px) * 1.5}"/>` : '';
  return `<svg width="${px}" height="${Math.round((px * h) / w)}" viewBox="${x0} ${-(y0 + h)} ${w} ${h}" style="background:${fundo};border-radius:${raio}px;display:block"><g transform="scale(1 -1)">${linha}${conteudo}</g></svg>`;
}
