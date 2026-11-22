import type { ConteudoExercicio } from '../../conteudo/schema';

// O texto do guia de um exercício (dicas, 1º erro, onde sentir, a nota de montagem), baixado só quando a tela precisa
// dele. Nenhuma tela de uso carrega os textos de todos os exercícios.
const TEXTOS = import.meta.glob<{ default: ConteudoExercicio }>('../../conteudo/exercicios/*.json');
export const carregarTexto = (id: string) => TEXTOS[`../../conteudo/exercicios/${id}.json`]?.().then((m) => m.default) ?? Promise.reject(new Error(`sem texto para ${id}`));
