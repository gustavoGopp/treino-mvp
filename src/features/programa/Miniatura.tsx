import { EX } from '../../engine';
import { montarSvgEstilo, vistaDaMiniatura, type Estilo } from '../../engine/estilo';
import { useEstiloBoneco } from '../app/estiloBoneco';

// Quadro parado da animação, no modo "músculos" (sem textos, com os músculos trabalhados em destaque).
// O instante é o meio da segunda pausa do ciclo (posição contraída ou alongada), ou o meio do ciclo.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
const cache = new Map<string, { viewBox: string; html: string; classe: string }>();

function instante(ex: Animacao): number {
  let t = 0;
  const pausas: number[] = [];
  for (const s of ex.seq as { kind: string; dur: number }[]) {
    if (s.kind === 'hold') pausas.push(t + s.dur / 2);
    t += s.dur;
  }
  return pausas[1] ?? t / 2;
}

// No boneco novo, a vista é a que mostra mais o músculo principal (vistaDaMiniatura); no clássico, a principal.
export function quadro(animacaoId: string, estilo: Estilo = 'atual') {
  const chave = animacaoId + '|' + estilo;
  if (!cache.has(chave)) {
    const ex: Animacao | undefined = EX.find((e: Animacao) => e.id === animacaoId);
    if (!ex) return null;
    const t = instante(ex);
    const q = montarSvgEstilo(ex, vistaDaMiniatura(ex, t, estilo), 'mus', t, 0, 120, estilo);
    cache.set(chave, { viewBox: q.viewBox, html: q.html, classe: q.classe });
  }
  return cache.get(chave)!;
}

export function Miniatura({ animacaoId }: { animacaoId: string | null }) {
  const estilo = useEstiloBoneco();
  const q = animacaoId ? quadro(animacaoId, estilo) : null;
  if (!q)
    return (
      <div className="miniatura vazia" aria-hidden="true">
        <span>animação em breve</span>
      </div>
    );
  return (
    <div className="miniatura" aria-hidden="true">
      <svg className={q.classe || undefined} viewBox={q.viewBox} dangerouslySetInnerHTML={{ __html: q.html }} />
    </div>
  );
}
