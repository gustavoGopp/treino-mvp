// Leva o desenho aprovado do Boneco (sessão do desenho, 13/11/2026) para o motor novo: lê as tabelas de perfil, os
// grupos musculares e as fichas dos dois estilos em scripts/boneco-desenho/ e grava src/engine/novo/dados/boneco.json.
// As tabelas continuam tendo uma fonte só (a sessão do desenho); este arquivo é a ponte, para o motor não importar scripts.
// Uso: node scripts/animacao-nova/levar-desenho.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import * as P from '../boneco-desenho/boneco-prova.mjs';
import { CINZA, PELE, TRACO } from '../boneco-desenho/estilos-finais.mjs';
import { DE_COSTAS, DE_FRENTE, DE_LADO } from '../boneco-desenho/musculos-prova.mjs';
import { ACRESCENTA, SUBSTITUI } from './musculos-corrigidos.mjs';

const perfis = {};
for (const k of ['COXA_L', 'CANELA_L', 'BRACO_L', 'ANTE_L', 'TRONCO_L', 'PESCOCO_L', 'COXA_F', 'CANELA_F', 'BRACO_F', 'ANTE_F']) perfis[k] = P[k];
const formas = {};
for (const k of ['PELVE_L', 'CABECA_L', 'CABELO_L', 'TENIS_L', 'MAO_PEGADA', 'MAO_SOLTA', 'MAO_F', 'TRONCO_F', 'PELVE_F', 'SHORT_F', 'TENIS_F', 'CABECA_F', 'CABELO_F']) formas[k] = P[k].map((q) => (q[2] ? [q[0], q[1], 1] : [q[0], q[1]])); // o terceiro valor (1) marca canto vivo
// formas que estão dentro de figura.mjs (não exportadas): copiadas daqui, com a origem anotada
formas.MAO_CHAO = [[-1.6, 1.9], [3, 2.1], [9, 0.7], [16, -0.9], [18.6, -1.7], [18.4, -2.3, 1], [-1.6, -2.3, 1]];
formas.POLEGAR_L = [[1.2, 3.0], [4.6, 6.0], [8.2, 6.6], [9.6, 5.2], [7, 4.0], [3.6, 2.0]];
formas.POLEGAR_F = [[1.6, 1.4], [5, 3.5], [8.4, 4.1], [9.3, 2.9], [6.4, 1.9], [3, 0.5]];
// A mão espalmada vista pelo dorso (de cima, na flexão): desenho novo de 14/11/2026, que as pranchas aprovadas não
// tinham (lá a mão só aparece de lado e de frente). Mesma luva com polegar, com o mesmo comprimento da mão solta
// (18,4 cm), a largura da mão do ANSUR II (8,6 cm nos nós dos dedos) e as pontas dos dedos em arco (o dedo médio é o
// mais comprido e o mínimo o mais curto). Ainda não aprovado pelo Gustavo: vai na folha da flexão.
formas.MAO_ESPALMADA = [[0, 2.7], [3, 3.5], [7, 4.2], [10, 4.3], [14, 4.1], [16.6, 3.4], [17.9, 1.8], [18.4, 0.3], [18, -1.4], [17, -2.9], [15.6, -4.2], [13.5, -4.7], [10, -4.5], [6, -4.2], [3, -3.6], [0, -2.7]];
const linhas = {
  DEDOS_L: [[[7.2, 2.4], [9.8, 1.8]], [[7.5, 0], [10.3, -0.5]], [[7.1, -2.4], [9.5, -3.1]]],
  // as três linhas entre os dedos da mão espalmada, dos nós até perto das pontas
  DEDOS_ESPALMADA: [[[10.6, 2.2], [17.3, 1.9]], [[10.9, 0], [17.7, -0.8]], [[10.4, -2.3], [15.9, -3.2]]],
};
// A ordem de pintura segue a camada da tabela dos músculos (src/engine/novo/dados/musculos.json): quem cobre é
// pintado depois. Nas pranchas, o peitoral vinha antes do abdômen e o trapézio antes do grande dorsal; pela
// anatomia (Gray 1918), o peitoral cobre o alto do reto abdominal e o trapézio cobre a borda de cima do dorsal.
const COBRE = JSON.parse(readFileSync(new URL('../../src/engine/novo/dados/musculos.json', import.meta.url), 'utf8')).grupos;
function naOrdemDasCamadas(lista) {
  const l = [...lista];
  for (let passo = 0; passo < l.length * l.length; passo++) {
    let trocou = false;
    for (let i = 0; i < l.length && !trocou; i++)
      for (const coberto of COBRE[l[i].id]?.cobre ?? []) {
        const j = l.findIndex((x) => x.id === coberto);
        if (j > i && l[j].em === l[i].em) {
          const [m] = l.splice(i, 1);
          l.splice(j, 0, m);
          trocou = true;
          break;
        }
      }
    if (!trocou) break;
  }
  return l;
}
/** As formas aprovadas com as correções anatômicas de musculos-corrigidos.mjs (ou sem elas, com SEM_CORRECOES). */
let SEM_CORRECOES = false;
const corrigida = (vista, lista) => (SEM_CORRECOES ? lista : [...lista.map((m) => SUBSTITUI[vista]?.[m.id] ?? m), ...(ACRESCENTA[vista] ?? [])]);
const estilo = (e) => ({ id: e.id, nome: e.nome, papel: e.papel, cabelo: !!e.cabelo, roupa: e.roupa ?? null, descalco: !!e.descalco, contornoNaCor: !!e.contornoNaCor, cores: { claro: e.cores('claro'), escuro: e.cores('escuro') } });
const montar = () => ({
  origem: 'Desenho do Boneco aprovado pelo Gustavo em 13/11/2026 (docs/revisoes/boneco-desenho/decisao.md). Tabelas de scripts/boneco-desenho/boneco-prova.mjs, musculos-prova.mjs, figura.mjs e estilos-finais.mjs, levadas por scripts/animacao-nova/levar-desenho.mjs. Em cm.',
  comoLer: {
    perfisDeLado: '[t, frente, trás]: t = posição ao longo da parte (0 = começo, 1 = fim); distância da superfície ao eixo do osso, para a frente e para trás',
    perfisDeFrente: '[t, dentro, fora]: o mesmo, para o lado de dentro e o de fora do corpo',
    formas: 'polígonos fechados por curva suave (um terceiro valor 1 marca canto vivo), em coordenadas próprias (ver boneco-prova.mjs): PELVE_L e CABECA_L em [para a frente, para cima] a partir do centro do quadril e da base do crânio; *_F são a metade direita do corpo em pé [x, y]; TENIS_L em [do calcanhar para a ponta, para cima]; MAO_* em [do punho para a ponta dos dedos, para o lado do polegar ou para cima]; MAO_ESPALMADA é a mão vista pelo dorso (desenho de 14/11/2026, fora das pranchas)',
    musculos: "[t, d]: t ao longo da parte e d = afastamento do eixo em cm (de lado: positivo = frente; de frente: positivo = dentro). 'f-0.9' = na superfície da frente, 0,9 cm para dentro; 't' = trás; 'd' = dentro; 'o' = fora. 'abs' = [x, y] em pé",
  },
  perfis,
  formas,
  linhas,
  musculos: { lado: naOrdemDasCamadas(corrigida('lado', DE_LADO)), frente: naOrdemDasCamadas(corrigida('frente', DE_FRENTE)), costas: naOrdemDasCamadas(corrigida('costas', DE_COSTAS)) },
  estilos: { cinza: estilo(CINZA), pele: estilo(PELE) },
  traco: TRACO,
  // o pé descalço usa a forma do tênis reduzida (figura.mjs)
  peDescalco: 0.93,
  // a barra do short na coxa e a folga do tecido (boneco-prova.mjs)
  short: { ate: 0.44, folga: 1.07 },
  // A cintura do ombro (rodada de correção de 15/11/2026): um volume da base do pescoço ao ombro, que acompanha a
  // clavícula e a escápula. `dentro` = a ponta de dentro, em cm a partir de C7 (para o lado, para cima, para a
  // frente); a ponta de fora fica `acimaDoCentroDoOmbro` cm acima do centro do ombro. Os raios foram escolhidos
  // para o volume caber dentro do contorno aprovado em repouso (o acrômio fica 3,7 cm acima do centro do ombro).
  cinturaDoOmbro: SEM_CORRECOES ? { dentro: [5.5, -4.3, 3], acimaDoCentroDoOmbro: 1, raioDentro: 0.01, raioFora: 0.01 } : { dentro: [5.5, -4.3, 3], acimaDoCentroDoOmbro: 1, raioDentro: 3.6, raioFora: 3 },
});
const saida = montar();
// o desenho como foi aprovado, sem as correções: só para a comparação lado a lado (não vai para o app)
SEM_CORRECOES = true;
mkdirSync(new URL('./dados/', import.meta.url), { recursive: true });
writeFileSync(new URL('./dados/boneco-aprovado.json', import.meta.url), JSON.stringify(montar(), null, 1) + '\n');
const arq = new URL('../../src/engine/novo/dados/boneco.json', import.meta.url);
writeFileSync(arq, JSON.stringify(saida, null, 1) + '\n');
console.log(`desenho do boneco → ${arq.pathname} (${(JSON.stringify(saida).length / 1024).toFixed(1)} kB)`);
