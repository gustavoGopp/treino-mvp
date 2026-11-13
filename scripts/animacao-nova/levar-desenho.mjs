// Leva o desenho aprovado do Boneco (sessão do desenho, 13/11/2026) para o motor novo: lê as tabelas de perfil, os
// grupos musculares e as fichas dos dois estilos em scripts/boneco-desenho/ e grava src/engine/novo/dados/boneco.json.
// As tabelas continuam tendo uma fonte só (a sessão do desenho); este arquivo é a ponte, para o motor não importar scripts.
// Uso: node scripts/animacao-nova/levar-desenho.mjs
import { writeFileSync } from 'node:fs';
import * as P from '../boneco-desenho/boneco-prova.mjs';
import { CINZA, PELE, TRACO } from '../boneco-desenho/estilos-finais.mjs';
import { DE_COSTAS, DE_FRENTE, DE_LADO } from '../boneco-desenho/musculos-prova.mjs';

const perfis = {};
for (const k of ['COXA_L', 'CANELA_L', 'BRACO_L', 'ANTE_L', 'TRONCO_L', 'PESCOCO_L', 'COXA_F', 'CANELA_F', 'BRACO_F', 'ANTE_F']) perfis[k] = P[k];
const formas = {};
for (const k of ['PELVE_L', 'CABECA_L', 'CABELO_L', 'TENIS_L', 'MAO_PEGADA', 'MAO_SOLTA', 'MAO_F', 'TRONCO_F', 'PELVE_F', 'SHORT_F', 'TENIS_F', 'CABECA_F', 'CABELO_F']) formas[k] = P[k].map((q) => [q[0], q[1]]);
// formas que estão dentro de figura.mjs (não exportadas): copiadas daqui, com a origem anotada
formas.MAO_CHAO = [[-1.6, 1.9], [3, 2.1], [9, 0.7], [16, -0.9], [18.6, -1.7], [18.4, -2.3], [-1.6, -2.3]];
formas.POLEGAR_L = [[1.2, 3.0], [4.6, 6.0], [8.2, 6.6], [9.6, 5.2], [7, 4.0], [3.6, 2.0]];
formas.POLEGAR_F = [[1.6, 1.4], [5, 3.5], [8.4, 4.1], [9.3, 2.9], [6.4, 1.9], [3, 0.5]];
const linhas = { DEDOS_L: [[[7.2, 2.4], [9.8, 1.8]], [[7.5, 0], [10.3, -0.5]], [[7.1, -2.4], [9.5, -3.1]]] };
const estilo = (e) => ({ id: e.id, nome: e.nome, papel: e.papel, cabelo: !!e.cabelo, roupa: e.roupa ?? null, descalco: !!e.descalco, contornoNaCor: !!e.contornoNaCor, cores: { claro: e.cores('claro'), escuro: e.cores('escuro') } });
const saida = {
  origem: 'Desenho do Boneco aprovado pelo Gustavo em 13/11/2026 (docs/revisoes/boneco-desenho/decisao.md). Tabelas de scripts/boneco-desenho/boneco-prova.mjs, musculos-prova.mjs, figura.mjs e estilos-finais.mjs, levadas por scripts/animacao-nova/levar-desenho.mjs. Em cm.',
  comoLer: {
    perfisDeLado: '[t, frente, trás]: t = posição ao longo da parte (0 = começo, 1 = fim); distância da superfície ao eixo do osso, para a frente e para trás',
    perfisDeFrente: '[t, dentro, fora]: o mesmo, para o lado de dentro e o de fora do corpo',
    formas: 'polígonos em coordenadas próprias (ver boneco-prova.mjs): PELVE_L e CABECA_L em [para a frente, para cima] a partir do centro do quadril e da base do crânio; *_F são a metade direita do corpo em pé [x, y]; TENIS_L em [do calcanhar para a ponta, para cima]; MAO_* em [do punho para a ponta dos dedos, para o lado do polegar ou para cima]',
    musculos: "[t, d]: t ao longo da parte e d = afastamento do eixo em cm (de lado: positivo = frente; de frente: positivo = dentro). 'f-0.9' = na superfície da frente, 0,9 cm para dentro; 't' = trás; 'd' = dentro; 'o' = fora. 'abs' = [x, y] em pé",
  },
  perfis,
  formas,
  linhas,
  musculos: { lado: DE_LADO, frente: DE_FRENTE, costas: DE_COSTAS },
  estilos: { cinza: estilo(CINZA), pele: estilo(PELE) },
  traco: TRACO,
  // o pé descalço usa a forma do tênis reduzida (figura.mjs)
  peDescalco: 0.93,
  // a barra do short na coxa e a folga do tecido (boneco-prova.mjs)
  short: { ate: 0.44, folga: 1.07 },
};
const arq = new URL('../../src/engine/novo/dados/boneco.json', import.meta.url);
writeFileSync(arq, JSON.stringify(saida, null, 1) + '\n');
console.log(`desenho do boneco → ${arq.pathname} (${(JSON.stringify(saida).length / 1024).toFixed(1)} kB)`);
