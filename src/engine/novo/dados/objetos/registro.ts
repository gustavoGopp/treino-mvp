// O registro dos objetos que ficam fora de ../objetos.json: uma linha por arquivo, e nada mais. Cada arquivo
// (./<objeto>.json) tem o mesmo formato de ../objetos.json: { "fontes": {...}, "objetos": {...} }, com um objeto ou
// uma família de objetos. O arquivo junta sozinho as linhas de quem trabalha em paralelo (ver .gitattributes).
// Ex.: export { default as cadeira } from './cadeira.json';
export {};
export { default as bancada } from './bancada.json';
export { default as cadeira } from './cadeira.json';
export { default as suspensao } from './suspensao.json';
export { default as toalha } from './toalha.json';
export { default as porta } from './porta.json';
