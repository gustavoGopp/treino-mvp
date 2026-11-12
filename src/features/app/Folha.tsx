import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Folha que sobe de baixo (redesign, 06/11/2026; docs/revisoes/redesign/proposta.md, seção 5, "folha e diálogo").
// Abre por cima, na hora, sem empurrar a tela; o resto da página fica inerte (o foco e o leitor de tela não escapam
// para trás do véu) e o Tab dá a volta dentro dela. Esc, "Fechar" ou um toque no véu fecham, e o foco volta ao
// controle que abriu. Com `livre`, um elemento de fora continua ao alcance (no treino: o "Senti algo" do cabeçalho): a folha
// abre abaixo do cabeçalho que o contém, e tocar nele fecha a folha antes de agir (segurança: "Senti algo" sempre à mão).

const FOCAVEIS = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex="0"]';

/**
 * De quem a folha tomou o foco, da mais recente para a mais antiga. Uma folha aberta por um botão de outra folha que
 * fecha em seguida (o "Trocar exercício" dentro do "⋯") guarda também quem abriu a primeira: ao fechar, o foco volta
 * ao 1º da cadeia que ainda está na página. Antes, o foco se perdia no corpo da página.
 */
const origens = new WeakMap<Element, HTMLElement[]>();

/**
 * Deixa inerte tudo no #root, menos o caminho até `livre` (que fica ao alcance), e as folhas que já estavam abertas
 * (elas ficam fora do #root: antes, a folha de baixo continuava ao alcance do Tab e do leitor de tela). Devolve como desfazer.
 */
function inertizar(livre: HTMLElement | null, propria: HTMLElement | null): () => void {
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
  for (const outra of Array.from(document.querySelectorAll('body > .veu'))) if (outra !== propria) marca(outra);
  return () => marcados.forEach((e) => (e.inert = false));
}

export function Folha({
  titulo,
  aoFechar,
  children,
  livre,
  rotuloFechar = 'Fechar',
  fecharAoTocarLivre = true,
}: {
  titulo: string;
  aoFechar: () => void;
  children: ReactNode;
  /** Um elemento de fora da folha que continua ao alcance enquanto ela está aberta. */
  livre?: () => HTMLElement | null;
  rotuloFechar?: string;
  /** Tocar no elemento livre fecha a folha. Desligado quando o próprio elemento decide o que abre (o treino). */
  fecharAoTocarLivre?: boolean;
}) {
  const id = useId();
  const folha = useRef<HTMLDivElement>(null);
  const veu = useRef<HTMLDivElement>(null);
  const fechar = useRef(aoFechar);
  fechar.current = aoFechar;
  // quem fica livre é procurado uma vez, ao abrir (a folha é montada depois do toque, com a página já desenhada)
  const [livreEl] = useState(() => livre?.() ?? null);

  useEffect(() => {
    const origem = document.activeElement as HTMLElement | null;
    const daFolha = origem?.closest('.folha');
    const cadeia = [...(origem && origem !== document.body ? [origem] : []), ...((daFolha && origens.get(daFolha)) ?? [])];
    if (folha.current) origens.set(folha.current, cadeia);
    const desfazer = inertizar(livreEl, veu.current);
    // abaixo do cabeçalho de quem fica livre, para ele continuar à vista e tocável
    const cab = livreEl?.closest('header');
    if (cab && veu.current) veu.current.style.top = `${Math.max(0, cab.getBoundingClientRect().bottom)}px`;
    const tocarLivre = () => fechar.current();
    if (fecharAoTocarLivre) livreEl?.addEventListener('click', tocarLivre, { capture: true });
    folha.current?.querySelector<HTMLElement>('h2')?.focus();
    const tecla = (e: KeyboardEvent) => {
      // folha dentro de folha (o selo, o "como fazer" na folha do exercício): só a de cima responde
      const folhas = document.querySelectorAll('.folha');
      if (folhas[folhas.length - 1] !== folha.current) return;
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
      livreEl?.removeEventListener('click', tocarLivre, { capture: true });
      desfazer();
      // o foco volta a quem abriu; se ele saiu da página (era um botão de uma folha que fechou), a quem abriu aquela
      cadeia.find((e) => document.contains(e) && !e.closest('[inert]'))?.focus();
    };
    // abre uma vez; quem chama desmonta a folha para fechar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      ref={veu}
      // "app": a folha fica fora da página (portal), e as regras de .app (a cor dos links, prefers-reduced-motion)
      // precisam alcançar o conteúdo dela
      className={`veu app${livreEl ? ' abaixo-cab' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) aoFechar();
      }}
    >
      <div ref={folha} className="folha" role="dialog" aria-modal={livreEl ? undefined : true} aria-labelledby={`${id}-t`}>
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
