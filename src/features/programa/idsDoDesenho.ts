import type { CSSProperties } from 'react';

// O desenho do Boneco sai do motor como um trecho de SVG com ids fixos (o padrão das listras, `mh-listras`, e os
// recortes do corpo). Com várias miniaturas na mesma página, os ids se repetiam: HTML inválido, e a referência
// `url(#id)` de cada desenho resolvia para o 1º da página. Aqui cada desenho ganha os ids dele; o motor não muda
// (as linhas de base da regressão visual continuam valendo).

const ID_DAS_LISTRAS = 'mh-listras';

/** O mesmo trecho de SVG, com cada id (e cada referência a ele) terminando em `-<sufixo>`. */
export function comIdsUnicos(html: string, sufixo: string): string {
  const s = sufixo.replace(/[^a-zA-Z0-9_-]/g, '');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]!));
  if (!ids.size || !s) return html;
  return html
    .replace(/\bid="([^"]+)"/g, (_, id: string) => `id="${id}-${s}"`)
    .replace(/url\(#([^)]+)\)/g, (tudo: string, id: string) => (ids.has(id) ? `url(#${id}-${s})` : tudo))
    .replace(/\b(xlink:href|href)="#([^"]+)"/g, (tudo: string, attr: string, id: string) => (ids.has(id) ? `${attr}="#${id}-${s}"` : tudo));
}

/**
 * O estilo do `<svg>` que aponta o preenchimento das listras para o padrão deste desenho: a regra do CSS
 * (`.ea-mh{fill:var(--mh-listras, url(#mh-listras))}`) não tem como saber o id de cada um.
 */
export const estiloDasListras = (sufixo: string): CSSProperties =>
  ({ '--mh-listras': `url(#${ID_DAS_LISTRAS}-${sufixo.replace(/[^a-zA-Z0-9_-]/g, '')})` }) as CSSProperties;
