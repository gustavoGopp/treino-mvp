import { EX, montarSvg } from '../../engine';

// Quadro parado da animação, no modo "músculos" (sem textos, com os músculos trabalhados em destaque).
// O instante é o meio da segunda pausa do ciclo (posição contraída ou alongada), ou o meio do ciclo.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
const cache = new Map<string, { viewBox: string; html: string }>();

function instante(ex: Animacao): number {
  let t = 0;
  const pausas: number[] = [];
  for (const s of ex.seq as { kind: string; dur: number }[]) {
    if (s.kind === 'hold') pausas.push(t + s.dur / 2);
    t += s.dur;
  }
  return pausas[1] ?? t / 2;
}

export function quadro(animacaoId: string) {
  if (!cache.has(animacaoId)) {
    const ex: Animacao | undefined = EX.find((e: Animacao) => e.id === animacaoId);
    if (!ex) return null;
    const q = montarSvg(ex, ex.views[0], 'mus', instante(ex), 0, 120);
    cache.set(animacaoId, { viewBox: q.viewBox, html: q.html });
  }
  return cache.get(animacaoId)!;
}

export function Miniatura({ animacaoId }: { animacaoId: string | null }) {
  const q = animacaoId ? quadro(animacaoId) : null;
  if (!q)
    return (
      <div className="miniatura vazia" aria-hidden="true">
        <span>animação em breve</span>
      </div>
    );
  return (
    <div className="miniatura" aria-hidden="true">
      <svg viewBox={q.viewBox} dangerouslySetInnerHTML={{ __html: q.html }} />
    </div>
  );
}
