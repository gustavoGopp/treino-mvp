import { useSyncExternalStore } from 'react';
import type { Estilo } from '../../engine/estilo';

// Estilo do boneco do guia (decisão do Gustavo em 02/11/2026): o boneco novo ('a') é o padrão; o clássico
// ('atual', o do guia original) e a silhueta ('b') ficam como opção em "Meus dados". É uma preferência de tela
// deste aparelho: fica no localStorage, fora dos dados de treino (não entra na exportação).
const CHAVE = 'treino-mvp:estilo-boneco';
export const ESTILO_PADRAO: Estilo = 'a';
const VALIDOS: Estilo[] = ['a', 'atual', 'b'];

function ler(): Estilo {
  try {
    const v = localStorage.getItem(CHAVE) as Estilo | null;
    return v && VALIDOS.includes(v) ? v : ESTILO_PADRAO;
  } catch {
    return ESTILO_PADRAO;
  }
}

let atual: Estilo = ler();
const ouvintes = new Set<() => void>();

export function definirEstiloBoneco(e: Estilo) {
  atual = e;
  try {
    localStorage.setItem(CHAVE, e);
  } catch {
    // sem armazenamento (aba anônima): vale só até fechar o app
  }
  ouvintes.forEach((f) => f());
}

export function useEstiloBoneco(): Estilo {
  return useSyncExternalStore(
    (f) => {
      ouvintes.add(f);
      return () => ouvintes.delete(f);
    },
    () => atual,
    () => atual,
  );
}
