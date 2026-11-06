import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Folha que sobe de baixo (redesign, 06/11/2026; docs/revisoes/redesign/proposta.md, seção 5, "folha e diálogo").
// Abre por cima, na hora, sem empurrar a tela; o resto da página fica inerte (o foco e o leitor de tela não escapam
// para trás do véu) e o Tab dá a volta dentro dela. Esc, "Fechar" ou um toque no véu fecham, e o foco volta ao
// controle que abriu. Com `livre`, um elemento de fora continua ao alcance (no treino: o "Senti algo" do cabeçalho).

const FOCAVEIS = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex="0"]';

/** Deixa inerte tudo no #root, menos o caminho até `livre` (que fica ao alcance). Devolve como desfazer. */
function inertizar(livre: HTMLElement | null): () => void {
  const raiz = document.getElementById('root');
  if (!raiz) return () => {};
  const marcados: HTMLElement[] = [];
  const marca = (e: Element) => {
    if (e instanceof HTMLElement && !e.inert) {
      e.inert = true;
      marcados.push(e);
    }
  };
  if (!livre || !raiz.contains(livre)) marca(raiz);
  else
    for (let no: HTMLElement = livre; no !== raiz; no = no.parentElement!) {
      for (const irmao of Array.from(no.parentElement!.children)) if (irmao !== no) marca(irmao);
    }
  return () => marcados.forEach((e) => (e.inert = false));
}

export function Folha({
  titulo,
  aoFechar,
  children,
  livre,
  rotuloFechar = 'Fechar',
}: {
  titulo: string;
  aoFechar: () => void;
  children: ReactNode;
  /** Um elemento de fora da folha que continua ao alcance enquanto ela está aberta. */
  livre?: () => HTMLElement | null;
  rotuloFechar?: string;
}) {
  const id = useId();
  const folha = useRef<HTMLDivElement>(null);
  const fechar = useRef(aoFechar);
  fechar.current = aoFechar;

  useEffect(() => {
    const origem = document.activeElement as HTMLElement | null;
    const livreEl = livre?.() ?? null;
    const desfazer = inertizar(livreEl);
    folha.current?.querySelector<HTMLElement>('h2')?.focus();
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        fechar.current();
        return;
      }
      if (e.key !== 'Tab' || !folha.current) return;
      const alvos = [...(livreEl ? [livreEl] : []), ...Array.from(folha.current.querySelectorAll<HTMLElement>(FOCAVEIS))].filter((x) => x.getClientRects().length);
      if (!alvos.length) return;
      const i = alvos.indexOf(document.activeElement as HTMLElement);
      const prox = e.shiftKey ? (i <= 0 ? alvos.length - 1 : i - 1) : i === -1 || i === alvos.length - 1 ? 0 : i + 1;
      e.preventDefault();
      alvos[prox]!.focus();
    };
    document.addEventListener('keydown', tecla);
    return () => {
      document.removeEventListener('keydown', tecla);
      desfazer();
      if (origem && document.contains(origem) && origem !== document.body) origem.focus();
    };
    // abre uma vez; quem chama desmonta a folha para fechar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      className={`veu${livre ? ' abaixo-cab' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) aoFechar();
      }}
    >
      <div ref={folha} className="folha" role="dialog" aria-modal={livre ? undefined : true} aria-labelledby={`${id}-t`}>
        <div className="alca" aria-hidden="true" />
        <div className="folha-cab">
          <h2 id={`${id}-t`} tabIndex={-1}>
            {titulo}
          </h2>
          <button type="button" className="btn ter auto" onClick={aoFechar}>
            {rotuloFechar}
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
