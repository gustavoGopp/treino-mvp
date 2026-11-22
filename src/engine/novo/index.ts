// Motor novo (animação nova): ponto de entrada. Ainda fora do app: só os protótipos e a conferência usam.
export * from './vec';
export * from './tabelas';
export * from './esqueleto';
export * from './corpo3d';
export * from './desenho';
export * from './pecas';
export * from './movimento';
export * from './cena';
export * from './exercicios/registro';
export { EXERCICIOS } from './app';
export * from './conferir';
export * from './conferir-pintura';
export * from './conferir-musculos';
export * from './tabela-musculos';
export * from './boneco';
export * from './equipamento';
// o pintor por pares fica fora do pacote do app até ser pedido (./cena.ts); quem usa o motor por aqui (os scripts e a
// conferência) já o tem carregado
import { registrarPintorPorPares } from './cena';
import { opcoesDe, pintarPorPares } from './pintor-por-pares';
registrarPintorPorPares((itens, id) => pintarPorPares(itens, opcoesDe(id)));
