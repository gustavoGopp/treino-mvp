// Grava o CSS do Boneco do motor novo (cores e traços dos dois desenhos, nos dois temas) num arquivo que o app carrega:
// src/engine/novo/boneco.gerado.css. A fonte é uma só (cssDoBoneco, em src/engine/novo/boneco.ts, a partir da ficha dos
// estilos); um teste falha se o arquivo ficar diferente dela. Uso: node scripts/animacao-nova/css-do-boneco.mjs
import { writeFileSync } from 'node:fs';
import { motorNovo } from './empacotar.mjs';

const { modulo: m } = await motorNovo(`export { cssDoBoneco } from './src/engine/novo/boneco.ts';`);
const css = `/* Gerado por scripts/animacao-nova/css-do-boneco.mjs a partir de cssDoBoneco (src/engine/novo/boneco.ts). Não edite à mão. */\n${m.cssDoBoneco()}`;
writeFileSync('src/engine/novo/boneco.gerado.css', css);
console.log(`boneco.gerado.css: ${(css.length / 1024).toFixed(1)} kB`);
