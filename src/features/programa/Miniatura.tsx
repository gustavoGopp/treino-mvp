import { useId } from 'react';
import { useEstiloBoneco } from '../app/estiloBoneco';
import { comIdsUnicos, estiloDasListras } from './idsDoDesenho';
import { useDesenho } from './desenhoFora';

// Miniatura do exercício: o quadro parado do Boneco (quadroBoneco.ts), calculado no Worker para não travar a tela.
// Até chegar, um quadro vazio do mesmo tamanho.

// Sem animação: "guia em texto" quando há cartão de texto; "sem guia ainda" quando não há nada (design v2, item 4).
export function Miniatura({ animacaoId, temTexto = false }: { animacaoId: string | null; temTexto?: boolean }) {
  const estilo = useEstiloBoneco();
  const uid = useId();
  const q = useDesenho(animacaoId ? { tipo: 'miniatura', animacaoId, estilo } : null);
  if (animacaoId && !q) return <div className="miniatura" aria-hidden="true" />;
  if (!q)
    return (
      <div className={`miniatura vazia${temTexto ? '' : ' sem-guia'}`} aria-hidden="true">
        {temTexto && (
          <svg viewBox="0 0 24 24">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        )}
        <span>{temTexto ? 'guia em texto' : 'sem guia ainda'}</span>
      </div>
    );
  return (
    <div className="miniatura" aria-hidden="true">
      <svg className={q.classe || undefined} viewBox={q.viewBox} style={estiloDasListras(uid)} dangerouslySetInnerHTML={{ __html: comIdsUnicos(q.html, uid) }} />
    </div>
  );
}
