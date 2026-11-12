import { porId, type Regra } from './schema';

// As regras por extenso para a tela, baixadas uma vez, quando a primeira folha de selo abre (R5b: fora do pacote inicial).
let promessa: Promise<Record<string, Regra>> | undefined;
export function carregarRegras(): Promise<Record<string, Regra>> {
  promessa ??= import('./regras.json').then((m) => porId(m.default));
  return promessa;
}
