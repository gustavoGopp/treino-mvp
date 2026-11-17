import { useSyncExternalStore } from 'react';
// O desenho do Boneco no guia (decisão do Gustavo em 16/11/2026): o cinza é o padrão e o cor de pele fica como opção
// em "Meus dados". Os dois são do motor novo (src/engine/novo). É uma preferência de tela deste aparelho: fica no
// localStorage, fora dos dados de treino (não entra na exportação).
export type Estilo = 'cinza' | 'pele';
const CHAVE = 'treino-mvp:estilo-boneco';
export const ESTILO_PADRAO: Estilo = 'cinza';
// O clássico ('atual') saiu do app em 03/11/2026; o Boneco de antes ('a') e a Silhueta ('b'), em 16/11/2026, com o
// motor de antes: quem tinha escolhido um deles passa ao padrão.
const VALIDOS: Estilo[] = ['cinza', 'pele'];

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
