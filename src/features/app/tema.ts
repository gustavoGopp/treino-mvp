import { useSyncExternalStore } from 'react';

// Tema da tela (pedido do Gustavo na design v3, 03/11/2026): "igual ao celular" é o padrão; claro e escuro ficam como
// escolha em "Meus dados". É uma preferência de tela deste aparelho, como o estilo do boneco: fica no localStorage,
// fora dos dados de treino (não entra na exportação). O CSS já tem os dois temas em :root[data-theme].
export type Tema = 'auto' | 'claro' | 'escuro';
const CHAVE = 'treino-mvp:tema';
export const TEMA_PADRAO: Tema = 'auto';
const VALIDOS: Tema[] = ['auto', 'claro', 'escuro'];
const COR_BARRA = { claro: '#F5F4F0', escuro: '#111316' } as const;

function ler(): Tema {
  try {
    const v = localStorage.getItem(CHAVE) as Tema | null;
    return v && VALIDOS.includes(v) ? v : TEMA_PADRAO;
  } catch {
    return TEMA_PADRAO;
  }
}

/** Põe o tema na página: data-theme no <html> e a cor da barra do celular. */
export function aplicarTema(t: Tema) {
  if (typeof document === 'undefined') return;
  const raiz = document.documentElement;
  if (t === 'auto') delete raiz.dataset.theme;
  else raiz.dataset.theme = t === 'escuro' ? 'dark' : 'light';
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    const escuro = m.media.includes('dark');
    m.content = t === 'auto' ? COR_BARRA[escuro ? 'escuro' : 'claro'] : COR_BARRA[t];
  });
}

let atual: Tema = ler();
aplicarTema(atual);
const ouvintes = new Set<() => void>();

export function definirTema(t: Tema) {
  if (!VALIDOS.includes(t)) t = TEMA_PADRAO;
  atual = t;
  try {
    localStorage.setItem(CHAVE, t);
  } catch {
    // sem armazenamento (aba anônima): vale só até fechar o app
  }
  aplicarTema(t);
  ouvintes.forEach((f) => f());
}

export function useTema(): Tema {
  return useSyncExternalStore(
    (f) => {
      ouvintes.add(f);
      return () => ouvintes.delete(f);
    },
    () => atual,
    () => atual,
  );
}
