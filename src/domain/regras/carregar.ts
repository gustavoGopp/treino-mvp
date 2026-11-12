import { umaVezSeDerCerto } from '../umaVez';
import { porId, type Regra } from './schema';

// As regras por extenso para a tela, baixadas uma vez, quando a primeira folha de selo abre (R5b: fora do pacote inicial).
// Se a importação falhar, a próxima tentativa baixa de novo (umaVezSeDerCerto).
export const carregarRegras: () => Promise<Record<string, Regra>> = umaVezSeDerCerto(() => import('./regras.json').then((m) => porId(m.default)));
