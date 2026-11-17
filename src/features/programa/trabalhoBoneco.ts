import CATALOGO from '../../engine/novo/dados/catalogo-do-guia.json';
import { APROVADOS } from '../../engine/novo/aprovados';
import type { Exercicio } from '../../engine/novo/movimento';
import { registrarPreparo } from '../../engine/novo/preparo';
import type { Preparo } from '../../engine/novo/preparo';
import type { Pedido } from './desenhoFora';

// O que o Worker do Boneco responde (lote técnico e lote 2 do redesign): a ficha de uma animação, o catálogo do guia,
// cada quadro, a miniatura e a prévia de cada desenho. O guia não carrega o motor na tela: pede tudo aqui.
//
// O motor é o novo (src/engine/novo), desde 16/11/2026 o único do app. Cada exercício é um arquivo
// (src/engine/novo/exercicios/<id>.ts), carregado só quando é pedido; o resto do motor (a ponte) também só é carregado
// no primeiro pedido. Só entra o que está na lista de aprovados (src/engine/novo/aprovados.ts).
const ARQUIVOS = import.meta.glob<Record<string, unknown>>('../../engine/novo/exercicios/*.ts');
// o que vem calculado de antemão para cada exercício (o quadro de cada vista e as calibrações demoradas), para o
// primeiro desenho não esperar: um arquivo por exercício, carregado junto com ele (src/engine/novo/preparo.ts)
const PREPAROS = import.meta.glob<{ default: Preparo }>('../../engine/novo/dados/preparo/*.json');
const carregados = new Map<string, Promise<Exercicio | undefined>>();
const aPonte = () => import('../../engine/novo/ponte');

/** A animação pedida, se foi aprovada; senão, undefined (a tela mostra o exercício sem desenho). */
export function animacao(animacaoId: string): Promise<Exercicio | undefined> {
  const carregar = animacaoId in APROVADOS ? ARQUIVOS[`../../engine/novo/exercicios/${animacaoId}.ts`] : undefined;
  if (!carregar) return Promise.resolve(undefined);
  if (!carregados.has(animacaoId)) {
    // sem o arquivo do que vem calculado, o motor calcula na hora (mais devagar, com o mesmo resultado)
    const preparo = PREPAROS[`../../engine/novo/dados/preparo/${animacaoId}.json`]?.().then(
      (p) => registrarPreparo(animacaoId, p.default),
      () => undefined,
    );
    carregados.set(
      animacaoId,
      Promise.all([carregar(), preparo]).then(
        ([m]) => Object.values(m).find((x): x is Exercicio => !!x && typeof x === 'object' && (x as Exercicio).ficha?.id === animacaoId),
        () => undefined,
      ),
    );
  }
  return carregados.get(animacaoId)!;
}

/** A animação que serve de prévia dos desenhos em "Meus dados". */
const DA_PREVIA = 'goblet';

/** A resposta de um pedido da tela. */
export async function responder(p: Pedido): Promise<unknown> {
  // o catálogo do guia: os dias do programa de referência e todas as animações, na ordem de sempre
  if (p.tipo === 'catalogo') {
    const tem = (id: string) => id in APROVADOS;
    return { dias: CATALOGO.dias.map((d) => ({ ...d, ids: d.ids.filter(tem) })), todos: CATALOGO.todos.filter(tem) };
  }
  const ex = await animacao(p.tipo === 'previa' ? DA_PREVIA : p.animacaoId);
  if (!ex) return null;
  const ponte = await aPonte();
  switch (p.tipo) {
    case 'miniatura':
      return ponte.miniaturaDoMotorNovo(ex, p.tema, p.estilo);
    case 'previa':
      return ponte.previaDoMotorNovo(ex, p.estilo, p.tema);
    case 'ficha':
      return ponte.fichaDoMotorNovo(ex);
    case 'quadroGuia':
      return ponte.quadroDoMotorNovo(ex, p.vista, p.modo, p.t, p.erro, p.tituloErro, p.tema, p.estilo);
  }
}
