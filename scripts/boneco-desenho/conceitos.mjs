// As fichas dos onze conceitos da rodada 1 (ver docs/revisoes/boneco-desenho/ideias.md). Cada ficha diz como a
// figura de figura.mjs é desenhada: a linguagem das formas, o contorno ou a folga, a roupa, as juntas, a sombra, a
// proporção, as cores (por tema) e como o músculo aparece.
const claro = (tema) => tema === 'claro';

export const CONCEITOS = [
  {
    n: 1, id: 'hoje-gente', nome: 'Hoje, com corpo de gente',
    frase: 'O boneco de hoje (cinza, com contorno, sem roupa) com as medidas de gente e sem emendas; o músculo como você já aprovou.',
    forma: 'curva', contorno: 1.15, cabelo: false, roupa: null, descalco: true, musculo: 'solido',
    cores: (t) => (claro(t)
      ? { pele: '#d5dde3', peleSombra: '#b3bfc8', musP: '#d62e26', musPb: '#1d2a36', musS: '#ec961c', musSb: '#1d2a36', musA: '#ec961c' }
      : { pele: '#5e6e7a', peleSombra: '#4a5863', musP: '#f45248', musPb: '#10171b', musS: '#f5aa3c', musSb: '#10171b', musA: '#f5aa3c' }),
  },
  {
    n: 2, id: 'gente-simples', nome: 'Gente simples',
    frase: 'Uma pessoa chapada, sem contorno e sem rosto, de regata e short; o músculo aparece por baixo da roupa. É a soma das suas escolhas.',
    forma: 'curva', folga: 0.75, cabelo: true, roupa: 'regata-short', musculo: 'veu',
  },
  {
    n: 3, id: 'traco-e-cor', nome: 'Traço e cor',
    frase: 'A mesma pessoa com um traço fino e constante em volta e cor chapada, como um bom folheto de exercício.',
    forma: 'curva', contorno: 0.6, cabelo: true, roupa: 'regata-short', musculo: 'veu', sola: true,
    cores: (t) => (claro(t) ? { contorno: '#2a2f38', sola: '#e9edf0' } : { contorno: '#f1eee9', sola: '#5d6975' }),
  },
  {
    n: 4, id: 'recorte', nome: 'Recorte',
    frase: 'Peças de papel recortado: retas e cantos no lugar das curvas, e a cor do app na roupa.',
    forma: 'recorte', folga: 0.8, cabelo: true, roupa: 'regata-short', musculo: 'veu',
    cores: (t) => (claro(t) ? { roupa: '#3f3aa8', short: '#1f2433' } : { roupa: '#8f97f0', short: '#c9cfe0' }),
  },
  {
    n: 5, id: 'pictograma', nome: 'Pictograma vestido',
    frase: 'Barras de uma espessura só e cabeça redonda solta do corpo, mas com pele, roupa e tênis. O músculo vira a parte do corpo inteira.',
    forma: 'barra', folga: 1.3, cabelo: false, roupa: 'regata-short', musculo: 'zona',
    barras: { coxa: 6.8, canela: 5.2, braco: 4.7, ante: 4.2, tronco: 10, cabeca: 10.2 },
  },
  {
    n: 6, id: 'marionete', nome: 'Marionete de papel',
    frase: 'Cada parte do corpo é uma peça, e as juntas mostram o pino: vê-se onde o corpo dobra.',
    forma: 'curva', pecas: true, folga: 0.85, juntas: 'pino', cabelo: true, roupa: 'regata-short', musculo: 'veu',
    cores: (t) => (claro(t) ? { roupa: '#6b8196', short: '#33475c' } : {}),
  },
  {
    n: 7, id: 'prancheta', nome: 'Prancheta',
    frase: 'Desenho de projeto: linha fina, corpo quase vazio, só um tom de pele bem claro, e as juntas marcadas com mira.',
    forma: 'curva', contorno: 0.5, juntas: 'mira', cabelo: true, roupa: 'regata-short', musculo: 'veu',
    cores: (t) => (claro(t)
      ? { pele: '#f3dfcf', peleSombra: '#e6c9b3', contorno: '#2f4052', roupa: '#eef1f4', short: '#cfd7de', calcado: '#b3bdc6', cabelo: '#4d4038', mira: '#0a7c72', roupaVeu: '#f3ece6', shortVeu: '#e3dbd4' }
      : { pele: '#3b3029', peleSombra: '#2d2520', contorno: '#dfe6ea', roupa: '#1b252c', short: '#34424c', calcado: '#56656f', cabelo: '#c8b5a4', mira: '#2bb3a6', roupaVeu: '#2f2823', shortVeu: '#3a332e', musS: '#b9705e', musA: '#a86452' }),
  },
  {
    n: 8, id: 'cartaz', nome: 'Cartaz',
    frase: 'Atleta em tons chapados com a sombra recortada, e as linhas dos músculos à mostra na pele.',
    forma: 'curva', folga: 0.75, sombra: 'recortada', definicao: 'linhas', cabelo: true, roupa: 'regata-short', musculo: 'veu',
    escala: { gordura: 1.05, largura: 1.04 },
    cores: (t) => (claro(t) ? { roupa: '#c2452f', roupaSombra: '#9e3423', short: '#27313f', shortSombra: '#1a222d' } : { roupa: '#d9604a', roupaSombra: '#b54a37', short: '#aebccb', shortSombra: '#8c9cab' }),
  },
  {
    n: 9, id: 'massa-leve', nome: 'Massa leve',
    frase: 'Formas cheias com um degradê suave, sem contorno, e a sombra no chão.',
    forma: 'curva', folga: 0.5, sombra: 'degrade', sombraNoChao: true, cabelo: true, roupa: 'regata-short', musculo: 'veu',
    escala: { gordura: 1.06 },
    cores: (t) => (claro(t)
      ? { peleLuz: '#edc3a0', peleSombra: '#c18a63', roupa: '#5f7d99', roupaSombra: '#46627d', roupaLuz: '#7b98b3', short: '#33475b', shortSombra: '#243445', shortLuz: '#45607a' }
      : { peleLuz: '#e2b48e', roupaLuz: '#9bb1c6', shortLuz: '#c3cfda' }),
  },
  {
    n: 10, id: 'atlas', nome: 'Atlas',
    frase: 'A pessoa só de short, com todos os grupos musculares desenhados de leve na pele; os que trabalham acendem.',
    forma: 'curva', folga: 0.75, definicao: 'cheio', cabelo: true, roupa: 'short', musculo: 'veu',
  },
  {
    n: 11, id: 'compacto', nome: 'Compacto',
    frase: 'Cabeça maior e corpo mais cheio, com dois pontos de olhos quando está de frente: mais simpatia, menos fidelidade de medida.',
    forma: 'curva', folga: 0.85, cabelo: true, rostoDeFrente: true, roupa: 'regata-short', musculo: 'veu',
    escala: { corpo: 0.925, cabeca: 1.38, extremo: 1.2, gordura: 1.17, largura: 1.08 },
    cores: (t) => (claro(t) ? { roupa: '#3f3aa8', short: '#232a3d' } : { roupa: '#8f97f0', short: '#c9cfe0' }),
  },
];

/** Quem trabalha em cada exercício das pranchas: 'p' principal, 's' também trabalha, 'a' só ajuda a firmar. */
export const PAPEIS = {
  agachamento: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  flexao: { peitoral: 'p', triceps: 's', deltoide: 's', abdomen: 'a' },
};
