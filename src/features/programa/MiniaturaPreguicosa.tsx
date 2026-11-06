import { lazy, Suspense } from 'react';

// Lote técnico do redesign (06/11/2026): o motor do Boneco (src/engine, sem mudança) só é baixado quando a 1ª
// miniatura aparece, e não no pacote inicial. Até chegar (em uso, do service worker, em milissegundos), fica um
// quadro vazio do mesmo tamanho, para a tela não pular.
const M = lazy(() => import('./Miniatura').then((m) => ({ default: m.Miniatura })));

export function Miniatura(props: { animacaoId: string | null; temTexto?: boolean }) {
  return (
    <Suspense fallback={<div className="miniatura" aria-hidden="true" />}>
      <M {...props} />
    </Suspense>
  );
}
