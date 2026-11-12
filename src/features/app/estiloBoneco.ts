import { useSyncExternalStore } from 'react';
import type { Estilo } from '../../engine/estilo';

// Estilo do boneco do guia (decisão do Gustavo em 02/11/2026): o boneco novo ('a') é o padrão e a silhueta ('b')
// fica como opção em "Meus dados". O clássico ('atual') saiu do app em 03/11/2026. É uma preferência de tela
// deste aparelho: fica no localStorage, fora dos dados de treino (não entra na exportação).
const CHAVE = 'treino-mvp:estilo-boneco';
export const ESTILO_PADRAO: Estilo = 'a';
// O clássico ('atual') saiu do app em 03/11/2026: quem tinha escolhido passa ao padrão.
const VALIDOS: Estilo[] = ['a', 'b'];

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
  if (!VALIDOS.includes(e)) e = ESTILO_PADRAO;
  atual = e;
  try {
    localStorage.setItem(CHAVE, e);
  } catch {
    // sem armazenamento (aba anônima): vale só até fechar o app
  }
  ouvintes.forEach((f) => f());
}

/** "Apagar tudo" em Meus dados: a preferência volta ao padrão. */
export function apagarEstiloBoneco() {
  atual = ESTILO_PADRAO;
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    // sem armazenamento: nada a apagar
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
