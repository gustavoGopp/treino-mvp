// O registro das regras medidas pela conferência que ficam fora de ../conferir.ts: uma linha por arquivo de regras
// (uma família de exercícios por arquivo), e nada mais. Cada arquivo exporta um objeto `id da regra → função que
// mede`. O arquivo junta sozinho as linhas de quem trabalha em paralelo (ver .gitattributes).
export {};
export { apoioNoChao } from './apoio-no-chao';
export { regrasDosBulgaros } from './bulgaros';
export { REGRAS_FLEXAO_JOELHO } from './flexao-joelho';
export { regrasDasFlexoes } from './flexoes';
export { regrasDosStiffs } from './stiffs';
export { regrasDaSuspensao } from './suspensao';
export { REGRAS_PONTES } from './pontes';
export { REGRAS_TRICEPS_FRANCES } from './triceps-frances';
export { regrasDosOmbros } from './ombros';
export { regrasDasRoscas } from './roscas';
export { regrasDasPanturrilhas } from './panturrilhas';
