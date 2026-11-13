// Os dois desenhos escolhidos pelo Gustavo em 13/11/2026 (docs/revisoes/boneco-desenho/decisao.md): o cinza com as
// linhas do corpo, que é o padrão, e o de cor de pele, que é a opção. As fichas dizem tudo o que figura.mjs precisa
// para desenhar; os números de traço estão em cm e são convertidos para pixels por `naEscala`.
const claro = (tema) => tema === 'claro';

/** O padrão: cinza, traço fino escuro, sem roupa, com os grupos musculares e a rótula em linha fina. */
export const CINZA = {
  id: 'cinza', nome: 'Cinza, com as linhas do corpo', papel: 'padrão',
  forma: 'curva', contorno: 0.6, cabelo: false, roupa: null, descalco: true, mao: 'polegar',
  definicao: 'linhas', musculo: 'solido',
  cores: (t) => (claro(t)
    ? { pele: '#d5dde3', peleSombra: '#b3bfc8', peleLonge: '#e6ebef', contorno: '#1d2a36', linhaMus: '#9fabb5', musP: '#d62e26', musPb: '#1d2a36', musS: '#ec961c', musSb: '#1d2a36', musA: '#ec961c' }
    : { pele: '#5e6e7a', peleSombra: '#4a5863', peleLonge: '#3f4d58', contorno: '#e7eef2', linhaMus: '#43515b', musP: '#f45248', musPb: '#10171b', musS: '#f5aa3c', musSb: '#10171b', musA: '#f5aa3c' }),
};

/** A opção: cor de pele, contorno suave na cor de cada parte, de short e tênis, com cabelo, e as linhas do corpo. */
export const PELE = {
  id: 'pele', nome: 'Cor de pele, de short', papel: 'opção',
  forma: 'curva', contorno: 0.55, contornoNaCor: true, folga: 0, cabelo: true, roupa: 'short', mao: 'polegar',
  definicao: 'linhas', musculo: 'veu',
  cores: (t) => (claro(t)
    ? { pele: '#d9a47c', peleSombra: '#bd865f', peleLonge: '#c28e68', cabelo: '#2b2420', short: '#2c3d50', calcado: '#27343f', linhaMus: '#c08b64', musP: '#cb5747', musPb: '#a43d2d', musS: '#eaa594', musSb: '#c77f6c', musA: '#d98a76' }
    : { pele: '#cf9a72', peleSombra: '#a87852', peleLonge: '#b3825c', cabelo: '#8b6f5a', short: '#a9b8c6', calcado: '#e7eef2', linhaMus: '#a67750', musP: '#cb5747', musPb: '#a43d2d', musS: '#eaa594', musSb: '#c77f6c', musA: '#d98a76' }),
};

/** O traço em pixels: 1,25 px no palco e 1 px na miniatura, qualquer que seja o zoom; as linhas de dentro, 0,8 px. */
export const TRACO = { palcoPx: 1.25, miniPx: 1, dentroPx: 0.8 };

/**
 * A ficha ajustada ao tamanho em que vai ser desenhada (`pxPorCm`). Na miniatura somem as linhas dos grupos
 * musculares, as divisões do músculo e o polegar: ficam a silhueta, o traço de fora, a roupa e o músculo que trabalha.
 */
export function naEscala(estilo, pxPorCm, { mini = false } = {}) {
  const contorno = (mini ? TRACO.miniPx : TRACO.palcoPx) / pxPorCm;
  if (mini) return { ...estilo, contorno, definicao: 'nada', semDivisoes: true, mao: null };
  return { ...estilo, contorno, fino: TRACO.dentroPx / (0.4 * pxPorCm) };
}
