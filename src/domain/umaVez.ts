/**
 * Faz uma vez e guarda o resultado, mas só se der certo: se a promessa falhar (sem rede, uma versão nova publicada
 * trocou o nome do arquivo), a próxima chamada tenta de novo. Antes, a falha ficava guardada até recarregar a página,
 * e a folha do selo ou o cartão de texto continuavam sem abrir mesmo com a rede de volta.
 */
export function umaVezSeDerCerto<T>(fazer: () => Promise<T>): () => Promise<T> {
  let guardada: Promise<T> | undefined;
  return () => {
    if (!guardada) {
      const tentativa = fazer();
      guardada = tentativa;
      tentativa.catch(() => {
        if (guardada === tentativa) guardada = undefined;
      });
    }
    return guardada;
  };
}

/** O mesmo, por chave: cada chave guarda o resultado dela, e a que falha é esquecida. */
export function porChaveSeDerCerto<T>(fazer: (chave: string) => Promise<T>): (chave: string) => Promise<T> {
  const guardadas = new Map<string, () => Promise<T>>();
  return (chave) => {
    if (!guardadas.has(chave)) guardadas.set(chave, umaVezSeDerCerto(() => fazer(chave)));
    return guardadas.get(chave)!();
  };
}
