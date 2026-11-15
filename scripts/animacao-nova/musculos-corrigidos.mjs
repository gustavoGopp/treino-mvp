// Correções anatômicas das formas dos músculos (rodada de correção de 15/11/2026, depois da revisão independente).
// As formas aprovadas continuam em scripts/boneco-desenho/musculos-prova.mjs; este arquivo diz o que muda e por quê.
// levar-desenho.mjs aplica estas correções em src/engine/novo/dados/boneco.json e guarda o desenho sem elas em
// scripts/animacao-nova/dados/boneco-aprovado.json, para a comparação lado a lado.
// Pontos de referência (homem de 175,8 cm, em pé): C7 151,5 cm; T3 (raiz da espinha da escápula) ~144; acrômio
// 143,6; T7 (ângulo inferior da escápula) ~134; mamilo 129,4; junção do xifoide (T9–T10) ~128; T12 121,6; crista
// ilíaca 106,5; trocânter 90,6. Níveis de Gray 1918 (pesquisa/03, seção 3.6) sobre as alturas do ANSUR II.

/** Formas que substituem a aprovada, por vista. */
export const SUBSTITUI = {
  costas: {
    // a ponta de baixo desce até T12 (era 126,5: 4,9 cm acima) e a borda de fora vai até o acrômio
    trapezio: { id: 'trapezio', em: 'abs', unico: true, pts: [[0, 153.4], [-5.6, 151.6], [-12, 149.4], [-18, 145.6], [-13.5, 142.6], [-8, 139], [-3.6, 131], [0, 121.6], [3.6, 131], [8, 139], [13.5, 142.6], [18, 145.6], [12, 149.4], [5.6, 151.6]] },
    // a borda de cima passa pelo ângulo inferior da escápula (T7) e sobe até a axila; antes subia até 140 cm, a altura da espinha da escápula
    dorsal: { id: 'dorsal', em: 'abs', pts: [[-2, 133.6], [-9.5, 134.6], [-15.4, 136.4], [-14.6, 128], [-13, 119], [-9, 111.5], [-2.2, 108], [-1.2, 118], [-1.6, 126.4]] },
  },
  frente: {
    // a borda de baixo desce abaixo do mamilo (5ª–6ª costela) e a ponta de fora afina em direção à axila
    peitoral: { id: 'peitoral', em: 'abs', pts: [[-0.8, 143.2], [-7, 144.4], [-13.6, 142.8], [-17.2, 138.6], [-15.4, 132.6], [-11, 127.4], [-5, 125.6], [-0.8, 127.2]] },
    // desce até a crista do púbis (antes parava na cintura, a 102,8 cm)
    abdomen: {
      id: 'abdomen',
      em: 'abs',
      unico: true,
      pts: [[-4.8, 127.2], [0, 127.6], [4.8, 127.2], [5.3, 116], [4.6, 105], [3.4, 96.5], [1.6, 92], [0, 91.4], [-1.6, 92], [-3.4, 96.5], [-4.6, 105], [-5.3, 116]],
      div: [[[0, 127.2], [0, 92]], [[-4.9, 121.6], [4.9, 121.6]], [[-5.1, 115.8], [5.1, 115.8]], [[-4.9, 110], [4.9, 110]]],
    },
  },
  lado: {
    // a borda de baixo desce de 47% para 53% do tronco (abaixo do mamilo)
    peitoral: { id: 'peitoral', em: 'tronco', pts: [[0.14, 13.2], [0.2, 17.6], [0.3, 'f-0.9'], [0.44, 'f-0.9'], [0.53, 'f-2.4'], [0.5, 14.8], [0.36, 11.6], [0.22, 10.8]] },
  },
};
/**
 * Porções: formas que só aparecem quando trabalham (`soAtivo`). O contorno do músculo inteiro continua igual nas
 * linhas do corpo; a cor passa a cobrir só a porção que o conteúdo pede.
 */
const DELT_FRENTE_DE_DENTRO = [[-0.14, 3.6], [-0.2, -0.6], [0, -1], [0.2, -1.6], [0.42, -3], [0.3, -0.4], [0.16, 2.2], [0.02, 4.2]];
const DELT_FRENTE_DE_FORA = [[-0.2, -1], [-0.1, -5], [0.06, 'o-0.6'], [0.2, 'o-0.6'], [0.42, -3], [0.2, -2], [0, -1.4]];
export const ACRESCENTA = {
  lado: [
    { id: 'deltAnt', em: 'braco', soAtivo: true, pts: [[-0.2, 1.9], [-0.12, 5.2], [0.05, 5.8], [0.2, 5], [0.34, 2.6], [0.44, 0.9], [0.3, 1.3], [0.1, 1.9]] },
    { id: 'deltLat', em: 'braco', soAtivo: true, pts: [[-0.2, -1.6], [-0.2, 1.6], [0.1, 1.6], [0.3, 1], [0.46, 0.2], [0.3, -1], [0.1, -1.6]] },
    { id: 'deltPost', em: 'braco', soAtivo: true, pts: [[-0.2, -1.9], [-0.12, -4.8], [0.05, -5.4], [0.2, -4.8], [0.34, -2.6], [0.44, -0.6], [0.3, -1.3], [0.1, -1.9]] },
  ],
  frente: [
    { id: 'deltAnt', em: 'braco', soAtivo: true, pts: DELT_FRENTE_DE_DENTRO },
    { id: 'deltLat', em: 'braco', soAtivo: true, pts: DELT_FRENTE_DE_FORA },
  ],
  costas: [
    { id: 'deltPost', em: 'braco', soAtivo: true, pts: DELT_FRENTE_DE_DENTRO },
    { id: 'deltLat', em: 'braco', soAtivo: true, pts: DELT_FRENTE_DE_FORA },
    // o trapézio de cima (encolhe o ombro) e o do meio e de baixo (junta e desce a escápula), um de cada lado
    { id: 'trapSup', em: 'abs', soAtivo: true, pts: [[-0.3, 153.4], [-5.6, 151.6], [-12, 149.4], [-18, 145.6], [-13.5, 143.4], [-7, 146], [-0.3, 148]] },
    { id: 'trapMedInf', em: 'abs', soAtivo: true, pts: [[-0.3, 147.4], [-7, 145.4], [-13.5, 142.8], [-8, 139], [-3.6, 131], [-0.3, 121.8]] },
  ],
};
